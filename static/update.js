var whichCollection = document.querySelector('#whichCollection') ;
var colNameBtn = document.querySelector('#updateCollection');
var collectionName;
var preview = document.querySelector("#previewPhoto");
var posX;
var posY;
var updateDataPost;

colNameBtn.addEventListener('click', function() {
    collectionName = whichCollection.value;
    console.log(collectionName);
    showColData(collectionName);
    
    $.get("http://localhost:8000/getupdates", function(data, status) {
        
        var photos = document.querySelectorAll('.imagelink');
        var peoplenames = document.querySelectorAll('.inputname');
        for (var i=0; i<24; i++) {
            photos[i].setAttribute("placeholder", data[i].image);
            peoplenames[i].setAttribute("placeholder", data[i].name);
            photos[i].value = data[i].image;
            peoplenames[i].value = data[i].name;
        }

        /*$('.imagelink').change(function() {
            posX = 0;
            posY = 0;
            var inputValue = $(this).val();
            var inputValueUpdate = inputValue.replace('open', 'uc');
            preview.style.backgroundImage = `url(${inputValueUpdate})`;
        })
        $('.imagelink').focus(function() {
            posX = 0;
            posY = 0;
            var inputValue = $(this).val();
            var inputValueUpdate = inputValue.replace('open', 'uc');
            preview.style.backgroundImage = `url(${inputValueUpdate})`;
        })*/
            
    })
    
})

$('.imagelink').change(function() {
    posX = 0;
    posY = 0;
    $(preview).css('background-position-x', posX+"px");
    $(preview).css('background-position-y', posY+"px");
    var inputValue = $(this).val();
    var inputValueUpdate = inputValue.replace('open', 'uc');
    preview.style.backgroundImage = `url(${inputValueUpdate})`;
    $(this).val(inputValueUpdate);
    
})
$('.imagelink').focus(function() {
    //posX = 0;
    //posY = 0;
    //$(preview).css('background-position-x', posX+"px");
    //$(preview).css('background-position-y', posY+"px");
    var inputValue = $(this).val();
    preview.style.backgroundImage = `url(${inputValue})`;
    var thisId = $(this).parent().find('.imagelink').attr('id');
    console.log(thisId);
    $.get("http://localhost:8000/getupdates", function(data, status) {
        posX = data[thisId].posX;
        posY = data[thisId].posY;
        $(preview).css('background-position-x', posX+"px");
        $(preview).css('background-position-y', posY+"px");
    });
})

$('#left').click(function() {
    posX += -10;
    $(preview).css('background-position-x', posX+"px");
})
$('#right').click(function() {
    posX += 10;
    $(preview).css('background-position-x', posX+"px");
})
$('#up').click(function() {
    posY += -10;
    $(preview).css('background-position-y', posY+"px");
})
$('#down').click(function() {
    posY += 10;
    $(preview).css('background-position-y', posY+"px");
})

$('.updateBtn').click(function() {
    var thisName = $(this).parent().find('.inputname').val();
    var thisLink = $(this).parent().find('.imagelink').val();
    var originalName = $(this).parent().find('.inputname').attr('placeholder');
    console.log(originalName);

    updateDataPost = {"collection": collectionName, "originalName": originalName, "name": thisName, "image": thisLink, "posX": posX, "posY": posY};
    updateDb(updateDataPost);

    //alert(thisName + " " + thisLink + " " + posX + " X " + posY + " Y ");
})


function updateDb(updates) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/updateDb");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(updates));
}


function showColData(x) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/update");
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send(x);
}