import { blogConfig } from "../blog-config.ts";
import { BlogPost, TableName } from "../models/blogpost.ts";
import { DataService } from "./data-service.ts";

export class BlogService extends DataService<BlogPost> {

    constructor() {
        super({isReadOnly: blogConfig.readOnly, tableName: TableName, model: BlogPost});
    }

    public async getBlogPostBySlugAsync(slug: string) {
        return await this.newQuery().where("slug", slug).first();
    }

    public async getBlogPostsOrderedByDateDesc(all?: boolean) {
        const q = this.newQuery();
        if(!all) {
            q.where("isPublished", true);
        } 
        q.order("publishedAt", "DESC");
        //. select("id", "slug", "title", "author", "publishedAt")
        return await q.all();
    }
}

export const blogService = new BlogService();