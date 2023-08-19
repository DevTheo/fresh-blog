import { PageProps } from "$fresh/server.ts";
import { useEffect, useState } from "preact/hooks";
import { blogConfig } from "../../blog-config.ts";
import { blogService } from "../../services/blog-service.ts";
import { BlogPost } from "../../models/blogpost.ts";

const blogPage = blogConfig.theme!.blogPage!;

export default function PostPage(props: PageProps) {
    const slug = props.params.slug;
    const [blogEntry, setBlogEntry] = useState<BlogPost | null>(null);
    
    useEffect(() => {
        setBlogEntry(blogService.getBlogPostBySlug(slug));
    }, [slug]);

    return (<blogPage.Component blogSettings={blogConfig} blogEntry={blogEntry} />);
}