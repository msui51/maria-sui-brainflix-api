const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

//getting all videos

router.get('/', (req,res)=>{
    fs.readFile("./data/video-details.json", "utf-8", (err, data)=>{
        if(err){
            return res.send("error")
        }
        res.json(JSON.parse(data));
    });
});

//getting individual videos

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


//posting a new video

router.post("/", (req, res)=>{
    fs.readFile("./data/video-details.json", "utf-8", (err,data)=>{
        if(err){
            return console.log("err");
        }
        const videoList=JSON.parse(data);
        const newVideo={
            id: uuidv4(),
            title: req.body.title,
            channel: "Snowball",
            image: "/images/image9.jpeg",
            description: req.body.description,
            views: 0,
            likes: 0,
            duration: "4:01",
            video: "https://project-2-api.herokuapp.com/stream",
            timestamp: Date.now(),
            comments:[]
        }
        videoList.push(newVideo);
        fs.writeFile("./data/video-details.json",JSON.stringify(videoList),(err)=>{
            if(err){
                return console.log("error");
            }
            res.send("new video saved");
        })
    })
})

//posting a new comment

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

//getting a single video's comments

router.get("/:id/comments", (req,res)=>{
    fs.readFile("./data/video-details.json", "utf-8",(err,data)=>{
        if(err){
            return res.send("err");
        }
        const videos=JSON.parse(data);
        const singleVideo=videos.find((video)=>video.id==req.params.id);
        const comments = singleVideo.comments;
        res.json(comments);
    });
})

//deleing a comment from a single video

router.delete("/:id/comments/:commentsId", (req, res)=>{
    const {id, commentsId} =req.params;
    const data= fs.readFileSync("./data/video-details.json")
    const videos=JSON.parse(data);
    const singleVideo=videos.find((video)=>video.id === id);
    const commentsList = singleVideo.comments;
    const commentToDelete=commentsList.find((comment)=>comment.id === commentsId);
    const index=commentsList.indexOf(commentToDelete);
        
    commentsList.splice(index,1);

    fs.writeFileSync("./data/video-details.json", JSON.stringify(videos));
    res.send("comment deleted");
})


module.exports = router;