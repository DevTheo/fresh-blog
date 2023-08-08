import { JSX } from "preact";
import { BlogPost } from "../models/blogpost.ts";

const themesDir = Deno.readDirSync("themes/");
const themeNames = [];

for await (const item of themesDir) {
    if(item.isDirectory) {
        themeNames.push(item.name);
    }
}

export type ThemeScript = {
    defer: boolean;
    path: string; // absolute path to the script
}

export type ThemeLink = {
    rel: string, 
    type: string, 
    href: string
};

export type ThemeHomeProps = {
    blogSettings: string;
    blogEntries?: BlogPost[];
}

export type ThemeBlogProps = {
    blogSettings: string;
    blogEntries?: BlogPost;
}

export type ThemeOtherPageProps = {
    name: string;
    cmsComponent: (name: string) => JSX.Element;
}

export type ThemeHome = {
    RecentBlogEntryCount: number,
    Component: (props: ThemeHomeProps) => JSX.Element
};

export type ThemeBlog = {
    Component: (props: ThemeHomeProps) => JSX.Element
};

export type ThemeOtherPage = {
    Component: (props: ThemeOtherPageProps) => JSX.Element    
}

export type ThemeCtl = {
    headScripts: ThemeScript[];
    cssScripts: string[];
    links: ThemeLink[];
    homePage: ThemeHome,
    blogPage: ThemeBlog;
    otherPage?: ThemeOtherPage;
}

export const themes = themeNames.map(async (themeName) => {
    const themeCtlName = `themes/${themeName}/theme.ts`;
    const themeCtl: ThemeCtl = await import(themeCtlName);
    return {
        name: themeName,
        themeCtl,
        themeCtlName,
    }
});