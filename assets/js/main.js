

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

    printOrder();

    

    $(document).on("change", "#categories", change);
    $(document).on("change", "#meat", change);
    $(document).on("change", "#sizes", change);
    $(document).on("change", "#sort", change);
    $(document).on("click", ".order", click);
    $(document).on("click", ".deleteBtn", del);
    $(document).on("blur", "#orderFname", checkOrderName);
    $(document).on("blur", "#orderFname", checkFields);
    $(document).on("blur", "#orderLname", checkOrderName);
    $(document).on("blur", "#orderLname", checkFields);
    $(document).on("blur", "#fname", checkOrderName);
    $(document).on("blur", "#lname", checkOrderName);
    $(document).on("blur", "#adress", checkOrderAdress);
    $(document).on("blur", "#adress", checkFields);
    $(document).on("blur", "#phone", checkPhone);
    $(document).on("blur", "#phone", checkFields);
    $(document).on("change", "#cash", checkFields);
    $(document).on("change", "#card", checkFields);
    $(document).on("change", "#transport", checkFields);
    $(document).on("click", "#orderBtn", completeOrder);
    $("#orderBtn").prop("disabled",true);
    $(document).on("blur", "#email", checkEmail);
    $(document).on("blur", "#question", checkQuestion);
}

function checkQuestion(){
    var regExQuestion=/^[A-Z][a-z]{3,}/;
    var question = $("#question").val();
    if(!regExQuestion.test(question))
    {
       document.getElementById("errorQuestion").style.display="block";
       document.getElementById("question").style.border="3px solid red";
    }
    else{
        document.getElementById("errorQuestion").style.display="none";
        document.getElementById("question").style.border="3px solid green";
    }
}

function checkEmail(){
    var regExEmail = /^[a-z-\.]+@([a-z-]+\.)+[a-z-]{2,4}$/;
    var email = $("#email").val();
        if(!regExEmail.test(email))
    {
       document.getElementById("errorEmail").style.display="block";
       document.getElementById("email").style.border="3px solid red";
    }
    else{
        document.getElementById("errorEmail").style.display="none";
        document.getElementById("email").style.border="3px solid green";
    }
}

function completeOrder(){
    window.location.href = 'index.html';
    localStorage.removeItem("order");
}

function checkFields(){
    var filedCounter = 0;
    if(document.getElementById("orderFname").style.border=="3px solid green"){
        filedCounter++;
        console.log(filedCounter)
    }
    if(document.getElementById("orderLname").style.border=="3px solid green"){
        filedCounter++;
        console.log(filedCounter)
    }
    if(document.getElementById("adress").style.border=="3px solid green"){
        filedCounter++;
        console.log(filedCounter)
    }
    if(document.getElementById("phone").style.border=="3px solid green"){
        filedCounter++;
        console.log(filedCounter)
    }
    if ($('input[name=payment]:checked').length > 0) {
        filedCounter++;
        console.log(filedCounter)
    } 
    if($("#transport").val()!="0"){
        filedCounter++;
        console.log(filedCounter);
    }

    if(filedCounter==6){
        $("#orderBtn").prop("disabled",false);
    }
    else{
        $("#orderBtn").prop("disabled",true);
    }


}


function checkPhone(){
    var regExPhone = /^[0-9]{8,10}$/
    var phone = $(this).val();
    if(!regExPhone.test(phone)){
        document.getElementById("errorPhone").style.display="block";
        document.getElementById("phone").style.border="3px solid red";
    }
    else{
        document.getElementById("errorPhone").style.display="none";
        document.getElementById("phone").style.border="3px solid green";
    }
    checkFields;
}

function checkOrderAdress(){
    var regExAdress=/^[a-zA-Z]+(?:\s+[a-zA-Z]+)*\s+\d+$/;
    var adress = $(this).val();
    if(!regExAdress.test(adress)){
        document.getElementById("errororderAdress").style.display="block";
        document.getElementById("adress").style.border="3px solid red";
    }
    else{
        document.getElementById("errororderAdress").style.display="none";
        document.getElementById("adress").style.border="3px solid green";
    }
    checkFields;
}

function checkOrderName(){
    var regExName=/^[A-Z][a-z]{2,10}$/;
    var name = $(this).val();
    var idError = "error";
    var id = $(this).attr("id")
    idError += id;
    if(!regExName.test(name))
    {
        document.getElementById(idError).style.display="block";
        document.getElementById(id).style.border="3px solid red";
    }
    else{
        document.getElementById(idError).style.display="none";
        document.getElementById(id).style.border="3px solid green";
    }
    checkFields;
}

function del(){
    
    var productId = $(this).attr("id");
    var orderedItems = getFromLS("order");
    
    localStorage.removeItem("order");
    var undeletedProducts = [];
    for(var ord of orderedItems){
            if(ord.id!=productId){
                undeletedProducts.push(ord);
            }        
    }
    console.log(undeletedProducts);
    // var undeletedProducts= orderedItems.filter(product => product["id"] != productId);
    // console.log(undeletedProducts)
    saveLS("order", undeletedProducts);
    printOrder();

}


function printOrder(){
    let counter = 1;
    let content="";
    let orderFromLS = getFromLS("order");
    if(orderFromLS==null || orderFromLS.length==0){
        content+=`<div class="alert alert-danger col-12" role="alert">
        There are no ordered products, go back to the menu page to select your order!
      </div>`
    }
    else{

        content+=`<div class="col-12">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>`

        for(let ord of orderFromLS){
                content+=`<tr>
                      <th scope="row">${counter++}</th>
                      <td>${ord.name}</td>
                      <td>${ord.price}</td>
                      <td><button id="${ord.id}" type="button" class="btn btnc deleteBtn">Delete</button></td>
                    </tr>`
        }
        content+=`</tbody>
        </table>
        </div>`;

    }
    $("#items").html(content);
}

function click(){
    var productId = $(this).attr("id");
    let products = getFromLS("menu");
    for(var prod of products){
        if(prod.id==productId){
            var selectedProduct = prod;
        }
    }
    // var selectedProduct= products.filter(product => product["id"] == productId);
    let arrSelectedProducts = [];
    let arrOrderedProducts = getFromLS("order");
    if(arrOrderedProducts!=null){
        for(let product of arrOrderedProducts){
            arrSelectedProducts.push(product)
        }
    }
    arrSelectedProducts.push(selectedProduct);
    saveLS("order", arrSelectedProducts);
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
            <button id="${objMenu.id}" type="button" class="btn btnc order">${objMenu.price} din - Add it to your order!</button>

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
footer.innerHTML="<p class='mb-0 p-1'>&copy All rights reserved Vladimir Jesic 2024. | <a href='dokumentacija1-wp2.pdf' target='_blank'>Documentation</a> | <a href='sitemap.xml' target='_blank'>Sitemap</a></p>"