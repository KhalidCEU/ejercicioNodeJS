const http = require('http');
const fs = require('fs');
const { showSystemInfo, showPeriodicInfo } = require('./systemInfo');

const server = http.createServer();

const config = JSON.parse(fs.readFileSync('config.json'));

server.listen(3000, () => {
    console.log('Server listening on port 3000');
    showSystemInfo();
    setInterval(showPeriodicInfo, config.secondsInterval * 1000);
});
