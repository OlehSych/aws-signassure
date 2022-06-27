import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordInput {
  @Field()
  id: string;

  @Field()
  companyId: string;

  @Field()
  password: string;
}
