const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8000

//schema


const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : Number,
})



const userModel = mongoose.model("user", schemaData)


app.get("/",async(req,res)=>{
    const data = await userModel.find({})

    res.json({success : true, data : data})
})



app.post("/create", async (req, res) => {
    console.log(req.body);
    const data = new userModel(req.body); 
     await data.save(); 

    res.json({ success: true, message: "Data saved successfully" , data: data});
});



// app.put("/update", async (req, res) => {
//     console.log(req.body);
//     const {id, ...rest} = req.body
//     console.log(rest)
//    const data = await userModel.updateOne({_id : id},rest);
   

//     res.send({ success: true, message: "Data updated successfully", data : data });
// });

app.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobile } = req.body;
        const data = await userModel.findByIdAndUpdate(id, { name, email, mobile }, { new: true });
        res.json({ success: true, message: "Data updated successfully", data: data });
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});




app.delete("/delete/:id", async (req, res) => {
    console.log(req.body);
    const id = req.params.id
   const data = await userModel.deleteOne({_id : id});
   

    res.send({ success: true, message: "Data deleted successfully", data : data });
});






mongoose.connect("mongodb://localhost:27017/crudopration")
.then(()=>{
    console.log("connected to db")
    app.listen(PORT,()=> console.log("Server is running"))
})
.catch((error)=> console.log(error))



