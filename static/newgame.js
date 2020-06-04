$(document).ready(function() {
    //GET IMAGES AND NAMES FROM DATABASE WITH API CALL
    $.get("http://localhost:8000/newgamedata", function(data, status) {
        console.log(data);
        
        var people = document.querySelectorAll('.person');
        var peoplenames = document.querySelectorAll('.name');
        for (var i=0; i<4; i++) {
            people[i].style.backgroundImage = `url(${data[i].image})`;
            peoplenames[i].innerHTML = data[i].name;
        }
    })

    //CLICK TO COVER AND UNCOVER PEOPLE
    $(".person").click(function() {
        $(this).find('.cover').toggleClass("flipped");
    });
})

