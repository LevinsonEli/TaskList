const express = require("express");
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("./public"));

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(port);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
