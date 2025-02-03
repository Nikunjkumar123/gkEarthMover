import mongoose from 'mongoose'

const projectsShown = new mongoose.Schema({
    image:{
        type:String,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        enum:['completed','upcoming'],  
    }
})

const projectsho = mongoose.model('projectsho', projectsShown);

export default projectsho;