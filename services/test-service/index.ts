import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";

dotenv.config({ path: "./.env.local" });

const app = express();
const port = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

const checkJwt = auth();

app.get("/ok", (req, res) => {
  res.send({ msg: "Hello baby from test service xxx123" });
});

app.get("/authorized", checkJwt, (req, res) => {
  res.send({ msg: "Authorized" });
});

const server = app.listen(port, () =>
  console.log(`API Server listening on port ${port}`)
);

process.on("SIGINT", () => server.close());
