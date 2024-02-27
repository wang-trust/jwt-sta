import mongoose from "mongoose";

await mongoose.connect('mongodb://127.0.0.1:27017/test01', { autoIndex: false });



const UserSchma = new mongoose.Schema({
    uid: {
        type: Number,
        default: 0
    },
    username: String,
    password: String,
    role: Number,
    aliasname: String,
    signupDate: {
        type: Date,
        default: Date.now
    },
    isDelete: Number,
    oldPassword: String
},
    {
        statics: {
            async modelFind(username, password) {
                let res = await this.findOne({ 'username': username, 'password': password }, {
                    _id: 0,
                    password: 0,
                    oldPassword: 0,
                    isDelete: 0,
                    __v: 0
                });

                return res !== null ? res.toJSON() : null;
            },
            async modelInsert(userObj) {
                if (userObj === null || userObj.username === null || userObj.password === null) {
                    return false;
                }
                let uid = await UserModel.modelGetUid();
                return await UserModel.create({
                    username: userObj.username,
                    password: userObj.password,
                    role: 1,
                    aliasname: userObj.aliasname,
                    isDelete: 0,
                    oldPassword: null,
                    uid: uid
                });
            },
            async modelGetUid() {
                let res = await UserModel.find().sort({ 'uid': 'desc' }).limit(1);
                if (res === null || res.length === 0) {
                    return 0;
                } else {
                    return res[0].uid + 1;
                }
            }

        }
    }
);

const UserModel = mongoose.model('BookModel', UserSchma);


const UserLoginLogSchema = new mongoose.Schema({
    uid: Number,
    username: String,
    refer: String,
    loginTime: {
        type: Date,
        default: Date.now
    },
    platform: String,
    token: String,
    cookies: String,
    ipaddress: String,
    isDone: {
        type: Number,
        default: 0
    },
    isDelete: {
        type: Number,
        default: 0
    }
});

const UserLoginLogModel = mongoose.model('UserLoginLogModel', UserLoginLogSchema);









export {
    UserModel,
    UserLoginLogModel
};


// await UserModel.create({
//     username: 'goupi1',
//     password: '123456',
//     role: 1,
//     aliasname: 'wang',
//     isDelete: 0,
//     oldPassword: null
// });

// let res = await UserModel.find().sort({'uid': 'asc'}).limit(1);
// console.log(res);

// let res = await UserModel.modelFind('goupi1', '123456');
// let res = await UserModel.modelGetUid();
// let res = await UserModel.modelInsert({
//     username: 'goupi2',
//     password: '123456',
//     role: 1,
//     aliasname: 'wang2',
//     isDelete: 0,
//     oldPassword: null
// });
// console.log(res);

// let res = await UserModel.getFormatTime();




