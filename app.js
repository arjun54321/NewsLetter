const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/efc42c14b9";
    const options = {
        method: "POST",
        auth: "arjun:059a0955d39988e510963a83c31c10c7-us17",
    }
    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data));
            if(response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        })
    });
    // request.write(jsonData);
    request.end();
});
app.post("/failure", (req, res) => {
    res.redirect('/');
});
app.listen(process.env.PORT || 4000, () => {
    console.log("connected")
});

// API KEY
// 059a0955d39988e510963a83c31c10c7-us17

// LIST ID
// efc42c14b9