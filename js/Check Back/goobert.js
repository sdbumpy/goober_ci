addLayer("ep3", {
    name: "Goobert", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Gb", // This appears on the layer's node. Default is the id with the first letter capitalized
    universe: "CB",
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        
        menu: 0,

        vaultCounter: 0,
        vaultSuccess: 0,
    }},
    nodeStyle: {
        background: "linear-gradient(-45deg, #804080, #608060)",
		backgroundOrigin: "border-box",
		borderColor: "#403040",
		color: "#ffe0ff"
    },
    tooltip: "Goobert",
    color: "#ffe0ff",
    update(delta) {
        let onepersec = player.cb.cbTickspeed
    },
    clickables: {
        "menu_main": {
            title() {
                return "BACK"
            },
            canClick() { return true },
            unlocked: true,
            onClick() {
                player.ep3.menu = 0
                
                player.ep3.vaultSuccess = 0
            },
            style: {background: "#232e23", border: "3px solid #485e48", color: "#efffef", width: '426px', minHeight: '64px', fontSize: "18px", borderRadius: "13px 13px 0 0"},
        },
        "menu_shop": {
            title() {
                return "SHOP"
            },
            canClick() { return true },
            unlocked: true,
            onClick() {
            },
            style: {background: "#232e23", border: "3px solid #485e48", color: "#efffef", width: '207px', minHeight: '283px', fontSize: "18px", margin: "6px", borderRadius: "13px 0 0 0"},
        },
        "menu_milestones": {
            title() {
                return "MILESTONES"
            },
            canClick() { return true },
            unlocked: true,
            onClick() {
            },
            style: {background: "#232e23", border: "3px solid #485e48", color: "#efffef", width: '207px', minHeight: '283px', fontSize: "18px", margin: "6px", borderRadius: "0 13px 0 0"},
        },
        "menu_m3": {
            title() {
                return "???"
            },
            canClick() { return true },
            unlocked: true,
            onClick() {
            },
            style: {background: "#232e23", border: "3px solid #485e48", color: "#efffef", width: '207px', minHeight: '283px', fontSize: "18px", margin: "6px", borderRadius: "0 0 0 13px"},
        },
        "menu_vault": {
            title() {
                return "..."
            },
            canClick() { return true },
            unlocked: true,
            onClick() {
                player.ep3.menu = 4
            },
            style: {background: "#232e23", border: "3px solid #485e48", color: "#485e48", width: '207px', minHeight: '283px', fontSize: "18px", margin: "6px", borderRadius: "0 0 13px 0"},
        },

        "vault_open": {
            title() {
                return "OPEN"
            },
            canClick() { return true },
            unlocked: true,
            onClick() {
                player.ep3.vaultSuccess = 1

                player.ep3.vaultCounter = 0
                setGridData("ep3", 101, [0])
                setGridData("ep3", 102, [0])
                setGridData("ep3", 103, [0])
                setGridData("ep3", 104, [0])
                setGridData("ep3", 201, [0])
                setGridData("ep3", 202, [0])
                setGridData("ep3", 203, [0])
                setGridData("ep3", 204, [0])
                setGridData("ep3", 301, [0])
                setGridData("ep3", 302, [0])
                setGridData("ep3", 303, [0])
                setGridData("ep3", 304, [0])
                setGridData("ep3", 401, [0])
                setGridData("ep3", 402, [0])
                setGridData("ep3", 403, [0])
                setGridData("ep3", 404, [0])
            },
            style: {background: "#232e23", border: "3px solid #485e48", color: "#efffef", width: '426px', minHeight: '64px', fontSize: "18px", borderRadius: "0 0 13px 13px"},
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(0.1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(200) },
            currency() { return player.ev0.coinDust},
            pay(amt) {player.ev0.coinDust = this.currency().sub(amt)},
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1)},
            unlocked: true,
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Coin Dust Booster"
            },
            display() {
                return "which are boosting coin dust gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Coin Dust"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#F1CE6B", backgroundImage: 'linear-gradient(90deg, #e7c97c, #fad25a)'}
        },
    },
    grid: {
        rows: 4,
        cols: 4,
        getStartData(id) {
            return [
                0, // Order
            ]
        },
        getTitle(data, id) {
            let order = getGridData("ep3", id)[0]
            if (order === 0) return "_";
            else return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"][order - 1];
        },
        getCanClick(data, id) {return true},
        onClick(data, id) {
            let order = getGridData("ep3", id)[0]
            if (order === 0) {
                player.ep3.vaultCounter++
                setGridData("ep3", id, [player.ep3.vaultCounter])
            } else {
                player.ep3.vaultCounter = 0
                setGridData("ep3", 101, [0])
                setGridData("ep3", 102, [0])
                setGridData("ep3", 103, [0])
                setGridData("ep3", 104, [0])
                setGridData("ep3", 201, [0])
                setGridData("ep3", 202, [0])
                setGridData("ep3", 203, [0])
                setGridData("ep3", 204, [0])
                setGridData("ep3", 301, [0])
                setGridData("ep3", 302, [0])
                setGridData("ep3", 303, [0])
                setGridData("ep3", 304, [0])
                setGridData("ep3", 401, [0])
                setGridData("ep3", 402, [0])
                setGridData("ep3", 403, [0])
                setGridData("ep3", 404, [0])
            };
        },
        onHover(data, id) {
        },
        getStyle(data, id) {
            let look = {width: "90px", height: "90px", fontSize: "24px", color: "#efffef", border: "3px solid #485e48", borderRadius: "0", padding: "0", margin: "6px", cursor: "default"}
            
            if (getGridData("ep3", id)[0] == 0) {
                look.background = "transparent"
                look.color = "#efffef"
            } else {
                look.background = "#efffef"
                look.color = "#485e48"
            }

            return look
        }
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    // #232e23
                    // #485e48
                    // #efffef
                    let look = [
                        ["style-column", [], {background: "#232e23", border: "3px solid #485e48", borderRadius: "22px", width: "450px", height: "600px"}],
                        ["blank", "25px"],
                    ]
                    let m
                    switch (player.ep3.menu) {
                        case 4: {
                            switch (player.ep3.vaultSuccess) {
                                case 1: {
                                    m = ["style-column", [
                                        ["clickable", "menu_main"],
                                        ["style-column", [
                                            ["raw-html", "Hello.", {color: "#efffef", fontSize: "16px", fontFamily: "monospace" }],
                                            ["blank", "16px"],
                                            ["raw-html", "I'm impressed you made it this far.", {color: "#efffef", fontSize: "16px", fontFamily: "monospace" }],
                                            ["blank", "16px"],
                                            ["raw-html", "This is <span style='color:yellow'>The Vault</span>, a secure container for superphysical information.", {color: "#efffef", fontSize: "16px", fontFamily: "monospace" }],
                                            ["blank", "16px"],
                                            ["raw-html", "You need a code of sixteen numbers to access anything inside.", {color: "#efffef", fontSize: "16px", fontFamily: "monospace" }],
                                            ["blank", "16px"],
                                            ["raw-html", "Good luck finding any.", {color: "#efffef", fontSize: "16px", fontFamily: "monospace" }],
                                        ], {background: "#232e23", border: "3px solid #485e48", borderRadius: "0 0 13px 13px", padding: "6px", margin: "12px", marginBottom: "0", width: "408px", height: "484px"}]
                                    ]]
                                break; }
                                default: {
                                    m = ["style-column", [
                                        ["clickable", "menu_main"],
                                        ["style-column", ["grid"], {background: "#232e23", border: "3px solid #485e48", borderRadius: "0", margin: "12px", width: "420px", height: "420px"}],
                                        ["clickable", "vault_open"],
                                    ]]
                                break; }
                            }
                        break; }
                        default: {
                            m = ["style-row", [
                                ["clickable", "menu_shop"],
                                ["clickable", "menu_milestones"],
                                ["clickable", "menu_m3"],
                                ["clickable", "menu_vault"],
                            ]]
                        break; }
                    }
                    look[0][1].push(m)
                    return look
                },
            },
        },
    },
    tabFormat: [
        ["blank", "25px"],
        ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame && (getLevelableAmount("pet", 407).gte(1) || getLevelableTier("pet", 407).gte(1))}
})