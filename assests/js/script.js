
let firstBtn = document.getElementById('firstBtn');
let secBtn = document.getElementById('sectBtn');
let imgInput = document.getElementById('imageInput');
let img = document.getElementById('ima');
function firstUpload(params) {
  imgInput.click();
}
function secUpload(params) {
  img.click();
}
// imgInput.addEventListener('change', function(e) {

//   myCanvas = document.getElementById("Canvas"); // Creates a canvas object
//   preview = document.getElementById("avge"); // Creates a canvas object
//   fixedPre = document.getElementById("avg"); // Creates a canvas object

//   picker(e)
// })
img.addEventListener('change', function(e) {
let imageFile = e.target.files[0]; //here we get the image file
var reader = new FileReader();
reader.readAsDataURL(imageFile);
reader.onloadend = function (e) {
    $("#threed")[0].setAttribute('src', e.target.result) 
}
})