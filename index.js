const express   = require('express');
const mysql     = require("mysql");
const app       = express();

const serverConfig = require("./config");
// MySQL Setup
let connection = mysql.createConnection(serverConfig);

connection.connect();

let playerData = [];
connection.query("SELECT * FROM mcmmo_users", (err, results) => {
    if (err) throw error;
    playerData = results;
});

function getPowerLevel(points) {
    let powerPoints = [];

    for (let i = 1; i < points.length; i++) {
        let tmpPoints = 0;

        tmpPoints += points[i].mining;
        tmpPoints += points[i].taming;
        tmpPoints += points[i].woodcutting;
        tmpPoints += points[i].repair;
        tmpPoints += points[i].unarmed;
        tmpPoints += points[i].herbalism;
        tmpPoints += points[i].excavation;
        tmpPoints += points[i].archery;
        tmpPoints += points[i].swords;
        tmpPoints += points[i].axes;
        tmpPoints += points[i].acrobatics;
        tmpPoints += points[i].fishing;
        tmpPoints += points[i].alchemy;

        powerPoints.push(tmpPoints);
    }

    return powerPoints;
}

let points = [];
let powerLevels = [];
connection.query("SELECT * FROM mcmmo_skills", (err, results) => {
    if (err) throw error;
    results.forEach((value) => {
        let tmpValue = value['user_id'];

        points[tmpValue] = value;
    });
    powerLevels = getPowerLevel(points);
});



// config
app.set('view engine', 'ejs');
app.use('/assets', express.static('static'));

const PORT = 8000;

app.get("/", (req, res) => {
    res.render('index', {players: playerData, playerStats: points, powerLevels});
});

app.listen(PORT, () => {
    console.log('Listening on ' + PORT);
});