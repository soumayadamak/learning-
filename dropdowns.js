// the following code is taken from the lecture notes and modified slightly. It serves to monitor the navigation buttons

$("nav").on('click',".dropButton",function (evt) {
    var sib = $(evt.target).next().one();
    var shown = sib.hasClass('show');
    closeAllDropDowns();
    // open our dropdown, if not shown
    if(!shown) {
        sib.addClass('show');
    }
});

function closeAllDropDowns() {
    console.log("closing all dropdowns");
    $(".dropContent,.dropClickContent").removeClass('show');
}
$(window).click(function (evt) { 
    var dcc = $(evt.target).closest(".dropClickContent");
    var inDcc = (dcc.length === 1);
    console.log(dcc.length);
    if (!evt.target.matches('.dropButton') &&
        !inDcc) {
       closeAllDropDowns();
    }
});
