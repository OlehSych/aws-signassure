import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FileInput {
  @Field({ nullable: true })
  userId?: string;

  @Field()
  companyId: string;

  @Field()
  filename: string;
}
