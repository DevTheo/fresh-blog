//import { Column, DataType, Model } from "cotton";
import { BaseBlogModel } from "./base.ts";

export const TableName = "CmsItems";

export const CmsItemColumnsNames = ["id", "name", "content"];

export function CmsItemFromRow(row: Array<unknown>) {
    const result = new CmsItem();
    result.id = row[0] as number;
    result.name = row[1] as string;
    result.content = row[2] as string;
    return result;
}

//@Model("CmsItems")
export class CmsItem extends BaseBlogModel {

    //@Column({ type: DataType.String })
    name!: string;

    //@Column({ type: DataType.String })
    content!: string;

    constructor(row?: any) {
        super();
        if(row) {
            console.log(row);
            this.id= row?.cid !== undefined ? row?.cid : row?.id;
            this.name = row.name || "";
            this.content = row.content || "";
        }
        console.log(this);
    }
}