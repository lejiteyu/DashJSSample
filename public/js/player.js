/**
 * <!-- https://www.fooish.com/jquery/ jquery教學 -->
 */

var browser = navigator.appName;
 var menuindex=-1;
 var rowNum = 10;
 if(browser === "Netscape"){//如果瀏覽器是 Netscape or fireFox
 	//開始監聽鍵盤動作
 	document.captureEvents(Event.KEYDOWN);
 	document.onkeydown=function(event){
 		 //目前focus的物件
 		var focusedElement = document.activeElement //[注意]activeElement该属性IE浏览器不支持
 		var tabIndex = focusedElement.tabIndex;//獲得目前focus物件的index
 		showBtnfunction(); //顯示操作欄buttonbar 		
 		if(menuindex===-1){
 			menuindex = tabIndex;
 		}
 		console.log("目前focus 物件Id :"+menuindex); 
 		 var tabbables = document.getElementById("buttonbar");
 		switch(event.which){
 			case 38: //上
               tabIndex-=rowNum;
              if(tabIndex<0){
                	tabIndex=1;
              }
              focusObject(tabIndex);
                break;
            case 40: //下
                // focus next input elements
		       var maxlen = tabbables.childElementCount;
		       var col = parseInt(tabIndex/rowNum);//除法取整數
		       if(col<maxlen-1){
		       	 tabIndex+=rowNum;
		       }
		       focusObject(tabIndex);
                break;
            case 37: //左(會導致輸入時無法使用左右移)
	             var col = parseInt(tabIndex/rowNum);//除法取整數 //目前focus的行數
              	 var minIndex = tabbables.children[col].children[0].tabIndex;//最左邊物件的tabIndex
	             tabIndex--;
	             if(tabIndex<minIndex){
                	tabIndex=minIndex;
                 }
                focusObject(tabIndex);
                break;
            case 39: //右(會導致輸入時無法使用左右移)
                    tabIndex++;
                    var col = parseInt(tabIndex/rowNum);//除法取整數 //目前focus的行數
                    var obj = tabbables.children[col].children[0];//如果第一個物件為不能focus (tabIndex===-1) ;判斷該行不需要計算
                    if(obj.tabIndex===-1){
                    	col++;
                    }
                    var maxIndex = tabbables.children[col].childElementCount;//目前focus的行數有多少物件
                    var colMaxIndex = tabbables.children[col].children[maxIndex-1].tabIndex;//最右邊物件的tabIndex
			        if(tabIndex>=colMaxIndex){
				       	tabIndex = colMaxIndex;
			        }
		       		focusObject(tabIndex);
                break;
            default:
                return;
 		}
 	}
 }
 
 function focusObject(tabIndex){
 	
 	if (tabIndex >= 0) {
		var nextFocus;
		 var tabbables = document.getElementById("buttonbar");
	    for(var i=0; i<tabbables.childElementCount; i++) { //loop through each element
	    	var childTab = tabbables.children[i];
	    	var childlen = childTab.childElementCount;
	    	for(var j=0;j<childlen;j++){
		        if(childTab.children[j].tabIndex == (tabIndex)) { //check the tabindex to see if it's the element we want
		        	nextFocus = childTab.children[j];
		            nextFocus.focus(); //if it's the one we want, focus it and exit the loop
		            menuindex = j;
		            return true;
		        }
	    	}
	    }
        return ;
	}
 }
 
 var player ;
 var HideTime;
 //開啟網頁執行 類似 main()
(function(){
    var url = "http://act1.video.friday.tw/horigin/apptest/manifest.mpd";//"https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd";//http://act1.video.friday.tw/horigin/apptest/manifest.mpd
    player = dashjs.MediaPlayer().create();
    player.initialize(document.querySelector("#videoPlayer"), url, true);
    HideTime = window.setTimeout(HideBtnfunction,5000);
})();

function HideBtnfunction(){
	if(document.getElementById("buttonbar").style.display !== "none")
		document.getElementById("buttonbar").style.display ="none";
}

function showBtnfunction(){
	clearTimeout(HideTime);//停止HideTime 倒數計時
	//判斷按鈕欄是否顯示
	if(document.getElementById("buttonbar").style.display === "none"){
		document.getElementById("buttonbar").style.display ="block";
		document.getElementById("playBtn").focus();
	}
	HideTime = window.setTimeout(HideBtnfunction,5000);//開始HideTime 倒數計時
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