import { Model, Column, DataType } from "cotton";
import { BaseBlogModel } from "./base.ts";

export const TableName = "BlogPosts";

@Model(TableName)
export class BlogPost extends BaseBlogModel {

    @Column({ type: DataType.String })
    slug!: string;

    @Column({ type: DataType.String })
    title!: string;

    @Column({ type: DataType.String })
    author!: string;

    @Column({ type: DataType.Boolean, default: false })
    isPublished!: boolean;

    @Column({ type: DataType.Date, default: undefined })
    publishedAt?: Date;

    @Column({ type: DataType.String })
    content!: string;

    @Column({ type: DataType.String })
    snippet!: string;

    @Column({ type: DataType.String })
    category?: string;

    @Column({ type: DataType.String })
    tags?: string;

    getTags(): string[] {
        return (this.tags ?? "").split('|');
    }
    setTags(value: string[])  {
        this.tags = value.join('|');
    }

    constructor() {
        super();
    }
}
