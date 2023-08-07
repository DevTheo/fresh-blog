import { Signal } from "@preact/signals";
import { useEffect, useMemo, useRef, useState } from "preact/compat";
import { JSX } from "preact/jsx-runtime";

export enum CkEditorEditorTypes {
    None = 0,
    Classic,
    Inline, // not working
    Balloon,
    BalloonBlock,
    Document,
    MultiRoot,
    Superbuild
}

let selectedEditorType: CkEditorEditorTypes = CkEditorEditorTypes.None; 

export function getCkEditorBaseScript(editorType: CkEditorEditorTypes) {
    selectedEditorType = editorType;
    return editorType === CkEditorEditorTypes.Classic ? 
        "https://cdn.ckeditor.com/ckeditor5/38.1.1/classic/ckeditor.js" :
        // editorType === EditorTypes.Inline ? 
        // "https://cdn.ckeditor.com/ckeditor5/38.1.1/inline/ckeditor.js" :
        // editorType === EditorTypes.Balloon ?
        // "https://cdn.ckeditor.com/ckeditor5/38.1.1/balloon/ckeditor.js" : 
        // editorType === EditorTypes.BalloonBlock ?
        // "https://cdn.ckeditor.com/ckeditor5/38.1.1/balloon-block/ckeditor.js" :
        // editorType === EditorTypes.Document ?
        // "https://cdn.ckeditor.com/ckeditor5/38.1.1/decoupled-document/ckeditor.js" :
        // editorType === EditorTypes.MultiRoot ?
        // "https://cdn.ckeditor.com/ckeditor5/38.1.1/multi-root/ckeditor.js" :
        // Superbuild
        "https://cdn.ckeditor.com/ckeditor5/38.1.1/super-build/ckeditor.js";
}

export function getEditorCreator(editorType: CkEditorEditorTypes) {
 return editorType=== CkEditorEditorTypes.Classic ? 
          (window as any).ClassicEditor :  
        // editorStyle === EditorTypes.Inline ?
        //   InlineEditor :
        // editorStyle === EditorTypes.Balloon ?
        //   BalloonEditor : 
        // editorStyle === EditorTypes.BalloonBlock ?
        //   BalloonBlockEditor : 
        // editorStyle === EditorTypes.Document ?
        //   DecoupledEditor : 
        // editorStyle === EditorTypes.MultiRoot ?
        //   MultiRootEditor :
        (window as any).CKEDITOR.ClassicEditor; 
}
export type CkEditorProps = {
    name: string;
    html: Signal<string>;
    showSave?: boolean;
    ckEditorConfig?: any;
};

function getDefaultCkEditorConfig(html: Signal<string>) {

    return {  
        plugins: ["Essentials", 
                  //"CKFinderUploadAdapter",
                  //"Autoformat", 
                  //"Autosave",
                  "Bold",
                  "Italic",
                  "BlockQuote",
                  //"CKBox",
                  //"CKFinder",
                  //"CloudServices",
                  "EasyImage", 
                  "Heading", 
                  "Image", 
                  "ImageCaption", 
                  "ImageStyle", 
                  "ImageToolbar",
                  //"ImageUpload",
                  "Indent",
                  "Link",
                  "List",
                  "MediaEmbed",
                  "Paragraph",
                  "PasteFromOffice",
                  "PictureEditing",
                  "Table",
                  "TableToolbar",
                  //"TextTransformation"
        ],
        initialData: (html.value || "")
    };

}

export function CkEditor({name, html, showSave, ckEditorConfig} : CkEditorProps) {
    const editorName = `${name}-editor`;
    const editorRef = useRef(null);
    const [isSetup, setIsSetup] = useState(false); 
    
    const doSave = (editor: any) => {
        html.value = editor.getData();
        console.log("saved", html.value)
    }

    const config = useMemo(() => ckEditorConfig || getDefaultCkEditorConfig(html), [html, ckEditorConfig]);

    useEffect(() => {
        setTimeout(() => {
            console.log("is setup?");
            if (!isSetup) {       
                const editorCreator = getEditorCreator(selectedEditorType);
                
                console.log(editorCreator);

                editorCreator.create( editorRef.current, config).then( (editor: any) => {
                    editor.model.document.on( 'change:data', (editorName: string, editorStyle: any, saveToId: any, content: any) => {
                        console.log("data changed", editorName, editorStyle, saveToId, content);
                        doSave(editor);
                    })
                }).catch( (error: any) => { 
                    console.error( error );
                });
                setIsSetup(true);
            }
        }, 100);
    }, [isSetup, config]);

    const doSubmit = async () => {
        const formData = new FormData();
        formData.append(name, html.value);
        const result = await fetch(window.location.href, {
            body: formData,
            method: "post"
        });
        if(result.status === 200) {
            alert("Saved");
        } else {
            console.error(result);
            alert("Failed to save");
        }
    }
    
    return (<>
        {showSave && <button type="button" onClick={() => doSubmit()}>Save</button>}
        <div id={editorName} ref={editorRef}>
        </div>
    </>)
}