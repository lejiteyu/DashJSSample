/**
 * <!-- https://www.fooish.com/jquery/ jquery教學 -->
 */

var browser = navigator.appName;
 var menuindex=-1;
 var rowNum = 10;
 //建立物件focux tabIndex陣列
 var buttonbarTabIndexArray = [
 						[-1,-1],//contentTitlebar
 						[1,2,3],//playaction
 						[-1],//linebar
 						[11],//progress-bar
 						[21,22,23,24,25]//playaction2
 					 ];
 //建立目前focus 行位物件
 var rowArray = [];					 
 
 if(browser === "Netscape"){//如果瀏覽器是 Netscape or fireFox
 	//開始監聽鍵盤動作
 	document.captureEvents(Event.KEYDOWN);
 	document.onkeydown=function(event){
 		 //目前focus的物件
 		var focusedElement = document.activeElement //[注意]activeElement该属性IE浏览器不支持
 		var tabIndex = focusedElement.tabIndex;//獲得目前focus物件的index
 		showBtnfunction(); //顯示操作欄buttonbar
 		if(tabIndex==-1){
 			tabIndex=1;
 		}
 		if(menuindex==-1){
 			menuindex = tabIndex;
 		}
 		
 		rowArray[whereRow(tabIndex)]=tabIndex;//儲存目前focus位置
 		console.log("目前focus 物件Id :"+menuindex); 
 		 var tabbables = document.getElementById("buttonbar");
 		switch(event.which){
 			case 38: //上
              focusUp(tabIndex);
                break;
            case 40: //下
                // focus next input elements
		       focusDown(tabIndex);
                break;
            case 37: //左(會導致輸入時無法使用左右移)
	             var col = parseInt(tabIndex/rowNum);//除法取整數 //目前focus的行數
	             var finalCol= col;
                 for(var i=0;i<finalCol;i++){//判斷有多少物件是不被列入計算的
                    var obj = tabbables.children[i].children[0];//如果第一個物件為不能focus (tabIndex===-1) ;判斷該行不需要計算
                    if(obj.tabIndex===-1){
                    	col++;
                    }
                 }
                 var maxIndex = tabbables.children[col].childElementCount;//目前focus的行數有多少物件
              	 var minIndex = tabbables.children[col].children[0].tabIndex;//最左邊物件的tabIndex
              	 for(var i=0;i<maxIndex;i++){
                    	 minIndex = tabbables.children[col].children[i].tabIndex;
                    	 if(colMaxIndex!==-1){
                    	 	break;
                    	 }
                    }
	             tabIndex--;
	             if(tabIndex<minIndex){
                	tabIndex=minIndex;
                 }
                focusObject(tabIndex);
                break;
            case 39: //右(會導致輸入時無法使用左右移)
                    var col = whereRow(tabIndex);
                    var maxIndex = tabbables.children[col].childElementCount;//目前focus的行數有多少物件
                    //最右邊物件的tabIndex
                    var colMaxIndex=tabbables.children[col].children[maxIndex-1].tabIndex;
                    for(var i=maxIndex-1;i>=0;i--){
                    	 colMaxIndex = tabbables.children[col].children[i].tabIndex;
                    	 if(colMaxIndex!==-1){
                    	 	break;
                    	 }
                    }
                    tabIndex++;
			        if(tabIndex>=colMaxIndex){
			        	if(colMaxIndex!==-1)
					       	tabIndex = colMaxIndex;
			        }
		       		focusObject(tabIndex);
                break;
            default:
                return;
 		}
 	}
 }
 /**
  * 應該使用hashMap 作儲存比對 會比較快！
  * Java和JavaScript內的HashMap用法
  * Ref: http://kimdicks.blogspot.com/2016/08/javajavascripthashmap.html
  * 
  *
  * @param {} tabIndex
  * @return {Boolean}
  */
 function focusUp(tabIndex){
 	if (tabIndex >= 0) {
	 	var rowLen = buttonbarTabIndexArray.length;
	 	for(var i=0;i<rowLen;i++){
	 		var array = buttonbarTabIndexArray[i];
	 		var colLen = array.length;
	 		for(var j=0;j<colLen;j++){
	 			console.log("i:"+i+" j:"+j);
	 			var obj= array[j];
	 			if(obj==tabIndex){
	 				var nextFocus;
			 		var tabbables = document.getElementById("buttonbar");
			 		if(i>0){
			 			var row=i-1;
				 		var childTab = rowArray[row];
				 		if(childTab==-1){
					 		while(childTab==-1){
					 			row=row-1;
					 			if(row<0){
					 				return true;
					 			}else{
					 				childTab = rowArray[row];
					 			}
					 		}
				 		}
				 		rowArray[row] = focusObject(childTab);
				        return true;
			 		}
	 			}
	 		}
	 	}
        return ;
	}
 }
 
 function whereRow(tabIndex){
 	if (tabIndex >= 0) {
	 	var rowLen = buttonbarTabIndexArray.length;
	 	for(var i=0;i<rowLen;i++){
	 		var array = buttonbarTabIndexArray[i];
	 		var colLen = array.length;
	 		for(var j=0;j<colLen;j++){
	 			console.log("i:"+i+" j:"+j);
	 			var obj= array[j];
	 			if(obj==tabIndex){
	 				return i;
	 			}
	 		}
	 	}
 	}			
 }
 function focusDown(tabIndex){
 	if (tabIndex >= 0) {
	 	var rowLen = buttonbarTabIndexArray.length;
	 	for(var i=0;i<rowLen;i++){
	 		var array = buttonbarTabIndexArray[i];
	 		var colLen = array.length;
	 		for(var j=0;j<colLen;j++){
	 			console.log("i:"+i+" j:"+j);
	 			var obj= array[j];
	 			if(obj===tabIndex){
	 				var nextFocus;
			 		var tabbables = document.getElementById("buttonbar");
			 		if(i>0){
			 			var row=i+1;
				 		var childTab = rowArray[row];
				 		
				 		if(childTab==-1){
					 		while(childTab===-1){
					 			row=row+1;
					 			if(row>rowLen){
					 				return true;
					 			}else{
					 				childTab = rowArray[row];
					 			}
				 			}
				 		}
				 		rowArray[row] = focusObject(childTab);
				 		
				        return true;
			 		}
	 			}
	 		}
	 	}
        return ;
	}
 }
 function focusObject(tabIndex){
 	if (tabIndex >= 0) {
	 	var rowLen = buttonbarTabIndexArray.length;
	 	for(var i=0;i<rowLen;i++){
	 		var array = buttonbarTabIndexArray[i];
	 		var colLen = array.length;
	 		for(var j=0;j<colLen;j++){
	 			console.log("i:"+i+" j:"+j);
	 			var obj= array[j];
	 			if(obj===tabIndex){
	 				var nextFocus;
			 		var tabbables = document.getElementById("buttonbar");
			 		var childTab = tabbables.children[i];
			 		nextFocus = childTab.children[j];
			 		nextFocus.focus(); //if it's the one we want, focus it and exit the loop
			        menuindex = obj;
			        return obj;
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
    var rowLen = buttonbarTabIndexArray.length;
 	for(var i=0;i<rowLen;i++){
 		var obj = buttonbarTabIndexArray[i];
 		var v= obj[0];
 		rowArray.push(v);
 		console.log("rowArray obj:"+v);
 		
 	}
 	for(var r in rowArray){
		console.log("rowArray:"+rowArray[r]);
 	}
})();

function HideBtnfunction(){
	//if(document.getElementById("buttonbar").style.display !== "none")
	//	document.getElementById("buttonbar").style.display ="none";
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