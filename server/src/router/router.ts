import express from "express";
import * as storage from "../services/cloudstorage";
import { createImage } from "../controllers/create";

class Router {
  constructor() {
    // Create an express router
    this.app = express.Router();

    // Assign the following routes
    console.log("Defining routes");
    /**
     * Images
     */
    this.app.get("/", storage.listBuckets, (req, res) => res.send("GET / done"));

    this.app.get("/a", (req, res) => res.send("GET /a done"));

    this.app.post(
      "/?",
      storage.multer.single("file"),
      storage.sendImageToGCS,
      createImage,
      (req, res) => res.send("POST / done")
    );
  }

  public app: express.Router;
}

export default new Router;