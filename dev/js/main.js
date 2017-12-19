/* # NAVIGATION # */
var navigation = {
	init : function() {
		var windowWidth = $(window).width();
		if ( windowWidth >= 992 ) {

		    var itemNav = $(".navigation-main li.with-sub-menu");
		    itemNav.addClass('pos-unset');
		    itemNav.parents('.col-9').addClass('pos-unset');
		      
		    itemNav.on("mouseenter", function() {
		    	var	subMenu 	= $(this).children('.mega-sub-menu'),
		    		parentItem 	= $(this).parents('.col-9');
		    		
		    	$(this).addClass('active');
		    	parentItem.addClass('pos-unset');
		    	subMenu.addClass('open fadeIn');
		    });
		    itemNav.on("mouseleave", function() {
		    	var	subMenu 	= $(this).children('.mega-sub-menu'),
		    		parentItem 	= $(this).parents('.col-9');
		    	$(this).removeClass('active');
		    	parentItem.removeClass('pos-unset');
		    	subMenu.removeClass('fadeIn').addClass('fadeOut').removeClass('open fadeOut');
		    });
		}
		else {
			var navTrigger   	= $(".header-mobile .nav-icon"),
	      		nav     		= $("nav.navigation-main"),
	      		subMenuTrigger	= $(".navigation-main li.with-sub-menu i");
	      
		    navTrigger.on("touchend click", function() {
		      $(this).toggleClass('open');
		      nav.toggleClass('open');
		      subMenuTrigger.parents('.col-9').toggleClass('open pos-unset');
		      if ( !$(this).hasClass('open') ) {
		      		$('.mega-sub-menu').removeClass('open');
		      		subMenuTrigger.parent().removeClass('active');
		      }
		    });
		    subMenuTrigger.on('touchend click', function() {
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
				$('.header-scroll').find('.trigger-search').parents('.col-9').removeClass('pos-unset');
		    } 
		    else if( st > mainHeaderHeight ) {
	            $('header.header-scroll').addClass('show');
		        $('header.header-scroll').removeClass('hide');
		    }
		    
		}
	},
	stickySearch : function() {
		var searchTrigger 	= $('header').find('.trigger-search');
			
		searchTrigger.on('touchend click', function() {
			var searchExpand	= $(this).siblings('.expanded-search'),
				backDrop		= $('<div class="backdrop"/>'),
				searchInput		= searchExpand.find('input[type=text]');
			
			searchExpand.toggleClass('open fadeInDown');
			$(this).toggleClass('active');
			$(this).parents('.col-9').toggleClass('pos-unset');
			
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
		var elements = $('.sticky-nav');
		Stickyfill.add(elements);
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

		share.on('touchend click', function() {
			var shareOptions = $(this).children("ul");
			$(this).toggleClass('active');
			if (windowWidth >= 992) {
				shareOptions.toggleClass('open fadeInDown');
			} else {
				shareOptions.toggleClass('open fadeIn');
			}

		})
	}
}