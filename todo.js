var email = sessionStorage.getItem('email');
var codeArray = JSON.parse(localStorage.getItem('todo'));
var updateivalue;

function todosave()
{
    var flag = 0;

    let title = document.getElementById('title').value; 
    let description = document.getElementById('description').value;
    let startdate = document.getElementById('startdate').value;
    let enddate = document.getElementById('enddate').value;
    let reminderdate = document.getElementById('reminderdate').value;
    let category = (document.getElementById('category')).value;

    if(flag==0)
        flag=isnull(title,description,startdate,enddate,reminderdate,category,flag);

    if(flag==0)
        flag=datevalidate(startdate,enddate,reminderdate,flag);

    if(flag==0)
        store(email,title,description,startdate,enddate,reminderdate,category);
}

function isnull(title,description,startdate,enddate,reminderdate,category,flag)
{
    if(title==='')
    {
        alert('title cannot be blank');
        flag++;
    }

    if(description==='')
    {
        alert('description cannot be blank');
        flag++;
    }
    
    if(startdate==='')
    {
        alert('startdate cannot be blank');
        flag++;
    }

    if(enddate==='')
    {
        alert('enddate cannot be blank');
        flag++;
    }
    
    if(reminderdate==='')
    {
        alert('reminderdate cannot be blank');
        flag++;
    }
    
    if(category==null)
    {
        alert('Please select a category');
        flag++;
    }
    
    return flag;
}

function datevalidate(startdate,enddate,reminderdate,flag)
{
    var today = new Date().toJSON().slice(0,10).replace(/-/g,'-');

    if(startdate<today)
    {
        alert('Date dekh na aaj ki pehle');
        flag++;
    }
    
    if(enddate<startdate)
    {
        alert('Are you a time traveler?');
        flag++;
    }

    if(reminderdate<startdate || reminderdate>enddate)
    {
        alert('You sure that\'s the reminder you want? Because I\'m not');
        flag++;
    }

    return flag;
}

function datevalidateupdate(startdate,enddate,reminderdate,flag)
{
    var today = new Date().toJSON().slice(0,10).replace(/-/g,'-');

    if(startdate<today)
    {
        if(startdate<codeArray[updateivalue].startdate)
        {
            alert('That start date ain\'t possible');
            flag++;
        }
    }
    
    if(enddate<startdate)
    {
        alert('Are you a time traveler?');
        flag++;
    }

    if(reminderdate<startdate || reminderdate>enddate)
    {
        alert('You sure that\'s the reminder you want? Because I\'m not');
        flag++;
    }

    return flag;
}

function store(email,title,description,startdate,enddate,reminderdate,category)
{
    let status = 'pending';

    let codeObject =
    {   
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
    localStorage.setItem('todo',JSON.stringify(codeArray));

    location.assign('todo.html');
}

function fetchemail()
{
    if(email==null)
        location.assign('login.html');
        
    else
    {
        for(i=0;i<codeArray.length;i++)
        {
            if(email===codeArray[i].email)
            {
                /* var ivalue = i; */
                display(codeArray,i);
            }
        }    
    } 
}

function display(codeArray,ivalue)
{
    let disptitle = document.createElement("input");
    document.body.appendChild(disptitle);
    disptitle.value=codeArray[ivalue].title;
    disptitle.id = 'disptitleid'+ivalue;
    document.getElementById('disptitleid'+ivalue).disabled = true;
    
    let dispdescription = document.createElement("input");
    document.body.appendChild(dispdescription);
    dispdescription.value=codeArray[ivalue].description;
    dispdescription.id = 'dispdescriptionid'+ivalue;
    document.getElementById('dispdescriptionid'+ivalue).disabled = true;

    let dispstartdate = document.createElement("input");
    dispstartdate.setAttribute("type", "date");
    document.body.appendChild(dispstartdate);
    dispstartdate.value=codeArray[ivalue].startdate;
    dispstartdate.id = 'dispstartdateid'+ivalue;
    document.getElementById('dispstartdateid'+ivalue).disabled = true;

    let dispenddate = document.createElement("input");
    dispenddate.setAttribute("type", "date");
    document.body.appendChild(dispenddate);
    dispenddate.value=codeArray[ivalue].enddate;
    dispenddate.id = 'dispenddateid'+ivalue;
    document.getElementById('dispenddateid'+ivalue).disabled = true;

    let dispreminderdate = document.createElement("input");
    dispreminderdate.setAttribute("type", "date");
    document.body.appendChild(dispreminderdate);
    dispreminderdate.value=codeArray[ivalue].reminderdate;
    dispreminderdate.id = 'dispreminderdateid'+ivalue;
    document.getElementById('dispreminderdateid'+ivalue).disabled = true;

    let dispcategory = document.createElement("select");
    var abcd = "<select><option value='work'>Work</option><option value='home'>Home</option><option value='personal'>Personal</option></select>";
    dispcategory.innerHTML=abcd;
    document.body.appendChild(dispcategory);
    dispcategory.value=codeArray[ivalue].category;
    dispcategory.id='dispcategoryid'+ivalue;
    document.getElementById('dispcategoryid'+ivalue).disabled = true;

    let dispstatus = document.createElement("input");
    document.body.appendChild(dispstatus);
    dispstatus.value=codeArray[ivalue].status;
    dispstatus.id = 'dispstatusid'+ivalue;
    document.getElementById('dispstatusid'+ivalue).disabled = true;

    let checked = document.createElement("input");
    checked.setAttribute("type", "checkbox");
    document.body.appendChild(checked);
    checked.value = codeArray[ivalue].id;
    checked.id = 'checkedid'+ivalue;

    let p = document.createElement("p");
    document.body.appendChild(p);
}

function edit()
{
    let flag = 0;

    for(i=0;i<codeArray.length;i++)
    {
        if((document.getElementById('checkedid'+i)).checked==true)
        {
            updateivalue=ivalue=i;
            flag++;
        }
    }

    if(flag==0)
    {
        alert('Select something first');
    }

    if(flag>1)
    {
        alert('Try editing one item at a time');
    }

    if(flag==1)
    {
        document.getElementById('disptitleid'+ivalue).disabled = false;
        document.getElementById('dispdescriptionid'+ivalue).disabled = false;
        document.getElementById('dispstartdateid'+ivalue).disabled = false;
        document.getElementById('dispenddateid'+ivalue).disabled = false;
        document.getElementById('dispreminderdateid'+ivalue).disabled = false;
        document.getElementById('dispcategoryid'+ivalue).disabled = false;

        document.getElementById('save').style.display='inline';
    }

}

function update()
{
    var flag = 0;
    
    let title = document.getElementById('disptitleid'+updateivalue).value;
    let description = document.getElementById('dispdescriptionid'+updateivalue).value;
    let startdate = document.getElementById('dispstartdateid'+updateivalue).value;
    let enddate = document.getElementById('dispenddateid'+updateivalue).value;
    let reminderdate = document.getElementById('dispreminderdateid'+updateivalue).value;
    let category = document.getElementById('dispcategoryid'+updateivalue).value;

    if(flag==0)
        flag=isnull(title,description,startdate,enddate,reminderdate,category,flag);

    if(flag==0)
        flag=datevalidateupdate(startdate,enddate,reminderdate,flag);

    if(flag==0)
    {
        let codeObject =
        {   
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
        
        codeArray[updateivalue]=codeObject;
        localStorage.setItem('todo',JSON.stringify(codeArray));

        document.getElementById('disptitleid'+ivalue).disabled = true;
        document.getElementById('dispdescriptionid'+ivalue).disabled = true;
        document.getElementById('dispstartdateid'+ivalue).disabled = true;
        document.getElementById('dispenddateid'+ivalue).disabled = true;
        document.getElementById('dispreminderdateid'+ivalue).disabled = true;
        document.getElementById('dispcategoryid'+ivalue).disabled = true;

        document.getElementById('save').style.display='none';
        (document.getElementById('checkedid'+updateivalue)).checked=false;
    }
}

function done()
{
    let flag = 0;

    for(i=0;i<codeArray.length;i++)
    {
        if((document.getElementById('checkedid'+i)).checked==true)
        {
            codeArray[i].status='done';
            localStorage.setItem('todo',JSON.stringify(codeArray));
            flag++;
            location.assign('todo.html');
        }
    }

    if(flag==0)
    {
        alert('Select something first');
    }
}

function deletetodo()
{
    let flag = 0;

    for(i=0;i<codeArray.length;i++)
    {
        if((document.getElementById('checkedid'+i)).checked==true)
        {
            codeArray.splice(i,1);
            localStorage.setItem('todo',JSON.stringify(codeArray));
            flag++;
            location.assign('todo.html');
        }
    }

    if(flag==0)
    {
        alert('Select something first');
    }
}

function filter()
{
    let filter = document.getElementById('filter').value;
    
    if(filter=='done')
    {
        /* for(i=0;i<codeArray.length;i++)
        {
            if(email===codeArray[i].email)
            {
                if(codeArray[i].status=='done')
                    display(codeArray,i);
            }
        } */        
        var a=document.getElementById("bodyid");
	    var deleteChild=a.lastElementChild;
    
            
            while(deleteChild)
            {
                a.removeChild(deleteChild);
                deleteChild=a.lastElementChild;
            }  
    }

}