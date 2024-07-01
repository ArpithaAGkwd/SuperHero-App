// Get Items that are stored in Local Storage 
var resultId = localStorage.getItem('id');

// Fetch Will be done!
fetch();

// Get all the data from Fetch 
function fetch() {
    var Request = new XMLHttpRequest();
    // By Using Result Id get details of superhero
    var url = `https://gateway.marvel.com/v1/public/characters/${resultId}?apikey=c2595c6e10b8e75e6bd3b3c61b14547c&hash=77964d9b5c2bef6213992685d7c2dfd4&ts=1`;
    Request.open('get', url, true);
    Request.send();
    Request.onload = function () {
        var response = JSON.parse(Request.response);

        // bind the response retrived using innerhtml
        const imageUrl = `${response.data.results[0].thumbnail.path}.${response.data.results[0].thumbnail.extension}`;

        const characterCard = document.getElementById('character-card');
        characterCard.innerHTML = `
        <img src="${imageUrl}" alt="${response.data.results[0].name}" class="img-container-css">
        `;
        document.getElementById("name").innerHTML = '<b>Name: </b> ' + response.data.results[0].name;
        document.getElementById("id").innerHTML = '<b>Hero ID: </b> ' + response.data.results[0].id;
        response.data.results[0].description = response.data.results[0].description || "No description available.";
        document.getElementById("desc").innerHTML = '<b>Description: </b> ' + response.data.results[0].description;
        document.getElementById("comic").innerHTML = '<b>Comic Available: </b>' + response.data.results[0].comics.available;
        document.getElementById("series").innerHTML = '<b>Series Available: </b>' + response.data.results[0].series.available;
        document.getElementById("stories").innerHTML = '<b>Stories Available: </b>' + response.data.results[0].stories.available;
        document.getElementById("count").innerHTML = '<b>Count: </b>' + response.data.count;
    }
}