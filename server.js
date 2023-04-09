let express = require("express");
require("dotenv").config();
const Mongoose = require("mongoose");
const cors = require("cors");
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const ProfileRoute = require("./routes/profile");
const Schema = require('./schema');
const app = express();

//Cors Policy
app.use(cors());

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// To neglect special characters
const DB_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_DB_NAME}.ajvr654.mongodb.net/portfolio?retryWrites=true&w=majority`;
const handleDBConnection = async () => {
  try {
    const conn = await Mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected : ${conn.connection.host}`);
    return conn ? true : false;
  } catch (error) {
    console.log("Connection Error : ", error);
    return false;
  }
};



app.get("/", (req, res) => {
  res.status(200).json({ message: "Working fine" });
});

let Events = [];

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  // rootValue: {
  //   event: () => {
  //     return Events;
  //   },
  //   createEvent: (args) => {
  //     let data = args.event;
  //     let eventValue = {
  //       _id: Math.random().toString(),
  //       name: data.name,
  //       role: data.role,
  //       date: new Date().toISOString()
  //     }
  //     Events.push(eventValue);
  //     return eventValue
  //   }
  // },
  graphiql:true
}))

app.use("/api", ProfileRoute);

var port = process.env.PORT || 2000;

handleDBConnection()
  .then((res) => {
    if (res) {
      app.listen(port, () => {
        console.log("Server connected succesfully");
      });
    }
  })
  .catch((err) => console.log("Connection Error : ", err));
