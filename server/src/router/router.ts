import express from "express";
import * as storage from "services/cloudstorage";
import { createImage, getImage } from "controllers/images";
import { createTag, getTag } from "controllers/tags";
import * as middleware from "middlewares/index"; // TODO: Do I need this /index?
import * as constants from "models/constants";

const app = express.Router();

console.log("Defining routes");
/**
 * Images
 */
app.get(`/${constants.imagesRoute}/:id`, getImage);

app.post(`/${constants.imagesRoute}/?`,
  storage.multer.single("file"),
  middleware.checkKeys.images.POST,
  storage.sendImageToGCS,
  createImage
);
/**
 * Tags
 */
app.get(`/${constants.tagsRoute}/:id`, getTag
);

app.post(`/${constants.tagsRoute}/?`,
  middleware.checkKeys.tags.POST,
  createTag
);

app.use(middleware.jsonErrorHandler);
app.use((req, res, next) => {
  res.set("Content-Type", "application/json");
  next();
});

export default app;