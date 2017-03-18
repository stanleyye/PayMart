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
  admin_level: {
    type: Number,
    required: true,
    default: 2
  },
  store: {
    type: Schema.Types.ObjectId
    default: null
  }
}, 
{	
  // additional options. 
  timestamps: true // adds a createdAt and updatedAt field
});

// bcrypt Hash
UserSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    // default is 10 bcrypt hash rounds
    bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) {
        console.log("[INFO] error hashing:", err);
        return next(err);
      }
      user.password = hash;
      next();
    });
  } else {
    return next();
  }
});

// Compare password input to password saved in database
UserSchema.methods.comparePassword = function(password, callback) {
  var hashedPassword = this.password;
  bcrypt.compare(password, hashedPassword, function(err, samePassword) {
    if (err) {
      return callback(err);
    }
    callback(null, samePassword);
  });
};

module.exports = mongoose.model('User', UserSchema);