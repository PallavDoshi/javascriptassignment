
var li = document.createElement("div111");
_var divtodo='<div class="tododisplayclass ' +classname+'" id=display-'+inputValue[count].todoID+'>
<input type=checkbox name="deletediv" id=checkbox-'+inputValue[count].todoID+'>
<h1>'+title+'</h1>
<h3>Category:'+categoryType+'</h3>
<h3>Start Date'+startdate+'</h3>
<h3>End Date'+endDate+'</h3>
<div class="isdonediv">
<h3>Is Done</h3>
<input type=checkbox name="isdone" id="isdone-'+count+'" onclick=todoFunctions.changeStatusOfTodo(this);>
</div>
<input type="button" name="viewfulltodo" value="View Full Todo"></div>';
li.innerHTML=divtodo;
document.getElementById("todocards").appendChild(li);