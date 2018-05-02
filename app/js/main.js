var ascSortByNameButton = document.getElementById("sort-by-name-asc");
var descSortByNameButton = document.getElementById("sort-by-name-desc");
var ascSortByIdButton = document.getElementById("sort-by-id-asc");
var descSortByIdButton = document.getElementById("sort-by-id-desc");
var ascSortByDescriptionButton = document.getElementById("sort-by-description-asc");
var descSortByDescriptionButton = document.getElementById("sort-by-description-desc");
var searchInput = document.getElementById("search");

var request = new XMLHttpRequest();
var data = {};
var filteredData = {};
request.open('GET', 'https://api.punkapi.com/v2/beers');
request.onload = function () {
	if (request.status >= 200 && request.status < 400) {
        data = JSON.parse(request.responseText);
        filteredData = data;
		renderHTML();
	} else {
		console.log("Error");
	}
	
};
request.onerror = function () {
	console.log("Connection error");
}
request.send();

function sortBy (fieldName, order, sortMode) {
    filteredData.sort(function(a, b){
        var x = null;
        var y = null;

        if(a.hasOwnProperty(fieldName) && b.hasOwnProperty(fieldName)){
        	if (sortMode == 'INT'){
        		x = parseInt(a[fieldName]);
                y = parseInt(b[fieldName]);
			}else{
                x = a[fieldName].toString().toLowerCase();
                y = b[fieldName].toString().toLowerCase();
			}
            if (x < y) {
        		return order=='ASC' ? -1:1;
        	}

            if (x > y) {
                return order=='ASC' ? 1:-1;
        	}
		}

        return 0;
    });
    renderHTML();
}

function filter(searchValue) {
    var rgxp = new RegExp(searchValue, "ig");

    filteredData = data.filter(function (elem) {
        return elem.name.match(rgxp) || elem.description.match(rgxp);
    });
    renderHTML();
}


ascSortByNameButton.addEventListener("click", sortBy.bind(null, 'name', 'ASC', 'STRING'));
descSortByNameButton.addEventListener("click", sortBy.bind(null, 'name', 'DESC', 'STRING'));
ascSortByIdButton.addEventListener("click", sortBy.bind(null, 'id', 'ASC', 'INT'));
descSortByIdButton.addEventListener("click", sortBy.bind(null, 'id', 'DESC', 'INT'));
ascSortByDescriptionButton.addEventListener("click", sortBy.bind(null, 'description', 'ASC', 'STRING'));
descSortByDescriptionButton.addEventListener("click", sortBy.bind(null, 'description', 'DESC', 'STRING'));
searchInput.addEventListener("input", function(event) {filter(searchInput.value)});

function renderHTML () {

	var renderedData = '';
    for (var i = 0; i < filteredData.length; i++) {
        renderedData += '<div class="product">' +
                '<div class="image">' + '<img class="" src="' + filteredData[i].image_url + '">' + '</div>' +
                '<div class="description">' + '<p>' + filteredData[i].id + '</p>' + '<p>' + filteredData[i].name + '</p>' + '<p>' + filteredData[i].tagline + '</p>' + '<p>' + filteredData[i].description + '</p>' + '<p>' + filteredData[i].first_brewed + '</p>' +'</div>' +
            '</div>';
    }
    var wrapper = document.getElementById('demo2');
    wrapper.innerHTML = renderedData;
}

