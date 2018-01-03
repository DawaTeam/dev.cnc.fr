/* # NAVIGATION # */
var navigation = {
	init : function() {
		var windowWidth = $(window).width();
		if ( windowWidth >= 992 ) {
		    
		    var itemNav = $(".navigation-main li.with-sub-menu a");
		    itemNav.parent("li").addClass('pos-unset');
		    itemNav.parents('.col-9').addClass('pos-unset');
			
			if (Modernizr.touchevents) {
				itemNav.one("click", false, function(e){
			    	e.preventDefault();
			    	var redirectUrl = $(this).attr('href');
			    	var	subMenu = $(this).siblings('.mega-sub-menu');
			    	window.location = redirectUrl;
			    	$(this).parent('li').toggleClass('active');
			    	subMenu.toggleClass('open fadeIn');

			    	if ( $(this).hasClass('active') ) {
			    		
			    	}
			   	});
			   	$('.header-bottom, .header-top').on("click", function() {
			   		itemNav.parent('li').removeClass('active');
			   		$('.mega-sub-menu').removeClass('active');
			   		
			   	})
			}

		      
		    itemNav.on({
	    		mouseenter: function() {
	    			var	subMenu = $(this).siblings('.mega-sub-menu');
			    	$(this).parent('li').addClass('active');
			    	subMenu.addClass('open fadeIn');
	    		},
	    		mouseleave: function() {
	    			var	subMenu = $(this).siblings('.mega-sub-menu');
			    	$(this).parent('li').removeClass('active');
			    	subMenu.removeClass('fadeIn').addClass('fadeOut').removeClass('open fadeOut');
		    	}
		    });
		   
		}
		else {
			var navTrigger   	= $(".header-mobile .nav-icon"),
	      		nav     		= $("nav.navigation-main"),
	      		subMenuTrigger	= $(".navigation-main li.with-sub-menu i");
	      
		    navTrigger.on("click", function() {
		    	if ( !$(this).hasClass('open') ) {
		    		$(this).addClass('open');
		    	} else {
		    		$(this).removeClass('open');
		    	}
		    	nav.toggleClass('open');
		    	subMenuTrigger.parents('.col-9').addClass('pos-unset');
		    	if ( !$(this).hasClass('open') ) {
		      		$('.mega-sub-menu').removeClass('open');
		      		subMenuTrigger.parent().removeClass('active');
		      	}
		    });
		    subMenuTrigger.on('click', function() {
		    	var	subMenu 	= $(this).siblings('.mega-sub-menu'),
		    		parentItem 	= $(this).parents('.col-9');

		    	$(this).parent().toggleClass('active');
		    	subMenu.toggleClass('open');
		    	
		    })
		}
	    
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
	            $('.backdrop').remove();
				$('.expanded-search input[type=text]').val('');
				$('.expanded-search').removeClass('open fadeInDown');
				$('header').find('.trigger-search').removeClass('active');

				if ( $(window).width() <= 991 ) {
					$(".header-mobile .nav-icon").removeClass('open');
					$("nav.navigation-main").removeClass('open');
				}

		    } 	
		    else if( st > mainHeaderHeight ) {
	            $('header.header-scroll').addClass('show');
		        $('header.header-scroll').removeClass('hide');
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
			
			if ( $(this).hasClass('active') ) {
				backDrop.appendTo($('body'));
				$('header').css("z-index", 1040);
			} else {
				$('.backdrop').remove();
				searchInput.val('');
				$('header').css("z-index", 1);
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
		//Polyfill
		var elements = $('.sticky-nav');
		Stickyfill.add(elements);

		// Add Offset on click
		var navOffset = $('.header-scroll').height();
		$('.sticky-nav ul li a').on('click', function(e) {
		    var href = $(this).attr('href');
		    e.preventDefault();
		    console.log($(this));

		    // Explicitly scroll to where the browser thinks the element
		    // is, but apply the offset.
		    $(href)[0].scrollIntoView();
		    window.scrollBy(0, -navOffset-30);
		});
	}
}
/* # STICKY SHARE ARTICLE # */
var stickyShare = {
	init: function() {
		var windowWidth = $(window).width();
		var share 			= $(".article-head .share"),
			titleOffset		= $("h1").offset().top,
	    	reboundOffset 	= $(".rebound").offset().top;
		$(window).on('scroll', function() {
			var scrollTop 	= $(this).scrollTop();
			shareOffset 	= share.offset().top;
	        if ( titleOffset < scrollTop && (reboundOffset-400) > scrollTop) {
	            share.addClass('fixed');
	        } else {
	        	share.removeClass('fixed');
	        }
		});

		share.on('click', function() {
			var shareOptions = $(this).children("ul");
			$(this).toggleClass('active');
			shareOptions.toggleClass('open fadeIn');

		})
	}
}