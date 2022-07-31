const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;


const userSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-z]/)) {
                throw new Error('Password must contain atleast one letter and one number');
            }
        },
        private: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'

    },
    // accessToken: {
    //     type: String,
    // }
},
    {
        timestamps: true
    }
)
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const user = mongoose.model('user', userSchema);

module.exports = user