/**
 * 
 */
 var browser = navigator.appName;
 var menuindex=-1;
 if(browser === "Netscape"){//如果瀏覽器是 Netscape or fireFox
 	//開始監聽鍵盤動作
 	document.captureEvents(Event.KEYDOWN);
 	document.onkeydown=function(event){
 		 //目前focus的物件
 		var focusedElement = document.activeElement //[注意]activeElement该属性IE浏览器不支持
 		showBtnfunction();
 		if(menuindex===-1){
 			menuindex = tabIndex;
 		}
 		switch(event.which){
 			case 38: //上
               
                break;
            case 40: //下
                // focus next input elements
		       
                break;
            case 37: //左(會導致輸入時無法使用左右移)
                
                break;
            case 39: //右(會導致輸入時無法使用左右移)
                 
               
                break;
            default:
                return;
 		}
 		
 	}
 }
 
 var player ;
(function(){
    var url = "http://act1.video.friday.tw/horigin/apptest/manifest.mpd";//"https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd";//http://act1.video.friday.tw/horigin/apptest/manifest.mpd
    player = dashjs.MediaPlayer().create();
    player.initialize(document.querySelector("#videoPlayer"), url, true);
    window.setTimeout(HideBtnfunction,5000);
})();

function HideBtnfunction(){
	if(document.getElementById("buttonbar").style.display !== "none")
	document.getElementById("buttonbar").style.display ="none";
}

function showBtnfunction(){
	if(document.getElementById("buttonbar").style.display === "none")
		document.getElementById("buttonbar").style.display ="block";
	document.getElementById("textBox").focus();
	window.setTimeout(HideBtnfunction,5000);
}

function play(){
	console.log("play btn onclick");
	if(player.isReady()){
    	if(player.isPaused()){
    		console.log("video play");
    		player.play();
    		document.getElementById("img_play").src="img/player/icon_pause.svg";
    	}
    	else{
    		console.log("video pause");
    		player.pause();
    		document.getElementById("img_play").src="img/player/icon_play.svg";
    	}
    }
}