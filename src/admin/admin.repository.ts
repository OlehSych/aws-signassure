import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';

import { Admin, AdminKey } from './model/admin.model';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectModel('admin')
    private readonly model: Model<Admin, AdminKey>,
  ) {}

  async create(input: Admin): Promise<Admin> {
    return await this.model.create(input);
  }

  async findOne(id: string): Promise<Admin | void> {
    return await this.model.get({ id });
  }

  async update(id: string, input: Partial<Admin>): Promise<Admin> {
    return await this.model.update({ id }, { ...input });
  }
}
