
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
    public async saveCmsItemAsync(item: CmsItem) {
        if(item.id < 0) {
            const unsaved = await this.getCmsItemByNameAsync(item.name);
            if(unsaved) {
                item.id = unsaved.id;
            }
        }        
        if(item.id > 0) {
            const sql = `UPDATE ${TableName} SET name=:name, content=:content where id =:id;`;
            const query = this.prepareQuery(sql);
            await query.execute({
                id: item.id,
                name: item.name,
                content: item.content
            });
        } else {
            const sql = `INSERT INTO ${TableName} (name, content) VALUES (:name, :content);`
            const query = this.prepareQuery(sql);
            await query.execute({
                name: item.name,
                content: item.content
            });
            item.id = this.lastId();
        }
        return item.id;
    }

    protected rowToModel(row: Row): CmsItem {
        return CmsItemFromRow(row);
    }
}

export const cmsService = new CmsService();