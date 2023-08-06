import { BlogPost } from "../models/blogpost.ts";
import { DataService } from "./data-service.ts";

export class BlogService extends DataService<BlogPost> {

    constructor() {
        super({isReadOnly: false});
    }

    // async getBlogPostBySlug (slug: string) {
    //     const blogs = await this.queryAllAsync({slug: slug});
    //     return blogs ? blogs[0] : null;
    // }
}

export const blogService = new BlogService();