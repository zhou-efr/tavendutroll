let express = require('express');
const cors = require("cors");
const { Request } = require("tedious");
const {connection, rows_to_json} = require("./Common");
let publications = express.Router();

publications.use(express.json())
publications.use(cors())

publications.get('/', (req,res) => {
    connection.execSql(new Request('select * from publication', (err, rowCount, rows) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            let publication = rows_to_json(rows);
            console.log("select * from publication", publication);
            res.status(200).json(publication);
        }
    }));
})

publications.get('/:id', (req,res) => {
    connection.execSql(new Request(`select * from publication where id = ${parseInt(req.params.id)}`, (err, rowCount, rows) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            let output = rows_to_json(rows);
            console.log(`select * from publication where id = ${parseInt(req.params.id)}\n`, output);
            res.status(200).json(output);
        }
    }));
    // try {
    //     sequelize.authenticate();
    //     sequelize.query('select * from publication')
    //         .then(([results, metadata]) => {
    //             try {
    //                 const publications = results;
    //                 const publicationId = parseInt(req.params.id);
    //                 const publication = publications.filter(item => item.id === publicationId)[0];
    //
    //                 if (!publication) throw `post ${publicationId} not found`;
    //
    //                 res.status(200).json(publication);
    //             } catch (e) {
    //                 console.log('Impossible de se connecter, erreur suivante :', e);
    //                 res.status(404).json({"error": "post not found"});
    //             }
    //         })
    // } catch (e) {
    //     console.log('Impossible de se connecter, erreur suivante :', e);
    //     res.status(500).json({"error": "unable to connect to database"});
    // }
})

publications.post('/', (req, res) => {
    let sql = `
        insert into publication (
            name, 
            author, 
            pole, 
            description, 
            content, 
            imageUrl
        ) 
        VALUES (
            '${req.body['name']}', 
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
            connection.execSql(new Request('select * from publication', (err, rowCount, rows) => {
                if (err) {
                    console.log('Impossible de se connecter, erreur suivante :', err);
                    res.status(500).json({});
                } else {
                    let publications = rows_to_json(rows);
                    console.log(sql, publications);
                    res.status(200).json(publications);
                }
            }));
        }
    }));
    // try {
    //     console.log(req.body);
    //     sequelize.authenticate();
    //     sequelize.query(`insert into publication (name, author, pole, description, content, imageUrl) VALUES ('${req.body['name']}', '${req.body['author']}', '${req.body['pole']}', '${req.body['description']}', '${req.body['content']}', '${req.body['thumbnail']}')`)
    //         .then(([results, metadata]) => {
    //             try {
    //                 sequelize.query('select * from publication').then(([results, metadata]) => {
    //                     res.status(200).json(results);
    //                 })
    //             } catch (e) {
    //                 console.log('unable to post new post :', e);
    //                 res.status(500).json({"error": "unable to post"});
    //             }
    //         })
    // } catch (e) {
    //     console.log('Impossible de se connecter, erreur suivante :', e);
    //     res.status(500).json({"error": "unable to connect to database"});
    // }
})

// // flemme de faire les update :/ on verra plus tard
// // TODO : update value (put method)
// publications.put('/:id', (req, res)=>{
//     try {
//         sequelize.authenticate();
//         sequelize.query(`update publication set name = '${req.body['name']}', author = '${req.body['author']}', pole = '${req.body['pole']}', description = '${req.body['description']}', content = '${req.body['content']}', imageUrl = '${req.body['thumbnail']}' where id = ${parseInt(req.params.id)};`)
//             .then(([results, metadata]) => {
//                 try {
//                     sequelize.query('select * from publication').then(([results, metadata]) => {
//                         res.status(200).json(results);
//                     })
//                 } catch (e) {
//                     console.log('unable to put new values :', e);
//                     res.status(500).json({"error": "unable to put new values"});
//                 }
//             })
//     } catch (e) {
//         console.log('Impossible de se connecter, erreur suivante :', e);
//         res.status(500).json({"error": "unable to connect to database"});
//     }
// })

publications.delete('/:id', (req, res) => {
    connection.execSql(new Request(`delete from publication where id = ${parseInt(req.params.id)}`, (err) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            res.status(500).json({});
        } else {
            connection.execSql(new Request('select * from publication', (err, rowCount, rows) => {
                if (err) {
                    console.log('Impossible de se connecter, erreur suivante :', err);
                    res.status(500).json({});
                } else {
                    let publications = rows_to_json(rows);
                    console.log('select * from publication', publications);
                    res.status(200).json(publications);
                }
            }));
        }
    }));
    // try {
    //     sequelize.authenticate();
    //     sequelize.query(`delete from publication where id = ${parseInt(req.params.id)};`).then(([results, metadata]) => {
    //         try {
    //             sequelize.query('select * from publication').then(([results, metadata]) => {
    //                 res.status(200).json(results);
    //             })
    //         } catch (e) {
    //             console.log('Unable to delete post :', e);
    //             res.status(500).json({"error": "Unable to delete post"});
    //         }
    //     })
    // } catch (e) {
    //     console.log('Impossible de se connecter, erreur suivante :', e);
    //     res.status(500).json({"error": "unable to connect to database"});
    // }
})

module.exports = publications;
