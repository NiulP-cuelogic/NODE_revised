$(document).ready(function(){
    // event.preventDefault();
    $('#login_btn').on('click',function(event){
        event.preventDefault();
        console.log('called');
        // var user_email = $("#input_email").val();
        // var user_password = $("#input_password").val();
        var data = {};
        data.email = $("#input_email").val();
        data.password = $("#input_password").val();
        $.ajax({
            url:"http://localhost:4000/user/login",
            method:"POST",
            data:JSON.stringify(data),
            success:function(result){
                console.log(result);
                $('#login_email').text(result.message);
            }
        })
    })
})