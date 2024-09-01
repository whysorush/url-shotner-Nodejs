const express = require("express");
const app = express();
const port = 8001;
const urlRoute = require('./routes/url');
const { connectDb } = require('./connection');
const URL = require('./models/url')

connectDb("mongodb://127.0.0.1:27017/shortUrl").then(() => console.log("Mongo connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/test',async (req,res)=>{
    const data = await URL.find({});
    console.log(data)
    return res.end(`
    <html>
    <head></head>
    <body>
    
    <h1>Short URL</h1>
    <ol>
    ${data.map(item=> `<li>${item.shortId} - ${item.redirectURL} - ${item.visitHistory.length}</li>`).join()}
    </ol>
    </body>
    `);
})
app.get('/url/:shortId', async (req, res) => {
    console.log('This is a middleware layer!', req.url);
    const shortId = req.params.shortId;
    console.log(shortId)
    // const entry = 
    await URL.findOneAndUpdate({ shortId, }, {
        $push: {
            visitHistory: {timeStamp : Date.now(),shortId:req.params.shortId},
        }
    }).then(entry=>{
        // console.log(entry,Date.now())
        // return res.json(entry.redirectURL);//JSON.stringify(entry));
        return res.redirect(entry.redirectURL)
    })
    
})
app.use("/url", urlRoute);


app.listen(port, () => console.log('Server started on ', port))