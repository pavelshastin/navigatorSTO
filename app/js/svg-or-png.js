
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

	function checkboxHandler(event) {
		var checkbox = this.getElementsByTagName("input")[0];

		if (!checkbox.hasAttribute("checked")) {
			
			this.classList.add("checked");
		} else {

			this.classList.remove("checked");	
		}
	}



	function dropdownHandler(event) {


	}

	var checkConts = Array.prototype.slice.call(document.getElementsByClassName("input_checkbox"), 0);
	

	var dropdownConts = Array.prototype.slice.call(document.querySelectorAll(".select_input"), 0);

	checkConts.map(function(item){
		item.onclick = checkboxHandler;
	})


	console.dir(dropdownConts);

	dropdownConts.map(function(item){
		var arrow_area = item.querySelector(".arrow_area");
		var arrow = arrow_area.querySelector("div[class^=arrow_]");
		var list = item.querySelector("ul");
		var field = item.querySelector("input[type='text']");

		
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

			var list_item = event.target.textContent;
			field.value = list_item;
			arrow_area.click();
		}
		
		
	})




}, false);