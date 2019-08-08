function diplayingButtons (){
    let email = sessionStorage.getItem('email');
    
    if(email!=null)
    {
        document.getElementById('logIn').style.display = 'none';
        document.getElementById('registration').style.display = 'none';
        document.getElementById('toDo').style.display = 'inline-block';
        document.getElementById('myProfile').style.display = 'inline-block';
    }
}