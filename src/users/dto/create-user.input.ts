import { InputType, Field, ID } from '@nestjs/graphql';

import { UserRole } from '../model/user-role.model';

@InputType()
export class CreateUserInput {
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
}
