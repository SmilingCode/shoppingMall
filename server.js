const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(path.join(__dirname, 'dist')));

app.use(
    '/manage/*',
    proxy({
        target: 'http://admintest.happymmall.com/',
        changeOrigin: true
    })
)

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(port);
