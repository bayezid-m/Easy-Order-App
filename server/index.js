const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

//const port = process.env.PORT || 4040;
const port = 4040;

//socket io
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"]
  }
});

// socket io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Emit order events
const emitOrderEvent = (event, data) => {
  io.emit(event, data);
};

//

//"http://localhost:4000"
// app.use(cors({
//     origin: ['http://localhost:8081'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//routers
const userRouter = require("./router/userRoute")
const venueRouter = require("./router/venueRoute")
const itemRouter = require("./router/itemRouter")
const orderRouter = require("./router/orderRouter")
const chefRouter = require("./router/chefRouter")

//using router inside app
app.use("/api/v1/user", userRouter)
app.use("/api/v1/venue", venueRouter)
app.use("/api/v1/item", itemRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/chef", chefRouter)



//
app.get('/', async (req, res) => {
  return res.json({
    "message": "Hi, I am from backend"
  })
})

const HandleMongoDbConnect = async () => {
  const mongoURL = process.env.database_URL;
  try {
    await mongoose.connect(mongoURL);
    console.log('Database is connected successfully');
  } catch (error) {
    console.log(error);
  }
};


server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  HandleMongoDbConnect();
});

module.exports = { app, emitOrderEvent };