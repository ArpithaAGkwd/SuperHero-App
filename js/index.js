// method to start API call and connect to API 
document.getElementById("search-form").addEventListener('keyup', function () {
    var url = getUrl();
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get', url, true);
    xhrRequest.send();
    xhrRequest.onload = function () {
        var data = JSON.parse(xhrRequest.responseText);
        display(data);
    }
});

// method for url to display search query in container in html
function getUrl() {
    var searchQuery = document.getElementById('search-string').value;
    document.getElementById('querySection').innerHTML = 'SuperHero you have searched for : ' + searchQuery;
    if (!searchQuery) {
        return "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=c2595c6e10b8e75e6bd3b3c61b14547c&hash=77964d9b5c2bef6213992685d7c2dfd4";
    } else {
        return `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchQuery}&apikey=c2595c6e10b8e75e6bd3b3c61b14547c&hash=77964d9b5c2bef6213992685d7c2dfd4&ts=1`;
    }
}

// get element by id before the binding of response
let canvas = document.getElementById('canvas');

// method to fetch data of superhero based on serach query and bind to html canvas
function display(data) {
    var superHeroList = document.getElementById('superhero-list');
    superHeroList.innerHTML = "";
    var results = data.data.results;
    console.log("displaying results")
    console.log(results)
    if (!results) {
        document.getElementById('search-character').value = "";
        window.alert("No super hero found!");
    } else {
        for (let result of results) {
            var templateCanvas = canvas.content.cloneNode(true); 

            const imageUrl = `${result.thumbnail.path}.${result.thumbnail.extension}`;
           

            const characterCard = templateCanvas.getElementById('character-card');
            characterCard.innerHTML = `
                  <img src="${imageUrl}" alt="${result.name}" class="img-container-css">       
             `;
            templateCanvas.getElementById("name").innerHTML = '<b>Name: </b> ' + result.name;
            templateCanvas.getElementById("id").innerHTML = '<b>Hero ID: </b> ' + result.id;
            templateCanvas.getElementById("comic").innerHTML = '<b>Comic Available: </b>' + result.comics.available;
            templateCanvas.getElementById("series").innerHTML = '<b>Series Available: </b>' + result.series.available;
            templateCanvas.getElementById("stories").innerHTML = '<b>Stories Available: </b>' + result.stories.available;

            templateCanvas.getElementById('learn-more').addEventListener('click', function () {
                localStorage.setItem('id', result.id);
                window.location.assign('./about.html');
            });

            templateCanvas.getElementById('fav').addEventListener('click', function () {
                addFavorite(result);
            });

            superHeroList.appendChild(templateCanvas);
        }
    }
}

// method for favourite button to add superhero to favourite page
function addFavorite(superhero) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(hero => hero.id === superhero.id)) {
        favorites.push(superhero);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showSnackbar("Successfully added to Favorites!");
    } else {
        showSnackbar("Already in Favorites!");
    }
}

// method to show success message for adding to favorites
function showSnackbar(message) {
    var x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}
