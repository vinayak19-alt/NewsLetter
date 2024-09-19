const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(__dirname + '/signup.html');
});

app.post("/", function(req, res){
    const first = req.body.first;
    const last = req.body.last;
    const mail = req.body.mail;

    var data = {
        members: [
            {
                email_address: mail,
                status:"subscribed",
                merge_fields:{
                    FNAME: first,
                    LNAME: last,
                }
            }

        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us22.api.mailchimp.com/3.0/lists/68a22f3c8e";

    const options = {
        method: "POST",
        auth: "vinayak1:8bf02d9d23ee832e875e9a108abecd76-us22"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode==200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + '/failure.html');
        }
        response.on("data", function(data){
            //console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is listenig at 3000");
})

//API key
// 8bf02d9d23ee832e875e9a108abecd76-us22

//List ID
// 68a22f3c8e