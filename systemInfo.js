const os = require('os');
const fs = require('fs');

function showSystemInfo() {
    console.log("------------------------");
    console.log('System Info:');
    console.log(`OS: ${os.type()} ${os.release()}`);
    console.log(`Architecture: ${os.arch()}`);
    console.log(`Platform: ${process.platform}`);
    console.log(`NodeJS Version: ${process.version}`);
    console.log("-------------------------");
}

function getCpuUsage() {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalActive = 0;

    cpus.forEach(cpu => {
        for (const type in cpu.times) {
            totalActive += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    });
    const cpuUsage = ((1 - totalIdle / totalActive) * 100).toFixed(2);

    return cpuUsage;
}

function showPeriodicInfo() {
    const config = JSON.parse(fs.readFileSync('config.json'));

    if (config.showCpuUsage) {
        console.log(`CPU usage: ${getCpuUsage()}%`);
    }

    if (config.showMemoryUsage) {
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = (totalMemory - freeMemory) / totalMemory * 100;
        console.log(`Memory usage: ${usedMemory.toFixed(2)}%`);
    }

    if (config.showSystemUptime) {
        const systemUptime = os.uptime();
        console.log(`Active time: ${(systemUptime / 60).toFixed(2)} minutes - ` +
            `${(systemUptime / 3600).toFixed(2)} hours `);
    }

    if (config.showNodeUptime) {
        const nodeUptime = process.uptime();
        console.log(`NodeJS execution time: ${(nodeUptime / 60).toFixed(2)} minutes - ` +
        `${(nodeUptime / 3600).toFixed(2)} hours`);
    }

    console.log("---------------");
}

module.exports = {
    showSystemInfo,
    showPeriodicInfo
};