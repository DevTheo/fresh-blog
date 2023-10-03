import { ThemeCtl } from "./theme-types.ts";

// We need a better way, but this is the temporary fix
//  1. Import all themes
import SbsClean from "./sbs-clean/theme.ts"

const _themeLookup = {} as {[key: string]: ThemeCtl};

//  2. Update this to have all the names
export const themeNames = ["sbs-clean"];

//  3. Add imported themes to the theme list
_themeLookup["sbs-clean"] = SbsClean as ThemeCtl;
//  4. Default theme (if not found)
_themeLookup["default"] = SbsClean as ThemeCtl;

export const themeLookup = _themeLookup;


//const themesDir = Deno.readDirSync("themes/");
// const themeNames = [] as string[];

// for await (const item of themesDir) {
//     if(item.isDirectory) {
//         themeNames.push(item.name);
//     }
// }
// export { 
    // themesDir, 
    // themeNames,
//}