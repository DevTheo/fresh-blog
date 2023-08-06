import { Column, DataType, Model } from "cotton";
import { BaseBlogModel } from "./models.ts";

export const TableName = "CmsItems";

@Model("CmsItems")
export class CmsItem extends BaseBlogModel {

    @Column({ type: DataType.String })
    name!: string;

    @Column({ type: DataType.String })
    content!: string;
}