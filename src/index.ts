require("dotenv").config({path: './.env'});
import { app } from "./app";
import connectDB from "./db";


(async() => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at PORT: ${process.env.PORT}`);
    });
      
  } catch (error) {
    console.log("MongoDB connection failed ERROR: ", error);
    throw error;
  }
})();
