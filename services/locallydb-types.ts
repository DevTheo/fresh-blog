export type ILocallyDBTimeStamp = {
    $created: string;
    $updated: string;
} 

export type ILocallyDbDocument<T> = (T & {cid:number} & ILocallyDBTimeStamp)

export type ILocallyDbDocumentItems<T> = {
    items: ILocallyDbDocument<T>[];
    length: () => number;
}
export type ILocallyDbCollection<T> = {
    name: string;
    header: {lcid:number} & ILocallyDBTimeStamp;
    insert: (obj: T | T[]) => number[];
    update: (idx: number, obj: T) => boolean;
    get: (idx: number) => ILocallyDbDocument<T>;
    remove: (idx: number) => boolean;
    where: (query: string | any) => ILocallyDbDocumentItems<T>;
    save: () => void;
} & ILocallyDbDocumentItems<T>

export type ILocallyDb = {
    collection: (name: string, autoSave?: boolean) => ILocallyDbCollection<any>;
    hasCollection: (name: string) => boolean;
    removeCollection: (name: string) => boolean;
    getCollectionNames: () => string[];
}
