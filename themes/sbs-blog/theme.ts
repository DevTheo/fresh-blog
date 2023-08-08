import { ThemeCtl, ThemeScript, ThemeLink, ThemeHome, ThemeBlog } from "../theme-service.ts";
import BlogPage from "./BlogPage.tsx";
import HomePage from "./HomePage.tsx";

export default {
    headScripts: [] as ThemeScript[],
    cssScripts: [] as string[],
    links: [] as ThemeLink[],
    homePage: {
        RecentBlogEntryCount: 1,
        Component: HomePage
    } as ThemeHome,
    blogPage: {
        Component: BlogPage
    } as ThemeBlog,
} as ThemeCtl;
/*     
    otherPage: {

    } as ThemeOtherPage
*/