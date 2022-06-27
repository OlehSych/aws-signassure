import 'reflect-metadata';
import { Handler } from 'aws-lambda';

import { bootstrap } from '../';
import { UsersResolver } from './users.resolver';

export const createUser: Handler = async (event) => {
  const { createUserInput } = event.arguments;

  return (await bootstrap()).get(UsersResolver).createUser(createUserInput);
};

export const updateUser: Handler = async (event) => {
  const { updateUserInput } = event.arguments;

  return (await bootstrap()).get(UsersResolver).updateUser(updateUserInput);
};

export const getUsers: Handler = async (event) => {
  const { companyId } = event.arguments;

  return (await bootstrap()).get(UsersResolver).findAll(companyId);
};

export const getUser: Handler = async (event) => {
  const { id, companyId } = event.arguments;

  return (await bootstrap()).get(UsersResolver).findOne(id, companyId);
};

export const removeUser: Handler = async (event) => {
  const { id, companyId } = event.arguments;

  return (await bootstrap()).get(UsersResolver).removeUser(id, companyId);
};

export const usersCount: Handler = async (event) => {
  const { countUsersInput } = event.arguments;

  return (await bootstrap()).get(UsersResolver).usersCount(countUsersInput);
};

export const createUserPassword: Handler = async (event) => {
  const { createUserPasswordInput } = event.arguments;

  return (await bootstrap())
    .get(UsersResolver)
    .createUserPassword(createUserPasswordInput);
};

export const updateUserPassword: Handler = async (event) => {
  const { updateUserPasswordInput } = event.arguments;

  return (await bootstrap())
    .get(UsersResolver)
    .updateUserPassword(updateUserPasswordInput);
};

export const resetUserPassword: Handler = async (event) => {
  const { id, companyId } = event.arguments;

  return (await bootstrap())
    .get(UsersResolver)
    .resetUserPassword(id, companyId);
};

export const inviteUser: Handler = async (event) => {
  const { inviteUserInput } = event.arguments;

  return (await bootstrap()).get(UsersResolver).inviteUser(inviteUserInput);
};
