import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType('Contact')
export class CompanyContact {
  @Field(() => ID)
  id: string;

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
