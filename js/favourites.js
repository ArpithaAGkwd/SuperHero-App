// get canvax Element
var canvas = document.getElementById("canvas");

// retrieve favourite list from local storage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];


// interate over favoruite list an bind data to the template
favorites.forEach(favorite => {
    var templateCanvas = canvas.content.cloneNode(true);

    const imageUrl = `${favorite.thumbnail.path}.${favorite.thumbnail.extension}`;
    const characterCard = templateCanvas.getElementById('character-card');
    characterCard.innerHTML = `
                  <img src="${imageUrl}" alt="${favorite.name}" class="img-container-css">       
             `;
    templateCanvas.getElementById("name").innerHTML = '<b>Name: </b> ' + favorite.name;
    templateCanvas.getElementById("id").innerHTML = '<b>Hero ID: </b> ' + favorite.id;
    templateCanvas.getElementById("comic").innerHTML = '<b>Comic Available: </b>' + favorite.comics.available;
    templateCanvas.getElementById("series").innerHTML = '<b>Series Available: </b>' + favorite.series.available;
    templateCanvas.getElementById("stories").innerHTML = '<b>Stories Available: </b>' + favorite.stories.available;

    templateCanvas.getElementById("learn-more").addEventListener('click', function () {
        localStorage.setItem('id', favorite.id);
        window.location.assign('./about.html');
    });

    templateCanvas.getElementById("fav").addEventListener('click', function () {
        removeFavorite(favorite.id);
    });

    document.getElementById("superhero-list").appendChild(templateCanvas);
});


// method to remove superhero through id using filter
function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(favorite => favorite.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    window.location.reload();
}
