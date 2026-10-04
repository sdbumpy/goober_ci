addLayer("blu", {
    name: "Blueshift",
    symbol: "BL",
    universe: "UD",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: true,

        totalBlueshifts: new Decimal(0),
        bestBlueshifts: new Decimal(0),
        extraBlueshifts: new Decimal(0),
        effectiveBlueshifts: new Decimal(0),
        blueshifts: {
            1: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(10),
                resetSafety: false,
            },
            2: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(20),
                resetSafety: false,
            },
            3: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(40),
                resetSafety: false,
            },
            4: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(160),
                resetSafety: false,
            },
            5: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(6),
                resetSafety: false,
            },
            6: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(12),
                resetSafety: false,
            },
            7: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(24),
                resetSafety: false,
            },
            8: {
                amount: new Decimal(0),
                cycleGainMul: new Decimal(1),
                cycleSpeedRoot: new Decimal(1),
                shiftBase: new Decimal(160),
                resetSafety: false,
            },
        },
        blueshiftEffectBase: new Decimal(2),
        blueshiftEffect: new Decimal(1),
        blueshiftEffect2Base: new Decimal(3),
        blueshiftEffect2: new Decimal(1),
        blueshiftEffect3Base: new Decimal(4),
        blueshiftEffect3: new Decimal(1),
        blueshiftEffectStrength: new Decimal(1),
        blueshiftYieldStrength: new Decimal(1),

        bestPrisms: new Decimal(0),
    }},
    automate() {},
    nodeStyle() {
        return {
            color: "#303080",
            background: "linear-gradient(45deg, #a1a1ff 50%, #b58cde 100%)",
            "background-origin": "border-box",
            "border-color": "#303080",
        };
    },
    tooltip: "Blueshift",
    color: "#ffffd1",
    update(delta) {

        // BLUESHIFTS
        
        player.blu.blueshifts[1].shiftBase = new Decimal(10)
        player.blu.blueshifts[2].shiftBase = new Decimal(20)
        player.blu.blueshifts[3].shiftBase = new Decimal(40)
        player.blu.blueshifts[4].shiftBase = new Decimal(160)
        player.blu.blueshifts[5].shiftBase = new Decimal(6)
        player.blu.blueshifts[6].shiftBase = new Decimal(12)
        player.blu.blueshifts[7].shiftBase = new Decimal(24)
        player.blu.blueshifts[8].shiftBase = new Decimal(160)

        player.blu.totalBlueshifts = new Decimal(0)
        for (let i = 1; i < Object.keys(player.blu.blueshifts).length + 1; i++) {
            let blueshift = player.blu.blueshifts[i]

            blueshift.resetSafety = false
            let b = i % 4 == 0 ? 0.5 : 1
            blueshift.cycleGainMul = blueshift.shiftBase.pow(blueshift.amount).pow(player.blu.blueshiftYieldStrength)
            blueshift.cycleSpeedRoot = blueshift.amount.mul(b).add(1)
            player.blu.totalBlueshifts = player.blu.totalBlueshifts.add(blueshift.amount)
        }
        player.blu.extraBlueshifts = new Decimal(0)
        player.blu.extraBlueshifts = player.blu.extraBlueshifts.add(player.bum.fountains[3].completionEffect)
        if (player.blu.bestBlueshifts.lt(player.blu.totalBlueshifts)) player.blu.bestBlueshifts = player.blu.totalBlueshifts;
        if (player.blu.bestPrisms.lt(player.pri.prisms)) player.blu.bestPrisms = player.pri.prisms;
        player.blu.effectiveBlueshifts = player.blu.totalBlueshifts.add(player.blu.extraBlueshifts)
        
        // BLUESHIFT EFFECTS

        player.blu.blueshiftEffectBase = new Decimal(2)
        player.blu.blueshiftEffect = player.blu.totalBlueshifts.add(player.blu.extraBlueshifts).pow(0.75).pow_base(player.blu.blueshiftEffectBase)

        player.blu.blueshiftEffect2Base = new Decimal(3)
        player.blu.blueshiftEffect2 = player.blu.totalBlueshifts.add(player.blu.extraBlueshifts).sub(3).max(0).pow(0.75).pow_base(player.blu.blueshiftEffect2Base)

        player.blu.blueshiftEffect3Base = new Decimal(4)
        player.blu.blueshiftEffect3 = player.blu.totalBlueshifts.add(player.blu.extraBlueshifts).sub(5).max(0).pow(0.75).pow_base(player.blu.blueshiftEffect3Base)
        if (hasUpgrade("bum", 14)) player.blu.blueshiftEffect3 = player.blu.blueshiftEffect3.pow(1.5);

        // BLUESHIFT STRENGTH

        player.blu.blueshiftEffectStrength = new Decimal(1);

        player.blu.blueshiftYieldStrength = new Decimal(1);
        player.blu.blueshiftYieldStrength = player.blu.blueshiftYieldStrength.mul(player.pri.fountains[10].completionEffect)

    },
    blueshiftReset(isRewarded, id) {
        if (!player.wel.modules[id].maxTime.div(player.wel.modules[id].timeSpeed).lte(0.1)) return;
        if (isRewarded) {
            if (!player.wel.modules[id].maxTime.div(player.wel.modules[id].timeSpeed).lte(0.1)) return;
            player.blu.blueshifts[id].amount = player.blu.blueshifts[id].amount.add(1)
            if (!hasAchievement("achievements", 1211)) completeAchievement("achievements", 1211);
        }
        layers.pri.prismReset(false)
        player.wel.modules[4].time = player.wel.modules[4].maxTime
        player.wel.modules[4].timeSpeed = new Decimal(1)
        player.wel.modules[4].completions = new Decimal(0)

        player.wel.fountains[1].time = new Decimal(0)
        player.wel.fountains[2].time = new Decimal(0)
        player.wel.fountains[3].time = new Decimal(0)
        player.wel.fountains[4].time = new Decimal(0)

        let retainedPyramidCycleFactor = 0
        if (isRewarded) {
            if (hasMilestone("prj", 310)) retainedPyramidCycleFactor = 1;
            else if (hasMilestone("prj", 308)) retainedPyramidCycleFactor = 0.75;
        }

        player.pri.fountains[1].completions = player.pri.fountains[1].completions.mul(retainedPyramidCycleFactor).floor()
        player.pri.fountains[1].time = new Decimal(0)
        player.pri.fountains[1].canAddCompletion = false
        player.pri.fountains[2].completions = player.pri.fountains[2].completions.mul(retainedPyramidCycleFactor).floor()
        player.pri.fountains[2].time = new Decimal(0)
        player.pri.fountains[2].canAddCompletion = false
        player.pri.fountains[3].completions = player.pri.fountains[3].completions.mul(retainedPyramidCycleFactor).floor()
        player.pri.fountains[3].time = new Decimal(0)
        player.pri.fountains[3].canAddCompletion = false
        player.pri.fountains[4].completions = player.pri.fountains[4].completions.mul(retainedPyramidCycleFactor).floor()
        player.pri.fountains[4].time = new Decimal(0)
        player.pri.fountains[4].canAddCompletion = false
        player.pri.fountains[5].completions = player.pri.fountains[5].completions.mul(retainedPyramidCycleFactor).floor()
        player.pri.fountains[5].time = new Decimal(0)
        player.pri.fountains[5].canAddCompletion = false
        player.pri.fountains[6].completions = player.pri.fountains[6].completions.mul(retainedPyramidCycleFactor).floor()
        player.pri.fountains[6].time = new Decimal(0)
        player.pri.fountains[6].canAddCompletion = false
        
        player.pri.fountains[7].completions = player.pri.fountains[7].completions.mul(retainedPyramidCycleFactor).floor()
        player.pri.fountains[7].time = new Decimal(0)
        player.pri.fountains[7].canAddCompletion = false
        player.pri.fountains[8].completions = player.pri.fountains[8].completions.mul(retainedPyramidCycleFactor).floor()
        player.pri.fountains[8].time = new Decimal(0)
        player.pri.fountains[8].canAddCompletion = false
        player.pri.fountains[9].completions = player.pri.fountains[9].completions.mul(retainedPyramidCycleFactor).floor()
        player.pri.fountains[9].time = new Decimal(0)
        player.pri.fountains[9].canAddCompletion = false

        player.pri.fountains[10].completions = player.pri.fountains[10].completions.mul(retainedPyramidCycleFactor).floor()
        player.pri.fountains[10].time = new Decimal(0)
        player.pri.fountains[10].canAddCompletion = false
        player.pri.fountains[11].completions = player.pri.fountains[11].completions.mul(retainedPyramidCycleFactor).floor()
        player.pri.fountains[11].time = new Decimal(0)
        player.pri.fountains[11].canAddCompletion = false
        player.pri.fountains[12].completions = player.pri.fountains[12].completions.mul(retainedPyramidCycleFactor).floor()
        player.pri.fountains[12].time = new Decimal(0)
        player.pri.fountains[12].canAddCompletion = false
        
        if (!hasMilestone('prj', 211)) {
            
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
        
        }

        if (hasUpgrade("bum", 12) && isRewarded) {
            player.pri.prisms = player.blu.bestPrisms.pow(0.25)
            player.pri.bestPrisms = player.blu.bestPrisms.pow(0.25)
            player.pri.totalPrisms = player.blu.bestPrisms.pow(0.25).add(4)
            player.pri.bestPrismsInOneReset = player.blu.bestPrisms.pow(0.25)
        } else {
            player.pri.prisms = new Decimal(0)
            player.pri.bestPrisms = new Decimal(0)
            player.pri.totalPrisms = new Decimal(4)
            player.pri.bestPrismsInOneReset = new Decimal(0)
        }
            player.pri.prismsToGet = new Decimal(0)
        
        for (let i = 1; i <= 4; i++) {
            player.wel.modules[i].bestCompletions = new Decimal(0)
        }

        player.wel.lightGen = new Decimal(0)
    },
    branches: ["wel"],
    clickables: {
        "lightWell1_blueshift": {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[1].maxTime.div(player.wel.modules[1].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
                if (player.blu.blueshifts[1].resetSafety) return;
                player.blu.blueshifts[1].resetSafety = true
                layers.blu.blueshiftReset(true, 1)
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "lightWell2_blueshift": {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[2].maxTime.div(player.wel.modules[2].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
                if (player.blu.blueshifts[2].resetSafety) return;
                player.blu.blueshifts[2].resetSafety = true
                layers.blu.blueshiftReset(true, 2)
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "lightWell3_blueshift": {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[3].maxTime.div(player.wel.modules[3].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
                if (player.blu.blueshifts[3].resetSafety) return;
                player.blu.blueshifts[3].resetSafety = true
                layers.blu.blueshiftReset(true, 3)
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "lightWell4_blueshift": {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[4].maxTime.div(player.wel.modules[4].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
                if (player.blu.blueshifts[4].resetSafety) return;
                player.blu.blueshifts[4].resetSafety = true
                layers.blu.blueshiftReset(true, 4)
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "prismWell1_blueshift": {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[5].maxTime.div(player.wel.modules[5].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
                if (player.blu.blueshifts[5].resetSafety) return;
                player.blu.blueshifts[5].resetSafety = true
                layers.blu.blueshiftReset(true, 5)
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "prismWell2_blueshift": {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[6].maxTime.div(player.wel.modules[6].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
                if (player.blu.blueshifts[6].resetSafety) return;
                player.blu.blueshifts[6].resetSafety = true
                layers.blu.blueshiftReset(true, 2)
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "prismWell3_blueshift": {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[7].maxTime.div(player.wel.modules[7].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
                if (player.blu.blueshifts[7].resetSafety) return;
                player.blu.blueshifts[7].resetSafety = true
                layers.blu.blueshiftReset(true, 3)
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "prismWell4_blueshift": {
            title() { return "<h3>Reset</h3> →" },
            canClick() { return player.wel.modules[8].maxTime.div(player.wel.modules[8].timeSpeed).lte(0.1)},
            unlocked() { return true },
            onClick() {
                if (player.blu.blueshifts[8].resetSafety) return;
                player.blu.blueshifts[8].resetSafety = true
                layers.blu.blueshiftReset(true, 4)
            },
            style() {
                let look = {width: "150px", minHeight: "50px", borderRadius: "0"}
                if (this.canClick()) {
                    look.backgroundColor = "#ffffd1"
                    look.color = "black"
                    look.border = "3px solid #0000003f"
                } else {
                    look.background = "#361e1e"
                    look.color = "white"
                    look.border = "3px solid #3366597f"
                }
                return look
            },
        },
        "lightWell1_autoBlueshiftToggle": {
            title() {return "<h3>" + (player.pri.autoPrismaticToggle ? "Auto-Reset: ON" : "Auto-Reset: OFF") + "</h3><br><small>Requires 1 Focus"},
            canClick() {return player.prj.maxFocused.sub(player.prj.focused).gte(1) || player.pri.autoPrismaticToggle},
            unlocked() {return hasMilestone("prj", 306)},
            onClick() {
            },
            style() {
                let look = {width: "150px", minHeight: "45.5px", maxHeight: "45.5px", fontSize: "9px", border: "3px solid #0000003f", borderRadius: "0", lineHeight: "1", marginTop: "3px"}
                if (player.pri.autoPrismaticToggle) {look.backgroundColor = "#dfffdf"} else {look.backgroundColor = "#4d4d99"}
                return look
            },
        },
        "lightWell2_autoBlueshiftToggle": {
            title() {return "<h3>" + (player.pri.autoPrismaticToggle ? "Auto-Reset: ON" : "Auto-Reset: OFF") + "</h3><br><small>Requires 1 Focus"},
            canClick() {return player.prj.maxFocused.sub(player.prj.focused).gte(1) || player.pri.autoPrismaticToggle},
            unlocked() {return hasMilestone("prj", 307)},
            onClick() {
            },
            style() {
                let look = {width: "150px", minHeight: "45.5px", maxHeight: "45.5px", fontSize: "9px", border: "3px solid #0000003f", borderRadius: "0", lineHeight: "1", marginTop: "3px"}
                if (player.pri.autoPrismaticToggle) {look.backgroundColor = "#dfffdf"} else {look.backgroundColor = "#4d4d99"}
                return look
            },
        },
        "lightWell3_autoBlueshiftToggle": {
            title() {return "<h3>" + (player.pri.autoPrismaticToggle ? "Auto-Reset: ON" : "Auto-Reset: OFF") + "</h3><br><small>Requires 1 Focus"},
            canClick() {return player.prj.maxFocused.sub(player.prj.focused).gte(1) || player.pri.autoPrismaticToggle},
            unlocked() {return hasMilestone("prj", 308)},
            onClick() {
            },
            style() {
                let look = {width: "150px", minHeight: "45.5px", maxHeight: "45.5px", fontSize: "9px", border: "3px solid #0000003f", borderRadius: "0", lineHeight: "1", marginTop: "3px"}
                if (player.pri.autoPrismaticToggle) {look.backgroundColor = "#dfffdf"} else {look.backgroundColor = "#4d4d99"}
                return look
            },
        },
        "lightWell4_autoBlueshiftToggle": {
            title() {return "<h3>" + (player.pri.autoPrismaticToggle ? "Auto-Reset: ON" : "Auto-Reset: OFF") + "</h3><br><small>Requires 1 Focus"},
            canClick() {return player.prj.maxFocused.sub(player.prj.focused).gte(1) || player.pri.autoPrismaticToggle},
            unlocked() {return hasMilestone("prj", 309)},
            onClick() {
            },
            style() {
                let look = {width: "150px", minHeight: "45.5px", maxHeight: "45.5px", fontSize: "9px", border: "3px solid #0000003f", borderRadius: "0", lineHeight: "1", marginTop: "3px"}
                if (player.pri.autoPrismaticToggle) {look.backgroundColor = "#dfffdf"} else {look.backgroundColor = "#4d4d99"}
                return look
            },
        },
    },
    bars: {},
    upgrades: {},
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Blueshifts": {
                buttonStyle() { return { color: "white", borderWidth: "2px", borderRadius: "20px"} },
                unlocked() { return true },
                content() {
                    return [
                        ["blank", "25px"],
                        ["style-column", [
                                ["raw-html", 
                                    "<small>When a well's timer gets at or below 0.1s, you can do a blueshift. Blueshifting resets everything prismatic does, as well as prisms and the pyramid's fountains. Each blueshift done roots cycle speed and increases yield for its respective well. You also gain multipliers from total blueshifts done.</small>"
                                , {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ], {background: "linear-gradient(90deg, transparent, #3f3fff3f, transparent)", border: "3px solid #3f3fff7f", borderRadius: "25px", padding: "12px", width: "600px"}],
                        ["blank", "25px"],
                        ["raw-html", "You have blueshifted <h3>" + formatWhole(player.blu.totalBlueshifts) + "</h3> " + (player.blu.extraBlueshifts.gt(0) ? ("+ " + formatSimple(player.blu.extraBlueshifts) + " ") : "") + "times.", {color: "#ffffd1", fontSize: "18px", fontFamily: "monospace"}],
                        ["style-column", [
                            ["raw-html", "<small>Effective total blueshifts are multiplied by x" + format(player.blu.blueshiftEffectStrength, 3) + ".</small>", {color: "#ffffd1", fontSize: "18px", fontFamily: "monospace"}],
                        ], {display: player.blu.blueshiftEffectStrength.gt(1) ? "" : "none !important"}],
                        ["raw-html", "<small>Boosts light well ↻ gain by x" + formatSimple(player.blu.blueshiftEffect) + ".</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ["style-column", [
                            ["raw-html", player.blu.totalBlueshifts.lt(4) ? "<small style='color:#ffffff9f'>Unlock at 4 blueshifts.</small>" : "<small>Boosts prism gain by x" + formatSimple(player.blu.blueshiftEffect2) + ".</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ], {display: hasMilestone("prj", 207) ? "" : "none !important"}],
                        ["style-column", [
                            ["raw-html", player.blu.totalBlueshifts.lt(6) ? "<small style='color:#ffffff9f'>Unlock at 6 blueshifts.</small>" : "<small>Boosts light gain by x" + formatSimple(player.blu.blueshiftEffect3) + ".</small>", {color: "white", fontSize: "18px", fontFamily: "monospace"}],
                        ], {display: hasMilestone("prj", 304) ? "" : "none !important"}],
                        ["blank", "25px"],
                        ["style-column", [
                            ["raw-html", "<small>Per-well blueshift effects are ^" + format(player.blu.blueshiftYieldStrength, 3) + " stronger.</small>", {color: "#ffffd1", fontSize: "18px", fontFamily: "monospace"}],
                            ["blank", "10px"],
                        ], {display: player.blu.blueshiftYieldStrength.gt(1) ? "" : "none !important"}],

                        ["style-row", [

                            // alpha
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Light Well α", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[1].maxTime.div(player.wel.modules[1].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", "lightWell1_blueshift"],
                                    ["clickable", "lightWell1_autoBlueshiftToggle"],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[1].amount) + " α →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatShortWhole(player.blu.blueshifts[1].cycleGainMul) + " α Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(√" + formatSimple(player.blu.blueshifts[1].cycleSpeedRoot) + " α Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#336659", borderRadius: "13px", width: "150px", padding: "3px"}],

                            ["blank", "", {width: "6px"}],

                            // beta
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Light Well β", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[2].maxTime.div(player.wel.modules[2].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", "lightWell2_blueshift"],
                                    ["clickable", "lightWell2_autoBlueshiftToggle"],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[2].amount) + " β →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatShortWhole(player.blu.blueshifts[2].cycleGainMul) + " β Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(√" + formatSimple(player.blu.blueshifts[2].cycleSpeedRoot) + " β Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#336659", borderRadius: "13px", width: "150px", padding: "3px", display: player.wel.modules[1].completions.gte(50) || player.blu.blueshifts[2].amount.gt(0) ? "" : "none !important"}],

                            ["blank", "", {width: "6px"}],

                            // gamma
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Light Well γ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[3].maxTime.div(player.wel.modules[3].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9973", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", "lightWell3_blueshift"],
                                    ["clickable", "lightWell3_autoBlueshiftToggle"],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[3].amount) + " γ →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatShortWhole(player.blu.blueshifts[3].cycleGainMul) + " γ Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(√" + formatSimple(player.blu.blueshifts[3].cycleSpeedRoot) + " γ Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9973", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#336659", borderRadius: "13px", width: "150px", padding: "3px", display: player.wel.modules[2].completions.gte(500) || player.blu.blueshifts[3].amount.gt(0) ? "" : "none !important"}],

                            ["blank", "", {width: "6px"}],
                            // delta
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Light Well δ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[4].maxTime.div(player.wel.modules[4].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#408069", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", "lightWell4_blueshift"],
                                    ["clickable", "lightWell4_autoBlueshiftToggle"],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[4].amount) + " δ →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatShortWhole(player.blu.blueshifts[4].cycleGainMul) + " δ Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(√" + formatSimple(player.blu.blueshifts[4].cycleSpeedRoot) + " δ Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #408069", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#274d48", borderRadius: "13px", width: "150px", padding: "3px", display: (hasMilestone("prj", 303) && player.wel.modules[3].completions.gte(1e12)) || player.blu.blueshifts[4].amount.gt(0) ? "" : "none !important"}],
                        ]],
                        ["blank", "10px"],
                        ["style-row", [
                            // epsilon
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Prism Well ε", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[5].maxTime.div(player.wel.modules[5].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9999", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", "prismWell1_blueshift"],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[5].amount) + " ε →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatShortWhole(player.blu.blueshifts[5].cycleGainMul) + " ε Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(√" + formatSimple(player.blu.blueshifts[5].cycleSpeedRoot) + " ε Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9999", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#335966", borderRadius: "13px", width: "150px", padding: "3px", display: hasMilestone("prj", 406) || player.blu.blueshifts[6].amount.gt(0) ? "" : "none !important"}],

                            ["blank", "", {width: "6px"}],

                            // zeta
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Prism Well ζ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[6].maxTime.div(player.wel.modules[6].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9999", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", "prismWell2_blueshift"],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[6].amount) + " ζ →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatShortWhole(player.blu.blueshifts[6].cycleGainMul) + " ζ Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(√" + formatSimple(player.blu.blueshifts[6].cycleSpeedRoot) + " ζ Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9999", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#335966", borderRadius: "13px", width: "150px", padding: "3px", display: hasMilestone("prj", 406) || player.blu.blueshifts[6].amount.gt(0) ? "" : "none !important"}],

                            ["blank", "", {width: "6px"}],

                            // eta
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Prism Well η", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[7].maxTime.div(player.wel.modules[7].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#4d9999", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", "prismWell3_blueshift"],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[7].amount) + " η →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatShortWhole(player.blu.blueshifts[7].cycleGainMul) + " η Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(√" + formatSimple(player.blu.blueshifts[7].cycleSpeedRoot) + " η Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #4d9999", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#335966", borderRadius: "13px", width: "150px", padding: "3px", display: hasMilestone("prj", 406) || player.blu.blueshifts[7].amount.gt(0) ? "" : "none !important"}],

                            ["blank", "", {width: "6px"}],
                            // theta
                            ["style-row", [
                                ["style-column", [
                                    ["blank", "9px"],
                                    ["raw-html", "Prism Well θ", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "<small>(" + format(player.wel.modules[8].maxTime.div(player.wel.modules[8].timeSpeed)) + "/0.1s)</small>", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["blank", "9px"],
                                    ["style-column", [
                                        ["raw-html", "+1 Blueshift", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ], {background: "#407780", borderRadius: "10px 10px 0px 0px", width: "150px", height:"25px"}],
                                    ["blank", "3px"],
                                    ["clickable", "prismWell4_blueshift"],
                                ]],
                                ["blank", "3px"],
                                ["style-column", [
                                    ["raw-html", formatWhole(player.blu.blueshifts[8].amount) + " θ →", {color: "white", fontSize: "16px", fontFamily: "monospace"}],
                                    ["raw-html", "(x" + formatShortWhole(player.blu.blueshifts[8].cycleGainMul) + " θ Yield)", {color: "white", fontSize: "12px", fontFamily: "monospace"}],
                                    ["raw-html", "(√" + formatSimple(player.blu.blueshifts[8].cycleSpeedRoot) + " θ Spd)", {color: "#ffff00", fontSize: "12px", fontFamily: "monospace"}],
                                ], {border: "3px solid #407780", borderRadius: "0 0 10px 10px", width: "144px", height: "60px"}],
                            ], {backgroundColor: "#263e4d", borderRadius: "13px", width: "150px", padding: "3px", display: hasMilestone("prj", 406) || player.blu.blueshifts[8].amount.gt(0) ? "" : "none !important"}],
                        ]],
                        ["blank", "25px"],
                    ]
                }
            },
        },
    },
    tabFormat: [
        ["style-column", [
            ["raw-html", () => {return "Light wells operate at <h3>x" + format(player.wel.lightWellSpeed) + "</h3> speed."}, {color: "white", fontSize: "18px", fontFamily: "monospace"}],
        ],  () => {return {display: player.wel.lightWellSpeed.gt(1) ? "" : "none !important"}}],
        ["style-column", [
            ["raw-html", () => {return "<small>Next blueshift at <h3>x" + formatWhole(
                player.blu.blueshifts[1].amount.add(1).pow_base(100)
                .min(player.blu.blueshifts[2].amount.add(1).pow_base(600))
                .min(player.blu.blueshifts[3].amount.add(1).pow_base(3000))
                .min(player.blu.blueshifts[4].amount.mul(0.5).add(1).pow_base(24190000))
            ) + "</h3> speed.</small>"}, {color: "white", textShadow: "1px 1px 0 #3f3fff, -1px 1px 0 #3f3fff, 1px -1px 0 #3f3fff, -1px -1px 0 #3f3fff", fontSize: "18px", fontFamily: "monospace"}],
        ],  () => {return {display: hasMilestone("prj", 301) ? "" : "none !important"}}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
    ],
    layerShown() { return player.startedGame == true && hasMilestone("prj", 301)},
    hotkeys: [
        {
            key: "!", 
            description: "Blueshift light well α",
            onPress() {
                clickClickable(this.layer, "lightWell1_blueshift")
            },
        },
        {
            key: "@", 
            description: "Blueshift light well β",
            onPress() {
                clickClickable(this.layer, "lightWell2_blueshift")
            },
        },
        {
            key: "#", 
            description: "Blueshift light well γ",
            onPress() {
                clickClickable(this.layer, "lightWell3_blueshift")
            },
        },
        {
            key: "$", 
            description: "Blueshift light well δ",
            onPress() {
                clickClickable(this.layer, "lightWell4_blueshift")
            },
        },
	]
})