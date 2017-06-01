const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname)));
app.use("/app/assets/stylsheets", express.static(__dirname + '/app/assets/stylesheets'));
app.use("/app/assets/fonts/hyperspace", express.static(__dirname + '/app/assets/fonts/hyperspace'));
app.use("/misc_images", express.static(__dirname + '/misc_images'));
app.use("/sprites", express.static(__dirname + '/sprites'));
app.use("/sounds", express.static(__dirname + '/sounds'));
app.use("/app/assets/javascripts", express.static(__dirname + '/app/assets/javascripts'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'index.html'));
});

app.listen(process.env.PORT || 8080);