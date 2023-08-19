import { useEffect, useState } from "preact/hooks";
import { cmsService } from "../services/cms-service.ts";

export type CmsContentProps = {
    name: string;
}

export function CmsContent({name}: CmsContentProps ) {
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        cmsService.getCmsItemByName(name).then(cmsItem => setContent(cmsItem?.content ?? null));
    }, [name]);
    
    return (<>
    {content}
    </>)
}