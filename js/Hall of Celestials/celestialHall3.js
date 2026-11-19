addLayer("ch3", {
    name: "Hall", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CH", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        celestialIndex: new Decimal(0),
        celestialTexts: ["", "", "",],
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, #de6281 0%, #dea0cf 100%) border-box",
            "background-origin": "border-box",
            "border-color": "#541525bf",
            color: "#541525bf",
        }
    },
    tooltip: "Hall",
    color: "#de6281",
    branches: ["ch"],
    update(delta) {
        let onepersec = new Decimal(1)
        
        player.ch3.celestialTexts = [
            "Cere, the Celestial of Cycles",
            "",
            "",
        ]
    },
    clickables: {
        11: {
            title() { return "<img src='resources/cere.png' style='width:calc(135%);height:calc(135%);margin:-15px -15px'></img>" },
            canClick() { return true },
            unlocked() { return true },
            tooltip() { return "Cere, the Celestial of Cycles" },
            onClick() {
                player.ch3.celestialIndex = new Decimal(0)
            },
            branches: [12, 13],
            style: { width: '60px', "min-height": '60px' },
        },
        12: {
            title() { return "<h1>?" },
            canClick() { return false },
            unlocked() { return true },
            tooltip() { return ""},
            onClick() {
                player.ch3.celestialIndex = new Decimal(1)
            },
            style: { width: '60px', "min-height": '60px' }, 
        },
        13: {
            title() { return "<h1>?" },
            canClick() { return false },
            unlocked() { return true },
            tooltip() { return ""},
            onClick() {
                player.ch3.celestialIndex = new Decimal(2)
            },
            style: { width: '60px', "min-height": '60px' }, 
        },
        14: {
            title() { return "<h1>?" },
            canClick() { return false },
            unlocked() { return true },
            tooltip() { return ""},
            onClick() {
                player.ch3.celestialIndex = new Decimal(2)
            },
            style: { width: '60px', "min-height": '60px' }, 
        },
        15: {
            title() { return "<h1>?" },
            canClick() { return false },
            unlocked() { return true },
            tooltip() { return ""},
            onClick() {
                player.ch3.celestialIndex = new Decimal(2)
            },
            style: { width: '60px', "min-height": '60px' }, 
        },
        16: {
            title() { return "<h1>?" },
            canClick() { return false },
            unlocked() { return true },
            tooltip() { return ""},
            onClick() {
                player.ch3.celestialIndex = new Decimal(2)
            },
            style: { width: '60px', "min-height": '60px' }, 
        },
        17: {
            title() { return "<img src='resources/secret.png' style='width:calc(135%);height:calc(135%);margin:-15px -15px'></img>" },
            canClick() { return false },
            unlocked() { return true },
            tooltip() { return ""},
            onClick() {

            },
            style: { width: '90px', "min-height": '90px' }, 
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {
        1: {
            title: "Cere, the Celestial of Cycles",
            body() { return "<img src='resources/cere.png' width='100' height='100'><br>Cere is" },
            unlocked() { return player.ch3.celestialIndex.eq(0) },
            titleStyle: {
                "background-color": "#ff7fbf",
                "border-color": "#7f003f",
                "color": "#7f003f",
            },
            bodyStyle: {
                "background": "linear-gradient(150deg, #ff7fbf 0%, #ffbfdf 50%, #ff7fbf 100%)", 
                "border-color": "#7f003f",
                "color": "#7f003f",
            },
        },
    },
    microtabs: {
        stuff: {
            "Hall": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["microtabs", "hall", { 'border-width': '0px' }],
                ]
            },
        },
        hall: {
            "Hall": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["row", [["raw-html", () => { return "<small>Celestial #" + formatWhole(player.ch3.celestialIndex.add(1)) + "</small><br>" + player.ch3.celestialTexts[player.ch3.celestialIndex] }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],]],
                    ["blank", "20px"],
                    ["row", [["clickable", 11],]],
                    ["blank", "40px"],
                    ["row", [["clickable", 12], ["blank", ["200px", "20px"]], ["clickable", 13],]],
                    ["blank", "40px"],
                    ["row", [["clickable", 17],]],
                    ["blank", "40px"],
                    ["row", [["clickable", 15], ["blank", ["200px", "20px"]], ["clickable", 16],]],
                    ["blank", "40px"],
                    ["row", [["clickable", 14],]],
                    ["blank", "40px"],
                    ["infobox", 1],


                ]
            },
        },
    },
    tabFormat: [
        ["buttonless-microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame && true && !player.sma.inStarmetalChallenge}
})
