const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.tdtDatabaseName, process.env.tdtDatabaseUser, process.env.tdtDatabasePassword, {
    dialect: "mysql",
    host: "localhost",
    logging: false
});

let multer = require('multer')
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public');
    },
    filename: (req, file, cb) => {
        let filetype = '';
        switch (file.mimetype) {
            case 'image/png':
                filetype = 'png';
                break;
            case 'image/jpeg':
                filetype = 'jpg';
                break;
            default:
                break;
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }});
let upload = multer({storage: storage})

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors())

app.get('/images/:name', (req, res) => {
    let imageName = req.params.name
    res.sendFile(`C:\\Users\\thepa\\WebstormProjects\\tavernedutroll\\taverndutrollapi\\public\\${imageName}`);
});

app.post('/upload',upload.single('file'), (req, res, next) => {
    // console.log(req.file);
    if(!req.file) {
        res.status(500);
        return next('error');
    }
    res.json({ fileUrl: 'http://localhost:8080/images/' + req.file.filename });
})


app.get('/publication', (req,res) => {
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

app.get('/publication/:id', (req,res) => {
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

app.post('/publication', (req, res) => {
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

app.put('/publication/:id', (req, res)=>{
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


app.get('/event', (req,res) => {
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

app.get('/event/:id', (req,res) => {
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

app.post('/event', (req, res) => {
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

app.put('/event/:id', (req, res)=>{
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

app.delete('/event/:id', (req, res) => {
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


app.get('/quest', (req,res) => {
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

app.get('/quest/:id', (req,res) => {
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

app.post('/quest', (req, res) => {
    try {
        sequelize.authenticate();
        sequelize.query(`insert into quest (name, discordId, description, jeux, player, content, imageUrl) VALUES ('${req.body['name']}', '${req.body['discordId']}', '${req.body['pole']}', '${req.body['description']}', '${req.body['jeux']}', ${req.body['player']}, '${req.body['content']}', '${req.body['imageUrl']}')`).then(([results, metadata]) => {
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

app.put('/quest/:id', (req, res)=>{
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

app.delete('/quest/:id', (req, res) => {
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
