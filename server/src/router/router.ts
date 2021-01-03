import express from "express";
import * as storage from "../services/cloudstorage";
import { createImage, getImage } from "../controllers/images";
import * as constants from "../models/constants";

class Router {
  constructor() {
    // Create an express router
    this.app = express.Router();

    // Assign the following routes
    console.log("Defining routes");
    /**
     * Images
     */
    this.app.get(`/${constants.imagesRoute}/:id`, getImage);

    this.app.post(
      `/${constants.imagesRoute}/?`,
      storage.multer.single("file"),
      storage.sendImageToGCS,
      createImage
    );
  }

  public app: express.Router;
}

export default new Router;