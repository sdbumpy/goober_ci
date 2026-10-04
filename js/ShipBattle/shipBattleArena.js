let arena = null; // Global arena instance

// Restore arena on refresh if needed
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('arenaActive') === 'true') {
        arena = new SpaceArena(800, 600);
        arena.spawnArena();
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let addUpgrade = function (id) {
    arena.upgrades[id]++;
    arena.perZoneUpgrades[id]++;
}

// Upgrade definitions
const UPGRADE_POOL = {
    // Common
    attackDamageCommon: {
        name() { return "Attack Damage" },
        description() { return "+5% attack damage"},
        rarity: "common",
        effect() { addUpgrade("attackDamageCommon") },
    },
    xpGainCommon: {
        name() { return "XP Gain"},
        description() { return "+5% XP gain"},
        rarity: "common",
        effect() { addUpgrade("xpGainCommon") },
    },
    // Uncommon
    attackDamageUncommon: {
        name() { return "Attack Damage"},
        description() { return "+10% attack damage"},
        rarity: "uncommon",
        effect() { addUpgrade("attackDamageUncommon") },
    },
    attackSpeedUncommon: {
        name() { return "Attack Speed"},
        description() { return "+5% faster attack speed"},
        rarity: "uncommon",
        effect() { addUpgrade("attackSpeedUncommon") },
    },
    healthRegenUncommon: {
        name() { return "Health Regen"},
        description() {
            let regen = 0.5
            regen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()
            return "+" + formatSimple(regen, 2) + " HP/sec"
        },
        rarity: "uncommon",
        effect() {
            arena.upgrades.healthRegenUncommon++;
        },
        multi() {
            let regen = 0.5
            regen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()
            return arena.upgrades.attackSpeedUncommon * regen;
        },
    },
    xpGainUncommon: {
        name() { return "XP Gain"},
        description() { return "+10% XP gain"},
        rarity: "uncommon",
        effect() { addUpgrade("xpGainUncommon") },
    },
    attackDamageRare: {
        name() { return "Attack Damage"},
        description() { return "+15% attack damage"},
        rarity: "rare",
        effect() { addUpgrade("attackDamageRare") },
    },
    attackSpeedRare: {
        name() { return "Attack Speed"},
        description() { return "+7.5% faster attack speed"},
        rarity: "rare",
        effect() { addUpgrade("attackSpeedRare") },
    },
    healthRegenRare: {
        name() { return "Health Regen"},
        description() {
            let regen = 0.75
            regen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()
            return "+" + formatSimple(regen, 2) + " HP/sec"
        },
        rarity: "rare",
        effect() {
            arena.upgrades.healthRegenRare++;
        },
        multi() {
            let regen = 0.75
            regen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()
            return arena.upgrades.healthRegenRare * regen;
        },
    },
    damageReductionRare: {
        name() { return "Defense"},
        description() { return "Take 10% less damage"},
        rarity: "rare",
        effect() { addUpgrade("damageReductionRare") },
    },
    moveSpeedRare: {
        name() { return "Movement Speed"},
        description() { return "+10% max movement speed"},
        rarity: "rare",
        effect() { addUpgrade("moveSpeedRare") },
    },
    bulletSizeRare: {
        name() {if (player.ir.type != 3 && player.ir.type != 7 && player.ir.type != 8) {return "Bullet Size"} else {return "Max Health"}},
        description() {if (player.ir.type != 3 && player.ir.type != 7 && player.ir.type != 8) {return "+10% bullet size"} else {return "+10% max HP"}},
        rarity: "rare",
        effect() { addUpgrade("bulletSizeRare") },
    },
    xpGainRare: {
        name() { return "XP Gain"},
        description() { return "+15% XP gain"},
        rarity: "rare",
        effect() { addUpgrade("xpGainRare") },
    },
    attackEpic: {
        name() { return "Attack"},
        description() { return "+15% attack damage, +7.5% faster attack speed"},
        rarity: "epic",
        effect() { addUpgrade("attackEpic") },
    },
    xpGainEpic: {
        name() { return "XP Gain"},
        description() { return "+20% XP gain"},
        rarity: "epic",
        effect() { addUpgrade("xpGainEpic") },
    },
    defenseEpic: {
        name() { return "Defense"},
        description() {
            let regen = 0.75
            regen *= getBuyableAmount("bl", 13).div(50).add(1).toNumber()
            return "Take 15% less damage, +" + formatSimple(regen, 2) + " HP/sec"
        },
        rarity: "epic",
        effect() { addUpgrade("defenseEpic") },
    },
    attackLegendary: {
        name() { return "Attack"},
        description() { return "+30% attack damage, but +20% slower attack speed"},
        rarity: "legendary",
        effect() { addUpgrade("attackLegendary") },
    },
    defenseLegendary: {
        name() { return "Defense"},
        description() { return "Take 20% less damage, gain 20% more HP/sec" },
        rarity: "legendary",
        effect() { addUpgrade("defenseLegendary") },
    },
    moveSpeedLegendary: {
        name() { return "Movement Speed"},
        description() { return "+25% max movement speed"},
        rarity: "legendary",
        effect() { addUpgrade("moveSpeedLegendary") },
    },

    // SPACE

    spaceRockGainCommon: {
        name() { return "Space Rock Gain"},
        description() { return "+5% space rock gain"},
        rarity: "common",
        pool: "space",
        effect() { addUpgrade("spaceRockGainCommon") },
    },
    spaceRockGainUncommon: {
        name() { return "Space Rock Gain"},
        description() { return "+10% space rock gain"},
        rarity: "uncommon",
        pool: "space",
        effect() { addUpgrade("spaceRockGainUncommon") },
    },
    spaceRockGainRare: {
        name() { return "Space Rock Gain"},
        description() { return "+15% space rock gain"},
        rarity: "rare",
        pool: "space",
        effect() { addUpgrade("spaceRockGainRare") },
    },
    spaceGemGainRare: {
        name() { return "Space Gem Gain"},
        description() { return "+5% space gem gain"},
        rarity: "rare",
        pool: "space",
        effect() { addUpgrade("spaceGemGainRare") },
    },
    lootGainEpic: {
        name() { return "Loot Gain"},
        description() { return "+15% space rock gain, +5% space gem gain"},
        rarity: "epic",
        pool: "space",
        effect() { addUpgrade("lootGainEpic") },
    },
    dropGainLegendary: {
        name() { return "Drop Gain"},
        description() { return "+20% space rock, space gem, and XP gain"},
        rarity: "legendary",
        pool: "space",
        effect() { addUpgrade("dropGainLegendary") },
    },

    // BLOOD

    bloodStoneGainCommon: {
        name() { return "Blood Stone Gain"},
        description() { return "+5% blood stone gain"},
        rarity: "common",
        pool: "blood",
        effect() { addUpgrade("bloodStoneGainCommon") },
    },
    bloodStoneGainUncommon: {
        name() { return "Blood Stone Gain"},
        description() { return "+10% blood stone gain"},
        rarity: "uncommon",
        pool: "blood",
        effect() { addUpgrade("bloodStoneGainUncommon") },
    },
    bloodStoneGainRare: {
        name() { return "Blood Stone Gain"},
        description() { return "+15% blood stone gain"},
        rarity: "rare",
        pool: "blood",
        effect() { addUpgrade("bloodStoneGainRare") },
    },
    bloodGemGainRare: {
        name() { return "Blood Gem Gain"},
        description() { return "+5% blood gem gain"},
        rarity: "rare",
        pool: "blood",
        effect() { addUpgrade("bloodGemGainRare") },
    },
    bloodLootGainEpic: {
        name() { return "Blood Loot Gain"},
        description() { return "+15% blood stone gain, +5% blood gem gain"},
        rarity: "epic",
        pool: "blood",
        effect() { addUpgrade("bloodLootGainEpic") },
    },
    bloodLootGainLegendary: {
        name() { return "Blood Loot Gain"},
        description() { return "+20% blood stone and blood gem gain"},
        rarity: "legendary",
        pool: "blood",
        effect() { addUpgrade("bloodLootGainLegendary") },
    },

    // JUNK

    spaceJunkGainCommon: {
        name() { return "Space Junk Gain"},
        description() { return "+5% space junk gain"},
        rarity: "common",
        pool: "junk",
        effect() { addUpgrade("spaceJunkGainCommon") },
    },
    spaceJunkGainUncommon: {
        name() { return "Space Junk Gain"},
        description() { return "+10% space junk gain"},
        rarity: "uncommon",
        pool: "junk",
        effect() { addUpgrade("spaceJunkGainUncommon") },
    },
    spaceJunkGainRare: {
        name() { return "Space Junk Gain"},
        description() { return "+15% space junk gain"},
        rarity: "rare",
        pool: "junk",
        effect() { addUpgrade("spaceJunkGainRare") },
    },
    spaceJunkGainEpic: {
        name() { return "Space Junk Gain"},
        description() { return "+20% space junk gain"},
        rarity: "epic",
        pool: "junk",
        effect() { addUpgrade("spaceJunkGainEpic") },
    },
    spaceJunkGainLegendary: {
        name() { return "Space Junk Gain"},
        description() { return "+25% space junk gain"},
        rarity: "legendary",
        pool: "junk",
        effect() { addUpgrade("spaceJunkGainLegendary") },
    },
};

const UPGRADE_RARITIES = {
    common: {
        weight() {
            let base = 80
            return base
        },
        color: "#ffffff",
        baseCost: new Decimal(50),
        costGrowth: new Decimal(1.2),
        score: 0,
    },
    uncommon: {
        weight() {
            let base = this.enhanced ? 60 : 40;
            return base
        },
        color: "#4cff4c",
        baseCost: new Decimal(150),
        costGrowth: new Decimal(1.4),
        score: 1,
    },
    rare: {
        weight() {
            let base = this.enhanced ? 40 : 20;
            return base
        },
        color: "#4c8cff",
        baseCost: new Decimal(600),
        costGrowth: new Decimal(1.6),
        score: 2,
    },
    epic: {
        weight() {
            let base = this.enhanced ? 20 : 10;
            return base
        },
        color: "#b44cff",
        baseCost: new Decimal(3000),
        costGrowth: new Decimal(2),
        score: 3,
    },
    legendary: {
        weight() {
            let base = this.enhanced ? 4 : 1;
            return base
        },
        color: "#ffd34d",
        baseCost: new Decimal(20000),
        costGrowth: new Decimal(3),
        score: 6,
    },
};

const SHIP_STAT_FORMATTING = {
    attackDamage: {
        name: "Attack Damage",
        valuePrefix: "",
        valueSuffix: "",
        showCondition() {return true},
    },
    attackSpeed: {
        name: "Attack Speed",
        valuePrefix: "x",
        valueSuffix: "",
        showCondition() {return true},
    },
    bulletSize: {
        name: "Bullet Size",
        valuePrefix: "x",
        valueSuffix: "",
        showCondition() {return true},
    },
    healthRegen: {
        name: "Health Regen",
        valuePrefix: "+",
        valueSuffix: "/s",
        showCondition() {return true},
    },
    damageReduction: {
        name: "Damage Reduction",
        valuePrefix: "/",
        valueSuffix: "",
        showCondition() {return true},
    },
    maxHp: {
        name: "Max Health",
        valuePrefix: "",
        valueSuffix: "",
        showCondition() {return true},
    },
    moveSpeed: {
        name: "Movement Speed",
        valuePrefix: "x",
        valueSuffix: "",
        showCondition() {return true},
    },
    spaceRockGain: {
        name: "Space Rock Gain",
        valuePrefix: "",
        valueSuffix: "",
        showCondition() {return player.tab == "ir"},
    },
    spaceGemGain: {
        name: "Space Gem Gain",
        valuePrefix: "",
        valueSuffix: "",
        showCondition() {return player.tab == "ir"},
    },
    spaceJunkGain: {
        name: "Space Junk Gain",
        valuePrefix: "",
        valueSuffix: "",
        showCondition() {return true},
    },
    bloodStoneGain: {
        name: "Blood Stone Gain",
        valuePrefix: "",
        valueSuffix: "",
        showCondition() {return player.tab == "bl"},
    },
    bloodGemGain: {
        name: "Blood Gem Gain",
        valuePrefix: "",
        valueSuffix: "",
        showCondition() {return player.tab == "bl"},
    },
    xpGain: {
        name: "XP Gain",
        valuePrefix: "x",
        valueSuffix: "",
        showCondition() {return true},
    },
}

function pickUpgrade(canRepeat = true, repititions = 12, data = {}) {
    let possibleUpgrades = {}
    let totalChance = 0;
    // Build Rarity Table
    for (let id of Object.keys(UPGRADE_RARITIES)) {
        possibleUpgrades[id] = []
        totalChance += UPGRADE_RARITIES[id].weight()
    }
    // Build Upgrade Table
    for (let id of Object.keys(UPGRADE_POOL)) {
        let upg = UPGRADE_POOL[id]
        if (possibleUpgrades[upg.rarity]) {
            switch (upg.pool) {
                case "space": {
                    if (player.tab == "ir" || (data.forceIncludePool && data.forceIncludePool.space)) possibleUpgrades[upg.rarity].push(id);
                break; }
                case "blood": {
                    if (player.tab == "bl" || (data.forceIncludePool && data.forceIncludePool.blood)) possibleUpgrades[upg.rarity].push(id);
                break; }
                case "junk": {
                    if ((data.forceIncludePool && data.forceIncludePool.junk)) possibleUpgrades[upg.rarity].push(id);
                break; }
                default : {
                    possibleUpgrades[upg.rarity].push(id);
                break; }
            }
        };
    }
    // Select Upgrades
    let chosen = [];
    let maxChance = totalChance;
    while (chosen.length < repititions) {
        for (let id of Object.keys(UPGRADE_RARITIES)) {
            if (totalChance * Math.random() < UPGRADE_RARITIES[id].weight()) {
                let index = Math.floor(possibleUpgrades[id].length * Math.random())
                chosen.push(possibleUpgrades[id][index])
                if (!canRepeat) possibleUpgrades[id].splice(index, 1)
                break;
            } else totalChance -= UPGRADE_RARITIES[id].weight();
        }
        totalChance = maxChance
    }
    return chosen;
}

function pickUpgrades(data = {}) {
    let possibleUpgrades = {}
    let totalChance = 0;
    // Build Rarity Table
    for (let id of Object.keys(UPGRADE_RARITIES)) {
        possibleUpgrades[id] = []
        totalChance += UPGRADE_RARITIES[id].weight()
    }
    // Build Upgrade Table
    for (let id of Object.keys(UPGRADE_POOL)) {
        let upg = UPGRADE_POOL[id]
        if (possibleUpgrades[upg.rarity]) {
            switch (upg.pool) {
                case "space": {
                    if (player.tab == "ir" || (data.forceIncludePool && data.forceIncludePool.space)) possibleUpgrades[upg.rarity].push(id);
                break; }
                case "blood": {
                    if (player.tab == "bl" || (data.forceIncludePool && data.forceIncludePool.blood)) possibleUpgrades[upg.rarity].push(id);
                break; }
                case "junk": {
                    if ((data.forceIncludePool && data.forceIncludePool.junk)) possibleUpgrades[upg.rarity].push(id);
                break; }
                default : {
                    possibleUpgrades[upg.rarity].push(id);
                break; }
            }
        };
    }
    // Select Upgrades
    let chosen = [];
    while (chosen.length < 3) {
        for (let id of Object.keys(UPGRADE_RARITIES)) {
            if (totalChance * Math.random() < UPGRADE_RARITIES[id].weight()) {
                let index = Math.floor(possibleUpgrades[id].length * Math.random())
                chosen.push(possibleUpgrades[id][index])
                possibleUpgrades[id].splice(index, 1)
                break;
            } else totalChance -= UPGRADE_RARITIES[id].weight();
        }
    }
    return chosen;
}
function pickSalvagedUpgrades(data = {}) {
    let possibleUpgrades = []
    let totalChance = 0;
    // Build Rarity Table
    for (let [i, v] of Object.entries(player.ir.shipBattleSaveCurrent.bankedSalvagedUpgrades)) {
        totalChance += v
        possibleUpgrades.push(i);
    }
    // Select Upgrades
    let chosen = [];
    let k = Object.entries(player.ir.shipBattleSaveCurrent.bankedSalvagedUpgrades)
    while (chosen.length < Math.min(k.length, 3)) {
        for (let [i, v] of k) {
        let r = Math.random()
            if (totalChance * r < v) {
                let index = Math.floor(possibleUpgrades.length * r)
                chosen.push(possibleUpgrades[index])
                possibleUpgrades.splice(index, 1)
                break;
            } else totalChance -= v;
        }
    }
    return chosen;
}

class SpaceArena {
    /*
        Check if coordinates are visible on screen:
            - If true, then return coords with no changes.
            - If false, then screen-wrap the coords.
            - If true, then return screen-wrapped coords.
            - If false, then return null.
    */
    getVisibleWrappedCoords(xy, wh) {
        let coordX = xy[0]
        let coordY = xy[1]
        let shipX = this.ship.x
        let shipY = this.ship.y
        let maxDistX = (this.canvasWidth + wh[0]) / 2
        let maxDistY = (this.canvasHeight + wh[1]) / 2
        if (shipX > this.width - maxDistX && coordX < shipX + maxDistX - this.width) coordX += this.width;
        else if (coordX > this.width - maxDistX && shipX < coordX + maxDistX - this.width) coordX -= this.width;
        if (shipY > this.height - maxDistY && coordY < shipY + maxDistY - this.height) coordY += this.height;
        else if (coordY > this.height - maxDistY && shipY < coordY + maxDistY - this.height) coordY -= this.height;
        if (Math.abs(coordX - shipX) - (wh[0] / 2) <= (this.canvasWidth / 2) && Math.abs(coordY - shipY) - (wh[1] / 2) <= (this.canvasHeight / 2)) return [coordX, coordY];
        else return null;
    }
    getWrappedCoords(xy) {
        let coordX = xy[0]
        let coordY = xy[1]
        let shipX = this.ship.x
        let shipY = this.ship.y
        let maxDistX = this.canvasWidth / 2
        let maxDistY = this.canvasHeight / 2
        if (shipX > this.width - maxDistX && coordX < shipX + maxDistX - this.width) coordX += this.width;
        else if (coordX > this.width - maxDistX && shipX < coordX + maxDistX - this.width) coordX -= this.width;
        if (shipY > this.height - maxDistY && coordY < shipY + maxDistY - this.height) coordY += this.height;
        else if (coordY > this.height - maxDistY && shipY < coordY + maxDistY - this.height) coordY -= this.height;
        return [coordX, coordY];
    }
    /*
        Get the ship coords closest to the provided point:
        - Don't make changes if distance to ship is less than half the arena dimension.
        - ship - coord > 0 : ship, edge, coord -> coord, edge, ship.
        - NOT ship - coord > 0 : coord, edge, ship -> ship, edge, coord.
    */
    getClosestCoords(xy1, xy2 = [this.ship.x, this.ship.y]) {
        let coordX1 = xy1[0]
        let coordY1 = xy1[1]
        let coordX2 = xy2[0]
        let coordY2 = xy2[1]
        if (Math.abs(coordX2 - coordX1) > this.width / 2) coordX2 += (coordX2 - coordX1 > 0 ? -this.width : this.width);
        if (Math.abs(coordY2 - coordY1) > this.height / 2) coordY2 += (coordY2 - coordY1 > 0 ? -this.height : this.height);
        return [coordX2, coordY2];
    }
    drawMinimapIcon(color, diameter, xy) {
        this.ctx.fillStyle = color
        let aspectRatio = this.width / this.height
        let wrapped = this.getWrappedCoords([xy[0], xy[1]])
        if (aspectRatio < 1) {
            this.ctx.fillRect(
                (160 * aspectRatio * ((((xy[0] - this.ship.x + this.width / 2) % this.width + this.width) % this.width) / this.width)) + (80 * (1 - aspectRatio)) + (20 - (diameter / 2)),
                (160 * ((((xy[1] - this.ship.y + this.height / 2) % this.height + this.height) % this.height) / this.height)) + (20 - (diameter / 2)),
                diameter, diameter
            );
        } else {
            this.ctx.fillRect(
                (160 * ((((xy[0] - this.ship.x + this.width / 2) % this.width + this.width) % this.width) / this.width)) + (20 - (diameter / 2)),
                (160 * (1 / aspectRatio) * ((((xy[1] - this.ship.y + this.height / 2) % this.height + this.height) % this.height) / this.height)) + (80 * (1 - (1 / aspectRatio))) + (20 - (diameter / 2)),
                diameter, diameter
            );
        }
    }
    drawWrappingLine(source, sourceRef, data = {}) {
        /*

            "source" NEEDS:
            - x
            - y
            - length
            - width
            - ang
            - timer

            "sourceRef" NEEDS:
            - postReadyTimer
            - style()

        */
        let remainingDistance = source.length
        let currentPos = [source.x, source.y]
        let nextPos = [source.x, source.y]
        let down = source.ang < 0
        let right = Math.abs(source.ang) < Math.PI / 2
        let j = 0
        this.ctx.globalCompositeOperation = options.performanceMode ? "source-over" : "lighter";
        this.ctx.fillStyle = "#ff7f00";
        while (remainingDistance > 0) {
            j++
            this.ctx.save()
            if (data.dash) this.ctx.setLineDash(data.dash);
            this.ctx.lineWidth = source.width;
            this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
            this.ctx.moveTo(currentPos[0], currentPos[1])
            if (source.timer > sourceRef.postReadyTimer) {
                let wrapped = this.getVisibleWrappedCoords([source.x, source.y], [8, 8])
                if (wrapped) {
                    this.ctx.beginPath()
                    this.ctx.arc(wrapped[0], wrapped[1], 4, 0, 360)
                    this.ctx.fill()
                }
            }
            this.ctx.beginPath()
            // Get distance to next point of screen looping
            // Vertical Wall
            let hx = Math.abs((right ? this.width - currentPos[0] : currentPos[0]) / Math.cos(source.ang)) || 0
            // Horizontal Wall
            let hy = Math.abs((!down ? this.height - currentPos[1] : currentPos[1]) / Math.sin(source.ang)) || 0
            let currentDistance = Math.min(hx, hy)
            if (remainingDistance < currentDistance) {
                // ^ This needs to account for screen wrapping
                // Finish
                
                nextPos[0] = currentPos[0] + Math.cos(source.ang) * remainingDistance
                nextPos[1] = currentPos[1] + Math.sin(source.ang) * remainingDistance
                this.ctx.strokeStyle = sourceRef.style(this.ctx, source,
                    [currentPos[0] - (source.length - remainingDistance) * Math.cos(source.ang), currentPos[1] - (source.length - remainingDistance) * Math.sin(source.ang)],
                    [nextPos[0], nextPos[1]]
                );
                //this.ctx.lineJoin = "round";
                this.ctx.moveTo(currentPos[0], currentPos[1])
                this.ctx.lineTo(nextPos[0], nextPos[1])
                this.ctx.closePath()
                this.ctx.stroke();
                // Looping
                let loopTranslation = [0, 0]
                if (this.ship.x <= this.canvasWidth / 2 && ((currentPos[0] >= this.width - this.canvasWidth / 2) || (nextPos[0] >= this.width - this.canvasWidth / 2))) loopTranslation[0] -= this.width;
                if (this.ship.x >= this.width - this.canvasWidth / 2 && ((currentPos[0] <= this.canvasWidth / 2) || (nextPos[0] <= this.canvasWidth / 2))) loopTranslation[0] += this.width;
                if (this.ship.y <= this.canvasHeight / 2 && ((currentPos[1] >= this.height - this.canvasHeight / 2) || (nextPos[1] >= this.height - this.canvasHeight / 2))) loopTranslation[1] -= this.height;
                if (this.ship.y >= this.height - this.canvasHeight / 2 && ((currentPos[1] <= this.canvasHeight / 2) || (nextPos[1] <= this.canvasHeight / 2))) loopTranslation[1] += this.height;
                if (loopTranslation[0] != 0) {
                    this.ctx.translate(loopTranslation[0], 0)
                    this.ctx.beginPath()
                    this.ctx.moveTo(currentPos[0], currentPos[1])
                    this.ctx.lineTo(nextPos[0], nextPos[1])
                    this.ctx.closePath()
                    this.ctx.stroke();
                    this.ctx.translate(-loopTranslation[0], 0)
                }
                if (loopTranslation[1] != 0) {
                    this.ctx.translate(0, loopTranslation[1])
                    this.ctx.beginPath()
                    this.ctx.moveTo(currentPos[0], currentPos[1])
                    this.ctx.lineTo(nextPos[0], nextPos[1])
                    this.ctx.closePath()
                    this.ctx.stroke();
                    this.ctx.translate(0, -loopTranslation[1])
                }
                if (loopTranslation[0] != 0 && loopTranslation[1] != 0) {
                    this.ctx.translate(loopTranslation[0], loopTranslation[1])
                    this.ctx.beginPath()
                    this.ctx.moveTo(currentPos[0], currentPos[1])
                    this.ctx.lineTo(nextPos[0], nextPos[1])
                    this.ctx.closePath()
                    this.ctx.stroke();
                }
                remainingDistance = 0
            } else {
                // Keep going
                let start = [currentPos[0], currentPos[1]]                    
                
                if (hx < hy) {
                    nextPos[0] = right ? this.width : 0
                    nextPos[1] = currentPos[1] + currentDistance * Math.sin(source.ang)
                    currentPos[0] = !right ? this.width : 0
                    currentPos[1] = nextPos[1]
                } else {
                    nextPos[0] = currentPos[0] + currentDistance * Math.cos(source.ang)
                    nextPos[1] = !down ? this.height : 0
                    currentPos[0] = nextPos[0]
                    currentPos[1] = down ? this.height : 0
                }
                this.ctx.strokeStyle = sourceRef.style(this.ctx, source,
                    [start[0] - (source.length - remainingDistance) * Math.cos(source.ang), start[1] - (source.length - remainingDistance) * Math.sin(source.ang)],
                    [nextPos[0] + (remainingDistance - currentDistance) * Math.cos(source.ang), nextPos[1] + (remainingDistance - currentDistance) * Math.sin(source.ang)]
                );
                this.ctx.moveTo(start[0], start[1])
                this.ctx.lineTo(nextPos[0], nextPos[1])
                this.ctx.closePath()
                this.ctx.stroke();
                // Looping
                let loopTranslation = [0, 0]
                if (this.ship.x <= this.canvasWidth / 2 && ((start[0] >= this.width - this.canvasWidth / 2) || (nextPos[0] >= this.width - this.canvasWidth / 2))) loopTranslation[0] -= this.width;
                if (this.ship.x >= this.width - this.canvasWidth / 2 && ((start[0] <= this.canvasWidth / 2) || (nextPos[0] <= this.canvasWidth / 2))) loopTranslation[0] += this.width;
                if (this.ship.y <= this.canvasHeight / 2 && ((start[1] >= this.height - this.canvasHeight / 2) || (nextPos[1] >= this.height - this.canvasHeight / 2))) loopTranslation[1] -= this.height;
                if (this.ship.y >= this.height - this.canvasHeight / 2 && ((start[1] <= this.canvasHeight / 2) || (nextPos[1] <= this.canvasHeight / 2))) loopTranslation[1] += this.height;
                if (loopTranslation[0] != 0 || loopTranslation[1] != 0) {
                    this.ctx.beginPath()
                    this.ctx.translate(loopTranslation[0], loopTranslation[1])
                    this.ctx.moveTo(start[0], start[1])
                    this.ctx.lineTo(nextPos[0], nextPos[1])
                    this.ctx.closePath()
                    this.ctx.stroke();
                }
            }
            this.ctx.restore()
            remainingDistance -= currentDistance
            if (remainingDistance > 100000) {console.warn("uh oh"); break; }
            if (j >= 100) {console.warn("BIG uh oh: " + remainingDistance); break; }
            if (data.dash) this.ctx.setLineDash([]);
        }
        this.ctx.globalCompositeOperation = "source-over";
        if (data.dash) this.ctx.setLineDash([]);
    }

    // Expand the arena to cover the entire screen and make it transparent
    enterFullscreen() {
        if (!this.arenaDiv || this._fullscreen) return;
        this._fullscreen = true;

        // Save previous styles and sizes so we can restore later
        this._prevArenaStyle = {
            left: this.arenaDiv.style.left,
            top: this.arenaDiv.style.top,
            transform: this.arenaDiv.style.transform,
            width: this.width,
            height: this.height,
            backgroundImage: this.arenaDiv.style.backgroundImage,
            overflow: this.arenaDiv.style.overflow,
            zIndex: this.arenaDiv.style.zIndex,
            canvasWidth: this.canvasWidth,
            canvasHeight: this.canvasHeight,
        };
        this._prevWidth = this.width;
        this._prevHeight = this.height;

        // Apply fullscreen & transparent styles
        Object.assign(this.arenaDiv.style, {
            left: '0px',
            top: '106px',
            transform: 'none',
            width: 'calc(100vw)',
            height: 'calc(100vh - 279px)',
            backgroundImage: this._prevArenaStyle.backgroundImage,
            overflow: 'hidden',
            zIndex: 10000
        });
        this.canvasWidth = Math.min(3200, window.innerWidth) - 6
        this.canvasHeight = Math.min(3200, window.innerHeight) - 276

        // Resize canvas and internal dimensions to match window
        if (this.canvas) {
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
        }

        // Re-center player ship (keeps player visually centered)
        if (this.ship) {
            this.ship.x = this.width / 2;
            this.ship.y = this.height / 2;
        }

        // Keep the canvas sized during window resize while in fullscreen boss mode
        this._onWindowResize = () => {
            if (!this._fullscreen) return;
            this.canvasWidth = Math.min(3200, window.innerWidth) - 6
            this.canvasHeight = Math.min(3200, window.innerHeight) - 276
            if (this.canvas) {
                this.canvas.width = this.canvasWidth;
                this.canvas.height = this.canvasHeight;
            }
        };

        window.addEventListener('resize', this._onWindowResize);
    }

    // Restore the arena to its previous size/style
    exitFullscreen() {
        if (!this.arenaDiv || !this._fullscreen) return;
        this._fullscreen = false;

        const s = this._prevArenaStyle || {};
        Object.assign(this.arenaDiv.style, {
            left: s.left || '50%',
            top: s.top || '50%',
            transform: s.transform || 'translate(-50%, -50%)',
            backgroundImage: s.backgroundImage || 'url(resources/ui/spaceBattle/iriditeZone.png)',
            overflow: s.overflow || 'hidden',
            zIndex: s.zIndex || 9999
        });
        this.width = this._prevArenaStyle.width
        this.height = this._prevArenaStyle.height
        this.canvasWidth = this._prevArenaStyle.canvasWidth
        this.canvasHeight = this._prevArenaStyle.canvasHeight

        // Restore canvas size and internal dimensions
        if (this.canvas) {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }

        // Re-center player ship
        if (this.ship) {
            this.ship.x = this.width / 2;
            this.ship.y = this.height / 2;
        }

        if (this._onWindowResize) {
            window.removeEventListener('resize', this._onWindowResize);
            this._onWindowResize = null;
        }
    }
    constructor(canvasWidth, canvasHeight, arenaWidth, arenaHeight) {
        this.width = arenaWidth;
        this.height = arenaHeight;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.arenaDiv = null;

        // load wing GIF for Iridite (200x200). keep a loaded flag so draw can choose fallback.
        this.wingImg = new Image();
        // this.wingImg.src = 'resources/flying.gif';
        this.wingImgLoaded = false;
        this.wingImg.onload = () => { this.wingImgLoaded = true; };

        // ...existing code...

        // Ship types
        this.shipRef = SB_ships[player.ir.type]
        this.ship = this.shipRef.instanciate()

        this.ship.x = this.width / 2
        this.ship.y = this.height / 2
        this.ship.vx = 0
        this.ship.vy = 0
        this.ship.ax = 0
        this.ship.ay = 0
        this.ship.dvx = 0
        this.ship.dvy = 0
        this.ship.dax = 0
        this.ship.day = 0

        this.ship.velocity = 0
        this.ship.angle = 0
        this.ship.angularVelocity = 0
        this.ship.lastShot = 0

        this.ship.touchControls = {}
        this.controlTypeRef = SB_controlTypes[this.shipRef.controlType]
        let ref = this.controlTypeRef.mobile
        if (ref) {
            for (let i in ref) {
                let v = ref[i]
                let type
                if (Array.isArray(v)) {
                    if (player.shipBattle.controlScheme == v[1]) type = v[0];
                    else continue;
                } else type = v;
                SB_touchControls[type].initialize(this.ship);
            }
        }
        
        this.UIScale = 1;
        this.UIEigthScale = 1;

        this.bullets = [];
        this.asteroids = [];
        this.xpOrbs = [];
        this.keys = {};
        this.pointerDown = false;
        this.running = false;
        this.loop = null;
        this.asteroidSpawnTimer = 0;
        this.maxAsteroids = 16;
        this.lootFlashPositions = [];
        this.lootFlashes = [];
        this.warnings = [];
        this.upgradeChoices = [];
        this.salvagedUpgradeChoices = [];
        this.selectedUpgradeIndex = null;
        this.selectedSalvagedUpgradeIndex = null;
        this.upgrades = this.getDefaultUpgrades();
        this.perZoneUpgrades = player.ir.shipBattleSaveCurrent.perZoneUpgrades[player.ir.battleStage] ? player.ir.shipBattleSaveCurrent.perZoneUpgrades[player.ir.battleStage] : this.getDefaultUpgrades();
        this.upgradeCount = 0;
        this.upgradeScore = 0;
        this.shipStats = SB_getDefaultShipStats();
        this.resourceMult = 1;

        this.propertyAttackCooldown = 90;

        // Enemy system
        this.enemies = [];

        this.enemySpawnCooldown = 0;
        this.enemySpawnCooldownMax = 1000;
        this.gammaTrails = [];

        this.mobileControlsScale = 1.5
        this.pointerTouches = new Map()

        this.mobileLeftStickAngle = null
        this.mobileLeftStickDist = 0

        this.mobileRightStickAngle = null
        this.mobileRightStickDist = 0

        this.mobileRightButtonDist = 0

        this.shipRef.initialize(this.ship)
    }

    getDefaultUpgrades() {
        let base = {}
        for (const [i, v] of Object.entries(UPGRADE_POOL)) {base[i] = 0;}
        return base
    }

    spawnArena() {
        this.arenaDiv = document.createElement('div');
        this.arenaDiv.id = 'space-arena';
        let maxScaleX = (window.innerWidth - 64) / this.canvasWidth
        let maxScaleY = (window.innerHeight - 64) / (this.canvasHeight * 1.25)
        this.UIScale = Math.min(maxScaleX, maxScaleY)
        Object.assign(this.arenaDiv.style, {
            position: 'fixed',
            left: '50%',
            top: '50%',
            width: (this.UIScale * this.canvasWidth) + 'px',
            height: (this.UIScale * this.canvasHeight) + 'px',
            transform: `translate(-50%, -50%)`,
            backgroundImage: "url(resources/ui/spaceBattle/" + player.ir.battleStage + ".png)",
            backgroundSize: (this.UIScale * this.width) + "px " + (this.UIScale * this.height) + "px",
            borderRadius: '0',
            border: (this.UIScale * 3) + 'px solid ' + player.ir.primaryColor,
            zIndex: 9999,
            overflow: 'hidden',
	        "transition-duration": "0s",
  	        touchAction: "none",
  	        userSelect: "none",
  	        "-webkit-user-select": "none",
        });
        document.body.appendChild(this.arenaDiv);

        this.canvas = document.createElement('canvas');
	    this.canvas.style["transition-duration"] = "0s",
        this.canvas.width = this.UIScale * this.canvasWidth;
        this.canvas.height = this.UIScale * this.canvasHeight;
        this.arenaDiv.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('pointerdown', this.handlePointerDown);
        window.addEventListener('pointerup', this.handlePointerUp);
        window.addEventListener('pointercancel', this.handlePointerCancel);
        window.addEventListener('pointermove', this.handlePointerMove);
        
        this.running = true;
        this.loop = setInterval(() => this.update(), 1000 / 60);

        if (this.shipRef.movementType == "roll" || this.shipRef.movementType == "jump") {
            this.canvas.addEventListener('click', this.canvasClickListener);
        }
    }

    removeArena() {
        this.running = false;
        clearInterval(this.loop);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        window.removeEventListener('pointerdown', this.handlePointerDown);
        window.removeEventListener('pointerup', this.handlePointerUp);
        window.removeEventListener('pointercancel', this.handlePointerCancel);
        window.removeEventListener('pointermove', this.handlePointerMove);
        if (this.arenaDiv) document.body.removeChild(this.arenaDiv);

        if ((this.shipRef.movementType == "roll" || this.shipRef.movementType == "jump") && this.canvasClickListener) {
            this.canvas.removeEventListener('click', this.canvasClickListener);
        }

        // Ensure fight flags are cleared when arena closes
        this.bossActive = false;

        // Exit all menus
        player.ir.menu = 0;

        // If we were in fullscreen for the Iridite fight, restore original arena
        this.exitFullscreen();
    }

    handleKeyDown = (e) => { this.keys[e.code] = true; };
    handleKeyUp = (e) => { this.keys[e.code] = false; };
    handlePointerDown = (e) => {
        if (player.ir.menu == 0) this.pointerDown = true;
        let rect = this.canvas.getBoundingClientRect();
        let ref = []
        if (this.controlTypeRef.touch) ref = ref.concat(this.controlTypeRef.touch);
        if (this.controlTypeRef.mobile) ref = ref.concat(this.controlTypeRef.mobile);
        for (let i in ref) {
            let v = ref[i]
            let type
            if (Array.isArray(v)) {
                if (player.shipBattle.controlScheme == v[1]) type = v[0];
                else continue;
            } else type = v;
            if (!SB_touchControls[type].touchCondition([(e.clientX - rect.left) / this.UIScale, (e.clientY - rect.top) / this.UIScale])) continue;
            SB_touchControls[type].touchDown([(e.clientX - rect.left) / this.UIScale, (e.clientY - rect.top) / this.UIScale])
            e.action = type
        }
        this.pointerTouches.set(e.pointerId, {
            clientX: (e.clientX - rect.left) / this.UIScale,
            clientY: (e.clientY - rect.top) / this.UIScale,
            pointerId: e.pointerId,
            action: e.action,
        })
    };
    handlePointerMove = (e) => {
        if (!this.canvas) return;
        let rect = this.canvas.getBoundingClientRect();
        this.mouseX = (e.clientX - rect.left) / this.UIScale;
        this.mouseY = (e.clientY - rect.top) / this.UIScale;
        this.pointerTouches.forEach((value, key, map) => {
            if (value.pointerId === e.pointerId) {
                value.clientX = (e.clientX - rect.left) / this.UIScale
                value.clientY = (e.clientY - rect.top) / this.UIScale
            };
        })
    };
    handlePointerUp = (e) => {
        if (player.ir.menu == 0) this.pointerDown = false;
        let rect = this.canvas.getBoundingClientRect();
        let action = this.pointerTouches.get(e.pointerId).action
        if (action) SB_touchControls[action].touchUp([(e.clientX - rect.left) / this.UIScale, (e.clientY - rect.top) / this.UIScale]);
        this.pointerTouches.delete(e.pointerId);
    };
    handlePointerCancel = (e) => this.handlePointerUp(e);

    shoot() {
        this.shipRef.onShoot(this.ship, [this.mouseX, this.mouseY], player.shipBattle.controlScheme > 0)
    }

    // Pause asteroid minigame: freeze existing asteroids and prevent new spawns
    pauseAsteroidMinigame() {
        if (this._asteroidMinigamePaused) return;
        this._asteroidMinigamePaused = true;

        // Prevent further spawns by saving and forcing max to 0
        this._savedMaxAsteroids = this.maxAsteroids;
        this.maxAsteroids = 0;

        // Save and zero velocities (freeze asteroids)
        for (let a of this.asteroids) {
            a._savedVX = a.vx;
            a._savedVY = a.vy;
            a.vx = 0;
            a.vy = 0;

            // If your asteroids use other timers, save them too
            if (typeof a.phaseTimer !== 'undefined') a._savedPhaseTimer = a.phaseTimer;
        }

        // Optionally save the spawn timer so it continues where it left off on resume
        this._savedAsteroidSpawnTimer = this.asteroidSpawnTimer;

        // If the Iridite boss exists, save and freeze its state so it cannot move/attack
        for (let e of this.enemies.concat(this.asteroids)) {
            if (e.health.lte(0)) continue;
            if (e.type === "iriditeBoss") {
                // Save key runtime fields so we can restore them later
                e._savedBossState = {
                    vx: e.vx,
                    vy: e.vy,
                    phase: e.phase,
                    state: e.state,
                    attackTimer: e.attackTimer,
                    _actionCooldown: e._actionCooldown,
                    dashing: e.dashing,
                    dashSeqRemaining: e.dashSeqRemaining,
                    dashDistance: e.dashDistance,
                    dashSpeed: e.dashSpeed,
                    _dashState: e._dashState,
                    _dashDir: e._dashDir,
                    _dashTargets: e._dashTargets,
                    homingShotsRemaining: e.homingShotsRemaining,
                    radialShotsRemaining: e.radialShotsRemaining,
                    attackIndex: e.attackIndex,
                    _lungeTimer: e._lungeTimer,
                    _rainingTimer: e._rainingTimer,
                    _rainingInterval: e._rainingInterval,
                    _daggerPrep: e._daggerPrep,
                    _daggerCount: e._daggerCount,
                    _daggerWarnings: Array.isArray(e._daggerWarnings) ? e._daggerWarnings.slice() : null,
                    _burstShots: e._burstShots,
                    wingPhase: e.wingPhase,
                    _laserTimer: e._laserTimer,
                    _giantPrep: e._giantPrep,
                    _giantLines: Array.isArray(e._giantLines) ? e._giantLines.slice() : null,
                    _giantFired: e._giantFired,
                    _recentlyHit: e._recentlyHit,
                };

                // Mark as paused so other systems can skip interactions
                e._pausedBoss = true;

                // Freeze movement and action-related fields
                e.vx = 0;
                e.vy = 0;
                e.dashing = false;
                e._actionCooldown = 999999;
                e.attackTimer = 999999;
            }
        }
    }

    // Resume asteroid minigame: restore velocities and allow spawns again
    resumeAsteroidMinigame() {
        if (!this._asteroidMinigamePaused) return;
        this._asteroidMinigamePaused = false;

        // Restore maxAsteroids
        if (typeof this._savedMaxAsteroids !== 'undefined') {
            this.maxAsteroids = this._savedMaxAsteroids;
            delete this._savedMaxAsteroids;
        }

        // Restore asteroid velocities and timers
        for (let a of this.asteroids) {
            if (typeof a._savedVX !== 'undefined') { a.vx = a._savedVX; delete a._savedVX; }
            if (typeof a._savedVY !== 'undefined') { a.vy = a._savedVY; delete a._savedVY; }
            if (typeof a._savedPhaseTimer !== 'undefined') { a.phaseTimer = a._savedPhaseTimer; delete a._savedPhaseTimer; }
        }

        // Restore spawn timer
        if (typeof this._savedAsteroidSpawnTimer !== 'undefined') {
            this.asteroidSpawnTimer = this._savedAsteroidSpawnTimer;
            delete this._savedAsteroidSpawnTimer;
        }

        // Restore Iridite boss state if we saved it earlier
        for (let e of this.enemies.concat(this.asteroids)) {
            if (e.health.lte(0)) continue;
            if (e.type === "iriditeBoss" && e._savedBossState) {
                const s = e._savedBossState;
                e.vx = (typeof s.vx !== 'undefined') ? s.vx : 0;
                e.vy = (typeof s.vy !== 'undefined') ? s.vy : 0;
                e.phase = (typeof s.phase !== 'undefined') ? s.phase : e.phase;
                e.state = (typeof s.state !== 'undefined') ? s.state : e.state;
                e.attackTimer = (typeof s.attackTimer !== 'undefined') ? s.attackTimer : e.attackTimer;
                e._actionCooldown = (typeof s._actionCooldown !== 'undefined') ? s._actionCooldown : e._actionCooldown;
                e.dashing = (typeof s.dashing !== 'undefined') ? s.dashing : e.dashing;
                e.dashSeqRemaining = (typeof s.dashSeqRemaining !== 'undefined') ? s.dashSeqRemaining : e.dashSeqRemaining;
                e.dashDistance = (typeof s.dashDistance !== 'undefined') ? s.dashDistance : e.dashDistance;
                e.dashSpeed = (typeof s.dashSpeed !== 'undefined') ? s.dashSpeed : e.dashSpeed;
                e._dashState = (typeof s._dashState !== 'undefined') ? s._dashState : e._dashState;
                e._dashDir = (typeof s._dashDir !== 'undefined') ? s._dashDir : e._dashDir;
                e._dashTargets = (typeof s._dashTargets !== 'undefined') ? s._dashTargets : e._dashTargets;
                e.homingShotsRemaining = (typeof s.homingShotsRemaining !== 'undefined') ? s.homingShotsRemaining : e.homingShotsRemaining;
                e.radialShotsRemaining = (typeof s.radialShotsRemaining !== 'undefined') ? s.radialShotsRemaining : e.radialShotsRemaining;
                e.attackIndex = (typeof s.attackIndex !== 'undefined') ? s.attackIndex : e.attackIndex;
                e._lungeTimer = (typeof s._lungeTimer !== 'undefined') ? s._lungeTimer : e._lungeTimer;
                e._rainingTimer = (typeof s._rainingTimer !== 'undefined') ? s._rainingTimer : e._rainingTimer;
                e._rainingInterval = (typeof s._rainingInterval !== 'undefined') ? s._rainingInterval : e._rainingInterval;
                e._daggerPrep = (typeof s._daggerPrep !== 'undefined') ? s._daggerPrep : e._daggerPrep;
                e._daggerCount = (typeof s._daggerCount !== 'undefined') ? s._daggerCount : e._daggerCount;
                e._daggerWarnings = (s._daggerWarnings !== null) ? s._daggerWarnings.slice() : e._daggerWarnings;
                e._burstShots = (typeof s._burstShots !== 'undefined') ? s._burstShots : e._burstShots;
                e.wingPhase = (typeof s.wingPhase !== 'undefined') ? s.wingPhase : e.wingPhase;
                e._laserTimer = (typeof s._laserTimer !== 'undefined') ? s._laserTimer : e._laserTimer;
                e._giantPrep = (typeof s._giantPrep !== 'undefined') ? s._giantPrep : e._giantPrep;
                e._giantLines = (s._giantLines !== null) ? s._giantLines.slice() : e._giantLines;
                e._giantFired = (typeof s._giantFired !== 'undefined') ? s._giantFired : e._giantFired;
                e._recentlyHit = (typeof s._recentlyHit !== 'undefined') ? s._recentlyHit : e._recentlyHit;

                // Remove paused marker and saved state
                delete e._savedBossState;
                delete e._pausedBoss;
            }
        }
    }

    spawnAsteroid(big = false, x = null, y = null) {
        if (this.asteroids.length >= this.maxAsteroids) return;
        let size = big ? 30 + Math.random() * 15 : 10 + Math.random() * 5;
        let health = big ? getRandomInt(50) + 75 : getRandomInt(15) + 20;
        let angle = Math.random() * Math.PI * 2;
        let speed = big ? 1 + Math.random() * 1.5 : 2 + Math.random() * 2;
        let splitCount = big ? 2 + Math.floor(Math.random() * 3) : 0;
        let phaseTime = 9999999999;
        let vertexCount = big ? 8 + Math.floor(Math.random() * 4) : 8 + Math.floor(Math.random() * 3);
        let shape = this.generateConvexPolygon(size, vertexCount);

        if (player.ir.battleLevel.gte(20)) {
            health = health * Decimal.pow(1.04, player.ir.battleLevel.sub(19)).toNumber()
        }

        this.asteroids.push({
            x: x !== null ? x : Math.random() * this.width,
            y: y !== null ? y : Math.random() * this.height,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: size,
            health: health,
            maxHealth: health,
            big: big,
            splitCount: splitCount,
            phaseTimer: phaseTime,
            phased: false,
            shape: shape,
        });
    }

    generateConvexPolygon(radius, vertexCount) {
        let angles = [];
        for (let i = 0; i < vertexCount; i++) {
            angles.push((i / vertexCount) * Math.PI * 2);
        }
        angles.sort((a, b) => a - b);
        let points = [];
        for (let i = 0; i < vertexCount; i++) {
            let r = radius * (0.5 + Math.random());
            points.push({
                x: Math.cos(angles[i]) * r,
                y: Math.sin(angles[i]) * r
            });
        }
        return points;
    }

    chargeShot() {
        if (this.awaitingShotCharge) return;
        let now = Date.now();
        let cooldown = this.ship.cooldown / this.shipStats.attackSpeed;
        if (now - this.ship.lastShot < cooldown) return;
        this.awaitingShotCharge = true
        this.shotChargeTimer = 21
    }

    update() {
        
        this.arenaDiv.style.backgroundPosition = (this.UIScale * (this.canvasWidth / 2 - this.ship.x)) + "px " + (this.UIScale * (this.canvasHeight / 2 - this.ship.y)) + "px"
        this.arenaDiv.style.zIndex = player.ir.menu == 0 ? 10000 : -3

        if (player.ir.menu == 0 && !arena.bossActive) {
            this.propertyAttackCooldown--
            if (this.propertyAttackCooldown <= 0) {
                // IRIDITE DAGGERS
                if (player.ir.battleStage == "iriditeZone" || (player.ir.battleStage == "spaceZone2" && player.ir.battleLevel.gte(10))) {
                    this.propertyAttackCooldown = 600
                    let repititions = player.ir.battleStage == "iriditeZone" && player.ir.battleLevel.gte(10) ? 2 : 1
                    for (let i = 0; i < repititions; i++) {
                        let ang = (Math.random() - 0.5) * Math.PI * 2
                        let dist = 800
                        let count = player.ir.battleStage == "iriditeZone" && player.ir.battleLevel.gte(10) ? 3 : 5
                        for (let j = 0; j < count; j++) {
                            SB_spawnWarning("iriditeDagger", null, {
                                x: this.ship.x - Math.cos(ang) * dist,
                                y: this.ship.y - Math.sin(ang) * dist,
                                ang: ang,
                                targetAng: (j - (count - 1) / 2) * Math.PI / 16 + ang,
                            })
                        }
                    }
                }
                // NOX SPEARS
                if (player.ir.battleStage == "noxZone" || (player.ir.battleStage == "bloodZone1" && player.ir.battleLevel.gte(20))) {
                    this.propertyAttackCooldown = 90
                    SB_spawnWarning("allyNoxSpear", null)
                }
            }
        }

        // Prepare collectors used by multiple death paths
        let newAsteroids = [];
        let xpOrbsToAdd = [];
        if (player.ir.shipHealth.lt(0)) this.onShipDeath();
        // Helper to handle enemy death logic (drops, flags, etc.)
        const handleEnemyDeath = (enemy) => {
            if (!enemy) return;
            let celRef = SB_celestialites[enemy.type]
            // rock drop
            if (celRef && celRef.reward) {
                let reward = celRef.reward()

                if (reward.spaceRock) {
                    let amt = reward.spaceRock.mul(this.shipStats.spaceRockGain).floor();
                    amt = amt.max(1)
                    player.ir.spaceRock = player.ir.spaceRock.add(amt);
                    arena.lootFlashPositions.push({ x: enemy.x, y: enemy.y, amount: amt, type: "spaceRock" });
                }
                if (reward.spaceGem) {
                    let amt = reward.spaceGem.mul(this.shipStats.spaceGemGain).floor();
                    amt = amt.max(1)
                    player.ir.spaceGem = player.ir.spaceGem.add(amt);
                    arena.lootFlashPositions.push({ x: enemy.x, y: enemy.y, amount: amt, type: "spaceGem" });
                }
                if (reward.bloodStones) {
                    let amt = reward.bloodStones.mul(this.shipStats.bloodStoneGain).floor();
                    amt = amt.max(1)
                    player.bl.bloodStones = player.bl.bloodStones.add(amt);
                    arena.lootFlashPositions.push({ x: enemy.x, y: enemy.y, amount: amt, type: "bloodStones" });
                }
                if (reward.bloodGems) {
                    let amt = reward.bloodGems.mul(this.shipStats.bloodGemGain).floor();
                    amt = amt.max(1)
                    player.bl.bloodGems = player.bl.bloodGems.add(amt);
                    arena.lootFlashPositions.push({ x: enemy.x, y: enemy.y, amount: amt, type: "bloodGems" });
                }
            }
            // xp drop -> spawn xp orb
            if (celRef && celRef.experienceReward) {
                let amt = celRef.experienceReward()
                if (amt.gt(0)) xpOrbsToAdd.push({ x: enemy.x, y: enemy.y, amount: amt });
            }

            SB_celestialites[enemy.type].onDeath(enemy)

            let i = this.enemies.indexOf(enemy);
            let j = this.asteroids.indexOf(enemy);
            if (i > -1) {
                this.enemies.splice(i, 1);
            } else if (j > -1) {
                this.asteroids.splice(j, 1);
            }
        };

        // If we were in fullscreen iridite mode but the boss is gone, restore arena
        
        if (player.ir.menu > 0) {
            this.draw();
            return;
        }

        // decrement ship invulnerability timer each tick (approx 60FPS)
        const _TICK_MS = 1000 / 60;
        if (this.shipHitInvuln > 0) this.shipHitInvuln = Math.max(0, this.shipHitInvuln - _TICK_MS);

        // Hard mode check
        const hardMode = player.ir.battleLevel.gte(8);
        
        if (hardMode) this.enemySpawnCooldownMax = 700;

        // Health regen
        if (this.shipStats.healthRegen > 0) {
            player.ir.shipHealth = player.ir.shipHealth.add(this.shipStats.healthRegen);
            if (player.ir.shipHealth.gt(arena.shipStats.maxHp)) {
                player.ir.shipHealth = new Decimal(arena.shipStats.maxHp);
            }
        }
        if (player.ir.type == 3) {
            // Auto Roll
            if (player.ir.autoShoot && typeof this.mouseX === "number" && typeof this.mouseY === "number" && player.ir.menu == 0) {
                let now = Date.now();
                this.ship.rollCooldown = 1500 / this.shipStats.attackSpeed
                if (now - this.ship.lastRollClick >= this.ship.rollCooldown) {
                    this.ship.lastRollClick = now;
                    let mx = this.mouseX - (this.canvasWidth / 2);
                    let my = this.mouseY - (this.canvasHeight / 2);
                    this.ship.rollingAng = Math.atan2(my, mx);
                    this.ship.rollingSpeed = Math.min(1, Math.max(0, (Math.hypot(my, mx) - 100) / 200))
                };
            }

            this.ship.vx += Math.cos(this.ship.rollingAng) * this.ship.rollingSpeed * this.shipStats.moveSpeed / 5;
            this.ship.vy += Math.sin(this.ship.rollingAng) * this.ship.rollingSpeed * this.shipStats.moveSpeed / 5;
            // Apply velocities
            this.ship.x += this.ship.vx;
            this.ship.y += this.ship.vy;

            // Apply deceleration
            this.ship.vx *= this.ship.stats.deceleration;
            this.ship.vy *= this.ship.stats.deceleration;

            // Wrap ship around arena edges
            if (this.ship.x < 0) this.ship.x += this.width;
            if (this.ship.x > this.width) this.ship.x -= this.width;
            if (this.ship.y < 0) this.ship.y += this.height;
            if (this.ship.y > this.height) this.ship.y -= this.height;
        } else if (player.ir.type == 7) {
            // Auto Dash
            if (player.ir.autoShoot) {
                let now = Date.now();
                this.dashCooldown = 1000 / this.shipStats.attackSpeed
                if (now - this.lastDashClick >= this.dashCooldown && this.mouseX != undefined && this.mouseY != undefined) {
                    this.lastDashClick = now;
                    this.ship.dashTarget = { x: this.mouseX + this.ship.x - this.canvasWidth / 2, y: this.mouseY + this.ship.y - this.canvasHeight / 2 };
                }
            }

            if (this.ship.dashTarget) {
                let dx = this.ship.dashTarget.x - this.ship.x;
                let dy = this.ship.dashTarget.y - this.ship.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                // Calculate velocity to move toward the target, but keep moving after
                let frames = 30;
                let speed = Math.max(12, dist / frames);
                let angle = Math.atan2(dy, dx);

                this.ship.vx = Math.cos(angle) * speed;
                this.ship.vy = Math.sin(angle) * speed;
                this.ship.dashing = true;
                this.ship.dashFrames = frames;
                this.ship.dashTarget = null;
                this.ship.angle = angle;
            }
            // Apply velocities
            this.ship.x += this.ship.vx;
            this.ship.y += this.ship.vy;

            // Apply deceleration
            this.ship.vx *= this.ship.stats.deceleration;
            this.ship.vy *= this.ship.stats.deceleration;

            // Wrap ship around arena edges
            if (this.ship.x < 0) this.ship.x += this.width;
            if (this.ship.x > this.width) this.ship.x -= this.width;
            if (this.ship.y < 0) this.ship.y += this.height;
            if (this.ship.y > this.height) this.ship.y -= this.height;
        } else {

            // MOBILE MOVEMENT / KEYBOARD SHOOTING
            if (player.shipBattle.controlScheme == 0) {
                if (this.keys['KeyW']) {
                    this.ship.velocity += this.ship.stats.acceleration + this.shipStats.moveSpeed * 0.1;
                } else if (this.keys['KeyS']) {
                    this.ship.velocity -= this.ship.stats.acceleration + this.shipStats.moveSpeed * 0.1;
                } else {
                    if (this.ship.velocity > 0) {
                        this.ship.velocity -= this.ship.stats.deceleration;
                        if (this.ship.velocity < 0) this.ship.velocity = 0;
                    } else if (this.ship.velocity < 0) {
                        this.ship.velocity += this.ship.stats.deceleration;
                        if (this.ship.velocity > 0) this.ship.velocity = 0;
                    }
                }
                if (this.keys['KeyA']) this.ship.angle -= this.ship.stats.rotationSpeed;
                if (this.keys['KeyD']) this.ship.angle += this.ship.stats.rotationSpeed;
                if (this.ship.currentTarget && player.ir.type == 4 && !this.keys['KeyA'] && !this.keys['KeyD'] && !this.keys['KeyW'] && !this.keys['KeyS']) {
                    let target = this.ship.currentTarget
                    let closest = this.getClosestCoords([target.x, target.y])
                    let timeToHit = Math.hypot(closest[1] - target.y, closest[0] - target.x) / (25 * this.shipStats.moveSpeed)
                    closest[0] += target.vx * timeToHit
                    closest[1] += target.vy * timeToHit

                    let desired = Math.atan2(closest[1] - target.y, closest[0] - target.x);
                    let angDist = (desired - this.ship.angle + Math.PI) % (Math.PI*2) - Math.PI;
                    this.ship.angle += (angDist < 0 ? angDist + Math.PI : angDist) * 0.125;
                }
            }
            if ((player.shipBattle.controlScheme == 0 && (this.keys['Space'] || this.pointerDown)) || player.ir.autoShoot) {
                if (player.ir.type == 10) {
                    this.chargeShot()
                } else {
                    this.shoot()
                }
            }
            if (this.shotChargeTimer) this.shotChargeTimer--;
            if (this.awaitingShotCharge && this.shotChargeTimer <= 0) {
                this.shoot()
                this.awaitingShotCharge = false
            }

            let maxVel = this.ship.stats.moveSpeed;
            this.ship.velocity = Math.max(-maxVel, Math.min(maxVel, this.ship.velocity));

            // Move ship
            this.ship.x += Math.cos(this.ship.angle) * this.ship.velocity;
            this.ship.y += Math.sin(this.ship.angle) * this.ship.velocity;

            // Wrap ship around arena edges
            if (this.ship.x < 0) this.ship.x += this.width;
            if (this.ship.x > this.width) this.ship.x -= this.width;
            if (this.ship.y < 0) this.ship.y += this.height;
            if (this.ship.y > this.height) this.ship.y -= this.height;
        }

        if (player.shipBattle.controlScheme > 0) {
            this.pointerTouches.forEach((value, key, map) => {
                if (!value.action) return;
                switch (value.action) {
                    case "leftStick": {
                        let rect = this.canvas.getBoundingClientRect();
                        let mouseX = (value.clientX - rect.left) / this.UIScale;
                        let mouseY = (value.clientY - rect.top) / this.UIScale;
                        let originX = 100 * this.mobileControlsScale
                        let originY = this.canvasHeight - (100 * this.mobileControlsScale)
                        let isOmnidirectionalMoving = this.shipRef.movementType == "omnidirectional"
                        this.mobileLeftStickDist = Math.hypot(mouseY - originY, !isOmnidirectionalMoving ? 0 : mouseX - originX)
                        if (this.mobileLeftStickDist < this.mobileControlsScale * 20) {
                            this.mobileLeftStickAngle = null
                        } else {
                            if (player.shipBattle.controlScheme == 1 || (this.shipRef.movementType == "omnidirectional")) {
                                this.mobileLeftStickAngle = Math.round(Math.atan2(mouseY - originY, mouseX - originX) / Math.PI * 4) * (Math.PI / 4)
                            } else {
                                this.mobileLeftStickAngle = Math.atan2(mouseY - originY, mouseX - originX) > 0 ? (Math.PI / 2) : (-Math.PI / 2)
                            }
                        }
                        
                        if (this.mobileLeftStickAngle != null) {
                            if (this.shipRef.movementType == "omnidirectional") {
                                // Desired Speed
                                const maxSpeed = (this.ship.stats.maxVelocity || 3.5) + (this.shipStats.moveSpeed || 0);
                                let desiredVx = Math.cos(this.mobileLeftStickAngle) * maxSpeed
                                let desiredVy = Math.sin(this.mobileLeftStickAngle) * maxSpeed
                            
                                // Smoothly approach desired velocity (lerp) for less "wonky" feel
                                const lerpFactor = 0.16; // tweak for responsiveness vs smoothness
                                this.ship.vx += (desiredVx - this.ship.vx) * lerpFactor;
                                this.ship.vy += (desiredVy - this.ship.vy) * lerpFactor;
                            
                                // Small global damping to stabilize movement
                                this.ship.vx *= 0.995;
                                this.ship.vy *= 0.995;
                            
                                // Zero legacy forward/backwards velocity so other ship logic doesn't interfere
                                if (typeof this.ship.velocity === "number") this.ship.velocity = 0;
                            
                                // Move ship (movement completely independent of facing)
                                this.ship.x += this.ship.vx;
                                this.ship.y += this.ship.vy;
                            } else {
                            
                                let ang = this.mobileLeftStickAngle / Math.PI * 4 + 4
                                ang = Math.round(ang)
                                switch (ang) {
                                    case 0, 8: {
                                        this.ship.angle -= this.ship.stats.rotationSpeed;
                                    break;}
                                    case 1: {
                                        this.ship.angle -= this.ship.stats.rotationSpeed;
                                        this.ship.velocity += this.ship.stats.acceleration + this.shipStats.moveSpeed * 0.1;
                                    break;}
                                    case 2: {
                                        this.ship.velocity += this.ship.stats.acceleration + this.shipStats.moveSpeed * 0.1;
                                    break;}
                                    case 3: {
                                        this.ship.angle += this.ship.stats.rotationSpeed;
                                        this.ship.velocity += this.ship.stats.acceleration + this.shipStats.moveSpeed * 0.1;
                                    break;}
                                    case 4: {
                                        this.ship.angle += this.ship.stats.rotationSpeed;
                                    break;}
                                    case 5: {
                                        this.ship.angle += this.ship.stats.rotationSpeed;
                                        this.ship.velocity -= this.ship.stats.acceleration + this.shipStats.moveSpeed * 0.1;
                                    break;}
                                    case 6: {
                                        this.ship.velocity -= this.ship.stats.acceleration + this.shipStats.moveSpeed * 0.1;
                                    break;}
                                    case 7: {
                                        this.ship.angle -= this.ship.stats.rotationSpeed;
                                        this.ship.velocity -= this.ship.stats.acceleration + this.shipStats.moveSpeed * 0.1;
                                    break;}
                                    default: {
                                        this.ship.angle -= this.ship.stats.rotationSpeed;
                                    break;};
                                }
                            
                                // Wrap ship around arena edges
                                if (this.ship.x < 0) this.ship.x += this.width;
                                if (this.ship.x > this.width) this.ship.x -= this.width;
                                if (this.ship.y < 0) this.ship.y += this.height;
                                if (this.ship.y > this.height) this.ship.y -= this.height;
                            }
                        } else {
                            if (this.ship.velocity > 0) {
                                this.ship.velocity -= this.ship.stats.deceleration;
                                if (this.ship.velocity < 0) this.ship.velocity = 0;
                            } else if (this.ship.velocity < 0) {
                                this.ship.velocity += this.ship.stats.deceleration;
                                if (this.ship.velocity > 0) this.ship.velocity = 0;
                            }
                        }
                    break;}
                    case "rightStick": {
                        let rect = this.canvas.getBoundingClientRect();
                        let mouseX = (value.clientX - rect.left) / this.UIScale;
                        let mouseY = (value.clientY - rect.top) / this.UIScale;
                        let originX = this.canvasWidth - (100 * this.mobileControlsScale)
                        let originY = this.canvasHeight - (100 * this.mobileControlsScale)
                        let isOmnidirectionalMoving = this.shipRef.movementType == "omnidirectional"
                        this.mobileRightStickDist = Math.hypot(!isOmnidirectionalMoving ? 0 : mouseY - originY, mouseX - originX)
                        if (this.mobileRightStickDist < this.mobileControlsScale * 20) {
                            this.mobileRightStickAngle = null
                        } else {
                            if (player.shipBattle.controlScheme == 1 || isOmnidirectionalMoving) {
                                this.mobileRightStickAngle = Math.atan2(mouseY - originY, mouseX - originX)
                            } else {
                                this.mobileRightStickAngle = Math.abs(Math.atan2(mouseY - originY, mouseX - originX)) > Math.PI / 2 ? Math.PI : 0
                            }
                        }
                        
                        if (this.mobileRightStickAngle != null) {
                            if (player.shipBattle.controlScheme == 1) {
                                this.ship.angle = this.mobileRightStickAngle
                                this.shoot()
                            } else {
                                this.ship.angle += this.mobileRightStickAngle == 0 ? this.ship.stats.rotationSpeed : -this.ship.stats.rotationSpeed;
                            }
                        }
                    break;}
                    case "rightButton": {
                        if (player.ir.type == 10) {
                            this.chargeShot()
                        } else {
                            if (this.ship.currentTarget && player.ir.type == 4) {
                                let target = this.ship.currentTarget
                                let closest = this.getClosestCoords([target.x, target.y])
                                let timeToHit = Math.hypot(closest[1] - target.y, closest[0] - target.x) / (25 * this.shipStats.moveSpeed)
                                closest[0] += target.vx * timeToHit
                                closest[1] += target.vy * timeToHit
                            
                                let desired = Math.atan2(closest[1] - target.y, closest[0] - target.x);
                                let angDist = (desired - this.ship.angle + Math.PI) % (Math.PI*2) - Math.PI;
                                this.ship.angle += (angDist < 0 ? angDist + Math.PI : angDist) * 0.125;
                            }
                            this.shoot()
                        }
                    break;}
                    default: break;
                }
            })
        } else {
            this.mobileLeftStickAngle = null
            this.mobileRightStickAngle = null
        }
        if (this.ship.velocity > 0) {
            this.ship.velocity -= this.ship.stats.deceleration;
            if (this.ship.velocity < 0) this.ship.velocity = 0;
        } else if (this.ship.velocity < 0) {
            this.ship.velocity += this.ship.stats.deceleration;
            if (this.ship.velocity > 0) this.ship.velocity = 0;
        }
        
        if (this.shipRef.movementType == "omnidirectional") {
            // Omnidirectional movement: smooth thrust toward desired velocity (rotation is purely visual)
            if (typeof this.ship.vx !== "number") this.ship.vx = 0;
            if (typeof this.ship.vy !== "number") this.ship.vy = 0;

            // Build input vector
            let ix = 0, iy = 0;
            if (player.shipBattle.controlScheme == 0) {
                if (this.keys['KeyW']) iy -= 1;
                if (this.keys['KeyS']) iy += 1;
                if (this.keys['KeyA']) ix -= 1;
                if (this.keys['KeyD']) ix += 1;
            }
            // Desired speed (account for moveSpeed upgrades)
            const maxSpeed = (this.ship.stats.maxVelocity || 3.5) + (this.shipStats.moveSpeed || 0);
            let desiredVx = 0, desiredVy = 0;
            if (ix !== 0 || iy !== 0) {
                let len = Math.hypot(ix, iy) || 1;
                desiredVx = (ix / len) * maxSpeed;
                desiredVy = (iy / len) * maxSpeed;
            }
            // Smoothly approach desired velocity (lerp) for less "wonky" feel
            const lerpFactor = 0.16; // tweak for responsiveness vs smoothness
            this.ship.vx += (desiredVx - this.ship.vx) * lerpFactor;
            this.ship.vy += (desiredVy - this.ship.vy) * lerpFactor;
            // Small global damping to stabilize movement
            this.ship.vx *= 0.995;
            this.ship.vy *= 0.995;
            // Zero legacy forward/backwards velocity so other ship logic doesn't interfere
            if (typeof this.ship.velocity === "number") this.ship.velocity = 0;
            // Move ship (movement completely independent of facing)
            this.ship.x += this.ship.vx;
            this.ship.y += this.ship.vy;
            // Wrap ship around arena edges
            if (this.ship.x < 0) this.ship.x += this.width;
            if (this.ship.x > this.width) this.ship.x -= this.width;
            if (this.ship.y < 0) this.ship.y += this.height;
            if (this.ship.y > this.height) this.ship.y -= this.height;
            // Rotation purely visual: smoothly face the mouse (won't affect movement)
            if (typeof this.mouseX === "number" && typeof this.mouseY === "number") {
                let desired = Math.atan2(this.mouseY - this.canvasHeight / 2, this.mouseX - this.canvasWidth / 2);
                let diff = desired - this.ship.angle;
                while (diff > Math.PI) diff -= 2 * Math.PI;
                while (diff < -Math.PI) diff += 2 * Math.PI;
                // smaller rotation step for smoothness
                this.ship.angle += Math.sign(diff) * Math.min(Math.abs(diff), Math.max(0.04, this.ship.stats.rotationSpeed || 0.08));
            }
            if (player.ir.type == 8) {
                // animate wings
                if (typeof this.ship.wingPhase !== "number") this.ship.wingPhase = 0;
                this.ship.wingPhase += 0.12;
                // handle laser firing
                if (this.ship._laserActive) {
                    // Laser follows mouse direction
                    if ((typeof this.mouseX === "number" && typeof this.mouseY === "number") || this.mobileRightStickAngle != null || (player.shipBattle.controlScheme > 0 && player.ir.autoShoot)) {
                        let desired = (player.shipBattle.controlScheme > 0) ? -this.mobileRightStickAngle || -this.ship.angle : -Math.atan2(this.mouseY - (this.canvasHeight / 2), this.mouseX - (this.canvasWidth / 2));
                        let diff = desired - (this.ship._laserAngle || 0);
                        while (diff > Math.PI) diff -= 2 * Math.PI;
                        while (diff < -Math.PI) diff += 2 * Math.PI;
                        this.ship._laserAngle = (this.ship._laserAngle || 0) + diff * 0.15;
                        this.ship._laserLength = 750 //Math.min(300, Math.hypot(this.mouseX - (this.canvasWidth / 2), this.mouseY - (this.canvasHeight / 2))) * 3
                    }
                    if (this.ship._laserHitCooldown > 0) this.ship._laserHitCooldown--;
                    if (this.ship._laserActive && this.ship._laserHitCooldown <= 0) {
                        let dmg = this.shipStats.attackDamage;
                        let ang = -this.ship._laserAngle;
                        let ux = Math.cos(ang), uy = Math.sin(ang);
                        let beamLen = Math.max(this.width, this.height) * 1.5;
                        let thickness = (this.ship.radius || 12) * 0.8;
                        // Check enemies
                        for (let enemy of this.enemies.concat(this.asteroids)) {
                            let closest = this.getClosestCoords([enemy.x, enemy.y])
                            let ex = enemy.x - closest[0];
                            let ey = enemy.y - closest[1];
                            if (Math.hypot(ex, ey) > this.ship._laserLength) continue;
                            let proj = ex * ux + ey * uy;
                            let perp = Math.abs(ex * (-uy) + ey * ux);
                            if (proj > -enemy.radius && proj < beamLen && perp < thickness + enemy.radius) {
                                if (!enemy.invulnerable) enemy.health = enemy.health.sub(dmg);
                                SB_celestialites[enemy.type].onAttacked(enemy, dmg, "ship")
                                if (enemy.health.lte(0)) handleEnemyDeath(enemy);
                            }
                        }
                        // Check asteroids
                        for (let a of this.asteroids) {
                            let ax = a.x - this.ship.x;
                            let ay = a.y - this.ship.y;
                            let proj = ax * ux + ay * uy;
                            let perp = Math.abs(ax * (-uy) + ay * ux);
                            if (proj > -a.size && proj < beamLen && perp < thickness + a.size) {
                                a.health -= dmg;
                            }
                        }
                        this.ship._laserHitCooldown = 6;
                    }
                    this.ship._laserTimer++;
                } else {
                    this.ship._laserActive = false;
                }
            }
        
        }
        for (let bullet of this.bullets) {
            // Homing behavior: enemy homing bullets should home to the player;
            // player-fired homing bullets should home to enemies.
            if (bullet.homing) {
                if (bullet.fromEnemy) {
                    // Home to player: compute desired and rotate toward it with clamped turn.
                    let closest = this.getClosestCoords([bullet.x, bullet.y])
                    let desired = Math.atan2(closest[1] - bullet.y, closest[0] - bullet.x);
                    let current = Math.atan2(bullet.vy, bullet.vx);
                    let diff = desired - current;
                    while (diff > Math.PI) diff -= 2 * Math.PI;
                    while (diff < -Math.PI) diff += 2 * Math.PI;
                    let maxTurn = bullet.homingStrength || 0.18;
                    let turn = Math.max(-maxTurn, Math.min(maxTurn, diff));
                    let speed = Math.hypot(bullet.vx, bullet.vy) || 1;
                    let newAngle = current + turn;
                    bullet.vx = Math.cos(newAngle) * speed;
                    bullet.vy = Math.sin(newAngle) * speed;
                } else {
                    // Player-fired homing: seek the nearest enemy
                    if ((!bullet.target || !bullet.target.health.gt(0)) && this.enemies.length) {
                        let closest = null;
                        let closestDist = Infinity;
                        for (let e of this.enemies) {
                            if (e.health.lte(0)) continue;
                            let c = this.getClosestCoords([bullet.x, bullet.y], [e.x, e.y]);
                            let dx = c[0] - this.ship.x;
                            let dy = c[1] - this.ship.y;
                            let d = Math.hypot(dx, dy);
                            if (d < closestDist) {
                                closestDist = d;
                                closest = e;
                            }
                        }
                        bullet.target = closest;
                    }

                    if (bullet.target && bullet.target.health.gt(0)) {
                        let closest = this.getClosestCoords([bullet.target.x, bullet.target.y])
                        let timeToHit = Math.hypot(closest[1] - bullet.y, closest[0] - bullet.x) / (Math.hypot(bullet.vx, bullet.vy) || 1)
                        closest[0] += bullet.target.vx * timeToHit
                        closest[1] += bullet.target.vy * timeToHit

                        let desired = Math.atan2(bullet.target.y - bullet.y, bullet.target.x - bullet.x);
                        let current = Math.atan2(bullet.vy, bullet.vx);
                        let diff = desired - current;
                        while (diff > Math.PI) diff -= 2 * Math.PI;
                        while (diff < -Math.PI) diff += 2 * Math.PI;

                        let maxTurn = bullet.homingStrength || 0.12;
                        let turn = Math.max(-maxTurn, Math.min(maxTurn, diff));
                        let speed = Math.hypot(bullet.vx, bullet.vy) || 1;
                        let newAngle = current + turn;
                        bullet.vx = Math.cos(newAngle) * speed;
                        bullet.vy = Math.sin(newAngle) * speed;
                    }
                }
            }

            if (bullet.type) {
                SB_updateMovement(bullet)
            } else {
                bullet.x += bullet.vx;
                bullet.y += bullet.vy;
            }
            if (bullet.x < 0) bullet.x += this.width;
            if (bullet.x > this.width) bullet.x -= this.width;
            if (bullet.y < 0) bullet.y += this.height;
            if (bullet.y > this.height) bullet.y -= this.height;
            bullet.life--;

            // Evolver shard edge collision: primary shard breaks into 3 mini shards when hitting arena edge
            if (bullet.evolverShard) {
                if (bullet.x < 0 || bullet.x > this.width || bullet.y < 0 || bullet.y > this.height) {
                    // spawn 4 mini shards
                        for (let k = 0; k < 4; k++) {
                        const ang = Math.random() * Math.PI * 2;
                        const spd = 6 + Math.random() * 4;
                        this.bullets.push({
                            x: Math.max(0, Math.min(this.width, bullet.x)),
                            y: Math.max(0, Math.min(this.height, bullet.y)),
                            vx: Math.cos(ang) * spd,
                            vy: Math.sin(ang) * spd,
                            life: 120,
                            damage: (bullet.damage || 1) * 0.2,
                            pierce: 0,
                            piercedAsteroids: [],
                            piercedEnemies: [],
                            fromEnemy: false,
                            evolverMini: true,
                            radius: 4,
                        });
                    }
                    bullet.life = 0;
                }
            }

            // Massive sword bouncing logic
            if (bullet.massiveSword) {
                bullet.rot = (bullet.rot || 0) + (bullet.rotSpd || 0.15);
                // bounce on edges without damping for the massive sword
                if (bullet.x < 0) { bullet.x = 0; bullet.vx = -bullet.vx; }
                if (bullet.x > this.width) { bullet.x = this.width; bullet.vx = -bullet.vx; }
                if (bullet.y < 0) { bullet.y = 0; bullet.vy = -bullet.vy; }
                if (bullet.y > this.height) { bullet.y = this.height; bullet.vy = -bullet.vy; }
            }
            // mini evolver shards bounce off edges until they hit an enemy
            if (bullet.evolverMini) {
                if (bullet.x < 0) { bullet.x = 0; bullet.vx = -bullet.vx * 0.9; }
                if (bullet.x > this.width) { bullet.x = this.width; bullet.vx = -bullet.vx * 0.9; }
                if (bullet.y < 0) { bullet.y = 0; bullet.vy = -bullet.vy * 0.9; }
                if (bullet.y > this.height) { bullet.y = this.height; bullet.vy = -bullet.vy * 0.9; }
                // slight damping to avoid infinite bouncing
                bullet.vx *= 0.998;
                bullet.vy *= 0.998;
            }
        }

        // Asteroid spawning (disabled in hard mode or while boss active)
        if (!this.bossActive) {
            this.asteroidSpawnTimer++;
            if (this.asteroidSpawnTimer > 30) {
                this.asteroidSpawnTimer = 0;
                SB_spawnNaturalAsteroid()
            }
        }

        // Enemy spawning (Alpha, Beta, Gamma + hard-mode types when active) with cooldown
        // TEMP
        if ((player.ir.battleStage !== "spaceZone1" || player.ir.battleLevel.gte(5)) && !this.bossActive) {
            let aliveEnemies = this.enemies.concat(this.asteroids).filter(e => e.alive).length;
            if (this.enemySpawnCooldown > 0) {
                this.enemySpawnCooldown--;
            }
            if (this.enemySpawnCooldown <= 0) {
                SB_spawnNaturalCelestialite()
            }
        }

        // Update enemies
        for (let enemy of this.enemies.concat(this.asteroids)) {
            enemy.health = enemy.health.add(enemy.regen.div(60)).min(enemy.maxHealth)
            SB_celestialites[enemy.type].tick(enemy)
            SB_updateMovement(enemy)
            enemy.x = ((enemy.x % this.width) + this.width) % this.width
            enemy.y = ((enemy.y % this.height) + this.height) % this.height
            if (enemy.health.lte(0)) {
                handleEnemyDeath(enemy);
                continue;
            }
        }

        // Update touch controls
        let processedControls = []
        this.pointerTouches.forEach((value, key, map) => {
            if (!value.action || processedControls.indexOf(value.action) > -1) return;
            processedControls.push(value.action)
            SB_touchControls[value.action].touchTick([value.clientX, value.clientY])
        })
        // Update ship
        this.shipRef.tick(this.ship)
        this.ship.vx += this.ship.ax
        this.ship.vy += this.ship.ay
        this.ship.x += this.ship.vx
        this.ship.y += this.ship.vy
        
        this.ship.ax *= this.ship.dax
        this.ship.ay *= this.ship.day
        this.ship.vx *= this.ship.dvx
        this.ship.vy *= this.ship.dvy

        // Gamma Ship trail damage
        if (this.gammaTrails) {
            for (let trail of this.gammaTrails) {
                let closest = this.getClosestCoords([trail.x, trail.y])
                trail.timer--;
                let dx = closest[0] - trail.x;
                let dy = closest[1] - trail.y;
                let shipRadius = this.shipRef.movementType == "roll" || this.shipRef.movementType == "jump" ? this.ship.radius : 12;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < trail.radius + shipRadius && trail.timer > 0) {
                    let dmg = trail.damage / this.shipStats.damageReduction;
                    
                    if (!this._asteroidMinigamePaused) {
                        if (this.shipRef.movementType == "roll" || this.shipRef.movementType == "jump") dmg /= 4;
                            player.ir.shipHealth = player.ir.shipHealth.sub(dmg);
                        if (player.ir.shipHealth.lte(0)) {
                            this.onShipDeath();
                        }
                    }
                }
            }
            this.gammaTrails = this.gammaTrails.filter(trail => trail.timer > 0);
        }

        for (let i in this.warnings) {
            let warning = this.warnings[i]
            let warnRef = SB_warnings[warning.type]
            if (!warning.ready && warning.timer <= warnRef.postReadyTimer) {
                warnRef.onReady(warning);
                warning.ready = true;
            }
            SB_updateMovement(warning)
            warnRef.tick(warning)
            warning.timer--
            while (warning.x < 0) warning.x += this.width
            while (warning.x > this.width) warning.x -= this.width;
            while (warning.y < 0) warning.y += this.height
            while (warning.y > this.height) warning.y -= this.height;
        }
        this.warnings = this.warnings.filter(warning => warning.timer >= 0);

        // Bullet-enemy collision (player bullets only)
        for (let bullet of this.bullets) {
            // allow normal player bullets OR special vampire spear bullets to hit enemies
            if (bullet.fromEnemy && !bullet.vampireSpear) continue;
            if (bullet.noCollision) continue;
            for (let enemy of this.enemies.concat(this.asteroids)) {
                    // Skip interactions with paused Iridite boss
                if (enemy._pausedBoss) continue;
                // avoid hitting same enemy multiple times per bullet
                if (bullet.piercedEnemies && bullet.piercedEnemies.includes(enemy)) continue;
                let dx = bullet.x - enemy.x;
                let dy = bullet.y - enemy.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < enemy.radius + bullet.radius) {
                    let bDmg = (typeof bullet.damage === 'number') ? bullet.damage : (bullet.damage && bullet.damage.toNumber ? bullet.damage.toNumber() : Number(bullet.damage || 0));
                    if (!enemy.invulnerable) enemy.health = enemy.health.sub(bDmg);
                    SB_celestialites[enemy.type].onAttacked(enemy, bDmg, "ship")
                    if (bullet.type) SB_projectiles[bullet.type].onHit(bullet, enemy);

                    // Vampire spear knockback: push enemies away along bullet velocity
                    if (bullet.vampireSpear) {
                        try {
                            let nx = (typeof bullet.vx === 'number') ? bullet.vx : 0;
                            let ny = (typeof bullet.vy === 'number') ? bullet.vy : 0;
                            let nlen = Math.sqrt(nx * nx + ny * ny) || 1;
                            nx /= nlen; ny /= nlen;
                            // stronger knockback: apply to knockback velocity so physics feels smoother
                            let kb = (typeof bullet.knockback === 'number') ? bullet.knockback : 18;
                            enemy._knockbackVx = (enemy._knockbackVx || 0) + nx * kb;
                            enemy._knockbackVy = (enemy._knockbackVy || 0) + ny * kb;
                            // longer knockback duration
                            enemy._knockbackTimer = Math.max(enemy._knockbackTimer || 0, 18);
                        } catch (err) { /* ignore knockback errors */ }
                    }

                    // Handle piercing bullets: decrement pierce and mark enemy as pierced
                    if (typeof bullet.pierce === "number" && bullet.pierce > 0) {
                        bullet.pierce--;
                        if (!bullet.piercedEnemies) bullet.piercedEnemies = [];
                        bullet.piercedEnemies.push(enemy);
                        // bullet remains alive until pierce runs out (< 0)
                        if (bullet.pierce < 0) bullet.life = 0;
                    } else {
                        // non-piercing: destroy bullet on hit
                        // If this is an evolver primary shard, spawn 3 mini shards on impact
                        if (bullet.evolverShard) {
                            for (let k = 0; k < 4; k++) {
                                const ang = Math.random() * Math.PI * 2;
                                const spd = 6 + Math.random() * 4;
                                this.bullets.push({
                                    x: enemy.x,
                                    y: enemy.y,
                                    vx: Math.cos(ang) * spd,
                                    vy: Math.sin(ang) * spd,
                                    life: 120,
                                    damage: (bullet.damage || 1) * 0.2,
                                    pierce: 0,
                                    piercedAsteroids: [],
                                    piercedEnemies: [],
                                    fromEnemy: false,
                                    evolverMini: true,
                                    radius: 4,
                                });
                            }
                        }
                        if (bullet.explosive) {
                            arena.bullets.push({
                                x: enemy.x,
                                y: enemy.y,
                                vx: 0,
                                vy: 0,
                                life: 3,
                                damage: 0,
                                pierce: 100,
                                piercedAsteroids: [],
                                piercedEnemies: [],
                                fromEnemy: false,
                                noCollision: true,
                                radius: 64,
                            });
                            if (bullet.life > 0) {
                                for (let enemy2 of this.enemies.concat(this.asteroids)) {
                                    let dx = bullet.x - enemy2.x;
                                    let dy = bullet.y - enemy2.y;
                                    let dist = Math.sqrt(dx * dx + dy * dy);
                                    if (dist < 256) {
                                        enemy2.health = enemy2.health.sub(bDmg * (1 - dist / 128));
                                    }
                                }
                            }
                        }
                        bullet.life = 0;
                    }

                    if (enemy.health.lte(0)) {
                        handleEnemyDeath(enemy);
                    }

                    // stop scanning further enemies only if bullet was destroyed
                    if (bullet.life <= 0) break;
                }
            }
        }
        

        // Enemy bullets hit player (also include vampire spear projectiles)
        for (let bullet of this.bullets) {
            if (!bullet.fromEnemy && !bullet.vampireSpear) continue;
            let dx = bullet.x - this.ship.x;
            let dy = bullet.y - this.ship.y;
            let shipRadius = this.shipRef.movementType == "roll" || this.shipRef.movementType == "jump" ? this.ship.radius : 12;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let bulletRadius = (typeof bullet.radius === "number") ? bullet.radius : (bullet.fromEnemy && bullet.homing ? 10 : 6);
            // account for projectile radius (giant bullets are larger)
            if (dist < shipRadius + bulletRadius) {
                 // ensure each enemy projectile only deals damage once
                if (!bullet._hitPlayer) {
                    bullet._hitPlayer = true;
                    let dmg = bullet.damage / this.shipStats.damageReduction;
                    if (this.shipRef.movementType == "roll" || this.shipRef.movementType == "jump") dmg /= 1.5;
                    player.ir.shipHealth = player.ir.shipHealth.sub(dmg);
                    if (bullet.type) SB_projectiles[bullet.type].onHit(bullet, "player");
                
                    // remove the projectile immediately so it can't deal damage again
                    bullet.life = 0;
                }
            }
        }

        // remove dead/consumed bullets so homing projectiles vanish on hit
        this.bullets = this.bullets.filter(b => b.life > 0);

        // Ship-enemy collision
        for (let enemy of this.enemies.concat(this.asteroids)) {
            // Skip collisions for a paused Iridite boss
            if (enemy._pausedBoss) continue;
            let dx = this.ship.x - enemy.x;
            let dy = this.ship.y - enemy.y;
            let shipRadius = this.shipRef.movementType == "roll" || this.shipRef.movementType == "jump" ? this.ship.radius : 12;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < enemy.radius + shipRadius && !enemy.attached) {
                let enemyDmg = new Decimal(this.ship.collisionDamage * this.shipStats.attackDamage);
                if (enemyDmg.isNan() || enemyDmg.lt(0)) enemyDmg = new Decimal(0);
                if (player.ir.type != 3 && player.ir.type != 7 && !enemy.invulnerable) enemy.health = enemy.health.sub(enemyDmg.mul(0.1));
                if (player.ir.type == 3 && !enemy.invulnerable) enemy.health = enemy.health.sub(enemyDmg.mul(1.5));
                if (player.ir.type == 7 && !enemy.invulnerable) enemy.health = enemy.health.sub(enemyDmg);
                SB_celestialites[enemy.type].onAttacked(enemy, enemyDmg, "ship")

                let dmgReduction = (typeof this.shipStats.damageReduction === 'number' ? this.shipStats.damageReduction : (this.shipStats.damageReduction.toNumber ? this.shipStats.damageReduction.toNumber() : Number(this.shipStats.damageReduction)))
                if (hasUpgrade("ir", 24)) dmgReduction *= 1.25;
                let shipDmgRaw = enemy.bodyDamage.toNumber() / this.shipStats.damageReduction * enemy.damage.toNumber();
                let shipDmg = (typeof shipDmgRaw === 'number') ? shipDmgRaw : (shipDmgRaw.toNumber ? shipDmgRaw.toNumber() : Number(shipDmgRaw));
                if (Number.isNaN(shipDmg) || !isFinite(shipDmg) || shipDmg < 0) shipDmg = 6 * dmgReduction;
                if (this.shipRef.movementType == "roll" || this.shipRef.movementType == "jump") shipDmg /= 50;
                if (!this._asteroidMinigamePaused) this.applyShipDamage(shipDmg);

               if (true /*this.shipRef.movementType == "roll" || this.shipRef.movementType == "jump"*/) {
                    let angle = Math.atan2(dy, dx);
                    let speed = Math.abs(Math.sqrt(Math.pow(this.ship.vx, 2) + Math.pow(this.ship.vy, 2)))
                    if (Number.isNaN(speed) || !isFinite(speed) || speed < 0) speed = 0
                    this.ship.vy += Math.sin(angle) * 6/(Math.sqrt(speed+1));
                    this.ship.vx += Math.cos(angle) * 6/(Math.sqrt(speed+1));
                } else {
                    //this.ship.velocity = -10;
                }
                
                if (enemy.health.lte(0) || enemy.health.isNan()) handleEnemyDeath(enemy);
                if ((player.ir.shipHealth.isNaN && player.ir.shipHealth.isNan()) || !player.ir.shipHealth.isFinite() || player.ir.shipHealth.lt(0)) player.ir.shipHealth = new Decimal(0);

                if (player.ir.shipHealth.lte(0)) {
                    this.onShipDeath();
                }
            }
        }

        // Add loot flashes
        for (let pos of arena.lootFlashPositions) {
            if (pos.type == "spaceRock") {
                this.lootFlashes.push({
                    x: pos.x,
                    y: pos.y,
                    text: `+${formatWhole(pos.amount)} space rock`,
                    timer: 120,
                    color: "#ffe066",
                    style: "18px monospace"
                });
            }
            if (pos.type == "spaceGem") {
                this.lootFlashes.push({
                    x: pos.x,
                    y: pos.y,
                    text: `+${formatWhole(pos.amount)} space gem`,
                    timer: 240,
                    color: "#66e8ff",
                    style: "24px monospace"
                });
            }
            if (pos.type == "spaceJunk") {
                this.lootFlashes.push({
                    x: pos.x,
                    y: pos.y,
                    text: `+${formatWhole(pos.amount)} space junk`,
                    timer: 120,
                    color: "#ffb366",
                    style: "18px monospace"
                });
            }
            if (pos.type == "bloodStones") {
                this.lootFlashes.push({
                    x: pos.x,
                    y: pos.y,
                    text: `+${formatWhole(pos.amount)} blood stone`,
                    timer: 120,
                    color: "#bf0000",
                    style: "18px monospace"
                });
            }
            if (pos.type == "bloodGems") {
                this.lootFlashes.push({
                    x: pos.x,
                    y: pos.y,
                    text: `+${formatWhole(pos.amount)} blood gem`,
                    timer: 240,
                    color: "#f5b8d7",
                    style: "24px monospace"
                });
            }
        }
        arena.lootFlashPositions = [];

        // Add XP orbs
        for (let orb of xpOrbsToAdd) {
            this.xpOrbs.push({
                x: orb.x,
                y: orb.y,
                amount: orb.amount,
                picked: false,
                timer: 600
            });
        }

        // Update XP orbs (move toward ship, pick up if close)
        for (let orb of this.xpOrbs) {
            let closest = this.getClosestCoords([orb.x, orb.y])
            let dx = closest[0] - orb.x;
            let dy = closest[1] - orb.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let speed = 2;
            if (dist > 5) {
                orb.x += dx / dist * speed;
                orb.y += dy / dist * speed;
            }
            if (dist < 30 && !orb.picked) {
                player.ir.battleXP = player.ir.battleXP.add(orb.amount * this.shipStats.xpGain);
                addLevelableXP("ir", player.ir.type, orb.amount * this.shipStats.xpGain)
                orb.picked = true;
            }
            orb.x = ((orb.x % this.width) + this.width) % this.width
            orb.y = ((orb.y % this.height) + this.height) % this.height
            orb.timer--;
        }
        this.xpOrbs = this.xpOrbs.filter(orb => !orb.picked && orb.timer > 0);

        // Update special projectiles
        for (let projectile of this.bullets) {
            if (!projectile.type) continue;
            SB_projectiles[projectile.type].tick(projectile)
        }

        this.draw();
    }

    // Apply damage to player's ship respecting invulnerability frames
    // Returns true if damage was applied, false if blocked by invuln
    applyShipDamage(dmg) {
        // When asteroid minigame is paused, ship should not take damage
        if (this._asteroidMinigamePaused) return false;
        // invulnerability duration: ~333ms (max 3 hits per second)
        const INVULN_MS = 1000 / 3;
        if (this.shipHitInvuln && this.shipHitInvuln > 0) return false;

        if (this.enemies.concat(this.asteroids).some(e => e.type === "iriditeBoss" && e.health.gt(0))) {
            player.ir.tookDamageInIriditeFight = true;
        }

        // grant invulnerability
        this.shipHitInvuln = INVULN_MS;
        try {
            if (player.ir.shipHealth && typeof player.ir.shipHealth.sub === 'function') {
                // Decimal-friendly subtraction
                player.ir.shipHealth = player.ir.shipHealth.sub(dmg);
            } else if (typeof player.ir.shipHealth === 'number') {
                const raw = (typeof dmg === 'number') ? dmg : (dmg && dmg.toNumber ? dmg.toNumber() : Number(dmg));
                player.ir.shipHealth = Math.max(0, player.ir.shipHealth - raw);
            }
        } catch (e) {
            // fallback numeric
            try {
                const raw = (typeof dmg === 'number') ? dmg : (dmg && dmg.toNumber ? dmg.toNumber() : Number(dmg));
                if (typeof player.ir.shipHealth === 'number') player.ir.shipHealth = Math.max(0, player.ir.shipHealth - raw);
            } catch (e2) {}
        }

        // clamp/validate health value
        try {
            if ((player.ir.shipHealth.isNaN && player.ir.shipHealth.isNan()) || !player.ir.shipHealth.isFinite || player.ir.shipHealth < 0) player.ir.shipHealth = new Decimal(0);
        } catch (e) {
            if (typeof player.ir.shipHealth === 'number' && player.ir.shipHealth < 0) player.ir.shipHealth = 0;
        }

        // death check
        try {
            if (player.ir.shipHealth && player.ir.shipHealth.lte && player.ir.shipHealth.lte(0)) this.onShipDeath();
            else if (typeof player.ir.shipHealth === 'number' && player.ir.shipHealth <= 0) this.onShipDeath();
        } catch (e) {}
        return true;
    }

    createSmallAsteroid(x, y) {
        let size = 20 + Math.random() * 10;
        let health = 20;
        let angle = Math.random() * Math.PI * 2;
        let speed = 2 + Math.random() * 2;
        let phaseTime = 99999999999999;
        let shape = this.generateConvexPolygon(size, 5 + Math.floor(Math.random() * 3));

        if (player.ir.battleLevel.gte(20)) {
            health = health * Decimal.pow(1.04, player.ir.battleLevel.sub(19)).toNumber()
        }

        return {
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: size,
            health: health,
            maxHealth: health,
            big: false,
            splitCount: 0,
            phaseTimer: phaseTime,
            phased: false,
            shape: shape,
        };
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.scale(this.UIScale, this.UIScale)

        // Draw ship
        SB_ships[player.ir.type].draw(this.ctx, this.ship)

        // Draw warns
        for (let i = this.warnings.length - 1; i >= 0; i--) {
            let warning = this.warnings[i];
            let warnRef = SB_warnings[warning.type]
            this.drawWrappingLine(warning, warnRef)
        }

        // Draw gamma trails
        if (this.gammaTrails) {
            for (let trail of this.gammaTrails) {
                let wrapped = this.getVisibleWrappedCoords([trail.x, trail.y], [trail.radius * 2, trail.radius * 2])
                if (wrapped != null) {
                    this.ctx.save();
                    this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                    this.ctx.globalAlpha = Math.max(0.2, trail.timer / 180);
                    this.ctx.beginPath();
                    this.ctx.arc(wrapped[0], wrapped[1], trail.radius, 0, 2 * Math.PI);
                    this.ctx.fillStyle = "#b44cff";
                    this.ctx.fill();
                    this.ctx.restore();
                }
            }
        }

        // Draw bullets
        for (let bullet of this.bullets) {
            if (bullet.type && SB_projectiles[bullet.type]) {
                SB_projectiles[bullet.type].draw(this.ctx, bullet);
                continue;
            }

            let radius = bullet.radius || 20
            let wrapped = this.getVisibleWrappedCoords([bullet.x, bullet.y], [radius * 2, radius * 2])
            if (!wrapped) continue;
            // Skip ritual projectiles - RitualArena handles these with custom visuals
            if (bullet.ritualOrb || bullet.ritualBlade) continue;
            
            if (bullet.massiveSword) {
                // Draw a large, spinning metallic sword
                this.ctx.save();
                this.ctx.translate(wrapped[0], wrapped[1]);
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                this.ctx.rotate(bullet.rot || 0);

                let r = bullet.radius || 80;
                let bladeLen = r * 1.5;
                let bladeW = r * 0.3;

                // Blade
                let grad = this.ctx.createLinearGradient(-bladeW/2, 0, bladeW/2, 0);
                grad.addColorStop(0, "#888");
                grad.addColorStop(0.5, "#eee");
                grad.addColorStop(1, "#888");
                this.ctx.fillStyle = grad;
                this.ctx.beginPath();
                this.ctx.moveTo(0, -bladeLen); // Tip
                this.ctx.lineTo(-bladeW/2, -bladeLen * 0.2);
                this.ctx.lineTo(-bladeW/2, 0);
                this.ctx.lineTo(bladeW/2, 0);
                this.ctx.lineTo(bladeW/2, -bladeLen * 0.2);
                this.ctx.closePath();
                this.ctx.fill();

                // Blade Edge Highlight
                this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                this.ctx.lineWidth = 2;
                this.ctx.stroke();

                // Crossguard
                this.ctx.fillStyle = "#553300";
                this.ctx.fillRect(-bladeW * 1.2, 0, bladeW * 2.4, bladeW * 0.4);

                // Handle
                this.ctx.fillStyle = "#331100";
                this.ctx.fillRect(-bladeW * 0.2, bladeW * 0.4, bladeW * 0.4, bladeW * 0.8);

                // Pommel
                this.ctx.fillStyle = "#553300";
                this.ctx.beginPath();
                this.ctx.arc(0, bladeW * 1.3, bladeW * 0.3, 0, Math.PI * 2);
                this.ctx.fill();

                // Glow
                this.ctx.shadowColor = "rgba(255, 0, 0, 0.5)";
                if (!options.performanceMode) {this.ctx.shadowBlur = 20} else {this.ctx.shadowBlur = 0};
                this.ctx.strokeStyle = "rgba(255, 0, 0, 0.3)";
                this.ctx.lineWidth = 4;
                this.ctx.stroke();

                this.ctx.restore();
            } else if (bullet.star) {
                // draw mini-star glyph for thematic boss/projectiles
                this.ctx.save();
                this.ctx.translate(wrapped[0], wrapped[1]);
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                let ang = Math.atan2(bullet.vy, bullet.vx || 0);
                this.ctx.rotate(ang);
                // determine font size; giant bullets are significantly larger
                let fontSize = 10;
                if (bullet.giant) fontSize = Math.max(36, (bullet.radius || 18) * 1.6);
                else if (bullet.fromEnemy && bullet.homing) fontSize = 20;
                else if (bullet.fromEnemy) fontSize = 14;
                else if (bullet.size) fontSize = Math.max(fontSize, bullet.size / 1.2);
                // optional giant base glow
                if (bullet.giant) {
                    this.ctx.save();
                    this.ctx.globalCompositeOperation = "lighter";
                    this.ctx.fillStyle = "rgba(255,220,140,0.14)";
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, (bullet.radius || 18) * 1.4, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.restore();
                }
                this.ctx.font = `${fontSize}px monospace`;
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";
                this.ctx.fillStyle = bullet.fromEnemy ? "#ffeecb" : "#ffff00";//ffec8b
                this.ctx.shadowColor = "#fff1";
                if (!options.performanceMode) {this.ctx.shadowBlur = 6} else {this.ctx.shadowBlur = 0};
                this.ctx.fillText("✦", 0, 0);
                this.ctx.restore();
            } else {
                this.ctx.save();

                let r = bullet.radius || 3;
                this.ctx.beginPath();
                this.ctx.arc(wrapped[0] + (this.canvasWidth / 2) - this.ship.x, wrapped[1] + (this.canvasHeight / 2) - this.ship.y, r, 0, 2 * Math.PI);
                this.ctx.fillStyle = bullet.fromEnemy ? "#ff4444" : "#ffff00";
                this.ctx.fill();
                this.ctx.restore();
            }
            // Evolver primary shard rendering (crystal shard with facets)
            if (bullet.evolverShard) {
                this.ctx.save();
                this.ctx.translate(wrapped[0], wrapped[1]);
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                let ang = Math.atan2(bullet.vy, bullet.vx || 0);
                this.ctx.rotate(ang);
                let len = Math.min(56, (bullet.radius || 26) * 2);

                // crystal gradients matching ship
                let mainG = this.ctx.createLinearGradient(len, 0, -len * 0.7, 0);
                mainG.addColorStop(0, '#5fb8ff');
                mainG.addColorStop(0.5, '#7c4dff');
                mainG.addColorStop(1, '#9aa7ff');
                let facetG = this.ctx.createLinearGradient(0, -len * 0.5, 0, len * 0.5);
                facetG.addColorStop(0, '#3f51b5');
                facetG.addColorStop(1, '#00bcd4');


                // main crystal body
                this.ctx.beginPath();
                this.ctx.moveTo(len, 0);
                this.ctx.lineTo(len * 0.3, -len * 0.4);
                this.ctx.lineTo(-len * 0.5, -len * 0.2);
                this.ctx.lineTo(-len * 0.7, 0);
                this.ctx.lineTo(-len * 0.5, len * 0.2);
                this.ctx.lineTo(len * 0.3, len * 0.4);
                this.ctx.closePath();
                this.ctx.fillStyle = mainG;
                this.ctx.fill();
                this.ctx.strokeStyle = '#000';
                this.ctx.lineWidth = Math.max(2, len * 0.1);
                this.ctx.stroke();

                // facet lines
                this.ctx.beginPath();
                this.ctx.moveTo(len * 0.3, -len * 0.4);
                this.ctx.lineTo(-len * 0.5, len * 0.2);
                this.ctx.strokeStyle = 'rgba(255,255,255,0.6)';
                this.ctx.lineWidth = Math.max(1, len * 0.05);
                this.ctx.stroke();

                this.ctx.beginPath();
                this.ctx.moveTo(len * 0.3, len * 0.4);
                this.ctx.lineTo(-len * 0.5, -len * 0.2);
                this.ctx.stroke();

                // side facets
                this.ctx.beginPath();
                this.ctx.moveTo(len * 0.3, -len * 0.4);
                this.ctx.lineTo(0, -len * 0.6);
                this.ctx.lineTo(-len * 0.5, -len * 0.2);
                this.ctx.closePath();
                this.ctx.fillStyle = facetG;
                this.ctx.fill();

                this.ctx.beginPath();
                this.ctx.moveTo(len * 0.3, len * 0.4);
                this.ctx.lineTo(0, len * 0.6);
                this.ctx.lineTo(-len * 0.5, len * 0.2);
                this.ctx.closePath();
                this.ctx.fillStyle = facetG;
                this.ctx.fill();

                // highlights
                this.ctx.beginPath();
                this.ctx.moveTo(len * 0.5, -len * 0.1);
                this.ctx.lineTo(len * 0.2, 0);
                this.ctx.lineTo(len * 0.5, len * 0.1);
                this.ctx.closePath();
                this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
                this.ctx.fill();

                this.ctx.restore();
            }
            // Evolver mini shard rendering (small blue bullet)
            if (bullet.evolverMini) {
                this.ctx.save();
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                this.ctx.beginPath();
                let r = bullet.radius || 4;
                this.ctx.arc(wrapped[0], wrapped[1], r, 0, 2 * Math.PI);
                this.ctx.fillStyle = '#5fb8ff';
                this.ctx.fill();
                this.ctx.strokeStyle = '#2c3e50';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
                this.ctx.restore();
            }
            // Evolver mini shard rendering (smaller triangle)
            if (bullet.evolverMini) {
                this.ctx.save();
                this.ctx.translate(wrapped[0], wrapped[1]);
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                let ang = Math.atan2(bullet.vy, bullet.vx || 0);
                this.ctx.rotate(ang);
                let len = Math.min(8, bullet.radius || 6);
                // mini shards use the same family as the ship but slightly desaturated
                let g2 = this.ctx.createLinearGradient(len, 0, -len * 0.6, 0);
                g2.addColorStop(0, 'rgba(241,182,255,0.95)');
                g2.addColorStop(0.5, 'rgba(154,167,255,0.95)');
                g2.addColorStop(1, 'rgba(95,184,255,0.95)');
                this.ctx.beginPath();
                this.ctx.moveTo(len, 0);
                this.ctx.lineTo(-len * 0.6, -len * 0.5);
                this.ctx.lineTo(-len * 0.6, len * 0.5);
                this.ctx.closePath();
                this.ctx.fillStyle = g2;
                this.ctx.fill();
                this.ctx.lineWidth = Math.max(1, len * 0.2);
                this.ctx.strokeStyle = '#0b0b0b';
                this.ctx.stroke();
                this.ctx.restore();
            }
        }

        // Draw XP orbs
        for (let orb of this.xpOrbs) {
            this.ctx.save();
            //this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
            let wrapped = this.getVisibleWrappedCoords([orb.x, orb.y], [4, 4])
            if (wrapped != null) {
                this.ctx.globalAlpha = 0.8;
                this.ctx.beginPath();
                this.ctx.arc(wrapped[0] + (this.canvasWidth / 2) - this.ship.x, wrapped[1] + (this.canvasHeight / 2) - this.ship.y, 4, 0, 2 * Math.PI);
                this.ctx.shadowBlur = 4;
                this.ctx.shadowColor = "#0000ff";
                this.ctx.fillStyle = "white";
                this.ctx.fill();
            }
            this.ctx.restore();
        }

        // Draw Enemies
        for (let enemy of this.enemies.concat(this.asteroids)) {
            let type = SB_celestialites[enemy.type];
            type.draw(this.ctx, enemy);
            let wrapped = this.getVisibleWrappedCoords([enemy.x, enemy.y], [enemy.radius * 2, enemy.radius * 2])
            if (wrapped) {
                if (enemy.type == "muShip") this.ctx.globalAlpha = Math.max(1 - enemy.playerDist / 300, 0);
                this.ctx.save();
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                this.ctx.fillStyle = "#151230";
                this.ctx.fillRect(wrapped[0] - enemy.radius - 2, wrapped[1] - enemy.radius - 20, enemy.radius * 2 + 4, 13);
                let barWidth = enemy.radius * 2 * enemy.health.div(enemy.maxHealth).toNumber();
                this.ctx.fillStyle = "#bf0000";
                this.ctx.fillRect(wrapped[0] - enemy.radius, wrapped[1] - enemy.radius - 18, barWidth, 9);

                let t = formatSimple(enemy.health.floor().max(0)) + "/" + formatSimple(enemy.maxHealth.floor())
                this.ctx.font = "12px monospace";
                this.ctx.fillStyle = "#151230";
                this.ctx.textAlign = "center";
                this.ctx.fillText(t, wrapped[0] + 1, wrapped[1] - enemy.radius - 9 + 1)
                this.ctx.fillText(t, wrapped[0] + 1, wrapped[1] - enemy.radius - 9 - 1)
                this.ctx.fillText(t, wrapped[0] - 1, wrapped[1] - enemy.radius - 9 + 1)
                this.ctx.fillText(t, wrapped[0] - 1, wrapped[1] - enemy.radius - 9 - 1)
                this.ctx.fillStyle = "white";
                this.ctx.fillText(t, wrapped[0], wrapped[1] - enemy.radius - 9)
                
                this.ctx.restore();
            }
            this.ctx.globalAlpha = 1;
        }

        // Draw sniper auto-aim target cross if present
        if (player.ir.type == 4 && this.ship.currentTarget && this.ship.currentTarget.health.gt(0)) {
            let t = this.ship.currentTarget;
            let wrapped = this.getVisibleWrappedCoords([t.x, t.y], [t.radius * 2, t.radius * 2])
            if (wrapped) {
                this.ctx.save();
                this.ctx.translate(wrapped[0], wrapped[1]);
                this.ctx.translate((this.canvasWidth / 2) - this.ship.x, (this.canvasHeight / 2) - this.ship.y);
                this.ctx.beginPath();
                this.ctx.moveTo(-16, 0);
                this.ctx.lineTo(16, 0);
                this.ctx.moveTo(0, -16);
                this.ctx.lineTo(0, 16);
                this.ctx.moveTo(0, 0);
                this.ctx.arc(0, 0, 4, 0, Math.PI * 2);
                this.ctx.strokeStyle = "#ff4444";
                this.ctx.lineWidth = 6;
                this.ctx.stroke();
                this.ctx.strokeStyle = "yellow";
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                this.ctx.restore();
            };
        }

        // Draw loot flashes
        for (let i = this.lootFlashes.length - 1; i >= 0; i--) {
            let flash = this.lootFlashes[i];
            let wrapped = this.getVisibleWrappedCoords([flash.x, flash.y - 30 - (120 - flash.timer)], [400, 50])
            if (wrapped != null) {
                this.ctx.save();
                this.ctx.globalAlpha = Math.max(0, flash.timer / 120);
                this.ctx.font = flash.style;
                this.ctx.fillStyle = flash.color;
                this.ctx.textAlign = "center";
                this.ctx.fillText(
                    flash.text,
                    wrapped[0] + (this.canvasWidth / 2) - this.ship.x,
                    wrapped[1] + (this.canvasHeight / 2) - this.ship.y,
                );
                this.ctx.restore();
            }            
            flash.timer--;
            if (flash.timer <= 0) this.lootFlashes.splice(i, 1);
        }

        // Draw minimap

        this.ctx.save();
        this.ctx.globalAlpha = 1
        this.ctx.fillStyle = "#0000007f";
        this.ctx.strokeStyle = player.ir.primaryColor;
        this.ctx.lineWidth = 3;
        let aspectRatio = this.width / this.height
        if (aspectRatio < 1) {
            this.ctx.fillRect(20 + (80 * (1 - aspectRatio)), 20, 160 * aspectRatio, 160);
            this.ctx.strokeRect(20 + (80 * (1 - aspectRatio)), 20, 160 * aspectRatio, 160);
        } else {
            this.ctx.fillRect(20, 20 + (80 * (1 - (1 / aspectRatio))), 160, 160 * (1 / aspectRatio));
            this.ctx.strokeRect(20, 20 + (80 * (1 - (1 / aspectRatio))), 160, 160 * (1 / aspectRatio));
        }
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(98, 98, 4, 4);
        
        for (let asteroid of this.asteroids) {
            this.ctx.save();
            this.drawMinimapIcon("gray", 4, [asteroid.x, asteroid.y])
            this.ctx.restore();
        }
        for (let orb of this.xpOrbs) {
            this.ctx.save();
            this.drawMinimapIcon("blue", 2, [orb.x, orb.y])
            this.ctx.restore();
        }
        for (let bullet of this.bullets) {
            this.ctx.save();
            if (bullet.fromEnemy) {
                this.drawMinimapIcon("red", 2, [bullet.x, bullet.y])
            } else {
                this.drawMinimapIcon("yellow", 2, [bullet.x, bullet.y])
            }
            this.ctx.restore();
        }
        if (player.ir.type == 8 && this.ship._laserActive) {
            this.ctx.save();
            this.ctx.fillStyle = "yellow"
            this.ctx.translate(100, 100)
            this.ctx.rotate(-this.ship._laserAngle)
            this.ctx.fillRect(0, -1, this.ship._laserLength / Math.min(this.width, this.height) * 160, 2)
            this.ctx.restore();
        }
        for (let enemy of this.enemies) {
            this.ctx.save();
            if (enemy.type == "muShip") {
                if (enemy.playerDist < 300 || Math.random() < 0.00333 || enemy.targetingTimer > 0) this.drawMinimapIcon("red", 4, [enemy.x, enemy.y])
            } else this.drawMinimapIcon("red", 4, [enemy.x, enemy.y]);
            this.ctx.restore();
        }
        for (let trail of this.gammaTrails) {
            this.ctx.save();
            this.drawMinimapIcon("red", 2, [trail.x, trail.y])
            this.ctx.restore();
        }

        // Draw unarmed indicator
        if (player.ir.type == 3) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.0625
            let g = this.ctx.createRadialGradient(this.canvasWidth / 2, this.canvasHeight / 2, 100, this.canvasWidth / 2, this.canvasHeight / 2, 300)
            g.addColorStop(0, "#00ff0000")
            g.addColorStop(0, "#00ff00")
            g.addColorStop(0.5, "#ffff00")
            g.addColorStop(1, "#ff0000")
            this.ctx.fillStyle = g;
            this.ctx.beginPath();
            this.ctx.ellipse(this.canvasWidth / 2, this.canvasHeight / 2, 300, 300, 0, 0, 360);
            this.ctx.fill();
            this.ctx.strokeStyle = "#ffff00";
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.ellipse(this.canvasWidth / 2, this.canvasHeight / 2, 100, 100, 0, 0, 360);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.ellipse(this.canvasWidth / 2, this.canvasHeight / 2, 300, 300, 0, 0, 360);
            this.ctx.stroke();

            this.ctx.globalAlpha = 0.5

            this.ctx.lineJoin = "round";
            this.ctx.strokeStyle = "#ff0000";
            this.ctx.beginPath();
            this.ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2)
            this.ctx.rotate(this.ship.rollingAng)
            this.ctx.moveTo(this.ship.radius, 0)
            this.ctx.lineTo(this.ship.rollingSpeed * 200 + 90, 0)
            this.ctx.stroke();
            this.ctx.fillStyle = "#ff0000";
            this.ctx.beginPath();
            this.ctx.lineTo(this.ship.rollingSpeed * 200 + 90, 5)
            this.ctx.lineTo(this.ship.rollingSpeed * 200 + 90, -5)
            this.ctx.lineTo(this.ship.rollingSpeed * 200 + 100, 0)
            this.ctx.fill()

            let dist = Math.min(1, Math.hypot(this.ship.vy, this.ship.vx) / (this.shipStats.moveSpeed / 5 * this.ship.stats.deceleration) * (1 - this.ship.stats.deceleration))
            this.ctx.strokeStyle = "#00ff00";
            this.ctx.beginPath();
            this.ctx.rotate(-this.ship.rollingAng)
            this.ctx.rotate(Math.atan2(this.ship.vy, this.ship.vx))
            this.ctx.moveTo(this.ship.radius, 0)
            this.ctx.lineTo(dist * 200 + 90, 0)
            this.ctx.stroke();
            this.ctx.fillStyle = "#00ff00";
            this.ctx.beginPath();
            this.ctx.lineTo(dist * 200 + 90, 5)
            this.ctx.lineTo(dist * 200 + 90, -5)
            this.ctx.lineTo(dist * 200 + 100, 0)
            this.ctx.fill()

            this.ctx.restore();
        }

        // Draw mobile controls
        if (player.shipBattle.controlScheme > 0) {
            let ref = this.controlTypeRef.mobile
            if (ref) {
                for (let i in ref) {
                    let v = ref[i]
                    let type
                    if (Array.isArray(v)) {
                        if (player.shipBattle.controlScheme == v[1]) type = v[0];
                        else continue;
                    } else type = v;
                    SB_touchControls[type].draw(this.ctx);
                }
            }
        }

        // Draw upgrade choice overlay
        if (player.ir.menu > 0) {
            /*
            this.ctx.save();
            this.ctx.globalAlpha = 0.375;
            this.ctx.fillStyle = player.ir.secondaryColor;
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.restore();
            
            if (player.ir.menu == 1) {
                this.ctx.save();
                this.ctx.moveTo(this.ship.x + (this.canvasWidth / 2), this.ship.y + (this.canvasHeight / 2));
                this.ctx.globalAlpha = 1;
                this.ctx.font = "bold 48px monospace";
                this.ctx.fillStyle = "#fff";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Choose an Upgrade!", this.canvasWidth / 2, this.canvasHeight / 2 - 100);

                let spacing = 262.5;
                let boxWidth = 250;
                let boxHeight = 150;
                let totalWidth = spacing * (this.upgradeChoices.length - 1) + boxWidth;
                let startX = (this.canvasWidth - totalWidth) / 2;
                let boxY = (this.canvasHeight - boxHeight) / 2;

                for (let i = 0; i < this.upgradeChoices.length; i++) {
                    let upg = UPGRADE_POOL[this.upgradeChoices[i]];
                    let boxX = startX + i * spacing;

                    this.ctx.save();
                    this.ctx.globalAlpha = 1;
                    this.ctx.fillStyle = "#000080";
                    this.ctx.strokeStyle = UPGRADE_RARITIES[upg.rarity].color;
                    this.ctx.lineWidth = 3;
                    this.ctx.beginPath();
                    this.ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 10);
                    this.ctx.fill();
                    this.ctx.stroke();

                    if (this.selectedUpgradeIndex === i) {
                        this.ctx.save();
                        this.ctx.strokeStyle = "#ffe066";
                        this.ctx.lineWidth = 3;
                        this.ctx.beginPath();
                        this.ctx.roundRect(boxX + 3, boxY + 3, boxWidth - 6, boxHeight - 6, 7);
                        this.ctx.stroke();
                        this.ctx.restore();
                    }

                    this.ctx.font = "bold 24px monospace";
                    this.ctx.fillStyle = UPGRADE_RARITIES[upg.rarity].color;
                    this.ctx.textAlign = "center";
                    this.ctx.fillText(upg.name(), boxX + boxWidth / 2, boxY + 30);

                    let rarityText = upg.rarity.charAt(0).toUpperCase() + upg.rarity.slice(1);
                    this.ctx.font = "italic 18px monospace";
                    this.ctx.fillStyle = UPGRADE_RARITIES[upg.rarity].color;
                    this.ctx.fillText(rarityText, boxX + boxWidth / 2, boxY + 54);

                    this.ctx.font = "16px monospace";
                    this.ctx.fillStyle = "#fff";
                    let desc = upg.description();
                    let descLines = [];
                    let words = desc.split(" ");
                    let line = "";
                    for (let w = 0; w < words.length; w++) {
                        let testLine = line + words[w] + " ";
                        let metrics = this.ctx.measureText(testLine);
                        if (metrics.width > boxWidth - 40 && line.length > 0) {
                            descLines.push(line.trim());
                            line = words[w] + " ";
                        } else {
                            line = testLine;
                        }
                    }
                    descLines.push(line.trim());
                    for (let l = 0; l < descLines.length; l++) {
                        this.ctx.fillText(descLines[l], boxX + boxWidth / 2, boxY + 78 + l * 18);
                    }
                    this.ctx.restore();
                }

                if (this.selectedUpgradeIndex !== null) {
                    let confirmWidth = 250;
                    let confirmHeight = 50;
                    let confirmX = this.canvasWidth / 2 - confirmWidth / 2;
                    let confirmY = boxY + boxHeight + 12;
                    this.ctx.save();
                    this.ctx.globalAlpha = 1;
                    this.ctx.fillStyle = "#000080";
                    this.ctx.strokeStyle = "#ffe066";
                    this.ctx.lineWidth = 3;
                    this.ctx.beginPath();
                    this.ctx.roundRect(confirmX, confirmY, confirmWidth, confirmHeight, 10);
                    this.ctx.fill();
                    this.ctx.stroke();

                    this.ctx.font = "bold 24px monospace";
                    this.ctx.fillStyle = "#fff";
                    this.ctx.textAlign = "center";
                    this.ctx.fillText("Confirm", confirmX + confirmWidth / 2, confirmY + confirmHeight / 2 + 10);
                    this.ctx.restore();

                    let upgrades = structuredClone(this.upgrades)
                    upgrades[this.upgradeChoices[this.selectedUpgradeIndex]]++
                    let potentialShipStats = SB_getUpgradedShipStats(upgrades)
                    let matches = []
                    for (const [i, v] of Object.entries(potentialShipStats)) {
                        if (typeof(v) === "object") {
                            if (!v.eq(this.shipStats[i])) matches.push(i);
                        } else if (v != this.shipStats[i]) matches.push(i);
                    }

                    for (let i = 0; i < matches.length; i++) {
                        let key = matches[i]
                        let statMul = 1
                        if (key == "healthRegen") statMul *= 60;
                        this.ctx.save();
                        this.ctx.globalAlpha = 1;
                        this.ctx.fillStyle = player.ir.secondaryColor;
                        this.ctx.strokeStyle = player.ir.primaryColor;
                        this.ctx.lineWidth = 3;
                        this.ctx.beginPath();
                        this.ctx.roundRect(this.canvasWidth / 2 - 387.5, confirmY + 62 + i * 61, 775, 50, 10);
                        this.ctx.fill();
                        this.ctx.stroke();

                        this.ctx.font = "bold 24px monospace";
                        this.ctx.fillStyle = "#fff";
                        this.ctx.textAlign = "left";
                        this.ctx.fillText(SHIP_STAT_FORMATTING[key].name, this.canvasWidth / 2 - 375, confirmY + 97 + i * 61, 775);

                        this.ctx.font = "bold 24px monospace";
                        this.ctx.fillStyle = "#fff";
                        this.ctx.textAlign = "right";
                        this.ctx.fillText(SHIP_STAT_FORMATTING[key].valuePrefix + formatSimple(this.shipStats[key] * statMul, 2) + SHIP_STAT_FORMATTING[key].valueSuffix + " → " + SHIP_STAT_FORMATTING[key].valuePrefix + formatSimple(potentialShipStats[key] * statMul, 2) + SHIP_STAT_FORMATTING[key].valueSuffix, this.canvasWidth / 2 + 375, confirmY + 97 + i * 61, 750);

                        this.ctx.restore();
                    }
                }
            } else if (player.ir.menu == 2) {
                this.ctx.save();
                this.ctx.globalAlpha = 1;
                this.ctx.font = "bold 48px monospace";
                this.ctx.fillStyle = "#fff";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Stats", this.canvasWidth / 2, this.canvasHeight / 2 - 325);
                let matches = []
                for (const [i, v] of Object.entries(this.shipStats)) {
                    if (SHIP_STAT_FORMATTING[i].showCondition()) matches.push(i);
                };
                for (let i = 0; i < matches.length; i++) {
                    let key = matches[i]
                    let statMul = this.shipStats[key]
                    if (key == "healthRegen") statMul *= 60;
                    
                    this.ctx.save();
                    this.ctx.globalAlpha = 1;
                    this.ctx.fillStyle = player.ir.secondaryColor;
                    this.ctx.strokeStyle = player.ir.primaryColor;
                    this.ctx.lineWidth = 3;
                    this.ctx.beginPath();
                    this.ctx.roundRect(this.canvasWidth / 2 - 387.5, (this.canvasHeight / 2 - 278) + i * 61, 775, 50, 10);
                    this.ctx.fill();
                    this.ctx.stroke();

                    this.ctx.font = "bold 24px monospace";
                    this.ctx.fillStyle = "#fff";
                    this.ctx.textAlign = "left";
                    this.ctx.fillText(SHIP_STAT_FORMATTING[key].name, this.canvasWidth / 2 - 375, (this.canvasHeight / 2 - 243) + i * 61, 775);

                    this.ctx.font = "bold 24px monospace";
                    this.ctx.fillStyle = "#fff";
                    this.ctx.textAlign = "right";
                    this.ctx.fillText(SHIP_STAT_FORMATTING[key].valuePrefix + formatSimple(statMul, 2) + SHIP_STAT_FORMATTING[key].valueSuffix, this.canvasWidth / 2 + 375, (this.canvasHeight / 2 - 243) + i * 61, 750);
                    
                    this.ctx.restore();
                }
            }

            this.ctx.restore();
            */
        }
        this.arenaDiv.style.filter = player.ir.menu != 0 ? "blur(4px)" : ""

        this.ctx.scale(1/this.UIScale, 1/this.UIScale)
    }

    showUpgradeChoice() {
        this.ship._laserActive = false
        player.ir.menu = 1;
        this.upgradeChoices = pickUpgrades();
        this.salvagedUpgradeChoices = pickSalvagedUpgrades();
        this.selectedUpgradeIndex = null;
        this.pauseEvents();
    }

    pauseEvents() {
        this.running = false;
    }

    resumeEvents() {
        this.running = true;
        if (!this.loop) {
            this.loop = setInterval(() => this.update(), 1000 / 60);
        }
    }

    onShipDeath() {
        if (arena) {
            arena.removeArena();
            arena = null;
        }
        player.ir.battleLevel = new Decimal(1);
        player.ir.battleXP = new Decimal(0);
        if (arena) arena.shipStats = arena.getDefaultShipStatMults();
        if (player.tab == "ir") player.subtabs["ir"]['stuff'] = "Lose";
        if (player.tab == "bl") player.subtabs["bl"]['stuff'] = "Lose";
        if (player.tab == "cbs") player.subtabs["cbs"]['stuff'] = "Lose";
        localStorage.setItem('arenaActive', 'false');
    }
}

function pauseAsteroidMinigame() {
    if (!arena) return;
    if (typeof arena.pauseAsteroidMinigame === 'function') arena.pauseAsteroidMinigame();
}
window.pauseAsteroidMinigame = pauseAsteroidMinigame;

function resumeAsteroidMinigame() {
    if (!arena) return;
    if (typeof arena.resumeAsteroidMinigame === 'function') arena.resumeAsteroidMinigame();
}
window.resumeAsteroidMinigame = resumeAsteroidMinigame;

