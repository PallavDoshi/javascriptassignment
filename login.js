/* LOGIN PAGE */

function validation()
{
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var emailre = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var passwordre = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if(email==='')
    {
        alert('email id cannot be blank');
    }

    else if(emailre.test(email)==false)
    {
        alert(email);
    }

    if(password==='')
    {
        alert('password cannot be blank');
    }

    else if(passwordre.test(password)==false)
    {
        alert('Please enter a valid password');
    }
}