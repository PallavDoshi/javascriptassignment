function register(event)
{ 
    var flag = 0;
    let email = document.getElementById('email').value;
    let fname = document.getElementById('fname').value; 
    let sname = document.getElementById('sname').value;
    let address = document.getElementById('address').value;
    let password = document.getElementById('password').value;
    let image = document.getElementById('image');
    let gender = document.querySelector('input[name="gender"]:checked');
    if(gender!=null)
        gender=document.querySelector('input[name="gender"]:checked').value;


    if(flag==0)
        flag=exists(email,flag);  
        
    if(flag==0)
        flag=isnull(email,fname,sname,address,password,gender,flag);

    if(flag==0)
        flag=emailvalidation(email,flag);

    if(flag==0)
        flag=validation(fname,sname,password,flag);

    if(flag===0)
        store(email,fname,sname,address,password,gender);
}


function exists(email,flag)
{
    var codeArray = JSON.parse(localStorage.getItem('users'));

    for(i=0;i<codeArray.length;i++)
    {
        if(email===codeArray[i].email)
        {
            alert('The email already exists!');
            flag++;
            break;
        }
    }

    return flag;
}


function isnull(email,fname,sname,address,password,gender,flag)
{
    //flag = 0;

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
    
    if(gender==null)
    {
        alert('Please select a gender');
        flag++;
    }
    
    return flag;
}

function emailvalidation(email,flag)
{
    let emailre = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(emailre.test(email)==false)
    {
        alert('Please enter a valid email');
        flag++;
    }

    return flag;
}

function validation(fname,sname,password,flag)
{
    let passwordre = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    let namere = /^[A-Za-z]+$/;

    if(passwordre.test(password)==false)
    {
        alert('Please enter a valid password');
        flag++;
    }

    if(namere.test(fname)===false)
    {
        alert('Please enter a valid first name');
        flag++;
    }

    if(namere.test(sname)==false)
    {
        alert('Please enter a valid last name');
        flag++;
    }

    return flag;
}


function store(email,fname,sname,address,password,gender)
{
    let codeObject =
    {   
        /* id: new Date().getTime(), */
        email,
        fname,
        sname,
        address,
        password,
        gender
    }

    let codeArray = JSON.parse(localStorage.getItem('users')) || [];
    codeArray.push(codeObject);
    localStorage.setItem('users',JSON.stringify(codeArray));

    location.assign('login.html');
}

function update()
{
    var ivalue = sessionStorage.getItem('ivalue');
    var flag = 0;
    
    let email = document.getElementById('email').value; 
    let fname = document.getElementById('fname').value; 
    let sname = document.getElementById('sname').value;
    let address = document.getElementById('address').value;
    let password = document.getElementById('password').value;
    let image = document.getElementById('image');
    let gender = document.querySelector('input[name="gender"]:checked');
    if(gender!=null)
        gender=document.querySelector('input[name="gender"]:checked').value;

    if(flag==0)
        flag=isnull(email,fname,sname,address,password,gender,flag);

    if(flag==0)
        flag=validation(fname,sname,password,flag);

    if(flag==0)
    {
        let codeObject =
        {   
            email,
            fname,
            sname,
            address,
            password,
            gender
        }
        let codeArray = JSON.parse(localStorage.getItem('users')) || [];
        codeArray[ivalue]=codeObject;
        localStorage.setItem('users',JSON.stringify(codeArray));

        document.getElementById('fname').disabled = true;
        document.getElementById('sname').disabled = true;
        document.getElementById('male').disabled = true;
        document.getElementById('female').disabled = true;
        document.getElementById('address').disabled = true;
        document.getElementById('password').disabled = true;

        document.getElementById('save').style.display='none';
    }
}