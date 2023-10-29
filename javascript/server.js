express = require('express')
path = require('path');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/html/admin/admin.html"));
})


// serve static
app.use(express.static(path.join(__dirname, "..")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})