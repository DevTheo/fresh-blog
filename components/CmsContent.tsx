import { cmsService } from "../services/cms-service.ts";
import { blogConfig } from "../blog-config.ts";
import { useMemo } from "preact/hooks";

export type CmsContentProps = {
    name: string;
}

export function CmsContent({name}: CmsContentProps ) {
    //const [content, setContent] = useState<string | null>(null);

    const content = useMemo(() => {
        const cmsItem= cmsService.getCmsItemByName(name);
        return cmsItem?.content ?? null;
    }, [name]);
    
    return (<>
        { (!blogConfig.readOnly && !content) && (<div><a href={`/admin/content-editor?name=${name}`}>[{name}] missing</a></div>) }
        <div dangerouslySetInnerHTML={{ __html: (content || "") }}></div>
    </>)
}