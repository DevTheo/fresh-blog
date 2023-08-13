import { ThemeCtl, ThemeHome, ThemeOtherPage } from "../theme-service.ts";
import BlogPage from "./SbsCleanBlogPage.tsx";
import HomePage from "./SbsCleanHomePage.tsx";
import OtherPage from "./SbsCleanOtherPage.tsx";
import { SbsCleanWrapper } from "./SbsCleanWrapper.tsx";

export const themeAssets = `/theme/sbs-clean/`;

export default {
    homePage: {
        RecentBlogEntryCount: 4,
        Component: HomePage
    } as ThemeHome,
    blogPage: {
        Component: BlogPage
    },
    otherPage: {
        Component: OtherPage
    } as ThemeOtherPage,
    themeAssetFolder: themeAssets,
    contentWrapper: SbsCleanWrapper
} as ThemeCtl;