interface IDetails {
    metadata: {
        height: number;
        width: number;
    },
    uploadInfo: {
        originalName: string;
        bucket: string;
        fileName: string;
    }
};

export class Image {
    constructor(value?: any){
        if(!value) {
            return;
        }

        this.id = Number(value.id)
        this.url = value.url;
        this.tags = value.tags;
        this.details = value.details;
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
}