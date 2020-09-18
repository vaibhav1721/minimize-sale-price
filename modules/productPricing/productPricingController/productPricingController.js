let async                       = require('async');
let _                           = require('underscore');
let response                    = require('../../../utills/response');
let userService                 = require('./../productPricingService/userServices');
let productPricingService       = require('./../productPricingService/productPricingService');
let constants                   = require('./../../../utills/constant');

exports.getProductPricing                = getProductPricing;

async function getProductPricing(req, res) {
  try {
    let no_of_gloves      = req.query.no_of_gloves || 0;
    let shipping_country  = req.query.shipping_country || 0;
    let no_of_masks       = req.query.no_of_masks || 0;

    no_of_masks = no_of_masks - (no_of_masks % 10);
    no_of_gloves = no_of_gloves - (no_of_gloves % 10);

    let maskData = [], glovesData =[];

    let userData = await userService.validateUser(req.apiReference, {
      access_token: req.query.access_token
    });
    if(_.isEmpty(userData)){
      return response.invalidUser(res)
    }
    userData = userData[0];

    if(no_of_masks > 0){
      maskData = await productPricingService.getProductData(req.apiReference, {
        product_type : constants.productType.MASKS
      })
      if(_.isEmpty(maskData)){
        return response.invalidProduct(res)
      }
      maskData = maskData[0];
    }

    if(no_of_gloves > 0){
      glovesData = await productPricingService.getProductData(req.apiReference, {
        product_type : constants.productType.GLOVES
      })
      if(_.isEmpty(glovesData)){
        return response.invalidProduct(res)
      }
      glovesData = glovesData[0];
    }

    let shippingCostPer10Unit = 400;
    let totalPrice            = 0;
    let passportOfCountry     = userData.passport[0] === "A" ? constants.userCountry.GERMANY : userData.passport[0] === "B" ? constants.userCountry.UK : 0;

    if(no_of_masks > (maskData.uk_inventory + maskData.gr_inventory)){
      return response.sendResponse(res, constants.responseMessage.OUT_OF_STOCK, constants.responseFlags.SOMETHING_WENT_WRONG);
    }

    if(no_of_gloves > (glovesData.uk_inventory + glovesData.gr_inventory)){
      return response.sendResponse(res, constants.responseMessage.OUT_OF_STOCK, constants.responseFlags.SOMETHING_WENT_WRONG);
    }

    if(userData.user_country == constants.userCountry.UK){
      let maskFromGermany = no_of_masks -  maskData.uk_inventory;
      if(maskFromGermany > 0){
        let maskfromUk = no_of_masks - maskData.gr_inventory;
        totalPrice += maskfromUk * maskData.uk_price;
        totalPrice += maskFromGermany * maskData.gr_price;

        if(shipping_country == constants.userCountry.GERMANY && passportOfCountry == constants.userCountry.GERMANY){
          let discount = parseFloat(parseFloat(shippingCostPer10Unit) * 20) /100 ;
          shippingCostPer10Unit = shippingCostPer10Unit - discount;
        }
        while (maskFromGermany != 0){
          totalPrice += 10 * shippingCostPer10Unit;
          maskFromGermany = maskFromGermany - 10;
        }
      }else{
        totalPrice = totalPrice + (no_of_masks * maskData.uk_price);
      }
      let gloveFromGermany = no_of_gloves -  glovesData.uk_inventory ;
      if(gloveFromGermany > 0){
        let glovefromUk = no_of_gloves - glovesData.gr_inventory;
        totalPrice += glovefromUk * glovesData.uk_price;
        totalPrice += gloveFromGermany * glovesData.gr_price;

        if(shipping_country == constants.userCountry.GERMANY && passportOfCountry == constants.userCountry.GERMANY){
          let discount = parseFloat(parseFloat(shippingCostPer10Unit) * 20) /100 ;
          shippingCostPer10Unit = shippingCostPer10Unit - discount;
        }

        while (gloveFromGermany != 0){
          totalPrice += 10 * shippingCostPer10Unit;
          gloveFromGermany = gloveFromGermany - 10;
        }
      }else{
        totalPrice = totalPrice + (no_of_gloves * glovesData.uk_price);

      }
    } else {
      let maskFromUK = no_of_masks - maskData.gr_inventory;
      if(maskFromUK > 0){
        let maskfromGermany = no_of_masks - maskData.uk_inventory;
        totalPrice += maskfromGermany * maskData.gr_price;
        totalPrice += maskFromUK * maskData.uk_price;

        if(shipping_country == constants.userCountry.UK && passportOfCountry == constants.userCountry.UK){
          let discount = parseFloat(parseFloat(shippingCostPer10Unit) * 20) /100 ;
          shippingCostPer10Unit = shippingCostPer10Unit - discount;
        }

        while (maskFromUK != 0){
          totalPrice += 10 * shippingCostPer10Unit;
          maskFromUK = maskFromUK - 10;
        }
      }else{
        totalPrice = totalPrice + (no_of_masks * maskData.gr_price);
      }

      let gloveFromUK = no_of_gloves - glovesData.gr_inventory;
      if(gloveFromUK > 0 ){
        let glovefromGermany = no_of_gloves - glovesData.uk_inventory;
        totalPrice += glovefromGermany * glovesData.gr_price;
        totalPrice += gloveFromUK * glovesData.uk_price;

        if(shipping_country == constants.userCountry.UK && passportOfCountry == constants.userCountry.UK){
          let discount = parseFloat(parseFloat(shippingCostPer10Unit) * 20) /100 ;
          shippingCostPer10Unit = shippingCostPer10Unit - discount;
        }

        while (gloveFromUK != 0){
          totalPrice += 10 * shippingCostPer10Unit;
          gloveFromUK = gloveFromUK - 10;
        }
      }else{
        totalPrice += no_of_gloves * glovesData.gr_price;
      }
    }

    let returnData = {
      totalPrice : totalPrice
    }

    return response.sendSuccessResponse(res, {returnData})
  }catch (e){
    console.log("error",e);
    response.somethingWentWrongError(res);
  }
}