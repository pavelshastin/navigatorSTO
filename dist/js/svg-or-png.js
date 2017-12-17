


// if(Modernizr.svg) { 

// 	function getXmlHttp(){
// 	  var xmlhttp;
// 	  try {
// 	    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
// 	  } catch (e) {
// 	    try {
// 	      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
// 	    } catch (E) {
// 	      xmlhttp = false;
// 	    }
// 	  }
// 	  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
// 	    xmlhttp = new XMLHttpRequest();
// 	  }
// 	  return xmlhttp;
// 	}



	
// 	var elem = document.createElement("svg"); 
// 		elem.setAttribute("xmlns", "http://www.w3.org/2000/svg"); 
// 		elem.setAttribute("style", "display: none;"); 
		 
// 	var req = getXmlHttp();
// 	req.open('GET', './images/icons.svg', true); 
	
// 	req.onreadystatechange = function() {
// 		  if (req.readyState == 4) {
// 		     if(req.status == 200) {
// 		     	elem.innerHTML = req.responseText;
// 		       	document.body.prepend(elem);
// 			 }
// 		  }
// 		};
// 	req.send(null); 	

// } else {

	var link = document.createElement('link');
		link.setAttribute('href', './css/sprites.css');
		link.setAttribute('type', 'text/css');
		link.setAttribute('rel', 'stylesheet');

	document.head.appendChild(link);
// }