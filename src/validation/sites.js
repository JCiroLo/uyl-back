const Validator = require("validator");
const isEmpty = require("is-empty"); 

module.exports = function validateCreateSiteInput(data) {

    let errors = {};
    
    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.content = !isEmpty(data.content) ? data.content : "";

    // Email checks
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    } 
    // Password checks
    if (Validator.isEmpty(data.content)) {
        errors.content = "Content field is required";
    } 
    return {
        errors,
        isValid: isEmpty(errors)
    };
};