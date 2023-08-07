import { Handlers, PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";
import { blogConfig } from "../blog-config.ts";
import { CkEditor } from "../islands/CkEditor.tsx";
import { CmsItem } from "../models/cmsitem.ts";
import { cmsService } from "../services/cms-service.ts";


type PageData = {
    name: string;
    content: string;
    message?: string;
    errorMessage?: string;
}

export const handler: Handlers<PageData> = {
    async GET(req, ctx) {
      if(blogConfig.readOnly) {
        const response = new Response("Cannot edit content in live environmnent", {
            status: 500
          });
        return response;
      }
      const url = new URL(req.url);
      const name = url.searchParams.get("name");
      if(!name) {
        const response = new Response("name is required", {
            status: 500
          });
        return response;
      }
      const cmsEntry = await cmsService.getCmsItemByNameAsync(name);

      return ctx.render({name, content: cmsEntry?.content ?? ""});
    },
    async POST(req, ctx) {
        if(blogConfig.readOnly) {
            const response = new Response("Cannot edit content in live environmnent", {
                status: 500
              });
            return response;
        }

        const form = await req.formData();
        const url = new URL(req.url);
        const name = url.searchParams.get("name");

        if(!name) {
            const response = new Response("name is required", {
                status: 500
              });
            return response;
          }
    
        let cmsEntry = await cmsService.getCmsItemByNameAsync(name);
        if(!cmsEntry) {
            cmsEntry = new CmsItem();
            cmsEntry.name = name;
        }
            
        cmsEntry.content = form.get("content")?.toString() || "";
        cmsEntry.save();

        return ctx.render({
            name, content: cmsEntry.content,
            message: "Content saved"
        });
    }
  };
  
export default function Page({ data }: PageProps<PageData>) {
    const {name, content, message} = data;
    const htmltext = useSignal<string>(content);

    return (<>
        <div>{message}</div>
        <h1>{name}</h1>
        <CkEditor name="content" html={htmltext} showSave={true}/>
    </>);
}