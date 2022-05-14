const express = require("express");
const authRouter = require("./router/auth")

const app = express();

const USER_LIST = [];
  
app.use(express.json());

app.use("/", authRouter);

const port = 3000;

app.listen(port, () => {
    console.log(`Server Started on: ${port}`);
})