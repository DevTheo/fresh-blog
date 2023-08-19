import { useEffect, useRef } from "preact/hooks";


export class LinkActionCellRenderer {

    // Optional - Params for rendering. The same params that are passed to the cellRenderer function.
    init(params /*: ICellRendererParams*/) {
        console.log("params", params)
        this.params = params; 
        this.eGui = document.createElement('A');
        this.eGui.className = 'btn btn-outline-primary btn-sm';

        this.eGui.innerHTML = `${this.params.text}`;
        this.eGui.addEventListener('click', () => {
            location.href= this.params.getLink(this.params.value, this.params.data);
        });
    }

    // Mandatory - Return the DOM element of the component, this is what the grid puts into the cell
    getGui() {
        // HTMLElement
        return this.eGui;
    }

    // Optional - Gets called once by grid after rendering is finished - if your renderer needs to do any cleanup,
    // do it here
    destroy() {
        // void;
        this.eGui?.removeEventListener('click', action);
    }

    // Mandatory - Get the cell to refresh. Return true if the refresh succeeded, otherwise return false.
    // If you return false, the grid will remove the component from the DOM and create
    // a new component in its place with the new values.
    refresh(params /*: ICellRendererParams*/) {
        this.params = params;
    }
}


export function AgGridView({name, data, colDefs, height, width}) {
    let ref = useRef((<div></div>))

    const gridOptions = {
        columnDefs: colDefs,
        rowData: data
      };

    useEffect(() => {
        if(ref.current) {
            new agGrid.Grid(ref.current, gridOptions);
        }
    }, [ref]);

    height = height? height : "200px";
    width = width? width : "500px";
    return (
        <div id={name} ref={ref} style={{height, width}} class="ag-theme-alpine"></div>);
}