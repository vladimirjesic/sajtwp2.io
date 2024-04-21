

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

    ajaxCallBack("assets/data/menu.json", function(result){
        printMenu(result);
        saveLS("menu", result);
    })

    ajaxCallBack("assets/data/categories.json", function(result){
        printSelect(result, "#categories");
    })
    ajaxCallBack("assets/data/meat.json", function(result){
        printSelect(result, "#meat");
    })
    ajaxCallBack("assets/data/sizes.json", function(result){
        printSelect(result, "#sizes");
    })

    ajaxCallBack("assets/data/gallery.json", function(result){
        printGallery(result);
    })


    $(document).on("change", "#categories", change);
    $(document).on("change", "#meat", change);
    $(document).on("change", "#sizes", change);
    $(document).on("change", "#sort", change);
    $(document).on("click", ".order", click);
}

function click(){
    console.log("Z")
    var productId = $(this).attr("id");
    console.log(productId);
    let products = getFromLS("menu");
    selectedProduct= products.filter(product => product["id"] == productId);
    console.log(selectedProduct);
    // let arrSelectedProducts = getFromLS("order");
    // arrSelectedProducts.push(selectedProduct);
    // saveLS("order", arrSelectedProducts);
}

function printGallery(imgs){
    content = "";
    for(let img of imgs){
        content+=`
        <div class="col-sm-8 col-md-6 col-lg-4 mb-5"><img src="${img.href}" class="img-thumbnail" alt="${img.alt}"></div>
        `
    }
    $("#gl1").html(content);
}



function change(){
    if($("#categories").val()=="3"){
        $('#meat').prop('selectedIndex', 0);
        $('#sizes').prop('selectedIndex', 0);
        $("#meat").prop('disabled', true);
        $("#sizes").prop('disabled', true);
    }
    else{
        $("#meat").prop('disabled', false);
        $("#sizes").prop('disabled', false);
    }
    let products = getFromLS("menu");
     products = filterMenu(products, "categories");
     products = filterMenu(products, "meat");
     products = filterMenu(products, "sizes");
     products = sortMenu(products);
     

     if(products.length==0){
        content=`<div class="alert alert-danger col-8 col-lg-6" role="alert">
        There are no products matching the requirements!
      </div>`
        $("#burgers").html(content);
     }
     else{
     printMenu(products);
    }
}
 function filterMenu(arrProducts, type){
     let filterArr = [];
     let id = null;
     let key = null;
 
     if(type == "categories"){
         id = $("#categories").val();
         key = "category";
     }
     if(type == "meat"){
         id = $("#meat").val();
         key = "meat";
     }
     if(type == "sizes"){
         id = $("#sizes").val();
         key = "size";
     }
 
     if(id == "0"){
         filterArr = arrProducts;
     }
     else{
         filterArr = arrProducts.filter(product => product[key] == id);
     }
 
     return filterArr;
 }

 //Sortiranje cemo posle!!!!!!!!!!!!!!!
 function sortMenu(arrProducts){
     let sortProducts = [];
     let choice = $("#sort").val();
     if(choice == "0"){
         sortProducts = arrProducts;
     }
     else{
         sortProducts = arrProducts.sort(function(a, b){
             if(choice == "1"){
                 return a.price - b.price;
             }
             if(choice == "2"){
                 return b.price - a.price;
             }
             if(choice == "3"){
                 if(a.name < b.name){
                     return -1;
                 }
                 else if(a.name > b.name){
                     return 1;
                 }
                 else{
                     return 0;
                 }
             }
             if(choice == "4"){
                 if(a.name > b.name){
                     return -1;
                 }
                 else if(a.name < b.name){
                     return 1;
                 }
                 else{
                     return 0;
                 }
             }   
         })
     }
     return sortProducts;
 }

 function saveLS(name, value){
    localStorage.setItem(name, JSON.stringify(value));
}
function getFromLS(name){
    return JSON.parse(localStorage.getItem(name));
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

function printMenu(menuElements){
    var content="";
    for(let objMenu of menuElements){

        content+=`<div class="col-12 col-lg-4 d-flex justify-content-center">
        <div class="card mb-5" style="width: 18rem;">
            <img src="${objMenu.src}" class="card-img-top" alt="Regular Burger">
            <div class="card-body">
              <h5 class="card-title">${objMenu.name}</h5>
              <p class="card-text">${objMenu.description}</p>
              <!-- Button trigger modal -->
            <button id="${objMenu.id}" type="button" class="btn btnc order">${objMenu.price} din</button>

            <!-- Modal -->
            </div>
          </div>
    </div>`
    }
content+=`</div>`
    $("#burgers").html(content);
}

function printSelect(selectElements, div){
    var content="<option value='0'>Choose...</option>";
    for(let objSelect of selectElements){
        content+=`
            <option value="${objSelect.id}">${objSelect.name}</option>
        `
    }
    $(div).html(content);
}



var footer = document.getElementById("ft");
footer.innerHTML="<p class='mb-0 p-1'>&copy All rights reserved Vladimir Jesic 2024. | <a href='index.html' target='_blank'>Documentation</a> | <a href='index.html' target='_blank'>Sitemap</a></p>"