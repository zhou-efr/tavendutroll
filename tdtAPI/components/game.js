let express = require('express');
const cors = require("cors");
let games = express.Router();

const { Request } = require("tedious");
const {connection, rows_to_json} = require("./Common");

games.use(express.json())
games.use(cors())

games.get('/', (req,res) => {
    connection.execSql(new Request('select * from game', (err, rowCount, rows) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            let game = rows_to_json(rows);
            console.log("select * from game", game);
            res.status(200).json(game);
        }
    }));
})

games.get('/:id', (req,res) => {
    connection.execSql(new Request(`select * from game where id = ${parseInt(req.params.id)}`, (err, rowCount, rows) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            let output = rows_to_json(rows);
            console.log(`select * from game where id = ${parseInt(req.params.id)}\n`, output);
            res.status(200).json(output);
        }
    }));
})

games.post('/', (req, res) => {
    let sql = `
        insert into game (
            name, 
            support, 
            pole, 
            description, 
            content, 
            imageUrl, 
            available
        ) VALUES (
            '${req.body['name']}', 
            '${req.body['support']}', 
            '${req.body['pole']}', 
            '${req.body['description']}', 
            '${req.body['content']}', 
            '${req.body['thumbnail']}', 
            ${req.body['available']}
        );
    `;
    connection.execSql(new Request(sql, (err) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            connection.execSql(new Request('select * from game', (err, rowCount, rows) => {
                if (err) {
                    console.log('Impossible de se connecter, erreur suivante :', err);
                    res.status(500).json({});
                } else {
                    let games = rows_to_json(rows);
                    console.log(sql, games);
                    res.status(200).json(games);
                }
            }));
        }
    }));
})

games.delete('/:id', (req, res) => {
    connection.execSql(new Request(`delete from game where id = ${parseInt(req.params.id)}`, (err) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            connection.execSql(new Request('select * from game', (err, rowCount, rows) => {
                if (err) {
                    console.log('Impossible de se connecter, erreur suivante :', err);
                    res.status(500).json({});
                } else {
                    let games = rows_to_json(rows);
                    console.log('select * from game', games);
                    res.status(200).json(games);
                }
            }));
        }
    }));
})

module.exports = games;
