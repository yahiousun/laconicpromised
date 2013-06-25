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
						key: settings.key,
						content: settings.content,
						//gap: settings.gap,
						active: settings.active,
						duration: settings.duration,
						autoplay: settings.autoplay,
						interval: settings.interval,
						trigger: settings.trigger
					});
					data = self.data('laconicpromised');
				}
				
				var key = self.find(data.key);
				var contents = self.find(data.key);
				var containerWidth = self.width();
				var keyWidth = key.eq(0).height();
				var keyHeight = key.eq(0).width();
				var contentWidth = containerWidth-keyWidth*key.length;
				var offsetFix = (keyHeight-keyWidth)/2;
				if(document.attachEvent && !document.addEventListener){ // if old IE
					offsetFix = 0;
					key.each(function() {
						$(this).css({
							'width': 30,
							'height': 150
						})
					});
				}
				
				function toggle(target, current){
					
					target.prevAll(data.key).each(function(index){				
						$(this).animate({
							'left': -offsetFix+keyWidth*(current-index-1)
						})
					})
					target.prevAll(data.content).each(function(index){
						var _index = $(this).index('dd');
						$(this).animate({
							'left': keyWidth*(current-index)
						})
					})
					
					target.animate({
						'left': -offsetFix+keyWidth*current
					}, function(){
						$(this).addClass(data.active);
					})
					target.next(data.content).animate({
						'left': keyWidth*(current+1)
					})
					
					target.nextAll(data.key).each(function(index){
						$(this).animate({
							'left': -offsetFix+keyWidth*(current+index+1)+contentWidth
						})
					})
					target.next(data.content).nextAll(data.content).each(function(index){
						$(this).animate({
							'left': keyWidth*(current+index+2)+contentWidth
						})
					})
					
				}
				
				key.eq(3).addClass(data.active)
				
				function newToggle(){
					
					var keys = self.find(data.key);
					var current = keys.index($('.'+data.active));
					
					// move target element
					self.find('.'+data.active).animate({
						'left': -offsetFix+keyWidth*current
					}, data.duration, data.easing)
					self.find('.'+data.active).next(data.content).animate({
						'left': keyWidth*(current+1)
					}, data.duration, data.easing)
					
					// move prev element
					self.find('.'+data.active).prevAll(data.key).each(function(index){				
						$(this).animate({
							'left': -offsetFix+keyWidth*(current-index-1)
						}, data.duration, data.easing)
					})
					self.find('.'+data.active).prevAll(data.content).each(function(index){
						var _index = $(this).index('dd');
						$(this).animate({
							'left': keyWidth*(current-index)
						}, data.duration, data.easing)
					})
					
					self.find('.'+data.active).nextAll(data.key).each(function(index){
						$(this).animate({
							'left': -offsetFix+keyWidth*(current+index+1)+contentWidth
						})
					})
					self.find('.'+data.active).next(data.content).nextAll(data.content).each(function(index){
						$(this).animate({
							'left': keyWidth*(current+index+2)+contentWidth
						})
					})
				}
				
				self.find(data.key).each(function(index) {
					$(this).css({
						'top': offsetFix,
						'left': -offsetFix+keyWidth*index,
						'z-index': index
					})
				});
				
				self.find(data.content).each(function(index){
					$(this).css({
						'width': contentWidth,
						'top': 0,
						'left': keyWidth*(index+1),
						'z-index': index
					})
				})
				
				self.find(data.key).each(function() {
					$(this).bind(data.trigger+'.laconicpromised', function(){
						//toggle($(this), current);
						$(this).addClass(data.active).siblings(data.key).removeClass(data.active);
						newToggle();
					})
				});
				
				self.find(data.key).each(function(){
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
		key: 'dt',
		content: 'dd',
		//gap: 0,
		active: 'active',
		duration: 500,
		autoplay: false,
		interval: 3500,
		trigger: 'click'
	}
})(jQuery);