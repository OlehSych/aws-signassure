import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';

import { Company } from './model/company.model';
import { UsersService } from '../users/users.service';
import { CompanyRepository } from './company.repository';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { CreateCompanyContactInput } from './dto/create-company-contact.input';
import { UpdateCompanyContactInput } from './dto/update-company-contact.input';

@Injectable()
export class CompanyService {
  constructor(
    private readonly usersService: UsersService,
    private readonly repository: CompanyRepository,
  ) {}

  async create(input: CreateCompanyInput): Promise<Company> {
    return await this.repository.create({
      ...input,
      id: uuid.v4(),
      isActive: false,
      contacts: [],
    });
  }

  async activate(companyId: string): Promise<Company> {
    const users = await this.usersService.findAll(companyId, [
      'id',
      'email',
      'activationKey',
    ]);
    await Promise.all(
      users.map(async ({ id, email, activationKey }) => {
        try {
          await this.usersService.invite({
            id,
            email,
            companyId,
            activationKey,
          });
        } catch (err) {
          console.error(email, err);
        }
      }),
    );
    return await this.repository.update({ id: companyId, isActive: true });
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.repository.findAll();
    return await Promise.all(
      companies.map(async (company) => {
        const usersCount = await this.usersService.countByParams({
          companyId: company.id,
        });
        return {
          ...company,
          usersCount,
        };
      }),
    );
  }

  async findOne(id: string): Promise<Company | undefined> {
    const company = await this.repository.findOne(id);
    if (company) {
      company.usersCount = await this.usersService.countByParams({
        companyId: company.id,
      });
    }
    return company;
  }

  async update(updateCompanyInput: UpdateCompanyInput): Promise<Company> {
    return await this.repository.update(updateCompanyInput);
  }

  async remove(companyId: string): Promise<string> {
    await this.repository.remove(companyId);
    await this.usersService.removeCompanyUsers(companyId);
    return companyId;
  }

  async createContact({
    companyId,
    ...contact
  }: CreateCompanyContactInput): Promise<Company> {
    return await this.repository.createContact(companyId, {
      ...contact,
      id: uuid.v4(),
    });
  }

  async updateContact({
    companyId,
    ...contact
  }: UpdateCompanyContactInput): Promise<Company> {
    return await this.repository.updateContact(companyId, contact);
  }

  async removeContact(companyId: string, contactId: string): Promise<Company> {
    return await this.repository.removeContact(companyId, contactId);
  }
}
