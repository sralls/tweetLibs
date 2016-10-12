var configDB = require('../config/database.js');
var mongoose = require('mongoose');
var User = require("../app/models/user.js");

mongoose.connect(configDB.url);

var admin = new User();
admin.username = process.argv[2];
admin.password = admin.generateHash(process.argv[3]);

admin.save(function(err) {
    if (err) {
        throw err;
    } else {
    	return true;
    }
 });