var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var cors    = require('cors');
var cradle = require('cradle');

var Promise = require('es6-promises');

var db = new(cradle.Connection)().database('vinbudin');
var app = express();

app.use(cors());

var fetchFromUntappd = function(name) {
  return new Promise(function(resolve, reject) {
    var url = 'https://untappd.com/search?q=' + name + '&type=beer&sort=';
    request(url, function(err, res, body) {
      if (!err && res.statusCode === 200) {
        try {
          var $ = cheerio.load(body);
          var first = $('.beer-item').first();
          resolve({
            link: $('.label', first).attr('href'),
            image: $('.label img', first).attr('src'),
            name: $('.beer-details .name a', first).html(),
            brewery: $('.beer-details .brewery a', first).html(),
            style: $('.beer-details .style', first).html(),
            abv: ($('.abv', first).html() || '').replace(/[\n\t\r]/g, ''),
            ibu: ($('.ibu', first).html() || '').replace(/[\n\t\r]/g, ''),
            rating: $('.rating .num', first).html()
          });
        } catch (err) {
          reject(err);
        }
      } else {
        reject('Could not find beer');
      }
    });
  });
}

app.get('/:name', function(req, response) {
  var name = req.params.name;

  // Search the database for the beer.
  db.get(name, function(err, doc) {
    if (err && err.error === 'not_found') {
      // Fetch it from untappd if we didn't find it.
      console.log('Not found: ', name);
      fetchFromUntappd(name).then(function(data) {
        console.log('Got from untappd: ', name);
        // Respond with the data given and save it in DB
        response.send(JSON.stringify(data));
        data._id = name;
        db.save(name, data, function(err, res) {
          if (err) {
            throw err;
          } else {
            console.log(name + ' added to DB');
          }
        });
      }).catch(function(err) {
        response.send(JSON.stringify({rating: 'N/A'}));
        db.save(name, {_id: name, rating: 'N/A'}, function(err, res) {
          if (err) {
            throw err;
          } else {
            console.log(name + ' added to DB');
          }
        });
      });
    } else if (err) {
      console.log(name, err);
    } else {
      // Just respond directly if we found it in DB.
      response.send(JSON.stringify(doc));
    }
  });
});

app.listen(3000);
