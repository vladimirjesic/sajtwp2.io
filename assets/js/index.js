//name check

var regExName=/^[A-Z][a-z]{2,10}$/;

var inputName=document.getElementById("fname");

function checkName(){

    if(!regExName.test(inputName.value))
    {
       document.getElementById("errorName").style.display="block";
       inputName.style.border="3px solid red";
    }
    else{
        document.getElementById("errorName").style.display="none";
       inputName.style.border="3px solid green";
    }
}

inputName.addEventListener("blur",checkName);



//last name check

var regExLName=/^[A-Z][a-z]{2,10}$/;

var inputLName=document.getElementById("lname");

function checkLName(){

    if(!regExLName.test(inputLName.value))
    {
       document.getElementById("errorLName").style.display="block";
       inputLName.style.border="3px solid red";
    }
    else{
        document.getElementById("errorLName").style.display="none";
       inputLName.style.border="3px solid green";
    }
}

inputLName.addEventListener("blur",checkLName);




//email check

var regExEmail=/^[a-z-\.]+@([a-z-]+\.)+[a-z-]{2,4}$/;

var inputEmail=document.getElementById("email");

function checkEmail(){

    if(!regExEmail.test(inputEmail.value))
    {
       document.getElementById("errorEmail").style.display="block";
       inputEmail.style.border="3px solid red";
    }
    else{
        document.getElementById("errorEmail").style.display="none";
       inputEmail.style.border="3px solid green";
    }
}

inputEmail.addEventListener("blur",checkEmail);




//question check

var regExQuestion=/^[A-Z][a-z]{3,}/;

var inputQuestion=document.getElementById("question");

function checkQuestion(){

    if(!regExQuestion.test(inputQuestion.value))
    {
       document.getElementById("errorQuestion").style.display="block";
       inputQuestion.style.border="3px solid red";
    }
    else{
        document.getElementById("errorQuestion").style.display="none";
       inputQuestion.style.border="3px solid green";
    }
}

inputQuestion.addEventListener("blur",checkQuestion);


