import Student from "../models/student.js"

export function getStudentsSync (req, res){
    Student.find().then(
        (students)=>{
            res.json(students)
        }
    ).catch(
        ()=>{
            res.json({
                message : "Failed to Fetch Data"
            })
        }
    )
}

export async function getStudents(req,res) {
    try{
        const students = await Student.find()
        res.json(students)
    }catch(error){
        res.status(500).json({
            message : "Failed to fetch students",
            error : error.message
        })
    }
    
}

export function createStudent(req,res){

    if(req.user == null){
            res.status(403).json({
                message : "Please login to create user!"
            })
            return
        }
        if(req.user.role != "admin"){
            res.status(403).json({
                message : "You are not authorised!"
            })
            return
        }
    console.log(req.user)
    const student = new Student({
        name : req.body.name,
        age : req.body.age,
        email : req.body.email
    })
    student.save().then(()=>{
        res.json({
            message : "Student saved successfully!"
            
        })
        console.log(req.body)
    }).catch(
        ()=>{
            console.log("Error on Creating Student!")
        }
    )
}

