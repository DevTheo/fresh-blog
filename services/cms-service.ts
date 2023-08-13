
import { DataService } from "./data-service.ts";
import { CmsItem, TableName } from "../models/cmsitem.ts";
import { blogConfig } from "../blog-config.ts";

export class CmsService extends DataService<CmsItem> {
    constructor() {
        super({isReadOnly: blogConfig.readOnly, tableName: TableName, model: CmsItem});
    }

    public async getCmsItemByNameAsync(name: string): Promise<(CmsItem | null)> {
        const result = await this.newQuery().where("name", name).limit(1).first();
        return result ? result as CmsItem : null;
    }

    public newQuery() {
        return CmsItem.query();
    }
}

export const cmsService = new CmsService();