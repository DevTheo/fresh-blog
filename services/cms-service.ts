
import { ILocallyDbDocument, ILocallyDbDocumentItems } from "./locallydb-types.ts";
import { CmsItem, CmsItemColumnsNames, TableName } from "../models/cmsitem.ts";
import { blogConfig } from "../blog-config.ts";
import { DataService } from "./data-service.ts";

export class CmsService extends DataService<CmsItem> {
    constructor() {
        super({isReadOnly: blogConfig.readOnly, tableName: TableName, columnNames: CmsItemColumnsNames});
    }

    public RowToEntity(i: any) { return new CmsItem(i); }

    public getCmsItemByName(name: string) {
        const results = this._collection.where({name}) as ILocallyDbDocumentItems<CmsItem>;
        return (results.items.length > 0 ? new CmsItem(results.items[0]): null);

    }
    public saveCmsItem(item: CmsItem) {
        let idx: number = item.id !== undefined? item.id : -1;
        if(idx < 0) {
            const unsaved = this.getCmsItemByName(item.name) as ILocallyDbDocument<CmsItem>;
            if(unsaved?.cid) {
                idx = unsaved.cid;
                item.id = idx;
            }
        }        
        if(item.id >= 0) {
            this.update(idx, item as ILocallyDbDocument<CmsItem>);
        } else {
            idx = this.insert(item as ILocallyDbDocument<CmsItem>);
        }
        return idx;
    }
}

export const cmsService = new CmsService();