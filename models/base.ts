import { ObjectType, BaseModel } from "https://deno.land/x/cotton@v0.7.5/src/basemodel.ts";
import { Primary } from "cotton";

export abstract class BaseBlogModel extends BaseModel {
    @Primary()
    id!: number;

    constructor() {
        super();
    }
}   