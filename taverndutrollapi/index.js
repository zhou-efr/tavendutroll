const express = require('express');
const app = express();
const cors = require('cors');

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

const events = require("./components/event");
const publications = require("./components/publication");
const quests = require("./components/quest");
const games = require("./components/game");

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

app.use('/event', events);
app.use('/publication', publications);
app.use('/quest', quests);
app.use('/game', games);


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
