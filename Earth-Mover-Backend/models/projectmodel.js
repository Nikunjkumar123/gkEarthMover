import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  Category: { type: String, required: true },
  MachineName: { type: String },
  CompanyName: { type: String },
  Image: { type: [String] }, 
  Actions: { type: String ,enum:['Active','Deactive'],},
});


const subCategorySchema = new mongoose.Schema({
  Category: { type: String, required: true },
  MachineName: { type: String },
  CompanyName: { type: String },
  Image: { type: String },
  Actions: { type: String ,enum:['Active','Deactive'],default:"Active"},
  products: [productSchema],

});


const categorySchema = new mongoose.Schema({
    category: { type: String, required: true },
    Image: { type: String },
    Actions:{
    type:String,
    enum:['Active','Deactive'],
    default:'Active',
  },
  subCategories: [subCategorySchema],
});


const Category = mongoose.model('Category', categorySchema);

export default Category;
