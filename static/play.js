//$(document).ready(function() {
    //GET IMAGES AND NAMES FROM DATABASE WITH API CALL
    $.get("/getgamedata", function(data, status) {
        console.log(data);
        
        var people = document.querySelectorAll('.person');
        var peoplenames = document.querySelectorAll('.name');
        for (var i=0; i<24; i++) {
            people[i].style.backgroundImage = `url(${data[i].image})`;
            peoplenames[i].innerHTML = data[i].name;
            people[i].style.backgroundPositionX = data[i].posX + "px";
            people[i].style.backgroundPositionY = data[i].posY + "px";
        }
        var chosenperson = document.querySelector('#chosenperson');
        var randomchoice = Math.floor(Math.random()*24);
        chosenperson.style.backgroundImage = `url(${data[randomchoice].image})`;

    })

    //CLICK TO COVER AND UNCOVER PEOPLE
    $(".person").click(function() {
        $(this).find('.cover').toggleClass("flipped");
    });

    
//})


