import express from "express";

const app = express();

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
