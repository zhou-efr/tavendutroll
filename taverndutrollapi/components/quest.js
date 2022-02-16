const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.tdtDatabaseName, process.env.tdtDatabaseUser, process.env.tdtDatabasePassword, {
    dialect: "mysql",
    host: "localhost",
    logging: false
});

let express = require('express');
const cors = require("cors");
let quests = express.Router();

quests.use(express.json())
quests.use(cors())

quests.get('/', (req,res) => {
    try {
        sequelize.authenticate();
        sequelize.query('select * from quest').then(([results, metadata]) => {
            res.status(200).json(results);
            console.log(results);
        })
    } catch (e) {
        console.log('Impossible de se connecter, erreur suivante :', e);
        res.status(500).json({});
    }
})

quests.get('/:id', (req,res) => {
    try {
        sequelize.authenticate();
        sequelize.query('select * from quest').then(([results, metadata]) => {
            try {
                const quests = results;
                const questId = parseInt(req.params.id);
                const quest = quests.filter(item => item.id === questId)[0];

                if (!quest) throw `post ${questId} not found`;

                res.status(200).json(quests);
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

quests.post('/', (req, res) => {
    try {
        sequelize.authenticate();
        sequelize.query(`insert into quest (name, discordId, description, jeux, player, content, imageUrl) VALUES ('${req.body['name']}', '${req.body['discordId']}', '${req.body['pole']}', '${req.body['description']}', '${req.body['jeux']}', ${req.body['player']}, '${req.body['content']}', '${req.body['thumbnail']}')`).then(([results, metadata]) => {
            try {
                sequelize.query('select * from quest').then(([results, metadata]) => {
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

quests.put('/:id', (req, res)=>{
    try {
        sequelize.authenticate();
        sequelize.query(`update quest set name = '${req.body['name']}', discordId = '${req.body['discordId']}', description = '${req.body['description']}', jeux = '${req.body['jeux']}', player = ${req.body['player']}, content = '${req.body['content']}', imageUrl = '${req.body['imageUrl']}' where id = ${parseInt(req.params.id)};`).then(([results, metadata]) => {
            try {
                sequelize.query('select * from quest').then(([results, metadata]) => {
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

quests.delete('/:id', (req, res) => {
    try {
        sequelize.authenticate();
        sequelize.query(`delete from quest where id = ${parseInt(req.params.id)};`).then(([results, metadata]) => {
            try {
                sequelize.query('select * from quest').then(([results, metadata]) => {
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

module.exports = quests;
