import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';

import { UpdateCompanyInput } from './dto/update-company.input';
import { Company, CompanyKey } from './model/company.model';
import { CompanyContact } from './model/company-contact.model';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel('company')
    private readonly model: Model<Company, CompanyKey>,
  ) {}

  async create(company: Company) {
    return await this.model.create(company);
  }

  async findAll() {
    return await this.model.scan().exec();
  }

  async findOne(id: string): Promise<Company | undefined> {
    return await this.model.get({ id });
  }

  async update({ id, ...input }: UpdateCompanyInput) {
    return await this.model.update({ id }, { ...input });
  }

  async remove(id: string) {
    return await this.model.delete({ id });
  }

  async createContact(companyId: string, contact: CompanyContact) {
    const company = await this.model.get({ id: companyId });
    if (!Array.isArray(company.contacts)) {
      company.contacts = [];
    }
    company.contacts.push(contact);
    return await this.model.update(company);
  }

  async updateContact(companyId: string, contact: CompanyContact) {
    const company = await this.model.get({ id: companyId });
    const index = company.contacts.findIndex(({ id }) => id === contact.id);
    company.contacts[index] = contact;
    return await this.model.update(company);
  }

  async removeContact(companyId: string, contactId: string) {
    const company = await this.model.get({ id: companyId });
    const index = company.contacts.findIndex(({ id }) => id === contactId);
    company.contacts.splice(index, 1);
    return await this.model.update(company);
  }
}
