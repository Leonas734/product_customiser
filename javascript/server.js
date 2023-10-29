express = require('express')
path = require('path');
const db = require("../database/models");
const controller = require("../database/controller");

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/admin', async (req, res) => {
    await db.sequelize.sync();
    await controller.CreateProduct('bob', [], 99.00);
    res.sendFile(path.join(__dirname, "..", "/html/admin/admin.html"));
})

app.get('/extra', async (req, res) => {
    await db.sequelize.sync();
    await controller.CreateExtra('new extra', 1);
    res.sendFile(path.join(__dirname, "..", "/html/admin/admin.html"));
})

app.get('/option', async (req, res) => {
    await db.sequelize.sync();
    await controller.CreateOption('new option',[], 22, 1);
    res.sendFile(path.join(__dirname, "..", "/html/admin/admin.html"));
})

// serve static
app.use(express.static(path.join(__dirname, "..")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})