
let imgInput = document.getElementById('imageInput');
let img = document.getElementById('image');
let second=document.getElementsByClassName('second')
let myCanvas
let preview
let fixedPre
let color
let firstBtn = document.getElementById('firstBtn');
let secBtn = document.getElementById('sectBtn');
function firstUpload(params) {
  imgInput.click();
}
function secUpload(params) {
  image.click();
}

let currentRgb=document.getElementById('currentRgb');

function picker(e) {
  var flag = 0;
  let width;
  let height;
  let myContext;
  let ctx;
  let fixedCtx;
  let myImage;
  let avg
  let data=[]
 

 if(e.target.files) {
 
  let imageFile = e.target.files[0]; //here we get the image file
  var reader = new FileReader();
  reader.readAsDataURL(imageFile);
  reader.onloadend = function (e) {
    myImage = new Image(); // Creates image object
    myImage.src = e.target.result; // Assigns converted image to image object

    myImage.onload = function(ev) {

    myContext = myCanvas.getContext("2d"); // Creates a contect object
    ctx = preview.getContext("2d");
    fixedCtx = fixedPre.getContext("2d");
    if(myImage.width>=1100&&myImage.width<=1500){
      myCanvas.width=myImage.width*0.5
      myCanvas.height=myImage.height*0.5
      $("border").css('height',myImage.height*0.5)
      $("border1").css('height',myImage.height*0.5)

    }
    else if(myImage.width>=1501&&myImage.width<=1999){
      myCanvas.width=myImage.width*0.4
      myCanvas.height=myImage.height*0.4
      $("border").css('height',myImage.height*0.5)
      $("border1").css('height',myImage.height*0.5)
      // $("border").css('border-right-width',myImage.width*0.8)
    }
    else if(myImage.width<=500){
      myCanvas.width=myImage.width*1
      myCanvas.height=myImage.height*1
      $("border").css('height',myImage.height*1)
      $("border1").css('height',myImage.height*0.5)
    }
    else if(myImage.width>=2000){
      widths=myImage.width*0.2
      heights=myImage.height*0.2
        if(widths>=1300){
          myCanvas.width=widths*0.8
          myCanvas.height=heights*0.8
        }
        // $("border").css('height', myImage.height*0.5)
    }
    else{
      myCanvas.width=myImage.width*0.7
      myCanvas.height=myImage.height*0.7
      $("border").css('height',myImage.height*0.8)
      $("border1").css('height',myImage.height*0.5)
    }
    width=  myImage.naturalWidth;
    height=myImage.naturalHeight;
    if(myImage.width>=1100&&myImage.width<=1500){
      myContext.drawImage(myImage,0,0,width*0.55,height*0.55);
    }
   else if(myImage.width>=1501&&myImage.width<=1999){
      myContext.drawImage(myImage,0,0,width*0.35,height*0.35);
    }
    else if(myImage.width<=500){
      myContext.drawImage(myImage,0,0,width*1,height*1);
    }
    else if(myImage.width>=2000){
      widths=width*0.2
      heights=height*0.2
        if(widths>=1000){
          myContext.drawImage(myImage,0,0,widths*0.5,heights*0.5);
        }
    }
    else{
      myContext.drawImage(myImage,0,0,width*0.6,height*0.6);
    }
    let pixelData=myContext.getImageData( 0, 0,width,height);
      data=pixelData.data;
      myCanvas.addEventListener('mousemove', getpixel)
      myCanvas.addEventListener('click',addBox)
  }
    function getpixel(event) {
      let col=width;
      let { offsetX,offsetY }=event;
      let getPixelColor=getPixelColors(col,offsetX,offsetY);
      color=`RGB(${getPixelColor.red},${getPixelColor.green},${getPixelColor.blue})`;
     
      $('#small').click(function() {

        flag = 1;
      });
      $('#extrasmall').click(function() {
      flag = 2;
      });
      $('#c').click(function() {
      flag = 3;
      });
      $('#default').click(function() {

        flag = 0;
      })
      pixel=color;
      getAverage(event);
    }
    function getPixelColors(col,x,y) {
      let combi=col*x+y;
      let arrayPos=combi*4;
      return{
        red:data[arrayPos],
        green:data[arrayPos+1],
        blue:data[arrayPos+2],
        alpha:data[arrayPos+3]
      };
    }
    function getAverage(event) {
      let cols=width;
      let rows=height;
      myContext.clearRect(0,0,cols,rows);
      if(myImage.width>=1100&&myImage.width<=1500){
        myContext.drawImage(myImage,0,0,width*0.55,height*0.55);
      }
      else if(myImage.width>=1501&&myImage.width<=1999){
        myContext.drawImage(myImage,0,0,width*0.35,height*0.35);
      }
      else if(myImage.width<=500){
        myContext.drawImage(myImage,0,0,width*1,height*1);
      }
      else if(myImage.width>=2000){
        widths=width*0.2
        heights=height*0.2
          if(widths>=1000){
            myContext.drawImage(myImage,0,0,widths*0.5,heights*0.5);
          }
      }
      else{
        myContext.drawImage(myImage,0,0,width*0.6,height*0.6);
      }
      let { offsetX,offsetY }=event;
      const inset=20;
      offssetX=Math.min(offsetX,cols-inset);
      offssetX=Math.max(inset,offsetX);
      offssetY=Math.min(offsetY,rows-inset);
      offssetY=Math.max(offsetY,inset);

      let reds=0;
      let greens=0;
      let blues=0;
      let alphas=0;

      for(let x=-1*inset;x<= inset;x++){
        for(let y=-1*inset;y<= inset;y++){
          let getPixelColor=getPixelColors(cols,offsetY+y,offsetX+x); 
          reds+=getPixelColor.red;
          greens+=getPixelColor.green;
          blues+=getPixelColor.blue
        }
      }
      let nums =41*41;
      let red=Math.round(reds/nums);
      let green=Math.round(greens/nums);
      let blue=Math.round(blues/nums);
       color=`RGB(${red},${green},${blue})`;
       $("#currentRgb").text("Current Color:"+color)

       ctx.fillStyle =color;
       ctx.fillRect(0, 0, 200, 200);

      
      myContext.fillStyle=color;
      myContext.strokeStyle='#FFFFFF';


      avg=color;

      if (flag == 1)
      {
        
        myContext.strokeRect(offsetX-inset,offsetY-inset,20,20);
        myContext.fillRect(offsetX-inset,offsetY-inset,20,20)
      }
      else if(flag == 2){
        myContext.strokeRect(offsetX-inset,offsetY-inset,10,10);
        myContext.fillRect(offsetX-inset,offsetY-inset,10,10)
      }
      else if(flag == 3){
        myContext.strokeRect(offsetX-inset,offsetY-inset,5,5);
        myContext.fillRect(offsetX-inset,offsetY-inset,5,5)
      }
      else if(flag == 0) {
        myContext.strokeRect(offsetX-inset,offsetY-inset,41,41);
        myContext.fillRect(offsetX-inset,offsetY-inset,41,41)
      }
      // myContext.fillRect(offsetX-inset,offsetY-inset,41,41);
    }
    function addBox(ev){
      fixedCtx.fillStyle =color;
      fixedCtx.fillRect(0, 0, 200, 200);

      $(fixedPre)[0].setAttribute('data-label',color)
 
     

    }
  }
  }
}
imgInput.addEventListener('change', function(e) {
  $('#upload').css("display",'none')
  $('#uploads').css("position",'absolute')
  $('#uploads').css("top",130)
  myCanvas = document.getElementById("myCanvas"); // Creates a canvas object
  preview = document.getElementById("current"); // Creates a canvas object
  fixedPre = document.getElementById("curr"); // Creates a canvas object
  picker(e)
  myCanvas.addEventListener('click', function() {
    $("#firstFixed").text(color)
    
   
   }, false);

});

img.addEventListener('change', function(e) { 
  $('#uploads').css("display",'none')
  $('#upload').css("position",'absolute')
  $('#upload').css("top",130)
  myCanvas = document.getElementById("Canvas"); // Creates a canvas object
  preview = document.getElementById("avge"); // Creates a canvas object
  fixedPre = document.getElementById("avg"); // Creates a canvas object

  picker(e)
  myCanvas.addEventListener('click', function() {
    $("#secFixed").text(color)

    // fixedPre.outerHTML += '<div onclick="fir()" id="text"></div>'
   
   }, false);
  

});

