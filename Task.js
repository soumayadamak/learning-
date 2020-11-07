/* this class will create a task object and adds it to the DOM */ 
class Task{
    constructor(obj){
        this.id = null; 
        this.done = null; 
        this.text = obj.text; 
        this.priority = obj.priority;
        this.duedate = new Date(obj.duedate);
        this.tag = obj.tag; 
    }
    /* this method has no argument, its formats the due date to a more readable version*/ 
    getFormattedDueDate(){
        var days = ["Sun", "Mon", "Tue", "Wed","Thu", "Fri", "Sat"];
        var months = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var date = this.duedate; 
        var day = days[date.getDay()];
        var month = months[date.getMonth()];
        var dayNumber = date.getDate(); 
        var year = date.getFullYear();
        var fullDate = day + " " + month + " "+ dayNumber + " "+ year; 
        return fullDate;  
    }
    /* this method has no argument and adds the task object to the DOM*/ 
    addToDom(){
        var tag = this.tag; 
        var $li = $("<li></li>").addClass("task").css("background-color", tagColors[tag]).attr("data-taskId", this.id); 
        var dueDate = this.getFormattedDueDate();
        var $date = $("<span></span>").addClass("due").text(dueDate);
        var $priority = $("<span></span>").addClass("priority").text(" " + this.priority);
        var $tag = $("<span></span>").addClass("tag").text(" " + tag);
        var $text = $("<p></p>").addClass("text").text(this.text);
        var $doneButton = $("<button></button>").addClass("markDone").attr("type","button").html(" &#x2714;");
        var $deleteButton = $("<button></button>").addClass("delete").attr("type","button").html("&#x2716;");
        var $addButton = $("<button></button>").addClass("more").attr("type","button").html("&#x271A;");
        $li.append($date).append($priority).append($tag).append($text).append($doneButton).append($deleteButton).append($addButton);
        this.DOM = $li; 
        $("#theTasks").append($li); 
    }
    toggleDone(){
        if (this.done){
            this.done = false; 
            $(this.DOM).removeClass("done"); 
        }
        else{this.done = true; 
        $(this.DOM).addClass("done");}

    }
    delete(){
        $(this.DOM).remove();
    }
    
}
function processDescriptions(descriptions){
    descriptions.forEach(function(item){
        var task = new Task(item);
        console.log(task); 
        task.addToDom(); 
    })
}