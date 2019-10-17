var express = require('express')
var app = express()
app.use(express.json())

const PORT = 3000

app.post('/', (req, res) => {
	console.log(req.body)
	res.send(req.body)
})

app.listen(PORT, () => {
	console.log('server running on port ' + PORT)
})
