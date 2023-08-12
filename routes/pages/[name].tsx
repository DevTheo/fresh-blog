import { PageProps } from "$fresh/server.ts";
import { blogConfig } from "../../blog-config.ts";
import { CmsContent } from "../../components/CmsContent.tsx";

const otherPage = blogConfig.theme!.otherPage!;

export default function Pages(props: PageProps) {
    const pageName = props.params.name;

    return <otherPage.Component name={pageName} blogSettings={blogConfig} cmsComponent={CmsContent}/>;
}
