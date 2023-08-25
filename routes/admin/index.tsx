import { blogConfig } from "../../blog-config.ts";
import { blogService } from "../../services/blog-service.ts";
import { cmsService } from "../../services/cms-service.ts";
import { useState } from "preact/hooks";
import { BlogPost } from "../../models/blogpost.ts";
import { CmsItem } from "../../models/cmsitem.ts";
import { AgGridCms } from "../../islands/AgGridCms.tsx";
import { AgGridBlog } from "../../islands/AgGridBlog.tsx";

export default function admin() {
    const [allBlogs] = useState<BlogPost[]>(blogService.getAll() || []);
    const [allCms] = useState<CmsItem[]>(cmsService.getAll() || []);

    return(<>
        <div class="col-lg-8 row g-3">
            <h2>Blog entries <a href="/admin/blog-editor?id=-1" className="btn btn-outline-primary btn-sm">New</a></h2>
            <AgGridBlog data={allBlogs} />
        </div>
        <div class="col-lg-8 row g-3">
            <h2>Cms Items {
            <a href="/admin/content-editor?name=+new+" className="btn btn-outline-primary btn-sm">New</a>}</h2>
            <AgGridCms data={allCms} />
        </div>
        
    </>)
}