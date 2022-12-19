const express = require("express");
const app = express();
const cors = require("cors");
// Router file imports
const authRouter = require("./Routes/auth/auth");
const userRouter = require("./Routes/users/users");
const taskRouter = require("./Routes/tasks/tasks");
app.use(express.json());
const PORT = process.env.PORT || 4000;
require("dotenv").config();
app.use(express.json());
app.use(cors());
// Using imported Routers
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
