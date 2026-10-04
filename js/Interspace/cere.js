let getRingUpgradeTreeLeft = function(x) {
    return (-106.5 + 224 * x)
}
let getRingUpgradeTreeTop = function(x) {
    return (174 * x)
}
let createRingUpgradeConnection = function(xy1_b, xy2_b) {
    let xy1 = [getRingUpgradeTreeLeft(xy1_b[0]), getRingUpgradeTreeTop(xy1_b[1])]
    let xy2 = [getRingUpgradeTreeLeft(xy2_b[0]), getRingUpgradeTreeTop(xy2_b[1])]
    return ["style-row", [["style-row", [], {
        position: "relative",
            left: () => {return (106 + (xy1[0] + xy2[0]) / 2) + "px"},
            top: () => {return ((xy1[1] + xy2[1]) / 2) + "px"},
            transform: () => {return "rotate(" + Math.atan2(xy2[1] - xy1[1], xy2[0] - xy1[0]) + "rad)"},
            width: () => {return Math.hypot(xy2[1] - xy1[1], xy2[0] - xy1[0]) + "px"},
            height: "12px", background: "#ffdfef",
    }]], {width: "0", height: "0"}]
}
let createRingUpgrade = function(type, id, xy) {
    return ["style-column", [
        [type, id],
    ], {width: "0", height: "0", position: "relative", left: getRingUpgradeTreeLeft(xy[0]) + "px", top: getRingUpgradeTreeTop(xy[1]) + "px"}]
}

addLayer("cer", {
    name: "Cere",
    symbol: "⇕",
    universe: "UD",
    row: 4,
    position: 0,
    startData() { return {
        unlocked: true,

        rings: new Decimal(0),
        ringsToGet: new Decimal(0),

        lowestBlueshift: new Decimal(1e3),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#ff7fbf",
            background: "linear-gradient(90deg, #ffbfdf 0%, white 50%, #ffbfdf 100%)",
            "background-origin": "border-box",
            "border-color": "#ff7fbf",
        };
    },
    tooltip: "Cere, the Celestial of Cycles",
    color: "#ffdfef",
    update(delta) {
    },
    branches: ["bum"],
    clickables: {
        "enter": {
            title() { return "<h2>ENTER THE CYCLE.</h2><br>Req: 10 Starshine Project ↻<br>and 1e300 Light" },
            canClick() { return player.wel.light.gte("1e300")},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "350px", minHeight: "100px", borderRadius: "10px 10px 25px 25px", padding: "8px", margin: "6px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(0deg, #ffdfef 0%, #60bfbf 125%)"
                    look.border = "3px solid #b35986"
                    look.color = "#804060"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #b35986"
                    look.color = "white"
                }
                return look
            },
        },
    },
    bars: {},
    upgrades: {

        // ULTIMATES

        101: {
            fullDisplay() {
                return !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "<h3>???</h3><br><br>Req: 5 Cycle Resets" : "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            canAfford() {
                return tmp.cer.upgrades[this.id].condition
            },
            title: "Kugelblitz",
            description() { return "Unlock the 7th project."},
            currencyLocation() { return player.cer },
            currencyDisplayName: "Rings",
            currencyInternalName: "rings",
            cost: new Decimal(1e12),
            unlocked() { return true },
            condition() { return true },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#60bfbf", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                look.backgroundColor = !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "#000000" : hasUpgrade(this.layer, this.id) ? "#1a3b0f" : !this.currencyLocation()[this.currencyInternalName].gte(tmp.cer.upgrades[this.id].cost) ? "#361e1e" : "#204040"
                return look
            },
        },
        102: {
            fullDisplay() {
                return !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "<h3>???</h3><br><br>Req: 5 Cycle Resets" : "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            canAfford() {
                return tmp.cer.upgrades[this.id].condition
            },
            title: "Starlit Requiem",
            description() { return "Unlock the 6th project."},
            currencyLocation() { return player.cer },
            currencyDisplayName: "Rings",
            currencyInternalName: "rings",
            cost: new Decimal(1e6),
            unlocked() { return true },
            condition() { return true },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#60bfbf", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                look.backgroundColor = !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "#000000" : hasUpgrade(this.layer, this.id) ? "#1a3b0f" : !this.currencyLocation()[this.currencyInternalName].gte(tmp.cer.upgrades[this.id].cost) ? "#361e1e" : "#204040"
                return look
            },
        },
        103: {
            fullDisplay() {
                return !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "<h3>???</h3><br><br>Req: 5 Cycle Resets" : "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            canAfford() {
                return tmp.cer.upgrades[this.id].condition
            },
            title: "Rebirth",
            description() { return "Unlock the 8th project."},
            currencyLocation() { return player.cer },
            currencyDisplayName: "Rings",
            currencyInternalName: "rings",
            cost: new Decimal(1e18),
            unlocked() { return true },
            condition() { return true },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#60bfbf", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                look.backgroundColor = !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "#000000" : hasUpgrade(this.layer, this.id) ? "#1a3b0f" : !this.currencyLocation()[this.currencyInternalName].gte(tmp.cer.upgrades[this.id].cost) ? "#361e1e" : "#204040"
                return look
            },
        },
        104: {
            fullDisplay() {
                return !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "<h3>???</h3><br><br>Req: 5 Cycle Resets" : "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            canAfford() {
                return tmp.cer.upgrades[this.id].condition
            },
            title: "Destiny",
            description() { return "Build the technological pylon."},
            currencyLocation() { return player.cer },
            currencyDisplayName: "Rings",
            currencyInternalName: "rings",
            cost: new Decimal(1e4),
            unlocked() { return true },
            condition() { return true },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#60bfbf", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                look.backgroundColor = !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "#000000" : hasUpgrade(this.layer, this.id) ? "#1a3b0f" : !this.currencyLocation()[this.currencyInternalName].gte(tmp.cer.upgrades[this.id].cost) ? "#361e1e" : "#204040"
                return look
            },
        },

        // PATH OF LIGHT

        201: {
            fullDisplay() {
                return !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "<h3>???</h3><br><br>Req: 5 Cycle Resets" : "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            canAfford() {
                return tmp.cer.upgrades[this.id].condition
            },
            title: "Full Focus",
            description() { return "+2 focus cap."},
            currencyLocation() { return player.cer },
            currencyDisplayName: "Rings",
            currencyInternalName: "rings",
            cost: new Decimal(8),
            unlocked() { return true },
            condition() { return true },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#4d9973", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                look.backgroundColor = !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "#000000" : hasUpgrade(this.layer, this.id) ? "#1a3b0f" : !this.currencyLocation()[this.currencyInternalName].gte(tmp.cer.upgrades[this.id].cost) ? "#361e1e" : "#204040"
                return look
            },
        },
        202: {
            fullDisplay() {
                return !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "<h3>???</h3><br><br>Req: 5 Cycle Resets" : "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            canAfford() {
                return tmp.cer.upgrades[this.id].condition
            },
            title: "Routine",
            description() { return "Automate the focus cap buyable."},
            currencyLocation() { return player.cer },
            currencyDisplayName: "Rings",
            currencyInternalName: "rings",
            cost: new Decimal(24),
            unlocked() { return true },
            condition() { return true },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#4d9973", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                look.backgroundColor = !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "#000000" : hasUpgrade(this.layer, this.id) ? "#1a3b0f" : !this.currencyLocation()[this.currencyInternalName].gte(tmp.cer.upgrades[this.id].cost) ? "#361e1e" : "#204040"
                return look
            },
        },

        // PATH OF CYCLES

        401: {
            fullDisplay() {
                return !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "<h3>???</h3><br><br>Req: 5 Cycle Resets" : "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            canAfford() {
                return tmp.cer.upgrades[this.id].condition
            },
            title: "Teamwork",
            description() { return "+1 research cap."},
            currencyLocation() { return player.cer },
            currencyDisplayName: "Rings",
            currencyInternalName: "rings",
            cost: new Decimal(8),
            unlocked() { return true },
            condition() { return true },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#b35986", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                look.backgroundColor = !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "#000000" : hasUpgrade(this.layer, this.id) ? "#1a3b0f" : !this.currencyLocation()[this.currencyInternalName].gte(tmp.cer.upgrades[this.id].cost) ? "#361e1e" : "#204040"
                return look
            },
        },
        402: {
            fullDisplay() {
                return !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "<h3>???</h3><br><br>Req: 5 Cycle Resets" : "<div style='height:25px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + this.title + "</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:90px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            canAfford() {
                return tmp.cer.upgrades[this.id].condition
            },
            title: "In the Loop",//Α
            description() { return "Automate the first two blacklight fountains at x0.5 speed."},
            currencyLocation() { return player.cer },
            currencyDisplayName: "Rings",
            currencyInternalName: "rings",
            cost: new Decimal(24),
            unlocked() { return true },
            condition() { return true },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#b35986", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                hasUpgrade(this.layer, this.id) ? look.backgroundColor = "#1a3b0f" : !canAffordUpgrade(this.layer, this.id) ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#37078f"
                look.backgroundColor = !(tmp.cer.upgrades[this.id].condition || hasUpgrade(this.layer, this.id)) ? "#000000" : hasUpgrade(this.layer, this.id) ? "#1a3b0f" : !this.currencyLocation()[this.currencyInternalName].gte(tmp.cer.upgrades[this.id].cost) ? "#361e1e" : "#204040"
                return look
            },
        },
    },
    buyables: {
        101: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.1) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.cer.rings},
            pay(amt) { player.cer.rings = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return (tmp.cer.buyables[this.id].condition || getBuyableAmount(this.layer, this.id).gt(0)) && this.currency().gte(this.cost()) },
            condition() { return true },
            description() {
                return "Boosts light gain by +x0.5.<br>(x" + formatSimple(this.effect()) + ")"
            },
            currencyDisplayName: "Rings",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Reborn" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#60bfbf", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#204040"
                return look
            },
        },
        102: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cer.rings},
            pay(amt) { player.cer.rings = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow_base(1.25) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return (tmp.cer.buyables[this.id].condition || getBuyableAmount(this.layer, this.id).gt(0)) && this.currency().gte(this.cost()) },
            condition() { return true },
            description() {
                return "Boosts light well ↻ and prism well ↻ gain by x1.25.<br>(x" + formatSimple(this.effect(), 2) + ")"
            },
            currencyDisplayName: "Rings",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Path of Light" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#4d9973", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#204040"
                return look
            },
        },
        103: {
            costBase() { return new Decimal(16) },
            costGrowth() { return new Decimal(2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cer.rings},
            pay(amt) { player.cer.rings = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow_base(1.5) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return (tmp.cer.buyables[this.id].condition || getBuyableAmount(this.layer, this.id).gt(0)) && this.currency().gte(this.cost()) },
            condition() { return true },
            description() {
                return "Boosts blood gain by x1.5.<br>(x" + formatSimple(this.effect(), 2) + ")"
            },
            currencyDisplayName: "Rings",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Path of Dark" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#994d4d", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#204040"
                return look
            },
        },
        104: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cer.rings},
            pay(amt) { player.cer.rings = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return (tmp.cer.buyables[this.id].condition || getBuyableAmount(this.layer, this.id).gt(0)) && this.currency().gte(this.cost()) },
            condition() { return true },
            description() {
                return "Boosts blacklight gain by +x0.5.<br>(x" + formatSimple(this.effect()) + ")"
            },
            currencyDisplayName: "Rings",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Path of Cycles" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#b35986", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#204040"
                return look
            },
        },
        105: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.cer.rings},
            pay(amt) { player.cer.rings = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return (tmp.cer.buyables[this.id].condition || getBuyableAmount(this.layer, this.id).gt(0)) && this.currency().gte(this.cost()) },
            condition() { return true },
            description() {
                return "Boosts base steel gain by +^0.5.<br>(^" + formatSimple(this.effect()) + ")"
            },
            currencyDisplayName: "Rings",
            display() {
                return !(tmp.cer.buyables[this.id].condition || getBuyableAmount(this.layer, this.id).gt(0)) ? "<h3>???</h3><br><br>Req: e100,000 Steel" : "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "Path of Technology" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#999999", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                look.backgroundColor = !(tmp.cer.buyables[this.id].condition || getBuyableAmount(this.layer, this.id).gt(0)) ? "#000000" : getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? "#1a3b0f" : !this.canAfford() ? "#361e1e" : "#204040"
                return look
            },
        },
        201: {
            costBase() { return new Decimal(3) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.cer.rings},
            pay(amt) { player.cer.rings = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor() },
            canAfford() { return (tmp.cer.buyables[this.id].condition || getBuyableAmount(this.layer, this.id).gt(0)) && this.currency().gte(this.cost()) },
            condition() { return true },
            description() {
                return "Boosts light gain by +x0.5.<br>(x" + formatSimple(this.effect()) + ")"
            },
            currencyDisplayName: "Rings",
            display() {
                return "<div style='height:40px;display:flex;align-items:center'><div>" +
                "<h3 style='text-shadow:0 0 8px white'>" + "On and On" + "<br>(" + formatWhole(getBuyableAmount(this.layer, this.id)) + "/" + formatWhole(this.purchaseLimit()) + ")</h3>" + // TOP
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='padding-left:4px;padding-right:4px;height:75px;display:flex;align-items:center'><div>" + 
                this.description() + // MIDDLE
                "</div></div><div style='height:" + this.style().borderWidth + ";background-color:" + this.style().borderColor + "'></div><div style='height:25px;display:flex;align-items:center'><div>" + 
                "<span style='color: #bfffff;text-shadow:0 0 8px #bfffff'>" + formatWhole(this.cost()) + " " + this.currencyDisplayName + "</span>" // BOTTOM
                "</div></div>"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase()).floor()
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id)).floor()
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                let look = {borderRadius: "10px", color: "white", borderWidth: "3px", borderColor: "#4d9973", outline: "3px solid #ffdfef", width: "200px", maxHeight: "150px", minHeight: "150px", fontSize: "12px", margin: "6px", padding: "0"}
                getBuyableAmount(this.layer, this.id).gte(this.purchaseLimit()) ? look.backgroundColor = "#1a3b0f" : !this.canAfford() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "#204040"
                return look
            },
        },
    },
    milestones: {
        "antiBlueshift_40": {
            effectDescription() { return "Boost project speed by x1.25 per anti-blueshift milestone.<br>(x" + formatSimple(new Decimal(1), 2) + ")" },
            done() { return false },
            style() {
                let look = {width: "476px", minHeight: "75px", paddingLeft: "12px", paddingRight: "12px", color: "#ffffd1", margin: "3px", border: "0", borderRadius: "0 19px 19px 0"}
                if (hasMilestone("cer", this.id)) {look.backgroundColor = "#1a3b0f"; look.color = "#303080";} else {look.backgroundColor = "#ffffd13f"; look.color = "#ffffd1";}
                return look
            },
        },
        "antiBlueshift_36": {
            effectDescription() { return "Keep one of each floor 1 project ↻ on cycle per anti-blueshift milestone starting at this one.<br>(Keeping " + formatSimple(new Decimal(Math.min(10, Math.max(0, player.cer.milestones.length - 1)))) + " ↻)" },
            done() { return false },
            style() {
                let look = {width: "476px", minHeight: "75px", paddingLeft: "12px", paddingRight: "12px", color: "#ffffd1", margin: "3px", border: "0", borderRadius: "0 19px 19px 0"}
                if (hasMilestone("cer", this.id)) {look.backgroundColor = "#1a3b0f"; look.color = "#303080";} else {look.backgroundColor = "#ffffd13f"; look.color = "#ffffd1";}
                return look
            },
        },
        "antiBlueshift_32": {
            effectDescription() { return "Unlock focusing on starlight fountains." },
            done() { return false },
            style() {
                let look = {width: "476px", minHeight: "75px", paddingLeft: "12px", paddingRight: "12px", color: "#ffffd1", margin: "3px", border: "0", borderRadius: "0 19px 19px 0"}
                if (hasMilestone("cer", this.id)) {look.backgroundColor = "#1a3b0f"; look.color = "#303080";} else {look.backgroundColor = "#ffffd13f"; look.color = "#ffffd1";}
                return look
            },
        },
        "antiBlueshift_28": {
            effectDescription() { return "Unlock focusing on floor 1 projects" },
            done() { return false },
            style() {
                let look = {width: "476px", minHeight: "75px", paddingLeft: "12px", paddingRight: "12px", color: "#ffffd1", margin: "3px", border: "0", borderRadius: "0 19px 19px 0"}
                if (hasMilestone("cer", this.id)) {look.backgroundColor = "#1a3b0f"; look.color = "#303080";} else {look.backgroundColor = "#ffffd13f"; look.color = "#ffffd1";}
                return look
            },
        },
        "antiBlueshift_24": {
            effectDescription() { return "Retain focus on all resets." },
            done() { return false },
            style() {
                let look = {width: "476px", minHeight: "75px", paddingLeft: "12px", paddingRight: "12px", color: "#ffffd1", margin: "3px", border: "0", borderRadius: "0 19px 19px 0"}
                if (hasMilestone("cer", this.id)) {look.backgroundColor = "#1a3b0f"; look.color = "#303080";} else {look.backgroundColor = "#ffffd13f"; look.color = "#ffffd1";}
                return look
            },
        },
        "antiBlueshift_20": {
            effectDescription() { return "Boost haste by x1.25 per anti-blueshift milestone starting at this one.<br>(x" + formatSimple(new Decimal(1), 2) + ")" },
            done() { return false },
            style() {
                let look = {width: "476px", minHeight: "75px", paddingLeft: "12px", paddingRight: "12px", color: "#ffffd1", margin: "3px", border: "0", borderRadius: "0 19px 19px 0"}
                if (hasMilestone("cer", this.id)) {look.backgroundColor = "#1a3b0f"; look.color = "#303080";} else {look.backgroundColor = "#ffffd13f"; look.color = "#ffffd1";}
                return look
            },
        },
        "antiBlueshift_16": {
            effectDescription() { return "Starlight fountain focus no longer expires." },
            done() { return false },
            style() {
                let look = {width: "476px", minHeight: "75px", paddingLeft: "12px", paddingRight: "12px", color: "#ffffd1", margin: "3px", border: "0", borderRadius: "0 19px 19px 0"}
                if (hasMilestone("cer", this.id)) {look.backgroundColor = "#1a3b0f"; look.color = "#303080";} else {look.backgroundColor = "#ffffd13f"; look.color = "#ffffd1";}
                return look
            },
        },
        "antiBlueshift_12": {
            effectDescription() { return "Floor 1 project focus no longer expires." },
            done() { return false },
            style() {
                let look = {width: "476px", minHeight: "75px", paddingLeft: "12px", paddingRight: "12px", color: "#ffffd1", margin: "3px", border: "0", borderRadius: "0 19px 19px 0"}
                if (hasMilestone("cer", this.id)) {look.backgroundColor = "#1a3b0f"; look.color = "#303080";} else {look.backgroundColor = "#ffffd13f"; look.color = "#ffffd1";}
                return look
            },
        },
        "antiBlueshift_8": {
            effectDescription() { return "Unlock auto-cycle." },
            done() { return false },
            style() {
                let look = {width: "476px", minHeight: "75px", paddingLeft: "12px", paddingRight: "12px", color: "#ffffd1", margin: "3px", border: "0", borderRadius: "0 19px 19px 0"}
                if (hasMilestone("cer", this.id)) {look.backgroundColor = "#1a3b0f"; look.color = "#303080";} else {look.backgroundColor = "#ffffd13f"; look.color = "#ffffd1";}
                return look
            },
        },
        "antiBlueshift_4": {
            effectDescription() { return "Boost cycle reset gain by blueshift amount.<br>(x" + formatSimple(player.blu.totalBlueshifts.add(1), 2) + ")" },
            done() { return false },
            style() {
                let look = {width: "476px", minHeight: "75px", paddingLeft: "12px", paddingRight: "12px", color: "#ffffd1", margin: "3px", border: "0", borderRadius: "0 19px 19px 0"}
                if (hasMilestone("cer", this.id)) {look.backgroundColor = "#1a3b0f"; look.color = "#303080";} else {look.backgroundColor = "#ffffd13f"; look.color = "#ffffd1";}
                return look
            },
        },
        "antiBlueshift_0": {
            effectDescription() { return "Cycle no longer resets floor 1 project ↻.<br>Boost ring gain by x3." },
            done() { return false },
            style() {
                let look = {width: "476px", minHeight: "75px", paddingLeft: "12px", paddingRight: "12px", color: "#ffffd1", margin: "3px", border: "0", borderRadius: "0 19px 19px 0"}
                if (hasMilestone("cer", this.id)) {look.backgroundColor = "#1a3b0f"; look.color = "#303080";} else {look.backgroundColor = "#ffffd13f"; look.color = "#ffffd1";}
                return look
            },
        },
    },
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "The Ring": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    ["blank", "376px"],
                    ["style-column", [
                        ["style-column", [], {"--lyr": "linear-gradient(white)", mask: "var(--lyr) padding-box exclude, var(--lyr)", background: "linear-gradient(0deg, #804060 50%, #b35986 50%) border-box", border: "66px solid #0000", borderRadius: "600px", width: "570px", height: "570px"}],
                    ], {width: "744px", height: "0px"}],
                    ["style-column", [
                        ["style-column", [], {"--lyr": "linear-gradient(white)", mask: "var(--lyr) padding-box exclude, var(--lyr)", background: "#804060 border-box", border: "36px solid #0000", borderRadius: "600px", width: "600px", height: "600px"}],
                    ], {width: "678px", height: "0px"}],
                    ["style-column", [
                        ["style-column", [], {"--lyr": "linear-gradient(white)", mask: "var(--lyr) padding-box exclude, var(--lyr)", background: "linear-gradient(0deg, #ffdfef, #60bfbf) border-box", border: "30px solid #0000", borderRadius: "600px", width: "606px", height: "606px"}],
                    ], {width: "666px", height: "0px"}],
                    ["style-column", [
                        ["style-column", [], {border: "72px solid #804060", borderRadius: "600px", width: "564px", height: "564px"}],
                    ], {width: "744px", height: "0px"}],
                    ["style-column", [
                        ["style-column", [
                            ["style-column", [
                                ["top-column", [
                                    ["blank", "3px"],
                                    ["style-column", [], {background: "#b35986", width: "600px", height: "15px"}],
                                ], {background: "#804060", width: "600px", height: "36px"}],
                            ], {width: "600px", height: "0"}],
                            ["style-column", [
                                ["style-column", [
                                    ["style-column", [
                                        ["blank", "6px"],
                                        ["style-column", [
                                            ["raw-html", "Entering the cycle will reset ALL prior interspace content. Gain multipliers to cycle stats based on interspace stats on reset.", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                        ], {width: "338px"}],
                                        ["blank", "6px"],
                                        ["raw-html", "Rings: <h3>x1</h3> <span style='font-size:12px'>(+x1)", {color: "#bfffff", fontSize: "16px", fontFamily: "monospace"}],
                                        ["raw-html", "(Based on Light)", {color: "#bfffff", fontSize: "12px", fontFamily: "monospace"}],
                                        
                                        /*
                                        ["raw-html", "Unlock a new boost at 1e9 Project Speed", {color: "#ffffff7f", fontSize: "12px", fontFamily: "monospace"}],
                                        ["raw-html", "Unlock a new boost at 1e9 θ ↻", {color: "#ffffff7f", fontSize: "12px", fontFamily: "monospace"}],
                                        */

                                        ["raw-html", "Haste: <h3>x1</h3> <span style='font-size:12px'>(+x0.1)", {color: "#e0ffe0", fontSize: "16px", fontFamily: "monospace"}],
                                        ["raw-html", "(Based on Project Speed)", {color: "#e0ffe0", fontSize: "12px", fontFamily: "monospace"}],
                                        ["raw-html", "Tickspeed: <h3>x1</h3> <span style='font-size:12px'>(+x0.01)", {color: "#ffbfdf", fontSize: "16px", fontFamily: "monospace"}],
                                        ["raw-html", "(Based on all Well Speeds)", {color: "#ffbfdf", fontSize: "12px", fontFamily: "monospace"}],
                                        
                                        ["blank", "6px"],
                                        ["clickable", "enter"],
                                    ], {background: "#804060", border: "3px solid #b35986", borderRadius: "31px", width: "362px"}],
                                ], {background: "#804060", borderRadius: "34px", padding: "3px"}],
                            ], {width: "350px", height: "0"}],
                        ], {width: "600px", height: "600px"}],
                    ], {width: "600px", height: "0px"}],
                    ["blank", "376px"],
                    ["blank", "25px"],
                ]
            },
            "Upgrade Tree": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["centered-draggable-scroll-row", [

                        ["style-row", [

                            //// CONNECTIONS ////

                            // CENTER
                            createRingUpgradeConnection([0, 0], [1, 0]),
                            createRingUpgradeConnection([0, 0], [0, 1]),
                            createRingUpgradeConnection([0, 0], [-1, 0]),
                            createRingUpgradeConnection([0, 0], [0, -1]),

                            // PATH OF LIGHT
                            createRingUpgradeConnection([1, 0], [2, 0]),
                            createRingUpgradeConnection([1, 0], [1, 1]),
                            createRingUpgradeConnection([1, 0], [1, -1]),

                            // PATH OF CYCLES

                            // ULTIMATES

                            //// UPGRADES ////

                            createRingUpgradeConnection([-1, 0], [-1, 1]),
                            createRingUpgradeConnection([-1, 0], [-1, -1]),
                            // CENTER
                            createRingUpgrade("buyable", 101, [0, 0]),
                            createRingUpgrade("buyable", 102, [1, 0]),
                            createRingUpgrade("buyable", 103, [0, 1]),
                            createRingUpgrade("buyable", 104, [-1, 0]),

                            // PATH OF LIGHT
                            createRingUpgrade("buyable", 105, [0, -1]),
                            createRingUpgrade("buyable", 201, [2, 0]),
                            createRingUpgrade("upgrade", 201, [1, 1]),
                            createRingUpgrade("upgrade", 202, [1, -1]),

                            // PATH OF CYCLES
                            createRingUpgrade("upgrade", 401, [-1, 1]),
                            createRingUpgrade("upgrade", 402, [-1, -1]),

                            // ULTIMATES
                            createRingUpgrade("upgrade", 101, [7, 0]),
                            createRingUpgrade("upgrade", 102, [0, 7]),
                            createRingUpgrade("upgrade", 103, [-7, 0]),
                            createRingUpgrade("upgrade", 104, [0, -7]),

                        ], () => {
                            let look = {width: "4000px", height: "4000px"}
    	                    let t = Date.now() / 1000
    	                    t = ((t % 60) / 60) * 25
                            look.background = "conic-gradient(" +
			                    "#401028 " + (t - 25) + "%, #401028 " + (t - 12.5) + "%," +
			                    "#2e0b1d " + (t - 12.5) + "%, #2e0b1d " + t + "%," +
			                    "#401028 " + t + "%, #401028 " + (t + 12.5) + "%," +
			                    "#2e0b1d " + (t + 12.5) + "%, #2e0b1d " + (t + 25) + "%," +
			                    "#401028 " + (t + 25) + "%, #401028 " + (t + 37.5) + "%," +
			                    "#2e0b1d " + (t + 37.5) + "%, #2e0b1d " + (t + 50) + "%," +
			                    "#401028 " + (t + 50) + "%, #401028 " + (t + 62.5) + "%," +
			                    "#2e0b1d " + (t + 62.5) + "%, #2e0b1d " + (t + 75) + "%," +
			                    "#401028 " + (t + 75) + "%, #401028 " + (t + 87.5) + "%," +
			                    "#2e0b1d " + (t + 87.5) + "%, #2e0b1d " + (t + 100) + "%," +
			                    "#401028 " + (t + 100) + "%)"
                            return look
                        }]
                    ], () => {
                        let look = {border: "3px solid #ffdfef", borderRadius: "15px", flexFlow: "column"}
                        if (window.innerWidth > 1250) {
                            look.width = "calc(100vw - 440px)"
                            look.height = "calc(100vh - 197px)"
                            look.marginLeft = "8px"
                        } else {
                            look.width = "calc(100vw - 30px)"
                            look.height = "calc(86vh - 514px)"
                        }
                        return look
                    }],
                ]
            },
            "Anti-Blueshift": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", () => {return player.cer.lowestBlueshift.eq(1e3) ? "You haven't entered the cycle yet." : ("Your lowest blueshift upon entering the cycle was " + formatSimple(player.cer.lowestBlueshift) + ".")}, {color: "#ffffd1", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["style-column", [
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "40", {color: "#ffffd1", fontSize: "32px", fontFamily: "monospace"}],
                                ], {width: "75px", height: "75px"}],
                            ], {background: "#ffffd13f", borderRadius: "19px 0 0 19px", margin: "3px", width: "75px"}],
                            ["titleless-milestone", "antiBlueshift_40"],
                        ]],
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "36", {color: "#ffffd1", fontSize: "32px", fontFamily: "monospace"}],
                                ], {width: "75px", height: "75px"}],
                            ], {background: "#ffffd13f", borderRadius: "19px 0 0 19px", margin: "3px", width: "75px"}],
                            ["titleless-milestone", "antiBlueshift_36"],
                        ]],
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "32", {color: "#ffffd1", fontSize: "32px", fontFamily: "monospace"}],
                                ], {width: "75px", height: "75px"}],
                            ], {background: "#ffffd13f", borderRadius: "19px 0 0 19px", margin: "3px", width: "75px"}],
                            ["titleless-milestone", "antiBlueshift_32"],
                        ]],
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "28", {color: "#ffffd1", fontSize: "32px", fontFamily: "monospace"}],
                                ], {width: "75px", height: "75px"}],
                            ], {background: "#ffffd13f", borderRadius: "19px 0 0 19px", margin: "3px", width: "75px"}],
                            ["titleless-milestone", "antiBlueshift_28"],
                        ]],
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "24", {color: "#ffffd1", fontSize: "32px", fontFamily: "monospace"}],
                                ], {width: "75px", height: "75px"}],
                            ], {background: "#ffffd13f", borderRadius: "19px 0 0 19px", margin: "3px", width: "75px"}],
                            ["titleless-milestone", "antiBlueshift_24"],
                        ]],
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "20", {color: "#ffffd1", fontSize: "32px", fontFamily: "monospace"}],
                                ], {width: "75px", height: "75px"}],
                            ], {background: "#ffffd13f", borderRadius: "19px 0 0 19px", margin: "3px", width: "75px"}],
                            ["titleless-milestone", "antiBlueshift_20"],
                        ]],
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "16", {color: "#ffffd1", fontSize: "32px", fontFamily: "monospace"}],
                                ], {width: "75px", height: "75px"}],
                            ], {background: "#ffffd13f", borderRadius: "19px 0 0 19px", margin: "3px", width: "75px"}],
                            ["titleless-milestone", "antiBlueshift_16"],
                        ]],
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "12", {color: "#ffffd1", fontSize: "32px", fontFamily: "monospace"}],
                                ], {width: "75px", height: "75px"}],
                            ], {background: "#ffffd13f", borderRadius: "19px 0 0 19px", margin: "3px", width: "75px"}],
                            ["titleless-milestone", "antiBlueshift_12"],
                        ]],
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "8", {color: "#ffffd1", fontSize: "32px", fontFamily: "monospace"}],
                                ], {width: "75px", height: "75px"}],
                            ], {background: "#ffffd13f", borderRadius: "19px 0 0 19px", margin: "3px", width: "75px"}],
                            ["titleless-milestone", "antiBlueshift_8"],
                        ]],
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "4", {color: "#ffffd1", fontSize: "32px", fontFamily: "monospace"}],
                                ], {width: "75px", height: "75px"}],
                            ], {background: "#ffffd13f", borderRadius: "19px 0 0 19px", margin: "3px", width: "75px"}],
                            ["titleless-milestone", "antiBlueshift_4"],
                        ]],
                        ["style-row", [
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "0", {color: "#ffffd1", fontSize: "32px", fontFamily: "monospace"}],
                                ], {width: "75px", height: "75px"}],
                            ], {background: "#ffffd13f", borderRadius: "19px 0 0 19px", margin: "3px", width: "75px"}],
                            ["titleless-milestone", "antiBlueshift_0"],
                        ]],
                    ], {background: "linear-gradient(#303080, #583058)", borderRadius: "25px", padding: "3px"}],
                    ["blank", "25px"],
                ]
            },
        }
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + formatWhole(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["style-row", [
            ["raw-html", () => { return "You have <h3>" + formatWhole(player.cer.rings) + "</h3> rings." }, {color: "#bfffff", fontSize: "24px", fontFamily: "monospace"}],
            ["style-row", [
                ["raw-html", () => {return "(+" + formatWhole(0) + ")"}, () => {
                    let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                    if (player.cer.ringsToGet.gte(1)) {look.color = "#bfffff"} else {look.color = "gray"}
                    return look
                }],
            ], {}],
        ]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasMilestone("prj", 501)}
})