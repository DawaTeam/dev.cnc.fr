/* # NAVIGATION # */
var navigation = {
	init : function() {
		var windowWidth = $(window).width();
		if ( windowWidth >= 992 ) {
		    
		    var itemNav = $(".navigation-main li.with-sub-menu");
		    itemNav.addClass('pos-unset');
		    itemNav.parents('.col-9').addClass('pos-unset');
		    wrapperNav		= $("nav.navigation-main .scrollable");
			
		    wrapperNav.css('height', 'auto');
			
			if (Modernizr.touchevents) {
				itemNav.one("click", false, function(e){
			    	e.preventDefault();
			    	var redirectUrl = $(this).attr('href');
			    	var	subMenu = $(this).children('.mega-sub-menu');
			    	window.location = redirectUrl;
			    	$(this).toggleClass('active');
			    	subMenu.toggleClass('open fadeIn');

			    	if ( $(this).hasClass('active') ) {
			    		
			    	}
			   	});
			   	$('.header-bottom, .header-top').on("click", function() {
			   		itemNav.removeClass('active');
			   		$('.mega-sub-menu').removeClass('active');
			   		
			   	})
			}

		      
		    itemNav.on({
	    		mouseenter: function() {
	    			var	subMenu = $(this).children('.mega-sub-menu');
			    	$(this).addClass('active');
			    	subMenu.addClass('open fadeIn');
	    		},
	    		mouseleave: function() {
	    			var	subMenu = $(this).children('.mega-sub-menu');
			    	$(this).removeClass('active');
			    	subMenu.removeClass('fadeIn').addClass('fadeOut').removeClass('open fadeOut');
		    	}
		    });
		   
		}
		else {
			var navTrigger   		= $(".header-mobile .nav-icon"),
	      		nav     			= $("nav.navigation-main"),
	      		subMenuTrigger		= $(".navigation-main li.with-sub-menu i"),
	      		wrapperNav			= $("nav.navigation-main .scrollable");
	      
	      	wrapperNav.css('height', $(window).height());
		    navTrigger.unbind('click').bind("click", function() {
		    	if ( !navTrigger.hasClass('open') ) {
		    		navTrigger.addClass('open');
		    		nav.addClass('open');
		    	} else {
		    		navTrigger.removeClass('open');
		    		nav.removeClass('open');
		    	}
		    	
		    	subMenuTrigger.parents('.col-9').addClass('pos-unset');
		    	if ( !$(this).hasClass('open') ) {
		      		$('.mega-sub-menu').removeClass('open');
		      		subMenuTrigger.parent().removeClass('active');
		      	}
		    	$('.expanded-search').removeClass('open fadeInDown');
				$('header').find('.trigger-search').removeClass('active');
				$('.backdrop').remove();
		    });
		    subMenuTrigger.on('click', function() {
		    	var	subMenu 	= $(this).siblings('.mega-sub-menu'),
		    		parentItem 	= $(this).parents('.col-9');

		    	$(this).parent().toggleClass('active');
		    	subMenu.toggleClass('open');
		    	
		    })
		}
	    
	},
	resize : function() {
        $( window ).resize(function() {
            navigation.init();
        });
    }
}

/* # STICKY HEADER # */
var header = {
	sticky : function() {
		var didScroll;
		var mainHeaderHeight   = $('header.header-main').height();   

		$(window).scroll(function(event){
		    didScroll = true;
		    hasScrolled();
		});

		setInterval(function() {
		    if (didScroll) {
		        hasScrolled();
		        didScroll = false;
		    }
		}, 0);

		function hasScrolled() {
		    var st = $(this).scrollTop();
		    
		    if ( st < mainHeaderHeight ){
		        $('header.header-scroll').removeClass('show');
	            $('header.header-scroll').addClass('hide');
	            $('header.header-main').css("z-index", 1);
	            
				if ( $(window).width() >= 991 ) {
					$('.backdrop').remove();
					$('.expanded-search input[type=text]').val('');
					$('.expanded-search').removeClass('open fadeInDown');
					$('header').find('.trigger-search').removeClass('active');
				}

				if ( $(window).width() <= 991 ) {
					if ( $(".header-scroll .header-mobile .nav-icon").hasClass('open')) {
						$('.header-main .header-mobile .nav-icon').addClass('open');
					} // else {
					// 	$('.header-main .header-mobile .nav-icon').removeClass('open');
					// }
					if ( $(".header-main .header-mobile .trigger-search").hasClass('active')) {
						$('.header-scroll .header-mobile .trigger-search').addClass('active');
						$('.header-scroll .header-mobile .expanded-search').addClass('open fadeInDown');
						$('.header-scroll').find('.col-9').addClass('pos-unset');
					} else {
					 	$('.header-scroll .header-mobile .trigger-search').removeClass('active');
					 	$('.header-scroll .header-mobile .expanded-search').removeClass('open fadeInDown');
					}
				}

		    } 	
		    else if( st > mainHeaderHeight ) {
	            $('header.header-scroll').addClass('show');
		        $('header.header-scroll').removeClass('hide');
		        $('header.header-main').css("z-index", -1);
		        if ( $(".header-main .header-mobile .nav-icon").hasClass('open') ) {
						$('.header-scroll .header-mobile .nav-icon').addClass('open');
				} 
		    }
		    
		}
	},
	stickySearch : function() {
		var searchTrigger 	= $('header').find('.trigger-search');
			
		searchTrigger.on('click', function() {
			var searchExpand	= $(this).siblings('.expanded-search'),
				backDrop		= $('<div class="backdrop"/>'),
				searchInput		= searchExpand.find('input[type=text]');
			
			searchExpand.toggleClass('open fadeInDown');
			$(this).toggleClass('active');
			$(this).parents('.col-9').addClass('pos-unset');
			$("nav.navigation-main").removeClass('open');
			$(".header-mobile .nav-icon").removeClass('open');
			searchInput.focus();
			
			if ( $(this).hasClass('active') ) {
				backDrop.appendTo($('body'));
				$('header').css("z-index", 1040);
			} else {
				$('.backdrop').remove();
				searchInput.val('');
				$('header').css("z-index", 110);
			}

		});

	}
}


/* # ARTICLE SLIDER # */
var articleSlider = {
	init: function() {
		var swiper = new Swiper('.swiper-article', {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
        		el: '.swiper-pagination',
        		type: 'fraction'
      		},
	    });
	}
}

/* # ACCORDION / COLLAPSE # */
var accordion = {
	init : function() {
		$(".accordion").on('hidden.bs.collapse', function() {
			$(".accordion").find(".card-header").removeClass('open');
		});
		$(".accordion").on('shown.bs.collapse', function() {
			var card_active = $(this).find(".show");
			$(".accordion").find(".card-header").removeClass('open');
			card_active.prev(".card-header").addClass("open");
		});
		
	}
}
/* # STICKY SCROLLSPY NAV # */
var stickyNav = {
	init: function() {
		// Get Sticky
		var stickyNav 				= $('.sticky-nav'),
			stickyNavHeight			= $('.sticky-nav ul').height() + 100,
			stickyParentWidth		= stickyNav.parent().width(),
			contentArticle 			= $('.article-content-scroll'),
			contentArticleOffset	= $('.article-content-scroll').offset().top - 80,
			reboundOffset 			= $(".rebound").offset().top;
		
		$(window).on('scroll', function() {
			var scrollTop = $(this).scrollTop();
			
	        if ( contentArticleOffset < scrollTop && Math.abs(reboundOffset-stickyNavHeight) > scrollTop ) {
	        	var newStickyWidth = parseFloat( (16.666666666 * stickyParentWidth) / 100 ); 
	            stickyNav.addClass('fixed');
	            stickyNav.css("max-width", newStickyWidth+"px");
	            contentArticle.parent().addClass('offset-xl-2');
	        } 
	        else {
	        	stickyNav.removeClass('fixed');
	        	contentArticle.eq(0).parent().removeClass('offset-xl-2');
	        }
		});
		
		// Add Offset on click
		var navOffset = $('.header-scroll').height();
		$('.sticky-nav ul li a').on('click', function(e) {
		    var href 		= $(this).attr('href'),
		    	offsetTop 	= $(this).offset().top;
		    
		    e.preventDefault();

		    // Explicitly scroll to where the browser thinks the element
		    // is, but apply the offset.
		    $(href)[0].scrollIntoView();
		    window.scrollBy(0, -navOffset-30);

		});
	}
}
/* # STICKY SHARE ARTICLE # */
var share = {
	init: function() {
		var share = $(".article-head .share");
		share.on('click', function() {
			var shareOptions = $(this).children("ul");
			$(this).toggleClass('active');
			shareOptions.toggleClass('open fadeIn');

		})
	}, 
	sticky : function() {
		var share 			= $(".article-head .share"),
			titleOffset		= $("h1").offset().top,
	    	reboundOffset 	= $(".rebound").offset().top;
		$(window).on('scroll', function() {
			var scrollTop 	= $(this).scrollTop();
	        if ( titleOffset < scrollTop && (reboundOffset-400) > scrollTop) {
	            share.addClass('fixed');
	        } else {
	        	share.removeClass('fixed');
	        }
		});
	}
}
/* # FULL IMAGE WITH TEXT COVER # */
var updateCover = {
	init: function() {
		var cover = $('.full-screen-image-w-text');
		cover.each(function() {
			var data_bg = $(this).data("bg");
			$(this).css('background-image', 'url('+data_bg+')');
		})
	}
}


/* # DATE PICKER # */
var datePicker = {
	init: function() {
		var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        $('#startDate').datepicker({
        	locale: 'fr-fr',
        	format: 'dd/mm/yyyy',
            uiLibrary: 'bootstrap4',
            iconsLibrary: 'fontawesome',
            minDate: today,
            maxDate: function() {
                return $('#endDate').val();
            }
        });

        $('#endDate').datepicker({
        	locale: 'fr-fr',
        	format: 'dd/mm/yyyy',
            uiLibrary: 'bootstrap4',
            iconsLibrary: 'fontawesome',
            minDate: function() {
                return $('#startDate').val();
            }
        });
		
	}
}

/* # GRANT SEARCH # */
var displayMore = {
	init : function() {
		var triggerMore = $('.search-form .link-icon.d-more');

		triggerMore.on('click', function(e) {
			e.preventDefault();
			var items = $(this).siblings('.d-none');
			items.removeClass('d-none');


		})
	}
}

