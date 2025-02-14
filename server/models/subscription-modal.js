import {Schema, model} from 'mongoose'

const subscriptionSchema = new Schema({
    monthly_price: Number,
    discounted_monthly_price: Number,
    yearly_price: Number,
    discounted_yearly_price: Number
})

const Subscription = model('subscription', subscriptionSchema)

export default Subscription
