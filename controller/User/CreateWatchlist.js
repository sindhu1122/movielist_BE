// var jwt = require('jsonwebtoken')

// const CreateWatchlist = async (req, res, next) => {
//     try {
//         const token = req.headers['access-token']
//         const payload = jwt.decode(token)
//         const user = await models.User.findOne({
//             where: {
//                 userName: payload.userName
//             }
//         })
//     }
//     catch(error(){
//             res.status(400).jso
//     };
//     )