const express = require("express")
const app = express();
const cors = require("cors");
const videoRoutes = require("./routes/videos");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/videos", videoRoutes);


app.listen(5000,()=>{
    console.log("server started on port 5000")
})