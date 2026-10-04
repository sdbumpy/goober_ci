addLayer("bum", {
    name: "Bumpy",
    symbol: "BU",
    universe: "UD",
    row: 2,
    position: 0,
    startData() { return {
        unlocked: true,

        starshines: new Decimal(0),
        starshinesToGet: new Decimal(0),
        totalStarshines: new Decimal(0),
        bestLight: new Decimal(0),

        starlight: new Decimal(0),
        starlightToGet: new Decimal(0),
        totalStarlight: new Decimal(0),
        bestStarlightInOneReset: new Decimal(0),

        fountainSpeed: new Decimal(1),
        starlightToInvest: new Decimal(0),
        
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
                statInvested: new Decimal(0),
                minStatToInvest: new Decimal(1),
            },
            2: {
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
                statInvested: new Decimal(0),
                minStatToInvest: new Decimal(1),
            },
            3: {
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
                statInvested: new Decimal(0),
                minStatToInvest: new Decimal(1),
            },
            4: {
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
                statInvested: new Decimal(0),
                minStatToInvest: new Decimal(1),
            },
            5: {
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
                statInvested: new Decimal(0),
                minStatToInvest: new Decimal(1),
            },
            6: {
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
                statInvested: new Decimal(0),
                minStatToInvest: new Decimal(1),
            },
        },

        upgrade13Condition: false,
        upgrade14Condition: false,
        upgrade21Condition: false,
        upgrade22Condition: false,
        upgrade23Condition: false,
        upgrade24Condition: false,
        upgrade31Condition: false,
        upgrade32Condition: false,
        upgrade33Condition: false,
        upgrade34Condition: false,
        upgrade41Condition: false,
        upgrade42Condition: false,
        upgrade43Condition: false,
        upgrade44Condition: false,

    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#dfffdf",
            background: "#401d40",
            "background-origin": "border-box",
            "border-color": "#dfffdf",
        };
    },
    tooltip: "Bumpy",
    color: "#dfffdf",
    update(delta) {

        // UPGRADE CONDITIONS
        if (!player.prj.upgrade13Condition && player.wel.bestLight.gte(1e100)) player.prj.upgrade13Condition = true;
        if (!player.prj.upgrade14Condition && player.prj.projectSpeed.gte(1.2e5)) player.prj.upgrade14Condition = true;
        if (!player.prj.upgrade21Condition && player.bum.bestStarlightInOneReset.gte(400)) player.prj.upgrade21Condition = true;
        if (!player.prj.upgrade22Condition && player.blu.totalBlueshifts.add(player.blu.extraBlueshifts).gte(20)) player.prj.upgrade22Condition = true;
        if (!player.prj.upgrade23Condition && player.au2.stars.gte(1e40)) player.prj.upgrade23Condition = true;
        if (!player.prj.upgrade24Condition && player.pri.fountains[12].completions.gte(1)) player.prj.upgrade24Condition = true;
        if (!player.prj.upgrade33Condition && player.tw.twigs.gte(1e15)) player.prj.upgrade33Condition = true;

        // STARLIGHT
        player.bum.starlightToGet = player.wel.light.add(1).log(10).sub(90).div(8).pow_base(2)
        if (hasMilestone("prj", 213)) player.bum.starlightToGet = player.bum.starlightToGet.mul(2)
        //if (hasAchievement("achievements", 1221)) player.bum.starlightToGet = player.bum.starlightToGet.mul(1.2)
        player.bum.starlightToGet = player.bum.starlightToGet.mul(3).floor()

        if (player.bum.starshines.lte(0)) player.bum.starlightToGet = player.bum.starlightToGet.min(3);

        // STARSHINES
        player.bum.starshinesToGet = new Decimal(1)
        
        // STARLIGHT INVESTMENT
        if (player.bum.starlightToInvest.lt(0)) player.bum.starlightToInvest = new Decimal(0)
        if (player.bum.starlightToInvest.gt(player.bum.starlight)) player.bum.starlightToInvest = player.bum.starlight

        // FOUNTAIN SPEED
        player.bum.fountainSpeed = new Decimal(1)

        // FOUNTAIN PROGRESS
        Object.keys(layers.bum.fountains).forEach(i => {
            let module = player.bum.fountains[i]
            let fountain = layers.bum.fountains[i]
            module.timeSpeed = fountain.getTimeSpeed(adder = 0)
            module.timeReq = fountain.getTimeReq()
            module.statReq = fountain.getStatReq()
            module.completionEffect = fountain.getCompletionEffect()

            module.pourSafety = false
            module.focusSafety = false
            player.bum.fountains[i].focusTimerMax = player.prj.starlightFountainFocusExtension.mul(60).div(Math.pow(2, i - 1))
            if (player.bum.fountains[i].isFocused) {
                player.bum.fountains[i].focusTimer = player.bum.fountains[i].focusTimer.sub(delta)
                if (player.bum.starlight.gte(module.statReq) && module.timeSpeed.gt(0)) module.time = module.time.add(module.timeSpeed.mul(delta));
                if (player.bum.fountains[i].focusTimer.lte(0)) {
                    player.bum.fountains[i].isFocused = false
                    player.bum.fountains[i].focusTimer = player.bum.fountains[i].focusTimerMax
                    player.prj.focused = player.prj.focused.sub(1)
                }
            } else {
                player.bum.fountains[i].focusTimer = player.bum.fountains[i].focusTimerMax
            }
            if (module.focused) {
                module.time = module.time.add(module.timeSpeed.mul(delta))
            }
            if (module.time.gte(module.timeReq)) {
                /*
                    if (module.focused) {
                        player.prj.focused = player.prj.focused.sub(1);
                        module.focused = false
                    }
                */
                module.completions = module.completions.add(1)
                module.time = new Decimal(0)
            }
        });

        // UPGRADE EFFECTS

    },
    starlightReset(isRewarded) {
        if (isRewarded) {
            player.bum.starlight = player.bum.starlight.add(player.bum.starlightToGet)
            player.bum.totalStarlight = player.bum.totalStarlight.add(player.bum.starlightToGet)
            player.bum.starshines = player.bum.starshines.add(player.bum.starshinesToGet)
            if (!hasAchievement("achievements", 1217)) completeAchievement("achievements", 1217);
            player.bum.bestStarlightInOneReset = player.bum.bestStarlightInOneReset.max(player.bum.starlightToGet)
        }

        clickClickable("prj", "projects_respecFocus")
        clickClickable("wel", "lightWells_respecFocus")
        clickClickable("wel", "lightFountains_respecFocus")
        clickClickable("pri", "prismFountains_respecFocus")
        
        layers.blu.blueshiftReset(false)

        player.wel.upgrades = []
        player.wel.upgrades.push(11)
        player.wel.upgrades.push(21)
        player.wel.upgrades.push(24)
        player.wel.upgrades.push(33)
        player.wel.upgrades.push(34)
        player.wel.upgrades.push(44)

        Object.keys(player.blu.blueshifts).forEach(i => {
            let module = player.blu.blueshifts[i]
            module.amount = new Decimal(0)
            module.cycleGainMul = new Decimal(1)
            module.cycleSpeedRoot = new Decimal(1)
        });
        player.blu.totalBlueshifts = new Decimal(0)
        player.blu.blueshiftEffect = new Decimal(1)
        player.blu.blueshiftEffect2 = new Decimal(1)
        player.blu.blueshiftEffect3 = new Decimal(1)
        player.blu.bestPrisms = new Decimal(0)

        Object.keys(player.bum.fountains).forEach(i => {
            let module = player.bum.fountains[i]
            module.completions = new Decimal(0)
            module.time = new Decimal(0)
            module.timeSpeed = new Decimal(1)
        });

        if (!hasMilestone('prj', 405)) {
            
            if (player.wel.fountains[1].focused) {
                player.wel.fountains[1].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[1].isFocused) {
                player.wel.fountains[1].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[2].focused) {
                player.wel.fountains[2].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[2].isFocused) {
                player.wel.fountains[2].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[3].focused) {
                player.wel.fountains[3].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[3].isFocused) {
                player.wel.fountains[3].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[4].focused) {
                player.wel.fountains[4].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.wel.fountains[4].isFocused) {
                player.wel.fountains[4].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }

            if (player.pri.fountains[1].focused) {
                player.pri.fountains[1].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.pri.fountains[1].isFocused) {
                player.pri.fountains[1].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }

            if (player.pri.fountains[2].focused) {
                player.pri.fountains[2].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.pri.fountains[2].isFocused) {
                player.pri.fountains[2].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }

            if (player.pri.fountains[3].focused) {
                player.pri.fountains[3].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.pri.fountains[3].isFocused) {
                player.pri.fountains[3].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }

            if (player.pri.fountains[4].focused) {
                player.pri.fountains[4].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.pri.fountains[4].isFocused) {
                player.pri.fountains[4].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }

            if (player.pri.fountains[5].focused) {
                player.pri.fountains[5].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.pri.fountains[5].isFocused) {
                player.pri.fountains[5].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }

            if (player.pri.fountains[6].focused) {
                player.pri.fountains[6].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.pri.fountains[6].isFocused) {
                player.pri.fountains[6].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }

            if (player.pri.fountains[7].focused) {
                player.pri.fountains[7].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.pri.fountains[7].isFocused) {
                player.pri.fountains[7].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }

            if (player.pri.fountains[8].focused) {
                player.pri.fountains[8].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.pri.fountains[8].isFocused) {
                player.pri.fountains[8].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }

            if (player.pri.fountains[9].focused) {
                player.pri.fountains[9].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.pri.fountains[9].isFocused) {
                player.pri.fountains[9].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            
            if (player.pri.fountains[10].focused) {
                player.pri.fountains[10].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.pri.fountains[10].isFocused) {
                player.pri.fountains[10].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            
            if (player.pri.fountains[11].focused) {
                player.pri.fountains[11].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.pri.fountains[11].isFocused) {
                player.pri.fountains[11].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            
            if (player.pri.fountains[12].focused) {
                player.pri.fountains[12].focused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
            if (player.pri.fountains[12].isFocused) {
                player.pri.fountains[12].isFocused = false
                player.prj.focused = player.prj.focused.sub(1)
            }
        
        }

        /*

        player.prj.projectSpeed = new Decimal(1)
        player.prj.storedTimeCapsules = new Decimal(0)

        player.prj.modules[1].completions = new Decimal(0)
        player.prj.modules[2].completions = new Decimal(0)
        player.prj.modules[3].completions = new Decimal(0)

        setBuyableAmount("prj", 11, new Decimal(0))

        // TIME CAPSULES
        for (let i = 0; i < 13; i++) {
            let index = player.prj.milestones.indexOf(String(i + 101))
            if (index > -1) player.prj.milestones.splice(index, 1)
        }
        // PRISMATIC
        for (let i = 0; i < 10; i++) {
            let index = player.prj.milestones.indexOf(String(i + 201))
            if (index > -1) player.prj.milestones.splice(index, 1)
        }
        // BLUESHIFT
        for (let i = 0; i < 5; i++) {
            let index = player.prj.milestones.indexOf(String(i + 301))
            if (index > -1) player.prj.milestones.splice(index, 1)
        }
        
            */

    },
    branches: ["prj"],
    clickables: {
        "starshineReset": {
            title() { return "<h2>Focus your light into starlight.</h2><br>Req: 1e90 Light" },
            canClick() { return player.wel.light.gte(1e90)},
            unlocked() { return true },
            onClick() {
                layers.bum.starlightReset(true)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "10px", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "2px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "2px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                return look
            },
        },
        "invest_1": {
            title() { return "<h2>1%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.bum.starlightToInvest = player.bum.starlight.mul(0.01).ceil()
            },
            style: { width: "128px", minHeight: "40px", margin: "3px", borderRadius: "15px", color: "#000000", borderRadius: "0 0 0 22px", border: "3px solid #4d394d7f"},
        },
        "invest_10": {
            title() { return "<h2>10%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.bum.starlightToInvest = player.bum.starlight.mul(0.1).ceil()
            },
            style: { width: "128px", minHeight: "40px", margin: "3px", borderRadius: "15px", color: "#000000", borderRadius: "0", border: "3px solid #4d394d7f"},
        },
        "invest_50": {
            title() { return "<h2>50%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.bum.starlightToInvest = player.bum.starlight.mul(0.5).ceil()
            },
            style: { width: "128px", minHeight: "40px", margin: "3px", borderRadius: "15px", color: "#000000", borderRadius: "0", border: "3px solid #4d394d7f"},
        },
        "invest_100": {
            title() { return "<h2>100%" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.bum.starlightToInvest = player.bum.starlight
            },
            style: { width: "128px", minHeight: "40px", margin: "3px", borderRadius: "15px", color: "#000000", borderRadius: "0 0 22px 0", border: "3px solid #4d394d7f"},
        },
        "fountainPour_1": createSpecPourClickable("bum", 1, {
            primaryColor: "#806080",
            secondaryColor: "#4d394d",
            progressFrontColor: "#ffd6ff",
            textColor: "#ffffff",
        }),
        "fountainFocus_1": createFountainFocusClickable("bum", 1, {
            primaryColor: "#806080",
            secondaryColor: "#4d394d",
            textColor: "#ffffff",
        }),
        "fountainPour_2": createSpecPourClickable("bum", 2, {
            primaryColor: "#806080",
            secondaryColor: "#4d394d",
            progressFrontColor: "#ffd6ff",
            textColor: "#ffffff",
        }),
        "fountainFocus_2": createFountainFocusClickable("bum", 2, {
            primaryColor: "#806080",
            secondaryColor: "#4d394d",
            textColor: "#ffffff",
        }),
        "fountainPour_3": createSpecPourClickable("bum", 3, {
            primaryColor: "#806080",
            secondaryColor: "#4d394d",
            progressFrontColor: "#ffd6ff",
            textColor: "#ffffff",
        }),
        "fountainFocus_3": createFountainFocusClickable("bum", 3, {
            primaryColor: "#806080",
            secondaryColor: "#4d394d",
            textColor: "#ffffff",
        }),
        "starlightFountains_respecFocus": {
            title() { return "<h3>Respec Focus</h3>" },
            canClick() {
                for (let v in player.bum.fountains) {
                    if (player.bum.fountains[v].focused || player.bum.fountains[v].isFocused) return true;
                }
                return false
            },
            unlocked() { return true },
            onClick() {
                Object.keys(player.bum.fountains).forEach(i => {
                    if (player.bum.fountains[i].focused) {
                        player.bum.fountains[i].focused = false
                        player.prj.focused = player.prj.focused.sub(1)
                    }
                    if (player.bum.fountains[i].isFocused) {
                        player.bum.fountains[i].isFocused = false
                        player.prj.focused = player.prj.focused.sub(1)
                    }
                });
            },
            style() {
                let look = {width: "250px", minHeight: "60px", maxHeight: "60px", borderRadius: "25px", margin: "3px"}
                if (this.canClick()) {
                    look.backgroundColor = "#dfffdf"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        11: {
            title() { return "<h2>BU</h2>" },
            canClick() { return false},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "10px 10px 0 0", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "3px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                look.borderBottom = "0"
                return look
            },
        },
        12: {
            title() { return "<h2>??</h2>" },
            canClick() { return false},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "10px 10px 0 0", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "3px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                look.borderBottom = "0"
                return look
            },
        },
        13: {
            title() { return "<h2>??</h2>" },
            canClick() { return false},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "10px 10px 0 0", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "3px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                look.borderBottom = "0"
                return look
            },
        },
        14: {
            title() { return "<h2>??</h2>" },
            canClick() { return false},
            unlocked() { return true },
            onClick() {
            },
            style() {
                let look = {width: "75px", minHeight: "50px", borderRadius: "10px 10px 0 0", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(180deg, #994d86 -25%, #dfffdf 125%)"
                    look.border = "3px solid #361e1e"
                    look.color = "#361e1e"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #dfffdf"
                    look.color = "#dfffdf"
                }
                look.borderBottom = "0"
                return look
            },
        },
    },
    bars: {},
    upgrades: {
        11: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Pyramid fountain focus no longer expires on rows 1 through 4.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: Nothing</h3>"
                }
                return s
            },
            cost: new Decimal(2),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return this.condition() },
            style() {
                let look = {width: "200px", borderRadius: "25px 0 0 0", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        12: {
            unlocked() { return true },
            condition() { return true },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Start blueshifts with your best prisms this starshine ^0.25.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: Nothing</h3>"
                }
                return s
            },
            cost: new Decimal(2),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        13: {
            unlocked() { return hasUpgrade("bum", 11) && hasUpgrade("bum", 12) },
            condition() { return player.prj.upgrade13Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Extend fragmentation content.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 1e100 Light</h3>"
                }
                return s
            },
            cost: new Decimal(12),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() {
                return this.condition()
            },
            onPurchase() {
                if (!hasAchievement("achievements", 1217)) completeAchievement("achievements", 1217);
            },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
            onPurchase() {
                if (!hasAchievement("achievements", 1219)) completeAchievement("achievements", 1219);
            },
        },
        14: {
            unlocked() { return hasUpgrade("bum", 11) && hasUpgrade("bum", 12) },
            condition() { return player.prj.upgrade14Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Improve the third blueshift effect by ^1.5.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 120,000 Project Speed.</h3>"
                }
                return s
            },
            cost: new Decimal(48),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() {
                return this.condition()
            },
            style() {
                let look = {width: "200px", borderRadius: "0 25px 0 0", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        21: {
            unlocked() { return hasUpgrade("bum", 14) },
            condition() { return player.prj.upgrade21Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Multiply light gain by 10% of your starlight.<br>(x" + formatSimple(player.bum.starlight.mul(0.1).add(1)) + ")</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: Gain 400 Starlight in one reset</h3>"
                }
                return s
            },
            cost: new Decimal(401), // someone is going to hate me for this
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return this.condition() },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        22: {
            unlocked() { return hasUpgrade("bum", 14) },
            condition() { return player.prj.upgrade22Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Dectuple starlight fountain speed.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 20 effective Blueshifts</h3>"
                }
                return s
            },
            cost: new Decimal(1e3),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return this.condition() },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        23: {
            unlocked() { return hasUpgrade("bum", 21) && hasUpgrade("bum", 22) },
            condition() { return player.prj.upgrade23Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock a new iridite upgrade.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 1e40 Stars</h3>"
                }
                return s
            },
            cost: new Decimal(4e3),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return this.condition() },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        24: {
            unlocked() { return hasUpgrade("bum", 21) && hasUpgrade("bum", 22) },
            condition() { return player.prj.upgrade24Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock research projects.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 1 Star ↻</h3>"
                }
                return s
            },
            cost: new Decimal(1e5),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return this.condition() },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        31: {
            unlocked() { return hasMilestone("prj", 405) },
            condition() { return player.prj.upgrade31Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Improve the Arrow effect.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 4 Star Research I ↻</h3>"
                }
                return s
            },
            cost: new Decimal(2.5e5),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return this.condition() },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        32: {
            unlocked() { return hasMilestone("prj", 405) },
            condition() { return player.prj.upgrade32Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Improve the Spiral effect.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 8 Star Research II ↻</h3>"
                }
                return s
            },
            cost: new Decimal(1e6),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return this.condition() },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        33: {
            unlocked() { return hasMilestone("prj", 405) },
            condition() { return player.prj.upgrade33Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Extend greenhouse content.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 1e15 Twigs</h3>"
                }
                return s
            },
            cost: new Decimal(4e6),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return this.condition() },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        34: {
            unlocked() { return hasMilestone("prj", 406) },
            condition() { return player.prj.upgrade34Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock more light fountains. Starshines no longer reset project content.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 1,000 ε ↻</h3>"
                }
                return s
            },
            cost: new Decimal(1e7),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return this.condition() },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        41: {
            unlocked() { return hasUpgrade("bum", 34) },
            condition() { return player.prj.upgrade41Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Double prism well speed and ↻ gain.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 32 non-free Blueshifts</h3>"
                }
                return s
            },
            cost: new Decimal(1e10),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return this.condition() },
            style() {
                let look = {width: "200px", borderRadius: "0 0 0 25px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        42: {
            unlocked() { return hasUpgrade("bum", 34) },
            condition() { return player.prj.upgrade42Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Reduce pyramid fountain requirements by /1,000.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 36 non-free Blueshifts</h3>"
                }
                return s
            },
            cost: new Decimal(1e12),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return this.condition() },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        43: {
            unlocked() { return hasUpgrade("bum", 34) },
            condition() { return player.prj.upgrade43Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock the final challenge.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 40 non-free Blueshifts</h3>"
                }
                return s
            },
            cost: new Decimal(1.4e14),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return this.condition() },
            style() {
                let look = {width: "200px", borderRadius: "0px", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
        44: {
            unlocked() { return hasUpgrade("bum", 43) },
            condition() { return player.prj.upgrade44Condition },
            fullDisplay() {
                let s = "<h2>"
                if (hasUpgrade(this.layer, this.id) || this.condition()) {
                    s += "Unlock the fifth project.</h2><br><br><h3>Cost: " + formatWhole(this.cost) + " " + this.currencyDisplayName + "</h3>"
                } else {
                    s += "???</h2><br><h3>Req: 60 total Project ↻</h3>"
                }
                return s
            },
            cost: new Decimal(1e16),
            currencyLocation() { return player.bum },
            currencyDisplayName: "Starlight",
            currencyInternalName: "starlight",
            canAfford() { return this.condition() },
            style() {
                let look = {width: "200px", borderRadius: "0 0 25px 0", border: "3px solid #0000007f", color: "#000000df", padding: "8px", margin: "3px"}
                if (hasUpgrade(this.layer, this.id)) {
                    look.backgroundColor = "#806080"
                    look.border = "3px solid #4d394d"
                } else if (!this.condition()) {
                    look.backgroundColor = "black"
                    look.border = "3px solid #663737"
                    look.color = "white"
                } else if (this.currencyLocation()[this.currencyInternalName].gte(this.cost)) {
                    look.backgroundColor = "#dfffdf"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #663737"
                    look.color = "white"
                }
                return look
            },
        },
    },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    fountains: {
        1: {
            title: "Ultraviolet Fountain",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts light gain by x" + formatSimple(layers.bum.fountains[1].getCompletionEffect(), 2) + ", based on project speed"},
            currencyLocation() { return player.bum },
            currencyInternalName: "starlight",
            currencyInvestInternalName: "starlightToInvest",
            currencyDisplayName: "Starlight",
            getCompletionEffect() {
                let completions = player.bum.fountains[1].completions

                s = player.prj.projectSpeed.add(1).log(10).add(1).pow(0.5).sub(1).pow_base(10).pow(completions.pow(0.5).mul(0.3333))

                return s
            },
            getTimeReq() {
                let completions = player.bum.fountains[1].completions
                let s = new Decimal(60)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(1.05))

                return s
            },
            getStatReq() {
                let completions = player.bum.fountains[1].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                return s.floor()
            },
            getTimeSpeed(adder = 0) {
                let s = new Decimal(1)

                s = s.mul(player.bum.fountains[1].statInvested.add(adder).pow(2))
                if (hasUpgrade("bum", 22)) s = s.mul(10);
                s = s.mul(player.pri.fountains[12].completionEffect)

                return s
            },
        },
        2: {
            title: "Faded Green Fountain",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts focus cap by +" + formatSimple(layers.bum.fountains[2].getCompletionEffect(), 2) + ", project speed by x" + formatSimple((player.bum.fountains[2].completions.pow(0.75)).pow_base(1.1), 2)},
            currencyLocation() { return player.bum },
            currencyInternalName: "starlight",
            currencyInvestInternalName: "starlightToInvest",
            currencyDisplayName: "Starlight",
            getCompletionEffect() {
                return player.bum.fountains[2].completions.pow(0.5).floor()
            },
            getTimeReq() {
                let completions = player.bum.fountains[2].completions
                let s = new Decimal(60)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(1.5))

                return s
            },
            getStatReq() {
                let completions = player.bum.fountains[2].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                s = s.mul(2)

                return s.floor()
            },
            getTimeSpeed(adder = 0) {
                let s = new Decimal(1)

                s = s.mul(player.bum.fountains[2].statInvested.add(adder).pow(2))
                if (hasUpgrade("bum", 22)) s = s.mul(10);
                s = s.mul(player.pri.fountains[12].completionEffect)

                return s
            },
        },
        3: {
            title: "Vivid Blue Fountain",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts effective blueshifts by +" + formatSimple(layers.bum.fountains[3].getCompletionEffect())},
            currencyLocation() { return player.bum },
            currencyInternalName: "starlight",
            currencyInvestInternalName: "starlightToInvest",
            currencyDisplayName: "Starlight",
            getCompletionEffect() {
                return player.bum.fountains[3].completions.mul(0.2)
            },
            getTimeReq() {
                let completions = player.bum.fountains[3].completions
                let s = new Decimal(60)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(1.3))

                return s
            },
            getStatReq() {
                let completions = player.bum.fountains[3].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                s = s.mul(100)

                return s.floor()
            },
            getTimeSpeed(adder = 0) {
                let s = new Decimal(1)

                s = s.mul(player.bum.fountains[3].statInvested.add(adder).pow(2))
                if (hasUpgrade("bum", 22)) s = s.mul(10);
                s = s.mul(player.pri.fountains[12].completionEffect)

                return s
            },
        },
        4: {
            title: "Brilliant Cyan Fountain",
            completionEffectPrefix: "x",
            completionEffectStat: "Light Well Speed",
            condition() {
                return true
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                return player.bum.fountains[4].completions.pow(0.5).pow_base(1.5)
            },
            getTimeReq() {
                let completions = player.bum.fountains[4].completions
                let s = new Decimal(3)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(2))
                if (completions.gte(10)) {
                    s = s.pow(10)
                }

                return s
            },
            getStatReq() {
                let completions = player.bum.fountains[4].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                s = s.mul(1e4)

                return s.floor()
            },
            getTimeSpeed(adder = 0) {
                let s = new Decimal(1)

                s = s.mul(player.bum.fountains[4].statInvested.add(adder).pow(2))
                if (hasUpgrade("bum", 22)) s = s.mul(10);
                s = s.mul(player.pri.fountains[12].completionEffect)

                return s
            },
        },
        5: {
            title: "Hot Pink Fountain",
            completionEffectPrefix: "x",
            completionEffectStat: "Project Speed",
            condition() {
                return true
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                return player.bum.fountains[5].completions.pow(0.5).pow_base(1.5)
            },
            getTimeReq() {
                let completions = player.bum.fountains[5].completions
                let s = new Decimal(3)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(2))
                if (completions.gte(10)) {
                    s = s.pow(10)
                }

                return s
            },
            getStatReq() {
                let completions = player.bum.fountains[5].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                s = s.mul(1e6)

                return s.floor()
            },
            getTimeSpeed(adder = 0) {
                let s = new Decimal(1)

                s = s.mul(player.bum.fountains[5].statInvested.add(adder).pow(2))
                if (hasUpgrade("bum", 22)) s = s.mul(10);
                s = s.mul(player.pri.fountains[12].completionEffect)

                return s
            },
        },
        6: {
            title: "Prismatic Cyan Fountain",
            completionEffectPrefix: "x",
            completionEffectStat: "Prism Well Speed",
            condition() {
                return true
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                return player.bum.fountains[5].completions.pow(0.5).pow_base(1.5)
            },
            getTimeReq() {
                let completions = player.bum.fountains[5].completions
                let s = new Decimal(3)

                s = s.mul(completions.add(1))
                s = s.mul(completions.pow_base(2))
                if (completions.gte(10)) {
                    s = s.pow(10)
                }

                return s
            },
            getStatReq() {
                let completions = player.bum.fountains[5].completions
                let s = completions.div(4).add(1).pow(1.25)
                
                if (completions.gte(20)) {
                    s = s.mul(completions.sub(20).pow_base(1.1))
                }

                s = s.mul(1e8)

                return s.floor()
            },
            getTimeSpeed(adder = 0) {
                let s = new Decimal(1)

                s = s.mul(player.bum.fountains[6].statInvested.add(adder).pow(2))
                if (hasUpgrade("bum", 22)) s = s.mul(10);
                s = s.mul(player.pri.fountains[12].completionEffect)

                return s
            },
        },
    },
    microtabs: {
        stuff: {
            "Upgrades": {
                buttonStyle() { return { color: "white", borderWidth: "2px", borderRadius: "20px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["row", [
                            ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], 
                        ]],
                        ["row", [
                            ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24],
                        ]],
                        ["row", [
                            ["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34],
                        ]],
                        ["row", [
                            ["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44],
                        ]],
                        ["blank", "25px"],
                        ["style-row", [

                        ]],
                        ["blank", "25px"],
                    ]
                    return look
                },
            },
            "Journal": {
                buttonStyle() { return { color: "white", borderWidth: "2px", borderRadius: "20px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["style-row", [
                            ["style-row", [
                                ["clickable", 11],
                                ["blank", "0", {width: "18px"}],
                                ["clickable", 12],
                                ["blank", "0", {width: "18px"}],
                                ["clickable", 13],
                                ["blank", "0", {width: "18px"}],
                                ["clickable", 14],
                            ] ,{width: "400px"}],
                            ["style-row", [

                            ] ,{width: "6px"}],
                            ["style-row", [

                            ] ,{width: "400px"}],
                        ]],
                        ["style-column", [
                            ["style-row", [
                                ["style-column", [
                                    
                                ], {background: "#180b18", width: "400px", height: "600px", borderRadius: "4px 0 0 4px", margin: "3px"}],
                                ["top-column", [
                                    ["blank", "12px"],
                                    ["raw-html", 
                                    "Entry BU-01:"
                                    , {color: "#dfffdfbf", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", 
                                    "Interspace</small>"
                                    , {color: "#dfffdf", fontSize: "24px", fontFamily: "monospace"}],
                                    ["style-column", [
                                        ["raw-html",
                                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                        , {color: "#dfffdfbf", fontSize: "16px", fontFamily: "monospace", textAlign: "justify", display: "inline-flex"}],
                                    ], {margin: "12px"}],
                                ], {background: "#180b18", width: "400px", height: "600px", borderRadius: "0 4px 4px 0", margin: "3px"}],
                            ], {background: "#180b187f", borderRadius: "7px 7px 0 0"}],
                            ["style-row", [
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 0 4px", margin: "3px", marginTop: "0"}],
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 4px 0", margin: "3px", marginTop: "0"}],
                            ], {background: "#180b187f", borderRadius: "0"}],
                            ["style-row", [
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 0 4px", margin: "3px", marginTop: "0"}],
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 4px 0", margin: "3px", marginTop: "0"}],
                            ], {background: "#180b187f", borderRadius: "0"}],
                            ["style-row", [
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 0 4px", margin: "3px", marginTop: "0"}],
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 4px 0", margin: "3px", marginTop: "0"}],
                            ], {background: "#180b187f", borderRadius: "0"}],
                            ["style-row", [
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 0 4px", margin: "3px", marginTop: "0"}],
                                ["style-row", [], {background: "#180b18", width: "400px", height: "10px", borderRadius: "0 0 4px 0", margin: "3px", marginTop: "0"}],
                            ], {background: "#180b187f", borderRadius: "0 0 7px 7px"}],
                        ], {background: "#dfffdf", border: "3px solid #dfffdf", borderRadius: "10px"}],
                        ["blank", "25px"],
                    ]
                    return look
                }
            },
            "Fountains": {
                buttonStyle() { return { color: "white", borderWidth: "2px", borderRadius: "20px"} },
                unlocked() { return hasUpgrade("bum", 11) || hasUpgrade("bum", 12) },
                content() {
                    let look = [
                        ["blank", "25px"],
                        ["raw-html", "You are using " + formatWhole(player.prj.focused) + "/" + formatWhole(player.prj.maxFocused) + " focus.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["blank", "12px"],
                        ["style-column", [
                            ["blank", "3px"],
                            ["style-column", [
                                ["raw-html", "Starlight to convert to power:", {color: "#ffffff", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", formatSimple(player.bum.starlightToInvest), {color: "#ffffff", fontSize: "24px", fontFamily: "monospace"}],
                            ], {background: "#332633", borderRadius: "70px 70px 0 0", width: "530px", height: "70px"}],
                            ["blank", "6px"],
                            ["text-input", "starlightToInvest", {width: "512px", height: "34px", backgroundColor: "#000000", color: "#ffffff", fontSize: "28px", textAlign: "left", padding: "0 6px", borderRadius: "0 0 0 0", border: "3px solid #4d394d7f",}],
                            ["blank", "3px"],
                            ["style-row", [
                                ["clickable", "invest_1"],
                                ["clickable", "invest_10"],
                                ["clickable", "invest_50"],
                                ["clickable", "invest_100"],
                            ], {}],
                        ], {background: "#4d394d", borderRadius: "73px 73px 25px 25px", padding: "3px", width: "536px", height: "166px"}],
                        ["blank", "9px"],
                        ["style-row", [
                            component_specFountain("bum", 1, {
                                primaryColor: "#806080",
                                secondaryColor: "#4d394d",
                                progressFrontColor: "#ffd6ff",
                                progressBackColor: "#332633",
                                textColor: "#ffffff",
                                rightAdjacent: true,
                                bottomAdjacent: false,
                            }),
                            component_specFountain("bum", 3, {
                                primaryColor: "#806080",
                                secondaryColor: "#4d394d",
                                progressFrontColor: "#ffd6ff",
                                progressBackColor: "#332633",
                                textColor: "#ffffff",
                                rightAdjacent: true,
                                bottomAdjacent: false,
                                leftAdjacent: true,
                            }),
                            component_specFountain("bum", 2, {
                                primaryColor: "#806080",
                                secondaryColor: "#4d394d",
                                progressFrontColor: "#ffd6ff",
                                progressBackColor: "#332633",
                                textColor: "#ffffff",
                                bottomAdjacent: false,
                                leftAdjacent: true,
                            }),
                        ]],
                        ["style-row", [
                        ]],
                        ["clickable", "starlightFountains_respecFocus"],
                        ["blank", "25px"],
                    ]
                    return look
                }
            },
        }
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + formatWhole(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["row", [
            ["raw-html", () => { return "You have <h3>" + formatWhole(player.bum.starlight) + "</h3> starlight." }, {color: "#dfffdf", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + formatWhole(player.bum.starlightToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.bum.starlightToGet.gte(3)) {look.color = "#dfffdf"} else {look.color = "gray"}
                return look
            }],
        ]],
        ["raw-html", () => {return "(" + formatSimple(player.bum.totalStarlight) + " total)"}, {color: "#dfffdf", fontSize: "18px", fontFamily: "monospace"}],
        ["blank", "15px"],
        ["raw-html", () => {return "You have starshined " + formatSimple(player.bum.starshines) + " times."}, {color: "#dfffdf", fontSize: "18px", fontFamily: "monospace"}],
        ["blank", "15px"],
        ["clickable", "starshineReset"],
        ["blank", "25px"],
        ["style-column", [
            ["raw-html", 
                "<small>Starshine resets everything blueshift does as well as blueshifts and most light upgrades. That includes stored time capsules. Maximize your starlight gain, but don't forget to ↻-up projects; they will remain important.</small>"
            , {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ], {background: "linear-gradient(90deg, transparent, #dfffdf3f, transparent)", border: "3px solid #dfffdf7f", borderRadius: "25px", padding: "12px", width: "600px"}],
        ["blank", "25px"],
        ["style-column", [
            ["microtabs", "stuff", { 'border-width': '0px' }],
        ], () => {
            return {display: player.bum.totalStarlight.gt(0) ? "" : "none !important"}
        }],
    ],
    layerShown() { return hasMilestone("prj", 401) && player.startedGame == true},
    hotkeys: [
        {
            key: "s", 
            description: "Starshine",
            onPress() {
                clickClickable(this.layer, "starshineReset")
            },
        },
	]
})

const component_specFountain = function (layer, id, data = {}) {
    if (!data.primaryColor) data.primaryColor = "#999999"
    if (!data.secondaryColor) data.secondaryColor = "#666666"
    if (!data.progressFrontColor) data.progressFrontColor = "#ffffff"
    if (!data.progressBackColor) data.progressBackColor = "#171717"
    if (!data.textColor) data.textColor = "#ffffff"
    if (!data.unaffordableTextColor) data.unaffordableTextColor = "#ffff00"
    if (!data.topAdjacent) data.topAdjacent = false
    if (!data.rightAdjacent) data.rightAdjacent = false
    if (!data.bottomAdjacent) data.bottomAdjacent = false
    if (!data.leftAdjacent) data.leftAdjacent = false

    let layerFountain = layers[layer].fountains[id]
    let playerFountain = player[layer].fountains[id]
    let container

    if (layerFountain.unlocked()) {
        if (layerFountain.condition()) {
            let currencyLocation = layerFountain.currencyLocation()
            let currency = currencyLocation[layerFountain.currencyInvestInternalName]

            let pourBarText = currency.add(playerFountain.statInvested).lte(0) ? "<span style='color:#ffff00'>Empty" : formatSimpleTime(playerFountain.timeReq.sub(playerFountain.time).div(layerFountain.getTimeSpeed(currency)), 2)
            let pourBarTextUnaffordable = "<span style='color:" + data.progressBackColor + "'>" + (currency.add(playerFountain.statInvested).lte(0) ? "Empty" : formatSimpleTime(playerFountain.timeReq.sub(playerFountain.time).div(layerFountain.getTimeSpeed(currency)), 2))
            let focusBarText = layerFountain.infiniteAuto() ? "<h2>∞" : formatSimpleTime(playerFountain.focusTimer)
            container = ["style-row", [
                ["style-column", [
                    ["style-column", [
                        ["blank", "6px"],
                        ["raw-html", layerFountain.title, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ["raw-html", , {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                        ["tooltip-row", [
                            ["raw-html", formatWhole(playerFountain.completions) + " ↻", {color: "white", fontSize: "16px", fontFamily: "monospace", lineHeight: "18px", display: "block"}],
                            ["raw-html", "<div class='bottomTooltip'>Best: " + formatShortWhole(playerFountain.bestCompletions) + " ↻</div>"],
                        ]],
                        ["blank", "6px"],
                        ["style-column", [
                            ["raw-html", formatSimple(playerFountain.statInvested, 3) + " " + layerFountain.currencyDisplayName + " Power", {color: "white", fontSize: "14px", fontFamily: "monospace"}],
                        ], {background: data.primaryColor, borderRadius: (data.leftAdjacent ? "0" : "25px") + " " + (data.rightAdjacent ? "0" : "25px") + " 0 0", width: "259px", height: "25px"}],
                        ["blank", "3px"],
                        ["style-column", [
                            ["style-row", [
                                ["hoverless-clickable", "fountainPour_" + id],
                                ["blank", "3px", {width: "3px"}],
                                ["tooltip-row", [
                                    ["style-column", [
                                        ["style-column", [
                                            ["left-row", [
                                                ["left-row", [
                                                ], {background: data.progressFrontColor, borderRadius: "0", width: (playerFountain.time.div(playerFountain.timeReq).min(1).max(0).mul(175).toNumber()) + "px", height: "24px", marginLeft: "3px"}],
                                            ], {background: data.progressBackColor, borderRadius: "0", width: "181px", height: "30px"}],
                                        ], {width: "181px", height: "0"}],
                                        ["style-column", [
                                            ["left-row", [
                                            ], {border: "3px solid " + data.primaryColor, borderRadius: "0", width: "175px", height: "24px"}],
                                        ], {width: "181px", height: "0"}],
                                        ["left-row", [
                                            ["style-row", [
                                                ["raw-html", pourBarText, {color: data.progressFrontColor, fontSize: "16px", fontFamily: "monospace", lineHeight: "18px", display: "block", marginLeft: "3px"}],
                                            ], {width: "175px"}],
                                        ], {width: "175px", height: "0"}],
                                        ["left-row", [
                                            ["left-row", [
                                                ["style-row", [
                                                    ["raw-html", pourBarTextUnaffordable, {color: data.progressBackColor, fontSize: "16px", fontFamily: "monospace", lineHeight: "18px", display: "block", marginLeft: "3px"}],
                                                ], {width: "175px"}],
                                            ], {width: (playerFountain.time.div(playerFountain.timeReq).min(1).max(0).mul(175).toNumber()) + "px", overflow: "hidden"}],
                                        ], {width: "175px", height: "0"}],
                                    ], {height: "30px"}],
                                    ["raw-html", "<div class='bottomTooltip'>" + (playerFountain.focused ? "/ " + formatSimpleTime(playerFountain.timeReq.div(playerFountain.timeSpeed), 2) + "<br>" : "") + "<small>(" + format(playerFountain.time, 1) + " / " + format(playerFountain.timeReq, 1) + ")</div>"],
                                ]],
                            ]],
                            ["style-row", [
                                ["blank", "3px", {width: "3px"}],
                            ], {display: layerFountain.canAuto() ? "" : "none !important"}],
                            ["style-row", [
                                ["hoverless-clickable", "fountainFocus_" + id],
                                ["blank", "3px", {width: "3px"}],
                                ["style-column", [
                                    ["style-column", [
                                        ["left-row", [
                                            ["left-row", [
                                            ], {background: "#dfffdf", borderRadius: "0", width: (layerFountain.infiniteAuto() ? "175" : playerFountain.focusTimer.div(playerFountain.focusTimerMax).min(1).max(0).mul(175)) + "px", height: "24px", marginLeft: "3px"}],
                                        ], {background: data.progressBackColor, borderRadius: "0", width: "181px", height: "30px"}],
                                    ], {width: "181px", height: "0"}],
                                    ["style-column", [
                                        ["left-row", [
                                        ], {border: "3px solid " + data.primaryColor, borderRadius: "0", width: "175px", height: "24px"}],
                                    ], {width: "181px", height: "0"}],
                                    ["left-row", [
                                        ["style-row", [
                                            ["raw-html", focusBarText, {color: "#dfffdf", fontSize: "16px", fontFamily: "monospace", lineHeight: "18px", display: "block", marginLeft: "3px"}],
                                        ], {width: "175px"}],
                                    ], {width: "175px", height: "0"}],
                                    ["left-row", [
                                        ["left-row", [
                                            ["style-row", [
                                                ["raw-html", focusBarText, {color: data.progressBackColor, fontSize: "16px", fontFamily: "monospace", lineHeight: "18px", display: "block", marginLeft: "3px"}],
                                            ], {width: "175px"}],
                                        ], {width: (layerFountain.infiniteAuto() ? "175" : playerFountain.focusTimer.div(playerFountain.focusTimerMax).min(1).max(0).mul(175).toNumber()) + "px", overflow: "hidden"}],
                                    ], {width: "175px", height: "0"}],
                                ]],
                            ], {display: layerFountain.canAuto() ? "" : "none !important"}],
                        ], {}]
                    ], {background: data.secondaryColor, border: "3px solid " + data.secondaryColor, borderRadius: (data.topAdjacent || data.leftAdjacent ? "0" : "25px") + " " + (data.topAdjacent || data.rightAdjacent ? "0" : "25px") + " 0 0", width: "259px"}],
                    ["style-column", [
                        ["style-column", [
                            ["raw-html", layerFountain.effectDisplay(), {color: "white", fontSize: "14px", fontFamily: "monospace", display: "block", lineHeight: "1"}],
                        ], {background: data.secondaryColor, border: "3px solid " + data.primaryColor, borderRadius: "0 0 " + (data.bottomAdjacent || data.rightAdjacent ? "0" : "22px") + " " + (data.bottomAdjacent || data.leftAdjacent ? "0" : "22px"), width: "241px", height: "44px", paddingLeft: "6px", paddingRight: "6px"}],
                    ], {background: data.primaryColor, border: "3px solid " + data.secondaryColor, borderRadius: "0 0 " + (data.bottomAdjacent || data.rightAdjacent ? "0" : "25px") + " " + (data.bottomAdjacent || data.leftAdjacent ? "0" : "25px"), borderTop: "0", height: "50px"}],
                ], {width: "265px", margin: "3px"}]
            ]]
        } else {
            container = ["style-column", [
                ["raw-html", layerFountain.title, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                ["raw-html", "<small>Req: " + layerFountain.conditionDisplay(), {color: "white", fontSize: "16px", fontFamily: "monospace"}],
            ], {background: "black", border: "3px solid #663737", borderRadius: (data.topAdjacent || data.leftAdjacent ? "0" : "25px") + " " + (data.topAdjacent || data.rightAdjacent ? "0" : "25px") + " " + (data.bottomAdjacent || data.rightAdjacent ? "0" : "25px") + " " + (data.bottomAdjacent || data.leftAdjacent ? "0" : "25px"), height: "160px", width: "259px", margin: "3px"}]
        }
    } else {
        container = ["style-row", []]
    }
    return container
}