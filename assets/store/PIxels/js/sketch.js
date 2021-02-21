var pi = new Object();
var drawn = false;
var page = 0;

const loadPi = (ini)=>{
	let px = windowWidth * windowHeight;
	for(let i = 0; i < px / 1000; i ++){
		jQuery.ajax({
        url: "https://api.pi.delivery/v1/pi?start=" + (ini + Math.trunc(px * i / 1000)) + "&numberOfDigits=1000" ,
        success: function (result) {
            if (result.isOk == false){
            	alert(result.message);
            }else{
            	pi[i] = result.content;
            }
        }
    });
	}
}
function preload() {
	

	$(document ).ready(()=>{
		let px = windowWidth * windowHeight;
		$("#status").text("Drawing the first " + px + " digits of pi...");
		$("#next").click((evt)=>{
			var pi = new Object();
			drawn = false;
			page = page + 1;
			$("#status").text("Drawing the next " + px + " digits of pi...");
			loadPi(page);

		});
	});
	
	loadPi(page);	
}

function setup() {
  createCanvas(windowWidth, windowHeight);  
}

function draw() {
  let px = windowWidth * windowHeight;

  if(Object.keys(pi).length >= px / 1000 && !drawn){
  	drawn = true;
  	var piStr = "";
  	for(let i = 0; i < px / 1000; i++ ){
  		piStr = piStr + pi[i];
  	}
  	for(let x = 0; x < windowWidth; x++){
  		for(let y = 0; y < windowHeight; y++){
  			let digit = piStr[x * windowHeight + y];
  			if(digit == "0"){
  				stroke(230, 176, 170);
  			}else if(digit == "1"){
				stroke(235, 222, 240);
  			}else if(digit == "2"){
  				stroke(169, 204, 227);
  			}else if(digit == "3"){
  				stroke(163, 228, 215);
  			}else if(digit == "4"){
  				stroke(169, 223, 191);
  			}else if(digit == "5"){
				stroke(249, 231, 159);
  			}else if(digit == "6"){
				stroke(245, 203, 167 );
  			}else if(digit == "7"){	
				stroke(125, 255, 125);
  			}else if(digit == "8"){	
				stroke(213, 219, 219);
  			}else if(digit == "9"){	
				stroke(171, 178, 185);
  			}else{
  				stroke(171, 235, 198);
  			}
  			point(x, y);
  		}  	 
  	}
  	
  }
}