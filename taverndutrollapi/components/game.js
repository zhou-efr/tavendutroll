const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.tdtDatabaseName, process.env.tdtDatabaseUser, process.env.tdtDatabasePassword, {
    dialect: "mysql",
    host: "localhost",
    logging: false
});

let express = require('express');
const cors = require("cors");
let games = express.Router();

games.use(express.json())
games.use(cors())

games.get('/', (req,res) => {
    try {
        sequelize.authenticate();
        sequelize.query('select * from game').then(([results, metadata]) => {
            res.status(200).json(results);
            console.log(results);
        })
    } catch (e) {
        console.log('Impossible de se connecter, erreur suivante :', e);
        res.status(500).json({});
    }
})

games.get('/:id', (req,res) => {
    try {
        sequelize.authenticate();
        sequelize.query('select * from game')
            .then(([results, metadata]) => {
                try {
                    const games = results;
                    const gameId = parseInt(req.params.id);
                    const game = games.filter(item => item.id === gameId)[0];

                    if (!game) throw `game ${gameId} not found`;

                    res.status(200).json(game);
                } catch (e) {
                    console.log('Impossible de se connecter, erreur suivante :', e);
                    res.status(404).json({"error": "post not found"});
                }
            })
    } catch (e) {
        console.log('Impossible de se connecter, erreur suivante :', e);
        res.status(500).json({"error": "unable to connect to database"});
    }
})

games.post('', (req, res) => {
    try {
        console.log(req.body);
        sequelize.authenticate();
        sequelize.query(`insert into game (name, support, pole, description, content, imageUrl, available) VALUES ('${req.body['name']}', '${req.body['support']}', '${req.body['pole']}', '${req.body['description']}', '${req.body['content']}', '${req.body['thumbnail']}', ${req.body['available']});`)
            .then(([results, metadata]) => {
                try {
                    sequelize.query('select * from game').then(([results, metadata]) => {
                        res.status(200).json(results);
                    })
                } catch (e) {
                    console.log('unable to post new post :', e);
                    res.status(500).json({"error": "unable to post"});
                }
            })
    } catch (e) {
        console.log('Impossible de se connecter, erreur suivante :', e);
        res.status(500).json({"error": "unable to connect to database"});
    }
})

games.put('/:id', (req, res)=>{
    try {
        sequelize.authenticate();
        sequelize.query(`update game set name = '${req.body['name']}', support = '${req.body['support']}', pole = '${req.body['pole']}', description = '${req.body['description']}', content = '${req.body['content']}', imageUrl = '${req.body['thumbnail']}', available = ${req.body['available']} where id = ${parseInt(req.params.id)};`)
            .then(([results, metadata]) => {
                try {
                    sequelize.query('select * from game').then(([results, metadata]) => {
                        res.status(200).json(results);
                    })
                } catch (e) {
                    console.log('unable to put new values :', e);
                    res.status(500).json({"error": "unable to put new values"});
                }
            })
    } catch (e) {
        console.log('Impossible de se connecter, erreur suivante :', e);
        res.status(500).json({"error": "unable to connect to database"});
    }
})

games.delete('/:id', (req, res) => {
    try {
        sequelize.authenticate();
        sequelize.query(`delete from game where id = ${parseInt(req.params.id)};`).then(([results, metadata]) => {
            try {
                sequelize.query('select * from game').then(([results, metadata]) => {
                    res.status(200).json(results);
                })
            } catch (e) {
                console.log('Unable to delete post :', e);
                res.status(500).json({"error": "Unable to delete post"});
            }
        })
    } catch (e) {
        console.log('Impossible de se connecter, erreur suivante :', e);
        res.status(500).json({"error": "unable to connect to database"});
    }
})

module.exports = games;
