import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';

import { CompanyService } from './company.service';
import { Company } from './model/company.model';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { CreateCompanyContactInput } from './dto/create-company-contact.input';
import { UpdateCompanyContactInput } from './dto/update-company-contact.input';

@Injectable()
@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => Company)
  createCompany(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  ) {
    return this.companyService.create(createCompanyInput);
  }

  @Mutation(() => Company)
  activateCompany(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.activate(id);
  }

  @Query(() => [Company], { name: 'companies' })
  findAll() {
    return this.companyService.findAll();
  }

  @Query(() => Company, { name: 'company', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.findOne(id);
  }

  @Mutation(() => Company)
  updateCompany(
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
  ) {
    return this.companyService.update(updateCompanyInput);
  }

  @Mutation(() => ID)
  removeCompany(@Args('id', { type: () => ID }) id: string) {
    return this.companyService.remove(id);
  }

  @Mutation(() => Company)
  createCompanyContact(
    @Args('createCompanyContactInput')
    createCompanyContactInput: CreateCompanyContactInput,
  ) {
    return this.companyService.createContact(createCompanyContactInput);
  }

  @Mutation(() => Company)
  updateCompanyContact(
    @Args('updateCompanyContactInput')
    updateCompanyContactInput: UpdateCompanyContactInput,
  ) {
    return this.companyService.updateContact(updateCompanyContactInput);
  }

  @Mutation(() => Company)
  removeCompanyContact(
    @Args('companyId', { type: () => ID }) companyId: string,
    @Args('contactId', { type: () => ID }) contactId: string,
  ) {
    return this.companyService.removeContact(companyId, contactId);
  }
}
