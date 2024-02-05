import mongoose from "mongoose";

await mongoose.connect('mongodb://127.0.0.1:27017/test01', { autoIndex: false });


const BookSchma = new mongoose.Schema({
    name: String,
    author: {
        type: String, 
        default: 'wang',
        alias: 'zuozhe'
    },
    price: Number
}, {
    methods:{
        findSimilarType(){
            return mongoose.model('BookModel').find();
        }
    },
    statics: {
        findByName(){
            return this.find({price: 3.9});
        }
    },
    virtuals: {
        allInfo: {
            get(){
                return `${this.name}-${this.author}-"${this.price}"`;
            },
            set(v){
                this.author = v;
            }
        }
    },
    query: {
        byName(name){
            return this.where({price: 3.9});
        }
    }
})
BookSchma.set('toObject', { getters: true });

const BookModel = mongoose.model('BookModel', BookSchma);

await BookModel.create({
    name: 'tt1',
    author: 'xg',
    price: 1.4
});

let res = await BookModel.find();
console.log(res);

// const book1 = new BookModel({
//     name: 'xxxx',
//     author: 'goupi',
//     price: 3.9
// });



// await book1.save();
// let res = await BookModel.find();
// console.log(book1.allInfo);
// let res  = await book1.findSimilarType();
// let res = await BookModel.findByName();
// // let res = await BookModel.find().byName();
// console.log(book1.toJSON());
// console.log(book1.toObject());
// console.log(res);
