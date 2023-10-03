import { getTheme, getThemes } from "./themes/theme-service.ts";
import { ThemeCtl } from "./themes/theme-types.ts";

const blogSettings = {
    author: "A Blogger",
    blogTitle: "My Blog",
    themeName: "sbs-clean",
    additionalScriptsToLoad: [
    ]
}

export class BlogConfig {
    constructor() {
        this.loadTheme();
    }

    //#region readOnly
    private _readOnly = true;
    public get readOnly() : boolean {       
        return this._readOnly;
    }

    public set readOnly(v : boolean) {
        this._readOnly = v;
    }
    //#endregion
    
    //#region blog properties
    public get author() : string {
        return blogSettings.author;
    }
    
    public get blogTitle() : string {
        return blogSettings.blogTitle;
    }
    //#endregion

    //#region theme properties
    private _theme: ThemeCtl | null = null;    
    public get theme(): ThemeCtl  | null {
        return this._theme;
    }

    public loadTheme() {
        const theme = getTheme(blogSettings.themeName);
        this._theme = theme?.themeCtl;
    }
    //#endregion

    //#region theme properties
    public get additionalScriptsToLoad() : string[] {
        return blogSettings.additionalScriptsToLoad;
    }
    //#endregion

}

export const blogConfig = new BlogConfig();