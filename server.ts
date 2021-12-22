const express = require('express');

const app = express();

app.get('/*', (req, res) => {
    res.json({
        "message": 'ok'
    });
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('Server started at port ' + PORT));