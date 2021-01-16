interface IDetails {
    metadata: {
        height: number;
        width: number;
    },
    uploadInfo: {
        originalName: string;
    }
};

export class Image {
    constructor(value?: any) {
        if (!value) {
            return;
        }

        this.id = Number(value.id)
        this.filename = value.filename || value.path; // filename = existing Image; path = fresh upload from GCS
        this.bucket = value.bucket;
        this.tags = value.tags;
        this.details = value.details;
        this.created_at = value.created_at;
        this.updated_at = value.updated_at;
        this.deleted_at = value.deleted_at;
        this.created_by = value.created_by;
        this.updated_by = value.updated_by;
    }

    public id?: number;
    public filename?: string;
    public bucket?: string;
    public tags?: number[];
    public details?: IDetails;
    public created_at?: Date;
    public updated_at?: Date;
    public deleted_at?: Date;
    public created_by?: string;
    public updated_by?: string;

    public static primaryKey: string = "id";
    public static columns: string[] = ["filename", "bucket", "tags", "details", "created_at", "updated_at", "deleted_at", "created_by", "updated_by"];
    public static requiredKeysPost: string[] = ["file"];

    // Used to convert class values to database-digestible format
    public toDB() {
        return {
            filename: this.filename,
            bucket: this.bucket,
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
            filename: value.filename,
            bucket: value.bucket,
            tags: value.tags,
            details: value.details,
            created_at: value.created_at,
            updated_at: value.deleted_at,
            deleted_at: value.deleted_at,
            created_by: value.created_by,
            updated_by: value.updated_by
        }
    }
}