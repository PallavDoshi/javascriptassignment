function register(event) {
    document.getElementById('firstName').style.border = 'none';
    document.getElementById('lastName').style.border = 'none';
    document.getElementById('address').style.border = 'none';
    document.getElementById('password').style.border = 'none';
    document.getElementById('email').style.border = 'none';
    document.getElementById('genderNotSelected').style.display = 'none';

    var flag = 0;
    let email = document.getElementById('email').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let password = document.getElementById('password').value;
    let gender = document.querySelector('input[name="gender"]:checked');
    if (gender != null)
        gender = document.querySelector('input[name="gender"]:checked').value;


    let image = sessionStorage.getItem('tempImageData');



    if (flag == 0)
        flag = emailExists(email, flag);

    if (flag == 0)
        flag = isUnfilled(image, email, firstName, lastName, address, password, gender, flag);

    if (flag == 0)
        flag = userEmailValidation(email, flag);

    if (flag == 0)
        flag = userDataValidation(firstName, lastName, password, flag);

    if (flag === 0)
        storeUserData(image, email, firstName, lastName, address, password, gender);
}

function changeProfilePicture() {
    var Image = document.getElementById("image").files[0];

    var imageReader = new FileReader();
    imageReader.readAsDataURL(Image);

    imageReader.onload = function() {
        var imgdata = imageReader.result;
        sessionStorage.setItem("tempImageData", imgdata);
        document.getElementById("displayProfileImage").src = sessionStorage.tempImageData;
    };

    imageReader.onerror = function(error) {};

}


function emailExists(email, flag) {
    var userDataArray = JSON.parse(localStorage.getItem('users')) || [];

    for (i = 0; i < userDataArray.length; i++) {
        if (email === userDataArray[i].email) {
            alert('The email already exists!');
            flag++;
            break;
        }
    }

    return flag;
}


function isUnfilled(image, email, firstName, lastName, address, password, gender, flag) {
    //flag = 0;

    if (email === '') {
        document.getElementById('email').placeholder = 'Please enter an Email';
        document.getElementById('email').style.border = 'solid 2px rgba(244, 81, 30)';

        flag++;
    }

    if (firstName === '') {
        document.getElementById('firstName').placeholder = 'Please enter your first name';
        document.getElementById('firstName').style.border = 'solid 2px rgba(244, 81, 30)';

        flag++;
    }

    if (lastName === '') {
        document.getElementById('lastName').placeholder = 'Please enter your last name';
        document.getElementById('lastName').style.border = 'solid 2px rgba(244, 81, 30)';

        flag++;
    }

    if (address === '') {
        document.getElementById('address').placeholder = 'Please enter your address';
        document.getElementById('address').style.border = 'solid 2px rgba(244, 81, 30)';

        flag++;
    }

    if (password === '') {
        document.getElementById('password').placeholder = 'Please enter your password';
        document.getElementById('password').style.border = 'solid 2px rgba(244, 81, 30)';

        flag++;
    }

    if (gender == null) {
        document.getElementById('genderNotSelected').style.display = 'inline-block';
        flag++;
    }

    return flag;
}

function userEmailValidation(email, flag) {
    let emailRegularExpression = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (emailRegularExpression.test(email) == false) {
        alert('Please enter a valid email');
        flag++;
    }

    return flag;
}

function userDataValidation(firstName, lastName, password, flag) {
    let passwordRegularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    let nameRegularExpression = /^[A-Za-z]+$/;

    if (passwordRegularExpression.test(password) == false) {
        alert('Please enter a password of length between 8 and 15 characters with atleast one Uppercase, one Lowercase character, one Digit and atleast one special character!');
        flag++;
    }

    if (nameRegularExpression.test(firstName) === false) {
        alert('Please enter a valid first name');
        flag++;
    }

    if (nameRegularExpression.test(lastName) == false) {
        alert('Please enter a valid last name');
        flag++;
    }

    return flag;
}


function storeUserData(image, email, firstName, lastName, address, password, gender) {
    let userDataObject = {
        /* id: new Date().getTime(), */
        email,
        firstName,
        lastName,
        address,
        password,
        gender,
        image
    }

    let userDataArray = JSON.parse(localStorage.getItem('users')) || [];
    userDataArray.push(userDataObject);
    localStorage.setItem('users', JSON.stringify(userDataArray));

    sessionStorage.setItem('registered', 1);
    location.assign('login.html');
}

function updateUserData() {
    var ivalue = sessionStorage.getItem('ivalue');
    var flag = 0;

    let email = document.getElementById('email').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let password = document.getElementById('password').value;
    let image = sessionStorage.getItem('tempImageData');
    let gender = document.querySelector('input[name="gender"]:checked');
    if (gender != null)
        gender = document.querySelector('input[name="gender"]:checked').value;

    if (flag == 0)
        flag = isUnfilled(image, email, firstName, lastName, address, password, gender, flag);

    if (flag == 0)
        flag = userDataValidation(firstName, lastName, password, flag);

    if (flag == 0) {
        let userDataObject = {
            image,
            email,
            firstName,
            lastName,
            address,
            password,
            gender
        }
        let userDataArray = JSON.parse(localStorage.getItem('users')) || [];
        userDataArray[ivalue] = userDataObject;
        localStorage.setItem('users', JSON.stringify(userDataArray));

        document.getElementById('firstName').disabled = true;
        document.getElementById('lastName').disabled = true;
        document.getElementById('male').disabled = true;
        document.getElementById('female').disabled = true;
        document.getElementById('address').disabled = true;
        document.getElementById('password').disabled = true;
        document.getElementById('image').disabled = true;
        document.getElementById('profilePicture').style.display = 'none';
        document.getElementById('image').style.display = 'none';

        document.getElementById('save').style.display = 'none';
    }
}

function registeredSuccessfully() {
    if (sessionStorage.getItem('registered') == 1)
        document.getElementById('displayRegisteredSuccessfully').style.display = 'inline-block';

    setTimeout(() => {
        sessionStorage.setItem('registered', 0);
        document.getElementById('displayRegisteredSuccessfully').style.display = 'none';
    }, 2500);
}