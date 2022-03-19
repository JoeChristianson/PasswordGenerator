// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordLength = 40;
var includesLowercase = true;
var includesUppercase = true;
var includesNumeric = true;
var includesSpecial = true;
var lowercase = "abcdefghijklmnopqrstuvwxyz";
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var number = "0123456789";
var special = "~!@#$%^&*()";
// stores boolean of whether or not each type is included and respected types string
var types = [[includesLowercase,lowercase],
            [includesUppercase,uppercase],
            [includesNumeric,number],
            [includesSpecial,special]];

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword(){
  var includedTypes = [];
  var password = ""
  types.forEach(type=>type[0]?includedTypes.push(type[1]):null);
  while (password.length<passwordLength){
    var selectedType = pickRandomFrom(includedTypes);
    password = password + pickRandomFrom(selectedType);
  }
  return password;
}

// accepts both strings and arrays
function pickRandomFrom(str){
  return str[Math.floor(Math.random()*str.length)];
}
