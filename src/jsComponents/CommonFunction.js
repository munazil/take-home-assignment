function navigate(link) {
    window.location.replace(link)
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  // Validate capital letters
function validateCapitalLetters(params) {
    var upperCaseLetters = /[A-Z]/g;
    if(params.match(upperCaseLetters)) {  
      return true
    } else {
      return false
    }    
}

  // Validate lowercase letters
function validateLowerCaseLetters(params) {
    var lowerCaseLetters = /[a-z]/g;
    if(params.match(lowerCaseLetters)) {  
      return true
    } else {
      return false
    }    
}

function validateLength(params){
    if(params.length >= 12)
        return true
    else
        return false
}

function validateNonAlphaNumericLetters(params){
    var nonAlphaNumericLetters = /[^a-zA-Z\d\s:]/g;
    if(params.match(nonAlphaNumericLetters))
        return true
    else
        return false
}

export {navigate, validateEmail, validateCapitalLetters, validateLowerCaseLetters, validateLength, validateNonAlphaNumericLetters}