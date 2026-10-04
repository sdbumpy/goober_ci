let TWIG_SKILLS = {
    treeFeller: {
        title: "Tree Feller",
        description: "Next click deals 5s of damage to trees in a 3x3 area",
        baseCooldownMax: new Decimal(30),
        activeDuration: new Decimal(30),
    },
    sharperBlade: {
        title: "Sharper Blade",
        description: "Triples tree damage for 10s",
        baseCooldownMax: new Decimal(60),
        activeDuration: new Decimal(10),
    },
    flyingAxe: {
        title: "Flying Axe",
        description: "Makes hovering deal tree damage for 10s",
        baseCooldownMax: new Decimal(30),
        activeDuration: new Decimal(10),
    },
    chlorokinesis: {
        title: "Chlorokinesis",
        description: "Boosts tree growth speed by x10 for 20s",
        baseCooldownMax: new Decimal(180),
        activeDuration: new Decimal(20),
    },
}

addLayer("tw", {
    name: "Twigs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TW", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "UB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        twigs: new Decimal(0),
        twigsGain: new Decimal(1),
        twigsTimer: new Decimal(0),
        twigsReq: new Decimal(10),
        twigsMin: new Decimal(1),
        twigsCap: new Decimal(3),
        twigsDmg: new Decimal(1),

        treesBroken: new Decimal(0),

        equippedSkillLimit: 1,
        equippedSkills: [
        ],
        activeSkills: [
        ],
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #AF7743, #BF9166)",
            borderColor: "#634529"
        }
    },
    tooltip: "Twigs",
    color: "#BF9166",
    branches: ["n"],
    update(delta) {
        let onepersec = new Decimal(1)

        // TWIG SKILLS

        player.tw.equippedSkillLimit = 1
        if (hasMilestone("n", 27)) player.tw.equippedSkillLimit++;
        player.tw.activeSkills = []

        for (let i = 0; i < player.tw.equippedSkills.length; i++) {
            let skill = player.tw.equippedSkills[i]
            skill[1].cooldown = new Decimal(skill[1].cooldown)

            if (TWIG_SKILLS[skill[0]].activeDuration.sub(TWIG_SKILLS[skill[0]].baseCooldownMax.sub(skill[1].cooldown)).lte(0)) skill[1].active = false;

            if (skill[1].cooldown.gt(0)) skill[1].cooldown = skill[1].cooldown.sub(new Decimal(delta).div(player.uni.UB.tickspeed)).max(0);

            if (skill[1].active) player.tw.activeSkills.push(skill[0]);
        }

        // TWIG GAIN
        player.tw.twigsGain = new Decimal(1)
        player.tw.twigsGain = player.tw.twigsGain.add(buyableEffect("tw", 11).sub(1))
        player.tw.twigsGain = player.tw.twigsGain.mul(buyableEffect("tw", 31))
        player.tw.twigsGain = player.tw.twigsGain.mul(buyableEffect("tw", 42))
        player.tw.twigsGain = player.tw.twigsGain.mul(buyableEffect("tw", 71))
        if (hasMilestone("n", 24)) player.tw.twigsGain = player.tw.twigsGain.mul(player.n.milestone24Effect)
        player.tw.twigsGain = player.tw.twigsGain.mul(levelableEffect("pet", 407)[1])

        if (getBuyableAmount("tw", 51).gt(0)) player.tw.twigs = player.tw.twigs.add(player.tw.twigsGain.mul(buyableEffect("tw", 51).sub(1)).mul(delta))

        player.tw.twigsDmg = new Decimal(1)
        player.tw.twigsDmg = player.tw.twigsDmg.mul(buyableEffect("tw", 21))
        player.tw.twigsDmg = player.tw.twigsDmg.mul(buyableEffect("tw", 72))
        if (player.tw.activeSkills.indexOf("sharperBlade") > -1) player.tw.twigsDmg = player.tw.twigsDmg.mul(3);

        // TWIG DESTRUCTION
        for (let i = 101; i < 509; ) {
            if (player.tw.grid[i][0] > 0 && player.tw.grid[i][2].lte(0)) {
                let tier = player.tw.grid[i][1]
                setGridData("tw", i, [0, new Decimal(1), new Decimal(1)])
                player.tw.twigs = player.tw.twigs.add(Decimal.pow(2, tier.sub(1)).mul(player.tw.twigsGain))
                player.tw.treesBroken = player.tw.treesBroken.add(1)
            }

            // Increase i value
            if (i % 10 == 8) {
                i = i+93
            } else {
                i++
            }
        }

        player.tw.twigsReq = new Decimal(10)
        player.tw.twigsReq = player.tw.twigsReq.div(buyableEffect("tw", 52))
        if (hasMilestone("n", 21)) player.tw.twigsReq = player.tw.twigsReq.div(player.n.milestone21Effect)

        player.tw.twigsMin = new Decimal(1)
        player.tw.twigsMin = player.tw.twigsMin.add(buyableEffect("tw", 61).sub(1))
        player.tw.twigsMin = player.tw.twigsMin.add(buyableEffect("tw", 73).sub(1))

        player.tw.twigsCap = new Decimal(3)
        player.tw.twigsCap = player.tw.twigsCap.add(buyableEffect("tw", 41).sub(1))
        player.tw.twigsCap = player.tw.twigsCap.add(buyableEffect("tw", 73).sub(1))

        let timeSpeed = new Decimal(1)
        if (player.tw.activeSkills.indexOf("chlorokinesis") > -1) timeSpeed = timeSpeed.mul(10);
        if (hasUpgrade("n", 12)) player.tw.twigsTimer = player.tw.twigsTimer.sub(timeSpeed.mul(delta))
        if (player.tw.twigsTimer.lt(0)) {
            player.tw.twigsTimer = player.tw.twigsReq
            let row = getRandomInt(5) + 1
            let column = getRandomInt(8) + 1
            let val = row + "0" + column
            if (getGridData("tw", val)[0] == 0) {
                setGridData("tw", val, [1, player.tw.twigsMin, Decimal.pow(1.5, player.tw.twigsMin.sub(1)).mul(2)])
            } else if (getGridData("tw", val)[0] == 1 && Decimal.lt(getGridData("tw", val)[1], player.tw.twigsCap)) {
                setGridData("tw", val, [1, Decimal.add(getGridData("tw", val)[1], 1), Decimal.mul(getGridData("tw", val)[2], 1.5)])
            }
        }
    },
    grid: {
        rows: 5,
        cols: 8,
        getStartData(id) {
            return [0, new Decimal(0), new Decimal(1)] // Type / Tier / Health
        },
        getTitle(data, id) {
            switch (getGridData("tw", id)[0]) {
                case 0:
                    return ""
                case 1:
                    let tier = getGridData("tw", id)[1]
                    let color = "#634529"
                    switch (tier.toNumber()) {
                        case 1:
                            color = "#634529"
                            break;
                        case 2:
                            color = "#755231"
                            break;
                        case 3:
                            color = "#875e38"
                            break;
                        case 4:
                            color = "#996b40"
                            break;
                        case 5:
                            color = "#ab7747"
                            break;
                        case 6:
                            color = "#b78454"
                            break;
                        case 7:
                            color = "#bf9166"
                            break;
                        case 8:
                            color = "#c79e78"
                            break;
                        case 9:
                            color = "#ceab8a"
                            break;
                        case 10:
                            color = "#d6b89c"
                            break;
                    }
                    return "<div class='twigContainer' style='background:" + color + ";'>x" + formatWhole(Decimal.pow(2, tier.sub(1))) + "</div>"
                default:
                    return ""
            }
        },
        getCanClick(data, id) {return true},
        onClick(data, id) { 
            setGridData("tw", id, [getGridData("tw", id)[0], getGridData("tw", id)[1], getGridData("tw", id)[2].sub(Decimal.mul(0.1, player.tw.twigsDmg))])
            if (player.tw.activeSkills.indexOf("treeFeller") > -1) {
                setGridData("tw", id, [getGridData("tw", id)[0], getGridData("tw", id)[1], getGridData("tw", id)[2].sub(Decimal.mul(10, player.tw.twigsDmg))])
                let grid = [
                    id - 101,
                    id - 100,
                    id - 99,
                    id - 1,
                    id + 1,
                    id + 99,
                    id + 100,
                    id + 101,
                ]
                for (let i in grid) {
                    if (grid[i] % 100 < 9 && grid[i] % 100 != 0 && grid[i] < 509 && grid[i] > 100) setGridData("tw", grid[i], [getGridData("tw", grid[i])[0], getGridData("tw", grid[i])[1], getGridData("tw", grid[i])[2].sub(Decimal.mul(10, player.tw.twigsDmg))])
                }
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    let skill = player.tw.equippedSkills[i]
                    if (skill[0] == "treeFeller") skill[1].active = false;
                }
                player.tw.activeSkills.splice(player.tw.activeSkills.indexOf("treeFeller"), 1)
            }
        },
        onHold(data, id) {
            setGridData("tw", id, [getGridData("tw", id)[0], getGridData("tw", id)[1], getGridData("tw", id)[2].sub(Decimal.mul(0.1, player.tw.twigsDmg))])
        },
        onHover(data, id) {
            if (player.tw.activeSkills.indexOf("flyingAxe") > -1) setGridData("tw", id, [getGridData("tw", id)[0], getGridData("tw", id)[1], getGridData("tw", id)[2].sub(Decimal.mul(0.2, player.tw.twigsDmg))])
        },
        getStyle(data, id) {
            let look = {width: "80px", height: "80px", lineHeight: "0.8", color: "black", backgroundColor: "#074317", border: "0", borderRadius: "0", padding: "0", margin: "0", cursor: "default", transform: "scale(1, 1)", boxShadow: "0 0 0 #000"}
            switch (getGridData("tw", id)[0]) {
                case 0:
                    look.background = "#074317"
                    look.border = "5px solid rgba(0,0,0,0.3)"
                    break;
                case 1:
                    let req = Decimal.pow(1.5, player.tw.grid[id][1].sub(1)).mul(2)
                    look.background = `linear-gradient(to left, #000 ${format(player.tw.grid[id][2].div(req).mul(100).min(100))}%, #b00 ${format(player.tw.grid[id][2].div(req).mul(100).add(0.25).min(100))}%)`
                    break;
            }
            return look
        }
    },
    bars: {
        twigs: {
            unlocked: true,
            direction: RIGHT,
            width: 640,
            height: 20,
            progress() {
                if (player.tw.twigsReq.lte(0.25)) return new Decimal(1)
                return player.tw.twigsTimer.div(player.tw.twigsReq)
            },
            baseStyle: {backgroundColor: "black"},
            fillStyle: {backgroundColor: "#AF7743"},
            borderStyle: {
                border: "0px",
                borderRadius: "0",
            },
            display() {
                if (player.tw.twigsReq.lte(0.25)) return "<small style='color:red'>TIMER HARDCAPPED</small>"
                return formatTime(player.tw.twigsTimer) + "/" + formatTime(player.tw.twigsReq)
            },
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(5) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(245) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return Decimal.sumArithmeticSeries(getBuyableAmount(this.layer, this.id), 0.2, buyableEffect("tw", 62).sub(1), 0).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) },
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>More Bark</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase base twig gain<br>" + // MIDDLE
                "Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect.sub(1)) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: +" + formatSimple(Decimal.sumArithmeticSeries(getBuyableAmount(this.layer, this.id).add(1).min(245), 0.2, buyableEffect("tw", 62).sub(1), 0))) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px"}
                return look
            },
        },
        12: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 22).gt(0)},
            branches: [22],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Powerful Picking</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase picking power<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(getBuyableAmount(this.layer, this.id).add(1).min(5).div(5).add(1))) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginRight: "25px"}
                return look
            },
        },
        13: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return player.n.nest.add(1).log(10).mul(getBuyableAmount(this.layer, this.id)).add(getBuyableAmount(this.layer, this.id)).add(1).floor()},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 23).gt(0)},
            branches: [23],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nested Seeds</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase golden seeds based on nests<br>" + // MIDDLE
                "Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.sub(1)) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: +" + formatWhole(player.n.nest.add(1).log(10).mul(getBuyableAmount(this.layer, this.id).add(1).min(5)).add(getBuyableAmount(this.layer, this.id).add(1).min(5)).floor())) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginLeft: "25px"}
                return look
            },
        },
        14: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return player.tw.twigs.add(1).log(10).div(50).mul(getBuyableAmount(this.layer, this.id)).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 13).gt(0) && getBuyableAmount("tw", 24).gt(0)},
            branches: [13, 24],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>True Purpose</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase nests based on twigs<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(player.tw.twigs.add(1).log(10).div(50).mul(getBuyableAmount(this.layer, this.id).add(1).min(10)).add(1), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginLeft: "25px"}
                return look
            },
        },
        21: {
            costBase() { return new Decimal(10) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 11).gt(0)},
            branches: [11],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>T1 Woodcutting</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase tree damage<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(getBuyableAmount(this.layer, this.id).add(1).min(10).div(5).add(1))) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px"}
                return look
            },
        },
        22: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.1, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 21).gt(0)},
            branches: [21],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>More Mulch</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase flower gain<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(Decimal.pow(1.1, getBuyableAmount(this.layer, this.id).add(1).min(50)), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginRight: "25px"}
                return look
            },
        },
        23: {
            costBase() { return new Decimal(20) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return player.tw.twigs.add(1).log(10).div(10).add(1).pow(getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 21).gt(0)},
            branches: [21],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Buzzy Synergy</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase bee gain based on twigs<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(player.tw.twigs.add(1).log(10).div(10).add(1).pow(getBuyableAmount(this.layer, this.id).add(1).min(10)), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginLeft: "25px"}
                return look
            },
        },
        24: {
            costBase() { return new Decimal(60) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return player.tw.treesBroken.add(1).log(10).div(20).mul(getBuyableAmount(this.layer, this.id)).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 23).gt(0)},
            branches: [23],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Flower Clearing</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Reduce flower cooldowns based on trees chopped<br>" + // MIDDLE
                "Currently: /" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: /" + formatSimple(player.tw.treesBroken.add(1).log(10).div(20).mul(getBuyableAmount(this.layer, this.id).add(1).min(5)).add(1), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "13px", lineHeight: "1", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginLeft: "25px"}
                return look
            },
        },
        31: {
            costBase() { return new Decimal(25) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return player.t.trees.add(1).log("1e1000000").div(25).add(1).pow(getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 21).gt(0)},
            branches: [21],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Trees are Trees</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase twig gain based on trees<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(player.t.trees.add(1).log("1e1000000").div(25).add(1).pow(getBuyableAmount(this.layer, this.id).add(1).min(10)), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px"}
                return look
            },
        },
        32: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(50).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 22).gt(0)},
            branches: [22],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Finest Framing</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase glossary base effect<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(getBuyableAmount(this.layer, this.id).add(1).min(5).div(50).add(1), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginRight: "25px"}
                return look
            },
        },
        33: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.5, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 31).gt(0)},
            branches: [31],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Dustier Pollen</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase pollen gain<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(Decimal.pow(1.5, getBuyableAmount(this.layer, this.id).add(1).min(25)), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginLeft: "25px"}
                return look
            },
        },
        34: {
            costBase() { return new Decimal(40) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.2, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 33).gt(0)},
            branches: [33],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Sweeter Nectar</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase nectar gain<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(Decimal.pow(1.2, getBuyableAmount(this.layer, this.id).add(1).min(25)), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginLeft: "25px"}
                return look
            },
        },
        41: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 31).gt(0)},
            branches: [31],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Thicker Logs</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase max tree mult<br>" + // MIDDLE
                "Currently: x" + formatWhole(Decimal.pow(2, tmp[this.layer].buyables[this.id].effect.sub(1))) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatWhole(Decimal.pow(2, getBuyableAmount(this.layer, this.id).add(1).min(5)))) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginRight: "25px"}
                return look
            },
        },
        42: {
            costBase() { return new Decimal(75) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return player.tw.twigs.add(1).log(10).div(20).add(1).pow(getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 31).gt(0)},
            branches: [31],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Branching Branches</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase twig gain based on twigs<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(player.tw.twigs.add(1).log(10).div(20).add(1).pow(getBuyableAmount(this.layer, this.id).add(1).min(10)), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px"}
                return look
            },
        },
        43: {
            costBase() { return new Decimal(120) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.2, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 33).gt(0)},
            branches: [33],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Tastier Bee Bread</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase bee bread gain<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(Decimal.pow(1.2, getBuyableAmount(this.layer, this.id).add(1).min(25)), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginLeft: "25px"}
                return look
            },
        },
        44: {
            costBase() { return new Decimal(120) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.2, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 34).gt(0)},
            branches: [34],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Stickier Honey</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase honey-cell gain<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(Decimal.pow(1.2, getBuyableAmount(this.layer, this.id).add(1).min(25)), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginLeft: "25px"}
                return look
            },
        },
        51: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).div(player.tw.twigsReq).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 52).gt(0)},
            branches: [52],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Brush Collectors</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Passively gain twigs based on tree cooldown<br>" + // MIDDLE
                "Currently: +" + formatSimple(tmp[this.layer].buyables[this.id].effect.sub(1).mul(100), 2) + "%/s" +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: +" + formatSimple(getBuyableAmount(this.layer, this.id).add(1).min(10).div(player.tw.twigsReq), 2) + "%/s") +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "13px", lineHeight: "1", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginRight: "25px"}
                return look
            },
        },
        52: {
            costBase() { return new Decimal(250) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 42).gt(0)},
            branches: [42],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Improved Soil</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Reduce tree cooldown<br>" + // MIDDLE
                "Currently: /" + formatSimple(tmp[this.layer].buyables[this.id].effect) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: /" + formatSimple(getBuyableAmount(this.layer, this.id).add(1).min(5).div(10).add(1))) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px"}
                return look
            },
        },
        53: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() {
                if (getBuyableAmount("n", 51).gte(3)) return new Decimal(10)
                return new Decimal(9)
            },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 43).gt(0)},
            branches: [43],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Protected Pollen</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Keep pollen path automation upgrades on nest resets<br>" + // MIDDLE
                "Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.sub(1)) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: +" + formatWhole(getBuyableAmount(this.layer, this.id).add(1).min(this.purchaseLimit()))) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "13px", lineHeight: "1", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginLeft: "25px"}
                return look
            },
        },
        54: {
            costBase() { return new Decimal(500) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() {
                if (getBuyableAmount("n", 51).gte(3)) return new Decimal(10)
                return new Decimal(9)
            },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 44).gt(0)},
            branches: [44],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nurtured Nectar</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Keep nectar path automation upgrades on nest resets<br>" + // MIDDLE
                "Currently: +" + formatWhole(tmp[this.layer].buyables[this.id].effect.sub(1)) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: +" + formatWhole(getBuyableAmount(this.layer, this.id).add(1).min(this.purchaseLimit()))) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "13px", lineHeight: "1", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginLeft: "25px"}
                return look
            },
        },
        61: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 62).gt(0)},
            branches: [62],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Super Saplings</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase min tree mult<br>" + // MIDDLE
                "Currently: x" + formatSimple(Decimal.pow(2, tmp[this.layer].buyables[this.id].effect.sub(1))) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(Decimal.pow(2, getBuyableAmount(this.layer, this.id).add(1).min(5)))) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginRight: "25px"}
                return look
            },
        },
        62: {
            costBase() { return new Decimal(2500) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(100).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 52).gt(0)},
            branches: [52],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Denser Bark</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Improve \"More Bark\" based on purchases<br>" + // MIDDLE
                "Currently: +" + formatShortSimple(tmp[this.layer].buyables[this.id].effect.sub(1), 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: +" + formatShortSimple(getBuyableAmount(this.layer, this.id).add(1).min(10).div(100), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginRight: "25px"}
                return look
            },
        },
        63: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.5, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 53).gt(0)},
            branches: [53],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Stronger Workers</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase pre-aleph resource gain<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(Decimal.pow(1.5, getBuyableAmount(this.layer, this.id).add(1).min(10)), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginRight: "25px"}
                return look
            },
        },
        64: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(1.5, getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 54).gt(0)},
            branches: [54],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Purer Resources</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase aleph resource gain<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(Decimal.pow(1.5, getBuyableAmount(this.layer, this.id).add(1).min(10)), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px"}
                return look
            },
        },
        71: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(player.tw.treesBroken.add(1).log(2).div(50).add(1), getBuyableAmount(this.layer, this.id))},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 72).gt(0)},
            branches: [72],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Root Branches</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase twig gain based on trees chopped<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect, 2) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(Decimal.pow(player.tw.treesBroken.add(1).log(2).div(50).add(1), getBuyableAmount(this.layer, this.id).add(1).min(25)), 2)) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "13px", lineHeight: "1", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginRight: "25px"}
                return look
            },
        },
        72: {
            costBase() { return new Decimal(50000) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(5).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 62).gt(0)},
            branches: [62],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>T2 Woodcutting</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase tree damage<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(getBuyableAmount(this.layer, this.id).add(1).min(10).div(5).add(1))) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginRight: "25px"}
                return look
            },
        },
        73: {
            costBase() { return new Decimal(250000) },
            costGrowth() { return new Decimal(1) },
            purchaseLimit() { return new Decimal(1) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 72).gt(0)},
            branches: [72],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Tree Mutation</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase min and max tree mult<br>" + // MIDDLE
                "Currently: x" + formatSimple(Decimal.pow(2, tmp[this.layer].buyables[this.id].effect.sub(1))) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(Decimal.pow(2, getBuyableAmount(this.layer, this.id).add(1).min(1)))) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px", marginRight: "25px"}
                return look
            },
        },
        74: {
            costBase() { return new Decimal(1e6) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.tw.twigs },
            pay(amt) { player.tw.twigs = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).div(10).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).mul(10).floor().div(10) },
            canAfford() { return this.currency().gte(this.cost()) && getBuyableAmount("tw", 63).gt(0) && getBuyableAmount("tw", 64).gt(0)},
            branches: [63, 64],
            display() {
                return "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3>Nurtured Nests</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:69px;display:flex;align-items:center'><div>" + 
                "Increase nest gain<br>" + // MIDDLE
                "Currently: x" + formatSimple(tmp[this.layer].buyables[this.id].effect) +
                (player[this.layer].buyables[this.id].eq(tmp[this.layer].buyables[this.id].purchaseLimit) ? "" : "<br>Next: x" + formatSimple(getBuyableAmount(this.layer, this.id).add(1).div(10).add(1))) +
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                formatSimple(tmp[this.layer].buyables[this.id].cost) + " Twigs" + // BOTTOM
                "</div></div>"
            },
            buy() {
                this.pay(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style() {
                let look = {color: "#000000bf", borderColor: "#0000007f", fontSize: "14px", borderWidth: "2px", borderRadius: "10px", padding: "0px", width: "175px", height: "125px"}
                return look
            },
        },
        // Twig per second buff based on min/max mult
    },
    clickables: {
        // Activate Skills
        "activateSkill1": {
            title() {
                let skill = player.tw.equippedSkills[0]
                if (!skill) return "";
                let text = "<h3>" + (skill[1].active ? "Active (" + formatSimpleTime(TWIG_SKILLS[skill[0]].activeDuration.sub(TWIG_SKILLS[skill[0]].baseCooldownMax.sub(skill[1].cooldown))) + ")" : "Activate Skill") + "</h3>"
                if (new Decimal(skill[1].cooldown).gt(0)) text += "<br>[On Cooldown: " + formatSimpleTime(new Decimal(skill[1].cooldown)) + "]";
                return text
            },
            canClick() {
                let skill = player.tw.equippedSkills[0]
                if (!skill) return false;
                return new Decimal(skill[1].cooldown).lte(0);
            },
            unlocked() { return true },
            onClick() {
                let skill = player.tw.equippedSkills[0]
                if (!skill) return;
                skill[1].cooldown = TWIG_SKILLS[skill[0]].baseCooldownMax
                skill[1].active = true
            },
            style() {
                let look = {width: "210px", minHeight: "60px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.background = tmp[this.layer].clickables[this.id].canClick ? "#d6b89c" : "#bf8f8f"
                return look
            },
        },
        "activateSkill2": {
            title() {
                let skill = player.tw.equippedSkills[1]
                if (!skill) return "";
                let text = "<h3>" + (skill[1].active ? "Active (" + formatSimpleTime(TWIG_SKILLS[skill[0]].activeDuration.sub(TWIG_SKILLS[skill[0]].baseCooldownMax.sub(skill[1].cooldown))) + ")" : "Activate Skill") + "</h3>"
                if (new Decimal(skill[1].cooldown).gt(0)) text += "<br>[On Cooldown: " + formatSimpleTime(new Decimal(skill[1].cooldown)) + "]";
                return text
            },
            canClick() {
                let skill = player.tw.equippedSkills[1]
                if (!skill) return false;
                return new Decimal(skill[1].cooldown).lte(0);
            },
            unlocked() { return true },
            onClick() {
                let skill = player.tw.equippedSkills[1]
                if (!skill) return;
                skill[1].cooldown = TWIG_SKILLS[skill[0]].baseCooldownMax
                skill[1].active = true
            },
            style() {
                let look = {width: "210px", minHeight: "60px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.background = tmp[this.layer].clickables[this.id].canClick ? "#d6b89c" : "#bf8f8f"
                return look
            },
        },
        "activateSkill3": {
            title() {
                let skill = player.tw.equippedSkills[2]
                if (!skill) return "";
                let text = "<h3>" + (skill[1].active ? "Active (" + formatSimpleTime(TWIG_SKILLS[skill[0]].activeDuration.sub(TWIG_SKILLS[skill[0]].baseCooldownMax.sub(skill[1].cooldown))) + ")" : "Activate Skill") + "</h3>"
                if (new Decimal(skill[1].cooldown).gt(0)) text += "<br>[On Cooldown: " + formatSimpleTime(new Decimal(skill[1].cooldown)) + "]";
                return text
            },
            canClick() {
                let skill = player.tw.equippedSkills[2]
                if (!skill) return false;
                return new Decimal(skill[1].cooldown).lte(0);
            },
            unlocked() { return true },
            onClick() {
                let skill = player.tw.equippedSkills[2]
                if (!skill) return;
                skill[1].cooldown = TWIG_SKILLS[skill[0]].baseCooldownMax
                skill[1].active = true
            },
            style() {
                let look = {width: "210px", minHeight: "60px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                look.background = tmp[this.layer].clickables[this.id].canClick ? "#d6b89c" : "#bf8f8f"
                return look
            },
        },

        // Select Skills
        "selectSkill_treeFeller": {
            title() {
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "treeFeller") return "<h3>Deselect Skill</h3>" + (new Decimal(player.tw.equippedSkills[i][1].cooldown).gt(0) ? "<br>[On Cooldown: " + formatSimpleTime(new Decimal(player.tw.equippedSkills[i][1].cooldown)) + "]" : "");
                }
                return "<h3>Select Skill</h3>"
            },
            canClick() {
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "treeFeller") return new Decimal(player.tw.equippedSkills[i][1].cooldown).lte(0);
                }
                if (player.tw.equippedSkills.length >= player.tw.equippedSkillLimit) return false;
                return true
            },
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "treeFeller") {
                        player.tw.equippedSkills.splice(i, 1)
                        return
                    }
                }
                if (player.tw.equippedSkills.length < player.tw.equippedSkillLimit) {
                    player.tw.equippedSkills.push([
                        "treeFeller", {
                            cooldown: TWIG_SKILLS.treeFeller.baseCooldownMax,
                            cooldownMax: TWIG_SKILLS.treeFeller.baseCooldownMax,
                        }
                    ])
                }
            },
            style() {
                let look = {width: "210px", minHeight: "60px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                let background = "#bf8f8f"
                if (tmp[this.layer].clickables[this.id].canClick) background = "#BF9166";
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "treeFeller" && new Decimal(player.tw.equippedSkills[i][1].cooldown).lte(0)) background = "#d6b89c";
                }
                look.background = background
                return look
            },
        },
        "selectSkill_sharperBlade": {
            title() {
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "sharperBlade") return "<h3>Deselect Skill</h3>" + (new Decimal(player.tw.equippedSkills[i][1].cooldown).gt(0) ? "<br>[On Cooldown: " + formatSimpleTime(new Decimal(player.tw.equippedSkills[i][1].cooldown)) + "]" : "");
                }
                return "<h3>Select Skill</h3>"
            },
            canClick() {
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "sharperBlade") return new Decimal(player.tw.equippedSkills[i][1].cooldown).lte(0);
                }
                if (player.tw.equippedSkills.length >= player.tw.equippedSkillLimit) return false;
                return true
            },
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "sharperBlade") {
                        player.tw.equippedSkills.splice(i, 1)
                        return
                    }
                }
                if (player.tw.equippedSkills.length < player.tw.equippedSkillLimit) {
                    player.tw.equippedSkills.push([
                        "sharperBlade", {
                            cooldown: TWIG_SKILLS.sharperBlade.baseCooldownMax,
                            cooldownMax: TWIG_SKILLS.sharperBlade.baseCooldownMax,
                        }
                    ])
                }
            },
            style() {
                let look = {width: "210px", minHeight: "60px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                let background = "#bf8f8f"
                if (tmp[this.layer].clickables[this.id].canClick) background = "#BF9166";
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "sharperBlade" && new Decimal(player.tw.equippedSkills[i][1].cooldown).lte(0)) background = "#d6b89c";
                }
                look.background = background
                return look
            },
        },
        "selectSkill_flyingAxe": {
            title() {
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "flyingAxe") return "<h3>Deselect Skill</h3>" + (new Decimal(player.tw.equippedSkills[i][1].cooldown).gt(0) ? "<br>[On Cooldown: " + formatSimpleTime(new Decimal(player.tw.equippedSkills[i][1].cooldown)) + "]" : "");
                }
                return "<h3>Select Skill</h3>"
            },
            canClick() {
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "flyingAxe") return new Decimal(player.tw.equippedSkills[i][1].cooldown).lte(0);
                }
                if (player.tw.equippedSkills.length >= player.tw.equippedSkillLimit) return false;
                return true
            },
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "flyingAxe") {
                        player.tw.equippedSkills.splice(i, 1)
                        return
                    }
                }
                if (player.tw.equippedSkills.length < player.tw.equippedSkillLimit) {
                    player.tw.equippedSkills.push([
                        "flyingAxe", {
                            cooldown: TWIG_SKILLS.flyingAxe.baseCooldownMax,
                            cooldownMax: TWIG_SKILLS.flyingAxe.baseCooldownMax,
                        }
                    ])
                }
            },
            style() {
                let look = {width: "210px", minHeight: "60px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                let background = "#bf8f8f"
                if (tmp[this.layer].clickables[this.id].canClick) background = "#BF9166";
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "flyingAxe" && new Decimal(player.tw.equippedSkills[i][1].cooldown).lte(0)) background = "#d6b89c";
                }
                look.background = background
                return look
            },
        },
        "selectSkill_chlorokinesis": {
            title() {
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "chlorokinesis") return "<h3>Deselect Skill</h3>" + (new Decimal(player.tw.equippedSkills[i][1].cooldown).gt(0) ? "<br>[On Cooldown: " + formatSimpleTime(new Decimal(player.tw.equippedSkills[i][1].cooldown)) + "]" : "");
                }
                return "<h3>Select Skill</h3>"
            },
            canClick() {
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "chlorokinesis") return new Decimal(player.tw.equippedSkills[i][1].cooldown).lte(0);
                }
                if (player.tw.equippedSkills.length >= player.tw.equippedSkillLimit) return false;
                return true
            },
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "chlorokinesis") {
                        player.tw.equippedSkills.splice(i, 1)
                        return
                    }
                }
                if (player.tw.equippedSkills.length < player.tw.equippedSkillLimit) {
                    player.tw.equippedSkills.push([
                        "chlorokinesis", {
                            cooldown: TWIG_SKILLS.chlorokinesis.baseCooldownMax,
                            cooldownMax: TWIG_SKILLS.chlorokinesis.baseCooldownMax,
                        }
                    ])
                }
            },
            style() {
                let look = {width: "210px", minHeight: "60px", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "0"}
                let background = "#bf8f8f"
                if (tmp[this.layer].clickables[this.id].canClick) background = "#BF9166";
                for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                    if (player.tw.equippedSkills[i][0] == "chlorokinesis" && new Decimal(player.tw.equippedSkills[i][1].cooldown).lte(0)) background = "#d6b89c";
                }
                look.background = background
                return look
            },
        },
    },
    microtabs: {
        stuff: {
            "Twigs": {
                buttonStyle: { borderRadius: "15px" },
                unlocked: true,
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["bar", "twigs"],
                        ["style-row", [], {width: "640px", height: "5px", background: "#3e3117"}],
                        "grid"
                    ], {width: "640px", border: "5px solid #3e3117"}],
                    ["style-row", [
                        ["style-row", [
                            ["raw-html", () => {return "Min Mult: x" + formatSimple(Decimal.pow(2, player.tw.twigsMin.sub(1)))}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "210px", height: "30px", borderRight: "5px solid #3e3117"}],
                        ["style-row", [
                            ["raw-html", "Hold to break trees", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "210px", height: "30px"}],
                        ["style-row", [
                            ["raw-html", () => {return "Max Mult: x" + formatSimple(Decimal.pow(2, player.tw.twigsCap.sub(1)))}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "210px", height: "30px", borderLeft: "5px solid #3e3117"}],
                    ], {width: "640px", height: "30px", background: "#2b2210", borderLeft: "5px solid #3e3117", borderRight: "5px solid #3e3117", borderBottom: "5px solid #3e3117"}],
                    
                    ["style-column", () => {
                        let container = []
                        for (let i = 0; i < player.tw.equippedSkills.length; i++) {
                            let skill = player.tw.equippedSkills[i]
                            container.push(

                                ["style-row", [
                                    ["style-row", [
                                        ["style-column", [
                                            ["raw-html", "<h2>" + TWIG_SKILLS[skill[0]].title + " </h2><span>[" + formatSimpleTime(TWIG_SKILLS[skill[0]].baseCooldownMax) + " Cooldown]", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                            ["raw-html", TWIG_SKILLS[skill[0]].description, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                        ], {width: "425px", height: "60px"}],
                                        ["style-row", [
                                            ["clickable", "activateSkill" + (i + 1)],
                                        ], {width: "210px", height: "60px", borderLeft: "5px solid #3e3117"}],
                                    ], {borderBottom: "5px solid #3e3117"}],
                                ], {width: "640px", background: "#2b2210", borderLeft: "5px solid #3e3117", borderRight: "5px solid #3e3117"}],
                            
                            )
                        }
                        return container
                    }, []],
                ],
            },
            "Skills": {
                buttonStyle: { borderRadius: "15px" },
                unlocked: true,
                content: [
                    // Equipped Skills
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-row", [
                            ["raw-html", () => {return "You have equipped " + formatSimple(player.tw.equippedSkills.length) + "/" + formatSimple(player.tw.equippedSkillLimit) + " skill" + (player.tw.equippedSkillLimit == 1 ? "" : "s") + "."}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "640px", height: "30px", background: "#2b2210", border: "5px solid #3e3117"}],
                    ]],

                    // Tree Feller
                    ["style-row", [
                        ["style-row", [
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", () => {return "<h2>" + TWIG_SKILLS.treeFeller.title + " </h2><span>[" + formatSimpleTime(TWIG_SKILLS.treeFeller.baseCooldownMax) + " Cooldown]"}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", () => {return TWIG_SKILLS.treeFeller.description}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                ], {width: "425px", height: "60px"}],
                                ["style-row", [
                                    ["clickable", "selectSkill_treeFeller"],
                                ], {width: "210px", height: "60px", borderLeft: "5px solid #3e3117"}],
                            ], {borderBottom: "5px solid #3e3117"}],
                        ], {width: "640px", background: "#2b2210", borderLeft: "5px solid #3e3117", borderRight: "5px solid #3e3117"}],
                    ], () => {return {display: true ? "" : "none !important"}}],
                    
                    // Sharper Blade
                    ["style-row", [
                        ["style-row", [
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", () => {return "<h2>" + TWIG_SKILLS.sharperBlade.title + " </h2><span>[" + formatSimpleTime(TWIG_SKILLS.sharperBlade.baseCooldownMax) + " Cooldown]"}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", () => {return TWIG_SKILLS.sharperBlade.description}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                ], {width: "425px", height: "60px"}],
                                ["style-row", [
                                    ["clickable", "selectSkill_sharperBlade"],
                                ], {width: "210px", height: "60px", borderLeft: "5px solid #3e3117"}],
                            ], {borderBottom: "5px solid #3e3117"}],
                        ], {width: "640px", background: "#2b2210", borderLeft: "5px solid #3e3117", borderRight: "5px solid #3e3117"}],
                    ], () => {return {display: true ? "" : "none !important"}}],
                    
                    // Flying Axe
                    ["style-row", [
                        ["style-row", [
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", () => {return "<h2>" + TWIG_SKILLS.flyingAxe.title + " </h2><span>[" + formatSimpleTime(TWIG_SKILLS.flyingAxe.baseCooldownMax) + " Cooldown]"}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", () => {return TWIG_SKILLS.flyingAxe.description}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                ], {width: "425px", height: "60px"}],
                                ["style-row", [
                                    ["clickable", "selectSkill_flyingAxe"],
                                ], {width: "210px", height: "60px", borderLeft: "5px solid #3e3117"}],
                            ], {borderBottom: "5px solid #3e3117"}],
                        ], {width: "640px", background: "#2b2210", borderLeft: "5px solid #3e3117", borderRight: "5px solid #3e3117"}],
                    ], () => {return {display: true ? "" : "none !important"}}],
                    
                    // Chlorokinesis
                    ["style-row", [
                        ["style-row", [
                            ["style-row", [
                                ["style-column", [
                                    ["raw-html", () => {return "<h2>" + TWIG_SKILLS.chlorokinesis.title + " </h2><span>[" + formatSimpleTime(TWIG_SKILLS.chlorokinesis.baseCooldownMax) + " Cooldown]"}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", () => {return TWIG_SKILLS.chlorokinesis.description}, {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                ], {width: "425px", height: "60px"}],
                                ["style-row", [
                                    ["clickable", "selectSkill_chlorokinesis"],
                                ], {width: "210px", height: "60px", borderLeft: "5px solid #3e3117"}],
                            ], {borderBottom: "5px solid #3e3117"}],
                        ], {width: "640px", background: "#2b2210", borderLeft: "5px solid #3e3117", borderRight: "5px solid #3e3117"}],
                    ], () => {return {display: true ? "" : "none !important"}}],

                ],
            },
            "Upgrades": {
                buttonStyle: { borderRadius: "15px" },
                unlocked: true,
                content: [
                    ["blank", "25px"],
                    ["row", [["buyable", 12], ["buyable", 11], ["buyable", 13], ["buyable", 14]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 22], ["buyable", 21], ["buyable", 23], ["buyable", 24]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 32], ["buyable", 31], ["buyable", 33], ["buyable", 34]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 41], ["buyable", 42], ["buyable", 43], ["buyable", 44]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 51], ["buyable", 52], ["buyable", 53], ["buyable", 54]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 61], ["buyable", 62], ["buyable", 63], ["buyable", 64]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 71], ["buyable", 72], ["buyable", 73], ["buyable", 74]]],
                ],
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have " + formatSimple(player.tw.twigs) + " twigs"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + formatSimple(player.tw.twigsGain) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
            ["raw-html", () => {return getBuyableAmount("tw", 51).gt(0) ? "[+" + formatSimple(player.tw.twigsGain.mul(buyableEffect("tw", 51).sub(1)), 2) + "/s]" : ""}, {color: "white", fontSize: "16px", fontFamily: "monospace", marginLeft: "8px"}],
        ]],
        ["blank", "10px"],
        ['microtabs', 'stuff', { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && hasUpgrade("n", 12)}
})