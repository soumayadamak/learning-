class TaskList{
    constructor(key){
        this.list = []; 
        this.key = key; 
    }
    //this method takes a Task object as an argument and adds it to the instance object 
    push(task){
        task.id = this.list.length;
        this.list.push(task);   
    }
    // this method takes the description of the task object as an argument and displays the task in the DOM
    addTask(description){
        var task = new Task(description);
        this.push(task);
        task.addToDom();
    }
    // this method takes an array of task description objects as an argument and adds them to the DOM 
    addTasks(descriptions){
        descriptions.forEach(function(item){
            this.addTask(item);}.bind(this));
    }
    //this method takes a Task object id as an argument and searches for Task object corresponding to the id in the instance object and returns it
    findTask(givenId){
        var taskDone = this.list.find(function(item){
            return item.id === givenId; 
        });
        return taskDone;
    }
     /*this method takes a Task object id as an argument and searches for Task object's index corresponding 
    to the id in the instance object. It returns it if it's found and -1 if not found. */ 
    deleteTask(givenID){
        var index = this.list.findIndex(function (item) { return item.id === givenID;})
        var deletedTask = theTaskList.list.splice(index,1);
        if (deletedTask.length === 0){
            return -1;
        }
        else{
            return deletedTask[0];
        }
    }
    // this method has no inputs and saves the current tasks diplayed in the list property of the instance object
    save(){
        var tasks = []; 
        this.list.forEach(function(item){
            var task = {}
            task.text = item.text;
            task.priority = item.priority;
            task.duedate = item.duedate;
            task.tag = item.tag;
            task.done = item.done;
            tasks.push(task);
        });
        var stringArray = JSON.stringify(tasks);
        localStorage.setItem(this.key, stringArray);
    }
    //this method has no input and adds to the DOM the tasks stored in the local storage
    load(){
        this.list = []; 
        $("#theTasks").empty();
        var descriptionArray = JSON.parse(localStorage.getItem(this.key));
        this.addTasks(descriptionArray);

    }
    //this method has no inputs and sorts the internal array by tag 
    sortByTag(){
        this.list.sort(function(a,b){
            return a.tag.localeCompare(b.tag);
        });
        $("#theTasks").empty();
        this.list.forEach(function(item){
            item.addToDom();
        });
    }
    //this method has no inputs and sorts the internal array by id 
    sortById(){
        this.list.sort(function(a,b){
            return a.id - b.id;
        });
        $("#theTasks").empty();
        this.list.forEach(function(item){
            item.addToDom();
        });
    }
    //this method has no inputs and sorts the internal array by due date
    sortByDueDate(){
        this.list.sort(function(a,b){
            return a.duedate - b.duedate;
        });
        $("#theTasks").empty();
        this.list.forEach(function(item){
            item.addToDom();
        });
    }
    //this method has no inputs and sorts the internal array by priority 
    sortByPriority(){
        this.list.sort(function(a,b){
            var aprio = a.priority; 
            var bprio = b.priority; 
            if (aprio === bprio){
                return 0; 
            }
            else if (aprio === "high" && (bprio === "medium" || bprio === "low")
            || (aprio === "medium" && bprio === "low")){
                return -1;
            }
            return 1;

        });
        $("#theTasks").empty();
        this.list.forEach(function(item){
            item.addToDom();
        });
    }
}

var theTaskList = new TaskList("SOUMAYA");
