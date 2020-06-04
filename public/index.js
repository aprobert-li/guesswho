
var xhr = new XMLHttpRequest();
xhr.open('GET', "/getCollections");
xhr.onload = function() {
    var response = xhr.response;
    var parsed = JSON.parse(response);
    for (i in parsed) {
        var li = document.createElement('li');
        li.innerHTML = parsed[i].collection;
        li.setAttribute("id", parsed[i].collection);
        var gamelist = document.querySelector('#games');
        gamelist.appendChild(li);
    }
    
    $('li').click(function() {
        //Get the id name, send it to the post function and then go to the game to play
        var thisid = $(this).attr('id');
        chosengame(thisid);
        window.location = "/play.html";

        //Post request function to send the name of the game(collection) to the server
        function chosengame(x) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', "/chosengame");
            xhr.setRequestHeader('Content-Type', 'text/plain');
            xhr.send(x);
        } 
    })
}
xhr.send();

