import { InputType, Field, ID } from '@nestjs/graphql';

import { CreateCompanyContactInput } from './create-company-contact.input';

@InputType()
export class UpdateCompanyContactInput extends CreateCompanyContactInput {
  @Field(() => ID)
  id: string;
}
