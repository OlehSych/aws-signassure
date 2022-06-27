import { Schema } from 'dynamoose';

const UserRoleSchema = new Schema({
  isBoardMember: Boolean,
  isSigningOfficer: Boolean,
  isDelegateAuthority: Boolean,
  isOfficerOfOrganization: Boolean,
  isAdmin: Boolean,
});

export const UserSchema = new Schema({
  id: {
    type: String,
    rangeKey: true,
  },
  companyId: {
    type: String,
    hashKey: true,
  },
  fullName: String,
  jobTitle: String,
  phoneNumber: String,
  email: String,
  address: String,
  signature: String,
  isActive: Boolean,
  activationKey: String,
  role: UserRoleSchema,
  onboarding: Boolean,
  agreement: Boolean,
});
