var flag = 0;

function login(event)
{
    flag = 0;

    document.getElementById('email').style.border = 'none';
    document.getElementById('password').style.border = 'none';

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    flag=isempty(email,password);

    if(flag==0)
        emailvalidation(email,password)
}

function isempty(email,password)
{
    if(email==='')
    {
        document.getElementById('email').placeholder = 'Please enter an Email';
        document.getElementById('email').style.border = 'solid 2px rgba(244, 81, 30)';

        flag++;
    }

    if(password==='')
    {
        document.getElementById('password').placeholder = 'Please enter the password';
        document.getElementById('password').style.border = 'solid 2px rgba(244, 81, 30)';

        flag++;
    }

    return flag;   
}

function emailvalidation(email,password)
{
    var codeArray = JSON.parse(localStorage.getItem('users')) || [];
    var ivalue = -1;

    for(i=0;i<codeArray.length;i++)
    {
        if(email===codeArray[i].email)
        {
            ivalue = i;
            break;
        }
    }

    if(ivalue==-1)
    {
        alert('The email does not exist');
        
    }

    else if(password===codeArray[ivalue].password)
    {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('ivalue', i);
        location.assign('todo.html');
    }

    else
    {
        alert('Wrong password! Try again');
    }
}