import { Schema, model} from 'mongoose';
import { UserType } from 'src/helpers/enums.helper';

const userSchema = new Schema({
  userName: {
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
      type: UserType,
      default: UserType.EMPLOYEE
    }
  ] 
}, {
  timestamps: true,
});

export const userModel = model('User', userSchema);