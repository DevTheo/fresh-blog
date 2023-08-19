import { blogConfig } from "../blog-config.ts";
import { BlogPost, BlogPostColumnTypes, BlogPostColumnsNames, BlogPostFromRow, TableName } from "../models/blogpost.ts";
import { DataService } from "./data-service.ts";

export class BlogService extends DataService<BlogPost> {

    constructor() {
        super({isReadOnly: blogConfig.readOnly, tableName: TableName, columnNames: BlogPostColumnsNames});
    }

    public getBlogPostBySlug(slug: string) {
        const sql = `${this.select()} where slug =?`;
        const query = this.prepareQuery(sql);        
        const row = query.one([slug]);
        if(row) {
            return this.rowToModel(row);
        } 
        return null;

    }

    public getBlogPostsOrderedByDateDesc(all?: boolean) {
        const orderby = 'order by publishedAt desc';
        const where = all? '' :'where isPublished = 1 ';
        const sql = `${this.select()} ${where}${orderby}`;
        
        const query = this.prepareQuery(sql);        
        const rows = query.all([]);
        const result = [] as Array<BlogPost>;
        for(let i=0; i<rows.length; i++) {
             result.push(this.rowToModel(rows[i]));
        } 
        return result;
    }

    protected rowToModel(row: Array<unknown>) {
        return BlogPostFromRow(row)
    }

    
}

export const blogService = new BlogService();