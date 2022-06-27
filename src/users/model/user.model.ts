import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserRole } from './user-role.model';

export type UserKey = {
  id: string;
  companyId: string;
};

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  companyId: string;

  @Field()
  fullName: string;

  @Field()
  jobTitle: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  signature?: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field()
  isActive: boolean;

  activationKey: string;

  @Field()
  onboarding: boolean;

  @Field()
  agreement: boolean;
}
