const  mongoose=require("mongoose")
const schema=mongoose.Schema
const faq_schema=new schema({
    question_username:{
        required:false,
        type:String
    },
    question:{
        required:false,
        type:String
    },
    answer_lawyername:{
        required:false,
        type:String,
        default:'not'
    },
    answer:{
        required:false,
        type:String,
        default:'not_answered'
    },
    is_answered:{
        required:false,
        type:String,
        default:'0'
    },
    is_viewed:{
        required:false,
        type:String,
        default:'0'
    }
},{versionKey:false})
const faq_model=mongoose.model('faqs',faq_schema)
module.exports=faq_model