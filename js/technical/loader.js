// Stuff that must be intitialized before loading mod files
// Hopefully the Interspace stuff is temporary :/

const createPourClickable = function (layer, id, data = {}) {
    if (!data.primaryColor) data.primaryColor = "#999999"
    if (!data.secondaryColor) data.secondaryColor = "#666666"
    if (!data.progressFrontColor) data.progressFrontColor = "#ffffff"
    if (!data.textColor) data.textColor = "#ffffff"
    let clickable = {
        title() { return "<h3>Pour</h3>" },
        canClick() {
            let fountain = layers[layer].fountains[id]
            return player.prj.focused.lt(player.prj.maxFocused) && fountain.currencyLocation()[fountain.currencyInternalName].gte(player[layer].fountains[id].statReq) && !player[layer].fountains[id].focused
        },
        unlocked() { return true },
        onClick() {
            if (player[layer].fountains[id].pourSafety) return;
            player[layer].fountains[id].pourSafety = true
            let fountain = layers[layer].fountains[id]
            fountain.currencyLocation()[fountain.currencyInternalName] = fountain.currencyLocation()[fountain.currencyInternalName].sub(player[layer].fountains[id].statReq)
            player.prj.focused = player.prj.focused.add(1)
            player[layer].fountains[id].focused = true
        },
        style() {
            let look = {width: "75px", minHeight: "30px", borderRadius: "0px"}
            if (player[layer].fountains[id].focused || player[layer].fountains[id].isFocused) {
                look.backgroundColor = data.secondaryColor
                look.border = "3px solid " + data.primaryColor
                look.color = "white"
            } else if (this.canClick()) {
                look.backgroundColor = data.progressFrontColor
                look.border = "3px solid " + data.secondaryColor + "7f"
                look.color = "black"
            } else {
                look.background = "#361e1e"
                look.border = "3px solid " + data.secondaryColor + "7f"
                look.color = "white"
            }
            return look
        },
    }
    return clickable
}
const createFountainFocusClickable = function (layer, id, data = {}) {
    if (!data.primaryColor) data.primaryColor = "#999999"
    if (!data.secondaryColor) data.secondaryColor = "#666666"
    if (!data.textColor) data.textColor = "#ffffff"
    let clickable = {
        title() { return layers[layer].fountains[id].canAuto() ? "<h3>Focus</h3>" : "" },
        canClick() {
            return player.prj.focused.lt(player.prj.maxFocused) && !player[layer].fountains[id].isFocused
        },
        unlocked() { return true },
        onClick() {
            if (player[layer].fountains[id].focusSafety) return;
            player[layer].fountains[id].focusSafety = true
            player[layer].fountains[id].isFocused = true
            player.prj.focused = player.prj.focused.add(1)
        },
        style() {
            let look = {width: "75px", minHeight: "30px", borderRadius: "0px"}
            if (player[layer].fountains[id].focused || player[layer].fountains[id].isFocused) {
                look.backgroundColor = data.secondaryColor
                look.border = "3px solid " + data.primaryColor
                look.color = "white"
            } else if (this.canClick()) {
                look.backgroundColor = "#dfffdf"
                look.border = "3px solid " + data.secondaryColor + "7f"
                look.color = "black"
            } else {
                look.background = "#361e1e"
                look.border = "3px solid " + data.secondaryColor + "7f"
                look.color = "white"
            }
            return look
        },
    }
    return clickable
}

const createSpecPourClickable = function (layer, id, data = {}) {
    if (!data.primaryColor) data.primaryColor = "#999999"
    if (!data.secondaryColor) data.secondaryColor = "#666666"
    if (!data.progressFrontColor) data.progressFrontColor = "#ffffff"
    if (!data.textColor) data.textColor = "#ffffff"
    let clickable = {
        title() { return "<h3>Pour</h3>" },
        canClick() {
            let fountain = layers[layer].fountains[id]
            return (player.prj.focused.lt(player.prj.maxFocused) || player[layer].fountains[id].focused) && fountain.currencyLocation()[fountain.currencyInvestInternalName].gt(0)
        },
        unlocked() { return true },
        onClick() {
            if (player[layer].fountains[id].pourSafety) return;
            player[layer].fountains[id].pourSafety = true

            let fountain = layers[layer].fountains[id]
            fountain.currencyLocation()[fountain.currencyInternalName] = fountain.currencyLocation()[fountain.currencyInternalName].sub(fountain.currencyLocation()[fountain.currencyInvestInternalName])
            player[layer].fountains[id].statInvested = player[layer].fountains[id].statInvested.add(fountain.currencyLocation()[fountain.currencyInvestInternalName])

            if (!player[layer].fountains[id].focused) {
                player.prj.focused = player.prj.focused.add(1)
                player[layer].fountains[id].focused = true
            }
        },
        style() {
            let look = {width: "75px", minHeight: "30px", borderRadius: "0px"}
            if (false) {
                look.backgroundColor = data.secondaryColor
                look.border = "3px solid " + data.primaryColor
                look.color = "white"
            } else if (this.canClick()) {
                look.backgroundColor = data.progressFrontColor
                look.border = "3px solid " + data.secondaryColor + "7f"
                look.color = "black"
            } else {
                look.background = "#361e1e"
                look.border = "3px solid " + data.secondaryColor + "7f"
                look.color = "white"
            }
            return look
        },
    }
    return clickable
}

// Load files

for (file in modInfo.modFiles) {
    let script = document.createElement("script");
    script.setAttribute("src", "js/" + modInfo.modFiles[file]);
    script.setAttribute("async", "false");
    document.head.insertBefore(script, document.getElementById("temp"));
}

