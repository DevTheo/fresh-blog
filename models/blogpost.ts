//import { Model, Column, DataType } from "cotton";
import { BaseBlogModel } from "./base.ts";

export const TableName = "BlogPosts";

export const BlogPostColumnsNames = ["id", "slug",        "title", "subTitle", "author", "isPublished", "publishedAt", "content", "snippet", "category", "tags"];

export type BlogPostColumnTypes = [number, string, string, string,     string,    string,        string,        string,    string,    string,     string];

export function BlogPostFromRow(row: Array<unknown>): BlogPost {
    const result = new BlogPost();
    result.id = row[0] as number;
    result.slug = row[1] as string;
    result.title  = row[2] as string;
    result.subTitle = row[3] as string;
    result.author = row[4] as string;
    result.isPublished = (row[5] as number) === 1;
    result.publishedAt = row[6] as string;
    result.content = row[7] as string;
    result.snippet = row[8] as string;
    result.category = row[9] as string;
    result.tags = row[10] as string;
    return result;
}

//@Model(TableName)
export class BlogPost extends BaseBlogModel {
    slug!: string;
    title!: string;
    subTitle?: string;
    author!: string;
    isPublished!: boolean;
    publishedAt?: string;
    content!: string;
    snippet!: string;
    category?: string;
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

export const isValid = (post: BlogPost): boolean => {
    return true;
}