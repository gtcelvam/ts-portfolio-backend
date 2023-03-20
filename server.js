let express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

//Cors Policy
app.use(cors());

//Body Parser
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Working fine" })
});

var port = process.env.PORT || 2000;

app.listen(port,()=>{
    console.log("Server connected succesfully");
})