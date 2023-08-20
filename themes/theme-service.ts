import { ComponentProps, FunctionComponent, VNode } from "preact";
import { BlogPost } from "../models/blogpost.ts";
import { BlogConfig } from "../blog-config.ts";
import { CmsContentProps } from "../components/CmsContent.tsx";
import { Signal } from "@preact/signals";

const themesDir = Deno.readDirSync("themes/");
const themeNames = [] as string[];

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
    blogSettings: BlogConfig;
    blogEntries?: BlogPost[];
    nextPage: string;
    nextPageDisabled: boolean;
    prevPage: string;
    prevPageDisabled: boolean;
}


export type ThemeHeadProps = {
    pageName: string;
    description?: string;
    blogSettings: BlogConfig;
}

export type ThemeBlogProps = {
    blogSettings: BlogConfig;
    blogEntry: BlogPost | null;
}

export type ThemeWrapperPageProps = {
    blogSettings: BlogConfig;
    name: string;
} & ComponentProps<any>;

export type ThemeOtherPageProps = {
    blogSettings: BlogConfig;
    name: string;
    cmsComponent: FunctionComponent<CmsContentProps>;
}

export type ThemeHome = {
    RecentBlogEntryCount: number,
    Component: FunctionComponent<ThemeHomeProps>
};

export type ThemeBlogPage = {
    Component: FunctionComponent<ThemeBlogProps>;
};

export type ThemeOtherPage = {
    Component: FunctionComponent<ThemeOtherPageProps>;
}

export type ThemeCtl = {
    themeAssetFolder: string;
    homePage: ThemeHome,
    blogPage: ThemeBlogPage;
    otherPage?: ThemeOtherPage;
    contentWrapper: FunctionComponent<ThemeWrapperPageProps>;
}

export type ThemeEntry = {
    themeName: string;
    themeCtl: ThemeCtl;
}

export const getThemes = async () => {
    const promises = themeNames.map(async (themeName) => {
        const themeCtlName = `./${themeName}/theme.ts`;
        const themeCtl: ThemeCtl = (await import(themeCtlName) as any).default;
        return {
            themeName: themeName,
            themeCtl: themeCtl
        } as ThemeEntry;
    })
    return await Promise.all(promises);
}
