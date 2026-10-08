import { DependencyContainer } from "tsyringe";

import { ILogger } from "@spt/models/spt/utils/ILogger";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";


const combat_proven = "666314a31cd52e3d040a2e76";
const cryeCpcGoons = "628b9c7d45122232a872358f";
const cryeCpcGoonsTrate = "6a63a5ded4242576b9b949a7";
const cryCpcGoonsSoftFront = "6575f24ff6a13a7b7100b09e";
const cryCpcGoonsSoftBack = "6575f25ada698a4e98067836";
const cryCpcGoonsSoftLeft = "6575f2649cfdfe416f0399b8";
const cryCpcGoonsSoftRight = "6575f26d9c7cad336508e480";
const ssPrecisionGoons = "628b9784bcf6e2659e09b8a2";
const loadBearingChestRigGoons = "628baf0b967de16aab5a4f36";
const knightMask = "62963c18dbc8ab5f0d382d0b";
const deathShadowMask = "6570aead4d84f81fd002a033";
const magpul_bipod_mount = "671126b049e181972e0681fa";
const knightMaskSkullOnly = "69f36bb3b7a3d12a3548ac02";
const monocleteLevelIIIPEBallisticPlate = "656fad8c498d1b7e3e071da0";
const pieceOfPlexiglass = "59e366c186f7741778269d85";
const nppKiassCondorGlasses = "603409c80ca681766b6a0fb2";

const genericFaceCover = "5a341c4686f77469e155819e";
const genericVisors = "5448e5724bdc2ddf718b4568";
const roublesId = "5449016a4bdc2d6f028b456f";

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
        this.add_combat_proven_assort(this.tables);

    }

    public add_combat_proven_assort(tables: any): void {
        const ragman = tables.traders["5ac3b934156ae10c4430e83c"];
        ragman.questassort.success ??= [];

        const itemsToSell = [
            { id: cryeCpcGoonsTrate, tpl: cryeCpcGoons, price: 103284 },
            { id: "6a63a5fd9dc81e4ae5b731bf", tpl: ssPrecisionGoons, price: 122817 },
            { id: "6a63a603aa844cf1300cd017", tpl: loadBearingChestRigGoons, price: 73285 },
        ];

        itemsToSell.forEach(({ id, tpl, price }) => {
            ragman.assort.items.push({
                _id: id,
                _tpl: tpl,
                parentId: "hideout",
                slotId: "hideout",
                upd: {
                    StackObjectsCount: 999999,
                    BuyRestrictionMax: 1,
                    BuyRestrictionCurrent: 0
                }
            });

            ragman.assort.barter_scheme[id] = [[
                {
                    count: price,
                    _tpl: roublesId
                }
            ]];

            ragman.questassort.success[id] = combat_proven;
            ragman.assort.loyal_level_items[id] = 4;
        });


        const itemsToAdd = [
            { id: "6a63b15b0f6fcf73dbe382e4", tpl: cryCpcGoonsSoftFront, slot: "Soft_armor_front"},
            { id: "6a63b161efba6e7875b99933", tpl: cryCpcGoonsSoftBack, slot: "Soft_armor_back"},
            { id: "6a63b166f0b9fe7c391aa710", tpl: cryCpcGoonsSoftLeft, slot: "Soft_armor_left"},
            { id: "6a63b16a12e336a62e3c9c9f", tpl: cryCpcGoonsSoftRight, slot: "soft_armor_right"}
        ];

        itemsToAdd.forEach(({ id, tpl, slot }) => {
            ragman.assort.items.push({
                _id: id,
                _tpl: tpl,
                parentId: cryeCpcGoonsTrate,
                slotId: slot
            });
        });
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
        this.tables.templates.items[knightMaskSkullOnly]._props.ConflictingItems = [...this.tables.templates.items[deathShadowMask]._props.ConflictingItems, deathShadowMask];
        this.tables.templates.items[knightMaskSkullOnly]._props.MaxDurability = "55";
        this.tables.templates.items[knightMaskSkullOnly]._props.Prefab.path = "knight_mask_skull_only.bundle";
        this.tables.templates.items[knightMaskSkullOnly]._props.RepairCost = 122
        this.tables.templates.items[knightMaskSkullOnly]._props.RepairSpeed = 0
        this.tables.templates.items[knightMaskSkullOnly]._props.armorClass = "2";

        this.tables.templates.items[knightMaskSkullOnly]._props.BlocksBlocksEarpiece = false;
        this.tables.templates.items[knightMaskSkullOnly]._props.BlocksEyewear = true;
        this.tables.templates.items[knightMaskSkullOnly]._props.BlocksFaceCover = false;
        this.tables.templates.items[knightMaskSkullOnly]._props.BlocksHeadwear = false;

        this.tables.templates.items[knightMaskSkullOnly]._props.RicochetParams = this.tables.templates.items[knightMask]._props.RicochetParams;
        this.tables.templates.items[knightMaskSkullOnly]._props.armorColliders = this.tables.templates.items[knightMask]._props.armorColliders;
        this.tables.templates.items[knightMaskSkullOnly]._props.Height = this.tables.templates.items[knightMask]._props.Height;

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
