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
// export const seriessRoute = "s";

/**
 * Tag Types
 * Used to denote what aspect of an image a tag is intended to describe.
 */
export enum tagTypes {
    // for everyday tagging purposes. Signifies individual visual elements of the image
    GENERAL = 0,
    // signifies the artist, photographer, and/or editor of an image
    ARTIST = 1,
    // Signifies the title of the source material or series that the subject is derived from 
    SOURCE = 2,
    // signifies the name of a person or character depicted in the image
    CHARACTER = 3,
    // Signifies the overarching group associated with the image. This is common with studio-produced images without a single common creator
    GROUP = 4,
    // names the person/s who did not create the piece, but paid for or encouraged its creation
    COMMISSIONER = 5,
    // signifies characterisics of the image itself, such as general size, format, date, and style
    META = 6
}

export const validTagTypes = [
    tagTypes.GENERAL,
    tagTypes.SOURCE,
    tagTypes.GROUP,
    tagTypes.ARTIST,
    tagTypes.CHARACTER,
    tagTypes.COMMISSIONER,
    tagTypes.META
];

// file extensions accepted by multer. This DOES NOT prevent files from being purposely misnamed
export const validFileExtensions = [ "png", "jpg", "jpeg" ];
