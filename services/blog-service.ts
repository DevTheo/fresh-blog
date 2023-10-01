import { blogConfig } from "../blog-config.ts";
import { BlogPost, BlogPostColumnsNames, TableName } from "../models/blogpost.ts";
import { DataService, stringSortDesc } from "./data-service.ts";
import { ILocallyDbDocument } from "./locallydb-types.ts";

export class BlogService extends DataService<BlogPost> {

    constructor() {
        super({isReadOnly: blogConfig.readOnly, tableName: TableName, columnNames: BlogPostColumnsNames});
    }

    public RowToEntity(i: any) { return new BlogPost(i); }

    public getBlogPostBySlug(slug: string) {
        const arr = this._collection.where({slug}).items;
        return (arr?.length || 0) > 0 ? new BlogPost(arr[0]) : null;
    }

    public getBlogPostsOrderedByDateDesc(all?: boolean) {
        const result = all ? this._collection.items : this._collection.where({isPublished: true}).items;

        return (result as BlogPost[]).map(i => new BlogPost(i)).sort((a: BlogPost, b: BlogPost) => stringSortDesc(a.publishedAt, b.publishedAt));
    }

    public saveBlogPost(item: BlogPost) {
        //console.log(item);
        let idx: number = (item as ILocallyDbDocument<BlogPost>).id !== undefined ? (item as ILocallyDbDocument<BlogPost>).id : -1;
        console.log(idx);
        
        if(idx < 0) {
            const unsaved = this.getBlogPostBySlug(item.slug) as ILocallyDbDocument<BlogPost>;
            if(unsaved?.cid) {
                idx = unsaved.cid;
            }
        }        
        console.log(idx);
        
        if(idx >= 0) {    
            console.log("updating")        
            const result = this.update(idx, item);
            idx = item.id;
        } else {
            console.log("inserting")        
            idx = this.insert(item as ILocallyDbDocument<BlogPost>);
        }
        console.log("saved", idx);
        return idx;
    }    
}

export const blogService = new BlogService();