addLayer("rprj", {
    name: "Research Projects",
    symbol: "RP",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#4d394d",
            background: "linear-gradient(-45deg, #994d86 -25%, #dfffdf 125%)",
            "background-origin": "border-box",
            "border-color": "#4d394d",
        };
    },
    tooltip: "Research Projects",
    color: "#dfffdf",
    update(delta) {
        

    },
    branches: ["prj"],
    clickables: {
        
    },
    bars: {},
    upgrades: {
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Research": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["raw-html", () => { return "<small>(0 <i>base</i> r-project speed, +1 at 1.00e200 light) (0)" }, {color: "#dfffdf", fontSize: "18px", fontFamily: "monospace"}],
        ["blank", "10px"],
        ["raw-html", () => { return "You have <h3>" + format(player.bum.starlight) + "</h3> starlight." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["raw-html", () => { return "<small>(^1 <i>base</i> r-project speed, +^0.2 at 1,000,000 starlight) (0)" }, {color: "#dfffdf", fontSize: "18px", fontFamily: "monospace"}],
        ["blank", "10px"],
        ["raw-html", () => { return "Projects operate at <h3>x" + format(player.prj.projectSpeed) + "</h3> speed." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["raw-html", () => { return "<small>(x1 r-project speed, x2 at 40,000,000 project speed) (0)" }, {color: "#dfffdf", fontSize: "18px", fontFamily: "monospace"}],
        ["blank", "10px"],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return hasUpgrade("bum", 24) && false && player.startedGame == true}
})