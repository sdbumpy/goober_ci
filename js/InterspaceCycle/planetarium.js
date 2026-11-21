addLayer("plt", {
    name: "Planetarium",
    symbol: "PT",
    universe: "UD_C",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        planetarium: new Decimal(0),
        planetariumMult: new Decimal(1),
        planetariumBase: new Decimal(2.5),
        planetariumCompaction: new Decimal(0),

        planetariumTimer: new Decimal(0),
        planetariumTimerReq: new Decimal(10),
        planetariumNextSpawnPos: 0,
        planetariumCollectionMode: 0,
        planetariumMergeSelection: 0,

        fountainSpeed: new Decimal(1),
        fountains: {
            1: {
                time: new Decimal(0),
                timeReq: new Decimal(600),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                statReq: new Decimal(1),
            },
            2: {
                time: new Decimal(0),
                timeReq: new Decimal(1.2e3),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                statReq: new Decimal(1),
            },
            3: {
                time: new Decimal(0),
                timeReq: new Decimal(1.5e4),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                statReq: new Decimal(1),
            },
            4: {
                time: new Decimal(0),
                timeReq: new Decimal(1.5e4),
                timeSpeed: new Decimal(1),
                canAddCompletion: false,
                completions: new Decimal(0),
                maxCompletions: new Decimal(0),
                completionEffect: new Decimal(1),

                focused: false,
                isFocused: false,
                focusTimer: new Decimal(0),
                focusTimerMax: new Decimal(2),
                statReq: new Decimal(1),
            },
        },
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
        player.plt.planetariumMult = new Decimal(1)
        player.plt.planetariumMult = player.plt.planetariumMult.mul(layers.plt.fountains[1].getCompletionEffect())
        player.plt.planetariumMult = player.plt.planetariumMult.mul(layers.ast.fountains[1].getCompletionEffect())
        player.plt.planetariumMult = player.plt.planetariumMult.mul(10).floor().div(10)
        player.plt.planetariumBase = new Decimal(2.5)
        player.plt.planetariumBase = player.plt.planetariumBase.add(layers.plt.fountains[2].getCompletionEffect())
        player.plt.planetariumBase = player.plt.planetariumBase.mul(layers.ast.fountains[2].getCompletionEffect())
        player.plt.planetariumCompaction = new Decimal(0)
        player.plt.planetariumCompaction = player.plt.planetariumCompaction.add(layers.plt.fountains[4].getCompletionEffect())
        player.plt.planetariumTimerReq = new Decimal(10)

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

        // FOUNTAINS
        player.plt.fountainSpeed = player.plt.planetarium.div(10)
        Object.keys(layers.plt.fountains).forEach(i => {
            let module = player.plt.fountains[i]
            let fountain = layers.plt.fountains[i]
            module.timeSpeed = fountain.getTimeSpeed()
            module.timeReq = fountain.getTimeReq()
            module.statReq = fountain.getstatReq()
            module.completionEffect = fountain.getCompletionEffect()

            module.pourSafety = false
            module.focusSafety = false
            let seqDivisor = Math.pow(1.4, i - 1)
            if (i > 9) seqDivisor = Math.pow(seqDivisor, 3);
            player.plt.fountains[i].focusTimerMax = new Decimal(1).mul(4).div(seqDivisor)
            if (player.plt.fountains[i].isFocused) {
                player.plt.fountains[i].focusTimer = player.plt.fountains[i].focusTimer.sub(delta)
                if (player.plt.pltsms.gte(module.statReq) && module.timeSpeed.gt(0)) module.time = module.time.add(module.timeSpeed.div(player.plt.totalPrisms).mul(player.plt.totalPrisms.sub(module.statReq)).mul(delta));
                if (player.plt.fountains[i].focusTimer.lte(0) && true) {
                    player.plt.fountains[i].isFocused = false
                    player.plt.fountains[i].focusTimer = player.plt.fountains[i].focusTimerMax
                    player.prj.focused = player.prj.focused.sub(1)
                }
            } else {
                player.plt.fountains[i].focusTimer = player.plt.fountains[i].focusTimerMax
            }
            if (module.focused) {
                module.time = module.time.add(module.timeSpeed.mul(delta))
            }
            if (module.time.gte(module.timeReq)) {
                if (module.focused) {
                    player.prj.focused = player.prj.focused.sub(1);
                    module.focused = false
                }
                module.completions = module.completions.add(1)
                module.time = new Decimal(0)
            }
        });

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
                let look = {width: "321.5px", minHeight: "75px", margin: "3px", borderRadius: "15px", color: "#ffffff", borderRadius: "0 0 0 22px", border: "3px solid #de54de7f"}
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
        "fountainPour_1": createPourClickable("plt", 1, {
            primaryColor: "#600080",
            secondaryColor: "#300060",
            progressFrontColor: "#dea6de",
            textColor: "#ffffff",
        }),
        "fountainFocus_1": createFountainFocusClickable("plt", 1, {
            primaryColor: "#600080",
            secondaryColor: "#300060",
            textColor: "#ffffff",
        }),
        "fountainPour_2": createPourClickable("plt", 2, {
            primaryColor: "#600080",
            secondaryColor: "#300060",
            progressFrontColor: "#dea6de",
            textColor: "#ffffff",
        }),
        "fountainFocus_2": createFountainFocusClickable("plt", 2, {
            primaryColor: "#600080",
            secondaryColor: "#300060",
            textColor: "#ffffff",
        }),
        "fountainPour_3": createPourClickable("plt", 3, {
            primaryColor: "#600080",
            secondaryColor: "#300060",
            progressFrontColor: "#dea6de",
            textColor: "#ffffff",
        }),
        "fountainFocus_3": createFountainFocusClickable("plt", 3, {
            primaryColor: "#600080",
            secondaryColor: "#300060",
            textColor: "#ffffff",
        }),
        "fountainPour_4": createPourClickable("plt", 4, {
            primaryColor: "#600080",
            secondaryColor: "#300060",
            progressFrontColor: "#dea6de",
            textColor: "#ffffff",
        }),
        "fountainFocus_4": createFountainFocusClickable("plt", 4, {
            primaryColor: "#600080",
            secondaryColor: "#300060",
            textColor: "#ffffff",
        }),
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
            player.plt.planetariumCollectionMode === 0 ? formatShortSimple(getGridData("plt", id)[1].pow(getGridData("plt", id)[2])) :
            ("x" + formatShortSimple(getGridData("plt", id)[1]) + "<br><span style='color:#54de54'>^" + formatShortSimple(getGridData("plt", id)[2]))
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
                    player.plt.planetarium = player.plt.planetarium.add(base.pow(compaction).mul(player.plt.planetariumMult))
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
    fountains: {
        1: {
            title: "Planetarium",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts planetarium gain by x" + formatSimple(layers.plt.fountains[1].getCompletionEffect())},
            currencyLocation() { return player.plt },
            currencyInternalName: "planetarium",
            currencyDisplayName: "Planetarium",
            getCompletionEffect() {
                let completions = player.plt.fountains[1].completions.pow(0.75)

                s = completions.pow_base(1.1).mul(completions.mul(0.2).add(1))
                s = s.mul(10).floor().div(10)

                return s
            },
            getTimeReq() {
                let completions = player.plt.fountains[1].completions
                let s = completions.pow(1.25).pow_base(1.1).mul(10)

                s = s.pow(1.0625).mul(2)

                return s
            },
            getTimeBulk() {
                let unscaledBulk = player.plt.fountains[1].time.div(10).root(1.0625).log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getstatReq() {
                let completions = player.plt.fountains[1].completions
                let s = completions.pow(1.25).pow_base(1.1).mul(10)

                return s.floor()
            },
            getStatBulk() {
                let unscaledBulk = player.plt.fountains[1].time.log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.plt.fountainSpeed)

                return s
            },
        },
        2: {
            title: "Growth",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts base growth by +" + formatSimple(layers.plt.fountains[2].getCompletionEffect())},
            currencyLocation() { return player.plt },
            currencyInternalName: "planetarium",
            currencyDisplayName: "Planetarium",
            getCompletionEffect() {
                let completions = player.plt.fountains[2].completions

                s = completions.mul(0.1)

                return s
            },
            getTimeReq() {
                let completions = player.plt.fountains[2].completions
                let s = completions.pow(1.25).pow_base(2).mul(20)

                s = s.pow(1.0625).mul(3)

                return s
            },
            getTimeBulk() {
                let unscaledBulk = player.plt.fountains[2].time.div(10).root(1.0625).log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getstatReq() {
                let completions = player.plt.fountains[2].completions
                let s = completions.pow(1.25).pow_base(2).mul(20)

                return s.floor()
            },
            getStatBulk() {
                let unscaledBulk = player.plt.fountains[2].time.log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.plt.fountainSpeed)

                return s
            },
        },
        3: {
            title: "Light",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts blacklight gain by x" + formatSimple(layers.plt.fountains[3].getCompletionEffect())},
            currencyLocation() { return player.plt },
            currencyInternalName: "planetarium",
            currencyDisplayName: "Planetarium",
            getCompletionEffect() {
                let completions = player.plt.fountains[3].completions.pow(0.75)

                s = completions.pow_base(1.2).mul(completions.mul(0.5).add(1))
                s = s.mul(10).floor().div(10)

                return s
            },
            getTimeReq() {
                let completions = player.plt.fountains[3].completions
                let s = completions.pow(1.125).pow_base(1.15).mul(100)

                s = s.pow(1.0625).mul(2)

                return s
            },
            getTimeBulk() {
                let unscaledBulk = player.plt.fountains[3].time.div(10).root(1.0625).log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getstatReq() {
                let completions = player.plt.fountains[3].completions
                let s = completions.pow(1.125).pow_base(1.15).mul(100)

                return s.floor()
            },
            getStatBulk() {
                let unscaledBulk = player.plt.fountains[3].time.log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.plt.fountainSpeed)

                return s
            },
        },
        4: {
            title: "Compaction",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts base compaction by +" + formatSimple(layers.plt.fountains[4].getCompletionEffect())},
            currencyLocation() { return player.plt },
            currencyInternalName: "planetarium",
            currencyDisplayName: "Planetarium",
            getCompletionEffect() {
                let completions = player.plt.fountains[4].completions

                s = completions

                return s
            },
            getTimeReq() {
                let completions = player.plt.fountains[4].completions
                let s = completions.pow(1.5).pow_base(5).mul(200)

                s = s.pow(1.0625).mul(4)

                return s
            },
            getTimeBulk() {
                let unscaledBulk = player.plt.fountains[4].time.div(10).root(1.0625).log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getstatReq() {
                let completions = player.plt.fountains[4].completions
                let s = completions.pow(1.5).pow_base(5).mul(200)

                return s.floor()
            },
            getStatBulk() {
                let unscaledBulk = player.plt.fountains[4].time.log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.plt.fountainSpeed)

                return s
            },
        },
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
                        ], {borderRight: "3px solid #de54de", width: "321.5px", height: "75px"}],
                        ["style-column", [
                            ["raw-html", () => {return "Gain Multiplier: <h3>x" + formatSimple(player.plt.planetariumMult)}, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return "Base Growth: <h3>x" + formatSimple(player.plt.planetariumBase)}, {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", () => {return "Base Compaction: <h3>^" + formatSimple(player.plt.planetariumCompaction)}, {color: "#54de54", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "321.5px", height: "75px"}],
                    ], {background: "#200040", border: "3px solid #de54de", borderTop: "0", borderRadius: "0 0 25px 25px", width: "646px", height: "75px"}],
                    ["blank", "25px"],
                ]
            },
            "Fountains": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["style-column", [
                            ["style-row", [
                                component_fountain("plt", 1, {
                                    primaryColor: "#600080",
                                    secondaryColor: "#300060",
                                    progressFrontColor: "#dea6de",
                                    progressBackColor: "#0f001f",
                                    textColor: "#ffffff",
                                    rightAdjacent: true,
                                    bottomAdjacent: true,
                                }),
                                component_fountain("plt", 2, {
                                    primaryColor: "#600080",
                                    secondaryColor: "#300060",
                                    progressFrontColor: "#dea6de",
                                    progressBackColor: "#0f001f",
                                    textColor: "#ffffff",
                                    leftAdjacent: true,
                                    bottomAdjacent: true,
                                }),
                            ]],
                            ["style-row", [
                                component_fountain("plt", 3, {
                                    primaryColor: "#600080",
                                    secondaryColor: "#300060",
                                    progressFrontColor: "#dea6de",
                                    progressBackColor: "#0f001f",
                                    textColor: "#ffffff",
                                    rightAdjacent: true,
                                    topAdjacent: true,
                                }),
                                component_fountain("plt", 4, {
                                    primaryColor: "#600080",
                                    secondaryColor: "#300060",
                                    progressFrontColor: "#dea6de",
                                    progressBackColor: "#0f001f",
                                    textColor: "#ffffff",
                                    leftAdjacent: true,
                                    topAdjacent: true,
                                }),
                            ]],
                        ], {
                            background: "#de54de",
                            width: "fit-content",
                            padding: "3px",
                            borderRadius: "31px",
                        }],
                        ["blank", "25px"],
                    ]
                    return look
                },
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