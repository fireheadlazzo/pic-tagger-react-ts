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
 * Tag Types
 * Used to denote what 
 */
export enum tagTypes {
    // for everyday tagging purposes. Signifies individual visual elements of the image
    GENERAL = 0,
    // signifies the artist and/or editor of an image
    ARTIST = 1,
    // Signifies the title of the source material or series that the subject is derived from 
    SOURCE = 2,
    // signifies the name of a character depicted in the image
    CHARACTER = 3,
    // Signifies the overarching group associated with the image. This is common with studio-produced images without a single artist
    GROUP = 4,
    // signifies characterisics of the image as compared to other images, such as general size, format, and style
    META = 5
}

export const validTagTypes = [ tagTypes.GENERAL, tagTypes.SOURCE, tagTypes.GROUP, tagTypes.ARTIST, tagTypes.CHARACTER, tagTypes.META ];