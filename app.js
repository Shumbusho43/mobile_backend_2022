//setting up server
const express = require('express');
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require('cookie-parser');
const swaggerDocs = require("./swagger.json")
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const {
    dbConnection
} = require('./models/db');
const {
    userRouter
} = require('./routes/user/user.routes');
const {
    candidateRoutes
} = require('./routes/candidate/candidate.routes');
const {
    votingRouter
} = require('./routes/voting/voting.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())
//documentation
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs, false, {
    docExpansion: "none"
}))
app.use("/api/v1/user", userRouter)
// app.use("/api/v1/vehicle", vehicleRouter)
app.use("/api/v1/candidate", candidateRoutes)
app.use("/api/v1/voting", votingRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
//connecting to database
dbConnection();