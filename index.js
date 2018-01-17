const Player        = require("./Player");
const express       = require("express");
const mysql         = require("mysql");
const app           = express();

const serverConfig = require("./config");
// MySQL Setup
let connection = mysql.createConnection(serverConfig);

connection.connect();

var playersList = [];
var points = [];

let createPlayers = () => {
    connection.query("SELECT * FROM mcmmo_users", (err, results) => {
        if (err) throw error;
        results.forEach((player) => {
            let tmpStats = points["player-" + player.id];
            if (!tmpStats)
                return;

            let newPlayer = new Player(player.user, tmpStats);

            playersList.push(newPlayer);
        });

        // Sort by bigger power level
        playersList.sort((a, b) => {
            let aPowerLevel = a.getPowerLevel();
            let bPowerLevel = b.getPowerLevel();

            if (aPowerLevel < bPowerLevel) {
                return 1;
            }
            else if (aPowerLevel > bPowerLevel) {
                return -1;
            } else {
                return 0;
            }
        });
    });
};


connection.query("SELECT * FROM mcmmo_skills", (err, results) => {
    if (err) throw error;
    results.forEach((playerPoints) => {
        points["player-" + playerPoints.user_id] = playerPoints;
    });

    createPlayers();
});


// config
app.set('view engine', 'ejs');
app.use('/assets', express.static('static'));

const PORT = 8000;

app.get("/", (req, res) => {
    res.render('index', {players: playersList});
});

app.listen(PORT, () => {
    console.log('Listening on ' + PORT);
});