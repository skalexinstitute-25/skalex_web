(function ($) {
	
	"use strict";

	// Page loading animation
	$(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	})

	var width = $(window).width();
		$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	// Initialize Isotope after images are loaded to prevent layout overlap
	var rdn_events_list;
	function initIsotope() {
		const elem = document.querySelector('.event_box');
		const filtersElem = document.querySelector('.event_filter');
		if (elem) {
			rdn_events_list = new Isotope(elem, {
				itemSelector: '.event_outer',
				layoutMode: 'masonry'
			});
			
			// Check and wait for images to load, then refresh layout
			const images = elem.querySelectorAll('img');
			let loadedCount = 0;
			const totalImages = images.length;
			
			if (totalImages > 0) {
				images.forEach(function(img) {
					if (img.complete && img.naturalHeight !== 0) {
						loadedCount++;
					} else {
						img.addEventListener('load', function() {
							loadedCount++;
							if (loadedCount === totalImages && rdn_events_list) {
								rdn_events_list.layout();
							}
						}, { once: true });
						img.addEventListener('error', function() {
							loadedCount++;
							if (loadedCount === totalImages && rdn_events_list) {
								rdn_events_list.layout();
							}
						}, { once: true });
					}
				});
				
				// If all images are already loaded
				if (loadedCount === totalImages) {
					setTimeout(function() {
						if (rdn_events_list) {
							rdn_events_list.layout();
						}
					}, 150);
				}
			} else {
				// No images found, just layout
				setTimeout(function() {
					if (rdn_events_list) {
						rdn_events_list.layout();
					}
				}, 150);
			}
			
			if (filtersElem && rdn_events_list) {
				filtersElem.addEventListener('click', function(event) {
					// Check if clicked element is an anchor tag
					if (event.target.tagName !== 'A') {
						return;
					}
					const filterValue = event.target.getAttribute('data-filter');
					if (!filterValue) {
						return;
					}
					rdn_events_list.arrange({
						filter: filterValue
					});
					const activeItem = filtersElem.querySelector('.is_active');
					if (activeItem) {
						activeItem.classList.remove('is_active');
					}
					event.target.classList.add('is_active');
					event.preventDefault();
				});
			}
		}
	}

	// Wait for window load to ensure all images are loaded before initializing Isotope
	$(window).on('load', function() {
		setTimeout(initIsotope, 200);
	});

	// Initialize Owl Carousel after DOM is ready
	$(document).ready(function() {
		$('.owl-banner').owlCarousel({
			center: true,
		  items:1,
		  loop:true,
		  nav: true,
		  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		  margin:30,
		  responsive:{
			992:{
				items:1
			},
			1200:{
				items:1
			}
		  }
		});

		$('.owl-testimonials').owlCarousel({
		  center: true,
		  items:1,
		  loop:true,
		  nav: true,
		  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		  margin:30,
		  responsive:{
			992:{
				items:1
			},
			1200:{
				items:1
			}
		  }
		});
	});


	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 767) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('.scroll-to-section a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) - 79
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});

	const dropdownOpener = $('.main-nav ul.nav .has-sub > a');

    // Open/Close Submenus
    if (dropdownOpener.length) {
        dropdownOpener.each(function () {
            var _this = $(this);

            _this.on('tap click', function (e) {
                var thisItemParent = _this.parent('li'),
                    thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');

                if (thisItemParent.hasClass('has-sub')) {
                    var submenu = thisItemParent.find('> ul.sub-menu');

                    if (submenu.is(':visible')) {
                        submenu.slideUp(450, 'easeInOutQuad');
                        thisItemParent.removeClass('is-open-sub');
                    } else {
                        thisItemParent.addClass('is-open-sub');

                        if (thisItemParentSiblingsWithDrop.length === 0) {
                            thisItemParent.find('.sub-menu').slideUp(400, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        } else {
                            thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        }
                    }
                }

                e.preventDefault();
            });
        });
    }

})(window.jQuery);