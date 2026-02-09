import { DependencyContainer } from "tsyringe";

import { ILogger } from "@spt/models/spt/utils/ILogger";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";


const cryeCpcGoons = "628b9c7d45122232a872358f";
const knightMask = "62963c18dbc8ab5f0d382d0b";
const magpul_bipod_mount = "671126b049e181972e0681fa";

class Mod implements IPostDBLoadMod
{    
    public postDBLoad(container: DependencyContainer): void
    {
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();
        tables.templates.items[cryeCpcGoons]._props.Prefab.path = "cpc_no_pads.bundle";
        tables.templates.items[knightMask]._props.Prefab.path = "maskfix.bundle";
        tables.templates.items[magpul_bipod_mount]._props.Prefab.path = "harris_adapter.bundle";
    }
}

export const mod = new Mod();
