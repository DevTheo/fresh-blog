import { BlogPost } from "../models/blogpost.ts";
import { LinkActionCellRenderer, AgGridView } from "./AgGridView.jsx";

export type AgGridBlogProps = {
    data: BlogPost[];
}


export function AgGridBlog({data}: AgGridBlogProps) {

    const blogColDefs = [
        { field: "id", cellRenderer: LinkActionCellRenderer, cellRendererParams: { text: "Edit", getLink: (value: string, data: any) => `/tools/blog-editor?id=${value}` } },
        { field: "slug", cellDataType: 'text' },
        { field: "title", cellDataType: 'text'  },
        { field: "subTitle", cellDataType: 'text'  },
        { field: "author", cellDataType: 'text'  },
        { field: "publishedAt", cellDataType: 'text'  },
        { field: "snippet", cellDataType: 'text'  },
        { field: "category", cellDataType: 'text'  },
        { field: "tags", cellDataType: 'text'  }
    ];
    
    return (
        <AgGridView 
            name="blogEntries" 
            colDefs={blogColDefs} 
            data={data} 
            height={"200px"} 
            width={"800px"} />
    )
}