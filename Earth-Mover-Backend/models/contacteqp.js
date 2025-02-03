import mongoose from 'mongoose';

const equipmentEnquirySchema = new mongoose.Schema({
  equipmentName: { type: String, required: true },
  company: { type: String },
  name: { type: String },
  phone: { type: String },  
  email: { type: String },
  address: { type: String },
  enquiryDate: { type: Date, default: Date.now },
});

const EquipmentEnquiry = mongoose.model('EquipmentEnquiry', equipmentEnquirySchema);

export default EquipmentEnquiry;
