var express = require('express');
var bodyParser = require('body-parser');
var yaml = require('js-yaml');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/static'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
var configFilePath = process.env.CONF_FILE;

function readConfig(done) {
    try {
        fs.readFile(configFilePath, function (err, file) {
            var doc = yaml.safeLoad(file);
            done(null, doc);
        });
    } catch (e) {
        console.log(e);
        done(e)
    }
}

function writeConfig(conf, done) {
    try {
        var file = yaml.safeDump(conf);
        fs.writeFile(configFilePath, file, function (err) {
            if (!err) {
                done();
            } else {
                done(err)
            }
        });
    } catch (e) {
        console.log(e);
        done(e)
    }
}

app.get('/:field', function (req, res) {
    readConfig(function (err, conf) {
        if (!err) {
            res.json(conf[req.params.field]);
        } else {
            res.sendStatus(500);
        }
    })
});

app.put('/:field', function (req, res) {
    readConfig(function (err, conf) {
        if (!err) {
            conf[req.params.field] = req.body;
            writeConfig(conf, function (err) {
                if (!err) {
                    res.sendStatus(204);
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(500);
        }
    })
});

app.get("/", function (req, res) {
    readConfig(function (err, conf) {
        if (!err) {
            res.render('main', {"data": conf});
        } else {

        }
    })
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});