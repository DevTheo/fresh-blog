import { ThemeOtherPageProps } from "../theme-service.ts";

export default function OtherPage(props: ThemeOtherPageProps) {
    return (<>
        <h1>{props.name}</h1>
    </>)
}