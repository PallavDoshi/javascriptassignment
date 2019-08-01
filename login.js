var flag = 0;

function login(event)
{
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    isnull(email,password);
}

function isnull(email,password)
{
    if(email==='')
    {
        alert('email id cannot be blank');
        flag++;
    }

    if(password==='')
    {
        alert('password cannot be blank');
        flag++;
    }

    if(flag==0)
        emailvalidation(email,password)
}

function emailvalidation(email,password)
{
    var codeArray = JSON.parse(localStorage.getItem('users'));
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