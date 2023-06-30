const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


router.get('/', (req,res)=>{
    fs.readFile("./data/video-details.json", "utf-8", (err, data)=>{
        if(err){
            return res.send("error")
        }
        console.log(JSON.parse(data))
        res.json(JSON.parse(data));
    });
});

router.get('/:id', (req,res)=>{
    fs.readFile("./data/video-details.json", "utf-8", (err, data)=>{
        if(err){
            return res.send("error")
        }
        const videos= JSON.parse(data);
        const singleVideo=videos.find((video)=>video.id==req.params.id);
        res.json(singleVideo);
    });
});

router.post("/:id/comments", (req,res)=>{
    fs.readFile("./data/video-details.json", "utf-8", (err,data)=>{
        if(err){
            return res.send("error");
        }
        
        const videos=JSON.parse(data);
        const singleVideo=videos.find((video)=>video.id == req.params.id);
        const commentList=singleVideo.comments;
       
        const newComment={
            id: uuidv4(),
            comment: req.body.comment,
            name: req.body.name,
            timestamp: Date.now()
        }
        commentList.push(newComment);
        
        fs.writeFile("./data/video-details.json", JSON.stringify(videos), (err)=>{
            if(err){
                return res.send("err");
            }
            res.send("comment saved")
        });
    });
});

module.exports = router;