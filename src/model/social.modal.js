import mongoose from "mongoose";

const contactDetailSchema = new mongoose.Schema({
  telegram: {
    type: String,
    trim: true,
    sparse: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email'],
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const ContactDetail = mongoose.model('ContactDetail', contactDetailSchema);

export default ContactDetail;
