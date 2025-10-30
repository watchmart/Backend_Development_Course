import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        default : "Not Given"
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        default : "user"
    },
    isEmailVerified : {
        type : Boolean,
        default : false,
    },
    image : {
        type : String,
        default: "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
    }

})

const User = mongoose.model ("users",userSchema)
export default User