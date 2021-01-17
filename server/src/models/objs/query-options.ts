import config from "config";

export class QueryOptions {
  constructor(value: any) {
    this.limit =
      value.limit && value.limit <= config.get("LIST_IMAGES_MAX_PAGE_SIZE")
        ? value.limit
        : config.get("LIST_IMAGES_MAX_PAGE_SIZE");
    this.ascending =
      value.ascending === "true" || value.ascending === true ? true
      : value.ascending === "false" || value.ascending === false ? false
      : true;
    this.offset = Number(value.offset) || 0;
    this.orderBy = value.orderBy ? String(value.orderBy) : "created_at";
  }

  public offset: number;     // 0
  public limit: number;      // LIST_IMAGES_MAX_PAGE_SIZE
  public orderBy: string;    // createdAt
  public ascending: boolean; // true

  public toString() {
    return `limit=${this.limit}/offset=${this.offset}/orderBy=${this.orderBy}/ascending=${this.ascending}`;
  }
}