const getDefaultShipSave = function (data = {}) {
    let save = {
        type: 1,
        slot: -1,
        upgrades: {},
        bankedSalvagedUpgrades: {},
        upgradeMultis: {},
        upgradeScore: 0,
        upgradeCount: 0,
        perZoneHighestLevels: {},
        perZoneUpgrades: {},
    }
    for (const [i, v] of Object.entries(data)) {
        save[i] = v
    }
    return save
}

const SB_createShip = function (data = {}) {
    let save = {
        type: "cruiser",
        slot: -1,
        health: new Decimal(100),
        maxHealth: new Decimal(100),
        upgrades: {},
        salvagedUpgrades: {},
        upgradeScore: 0,
        upgradeCount: 0,
        upgradeEffects: {},
        savePoints: {},
    }
    for (const [i, v] of Object.entries(data)) {
        save[i] = v
    }
    return save
}
const SB_createBattle = function (data = {}) {
    let save = {
        menu: null,
        zone: "spaceZone1",
        ship: SB_createShip(),
        sprites: {
            celestialites: [],
            asteroids: [],
            projectiles: [],
            warnings: [],
            custom: [],
        }
    }
    for (const [i, v] of Object.entries(data)) {
        save[i] = v
    }
    return save
}

addLayer("shipBattle", {
    name: "Ship Battle", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "✦", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "SB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        //  BATTLE
        locationId: null,
        saved: {},
        battle: SB_createBattle(),
        
        //  THEMES
        //  "locationTheme": UI colors outside ship battle. Defined in "SB_locations" entries.
        locationTheme: {
            primaryColor: "#5e4ee6",
            secondaryColor: "#37078f",
            backgroundColor: "#151230",
            primaryTextColor: "#ffffff",
            secondaryTextColor: "#aaa2f2",
        },
        //  "zoneTheme": UI colors inside ship battle, including the background. Defined in "SB_zones" entries.
        zoneTheme: {
            primaryColor: "#5e4ee6",
            secondaryColor: "#37078f",
            backgroundColor: "#151230",
            primaryTextColor: "#ffffff",
            secondaryTextColor: "#aaa2f2",
        },

        //  CONTROLS
        /*
            "controlScheme": What kind of controls are being used.
                0: no mobile controls (this means mobile controls are disabled).
                1: CONDENSED mobile controls.
                2: EXTENDED mobile controls.
            touch controls are unaffected by the value of "controlScheme".
        */
        controlScheme: 1,
        mobileControlScale: 1.5,

    }},
    automate() {},
    nodeStyle() {
        return {
            background: "#151230",
            backgroundOrigin: "border-box",
            borderColor: "#5e4ee6",
            color: "#eaf6f7",
        };
    },
    tooltip: "Ship Battle",
    branches: [],
    color: "#ffffff",
    update(delta) {

        // UPDATE LOCATION
        if (!player.ir.inBattle) {

            player.shipBattle.locationId = null
            let location
            for (let [i, v] of Object.entries(SB_locations)) {
                if (v.condition()) {
                    player.shipBattle.locationId = i
                    location = v
                    break
                }
            }

            if (location) {
                // LOCATION *IS NOT* NULL
                player.shipBattle.locationTheme = location.locationTheme
            } else {
                //LOCATION *IS* NULL
                player.shipBattle.locationTheme = {
                    primaryColor: "#5e4ee6",
                    secondaryColor: "#37078f",
                    backgroundColor: "#151230",
                    primaryTextColor: "#ffffff",
                    secondaryTextColor: "#aaa2f2",
                }
            };

        }

    },
    bars: {
        health: {
            unlocked() { return true },
            direction: RIGHT,
            width() {return !arena ? 1 : arena.UIScale * (arena.canvasWidth / 2 - 13.5)},
            height() {return !arena ? 1 : arena.UIScale * 38},
            progress() {
                return arena ? player.ir.shipHealth.div(arena.shipStats.maxHp) : 1;
            },
            borderStyle() { return !arena ? {} : {border: (arena.UIScale * 3) + "px solid " + player.ir.primaryColor, borderRadius: (arena.UIScale * 20.5) + "px", color: "white", marginTop: "-1.5px", fontSize: (arena.UIScale * 18) + "px", textShadow: arena.UIScale + "px " + arena.UIScale + "px " + arena.UIScale + "px black, -" + arena.UIScale + "px " + arena.UIScale + "px " + arena.UIScale + "px black, -" + arena.UIScale + "px -" + arena.UIScale + "px " + arena.UIScale + "px black, " + arena.UIScale + "px -" + arena.UIScale + "px " + arena.UIScale + "px black, 0px 0px 5px black"}},
            baseStyle: {background: "#3f3f00"},
            fillStyle() { return !arena ? {} : { background: "#bfbf00", borderRadius: (arena.UIScale * 19) + "px"}},
            display() {
                return formatSimple(player.ir.shipHealth) + "/" + formatSimple(arena.shipStats.maxHp) + " HP";
            },
        },
        xp: {
            unlocked() { return !(arena && arena._fullscreen) },
            direction: RIGHT,
            width() {return !arena ? 1 : arena.UIScale * (arena.canvasWidth / 2 - 13.5)},
            height() {return !arena ? 1 : arena.UIScale * 38},
            progress() {
                return player.ir.battleXP.div(player.ir.battleXPReq);
            },
            borderStyle() { return !arena ? {} : {border: (arena.UIScale * 3) + "px solid " + player.ir.primaryColor, borderRadius: (arena.UIScale * 20.5) + "px", color: "white", marginTop: "-1.5px", fontSize: (arena.UIScale * 18) + "px", textShadow: arena.UIScale + "px " + arena.UIScale + "px " + arena.UIScale + "px black, -" + arena.UIScale + "px " + arena.UIScale + "px " + arena.UIScale + "px black, -" + arena.UIScale + "px -" + arena.UIScale + "px " + arena.UIScale + "px black, " + arena.UIScale + "px -" + arena.UIScale + "px " + arena.UIScale + "px black, 0px 0px 5px black"}},
            baseStyle: {background: "#00003f"},
            fillStyle() { return !arena ? {} : { background: "#0000bf", borderRadius: (arena.UIScale * 19) + "px"}},
            display() {
                return formatWhole(player.ir.battleXP) + "/" + formatWhole(player.ir.battleXPReq) + " XP";
            },
        },/*
        bossHealth: {
            unlocked() { return (arena && arena._fullscreen) },
            direction: RIGHT,
            width() {return (arena && arena._fullscreen) ? "calc(100vw - 6px)" : "398.5px"},
            height: "60px",
            progress() {
                if (arena && arena._fullscreen && arena.enemies.length > 0) {
                    return arena.enemies[0].health / arena.enemies[0].maxHealth
                } else return 1;
            },
            borderStyle() { return !SB_zones[player.ir.battleStage] ? {} : {border: "3px solid " + SB_zones[player.ir.battleStage].primaryColor, borderRadius: "0", borderTop: "0", color: "white"}},
            baseStyle: {background: "#151230"},
            fillStyle: { background: "linear-gradient(15deg, #bf0000 0%, #800000 100%)"},
            display() {
                if (arena && arena._fullscreen && arena.enemies.length > 0) {
                    return "<h3>" + SB_celestialites[arena.enemies[0].type].name + "</h3><br>" + formatSimple(arena.enemies[0].health) + "/" + formatSimple(arena.enemies[0].maxHealth) + " HP";
                } else return "<h3>???</h3><br>???/??? HP";
                
            },
        },*/
    },
    clickables: {
        "exitRun": {
            title() { return player.ir.savedRun ? "Exit Battle<br><small>(New progress has been saved!)" : "Exit Battle<br><small>[Next save at Level 20]" },
            canClick() { return true},
            unlocked() { return true},
            onClick() {
                SB_exitRun()
            },
            style() {
                let look = {width: "258px", color: "white", borderWidth: "3px", borderRadius: "0 0 0 19px", fontSize: (arena.UIScale * 12) + "px"}
                if (!arena) return look;
                look.width = (arena.UIScale * (arena.canvasWidth / 3 - 8)) + "px"
                look.minHeight = (arena.UIScale * 60) + "px"
                look.maxHeight = (arena.UIScale * 60) + "px"
                look.margin = (arena.UIScale * 3) + "px"
                look.borderWidth = (arena.UIScale * 3) + "px"
                if (player.ir.savedRun) {
                    look.background = "#7f3f00"
                    look.borderColor = "#bf5f00"
                } else {
                    look.background = "#7f0000"
                    look.borderColor = "#bf0000"
                }
                return look
            },
        },
        "toggleAutoShoot": {
            title() { return player.ir.autoShoot ? "Auto-Shoot<br>[ENABLED]" : "Auto-Shoot<br>[DISABLED]" },
            canClick() { return true},
            unlocked() { return true},
            onClick() {
                if (player.ir.autoShoot) {
                    player.ir.autoShoot = false
                    if (arena && player.ir.type == 8) {
                        arena.ship._laserActive = false
                        arena.ship._laserTimer = -60
                    }
                } else {
                    player.ir.autoShoot = true
                }
            },
            style() {
                let look = {width: "258px", color: "white", borderColor: "#008000", background: "#005400", borderRadius: "0", fontSize: (arena.UIScale * 12) + "px"}
                if (!arena) return look;
                look.width = (arena.UIScale * (arena.canvasWidth / 3 - 8)) + "px"
                look.minHeight = (arena.UIScale * 60) + "px"
                look.maxHeight = (arena.UIScale * 60) + "px"
                look.margin = (arena.UIScale * 3) + "px"
                look.borderWidth = (arena.UIScale * 3) + "px"
                return look
            },
        },
        "pause": {
            title() { return player.ir.menu == 2 ? "Return to Battle" : "View Stats" },
            canClick() { return true},
            unlocked() { return true},
            onClick() {
            },
            style() {
                let look = {width: "258px", color: "white", borderColor: "#0000c0", background: "#000080", borderRadius: "0 0 19px 0", fontSize: (arena.UIScale * 12) + "px"}
                if (!arena) return look;
                look.width = (arena.UIScale * (arena.canvasWidth / 3 - 8)) + "px"
                look.minHeight = (arena.UIScale * 60) + "px"
                look.maxHeight = (arena.UIScale * 60) + "px"
                look.margin = (arena.UIScale * 3) + "px"
                look.borderWidth = (arena.UIScale * 3) + "px"
                return look
            },
        },
    },
    upgrades: {},
    buyables: {},
    milestones: {},
    microtabs: {
        shipSelection: {
            "shipSelectionProgression": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    return [
                        ["style-row", [
                            ["category-button", ["Space", "shipSelectionProgression", "space"], {width: player.ir.inBattle ? "398.5px" : "264px", height: "50px", background: "#37078f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#5e4ee67f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"}],
                            ["style-row", [
                                ["style-row", [
                                    ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "265px", height: "50px", background: "#00003f", borderRadius: "0"}],
                            ], {display: hasUpgrade("le", 201) ? "none !important" : ""}],
                            ["style-row", [
                                ["category-button", ["Blood", "shipSelectionProgression", "blood"], {width: player.ir.inBattle ? "398.5px" : "265px", height: "50px", background: "#4f1818", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#5e4ee67f"), borderRadius: "0"}],
                            ], {display: hasUpgrade("le", 201) ? "" : "none !important"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: "50px", borderRadius: "16px 16px 0 0"}],
                        ["style-row", [], {background: player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6", width: player.ir.inBattle ? "800px" : "532px", height: "3px"}],
                        ["buttonless-microtabs", "shipSelectionProgression", {borderWidth: "0"}],
                    ]
                },
            },
            "shipSelectionStats": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    return [
                        ["style-row", [], {width: "0", height: "0"}],
                        ["style-row", [
                            ["category-button", ["Final Stats", "shipSelectionStats", "finalStats"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#5e4ee67f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"}],
                            ["category-button", ["Base Stats", "shipSelectionStats", "baseStats"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#5e4ee67f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"}],
                            ["category-button", ["Upgrade Effects", "shipSelectionStats", "upgradeEffects"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#5e4ee67f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"}],
                            ["category-button", ["Upgrade Counts", "shipSelectionStats", "upgradeCounts"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#5e4ee67f"), borderRadius: "0"}],
                            ["style-row", [], {width: "3px", height: "50px", backgroundColor: player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"}],
                            
                            ["style-row", [
                                ["style-row", [
                                    ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? player.ir.secondaryColor + "7f" : "#00002f", borderRadius: "0"}],
                            ], {display: player.ev.evolutionsUnlocked[14] ? "none !important" : ""}],
                            ["style-row", [
                                ["category-button", ["Salvaged Upgrades", "shipSelectionStats", "salvagedUpgrades"], {width: player.ir.inBattle ? "157.6px" : "104px", height: "50px", background: player.ir.inBattle ? (player.ir.secondaryColor + "7f") : "#00003f", border: "3px solid " + (player.ir.inBattle ? (player.ir.primaryColor + "7f") : "#5e4ee67f"), borderRadius: "0"}],
                            ], {display: player.ev.evolutionsUnlocked[14] ? "" : "none !important"}],

                        ], {width: player.ir.inBattle ? "800px" : "532px", height: "50px", borderRadius: "16px 16px 0 0"}],
                        ["style-row", [], {background: player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6", width: player.ir.inBattle ? "800px" : "532px", height: "3px"}],
                        ["buttonless-microtabs", "shipSelectionStats", {borderWidth: "0"}],
                    ]
                },
            },
        },
        shipSelectionProgression: {
            "space": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let maxListWidth = player.ir.inBattle ? 376 : 245
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                                let container = [["style-row", [], {width: player.ir.inBattle ? "782px" : "514px", marginRight: "24px"}]]
                                if (player.ir.shipBattleSaveCurrent == null || player.ir.type == 0) return container;
                                for (let [i, v] of Object.entries(SB_zones)) {
                                    if (!v.location || !v.unlocked() || (v.location && v.location != "space")) continue;
                                    let element = ["style-column", [
                                        ["style-column", [
                                            ["style-row", [
                                                ["raw-html", v.nameCap, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                            ], {background: v.secondaryColor, borderBottom: "3px solid" + v.primaryColor, borderRadius: "12px 12px 0 0", width: maxListWidth + "px", height: "25px"}],
                                            ["style-row", [
                                            ], {background: "black", borderRadius: "0 0 12px 12px", width: maxListWidth + "px", height: "27.5px"}],
                                        ], {background: "#37078f", borderRadius: "12px", width: maxListWidth + "px", height: "55.5px"}],
                                    ], {background: "#151230", border: "3px solid" + v.primaryColor, borderRadius: "15px", width: maxListWidth + "px", height: "55.5px", marginBottom: "6px", marginBottom: "6px", marginRight: "6px"}]
                                    let len = v.savePoints.length
                                    for (let i2 = 0; i2 < len; i2++) {
                                        let corners = "0 0"
                                        if (i2 == len - 1) corners += " 12px"; else corners += " 0";
                                        if (i2 == 0) corners += " 12px"; else corners += " 0";
                                        element[1][0][1][1][1].push(
                                            ["style-row", [
                                                ["raw-html", v.savePoints[i2] + 20, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                            ], {background: player.ir.shipBattleSaveCurrent && (player.ir.shipBattleSaveCurrent.perZoneHighestLevels[i] && player.ir.shipBattleSaveCurrent.perZoneHighestLevels[i][i2 * 20]) ? v.secondaryColor : "#361e1e", border: "3px solid " + v.primaryColor + "7f", borderRadius: corners, width: ((maxListWidth - len * 6) / len) + "px", height: "21.5px"}],
                                        )
                                    }
                                    container[0][1].push(element)
                                }
                                container.push(["style-column", [
                                    ["raw-html", "Each level can provide upgrades ONLY ONCE per save.<br>Repeated levels instead provide <span style='color:#ffb366;text-shadow:0 0 8px #ffb366'>space junk</span>.", { "color": "#aaa2f2", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "502px", marginBottom: "6px", marginRight: "24px"}])
                                return container
                            } (), {background: "repeating-linear-gradient(135deg, #1b0447 0 15px, #150336 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]//
                },
            },
            "blood": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let maxListWidth = player.ir.inBattle ? 376 : 245
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                                let container = [["style-row", [], {width: player.ir.inBattle ? "782px" : "514px", marginRight: "24px"}]]
                                if (player.ir.shipBattleSaveCurrent == null || player.ir.type == 0) return container;
                                for (let [i, v] of Object.entries(SB_zones)) {
                                    if (!v.location || !v.unlocked() || (v.location && v.location != "blood")) continue;
                                    let element = ["style-column", [
                                        ["style-column", [
                                            ["style-row", [
                                                ["raw-html", v.nameCap, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                            ], {background: v.secondaryColor, borderBottom: "3px solid" + v.primaryColor, borderRadius: "12px 12px 0 0", width: maxListWidth + "px", height: "25px"}],
                                            ["style-row", [
                                            ], {background: "black", borderRadius: "0 0 12px 12px", width: maxListWidth + "px", height: "27.5px"}],
                                        ], {background: "#37078f", borderRadius: "12px", width: maxListWidth + "px", height: "55.5px"}],
                                    ], {background: "#151230", border: "3px solid" + v.primaryColor, borderRadius: "15px", width: maxListWidth + "px", height: "55.5px", marginBottom: "6px", marginBottom: "6px", marginRight: "6px"}]
                                    let len = v.savePoints.length
                                    for (let i2 = 0; i2 < len; i2++) {
                                        let corners = "0 0"
                                        if (i2 == len - 1) corners += " 12px"; else corners += " 0";
                                        if (i2 == 0) corners += " 12px"; else corners += " 0";
                                        element[1][0][1][1][1].push(
                                            ["style-row", [
                                                ["raw-html", v.savePoints[i2] + 20, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                            ], {background: player.ir.shipBattleSaveCurrent && (player.ir.shipBattleSaveCurrent.perZoneHighestLevels[i] && player.ir.shipBattleSaveCurrent.perZoneHighestLevels[i][i2 * 20]) ? v.secondaryColor : "#361e1e", border: "3px solid " + v.primaryColor + "7f", borderRadius: corners, width: ((maxListWidth - len * 6) / len) + "px", height: "21.5px"}],
                                        )
                                    }
                                    container[0][1].push(element)
                                }
                                container.push(["style-column", [
                                    ["raw-html", "Each level can provide upgrades ONLY ONCE per save.<br>Repeated levels instead provide <span style='color:#ffb366;text-shadow:0 0 8px #ffb366'>space junk</span>.", { "color": "#aaa2f2", "font-size": "16px", "font-family": "monospace" }],
                                ], {width: "502px", marginBottom: "6px", marginRight: "24px"}])
                                return container
                            } (), {background: "repeating-linear-gradient(135deg, #260b0b 0 15px, #1c0808 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                },
            },
        },
        shipSelectionStats: {
            "finalStats": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let color1 = player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"
                    let color2 = player.ir.inBattle ? player.ir.secondaryColor : "#00007f"
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                                let container = []
                                if (player.ir.shipBattleSaveCurrent == null || player.ir.type == 0) return container;
                                let shipStats = SB_getUpgradedShipStats(arena ? arena.upgrades : player.ir.shipBattleSaveCurrent.upgrades)
                                let baseStats = SB_ships[player.ir.shipBattleSaveCurrent.type].baseStats
                                for (let [i, v] of Object.entries(shipStats)) {
                                    let statFormat = SHIP_STAT_FORMATTING[i]
                                    let prefix = statFormat.valuePrefix
                                    let suffix = statFormat.valueSuffix
                                    if ((i == "bloodStoneGain" || i == "bloodGemGain") && !hasUpgrade("le", 201)) {
                                        continue;
                                    }
                                    if (i == "healthRegen") {
                                        v *= 60
                                    }
                                    if (i == "attackSpeed") {
                                        v *= (1000 / baseStats.attackSpeed)
                                        prefix = ""
                                        suffix = "/s"
                                    }
                                    if (i == "bulletSize") {
                                        v *= baseStats.bulletRadius
                                        prefix = ""
                                    }
                                    if (i == "moveSpeed") {
                                        v *= baseStats.moveSpeed
                                        prefix = ""
                                    }
                                    container.push(["style-column", [
                                        ["style-row", [
                                            ["left-row", [
                                                ["raw-html", statFormat.name, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                            ], {borderRadius: "12px", width: "328px", height: "35.75px", paddingLeft: "12px"}],
                                            ["blank", "", {width: player.ir.inBattle ? "268px" : "0px"}],
                                            ["right-row", [
                                                ["raw-html", prefix + formatSimple(v, 2) + suffix, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                            ], {borderRadius: "12px", width: "150px", height: "35.75px", paddingRight: "12px"}],
                                        ], {background: color2, borderRadius: "12px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px"}],
                                    ], {background: "#151230", border: "3px solid " + color1, borderRadius: "15px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                                }
                                return container
                            } (), {background: player.ir.inBattle ? ("repeating-linear-gradient(135deg, " + player.ir.secondaryColor + "7f 0 15px, " + player.ir.secondaryColor + "5f 0 30px)") : "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
            },
            "baseStats": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let color1 = player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"
                    let color2 = player.ir.inBattle ? player.ir.secondaryColor : "#00007f"
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                            let container = []
                            if (player.ir.shipBattleSaveCurrent == null) return container;
                            let shipStats = SB_ships[player.ir.shipBattleSaveCurrent.type].baseStats
                            for (let [i, v] of Object.entries(SB_getDefaultShipStats())) {
                                v = shipStats[i]
                                let statFormat = SHIP_STAT_FORMATTING[i]
                                let prefix = statFormat.valuePrefix
                                let suffix = statFormat.valueSuffix
                                if ((i == "bloodStoneGain" || i == "bloodGemGain") && !hasUpgrade("le", 201)) {
                                    continue;
                                }
                                if (i == "attackSpeed") {
                                    v = 1000 / v
                                    prefix = ""
                                    suffix = "/s"
                                }
                                if (i == "bulletSize") {
                                    v = shipStats.bulletRadius
                                    prefix = ""
                                }
                                if (i == "moveSpeed") {
                                    prefix = ""
                                }
                                if (i == "spaceRockGain" || i == "spaceGemGain" || i == "bloodStoneGain" || i == "bloodGemGain") {
                                    prefix = "x"
                                }
                                if (i == "healthRegen") {
                                    v *= 60
                                }
                                container.push(["style-column", [
                                    ["style-row", [
                                        ["left-row", [
                                            ["raw-html", statFormat.name, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "328px", height: "35.75px", paddingLeft: "12px"}],
                                        ["blank", "", {width: player.ir.inBattle ? "268px" : "0px"}],
                                        ["right-row", [
                                            ["raw-html", prefix + formatSimple(v, 2) + suffix, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "150px", height: "35.75px", paddingRight: "12px"}],
                                    ], {background: color2, borderRadius: "12px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px"}],
                                ], {background: "#151230", border: "3px solid " + color1, borderRadius: "15px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                            }
                                return container
                            } (), {background: player.ir.inBattle ? ("repeating-linear-gradient(135deg, " + player.ir.secondaryColor + "7f 0 15px, " + player.ir.secondaryColor + "5f 0 30px)") : "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
            },
            "upgradeEffects": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let color1 = player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"
                    let color2 = player.ir.inBattle ? player.ir.secondaryColor : "#00007f"
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                            let container = []
                            if (player.ir.shipBattleSaveCurrent == null) return container;
                            for (let [i, v] of Object.entries(arena ? SB_getUpgradeMultis(arena.upgrades) : player.ir.shipBattleSaveCurrent.upgradeMultis)) {
                                let statFormat = SHIP_STAT_FORMATTING[i]
                                let prefix = "x"
                                if (i == "healthRegen") {
                                    v *= 60
                                    prefix = "+"
                                }
                                container.push(["style-column", [
                                    ["style-row", [
                                        ["left-row", [
                                            ["raw-html", statFormat.name, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "328px", height: "35.75px", paddingLeft: "12px"}],
                                        ["blank", "", {width: player.ir.inBattle ? "268px" : "0px"}],
                                        ["right-row", [
                                            ["raw-html", prefix + formatSimple(v, 2) + SHIP_STAT_FORMATTING[i].valueSuffix, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "150px", height: "35.75px", paddingRight: "12px"}],
                                    ], {background: "#00007f", borderRadius: "12px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px"}],
                                ], {background: "#151230", border: "3px solid " + color1, borderRadius: "15px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                            }
                            container.push(["style-column", [
                                ["raw-html", "Each upgrade stacks additively with others of its exact type, but multiplicatively with all others.", { "color": "#aaa2f2", "font-size": "16px", "font-family": "monospace" }],
                            ], {width: "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                                return container
                            } (), {background: player.ir.inBattle ? ("repeating-linear-gradient(135deg, " + player.ir.secondaryColor + "7f 0 15px, " + player.ir.secondaryColor + "5f 0 30px)") : "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
            },
            "upgradeCounts": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let color1 = player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"
                    let color2 = player.ir.inBattle ? player.ir.secondaryColor : "#00007f"
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                            let container = []
                            if (player.ir.shipBattleSaveCurrent == null) return container;
                            let entries = Object.entries(arena ? arena.upgrades : player.ir.shipBattleSaveCurrent.upgrades)
                            let entriesIndex = 0
                            for (let [i, v] of entries) {
                                entriesIndex++
                                if (v <= 0) continue;
                                let upgrade = UPGRADE_POOL[i]
                                container.push(["style-column", [
                                    ["tooltip-row", [
                                        ["left-row", [
                                            ["raw-html", upgrade.name(), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "328px", height: "35.75px", paddingLeft: "12px"}],
                                        ["blank", "", {width: player.ir.inBattle ? "268px" : "0px"}],
                                        ["right-row", [
                                            ["raw-html", formatWhole(v, 2), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "150px", height: "35.75px", paddingRight: "12px"}],
                                        ["raw-html", "<div class='bottomTooltip'>" + upgrade.description() + "</div>"],
                                    ], {borderRadius: "12px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px"}],
                                ], {background: "#00007f border-box", border: "3px solid " + UPGRADE_RARITIES[upgrade.rarity].color + "bf", borderRadius: "15px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                            }
                            container.push(["style-column", [
                                ["raw-html", "Each upgrade stacks additively with others of its exact type, but multiplicatively with all others.", { "color": "#aaa2f2", "font-size": "16px", "font-family": "monospace" }],
                            ], {width: "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                                return container
                            } (), {background: player.ir.inBattle ? ("repeating-linear-gradient(135deg, " + player.ir.secondaryColor + "7f 0 15px, " + player.ir.secondaryColor + "5f 0 30px)") : "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
            },
            "salvagedUpgrades": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content() {
                    let color1 = player.ir.inBattle ? player.ir.primaryColor : "#5e4ee6"
                    let color2 = player.ir.inBattle ? player.ir.secondaryColor : "#00007f"
                    return [
                        ["always-scroll-column", [
                            ["top-column", function () {
                            let container = []
                            if (player.ir.shipBattleSaveCurrent == null) return container;
                            let entries = Object.entries(arena ? arena.upgrades : player.ir.shipBattleSaveCurrent.bankedSalvagedUpgrades)
                            let entriesIndex = 0
                            for (let [i, v] of entries) {
                                entriesIndex++
                                if (v <= 0) continue;
                                let upgrade = UPGRADE_POOL[i]
                                container.push(["style-column", [
                                    ["tooltip-row", [
                                        ["left-row", [
                                            ["raw-html", upgrade.name(), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "328px", height: "35.75px", paddingLeft: "12px"}],
                                        ["blank", "", {width: player.ir.inBattle ? "268px" : "0px"}],
                                        ["right-row", [
                                            ["raw-html", formatWhole(v, 2), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {borderRadius: "12px", width: "150px", height: "35.75px", paddingRight: "12px"}],
                                        ["raw-html", "<div class='bottomTooltip'>" + upgrade.description() + "</div>"],
                                    ], {borderRadius: "12px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px"}],
                                ], {background: "#00007f border-box", border: "3px solid " + UPGRADE_RARITIES[upgrade.rarity].color + "bf", borderRadius: "15px", width: player.ir.inBattle ? "770px" : "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                            }
                            container.push(["style-column", [
                                ["raw-html", "Each upgrade stacks additively with others of its exact type, but multiplicatively with all others.", { "color": "#aaa2f2", "font-size": "16px", "font-family": "monospace" }],
                            ], {width: "502px", height: "35.75px", marginBottom: "6px", marginRight: "24px"}])
                                return container
                            } (), {background: player.ir.inBattle ? ("repeating-linear-gradient(135deg, " + player.ir.secondaryColor + "7f 0 15px, " + player.ir.secondaryColor + "5f 0 30px)") : "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", width: player.ir.inBattle ? "800px" : "532px", minHeight: player.ir.inBattle ? "688px" : "382px", padding: "6px", paddingBottom: "0"}],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
            },
        },
        automation: {
            "spaceJunkUpgrades": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["blank", "4.5px"],
                    ["style-row", [
                        ["buyable", 301], ["buyable", 302],
                    ]],
                    ["style-row", [
                        ["buyable", 303], ["upgrade", 301],
                    ]],
                    ["style-row", [
                        ["upgrade", 302], ["upgrade", 303],
                    ]],
                    ["blank", "4.5px"],
                    ["raw-html", "Gain <span style='color:#ffb366;text-shadow:0 0 6px #ffb366'>space junk</span> in place of ship level-up upgrades you're already obtained.", { "color": "#aaa2f2", "font-size": "12px", "font-family": "monospace" }],
                ],
            },
            "shipUpgrades": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["blank", "4.5px"],
                    ["style-column", [
                        ["style-row", [
                            ["upgrade", 401], ["upgrade", 402],
                        ]],
                        ["style-row", [
                            ["upgrade", 403], ["upgrade", 404],
                        ]],
                        ["style-row", [
                            ["upgrade", 405], ["upgrade", 406],
                        ]],
                        ["style-row", [
                            ["upgrade", 407], ["upgrade", 408],
                        ]],
                        ["style-row", [
                            ["upgrade", 409], ["upgrade", 410],
                        ]],
                        ["style-row", [
                            ["upgrade", 411], ["upgrade", 412],
                        ]],
                    ]],
                    ["blank", "4.5px"],
                    ["raw-html", "You must have a saved ship selected in order to purchase ship upgrades.", { "color": "#aaa2f2", "font-size": "12px", "font-family": "monospace" }],
                ],
            },
            "resourceExtraction": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [

                ],
            },
        },
        ships: {
            "levelables": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["style-row", [
                        ["style-column", [
                            ["blank", "5.5px"],
                            ["raw-html", () => {return "Ship Selected: <span style='color:#ffff00'>" + (player.ir.shipBattleSaveCurrent == null ? "<span style='color:#aaa2f2'>None" : (layers.ir.levelables[player.ir.shipBattleSaveCurrent.type].title() + " " + (player.ir.shipBattleSaveCurrent.slot === -2 ? "(Latest Run)" : player.ir.shipBattleSaveCurrent.slot === -1 ? "<span style='color:#aaa2f2'>(New Run)" : ("<span style='color:#aaa2f2'>(Slot #" + (player.ir.shipBattleSaveCurrent.slot + 1) + ")"))))}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "8.5px"],
                            ["clickable", "newRun"],
                        ], {width: "535px"}],
                        ["style-column", [
                            ["blank", "33px"],
                            ["clickable", "toggleMobileControls"],
                        ], {width: "259px", marginRight: "6px"}],
                    ], {width: "800px", minHeight: "95px", background: "#00007f"}],
                    ["style-row", [], {width: "800px", height: "3px", background: "#5e4ee6"}],
                    ["always-scroll-column", [
                        ["top-column", [
                            ["row", [
                                ["dark-extended-levelable", 1], ["dark-extended-levelable", 2],
                                ["dark-extended-levelable", 3], ["dark-extended-levelable", 4],
                                ["dark-extended-levelable", 5], ["dark-extended-levelable", 6],
                                ["dark-extended-levelable", 7], ["dark-extended-levelable", 8],
                                ["dark-extended-levelable", 9], ["dark-extended-levelable", 10],
                            ]],
                        ], {width: "780px", minHeight: "573px", background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", padding: "3px", marginRight: "20px"}],
                    ], {width: "800px", height: "579px"}],
                ]
            },
            "saves": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["style-row", [
                        ["style-column", [
                            ["blank", "5.5px"],
                            ["raw-html", () => {return "Ship Selected: <span style='color:#ffff00'>" + (player.ir.shipBattleSaveCurrent == null ? "<span style='color:#aaa2f2'>None" : (layers.ir.levelables[player.ir.shipBattleSaveCurrent.type].title() + " " + (player.ir.shipBattleSaveCurrent.slot === -2 ? "(Latest Run)" : player.ir.shipBattleSaveCurrent.slot === -1 ? "<span style='color:#aaa2f2'>(New Run)" : ("<span style='color:#aaa2f2'>(Slot #" + (player.ir.shipBattleSaveCurrent.slot + 1) + ")"))))}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "8.5px"],
                            ["clickable", "newRun"],
                        ], {width: "535px"}],
                        ["style-column", [
                            ["blank", "33px"],
                            ["clickable", "toggleMobileControls"],
                        ], {width: "259px", marginRight: "6px"}],
                    ], {width: "800px", minHeight: "95px", background: "#00007f"}],
                    ["style-row", [], {width: "800px", height: "3px", background: "#5e4ee6"}],
                    ["style-row", [
                        ["top-column", [
                            ["style-column", () => {
                                let container = []
                                if (player.ir.shipBattleSaveCurrent == null) return container;
                                container.push(
                                    ["style-column", [
                                        ["raw-html", "<i>" + layers.ir.levelables[player.ir.shipBattleSaveCurrent.type].lore() + "</i>", { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                    ], {width: "508px"}],
                                )
                                return container
                            }, {background: "#00007f", width: "532px", height: "82px"}],
                            ["style-row", [], {background: "#5e4ee6", width: "532px", height: "3px"}],
                            ["style-row", [
                                ["category-button", ["Progression", "shipSelection", "shipSelectionProgression"], {width: "264px", height: "50px", background: "#00005f", border: "3px solid #5e4ee67f", borderRadius: "0"}],
                                ["style-row", [], {width: "3px", height: "50px", backgroundColor: "#5e4ee6"}],
                                ["category-button", ["Stats", "shipSelection", "shipSelectionStats"], {width: "265px", height: "50px", background: "#00005f", border: "3px solid #5e4ee67f", borderRadius: "0"}],
                            ], {width: "532px", height: "50px", borderRadius: "16px 16px 0 0"}],
                            ["style-row", [], {background: "#5e4ee6", width: "532px", height: "3px"}],
                            ["buttonless-microtabs", "shipSelection", {borderWidth: "0"}],
                        ], {borderRight: "3px solid #5e4ee6", height: "579px"}],
                        ["always-scroll-column", [
                            ["top-column", () => {
                                let container = []
                                let maxSaves = 3
                                if (hasUpgrade('ir', 107)) maxSaves++;
                                if (player.bl.noxDefeated) maxSaves++;
                                for (let i = 0; i < maxSaves; i++) {
                                    let save = player.ir.shipBattleSaves[i]
                                    container.push(["style-column", [
                                        ["style-column", [
                                            ["raw-html", "Slot #" + (i + 1), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {height: "25px"}],
                                        ["style-row", [], {background: "#5e4ee6", width: "232px", height: "3px"}],
                                        ["style-column", [
                                            ["raw-html", (save == null ? "<span style='color:#aaa2f2'>Empty" : (
                                                layers.ir.levelables[save.type].title()
                                                + "<br><span style='color:#aaa2f2;font-size:12px'>Upgrade Count: " + formatSimple(save.upgradeCount, 2)
                                                + "<br>Upgrade Score: " + formatSimple(save.upgradeScore, 2)
                                            )), { "color": "yellow", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black", "font-size": "16px", "font-family": "monospace" }],
                                        ], {height: "98px"}],
                                        ["style-row", [], {background: "#5e4ee6", width: "232px", height: "3px"}],
                                        ["clickable", "loadShipSave_" + i],
                                    ], {background: "#151230", border: "3px solid #5e4ee6", borderRadius: "15px", marginBottom: "6px", width: "232px", height: "179px"}])
                                }
                                return container
                            }, {width: "238px", minHeight: "567px", background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", padding: "6px", paddingBottom: "0", marginRight: "0px"}],
                        ], {width: "265px", height: "579px"}],
                    ], {width: "800px", height: "579px"}],
                ]
            },
            "automation": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return !player.ir.iriditeUnlocked && !player.ir.inBattle },
                content: [
                    ["style-column", [
                        ["style-column", [
                            ["blank", "5.5px"],
                            ["raw-html", function () { return "You have <span style='color:#ffe066;text-shadow:0 0 8px #ffe066'>" + formatWhole(player.ir.spaceRock) + " space rocks</span>, <span style='color:#66e8ff;text-shadow:0 0 8px #66e8ff'>" + formatWhole(player.ir.spaceGem) + " space gems</span>, and <span style='color:#ffb366;text-shadow:0 0 8px #ffb366'>" + formatWhole(player.ir.spaceJunk) + " space junk</span>."  }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                            ["blank", "8.5px"],
                        ], {width: "800px"}],
                        ["style-row", [
                            ["style-column", [
                                ["clickable", "gainAutoStats"],
                            ], {width: "535px"}],
                            ["style-row", [
                                ["clickable", "toggleMobileControls"],
                            ], {width: "259px", marginRight: "6px"}],
                        ], {width: "800px", marginRight: "6px"}],
                    ], {width: "800px", minHeight: "95px", background: "#00007f"}],
                    ["style-row", [], {width: "800px", height: "3px", background: "#5e4ee6"}],
                    ["style-row", [
                        ["top-column", [
                            ["style-row", [
                                ["category-button", ["Space Junk Upgrades", "automation", "spaceJunkUpgrades"], {width: "264px", height: "50px", background: "#00005f", border: "3px solid #5e4ee67f", borderRadius: "0"}],
                                ["style-row", [], {width: "3px", height: "50px", backgroundColor: "#5e4ee6"}],
                                ["category-button", [() => {return "Ship Upgrades<br><small>(Reroll in " + formatSimpleTime(player.ir.shipUpgradeRerollTimer) + ")"}, "automation", "shipUpgrades"], {width: "264px", height: "50px", background: "#00005f", border: "3px solid #5e4ee67f", borderRadius: "0"}],
                                //["style-row", [], {width: "3px", height: "50px", backgroundColor: "#5e4ee6"}],
                                /*["style-row", [
                                    ["style-row", [
                                        ["raw-html", "???", { "color": "#ffffff7f", "font-size": "16px", "font-family": "monospace" }],
                                    ], {width: "176px", height: "50px", background: "#00003f", borderRadius: "0"}],
                                ], () => {return {display: hasUpgrade("ir", 302) ? "none !important" : ""}}],
                                ["style-row", [
                                    ["category-button", ["Resource Extraction", "automation", "resourceExtraction"], {width: "176px", height: "50px", background: "#00005f", border: "3px solid #5e4ee67f", borderRadius: "0"}],
                                ], () => {return {display: hasUpgrade("ir", 302) ? "" : "none !important"}}],*/
                            ], {}],

                            ["style-row", [], {background: "#5e4ee6", width: "532px", height: "3px"}],
                            ["buttonless-microtabs", "automation", {borderWidth: "0"}],
                        ], {background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", borderRight: "3px solid #5e4ee6", width: "532px", height: "579px"}],
                        ["always-scroll-column", [
                            ["top-column", () => {
                                let container = []
                                let maxSaves = 3
                                if (hasUpgrade('ir', 107)) maxSaves++;
                                if (player.bl.noxDefeated) maxSaves++;
                                for (let i = 0; i < maxSaves; i++) {
                                    let save = player.ir.shipBattleSaves[i]
                                    container.push(["style-column", [
                                        ["style-column", [
                                            ["raw-html", "Slot #" + (i + 1), { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                                        ], {height: "25px"}],
                                        ["style-row", [], {background: "#5e4ee6", width: "232px", height: "3px"}],
                                        ["style-column", [
                                            ["raw-html", (save == null ? "<span style='color:#aaa2f2'>Empty" : (
                                                layers.ir.levelables[save.type].title()
                                                + "<br><span style='color:#aaa2f2;font-size:12px'>Upgrade Count: " + formatSimple(save.upgradeCount, 2)
                                                + "<br>Upgrade Score: " + formatSimple(save.upgradeScore, 2)
                                            )), { "color": "yellow", textShadow: "1px 1px 1px black, -1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black", "font-size": "16px", "font-family": "monospace" }],
                                        ], {height: "98px"}],
                                        ["style-row", [], {background: "#5e4ee6", width: "232px", height: "3px"}],
                                        ["clickable", "loadShipSave_" + i],
                                    ], {background: "#151230", border: "3px solid #5e4ee6", borderRadius: "15px", marginBottom: "6px", width: "232px", height: "179px"}])
                                }
                                return container
                            }, {width: "238px", minHeight: "567px", background: "repeating-linear-gradient(135deg, #00003f 0 15px, #00002f 0 30px)", padding: "6px", paddingBottom: "0", marginRight: "0px"}],
                        ], {width: "265px", height: "579px"}],
                    ], {width: "800px", height: "579px"}],
                ]
            },
        },
        stuff: {
            "Battle": {
                buttonStyle() { return {color: "white", borderRadius: "5px", borderColor: "#37078f"}},
                unlocked() { return false },
                content() {
                    let container = !arena ? [] : [
                        ["style-column", [
                            ["style-column", [

                                ["top-column", [
                                    ["blank", "3px"],
                                    // TOP OF UI
                                    ["style-row", [
                                        ["style-column", [
                                            ["raw-html", "Level: " + formatWhole(player.ir.battleLevel) + "<span style='font-size:" + (arena.UIScale * 18) + "px'> / " + formatWhole(SB_zones[player.ir.battleStage].levelLimit) + "</span>", { "color": "white", textShadow: "0 0 10px " + player.ir.primaryColor, "font-size": (arena.UIScale * 27) + "px", "font-family": "monospace", lineHeight: "1" }],
                                        ], {width: (arena.UIScale * arena.canvasWidth / 2) + "px"}],
                                        ["style-column", [
                                            ["raw-html", "[x" + format(player.ir.levelScalingMult) + " Difficulty]", { "color": "#ff7f7f", textShadow: "0 0 10px red", "font-size": (arena.UIScale * 18) + "px", "font-family": "monospace", marginLeft: "6px", marginRight: "6px" }],
                                        ], {width: (arena.UIScale * arena.canvasWidth / 2) + "px", lineHeight: "1", display: player.ir.battleLevel.gt(player[player.ir.battleStage].levelScalingStart) ? "" : "none !important"}],
                                    ], {height: (arena.UIScale * 50) + "px"}],
                                    ["style-row", [
                                        ["bar", "health"],
                                        ["style-column", [], {width: (arena.UIScale * 6) + "px", height: (arena.UIScale * 40) + "px"}],
                                        ["bar", "xp"],
                                    ], {height: (arena.UIScale * 44) + "px"}],
                                ], {width: (arena.UIScale * arena.canvasWidth) + "px", height: (arena.UIScale * 100) + "px"}],

                                ["style-column", [
                                    // STUFF THAT GOES OVER THE ARENA GOES HERE
                                ], {background:"black", width: (arena.UIScale * arena.canvasWidth) + "px", height: (arena.UIScale * (arena.canvasHeight + 6)) + "px"}],

                                ["top-column", [
                                    // BOTTOM OF UI
                                    ["row", [
                                        ["clickable", "exitRun"],
                                        ["clickable", "toggleAutoShoot"],
                                        ["clickable", "pause"],
                                    ], {padding: (arena.UIScale * 3) + "px"}],
                                    ["raw-html", "Use W and S to more forwards or backwards, A to D to rotate, and Space or Mouse to shoot.", { "color": "white", "font-size": (arena.UIScale * 12) + "px", "font-family": "monospace" }],
                                ], {width: (arena.UIScale * arena.canvasWidth) + "px", height: (arena.UIScale * 100) + "px"}],

                            ], {boxShadow: "0 0 32px " + player.ir.primaryColor, background: player.ir.secondaryColor, border: (arena.UIScale * 3) + "px solid " + player.ir.primaryColor, borderRadius: "25px"}]
                        ], {width: "100vw", height: "100vh"}]
                    ]
                    return container
                },
            },
        },
        battleUpgradeSelection: {
            "experience": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content() {
                    return [
                        ["style-column", [
                            ["raw-html", "<h2>Choose an Upgrade!", { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["blank", "10px"],
                            ["style-row", [
                                ["clickable", "levelUpUpgrade_0"],
                                ["clickable", "levelUpUpgrade_1"],
                                ["clickable", "levelUpUpgrade_2"],
                            ], {width: "800px", background: player.ir.secondaryColor, height: "174px", border: "3px solid " + player.ir.primaryColor, borderLeft: "0", borderRight: "0"}],
                            ["blank", "10px"],
                            ["clickable", "levelUpUpgrade_confirm"],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
            },
            "salvage": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return false },
                content() {
                    return [
                        ["style-column", [
                            ["raw-html", "<h2>Choose a Salvaged Upgrade!", { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                            ["blank", "10px"],
                            ["style-row", [
                                ["style-row", [], {background: "#00007f7f", borderRadius: "10px", width: "250px", height: "150px", margin: "6px", display: arena && arena.salvagedUpgradeChoices.length > 0 ? "none !important" : ""}],
                                ["clickable", "salvagedUpgrade_0"],
                                ["style-row", [], {background: "#00007f7f", borderRadius: "10px", width: "250px", height: "150px", margin: "6px", display: arena && arena.salvagedUpgradeChoices.length > 1 ? "none !important" : ""}],
                                ["clickable", "salvagedUpgrade_1"],
                                ["style-row", [], {background: "#00007f7f", borderRadius: "10px", width: "250px", height: "150px", margin: "6px", display: arena && arena.salvagedUpgradeChoices.length > 2 ? "none !important" : ""}],
                                ["clickable", "salvagedUpgrade_2"],
                            ], {width: "800px", background: "radial-gradient(circle, #ffb366, " + player.ir.secondaryColor + ")", height: "174px", border: "3px solid " + player.ir.primaryColor, borderLeft: "0", borderRight: "0"}],
                            ["blank", "10px"],
                            ["clickable", "salvagedUpgrade_confirm"],
                        ], {width: player.ir.inBattle ? "800px" : "532px", height: player.ir.inBattle ? "694px" : "388px"}],
                    ]
                }
            },
        },
    },
    tabFormat: [
        ["buttonless-microtabs", "stuff", {border: "0", marginTop: "-50px"}],
    ],
    layerShown() {return player.startedGame == true},
})

addLayer("shipBattleLocation_space", {
    name: "Ship Battle Location: Space", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SBL", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "SB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        selectedZone: "spaceZone1",
    }},
    automate() {},
    nodeStyle() { return { background: "#37078f", backgroundOrigin: "border-box", borderColor: "#5e4ee6", color: "#eaf6f7", }; },
    tooltip: "Ship Battle Location: Space",
    branches: [],
    color: "#ffffff",
    update(delta) {},
    clickables: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    microtabs: {

    },
    tabFormat: [],
    layerShown() {return player.startedGame == true},
})

SB_locations.space = {
    name: "Space",
    condition: function () {
        return player.tab == "ir"
    },
    onExit: function () {
        player.tab = "ir"
    },
    locationTheme: {
        primaryColor: "#5e4ee6",
        secondaryColor: "#37078f",
        backgroundColor: "#151230",
        primaryTextColor: "#ffffff",
        secondaryTextColor: "#aaa2f2",
    },
}

SB_locations.blood = {
    name: "Blood",
    condition: function () {
        return player.tab == "bl"
    },
    onExit: function () {
        player.tab = "bl"
    },
    locationTheme: {
        primaryColor: "#f57171",
        secondaryColor: "#4f1818",
        backgroundColor: "#260b0b",
        primaryTextColor: "#ffffff",
        secondaryTextColor: "#f2cbcb",
    },
}

SB_locations.ascensionRitual = {
    name: "Ascension Ritual",
    condition: function () {
        return player.tab == "cbs"
    },
    onExit: function () {
        player.tab = "cbs"
    },
    locationTheme: {
        primaryColor: "#3383ab",
        secondaryColor: "#064666",
        backgroundColor: "#032333",
        primaryTextColor: "#ffffff",
        secondaryTextColor: "#c6f7ff",
    },
}