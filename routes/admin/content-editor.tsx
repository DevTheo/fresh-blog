import { Handlers, PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";
import { blogConfig } from "../../blog-config.ts";
import { CmsItem } from "../../models/cmsitem.ts";
import { cmsService } from "../../services/cms-service.ts";
import { parseUrlVars } from "../../utils/parse-utils.ts";
import { redirectToAbsoluteOrRelative } from "../../utils/handler-utils.ts";
import { CmsEditor } from "../../islands/CmsEditor.tsx";
import { readAll, readerFromStreamReader} from "$std/streams/mod.ts";


type PageData = {
    id?: number;
    name: string;
    content: string;
    message?: string;
    errorMessage?: string;
    returnPage?: string;
}

const decoder = new TextDecoder();

export const loadUrlVars = (urlString: string) => {
  const urlVars = parseUrlVars(urlString);
  const name = urlVars.kvp["name"];
  const returnPage = urlVars.keys.indexOf("returnPage") !== -1 ? urlVars.kvp["returnPage"] : undefined;

  return { name, returnPage };
}

export const handler: Handlers<PageData> = {
    GET(req, ctx) {
      if(blogConfig.readOnly) {
        const response = new Response("Cannot edit content in live environmnent", {
            status: 500
          });
        return response;
      }

      const {name, returnPage} = loadUrlVars(req.url);
      
      if(!name) {
        const response = new Response("name is required", {
            status: 500
          });
        return response;
      }
      let cmsEntry: CmsItem | null;
      if(name !== " new ") {
        cmsEntry = cmsService.getCmsItemByName(name);
      } else {
        cmsEntry = new CmsItem();
        cmsEntry.name = "";
        cmsEntry.content = "";
        cmsEntry.id = -1;
      }

      return ctx.render({id: cmsEntry?.id, name, returnPage, content: cmsEntry?.content ?? ""});
    },
    async POST(req, ctx) {
        if(blogConfig.readOnly) {
            const response = new Response("Cannot edit content in live environmnent", {
                status: 500
              });
            return response;
        }
        
        const buffer = await readAll(readerFromStreamReader(req.body!.getReader()));
        const data = JSON.parse(decoder.decode(buffer)) as {id?: number, name: string, content: string};
        
        const {name, returnPage} = loadUrlVars(req.url);

        const cmsEntry = new CmsItem();
        cmsEntry.id = data.id !== undefined ? data.id : -1;
        cmsEntry.name = data.name;
        cmsEntry.content = data.content;

        cmsEntry.id = cmsService.saveCmsItem(cmsEntry);

        if(returnPage) {
            return redirectToAbsoluteOrRelative(returnPage);
        }

        return ctx.render({
            id: cmsEntry.id, 
            name: cmsEntry.name, 
            content: cmsEntry.content,
            message: "Content saved"
        });
    },
    DELETE(req, ctx) {
      if(blogConfig.readOnly) {
        const response = new Response("Cannot edit content in live environmnent", {
            status: 500
          });
        return response;
      }

      const {name, returnPage} = loadUrlVars(req.url);
      
      if(!name) {
        const response = new Response("name is required", {
            status: 500
          });
        return response;
      }
      const cmsEntry = cmsService.getCmsItemByName(name);
      if(cmsEntry?.id !== undefined && cmsEntry?.id >= 0) {
        const result = cmsService.delete(cmsEntry.id);
        if(!result) {
          const response = new Response("unable to delete", {
            status: 400
        });
      }
      } else {
        const response = new Response("unable to delete", {
            status: 400
        });
      }
      const response = new Response("true", {
        status: 200
      });
      return response;
    }
  };

const theme = blogConfig.theme!;

export default function Page({ data }: PageProps<PageData>) {
    const {id, name, content, message, errorMessage} = data;
    const editedName = useSignal<string>(name);
    const htmltext = useSignal<string>(content);
    
    return (<>
        <div>{message}</div>
        <div style={{color:"red"}}>{errorMessage}</div>
        <CmsEditor id={id} name={editedName} content={htmltext} />
    </>);
}