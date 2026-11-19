/*
    NOTE:
        * Prism well data is stored in `player.wel` / initialized in `Interspace/well.js`
        * Prism well clickables are stored in this layer / initialized in this file
*/

addLayer("pri", {
    name: "Prismatic",
    symbol: "PR",
    universe: "UD",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        prisms: new Decimal(0),
        bestPrisms: new Decimal(0),
        totalPrisms: new Decimal(0),
        prismsToGet: new Decimal(0),
        bestPrismsInOneReset: new Decimal(0),

        autoPrismaticToggle: false,
        autoPrismaticInput: new Decimal(0),
        autoPrismaticAmount: new Decimal(1),
        autoPrismaticType: false, // False: Amount ; True: Time
        autoPrismaticTime: new Decimal(0),
        prismaticResetTime: new Decimal(0),

        fountainSpeed: new Decimal(0),
        totalFountainCycles: new Decimal(0),

        prismFountainReqDivisor: new Decimal(1),

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
                timeReq: new Decimal(1e8),
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
            5: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
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
            6: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
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
            7: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
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
            8: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
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
            9: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
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
            10: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
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
            11: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
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
            12: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
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
            13: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
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
            14: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
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
            15: {
                time: new Decimal(0),
                timeReq: new Decimal(1e8),
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

        solarRadiation: new Decimal(0),
        solarRadiationGain: new Decimal(0),

    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#335966",
            background: "linear-gradient(45deg, #ffd6d6 0%, #abffd6 33%, #d6ebff 66%, #ffabff 100%)",
            "background-origin": "border-box",
            "border-color": "#335966",
        };
    },
    tooltip: "Prismatic",
    color: "#d6ebff",
    update(delta) {

        // Auto-prismatic functionality
        if (player.pri.prismsToGet.gte(player.pri.autoPrismaticAmount) && player.pri.autoPrismaticToggle && !player.pri.autoPrismaticType && player.wel.light.gte(1e15)) {
            layers.pri.prismReset(true)
        }
        if (player.pri.autoPrismaticToggle && player.pri.autoPrismaticType) {
            player.pri.autoPrismaticTime = player.pri.autoPrismaticTime.add(delta);
            if (player.pri.autoPrismaticTime.gte(player.pri.autoPrismaticAmount) && player.wel.light.gte(1e15)) {
                player.pri.autoPrismaticTime = new Decimal(0)
                layers.pri.prismReset(true)
            }
        }

        // Set auto prismatic values
        if (player.pri.autoPrismaticInput.gte(1) && !player.pri.autoPrismaticType) player.pri.autoPrismaticAmount = player.pri.autoPrismaticInput
        if (player.pri.autoPrismaticInput.lt(1) && !player.pri.autoPrismaticType) player.pri.autoPrismaticAmount = new Decimal(1)
        if (player.pri.autoPrismaticInput.gte(0) && player.pri.autoPrismaticType) player.pri.autoPrismaticAmount = player.pri.autoPrismaticInput
        if (player.pri.autoPrismaticInput.lt(0) && player.pri.autoPrismaticType) player.pri.autoPrismaticAmount = new Decimal(1)

        let prismGainGrowth = new Decimal(1.5)
        player.pri.prismsToGet = player.wel.light.add(1).log(10).sub(15).pow_base(prismGainGrowth)
        if (!hasMilestone("prj", 202)) player.pri.prismsToGet = player.pri.prismsToGet.min(1);

        if (hasMilestone("prj", 203)) player.pri.prismsToGet = player.pri.prismsToGet.mul(2);
        player.pri.prismsToGet = player.pri.prismsToGet.mul(player.pri.fountains[8].completionEffect);
        if (player.wel.modules[3].completions.gte(1e12)) player.pri.prismsToGet = player.pri.prismsToGet.mul(player.wel.modules[4].completionEffect);
        if (hasMilestone("prj", 207)) player.pri.prismsToGet = player.pri.prismsToGet.mul(player.blu.blueshiftEffect2.max(1));
        if (hasMilestone("prj", 406)) player.pri.prismsToGet = player.pri.prismsToGet.mul(player.wel.modules[5].completionEffect);
        if (player.wel.modules[5].completions.gte(500)) player.pri.prismsToGet = player.pri.prismsToGet.mul(player.wel.modules[6].completionEffect);
        if (player.wel.modules[6].completions.gte(1e6)) player.pri.prismsToGet = player.pri.prismsToGet.mul(player.wel.modules[7].completionEffect);
        if (hasAchievement("achievements", 1214)) player.pri.prismsToGet = player.pri.prismsToGet.mul(1.2);

        player.pri.prismsToGet = player.pri.prismsToGet.mul(player.pri.prismaticResetTime.div(30).min(1))
        player.pri.prismsToGet = player.pri.prismsToGet.floor()

        if (player.pri.bestPrisms.lt(player.pri.prisms)) player.pri.bestPrisms = player.pri.prisms;
        
        player.pri.fountainSpeed = player.pri.totalPrisms.div(10)
        if (hasUpgrade("wel", 41)) player.pri.fountainSpeed = player.pri.fountainSpeed.mul(player.prj.projectSpeed.sub(1).div(100).add(1));

        // FOUNTAIN REQ DIVISOR
        player.pri.prismFountainReqDivisor = new Decimal(1)
        if (hasAchievement("achievements", 1223)) player.pri.prismFountainReqDivisor = player.pri.prismFountainReqDivisor.mul(1.25);

        // FOUNTAIN PROGRESS
        player.pri.totalFountainCycles = 0
        Object.keys(layers.pri.fountains).forEach(i => {
            let module = player.pri.fountains[i]
            player.pri.totalFountainCycles += module.completions.toNumber()
            let fountain = layers.pri.fountains[i]
            module.timeSpeed = fountain.getTimeSpeed()
            module.timeReq = fountain.getTimeReq()
            module.statReq = fountain.getstatReq()
            module.completionEffect = fountain.getCompletionEffect()

            module.pourSafety = false
            module.focusSafety = false
            let seqDivisor = Math.pow(1.4, i - 1)
            if (i > 9) seqDivisor = Math.pow(seqDivisor, 3);
            player.pri.fountains[i].focusTimerMax = player.prj.prismFountainFocusExtension.mul(4).div(seqDivisor)
            if (player.pri.fountains[i].isFocused) {
                player.pri.fountains[i].focusTimer = player.pri.fountains[i].focusTimer.sub(delta)
                if (player.pri.prisms.gte(module.statReq) && module.timeSpeed.gt(0)) module.time = module.time.add(module.timeSpeed.div(player.pri.totalPrisms).mul(player.pri.totalPrisms.sub(module.statReq)).mul(delta));
                if (player.pri.fountains[i].focusTimer.lte(0) && ((!hasUpgrade("bum", 11) && i <= 9) || (i > 9))) {
                    player.pri.fountains[i].isFocused = false
                    player.pri.fountains[i].focusTimer = player.pri.fountains[i].focusTimerMax
                    player.prj.focused = player.prj.focused.sub(1)
                }
            } else {
                player.pri.fountains[i].focusTimer = player.pri.fountains[i].focusTimerMax
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
                switch (i) {
                    case '2': case '3':
                        if (player.pri.fountains[2].completions.gt(0) && player.pri.fountains[3].completions.gt(0) && !hasAchievement("achievements", 1208)) completeAchievement("achievements", 1208);
                        break;
                    case '4': case '5': case '6':
                        if (player.pri.fountains[4].completions.gt(0) && player.pri.fountains[5].completions.gt(0) && player.pri.fountains[6].completions.gt(0) && !hasAchievement("achievements", 1209)) completeAchievement("achievements", 1209);
                        break;
                    case '7': case '8': case '9':
                        if (player.pri.fountains[7].completions.gt(0)) {
                            if (!hasAchievement("achievements", 1212)) completeAchievement("achievements", 1212);
                            if (player.pri.fountains[7].completions.gt(0) && player.pri.fountains[8].completions.gt(0) && player.pri.fountains[9].completions.gt(0) && !hasAchievement("achievements", 1214)) completeAchievement("achievements", 1214);
                        }
                        break;
                    case '10': case '11': case '12':
                        if (player.pri.fountains[10].completions.gt(0) && player.pri.fountains[11].completions.gt(0) && player.pri.fountains[12].completions.gt(0) && !hasAchievement("achievements", 1223)) completeAchievement("achievements", 1223);
                    case '13': case '14':
                        if (player.pri.fountains[13].completions.gt(0) && player.pri.fountains[14].completions.gt(0) && !hasAchievement("achievements", 1307)) completeAchievement("achievements", 1307);
                    case '15':
                        if (player.pri.fountains[15].completions.gt(0) && !hasAchievement("achievements", 1310)) completeAchievement("achievements", 1310);
                    default:
                        break;
                }
            }
        });
        player.pri.totalFountainCycles = new Decimal(player.pri.totalFountainCycles)

        // GREENHOUSE

        if (hasMilestone("prj", 206)) {
            
        }

        // SOLAR RADIATION

        if (true) { // ANICIFFO DEFEATED
            player.pri.solarRadiationGain = new Decimal(1)

            player.pri.solarRadiation = player.pri.solarRadiation.add(player.pri.solarRadiationGain.mul(delta))
        } else {
            player.pri.solarRadiationGain = new Decimal(0)
        }

        // MISC

        player.pri.prismaticResetTime = player.pri.prismaticResetTime.add(delta)
    },
    
    prismReset(isRewarded) {
        if (!player.wel.light.gte(1e15)) return;
        if (isRewarded) {
            player.pri.prisms = player.pri.prisms.add(player.pri.prismsToGet)
            player.pri.totalPrisms = player.pri.totalPrisms.add(player.pri.prismsToGet)
            if (player.pri.prismsToGet.gt(player.pri.bestPrismsInOneReset)) player.pri.bestPrismsInOneReset = player.pri.prismsToGet;
            if (!hasAchievement("achievements", 1207)) completeAchievement("achievements", 1207);
        }

        player.pri.prismaticResetTime = new Decimal(0)

        player.wel.light = new Decimal(0)
        player.wel.bestLight = new Decimal(0)
        player.wel.lightGain = new Decimal(1)
        player.pri.resetTime = 0

        player.wel.modules[1].time = player.wel.modules[1].maxTime
        player.wel.modules[1].timeSpeed = new Decimal(1)
        player.wel.modules[1].completions = new Decimal(0)
        player.wel.modules[2].time = player.wel.modules[2].maxTime
        player.wel.modules[2].timeSpeed = new Decimal(1)
        player.wel.modules[2].completions = new Decimal(0)
        player.wel.modules[3].time = player.wel.modules[3].maxTime
        player.wel.modules[3].timeSpeed = new Decimal(1)
        player.wel.modules[3].completions = new Decimal(0)
        player.wel.modules[4].time = player.wel.modules[4].maxTime
        player.wel.modules[4].timeSpeed = new Decimal(1)
        player.wel.modules[4].completions = new Decimal(0)

        player.wel.fountains[1].completions = new Decimal(0)
        player.wel.fountains[1].time = new Decimal(0)
        player.wel.fountains[1].canAddCompletion = false
        player.wel.fountains[2].completions = new Decimal(0)
        player.wel.fountains[2].time = new Decimal(0)
        player.wel.fountains[2].canAddCompletion = false
        player.wel.fountains[3].completions = new Decimal(0)
        player.wel.fountains[3].time = new Decimal(0)
        player.wel.fountains[3].canAddCompletion = false
        player.wel.fountains[4].completions = new Decimal(0)
        player.wel.fountains[4].time = new Decimal(0)
        player.wel.fountains[4].canAddCompletion = false

        if (!hasMilestone('prj', 204)) {
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
        }
    },
    branches: ["wel"],
    clickables: {
        "fountainPour_1": createPourClickable("pri", 1, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_1": createFountainFocusClickable("pri", 1, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_2": createPourClickable("pri", 2, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_2": createFountainFocusClickable("pri", 2, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_3": createPourClickable("pri", 3, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_3": createFountainFocusClickable("pri", 3, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_4": createPourClickable("pri", 4, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_4": createFountainFocusClickable("pri", 4, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_5": createPourClickable("pri", 5, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_5": createFountainFocusClickable("pri", 5, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_6": createPourClickable("pri", 6, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_6": createFountainFocusClickable("pri", 6, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_7": createPourClickable("pri", 7, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_7": createFountainFocusClickable("pri", 7, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_8": createPourClickable("pri", 8, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_8": createFountainFocusClickable("pri", 8, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_9": createPourClickable("pri", 9, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_9": createFountainFocusClickable("pri", 9, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_10": createPourClickable("pri", 10, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_10": createFountainFocusClickable("pri", 10, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_11": createPourClickable("pri", 11, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_11": createFountainFocusClickable("pri", 11, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_12": createPourClickable("pri", 12, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_12": createFountainFocusClickable("pri", 12, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_13": createPourClickable("pri", 13, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_13": createFountainFocusClickable("pri", 13, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_14": createPourClickable("pri", 14, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_14": createFountainFocusClickable("pri", 14, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "fountainPour_15": createPourClickable("pri", 15, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            progressFrontColor: "#d6ebff",
            textColor: "#ffffff",
        }),
        "fountainFocus_15": createFountainFocusClickable("pri", 15, {
            primaryColor: "#4d9999",
            secondaryColor: "#335966",
            textColor: "#ffffff",
        }),
        "prismaticReset": {
            title() { return "<h2>" + (hasMilestone("prj", 202) ? "Form your light into prisms." : "Form your light into a prism.") + "</h2><br>Req: 1e15 Light" },
            canClick() { return player.wel.light.gte(1e15)},
            unlocked() { return true },
            onClick() {
                layers.pri.prismReset(true)
            },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "10px", padding: "8px"}
                if (this.canClick()) {
                    look.background = "linear-gradient(45deg, #ffd6d6 0%, #abffd6 33%, #d6ebff 66%, #ffabff 100%)"
                    look.border = "3px solid #335966"
                    look.color = "#335966"
                } else {
                    look.backgroundColor = "#361e1e"
                    look.border = "3px solid #d6ebff"
                    look.color = "#d6ebff"
                }
                return look
            },
        },
        "prismFountains_respecFocus": {
            title() { return "<h3>Respec Focus</h3><br><small>(you won't get your poured prisms back! don't be silly!)</small>" },
            canClick() {
                for (let v in player.pri.fountains) {
                    if (player.pri.fountains[v].focused || player.pri.fountains[v].isFocused) return true;
                }
                return false
            },
            unlocked() { return true },
            onClick() {
                Object.keys(player.pri.fountains).forEach(i => {
                    if (player.pri.fountains[i].focused) {
                        player.pri.fountains[i].focused = false
                        player.prj.focused = player.prj.focused.sub(1)
                    }
                    if (player.pri.fountains[i].isFocused) {
                        player.pri.fountains[i].isFocused = false
                        player.prj.focused = player.prj.focused.sub(1)
                    }
                });
            },
            style() {
                let look = {width: "512px", minHeight: "60px", maxHeight: "60px", borderRadius: "25px", margin: "3px"}
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
        "autoPrismaticToggle": {
            title() {return "<h3>" + (player.pri.autoPrismaticToggle ? "Auto-Reset: ON" : "Auto-Reset: OFF") + "</h3><br><small>Requires 3 Focus"},
            canClick() {return player.prj.maxFocused.sub(player.prj.focused).gte(3) || player.pri.autoPrismaticToggle},
            unlocked: true,
            onClick() {
                if (player.pri.autoPrismaticToggle) {
                    player.pri.autoPrismaticToggle = false
                    player.prj.focused = player.prj.focused.sub(3)
                } else {
                    if (!player.prj.maxFocused.sub(player.prj.focused).gte(3)) return;
                    player.pri.autoPrismaticToggle = true
                    player.prj.focused = player.prj.focused.add(3)
                }
            },
            style() {
                let look = {width: "194px", minHeight: "45.5px", maxHeight: "45.5px", fontSize: "10px", border: "3px solid #0000003f", borderRadius: "0 0 7px 0", lineHeight: "1"}
                if (player.pri.autoPrismaticToggle) {look.backgroundColor = "#dfffdf"} else {look.backgroundColor = "#4d9999"}
                return look
            },
        },
        "autoPrismaticAmount": {
            title() { return "Amount" },
            canClick() { return player.pri.autoPrismaticType },
            unlocked() { return true },
            onClick() {
                player.pri.autoPrismaticType = false
            },
            style() {
                let look = {width: "95.5px", minHeight: "45.5px", maxHeight: "45.5px", fontSize: "12px", border: "3px solid #0000003f", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#d6ebff"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                }
                return look
            },
        },
        "autoPrismaticTime": {
            title() { return "Time" },
            canClick() { return !player.pri.autoPrismaticType },
            unlocked() { return true },
            onClick() {
                player.pri.autoPrismaticType = true
            },
            style() {
                let look = {width: "95.5px", minHeight: "45.5px", maxHeight: "45.5px", fontSize: "12px", border: "3px solid #0000003f", borderRadius: "0 7px 0 0"}
                if (this.canClick()) {
                    look.backgroundColor = "#d6ebff"
                    look.border = "3px solid #0000003f"
                    look.color = "black"
                } else {
                    look.background = "#335966"
                    look.border = "3px solid #4d9999"
                    look.color = "white"
                }
                return look
            },
        },
        "prismWell1_collect": {
            title() { return "<h3>Collect" },
            canClick() { return player.wel.modules[5].time.gte(player.wel.modules[5].maxTime)},
            unlocked() { return true },
            onClick() {
                tickProjects(player.wel.modules[5].maxTime.div(player.wel.modules[5].timeSpeed).div(2))
                player.pri.prisms = player.pri.prisms.add(layers.pri.clickables[this.id].lightGain())
                player.pri.totalPrisms = player.pri.totalPrisms.add(layers.pri.clickables[this.id].lightGain())
                player.wel.modules[5].time = new Decimal(0)
                player.wel.modules[5].completions = player.wel.modules[5].completions.add(player.wel.modules[5].completionsGain)
            },
            lightGain() {
                let gain = player.pri.prismsToGet
                gain = gain.mul(0.01)
                gain = gain.mul(player.blu.blueshifts[5].cycleGainMul)
                return gain.floor()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "50px", maxHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#a1ffff"
                    look.color = "black"
                    look.border = "3px solid #3366597f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "prismWell2_collect": {
            title() { return "<h3>Collect" },
            canClick() { return player.wel.modules[6].time.gte(player.wel.modules[6].maxTime)},
            unlocked() { return true },
            onClick() {
                tickProjects(player.wel.modules[6].maxTime.div(player.wel.modules[6].timeSpeed).div(2))
                player.pri.prisms = player.pri.prisms.add(layers.pri.clickables[this.id].lightGain())
                player.pri.totalPrisms = player.pri.totalPrisms.add(layers.pri.clickables[this.id].lightGain())
                player.wel.modules[6].time = new Decimal(0)
                player.wel.modules[6].completions = player.wel.modules[6].completions.add(player.wel.modules[6].completionsGain)
            },
            lightGain() {
                let gain = player.pri.prismsToGet
                gain = gain.mul(0.1)
                gain = gain.mul(player.blu.blueshifts[6].cycleGainMul)
                return gain.floor()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "50px", maxHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#a1ffff"
                    look.color = "black"
                    look.border = "3px solid #3366597f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "prismWell3_collect": {
            title() { return "<h3>Collect" },
            canClick() { return player.wel.modules[7].time.gte(player.wel.modules[7].maxTime)},
            unlocked() { return true },
            onClick() {
                tickProjects(player.wel.modules[7].maxTime.div(player.wel.modules[7].timeSpeed).div(2))
                player.pri.prisms = player.pri.prisms.add(layers.pri.clickables[this.id].lightGain())
                player.pri.totalPrisms = player.pri.totalPrisms.add(layers.pri.clickables[this.id].lightGain())
                player.wel.modules[7].time = new Decimal(0)
                player.wel.modules[7].completions = player.wel.modules[7].completions.add(player.wel.modules[7].completionsGain)
            },
            lightGain() {
                let gain = player.pri.prismsToGet
                gain = gain.mul(1)
                gain = gain.mul(player.blu.blueshifts[7].cycleGainMul)
                return gain.floor()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "50px", maxHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#a1ffff"
                    look.color = "black"
                    look.border = "3px solid #3366597f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "prismWell4_collect": {
            title() { return "<h3>Collect" },
            canClick() { return player.wel.modules[8].time.gte(player.wel.modules[8].maxTime)},
            unlocked() { return true },
            onClick() {
                tickProjects(player.wel.modules[8].maxTime.div(player.wel.modules[8].timeSpeed).div(2))
                player.pri.prisms = player.pri.prisms.add(layers.pri.clickables[this.id].lightGain())
                player.pri.totalPrisms = player.pri.totalPrisms.add(layers.pri.clickables[this.id].lightGain())
                player.wel.modules[8].time = new Decimal(0)
                player.wel.modules[8].completions = player.wel.modules[8].completions.add(player.wel.modules[8].completionsGain)
            },
            lightGain() {
                let gain = player.pri.prismsToGet
                gain = gain.mul(10)
                gain = gain.mul(player.blu.blueshifts[8].cycleGainMul)
                return gain.floor()
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "150px", minHeight: "50px", maxHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#a1ffff"
                    look.color = "black"
                    look.border = "3px solid #3366597f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
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
    fountains: {
        1: {
            title: "Tetrahedron",
            unlocked() { return true },
            conditionDisplay() { return "This should always be unlocked... why are you seeing this??"},
            condition() { return true },
            canAuto() { return (player.blu.totalBlueshifts.gte(1) && hasMilestone("prj", 301)) || player.bum.starshines.gt(0) },
            infiniteAuto() { return hasUpgrade("bum", 11) },
            effectDisplay() { return "Boosts light gain by x" + formatSimple(layers.pri.fountains[1].getCompletionEffect(), 2) + ", based on light"},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            getCompletionEffect() {
                let completions = player.pri.fountains[1].completions.pow(0.75)

                s = player.wel.light.add(1).log10().div(4).add(1).pow(completions).log(10).add(1).pow(0.5).sub(1).pow_base(10).sub(1).mul(3).add(1)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[1].completions
                let s = completions.div(8).add(1).pow(4)

                s = s.mul(completions.sub(20).max(0).pow_base(1.25))
                s = s.pow(1.0625).mul(10)

                return s
            },
            getTimeBulk() {
                let unscaledBulk = player.pri.fountains[1].time.div(10).root(1.0625).log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getstatReq() {
                let completions = player.pri.fountains[1].completions
                let s = completions.div(8).add(1).pow(4)
                
                s = s.mul(completions.sub(20).max(0).pow_base(1.25))

                return s.floor()
            },
            getStatBulk() {
                let unscaledBulk = player.pri.fountains[1].time.log(1.25)
                return unscaledBulk.max(0).floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        2: {
            title: "Spiral",
            unlocked() { return true },
            conditionDisplay() { return "1 Tetrahedron ↻"},
            condition() { return player.pri.fountains[1].completions.gt(0) },
            canAuto() { return (player.blu.totalBlueshifts.gte(2) && hasMilestone("prj", 301)) || player.bum.starshines.gt(0) },
            infiniteAuto() { return hasUpgrade("bum", 11) },
            effectDisplay() { return "Boosts light well ↻ gain by x" + formatSimple(layers.pri.fountains[2].getCompletionEffect(), 2)},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            getCompletionEffect() {
                let completions = player.pri.fountains[2].completions

                s = completions.add(1)
                if (hasMilestone("prj", 203)) s = s.pow(1.5);
                if (hasMilestone("prj", 208)) s = s.mul(completions.pow_base(1.004));

                return s.floor()
            },
            getTimeReq() {
                let completions = player.pri.fountains[2].completions
                let s = completions.div(8).add(1).pow(3)

                s = s.mul(completions.sub(20).max(0).pow_base(1.1))
                s = s.pow(1.0625).mul(12)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[2].completions
                let s = completions.div(8).add(1).pow(3)
                
                s = s.mul(completions.sub(20).max(0).pow_base(1.1))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        3: {
            title: "Arrow",
            unlocked() { return true },
            conditionDisplay() { return "1 Tetrahedron ↻"},
            condition() { return player.pri.fountains[1].completions.gt(0) },
            canAuto() { return (player.blu.totalBlueshifts.gte(3) && hasMilestone("prj", 301)) || player.bum.starshines.gt(0) },
            infiniteAuto() { return hasUpgrade("bum", 11) },
            effectDisplay() { return "Reduces light fountain requirements by /" + formatSimple(layers.pri.fountains[3].getCompletionEffect(), 2)},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            getCompletionEffect() {
                let completions = player.pri.fountains[3].completions

                s = completions.add(1).pow(2)
                if (hasMilestone("prj", 203)) s = s.pow(1.5)
                if (hasMilestone("prj", 208)) s = s.mul(completions.pow_base(1.05));

                return s.floor()
            },
            getTimeReq() {
                let completions = player.pri.fountains[3].completions
                let s = completions.div(8).add(1).pow(3)
                
                s = s.mul(completions.sub(20).max(0).pow_base(1.1))
                s = s.pow(1.0625).mul(12)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[3].completions
                let s = completions.div(8).add(1).pow(3)
                
                s = s.mul(completions.sub(20).max(0).pow_base(1.1))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        4: {
            title: "Octahedron",
            unlocked() { return player.pri.fountains[2].completions.gt(0) || player.pri.fountains[3].completions.gt(0) },
            conditionDisplay() { return "8 Tetrahedron ↻"},
            condition() { return player.pri.fountains[1].completions.gte(8) },
            canAuto() { return (player.blu.totalBlueshifts.gte(4) && hasMilestone("prj", 301)) || player.bum.starshines.gt(0) },
            infiniteAuto() { return hasUpgrade("bum", 11) },
            effectDisplay() { return "Boosts light gain by x" + formatSimple(layers.pri.fountains[4].getCompletionEffect(), 2) + ", based on prisms"},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            getCompletionEffect() {
                let completions = player.pri.fountains[4].completions.pow(0.75)

                s = player.pri.prisms.add(1).log10().div(4).add(1).pow(completions).log(10).add(1).pow(0.5).sub(1).pow_base(10).sub(1).mul(8).add(1).pow(2)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[4].completions
                let s = completions.div(4).add(1).pow(5)

                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(120)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[4].completions
                let s = completions.div(4).add(1).pow(5)
                
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.mul(8)

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        5: {
            title: "Cone",
            unlocked() { return player.pri.fountains[2].completions.gt(0) || player.pri.fountains[3].completions.gt(0) },
            conditionDisplay() { return "Gain 100 Prisms in one reset"},
            condition() { return player.pri.bestPrismsInOneReset.gte(100) },
            canAuto() { return (player.blu.totalBlueshifts.gte(5) && hasMilestone("prj", 301)) || player.bum.starshines.gt(0) },
            infiniteAuto() { return hasUpgrade("bum", 11) },
            effectDisplay() { return "Boosts light well speed by x" + formatSimple(layers.pri.fountains[5].getCompletionEffect(), 2)},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            getCompletionEffect() {
                let completions = player.pri.fountains[5].completions

                s = completions.pow(0.75).pow_base(1.5).sub(1).div(2).add(1)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[5].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(1.5))
                s = s.mul(completions.sub(20).max(0).pow_base(1.25))
                s = s.pow(1.0625).mul(1e3)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[5].completions
                let s = completions.pow_base(1.5).mul(50)
                s = s.mul(completions.sub(20).max(0).pow_base(1.25))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        6: {
            title: "Hourglass",
            unlocked() { return player.pri.fountains[2].completions.gt(0) || player.pri.fountains[3].completions.gt(0) },
            conditionDisplay() { return "10 Spiral ↻ and 10 Arrow ↻"},
            condition() { return player.pri.fountains[2].completions.gte(10) && player.pri.fountains[3].completions.gte(10) },
            canAuto() { return (player.blu.totalBlueshifts.gte(6) && hasMilestone("prj", 301)) || player.bum.starshines.gt(0) },
            infiniteAuto() { return hasUpgrade("bum", 11) },
            effectDisplay() { return "Boosts time capsules stored by x" + formatSimple(layers.pri.fountains[6].getCompletionEffect(), 2)},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            getCompletionEffect() {
                let completions = player.pri.fountains[6].completions

                s = completions.pow(0.8).pow_base(1.2).sub(1).mul(2.5).add(1)
                if (hasMilestone("prj", 209)) s = s.pow(1.25);
                if (s.gt(4e3)) s = s.div(4e3).pow(0.5).mul(4e3);

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[6].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(2))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(2.4e3)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[6].completions
                let s = completions.pow_base(2).mul(50)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        7: {
            title: "Dodecahedron",
            unlocked() { return (player.pri.fountains[4].completions.gt(0) || player.pri.fountains[5].completions.gt(0) || player.pri.fountains[6].completions.gt(0)) && hasMilestone("prj", 302) },
            conditionDisplay() { return "20 Octahedron ↻"},
            condition() { return player.pri.fountains[4].completions.gte(20) },
            canAuto() { return (player.blu.totalBlueshifts.gte(7) && hasMilestone("prj", 301)) || player.bum.starshines.gt(0) },
            infiniteAuto() { return hasUpgrade("bum", 11) },
            effectDisplay() { return "Boosts light gain by x" + formatSimple(layers.pri.fountains[7].getCompletionEffect(), 2) + ", based on light well ↻"},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            condition() {
                return player.pri.fountains[4].completions.gte(20)
            },
            unlocked() {
                return (player.pri.fountains[4].completions.gt(0) || player.pri.fountains[5].completions.gt(0) || player.pri.fountains[6].completions.gt(0)) && hasMilestone("prj", 302)
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[7].completions.pow(0.75)

                s = player.wel.wellCycleProduct.log10().div(36).pow(8).add(1).pow(completions).log(10).add(1).pow(0.5).sub(1).pow_base(10).pow(2)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[7].completions
                let s = new Decimal(1)

                s = s.mul(completions.add(1).pow_base(completions.add(1)))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                s = s.pow(1.0625).mul(2.4e7)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[7].completions
                let s = new Decimal(1)

                s = s.mul(completions.add(1).pow_base(completions.add(1)))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                
                s = s.mul(1.2e5)

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        8: {
            title: "Lense",
            unlocked() { return (player.pri.fountains[4].completions.gt(0) || player.pri.fountains[5].completions.gt(0) || player.pri.fountains[6].completions.gt(0)) && hasMilestone("prj", 302) },
            conditionDisplay() { return "Gain 1,000,000 Prisms in one reset"},
            condition() { return player.pri.bestPrismsInOneReset.gte(1e6) },
            canAuto() { return (player.blu.totalBlueshifts.gte(8) && hasMilestone("prj", 301)) || player.bum.starshines.gt(0) },
            infiniteAuto() { return hasUpgrade("bum", 11) },
            effectDisplay() { return "Boosts prism gain by x" + formatSimple(layers.pri.fountains[8].getCompletionEffect(), 2)},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            getCompletionEffect() {
                let completions = player.pri.fountains[8].completions

                let s = completions.add(1).mul(completions).div(2).add(1)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[8].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(3))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                s = s.pow(1.0625).mul(4e7)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[8].completions
                let s = completions.pow_base(3).mul(1e6)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        9: {
            title: "Pentagon",
            unlocked() { return (player.pri.fountains[4].completions.gt(0) || player.pri.fountains[5].completions.gt(0) || player.pri.fountains[6].completions.gt(0)) && hasMilestone("prj", 302) },
            conditionDisplay() { return "1 Tetrahedron ↻"},
            condition() { return player.prj.bestProjectSpeed.gte(400) },
            canAuto() { return (player.blu.totalBlueshifts.gte(9) && hasMilestone("prj", 301)) || player.bum.starshines.gt(0) },
            infiniteAuto() { return hasUpgrade("bum", 11) },
            effectDisplay() { return "Boosts project speed by x" + formatSimple(layers.pri.fountains[9].getCompletionEffect(), 2)},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            getCompletionEffect() {
                let completions = player.pri.fountains[9].completions

                s = completions.div(4).add(1)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[9].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(5))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(1e9)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[9].completions
                let s = completions.pow_base(5).mul(1e7)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        10: {
            title: "Gear",
            unlocked() { return player.pri.fountains[2].completions.gt(0) || player.pri.fountains[3].completions.gt(0) },
            conditionDisplay() { return "x1e10 Light Well Speed"},
            condition() { return player.pri.fountains[1].completions.gte(8) },
            canAuto() { return hasMilestone("prj", 406) },
            infiniteAuto() { return false },
            effectDisplay() { return "Strengthen per-well blueshift effects by ^" + formatSimple(layers.pri.fountains[10].getCompletionEffect(), 3)},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            condition() {
                return player.wel.lightWellSpeed.gte(1e10)
            },
            unlocked() {
                return (player.pri.fountains[7].completions.gt(0) || player.pri.fountains[8].completions.gt(0) || player.pri.fountains[9].completions.gt(0)) && hasMilestone("prj", 403)
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[10].completions

                s = completions.pow(0.75).mul(0.04).add(1)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[10].completions
                let s = new Decimal(1)

                s = s.mul(completions.add(1).pow_base(completions.div(4).add(1)))
                s = s.mul(completions.pow_base(2))
                s = s.mul(completions.sub(20).max(0).pow_base(2))

                s = s.pow(1.0625).mul(4e40)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[10].completions
                let s = new Decimal(1)

                s = s.mul(completions.add(1).pow_base(completions.div(4).add(1)))
                s = s.mul(completions.pow_base(2))
                s = s.mul(completions.sub(20).max(0).pow_base(2))

                s = s.mul(1e36)

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        11: {
            title: "Cube",
            unlocked() { return player.pri.fountains[2].completions.gt(0) || player.pri.fountains[3].completions.gt(0) },
            conditionDisplay() { return "x1e9 Light Well δ Effect"},
            condition() { return player.pri.fountains[1].completions.gte(8) },
            canAuto() { return hasMilestone("prj", 406) },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts light well speed by x" + formatSimple(layers.pri.fountains[11].getCompletionEffect(), 2) + ", based on light"},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            condition() {
                return player.wel.modules[4].completionEffect.gte(1e9) || player.pri.fountains[11].completions.gt(0)
            },
            unlocked() {
                return (player.pri.fountains[7].completions.gt(0) || player.pri.fountains[8].completions.gt(0) || player.pri.fountains[9].completions.gt(0)) && hasMilestone("prj", 403)
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[11].completions.pow(0.75)

                s = player.wel.light.add(1).log10().div(150).pow(4).add(1).pow(completions).log(10).add(1).pow(0.5).sub(1).pow_base(10)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[11].completions
                let s = new Decimal(1)

                s = s.mul(completions.add(1).pow_base(completions.div(4).add(1)))
                s = s.mul(completions.pow_base(3))
                s = s.mul(completions.sub(20).max(0).pow_base(2))

                s = s.pow(1.0625).mul(4e44)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[11].completions
                let s = new Decimal(1)

                s = s.mul(completions.add(1).pow_base(completions.div(4).add(1)))
                s = s.mul(completions.pow_base(3))
                s = s.mul(completions.sub(20).max(0).pow_base(2))

                s = s.mul(1e40)

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        12: {
            title: "Star",
            conditionDisplay() { return "400 Starlight Fountain ↻"},
            canAuto() { return hasMilestone("prj", 406) },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts starlight fountain speed by x" + formatSimple(layers.pri.fountains[12].getCompletionEffect(), 2) + "."},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            condition() {
                return player.bum.fountains[1].completions.add(player.bum.fountains[2].completions).add(player.bum.fountains[3].completions).gte(400)
            },
            unlocked() {
                return (player.pri.fountains[7].completions.gt(0) || player.pri.fountains[8].completions.gt(0) || player.pri.fountains[9].completions.gt(0)) && hasMilestone("prj", 403)
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[12].completions

                let s = completions.add(1).mul(completions).div(2).add(1)

                return s
            },
            getTimeReq() {
                let completions = player.pri.fountains[12].completions
                let s = new Decimal(1)

                s = s.mul(completions.add(1).pow_base(completions.div(2).add(1)))
                s = s.mul(completions.pow_base(4))
                s = s.mul(completions.sub(20).max(0).pow_base(2))

                s = s.pow(1.0625).mul(4e58)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[12].completions
                let s = new Decimal(1)

                s = s.mul(completions.add(1).pow_base(completions.div(2).add(1)))
                s = s.mul(completions.pow_base(4))
                s = s.mul(completions.sub(20).max(0).pow_base(2))

                s = s.mul(1e54)

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        13: {
            title: "Mirror",
            unlocked() { return player.pri.fountains[2].completions.gt(0) || player.pri.fountains[3].completions.gt(0) },
            conditionDisplay() { return "1 Tetrahedron ↻"},
            condition() { return player.pri.fountains[1].completions.gte(8) },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts light gain by x" + formatSimple(layers.pri.fountains[13].getCompletionEffect(), 2) + ", based on prisms"},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Prism Well ↻",
            condition() {
                return player.pri.prisms.gte(1e30)
            },
            unlocked() {
                return (player.pri.fountains[10].completions.gt(0) || player.pri.fountains[11].completions.gt(0) || player.pri.fountains[12].completions.gt(0)) && hasMilestone("prj", 407)
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[13].completions

                let s = completions.pow(1.5).add(1).mul(completions.pow(0.9).pow_base(1.05))

                return s.floor()
            },
            getTimeReq() {
                let completions = player.pri.fountains[13].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(4))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(1.4e13)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[13].completions
                let s = completions.pow_base(4).mul(1e11)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        14: {
            title: "Bulb",
            unlocked() { return player.pri.fountains[2].completions.gt(0) || player.pri.fountains[3].completions.gt(0) },
            conditionDisplay() { return "1 Tetrahedron ↻"},
            condition() { return player.pri.fountains[1].completions.gte(8) },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts light gain by x" + formatSimple(layers.pri.fountains[14].getCompletionEffect(), 2) + ", based on prisms"},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Prism Well Speed",
            condition() {
                return player.pri.fountains[10].completions.gte(20)
            },
            unlocked() {
                return (player.pri.fountains[10].completions.gt(0) || player.pri.fountains[11].completions.gt(0) || player.pri.fountains[12].completions.gt(0)) && hasMilestone("prj", 407)
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[14].completions

                let s = completions.div(4).add(1)

                return s.floor()
            },
            getTimeReq() {
                let completions = player.pri.fountains[14].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(4))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(1.4e13)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[14].completions
                let s = completions.pow_base(4).mul(1e11)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
        15: {
            title: "Ring",
            unlocked() { return player.pri.fountains[2].completions.gt(0) || player.pri.fountains[3].completions.gt(0) },
            conditionDisplay() { return "1 Tetrahedron ↻"},
            condition() { return player.pri.fountains[1].completions.gte(8) },
            canAuto() { return false },
            infiniteAuto() { return false },
            effectDisplay() { return "Boosts light gain by x" + formatSimple(layers.pri.fountains[15].getCompletionEffect(), 2) + ", based on prisms"},
            currencyLocation() { return player.pri },
            currencyInternalName: "prisms",
            currencyDisplayName: "Prisms",
            completionEffectPrefix: "x",
            completionEffectSuffix: " Effective Pyramid Fountain ↻",
            condition() {
                return false
            },
            unlocked() {
                return (player.pri.fountains[13].completions.gt(0) || player.pri.fountains[14].completions.gt(0)) && hasMilestone("prj", 409)
            },
            canAuto() {
                return false
            },
            getCompletionEffect() {
                let completions = player.pri.fountains[15].completions

                let s = completions.div(4).add(1)

                return s.floor()
            },
            getTimeReq() {
                let completions = player.pri.fountains[15].completions
                let s = new Decimal(1)

                s = s.mul(completions.pow_base(4))
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))
                s = s.pow(1.0625).mul(1.4e13)

                return s
            },
            getstatReq() {
                let completions = player.pri.fountains[15].completions
                let s = completions.pow_base(4).mul(1e11)
                s = s.mul(completions.sub(20).max(0).pow_base(1.4))

                return s.floor()
            },
            getTimeSpeed() {
                let s = new Decimal(1)

                s = s.mul(player.pri.fountainSpeed)

                return s
            },
        },
    },
    microtabs: {
        stuff: {
            "Pyramid": {
                buttonStyle() { return { color: "white", borderWidth: "2px", borderRadius: "20px"} },
                unlocked() { return true },
                content() {
                    let look = [
                        ["style-column", [
                            ["blank", "15px"],
                            ["raw-html", "Pyramid fountains operate at <h3>x" + format(player.pri.fountainSpeed, 1) + "</h3> speed.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ["raw-html", "<small>Total prisms speed up pyramid fountains by x" + format(player.pri.totalPrisms.div(10), 1) + ".</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ["blank", "25px"],
                            ["raw-html", "You are using " + formatWhole(player.prj.focused) + "/" + formatWhole(player.prj.maxFocused) + " focus.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ["style-column", [
                                ["raw-html", "<small>Fountain requirements are reduced by /" + formatSimple(player.pri.prismFountainReqDivisor, 2) + ".</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ], {display: player.pri.prismFountainReqDivisor.gt(1) ? "" : "none !important"}],
                            ["style-column", [
                                ["tooltip-row", [
                                    ["raw-html", "<small>Base fountain focus duration is " + formatSimpleTime(player.prj.prismFountainFocusExtension.mul(4), 1) + ", reduced for each consecutive fountain.</small>", {color: "#dfffdf", fontSize: "18px", fontFamily: "monospace"}],
                                    ["raw-html", "<div class='bottomTooltip'>4 * (Project Speed / 100)<sup>0.75</div>"],
                                ], {}],
                            ], {display: hasMilestone("prj", 301) && !hasUpgrade("bum", 11) ? "" : "none !important"}],
                            ["blank", "16px"],
                        ]],
                        ["style-row", [
                            component_fountain("pri", 1, {
                                primaryColor: "#4d9999",
                                secondaryColor: "#335966",
                                progressFrontColor: "#d6ebff",
                                progressBackColor: "#1a2d33",
                                textColor: "#ffffff",
                                bottomAdjacent: layers.pri.fountains[2].unlocked(),
                            }),//linear-gradient(45deg, #ffd6d6 0%, #abffd6 33%, #d6ebff 66%, #ffabff 100%)
                        ], {background: "linear-gradient(#ffd6d6, #abffd6)", width: "fit-content", padding: "3px", marginBottom: "-6px", borderRadius:
                            layers.pri.fountains[2].unlocked() ? "28px 28px 0 0" : "28px"
                        }],
                        ["style-row", [
                            component_fountain("pri", 2, {
                                primaryColor: "#4d9999",
                                secondaryColor: "#335966",
                                progressFrontColor: "#d6ebff",
                                progressBackColor: "#1a2d33",
                                textColor: "#ffffff",
                                rightAdjacent: true,
                                bottomAdjacent: layers.pri.fountains[4].unlocked(),
                            }),
                            component_fountain("pri", 3, {
                                primaryColor: "#4d9999",
                                secondaryColor: "#335966",
                                progressFrontColor: "#d6ebff",
                                progressBackColor: "#1a2d33",
                                textColor: "#ffffff",
                                leftAdjacent: true,
                                bottomAdjacent: layers.pri.fountains[4].unlocked(),
                            }),
                        ], {background: "linear-gradient(#abffd6, #d6ebff)", width: "fit-content", padding: "3px", marginBottom: "-6px", borderRadius:
                            layers.pri.fountains[4].unlocked() ? "28px 28px 0 0" : "28px"
                        }],
                        ["style-row", [
                            component_fountain("pri", 4, {
                                primaryColor: "#4d9999",
                                secondaryColor: "#335966",
                                progressFrontColor: "#d6ebff",
                                progressBackColor: "#1a2d33",
                                textColor: "#ffffff",
                                rightAdjacent: true,
                                bottomAdjacent: layers.pri.fountains[7].unlocked(),
                            }),
                            component_fountain("pri", 5, {
                                primaryColor: "#4d9999",
                                secondaryColor: "#335966",
                                progressFrontColor: "#d6ebff",
                                progressBackColor: "#1a2d33",
                                textColor: "#ffffff",
                                rightAdjacent: true,
                                leftAdjacent: true,
                                bottomAdjacent: layers.pri.fountains[7].unlocked(),
                            }),
                            component_fountain("pri", 6, {
                                primaryColor: "#4d9999",
                                secondaryColor: "#335966",
                                progressFrontColor: "#d6ebff",
                                progressBackColor: "#1a2d33",
                                textColor: "#ffffff",
                                leftAdjacent: true,
                                bottomAdjacent: layers.pri.fountains[7].unlocked(),
                            }),
                        ], {background: "linear-gradient(#d6ebff, #ffabff)", width: "fit-content", padding: "3px", marginBottom: "-6px", borderRadius:
                            layers.pri.fountains[7].unlocked() ? "28px 28px 0 0" : "28px"
                        }],
                        ["style-row", [
                            component_fountain("pri", 7, {
                                primaryColor: "#4d9999",
                                secondaryColor: "#335966",
                                progressFrontColor: "#d6ebff",
                                progressBackColor: "#1a2d33",
                                textColor: "#ffffff",
                                rightAdjacent: true,
                                topAdjacent: layers.pri.fountains[4].unlocked(),
                                bottomAdjacent: layers.pri.fountains[10].unlocked(),
                            }),
                            component_fountain("pri", 8, {
                                primaryColor: "#4d9999",
                                secondaryColor: "#335966",
                                progressFrontColor: "#d6ebff",
                                progressBackColor: "#1a2d33",
                                textColor: "#ffffff",
                                rightAdjacent: true,
                                leftAdjacent: true,
                                topAdjacent: layers.pri.fountains[4].unlocked(),
                                bottomAdjacent: layers.pri.fountains[10].unlocked(),
                            }),
                            component_fountain("pri", 9, {
                                primaryColor: "#4d9999",
                                secondaryColor: "#335966",
                                progressFrontColor: "#d6ebff",
                                progressBackColor: "#1a2d33",
                                textColor: "#ffffff",
                                leftAdjacent: true,
                                topAdjacent: layers.pri.fountains[4].unlocked(),
                                bottomAdjacent: layers.pri.fountains[10].unlocked(),
                            }),
                        ], {background: "linear-gradient(#ffabff, #ffd6d6)", width: "fit-content", padding: "3px", marginBottom: "-6px", borderRadius:
                            layers.pri.fountains[10].unlocked() ? "0" : "0 0 28px 28px"
                        }],
                        ["style-row", [
                            component_fountain("pri", 10, {
                                primaryColor: "#4d9999",
                                secondaryColor: "#335966",
                                progressFrontColor: "#d6ebff",
                                progressBackColor: "#1a2d33",
                                textColor: "#ffffff",
                                rightAdjacent: true,
                                topAdjacent: layers.pri.fountains[7].unlocked(),
                                bottomAdjacent: false,
                            }),
                            component_fountain("pri", 11, {
                                primaryColor: "#4d9999",
                                secondaryColor: "#335966",
                                progressFrontColor: "#d6ebff",
                                progressBackColor: "#1a2d33",
                                textColor: "#ffffff",
                                rightAdjacent: true,
                                leftAdjacent: true,
                                topAdjacent: layers.pri.fountains[7].unlocked(),
                                bottomAdjacent: false,
                            }),
                            component_fountain("pri", 12, {
                                primaryColor: "#4d9999",
                                secondaryColor: "#335966",
                                progressFrontColor: "#d6ebff",
                                progressBackColor: "#1a2d33",
                                textColor: "#ffffff",
                                leftAdjacent: true,
                                topAdjacent: layers.pri.fountains[7].unlocked(),
                                bottomAdjacent: false,
                            }),
                        ], {background: "linear-gradient(#ffd6d6, #abffd6)", width: "fit-content", padding: "3px", marginBottom: "-6px", borderRadius:
                            "0 0 28px 28px"
                        }],
                        ["style-row", [
                        ], {background: "linear-gradient(#abffd6, #d6ebff)", width: "fit-content", padding: "3px", marginBottom: "-6px", borderRadius:
                            "0 0 28px 28px"
                        }],
                        ["blank", "9px"],
                        ["clickable", "prismFountains_respecFocus"],
                    ]
                    return look
                }
            },
            "Prism Wells": {
                buttonStyle() { return { color: "white", borderWidth: "2px", borderRadius: "20px"} },
                unlocked() { return hasMilestone("prj", 406) },
                content() {
                    let look = [
                        ["style-column", [], {width: "0", height: "0"}],
                        ["style-column", [
                            ["style-column", [
                                ["blank", "25px"],
                            ], {display: player.wel.prismWellCycleYield.gt(1) || player.wel.prismWellSpeed.gt(1) ? "" : "none !important"}],
                            ["style-column", [
                                ["raw-html", "Prism wells yield a base of <h3>" + formatSimple(player.wel.prismWellCycleYield) + "</h3> ↻.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ], {display: player.wel.prismWellCycleYield.gt(1) ? "" : "none !important"}],
                            ["style-column", [
                                ["raw-html", "Prism wells operate at <h3>x" + formatSimple(player.wel.prismWellSpeed, 2) + "</h3> speed.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ], {display: player.wel.prismWellSpeed.gt(1) ? "" : "none !important"}],
                            ["style-column", [
                                ["raw-html", "<small>Next blueshift at <h3>x" + formatWhole(
                                    player.blu.blueshifts[5].amount.add(1).pow_base(600)
                                    .min(player.blu.blueshifts[6].amount.add(1).pow_base(1800))
                                    .min(player.blu.blueshifts[7].amount.add(1).pow_base(21600))
                                    .min(player.blu.blueshifts[8].amount.mul(0.5).add(1).pow_base(259200))
                                ) + "</h3> speed.</small>", {color: "white", textShadow: "1px 1px 0 #3f3fff, -1px 1px 0 #3f3fff, 1px -1px 0 #3f3fff, -1px -1px 0 #3f3fff", fontSize: "18px", fontFamily: "monospace"}],
                            ], {display: hasMilestone("prj", 311) ? "" : "none !important"}],
                            ["style-column", [
                                ["blank", "15px"],
                                ["raw-html", "You are using " + formatWhole(player.prj.focused) + "/" + formatWhole(player.prj.maxFocused) + " focus.", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                            ], {display: hasUpgrade("wel", 33) && false ? "" : "none !important"}],
                            ["style-column", [
                                ["tooltip-row", [
                                    ["raw-html", "<small>Base well focus duration is " + formatSimpleTime(player.prj.lightWellFocusExtension, 1) + ", decreased for each consecutive well.</small>", {color: "#dfffdf", fontSize: "18px", fontFamily: "monospace"}],
                                    ["raw-html", "<div class='bottomTooltip'>(Project Speed / 4)<sup>0.5</div>"],
                                ], {}],
                            ], {display: hasUpgrade("wel", 33) && !hasMilestone("prj", 402) && false ? "" : "none !important"}],
                        ]],
                        ["blank", "25px"],
                        ["row", [

                        ]],
                        ["blank", "6px"],
                        ["style-column", [
                            ["raw-html", "All well cycle effect scaling is ^" + formatSimple(player.wel.lightWellCycleEffectSoftcap, 2) + " after 1,000 ↻!", {color: "yellow", fontSize: "16px", fontFamily: "monospace", display: (player.wel.modules[5].completions.gte(1e3) ? "" : "none !important")}],
                            ["blank", "10px"],
                            ["clickable", "lightWells_respecFocus"],
                            ["blank", "6px"],
                        ], {}],
                        ["raw-html", "Prism well content is reset on blueshift.", {color: "#ffffff7f", fontSize: "16px", fontFamily: "monospace"}],
                        ["blank", "25px"],
                    ]
                    if (hasMilestone("prj", 406)) {
                        // prism well epsilon
                        look[3][1].push(["blank", "1px"])
                        look[3][1].push(
                        ["style-column", [
                            ["style-column", [
                                    ["style-column", [
                                        ["style-column", [
                                            ["style-column", [
                                                ["raw-html", formatSimple(player.wel.modules[5].time.div(player.wel.modules[5].maxTime).min(1).max(0).mul(100), 0) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                            ], {background: "#4d9999", border: "3px solid #335966", borderRadius: "100px", width: "75px", height:"75px"}],
                                        ], {borderRadius: "50%", width: "125px", height:"125px", margin: "9.5px", border: "3px solid #335966",
                                            background: player.wel.modules[5].time.lt(player.wel.modules[5].maxTime) ?
                                            "conic-gradient(#d6ebff " + (player.wel.modules[5].time.div(player.wel.modules[5].maxTime)).min(1).max(0) * 360 + "deg, #0b1417 0deg)" : "#a1ffff"
                                        }],
                                    ], {background: "linear-gradient(0deg, #335966 50%, #4d9999 50% )", height: "150px", borderRadius: "75px 75px 0 0"}],
                            ["raw-html", "Prism Well ε", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[5].time.lt(player.wel.modules[5].maxTime) ? formatSimpleTime(player.wel.modules[5].maxTime.sub(player.wel.modules[5].time).div(player.wel.modules[5].timeSpeed), 2) : formatSimpleTime(player.wel.modules[5].maxTime.div(player.wel.modules[5].timeSpeed), 2) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShortWhole(layers.pri.clickables["prismWell1_collect"].lightGain()) + " Prisms", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9999", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["hoverless-clickable", "prismWell1_collect"],
                            ["blank", "3px"],
                            ["style-column", [
                                ["raw-html", formatShortWhole(player.wel.modules[5].completions) + " ε ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", "(x" + formatShort(player.wel.modules[5].completionEffect) + " Prisms)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                            ], {border: "3px solid #4d9999", borderRadius: "0 0 10px 10px", height: "44px"}],
                        
                        ], {background: "#335966",border: "3px solid #335966", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                        ["blank", "6px"],
                    ]],
                    )
                    }
                    if (player.wel.modules[5].completions.gte(500)) {
                        // prism well zeta
                        look[3][1].push(["blank", "1px"])
                        look[3][1].push(
                        ["style-column", [
                            ["style-column", [
                                    ["style-column", [
                                        ["style-column", [
                                            ["style-column", [
                                                ["raw-html", formatSimple(player.wel.modules[6].time.div(player.wel.modules[6].maxTime).min(1).max(0).mul(100), 0) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                            ], {background: "#4d9999", border: "3px solid #335966", borderRadius: "100px", width: "75px", height:"75px"}],
                                        ], {borderRadius: "50%", width: "125px", height:"125px", margin: "9.5px", border: "3px solid #335966",
                                            background: player.wel.modules[6].time.lt(player.wel.modules[6].maxTime) ?
                                            "conic-gradient(#d6ebff " + (player.wel.modules[6].time.div(player.wel.modules[6].maxTime)).min(1).max(0) * 360 + "deg, #0b1417 0deg)" : "#a1ffff"
                                        }],
                                    ], {background: "linear-gradient(0deg, #335966 50%, #4d9999 50% )", height: "150px", borderRadius: "75px 75px 0 0"}],
                            ["raw-html", "Prism Well ζ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["raw-html", player.wel.modules[6].time.lt(player.wel.modules[6].maxTime) ? formatSimpleTime(player.wel.modules[6].maxTime.sub(player.wel.modules[6].time).div(player.wel.modules[6].timeSpeed), 2) : formatSimpleTime(player.wel.modules[6].maxTime.div(player.wel.modules[6].timeSpeed), 2) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                            ["blank", "9px"],
                            ["style-column", [
                                    ["raw-html", "+" + formatShortWhole(layers.pri.clickables["prismWell2_collect"].lightGain()) + " Prisms", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ], {background: "#4d9999", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                            ["blank", "3px"],
                            ["hoverless-clickable", "prismWell2_collect"],
                            ["blank", "3px"],
                            ["style-column", [
                                ["raw-html", formatShortWhole(player.wel.modules[6].completions) + " ζ ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", "(x" + formatShort(player.wel.modules[6].completionEffect) + " Prisms)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                            ], {border: "3px solid #4d9999", borderRadius: "0 0 10px 10px", height: "44px"}],
                        
                        ], {background: "#335966",border: "3px solid #335966", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                        ["blank", "9px"],
                    ]],
                    )
                    } else {
                            // prism well zeta locked
                        look[3][1].push(["blank", "1px"])
                        look[3][1].push(
                            ["style-column", [
                                ["style-column", [
                                    ["raw-html", "Prism Well ζ<br><small>Req: 500 ε ↻</small>", {color: "white", fontSize: "16px"}],
                                ], {background: "black",border: "3px solid #663737", borderRadius: "103px 103px 16px 16px", width: "150px", height: "330px", lineHeight: "1"}],
                            ["blank", "9px"],
                        ]],
                    )
                    }
                    if (player.wel.modules[5].completions.gte(500)) {
                        if (player.wel.modules[6].completions.gte(1e6)) {
                            // prism well eta
                            look[3][1].push(["blank", "1px"])
                            look[3][1].push(
                            ["style-column", [
                                ["style-column", [
                                        ["style-column", [
                                            ["style-column", [
                                                ["style-column", [
                                                    ["raw-html", formatSimple(player.wel.modules[7].time.div(player.wel.modules[7].maxTime).min(1).max(0).mul(100), 0) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                                ], {background: "#4d9999", border: "3px solid #335966", borderRadius: "100px", width: "75px", height:"75px"}],
                                            ], {borderRadius: "50%", width: "125px", height:"125px", margin: "9.5px", border: "3px solid #335966",
                                                background: player.wel.modules[7].time.lt(player.wel.modules[7].maxTime) ?
                                                "conic-gradient(#d6ebff " + (player.wel.modules[7].time.div(player.wel.modules[7].maxTime)).min(1).max(0) * 360 + "deg, #0b1417 0deg)" : "#a1ffff"
                                            }],
                                        ], {background: "linear-gradient(0deg, #335966 50%, #4d9999 50% )", height: "150px", borderRadius: "75px 75px 0 0"}],
                                ["raw-html", "Prism Well η", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", player.wel.modules[7].time.lt(player.wel.modules[7].maxTime) ? formatSimpleTime(player.wel.modules[7].maxTime.sub(player.wel.modules[7].time).div(player.wel.modules[7].timeSpeed), 2) : formatSimpleTime(player.wel.modules[7].maxTime.div(player.wel.modules[7].timeSpeed), 2) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["blank", "9px"],
                                ["style-column", [
                                        ["raw-html", "+" + formatShortWhole(layers.pri.clickables["prismWell3_collect"].lightGain()) + " Prisms", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9999", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                ["blank", "3px"],
                                ["hoverless-clickable", "prismWell3_collect"],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatShortWhole(player.wel.modules[7].completions) + " η ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatShort(player.wel.modules[7].completionEffect) + " Prisms)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9999", borderRadius: "0 0 10px 10px", height: "44px"}],
                            
                            ], {background: "#335966",border: "3px solid #335966", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                            ["blank", "9px"],
                        ]],
                        )
                        } else {
                                // prism well eta locked
                            look[3][1].push(["blank", "1px"])
                            look[3][1].push(
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "Prism Well η<br><small>Req: 1,000,000 ζ ↻</small>", {color: "white", fontSize: "16px"}],
                                    ], {background: "black",border: "3px solid #663737", borderRadius: "103px 103px 16px 16px", width: "150px", height: "330px", lineHeight: "1"}],
                                ["blank", "9px"],
                            ]],
                        )
                        }
                    }
                    if (player.wel.modules[6].completions.gte(1e6)) {
                        if (player.wel.modules[7].completions.gte(1e12)) {
                            // prism well theta
                            look[3][1].push(["blank", "1px"])
                            look[3][1].push(
                            ["style-column", [
                                ["style-column", [
                                        ["style-column", [
                                            ["style-column", [
                                                ["style-column", [
                                                    ["raw-html", formatSimple(player.wel.modules[8].time.div(player.wel.modules[8].maxTime).min(1).max(0).mul(100), 0) + "%", {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                                                ], {background: "#4d9999", border: "3px solid #335966", borderRadius: "100px", width: "75px", height:"75px"}],
                                            ], {borderRadius: "50%", width: "125px", height:"125px", margin: "9.5px", border: "3px solid #335966",
                                                background: player.wel.modules[8].time.lt(player.wel.modules[8].maxTime) ?
                                                "conic-gradient(#d6ebff " + (player.wel.modules[8].time.div(player.wel.modules[8].maxTime)).min(1).max(0) * 360 + "deg, #0b1417 0deg)" : "#a1ffff"
                                            }],
                                        ], {background: "linear-gradient(0deg, #335966 50%, #4d9999 50% )", height: "150px", borderRadius: "75px 75px 0 0"}],
                                ["raw-html", "Prism Well θ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["raw-html", player.wel.modules[8].time.lt(player.wel.modules[8].maxTime) ? formatSimpleTime(player.wel.modules[8].maxTime.sub(player.wel.modules[8].time).div(player.wel.modules[8].timeSpeed), 2) : formatSimpleTime(player.wel.modules[8].maxTime.div(player.wel.modules[8].timeSpeed), 2) + " CD", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                ["blank", "9px"],
                                ["style-column", [
                                        ["raw-html", "+" + formatShortWhole(layers.pri.clickables["prismWell4_collect"].lightGain()) + " Prisms", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9999", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                ["blank", "3px"],
                                ["hoverless-clickable", "prismWell4_collect"],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatShortWhole(player.wel.modules[8].completions) + " θ ↻", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatShort(player.wel.modules[8].completionEffect) + " Prisms)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9999", borderRadius: "0 0 10px 10px", height: "44px"}],
                            
                            ], {background: "#335966",border: "3px solid #335966", borderRadius: "103px 103px 16px 16px", width: "150px"}],
                            ["blank", "9px"],
                        ]],
                        )
                        } else {
                                // prism well theta locked
                            look[3][1].push(["blank", "1px"])
                            look[3][1].push(
                                ["style-column", [
                                    ["style-column", [
                                        ["raw-html", "Prism Well θ<br><small>Req: 1e12 η ↻</small>", {color: "white", fontSize: "16px"}],
                                    ], {background: "black",border: "3px solid #663737", borderRadius: "103px 103px 16px 16px", width: "150px", height: "330px", lineHeight: "1"}],
                                ["blank", "9px"],
                            ]],
                        )
                        }
                    }
                    return look
                },
            },
        },
    },
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + formatWhole(player.wel.light) + "</h3> light." }, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ["style-row", [
            ["raw-html", () => { return "You have <h3>" + formatWhole(player.pri.prisms) + "</h3> prisms." }, {color: "#d6ebff", fontSize: "24px", fontFamily: "monospace"}],
            ["style-row", [
                ["raw-html", () => {return "(+" + formatWhole(player.pri.prismsToGet) + ")"}, () => {
                    let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                    if (player.pri.prismsToGet.gte(1)) {look.color = "#d6ebff"} else {look.color = "gray"}
                    return look
                }],
            ], () => {return {display: hasMilestone("prj", 202) ? "" : "none !important"}}],
        ]],
        ["raw-html", () => {return "(" + formatSimple(player.pri.totalPrisms) + " total)"}, {color: "#d6ebff", fontSize: "18px", fontFamily: "monospace"}],
        ["raw-html", () => {return player.pri.prismaticResetTime.gte(30) ? "" : "(Reduced to x" + format(player.pri.prismaticResetTime.div(30), 2) + " yield, " + formatTime(Decimal.sub(30, player.pri.prismaticResetTime)) + " until x1)"}, {color: "#ffff00", fontSize: "18px", fontFamily: "monospace"}],
        ["blank", "15px"],
        ["style-row", [
            ["clickable", "prismaticReset"],
            ["style-row", [
                ["blank", "3px", {width: "6px"}],
                ["style-row", [
                    ["style-column", [
                        ["blank", "8px"],
                        ["style-column", [
                            ["raw-html", () => {return player.pri.autoPrismaticType ? "Auto-Reset Time" : "Auto-Reset Amount"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "200px", height: "25px"}],
                        ["blank", "8px"],
                        ["style-column", [
                            ["raw-html", () => {return player.pri.autoPrismaticType ? formatTime(player.pri.autoPrismaticTime) + "/" + formatTime(player.pri.autoPrismaticAmount) : "+" + formatWhole(player.pri.autoPrismaticAmount) + " Prisms"}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                        ], {width: "197px", height: "25px", background: "#4d9999", marginLeft: "3px", borderRadius: "10px 10px 0 0"}],
                        ["blank", "3px"],
                        ["text-input", "autoPrismaticInput", {width: "197px", height: "25px", marginLeft: "3px", backgroundColor: "#1a2d33", color: "white", fontSize: "16px", textAlign: "center", border: "0px", borderRadius: "0 0 0 7px", padding: "0px 0px"}],
                    ], {width: "200px", height: "100px"}],
                    ["style-column", [
                        ["row", [["clickable", "autoPrismaticAmount"], ["blank", "3px", {width: "3px"}], ["clickable", "autoPrismaticTime"]]],
                        ["blank", "3px"],
                        ["clickable", "autoPrismaticToggle"],
                    ], {width: "200px", height: "100px"}],
                ], {width: "400px", height: "100px", backgroundColor: "#335966", borderRadius: "10px"}],
            ], () => {return {display: hasMilestone("prj", 211) ? "" : "none !important"}}],
        ]],
        ["blank", "15px"],
        ["style-column", [
            ["microtabs", "stuff", { 'border-width': '0px' }],
        ], () => {
            return {display: player.pri.bestPrisms.gt(0) ? "" : "none !important"}
        }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasMilestone("prj", 201)},
    hotkeys: [
        {
            key: "p", 
            description: "Prismatic",
            onPress() {
                clickClickable(this.layer, "prismaticReset")
            },
        },
    ]
})
