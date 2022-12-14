const county = ["Alba", "Arad", "Arges", "Bacau", "Bihor", "Bistrita-Nasaud", 
    "Botosani", "Brasov", "Braila", "Buzau", "Caras-Severin", "Cluj", "Constanta",
    "Covasna", "Dâmbovița", "Dolj", "Galați", "Gorj", "Harghita", "Hunedoara",
    "Ialomita", "Iasi", "Ilfov", "Maramures", "Mehedinti", "Mures", "Neamt", "Olt",
    "Prahova", "Satu-Mare", "Salaj", "Sibiu", "Suceava", "Teleorman", "Timis",
    "Tulcea", "Vaslui", "Valcea", "Vrancea", "Bucuresti", "Bucuresti - Sector 1",
    "Bucuresti - Sector 2", "Bucuresti - Sector 3", "Bucuresti - Sector 4",
    "Bucuresti - Sector 5", "Bucuresti - Sector 6", "Calarasi", "Giurgiu",
];
const cValidate = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let CNParray = [];

localStorage.setItem("CNP-uri", JSON.stringify(CNParray));

// const date = {
//     sex: "",
//     year: "",
//     month: "",
//     day: "",
//     county: "",
// };
//
///////////////////////////////////////////////////////////////////////////////
// function checkLeapYear( year, monthdays) {
//     if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)){
//         monthdays = 29;
//     }
// };



//return n % 11


function checkLast(CNP, con) {
    
    let n = 0;

    for ( let i = 0; i <= 11; i++ ) 
         n = n + CNP[i] * con[i];
    
    if (n % 11 == 10)
    return 1;
    else return n % 11;
}; //return n % 11

//return year + 2000
function computeYearValidate(sex, year) {
    if (sex == 1 || sex == 2) {
        return year + 1900;
    }
    else if (sex == 3 || sex == 4) {
        return year + 1800;
    } 
    else {
        return year + 2000;
    }
};
//return year - 2000
function computeYearGenerate(sex, year) {
    if (sex == 1 || sex == 2) {
        return year - 1900;
    }
    else if (sex == 3 || sex == 4) {
        return year - 1800;
    } 
    else {
        return year - 2000;
    }
};
// return F/M
function checkSex ( sex ) {
    if(sex % 2 == 0) {
        return "F";
    }
    else return "M";
}

//////// returns -1
function validateForLetters( CNP ) {
    if(/^\d+$/.test(CNP) === 0) {
        return -1;
        //return alert("CNP invalid");
    };
};
function validateSex( sex ) {
    if(sex == 0){
        return -1;
        //return alert("CNP invalid");  
    }
};
function validateYearMonth(year, month) {
    if(year < 1800 || year > 2022 || month == 0 || month > 12){
        return -1;
        //return alert("CNP invalid");
    }   
};
function validateDay( day, monthdays ) {
    if (1 > day || day > monthdays) {
        return -1;
        //return alert("CNP invalid");
    }
};
function validateCounty( county ) {
    if (county < 1 || county > 52) {
        return -1;
        //return alert("CNP invalid");
    }        
};//////// returns -1


function convertAndCheckSex( sex, year ) {
    if (sex == "M") {
        if (year > 1999) {
            return 5;
        }
        else if (year < 2000 && year > 1899) {
            return 1;
        }
        else if ( year > 1799 && year < 1900) {
            return 3;
        }
        else return 7;
    }
    else if ( sex == "F") {
        if (year > 1999) {
            return 6;
        }
        else if (year < 2000 && year > 1899) {
            return 2;
        }
        else if ( year > 1799 && year < 1900) {
            return 4;
        }
        else return 8;
    }
    else {
        
        return 0;
    }
    
}
// returns sex as a number based on sex(string) and year as 1920


// function convertAndCheckYear( year ) {
//     if( year > 1999 ) {
//         return (year - 2000).toString();
//     }
//     else if(year < 2000 && year > 1899) {
//         return (year - 1900).toString();
//     } 
//     else if (year > 1799 && year < 1900) {
//         return (year - 1800).toString();
//     }
//     else return 0;
// }

// generates random values
function generateRandomSex() {
    let sex = Math.floor(Math.random() * 2) + 1;

    if(sex == 1) {
        return "M";
    }
    else return "F";
}
function generateRandomInputs(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}
// generates random values

//returns data object or -1 if input is invalid
function checkCNP(user_input) {

    let sex = parseInt(user_input.slice(0, 1));
    let year = parseInt(user_input.slice(1, 3));
    let month = parseInt(user_input.slice(3, 5));
    let day = parseInt(user_input.slice(5, 7));
    let user_county = user_input.slice(7, 9);
    let constant = parseInt(user_input.slice(12, 13));

    let collectedData = {
        sex: "",
        year: "",
        month: "",
        day: "",
        county: "",
    };

    if( validateForLetters(user_input) != -1 && validateSex(sex) != -1 && 
    validateYearMonth(computeYearValidate(sex, year), month) != -1 && 
    validateCounty(user_county) != -1 && validateDay(day, monthDays[month-1]) != -1 && 
    checkLast(user_input, cValidate) == constant) {
        collectedData.sex = checkSex(sex);
        collectedData.year = computeYearValidate(sex, year);
        collectedData.month = month;
        collectedData.day = day;
        collectedData.county = county[user_county-1];
        return collectedData;
    }
    else return -1;
};



/////////////////////////////////////////////////////////////////////
// CNP validation
document.getElementById("validateCNP").onclick = function() {

    let codnumeric = document.getElementById("inputCNP").value;
    let confirmedCNP = checkCNP(codnumeric);
    
    if(confirmedCNP != -1){
        document.getElementById("result").innerHTML = JSON.stringify(confirmedCNP);
    }
    else document.getElementById("result").innerHTML = JSON.stringify("CNP-ul nu este valid!");
        
};
// Clear Button
document.getElementById("clear").onclick = function() {
    document.getElementById("result").innerHTML = "";
    document.getElementById("inputCNP").value = "";
};
//
////////////////////////////////////////////////////////////////////


    

function addCNP(CNP) {
    if (checkCNP(CNP) != -1) {
        let CNParray = JSON.parse(localStorage.getItem("CNP-uri"));
        let dataObj = checkCNP(CNP);
        let CNPobj = {
            sex: dataObj.sex,
            year: dataObj.year,
            month: dataObj.month,
            day: dataObj.day,
            county: dataObj.county,
            cnp: CNP
        }
        CNParray.push(CNPobj);
        
        localStorage.setItem("CNP-uri", JSON.stringify(CNParray));
        
    }
}

document.getElementById("generateCNP").onclick = function() {
        
    let sex = document.getElementById("gen").value;
    let year = document.getElementById("anulN").value;
    let month = document.getElementById("luna").value;
    let day = document.getElementById("ziua").value;
    let user_county = document.getElementById("judet").value;

    
    if(sex == "") {
        sex += generateRandomSex();
    }
    if(year ==  "") {
        year = generateRandomInputs(1900, 2022).toString();
    }

    if(month == "") {
        month += generateRandomInputs(1, 12);
    }
    if(day == "") {
        day += generateRandomInputs(1, monthDays[month - 1]);
    }
    if(user_county == "") {
        let countyIndex = generateRandomInputs(1,47);
        user_county += county[countyIndex];
    }
    if (county.indexOf(user_county) != -1){
        user_county = county.indexOf(user_county) + 1;
    }
    else return alert("Judet invalid!");
    
    sex = convertAndCheckSex(sex, year).toString();
    year = computeYearGenerate(sex, year).toString();

    if(year < 10) {
        
        year = "0" + String(year);
    };
     
    if(month < 10) {
        
        month = "0" + String(month);
    };
    
    if( day < 10 ) {
        
        day = "0" + String(day);
    }
    
    if( user_county < 10 ) {
        user_county = "0" + user_county.toString();
    }
    
    

    let newCNP = sex + year + month + day + user_county + String(generateRandomInputs(500, 999));
   
    let lastDig = checkLast(newCNP, cValidate).toString();
    
    newCNP = newCNP + lastDig;
    
    console.log(newCNP);

    addCNP(newCNP);
  
    

}


function displayData() {
    let allData = JSON.parse(localStorage.getItem("CNP-uri"));
    JSON.stringify(allData);
    console.log(allData);
    document.getElementById("storedCNP").innerHTML = allData;
    
    

}


document.getElementById("showCNP").onclick = function() {
    displayData();
}

    
       
    
    