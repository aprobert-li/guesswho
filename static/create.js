//VARIABLES
var board = document.querySelector('#newboard');
var newboard = document.querySelector('#createboard');
var imageurlsUC = [];
var submitbtn = document.querySelector('#submitlinks');
var imageurls = [];
var inputs = document.querySelectorAll('.imagelink');
var gameData = [];
var names = document.querySelectorAll('.inputname');
var namesArray = [];

var gphotos = document.querySelector('#gphotos');
var gdrive = document. querySelector('#gdrive');

//BUTTON CLICK THAT CREATES A NEW GAMEBOARD/DATABASE COLLECTION
newboard.addEventListener('click', function() {
    var newBoardName = board.value;
    createNewBoard(newBoardName);
    $('.typeoflink').fadeIn();
    $(newboard).fadeOut();
})

//FUNCTION TO SEND DATA TO CREATE A NEW GAMEBOARD/DATABASE COLLECTION
function createNewBoard(x) {
    var xhrBoard = new XMLHttpRequest();
    xhrBoard.open('POST', "/collection");
    xhrBoard.setRequestHeader('Content-Type', 'text/plain');
    xhrBoard.send(x)
}

gphotos.addEventListener('click', function() {
    $('.typeoflink').fadeOut();
    $('.imagelink').fadeIn();
    $('.inputname').fadeIn();
    $('#submitlinks').fadeIn();
    submitbtn.addEventListener('click', function() {
        for (var i=0; i<24; i++) {
            var inputvalue = inputs[i].value;
            imageurlsUC.push(inputvalue);
            namesArray.push(names[i].value);
            //Create the JSON data to send to database
            gameData.push({"name": namesArray[i], "image": imageurlsUC[i], "posX": 0, "posY": 0});
        }
        console.log(gameData);
        postData();
        window.location.replace('index.html');
    })
})

gdrive.addEventListener('click', function() {
    $('.typeoflink').fadeOut();
    $('.imagelink').fadeIn();
    $('.inputname').fadeIn();
    $('#submitlinks').fadeIn();
    submitbtn.addEventListener('click', function() {
        for (var i=0; i<24; i++) {
            var inputvalue = inputs[i].value;
            //Need to modify the Google Drive link to actually get the image
            var updateval = inputvalue.replace('open', 'uc');
            imageurlsUC.push(updateval);
            namesArray.push(names[i].value);
            //Create the JSON data to send to database
            gameData.push({"name": namesArray[i], "image": imageurlsUC[i], "posX": 0, "posY": 0});
        }
        console.log(gameData);
        postData();
        window.location.replace('index.html')
    })
})

//BUTTON CLICK THAT GETS GOOGLE DRIVE LINKS AND NAMES TO SEND TO DATABASE
/*submitbtn.addEventListener('click', function() {
    for (var i=0; i<4; i++) {
        var inputvalue = inputs[i].value;
        //Need to modify the Google Drive link to actually get the image
        var updateval = inputvalue.replace('open', 'uc');
        imageurlsUC.push(inputvalue);
        namesArray.push(names[i].value);
        //Create the JSON data to send to database
        gameData.push({"name": namesArray[i], "image": imageurlsUC[i]});
    }
    console.log(gameData);
    postData();
})*/

//FUNCTION TO SEND DATA FOR NAMES AND IMAGE LINKS
function postData() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/data");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(gameData));
}




/*var people = document.querySelectorAll('.person');

function bgImages() {
    for (u in imageurls) {
        imageurls[u] = imageurls[u].replace('open', 'uc');
        imageurlsUC.push(imageurls[u])
    }
    for (var i=0; i < 4; i++) {
        console.log(imageurlsUC[i]);
        people[i].style.backgroundImage = `url(${imageurlsUC[i]})`;
    }
}

bgImages();

$(".person").click(function() {
    $(this).find('.cover').toggleClass("flipped");
});*/



