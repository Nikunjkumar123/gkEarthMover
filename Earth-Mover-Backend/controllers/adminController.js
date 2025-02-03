import model  from '../models/projectmodel.js'
import contact from '../models/contact.js'
import contacteqp from '../models/contacteqp.js'
import mongoose from 'mongoose';
const objectId = mongoose.Types.ObjectId;
import cloudinary from 'cloudinary'
import fs from 'fs'
import projectsShown from '../models/projectsShown.js';

const up = async(req,res)=>{
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
        use_filename:true,folder:'file-upload',
    })
    fs.unlinkSync(req.files.image.tempFilePath);
    const image = result.secure_url;
    // console.log(image);
}

const addCategories = async (req, res) => {
    try {
        // const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
        //   use_filename:true,folder:'file-upload',
        // })
        // fs.unlinkSync(req.files.image.tempFilePath);
        // const Image = result.secure_url;
        // console.log(Image);

      const { category } = req.body;
  
      if (!category) {
        return res.status(400).json({ message: 'Category name is required' });
      }
  
      const newCat = await model.create({ category });
  
      res.status(201).json({ message: 'Category added successfully', category: newCat });
    } catch (error) {
      res.status(500).json({ message: 'Error adding category', error: error.message });
    }
  };
  
const allCategories = async (req, res) => {
    try {
      const allCat = await model.find(); 
  
      if (allCat.length === 0) {
        return res.status(400).json({ message: 'No categories found' });
      }
  
      return res.status(200).json({
        message: 'Categories found successfully',
        categories: allCat,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error getting categories', error: error.message });
    }
  };
  
const addSubCategory = async(req,res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
            use_filename:true,folder:'file-upload',
        })
        fs.unlinkSync(req.files.image.tempFilePath);
        const Image = result.secure_url;
        // console.log(Image);

        const { categoryId } = req.params;
        const { Category, MachineName, CompanyName, Actions } = req.body;
        const findcat = await model.findById(categoryId);
        if(!findcat)  return res.status(404).json({ message: 'Category not found' });
        const newSubCat = { Category, MachineName, CompanyName, Image, Actions, products: [] };
        findcat.subCategories.push(newSubCat);
        await findcat.save();
        res.status(201).json({ message: 'Subcategory added successfully', findcat });
    } catch (error) {
        res.status(500).json({ message: 'Error adding subcategory', error: error.message });

  }
}
const getSubCategory = async (req, res) => {
    const { categoryId } = req.params; 
    try {
      const category = await model.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ subCategories: category.subCategories });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching subcategories', error: error.message });
    }
  };
  
const AddSubProducts = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
            use_filename:true,folder:'file-upload',
        })
        fs.unlinkSync(req.files.image.tempFilePath);
        const Image = result.secure_url;
      const { categoryId, subCategoryId } = req.params;
      const { Category, MachineName, CompanyName, Actions } = req.body;
  
      // Find the category by ID
      const findcat = await model.findById(categoryId);
      if (!findcat) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Find the subcategory by ID inside the category
      const findSubCat = findcat.subCategories.id(subCategoryId);
      if (!findSubCat) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
  
      // Create a new product object
      const newProduct = { Category, MachineName, CompanyName, Image, Actions };
  
      // Push the new product to the subcategory's products array
      findSubCat.products.push(newProduct);
  
      // Save the category document (this will automatically save the subcategory and product)
      await findcat.save();
  
      // Send success response with the updated category
      res.status(201).json({ message: 'Product added successfully', category: findcat });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product', error: error.message });
    }
  };
  
const allSubProducts = async (req, res) => {
    const { categoryId } = req.params;
  
    try {
      const category = await model.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      let allProducts = [];
  
      // Loop through each subcategory and collect its products
      category.subCategories.forEach(subCategory => {
        // Log each subcategory's products (for debugging)
        // console.log(subCategory.products);
  
        // Accumulate products into the allProducts array
        allProducts = [...allProducts, ...subCategory.products];
      });
  
      // Return the list of all products from subcategories
      res.status(200).json({ products: allProducts });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  };
  
const updateCate = async (req, res) => {
    try {
      const id = req.params.id;
  
      // Find the category by ID
      const findcat = await model.findById(id);
      if (!findcat) {
        return res.status(400).json({ msg: 'Category not found with this ID' });
      }
  
      // let Image;
  
      // Check if an image was uploaded in the request
      // if (req.files && req.files.image) {
      //   try {
      //     const imageFile = req.files.image; // Access the uploaded file
      //     // Upload to Cloudinary
      //     const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
      //       use_filename: true,
      //       folder: 'file-upload',
      //     });
  
      //     // Delete temp file after upload
      //     fs.unlinkSync(imageFile.tempFilePath);
  
      //     // Get the secure URL of the uploaded image
      //     Image = result.secure_url;
      //   } catch (uploadError) {
      //     console.error('Error uploading file:', uploadError.message);
      //     return res.status(500).json({ message: 'Error uploading image', error: uploadError.message });
      //   }
      // } else {
      //   // If no image is uploaded, preserve the old image if it exists
      //   Image = findcat.Image; // Keep the existing image URL if no new image is uploaded
      // }
  
      // Create the update data object, including the image if uploaded
      const updateData = {
        ...req.body,
        //Image,  This ensures the Image field gets updated (or preserved)
      };
  
      // Update the category in the database
      const updatedCategory = await model.findByIdAndUpdate(id, updateData, { new: true });
  
      return res.status(200).json({ msg: 'Category updated successfully', updatedCategory });
    } catch (error) {
      console.error('Error updating category:', error.message);
      return res.status(500).json({ msg: 'Error updating category', error: error.message });
    }
};

const deleteCat = async(req,res)=>{
    try {
        const id = req.params.id;
        const findcat = await model.findById(id);
        if (!findcat) {
            return res.status(400).json({ msg: 'Category not found with this ID' });
        }
        const deleteCategory = await model.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Category deleted successfully', deleteCategory });
    } catch (error) {
      res.status(500).json({ msg: 'Error deleted category', error: error.message });
    }
  };
const updateSubcat = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const subCategoryId = req.params.subCategoryId;
  
      const category = await model.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      const subCategory = category.subCategories.id(subCategoryId);
      if (!subCategory) {
        return res.status(404).json({ message: 'Sub-category not found' });
      }
  
      let Image;
  
      if (req.files && req.files.image) {
        try {
          const imageFile = req.files.image; // Access the uploaded file
          // console.log('File detected:', imageFile);
  
          // Upload to Cloudinary
          const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
            use_filename: true,
            folder: 'file-upload',
          });
  
          // Delete temp file
          fs.unlinkSync(imageFile.tempFilePath);
  
          // Save the secure URL
          Image = result.secure_url;
          // console.log('Uploaded Image URL:', Image);
        } catch (uploadError) {
          console.error('Error uploading file:', uploadError.message);
          return res.status(500).json({ message: 'Error uploading image', error: uploadError.message });
        }
      } else {
        console.log('No file uploaded.');
      }
  
      const { Category, MachineName, CompanyName, Actions } = req.body;
      subCategory.Category = Category || subCategory.Category;
      subCategory.MachineName = MachineName || subCategory.MachineName;
      subCategory.CompanyName = CompanyName || subCategory.CompanyName;
      subCategory.Image = Image || subCategory.Image;
      subCategory.Actions = Actions || subCategory.Actions;
  
      // Save the updated category document
      await category.save();
  
      res.status(200).json({ message: 'Sub-category updated successfully', updatedSubCategory: subCategory });
    } catch (error) {
      res.status(500).json({ message: 'Error updating sub-category', error: error.message });
    }
};
    
const deletesubcat = async (req, res) => {
    try {
      const { categoryId, subCategoryId } = req.params;
  
      const updatedCategory = await model.findByIdAndUpdate(
        categoryId,
        { $pull: { subCategories: { _id: subCategoryId } } },
        { new: true } 
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({ message: 'Sub-category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting sub-category', error: error.message });
    }
};
  
const updateProd = async (req, res) => {
    try {
      const { categoryId, subCategoryId, productId } = req.params;
      const category = await model.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      const subCategory = category.subCategories.id(subCategoryId);
      if (!subCategory) {
        return res.status(404).json({ message: 'Sub-category not found' });
      }
  
      const product = subCategory.products.id(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      let Image;
      if (req.files && req.files.image) {
        try {
          const imageFile = req.files.image; // Access the uploaded file
          // console.log('File detected:', imageFile);
  
          // Upload to Cloudinary
          const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
            use_filename: true,
            folder: 'file-upload',
          });
  
          // Delete temp file
          fs.unlinkSync(imageFile.tempFilePath);
  
          // Save the secure URL
          Image = result.secure_url;
          // console.log('Uploaded Image URL:', Image);
        } catch (uploadError) {
          console.error('Error uploading file:', uploadError.message);
          return res.status(500).json({ message: 'Error uploading image', error: uploadError.message });
        }
      } else {
        console.log('No file uploaded.');
      }

      const { Category, MachineName, CompanyName, Actions } = req.body;
      if (Category) product.Category = Category;
      if (MachineName) product.MachineName = MachineName;
      if (CompanyName) product.CompanyName = CompanyName;
      if (Image) product.Image = Image;
      if (Actions) product.Actions = Actions;
  
      await category.save();
  
      return res.status(200).json({ message: 'Product updated successfully', updatedProduct: product });
    } catch (error) {
      console.error('Error updating product:', error.message);
      return res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  };
   
  const deleteProd = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const subCategoryId = req.params.subCategoryId;
      const productId = req.params.productId;
  
      // Find the category by ID
      const category = await model.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Find the sub-category by ID
      const subCategory = category.subCategories.id(subCategoryId);
      if (!subCategory) {
        return res.status(404).json({ message: 'Sub-category not found' });
      }
  
      // Pull the product from the sub-category's products array
      const updatedSubCategory = await model.findOneAndUpdate(
        { _id: categoryId, 'subCategories._id': subCategoryId },
        {
          $pull: { 'subCategories.$.products': { _id: productId } },
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedSubCategory) {
        return res.status(404).json({ message: 'Failed to delete product. Product not found.' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
  };
  
  const contactus = async (req, res) => {
    try {
      const { name, email, phone, message, address, subject, comment } = req.body;
  
      // if (!name || !email || !phone || !message) {
      //   return res.status(400).json({ msg: "All fields are required" });
      // }
  
      const person = await contact.create({ name, email, phone, message, address, subject, comment });
  
      return res.status(201).json({ msg: "New enquiry user added", person: person });
    } catch (error) {
      res.status(500).json({ message: "Error adding contact us", error: error.message });
    }
  };
  
  const alluserContact = async (req, res) => {
    try {
      const allContacts = await contact.find();
  
      if (!allContacts || allContacts.length === 0) {
        return res.status(404).json({ msg: 'No contact inquiries found' });
      }
  
      return res.status(200).json({ msg: 'Contact inquiries retrieved successfully', contacts: allContacts });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving contact inquiries', error: error.message });
    }
  };
  
const updateContact = async (req, res) => {
    try {
      const id = req.params.id;  
  
      const updatedContact = await contact.findOneAndUpdate(
        { _id: id }, 
       req.body,
        {  new: true, runValidators: true }
      );
  
      if (!updatedContact) {
        return res.status(400).json({ msg: "Contact not found with this ID" });
      }
  
      res.status(200).json({ msg: "Contact updated successfully", updatedContact });
    } catch (error) {
      res.status(500).json({ msg: "Error updating contact", error: error.message });
    }
  };
  
const deleteContact = async (req, res) => {
    try {
      const id = req.params.id;  
  
      const deletedContact = await contact.findByIdAndDelete(id);
  
      if (!deletedContact) {
        return res.status(400).json({ msg: "Contact not found with this ID" });
      }
  
      res.status(200).json({ msg: "Contact deleted successfully", deletedContact });
    } catch (error) {
      res.status(500).json({ msg: "Error deleting contact", error: error.message });
    }
};
  
// const EquipmentDetail = require('../models/EquipmentDetail'); // Import the model

const addEquipDetail = async (req, res) => {
  try {
    const { equipmentName, company, name, phone, email, address } = req.body;

    const newEquipDetail = await contacteqp.create({
      equipmentName,
      company,
      name,
      phone,
      email,
      address,
    });

    res.status(200).json({ msg: 'Equipment details added successfully', data: newEquipDetail });
  } catch (error) {
    res.status(500).json({ msg: 'Error adding equipment details', error: error.message });
  }
};

  
const getequipdetail  = async (req, res) => {
    try {
      const all = await contacteqp.find();
      if(!all) return res.status(400).json({mgg:"no data Available"});
      return res.status(201).json({all:all});
    } catch (error) {
      res.status(500).json({ msg: 'Error fetching equipment details', error: error.message });
    }
};
  
const updateEqp = async (req, res) => {
    try {
      const contactId = req.params.contactId;
      const equipmentId = req.params.equipmentId;
  
      const { equipmentName, company, name, phone, email ,address} = req.body;
  
      // Use findOneAndUpdate to update the equipment inside the contact
      const updatedContact = await contact.findOneAndUpdate(
        { _id: contactId, "equipmentEnquiries._id": equipmentId },
        {
          $set: {
            "equipmentEnquiries.$.equipmentName": equipmentName,
            "equipmentEnquiries.$.company": company,
            "equipmentEnquiries.$.name": name,
            "equipmentEnquiries.$.phone": phone,
            "equipmentEnquiries.$.email": email,
            "equipmentEnquiries.$.address": address
          }
        },
        { new: true } // This option returns the modified document
      );
  
      if (!updatedContact) {
        return res.status(404).json({ msg: 'Equipment not found' });
      }
  
      res.status(200).json({ msg: 'Equipment updated successfully', updatedContact });
    } catch (error) {
      res.status(500).json({ msg: 'Error updating equipment', error: error.message });
    }
};
  
  
const deleteEqp = async (req, res) => {
    try {
      const { equipmentId } = req.params;
  
      // Use mongoose.Types.ObjectId without 'new' or just pass the string directly
      const updatedContact = await contacteqp.findByIdAndDelete(equipmentId);
      if (!updatedContact) {
        return res.status(404).json({ msg: 'equipment not found' });
      }
  
      res.status(200).json({ msg: 'Equipment enquiry deleted successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Error deleting equipment enquiry', error: error.message });
    }
};
  
const singleCategories = async(req,res)=>{
  try {
    const id = req.params.id;
    const data=await model.findById(id);
    if(!data) return res.status(400).json({msg:'no data found with this id'});
    return res.status(201).json({data:data});
  } catch (error) {
      return res.status(500).json({error:error});
  }
}

const singleSubCat = async (req, res) => {
  const { categoryId, subCategoryId } = req.params;

  try {
    // Find the category by categoryId
    const category = await model.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find the specific subcategory by subCategoryId within the category's subCategories array
    const subCategory = category.subCategories.id(subCategoryId);

    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    // Return the subcategory data as a response
    res.status(200).json(subCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching subcategory', error: error.message });
  }
};

const addProjects = async(req,res)=>{
    try {
      const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
        use_filename:true,folder:'file-upload',
    })
    fs.unlinkSync(req.files.image.tempFilePath);
    const image = result.secure_url;
    // console.log(image);
    const {description,status} = req.body;
    const proj = await projectsShown.create({image,description,status});
    if(!proj) return res.status(400).json({msg:"projects Adding failed"});
    return res.status(201).json({msg:"Projects added successfully"});
  } catch (error) {
    return res.status(500).json({error:error});
  }
}
const allProjects = async(req,res)=>{
  try {
    const all = await projectsShown.find();
    if(!all) return res.status(404).json({msg:"projects not found"});
    return res.status(201).json({msg:all});
  } catch (error) {
    return res.status(500).json({error:error});
  }
}

const deleteProject = async(req,res)=>{
  const id = req.params.id;
  await projectsShown.findByIdAndDelete(id);
  return res.status(200).json({msg:"deleted successfully"});
}
const completedProject = async (req, res) => {
  try {
    // Find all projects with status 'completed'
    const all = await projectsShown.find({ status: 'completed' });

    // Check if any projects were found
    if (!all || all.length === 0) {
      return res.status(400).json({ msg: 'No completed Projects found' });
    }

    // Return the list of completed projects
    return res.status(200).json({ msg: all });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ error: error.message });
  }
};

const upcomingProject = async (req, res) => {
  try {
    const all = await projectsShown.find({ status: 'upcoming' });
    if (!all || all.length === 0) {
      return res.status(404).json({ msg: 'No upcoming projects found' });
    }
    return res.status(200).json({ msg: all }); // Send the fetched data in the response
  } catch (error) {
    return res.status(500).json({ error: error.message }); // Provide detailed error message
  }
};

  
export  {addCategories,allCategories,addSubCategory,getSubCategory,AddSubProducts,allSubProducts,updateCate,deleteCat,updateSubcat,deletesubcat,updateProd,deleteProd,contactus,alluserContact,updateContact,deleteContact,addEquipDetail,getequipdetail,updateEqp,deleteEqp,up,singleCategories,singleSubCat,addProjects,allProjects,deleteProject,completedProject,upcomingProject}