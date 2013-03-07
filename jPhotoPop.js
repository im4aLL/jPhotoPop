/* jQuery MouseWheel from (c) 2010 Brandon Aaron (http://brandonaaron.net)
===========================================================================*/
;(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);

/* jQuery Drag (c) from http://css-tricks.com Note: added a handler of jPhotoPop-overlay-content
================================================================================================*/
;(function($){
	$.fn.drags = function(opt) {

        opt = $.extend({
            handle: "",
            cursor: "move",
            draggableClass: "draggable",
            activeHandleClass: "active-handle"
        }, opt);

        var $selected = null;
        var $elements = (opt.handle === "") ? this : this.find(opt.handle);

        return $elements.css('cursor', opt.cursor).on("mousedown", function(e) {
			$('.jPhotoPop-overlay-content').removeClass('jTransaction');
            if(opt.handle === "") {
                $selected = $(this);
                $selected.addClass(opt.draggableClass);
            } else {
                $selected = $(this).parent();
                $selected.addClass(opt.draggableClass).find(opt.handle).addClass(opt.activeHandleClass);
            }
            var drg_h = $selected.outerHeight(),
                drg_w = $selected.outerWidth(),
                pos_y = $selected.offset().top + drg_h - e.pageY,
                pos_x = $selected.offset().left + drg_w - e.pageX;
            $(document).on("mousemove", function(e) {
                $selected.offset({
                    top: e.pageY + pos_y - drg_h,
                    left: e.pageX + pos_x - drg_w
                });
            }).on("mouseup", function() {
                $(this).off("mousemove"); // Unbind events from document
                $selected.removeClass(opt.draggableClass);
                $selected = null;
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $selected.removeClass(opt.draggableClass);
            } else {
                $selected.removeClass(opt.draggableClass)
                    .find(opt.handle).removeClass(opt.activeHandleClass);
            }
            $selected = null;
        });

    }
})(jQuery);


/* jPhotoPop (c) 2013 Habib Hadi http://habibhadi.com
======================================================*/
;(function($){
	
	var jClass = {
		group : 'jPhotoPopGroup',	
		single : 'jPhotoPopSingle'
	}
	
	var popLink = '';
	var nextP = '';
	var prevP = '';
	var zoomVal = 1;
	var alreadyOverlayed = 0;
	
	function pPop(popLink,pType,nextP,prevP,popTriggers)
		{
			pType = typeof pType !== 'undefined' ? 'overlay-'+pType : 'default';
			nextP = typeof nextP !== 'undefined' ? nextP : 'null';
			prevP = typeof prevP !== 'undefined' ? prevP : 'null';
			if(popTriggers==null) popTriggers = { className: 'null' }; 
			
			var popContent = '<div class="jPhotoPop-overlay '+pType+'">'+
								'<div class="jPhotoPop-overlay-wrapper">'+
										'<span class="jPhotoPop-overlay-content">'+
											'<img src="'+popLink+'">'+
										'</span>'+
								'</div>'+
								'<span class="jppicon" id="jppclose"></span>'+
								((nextP!='null')? '<a class="jppicon" id="jppnext" href="#" rel='+nextP+' name="'+popTriggers.className+'"></a>' : '' )+
								((prevP!='null')? '<a class="jppicon" id="jppprev" href="#" rel='+prevP+' name="'+popTriggers.className+'"></a>' : '' )+
							'</div>';
			
			$('body .jPhotoPop-overlay').remove();
			$('body').prepend(popContent);
			
			if(alreadyOverlayed===0) {
				$('.jPhotoPop-overlay').css('opacity',0);
				$('.jPhotoPop-overlay').animate({ opacity: 1 },"fast");
			}
			
			$('.jPhotoPop-overlay-content *').hide();
			$('.jPhotoPop-overlay-content').addClass('jloading');
			
			$('.jPhotoPop-overlay-content img:first').bind('load',function(){
				$('.jPhotoPop-overlay-content *').show();
				$('.jPhotoPop-overlay-content').removeClass('jloading');
			});
			
			jPopZoomLevel(zoomVal);
			jDisableScroll();
		}
	
	function totalPhotoCount(selector){
		var totalPhoto = 0;
		totalPhoto = $('.'+selector).length;
		return totalPhoto;
	}
	
	function actualPhotoEq(selector,jPhotoSelector){
		var totalPhoto = 0;
		var currentPhotoIndex = 0;
		var groupLastPhotoIndex = 0;
		var actualPhotoIndex = 0;
		
		totalPhoto = totalPhotoCount(selector);
		currentPhotoIndex = jPhotoSelector.index();
		groupLastPhotoIndex = $('.'+selector+':last').index();
		actualPhotoIndex = (currentPhotoIndex - (groupLastPhotoIndex - totalPhoto)) - 1;
		
		return actualPhotoIndex;
	}
	
	function getNextPrev(className,jPhotoSelector,btn){
		
		var totalPhoto = 0;
		var curPhotoEq = 0;
		var nextPhotoEq = 0;
		var prevPhotoEq = 0;
		var cEQ = 0;
		var p_p = 0;
		var n_p = 0;
		
		curPhotoEq = actualPhotoEq(className,jPhotoSelector);
		nextPhotoEq = curPhotoEq + 1;
		prevPhotoEq = curPhotoEq - 1;
		totalPhoto = totalPhotoCount(className) - 1;
		
		if(prevPhotoEq<0) prevPhotoEq = totalPhoto;
		if(nextPhotoEq>totalPhoto) nextPhotoEq = 0;	

		$('.jPoped').removeClass('jPoped');
		if(btn == 'next') {
			$('.'+className).eq(nextPhotoEq).addClass('jPoped');
			p_p = nextPhotoEq - 1;
			n_p = nextPhotoEq + 1;
			cEQ = 1;
		}
		else if(btn == 'prev') {
			$('.'+className).eq(prevPhotoEq).addClass('jPoped');
			p_p = prevPhotoEq - 1;
			n_p = prevPhotoEq + 1; 
			cEQ = 1;
		}
		else {
			jPhotoSelector.addClass('jPoped');
		}
		
		if(n_p>totalPhoto) n_p = 0;
		if(p_p<0) p_p = totalPhoto;
		
		if(cEQ==0){
			nextP = $('.'+className).eq(nextPhotoEq).attr('href');
			prevP = $('.'+className).eq(prevPhotoEq).attr('href');
		}
		else {
			nextP = $('.'+className).eq(n_p).attr('href');
			prevP = $('.'+className).eq(p_p).attr('href');	
		}
		
		var hook = {
			nextP: nextP,
			prevP: prevP	
		}
		return hook;
	}
	
	function jPopZoomLevel(zoomVal){
		$('.jPhotoPop-overlay-content').css({
			'-moz-transform' : 'scale('+zoomVal+') rotate(0.1deg)',
			'-webkit-transform' : 'scale('+zoomVal+') rotate(0.1deg)',
			'-o-transform' : 'scale('+zoomVal+') rotate(0.1deg)',
			'transform' : 'scale('+zoomVal+') rotate(0.1deg)',
			'-ms-transform' : 'scale('+zoomVal+') rotate(0.1deg)',
			'filter': 'progid:DXImageTransform.Microsoft.Matrix(sizingMethod="auto expand",M11='+zoomVal+', M12=-0, M21=0, M22='+zoomVal+')'	
		});	
	}
	
	function jDisableScroll(){
		
		// Solution by tfe #http://stackoverflow.com/questions/3656592/programmatically-disable-scrolling
		/*var scrollPosition = [
		self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
		self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
		];
		var html = $('html, body');
		html.data('scroll-position', scrollPosition);
		html.data('previous-overflow', html.css('overflow'));
		html.css('overflow', 'hidden');
		window.scrollTo(scrollPosition[0], scrollPosition[1]);*/
		
		// update my solution
		$('html').css('overflow-y','hidden');
	}
	
	function jEnableScroll(){
		
		// Solution by tfe #http://stackoverflow.com/questions/3656592/programmatically-disable-scrolling
		/*var html = $('html, body');
		var scrollPosition = html.data('scroll-position');
		html.css('overflow', html.data('previous-overflow'));
		window.scrollTo(scrollPosition[0], scrollPosition[1]);*/
		
		// update my solution
		$('html').css('overflow-y','scroll');
	}
	
	$('.jPhotoPop-overlay-content').live("mouseover",function(){ $(this).drags(); });
	
	$('.jPhotoPop-overlay-content').live('mousewheel', function(event, delta) { 
	
		$(this).addClass('jTransaction');
		zoomVal = ((delta>0)?.1:-.1) + zoomVal;
		jPopZoomLevel(zoomVal);
	});
	
	$('#jppnext').live("click", function(){	
		alreadyOverlayed = 1;	
		var nextPhoto = $(this).attr('rel');
		var className = $(this).attr('name');
		var selector = $('.jPoped');
		
		var hook = getNextPrev(className,selector,'next');
		var popTriggers = { className: className };
		
		pPop(nextPhoto, className, hook.nextP, hook.prevP, popTriggers);
		return false;
		
	});
	
	$('#jppprev').live("click", function(){
		alreadyOverlayed = 1;
		var prevPhoto = $(this).attr('rel');
		var className = $(this).attr('name');
		var selector = $('.jPoped');
		
		var hook = getNextPrev(className,selector,'prev');
		var popTriggers = { className: className };
		
		pPop(prevPhoto, className, hook.nextP, hook.prevP, popTriggers);
		return false;
	});
	
	$('#jppclose').live("click",function(){
		$('body .jPhotoPop-overlay').animate({ opacity:0 },"fast",function(){ $('body .jPhotoPop-overlay').remove(); });
		$('.jPoped').removeClass('jPoped');
		alreadyOverlayed = 0;
		jEnableScroll();
	});
	
	$('.jPhotoPop-overlay-content, #jppclose, #jppnext, #jppprev').live("click",function(e){
		e.stopPropagation();
	});
	
	$('.jPhotoPop-overlay').live("click", function(){
		var rSelector = $(this);
		rSelector.animate({ opacity:0 },"fast",function(){ rSelector.remove(); });
		$('.jPoped').removeClass('jPoped');
		alreadyOverlayed = 0;
		jEnableScroll();
	});
			
    $.fn.extend({

        jPhotoPop: function(options) {

            var defaults = {
                single: true,
				group: false
            }
                 
            var jPhotoPopOption =  $.extend(defaults, options);
 
            return this.each(function() {
				var jPhotoSelector = $(this);
				
				if(jPhotoPopOption.group === true){
					jPhotoSelector.addClass(jClass.group);
				}
				else if(jPhotoPopOption.single === true) {
					jPhotoSelector.addClass(jClass.single);
				}
				
				if(jPhotoPopOption.group === true) {
					jPhotoSelector.click(function(){					
						var hook = getNextPrev(jClass.group,jPhotoSelector);
						var triggerAry = jPhotoSelector.attr('class').split(' ');
						var popTriggers = { className: triggerAry[1] };
						
						popLink = $(this).attr('href');
						pPop(popLink, jClass.group, hook.nextP, hook.prevP, popTriggers);
						return false;
					});
				}
				else if(jPhotoPopOption.single === true) {
					jPhotoSelector.click(function(){
						popLink = $(this).attr('href');
						pPop(popLink, jClass.single);
						return false;
					});		
				}
				
             
            });
        }
    });
     
})(jQuery);