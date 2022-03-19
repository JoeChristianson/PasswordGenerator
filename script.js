// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordLength;
var includesLowercase = true;
var includesUppercase = true;
var includesNumeric = true;
var includesSpecial = true;
var lowercase = "abcdefghijklmnopqrstuvwxyz";
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var number = "0123456789";
var special = "~!@#$%^&*()";
// stores boolean of whether or not each type is included and respected types string and text for the confirm boxes
var types = [[includesLowercase,lowercase,"lower-case letters"],
            [includesUppercase,uppercase,"upper-case letters"],
            [includesNumeric,number,"numbers"],
            [includesSpecial,special,"special characters"]];

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
  var hasTypeBeenSelected = false;
  // keeps asking for password length as long as length doesn't meet required values
  while (!(passwordLength>7)||(!(passwordLength<129))){
    passwordLength = parseInt(prompt("Enter a length between 8 and 128"));
  }
  for (let type of types){
    type[0] = confirm("Do you wish to include "+type[2]+"?")
    if(type[0]){
      hasTypeBeenSelected = true;
    }
  }
  if (!hasTypeBeenSelected){
    types[0][0] = true;
    alert("Since no character type has been selected, the password will be all lowercase characters.")
  }
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
