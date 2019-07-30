var flag = 0;

function register()
{ 
    let email = document.getElementById('email').value;
    let fname = document.getElementById('fname').value; 
    let sname = document.getElementById('sname').value;
    let address = document.getElementById('address').value;
    let password = document.getElementById('password').value;

    if(document.getElementById('male').checked)
        var gender = 'male';

    else if(document.getElementById('female').checked)
        var gender = 'female';

    else
        var gender = '';


    isnull(email,fname,sname,address,password,gender);
}


function isnull(email,fname,sname,address,password,gender)
{
    flag = 0;

    if(email==='')
    {
        alert('email id cannot be blank');
        flag++;
    }

    if(fname==='')
    {
        alert('First Name cannot be blank');
        flag++;
    }
    
    if(sname==='')
    {
        alert('Last Name cannot be blank');
        flag++;
    }

    if(address==='')
    {
        alert('Address cannot be blank');
        flag++;
    }
    
    if(password==='')
    {
        alert('Password cannot be blank');
        flag++;
    }
    
    if(gender==='')
    {
        alert('Please select a gender');
        flag++;
    }
    
    if(flag===0)
        validation(email,fname,sname,address,password,gender);
}


function validation(email,fname,sname,address,password,gender)
{
    flag = 0;

    let emailre = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let passwordre = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    let namere = /^[A-Za-z]+$/;

    if(emailre.test(email)==false)
    {
        alert('Please enter a valid email');
        flag++;
    }

    if(passwordre.test(password)==false)
    {
        alert('Please enter a valid password');
        flag++;
    }

    if(namere.test(fname)==false)
    {
        alert('Please enter a valid first name');
        flag++;
    }

    if(namere.test(sname)==false)
    {
        alert('Please enter a valid last name');
        flag++;
    }

    if(flag===0)
        store(email,fname,sname,address,password,gender);
}


function store(email,fname,sname,address,password,gender)
{
    let codeObject =
    {   
        id: new Date().getTime(),
        email,
        fname,
        sname,
        address,
        password,
        gender,
    }

    let codeArray = JSON.parse(localStorage.getItem('users'));

    if(codeArray === null)
    {
        codeArray = [];

        codeArray.push(codeObject);
        localStorage.setItem('users',JSON.stringify(codeArray));
    }

    else
    {
        codeArray.push(codeObject);
        localStorage.setItem('users',JSON.stringify(codeArray));
    }

    window.location = "login.html";
}