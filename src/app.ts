import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

const PORT=8080;

app.get("/", (req, res) => {
  return res.status(200).json({
    msg: "health check"
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export {app}
