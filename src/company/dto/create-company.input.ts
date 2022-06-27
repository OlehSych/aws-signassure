import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanyInput {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  logo?: string;
}
