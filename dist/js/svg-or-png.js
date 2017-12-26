
if(Modernizr.svg) { 

	function getXmlHttp(){
	  var xmlhttp;
	  try {
	    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	  } catch (e) {
	    try {
	      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    } catch (E) {
	      xmlhttp = false;
	    }
	  }
	  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	    xmlhttp = new XMLHttpRequest();
	  }
	  return xmlhttp;
	}



	
	var elem = document.createElement("svg"); 
		elem.setAttribute("xmlns", "http://www.w3.org/2000/svg"); 
		elem.setAttribute("style", "display: none;"); 
		 
	var req = getXmlHttp();
	req.open('GET', './images/icons.svg', true); 
	
	req.onreadystatechange = function() {
		  if (req.readyState == 4) {
		     if(req.status == 200) {
		     	elem.innerHTML = req.responseText;
		       	document.body.prepend(elem);
			 }
		  }
		};
	req.send(null); 	

} else {

	var link = document.createElement('link');
		link.setAttribute('href', './css/sprites.css');
		link.setAttribute('type', 'text/css');
		link.setAttribute('rel', 'stylesheet');

	document.head.appendChild(link);
}





document.addEventListener("DOMContentLoaded", function() {
	var remBase = parseInt(window.getComputedStyle(document.body).fontSize);
	console.log("remBase: " + remBase);
	
	var checkConts = Array.prototype.slice.call(document.querySelectorAll(".input_checkbox"), 0);
	var dropdownConts = Array.prototype.slice.call(document.querySelectorAll(".select_input"), 0);
	var buttonAreas = Array.prototype.slice.call(document.querySelectorAll("div[class*='_buttons']"), 0);
	var imgConts = Array.prototype.slice.call(document.querySelectorAll("div[class$='__img_container']"), 0);



	imgConts.map(function(imgCont){
		console.log(imgCont.className);
		
		var imageWrap = Array.prototype.slice.call(imgCont.querySelectorAll(".img_wrapper"), 0);
		var imagesCoord = [];
		var leftArrow = imgCont.querySelector("div[class*='__img_arrow_left']");
		var rightArrow = imgCont.querySelector("div[class*='__img_arrow_right']");
		var buttonsCont = imgCont.querySelector("div[class$='__img_container_buttons']");
		var buttons = [];
		var currImage = 0;
		

		console.log("leftArrow: " + leftArrow.className);
		console.log("rightArrow: " + rightArrow.className);
		

		var sumLeft = 0;

		//set the initial "left" coordinates for absolutly positioned images
		for(var i=0; i<imageWrap.length; i++) {

			imageWrap[i].style.left = sumLeft + "px";
			sumLeft += parseInt(window.getComputedStyle(imageWrap[i]).width, 10);

			console.log(sumLeft);
			button = document.createElement("div");
			button.classList.add("radio_button");
			if (i == 0) button.classList.add("active");

			buttons[i] = button;
			buttonsCont.appendChild(button);
		}



		leftArrow.onclick = function(event) {

			if (currImage == 0) return	

			
			for(var i=0; i < imageWrap.length; i++){

				var leftInit = parseInt(imageWrap[i].style.left, 10); 
				var currWidth = parseInt(window.getComputedStyle(imageWrap[currImage-1]).width, 10); //currImage - 1 difference between arrowLeft and arrowRight

				imageWrap[i].style.left = (leftInit + currWidth) + "px";
				
			}			


			buttons[currImage-1].classList.add("active");
			buttons[currImage].classList.remove("active")
			
			currImage--;

		}


		rightArrow.onclick = function(event) {

				if (currImage == imageWrap.length - 1) return
				
				for(var i=0; i < imageWrap.length; i++){
					
					var leftInit = parseInt(imageWrap[i].style.left, 10);
					var currWidth = parseInt(window.getComputedStyle(imageWrap[currImage]).width, 10);  //currImage 

					console.log((leftInit - currWidth) + "px");
					imageWrap[i].style.left = (leftInit - currWidth) + "px";
					
				}			
				

				buttons[currImage+1].classList.add("active");
				buttons[currImage].classList.remove("active")	
				
				currImage++;
		}
		

		buttons.forEach(function(button, i, buttons){

			button.onclick = (function(i){

				return function(event) {
					if (i > currImage) {
						
						while(i > currImage) {
							rightArrow.click();
						}

					} else if (i < currImage) {

						while(i < currImage) {
							leftArrow.click();
						}
					}
				}
			})(i);

		})
	})




	//console.dir(buttonAreas.join("\n"));

	buttonAreas.map(function(buttonArea){

		var buttons = Array.prototype.slice.call(buttonArea.querySelectorAll("*[class*='_buttons_']"), 0);


		console.log(buttons[0]);
		
		buttons.map(function(button){

			button.onmousedown = function(event){
				
				button.classList.add("click");
			}

			button.onmouseup = function(event){
				
				button.classList.remove("click");
			}

		})	

	});


	console.dir(checkConts);

	checkConts.map(function(item){
		
		item.onclick = function(event){

			var checkbox = this.getElementsByTagName("input")[0];

				if (!checkbox.hasAttribute("checked")) {
					
					console.log("checked " + this.className);
					this.classList.add("checked");
					checkbox.setAttribute("checked", "checked")

				} else {
					
					checkbox.removeAttribute("checked")
					this.classList.remove("checked");	
				}

			};
	})




	console.dir(dropdownConts);

	dropdownConts.map(function(item){

		var arrow_area = item.querySelector(".arrow_area");
		var arrow = arrow_area.querySelector("div[class^=arrow_]");
		var list = item.querySelector("ul");
		var field = item.querySelector("input[type='text']");

		

		if(list.classList.contains("service__form_city_items")) {

			field.changeCity = function(event){
				console.log("onchange");

				var city_list = ["ТОЛЬЯТТИ", "САМАРЕ", "СЫЗРАНИ", "ЖИГУЛЕВСКЕ"]
				
				city_list = city_list.filter(function(item){

						return item != field.value;
					});

				list.children[0].textContent = field.value;
				
				for(var i=0; i<city_list.length; i++) {
						list.children[i+1].textContent = city_list[i];
					}
				
				console.dir(list.children);
			}

			console.dir(field);
		
		}


		arrow_area.onclick = function(event){

			if(arrow.classList.contains("arrow_down")) {
				
				//console.dir(item.classList);
				item.classList.add("visible");
				arrow.classList.remove("arrow_down");
				arrow.classList.add("arrow_up");	

			} else if (arrow.classList.contains("arrow_up")) {
				
				//console.dir(item.classList);
				item.classList.remove("visible");
				arrow.classList.remove("arrow_up");
				arrow.classList.add("arrow_down");

			}

		}

		list.onclick = function(event) {

			var list_item = event.target.textContent ? event.target.textContent: field.value;

			//console.log(list_item);
			field.value = list_item;

			if(list.classList.contains("service__form_city_items")) field.changeCity();
			
			arrow_area.click();

		}
		
		
	})




}, false);