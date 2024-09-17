const express = require("express");

const app = express();  

const PORT = 8000;

const urlRoute = require("./routes/url");

const {connectToMongoDB} = require("./connect");

const URL = require('./models/url');


connectToMongoDB ('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log("mongodb  connected")
);

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {

    const shortId = req.params.shortId;
  const entry = 
    await URL.findOneAndUpdate({
        shortId
    }, { $push: {
        visitHistory: {

            timestamp: Date.now(),

        },
    },
}
 );
        res.redirect(entry.redirectURL)

});

app.listen(PORT, () => console.log(`server is started on port ${PORT}`));