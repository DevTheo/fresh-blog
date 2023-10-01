//import { Model, Column, DataType } from "cotton";
import { BaseBlogModel } from "./base.ts";

export const TableName = "BlogPosts";

export const BlogPostColumnsNames = ["id", "slug",        "title", "subTitle", "author", "isPublished", "publishedAt", "content", "snippet", "category", "tags"];

export type BlogPostColumnTypes = [number, string, string, string,     string,    string,        string,        string,    string,    string,     string];

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

    constructor(row?: any) {
        super();
        
        if(row) {
            this.id= row?.cid !== undefined ? row?.cid : row?.id;
            this.slug= row?.slug;
            this.title= row?.title;
            this.subTitle= row?.subTitle;
            this.author= row?.author;
            this.isPublished= row?.isPublished;
            this.publishedAt= row?.publishedAt;                
            this.content= row?.content;
            this.snippet= row?.snippet;
            this.tags= row?.tags;
            this.category= row?.category;
        }        
    }
}

export const isValid = (post: BlogPost): boolean => {
    return true;
}