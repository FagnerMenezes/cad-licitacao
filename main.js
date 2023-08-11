import express from "express";
import { dirname } from "path";
import env from "react-dotenv";
import { fileURLToPath } from "url";
env.config();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/", express.static(fileURLToPath(__dirname, "./dist")));
const port = env.PORT_FRONTEND || 3000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Servidor rodando na porta: " + port);
});
