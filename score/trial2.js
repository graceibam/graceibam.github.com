
var mongoUri = 'mongodb://gbambushew:murray@dharma.mongohq.com:10038/scorecenter'
var mongo = require('mongodb');
var db = mongo.Db.connect(mongoUri, function (error, databaseConnection) {
	db = databaseConnection;
	db.collection('highscores', function(er, collection) {
			collection.insert({'soda':'moxie'},{w:1}, function(err, result){});
	});
});