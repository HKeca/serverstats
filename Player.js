class Player
{
    constructor(name, points)
    {
        this.name = name;
        this.points = points;
    }

    getPowerLevel()
    {
        if (this.points === undefined)
            return 0;

        // May be a problem when trying to grab "new" data
        if (this.powerLevel)
            return this.powerLevel;

        let tmpPoints = 0;

        tmpPoints += this.points.mining;
        tmpPoints += this.points.taming;
        tmpPoints += this.points.woodcutting;
        tmpPoints += this.points.repair;
        tmpPoints += this.points.unarmed;
        tmpPoints += this.points.herbalism;
        tmpPoints += this.points.excavation;
        tmpPoints += this.points.archery;
        tmpPoints += this.points.swords;
        tmpPoints += this.points.axes;
        tmpPoints += this.points.acrobatics;
        tmpPoints += this.points.fishing;
        tmpPoints += this.points.alchemy;

        this.powerLevel = tmpPoints;
        return this.powerLevel;
    }
}

module.exports = Player;