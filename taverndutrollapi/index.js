const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.tdtDatabaseName, process.env.tdtDatabaseUser, process.env.tdtDatabasePassword, {
    dialect: "mysql",
    host: "localhost",
    logging: false
});

const express = require('express')
const app = express()

app.use(express.json())

app.get('/publication', (req,res) => {
    try {
        sequelize.authenticate();
        sequelize.query('select * from publication').then(([results, metadata]) => {
            res.status(200).json(results);
        })
    } catch (e) {
        console.log('Impossible de se connecter, erreur suivante :', e);
        res.status(500).json({});
    }
})

app.get('/publication/:id', (req,res) => {
    try {
        sequelize.authenticate();
        sequelize.query('select * from publication').then(([results, metadata]) => {
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

app.post('/publication', (req, res) => {
    try {
        sequelize.authenticate();
        sequelize.query(`insert into publication (name, author, description, content) VALUES ("${req.body.name}", "${req.body.author}", "${req.body.description}", "${req.body.content}")`).then(([results, metadata]) => {
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

app.put('/publication/:id', (req, res)=>{
    try {
        sequelize.authenticate();
        sequelize.query(`update publication set name = '${req.body['name']}', author = '${req.body['author']}', description = '${req.body['description']}', content = '${req.body['content']}' where id = ${parseInt(req.params.id)};`).then(([results, metadata]) => {
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

app.delete('/publication/:id', (req, res) => {
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

app.listen(8080, () => {
    console.log("\n" +
        "\n" +
        " ,--.--------.             ,--.--------.           ,---.          _ __    .=-.-. \n" +
        "/==/,  -   , -\\ _,..---._ /==/,  -   , -\\        .--.'  \\      .-`.' ,`. /==/_ / \n" +
        "\\==\\.-.  - ,-./==/,   -  \\\\==\\.-.  - ,-./        \\==\\-/\\ \\    /==/, -   \\==|, |  \n" +
        " `--`\\==\\- \\  |==|   _   _\\`--`\\==\\- \\           /==/-|_\\ |  |==| _ .=. |==|  |  \n" +
        "      \\==\\_ \\ |==|  .=.   |     \\==\\_ \\          \\==\\,   - \\ |==| , '=',|==|- |  \n" +
        "      |==|- | |==|,|   | -|     |==|- |          /==/ -   ,| |==|-  '..'|==| ,|  \n" +
        "      |==|, | |==|  '='   /     |==|, |         /==/-  /\\ - \\|==|,  |   |==|- |  \n" +
        "      /==/ -/ |==|-,   _`/      /==/ -/         \\==\\ _.\\=\\.-'/==/ - |   /==/. /  \n" +
        "      `--`--` `-.`.____.'       `--`--`          `--`        `--`---'   `--`-`   \n" +
        "\n")
})
