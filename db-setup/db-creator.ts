import {DB} from "sqlite";
import * as path from "$std/path/mod.ts";

// CLI
async function migrate(db: DB) {
    ensureMigrationTableExist(db);
    const migrated = ((db.query("SELECT name FROM _migrations order by name") as any) as Array<Array<string>>).map(i => i[0]);
    const scriptsToRun = [] as string[];
    for await(const script of Deno.readDir(path.join(Deno.cwd(), "scripts"))) {
        if(!migrated.find(m => m.toLowerCase() === script.name.toLowerCase())) {
            scriptsToRun.push(script.name);
        }
    }
    scriptsToRun.sort();
    for(const script of scriptsToRun) {
        console.log(`Executing ${script}`)

        db.execute(Deno.readTextFileSync(path.join(Deno.cwd(), "scripts", script)));
        db.execute(`INSERT INTO _migrations (name) VALUES ('${script}')`);
    }
    db.close();
}

function ensureMigrationTableExist(db: DB) {
    const result = db.query("SELECT name FROM sqlite_master WHERE type='table';");
    if(!result.find((row) => (row as any).name === "_migrations")) {
        db.execute("CREATE TABLE IF NOT EXISTS _migrations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);");
    }
}

migrate(new DB("../data/site.db"));