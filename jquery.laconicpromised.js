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
				var total = navi.length;
				var containerWidth = self.width();
				var naviWidth = navi.eq(0).height();
				var naviHeight = navi.eq(0).width();
				var contentWidth = containerWidth-naviWidth*total;
				var offsetFix = (naviHeight-naviWidth)/2;
				
				function toggle(target, now){
					
					target.prevAll('dt').each(function(index){				
						$(this).animate({
							'left': -offsetFix+naviWidth*(now-index-1)
						})
					})
					
					target.prevAll('dd').each(function(index){
						var _index = $(this).index('dd');
						$(this).animate({
							'left': naviWidth*(now-index)
						})
					})

					target.nextAll('dt').each(function(index){
						$(this).animate({
							'left': -offsetFix+naviWidth*(now+index+1)+contentWidth
						})
					})
					target.next('dd').nextAll('dd').each(function(index){
						$(this).animate({
							'left': naviWidth*(now+index+2)+contentWidth
						})
					})
					
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
				
				self.find(data.navi).each(function(now) {
					$(this).bind('click.laconicpromised', function(){
						toggle($(this), now);
					})
				});
				
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
		autoplay: true,
		interval: 3500,
		trigger: 'click'
	}
})(jQuery);