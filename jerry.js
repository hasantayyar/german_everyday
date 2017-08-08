$(document).keydown(function(e){
    e.preventDefault();    //this may not be necessary

    if (e.keyCode == 37) {
       $('#previous').click();
    }
    else if (e.keyCode == 39) {
       $('#next').click();
    }
});

$(document).keydown(function(e){
    e.preventDefault();    //this may not be necessary

    if (e.keyCode == 38) {
       $('#flashcard-1').click();
    }
    else if (e.keyCode == 40) {
       $('#flashcard-1').click();
    }
});
