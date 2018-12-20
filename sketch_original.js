
let video;
let style1;
let style2;
let style3;
let style4;
let style5;
let style6;
let transferBtn;
let img;


function modelReady(){
    console.log('Model is Ready!');
    mobilenet.predict(gotResult);
}

function modelLoaded() {
  // Check if both models are loaded
  if(style1.ready && style2.ready){
    console.log("ready");
  }
}

function setup(){
    createCanvas(300, 300,);
    video = createCapture(VIDEO)
    video.hide();
    background(0);
    style1 = ml5.styleTransfer('models/wave', modelLoaded);
    style2 = ml5.styleTransfer('models/udnie', modelLoaded);
    style3 = ml5.styleTransfer('models/mona', modelLoaded);
    style4 = ml5.styleTransfer('models/pollock', modelLoaded);
    style5 = ml5.styleTransfer('models/aldunate1', modelLoaded);
    style6 = ml5.styleTransfer('models/new', modelLoaded);

    transferBtn = select('#camerasound')
     transferBtn.mousePressed(transferImages);

}

function draw(){
    
    push();
    translate(video.width*0.7,0);
    scale(-0.8,0.8); 
    image(video,0,0);
    pop();


}

function transferImages() {
  console.log('Applying Style Transfer...!');
  imgSrc = canvas.toDataURL('image/png');
  let newImg = new Image(300,300);;
  newImg.src = imgSrc;

  setTimeout(() => {
  
    style1.transfer(newImg, function(err, result) {
      createImg(result.src).parent('styleA');
      });
  
    style6.transfer(newImg, function(err, result) {
       createImg(result.src).parent('styleA');
    });
  
    // style3.transfer(newImg, function(err, result) {
    //    createImg(result.src).parent('styleA');
    // });    
  
    // style4.transfer(newImg, function(err, result) {
    //  createImg(result.src).parent('styleA');
    //  });
  }, 500);

  console.log('Done!');
}

