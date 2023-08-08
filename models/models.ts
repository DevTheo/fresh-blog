import { ObjectType } from "https://deno.land/x/cotton@v0.7.5/src/basemodel.ts";
import { BlogPost } from "./blogpost.ts";
import { CmsItem } from "./cmsitem.ts";
import { BaseBlogModel } from "./base.ts";

export const allModels = [BlogPost, CmsItem] as ObjectType<BaseBlogModel>[];
