function profile()
{
    var email = sessionStorage.getItem('email');
    var ivalue = sessionStorage.getItem('ivalue');

    if((JSON.parse(localStorage.getItem('users')))[ivalue].email===email)
    {
        (document.getElementById('email')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].email;
        (document.getElementById('fname')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].fname;
        (document.getElementById('sname')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].sname;
        (document.getElementById('address')).value = (JSON.parse(localStorage.getItem('users')))[ivalue].address;
        
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

    document.getElementById('save').style.display='inline';
}