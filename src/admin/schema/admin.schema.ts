import { Schema } from 'dynamoose';

export const AdminSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  fullName: String,
  phoneNumber: String,
  email: String,
});
