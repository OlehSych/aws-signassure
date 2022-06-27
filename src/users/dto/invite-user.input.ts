import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InviteUserInput {
  @Field()
  id: string;

  @Field()
  companyId: string;
}
