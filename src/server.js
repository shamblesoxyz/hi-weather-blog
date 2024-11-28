const express = require('express');
const cors = require('cors');
const routes = require("./routes/blogRoute");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use('/api/blog', routes);


mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then((res) => {
    console.log("Connection succesfully!");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
