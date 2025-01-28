import e from "express";

const test = e()

test.get('/test', (req,res)=>{
    res.json({data: 'hello testing'})
})

export default test