
import { Handlers } from "$fresh/server.ts";
//import { blogService } from "../../services/blog-service.ts";

export const handler: Handlers = {
    async GET(req, ctx) {
        // const url = new URL(req.url);
            
        // if(url.hostname) {
            
        //     blogService.isReadOnly = url.hostname.startsWith("http://")
        // }

        // if(req.url.searchParams.has("slug")) {
        // }
        return await Promise.resolve(new Response("test"))
    },
    async POST(req, ctx) {
      
        return await Promise.resolve(new Response("posted"))
    }
  };
  