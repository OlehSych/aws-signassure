import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType('Role')
export class UserRole {
  @Field()
  isBoardMember: boolean;

  @Field()
  isSigningOfficer: boolean;

  @Field()
  isDelegateAuthority: boolean;

  @Field()
  isOfficerOfOrganization: boolean;

  @Field()
  isAdmin: boolean;
}
