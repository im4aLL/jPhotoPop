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
	
	function jDisableScroll(){
		$('html').css('overflow-y','hidden');
	}
	
	function jEnableScroll(){
		$('html').css('overflow-y','scroll');
	}
	
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