// deno-lint-ignore-file no-explicit-any
import { BaseBlogModel } from "../models/base.ts";
import locallydb from "locallydb";
import { ILocallyDb,ILocallyDbCollection,ILocallyDbDocument } from "./locallydb-types.ts";

const connectionInfo = JSON.parse(Deno.readTextFileSync("ormconfig.json"));

export const stringSortDesc = (a?: string, b?: string) =>
            (a || "") > (b || "") ? -1 : 
            (a || "") === (b || "") ? 0 :1; 

export const stringSortAsc = (a?: string, b?: string) =>
            (a || "") > (b || "") ? -1 : 
            (a || "") === (b || "") ? 0 :1; 

export interface IDataService<T> {
    getById(id: number): T | null;
}

export type DataServiceProps = {
    isReadOnly: boolean,
    tableName: string,
    columnNames: string[],
}

export abstract class DataService<T extends BaseBlogModel> implements IDataService<T> {
    private isReadOnly = false;
    public _db: ILocallyDb;
    public _collection: ILocallyDbCollection<T>;
    private _tableName: string;
    private isReady = false;
    public getIsReady() {
        return this.isReady;
    }
    private setIsReady(isReady: boolean) {
        this.isReady = isReady;
    }
    protected _columnNames: string[];
    constructor({
        isReadOnly,
        tableName,
        columnNames
    } : DataServiceProps) {
        this.isReadOnly = isReadOnly;
        this._tableName = tableName;

        this._db = new locallydb(connectionInfo.database, !this.isReadOnly);
        this._collection = this._db.collection(this._tableName) 
        this.setIsReady(true);
        this._columnNames = columnNames;
    }

    protected lastId(): number {
        return this._collection.header.lcid;
    }

    public insert(obj: T) {
        const arr = this._collection.insert(obj);
        return arr[0];
    }

    public update(idx: number, obj: T) {
        return this._collection.update(idx, obj);
    }

    public getById(id?: number) {
        if(id === undefined) {
            return null;
        }
        if(id < this._collection.length()) {
            return this.RowToEntity(this._collection.get(id));
        }
        return null;
    }

    public getAll() {
        return this._collection.items.map(i => this.RowToEntity(i));        
    }

    public delete(id: number) {
        return this._collection.remove(id);
    }

    public abstract RowToEntity(i: any): T;
}