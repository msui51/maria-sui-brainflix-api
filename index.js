const express = require("express")
const app = express();
const cors = require("cors");
const videoRoutes = require("./routes/videos");

app.use(cors());

//middleware to grab req.body

app.use(express.json());

//middleware to read static files

app.use(express.static("public"));

//middleware for routes that start with /videos

app.use("/videos", videoRoutes);

//specifying the port the server is listening to
app.listen(5000,()=>{
    console.log("server started on port 5000")
})