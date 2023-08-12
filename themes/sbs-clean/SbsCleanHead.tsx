import { Head } from "$fresh/runtime.ts";
import { ThemeHeadProps } from "../theme-service.ts";
import { themeAssets } from "./theme.ts";

const getPageTitle = (blogName: string, pageName: string) => `${blogName} - ${pageName}`;

export function CommonHeader(props: ThemeHeadProps) {
    return (<Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content={props.description || props.pageName} />
        <meta name="author" content={props.blogSettings.author} />
        <title>{getPageTitle(props.blogSettings.blogTitle, props.pageName)}</title>
        <link rel="icon" type="image/x-icon" href={`${themeAssets}assets/favicon.ico`} />
        {/* Font Awesome icons (free version) */}
        <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossOrigin="anonymous"></script>
        {/* Google fonts */}
        <link href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css" />
        {/*  Core theme CSS (includes Bootstrap) */}
        <link href={`${themeAssets}css/styles.css`} rel="stylesheet" />
    </Head>)
}

export function HomeHead(props: ThemeHeadProps) {
    return (<CommonHeader {...props} />)
}

export function PostHead(props: ThemeHeadProps) {
    return (<CommonHeader {...props} />)
}

export function AboutHead(props: ThemeHeadProps) {
    return (<CommonHeader {...props} />)
}

export function ContactHead(props: ThemeHeadProps) {
    return (<CommonHeader {...props} />)
}