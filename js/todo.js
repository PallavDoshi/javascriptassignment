var email = sessionStorage.getItem('email');

(function() {
    if (email == null)
        location.assign('login.html');
})();

var userDataArray = JSON.parse(localStorage.getItem('todo')) || [];
var globalIValue;

function saveToDo() {
    var flag = 0;

    document.getElementById('displayErrorMessageText').innerHTML = '';

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    let reminderDate = document.getElementById('reminderDate').value;
    let toDoCategory = (document.getElementById('toDoCategory')).value;

    if (flag == 0)
        flag = isUnfilled(title, description, startDate, endDate, reminderDate, toDoCategory, flag);

    if (flag == 0)
        flag = dateValidation(startDate, endDate, reminderDate, flag);

    if (flag == 0)
        storeToDo(email, title, description, startDate, endDate, reminderDate, toDoCategory);
}

function isUnfilled(title, description, startDate, endDate, reminderDate, toDoCategory, flag) {
    if (title === '') {
        document.getElementById('displayErrorMessageText').innerHTML = 'Please enter a Title!';
        flag++;
    }

    if (description === '') {
        document.getElementById('displayErrorMessageText').innerHTML = 'Please enter a Description!';
        flag++;
    }

    if (startDate === '') {
        document.getElementById('displayErrorMessageText').innerHTML = 'Please select a Start Date!';
        flag++;
    }

    if (endDate === '') {
        document.getElementById('displayErrorMessageText').innerHTML = 'Please select a Due Date!';
        flag++;
    }

    if (reminderDate === '') {
        document.getElementById('displayErrorMessageText').innerHTML = 'Please select a reminder date!';
        flag++;
    }

    if (toDoCategory == null) {
        document.getElementById('displayErrorMessageText').innerHTML = 'Please select a Category!';
        flag++;
    }

    return flag;
}

function dateValidation(startDate, endDate, reminderDate, flag) {
    var today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

    if (startDate < today) {
        document.getElementById('displayErrorMessageText').innerHTML = 'The start date cannot be before today! Select a different date!';
        flag++;
    }

    if (endDate < startDate) {
        document.getElementById('displayErrorMessageText').innerHTML = 'Are you a time traveler? The due date cannot be before the start date...';
        flag++;
    }

    if (reminderDate < startDate || reminderDate > endDate) {
        document.getElementById('displayErrorMessageText').innerHTML = 'You sure that\'s the reminder you want? Because I\'m not! Select a reminder date between the start and due date!';
        flag++;
    }

    return flag;
}

function dateValidationForUpdatedToDo(startDate, endDate, reminderDate, flag) {
    var today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

    if (startDate < today) {
        if (startDate < userDataArray[globalIValue].startDate) {
            document.getElementById('displayErrorMessageText').innerHTML = 'That start date ain\'t possible';
            flag++;
        }
    }

    if (endDate < startDate) {
        document.getElementById('displayErrorMessageText').innerHTML = 'Are you a time traveler?';
        flag++;
    }

    if (reminderDate < startDate || reminderDate > endDate) {
        document.getElementById('displayErrorMessageText').innerHTML = 'You sure that\'s the reminder you want? Because I\'m not';
        flag++;
    }

    return flag;
}

function storeToDo(email, title, description, startDate, endDate, reminderDate, toDoCategory) {
    let status = 'Pending';

    let userDataObject = {
        id: new Date().getTime(),
        email,
        title,
        description,
        startDate,
        endDate,
        reminderDate,
        toDoCategory,
        status
    }

    let userDataArray = JSON.parse(localStorage.getItem('todo')) || [];
    userDataArray.push(userDataObject);
    localStorage.setItem('todo', JSON.stringify(userDataArray));

    location.assign('todo.html');
}

function fetchUserEmail() {
    for (i = 0; i < userDataArray.length; i++) {
        if (email === userDataArray[i].email) {
            displayToDo(userDataArray, i);
        }
    }

}

function displayToDo(userDataArray, ivalue) {
    let displayToDoTItle = document.createElement("input");
    (document.getElementById('displayToDoItems')).appendChild(displayToDoTItle);
    displayToDoTItle.value = userDataArray[ivalue].title;
    displayToDoTItle.id = 'displayToDoTItleid' + ivalue;
    document.getElementById('displayToDoTItleid' + ivalue).disabled = true;
    displayToDoTItle.style.height = '40px';
    displayToDoTItle.style.borderRadius = '4px';

    let displayToDoDescription = document.createElement("input");
    (document.getElementById('displayToDoItems')).appendChild(displayToDoDescription);
    displayToDoDescription.value = userDataArray[ivalue].description;
    displayToDoDescription.id = 'displayToDoDescriptionid' + ivalue;
    document.getElementById('displayToDoDescriptionid' + ivalue).disabled = true;
    displayToDoDescription.style.height = '40px';
    displayToDoDescription.style.borderRadius = '4px';
    displayToDoDescription.style.marginLeft = '1px';

    let displayToDoStartDate = document.createElement("input");
    displayToDoStartDate.setAttribute("type", "date");
    (document.getElementById('displayToDoItems')).appendChild(displayToDoStartDate);
    displayToDoStartDate.value = userDataArray[ivalue].startDate;
    displayToDoStartDate.id = 'displayToDoStartDateid' + ivalue;
    document.getElementById('displayToDoStartDateid' + ivalue).disabled = true;
    displayToDoStartDate.style.height = '40px';
    displayToDoStartDate.style.borderRadius = '4px';
    displayToDoStartDate.style.marginLeft = '1px';

    let displayToDoEndDate = document.createElement("input");
    displayToDoEndDate.setAttribute("type", "date");
    (document.getElementById('displayToDoItems')).appendChild(displayToDoEndDate);
    displayToDoEndDate.value = userDataArray[ivalue].endDate;
    displayToDoEndDate.id = 'displayToDoEndDateid' + ivalue;
    document.getElementById('displayToDoEndDateid' + ivalue).disabled = true;
    displayToDoEndDate.style.height = '40px';
    displayToDoEndDate.style.borderRadius = '4px';
    displayToDoEndDate.style.marginLeft = '1px';

    let displayToDoReminderDate = document.createElement("input");
    displayToDoReminderDate.setAttribute("type", "date");
    (document.getElementById('displayToDoItems')).appendChild(displayToDoReminderDate);
    displayToDoReminderDate.value = userDataArray[ivalue].reminderDate;
    displayToDoReminderDate.id = 'displayToDoReminderDateid' + ivalue;
    document.getElementById('displayToDoReminderDateid' + ivalue).disabled = true;
    displayToDoReminderDate.style.height = '40px';
    displayToDoReminderDate.style.borderRadius = '4px';
    displayToDoReminderDate.style.marginLeft = '1px';

    let displayToDoStatus = document.createElement("input");
    (document.getElementById('displayToDoItems')).appendChild(displayToDoStatus);
    displayToDoStatus.value = userDataArray[ivalue].status;
    displayToDoStatus.id = 'displayToDoStatusid' + ivalue;
    document.getElementById('displayToDoStatusid' + ivalue).disabled = true;
    displayToDoStatus.style.height = '40px';
    displayToDoStatus.style.width = '120px';
    displayToDoStatus.style.borderRadius = '4px';
    displayToDoStatus.style.marginLeft = '1px';

    let displayToDoCategory = document.createElement("select");
    var abcd = "<select><option value='work'>Work</option><option value='home'>Home</option><option value='personal'>Personal</option></select>";
    displayToDoCategory.innerHTML = abcd;
    (document.getElementById('displayToDoItems')).appendChild(displayToDoCategory);
    displayToDoCategory.value = userDataArray[ivalue].toDoCategory;
    displayToDoCategory.id = 'displayToDoCategoryid' + ivalue;
    document.getElementById('displayToDoCategoryid' + ivalue).disabled = true;
    displayToDoCategory.style.height = '37px';
    displayToDoCategory.style.borderRadius = '4px';
    displayToDoCategory.style.marginLeft = '1px';

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    (document.getElementById('displayToDoItems')).appendChild(checkBox);
    checkBox.value = userDataArray[ivalue].id;
    checkBox.id = 'checkBoxid' + ivalue;
    checkBox.style.marginLeft = '10px';
    checkBox.style.marginRight = '10px';

    let p = document.createElement("p");
    (document.getElementById('displayToDoItems')).appendChild(p);
}

function editToDo() {
    let flag = 0;

    for (i = 0; i < userDataArray.length; i++) {
        if ((document.getElementById('checkBoxid' + i)).checked == true) {
            globalIValue = ivalue = i;
            flag++;
            document.getElementById('displayErrorMessageText').innerHTML = '';
        }
    }

    if (flag == 0) {
        document.getElementById('displayErrorMessageText').innerHTML = 'Select something to edit!';
    }

    if (flag > 1) {
        document.getElementById('displayErrorMessageText').innerHTML = 'Try editing one item at a time!';
    }

    if (flag == 1) {
        enableToDoFields();

        document.getElementById('save').style.display = 'inline';
    }

}

function enableToDoFields() {
    document.getElementById('displayToDoTItleid' + ivalue).disabled = false;
    document.getElementById('displayToDoDescriptionid' + ivalue).disabled = false;
    document.getElementById('displayToDoStartDateid' + ivalue).disabled = false;
    document.getElementById('displayToDoEndDateid' + ivalue).disabled = false;
    document.getElementById('displayToDoReminderDateid' + ivalue).disabled = false;
    document.getElementById('displayToDoStatusid' + ivalue).disabled = false;
    document.getElementById('displayToDoCategoryid' + ivalue).disabled = false;
}

function updateToDo() {
    var flag = 0;

    let title = document.getElementById('displayToDoTItleid' + globalIValue).value;
    let description = document.getElementById('displayToDoDescriptionid' + globalIValue).value;
    let startDate = document.getElementById('displayToDoStartDateid' + globalIValue).value;
    let endDate = document.getElementById('displayToDoEndDateid' + globalIValue).value;
    let reminderDate = document.getElementById('displayToDoReminderDateid' + globalIValue).value;
    let toDoCategory = document.getElementById('displayToDoStatusid' + globalIValue).value;

    if (flag == 0)
        flag = isUnfilled(title, description, startDate, endDate, reminderDate, toDoCategory, flag);

    if (flag == 0)
        flag = dateValidationForUpdatedToDo(startDate, endDate, reminderDate, flag);

    if (flag == 0) {
        let userDataObject = {
            id: userDataArray[globalIValue].id,
            email: userDataArray[globalIValue].email,
            title,
            description,
            startDate,
            endDate,
            reminderDate,
            toDoCategory,
            status: userDataArray[globalIValue].status
        }

        userDataArray[globalIValue] = userDataObject;
        localStorage.setItem('todo', JSON.stringify(userDataArray));

        disableToDoFields();

        document.getElementById('save').style.display = 'none';
        (document.getElementById('checkBoxid' + globalIValue)).checkBox = false;
    }
}

function disableToDoFields() {
    document.getElementById('displayToDoTItleid' + ivalue).disabled = true;
    document.getElementById('displayToDoDescriptionid' + ivalue).disabled = true;
    document.getElementById('displayToDoStartDateid' + ivalue).disabled = true;
    document.getElementById('displayToDoEndDateid' + ivalue).disabled = true;
    document.getElementById('displayToDoReminderDateid' + ivalue).disabled = true;
    document.getElementById('displayToDoStatusid' + ivalue).disabled = true;
    document.getElementById('displayToDoCategoryid' + ivalue).disabled = true;
}

function markAsDone() {
    let flag = 0;

    for (i = 0; i < userDataArray.length; i++) {
        if ((document.getElementById('checkBoxid' + i)).checked == true) {
            document.getElementById('displayErrorMessageText').innerHTML = '';
            userDataArray[i].status = 'Done';
            localStorage.setItem('todo', JSON.stringify(userDataArray));
            flag++;
            location.assign('todo.html');
        }
    }

    if (flag == 0) {
        document.getElementById('displayErrorMessageText').innerHTML = 'Select something to mark as done!';
    }
}

function deleteToDo() {
    let flag = 0;

    for (i = 0; i < userDataArray.length; i++) {
        if ((document.getElementById('checkBoxid' + i)).checked == true) {
            userDataArray.splice(i, 1);
            localStorage.setItem('todo', JSON.stringify(userDataArray));
            flag++;
            document.getElementById('displayErrorMessageText').innerHTML = '';
            location.assign('todo.html');
        }
    }

    if (flag == 0) {
        document.getElementById('displayErrorMessageText').innerHTML = 'Select something to delete!';
    }
}

function hidingEditDoneDelete() {
    document.getElementById('edit').style.display = 'none';
    document.getElementById('done').style.display = 'none';
    document.getElementById('delete').style.display = 'none';
}

function hidingDateFilterButtons() {
    document.getElementById('startDateForFilter').style.display = 'none';
    document.getElementById('dueDateForFilter').style.display = 'none';
    document.getElementById('searchForDateFilter').style.display = 'none';
}

function showingDateFilterButtons() {
    document.getElementById('startDateForFilter').style.display = 'inline';
    document.getElementById('dueDateForFilter').style.display = 'inline';
    document.getElementById('searchForDateFilter').style.display = 'inline';
}

function applyFilter() {
    let filter = document.getElementById('filters').value;
    hidingEditDoneDelete();

    if (filter == 'doneFilter') {
        hidingDateFilterButtons();

        flag = 0;

        var a = document.getElementById("displayToDoItems");
        var deleteChild = a.lastElementChild;

        while (deleteChild) {
            a.removeChild(deleteChild);
            deleteChild = a.lastElementChild;
        }

        for (i = 0; i < userDataArray.length; i++) {
            if (email === userDataArray[i].email) {
                if (userDataArray[i].status == 'Done') {
                    displayToDo(userDataArray, i);
                    flag++;
                }
            }
        }

        if (flag == 0) {
            var norecord = document.createElement("p");
            var value = document.createTextNode("No Record Found");
            norecord.appendChild(value);
            var disp = document.getElementById("displayToDoItems");
            disp.appendChild(norecord);
            norecord.style.fontSize = '43px';
            norecord.style.fontWeight = '550';
            norecord.style.textAlign = 'center';
            norecord.style.marginTop = '10px';
        }
    }

    if (filter == 'pendingFilter') {
        hidingDateFilterButtons();

        flag = 0;

        var a = document.getElementById("displayToDoItems");
        var deleteChild = a.lastElementChild;

        while (deleteChild) {
            a.removeChild(deleteChild);
            deleteChild = a.lastElementChild;
        }

        for (i = 0; i < userDataArray.length; i++) {
            if (email === userDataArray[i].email) {
                if (userDataArray[i].status == 'Pending') {
                    displayToDo(userDataArray, i);
                    flag++;
                }
            }
        }

        if (flag == 0) {
            var norecord = document.createElement("p");
            var value = document.createTextNode("No Record Found");
            norecord.appendChild(value);
            var disp = document.getElementById("displayToDoItems");
            disp.appendChild(norecord);
            norecord.style.fontSize = '43px';
            norecord.style.fontWeight = '550';
            norecord.style.textAlign = 'center';
            norecord.style.marginTop = '10px';
        }
    }

    if ((document.getElementById('filters')).value == 'dateRangeFilter') {

        showingDateFilterButtons();
    }

    if (filter == 'removeFilter') {
        location.assign('todo.html');
    }

}

function dateFilter() {
    let startDateForFilter = document.getElementById('startDateForFilter').value;
    let dueDateForFilter = document.getElementById('dueDateForFilter').value;

    if (startDateForFilter == '' || dueDateForFilter == '') {
        document.getElementById('displayErrorMessageText').innerHTML = 'Select the dates please!';
    } else {
        flag = 0;

        var a = document.getElementById("displayToDoItems");
        var deleteChild = a.lastElementChild;

        while (deleteChild) {
            a.removeChild(deleteChild);
            deleteChild = a.lastElementChild;
        }

        for (i = 0; i < userDataArray.length; i++) {
            if (email === userDataArray[i].email) {
                if ((startDateForFilter < userDataArray[i].startDate && userDataArray[i].startDate < dueDateForFilter) || (startDateForFilter < userDataArray[i].endDate && userDataArray[i].endDate < dueDateForFilter)) {
                    displayToDo(userDataArray, i);
                    flag++
                }
            }
        }

        if (flag == 0) {
            var norecord = document.createElement("p");
            var value = document.createTextNode("No Record Found");
            norecord.appendChild(value);
            var disp = document.getElementById("displayToDoItems");
            disp.appendChild(norecord);
            norecord.style.fontSize = '43px';
            norecord.style.fontWeight = '550';
            norecord.style.textAlign = 'center';
            norecord.style.marginTop = '10px';
        }
    }
}

function logOut() {
    location.assign('login.html');
    sessionStorage.clear();
}