const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const port = process.env.PORT || 4040;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//routers
const userRouter = require("./router/userRoute")
const venueRouter = require("./router/venueRoute")
const itemRouter = require("./router/itemRouter")

//using router inside app
app.use("/api/v1/user", userRouter)
app.use("/api/v1/venue", venueRouter)
app.use("/api/v1/item", itemRouter)



const mongoDbConnect = async () => {
    const mongoURL = process.env.database_URL;
    try {
        await mongoose.connect(mongoURL);
        console.log('Database is connected successfully');
    } catch (error) {
        console.log(error);
    }
};


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    mongoDbConnect();
});
