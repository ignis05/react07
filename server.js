const http = require('http')
const server = http.createServer((req, res) => {
	console.dir(req.param)
	if (req.method == 'POST') {
		console.log('POST')
		var body = ''
		req.on('data', data => {
			body += data
			console.log('Partial body: ' + body)
		})
		req.on('end', () => {
			console.log('Body: ' + body)
			res.writeHead(200, { 'Content-Type': 'data/json' })
			res.end(body)
		})
	}
})

const port = 3000
server.listen(port)
console.log(`Running on port: ${port}`)
