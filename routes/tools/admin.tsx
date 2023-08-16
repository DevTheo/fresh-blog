import { blogConfig } from "../../blog-config.ts";
import { blogService } from "../../services/blog-service.ts";
import { cmsService } from "../../services/cms-service.ts";
import { AgGridView } from "../../islands/AgGridView.jsx";
import { useState,useEffect } from "preact/hooks";
import { BlogPost } from "../../models/blogpost.ts";
import { CmsItem } from "../../models/cmsitem.ts";

const theme = blogConfig.theme!;

export default function admin() {
    const [allBlogs] = useState<BlogPost[]>(blogService.getAll() || []);
    const [allCms] = useState<CmsItem[]>(cmsService.getAll() || []);

    const blogColDefs = [
        { field: "id", cellDataType: 'number' },
        { field: "slug", cellDataType: 'text' },
        { field: "title", cellDataType: 'text'  },
        { field: "subTitle", cellDataType: 'text'  },
        { field: "author", cellDataType: 'text'  },
        { field: "publishedAt", cellDataType: 'text'  },
        { field: "snippet", cellDataType: 'text'  },
        { field: "category", cellDataType: 'text'  },
        { field: "tags", cellDataType: 'text'  }
    ];

    const cmsColDefs = [
        { field: "id", cellDataType: 'number'  },
        { field: "name", cellDataType: 'text'  },
        { field: "content", cellDataType: 'text'  },
    ];

    return(<theme.contentWrapper blogSettings={blogConfig} name="adminPage">
        <h1>Admin</h1>
        <div>Blog entries <button>New</button></div>
        <AgGridView name="blogEntries" colDefs={blogColDefs} data={allBlogs} height={"200px"} width={"500px"} />
        <div>Cms Items <button>New</button></div>
        <AgGridView name="cmsEntries" colDefs={cmsColDefs} data={allCms} height={"200px"} width={"500px"} />
    </theme.contentWrapper>)
}