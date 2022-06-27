import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { AdminService } from './admin.service';
import { Admin } from './model/admin.model';
import { UpdateAdminInput } from './dto/update-admin.input';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Query(() => Admin, { name: 'admin', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.adminService.findOne(id);
  }

  @Mutation(() => Admin)
  updateAdmin(@Args('updateAdminInput') updateAdminInput: UpdateAdminInput) {
    return this.adminService.update(updateAdminInput);
  }
}
