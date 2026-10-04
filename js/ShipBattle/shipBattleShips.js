const SB_shipNames = [ // TEMPORARY BEFORE MOVING TO A NEW SYSTEM
    "",
    "cruiser",
    "impact",
    "unarmed",
    "sniper",
    "ufo",
    "streamliner",
    "stinger",
    "astral",
    "evolver",
    "railgun",
    "spinner",
    "bloodspear",
    "charger",
    "phantom",
]

SB_ships.spinner = {
    /*
        GENERAL INFO: Fundamentals always the same between ships of this type.
    */

    // The name you'll see on this ship's levelable and maybe other places.
    name: "Spinner",

    // Hitbox radius, always a circle.
    radius: 16,

    // `arena.ship` is set to the output of this function. There's likely no need to touch it except for when setting health.
    instanciate: function () {
        return {
            maxHealth: new Decimal(75),
            health: new Decimal(75),
            stats: structuredClone(this.baseStats),
        }
    },

    // Called when the SpaceArena is created.
    initialize: function (ship) {
        ship.bladeAngle = 0
        ship.bladeDistance = 16
        ship.bladeTargetDistance = 16
    },

    /*
        ACTIONS: How the ship behaves.
    */

    /*
        How you control the ship. Also dictates mobile control UI.
        - "directional": (i.e. Cruiser) up/down to move forward/backward, left/right to turn left/right. aims forward.
        - "omnidirectional": (i.e. UFO) moves in any direction using the arrow keys. aims toward the mouse.
        - "roll": (i.e. Unarmed) click to apply a target velocity in any direction.
        - "jump": (i.e. Stinger) click to apply a velocity in any direction.
    */
    controlType: "omnidirectional",

    // What happens when you shoot with this ship.
    onShoot: function (ship, mousePos = [0, 0], mobileControls) {
        if (!mobileControls) {
            // MOUSE + KEYBOARD CONTROLS ENABLED
            if (typeof mousePos[0] === "number" && typeof mousePos[1] === "number") {
                // Adjust the target blade distance, limited to 256 units.
                ship.bladeTargetDistance = Math.min(256, Math.max(16, Math.hypot(mousePos[1] - (arena.canvasHeight / 2), mousePos[0] - (arena.canvasWidth / 2))));
            }
        } else {
            // MOBILE CONTROLS ENABLED
        }
    },

    // Called every tick when piloting this ship. Could solo every other function in this object.
    tick: function (ship) {
        ship.bladeAngle += (1 - ((ship.bladeDistance - 16) / 512)) / 30 * Math.PI
        ship.bladeAngle %= Math.PI * 2

        // Adjust blade distance from the ship
        ship.bladeDistance += (ship.bladeTargetDistance - ship.bladeDistance) / 64
        ship.bladeDistance += ship.bladeTargetDistance > ship.bladeDistance ? 1 : -1;
        ship.bladeDistance = Math.min(256, Math.max(0, ship.bladeDistance))

        // Damage enemies
        for (let i = 0; i < 3; i++) {
            let ang = ship.bladeAngle + 2 * Math.PI / 3 * i + Math.PI / 3
            for (let celestialite of arena.enemies.concat(arena.asteroids)) {
                let closest = arena.getClosestCoords([celestialite.x, celestialite.y])
                let dist = Math.hypot(celestialite.y - closest[1] + Math.sin(ang) * (arena.ship.bladeDistance + 6), celestialite.x - closest[0] + Math.cos(ang) * (arena.ship.bladeDistance + 6))
                if (dist < 24 + celestialite.radius) {
                    celestialite.health = celestialite.health.sub(arena.shipStats.attackDamage / 60 * (1 - ((ship.bladeDistance - 16) / 512)))
                }
            }
        }
    },

    /*
        Called when this ship takes damage.
        ["projectile", i]: The damage is coming from a projectile with index i. 
        ["celestialite", i]: The damage is coming from a celestialite with index i.
        ["asteroid", i]: The damage is coming from an asteroid with index i.
        ["custom", i]: The damage is coming from a custom sprite with index i.
        null: The damage is coming from something else.
    */
    onAttacked: function (ship, source) {

    },

    // STYLE
    draw: function (ctx, ship) {
        ctx.save();
        ctx.translate(arena.canvasWidth / 2, arena.canvasHeight / 2);
        //let dist = Math.sin((Date.now() / 1000 * Math.PI * 2) % (Math.PI * 2)) * 64 + 80
        let dist = ship.bladeDistance
        
        // INDICATORS

        /* Un-comment this to see blade hitboxes:
            ctx.beginPath();
            ctx.arc(Math.cos(ship.bladeAngle) * (arena.ship.bladeDistance + 6), Math.sin(ship.bladeAngle) * (arena.ship.bladeDistance + 6), 24, 0, Math.PI * 2)
            ctx.closePath();
            ctx.fillStyle = "#00ff003f";
            ctx.fill();
        */

        ctx.beginPath();
        ctx.arc(0, 0, ship.bladeTargetDistance, 0, Math.PI * 2)
        ctx.closePath();
        ctx.strokeStyle = "#ff00003f";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, ship.bladeDistance, 0, Math.PI * 2)
        ctx.closePath();
        ctx.strokeStyle = "#00ff003f";
        ctx.stroke();

        // BLADES
        ctx.beginPath();
        ctx.rotate(ship.bladeAngle)
        ctx.arc(dist, 0, 24, 0, 2 * Math.PI / 3)
        ctx.lineTo(dist, 0)
        ctx.lineTo(dist + 24, 0)
        ctx.closePath();
        ctx.fillStyle = "#c0c0c0";
        ctx.strokeStyle = "#606060";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(dist, 0)
        ctx.lineTo(0, 0)
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.rotate(2 * Math.PI / 3)
        ctx.arc(dist, 0, 24, 0, 2 * Math.PI / 3)
        ctx.lineTo(dist, 0)
        ctx.lineTo(dist + 24, 0)
        ctx.closePath();
        ctx.fillStyle = "#c0c0c0";
        ctx.strokeStyle = "#606060";
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(dist, 0)
        ctx.lineTo(0, 0)
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.rotate(2 * Math.PI / 3)
        ctx.arc(dist, 0, 24, 0, 2 * Math.PI / 3)
        ctx.lineTo(dist, 0)
        ctx.lineTo(dist + 24, 0)
        ctx.closePath();
        ctx.fillStyle = "#c0c0c0";
        ctx.strokeStyle = "#606060";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(dist, 0)
        ctx.lineTo(0, 0)
        ctx.closePath();
        ctx.stroke();

        // BODY
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2)
        ctx.closePath();
        ctx.fillStyle = "#808080";
        ctx.strokeStyle = "#404040";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2)
        ctx.closePath();
        ctx.fillStyle = "#c0c0c0";
        ctx.strokeStyle = "#606060";
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    },

    // STATS
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    baseStats: {
        // DEFENSE
        maxHp: 75,
        damageReduction: 1,
        bodyDamageReduction: 5,
        healthRegen: 0,
        // OFFENSE
        attackDamage: 150,
        bodyDamage: 1,
        attackSpeed: 120,
        // AGILITY
        moveSpeed: 6,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,
        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,
        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,
    },
}

SB_ships.bloodspear = {
    /*
        GENERAL INFO: Fundamentals always the same between ships of this type.
    */

    // The name you'll see on this ship's levelable and maybe other places.
    name: "Bloodspear",

    // Hitbox radius, always a circle.
    radius: 16,

    // `arena.ship` is set to the output of this function. There's likely no need to touch it except for when setting health.
    instanciate: function () {
        return {
            maxHealth: new Decimal(100),
            health: new Decimal(100),
            stats: structuredClone(this.baseStats),
        }
    },

    // Called when the SpaceArena is created.
    initialize: function (ship) {
    },

    /*
        ACTIONS: How the ship behaves.
    */

    /*
        How you control the ship. Also dictates mobile control UI.
        - "directional": (i.e. Cruiser) up/down to move forward/backward, left/right to turn left/right. aims forward.
        - "omnidirectional": (i.e. UFO) moves in any direction using the arrow keys. aims toward the mouse.
        - "roll": (i.e. Unarmed) click to apply a target velocity in any direction.
        - "jump": (i.e. Stinger) click to apply a velocity in any direction.
    */
    controlType: "directional",

    // What happens when you shoot with this ship.
    onShoot: function (ship, mousePos = [0, 0], mobileControls) {
        if (!mobileControls) {
            // MOUSE + KEYBOARD CONTROLS ENABLED
            let now = Date.now();
            if (now - arena.ship.lastShot < 250 / arena.shipStats.attackSpeed) return;
            arena.ship.lastShot = now

            SB_spawnProjectile("playerShip_bloodspear", null, null)
            player.ir.shipHealth = player.ir.shipHealth.sub(player.ir.shipHealth.pow(0.5).mul(0.2))
        } else {
            // MOBILE CONTROLS ENABLED
        }
    },

    // Called every tick when piloting this ship. Could solo every other function in this object.
    tick: function (ship) {
        
    },

    /*
        Called when this ship takes damage.
        ["projectile", i]: The damage is coming from a projectile with index i. 
        ["celestialite", i]: The damage is coming from a celestialite with index i.
        ["asteroid", i]: The damage is coming from an asteroid with index i.
        ["custom", i]: The damage is coming from a custom sprite with index i.
        null: The damage is coming from something else.
    */
    onAttacked: function (ship, source) {

    },

    // STYLE
    draw: function (ctx, ship) {
        ctx.save();
        ctx.translate(arena.canvasWidth / 2, arena.canvasHeight / 2);
        ctx.rotate(ship.angle);
        //let dist = Math.sin((Date.now() / 1000 * Math.PI * 2) % (Math.PI * 2)) * 64 + 80

        // TANKS
        ctx.fillStyle = "#ff4040";
        ctx.strokeStyle = "#800000";
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(30, -15);
        ctx.lineTo(45, 0);
        ctx.lineTo(30, 15);
        ctx.lineTo(0, 15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // BODY
        ctx.fillStyle = "#ffbfcf";
        ctx.strokeStyle = "#804050";
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.lineTo(-10, 20);
        ctx.lineTo(10, 20);
        ctx.lineTo(20, 10);
        ctx.lineTo(40, 10);
        ctx.lineTo(50, 0);
        ctx.lineTo(40, -10);
        ctx.lineTo(20, -10);
        ctx.lineTo(10, -20);
        ctx.lineTo(-10, -20);
        ctx.lineTo(-30, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-20, 10);
        ctx.lineTo(20, 10);
        ctx.moveTo(-20, -10);
        ctx.lineTo(20, -10);
        ctx.closePath();
        ctx.stroke();
        
        // COCKPIT
        ctx.fillStyle = "#ff4040";
        ctx.strokeStyle = "#800000";
        ctx.beginPath();
        ctx.arc(5, 0, 5, -Math.PI/2, Math.PI/2);
        ctx.arc(-5, 0, 5, Math.PI/2, 3*Math.PI/2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore()
    },

    // STATS
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    baseStats: {
        // DEFENSE
        maxHp: 75,
        damageReduction: 1,
        bodyDamageReduction: 5,
        healthRegen: 0,
        // OFFENSE
        attackDamage: 25,
        bodyDamage: 1,
        attackSpeed: 120,
        // AGILITY
        moveSpeed: 6,
        acceleration: 0.5,
        deceleration: 0.25,
        rotationSpeed: 0.08,
        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,
        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1.5,
        bloodGemGain: 1,
    },
}

SB_projectiles.playerShip_bloodspear = {
    template(celestialite, warning = {}) {
        let projectile = {
            x: arena.ship.x + Math.cos(arena.ship.angle) * 40,
            y: arena.ship.y + Math.sin(arena.ship.angle) * 40,
            vx: Math.cos(arena.ship.angle) * 9,
            vy: Math.sin(arena.ship.angle) * 9,
            dvx: 1,
            dvy: 1,
            ax: 0,
            ay: 0,
            dax: 1,
            day: 1,
            life: 180,
            damage: Decimal.mul(arena.shipStats.attackDamage, Decimal.sub(2, player.ir.shipHealth.div(arena.shipStats.maxHp).max(0))),
            pierce: 0,
            piercedAsteroids: [],
            piercedEnemies: [],
            fromEnemy: false,
            radius: 8,
        }
        projectile.maxRadius = projectile.radius
        return projectile
    },
    initialize(projectile) {
    },
    tick(projectile) {
        if (projectile.life < 15) {
            let m = projectile.life / 15
            projectile.radius = m * projectile.maxRadius
        };
    },
    onHit(projectile, target) {
        player.ir.shipHealth = player.ir.shipHealth.add(player.ir.shipHealth.pow(0.6).mul(0.3))
    },
    draw(ctx, projectile) {
        if (!arena) return;
        let wrapped = arena.getVisibleWrappedCoords([projectile.x, projectile.y], [projectile.radius * 2, projectile.radius * 2])
        if (!wrapped) return;

        ctx.save();
        ctx.translate(wrapped[0], wrapped[1]);
        ctx.translate((arena.canvasWidth / 2) - arena.ship.x, (arena.canvasHeight / 2) - arena.ship.y);
        ctx.rotate(Math.atan2(projectile.vy, projectile.vx));
        
        // TANKS
        let radius = projectile.radius * 1.5
        ctx.fillStyle = "#ff4040";
        ctx.strokeStyle = "#800000";
        ctx.beginPath();
        ctx.moveTo(-radius * 2, 0);
        ctx.lineTo(-radius * 1.75, radius * 0.25);
        ctx.lineTo(0, radius * 0.25);
        ctx.lineTo(0, radius * 0.5);
        ctx.lineTo(radius * 0.5, 0);
        ctx.lineTo(0, -radius * 0.5);
        ctx.lineTo(0, -radius * 0.25);
        ctx.lineTo(-radius * 1.75, -radius * 0.25);
        ctx.lineTo(-radius * 2, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    },
}

SB_ships.charger = {
    /*
        GENERAL INFO: Fundamentals always the same between ships of this type.
    */

    // The name you'll see on this ship's levelable and maybe other places.
    name: "Charger",

    // Hitbox radius, always a circle.
    radius: 16,

    // `arena.ship` is set to the output of this function. There's likely no need to touch it except for when setting health.
    instanciate: function () {
        return {
            maxHealth: new Decimal(150),
            health: new Decimal(150),
            stats: structuredClone(this.baseStats),
        }
    },

    // Called when the SpaceArena is created.
    initialize: function (ship) {
    },

    /*
        ACTIONS: How the ship behaves.
    */

    /*
        How you control the ship. Also dictates mobile control UI.
        - "directional": (i.e. Cruiser) up/down to move forward/backward, left/right to turn left/right. aims forward.
        - "omnidirectional": (i.e. UFO) moves in any direction using the arrow keys. aims toward the mouse.
        - "roll": (i.e. Unarmed) click to apply a target velocity in any direction.
        - "jump": (i.e. Stinger) click to apply a velocity in any direction.
    */
    controlType: "directional",

    // What happens when you shoot with this ship.
    onShoot: function (ship, mousePos = [0, 0], mobileControls) {
        if (!mobileControls) {
            // MOUSE + KEYBOARD CONTROLS ENABLED
            let now = Date.now();
            if (now - arena.ship.lastShot < 250 / arena.shipStats.attackSpeed) return;
            arena.ship.lastShot = now

            SB_spawnProjectile("playerShip_bloodspear", null, null)
            player.ir.shipHealth = player.ir.shipHealth.sub(player.ir.shipHealth.pow(0.5).mul(0.2))
        } else {
            // MOBILE CONTROLS ENABLED
        }
    },

    // Called every tick when piloting this ship. Could solo every other function in this object.
    tick: function (ship) {
        
    },

    /*
        Called when this ship takes damage.
        ["projectile", i]: The damage is coming from a projectile with index i. 
        ["celestialite", i]: The damage is coming from a celestialite with index i.
        ["asteroid", i]: The damage is coming from an asteroid with index i.
        ["custom", i]: The damage is coming from a custom sprite with index i.
        null: The damage is coming from something else.
    */
    onAttacked: function (ship, source) {

    },

    // STYLE
    draw: function (ctx, ship) {
        ctx.save();
        ctx.translate(arena.canvasWidth / 2, arena.canvasHeight / 2);
        ctx.rotate(ship.angle);
        //let dist = Math.sin((Date.now() / 1000 * Math.PI * 2) % (Math.PI * 2)) * 64 + 80

        // TANKS
        ctx.fillStyle = "#ff4040";
        ctx.strokeStyle = "#800000";
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(30, -15);
        ctx.lineTo(45, 0);
        ctx.lineTo(30, 15);
        ctx.lineTo(0, 15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // BODY
        ctx.fillStyle = "#ffbfcf";
        ctx.strokeStyle = "#804050";
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.lineTo(-10, 20);
        ctx.lineTo(10, 20);
        ctx.lineTo(20, 10);
        ctx.lineTo(40, 10);
        ctx.lineTo(50, 0);
        ctx.lineTo(40, -10);
        ctx.lineTo(20, -10);
        ctx.lineTo(10, -20);
        ctx.lineTo(-10, -20);
        ctx.lineTo(-30, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-20, 10);
        ctx.lineTo(20, 10);
        ctx.moveTo(-20, -10);
        ctx.lineTo(20, -10);
        ctx.closePath();
        ctx.stroke();
        
        // COCKPIT
        ctx.fillStyle = "#ff4040";
        ctx.strokeStyle = "#800000";
        ctx.beginPath();
        ctx.arc(5, 0, 5, -Math.PI/2, Math.PI/2);
        ctx.arc(-5, 0, 5, Math.PI/2, 3*Math.PI/2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore()
    },

    // STATS
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    baseStats: {
        // DEFENSE
        maxHp: 75,
        damageReduction: 1,
        bodyDamageReduction: 5,
        healthRegen: 0,
        // OFFENSE
        attackDamage: 25,
        bodyDamage: 1,
        attackSpeed: 120,
        // AGILITY
        moveSpeed: 6,
        acceleration: 0.5,
        deceleration: 0.25,
        rotationSpeed: 0.08,
        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,
        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1.5,
        bloodGemGain: 1,
    },
}

/*
    SHIPS BELOW THIS POINT DO NOT WORK!
    WILL FIX :3
*/

SB_ships.cruiser = {
    name: "Cruiser",
    baseStats: {

        // DEFENSE
        maxHp: 100,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 7,
        bodyDamage: 1,
        attackSpeed: 120,

        // AGILITY
        moveSpeed: 6,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.impact = {
    name: "Impact",
    baseStats: {

        // DEFENSE
        maxHp: 150,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 25,
        bodyDamage: 1,
        attackSpeed: 500,

        // AGILITY
        moveSpeed: 4,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.unarmed = {
    name: "Unarmed",
    baseStats: {

        // DEFENSE
        maxHp: 75,
        damageReduction: 1,
        bodyDamageReduction: 15,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 16,
        bodyDamage: 1,
        attackSpeed: 1500,

        // AGILITY
        moveSpeed: 10,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.sniper = {
    name: "Sniper",
    baseStats: {

        // DEFENSE
        maxHp: 100,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 12,
        bodyDamage: 1,
        attackSpeed: 250,

        // AGILITY
        moveSpeed: 4.5,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.ufo = {
    name: "UFO",
    baseStats: {

        // DEFENSE
        maxHp: 50,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 3,
        bodyDamage: 1,
        attackSpeed: 250,

        // AGILITY
        moveSpeed: 5,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.streamliner = {
    name: "Streamliner",
    baseStats: {

        // DEFENSE
        maxHp: 75,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 4,
        bodyDamage: 1,
        attackSpeed: 50,

        // AGILITY
        moveSpeed: 3,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.stinger = {
    name: "Stinger",
    baseStats: {

        // DEFENSE
        maxHp: 75,
        damageReduction: 1,
        bodyDamageReduction: 10,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 12,
        bodyDamage: 1,
        attackSpeed: 1000,

        // AGILITY
        moveSpeed: 10,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.astral = {
    name: "Astral",
    baseStats: {

        // DEFENSE
        maxHp: 75,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 7,
        bodyDamage: 1,
        attackSpeed: 300,

        // AGILITY
        moveSpeed: 6,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.evolver = {
    name: "Evolver",
    baseStats: {

        // DEFENSE
        maxHp: 100,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 40,
        bodyDamage: 1,
        attackSpeed: 500,

        // AGILITY
        moveSpeed: 4,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 1,
        spaceRockGain: 1,
        spaceGemGain: 1,
        bloodStoneGain: 1,
        bloodGemGain: 1,

    },
    includeUpgrades: [],
    dontIncludeUpgrades: [],
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}
SB_ships.railgun = {
    name: "Railgun",
    baseStats: {

        // DEFENSE
        maxHp: 100,
        damageReduction: 1,
        bodyDamageReduction: 1,
        healthRegen: 0,

        // OFFENSE
        attackDamage: 600,
        bodyDamage: 1,
        attackSpeed: 5000,

        // AGILITY
        moveSpeed: 4.5,
        acceleration: 0.3,
        deceleration: 0.15,
        rotationSpeed: 0.06,

        // SCALE
        shipRadius: 16,
        bulletRadius: 3,
        bulletSize: 1,

        // HARVESTING
        xpGain: 0.5,
        spaceRockGain: 1.5,
        spaceGemGain: 1.5,
        bloodStoneGain: 1.5,
        bloodGemGain: 1.5,

    },
    makeBullet() {

    },
    draw(ctx) {
        // NYI
    },
}