import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"
import router from "./router"

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const server = http.createServer(app)

server.listen(3000, () => {
    console.log(`Server running on http://localhost:${3000}/`)
})

const MongoDBUrl = '' // your mongoDb uri

mongoose.Promise = Promise
mongoose.connect(MongoDBUrl)
mongoose.connection.on('error', (error: Error) => {
    console.log(error)
})

app.use('/', router());
