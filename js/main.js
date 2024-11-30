
//session 1
// var test = 2;

// switch (test){
//     case "2":
//         console.log("==");
//         break;
//     case 2:
//         console.log("===");
//         break;
//     default:
//         console.log("not defined");
// }


//session 3
// var sum = calcSum(10, 20);
// console.log(sum);

// function calcSum (x,y){
//     return x+y;
// }


//session 4
// var person = {
//     name: "ahmed", 
//     age: 20,
//     salary:30,
//     getTotalSalary:function(hours){
//         return hours * person.salary;
//     }
// }

// console.log(person.getTotalSalary(20));

var productName = document.getElementById("ProductName");
var productPrice = document.getElementById("ProductPrice");
var productCategory = document.getElementById("ProductCategory");
var productDesc = document.getElementById("ProductDesc");
var productImage = document.getElementById("ProductImage");
var searchInput = document.getElementById("search-input");

var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var rowElement = document.getElementById("row")

var globalIndex;

var products;
if(localStorage.getItem("products") != null){
    products = JSON.parse(localStorage.getItem("products"));
    showAllProducts();
}
else {
    products = [];
}


//alerts:
var emptyNameAlertElement = document.getElementById("empty-name-alert");
var emptyPriceAlertElement = document.getElementById("empty-price-alert");
var emptyCategoryAlertElement = document.getElementById("empty-category-alert");

var validateNameAlertElement = document.getElementById("validate-name-alert");
var validatePriceAlertElement = document.getElementById("validate-price-alert");
var validateCategoryAlertElement = document.getElementById("validate-category-alert");
var validateCommentAlertElement = document.getElementById("validate-comment-alert");

function addProduct(){
    var product = {
        ProductName : productName.value,
        ProductPrice : productPrice.value,
        ProductCategory : productCategory.value ,
        ProductDesc : productDesc.value ,
        ProductImage : productImage.files[0]? `images/${productImage.files[0].name}` : 'images/product-img.jpg'

    }

    if(validateNotEmptyFields() && validateProductName() && validateCategory() && validatePrice() && validateComment()){
        products.push(product);
        showAllProducts();
        setLocalStorage();
        clearForm();
    }
    
}

function showAllProducts(){
    var regex = new RegExp(searchInput.value,'gi')
    rowElement.innerHTML = "";
    for (i=0 ; i<products.length; i++){
        if(products[i].ProductName.toLowerCase().includes(searchInput.value.toLowerCase())){
            rowElement.innerHTML += `                <div class="col-md-4">
            <div class="inner">
                <div class="card">
                    <div class="card-body">
                        <div class="product-img">
                            <img height="500px" src="${products[i].ProductImage}" alt="product image" class="w-100">
                        </div>
                        <span>product index</span>
                        <h4 class="card-title">${products[i].ProductName.replace(regex, (match)=>`<span class="bg-info">${match}</span>`)}</h4>
                        <p class="card-text">Product Price:${products[i].ProductPrice}</p>
                        <p class="card-text">Product Category:${products[i].ProductCategory}</p>
                        <p class="card-text">Product description:${products[i].ProductDesc}</p>
                    </div>
                    <div class="card-footer text-muted">
                        <div class="buts text-center">
                            <button class="btn btn-success" onclick="setFormValues(${i})">Update</button>
                            <button class="btn btn-danger" onclick="deleteItem(${i})">Delete</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>`;

        }
        
    }
    
}

function clearForm(){
    productName.value = null;
    productPrice.value = null;
    productCategory.value = null;
    productDesc.value = null;
    productImage.value = null;
}

function deleteItem(index){
    products.splice(index,1);
    showAllProducts();
    setLocalStorage();
}

function setLocalStorage(){
    localStorage.setItem("products",JSON.stringify(products));
}

function setFormValues(index){
    globalIndex = index;
    productName.value = products[index].ProductName;
    productPrice.value = products[index].ProductPrice;
    productCategory.value = products[index].ProductCategory;
    productDesc.value = products[index].ProductDesc;
    

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}

function updateProduct(){
    
        products[globalIndex].ProductName = productName.value;
        products[globalIndex].ProductPrice = productPrice.value;
        products[globalIndex].ProductCategory = productCategory.value ;
        products[globalIndex].ProductDesc = productDesc.value ;
        products[globalIndex].ProductImage = productImage.files[0]? `images/${productImage.files[0].name}` : 'images/product-img.jpg' ;

        showAllProducts();
        setLocalStorage();

        clearForm();
        addBtn.classList.remove("d-none");
        updateBtn.classList.add("d-none");

}

function validateNotEmptyFields(){
    var flag1 = true;
    var flag2 = true;
    var flag3 = true;

    if(productName.value ===""){
        emptyNameAlertElement.classList.remove("d-none");
        flag1 = false;
    }
    else{
        emptyNameAlertElement.classList.add("d-none");
        flag1 = true;
    }

    if(productPrice.value ===""){
        emptyPriceAlertElement.classList.remove("d-none");
        flag2 = false;
    }
    else{
        emptyPriceAlertElement.classList.add("d-none");
        flag2= true;
    }

    if(productCategory.value ===""){
        emptyCategoryAlertElement.classList.remove("d-none");
        flag3 = false;
    }
    else{
        emptyCategoryAlertElement.classList.add("d-none");
        flag3 = true;
    }

    
    return flag1 && flag2 && flag3;
}

productName.addEventListener("input",function(){
    validateProductName();
});

productPrice.addEventListener("input",function(){
    validatePrice();
});

productCategory.addEventListener("input",function(){
    validateCategory();
});

productDesc.addEventListener("input",function(){
    validateComment();
});

function validateProductName(){
    var regex = /^[A-Z][a-z0-9]{2,8}$/;
    if(regex.test(productName.value)){
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        validateNameAlertElement.classList.add("d-none");
        emptyNameAlertElement.classList.add("d-none");
        return true;
    }
    else if(productName.value ==""){
        emptyNameAlertElement.classList.remove("d-none");
    }
    else {
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        validateNameAlertElement.classList.remove("d-none");
        emptyNameAlertElement.classList.add("d-none");
        return false;
    }
}

function validatePrice(){
    var regex = /^([1-4][0-9]{4}|50000)$/;
    if(regex.test(productPrice.value)){
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        validatePriceAlertElement.classList.add("d-none");
        emptyPriceAlertElement.classList.add("d-none");
        return true;
    }else if(productPrice.value ==""){
        emptyPriceAlertElement.classList.remove("d-none");
    }
    else{
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        validatePriceAlertElement.classList.remove("d-none");
        emptyPriceAlertElement.classList.add("d-none");
        return false;
    }
}

function validateCategory(){
    var regex = /^(tv|Mobile|screen|electronics)$/;
    if(regex.test(productCategory.value)){
        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid");
        validateCategoryAlertElement.classList.add("d-none");
        emptyCategoryAlertElement.classList.add("d-none");
        return true;
    }else if(productCategory.value ==""){
        emptyCategoryAlertElement.classList.remove("d-none");
    }else{
        productCategory.classList.add("is-invalid");
        productCategory.classList.remove("is-valid");
        validateCategoryAlertElement.classList.remove("d-none");
        emptyCategoryAlertElement.classList.add("d-none");
        return false;
    }
}
function validateComment(){
    
    var regex = /[0-9a-zA-Z\s\W]{10,50}$/;
    if(regex.test(productDesc.value)){
        productDesc.classList.add("is-valid");
        productDesc.classList.remove("is-invalid");
        validateCommentAlertElement.classList.add("d-none");
        return true;
    }else{
        productDesc.classList.add("is-invalid");
        productDesc.classList.remove("is-valid");
        validateCommentAlertElement.classList.remove("d-none");
        return false;
    }
}