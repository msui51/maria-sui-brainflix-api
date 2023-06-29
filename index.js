const express = require("express")
const app = express();
const cors = require("cors");
const fs = require("fs");

app.use(cors());



app.listen(5000,()=>{
    console.log("server started on port 5000")
})