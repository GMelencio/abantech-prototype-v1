/*jslint browser: true*/
/*global $, jQuery, alert*/
/* =================================
   PRE LOADER
=================================== */
// makes sure the whole site is loaded
jQuery(window).load(function () {

	'use strict';
        // will first fade out the loading animation
	jQuery(".status").fadeOut();
        // will fade out the whole DIV that covers the website.
	jQuery(".preloader").delay(1000).fadeOut("slow");
});

/* =================================
   ANIMATION
=================================== */
var wow = new WOW(
  {
    mobile: false  // trigger animations on mobile devices (default is true)
  }
);
wow.init();

/* ================================
===  IN PAGE SCROLL OPTIONS    ====
================================= */
$(document).ready(function () {
	$('.smooth-scroll a, a.smooth-scroll').on('click', function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 900, 'swing', function () {
			window.location.hash = target;
		});
	});
});

$('#internal-scroll').onePageNav({
	currentClass: 'current',
	changeHash: false,
	scrollSpeed: 750,
	scrollThreshold: 0.5,
	filter: ':not(.external)'
});

/* ================================
===  MAILCHIMP SUBSCRIBE FORM  ====
================================= */

$('.mailchimp').ajaxChimp({
	callback: mailchimpCallback,
	url: "http://webdesign7.us6.list-manage.com/subscribe/post?u=9445a2e155b82208d73433060&amp;id=16dc80e353" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
});

function mailchimpCallback(resp) {
	if (resp.result === 'success') {
		$('.mailchimp-success').html(resp.msg).fadeIn(1000);
		$('.mailchimp-error').fadeOut(500);

	} else if (resp.result === 'error') {
		$('.mailchimp-error').html(resp.msg).fadeIn(1000);
	}
}

/* ================================
===  PROJECT LOADING           ====
================================= */

jQuery(document).ready(function ($) {
    $('#embracing-reality .more').on('click', function (event) {
		event.preventDefault();

		var href = $(this).attr('href') + ' .single-project',
			portfolioList = $('#embracing-steps'),
			content = $('#loaded-content');

		portfolioList.animate({
			'marginLeft': '-120%'
		}, {
			duration: 400,
			queue: false
		});
		portfolioList.fadeOut(400);
		$('#loader').show();
		setTimeout(function () {
			content.load(href, function () {
				$('#loaded-content meta').remove();
				$('#loader').hide();
				content.fadeIn(400);
				window.location.href = "#embracing-reality";
				$('#back-button').fadeIn(600);
			});
		}, 400);
	});

    $('#embracing-reality #back-button').on('click', function (event) {
		event.preventDefault();

		var portfolioList = $('#embracing-steps')
		content = $('#loaded-content');

		content.fadeOut(400);
		$('#back-button').fadeOut(400);
		setTimeout(function () {
			portfolioList.animate({
				'marginLeft': '0'
			}, {
				duration: 400,
				queue: false
			});
			portfolioList.fadeIn(400);
		}, 400);
    });

    $('#portfolio .more').on('click', function (event) {
        event.preventDefault();

        var href = $(this).attr('href') + ' .single-project',
			portfolioList = $('#portfolio-steps'),
			content = $('#portfolio-loaded-content');

        portfolioList.animate({
            'marginLeft': '-120%'
        }, {
            duration: 400,
            queue: false
        });
        portfolioList.fadeOut(400);
        $('#portfolio-loader').show();
        setTimeout(function () {
            content.load(href, function () {
                $('#portfolio-loaded-content meta').remove();
                $('#portfolio-loader').hide();
                content.fadeIn(400);
                window.location.href = "#portfolio";
                $('#portfolio-back-button').fadeIn(600);
            });
        }, 400);
    });

    $('#portfolio-back-button').on('click', function (event) {
        event.preventDefault();

        var portfolioList = $('#portfolio-steps')
        content = $('#portfolio-loaded-content');

        content.fadeOut(400);
        $('#portfolio-back-button').fadeOut(400);
        setTimeout(function () {
            portfolioList.animate({
                'marginLeft': '0'
            }, {
                duration: 400,
                queue: false
            });
            portfolioList.fadeIn(400);
        }, 400);
    });
});

/* ================================
===  TESTIMONIALS              ====
================================= */
var demo1Played = false, demo2Played = false;
$(document).ready(function () {

	$("#feedbacks").owlCarousel({

		navigation: false, // Show next and prev buttons
		slideSpeed: 300,
		paginationSpeed: 400,
		singleItem: true

	});

	$("#project-slider").owlCarousel({

		navigation: false, // Show next and prev buttons
		slideSpeed: 300,
		paginationSpeed: 400,
		singleItem: true

	});

    // YOUTUBE LAZY LOADING
	var youtube = document.querySelectorAll(".youtube");
	for (var i = 0; i < youtube.length; i++) {

	    // thumbnail image source.
	    var source = "https://img.youtube.com/vi/" + youtube[i].dataset.embed + "/hqdefault.jpg";

	    // Load the image asynchronously
	    var image = new Image();
	    image.src = source;
	    image.addEventListener("load", function () {
	        youtube[i].appendChild(image);
	    }(i));

	    youtube[i].addEventListener("click", function () {

	        var iframe = document.createElement("iframe");

	        iframe.setAttribute("frameborder", "0");
	        iframe.setAttribute("allowfullscreen", "");
	        iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");

	        this.innerHTML = "";
	        this.appendChild(iframe);
			
			console.log(this);
			if($(this).parents("#carousel-demovids").length) {
				demo1Played = true;
			}
			else {
				demo2Played = true;
			}
	    });
	}
	
	$('.panel-title').on('click', function(e) {
		if($(this).siblings().text() == "+") {
			$("#news .icon").text("+");
			$(this).siblings().text("-");
		} else {
			$(this).siblings().text("+");
		}
	});
	
	$('[data-toggle="popover"]').popover();
	$('[data-toggle="tooltip"]').tooltip();
	
	$("#news .panel-heading").on('click', function(e) {
		var offset = 20, //Offset of 20px
			that = $(this);
		$('html, body').animate({
			scrollTop: that.offset().top + offset
		}, 1000);
	});
});

$(window).load(function() { //start after HTML, images have loaded
 
    var InfiniteRotator =
    {
        init: function()
        {
            //interval between items (in milliseconds)
            var itemInterval = 5000, efficioSlideInterval = 8000;

            //loop through the items
            var infiniteLoop = setInterval(function(){
				if (!demo1Played){	
					$("#carousel-demovids .right.carousel-control").trigger("click");
				}
				if (!demo2Played) {
					$("#carousel-demovids2 .right.carousel-control").trigger("click");
				}
            }, itemInterval),
			
			efficioInfiniteLoop = setInterval(function(){
				$("#next").trigger("click");
            }, efficioSlideInterval);
        }
    };
 
    InfiniteRotator.init();
});

/* =================================
===  PARTNERS					====
====================================*/
var angle = 0,
galleryspin = function(sign) {
	spinner = document.querySelector("#spinner");
	if (!sign) {
		angle = angle + 45;
	} else {
		angle = angle - 45;
	}
	spinner.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); transform: rotateY("+ angle +"deg);");
};

/* =================================
===  CONTACT FORM          ====
=================================== */
$("#contact-form").submit(function (e) {
	e.preventDefault();
	var name = $("#name").val();
	var email = $("#email").val();
	var budget = $("#budget").val();
	var subject = $("#subject").val();
	var message = $("#message").val();
	var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&budget=' + budget + '&message=' + message;

	function isValidEmail(emailAddress) {
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(emailAddress);
	};

	if (isValidEmail(email) && (message.length > 10) && (name.length > 1)) {

		$.ajax({
			type: "POST",
			url: "sendmail.php",
			data: dataString,
			success: function () {
				$('.success').fadeIn(1000);
				$('.error').fadeOut(500);
			}
		});

	} else {
		if (name.length < 2) {
			$('.error').html('Invalid Name - Please use your correct name').fadeIn(1000);
			$('.success').fadeOut(500);
		}
		if (message.length < 11) {
			$('.error').html('Message is too short. Should be more than 10 character').fadeIn(1000);
			$('.success').fadeOut(500);
		}

		if ((name.length < 2) && (message.length < 11)) {
			$('.error').html('Valid name & More than 10 characters in message is required').fadeIn(1000);
			$('.success').fadeOut(500);
		}
	}

	return false;
});


/* ================================
===  OTHER FIXES 		       ====
================================= */

$('input,textarea').focus(function () {
	$(this).data('placeholder', $(this).attr('placeholder'))
		.attr('placeholder', '');
}).blur(function () {
	$(this).attr('placeholder', $(this).data('placeholder'));
});

/* BOOTSTRAP FIX */

if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style')
	msViewportStyle.appendChild(
		document.createTextNode(
			'@-ms-viewport{width:auto!important}'
		)
	)
	document.querySelector('head').appendChild(msViewportStyle)
}

/*=====================================
====== CAROUSEL			===============
=====================================*/
var transformProp = Modernizr.prefixed('transform');

    function Carousel3D ( el ) {
      this.element = el;

      this.rotation = 0;
      this.panelCount = 0;
      this.totalPanelCount = this.element.children.length;
      this.theta = 0;

      this.isHorizontal = true;

    }

    Carousel3D.prototype.modify = function() {

      var panel, angle, i;

      this.panelSize = this.element[ this.isHorizontal ? 'offsetWidth' : 'offsetHeight' ];
      this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
      this.theta = 360 / this.panelCount;

      // do some trig to figure out how big the carousel
      // is in 3D space
      this.radius = Math.round( ( this.panelSize / 2) / Math.tan( Math.PI / this.panelCount ) );

      for ( i = 0; i < this.panelCount; i++ ) {
        panel = this.element.children[i];
        angle = this.theta * i;
        panel.style.opacity = 1;
        panel.style.backgroundColor = 'hsla(' + angle + ', 100%, 50%, 0.8)';
        // rotate panel, then push it out in 3D space
        panel.style[ transformProp ] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
      }

      // hide other panels
      for (  ; i < this.totalPanelCount; i++ ) {
        panel = this.element.children[i];
        panel.style.opacity = 0;
        panel.style[ transformProp ] = 'none';
      }

      // adjust rotation so panels are always flat
      this.rotation = Math.round( this.rotation / this.theta ) * this.theta;

      this.transform();

    };

    Carousel3D.prototype.transform = function() {
      // push the carousel back in 3D space,
      // and rotate it
      this.element.style[ transformProp ] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
    };


	var activeSlide = 1;
	
    var init = function() {


      var carousel = new Carousel3D(document.getElementById('slideshow-carousel')),
          panelCountInput = document.getElementById('panel-count'),
          axisButton = document.getElementById('toggle-axis'),
          navButtons = document.querySelectorAll('#navigation button'),
		  
          onNavButtonClick = function( event ){
            var increment = parseInt( event.target.getAttribute('data-increment') );
            carousel.rotation += carousel.theta * increment * -1;
            carousel.transform();
			var nextSlide = activeSlide + increment;
			if (nextSlide == 0) {
				activeSlide = 6;
			}
			else if (nextSlide == 7) {
				activeSlide = 1;
			}
			else {
				activeSlide = activeSlide + increment;
			}
			
			$("#navigation span").removeClass("current-slide");
			$("#s-" + activeSlide).addClass("current-slide");
          };

      // populate on startup
      carousel.panelCount = parseInt( panelCountInput.value, 10);
      carousel.modify();


      axisButton.addEventListener( 'click', function(){
        carousel.isHorizontal = !carousel.isHorizontal;
        carousel.modify();
      }, false);

      panelCountInput.addEventListener( 'change', function( event ) {
        carousel.panelCount = event.target.value;
        carousel.modify();
      }, false);

      for (var i=0; i < 2; i++) {
        navButtons[i].addEventListener( 'click', onNavButtonClick, false);
      }

      document.getElementById('toggle-backface-visibility').addEventListener( 'click', function(){
        carousel.element.toggleClassName('panels-backface-invisible');
      }, false);

      setTimeout( function(){
        document.body.addClassName('ready');
		$("#options").hide();
      }, 0);

    };

    window.addEventListener( 'DOMContentLoaded', init, false);