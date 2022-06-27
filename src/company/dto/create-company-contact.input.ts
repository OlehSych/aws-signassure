import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateCompanyContactInput {
  @Field(() => ID)
  companyId: string;

  @Field()
  name: string;

  @Field()
  role: string;

  @Field()
  company: string;

  @Field()
  phone: string;

  @Field()
  email: string;
}
