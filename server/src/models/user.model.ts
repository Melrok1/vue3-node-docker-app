import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [20, 'Name cannot exceed 20 characters'],
    unique: true
  },
 email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+@.+\..+/, 'Invalid email format'],
    unique: true
  }
},
{
  timestamps: true,
  strict: 'throw'
})

export const User = mongoose.model('User', userSchema)