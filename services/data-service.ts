// deno-lint-ignore-file no-explicit-any
import { connect, QueryBuilder, Manager } from "cotton";

export interface ICottonConnectionConfig {
    database?: string;
    username?: string;
    port?: number;
    hostname?: string;
    password?: string;
    applicationName?: string;
}

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

export interface ICottonDb {
    lastInsertedId: number;
    query(
        query: string,
        values?: CottonDatabaseValues[],
      ): Promise<CottonDatabaseValues[]>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    table(tableName: string): QueryBuilder;
    getManager(): Manager;
    transaction(fn: () => Promise<void>): Promise<void>;
}

const connectionInfo = JSON.parse(Deno.readTextFileSync("../ormconfig.json")) as ICottonConnectionConfig;

export interface IDataService<T> {
    // queryAllAsync(query?: Query): Promise<T[]>;
    // getByIdAsync(query?: Query<T> | QueryFunction<T>): Promise<T | null>;
    // createAsync(item: T): Promise<T | null>;
    // updateAsync(item: T): Promise<T | null>;
    // deleteByIdAsync(item: T): Promise<T | null>;
    // saveAsync(item: T): Promise<T | null>;
    // countAsync(query?: Query): Promise<number>;
}

export const DbTypes = {
    Sqlite: "sqlite",
    Postgres: "postgres",
    MySql: "mysql",
}

export type DataServiceProps = {
    // dbName: string,
    // server?: string,
    isReadOnly: boolean,
    //validator?: (entity:T) => Promise<boolean>, 
    //getQueryForItem?: (item: T) => Query<T> | null,            
    //getKeyForItem?: ((item: T) => any | null)
}

export class DataService<T> implements IDataService<T> {
    //private db: Database<T>;
    // getKeyForItem: (item: T) => any | null;
    // getQueryForItem: (item: T) => any | null;
    private isReadOnly = false;
    public _db?: ICottonDb;

    public getIsReadOnly() {
        return this.isReadOnly;
    }
    
    private isReady = false;
    public getIsReady() {
        return this.isReady;
    }
    private setIsReady(isReady: boolean) {
        this.isReady = isReady;
    }

    //defaultGetQueryForItem = (item: T) => { return (item as any)?.id ? {id: (item as any)?.id} : null }
    
    constructor({
        isReadOnly
        //validator, 
        //getQueryForItem,            
        //getKeyForItem
    } : DataServiceProps) {
        this.isReadOnly = isReadOnly;
        connect(connectionInfo as any).then((db: any) =>{
                this._db = db as ICottonDb;
                this.setIsReady(true);
            }).catch((err: any) =>{
                console.log(`Cannot connect to ${connectionInfo.database}: `, err)
            });
            
        // this.getQueryForItem = getQueryForItem || this.defaultGetQueryForItem;
        // this.getKeyForItem = getKeyForItem || this.defaultGetQueryForItem;
    }
    // async queryAllAsync(query?: Query<T> | QueryFunction<T> | undefined): Promise<T[]> {
    //     return await this.db.findMany(query);
    // }

    // async getByIdAsync(query?: Query<T> | QueryFunction<T>): Promise<T | null> {
    //     return await this.db.findOne(query);
    // }

    // async createAsync(item: T): Promise<T | null> {
    //     if(this.isReadOnly) {
    //         return null;
    //     }
    //     item = { id: nanoid(), ...item} as T; // inject id

    //     return await this.db.insertOne(item);
    // }

    // async updateAsync(item: T): Promise<T | null> {
    //     if(this.isReadOnly) {
    //         return null;
    //     }
        
    //     const key = this.getKeyForItem(item);

    //     return await this.db.updateOne(key, item)
    // }

    // async deleteByIdAsync(item: T): Promise<T | null> {
    //     if(this.isReadOnly) {
    //         return null;
    //     }
        
    //     const query = this.getQueryForItem(item);
    //     return !query ? null : await this.db.deleteOne(query!);
    // }

    // async saveAsync(item: T): Promise<T | null> {
    //     if(this.isReadOnly) {
    //         return null;
    //     }
        
    //     const key = this.getKeyForItem(item);
    //     let updated: T | null = null;
    //     if(key) {
    //         updated = await this.db.updateOne(key, item);
    //     }
    //     if(!updated) {
    //         updated = await this.db.insertOne(item);
    //     }
    //     return updated!;
    // }
    
    // async countAsync(query?: Query<T>|undefined): Promise<number> {
    //     return await this.db.count(query);
    // }
}
