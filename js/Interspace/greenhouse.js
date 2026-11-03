addLayer("gre", {
    name: "Greenhouse",
    symbol: "GR",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        growth: new Decimal(0),
        growthGain: new Decimal(1),

        sunlight: new Decimal(0),
        sunlightToGet: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#4d6099",
            background: "linear-gradient(-135deg, #abd6ff 0%, #ffffd6 100%)",
            "background-origin": "border-box",
            "border-color": "#4d6099",
        };
    },
    tooltip: "Greenhouse",
    color: "#abd6ff",
    update(delta) {
        player.gre.growthGain = new Decimal(1)

    },
    branches: ["prj"],
    clickables: {
        "sunshineReset": {
            title() { return "<h3>Reset your plants for sunlight.</h3><br>Req: 1,000,000 Growth" },
            canClick() { return player.gre.growth.gte(1e6)},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "400px", minHeight: "75px", borderRadius: "10px", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(-135deg, #abd6ff 0%, #ffffd6 100%)"
                    look.border = "2px solid #4d6099"
                    look.color = "#4d6099"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "2px solid #ffffd6"
                    look.color = "#ffffd6"
                }
                return look
            },
        },
    },
    bars: {},
    upgrades: {
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    grid: {
        rows: 7,
        cols: 7,
        getStartData(id) {
            return [
                0, // Type 
                new Decimal(0), // Tier
                new Decimal(0), // Age
            ]
        },
        getTitle(data, id) {
            return "<svg width='68px' height='68px' viewBox='0 0 68 68' style='filter:drop-shadow(0px 0px 2px #003f003f)'>" + `
                <ellipse id="petal0" transform="translate(34, 34)" rx="26px" ry="26px" fill="#abd6ff" fill-rule="evenodd" stroke="#2020407f" stroke-width="6" stroke-linecap="square" stroke-linejoin="bevel"/>
            ` + "</svg>"
        },
        getCanClick(data, id) {return true},
        onClick(data, id) {
            
        },
        onHover(data, id) {
        },
        getStyle(data, id) {
            let look = {width: "74px", height: "74px", fontSize: "9px", color: "white", lineHeight: "1.5", borderRadius: "0", padding: "0", margin: "3px", cursor: "default"}
            
            if (id === 101) look.borderRadius = "37px 0 0 0";
            if (id === 107) look.borderRadius = "0 37px 0 0";
            if (id === 701) look.borderRadius = "0 0 0 37px";
            if (id === 707) look.borderRadius = "0 0 37px 0";

            look.background = "#202040"
            look.border = "3px solid #abd6ff3f"
            
            return look
        }
    },
    microtabs: {
        stuff: {
            "Plants": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    ["blank", "16px"],
                    ["style-column", [
                        ["style-column", [
                            "grid",
                        ], {background: "#202040", border: "3px solid #abd6ff3f", padding: "3px", borderRadius: "43px"}],
                    ], {border: "3px solid #abd6ff", borderRadius: "46px"}],
                ]
            },
            "Sunlight": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true }, // ANICIFFO DEFEATED
                content: [
                    ["blank", "12px"],
                    ["row", [
                        ["raw-html", () => { return "You have <h3>" + formatWhole(player.gre.sunlight) + "</h3> sunlight." }, {color: "#ffffbf", fontSize: "18px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + formatWhole(player.gre.sunlightToGet) + ")"}, () => {
                            let look = {fontSize: "18px", fontFamily: "monospace", marginLeft: "10px"}
                            if (player.gre.sunlightToGet.gte(3)) {look.color = "#ffffbf"} else {look.color = "gray"}
                            return look
                        }],
                    ]],
                    ["blank", "10px"],
                    ["clickable", "sunshineReset"],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["row", [
            ["raw-html", () => {return "You have " + formatSimple(player.gre.growth) + " growth."}, {color: "#ffffd6", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + formatSimple(player.gre.growthGain) + ")"}, {color: "#ffffd6", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["blank", "10px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return hasMilestone("prj", 206) && player.startedGame == true && false}
})