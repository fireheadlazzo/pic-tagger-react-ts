import express from "express";
import * as storage from "../services/cloudstorage";
import { createImage, getImage } from "../controllers/images";
import { createTag } from "../controllers/tags";
import * as constants from "../models/constants";

class Router {
  constructor() {
    // Create an express router
    this.app = express.Router();
    this.app.use(express.json()) // for parsing application/json
    this.app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
    /**
     * Tags
     */
    this.app.post(`/${constants.tagsRoute}/?`, createTag);
  }

  public app: express.Router;
}

export default new Router;