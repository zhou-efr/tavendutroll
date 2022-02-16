const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.tdtDatabaseName, process.env.tdtDatabaseUser, process.env.tdtDatabasePassword, {
    dialect: "mysql",
    host: "localhost",
    logging: false
});

let express = require('express');
const cors = require("cors");
let events = express.Router();

events.use(express.json())
events.use(cors())

events.get('/', (req,res) => {
    try {
        sequelize.authenticate();
        sequelize.query('select * from event').then(([results, metadata]) => {
            res.status(200).json(results);
            console.log(results);
        })
    } catch (e) {
        console.log('Impossible de se connecter, erreur suivante :', e);
        res.status(500).json({});
    }
})

events.get('/:id', (req,res) => {
    try {
        sequelize.authenticate();
        sequelize.query('select * from event').then(([results, metadata]) => {
            try {
                const events = results;
                const eventId = parseInt(req.params.id);
                const event = events.filter(item => item.id === eventId)[0];

                if (!event) throw `post ${eventId} not found`;

                res.status(200).json(event);
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

events.post('/', (req, res) => {
    try {
        sequelize.authenticate();
        sequelize.query(`insert into event (name, author, pole, description, content, imageUrl) VALUES ('${req.body.name}', '${req.body['author']}', '${req.body['pole']}', '${req.body['description']}', '${req.body['content']}', '${req.body['thumbnail']}')`).then(([results, metadata]) => {
            try {
                sequelize.query('select * from event').then(([results, metadata]) => {
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

events.put('/:id', (req, res)=>{
    try {
        sequelize.authenticate();
        sequelize.query(`update event set name = '${req.body['name']}', author = '${req.body['author']}', pole = '${req.body['pole']}', description = '${req.body['description']}', content = '${req.body['content']}', imageUrl = '${req.body['thumbnail']}' where id = ${parseInt(req.params.id)};`).then(([results, metadata]) => {
            try {
                sequelize.query('select * from event').then(([results, metadata]) => {
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

events.delete('/:id', (req, res) => {
    try {
        sequelize.authenticate();
        sequelize.query(`delete from event where id = ${parseInt(req.params.id)};`).then(([results, metadata]) => {
            try {
                sequelize.query('select * from event').then(([results, metadata]) => {
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

module.exports = events;
