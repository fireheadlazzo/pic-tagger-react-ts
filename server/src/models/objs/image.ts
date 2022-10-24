interface IDetails {
  metadata: {
    height: number;
    width: number;
    originalName: string;
    encoding: string;
    mimetype: string;
    size: number;
  },
  lastSourceAttempt: Date,
}

export class Image {
  constructor(value?: any) {
    if (!value) {
      return;
    }

    this.id = Number(value.id)
    this.url = value.url;
    this.tags = value.tags || [];
    this.details = value.details || {};
    this.created_at = value.created_at;
    this.updated_at = value.updated_at;
    this.deleted_at = value.deleted_at;
    this.created_by = value.created_by;
    this.updated_by = value.updated_by;
  }

  public id?: number;
  public url?: string;
  public tags?: number[];
  public details?: IDetails;
  public created_at?: Date;
  public updated_at?: Date;
  public deleted_at?: Date;
  public created_by?: string;
  public updated_by?: string;

  public static primaryKey: string = "id";
  public static columns: string[] = ["url", "tags", "details", "created_at", "updated_at", "deleted_at", "created_by", "updated_by"];
  public static editableColumns: string[] = ["tags", "details"];
  public static requiredKeysPost: string[] = ["file"];

  public toUpdateObj(values: any): Image {
    Image.editableColumns.forEach((key: string) => {
      this[key as keyof Image] === values[key];
    });
    return this;
  }

  // Used to convert class values to database-digestible format
  public toDB() {
    return {
      id: this.id,
      url: this.url,
      tags: this.tags ? JSON.stringify(this.tags) : JSON.stringify([]),
      details: JSON.stringify(this.details),
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
      url: value.url,
      tags: value.tags, // TODO: Parse?
      created_at: value.created_at,
      updated_at: value.deleted_at,
      deleted_at: value.deleted_at,
      created_by: value.created_by,
      updated_by: value.updated_by
    }
  }
}