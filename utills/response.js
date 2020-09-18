
const constants                         = require('../utills/constant');

exports.sendResponse                    = sendResponse;
exports.somethingWentWrongError         = somethingWentWrongError;
exports.invalidUser                     = invalidUser;
exports.invalidProduct                  = invalidProduct;
exports.sendSuccessResponse             = sendSuccessResponse;

function sendResponse(res, msg, status, data, values) {
    var response = {
        message: msg,
        status : status,
        data   : data || {}
    };
    if(values){
        response.values = values;
    }
    res.send(JSON.stringify(response));
}

function somethingWentWrongError(res) {
    var response = {
        message: constants.responseMessage.SOMETHING_WENT_WRONG,
        status: constants.responseFlags.SOMETHING_WENT_WRONG,
        data : {}
    };
    res.send(JSON.stringify(response));
}

function invalidUser(res) {
    var response = {
        message : constants.responseMessage.INVALID_USER,
        status : constants.responseFlags.INVALID_USER,
        data : {}
    };
    res.send(JSON.stringify(response));
}

function invalidProduct(res) {
    var response = {
        message : constants.responseMessage.INVALID_PRODUCT,
        status : constants.responseFlags.SOMETHING_WENT_WRONG,
        data : {}
    };
    res.send(JSON.stringify(response));
}

function sendSuccessResponse(res, data) {
    var response = {
        message : constants.responseMessage.SUCCESSFUL,
        status : constants.responseFlags.SUCCESSFUL,
        data : data || {}
    };
    res.send(JSON.stringify(response));
}
