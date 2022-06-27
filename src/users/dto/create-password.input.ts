import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserPasswordInput {
  @Field()
  id: string;

  @Field()
  companyId: string;

  @Field()
  activationKey: string;

  @Field()
  password: string;
}
