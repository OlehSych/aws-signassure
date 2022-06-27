import { CreateCompanyInput } from './create-company.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  isActive: boolean;
}
