'use strict';
const mongoose = require('mongoose');
const foodMongooseModel = require('./food-schema.js');

class Model {
    constructor(mongooseModel) {
        this.model = mongooseModel;
    }

    async create(record) {
        try {
            let recordToAdd = new this.model(record);
            return await recordToAdd.save();
        } catch (e) {
            console.error('---ERROR CREATING RECORD---');
            return false;
        }
    }

    async read(_id) {
        // first, validate that this is an id
        try {
            if (!typeof _id === mongoose.ObjectId) throw 'err';
            let foundRecords = await this.model.find({ _id });
            if (foundRecords.length) return foundRecords[0];
            else throw 'err';
        } catch (e) {
            console.log('---ERROR READING RECORD---');
            return false;
        }
    }

    async update(_id, changedRecord) {}

    async delete(_id) {}
}

let foodModel = new Model(foodMongooseModel);

module.exports = foodModel;
