import mongoose from 'mongoose';

// Define the schema for an Equipment Enquiry


// Define the User schema with an array of Equipment Enquiries
const userSchema = new mongoose.Schema({
  name: { type: String, },
  email: { type: String, },
  phone: { type: String,  },
  address: { type: String,  },
  subject: { type: String },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;
