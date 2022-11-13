import { Schema, model} from 'mongoose';
import { UserType } from '../helpers/enums.helper';

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    required: true
  },
  email: {
    type: String,
    index: true,
    required: true,
    unique: true
  },
  phoneNumber: Number,
  password: {
    type: String,
    required: true
  },
  roles: [
    {
      type: String,
      default: UserType.EMPLOYEE
    }
  ] 
}, {
  timestamps: true,
});

export const userModel = model('User', userSchema);