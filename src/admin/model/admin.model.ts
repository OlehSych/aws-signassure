import { Field, ID, ObjectType } from '@nestjs/graphql';

export type AdminKey = {
  id: string;
};

@ObjectType()
export class Admin {
  @Field(() => ID)
  id: string;

  @Field()
  fullName: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;
}
