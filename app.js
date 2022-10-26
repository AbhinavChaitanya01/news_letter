const express= require("express");
const bodyParser=require("body-parser");
const https=require("https");
const { request } = require("http");
const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;
    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/7bd4966f09";
    const option={
        method: "POST",
        auth: "abhinav:08c4d95708f3d08e45d99f441fa6da10-us21",
    }
    const request= https.request(url,option,function(response){
        if(res.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    });
    request.write(jsonData);
    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT||3000,function(req,res){
    console.log("server is running on port 3000");
});
// 08c4d95708f3d08e45d99f441fa6da10-us21
// 7bd4966f09