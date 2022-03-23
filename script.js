// This selects the generate button and the element where the generated password will be displayed
var generateBtn = document.querySelector("#generate");
var passwordDisplay = document.querySelector("#password");

// password object, reset to these values before each password generation
var password ={
    text:"",
    length:null,
    includedTypes:[],
}

// in each object of this object, name is used in confirmation prompts, characters is the string from which characters are chosen randomly and 
// is included is set to true by confirmation prompts and determines whether or not the object's characters can be included in the password.
var types={
    lowercase:{
        name:"lower-case letters",
        characters:"abcdefghijklmnopqrstuvwxyz",
        isIncluded:false,
        isRequired:false,
    },
    uppercase:{
        name:"upper-case letters",
        characters:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        isIncluded:false,
        isRequired:false,
    },
    numbers:{
        name:"numbers",
        characters:"0123456789",
        isIncluded:false,
        isRequired:false,
    },
    special:{
        name:"special characters",
        characters:"~!@#$%^&*()",
        isIncluded:false,
        isRequired:false,
    }
}

// resets types and password objects, then displays the password returned by the generatePassword function

function writePassword(){
    password.text = "";
    password.includedTypes = [];
    password.length = null;
    for (let type in types){
        types[type].isIncluded = false;
        types[type].isRequired = false;
    }
    passwordDisplay.value = generatePassword();
}


function generatePassword(){
    // This continues prompting the user to enter a password length until input is between 8 and 129 (inclusive)
    while (!(password.length>3)||(!(password.length<129))){
        password.length = parseInt(prompt("Enter a length between 8 and 128"));
      }
    //   this cycles through the types object asking the user if they want to include a type in the password, if so, types object and password objects reflect that.
    for (var type in types){
        types[type].isRequired = confirm("Do you wish to include "+types[type].name+"?")
        if(types[type].isRequired){
            types[type].isRequired = true;
            password.includedTypes.push(types[type])
        } 
    }
    // If no types have been included by the user, it defaults to lowercase being included
    if (password.includedTypes.length===0){
        types.lowercase.isRequired = true;
        password.includedTypes.push(types.lowercase)
    }
    
    return fillText();
}


// this is where random characters which are of the included types are added to the password text
function fillText(){
    while (password.text.length<password.length){
        // picks randomly from the included types
        var selectedType = pickRandomFrom(password.includedTypes);
        selectedType.isIncluded = true;
        // 
        password.text = password.text + pickRandomFrom(selectedType.characters);
      }
      for (let type in types){
          if (types[type].isIncluded !== types[type].isRequired ){
              console.log(password.text)
              password.text = ""
              for (let type in types){
                types[type].isIncluded = false;
            }
              fillText();
          }
      }
      return password.text;
}




// 
generateBtn.addEventListener("click", writePassword);
// 
function pickRandomFrom(str){
    return str[Math.floor(Math.random()*str.length)];
  }