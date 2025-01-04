import mongoose, { Mongoose, Schema, Types, model } from "mongoose";

const proffesionalInfo = new Schema({
    company: [String], 
    position: String,
    licence: String,
    experience: Number,
    specialization: [String],
    portifolio: [{
        title: String,
        description: String,
        images: [String],
        date: Date
    }],
    ratings: [{
        givenBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        review: String,
        date: {
            type: Date,
            default: Date.now
        },
    }],
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    address: {
         street: String,
         city: String,
         state: String,
         country: String,
         zip_code: String
    },
    laguages_known: [String]
})