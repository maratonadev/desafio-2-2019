require('dotenv').load();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const discovery_router = require('./routes/discovery-routes.route');
const config = require('./routes/config.routes');
const app = express();
app.set('port', process.env.PORT || 8080);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/discovery', discovery_router);
app.use('/api/v1/config', config);

app.use("/", express.static(path.join(__dirname, "public")));
app.use((_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(`Server starting on => ${app.get('port')} `);
});
