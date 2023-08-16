import { useEffect, useRef } from "preact/hooks";

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