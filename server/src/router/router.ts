import express from "express";
import { createImage, getImage, listImages, updateImage } from "controllers/images";
import { createTag, getTag, listTags } from "controllers/tags";
import * as storage from "services/cloudstorage";
import * as middleware from "middlewares/index"; // TODO: Can I get rid of this /index?
import * as constants from "models/constants";

const app = express.Router();

console.log("Defining routes");
/**
 * Images
 */
app.get(`/${constants.imagesRoute}/:id`, getImage);

app.get(`/${constants.imagesRoute}/?`, listImages);

app.post(`/${constants.imagesRoute}/?`,
  storage.multer.single("file"),
  middleware.checkKeys.images.POST,
  // middleware.processImage,
  storage.sendImageToGCS,
  createImage
);

app.put(
  `/${constants.imagesRoute}/`,
  middleware.loadImageById,
  updateImage
);

/**
 * Tags
 */
app.get(`/${constants.tagsRoute}/:id`, getTag
);

app.get(`/${constants.tagsRoute}/?`, listTags
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