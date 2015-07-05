/* Author: undsgn.com */

var $container = null;
var offsetScroll;

jQuery(function() {

/*  Vars
    ========================================================================== */
	var $fixedBar = jQuery('html:not(.lt-ie8) body:not(.left-menu).fixed-sidebar .sidebar-cont');
	var $fixedMenu = jQuery('html:not(.lt-ie8) body:not(.left-menu).fixed-menu #main-menu');
	var $footer = jQuery('#footer');
	var $banner = jQuery('banner');
	var myTime = 1000;
	var myTrans = "easeInOutExpo";
	var forceLoad = false;
	
/*  Init
    ========================================================================== */
	
  	jQuery(".main-cont").fitVids();
    
	jQuery('.fr-loading-background').attr('id', 'canvasloader-container');
	jQuery('.fr-loading').fadeIn();
	jQuery('body:not(.left-menu) #content').css('padding-bottom', jQuery('footer').outerHeight(true)); 
	jQuery("img").on("hover", hideTips);
	jQuery('.entry-thumb:not(.slide, .shortcode)').overThumb();
	jQuery('.fr-loading').becenter('boundaries',new Array('#main-menu','#footer'));

	var cl;

	var ua = navigator.userAgent;
	if( ua.indexOf("Android") >= 0 )
	{
	  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
	  if (androidversion > 2.3)
	  {
	  	addCanvasLoader('canvasloader-container');
	  }
	} else {
		addCanvasLoader('canvasloader-container');
	}
    
	
/*  Gallery helper
    ========================================================================== */
    
    jQuery('.clickfirst').click(function() {
	   
	   jQuery(this).closest('.inside').find('.firstel').trigger('click');
	   
	   return false;
	    
    });
	
/*  Fixed Elements
    ========================================================================== */
	// fixed menu
	
	if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		var event = jQuery.Event('remove.ScrollToFixed');
		event.preventDefault();
		jQuery(window).resize(function () {
		    waitForFinalEvent(function(){
				$fixedMenu.trigger(event);
				/* jQuery('.container-fluid.main').css('padding-top', 20); */
				if(jQuery(window).width() > 767) {
					
					$fixedMenu.scrollToFixed({
						preFixed: function() {
							jQuery('.fixed-width #main-menu').css('border-bottom', '1px solid #E5E5E5')
							jQuery('div#content').css('padding-top', $fixedMenu.height());
						},
						postFixed: function() { 
							jQuery('.fixed-width #main-menu').css('border-bottom', 'none'); 
							jQuery('div#content').css('padding-top', 0);
						}
					});
				} else jQuery('div#content').css('padding-top', 0);
				
				if ($fixedBar.height() > jQuery('div.side-right-cont').prev('div').height()) {
					$fixedBar.trigger(event);
				} else {	
					if ((jQuery(window).height() - jQuery('#main-menu').height() - 20) > jQuery('.sidebar-cont').height()) startFixedBar();
				}
		    }, 200, "fixedmenuresize");
		});
	}
	
	//fixed sidebar
	var compensateTop = 20;
	var compensateBottom = 48;
	
	function startFixedBar() {
		$fixedBar.scrollToFixed({
			marginTop: $fixedMenu.outerHeight() + compensateTop,
			limit: function() {
				var limit = $footer.offset().top - $fixedBar.height() - compensateBottom;
				return limit;
			},
			minWidth: 1000,
			zIndex: 1
		});	
	}
	
	if ((jQuery(window).height() - jQuery('#main-menu').height() - 20) > jQuery('.sidebar-cont').height()) startFixedBar();
	
/*  Flexslider
    ========================================================================== */
    
    function loadFlexSlider() {
    
    	jQuery('.flexslider').each(function () {
    	
    		var flexslider = jQuery(this);
    	
    		var thumbnails = jQuery(this).hasClass('wthumbs') ? 'thumbnails' : '';
    		var animation = jQuery(this).hasClass('fadeeff') ? 'fade' : 'slide';
    		var loop = jQuery(this).hasClass('loop') ? true : false;
    		var autoplay = jQuery(this).hasClass('autoplay') ? true : false;
    		var offset = (jQuery(this).attr('data-offset') != undefined) ? jQuery(this).attr('data-offset') : 0;
    		
    		flexslider.css('height',0);
    		
			jQuery(this).fitVids().flexslider({
				animation: animation,
				controlNav: thumbnails,
				slideshow: autoplay,
				animationSpeed: 300, 
				prevText: "",
				nextText: "",
				useCSS: false,
				animationLoop:loop,
				smoothHeight: true,
				before: function(){ if (jQuery('body.fullscreenon').length) jQuery(window).trigger('resize'); }, 
				start: function(slider) {
					jQuery('.flexslider').imagesLoaded(function() {
					
						flexslider.css('height','auto');
						
						var getAspect = flexslider.attr('data-aspect');
						var minHeight = (flexslider.attr('data-mheight') != '') ? flexslider.attr('data-mheight') : 0;
						var ratio;
						//var paddingMain = (jQuery('body.twenty').length) ? 20 : 2;
						var paddingMain = 0;
						try {
							if (getAspect.toLowerCase() != 'full') {
								var aspArray = getAspect.split(':');
								ratio = aspArray[0] / aspArray[1];
							}
						} catch (e) {
							ratio = 16 / 9;
						}
						
						
						if (jQuery('.flex-control-thumbs li').length > 20) jQuery('.flex-control-thumbs li').width(100/jQuery('.flex-control-thumbs li').length+'%');
					
						jQuery('.slides li .slide', flexslider).each(function() {
						
							var elcont = jQuery(this);
							var elimg = elcont.find('img');
				
							if (jQuery(this).width() != 0 && jQuery(this).height() != 0) elimg.data('ratio',jQuery(this).width() / jQuery(this).height());
							else {
								var $parent = jQuery(this).closest('li');
								$parent.css({ position: "absolute", visibility: "hidden", display: "block" });
								elimg.data('ratio',jQuery(this).width() / jQuery(this).height());
								$parent.css({ position: "", visibility: "", display: "" });
							} 
							
							elimg.css('position','absolute');
							
							jQuery(window).smartresize(function() {
								if (jQuery('body.fullscreenon').length) ratio = (jQuery(window).width() / jQuery(window).height());
								else if (getAspect.toLowerCase() == 'full') {
									if (jQuery('body.left-menu').length && jQuery(window).width() > 768) ratio = Math.ceil(jQuery(window).width() - jQuery('.fixed-wrap').width()) / Math.ceil(jQuery(window).height());
									else ratio = Math.ceil((jQuery(window).width() - (paddingMain * 2))) / Math.ceil((jQuery(window).height() - (paddingMain * 2) - flexslider.offset().top - offset));
								}
								
								
								
								elcont.width(jQuery('.gallery_element').width());
								
								if (jQuery('.gallery_element').width() / ratio > minHeight) {
									flexslider.height(jQuery('.gallery_element').width() / ratio);
									elcont.height(jQuery('.gallery_element').width() / ratio);
								} else {	
									flexslider.height(minHeight);
									elcont.height(minHeight);
								}
								
								var contw = elcont.width();
								var conth = elcont.height();
								var $er = elimg.data('ratio');	
							
								//---- landscape images
								if (conth > contw / $er ) {
									elimg.height(conth); 
									elimg.width(Math.ceil(conth * $er));
									elimg.css({'left': (contw-elimg.width()) / 2, 'top':0});
								} else {
									elimg.width(contw); 
									elimg.height(contw / $er);
									elimg.css({'top': (conth-elimg.height()) / 2, 'left':0});
								}
						    }, 100);
						});
						
						var items = Array();
						jQuery('.progressive').each(function() {
							if (jQuery(this).css('opacity') == '0' && !jQuery(this).parent('.clone').length) items.push(jQuery(this));
						});
						items.push(jQuery('#background'));
						items.push(jQuery('.flex-direction-nav'));
											
					});
				}
			});
		});
	}
	
	loadFlexSlider();

	jQuery('a.flex-full').unbind().off().live('click', function(e) {
	
		e.preventDefault();

		if (screenfull.enabled) {
	        screenfull.toggle(jQuery(this).closest('.gallery_element')[0]);
	        screenfull.onchange = function() {
	        	if(screenfull.isFullscreen) {
			    	jQuery('body').addClass('fullscreenon');
			    	jQuery('.gallery_element').toggleClass('fullscreendiv');
		    	} else {
			    	jQuery('body').removeClass('fullscreenon');
			    	jQuery('.gallery_element').toggleClass('fullscreendiv');
		    	}
		    	setTimeout(function() {
			    	jQuery(window).trigger('resize');
		    	}, 200);
		    }
	    } else {

	    	jQuery('body').addClass('fullscreenon');
		    jQuery(this).closest('.gallery_element').toggleClass('fullscreendiv');
		}
	    
	    setTimeout(function() {
	    	jQuery(window).trigger('resize');
    	}, 200);
    	
	    
	    return false;
	});
	
	
/*  Blogs
    ========================================================================== */
    jQuery('#content').fitVids();
    
	
	/*  Go Up
    ========================================================================== */
	jQuery('#go-up a').click(function(evt) {
		jQuery('html,body').delay(200).animate({
			scrollTop: 0
		}, myTime, myTrans);
		return false;
	});
	
/*  Load more
    ========================================================================== */
    var loading = false;
	// The number of the next page to load (/page/x/).
	var pageNum = parseInt(jQuery('.load-more a').attr('data-page')) + 1;
	// The maximum number of pages the current query can return.
	var max = parseInt(jQuery('.load-more a').attr('data-pages'));
	// The link of the next page of posts.
	var nextLink = jQuery('.load-more a').attr('data-link');
	/**
	 * Load new posts when the link is clicked.
	 */
	jQuery('.load-more a').click(function() {
		// Are there more posts to load?
		if (pageNum <= max && !loading) {
			loading = true;
			// Show that we're working.
			jQuery(this).text('Loading posts...');
			jQuery.get(nextLink, function(data) {
				// Update page number and nextLink.
				pageNum++;
				if (nextLink.indexOf("paged=") > 0) nextLink = nextLink.replace(/paged=[0-9]*/, 'paged=' + pageNum);
				else nextLink = nextLink.replace(/\/page\/[0-9]*/, '/page/' + pageNum);
				
				var items = Array();
				var $newItems = jQuery('.element', data);
				
				$newItems.imagesLoaded(function(){
					jQuery('#isotope').append( $newItems ).isotope( 'addItems', $newItems, function () {
						jQuery(window).resize();
						
						$newItems.each(function() {
							if (jQuery(this).hasClass('isotope-item')) jQuery(this).removeClass('isotope-item').addClass('isotope-item.no-transition');
							if (jQuery(this).css('opacity') == '0') items.push(jQuery(this));
						});
						setTimeout(function() {
							loading = false;
							jQuery('.load-more a').html('More Items...');
							twttr.widgets.load();
							loadFlexSlider();
							loadItems(items);
							jQuery('.entry-thumb:not(.slide)').overThumb();
							jQuery('#isotope').isotope('reloadItems');
							jQuery(window).resize();
							if (pageNum > max) jQuery('.load-more').remove();
							else {
								if (forceLoad) {
									if ( !$container.data('isotope').$filteredAtoms.length ) {
										jQuery('.load-more a').trigger('click');
									} else forceLoad = false;
								}
							}
						}, 500);
						
						
					} );
				});
			});
		} else {
			
		}
		return false;
	});
	
/*  Infinite scroll
    ========================================================================== */
	if (jQuery('body.infinite-scroll').length) {
		var count = 2;
	    jQuery(window).scroll(function(){
	            if  (jQuery(window).scrollTop() == jQuery(document).height() - jQuery(window).height()){
	               loadArticle(count);
	               count++;
	            }
	    });
	    function loadArticle(pageNumber){
	            jQuery('.load-more a').trigger('click');
	        return false;
	    }
    }
	
/*  Init tabs
    ========================================================================== */
	jQuery('a.tab-toggle').click(function (e) {
	  e.preventDefault();
	  jQuery(this).tab('show');
	});
	
	var $init;
    $init = jQuery(".accordion-body.in");
    $init.parent().addClass("accordion-group-active");
    $init.prev().addClass("accordion-heading-active");

	jQuery(".accordion-toggle").on('click', function(){ 
	    if (jQuery(this).parent().hasClass("accordion-heading-active")) {
	        //User clicked active item, so remove the classes
	        jQuery(this).parent().toggleClass("accordion-heading-active");
	        jQuery(this).parents(".accordion-group").toggleClass("accordion-group-active");
	    } else {
	        //User clicked inactive item, remove from everything then add to this one
	        jQuery(".accordion-heading").removeClass("accordion-heading-active");
	        jQuery(".accordion-heading").parents(".accordion-group").removeClass("accordion-group-active");
	        jQuery(this).parent().toggleClass("accordion-heading-active");
	        jQuery(this).parents(".accordion-group").toggleClass("accordion-group-active");                
	    }
	});
}); /* END jQuery(function() */


/*  Isotope utility GetUnitWidth
    ========================================================================== */
function getUnitWidth() {
	var width;
	if ($container.width() <= 320) {
		// console.log("320");
		width = Math.floor($container.width() / 1);
	} else if ($container.width() >= 321 && $container.width() <= 480) {
		//console.log("321 - 480");
		width = Math.floor($container.width() / 2);
	} else if ($container.width() >= 481 && $container.width() <= 768) {
		//console.log("481 - 768");
		width = Math.floor($container.width() / 4);
	} else if ($container.width() >= 769 && $container.width() <= 979) {
		//console.log("769 - 979");
		width = Math.floor($container.width() / 6);
	} else if ($container.width() >= 980 && $container.width() <= 1200) {
		//console.log("980 - 1200");
		width = Math.floor($container.width() / 6);
	} else if ($container.width() >= 1201 && $container.width() <= 1600) {
		//console.log("1201 - 1600");
		width = Math.floor($container.width() / 8);
	} else if ($container.width() >= 1601 && $container.width() <= 1824) {
		//console.log("1601 - 1824");
		width = Math.floor($container.width() / 10);
	} else if ($container.width() >= 1825) {
		//console.log("1825");
		width = Math.floor($container.width() / 12);
	}
	return width;
}


/*  Isotope utility SetWidths
    ========================================================================== */
function setWidths() {
	var unitWidth = getUnitWidth() - 0;
	$container.children(":not(.width2)").css({
		width: unitWidth
	});
	
	if ($container.width() <= 320) { 
		$container.children(".width2").css({
			width: unitWidth
		});
	}
	if ($container.width() >= 321 && $container.width() <= 480) {
		// console.log("eccoci 321");
		$container.children(".width2").css({
			width: unitWidth * 1
		});
		$container.children(".width4").css({
			width: unitWidth * 2
		});
		$container.children(".width6").css({
			width: unitWidth * 2
		});
	}
	if ($container.width() >= 481 && $container.width() <= 768) {
		// console.log("480");
		$container.children(".width6").css({
			width: unitWidth * 4
		});
		$container.children(".width4").css({
			width: unitWidth * 4
		});
		$container.children(".width2").css({
			width: unitWidth * 2
		});
	} 
	if ($container.width() >= 769) {
		// console.log("480");
		$container.children(".width6").css({
			width: unitWidth * 6
		});
		$container.children(".width4").css({
			width: unitWidth * 4
		});
		$container.children(".width2").css({
			width: unitWidth * 2
		});
	} 
}

function loadItems($class) {

	var index = 0;
	var delay;
	var time;
	var elements = $class;
	
	jQuery(elements).each(function (index) {
		if (jQuery(this).is('#background')) {
			time = 400;
			delay = 0;
		} else {
			time = speedLoad;
			delay = index * (speedLoad / 4) + 200;
		}
		jQuery(this).delay(delay).animate({opacity: 1}, { delay:400, duration: time, easing: 'easeInCubic', complete: function () {
			if (jQuery(this).hasClass('isotope-item.no-transition')) jQuery(this).removeClass('isotope-item.no-transition').addClass('isotope-item');
		}});
	}) 
	index++;
	
}

function hideTips(event) {  
    if (event.type == 'mouseenter') {
    	if (!jQuery.data(this,'title')) jQuery.data(this,'title', jQuery(this).attr('title'));
    	if (!jQuery.data(this,'alt')) jQuery.data(this,'alt', jQuery(this).attr('alt'));
        jQuery(this).attr('title','');
        jQuery(this).attr('alt','');
    }

    if (event.type == 'mouseleave'){
        jQuery(this).attr('alt',jQuery.data(this,'alt'));
        jQuery(this).attr('title',jQuery.data(this,'title'));
    }
}

var isoengine = (/webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) ? 'jquery' : 'css';

jQuery(document).ready(function() {
	$container = jQuery('#isotope');
	setWidths();
});

jQuery(document).ready(function() {
	/*  Isotope
    ========================================================================== */
	$allcontainer = jQuery('.container-fluid.main');
	$container = jQuery('#isotope');
	// set the widths on page load
	setWidths();
//	$allcontainer.imagesLoaded(function() {
		// initialize Isotope
		$container.isotope({
			animationEngine : isoengine,
			resizable: false,
			// disable normal resizing
			//transformsEnabled: false,
			// set columnWidth to a percentage of container width
			masonry: {
				columnWidth: getUnitWidth()
			},
		});
		jQuery('#blocklayer').hide();
		jQuery('.fr-loading').fadeOut(300, function () {
			jQuery(this).css('top','50%');
		});
		var items = Array();
		jQuery('.progressive').each(function() {
			
			if (jQuery(this).css('opacity') == '0') {
				if (jQuery(this).hasClass('isotope-item')) jQuery(this).removeClass('isotope-item').addClass('isotope-item.no-transition');
				items.push(jQuery(this));
			} 
			 
		});
		items.push(jQuery('#background'));
		items.push(jQuery('.flex-direction-nav'));
		setTimeout(function() {
			loadItems(items);
		}, 500);
		
	// filter items when filter link is clicked
	jQuery('#filters a').click(function() {
		jQuery('#filters li').removeClass('active');
		jQuery(this).parent().addClass('active');
		var selector = jQuery(this).attr('data-filter');
		$container.isotope({
			filter: selector
		});
		if ( !$container.data('isotope').$filteredAtoms.length ) {
		  forceLoad = true;
		  jQuery('.load-more a').trigger('click');
		}
		return false;
	});
	// update columnWidth on window resize
	jQuery(window).smartresize(function() {
		//setGMapHeight();
		//getUnitW();
		// set the widths on resize
		setWidths();
		// reinit isotop
		$container.isotope({
			//animationEngine : 'jquery',
			//transformsEnabled: false,
			// update columnWidth to a percentage of container width
			masonry: {
				columnWidth: getUnitWidth()
			}
		});
		
	}).resize();
		
/*  Sharrre
    ========================================================================== */
    
	 jQuery('#twitter').sharrre({
	  share: {
	    twitter: true
	  },
	  enableHover: false,
	  enableTracking: true,
	  click: function(api, options){
	    api.simulateClick();
	    api.openPopup('twitter');
	  }
	});
	jQuery('#facebook').sharrre({
	  share: {
	    facebook: true
	  },
	  enableHover: false,
	  enableTracking: true,
	  click: function(api, options){
	    api.simulateClick();
	    api.openPopup('facebook');
	  }
	});
	jQuery('#googleplus').sharrre({
	  share: {
	    googlePlus: true
	  },
	  enableHover: false,
	  enableTracking: true,
	  enableCounter: true,
	  click: function(api, options){
	    api.simulateClick();
	    api.openPopup('googlePlus');
	  },
	  urlCurl: siteUrl + '/lib/sharrre.php'
	});

	jQuery('#pinterest').sharrre({
	  share: {
	    pinterest: true
	  },
	  enableHover: false,
	  enableTracking: true,
	  enableCounter: true,
	  click: function(api, options){
	    api.simulateClick();
	    api.openPopup('pinterest');
	  },
	  urlCurl: siteUrl + '/lib/sharrre.php',
	  buttons: {
	    pinterest: {media: jQuery('#content img:first').attr('src'), description: jQuery('#pinterest').attr('data-text'), layout: 'vertical'}
	  },
	  
	});
	
	setTimeout(function() {
		jQuery('#share').css({'margin-top': - jQuery('#share').height() / 2 , 'margin-left': - jQuery('#share').width() / 2, 'top':'50%' , 'left' : '50%'});
	}, 500);
    
})

jQuery(window).resize(function() {
	jQuery('body:not(.left-menu) #content').css('padding-bottom', jQuery('footer').outerHeight(true));
	if (jQuery(window).width() > 767) jQuery('body.left-menu #content').css('padding-bottom', 0);
	else jQuery('body.left-menu #content').css('padding-bottom', jQuery('footer').outerHeight(true));
	jQuery('#share').css({'margin-top': - jQuery('#share').height() / 2 , 'margin-left': - jQuery('#share').width() / 2, 'top':'50%' , 'left' : '50%'});
	adjustMenu();
});

 /*** Utils ***/

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

function adjustMenu() {
	jQuery('#inner-menu, .social-cont').css('opacity', 1);
	if ((jQuery('#inner-logo').outerWidth(true) + jQuery('.nav.main-menu').outerWidth(true) + jQuery('.nav.social-menu').outerWidth(true)) > jQuery(window).width()) {	
		jQuery('.inline_menu #inner-menu').css({'display':'block', 'top':'0px', 'padding-top':'10px'});
		jQuery('.inline_menu .social-cont').css({'top':'auto','bottom':'20px'});
		jQuery('#main-menu.inline_menu .dropdown-menu').removeAttr('style');
	} else {
		var posY = ((jQuery('#inner-logo').height() - jQuery('.nav.main-menu').height() ) / 2) - 1;
		jQuery('.inline_menu #inner-menu').css({'display':'inline-block', 'top':posY + 'px','padding-top':'0px'});
		//jQuery('#main-menu.inline_menu .dropdown-menu').css('padding-top', 'px !important');
		jQuery('#main-menu.inline_menu  #menu-main-menu > .dropdown > .dropdown-menu').attr('style', 'padding-top: '+(jQuery('#main-menu').height() - jQuery('.nav.main-menu').height() + 2) / 2 + 'px !important');
		jQuery('.inline_menu .social-cont').css({'top':posY + 20 + 'px'});
		//jQuery('.inline_menu .social-cont').css({'top':'auto','bottom':'20px'});
	}
	if ((jQuery('.nav.main-menu').outerWidth(true) + jQuery('.nav.social-menu').outerWidth(true)) > jQuery(window).width()) {
		jQuery('.newline_menu .social-cont').css({'top':'20px'});
	} else jQuery('.newline_menu .social-cont').css({'top':'auto'});
	
	if (jQuery('body.left-menu').length) {
		if (jQuery('#main-menu').outerHeight() + jQuery('#footer').outerHeight() + jQuery('#inner-logo').outerHeight() > jQuery(window).height()) {
			jQuery('body.left-menu .fixed-wrap').css('position','absolute');
		} else {
			jQuery('body.left-menu .fixed-wrap').css('position','fixed');
		}
	}
}

adjustMenu();

function addCanvasLoader($id) {
	var cl;
	cl = new CanvasLoader($id);
	cl.setShape('rect'); // default is 'oval'
	cl.setDiameter(26); // default is 40
	cl.setDensity(13); // default is 40
	cl.setRange(1); // default is 1.3
	cl.setSpeed(1); // default is 2
	cl.setFPS(25); // default is 24
	cl.show(); // Hidden by default
}

jQuery(window).load(function() {
		

	var ua = navigator.userAgent;
	jQuery('.rs_undsgn .rev_slider_wrapper').each(function() {
		var $id = 'rs_'+jQuery(this).attr('id');
	  jQuery('.tp-loader', this).attr('id',$id);
	  jQuery('.tp-leftarrow', this).addClass('flex-direction-nav').html('<a class="flex-prev" href="#" data-icon="&#xe0bf;"></a>');
	  jQuery('.tp-rightarrow', this).addClass('flex-direction-nav').html('<a class="flex-next" href="#" data-icon="&#xe0c2;"></a>');
		if( ua.indexOf("Android") >= 0 )
		{
		  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
		  if (androidversion > 2.3)
		  {
		  	addCanvasLoader($id);
		  }
		} else {
			addCanvasLoader($id);
		}
  	});

	jQuery(window).trigger('resize');

});