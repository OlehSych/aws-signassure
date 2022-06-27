import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { User } from './model/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserPasswordInput } from './dto/create-password.input';
import { UpdateUserPasswordInput } from './dto/update-password.input';
import { CountUsersInput } from './dto/count-users.input';
import { InviteUserInput } from './dto/invite-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => Boolean)
  async createUserPassword(
    @Args('createUserPasswordInput')
    createUserPasswordInput: CreateUserPasswordInput,
  ) {
    return this.usersService.createPassword(createUserPasswordInput);
  }

  @Mutation(() => Boolean)
  async updateUserPassword(
    @Args('updateUserPasswordInput')
    updateUserPasswordInput: UpdateUserPasswordInput,
  ) {
    return this.usersService.updatePassword(updateUserPasswordInput);
  }

  @Mutation(() => Boolean)
  resetUserPassword(
    @Args('id', { type: () => ID }) id: string,
    @Args('companyId', { type: () => ID }) companyId: string,
  ) {
    return this.usersService.resetPassword(id, companyId);
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args('companyId') companyId: string) {
    return this.usersService.findAll(companyId);
  }

  @Query(() => Int)
  usersCount(@Args('countUsersInput') countUsersInput: CountUsersInput) {
    return this.usersService.countByParams(countUsersInput);
  }

  @Query(() => User, { name: 'user', nullable: true })
  findOne(
    @Args('id', { type: () => ID }) id: string,
    @Args('companyId', { type: () => ID }) companyId: string,
  ) {
    return this.usersService.findOne(id, companyId);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  @Mutation(() => ID)
  removeUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('companyId', { type: () => ID }) companyId: string,
  ) {
    return this.usersService.remove(id, companyId);
  }

  @Mutation(() => Boolean)
  inviteUser(@Args('inviteUserInput') inviteUserInput: InviteUserInput) {
    return this.usersService.inviteUser(inviteUserInput);
  }
}
