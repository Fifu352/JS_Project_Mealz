const si = require('systeminformation');

si.cpuTemperature(function(data){
    console.log(data)
})
