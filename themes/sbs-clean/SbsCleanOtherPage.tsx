import { ThemeOtherPageProps } from "../theme-service.ts";
import { SbsCleanAbout } from "./SbsCleanAbout.tsx";
import { SbsCleanContact } from "./SbsCleanContact.tsx";

export default function OtherPage(props: ThemeOtherPageProps) {
    return (<>
        {props.name.toLocaleLowerCase() !== "contact" ? 
            (<SbsCleanAbout {...props} />) : (<SbsCleanContact {...props} />)}
    </>)
}