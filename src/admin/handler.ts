import 'reflect-metadata';
import { Handler } from 'aws-lambda';

import { bootstrap } from '../';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

/**
 * This function is designed only for developer purpose.
 * Should be invoked directly from the aws web interface.
 * Event object should be represented as CreateAdminInput.
 */
export const createAdmin: Handler = async (event: CreateAdminDto) => {
  return (await bootstrap()).get(AdminService).create(event);
};

export const updateAdmin: Handler = async (event) => {
  const { updateAdminInput } = event.arguments;

  return (await bootstrap()).get(AdminResolver).updateAdmin(updateAdminInput);
};

export const getAdmin: Handler = async (event) => {
  const { id } = event.arguments;

  return (await bootstrap()).get(AdminResolver).findOne(id);
};
