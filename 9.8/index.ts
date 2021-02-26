// express configuration
import express from "express";
const app = express();
app.use(express.json());

const PORT = 3000;

// router
app.get("/ping", (_request, response) => {
  response.send("pong");
});

// run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
