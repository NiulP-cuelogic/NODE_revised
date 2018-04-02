// console.log('called');
// document.getElementById('demo').innerHTML = "working";

function validateForm(event){
    event.preventDefault();
    if(email_validation() && firstname_validation() && lastname_validation() && password_validation()){
        // console.log('called..');
        // window.location = "show.ejs";
        // res.render('/user/show')
        return true;
    }
    else{
        document.getElementById("error_message_signup").innerHTML = "One or more fields is/are invalid or not filled out";
        return false;
    }
}

function email_validation(){
    var x = document.getElementById("user_email");
    var temp =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(x.value.match(temp))
    {
        // document.getElementById("email_label").innerHTML = "valid email";
        document.getElementById("user_email").style.border = "1px solid blue";
        document.getElementById("error_message_signup").innerHTML = "";
        return true;
    }
    else{
        document.getElementById('user_email').style.border = "1px solid red";
        document.getElementById("error_message_signup").innerHTML = "Invalid email";
        document.getElementById("error_message_signup").style.color = "#FF4136";
        return false;
    }
   
}

function firstname_validation(){
    var x = document.getElementById('user_firstname');
    var y = document.getElementById("user_lastname");
    var temp = /^[a-zA-Z]/;
    if(x.value.match(temp)){
        document.getElementById("user_firstname").style.border = "1px solid blue";
        // document.getElementById("user_lastname").style.border = "1px solid blue";
        document.getElementById("error_message_signup").innerHTML = "";
       return true;
    }
    else{
        document.getElementById('user_firstname').style.border = "1px solid red";
        document.getElementById("error_message_signup").innerHTML = "Enter a valid name";
        document.getElementById("error_message_signup").style.color = "#FF4136";
        return false;
    }
}

function lastname_validation(){
    
        // var x = document.getElementById('user_firstname');
        var x = document.getElementById("user_lastname");
        var temp = /^[a-zA-Z]/;
        if(x.value.match(temp)){
            document.getElementById("user_lastname").style.border = "1px solid blue";   
            document.getElementById("error_message_signup").innerHTML = "";
           return true;
        }
        else{
            document.getElementById('user_lastname').style.border = "1px solid red";
            document.getElementById("error_message_signup").innerHTML = "Enter a valid name";
            document.getElementById("error_message_signup").style.color = "#FF4136";
            return false;
        }
    
}

    

function password_validation(){
    var x = document.getElementById("user_password");
    var temp = /^[a-zA-Z].{3,15}$/;
    if(x.value.match(temp)){
        document.getElementById('user_password').style.border = "1px solid blue";
        document.getElementById('error_message_signup').innerHTML = "";
        return true;
    }
    else{
        document.getElementById("user_password").style.border = "1px solid red";
        document.getElementById("error_message_signup").innerHTML = "Password should be between 4 to 16 characters";
        document.getElementById("error_message_signup").style.color = "#FF4136";
        return false;
    }
}
