/*
 * jQuery laconicpromised
 * ver 0.1
 * 2013-06-21
 * by yahiousun
 * license MIT
*/

(function($){
	
	var methods = {
		init: function(options){
			var settings = $.extend({}, $.fn.laconicpromised.defaults, options)
			return this.each(function(){
				var self = $(this);
				var data = self.data('laconicpromised');
				if(!data){ // if not initialized yet
					self.data('laconicpromised', { // set data
						container: settings.container,
						navi: settings.navi,
						content: settings.content,
						gap: settings.gap,
						active: settings.active,
						duration: settings.duration,
						autoplay: settings.autoplay,
						interval: settings.interval,
						trigger: settings.trigger
					});
					data = self.data('laconicpromised');
				}
				
				var navi = self.find(data.navi);
				var contents = self.find(data.navi);
				var containerWidth = self.width();
				var naviWidth = navi.eq(0).height();
				var naviHeight = navi.eq(0).width();
				var contentWidth = containerWidth-naviWidth*navi.length;
				var offsetFix = (naviHeight-naviWidth)/2;
				if(window.attachEvent){
					offsetFix = 0;
					navi.each(function(index, element) {
						$(this).css({
							'width': 30,
							'height': 150
						})
					});
				}
				
				function toggle(target, now){
					
					target.prevAll(data.navi).each(function(index){				
						$(this).animate({
							'left': -offsetFix+naviWidth*(now-index-1)
						})
					})
					target.prevAll(data.content).each(function(index){
						var _index = $(this).index('dd');
						$(this).animate({
							'left': naviWidth*(now-index)
						})
					})
					
					target.animate({
						'left': -offsetFix+naviWidth*now
					}, function(){
						$(this).addClass(data.active);
					})
					target.next(data.content).animate({
						'left': naviWidth*(now+1)
					})
					
					target.nextAll(data.navi).each(function(index){
						$(this).animate({
							'left': -offsetFix+naviWidth*(now+index+1)+contentWidth
						})
					})
					target.next(data.content).nextAll(data.content).each(function(index){
						$(this).animate({
							'left': naviWidth*(now+index+2)+contentWidth
						})
					})
					
				}
				
				navi.eq(3).addClass(data.active)
				
				function newToggle(){
					
					var terms = self.find(data.navi);
					var descs = self.find(data.content);
					var now = terms.index($('.'+data.active));
					alert(now)
					// move target element
					/*self.find('.'+data.active).animate({
						'left': -offsetFix+naviWidth*now
					}, data.duration, data.easing)*/
					/*self.find('.'+data.active).next(data.content).animate({
						'left': naviWidth*(descs.index($(this))+1)
					}, data.duration, data.easing)*/
					
					// move prev element
/*					self.find('.'+data.active).prevAll(data.navi).each(function(index){				
						$(this).animate({
							'left': -offsetFix+naviWidth*(terms.index($(this))-index-1)
						}, data.duration, data.easing)
					})
					self.find('.'+data.active).prevAll(data.content).each(function(index){
						var _index = $(this).index('dd');
						$(this).animate({
							'left': naviWidth*(descs.index($(this))-index+1)
						}, data.duration, data.easing)
					})
					
					self.find('.'+data.active).nextAll(data.navi).each(function(index){
						$(this).animate({
							'left': -offsetFix+naviWidth*(terms.index($(this))+index)+contentWidth
						})
					})
					self.find('.'+data.active).next(data.content).nextAll(data.content).each(function(index){
						$(this).animate({
							'left': naviWidth*(descs.index($(this))+index+2)+contentWidth
						})
					})*/
				}
				
				self.find(data.navi).each(function(index) {
					$(this).css({
						'top': offsetFix,
						'left': -offsetFix+naviWidth*index,
						'z-index': index
					})
				});
				
				self.find(data.content).each(function(index){
					$(this).css({
						'width': contentWidth,
						'top': 0,
						'left': naviWidth*(index+1),
						'z-index': index
					})
				})
				
				self.find(data.navi).each(function() {
					$(this).bind(data.trigger+'.laconicpromised', function(){
						//toggle($(this), now);
						//$(this).addClass(data.active).siblings(data.navi).removeClass(data.active);
						newToggle();
					})
				});
				
				self.find(data.navi).each(function(){
					var original, result = new String;
					original = $(this).text();
					original = original.split('');
					
					for (var i = 0; i < original.length; i++) {
						result += "<span>"+(original[i])+"</span>"
					}
					
					$(this).html(result);
					$(this).find('span').each(function() {
						if(/[^\x00-\xff]/g.test($(this).text())){
							$(this).addClass('cn')
						}
					});
				})
				
				if(data.autoplay){
					
				}
				
			})
		},
		destroy: function(){
			return this.each(function(){
				var self = $(this);
				var data = self.data('laconicpromised'); // data flag
				if(data){ // if initialized, remove event handler, data and class

					self.removeData('laconicpromised');
					self.removeClass(data.active);
				}
			})
		},
		update: function(options){ // update the plug-in options
			return this.each(function(){
				var self = $(this);
				var data = self.data('laconicpromised'); // get current settings
				if(data&&options){
					var settings = $.extend({}, data, options);
					self.comingohstrolls('destroy'); // deactive the plugin
					data = self.data('laconicpromised', settings); // update data
					self.comingohstrolls('init'); // reactive
				}
			})
		}
	};
	
	$.fn.laconicpromised = function(method){ // call method logic
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof method==='object'||!method){
			return methods.init.apply(this, arguments);
		}else{
			$.error('Method '+method+' does not exist on jQuery.laconicpromised.');
		}
	};

	// default settings
	$.fn.laconicpromised.defaults = {
		container: '',
		navi: 'dt',
		content: 'dd',
		gap: 0,
		active: 'laconicpromised-active',
		duration: 500,
		autoplay: false,
		interval: 3500,
		trigger: 'click'
	}
})(jQuery);