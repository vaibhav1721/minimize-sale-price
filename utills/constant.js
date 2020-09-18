exports.responseFlags = {
    PARAMETER_MISSING_IN_REQUEST : 100,
    EMAIL_ALREADY_EXIST : 400,
    SUCCESSFUL : 200,
    SOMETHING_WENT_WRONG: 400,
    INVALID_USER: 201
};

exports.responseMessage = {
    PARAMETER_MISSING_IN_REQUEST : "Parameter is missing from request. Please Check.",
    SUCCESSFUL: "Successfully",
    SOMETHING_WENT_WRONG : "Something went wrong.Please check",
    INVALID_USER : "User Not registered with us",
    INVALID_PRODUCT : "Invalid product.",
    OUT_OF_STOCK : "Product out of stock."
}

exports.userActiveStatus = {
    ACTIVE  : 1,
    INACTIVE: 0
};

exports.userBlockedStatus = {
    BLOCKED : 1,
    UNBLOCKED : 0
};

exports.userDeletedStatus = {
    DELETED : 1,
    NOTDELETED : 0
};

exports.productType ={
  MASKS : 1,
  GLOVES : 2
}

exports.userCountry ={
  UK : 1,
  GERMANY : 2
}