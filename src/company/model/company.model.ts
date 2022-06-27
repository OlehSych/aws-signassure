import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { CompanyContact } from './company-contact.model';

export type CompanyKey = {
  id: string;
};

@ObjectType()
export class Company {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  logo?: string;

  @Field(() => Int, { nullable: true })
  usersCount?: number;

  @Field()
  isActive: boolean;

  @Field(() => [CompanyContact], { nullable: 'itemsAndList' })
  contacts: CompanyContact[];
}
