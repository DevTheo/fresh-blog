
import { DataService } from "./data-service.ts";
import { CmsItem, CmsItemColumnsNames, CmsItemFromRow, TableName } from "../models/cmsitem.ts";
import { blogConfig } from "../blog-config.ts";
import { PreparedQuery, Row } from "sqlite";

export class CmsService extends DataService<CmsItem> {
    constructor() {
        super({isReadOnly: blogConfig.readOnly, tableName: TableName, columnNames: CmsItemColumnsNames});
    }

    public async getCmsItemByNameAsync(name: string) {
        const sql = `${this.select()} where name =?`;
        const query = this.prepareQuery(sql);        
        const row = query.one([name]);
        if(row) {
            return this.rowToModel(row);
        } 
        return null;

    }
    protected rowToModel(row: Row): CmsItem {
        return CmsItemFromRow(row);
    }
}

export const cmsService = new CmsService();