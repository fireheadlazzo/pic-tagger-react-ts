import { tableMap } from "./constants";

export class Tag {
    constructor(value?: any){
        if(!value) {
            return;
        }

        this.id = Number(value.id)
        this.name = value.name;
        this.type = value.type;
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
    public images?: Number[];
    public created_at?: Date;
    public updated_at?: Date;
    public deleted_at?: Date;
    public created_by?: string;
    public updated_by?: string;

    public static primaryKey: string = "id";
    public static columns: String[] = ["name", "type", "images", "created_at", "updated_at", "deleted_at", "created_by", "updated_by"];
}