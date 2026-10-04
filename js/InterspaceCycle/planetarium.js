addLayer("plt", {
    name: "Planetarium",
    symbol: "PT",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        planetarium: new Decimal(0),
        planetariumBase: new Decimal(2.5),
        planetariumCompaction: new Decimal(0),

        planetariumTimer: new Decimal(0),
        planetariumTimerReq: new Decimal(10),
        planetariumNextSpawnPos: 0,
        planetariumCollectionMode: 0,
        planetariumMergeSelection: 0,
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #000080 0%, #800080 100%)",
            "background-origin": "border-box",
            "border-color": "#de54de",
            "color": "white",
        };
    },
    tooltip: "Planetarium",
    color: "#de54de",
    update(delta) {

        // PLANETARIUM BASE
        player.plt.planetariumBase = new Decimal(2.5)
        player.plt.planetariumCompaction = new Decimal(0)

        // PLANETARIUM GRID SPAWNS
        if (true) player.plt.planetariumTimer = player.plt.planetariumTimer.sub(delta)
        if (player.plt.planetariumTimer.lt(0)) {
            player.plt.planetariumTimer = player.plt.planetariumTimerReq
            if (player.plt.planetariumNextSpawnPos == 0) {
                let row = getRandomInt(5) + 1
                let column = getRandomInt(8) + 1
                player.plt.planetariumNextSpawnPos = row + "0" + column
            }
            if (getGridData("plt", player.plt.planetariumNextSpawnPos)[0] === 0) {
                setGridData("plt", player.plt.planetariumNextSpawnPos, [
                    1, // Type
                    player.plt.planetariumBase, // Base
                    player.plt.planetariumCompaction, // Compaction
                ])
            } else if (getGridData("plt", player.plt.planetariumNextSpawnPos)[0] == 1 && Decimal.lt(getGridData("plt", player.plt.planetariumNextSpawnPos)[2], player.plt.planetariumCompaction)) {
                setGridData("plt", player.plt.planetariumNextSpawnPos, [
                    1, // Type
                    player.plt.planetariumBase, // Base
                    player.plt.planetariumCompaction, // Compaction
                ])
            }
            let row = getRandomInt(5) + 1
            let column = getRandomInt(8) + 1
            player.plt.planetariumNextSpawnPos = row + "0" + column
        }

    },
    branches: ["cer"],
    clickables: {
        "toggleCompaction": {
            title() {
                let str = "<h3>Toggle Click Mode<br>"
                switch (player.plt.planetariumCollectionMode) {
                    case 1: {
                        str += "[Merge]"
                    break; }
                    default: {
                        str += "[Collect]"
                    }
                }
                return str
            },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                if (player.plt.planetariumCollectionMode == 1) player.plt.planetariumMergeSelection = 0;

                player.plt.planetariumCollectionMode++
                if (player.plt.planetariumCollectionMode > 1) player.plt.planetariumCollectionMode = 0;
            },
            style() {
                let look = {width: "321.5px", minHeight: "60px", margin: "3px", borderRadius: "15px", color: "#ffffff", borderRadius: "0 0 0 22px", border: "3px solid #de54de7f"}
                switch (player.plt.planetariumCollectionMode) {
                    case 1: {
                        look.background = "#194019"
                        look.color = "#54de54"
                    break; }
                    default: {
                        look.background = "#401940"
                        look.color = "#ffffff"
                    }
                }
                return look
            },
        },
    },
    upgrades: {
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    bars: {
        planetarium: {
            unlocked: true,
            direction: RIGHT,
            width: 646,
            height: 25,
            progress() {
                if (player.plt.planetariumTimerReq.lte(0.25)) return new Decimal(1)
                return player.plt.planetariumTimer.div(player.plt.planetariumTimerReq)
            },
            baseStyle: {backgroundColor: "black"},
            fillStyle: {backgroundColor: "#803280"},
            borderStyle: {
                border: "0px",
                borderRadius: "22px 22px 0 0",
            },
            display() {
                if (player.plt.planetariumTimerReq.lte(0.25)) return "<small style='color:red'>TIMER HARDCAPPED</small>"
                return formatSimpleTime(player.plt.planetariumTimer, 2) + "/" + formatSimpleTime(player.plt.planetariumTimerReq)
            },
        },
    },
    grid: {
        rows: 5,
        cols: 8,
        getStartData(id) {
            return [
                0, // Type 
                new Decimal(1.5), // Base
                new Decimal(1), // Compaction
            ]
        },
        getTitle(data, id) {
            return getGridData("plt", id)[0] === 0 ? "" :
            player.plt.planetariumCollectionMode === 0 ? formatSimple(getGridData("plt", id)[1].pow(getGridData("plt", id)[2])) :
            ("x" + formatSimple(getGridData("plt", id)[1]) + "<br><span style='color:#54de54'>^" + formatSimple(getGridData("plt", id)[2]))
        },
        getCanClick(data, id) {return getGridData("plt", id)[0] !== 0 || (player.plt.planetariumMergeSelection !== 0 && player.plt.planetariumCollectionMode == 1)},
        onClick(data, id) {
            switch (player.plt.planetariumCollectionMode) {
                case 1: {
                    if (getGridData("plt", id)[0] === 0) {
                        setGridData("plt", id, [
                            1, // Type
                            getGridData("plt", player.plt.planetariumMergeSelection)[1], // Base
                            getGridData("plt", player.plt.planetariumMergeSelection)[2], // Compaction
                        ])
                        setGridData("plt", player.plt.planetariumMergeSelection, [
                            0, // Type
                        ])
                        player.plt.planetariumMergeSelection = 0
                    } else if (player.plt.planetariumMergeSelection == 0) {
                        player.plt.planetariumMergeSelection = id
                    } else if (id == player.plt.planetariumMergeSelection) {
                        player.plt.planetariumMergeSelection = 0
                    } else if (getGridData("plt", id)[2].eq(getGridData("plt", player.plt.planetariumMergeSelection)[2])) {
                        setGridData("plt", player.plt.planetariumMergeSelection, [
                            0, // Type
                        ])
                        setGridData("plt", id, [
                            1, // Type
                            getGridData("plt", id)[1], // Base
                            getGridData("plt", id)[2].add(1), // Compaction
                        ])
                        player.plt.planetariumMergeSelection = 0
                    }
                break; }
                default: {
                    let base = getGridData("plt", id)[1]
                    let compaction = getGridData("plt", id)[2]
                    player.plt.planetarium = player.plt.planetarium.add(base.pow(compaction))
                    setGridData("plt", id, [
                        0, // Type
                    ])
                    if (player.plt.planetariumMergeSelection == id) player.plt.planetariumMergeSelection = 0;
                }
            }
        },
        onHover(data, id) {
        },
        getStyle(data, id) {
            let look = {width: "74px", height: "74px", fontSize: "9px", color: "white", lineHeight: "1.5", borderRadius: "0", padding: "0", margin: "3px", cursor: "default"}
            
            switch (getGridData("plt", id)[0]) {
                case 1: {
                    let compactionNumber = getGridData("plt", id)[2].toNumber()
                    look.background = `hsla(${300 - compactionNumber * 10}, 44%, ${25 + ((compactionNumber % 6) * 5)}%, 100%)`
                    look.border = "3px solid #150c1f7f"
                break; }
                default: {
                    look.background = "#0f001f"
                    look.border = "3px solid #200040"
                break; }
            }
            if (player.plt.planetariumNextSpawnPos == id) look.border = "3px solid #de54de";
            if (player.plt.planetariumCollectionMode == 1 && player.plt.planetariumMergeSelection == id) look.outline = "3px solid #54de54";
            
            return look
        }
    },
    microtabs: {
        stuff: {
            "Field": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-column", [
                        ["bar", "planetarium"],
                        ["style-row", [], {width: "646px", height: "3px", background: "#de54de"}],
                        ["style-column", [
                            "grid"
                        ], {background: "#0f001f", padding: "3px"}],
                    ], {width: "646px", border: "3px solid #de54de", borderRadius: "25px 25px 0 0"}],
                    ["style-row", [
                        ["style-row", [
                            ["clickable", "toggleCompaction"],
                        ], {borderRight: "3px solid #de54de", width: "321.5px", height: "60px"}],
                        ["style-column", [
                            ["raw-html", () => {return "Base Growth: <h3>x" + formatSimple(player.plt.planetariumBase)}, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return "Base Compaction: <h3>^" + formatSimple(player.plt.planetariumCompaction)}, {color: "#54de54", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "321.5px", height: "60px"}],
                    ], {background: "#200040", border: "3px solid #de54de", borderTop: "0", borderRadius: "0 0 25px 25px", width: "646px", height: "60px"}],
                ]
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + formatWhole(player.bea.blacklight) + "</h3> blacklight." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["raw-html", () => { return "You have <h3>" + formatSimple(player.plt.planetarium) + "</h3> planetarium." }, {color: "#de54de", fontSize: "24px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true}
})