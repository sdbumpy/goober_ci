const astroReset = function (isRewarded) {
    // Rewards
    if (isRewarded) {
        player.ast.astro = player.ast.astro.add(player.ast.astroMult)
        player.ast.totalAstro = player.ast.totalAstro.add(player.ast.astroMult)
        player.ast.astroMult = new Decimal(0)
    }

    // Blacklight

    // Planetarium
    player.plt.planetarium = new Decimal(0)
    player.plt.planetariumMult = new Decimal(1)
    player.plt.planetariumBase = new Decimal(2.5)
    player.plt.planetariumCompaction = new Decimal(0)
    player.plt.planetariumTimer = new Decimal(10)
    player.plt.planetariumTimerReq = new Decimal(10)
    player.plt.fountainSpeed = new Decimal(1)
    for (let i = 1; i <= 4; i++) {
        player.plt.fountains[i].time = new Decimal(0)
        player.plt.fountains[i].completions = new Decimal(0)
        player.plt.fountains[i].canAddCompletion = false
        if (player.plt.fountains[i].focused) {
            player.plt.fountains[i].focused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
        if (player.plt.fountains[i].isFocused) {
            player.plt.fountains[i].isFocused = false
            player.prj.focused = player.prj.focused.sub(1)
        }
    }
    for (let i_1 = 1; i_1 <= 5; i_1++) {
        for (let i_2 = 1; i_2 <= 8; i_2++) {
            setGridData("plt", `${i_1}0${i_2}`, [
                0, // Type
            ])
        }
    }

}

addLayer("ast", {
    name: "Astrolabe",
    symbol: "AL",
    universe: "UD_C",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        astro: new Decimal(0),
        totalAstro: new Decimal(0),
        astroMult: new Decimal(1),

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
            background: "linear-gradient(45deg, #80ffff 0%, #dea6de 100%)",
            "background-origin": "border-box",
            "border-color": "#802080",
            "color": "#802080",
        };
    },
    tooltip: "Astrolabe",
    color: "#dea6de",
    update(delta) {

        // ASTRO
        player.ast.astroMult = new Decimal(0)

        // FOUNTAINS
        player.ast.fountainSpeed = player.ast.totalAstro.div(10)
        Object.keys(layers.ast.fountains).forEach(i => {
            let module = player.ast.fountains[i]
            let fountain = layers.ast.fountains[i]
            module.timeSpeed = fountain.getTimeSpeed()
            module.timeReq = fountain.getTimeReq()
            module.statReq = fountain.getstatReq()
            module.completionEffect = fountain.getCompletionEffect()

            module.pourSafety = false
            module.focusSafety = false
            let seqDivisor = Math.pow(1.4, i - 1)
            if (i > 9) seqDivisor = Math.pow(seqDivisor, 3);
            player.ast.fountains[i].focusTimerMax = new Decimal(1).mul(4).div(seqDivisor)
            if (player.ast.fountains[i].isFocused) {
                player.ast.fountains[i].focusTimer = player.ast.fountains[i].focusTimer.sub(delta)
                if (player.ast.astro.gte(module.statReq) && module.timeSpeed.gt(0)) module.time = module.time.add(module.timeSpeed.div(player.ast.totalPrisms).mul(player.ast.totalPrisms.sub(module.statReq)).mul(delta));
                if (player.ast.fountains[i].focusTimer.lte(0) && true) {
                    player.ast.fountains[i].isFocused = false
                    player.ast.fountains[i].focusTimer = player.ast.fountains[i].focusTimerMax
                    player.prj.focused = player.prj.focused.sub(1)
                }
            } else {
                player.ast.fountains[i].focusTimer = player.ast.fountains[i].focusTimerMax
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
    branches: ["plt", "bea"],
    clickables: {
        "reset": {
            title() { return "Merge your planetarium and light into astro.<br><small>Req: 1,000,000 Cosmic Score" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                astroReset(true)
            },
            style() {
                let look = {width: "532px", minHeight: "75px", border: "0", borderRadius: "25px", padding: "8px", fontSize: "12px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(45deg, #80ffff 0%, #dea6de 100%)"
                    look.outline = "3px solid #802080"
                    look.color = "#802080"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.outline = "3px solid #361e1e7f"
                    look.color = "#dfffff"
                }
                return look
            },
        },
        "fountainPour_1": createPourClickable("ast", 1, {
            primaryColor: "#802080",
            secondaryColor: "#4f1861",
            progressFrontColor: "#6fdede",
            textColor: "#dfffff",
        }),
        "fountainFocus_1": createFountainFocusClickable("ast", 1, {
            primaryColor: "#802080",
            secondaryColor: "#4f1861",
            textColor: "#dfffff",
        }),
        "fountainPour_2": createPourClickable("ast", 2, {
            primaryColor: "#802080",
            secondaryColor: "#4f1861",
            progressFrontColor: "#6fdede",
            textColor: "#dfffff",
        }),
        "fountainFocus_2": createFountainFocusClickable("ast", 2, {
            primaryColor: "#802080",
            secondaryColor: "#4f1861",
            textColor: "#dfffff",
        }),
        "fountainPour_3": createPourClickable("ast", 3, {
            primaryColor: "#802080",
            secondaryColor: "#4f1861",
            progressFrontColor: "#6fdede",
            textColor: "#dfffff",
        }),
        "fountainFocus_3": createFountainFocusClickable("ast", 3, {
            primaryColor: "#802080",
            secondaryColor: "#4f1861",
            textColor: "#dfffff",
        }),
        "fountainPour_4": createPourClickable("ast", 4, {
            primaryColor: "#802080",
            secondaryColor: "#4f1861",
            progressFrontColor: "#6fdede",
            textColor: "#dfffff",
        }),
        "fountainFocus_4": createFountainFocusClickable("ast", 4, {
            primaryColor: "#600080",
            secondaryColor: "#300060",
            textColor: "#dfffff",
        }),
    },
    bars: {},
    upgrades: {
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    fountains: {
        1: {
            title: "Planetarium II",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts planetarium gain by x" + formatSimple(layers.ast.fountains[1].getCompletionEffect())},
            currencyLocation() { return player.ast },
            currencyInternalName: "astro",
            currencyDisplayName: "Astro",
            getCompletionEffect() {
                let completions = player.ast.fountains[1].completions.pow(0.75)

                s = completions.pow_base(1.5)
                s = s.mul(10).floor().div(10)

                return s
            },
            getTimeReq() {
                let completions = player.ast.fountains[1].completions
                let s = completions.pow(1.25).pow_base(1.25)

                s = s.pow(1.0625).mul(2)

                return s
            },
            getTimeBulk() {
                let unscaledBulk = player.ast.fountains[1].time.div(10).root(1.0625).log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getstatReq() {
                let completions = player.ast.fountains[1].completions
                let s = completions.pow(1.25).pow_base(1.25)

                return s.floor()
            },
            getStatBulk() {
                let unscaledBulk = player.ast.fountains[1].time.log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.ast.fountainSpeed)

                return s
            },
        },
        2: {
            title: "Growth II",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts base growth by x" + formatSimple(layers.ast.fountains[2].getCompletionEffect(), 2)},
            currencyLocation() { return player.ast },
            currencyInternalName: "astro",
            currencyDisplayName: "Astro",
            getCompletionEffect() {
                let completions = player.ast.fountains[2].completions.pow(0.75)

                s = completions.pow_base(1.02).mul(completions.mul(0.04).add(1))
                s = s.mul(100).floor().div(100)

                return s
            },
            getTimeReq() {
                let completions = player.ast.fountains[2].completions
                let s = completions.pow(1.25).pow_base(1.75)

                s = s.pow(1.0625).mul(3)

                return s
            },
            getTimeBulk() {
                let unscaledBulk = player.ast.fountains[2].time.div(10).root(1.0625).log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getstatReq() {
                let completions = player.ast.fountains[2].completions
                let s = completions.pow(1.25).pow_base(1.75)

                return s.floor()
            },
            getStatBulk() {
                let unscaledBulk = player.ast.fountains[2].time.log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.ast.fountainSpeed)

                return s
            },
        },
        3: {
            title: "Cycles II",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts blacklight beacon ↻ by x" + formatSimple(layers.ast.fountains[3].getCompletionEffect())},
            currencyLocation() { return player.ast },
            currencyInternalName: "astro",
            currencyDisplayName: "Astro",
            getCompletionEffect() {
                let completions = player.ast.fountains[3].completions.pow(0.75)

                s = completions.pow_base(1.1).mul(completions.mul(0.25).add(1))
                s = s.mul(10).floor().div(10)

                return s
            },
            getTimeReq() {
                let completions = player.ast.fountains[3].completions
                let s = completions.pow(1.125).pow_base(1.2).mul(4)

                s = s.pow(1.0625).mul(2)

                return s
            },
            getTimeBulk() {
                let unscaledBulk = player.ast.fountains[3].time.div(10).root(1.0625).log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getstatReq() {
                let completions = player.ast.fountains[3].completions
                let s = completions.pow(1.125).pow_base(1.2).mul(4)

                return s.floor()
            },
            getStatBulk() {
                let unscaledBulk = player.ast.fountains[3].time.log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.ast.fountainSpeed)

                return s
            },
        },
        4: {
            title: "Rings II",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts ring gain by x" + formatSimple(layers.ast.fountains[4].getCompletionEffect())},
            currencyLocation() { return player.ast },
            currencyInternalName: "astro",
            currencyDisplayName: "Astro",
            getCompletionEffect() {
                let completions = player.ast.fountains[4].completions.pow(0.75)

                s = completions.pow_base(1.2).mul(completions.mul(0.5).add(1))
                s = s.mul(10).floor().div(10)

                return s
            },
            getTimeReq() {
                let completions = player.ast.fountains[4].completions
                let s = completions.pow(1.5).pow_base(1.25).mul(40)

                s = s.pow(1.0625).mul(4)

                return s
            },
            getTimeBulk() {
                let unscaledBulk = player.ast.fountains[4].time.div(10).root(1.0625).log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getstatReq() {
                let completions = player.ast.fountains[4].completions
                let s = completions.pow(1.5).pow_base(1.25).mul(40)

                return s.floor()
            },
            getStatBulk() {
                let unscaledBulk = player.ast.fountains[4].time.log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.ast.fountainSpeed)

                return s
            },
        },
    },
    microtabs: {
        stuff: {
            "Astrolabe": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["style-column", [
                            ["clickable", "reset"],
                        ], {
                            background: "linear-gradient(45deg, #80ffff 0%, #dea6de 100%)",
                            width: "fit-content",
                            padding: "9px",
                            borderRadius: "31px",
                        }],
                        ["blank", "25px"],
                        ["style-column", [
                            ["style-row", [
                                component_fountain("ast", 1, {
                                    primaryColor: "#802080",
                                    secondaryColor: "#4f1861",
                                    progressFrontColor: "#6fdede",
                                    progressBackColor: "#0f001f",
                                    textColor: "#dfffff",
                                    rightAdjacent: true,
                                    bottomAdjacent: true,
                                }),
                                component_fountain("ast", 2, {
                                    primaryColor: "#802080",
                                    secondaryColor: "#4f1861",
                                    progressFrontColor: "#6fdede",
                                    progressBackColor: "#0f001f",
                                    textColor: "#dfffff",
                                    leftAdjacent: true,
                                    bottomAdjacent: true,
                                }),
                            ]],
                            ["style-row", [
                                component_fountain("ast", 3, {
                                    primaryColor: "#802080",
                                    secondaryColor: "#4f1861",
                                    progressFrontColor: "#6fdede",
                                    progressBackColor: "#0f001f",
                                    textColor: "#dfffff",
                                    rightAdjacent: true,
                                    topAdjacent: true,
                                }),
                                component_fountain("ast", 4, {
                                    primaryColor: "#802080",
                                    secondaryColor: "#4f1861",
                                    progressFrontColor: "#6fdede",
                                    progressBackColor: "#0f001f",
                                    textColor: "#dfffff",
                                    leftAdjacent: true,
                                    topAdjacent: true,
                                }),
                            ]],
                        ], {
                            background: "linear-gradient(45deg, #80ffff 0%, #dea6de 100%)",
                            width: "fit-content",
                            padding: "3px",
                            borderRadius: "31px",
                        }],
                        ["blank", "25px"],
                    ]
                    return look
                }
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + formatSimple(player.plt.planetarium) + "</h3> planetarium." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["raw-html", () => { return "Your cosmic score is <h3>" + "0" + "</h3>." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["row", [
            ["raw-html", () => { return "You have <h3>" + formatSimple(player.ast.astro) + "</h3> astro." }, {color: "#dea6de", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + formatSimple(player.ast.astroMult) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (false) {look.color = "#dea6de"} else {look.color = "gray"}
                return look
            }],
        ]],["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true}
})