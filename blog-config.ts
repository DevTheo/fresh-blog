import { CkEditorEditorTypes, getCkEditorBaseScript } from "./islands/CkEditor.tsx";
import { ThemeCtl, getThemes } from "./themes/theme-service.ts";


const blogSettings = {
    author: "A Blogger",
    blogTitle: "My Blog",
    themeName: "sbs-blog",
    additionalScriptsToLoad: [
        getCkEditorBaseScript(CkEditorEditorTypes.Superbuild),
        "https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js"
    ]
}

export class BlogConfig {
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

    public async loadTheme() {
        if(this._theme === null) {
            const themes = await getThemes();
            const theme = themes.find(t => t.themeName === blogSettings.themeName);
            this._theme = theme?.themeCtl ?? themes[0].themeCtl;
        }

        return this._theme;
    }
    //#endregion

    //#region theme properties
    public get additionalScriptsToLoad() : string[] {
        return blogSettings.additionalScriptsToLoad;
    }
    //#endregion

}

export const blogConfig = new BlogConfig();