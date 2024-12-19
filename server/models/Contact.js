import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  company: String,
  position: String,
  tags: [String],
  socialProfiles: {
    linkedin: String,
    twitter: String
  },
  lastContactedAt: Date,
  organizationId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Contact = mongoose.model('Contact', contactSchema);