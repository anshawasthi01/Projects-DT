import express from "express";
import cors from "cors";
import morgan from "morgran"
import { errorHandler, unknownEndPoint } from "./middleware";
import requestRouter from "./controller/requests";

const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/request', requestRouter);

app.use(unknownEndPoint);
app.use(errorHandler);

export default app;