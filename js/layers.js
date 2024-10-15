addLayer("g", {
    tabFormat: [
        ["raw-html", function () { return "<h3>" + format(player.points) + "</h3> Runes" }, { "color": "white", "font-size": "30px", "font-family": "monospace" }],
        ["blank","20px"],
        ["raw-html", function () { return "<h3>" + format(player.g.points) + "</h3> Comprehension" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["blank","100px"],
        ["clickable",11],
        ["blank","25px"],
        ["buyable",11],
    ],
    name: "Grimoire", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "📖", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#44cfd4",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Comprehension", // Name of prestige currency
    baseResource: "Runes", // Name ofS resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    clickables: {
        11: {
            title() { return "Click to gain Runes<br>(+" + format(getBuyableAmount(this.layer, 11).add(1)) + ")"},
            canClick() { return true},
            onClick() { player.points = player.points.add(getBuyableAmount(this.layer, 11).add(1)) },
            onHold() { player.points = player.points.add(getBuyableAmount(this.layer, 11).add(1)) },
        }
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(2).pow(x).mul(50) },
            title() { return format(getBuyableAmount("g", 11)) + " Profiency<br>Cost: " + format(this.cost()) + " Runes"},
            display() { return "+1 Rune/click<br>Effect before multipliers: +<h3>" + format(getBuyableAmount(this.layer, 11))  + "</h3>" },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            unlocked() { return getBuyableAmount("g", 11).gte(5)},
            cost(x) { return new Decimal(2).pow(x).mul(1000) },
            title() { return format(getBuyableAmount("g", 12)) + " Flow<br>Cost: " + format(this.cost()) + " Runes"},
            display() { return "+1 Rune/second<br>Effect before multipliers: +<h3>" + format(getBuyableAmount(this.layer, 11))  + "</h3>" },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
})
S