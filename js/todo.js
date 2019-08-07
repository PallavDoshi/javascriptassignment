var email = sessionStorage.getItem('email');

(function() {
    if (email == null)
        location.assign('login.html');
})();

var codeArray = JSON.parse(localStorage.getItem('todo')) || [];
var updateivalue;

function todosave() {
    var flag = 0;

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let startdate = document.getElementById('startdate').value;
    let enddate = document.getElementById('enddate').value;
    let reminderdate = document.getElementById('reminderdate').value;
    let category = (document.getElementById('category')).value;

    if (flag == 0)
        flag = isnull(title, description, startdate, enddate, reminderdate, category, flag);

    if (flag == 0)
        flag = datevalidate(startdate, enddate, reminderdate, flag);

    if (flag == 0)
        store(email, title, description, startdate, enddate, reminderdate, category);
}

function isnull(title, description, startdate, enddate, reminderdate, category, flag) {
    if (title === '') {
        alert('Please enter a Title!');
        flag++;
    }

    if (description === '') {
        alert('Please enter a Description!');
        flag++;
    }

    if (startdate === '') {
        alert('Please select a Start Date!');
        flag++;
    }

    if (enddate === '') {
        alert('Please select a Due Date!');
        flag++;
    }

    if (reminderdate === '') {
        alert('Please select a reminder date!');
        flag++;
    }

    if (category == null) {
        alert('Please select a Category!');
        flag++;
    }

    return flag;
}

function datevalidate(startdate, enddate, reminderdate, flag) {
    var today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

    if (startdate < today) {
        alert('The start date cannot be before today! Select a different date!');
        flag++;
    }

    if (enddate < startdate) {
        alert('Are you a time traveler? The due date cannot be before the start date...');
        flag++;
    }

    if (reminderdate < startdate || reminderdate > enddate) {
        alert('You sure that\'s the reminder you want? Because I\'m not! Select a reminder date between the start and due date!');
        flag++;
    }

    return flag;
}

function datevalidateupdate(startdate, enddate, reminderdate, flag) {
    var today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

    if (startdate < today) {
        if (startdate < codeArray[updateivalue].startdate) {
            alert('That start date ain\'t possible');
            flag++;
        }
    }

    if (enddate < startdate) {
        alert('Are you a time traveler?');
        flag++;
    }

    if (reminderdate < startdate || reminderdate > enddate) {
        alert('You sure that\'s the reminder you want? Because I\'m not');
        flag++;
    }

    return flag;
}

function store(email, title, description, startdate, enddate, reminderdate, category) {
    let status = 'Pending';

    let codeObject = {
        id: new Date().getTime(),
        email,
        title,
        description,
        startdate,
        enddate,
        reminderdate,
        category,
        status
    }

    let codeArray = JSON.parse(localStorage.getItem('todo')) || [];
    codeArray.push(codeObject);
    localStorage.setItem('todo', JSON.stringify(codeArray));

    location.assign('todo.html');
}

function fetchUserEmail() {
    for (i = 0; i < codeArray.length; i++) {
        if (email === codeArray[i].email) {
            display(codeArray, i);
        }
    }

}

function display(codeArray, ivalue) {
    let disptitle = document.createElement("input");
    (document.getElementById('divid')).appendChild(disptitle);
    disptitle.value = codeArray[ivalue].title;
    disptitle.id = 'disptitleid' + ivalue;
    document.getElementById('disptitleid' + ivalue).disabled = true;
    disptitle.style.height = '40px';
    disptitle.style.borderRadius = '4px';

    let dispdescription = document.createElement("input");
    (document.getElementById('divid')).appendChild(dispdescription);
    dispdescription.value = codeArray[ivalue].description;
    dispdescription.id = 'dispdescriptionid' + ivalue;
    document.getElementById('dispdescriptionid' + ivalue).disabled = true;
    dispdescription.style.height = '40px';
    dispdescription.style.borderRadius = '4px';
    dispdescription.style.marginLeft = '1px';

    let dispstartdate = document.createElement("input");
    dispstartdate.setAttribute("type", "date");
    (document.getElementById('divid')).appendChild(dispstartdate);
    dispstartdate.value = codeArray[ivalue].startdate;
    dispstartdate.id = 'dispstartdateid' + ivalue;
    document.getElementById('dispstartdateid' + ivalue).disabled = true;
    dispstartdate.style.height = '40px';
    dispstartdate.style.borderRadius = '4px';
    dispstartdate.style.marginLeft = '1px';

    let dispenddate = document.createElement("input");
    dispenddate.setAttribute("type", "date");
    (document.getElementById('divid')).appendChild(dispenddate);
    dispenddate.value = codeArray[ivalue].enddate;
    dispenddate.id = 'dispenddateid' + ivalue;
    document.getElementById('dispenddateid' + ivalue).disabled = true;
    dispenddate.style.height = '40px';
    dispenddate.style.borderRadius = '4px';
    dispenddate.style.marginLeft = '1px';

    let dispreminderdate = document.createElement("input");
    dispreminderdate.setAttribute("type", "date");
    (document.getElementById('divid')).appendChild(dispreminderdate);
    dispreminderdate.value = codeArray[ivalue].reminderdate;
    dispreminderdate.id = 'dispreminderdateid' + ivalue;
    document.getElementById('dispreminderdateid' + ivalue).disabled = true;
    dispreminderdate.style.height = '40px';
    dispreminderdate.style.borderRadius = '4px';
    dispreminderdate.style.marginLeft = '1px';

    let dispstatus = document.createElement("input");
    (document.getElementById('divid')).appendChild(dispstatus);
    dispstatus.value = codeArray[ivalue].status;
    dispstatus.id = 'dispstatusid' + ivalue;
    document.getElementById('dispstatusid' + ivalue).disabled = true;
    dispstatus.style.height = '40px';
    dispstatus.style.width = '120px';
    dispstatus.style.borderRadius = '4px';
    dispstatus.style.marginLeft = '1px';

    let dispcategory = document.createElement("select");
    var abcd = "<select><option value='work'>Work</option><option value='home'>Home</option><option value='personal'>Personal</option></select>";
    dispcategory.innerHTML = abcd;
    (document.getElementById('divid')).appendChild(dispcategory);
    dispcategory.value = codeArray[ivalue].category;
    dispcategory.id = 'dispcategoryid' + ivalue;
    document.getElementById('dispcategoryid' + ivalue).disabled = true;
    dispcategory.style.height = '37px';
    dispcategory.style.borderRadius = '4px';
    dispcategory.style.marginLeft = '1px';

    let checked = document.createElement("input");
    checked.setAttribute("type", "checkbox");
    (document.getElementById('divid')).appendChild(checked);
    checked.value = codeArray[ivalue].id;
    checked.id = 'checkedid' + ivalue;
    checked.style.marginLeft = '10px';
    checked.style.marginRight = '10px';

    let p = document.createElement("p");
    (document.getElementById('divid')).appendChild(p);
}

function editUserData() {
    let flag = 0;

    for (i = 0; i < codeArray.length; i++) {
        if ((document.getElementById('checkedid' + i)).checked == true) {
            updateivalue = ivalue = i;
            flag++;
        }
    }

    if (flag == 0) {
        alert('Select something to edit!');
    }

    if (flag > 1) {
        alert('Try editing one item at a time!');
    }

    if (flag == 1) {
        document.getElementById('disptitleid' + ivalue).disabled = false;
        document.getElementById('dispdescriptionid' + ivalue).disabled = false;
        document.getElementById('dispstartdateid' + ivalue).disabled = false;
        document.getElementById('dispenddateid' + ivalue).disabled = false;
        document.getElementById('dispreminderdateid' + ivalue).disabled = false;
        document.getElementById('dispcategoryid' + ivalue).disabled = false;

        document.getElementById('save').style.display = 'inline';
    }

}

function update() {
    var flag = 0;

    let title = document.getElementById('disptitleid' + updateivalue).value;
    let description = document.getElementById('dispdescriptionid' + updateivalue).value;
    let startdate = document.getElementById('dispstartdateid' + updateivalue).value;
    let enddate = document.getElementById('dispenddateid' + updateivalue).value;
    let reminderdate = document.getElementById('dispreminderdateid' + updateivalue).value;
    let category = document.getElementById('dispcategoryid' + updateivalue).value;

    if (flag == 0)
        flag = isnull(title, description, startdate, enddate, reminderdate, category, flag);

    if (flag == 0)
        flag = datevalidateupdate(startdate, enddate, reminderdate, flag);

    if (flag == 0) {
        let codeObject = {
            id: codeArray[updateivalue].id,
            email: codeArray[updateivalue].email,
            title,
            description,
            startdate,
            enddate,
            reminderdate,
            category,
            status: codeArray[updateivalue].status
        }

        codeArray[updateivalue] = codeObject;
        localStorage.setItem('todo', JSON.stringify(codeArray));

        document.getElementById('disptitleid' + ivalue).disabled = true;
        document.getElementById('dispdescriptionid' + ivalue).disabled = true;
        document.getElementById('dispstartdateid' + ivalue).disabled = true;
        document.getElementById('dispenddateid' + ivalue).disabled = true;
        document.getElementById('dispreminderdateid' + ivalue).disabled = true;
        document.getElementById('dispcategoryid' + ivalue).disabled = true;

        document.getElementById('save').style.display = 'none';
        (document.getElementById('checkedid' + updateivalue)).checked = false;
    }
}

function markAsDone() {
    let flag = 0;

    for (i = 0; i < codeArray.length; i++) {
        if ((document.getElementById('checkedid' + i)).checked == true) {
            codeArray[i].status = 'Done';
            localStorage.setItem('todo', JSON.stringify(codeArray));
            flag++;
            location.assign('todo.html');
        }
    }

    if (flag == 0) {
        alert('Select something to mark as done!');
    }
}

function deleteToDo() {
    let flag = 0;

    for (i = 0; i < codeArray.length; i++) {
        if ((document.getElementById('checkedid' + i)).checked == true) {
            codeArray.splice(i, 1);
            localStorage.setItem('todo', JSON.stringify(codeArray));
            flag++;
            location.assign('todo.html');
        }
    }

    if (flag == 0) {
        alert('Select something to delete!');
    }
}

function applyFilter() {
    let filter = document.getElementById('filters').value;
    document.getElementById('edit').style.display = 'none';
    document.getElementById('done').style.display = 'none';
    document.getElementById('delete').style.display = 'none';

    if (filter == 'doneFilter') {
        document.getElementById('fromdate').style.display = 'none';
        document.getElementById('todate').style.display = 'none';
        document.getElementById('search').style.display = 'none';

        flag = 0;

        var a = document.getElementById("divid");
        var deleteChild = a.lastElementChild;

        while (deleteChild) {
            a.removeChild(deleteChild);
            deleteChild = a.lastElementChild;
        }

        for (i = 0; i < codeArray.length; i++) {
            if (email === codeArray[i].email) {
                if (codeArray[i].status == 'Done') {
                    display(codeArray, i);
                    flag++;
                }
            }
        }

        if (flag == 0) {
            var norecord = document.createElement("p");
            var value = document.createTextNode("No Record Found");
            norecord.appendChild(value);
            var disp = document.getElementById("divid");
            disp.appendChild(norecord);
            norecord.style.fontSize = '43px';
            norecord.style.fontWeight = '550';
            norecord.style.textAlign = 'center';
            norecord.style.marginTop = '10px';
        }
    }

    if (filter == 'pendingFilter') {
        document.getElementById('fromdate').style.display = 'none';
        document.getElementById('todate').style.display = 'none';
        document.getElementById('search').style.display = 'none';

        flag = 0;

        var a = document.getElementById("divid");
        var deleteChild = a.lastElementChild;

        while (deleteChild) {
            a.removeChild(deleteChild);
            deleteChild = a.lastElementChild;
        }

        for (i = 0; i < codeArray.length; i++) {
            if (email === codeArray[i].email) {
                if (codeArray[i].status == 'Pending') {
                    display(codeArray, i);
                    flag++;
                }
            }
        }

        if (flag == 0) {
            var norecord = document.createElement("p");
            var value = document.createTextNode("No Record Found");
            norecord.appendChild(value);
            var disp = document.getElementById("divid");
            disp.appendChild(norecord);
            norecord.style.fontSize = '43px';
            norecord.style.fontWeight = '550';
            norecord.style.textAlign = 'center';
            norecord.style.marginTop = '10px';
        }
    }

    if ((document.getElementById('filters')).value == 'dateRangeFilter') {
        document.getElementById('fromdate').style.display = 'inline';
        document.getElementById('todate').style.display = 'inline';
        document.getElementById('search').style.display = 'inline';
    }

    if (filter == 'removeFilter') {
        location.assign('todo.html');
    }

}

function datefilter() {
    let fromdate = document.getElementById('fromdate').value;
    let todate = document.getElementById('todate').value;

    if (fromdate == '' || todate == '') {
        alert('Select the dates please!');
    } else {
        flag = 0;

        var a = document.getElementById("divid");
        var deleteChild = a.lastElementChild;

        while (deleteChild) {
            a.removeChild(deleteChild);
            deleteChild = a.lastElementChild;
        }

        for (i = 0; i < codeArray.length; i++) {
            if (email === codeArray[i].email) {
                if ((fromdate < codeArray[i].startdate && codeArray[i].startdate < todate) || (fromdate < codeArray[i].enddate && codeArray[i].enddate < todate)) {
                    display(codeArray, i);
                    flag++
                }
            }
        }

        if (flag == 0) {
            var norecord = document.createElement("p");
            var value = document.createTextNode("No Record Found");
            norecord.appendChild(value);
            var disp = document.getElementById("divid");
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