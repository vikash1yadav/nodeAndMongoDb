const Express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const SERVER = () => {
  const app = new Express();
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());
  const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:true})
    .then(console.log("connected to database")).catch(err=>console.log(err));

  // API ROUTE for users
  app.use("/api/users", userRoute);

  app.listen(port, () => {
    console.log(`server is Ready on port ${port}`);
  });
};

SERVER();
