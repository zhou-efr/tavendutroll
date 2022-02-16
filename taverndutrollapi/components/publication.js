const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.tdtDatabaseName, process.env.tdtDatabaseUser, process.env.tdtDatabasePassword, {
    dialect: "mysql",
    host: "localhost",
    logging: false
});

let express = require('express');
const cors = require("cors");
let publications = express.Router();

publications.use(express.json())
publications.use(cors())

publications.get('/', (req,res) => {
    try {
        sequelize.authenticate();
        sequelize.query('select * from publication').then(([results, metadata]) => {
            res.status(200).json(results);
            console.log(results);
        })
    } catch (e) {
        console.log('Impossible de se connecter, erreur suivante :', e);
        res.status(500).json({});
    }
})

publications.get('/:id', (req,res) => {
    try {
        sequelize.authenticate();
        sequelize.query('select * from publication')
            .then(([results, metadata]) => {
                try {
                    const publications = results;
                    const publicationId = parseInt(req.params.id);
                    const publication = publications.filter(item => item.id === publicationId)[0];

                    if (!publication) throw `post ${publicationId} not found`;

                    res.status(200).json(publication);
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

publications.post('', (req, res) => {
    try {
        console.log(req.body);
        sequelize.authenticate();
        sequelize.query(`insert into publication (name, author, pole, description, content, imageUrl) VALUES ('${req.body['name']}', '${req.body['author']}', '${req.body['pole']}', '${req.body['description']}', '${req.body['content']}', '${req.body['thumbnail']}')`)
            .then(([results, metadata]) => {
                try {
                    sequelize.query('select * from publication').then(([results, metadata]) => {
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

publications.put('/:id', (req, res)=>{
    try {
        sequelize.authenticate();
        sequelize.query(`update publication set name = '${req.body['name']}', author = '${req.body['author']}', pole = '${req.body['pole']}', description = '${req.body['description']}', content = '${req.body['content']}', imageUrl = '${req.body['thumbnail']}' where id = ${parseInt(req.params.id)};`)
            .then(([results, metadata]) => {
                try {
                    sequelize.query('select * from publication').then(([results, metadata]) => {
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

publications.delete('/:id', (req, res) => {
    try {
        sequelize.authenticate();
        sequelize.query(`delete from publication where id = ${parseInt(req.params.id)};`).then(([results, metadata]) => {
            try {
                sequelize.query('select * from publication').then(([results, metadata]) => {
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

module.exports = publications;
