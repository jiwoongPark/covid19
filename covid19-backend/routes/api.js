var express = require('express');
var request = require('request');
var urlencode = require('urlencode');
const convert = require('xml-js');
var router = express.Router();

const serverUrl = 'http://openapi.data.go.kr';
const covidApiUrl = '/openapi/service/rest/Covid19/getCovid19InfStateJson?';
const govServiceKey = ''

function govDataGetRequest(req, res) {
  const options = {
    uri: serverUrl + covidApiUrl,
    qs: {
      ServiceKey: urlencode.decode(govServiceKey),
      pageNo: req.query.pageNo,
      numOfRows: req.query.numOfRows,
      startCreateDt: req.query.startCreateDt,
      endCreateDt: req.query.endCreateDt,
    }
  };
  request(options, function (err, response, body) {
    //callback
    var xmlToJson;
    if (err) {
      console.log(`err => ${err}`)
    } else {
      if (response.statusCode == 200) {
        var result = body
        console.log(`body data => ${result}`)
        xmlToJson = convert.xml2json(result, { compact: true, spaces: 4 });
        console.log(`xml to json => ${xmlToJson}`)
      }
    }
    res.send(xmlToJson);
  })
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.query);
  govDataGetRequest(req, res);
  // res.send('respond with a resource');
});

function govResponse(error, req, body) {
  console.log(body);
}

module.exports = router;
