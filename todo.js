var email = sessionStorage.getItem('email');

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
        var codeArray = JSON.parse(localStorage.getItem('todo'));

        for(i=0;i<codeArray.length;i++)
        {
            if(email===codeArray[i].email)
            {
                var ivalue = i;
                display(codeArray,ivalue);
            }
        }    
    } 

    
}

function display(codeArray,ivalue)
{
    let disptitle = document.createElement("input");
    document.body.appendChild(disptitle);
    disptitle.id = 'disptitleid';
    disptitleid.value=codeArray[ivalue].title;

    let dispdescription = document.createElement("input");
    document.body.appendChild(dispdescription);
    dispdescription.id = 'dispdescriptionid';
    dispdescriptionid.value=codeArray[ivalue].description;

    let dispstartdate = document.createElement("input");
    dispstartdate.setAttribute("type", "date");
    document.body.appendChild(dispstartdate);
    dispstartdate.id = 'dispstartdateid';
    dispstartdateid.value=codeArray[ivalue].startdate;

    let dispenddate = document.createElement("input");
    dispenddate.setAttribute("type", "date");
    document.body.appendChild(dispenddate);
    dispenddate.id = 'dispenddateid';
    dispenddateid.value=codeArray[ivalue].enddate;

    let dispcategory = document.createElement("select");
    var abcd = "<select><option value='work'>Work</option><option value='home'>Home</option><option value='personal'>Personal</option></select>";
    dispcategory.innerHTML=abcd;
    document.body.appendChild(dispcategory);
    dispcategory.id = 'dispcategoryid';
    dispcategoryid.value=codeArray[ivalue].category;

    let p = document.createElement("p");
    document.body.appendChild(p);
}