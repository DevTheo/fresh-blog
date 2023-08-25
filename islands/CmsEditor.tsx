import { Signal } from "@preact/signals";
import { TargetedEvent } from "preact/compat";
import { CkEditor } from "./CkEditor.tsx";

export type CmsEditorProps = {
    id?: number;
    name: Signal<string>;
    content: Signal<string>;
}

export function CmsEditor({id, name, content}: CmsEditorProps) {

    const handleOnChange = (event: TargetedEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const el = (event.target as HTMLInputElement | HTMLTextAreaElement);
        name.value = el.value;
    }

    const saveData = async () => {
        const result = await fetch(window.location.href, {
            body: JSON.stringify({id, name: name.value, content: content.value}),
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(result.status === 200) {
            alert("Saved");
        } else {
            console.error(result);
            alert("Failed to save");
        }
    }

    return (<>
        <div class="row g-1">
            <div class="col col-sm-6">&nbsp;</div>
            <div class="col"><button onClick={(e) => saveData()}>Save</button></div>
        </div>
        <div class="row g-1">
            <div class="col col-sm-2">Name: </div>
            <div class="col"><input name="name" value={name} onChange={handleOnChange}/></div>
        </div>
        <div class="row g-1">
            <CkEditor name="content" html={content} showSave={false}/>
        </div>
    </>)
}