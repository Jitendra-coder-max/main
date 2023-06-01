import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb+srv://jittu121198:rHhPnEifbrUwZAZS@cluster0.a4thaoh.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser: true, 
    useUnifiedTopology: true })
.then(()=>{

console.log('Database connected')
})
.catch((error)=>
{
console.error('Mongo database is not connected')
})


const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password: String
})

const User = new mongoose.model("User",userSchema)






// Routes
app.get('/registe', (req,res)=>
res.send('Data connected')
)

// app.post('/login', (req,res)=>{

// const {email, password} = req.body
// User.findOne({ email: email })
// .then((user) => {
//     if(user){
//         if(password === user.password){
//             res.send({message:"Login Successful", user: user})
//         }
//         else {
//             res.send({message:"Password did't match"})
//         }
//     }
//     else{
//      res.send( {message : "User not registered"})
//     }

// })

// }
// )


app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          if (password === user.password) {
            res.send({ message: "Login Successful", user: user });
          } else {
            res.send({ message: "Password didn't match" });
          }
        } else {
          res.send({ message: "User not registered" });
        }
      })
      .catch((error) => {
        // Handle any errors
      });
  });
  





app.post('/register',(req,res)=>{
    // res.send('My api')
  
    // console.log(req.body)

    const {name ,email,password} = req.body
    console.log(req.body)
    // User.findOne({email:email}, (err, user) => {
    //     if(user){
    //         res.send({message: "User already registered"})
    //     }

    //     else {
    //         const user = new User ({
    //             // Agra name == name he tab hi use karenge 
    //             name,
    //             email,
    //             password
    //         })
    //         user.save()
    //     }
    // })

    User.findOne({ email: email })
  .then((user) => {
    if (user) {
      res.send({ message: "User already registered" });
    } else {
        
      const user = new User({
        name,
        email,
        password,
      });
        
      res.send({ message: "Successfully Registered, Please login now"})
      return user.save();
    // user.save();
    }
  })
  // .then(() => {
  //   res.send({ message: "Successfully registered. Please login now." });
  // })
  
  .catch((error) => {
  res.send("error" , error)
  });


    
})

// const PORT = 5000
app.listen(5000,()=>{
    console.log('Data connected at Port 5000')
})








