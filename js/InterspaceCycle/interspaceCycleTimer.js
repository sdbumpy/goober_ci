addNode("interspaceCycleTimer", {
    name() {return "<h2>Time Remaining</h2>"},
    symbol() {return formatSimpleTime(player.cer.cycleTimer)},
    canClick() {return false},
    layerShown() {return true},
    tooltip() {return ""},
    onClick() {
    },
    nodeStyle() {
        let look = {
            pointerEvents: "none",
            background: "var(--titleGradient)",
            height: "50px !important",
            width: "250px !important",
            border: "var(--background)",
            outline: "3px solid var(--regBorder)",
            borderRadius: "25px",
            fontSize: "24px",
            color: "var(--textColor)"
            //transform: "rotate(-90deg)",
        }
        return look
    },
})