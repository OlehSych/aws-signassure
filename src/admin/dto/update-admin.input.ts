import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAdminInput {
  @Field(() => ID)
  id: string;

  @Field()
  fullName: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;
}
