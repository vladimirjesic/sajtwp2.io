

function ajaxCallBack(url, result, callback){
    $.ajax({
        url: url,
        method: "get",
        dataType: "json",
        success: result,
        error: function(xhr){
            console.log(xhr);
        }
    })
}

window.onload = function(){
    ajaxCallBack("assets/data/nav.json", function(result){
        printNav(result);
    })

    ajaxCallBack("assets/data/slider.json", function(result){
        printSlider(result);
    })
}


function printNav(navMenu){
    var content = "";
    for(let objLink of navMenu){
        content+=`<li class="nav-item"><a class="nav-link linkh" href="${objLink.href}">${objLink.text}</a></li>`;
    }

    $("#menu").html(content);
}

function printSlider(sliderElements){
    var content = "";
    for(let objSlider of sliderElements){
        content+=
        `<div class="carousel-item ${objSlider.active}">
        <img src="${objSlider.src}" class="d-block" alt="${objSlider.alt}">
        <div class="carousel-caption d-none d-md-block">
        <h5>${objSlider.alt}</h5>
        <p>${objSlider.description}</p>
        </div>
        </div>`;
    }
    $("#slider-content").html(content);
}

var footer = document.getElementById("ft");
footer.innerHTML="<p class='mb-0 p-1'>&copy All rights reserved Vladimir Jesic 2024. | <a href='index.html' target='_blank'>Documentation</a> | <a href='index.html' target='_blank'>Sitemap</a></p>"