addLayer("bea", {
    name: "Beacons of Blacklight",
    symbol: "BE",
    universe: "UD_C",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        blacklight: new Decimal(0),
        blacklightMult: new Decimal(1),

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
            background: "linear-gradient(180deg, #d0a1ff 0%, #f0e0ff 100%)",
            "background-origin": "border-box",
            "border-color": "#572d80",
            "color": "#572d80",
        };
    },
    tooltip: "Beacons of Blacklight",
    color: "#f0ffe0",
    update(delta) {
        
        // FOUNTAINS
        player.bea.fountainSpeed = player.bea.blacklight.div(10)
        Object.keys(layers.bea.fountains).forEach(i => {
            let module = player.bea.fountains[i]
            let fountain = layers.bea.fountains[i]
            module.timeSpeed = fountain.getTimeSpeed()
            module.timeReq = fountain.getTimeReq()
            module.statReq = fountain.getstatReq()
            module.completionEffect = fountain.getCompletionEffect()

            module.pourSafety = false
            module.focusSafety = false
            let seqDivisor = Math.pow(1.4, i - 1)
            if (i > 9) seqDivisor = Math.pow(seqDivisor, 3);
            player.bea.fountains[i].focusTimerMax = new Decimal(1).mul(4).div(seqDivisor)
            if (player.bea.fountains[i].isFocused) {
                player.bea.fountains[i].focusTimer = player.bea.fountains[i].focusTimer.sub(delta)
                if (player.bea.blacklight.gte(module.statReq) && module.timeSpeed.gt(0)) module.time = module.time.add(module.timeSpeed.div(player.bea.totalPrisms).mul(player.bea.totalPrisms.sub(module.statReq)).mul(delta));
                if (player.bea.fountains[i].focusTimer.lte(0) && true) {
                    player.bea.fountains[i].isFocused = false
                    player.bea.fountains[i].focusTimer = player.bea.fountains[i].focusTimerMax
                    player.prj.focused = player.prj.focused.sub(1)
                }
            } else {
                player.bea.fountains[i].focusTimer = player.bea.fountains[i].focusTimerMax
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
        "fountainPour_1": createPourClickable("bea", 1, {
            primaryColor: "#5c3d7a",
            secondaryColor: "#332952",
            progressFrontColor: "#dea6de",
            textColor: "#ffffff",
        }),
        "fountainFocus_1": createFountainFocusClickable("bea", 1, {
            primaryColor: "#5c3d7a",
            secondaryColor: "#332952",
            textColor: "#ffffff",
        }),
        "fountainPour_2": createPourClickable("bea", 2, {
            primaryColor: "#5c3d7a",
            secondaryColor: "#332952",
            progressFrontColor: "#dea6de",
            textColor: "#ffffff",
        }),
        "fountainFocus_2": createFountainFocusClickable("bea", 2, {
            primaryColor: "#5c3d7a",
            secondaryColor: "#332952",
            textColor: "#ffffff",
        }),
        "fountainPour_3": createPourClickable("bea", 3, {
            primaryColor: "#5c3d7a",
            secondaryColor: "#332952",
            progressFrontColor: "#dea6de",
            textColor: "#ffffff",
        }),
        "fountainFocus_3": createFountainFocusClickable("bea", 3, {
            primaryColor: "#5c3d7a",
            secondaryColor: "#332952",
            textColor: "#ffffff",
        }),
        "fountainPour_4": createPourClickable("bea", 4, {
            primaryColor: "#5c3d7a",
            secondaryColor: "#332952",
            progressFrontColor: "#dea6de",
            textColor: "#ffffff",
        }),
        "fountainFocus_4": createFountainFocusClickable("bea", 4, {
            primaryColor: "#5c3d7a",
            secondaryColor: "#332952",
            textColor: "#ffffff",
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
            title: "Light",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts blacklight gain by x" + formatSimple(layers.bea.fountains[1].getCompletionEffect())},
            currencyLocation() { return player.bea },
            currencyInternalName: "blacklight",
            currencyDisplayName: "Blacklight",
            getCompletionEffect() {
                let completions = player.bea.fountains[1].completions.pow(0.75)

                s = completions.pow_base(1.5)
                s = s.mul(10).floor().div(10)

                return s
            },
            getTimeReq() {
                let completions = player.bea.fountains[1].completions
                let s = completions.pow(1.25).pow_base(1.25).mul(4)

                s = s.pow(1.0625).mul(2)

                return s
            },
            getTimeBulk() {
                let unscaledBulk = player.bea.fountains[1].time.div(10).root(1.0625).log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getstatReq() {
                let completions = player.bea.fountains[1].completions
                let s = completions.pow(1.25).pow_base(1.25).mul(4)

                return s.floor()
            },
            getStatBulk() {
                let unscaledBulk = player.bea.fountains[1].time.log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.bea.fountainSpeed)

                return s
            },
        },
        2: {
            title: "Cycles",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts blacklight beacon ↻ by x" + formatSimple(layers.bea.fountains[2].getCompletionEffect())},
            currencyLocation() { return player.bea },
            currencyInternalName: "blacklight",
            currencyDisplayName: "Blacklight",
            getCompletionEffect() {
                let completions = player.bea.fountains[2].completions.pow(0.75)

                s = completions.pow_base(1.5)
                s = s.mul(10).floor().div(10)

                return s
            },
            getTimeReq() {
                let completions = player.bea.fountains[2].completions
                let s = completions.pow(1.25).pow_base(1.25).mul(40)

                s = s.pow(1.0625).mul(2)

                return s
            },
            getTimeBulk() {
                let unscaledBulk = player.bea.fountains[2].time.div(10).root(1.0625).log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getstatReq() {
                let completions = player.bea.fountains[2].completions
                let s = completions.pow(1.25).pow_base(1.25).mul(40)

                return s.floor()
            },
            getStatBulk() {
                let unscaledBulk = player.bea.fountains[2].time.log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.bea.fountainSpeed)

                return s
            },
        },
        3: {
            title: "Speed",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts blacklight beacon speed by x" + formatSimple(layers.bea.fountains[3].getCompletionEffect())},
            currencyLocation() { return player.bea },
            currencyInternalName: "blacklight",
            currencyDisplayName: "Blacklight",
            getCompletionEffect() {
                let completions = player.bea.fountains[3].completions.pow(0.75)

                s = completions.pow_base(1.5)
                s = s.mul(10).floor().div(10)

                return s
            },
            getTimeReq() {
                let completions = player.bea.fountains[3].completions
                let s = completions.pow(1.25).pow_base(1.25).mul(1e4)

                s = s.pow(1.0625).mul(2)

                return s
            },
            getTimeBulk() {
                let unscaledBulk = player.bea.fountains[3].time.div(10).root(1.0625).log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getstatReq() {
                let completions = player.bea.fountains[3].completions
                let s = completions.pow(1.25).pow_base(1.25).mul(1e4)

                return s.floor()
            },
            getStatBulk() {
                let unscaledBulk = player.bea.fountains[3].time.log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.bea.fountainSpeed)

                return s
            },
        },
        4: {
            title: "Rings",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts ring gain by x" + formatSimple(layers.bea.fountains[4].getCompletionEffect())},
            currencyLocation() { return player.bea },
            currencyInternalName: "blacklight",
            currencyDisplayName: "Blacklight",
            getCompletionEffect() {
                let completions = player.bea.fountains[4].completions.pow(0.75)

                s = completions.pow_base(1.5)
                s = s.mul(10).floor().div(10)

                return s
            },
            getTimeReq() {
                let completions = player.bea.fountains[4].completions
                let s = completions.pow(1.25).pow_base(1.25).mul(1e6)

                s = s.pow(1.0625).mul(2)

                return s
            },
            getTimeBulk() {
                let unscaledBulk = player.bea.fountains[4].time.div(10).root(1.0625).log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getstatReq() {
                let completions = player.bea.fountains[4].completions
                let s = completions.pow(1.25).pow_base(1.25).mul(1e6)

                return s.floor()
            },
            getStatBulk() {
                let unscaledBulk = player.bea.fountains[4].time.log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.bea.fountainSpeed)

                return s
            },
        },
    },
    microtabs: {
        stuff: {
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "8px"} },
                unlocked() { return true },
                content: [
                    
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
                                component_fountain("bea", 1, {
                                    primaryColor: "#5c3d7a",
                                    secondaryColor: "#332952",
                                    progressFrontColor: "#f0ffe0",
                                    progressBackColor: "#0f001f",
                                    textColor: "#ffffff",
                                    rightAdjacent: true,
                                    bottomAdjacent: true,
                                }),
                                component_fountain("bea", 2, {
                                    primaryColor: "#5c3d7a",
                                    secondaryColor: "#332952",
                                    progressFrontColor: "#f0ffe0",
                                    progressBackColor: "#0f001f",
                                    textColor: "#ffffff",
                                    leftAdjacent: true,
                                    bottomAdjacent: true,
                                }),
                            ]],
                            ["style-row", [
                                component_fountain("bea", 3, {
                                    primaryColor: "#5c3d7a",
                                    secondaryColor: "#332952",
                                    progressFrontColor: "#f0ffe0",
                                    progressBackColor: "#0f001f",
                                    textColor: "#ffffff",
                                    rightAdjacent: true,
                                    topAdjacent: true,
                                }),
                                component_fountain("bea", 4, {
                                    primaryColor: "#5c3d7a",
                                    secondaryColor: "#332952",
                                    progressFrontColor: "#f0ffe0",
                                    progressBackColor: "#0f001f",
                                    textColor: "#ffffff",
                                    leftAdjacent: true,
                                    topAdjacent: true,
                                }),
                            ]],
                        ], {
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
        ["raw-html", "You have <h3>" + "0" + "</h3> blacklight.", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true}
})