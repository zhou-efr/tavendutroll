let express = require('express');
const cors = require("cors");
let quests = express.Router();

const { Request } = require("tedious");
const {connection, rows_to_json} = require("./Common");

quests.use(express.json())
quests.use(cors())

quests.get('/', (req,res) => {
    connection.execSql(new Request('select * from quest', (err, rowCount, rows) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            let quest = rows_to_json(rows);
            console.log("select * from quest", quest);
            res.status(200).json(quest);
        }
    }));
})

quests.get('/:id', (req,res) => {
    connection.execSql(new Request(`select * from quest where id = ${parseInt(req.params.id)}`, (err, rowCount, rows) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            let output = rows_to_json(rows);
            console.log(`select * from quest where id = ${parseInt(req.params.id)}\n`, output);
            res.status(200).json(output);
        }
    }));
})

quests.post('/', (req, res) => {
    let sql = `
        insert into quest (
            name, 
            discordId, 
            description, 
            jeux, 
            player, 
            content, 
            imageUrl, 
            startDate
        ) VALUES (
            '${req.body['name']}', 
            '${req.body['discordId']}', 
            '${req.body['description']}', 
            '${req.body['jeux']}', 
            ${req.body['player']}, 
            '${req.body['content']}', 
            '${req.body['thumbnail']}', 
            '${req.body['startDate']}'
        )`;
    connection.execSql(new Request(sql, (err) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            connection.execSql(new Request('select * from quest', (err, rowCount, rows) => {
                if (err) {
                    console.log('Impossible de se connecter, erreur suivante :', err);
                    res.status(500).json({});
                } else {
                    let quests = rows_to_json(rows);
                    console.log(sql, quests);
                    res.status(200).json(quests);
                }
            }));
        }
    }));
})

quests.delete('/:id', (req, res) => {
    connection.execSql(new Request(`delete from quest where id = ${parseInt(req.params.id)}`, (err) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            connection.execSql(new Request('select * from quest', (err, rowCount, rows) => {
                if (err) {
                    console.log('Impossible de se connecter, erreur suivante :', err);
                    res.status(500).json({});
                } else {
                    let quests = rows_to_json(rows);
                    console.log('select * from quest', quests);
                    res.status(200).json(quests);
                }
            }));
        }
    }));
})

module.exports = quests;
