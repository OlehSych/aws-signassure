import { Injectable } from '@nestjs/common';

import { AdminRepository } from './admin.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminInput } from './dto/update-admin.input';
import { Admin } from './model/admin.model';
import { CognitoService } from '../cognito/cognito.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly repository: AdminRepository,
    private readonly cognitoService: CognitoService,
  ) {}

  static validateAdminExistence(admin: Admin | void): Admin {
    if (!admin) {
      throw new Error('Admin not found');
    }
    return admin;
  }

  async create(input: CreateAdminDto): Promise<Admin> {
    const { Username } = await this.cognitoService.createAdmin(
      input.email,
      input.password,
    );
    return await this.repository.create({
      ...input,
      id: Username as string,
    });
  }

  async findOne(id: string): Promise<Admin | void> {
    return await this.repository.findOne(id);
  }

  async update({ id, ...input }: UpdateAdminInput): Promise<Admin> {
    if (input.email) {
      const admin = AdminService.validateAdminExistence(
        await this.repository.findOne(id),
      );
      if (admin.email !== input.email) {
        await this.cognitoService.updateAdminEmail(admin.email, input.email);
      }
    }
    return await this.repository.update(id, input);
  }
}
