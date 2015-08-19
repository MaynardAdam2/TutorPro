// Last modified: 22 Aug 2006

function prepareRollovers() {


   if ( !document.getElementsByTagName ) return false;  
   
   // check all the <img> elements
   var images = document.getElementsByTagName("img");
   var imgOFF = new Array();
   var imgON  = new Array();
   
   for ( var i=0; i < images.length; i++ ) {
         
      // for all <img> elements where class="rollover"...
      // NOTE: IE does not suppport getAttribute("class"), for reasons unknown
      if ( images[i].className == "rollover" ) {
			
         // and the default image is the 'OFF' version
         if ( images[i].src.indexOf('_OFF') != -1 ) {
			
            imgOFF[i] = new Image();
            imgON[i]  = new Image();
		 
            var srcOFF = images[i].getAttribute('src');
            // this is a bit indirect, but it forces the browser to pre-load the images
			imgOFF[i].src = srcOFF;
            // assume that for each image with '_OFF' in the filename
            // there is a corresponding image with '_ON' in the filename
			imgON[i].src  = srcOFF.replace( /_OFF/, '_ON');
						
            // set non-standard attributes that can be accessed
            // in the anonymous functions below
            images[i].setAttribute('offsrc', imgOFF[i].src);
            images[i].setAttribute('onsrc', imgON[i].src);
		   
            images[i].onmouseover = function() {
		       this.setAttribute('src', this.getAttribute('onsrc'));
            }

            images[i].onmouseout = function() {
               this.setAttribute('src', this.getAttribute('offsrc'));
            }
		   
		 } else {
		   // ignore images in ON state
		 }
	  }
   }

   // check all form buttons
   var buttons = document.getElementsByTagName("input");
   var buttonOFF = new Array();
   var buttonON  = new Array();
   
   for ( var i=0; i < buttons.length; i++ ) {
         
      // for all <img> elements where class="rollover"...
      // NOTE: IE does not suppport getAttribute("class"), for reasons unknown
      if ( buttons[i].type == "image" && buttons[i].className == "rollover" ) {
			
         // and the default image is the 'OFF' version
         if ( buttons[i].src.indexOf('_OFF') != -1 ) {
			
            buttonOFF[i] = new Image();
            buttonON[i]  = new Image();
		 
            var srcOFF = buttons[i].getAttribute('src');
            // this is a bit indirect, but it forces the browser to pre-load the images
			buttonOFF[i].src = srcOFF;
            // assume that for each image with '_OFF' in the filename
            // there is a corresponding image with '_ON' in the filename
			buttonON[i].src  = srcOFF.replace( /_OFF/, '_ON');
						
            // set non-standard attributes that can be accessed
            // in the anonymous functions below
            buttons[i].setAttribute('offsrc', buttonOFF[i].src);
            buttons[i].setAttribute('onsrc', buttonON[i].src);
		   
            buttons[i].onmouseover = function() {
		       this.setAttribute('src', this.getAttribute('onsrc'));
            }

            buttons[i].onmouseout = function() {
               this.setAttribute('src', this.getAttribute('offsrc'));
            }
		   
		 } else {
		   // buttons not expected in ON state
		 }
	  }
   }

}

function goToPar(theForm) {

var target = theForm.paragraph.value.replace(/\s+/g, '');
var edition = theForm.edition.value;

var total_chap;
var paragraphs;

if (edition == "15") {
   total_chap = 18;

   paragraphs = Array(18);
   paragraphs['1'] = 191;
   paragraphs['2'] = 103;
   paragraphs['3'] = 43;
   paragraphs['4'] = 98;
   paragraphs['5'] = 209;
   paragraphs['6'] = 130;
   paragraphs['7'] = 90;
   paragraphs['8'] = 210;
   paragraphs['9'] = 71;
   paragraphs['10'] = 154;
   paragraphs['11'] = 93;
   paragraphs['12'] = 63;
   paragraphs['13'] = 78;
   paragraphs['14'] = 66;
   paragraphs['15'] = 76;
   paragraphs['16'] = 120;
   paragraphs['17'] = 359;
   paragraphs['18'] = 149;

}
else if (edition == "16") {
   total_chap = 16;

   paragraphs = Array(16);
   paragraphs['1'] = 117;
   paragraphs['2'] = 136; 
   paragraphs['3'] = 85;
   paragraphs['4'] = 101;
   paragraphs['5'] = 230;
   paragraphs['6'] = 126;
   paragraphs['7'] = 85;
   paragraphs['8'] = 197;
   paragraphs['9'] = 66;
   paragraphs['10'] = 72;
   paragraphs['11'] = 154;
   paragraphs['12'] = 67;
   paragraphs['13'] = 79;
   paragraphs['14'] = 317;
   paragraphs['15'] = 55;
   paragraphs['16'] = 145;
   paragraphs['a'] = 50;  //for app01
   paragraphs['A'] = 50;  //for app01

}

   var pattern = /^(\d+|a|A)\.\d+$/;  //for app01

   if ( pattern.test(target) ) {

   
	  var part = target.split(".");
	  
	  var chapter = part[0];
	  chapter = chapter.replace(/^0+/, ''); 


	  if (paragraphs[chapter] == undefined) {  //for app01
	     
             if (edition == "15") { 
                 if (chapter.match(/^a|A$/)) { 
                        message = "There is no appendix paragraphs for 15th edition. Try a chapter number between 1 and " + total_chap + " (e.g., 3.14).";
                 } else {
                        message = "The Manual does not have a chapter " + chapter + ". Try a chapter number between 1 and " + total_chap + " (e.g., 3.14).";
		 }

             } else if (edition == "16") {   // for app01
                 message = "The Manual does not have a chapter " + chapter + ". Try a chapter number between 1 and " + total_chap + " (e.g., 3.14).";
                 message = message + "\r\nFor appendix A try a number like A.33.";
  	     }

	     alert(message);
             return false;
          }
	  
	  var paragraph = part[1];

	  if (paragraph != '0') {
	  	paragraph = paragraph.replace(/^0+/, '');
	  }

	  if ( paragraph == '0' || paragraph > paragraphs[chapter] ) {
	  
	     if (chapter.match(/^a|A$/)) {   //for app01
		 alert("Appendix A does not have a paragraph " + paragraph + ". Try again.");
	     } else {
	         alert("Chapter " + chapter + " does not have a paragraph " + paragraph + ". Try again.");
	     }
                 theForm.paragraph.value = "";
		 theForm.paragraph.focus();
		 return false;
	  
	  } else {
	  
	     var ch_pad = "";
	     var para_pad = "";
	  
	     if ( chapter < 10 ) {
	        ch_pad = "0";
	     }

	     if (chapter.match(/^a|A$/)) {   //for app01
		chapter = "app01"
 	     }

	     if ( paragraph < 10 ) {
	    	para_pad = "00";
	     } else if ( paragraph < 100 ) {
	        para_pad = "0";
	     }

	     if (chapter == "app01") {   //for app01
		window.location.href = "/" + edition + "/" + chapter + "/" + chapter + "_sec" + para_pad + paragraph + ".html";
	     }
	     else {
		window.location.href = "/" + edition + "/ch" + ch_pad + chapter + "/" + "ch" + ch_pad + chapter + "_sec" + para_pad + paragraph + ".html";

	     }

	     return false;
	  }
	  
   } else {
         var message = "The value '" + target + "' doesn't appear to be a Manual paragraph number (e.g., 3.14";

	 if (edition == "16") {    // for app01
	      message += " or A.33"; 
	 }

         message += "). Try again.";

         if ( target ) {
             alert(message); 
	     return false;	  
	  } else {
	     alert(message);
	     return false;
	  }
   }

}

function prepareForms() {

   // based on scripts in "DOM Scripting" by Jeremy Keith
   // see "showpic.js" script, function "prepareGallery", p. 139

   if ( !document.getElementById ) return false;
   
   // GO TO PARAGRAPH form
   var paraSearchForm = document.getElementById("para_search");
   if ( paraSearchForm ) {
      paraSearchForm.onsubmit = function() {
         return goToPar(this);
      }   
   }
}

window.onload = function() {
   prepareRollovers();
   prepareForms();
   if ((document.getElementById("user_id")) && (document.body.className != "stylesheet") && (window.innerWidth > 767) ) {
      start();
      save_to_chap_para();
   }

    jQuery(document).ready(function ($) {
        $("body").keydown(function(e) {
            if(e.which == 37) { // left
                //$(".nav a").trigger("click");
                $('.nav a img[alt$="Previous Paragraph"]').parent()[1].click()
            }
            else if(e.which == 39) { // right
               // $(".nav a").trigger("click");
                $('.nav a img[alt$="Next Paragraph"]').parent()[1].click()
            }
        });
    });
}



