var os = require('os');
var getHomePath = os.userInfo().homedir;
var getOS = os.platform();
var getCPU = os.cpus()[0].model;