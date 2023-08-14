import { blogConfig } from "../blog-config.ts";
import { BlogPost, BlogPostColumnTypes, BlogPostColumnsNames, BlogPostFromRow, TableName } from "../models/blogpost.ts";
import { DataService } from "./data-service.ts";

export class BlogService extends DataService<BlogPost> {

    constructor() {
        super({isReadOnly: blogConfig.readOnly, tableName: TableName, columnNames: BlogPostColumnsNames});
    }

    public async getBlogPostBySlugAsync(slug: string) {
        // return await this.newQuery().where("slug", slug).first();
        return null;
    }

    public async getBlogPostsOrderedByDateDesc(all?: boolean) {
        // const q = this.newQuery();
        // if(!all) {
        //     q.where("isPublished", true);
        // } 
        // q.order("publishedAt", "DESC");
        // //. select("id", "slug", "title", "author", "publishedAt")
        // return await q.all();
        return null;
    }

    protected rowToModel(row: Array<unknown>) {
        return BlogPostFromRow(row)
    }

    
}

export const blogService = new BlogService();