const Joi                                         = require('joi');
const _                                           = require('underscore');
const responses                                   = require('../utills/response');
const constants                                   = require('../utills/constant');
exports.validateFields = function (apiReference, req, res, schema) {
  
    var validation = Joi.validate(req, schema);
    if(validation.error) {
        var errorReason =
            validation.error.details !== undefined
                ? validation.error.details[0].message
                : 'Parameter missing or parameter type is wrong';
        if(!_.isEmpty(validation.error.details)){
            errorReason = {
                validation_error : validation.error.details[0].message,
                path             : validation.error.details[0].path
            }
        } else {
            errorReason = {
                validation_error : "Parameter missing or parameter type is wrong"
            }
        }
        responses.sendResponse(res,errorReason, constants.responseFlags.PARAMETER_MISSING_IN_REQUEST);
        return false;
    }
    return true;
};
