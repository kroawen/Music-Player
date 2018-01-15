var express = require('express')
var config = require('./config/index')
var axios = require('axios')
var port = process.env.PORT || config.build.port
var app = express()
var compression = require('compression')
var apiRoutes = express.Router('/')
// var serveStatic = require('serve-static')
var history = require('connect-history-api-fallback')
app.use(compression())
apiRoutes.get('/getDisc', function(req, res) {
  const url = 'http://ustbhuangyi.com/music/api/getCdInfo'
  axios
    .get(url, {
      params: req.query
    })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})
apiRoutes.get('/getMusicList', function(req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios
    .get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})
apiRoutes.get('/lyric', function(req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios
    .get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      var ret = response.data
      if (typeof ret === 'string') {
        // var reg = /^\w+\(({[^\(\)]+})\)$/
        var reg = /{(.*)}/g
        var matches = response.data.match(reg)
        if (matches) {
          ret = JSON.parse(matches[1])
        }
      }
      res.json(ret)
    })
    .catch(e => {
      console.log(e)
    })
})
apiRoutes.get('/getDisc', function(req, res) {
  const url = 'http://ustbhuangyi.com/music/api/getCdInfo'
  axios
    .get(url, {
      params: req.query
    })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})
app.use('/api', apiRoutes)
var oneYear = 60 * 1000 * 60 * 24 * 365
app.use(history())
app.use(express.static('./music', { maxAge: oneYear }))
module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
