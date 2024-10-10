
import { defineMongooseModel } from '#nuxt/mongoose'
import { User } from '#auth-utils'



export const UserSchema = defineMongooseModel<User>({
  name: 'User',
  schema: {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
      default: 'Hermosillo',
    },
    country: {
      type: String,
      default: 'MX',
    },
    phone: {
      type: String,
      required: true,
    },
    ine: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
    }
  },
  options: {
    timestamps: true,
  }
})


