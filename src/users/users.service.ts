import * as uuid from 'uuid';
import { URLSearchParams } from 'url';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CognitoService } from '../cognito/cognito.service';
import { MailerService } from '../mailer/mailer.service';
import { UsersRepository } from './users.repository';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CountUsersInput } from './dto/count-users.input';
import { CreateUserPasswordInput } from './dto/create-password.input';
import { UpdateUserPasswordInput } from './dto/update-password.input';
import { ActivationLinkDto } from './dto/activation-link.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { InviteUserInput } from './dto/invite-user.input';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly configService: ConfigService,
    private readonly cognitoService: CognitoService,
    private readonly mailerService: MailerService,
  ) {}

  static validateUserExistence(user: User | void): User {
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async create(input: CreateUserInput) {
    const { companyId, email } = input;
    const { Username } = await this.cognitoService.createUser(companyId, email);
    return await this.repository.create({
      ...input,
      id: Username as string,
      isActive: false,
      onboarding: false,
      agreement: false,
      activationKey: uuid.v4(),
    });
  }

  async findOne(id: string, companyId: string): Promise<User | void> {
    return await this.repository.findOne(id, companyId);
  }

  async findAll(companyId: string, selectOnly?: string[]): Promise<User[]> {
    return await this.repository.findAll(companyId, selectOnly);
  }
  // TODO: refactor
  async update({ id, companyId, ...input }: UpdateUserInput): Promise<User> {
    const user = UsersService.validateUserExistence(
      await this.repository.findOne(id, companyId),
    );
    const { onboarding, agreement, email } = input;
    if (onboarding) {
      await this.cognitoService.updateUserCustomAttribute(
        user.email,
        'onboarding',
        onboarding.toString(),
      );
    }
    if (agreement) {
      await this.cognitoService.updateUserCustomAttribute(
        user.email,
        'agreement',
        agreement.toString(),
      );
    }
    if (email) {
      if (user.email !== email) {
        await this.cognitoService.updateUserEmail(user.email, email);
      }
    }
    return await this.repository.update(id, companyId, input);
  }

  private buildActivationLink(dto: ActivationLinkDto): string {
    const clientUrl = this.configService.get('APP_CLIENT_URL');
    const params = new URLSearchParams(dto).toString();
    return `${clientUrl}/create-password?${params}`;
  }

  async invite(dto: InviteUserDto): Promise<void> {
    const { id, companyId, activationKey, email } = dto;
    const link = this.buildActivationLink({
      id,
      companyId,
      activationKey,
    });
    await this.mailerService.sendInvitationEmail(email, link);
  }

  async inviteUser({ id, companyId }: InviteUserInput): Promise<boolean> {
    const { email, activationKey } = UsersService.validateUserExistence(
      await this.findOne(id, companyId),
    );
    await this.invite({ id, companyId, email, activationKey });
    return true;
  }

  async changePassword(user: User | void, password: string): Promise<boolean> {
    const { id, companyId, email } = UsersService.validateUserExistence(user);
    await this.cognitoService.updateUserPassword(email, password);
    await this.repository.update(id, companyId, {
      activationKey: undefined,
      isActive: true,
    });
    return true;
  }

  async createPassword(input: CreateUserPasswordInput): Promise<boolean> {
    const { id, companyId, activationKey, password } = input;
    const user = await this.findOne(id, companyId);
    if (user?.activationKey !== activationKey) {
      throw new Error('User activation key expired');
    }
    return this.changePassword(user, password);
  }

  async updatePassword(input: UpdateUserPasswordInput): Promise<boolean> {
    const { id, companyId, password } = input;
    const user = await this.findOne(id, companyId);
    return this.changePassword(user, password);
  }

  async resetPassword(id: string, companyId: string): Promise<boolean> {
    const activationKey = uuid.v4();
    const { email } = await this.repository.update(id, companyId, {
      activationKey,
    });
    const link = this.buildActivationLink({
      id,
      companyId,
      activationKey,
    });
    await this.mailerService.sendResetPasswordEmail(email, link);
    return true;
  }

  async remove(id: string, companyId: string): Promise<string> {
    const { email } = UsersService.validateUserExistence(
      await this.repository.findOne(id, companyId),
    );
    await this.cognitoService.deleteUser(email);
    await this.repository.remove(id, companyId);
    return id;
  }

  async removeCompanyUsers(companyId: string): Promise<void> {
    const users = await this.repository.findAll(companyId, ['id', 'email']);
    if (users.length) {
      await Promise.all(
        users.map(({ email }) => this.cognitoService.deleteUser(email)),
      );
      const ids = users.map(({ id }) => id);
      await this.repository.removeMany(ids, companyId);
    }
  }

  async countByParams(countUsersInput: CountUsersInput): Promise<number> {
    return await this.repository.countByParams(countUsersInput);
  }
}
