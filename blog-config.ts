
const blogSettings = {
    author: "A Blogger",
    blogTitle: "My Blog",
    themeName: "Keep It Simple"
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

}

export const blogConfig = new BlogConfig();