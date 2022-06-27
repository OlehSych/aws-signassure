import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CountUsersInput {
  @Field(() => ID)
  companyId: string;
}
