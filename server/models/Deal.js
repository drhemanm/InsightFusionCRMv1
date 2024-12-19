import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: Number, required: true },
  stage: {
    type: String,
    enum: ['lead', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost'],
    default: 'lead'
  },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, required: true },
  expectedCloseDate: Date,
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Deal = mongoose.model('Deal', dealSchema);