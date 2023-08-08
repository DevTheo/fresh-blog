import { Column, DataType, Model } from "cotton";
import { BaseBlogModel } from "./base.ts";

export const TableName = "CmsItems";

@Model("CmsItems")
export class CmsItem extends BaseBlogModel {

    @Column({ type: DataType.String })
    name!: string;

    @Column({ type: DataType.String })
    content!: string;

    constructor() {
        super();
    }
}