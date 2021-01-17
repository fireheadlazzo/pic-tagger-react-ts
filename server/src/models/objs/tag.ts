import { tagTypes } from "models/constants";

export class Tag {
  constructor(value?: any) {
    if (!value) {
      return;
    }

    this.id = Number(value.id)
    this.name = value.name;
    this.type = Number(value.type);
    this.images = value.images;
    this.created_at = value.created_at;
    this.updated_at = value.updated_at;
    this.deleted_at = value.deleted_at;
    this.created_by = value.created_by;
    this.updated_by = value.updated_by;
  }

  public id?: number;
  public name?: string;
  public type?: number;
  public images?: number[];
  public created_at?: Date;
  public updated_at?: Date;
  public deleted_at?: Date;
  public created_by?: string;
  public updated_by?: string;

  public static primaryKey: string = "id";
  public static columns: string[] = ["name", "type", "images", "created_at", "updated_at", "deleted_at", "created_by", "updated_by"];
  public static requiredKeysPost: string[] = ["name"];
  public static defaultType: number = tagTypes.GENERAL;

  // Used to convert class values to database-digestible format
  public toDB() {
    return {
      name: this.name,
      type: this.type ? this.type : Tag.defaultType,
      images: this.images ? JSON.stringify(this.images) : JSON.stringify([]),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: undefined,
      created_by: "admin",
      updated_by: "admin"
    }
  }

  // Used to convert database values to js-digestible format
  public fromDB(value: any) {
    return {
      id: value.id,
      name: value.name,
      type: value.type,
      images: value.images,
      created_at: value.created_at,
      updated_at: value.deleted_at,
      deleted_at: value.deleted_at,
      created_by: value.created_by,
      updated_by: value.updated_by
    }
  }
}