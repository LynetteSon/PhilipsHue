var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlOri = "http://192.168.1.12/api/rXgkm8bO0fk0Bhhu4NtwdwJ06CtL7WhpxopY5CIi/lights/";

app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// set up a default router
var router = express.Router();

router.route('/lights/:id')
    .post(function(req, res) {
        // need ->  
        //console.log(req.body);
        
        var id = req.params.id;
        var data = req.body.data;
        //console.log(data);

        state = data["on"];
        //console.log(state);
        bright = data["bri"];
        //console.log(bright);

        var url = urlOri + id + "/state/";
        //console.log(url);  

        var options = {
            method: 'PUT',
            uri: url,
            json: data
        }
        var rp = require('request-promise');
        rp(options)
        .then(function(body) {
        })
        .catch(function(err){
            console.log(err);
            res.send("bad operation.");
        });      

    })
    .get(function(req, res) {
        var id = req.params.id;
        var url = urlOri + id;
        //console.log(url);  

        var options = {
            uri: url,
            json: true
        }
        var rp = require('request-promise');
        rp(options)
        .then(function(body) {
           
            var single = body["state"];
            var reachable = single["reachable"];
            var onstate = single["on"];
            if (reachable && onstate) {
                single["class"] = "success";
            } else if (reachable) {
                single["class"] = "warning";
            } else {
                single["class"] = "danger";
            }
            single["id"] = id;
            res.render('pages/singlelight', { lightinfo: single });
        })
        .catch(function(err){
            console.log(err);
        });
    
    });

app.use("/", router);

app.listen(8585);
console.log("starting Server...");