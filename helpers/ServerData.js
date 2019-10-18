const ServerData = {
	url: 'http://ignis-react07.ct8.pl',
	port: '',
	toString: function() {
		return `${this.url}${this.port ? ':' + this.port : ''}`
	},
}
export default ServerData
