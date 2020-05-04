const models = require('../../models');
const logger = require('../logger/logger')
/** @description This functions unables the user to login
 * @param {object} req - Request object with userName,password
 * @param {object} res -  Reponse object with all details of logged in user along with token if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns Logged in user details
*/
const login = async (req, res, next) => {

    const user = await models.User.findOne({
        where: {
            userName: req.body.userName,
        }
    })
    if (!user) {
        return res.status(201).json({
            success: false,
            msg: 'Authentication failed. User not found.',
        });
        logger.info('Authentication failed. User not found.')
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
            var token = jwt.sign({ userName: req.body.userName }, 'nodeauthsecret');
            res.status(201).json({ success: true, token: token, user: user, msg: 'login successful' });
            logger.info('Login successfull')
        } else {
            res.status(201).send({ msg: 'Authentication failed. Wrong password.' });
        }
    })
}

module.exports = login;