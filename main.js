$( function() {
    $( "#taskDueDate" ).datepicker();
  } );

function addTaskFromForm(){
    var data = $("#addTask").serializeArray();
    var task = {}; 
    task.text = data[0].value;
    task.priority = data[1].value; 
    task.duedate = data[2].value;
    task.tag = data[3].value;  
    theTaskList.addTask(task);
};

$("#addTaskButton").click(function(){
    addTaskFromForm(); 
    $(".dropClickContent").removeClass("show");
});

$("#theTasks").on('click', '.markDone', function(evt){
    var id = $(evt.target).closest(".task").one().attr("data-taskId");
    var idNum = parseInt(id);
    console.log("the id of the task whose done was clicked is " + id ); 
    var taskDone = theTaskList.findTask(idNum);
    taskDone.toggleDone();
});
$("#theTasks").on('click', '.delete', function(evt){
    var id = $(evt.target).closest(".task").one().attr("data-taskId");
    console.log("the id of the task whose delete was clicked is " + id ); 
    var idNum = parseInt(id);
    var deletedTask = theTaskList.deleteTask(idNum);
    if (deletedTask !== -1){
        deletedTask.delete();
    }
});

//adding click event hadler for the save button that saves the current tasks in the local storage 
$("#saveButton").click(function(){
    theTaskList.save();
});

//adding click event hadler for the load button that displays the tasks stored in the local storage 
$("#loadButton").click(function(){
    theTaskList.load();
});

//adding click event handlers to the sort buttons 
$("#sortIdButton").click(function(){
    theTaskList.sortById();
});
$("#sortTagButton").click(function(){
    theTaskList.sortByTag();
});
$("#sortDueDateButton").click(function(){
    theTaskList.sortByDueDate();
});
$("#sortPriorityButton").click(function(){
    theTaskList.sortByPriority();
});

// adding click Event handler for the tags' delete buttons 
$("#currentTags").on("click", ".delete",function(evt){
    var tagName = $(evt.target).next().text();
    delete tagColors[tagName];
    updateTags();
    localStorage.setItem("SOUMAYA_TAGS", JSON.stringify(tagColors));
});