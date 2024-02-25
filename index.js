const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
var cors = require('cors')
const morgan = require("morgan");

// const v1 = require('./v1')
require('dotenv').config({ path : path.join(__dirname, './config/.env')})
app.get('/', (req,res) => {
     res.send("data is working")
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));
app.use(morgan("tiny"));
// app.use('/',v1)


mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(process.env.PORT || 2001, () => {
      console.log(
        "🚀 SeRvEr StArTeD At : ",
        process.env.PORT || 2001,
        "🚀"
      );
    });
  }) 
  .catch((error) => {
    console.error("💥 MoNgOdB cOnNeCtIon fAiLeD..!!", error);
  });