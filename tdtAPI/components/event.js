let express = require('express');
const cors = require("cors");
let events = express.Router();

const { Request } = require("tedious");
const {connection, rows_to_json} = require("./Common");

events.use(express.json())
events.use(cors())

events.get('/', (req,res) => {
    connection.execSql(new Request('select * from event', (err, rowCount, rows) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            let event = rows_to_json(rows);
            console.log("select * from event", event);
            res.status(200).json(event);
        }
    }));
})

events.get('/:id', (req,res) => {
    connection.execSql(new Request(`select * from event where id = ${parseInt(req.params.id)}`, (err, rowCount, rows) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            let output = rows_to_json(rows);
            console.log(`select * from event where id = ${parseInt(req.params.id)}\n`, output);
            res.status(200).json(output);
        }
    }));
})

events.post('/', (req, res) => {
    let sql = `
        insert into event (
            name, 
            author, 
            pole, 
            description, 
            content, 
            imageUrl
        ) VALUES (
            '${req.body.name}', 
            '${req.body['author']}', 
            '${req.body['pole']}', 
            '${req.body['description']}', 
            '${req.body['content']}', 
            '${req.body['thumbnail']}'
        )`;
    connection.execSql(new Request(sql, (err) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            connection.execSql(new Request('select * from event', (err, rowCount, rows) => {
                if (err) {
                    console.log('Impossible de se connecter, erreur suivante :', err);
                    res.status(500).json({});
                } else {
                    let events = rows_to_json(rows);
                    console.log(sql, events);
                    res.status(200).json(events);
                }
            }));
        }
    }));
})

events.delete('/:id', (req, res) => {
    connection.execSql(new Request(`delete from event where id = ${parseInt(req.params.id)}`, (err) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            connection.execSql(new Request('select * from event', (err, rowCount, rows) => {
                if (err) {
                    console.log('Impossible de se connecter, erreur suivante :', err);
                    res.status(500).json({});
                } else {
                    let events = rows_to_json(rows);
                    console.log('select * from event', events);
                    res.status(200).json(events);
                }
            }));
        }
    }));
})

module.exports = events;
