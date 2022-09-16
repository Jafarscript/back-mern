import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Videos from "./dbModel.js";
//App Config
const app = express();
const port = process.env.PORT || 9000;
 const connection_url = "mongodb+srv://admin:lamidi123@cluster0.nyeoqlg.mongodb.net/?retryWrites=true&w=majority";
//Middleware
app.use(express.json());
app.use(Cors());
//DB 

mongoose.connect(connection_url, async (err) => {
  if (err) throw err;
  console.log("conncted to db");
});
//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"));

app.post('/v2/posts', (req, res) => {
 const dbVideos = req.body
 Videos.create(dbVideos, (err, data) => {
 if(err)
 res.status(500).send(err)
 else
 res.status(201).send(data)
 })
})
app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.delete("/v2/posts", (req, res) => {
    Videos.deleteMany((err, data) => {
        if (err){
            res.status(500).send(err);
        } else{
            res.status(200).send(data);
        }
    })
})
//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
