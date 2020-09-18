
var Joi                                         = require('joi');
var validator                                   = require('../../../validator/validator');

var apiReferenceModule                          = "productPricing";


exports.getProductPricing                    = getProductPricing;

function getProductPricing(req,res,next) {
  req.apiReference = {
    module: apiReferenceModule,
    api: "getProductPricing"
  };
  var schema = Joi.object().keys({
    access_token     : Joi.string().required(),
    shipping_country : Joi.string().required(),
    user_id          : Joi.number().required(),
    no_of_gloves     : Joi.number().required(),
    no_of_masks      : Joi.number().required(),
  });
  var validFields = validator.validateFields(req.apiReference, req.query, res, schema);
  if (validFields) {
    next();
  }
}