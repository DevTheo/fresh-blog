import { blogConfig } from "../../blog-config.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";
import { parseUrlVars } from "../../utils/parse-utils.ts";
import { redirectToAbsoluteOrRelative } from "../../utils/handler-utils.ts";
import { BlogPost, isValid } from "../../models/blogpost.ts";
import { blogService } from "../../services/blog-service.ts";
import { readAll, readerFromStreamReader} from "$std/streams/mod.ts";
import { BlogEditor } from "../../islands/BlogEditor.tsx";

type PageData = {
    id?: number;
    blogEntry: BlogPost | null;
    message?: string;
    errorMessage?: string;
}

export const loadUrlVars = (urlString: string) => {
    const urlVars = parseUrlVars(urlString);
    const id = urlVars.keys.indexOf("id") > -1 ? urlVars.kvp["id"] : undefined;
    const message = urlVars.keys.indexOf("message") > -1 ? urlVars.kvp["message"] : undefined;
    const errorMessage = urlVars.keys.indexOf("errorMessage") > -1 ? urlVars.kvp["errorMessage"] : undefined;
    return { id, message, errorMessage };
}
const decoder = new TextDecoder();

export const handler: Handlers<PageData> = {
    async GET(req, ctx) {
        if(blogConfig.readOnly) {
            const response = new Response("Cannot edit content in live environmnent", {
                status: 500
            });
            return response;
       }
       const { id, message, errorMessage } = await loadUrlVars(req.url);
       const idValue = id ? parseInt(id, 10) : undefined;
       
       let blogEntry: BlogPost | null = null;
       if(idValue !== undefined) {
            blogEntry = blogService.getById(idValue!);
        }
       return ctx.render({id: idValue, blogEntry, message, errorMessage});
    },
    async POST(req, ctx) {
        if(blogConfig.readOnly) {
            const response = new Response("Cannot edit content in live environmnent", {
                status: 500
            });
            return response;
       }
       const { id } = await loadUrlVars(req.url);
       if(!req.body) {
            const response = new Response("Cannot save empty value", {
                status: 500
            });
            return response;
       }
       const buffer = await readAll(readerFromStreamReader(req.body!.getReader()));
       const savedBlogEntry = JSON.parse(decoder.decode(buffer)) as BlogPost;

       if(isValid(savedBlogEntry))
       {
            const blogEntry = new BlogPost(savedBlogEntry);
            blogEntry.id = blogEntry.id || id as any || 0;; 
            const result = blogService.saveBlogPost(blogEntry);
            blogEntry.id = result;
            return new Response("Saved", {
                status: 200
            });
       }

       return new Response("Invalid Data", {
            status: 500
        });

    },
    async DELETE(req, ctx) {
        if(blogConfig.readOnly) {
            const response = new Response("Cannot edit content in live environmnent", {
                status: 500
            });
            return response;
       }
       const { id, message, errorMessage } = await loadUrlVars(req.url);
       const idValue = id ? parseInt(id, 10) : undefined;
       
       if(idValue !== undefined && !isNaN(idValue) && idValue >= 0) {
            const result = blogService.delete(idValue);
            if(!result) {
                const response = new Response("unable to delete", {
                    status: 400
                });        
            }
        }
        const response = new Response("true", {
            status: 200
        });
        return response;

    }
}  

export default function Page({ data }: PageProps<PageData>) {
    const { id, blogEntry, message, errorMessage } = data;
    
    const blogPost = useSignal<BlogPost>(blogEntry || new BlogPost());
    const blogPostContent = useSignal<string>(blogEntry?.content || "");

    // TODO: Add the blog-editor here
    return (<>
            <BlogEditor 
                blogPost={blogPost} 
                blogPostContent={blogPostContent} 
                defaultAuthor={blogConfig.author}
                message={message || ""}
                errorMessage={errorMessage || ""}
                />
        </>); 
}