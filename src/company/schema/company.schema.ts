import { Schema } from 'dynamoose';

export const CompanySchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: String,
  address: String,
  phoneNumber: String,
  logo: String,
  isActive: Boolean,
  contacts: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          id: String,
          name: String,
          role: String,
          company: String,
          phone: String,
          email: String,
        },
      },
    ],
  },
});
