import { ObjectType, BaseModel } from "https://deno.land/x/cotton@v0.7.5/src/basemodel.ts";
import { BlogPost } from "./blogpost.ts";
import { CmsItem } from "./cmsitem.ts";
import { Primary } from "cotton";

export const allModels = [BlogPost, CmsItem] as ObjectType<BaseBlogModel>[];

export class BaseBlogModel extends BaseModel {
    @Primary()
    id!: number;
}