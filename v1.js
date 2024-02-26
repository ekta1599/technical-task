const {Router} = require ("express")
const v1 = Router()

const userroute = require ("./routes/userroutes");

v1.get("/", (req, res) => {
    res.status(200).json({ message: "v1 routes working!!" });
});

v1.use("/user",userroute);

module.exports = v1