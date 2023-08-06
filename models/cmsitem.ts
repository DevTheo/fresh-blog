import { BaseModel, Column, DataType, Model, Primary } from "cotton";

@Model("CmsItems")
export class CmsItem extends BaseModel {
    @Primary()
    id!: number;

    @Column({ type: DataType.String })
    name!: string;

    @Column({ type: DataType.String })
    content!: string;
}