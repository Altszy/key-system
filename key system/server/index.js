const express = require('express');
const mongoose = require('mongoose');
const app = express();
const schema = require("./schema");
const pos = require("./keysys");
const port = 3000;

mongoose.connect("mongodb connection string", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("Connected to database");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

async function createKey() {
    var result = ``
    var characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!"$%&*`
    var charactersLength = characters.length
    for ( var i = 0; i < 32; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

app.get('/start', async(req, res) => {

    const hwid = req.query.HWID;
    const ip = req.ip.substr(7, 20);

    if(!hwid) {
        return res.send("No HWID sent in the req");
    };

    const doc = await schema.findOne({HWID: hwid});

    if(doc && doc.EndsAt > Date.now()) {
        return res.send(`
        <center>${doc.Key}</center>
        `);
    } else {
        new pos({
            IP: ip,
            Position: 1,
            HWID: hwid
        }).save();
    
        // replace this with your own linkvertise link leading to http://localhost:3000/check1
        // or u could lead to to ur own domain but make sure the end point is the same
        res.redirect("https://link-center.net/178602/cyber-exploit-key-system");
    }
});

app.get("/check1", async(req, res, next) => {

    const ip = req.ip.substr(7, 20);
    const doc = await pos.findOne({IP: ip});

    if(!doc) {
        return res.send("no");
    } else {
        if(doc.Position === 1) {
        await pos.findOneAndUpdate({ IP: ip, Position: 2 });
        // again, replace the linkvertise link and make it lead to http://localhost:3000/main
        // or u could lead to to ur own domain but make sure the end point is the same
        res.redirect("https://direct-link.net/178602/cyber-key-system-2");
    } else {
        return res.send("no");
    };
    }
})

app.get("/main", async(req, res) => {
    const ip = req.ip.substr(7, 20);
    const doc = await pos.findOne({IP: ip});


    if(!doc) {
        return res.send("no");
    } else {
        if(doc.Position === 2) {
        const key = await createKey();
        const time = 1000 * 60 * 60 * 24; // 24 hours
        new schema({
            HWID: doc.HWID,
            Key: key,
            EndsAt: Date.now() + time
        }).save();

        doc.delete();

        res.send(`
        <center>${key}</center>
        `);
    } else {
        return res.send("no");
    }
    }
})

app.get("/checkkey", async(req, res) => {
    const key = req.query.key;
    const hwid = req.query.hwid;

    const data = await schema.findOne({ HWID: hwid, Key: key });

    if(!data) {
        return res.send("invalid");
    } else {
        if(data.EndsAt < Date.now()) {
            await pos.findOneAndDelete({ HWID: hwid });
            await data.delete();
            return res.send("invalid");
        } else {
            return res.send("valid");
        }
    }
})
