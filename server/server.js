/* eslint-disable import/no-commonjs, no-console */
const fs = require('fs');
const express = require('express');
const app = express();

// Класс Router позволяет определить маршрут, в пределах которого можно создавать подмаршруты и задавать им обработчики
const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) =>
{
    const path = 'public/index.html';

    fs.readFile(path, (err, data) =>
    {
        if (err)
        {
            console.log(err);

            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found root!');
        }
        else
        {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data.toString());

            console.log('data was sent');

            res.end();
        }
    });
});

router.get('/:id', (req, res) =>
{
    const path = `public/${req.params.id}`;

    fs.readFile(path, (err, data) =>
    {
        if (err)
        {
            console.log(err);

            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found!');
        }
        else
        {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data.toString());

            console.log('data was sent');

            res.end();
        }
    });
});

app.use('/', router);

app.use('/static', express.static('public'));


app.listen(8081, () =>
{
    console.log('Server starting! on http://localhost:8081');
});

