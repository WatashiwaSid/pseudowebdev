/*
Create three routes as follows:
1. Method: POST, Route: /signup, If user doesn't exists then create and save it into the database with the following fields - {username : String, password : String, name: String}
2. Method: GET, Route 
*/

const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const app = express()
const port = 9011
app.use(express.json())

//url/database
mongoose.connect("mongodb+srv://comicsid:VWUAn6YnLbQAfOTY@cluster0.vd5icvt.mongodb.net/mongoose")
//userschema defines the schema for the users table
const userschema = mongoose.model("users",
{   fname: String, 
    lname: String, 
    username:String, 
    password:String}
)

app.get("/", (req,res) =>
{
    res.json({"Msg" : "Visit /signup Endpoint To Create User"})
})

app.post("/signup", async (req,res) =>
{
    const username = req.body.username
    const password = req.body.password
    const fname = req.body.fname
    const lname = req.body.lname

    //get satus if user already exits
    const userAlreadyExists = await userschema.findOne({username : username})

    if(userAlreadyExists)
    {
        res.status(406).json({"Status":"Not Acceptable", "Msg":"Username Already Exists"})
    }

    const newuser = new userschema(
        {
            fname : fname,
            lname: lname,
            username: username,
            password: password
        })
        await newuser.save()
        res.status(200).json({"Staus":"Done","Msg":`User ${username} Is Created In The Database`})
       
})

app.listen(port,()=>
{
    console.log(`Server started on ${port}`)
})