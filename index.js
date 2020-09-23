const app = require('./app')
const config = require('config')
const port = config.get('port') || 5000

app.listen(port, () => {
  console.log(`Server has been started on port ${port}...`)
})