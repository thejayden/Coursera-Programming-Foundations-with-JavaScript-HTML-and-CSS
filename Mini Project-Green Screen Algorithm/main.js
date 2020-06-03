var fimage=null;
var bimage=null;
var fimgcanvas = document.getElementById("can1");
var bimgcanvas = document.getElementById("can2");
var opcanvas = document.getElementById("can3");

function uploadIMG(){
  var x = document.getElementsByClassName("imgbtns")[0].id;
  if (x =="finput"){
    var fileinput = document.getElementById("finput");
    fimage = new SimpleImage(fileinput);
    fimage.drawTo(fimgcanvas);  
  } 
  else{
    var fileinput2 = document.getElementById("binput");
    bimage = new SimpleImage(fileinput2);
    bimage.drawTo(bimgcanvas);  
  }
}

function uploadForeground(){
  var fileinput = document.getElementById("finput");
  fimage = new SimpleImage(fileinput);
  fimage.drawTo(fimgcanvas);
}

function uploadBackground(){
  var fileinput = document.getElementById("binput");
  bimage = new SimpleImage(fileinput);
  bimage.drawTo(bimgcanvas);
}

function greenScreen(){
  //check if image loaded
  if (fimage==null||bimage==null){
    document.getElementById("div1").innerHTML = "please choose files";
  }
  //reject if foreground image is larger 
  else if (fimage.getWidth()>bimage.getWidth()|| fimage.getHeight()>bimage.getHeight()){
    document.getElementById("div1").innerHTML = "please choose a background image larger in size than foreground image";
  }
  //green screen algo
  else{
    document.getElementById("div1").innerHTML = ""
    var newImage = new SimpleImage(fimage.getWidth(),fimage.getHeight());
    for (var fgPx of fimage.values()){
      if ((fgPx.getGreen() > 180 && fgPx.getRed()<180 && fgPx.getBlue()<180) || (fgPx.getGreen() > fgPx.getRed()+fgPx.getBlue())){
        var x = fgPx.getX();
        var y = fgPx.getY();
        var bgPx = bimage.getPixel(x,y);
        newImage.setPixel(x,y,bgPx);
      }
      else {
        var x = fgPx.getX();
        var y = fgPx.getY();
        newImage.setPixel(x,y,fgPx);
      }
    }
    newImage.drawTo(opcanvas);
  }
}