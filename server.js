const express = require('express')
const helmet = require('helmet')
const app = express()
app.use(helmet())
const fileHandler = require('fs');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const path = require('path')
// const express = require('isomorphic-fetch')



/* If we want our Express server to be able to access content that is passed in the body of the HTTP request,
we need to include the body-parser middleware.
The body-parser middleware extracts the entire body portion of an incoming request stream and exposes it on req.body.*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies
// https://itunes.apple.com/lookup?isbn=9780316069359
app.use('/',routes);

app.get('/search/:query/:type/:limit', (req, res) => {
    console.log('App.get');

// Destruct req.params to retrieve all the parameters for the search
    const { query, type, limit} = req.params;
    console.log('query = '+query)
    console.log('type = '+type)
    console.log('limit = '+limit)

    fetch(`https://itunes.apple.com/search?term=${query}&media=${type}&limit=${limit}`)

      .then(res => res.json())
      .then( result => {
        // console.log the returned data on the server for debugging purposes
        console.log("Result == " + JSON.stringify(result));
        //res.end(JSON.stringify(result, null, 4));
        res.json((result)); //Sent as response to the frontend
        },
        (error) => {
            console.log("**** "+error);
        }
      )
})
app.use(function(err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'frontend','build','index.html'));
  }
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()  => {
    console.log(`Server is listening on port ${PORT}`);
});
