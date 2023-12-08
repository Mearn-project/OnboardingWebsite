const express = require('express');
const path = require('path');

const { isHR } = require('./controllers/UserController');
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const UserRouter = require('./routes/UserRouter');
const HRRouter = require("./routes/HRRouter.js");
const ApplicationRouter = require('./routes/ApplicationRouter');
const DocumentRouter = require('./routes/DocumentRouter');
const UserInfoRouter = require('./routes/UserInfoRouter');
const VisaRouter = require('./routes/VisaRouter');
const HousingRouter = require('./routes/HousingRouter');

const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(":method :url :status :response-time ms"));

app.use('/api/user', UserRouter);
app.use("/api/HR", HRRouter);
app.use('/application', ApplicationRouter);
app.use('/documents', DocumentRouter);
app.use('/personal-info', UserInfoRouter);
app.use('/visa', VisaRouter);
app.use('/housing', HousingRouter);

app.get('/', (_req, res) => {
    res.status(200);
});

app.all('*', (_req, res) => {
    res.status(404).send('Not Found');
});



module.exports = app;