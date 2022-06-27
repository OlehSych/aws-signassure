import { Injectable } from '@nestjs/common';
import {
  InjectModel,
  Model,
  Query,
  Document,
  TransactionSupport,
  Scan,
} from 'nestjs-dynamoose';

import { CountUsersInput } from './dto/count-users.input';
import { User, UserKey } from './model/user.model';

type UserQuery = Query<Document<User>, UserKey>;
type UserScan = Scan<Document<User>, UserKey>;

@Injectable()
export class UsersRepository extends TransactionSupport {
  constructor(
    @InjectModel('user')
    private readonly model: Model<User, UserKey>,
  ) {
    super();
  }

  async create({ role, ...user }: User): Promise<User> {
    return await this.model.create({
      ...user,
      role: {
        ...role,
      },
    });
  }

  async findAll(companyId: string, selectOnly?: string[]): Promise<User[]> {
    let query = this.model.query('companyId').eq(companyId);

    if (Array.isArray(selectOnly)) {
      query = query.attributes(selectOnly);
    }

    return await query.exec();
  }

  async findOne(id: string, companyId: string): Promise<User | void> {
    return await this.model.get({ id, companyId });
  }

  async update(
    id: string,
    companyId: string,
    input: Partial<User>,
  ): Promise<User> {
    if (input.role) {
      input.role = {
        ...input.role,
      };
    }
    return await this.model.update({ id, companyId }, { ...input });
  }

  async remove(id: string, companyId: string): Promise<void> {
    await this.model.delete({ id, companyId });
  }

  async removeMany(ids: string[], companyId: string): Promise<void> {
    await this.transaction(
      ids.map((id) => this.model.transaction.delete({ id, companyId })),
    );
  }

  async countByParams({
    companyId,
    ...params
  }: CountUsersInput): Promise<number> {
    const query = this.model.query('companyId').eq(companyId);
    const { count } = await this.applyFilters(query, params).count().exec();
    return count;
  }

  private applyFilters(
    query: UserQuery | UserScan,
    filters: Record<string, any>,
  ) {
    return Object.entries(filters).reduce(
      (acc: UserQuery | UserScan, [key, value]: [string, any]) =>
        acc.where(key).eq(value),
      query,
    );
  }
}
