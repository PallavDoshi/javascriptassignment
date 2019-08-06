function profile()
{
    var email = sessionStorage.getItem('email');
    var ivalue = sessionStorage.getItem('ivalue');

    if(email==null)
        location.assign('login.html');

    else if((JSON.parse(localStorage.getItem('users')))[ivalue].email===email)
    {
        (document.getElementById('email')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].email;
        (document.getElementById('fname')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].fname;
        (document.getElementById('sname')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].sname;
        (document.getElementById('address')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].address;
        (document.getElementById('password')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].password;
        let image = document.getElementById("dispimage").src = (JSON.parse(localStorage.getItem('users')))[ivalue].image;

        if(image==null)
            document.getElementById("dispimage").src = '../images/dp.jpg';
        
        if((JSON.parse(localStorage.getItem('users')))[ivalue].gender=='male')
            (document.getElementById('male')).checked = true;

        else if((JSON.parse(localStorage.getItem('users')))[ivalue].gender=='female')
            (document.getElementById('female')).checked = true;
    }
}

function edit()
{
    document.getElementById('fname').disabled = false;
    document.getElementById('sname').disabled = false;
    document.getElementById('male').disabled = false;
    document.getElementById('female').disabled = false;
    document.getElementById('address').disabled = false;
    document.getElementById('password').disabled = false;
    document.getElementById('image').disabled = false;
    document.getElementById('profilepic').style.display = 'inline-block';
    document.getElementById('image').style.display = 'inline-block';

    document.getElementById('save').style.display='inline';
}

function out()
{

    location.assign('login.html');
    sessionStorage.clear();
}