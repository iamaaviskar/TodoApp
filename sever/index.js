import express from "express";
import cors from "cors";
import router from "./routes/todos.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Use routes
app.use("/todos", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
