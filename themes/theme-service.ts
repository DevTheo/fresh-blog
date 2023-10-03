import {themeLookup, themeNames} from "./theme-setup.ts";
import { ThemeEntry } from "./theme-types.ts";

export const getTheme = /*async*/ (name: string) => {
    //const themeCtlName = `./${name}/theme.ts`;
    const themeCtl = themeLookup[name] || themeLookup["default"];
    return {
        themeName: name,
        themeCtl: themeCtl
    } as ThemeEntry;    
}

export const getThemes = () => {
    const themes = themeNames.map((themeName) => {
        getTheme(themeName);
    })
    return themes;
}
