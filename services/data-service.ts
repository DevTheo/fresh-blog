// deno-lint-ignore-file no-explicit-any
import { BaseBlogModel } from "../models/base.ts";
import {DB} from "sqlite";
//import * as Path from "$std/path/mod.ts";

// export interface ICottonConnectionConfig {
//     type: "mysql" | "postgres" | "sqlite"; 
//     models: ObjectType<BaseModel>[];
// }

export type CottonDatabaseValues =
  | string
  | number
  | Date
  | boolean
  | null
  | undefined;

  export interface CottonDatabaseResult {
    [key: string]: CottonDatabaseValues;
  }

// export interface ICottonDb {
//     lastInsertedId: number;
//     query(
//         query: string,
//         values?: CottonDatabaseValues[],
//       ): Promise<CottonDatabaseValues[]>;
//     connect(): Promise<void>;
//     disconnect(): Promise<void>;
//     table(tableName: string): QueryBuilder;
//     getManager(): Manager;
//     transaction(fn: () => Promise<void>): Promise<void>;
// }

const connectionInfo = JSON.parse(Deno.readTextFileSync("ormconfig.json"));

export interface IDataService<T> {
    getById(id: number): T | null;
    // countAsync(query?: Query): Promise<number>;
}

export const DbTypes = {
    Sqlite: "sqlite",
    Postgres: "postgres",
    MySql: "mysql",
}

export type DataServiceProps = {
    isReadOnly: boolean,
    tableName: string,
    //model: ObjectType<BaseModel>
    columnNames: string[],

}

// export abstract class DataServiceOld<T extends BaseBlogModel> implements IDataService<T> {
//     private isReadOnly = false;
//     public _db?: ICottonDb;
//     private _tableName: string;
//     private _model: ObjectType<BaseModel>;
    
//     private isReady = false;
//     public getIsReady() {
//         return this.isReady;
//     }
//     private setIsReady(isReady: boolean) {
//         this.isReady = isReady;
//     }

//     private _manager: Manager | null = null;
//     public get manager(): Manager | null {
//         return this._manager;
//     }
    
//     constructor({
//         isReadOnly,
//         tableName,
//         model
//     } : DataServiceProps) {
//         this.isReadOnly = isReadOnly;
//         this._tableName = tableName;
//         this._model = model;

//         const _connectionInfo = {...connectionInfo, models: [model]} as ICottonConnectionConfig;

//         connect(_connectionInfo).then((db: any) =>{
//                 this._db = db as ICottonDb;
//                 this._manager = db.getManager();
//                 this.setIsReady(true);
                
//             }).catch((err: any) =>{
//                 console.log(`Cannot connect to ${connectionInfo.database}: `, err);
//                 throw err;
//             });
//     }
    
//     public abstract newQuery(): ModelQuery<T>;

//     public async getByIdAsync(id: number) {
//         const q = this.newQuery();
//         console.log(q);
//         return await q.where("id", id).first();
//     }
// }

export abstract class DataService<T extends BaseBlogModel> implements IDataService<T> {
    private isReadOnly = false;
    public _db: DB;
    private _tableName: string;
    private isReady = false;
    public getIsReady() {
        return this.isReady;
    }
    private setIsReady(isReady: boolean) {
        this.isReady = isReady;
    }
    private _columnNames: string[];
    constructor({
        isReadOnly,
        tableName,
        columnNames
    } : DataServiceProps) {
        this.isReadOnly = isReadOnly;
        this._tableName = tableName;

        this._db = new DB(connectionInfo.database);

        this.setIsReady(true);
        this._columnNames = columnNames;
    }

    protected select() {
        return `SELECT ${this._columnNames.join(",")} from ${this._tableName} `;
    }

    protected prepareQuery(sql: string) {
        return this._db.prepareQuery(sql);
    }

    protected abstract rowToModel(row: Array<unknown>): T;

    //public abstract newQuery(): ModelQuery<T>;

    public getById(id?: number) {
        if(id === undefined) {
            return null;
        }
        const sql = `SELECT ${this._columnNames.join(",")} from ${this._tableName} where id = ?;`;
        const query = this._db?.prepareQuery(sql);
        const row = query?.one([id]);
        if(row) {
            return this.rowToModel(row)
        }
        return null;
    }

}