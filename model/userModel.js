const mongoose = require ('mongoose')
const uuidv1 = require('uuidv1')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true
    },
    hashed_password:{
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default : 0,
        required: true
    },
    isVerified: {
        type: Boolean,
    }

},{timestamps: true})

//virtual field
userSchema.virtual("password")
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(this._password)
})
.get(function(){


    return this._password
})

//methods

userSchema.methods = {
    encryptPassword: function(password){
        if(password == ""){
            
            return ""
        }
        try{
            return this.hashed_password = crypto.createHmac('sha256',this.salt).update(password).digest('hex')
        }

        catch{
            return ""
        }

    }
}
module.exports = mongoose.model("User",userSchema)