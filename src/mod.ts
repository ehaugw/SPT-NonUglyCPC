import { DependencyContainer } from "tsyringe";

import { ILogger } from "@spt/models/spt/utils/ILogger";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";


const cryeCpcGoons = "628b9c7d45122232a872358f";
const knightMask = "62963c18dbc8ab5f0d382d0b";
const deathShadowMask = "6570aead4d84f81fd002a033";
const magpul_bipod_mount = "671126b049e181972e0681fa";
const knightMaskSkullOnly = "69f36bb3b7a3d12a3548ac02";
const monocleteLevelIIIPEBallisticPlate = "656fad8c498d1b7e3e071da0";
const pieceOfPlexiglass = "59e366c186f7741778269d85";
const nppKiassCondorGlasses = "603409c80ca681766b6a0fb2";

const genericFaceCover = "5a341c4686f77469e155819e";
const genericVisors = "5448e5724bdc2ddf718b4568";

class Mod implements IPostDBLoadMod
{    
    tables: IDatabaseTables;

    public postDBLoad(container: DependencyContainer): void
    {
        const customItem = container.resolve<CustomItemService>("CustomItemService");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        this.tables = databaseServer.getTables();

        this.tables.templates.items[cryeCpcGoons]._props.Prefab.path = "cpc_no_pads.bundle";
        this.tables.templates.items[knightMask]._props.Prefab.path = "maskfix.bundle";
        this.tables.templates.items[magpul_bipod_mount]._props.Prefab.path = "harris_adapter.bundle";
        this.knight_mask_skull_only(customItem);

    }

    public knight_mask_skull_only(customItem: CustomItemService): void {
        const customItemObject: NewItemFromCloneDetails = {
            itemTplToClone: knightMask,
            overrideProperties: {
                Name: "Armored Skull Mask",
                ShortName: "Armored Skull Mask",
                Description: "An armored mask with the shape of a skull, cast in a mold from a Death Knight mask",
            },
            parentId: genericFaceCover,
            newId: knightMaskSkullOnly,
            fleaPriceRoubles: 12832,
            handbookPriceRoubles: 12832,
            handbookParentId: "69f36d0a92c29c3f789e0529",
            locales: {
                en: {
                name: "Armored Skull Mask",
                shortName: "Armored Skull Mask",
                description: "An armored mask with the shape of a skull, cast in a mold from a Death Knight mask",
                }
            }
        };
        // test
        customItem.createItemFromClone(customItemObject);
        this.tables.templates.items[knightMaskSkullOnly]._props.ArmorMaterial = "UHMWPE";
        this.tables.templates.items[knightMaskSkullOnly]._props.ArmorType = "Light";
        this.tables.templates.items[knightMaskSkullOnly]._props.BlindnessProtection = 0.0;
        this.tables.templates.items[knightMaskSkullOnly]._props.ConflictingItems = [...this.tables.templates.items[deathShadowMask]._props.ConflictingItems];
        this.tables.templates.items[knightMaskSkullOnly]._props.ConflictingItems.push(deathShadowMask);
        this.tables.templates.items[knightMaskSkullOnly]._props.MaxDurability = "55";
        this.tables.templates.items[knightMaskSkullOnly]._props.Prefab.path = "knight_mask_skull_only.bundle";
        this.tables.templates.items[knightMaskSkullOnly]._props.RepairCost = 122
        this.tables.templates.items[knightMaskSkullOnly]._props.RepairSpeed = 0
        this.tables.templates.items[knightMaskSkullOnly]._props.RicochetParams = this.tables.templates.items[knightMask]._props.RicochetParams;
        this.tables.templates.items[knightMaskSkullOnly]._props.armorClass = "2";
        this.tables.templates.items[knightMaskSkullOnly]._props.armorColliders = this.tables.templates.items[knightMask]._props.armorColliders;

        this.tables.templates.items[knightMaskSkullOnly]._props.BlocksBlocksEarpiece = false;
        this.tables.templates.items[knightMaskSkullOnly]._props.BlocksEyewear = true;
        this.tables.templates.items[knightMaskSkullOnly]._props.BlocksFaceCover = false;
        this.tables.templates.items[knightMaskSkullOnly]._props.BlocksHeadwear = false;

        // CRAFTING
        // Area	ID
        // Workbench	10
        // Lavatory	2
        // Medstation	7
        // Nutrition Unit	5
        // Intelligence Center	11

        const output = 1;
        const knight_mask_skull_only_craft = "69f36db2ae5bcdf9651f8ec7";

        this.tables.hideout.production.recipes.push({
            "_id": knight_mask_skull_only_craft,
            "areaType": 2,
            "continuous": false,
            "count": output,
            "endProduct": knightMaskSkullOnly,
            "isCodeProduction": false,
            "isEncoded": false,
            "locked": false,
            "needFuelForAllProductionTime": true,
            "productionLimitCount": 0,
            "productionTime": 4000,
            "requirements": [
                {
                    "areaType": 2,
                    "requiredLevel": 2,
                    "type": "Area"
                },
                {
                    "count": output,
                    "isEncoded": false,
                    "isFunctional": false,
                    "isSpawnedInSession": false,
                    "templateId": "59e3556c86f7741776641ac2",
                    "type": "Item"
                },
                {
                    "count": output,
                    "isEncoded": false,
                    "isFunctional": false,
                    "isSpawnedInSession": false,
                    "templateId": monocleteLevelIIIPEBallisticPlate,
                    "type": "Item"
                },
                {
                    "count": output,
                    "isEncoded": false,
                    "isFunctional": false,
                    "isSpawnedInSession": false,
                    "templateId": pieceOfPlexiglass,
                    "type": "Item"
                },
                {
                    "templateId": knightMask,
                    "type": "Tool"
                }
            ]
        });
    }
}

export const mod = new Mod();
