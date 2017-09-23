var express = require('express');
var router = express.Router();
const os = require('os');
const fs = require('fs');
const request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', 
    { 
      title: 'Node DemoApp - Home', 
      ver: process.env.npm_package_version
    });
});

/* GET info page. */
router.get('/info', function (req, res, next) {
  var info = { 
    release: os.release(), 
    type: os.type(), 
    cpus: os.cpus(), 
    hostname: os.hostname(), 
    arch: os.arch(),
    mem: Math.round(os.totalmem() / 1048576),
    env: process.env.WEBSITE_SITE_NAME ? process.env.WEBSITE_SITE_NAME.split('-')[0] : 'Local',
    nodever: process.version
  }

  res.render('info', 
  { 
    title: 'Node DemoApp - Info', 
    info: info, 
    isDocker: fs.existsSync('/.dockerenv'), 
    ver: process.env.npm_package_version
  });
});

/* GET weather page. */
router.get('/weather', function (req, res, next) {
  const WEATHER_API_KEY = "686028df24bb828907074f434121b2c0";
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var long = ''
  var lat = ''  
  var country = 'unknown country'  
  var city = '???'  

  // Geo IP reverse lookup
  request('http://freegeoip.net/json/' + ip, { json: true }, (apierr, apires, geo_api_body) => {
    if (apierr) { return console.log(apierr); }
    country = geo_api_body.country_name;
    city = geo_api_body.city;
    lat = geo_api_body.latitude;
    long = geo_api_body.longitude;

    // Call Darksky weather API
    request(`https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${long}?units=uk2`, { json: true }, (apierr, apires, weather) => {
      if (apierr) { return console.log(apierr); }
      res.render('weather', 
      { 
        ip: ip,
        long: long,
        lat: lat,
        country: country,
        city: city,
        summary: weather.currently.summary,
        icon: weather.currently.icon,          
        temp: weather.currently.temperature,
        precip: weather.currently.precipProbability,
        wind: weather.currently.windSpeed,
        title: 'Node DemoApp - Weather', 
        ver: process.env.npm_package_version
      });  
    });
  });
});

module.exports = router;