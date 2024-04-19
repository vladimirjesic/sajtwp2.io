var alts = ["Burger on plate", "Three burgers", "Burger with fries", "Table", "Meal", "People in restaurant", "Three beers", "Guiness beer", "Beer"];
var galleryPaths = [];
for(var i=0; i<9; i++) {
    galleryPaths[i] = "gallery" + (i+1) + ".jpg";
}

var gl1 = document.getElementById("gl1");
var gl2 = document.getElementById("gl2");
var gl3 = document.getElementById("gl3");

var links1 = "";
var links2 = "";
var links3 = "";
for(var i=0; i<3; i++) {
    links1 += "<div class='col-12 col-lg-3 mb-5'> <img src='assets/images/" + galleryPaths[i] + "' class='img-thumbnail' alt='" + alts[i] + "'></div>";
}

for(var i=3; i<6; i++) {
    links2 += "<div class='col-12 col-lg-3 mb-5'> <img src='assets/images/" + galleryPaths[i] + "' class='img-thumbnail' alt='" + alts[i] + "'></div>";
}

for(var i=6; i<9; i++) {
    links3 += "<div class='col-12 col-lg-3 mb-5'> <img src='assets/images/" + galleryPaths[i] + "' class='img-thumbnail' alt='" + alts[i] + "'></div>";
}

gl1.innerHTML=links1;
gl2.innerHTML=links2;
gl3.innerHTML=links3;