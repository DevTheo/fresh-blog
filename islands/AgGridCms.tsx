import { CmsItem } from "../models/cmsitem.ts";
import { LinkActionCellRenderer, AgGridView } from "./AgGridView.jsx";

export type AgGridCmsProps = {
    data: CmsItem[];
}


export function AgGridCms({data}: AgGridCmsProps) {

    const cmsColDefs = [
        { field: "name", cellRenderer: LinkActionCellRenderer, cellRendererParams: { text: "Edit", getLink: (value: string, data: any) => `/admin/content-editor?name=${value}` } },
        { field: "name", cellDataType: 'text'  },
        { field: "content", cellDataType: 'text'  },
    ];
    
    return (
        <AgGridView 
            name="cmsEntries" 
            colDefs={cmsColDefs} 
            data={data} 
            height={"200px"} 
            width={"800px"} />
    )
}