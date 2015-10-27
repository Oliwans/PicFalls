window.onload = function(){
	imglocation('container','box');
	var imgData = {'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'},{'src':'6.jpg'},
							{'src':'7.jpg'},{'src':'8.jpg'},{'src':'9.jpg'},{'src':'10.jpg'},{'src':'11.jpg'},{'src':'12.jpg'},
							{'src':'13.jpg'},{'src':'14.jpg'},{'src':'15.jpg'},{'src':'16.jpg'},{'src':'17.jpg'},{'src':'18.jpg'},
							{'src':'19.jpg'},{'src':'20.jpg'},{'src':'21.jpg'},{'src':'22.jpg'},{'src':'23.jpg'},{'src':'24.jpg'}]}
	window.onscroll = function (){
		if (checkFlag()) {
			var aparents = document.getElementById('container');
			for (var i = 0; i < imgData.data.length; i++) {
				var achildren = document.createElement('div');
				achildren.className = 'box';
				aparents.appendChild(achildren);
				var boximg = document.createElement('div');
				boximg.className = 'box_img';
				achildren.appendChild(boximg);
				var img = document.createElement('img');
				img.src = 'img/'+imgData.data[i].src;
				boximg.appendChild(img);
			};	
		};
		imglocation('container','box');
	}
}

function checkFlag(){
	var aparents = document.getElementById('container');
	var achildren = getChildrenElements(aparents,'box')
	var lastPicHeight = achildren[achildren.length - 1].offsetTop;
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
	if (lastPicHeight < scrollTop + pageHeight) {
		return true;
	};
}

function imglocation(parents,children){
	var aparents = document.getElementById(parents);
	var achildren = getChildrenElements(aparents,children);	
	var everyWidth = achildren[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth / everyWidth);
	aparents.style.cssText = 'width:' + cols*everyWidth + 'px; margin: 0 auto';

	var boxHeights = [];
	for (var i = 0; i < achildren.length; i++) {
		if (i < cols) {
			boxHeights.push(achildren[i].offsetHeight);
		}else{
			var minHeight = Math.min.apply(null,boxHeights);
			var index = localPicIndex(boxHeights,minHeight);
			achildren[i].style.position = 'absolute';
			achildren[i].style.top = minHeight + 'px';
			achildren[i].style.left = achildren[index].offsetLeft + 'px';
			boxHeights[index] = boxHeights[index] + achildren[i].offsetHeight; 
		}
		// 	document.getElementByClassName('box').onmouseover = function() {
		// 	this.style.width = '200px';
		// 	this.style.height = 'auto';
		// };
		// 	document.getElementByClassName('box').onmouseout = function() {
		// 	this.style.width = '150px';
		// 	this.style.height = 'auto';
		// };
	};

}

function localPicIndex(boxHeights,minHeight){
	for (var i in boxHeights) {
		if (boxHeights[i] === minHeight) {
			return i;
		};
	};
}

function getChildrenElements(parents,children){
	var childrenArr = [];
	var allContent = parents.getElementsByTagName('*');
	for (var i = 0; i < allContent.length; i++) {
		if (allContent[i].className === children) {
			childrenArr.push(allContent[i]);
		};
	};
	return childrenArr;
}