const productPricingController               = require('./productPricingController/productPricingController');
const productPricingValidator                = require('./productPricingValidator/productPricingValidator');

app.get('/bill/get',        productPricingValidator.getProductPricing, productPricingController.getProductPricing)