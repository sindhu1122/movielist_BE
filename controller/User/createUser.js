
const models = require('../../models');
const logger=require('../logger/logger')
const {errorResponse}=require('../response/response')
/** @description Creating the new user
 * @param {object} req - Request object with userName,password,role.
 * @param {object} res - Reponse object with success message if success or error message if there is an error.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns {Promise}
*/
const createUser = async (req, res, next) => {
    try {
    
        const users = await models.User.findOne({
            where: {
                userName: req.body.userName
            }
        });
        if (users) {
            res.status(201).json({
                success:true,
                message: 'Username already exists'
            })
        }
        else {
            const user = await models.User.create(req.body)
            res.status(201).json({
                success:true,
                message: 'Signup success'
            })
        }
        logger.info('Signup success')
    }
    catch (error) {
        result=errorResponse(error,res)
        result
        logger.error('Could not signup')
        next(error)
    }
}

module.exports = createUser
