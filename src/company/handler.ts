import 'reflect-metadata';
import { Handler } from 'aws-lambda';

import { bootstrap } from '../';
import { CompanyResolver } from './company.resolver';

export const createCompany: Handler = async (event) => {
  const { createCompanyInput } = event.arguments;

  return (await bootstrap())
    .get(CompanyResolver)
    .createCompany(createCompanyInput);
};

export const activateCompany: Handler = async (event) => {
  const { id } = event.arguments;

  return (await bootstrap()).get(CompanyResolver).activateCompany(id);
};

export const updateCompany: Handler = async (event) => {
  const { updateCompanyInput } = event.arguments;

  return (await bootstrap())
    .get(CompanyResolver)
    .updateCompany(updateCompanyInput);
};

export const getCompanies: Handler = async (_event) => {
  return (await bootstrap()).get(CompanyResolver).findAll();
};

export const getCompany: Handler = async (event) => {
  const { id } = event.arguments;

  return (await bootstrap()).get(CompanyResolver).findOne(id);
};

export const removeCompany: Handler = async (event) => {
  const { id } = event.arguments;

  return (await bootstrap()).get(CompanyResolver).removeCompany(id);
};

export const createCompanyContact: Handler = async (event) => {
  const { createCompanyContactInput } = event.arguments;

  return (await bootstrap())
    .get(CompanyResolver)
    .createCompanyContact(createCompanyContactInput);
};

export const updateCompanyContact: Handler = async (event) => {
  const { updateCompanyContactInput } = event.arguments;

  return (await bootstrap())
    .get(CompanyResolver)
    .updateCompanyContact(updateCompanyContactInput);
};

export const removeCompanyContact: Handler = async (event) => {
  const { companyId, contactId } = event.arguments;

  return (await bootstrap())
    .get(CompanyResolver)
    .removeCompanyContact(companyId, contactId);
};
