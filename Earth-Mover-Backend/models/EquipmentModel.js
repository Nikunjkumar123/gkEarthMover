import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    equipment: {
        type: String,
        required: true
    },
    subcategories: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        Image : {
            type : String,
        },
        product : {
            productName :{
                type : String,
                required : true,
            },
            Image: {
                type : String
            }
        },
    }
});

const Equipment = mongoose.model('Equipment', equipmentSchema);
export default Equipment;