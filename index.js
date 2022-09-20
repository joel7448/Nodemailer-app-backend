const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
app.use(cors({
    origin:"*"
}))
const userRoute = require("./Routes/users")
const emailroute = require("./Routes/emails");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

  app.use(express.json());
  app.use("/server/users",userRoute);
  app.use("/server/email",emailroute);

  app.get("/", (req, res) =>
  res.send(`Server Running`)
)


app.listen (process.env.PORT||8800  ,()=>{
    console.log("Backend server is runing");
  })