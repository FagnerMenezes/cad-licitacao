import express from "express";
import path from "path";
import env from "react-dotenv";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/", express.static(path(__dirname, "./build")));
const port = env.PORT_FRONTEND || 3000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Servidor rodando na porta: " + port);
});
