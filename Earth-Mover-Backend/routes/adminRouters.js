import express from 'express';

const adminRouters = express.Router();

import { addCategories, allCategories ,addSubCategory,getSubCategory,AddSubProducts,allSubProducts,updateCate,deleteCat,updateSubcat,deletesubcat,updateProd,deleteProd,contactus,alluserContact,updateContact,deleteContact,addEquipDetail,getequipdetail,updateEqp,deleteEqp,up,singleCategories,singleSubCat,addProjects,allProjects,deleteProject,completedProject,upcomingProject} from "../controllers/adminController.js";

adminRouters.route('/categories').post(addCategories).get(allCategories);

adminRouters.route('/categories/single/:id').get(singleCategories);

adminRouters.route('/edit-update/cat/:id').patch(updateCate).delete(deleteCat);

adminRouters.route('/categories/:categoryId/subcategories').post(addSubCategory).get(getSubCategory);

adminRouters.route('/categories/edit-update/:categoryId/:subCategoryId').patch(updateSubcat).delete(deletesubcat).get(singleSubCat);

adminRouters.route('/cate/:categoryId/:subCategoryId').get(singleSubCat );

adminRouters.route('/categories/:categoryId/subcategories/:subCategoryId/products').post(AddSubProducts).get(allSubProducts);

adminRouters.route('/edit-update/prod/:categoryId/:subCategoryId/:productId').patch(updateProd).delete(deleteProd);

//////////////////////////////////////////////////////////

adminRouters.route('/user/contact-us').post(contactus).get(alluserContact);
adminRouters.route('/user/up-ed/contact/:id').patch(updateContact).delete(deleteContact);

adminRouters.route('/user/contact').post(addEquipDetail).get(getequipdetail)
adminRouters.route('/enquiry/up-ed/:equipmentId').patch(updateEqp).delete(deleteEqp);

adminRouters.route('/projects/all').post(addProjects).get(allProjects);
adminRouters.route('/projects/all/:id').delete(deleteProject);
adminRouters.route('/project/completed').get(completedProject);
adminRouters.route('/project/upcoming').get(upcomingProject);

adminRouters.route('/df').post(up);
export default adminRouters;
