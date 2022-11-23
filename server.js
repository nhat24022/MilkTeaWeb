require("dotenv").config();
const express = require('express');
const app = express();

//middleware 
app.use(express.json()); //ad json bodies in the request object

app.use('/user', require("./routers/userRouter.js"));

app.use('/adMin', require("./routers/adRouter"));

app.use('/produce', require("./routers/produce"));


app.use((err,req,res,next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "something went rely wrong",
    })
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server running on port : "+ PORT )
})