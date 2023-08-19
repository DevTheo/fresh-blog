import { blogConfig } from "../../blog-config.ts";
import { blogService } from "../../services/blog-service.ts";
import { cmsService } from "../../services/cms-service.ts";
import { useState } from "preact/hooks";
import { BlogPost } from "../../models/blogpost.ts";
import { CmsItem } from "../../models/cmsitem.ts";
import { AgGridCms } from "../../islands/AgGridCms.tsx";
import { AgGridBlog } from "../../islands/AgGridBlog.tsx";

const theme = blogConfig.theme!;

export default function admin() {
    const [allBlogs] = useState<BlogPost[]>(blogService.getAll() || []);
    const [allCms] = useState<CmsItem[]>(cmsService.getAll() || []);

    return(<theme.contentWrapper blogSettings={blogConfig} name="adminPage">
        <h1>Admin</h1>
        <div>Blog entries <a href="/tools/blog-editor?id=-1" className="btn btn-outline-primary btn-sm">New</a></div>
        <AgGridBlog data={allBlogs} />
        <div>Cms Items {
            <a href="/tools/content-editor?name=+new+" className="btn btn-outline-primary btn-sm">New</a>}</div>
        <AgGridCms data={allCms} />
    </theme.contentWrapper>)
}