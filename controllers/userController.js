
import User from "../models/user.js"
import bcrypt from 'bcrypt' // import bcrypt to hash password and compare hashed password with user entered password.
import jwt from 'jsonwebtoken' // import jwt to encript a block of code

export function createUser(req,res){
    
    //hashed user's input password
    const passwordHash = bcrypt.hashSync(req.body.password, 10)

    if(req.body.role=="admin"){
        if(req.user.role !="admin"){
            res.status(403).json({
                message : "Only admin can create another admin user!"
            })
            return
        }
    }

    const userData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : passwordHash
    }
    const user = new User(userData) 

    user.save().then(
        ()=>{
            res.json({
                messsage : "Successfull.."
            })
        }
    ).catch(
        ()=>{
            res.json({
                messsage : "Unsussessfull..!"
            })
        }
    )
}
//Create login user 
export function loginUser(req,res){
    //Get information from request
    const email = req.body.email
    const password = req.body.password

    // Check whether there is a user under email..
    User.findOne(
        {
            email : email
        }
    ).then(
        (user)=>{
            //console.log(user)
            if (user == null){
                res.status(404).json({
                    messsage : "Invalid Email..!"
                })
                
            }else{
                const isPasswordCorrect = bcrypt.compareSync(password,user.password)
                if(isPasswordCorrect){
                    //encript using a token by sign method
                    const token = jwt.sign({
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        role : user.role,
                        isblocked : user.isBlocked,
                        isEmailVerified : user.isEmailVerified,
                        image : user.image
                    }, "kanchana")
                    res.json({
                        token : token,
                        messsage : "Login Successfull",
                                               
                    })
                    //console.log(user)
                }else{
                    res.status(403).json({
                        messsage : "Username or Password is incorrect"
                    })
                }
            }
        }
    )
} 

