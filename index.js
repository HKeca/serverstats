const Player        = require("./Player");
const express       = require("express");
const mysql         = require("mysql");
const app           = express();

require('dotenv').config();

// MySQL Setup
let connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

connection.connect();

let sortLevels = (list) => {
    list.sort((a, b) => {
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
}

// Player Data
let getPlayers = (points) => {
    return new Promise((resolve, reject) => {
        let playersList = []; 

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
            sortLevels(playersList);

            resolve(playersList);
        });
    });
    
};


let getPlayerPoints = () => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM mcmmo_skills", (err, results) => {
            if (err) throw error;

            let points = [];

            results.forEach((playerPoints) => {
                points["player-" + playerPoints.user_id] = playerPoints;
            });

            resolve(points);
        });
    });
    
}

// config
app.set('view engine', 'ejs');
app.use('/assets', express.static('static'));

const PORT = process.env.PORT || 8000;

// App responses/routes
app.get("/", (req, res) => {
    getPlayerPoints()
    .then(points => {
        getPlayers(points)
        .then(players => {
            res.render('index', {players: players});
        });
    });
});

app.listen(PORT, () => {
    console.log('Listening on ' + PORT);
});