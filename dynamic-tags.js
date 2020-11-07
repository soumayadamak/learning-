//global variable to keep the tags and their colors
var tagColors = {
 work:" rgb(190,220,247)",
personal: "rgb(230, 176, 170)" 
};

//this function has no arguments and updates the DOM with the tags available in the tagColors variable
function updateTags(){
    $("#tags,#currentTags").empty();
    for (var tag in tagColors){
        if(tagColors.hasOwnProperty(tag)){
            var $label = $("<label></label>")
            var $input = $("<input></input>").attr({"type":"radio","name":"tag","value":tag});
            $label.append($input);
            $label.append(tag);
            $("#tags").append($label);

            var $li = $("<li></li>");
            var $button = $("<button></button>").attr("type", "button").addClass("delete").html("&#x2716;");
            var $span = $("<span></span>").addClass("tagName").text(tag);
            $li.append($button).append($span);
            $("#currentTags").append($li);
        }
    }
}
function addTagFromForm(){
    var data = $("#addTagForm").serializeArray();
    tagColors[data[0].value] = data[1].value;
};
localStorage.setItem("SOUMAYA_TAGS", JSON.stringify(tagColors));
$("#addTagForm").on("click", "button", function(){
    addTagFromForm();
    updateTags();
    localStorage.setItem("SOUMAYA_TAGS", JSON.stringify(tagColors));
});