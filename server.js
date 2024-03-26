const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile("public/index.html")
});



app.get("/get-weather/:city", async (req, res) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&units=metric&APPID=${process.env.API_KEY}`;
  try {
    const response = await fetch(weatherURL);
    const weatherData = await response.json();
    res.status(200).json(weatherData);
  } catch (error) {
    console.log("Error fetching weather data:", error);
    res.status(500).json(error);
  }
});

app.listen(3000, () => {
  console.log("runing on port 3000");
});
