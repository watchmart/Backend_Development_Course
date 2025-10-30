import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import Student from './models/student.js'
import studentRouter from './routers/studentRouter.js'
import userRouter from './routers/userRouter.js'
import jwt from 'jsonwebtoken'



let app = express()
app.use(bodyParser.json())

// creating our own middleware. 
app.use(   
    // 'next' is an method as the third input...
        (req,res,next)=>{
            //console.log("This is a request...!")
            //complete token taken to the 'value' variable
            const value = req.header("Authorization")
            if(value != null){
                // Remove "Bearer + " " from value
            const token = value.replace("Bearer ","")
           // console.log(token)
            // verify the token with the code. if the code (kanchana) the same, then, decode 
            jwt.verify(token,"kanchana",
                (err,decoded)=>{
                    if(decoded == null){
                        res.status(403).json({
                            message : "Not Authorised...!"
                            })
                    }else{
                        //define user.. it could be any name, we are creating this.  
                        //store decoded value to the user
                        req.user = decoded
                        //pass to the next stage. 
                        next()
                    }
                    //console.log(decoded)
                }
            )
            }else{
                next()
            }
            //remove Bearer+space from the token and assign to token
            
            
        }
        
)
//connection string set up with mongodb
let connectionString = "mongodb+srv://admin:123@cluster0.zs5wfkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connected to Database")
    }).catch(
        ()=>{
            console.log("Failed to connect to databese.")
        }
    )


app.put("/", (req,res)=>{
    res.json({
        message : "This is a put request from sender...!"
    })
    console.log("This is a put request")
})

app.delete("/", (req,res)=>{
    res.json({
        message: "This is a delete request"
    })
    console.log("This is a delete request")
})
//connect the studentRouter to the index
app.use("/students", studentRouter)
//connect userRouter to the index
app.use("/users", userRouter)

//once this call app will run on localhost:5000/
app.listen(5000, ()=>{
    console.log("This code running on port 5000");
    
})