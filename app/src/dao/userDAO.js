var properties = require('properties').properties;				   //Import properties file
var UserModel  = require(properties.path + 'app/src/models/user').User;	
var bucket  = require(properties.path + 'app/db/dbSchema');	       //Import User model.
var crypto  = require('crypto');								   //Import libraries to crypt all the data /* https://nodejs.org/api/crypto.html */	


/*
	UserDao prototype 
*/	
function UserDao(){

	/*
  		Create new user  
    */	
	this.create = function(user, callback){
    	user.save(function(err, user){
      		if(err) callback({err: 'unnable to add the user'});
      		else    callback(user);
    	});
  	}; 

	/*
  		Delete existing user  
    */	
    this.delete = function(user, callback){
        user.remove(function(err, user){
	        if(err) callback({err: 'unnable to delete the user'});
	        else callback(0);
	    });
	};

  	
  	/*
  		Update existing user  
    */
    this.update = function(user, callback){
    	user.update(function(err, user){
        	if(err) callback({err: 'unnable to update the user'});
        	else callback(0);
    	});
    };

    /*
    	Find user since their name
    */	
    this.findByName = function(userName, callback){
    	var query = UserModel.findOne({'name' : userName});
      
        query.exec(function(err, user){
       		if (err) callback(err);
        	else callback(user);
      	});    
  	};

  	/*
    	Find user since their id
    */
  	this.findById = function(userId, callback){

    	var query = UserModel.findOne({'_id' : userId});
      
    	query.exec(function(err, user){
        	if (err) callback(err);
        	else callback(user);
        });    
    };


  /*
  	Find all users  //method to debug an stress//
  */	
  this.findAll = function(callback){
    
    var query = UserModel.find({});

    query.exec(function(err, users){
      if(err) callback(err);
      else callback(users);
    });
  };
}	
exports.UserDao = UserDao;


/////TODO//////////////
/*
	Function to validate an user.
*/	 
function validateUser(name, pass, callback){
	passw = crypto.createHash('sha256').update(pass).digest();
	model.user.findOne({ 'name':  name }, 'name password', function (err, user){
		if (err){
			return callback(undefined);
		}
		else{
			if (user.password === passw.toString()) return callback(true);
			else return callback(false);
		}
	});
}
exports.validateUser = validateUser;
