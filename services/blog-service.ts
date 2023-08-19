import { blogConfig } from "../blog-config.ts";
import { BlogPost, BlogPostColumnTypes, BlogPostColumnsNames, BlogPostFromRow, TableName } from "../models/blogpost.ts";
import { DataService } from "./data-service.ts";

export class BlogService extends DataService<BlogPost> {

    constructor() {
        super({isReadOnly: blogConfig.readOnly, tableName: TableName, columnNames: BlogPostColumnsNames});
    }

    public getBlogPostBySlug(slug: string) {
        const sql = `${this.selectStatement()} where slug =?`;
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
        const sql = `${this.selectStatement(this._columnNames.filter(colName => colName !== "content"))} ${where}${orderby}`;
        
        const query = this.prepareQuery(sql);        
        const rows = query.all([]);
        const result = [] as Array<BlogPost>;
        for(let i=0; i<rows.length; i++) {
             result.push(this.rowToModel(rows[i]));
        } 
        return result;
    }

    public saveBlogPost(item: BlogPost) {
        console.log(item);
        if(item.id <= 0) {
            const unsaved = this.getBlogPostBySlug(item.slug);
            if(unsaved) {
                console.log("found", unsaved.id);
                item.id = unsaved.id;
            }
        }        
        if(item.id > 0) {            
            console.log("updating", item.slug);

            const query = this.prepareQuery(this.updateStatement());
            query.execute({
                id: item.id,
                slug: item.slug,
                content: item.content,
                isPublished: item.isPublished,
                publishedAt: item.publishedAt,
                category: item.category,
                tags: item.tags
            });
        } else {
             console.log("inserting", item.slug);
             const query = this.prepareQuery(this.insertStatement());
             query.execute({
                id: item.id,
                slug: item.slug,
                content: item.content,
                isPublished: item.isPublished,
                publishedAt: item.publishedAt,
                category: item.category,
                tags: item.tags
              });
              item.id = this.lastId();
        }
        console.log("saved", item.id);
        return item.id;
    }

    protected rowToModel(row: Array<unknown>) {
        return BlogPostFromRow(row)
    }

    
}

export const blogService = new BlogService();