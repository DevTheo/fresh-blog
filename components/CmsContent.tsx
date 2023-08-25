import { useEffect, useState } from "preact/hooks";
import { cmsService } from "../services/cms-service.ts";
import { blogConfig } from "../blog-config.ts";
import { CmsItem } from "../models/cmsitem.ts";

export type CmsContentProps = {
    name: string;
}

export function CmsContent({name}: CmsContentProps ) {
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        const cmsItem= cmsService.getCmsItemByName(name);
        setContent(cmsItem?.content ?? null);
    }, [name]);
    
    return (<>
        { (!blogConfig.readOnly && !content) && (<div>[name] missing <a href={`/tools/content-editor?name=${name}`}></a></div>) }
        <div dangerouslySetInnerHTML={{ __html: (content || "") }}></div>
    </>)
}