var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  last_logged_in: {
  	type: Date,
  	default: Date.now
  },
  first_name: {
  	type: String,
  	required: true
  },
  last_name: {
  	type: String,
  	required: true
  },
  username: {
  	type: String,
  	unique: true,
  	required: true
  }, 
  password: {
  	type: String,
  	required: true
  },
  email: {
  	type: String,
  	unique: true,
  	required: true
  },
  store: {
    type: Schema.Types.ObjectId
  }
}, 
{	
  // additional options. 
  timestamps: true // adds a createdAt and updatedAt field
});

// Hash password
UserSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Compare password input to password saved in database
UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, samePassword) {
    if (err) {
      return callback(err);
    }
    callback(null, samePassword);
  });
};

module.exports = mongoose.model('User', UserSchema);