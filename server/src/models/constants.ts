/**
 * Table names
 */
export enum tableMap {
  IMAGES = "images",
  TAGS = "tags",
  // TODO: projected tables. Taken from v1 and subject to change
  ARTISTS = "artists",
  ALIASES = "aliases",
  IMPLICATIONS = "implications",
  USERS = "users",
  COLLECTIONS = "collections",
  SERIES = "series"
}

/**
 * Router abbreviations
 * used by the router to denote what kind of resource a request is made for 
 */
export const imagesRoute = "i";
export const tagsRoute = "t";
// export const artistsRoute = "a";
// export const aliasRoute = "al";
// export const implicationsRoute = "im";
// export const usersRoute = "u";
// export const collectionsRoute = "c";
// export const seriesRoute = "s";

/**
 * Tag Types
 * Used to denote what aspect of an image a tag is intended to describe.
 */
export enum tagTypes {
  // for everyday tagging purposes. Signifies individual visual elements of the image
  GENERAL = "general",
  // signifies the artist, modeler, and/or photographer of an image
  ARTIST = "artist",
  // Signifies the title of the source material or series that the subject is derived from 
  SOURCE = "source",
  // signifies the name of a person or character depicted in the image
  CHARACTER = "character",
  // Signifies the overarching group associated with the image. This is common with studio-produced images without a single common creator
  GROUP = "group",
  // names the person/s who did not create the piece, but paid for or encouraged its creation
  COMMISSIONER = "commissioner",
  // signifies the editor of an image
  EDITOR = "editor",
  // signifies characteristics of the image itself, such as general size, format, date, and style
  META = "meta",
  // misc tag
  OTHER = "other"
}

export const validTagTypes = [
  tagTypes.GENERAL,
  tagTypes.ARTIST,
  tagTypes.SOURCE,
  tagTypes.CHARACTER,
  tagTypes.GROUP,
  tagTypes.COMMISSIONER,
  tagTypes.EDITOR,
  tagTypes.META,
  tagTypes.OTHER,
];

// file extensions accepted by multer. This DOES NOT prevent files from being purposely misnamed
export const validFileExtensions = ["png", "jpg", "jpeg"];
