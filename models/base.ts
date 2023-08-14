// import { Primary } from "cotton";
// import { ObjectType, BaseModel } from "https://deno.land/x/cotton@v0.7.5/src/basemodel.ts";

// // Model
// export function Model(constructor: Function, tableName: string) {
//     constructor.prototype["metadata"].tableName = tableName;
// }

// export function Primary(value: boolean) {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         descriptor.enumerable = value;
//     };
// }

export abstract class BaseBlogModel /*extends BaseModel*/ {
    //@Primary()
    id!: number;

    constructor() {
        //super();
    }
    
    save() {
        
    }
}   

