
import { DataService } from "./data-service.ts";
import { CmsItem } from "../models/cmsitem.ts";

export class CmsService extends DataService<CmsItem> {
    constructor() {
        super({ isReadOnly:false });
    }
}

export const cmsService = new CmsService();