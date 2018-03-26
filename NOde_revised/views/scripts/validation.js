// console.log('called');
// document.getElementById('demo').innerHTML = "working";

function validateForm(event){
    event.preventDefault();
    if(email_validation()){
        // console.log('called..');
        return true;
    }
    else{
        return false;
    }
}

function email_validation(){
    var x = document.getElementById("user_email");
    var temp =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(x.value.match(temp))
    {
        document.getElementById("email_label").innerHTML = "valid email";
        return true;
    }
    else{
        document.getElementById("email_label").innerHTML = "Invalid username";
        return false;
    }
   
}