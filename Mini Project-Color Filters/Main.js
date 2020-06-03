var image=null;
var image1=null;
var image2=null;
var image3=null;
var fileinput;
var imgcanvas = document.getElementById("can");
var imgcanvasAnon = document.getElementById("canAnon");

function chooseFiles(){
  
  fileinput = document.getElementById("finput");
  document.getElementById("textInput").value=fileinput.value;
}

//create multiple images for different filters if overlap is not chosen
function uploadIMG(){
  image = new SimpleImage(fileinput);
  image1 = new SimpleImage(fileinput);
  image2 = new SimpleImage(fileinput);
  image3 = new SimpleImage(fileinput);
  image.drawTo(imgcanvas);
  clearAnon();
}

//reset image by redrawing to second canvas
function reset(){
  image = new SimpleImage(fileinput);
  image1 = new SimpleImage(fileinput);
  image2 = new SimpleImage(fileinput);
  image.drawTo(imgcanvasAnon);
}

//function to check if the filters can overlap with each other
function checkOverlay(){
  return(document.getElementById("overlay").checked == true);
}

//gray filter implementation
function makeGrey(){
  if(checkOverlay())
    doGray(image);
  else
    doGray(image1); 
}

//gray filter algorithm
function doGray(img){
  for (var pixel of img.values()){
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setBlue(avg);
    pixel.setGreen(avg);
  }
  img.drawTo(imgcanvasAnon);
}

//function to clear canvas(not used, for testing)
function clearAnon(){
  var c = document.getElementById("canAnon");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, image.getWidth(), image.getHeight());
  
}

//red filter implementation
function makeRed(){
  if(checkOverlay())
    doRed(image);
  else
    doRed(image2);
}

//red filter algorithm
function doRed(img){
  for (var pixel of img.values()){
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if (avg<128){
      pixel.setRed(avg*2);
      pixel.setBlue(0);
      pixel.setGreen(0);
    }
    else{
      pixel.setRed(255);
      pixel.setBlue(2*avg-255);
      pixel.setGreen(2*avg-255);
    }
    
  }
  img.drawTo(imgcanvasAnon)
}

//rainbow filter implementation
function makeRainbow(){
  if(checkOverlay())
    doRainbow(image);
  else
    doRainbow(image3);
}

//rainbow filter algorithm
function doRainbow(img){
  var section = img.getHeight()/7;

  for (var pixel of img.values()){
      var imgWidth = pixel.getY();
      if (imgWidth<=section){
          setRedFilter(pixel);
      }
      if (imgWidth>section && imgWidth<=section*2){
          setOrangeFilter(pixel);
      }
      if (imgWidth>section*2 && imgWidth<=section*3){
          setYellowFilter(pixel);
      }
      if (imgWidth>section*3 && imgWidth<=section*4){
          setGreenFilter(pixel);
      }
      if (imgWidth>section*4 && imgWidth<=section*5){
          setBlueFilter(pixel);
      }
      if (imgWidth>section*5 && imgWidth<=section*6){
          setIndigoFilter(pixel);
      }
      if (imgWidth>section*6){
          setVioletFilter(pixel);
      }
  }
  
  img.drawTo(imgcanvasAnon);  
}

function setRedFilter(pixel){
  var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if (avg<128){
      pixel.setRed(avg*2);
      pixel.setBlue(0);
      pixel.setGreen(0);
    }
    else{
      pixel.setRed(255);
      pixel.setBlue(2*avg-255);
      pixel.setGreen(2*avg-255);
    }
}

function setOrangeFilter(pixel){
  var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if (avg<128){
      pixel.setRed(avg*2);
      pixel.setBlue(0);
      pixel.setGreen(0.8*avg);
    }
    else{
      pixel.setRed(255);
      pixel.setBlue(2*avg-255);
      pixel.setGreen(1.2*avg-51);
    }
}

function setYellowFilter(pixel){
  var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if (avg<128){
      pixel.setRed(avg*2);
      pixel.setGreen(avg*2);
      pixel.setBlue(0);
      
    }
    else{
      pixel.setRed(255);
      pixel.setGreen(255);
      pixel.setBlue(2*avg-255);
      
    }
}

function setGreenFilter(pixel){
  var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if (avg<128){
      pixel.setRed(0);
      pixel.setGreen(avg*2);
      pixel.setBlue(0);
      
    }
    else{
      pixel.setRed(2*avg-255);
      pixel.setGreen(255);
      pixel.setBlue(2*avg-255);
      
    }
}

function setBlueFilter(pixel){
  var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if (avg<128){
      pixel.setRed(0);
      pixel.setGreen(0);
      pixel.setBlue(2*avg);
      
    }
    else{
      pixel.setRed(2*avg-255);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(255);
      
    }
}

function setIndigoFilter(pixel){
  var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if (avg<128){
      pixel.setRed(0.8*avg);
      pixel.setGreen(0);
      pixel.setBlue(2*avg);
      
    }
    else{
      pixel.setRed(1.2*avg-51);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(255);
      
    }
}

function setVioletFilter(pixel){
  var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if (avg<128){
      pixel.setRed(1.6*avg);
      pixel.setGreen(0);
      pixel.setBlue(1.6*avg);
      
    }
    else{
      pixel.setRed(0.4*avg+153);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(0.4*avg+153);
      
    }
}

