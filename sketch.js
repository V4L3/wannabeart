
let video;
let style1;
let style2;
let style3;
let style4;
let style5;
let style6;
let transferBtn, saveBtn, againBtn;
let border;
let fotoTaken;
let newImage;
var can;
let transferred;
let loading;
let mobilenet;
var title;

function modelReady(){
    console.log('Model is Ready!');
}

function modelLoaded() {
  // Check if both models are loaded
  if(style1.ready && style2.ready){
    console.log("ready");
  }
}

function setup(){
    loading = document.getElementById("loading");
    loading.style.opacity = "0";
    newImage = new Image();
    fotoTaken = false;
    transferred = false;
    can = createCanvas(700, 700,);
    can.parent('rahmenContainer');
    video = createCapture(VIDEO)
    video.hide();
    background(0);

    //Models
    style1 = ml5.styleTransfer('models/wave', modelLoaded);
    style2 = ml5.styleTransfer('models/udnie', modelLoaded);
    style3 = ml5.styleTransfer('models/mona', modelLoaded);
    style4 = ml5.styleTransfer('models/pollock', modelLoaded);
    style5 = ml5.styleTransfer('models/aldunate1', modelLoaded);
    style6 = ml5.styleTransfer('models/new', modelLoaded);
    mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);

    //Buttons
    transferBtn = select('#camerasound');
    transferBtn.mousePressed(transferImages);
    saveBtn = select('#saveBtn');
    saveBtn.mousePressed(save => {
        saveCanvas(can, "myArt", "jpg");
    })
    againBtn = select('#goAgain');
    againBtn.mousePressed(reload =>{
      location.reload();
    })


    
     border = loadImage("img/rahmen1.png"); 

}

function draw(){
    if(!fotoTaken){
      push();
      translate(video.width*0.9,0);
      scale(-1,1); 
      image(video,-100,110);
      pop();
      image(border,0, 0, 700, 700);
    }else if(transferred){
      image(newImage,0, 0, 700, 700);
      image(border,0, 0, 700, 700);
    } else{
      // background(255);
    }
    
    

}

function transferImages() {
  console.log('Applying Style Transfer...!');
  imgSrc = canvas.toDataURL('image/png');
  let newImg = new Image(700,700);;
  newImg.src = imgSrc;
  fotoTaken = true;
  let styleFloat = random(1,6)
  let style = Math.floor(styleFloat);
  // let style = 2;
  loading.style.opacity = "100";
  console.log(style);

  setTimeout(() => {
  
    
    switch(style){
      case 1:
        transferStyle1(newImg);
      break;
      case 2:
        transferStyle2(newImg);
      break;
      case 3:
        transferStyle3(newImg);
      break;
      case 4:
        transferStyle4(newImg);
      break;
      case 5:
        transferStyle5(newImg);
      break;
      case 6:
        transferStyle6(newImg);
      break;

    }
      
  

  }, 100);

  console.log('Done!');
}

function transferStyle1(newImg){
  console.log("style1");
  style1.transfer(newImg, function(err, result) {
    //createImg(result.src).parent('rahmenContainer');
    newImage = createImg(result.src);
    newImage.hide();
    transferred = true;
    loading.style.opacity = "0";
    });

    addPrice();
}

function transferStyle2(newImg){
  console.log("style2");
  style2.transfer(newImg, function(err, result) {
    //createImg(result.src).parent('rahmenContainer');
    newImage = createImg(result.src);
    newImage.hide();
    transferred = true;
    loading.style.opacity = "0";
    });
    addPrice();
}

function transferStyle3(newImg){
  console.log("style3");
  style3.transfer(newImg, function(err, result) {
    //createImg(result.src).parent('rahmenContainer');
    newImage = createImg(result.src);
    newImage.hide();
    transferred = true;
    loading.style.opacity = "0";
    });
    addPrice();
}

function transferStyle4(newImg){
  console.log("style4");
  style4.transfer(newImg, function(err, result) {
    //createImg(result.src).parent('rahmenContainer');
    newImage = createImg(result.src);
    newImage.hide();
    transferred = true;
    loading.style.opacity = "0";
    });
    addPrice();
}

function transferStyle5(newImg){
  console.log("style5");
  style5.transfer(newImg, function(err, result) {
    //createImg(result.src).parent('rahmenContainer');
    newImage = createImg(result.src);
    newImage.hide();
    transferred = true;
    loading.style.opacity = "0";
    });
    addPrice();
}

function transferStyle6(newImg){
  console.log("style6");
  style6.transfer(newImg, function(err, result) {
    //createImg(result.src).parent('rahmenContainer');
    newImage = createImg(result.src);
    newImage.hide();
    transferred = true;
    loading.style.opacity = "0";
    });
    addPrice();
}


function addPrice(){
  
  var div = document.createElement("div");
  div.style.marginLeft = "20px";
  div.style.color = "white";
  div.style.fontFamily = "VG5000";
  div.style.fontSize = "30pt";
  div.style.lineHeight = "1.5em";

  mobilenet.predict(can, 1, function(err, results) {
    
    if (results[0].className.indexOf(',') > -1)
    {
      //console.log("found comma");
      title = results[0].className.split(',')[0];
    } else{
      //console.log(results[0].className);
      title = results[0].className;
    }
    div.innerHTML = "<span class='italic'>«" + title + "»</span></br>Estimated Value: </br>" + random(1,10).toFixed(3)*10000000 + "$";
  });
  
  

  document.getElementById("rahmenContainer").appendChild(div);

}