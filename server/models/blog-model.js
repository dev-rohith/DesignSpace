import { Schema,model } from "mongoose"

const blogPostSchema = new Schema({
    title: String,
    content: String,
    author: { type: ObjectId, ref: 'User' },
    category: String,
    tags: [String],
    status: { type: String, enum: ['draft', 'published'] },
    publishedAt: Date,
    Images: [String],
    slug: { type: String, unique: true },
    views: Number,
    comments: [{
      user: { type: ObjectId, ref: 'User' },
      content: String,
      timestamp: Date
    }]
  }) 
  