// place any jQuery/helper plugins in here, instead of separate, slower script files.

/*!
* Bootstrap.js by @fat & @mdo
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(a){a(function(){"use strict",a.support.transition=function(){var a=function(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},c;for(c in b)if(a.style[c]!==undefined)return b[c]}();return a&&{end:a}}()})}(window.jQuery),!function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function f(){e.trigger("closed").remove()}var c=a(this),d=c.attr("data-target"),e;d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),e=a(d),b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.trigger(b=a.Event("close"));if(b.isDefaultPrevented())return;e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.on(a.support.transition.end,f):f()},a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("alert");e||d.data("alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a(function(){a("body").on("click.alert.data-api",b,c.prototype.close)})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.button.defaults,c)};b.prototype.setState=function(a){var b="disabled",c=this.$element,d=c.data(),e=c.is("input")?"val":"html";a+="Text",d.resetText||c.data("resetText",c[e]()),c[e](d[a]||this.options[a]),setTimeout(function(){a=="loadingText"?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},b.prototype.toggle=function(){var a=this.$element.parent('[data-toggle="buttons-radio"]');a&&a.find(".active").removeClass("active"),this.$element.toggleClass("active")},a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("button"),f=typeof c=="object"&&c;e||d.data("button",e=new b(this,f)),c=="toggle"?e.toggle():c&&e.setState(c)})},a.fn.button.defaults={loadingText:"loading..."},a.fn.button.Constructor=b,a(function(){a("body").on("click.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle")})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=c,this.options.slide&&this.slide(this.options.slide),this.options.pause=="hover"&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.prototype={cycle:function(b){return b||(this.paused=!1),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},to:function(b){var c=this.$element.find(".item.active"),d=c.parent().children(),e=d.index(c),f=this;if(b>d.length-1||b<0)return;return this.sliding?this.$element.one("slid",function(){f.to(b)}):e==b?this.pause().cycle():this.slide(b>e?"next":"prev",a(d[b]))},pause:function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition.end&&(this.$element.trigger(a.support.transition.end),this.cycle()),clearInterval(this.interval),this.interval=null,this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g=b=="next"?"left":"right",h=b=="next"?"first":"last",i=this,j=a.Event("slide",{relatedTarget:e[0]});this.sliding=!0,f&&this.pause(),e=e.length?e:this.$element.find(".item")[h]();if(e.hasClass("active"))return;if(a.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(j);if(j.isDefaultPrevented())return;e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),this.$element.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)})}else{this.$element.trigger(j);if(j.isDefaultPrevented())return;d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return f&&this.cycle(),this}},a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("carousel"),f=a.extend({},a.fn.carousel.defaults,typeof c=="object"&&c),g=typeof c=="string"?c:f.slide;e||d.data("carousel",e=new b(this,f)),typeof c=="number"?e.to(c):g?e[g]():f.interval&&e.cycle()})},a.fn.carousel.defaults={interval:5e3,pause:"hover"},a.fn.carousel.Constructor=b,a(function(){a("body").on("click.carousel.data-api","[data-slide]",function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=!e.data("modal")&&a.extend({},e.data(),c.data());e.carousel(f),b.preventDefault()})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.collapse.defaults,c),this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.prototype={constructor:b,dimension:function(){var a=this.$element.hasClass("width");return a?"width":"height"},show:function(){var b,c,d,e;if(this.transitioning)return;b=this.dimension(),c=a.camelCase(["scroll",b].join("-")),d=this.$parent&&this.$parent.find("> .accordion-group > .in");if(d&&d.length){e=d.data("collapse");if(e&&e.transitioning)return;d.collapse("hide"),e||d.data("collapse",null)}this.$element[b](0),this.transition("addClass",a.Event("show"),"shown"),a.support.transition&&this.$element[b](this.$element[0][c])},hide:function(){var b;if(this.transitioning)return;b=this.dimension(),this.reset(this.$element[b]()),this.transition("removeClass",a.Event("hide"),"hidden"),this.$element[b](0)},reset:function(a){var b=this.dimension();return this.$element.removeClass("collapse")[b](a||"auto")[0].offsetWidth,this.$element[a!==null?"addClass":"removeClass"]("collapse"),this},transition:function(b,c,d){var e=this,f=function(){c.type=="show"&&e.reset(),e.transitioning=0,e.$element.trigger(d)};this.$element.trigger(c);if(c.isDefaultPrevented())return;this.transitioning=1,this.$element[b]("in"),a.support.transition&&this.$element.hasClass("collapse")?this.$element.one(a.support.transition.end,f):f()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}},a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("collapse"),f=typeof c=="object"&&c;e||d.data("collapse",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.collapse.defaults={toggle:!0},a.fn.collapse.Constructor=b,a(function(){a("body").on("click.collapse.data-api","[data-toggle=collapse]",function(b){var c=a(this),d,e=c.attr("data-target")||b.preventDefault()||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),f=a(e).data("collapse")?"toggle":c.data();c[a(e).hasClass("in")?"addClass":"removeClass"]("collapsed"),a(e).collapse(f)})})}(window.jQuery),!function(a){function d(){e(a(b)).removeClass("open")}function e(b){var c=b.attr("data-target"),d;return c||(c=b.attr("href"),c=c&&c.replace(/.*(?=#[^\s]*$)/,"")),d=a(c),d.length||(d=b.parent()),d}"use strict";var b="[data-toggle=dropdown]",c=function(b){var c=a(b).on("click.dropdown.data-api",this.toggle);a("html").on("click.dropdown.data-api",function(){c.parent().removeClass("open")})};c.prototype={constructor:c,toggle:function(b){var c=a(this),f,g;if(c.is(".disabled, :disabled"))return;return f=e(c),g=f.hasClass("open"),d(),g||(f.toggleClass("open"),c.focus()),!1},keydown:function(b){var c,d,f,g,h,i;if(!/(38|40|27)/.test(b.keyCode))return;c=a(this),b.preventDefault(),b.stopPropagation();if(c.is(".disabled, :disabled"))return;g=e(c),h=g.hasClass("open");if(!h||h&&b.keyCode==27)return c.click();d=a("[role=menu] li:not(.divider) a",g);if(!d.length)return;i=d.index(d.filter(":focus")),b.keyCode==38&&i>0&&i--,b.keyCode==40&&i<d.length-1&&i++,~i||(i=0),d.eq(i).focus()}},a.fn.dropdown=function(b){return this.each(function(){var d=a(this),e=d.data("dropdown");e||d.data("dropdown",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.dropdown.Constructor=c,a(function(){a("html").on("click.dropdown.data-api touchstart.dropdown.data-api",d),a("body").on("click.dropdown touchstart.dropdown.data-api",".dropdown",function(a){a.stopPropagation()}).on("click.dropdown.data-api touchstart.dropdown.data-api",b,c.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api",b+", [role=menu]",c.prototype.keydown)})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b).delegate('[data-dismiss="modal"]',"click.dismiss.modal",a.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};b.prototype={constructor:b,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var b=this,c=a.Event("show");this.$element.trigger(c);if(this.isShown||c.isDefaultPrevented())return;a("body").addClass("modal-open"),this.isShown=!0,this.escape(),this.backdrop(function(){var c=a.support.transition&&b.$element.hasClass("fade");b.$element.parent().length||b.$element.appendTo(document.body),b.$element.show(),c&&b.$element[0].offsetWidth,b.$element.addClass("in").attr("aria-hidden",!1).focus(),b.enforceFocus(),c?b.$element.one(a.support.transition.end,function(){b.$element.trigger("shown")}):b.$element.trigger("shown")})},hide:function(b){b&&b.preventDefault();var c=this;b=a.Event("hide"),this.$element.trigger(b);if(!this.isShown||b.isDefaultPrevented())return;this.isShown=!1,a("body").removeClass("modal-open"),this.escape(),a(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),a.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var b=this;a(document).on("focusin.modal",function(a){b.$element[0]!==a.target&&!b.$element.has(a.target).length&&b.$element.focus()})},escape:function(){var a=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(b){b.which==27&&a.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var b=this,c=setTimeout(function(){b.$element.off(a.support.transition.end),b.hideModal()},500);this.$element.one(a.support.transition.end,function(){clearTimeout(c),b.hideModal()})},hideModal:function(a){this.$element.hide().trigger("hidden"),this.backdrop()},removeBackdrop:function(){this.$backdrop.remove(),this.$backdrop=null},backdrop:function(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(document.body),this.options.backdrop!="static"&&this.$backdrop.click(a.proxy(this.hide,this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),e?this.$backdrop.one(a.support.transition.end,b):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,a.proxy(this.removeBackdrop,this)):this.removeBackdrop()):b&&b()}},a.fn.modal=function(c){return this.each(function(){var d=a(this),e=d.data("modal"),f=a.extend({},a.fn.modal.defaults,d.data(),typeof c=="object"&&c);e||d.data("modal",e=new b(this,f)),typeof c=="string"?e[c]():f.show&&e.show()})},a.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},a.fn.modal.Constructor=b,a(function(){a("body").on("click.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());b.preventDefault(),e.modal(f).one("hide",function(){c.focus()})})})}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,this.options.trigger=="click"?this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this)):this.options.trigger!="manual"&&(e=this.options.trigger=="hover"?"mouseenter":"focus",f=this.options.trigger=="hover"?"mouseleave":"blur",this.$element.on(e+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f+"."+this.type,this.options.selector,a.proxy(this.leave,this))),this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,b,this.$element.data()),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);if(!c.options.delay||!c.options.delay.show)return c.show();clearTimeout(this.timeout),c.hoverState="in",this.timeout=setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show)},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!c.options.delay||!c.options.delay.hide)return c.hide();c.hoverState="out",this.timeout=setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide)},show:function(){var a,b,c,d,e,f,g;if(this.hasContent()&&this.enabled){a=this.tip(),this.setContent(),this.options.animation&&a.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,b=/in/.test(f),a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body),c=this.getPosition(b),d=a[0].offsetWidth,e=a[0].offsetHeight;switch(b?f.split(" ")[1]:f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}a.css(g).addClass(f).addClass("in")}},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},hide:function(){function d(){var b=setTimeout(function(){c.off(a.support.transition.end).remove()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.remove()})}var b=this,c=this.tip();return c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d():c.remove(),this},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(b){return a.extend({},b?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}},a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0,html:!0}}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content > *")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-content")||(typeof c.content=="function"?c.content.call(b[0]):c.content),a},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}}),a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;e||d.data("popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery),!function(a){function b(b,c){var d=a.proxy(this.process,this),e=a(b).is("body")?a(window):a(b),f;this.options=a.extend({},a.fn.scrollspy.defaults,c),this.$scrollElement=e.on("scroll.scroll-spy.data-api",d),this.selector=(this.options.target||(f=a(b).attr("href"))&&f.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=a("body"),this.refresh(),this.process()}"use strict",b.prototype={constructor:b,refresh:function(){var b=this,c;this.offsets=a([]),this.targets=a([]),c=this.$body.find(this.selector).map(function(){var b=a(this),c=b.data("target")||b.attr("href"),d=/^#\w/.test(c)&&a(c);return d&&d.length&&[[d.position().top,c]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},process:function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,c=b-this.$scrollElement.height(),d=this.offsets,e=this.targets,f=this.activeTarget,g;if(a>=c)return f!=(g=e.last()[0])&&this.activate(g);for(g=d.length;g--;)f!=e[g]&&a>=d[g]&&(!d[g+1]||a<=d[g+1])&&this.activate(e[g])},activate:function(b){var c,d;this.activeTarget=b,a(this.selector).parent(".active").removeClass("active"),d=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',c=a(d).parent("li").addClass("active"),c.parent(".dropdown-menu").length&&(c=c.closest("li.dropdown").addClass("active")),c.trigger("activate")}},a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("scrollspy"),f=typeof c=="object"&&c;e||d.data("scrollspy",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.defaults={offset:10},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),!function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype={constructor:b,show:function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target"),e,f,g;d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));if(b.parent("li").hasClass("active"))return;e=c.find(".active a").last()[0],g=a.Event("show",{relatedTarget:e}),b.trigger(g);if(g.isDefaultPrevented())return;f=a(d),this.activate(b.parent("li"),c),this.activate(f,f.parent(),function(){b.trigger({type:"shown",relatedTarget:e})})},activate:function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),f?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g):g(),e.removeClass("in")}},a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("tab");e||d.data("tab",e=new b(this)),typeof c=="string"&&e[c]()})},a.fn.tab.Constructor=b,a(function(){a("body").on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})})}(window.jQuery),!function(a){"use strict";var b=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.typeahead.defaults,c),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.$menu=a(this.options.menu).appendTo("body"),this.source=this.options.source,this.shown=!1,this.listen()};b.prototype={constructor:b,select:function(){var a=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(a)).change(),this.hide()},updater:function(a){return a},show:function(){var b=a.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});return this.$menu.css({top:b.top+b.height,left:b.left}),this.$menu.show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(b){var c;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(c=a.isFunction(this.source)?this.source(this.query,a.proxy(this.process,this)):this.source,c?this.process(c):this)},process:function(b){var c=this;return b=a.grep(b,function(a){return c.matcher(a)}),b=this.sorter(b),b.length?this.render(b.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(a){return~a.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(a){var b=[],c=[],d=[],e;while(e=a.shift())e.toLowerCase().indexOf(this.query.toLowerCase())?~e.indexOf(this.query)?c.push(e):d.push(e):b.push(e);return b.concat(c,d)},highlighter:function(a){var b=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return a.replace(new RegExp("("+b+")","ig"),function(a,b){return"<strong>"+b+"</strong>"})},render:function(b){var c=this;return b=a(b).map(function(b,d){return b=a(c.options.item).attr("data-value",d),b.find("a").html(c.highlighter(d)),b[0]}),b.first().addClass("active"),this.$menu.html(b),this},next:function(b){var c=this.$menu.find(".active").removeClass("active"),d=c.next();d.length||(d=a(this.$menu.find("li")[0])),d.addClass("active")},prev:function(a){var b=this.$menu.find(".active").removeClass("active"),c=b.prev();c.length||(c=this.$menu.find("li").last()),c.addClass("active")},listen:function(){this.$element.on("blur",a.proxy(this.blur,this)).on("keypress",a.proxy(this.keypress,this)).on("keyup",a.proxy(this.keyup,this)),(a.browser.webkit||a.browser.msie)&&this.$element.on("keydown",a.proxy(this.keydown,this)),this.$menu.on("click",a.proxy(this.click,this)).on("mouseenter","li",a.proxy(this.mouseenter,this))},move:function(a){if(!this.shown)return;switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();break;case 38:a.preventDefault(),this.prev();break;case 40:a.preventDefault(),this.next()}a.stopPropagation()},keydown:function(b){this.suppressKeyPressRepeat=!~a.inArray(b.keyCode,[40,38,9,13,27]),this.move(b)},keypress:function(a){if(this.suppressKeyPressRepeat)return;this.move(a)},keyup:function(a){switch(a.keyCode){case 40:case 38:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}a.stopPropagation(),a.preventDefault()},blur:function(a){var b=this;setTimeout(function(){b.hide()},150)},click:function(a){a.stopPropagation(),a.preventDefault(),this.select()},mouseenter:function(b){this.$menu.find(".active").removeClass("active"),a(b.currentTarget).addClass("active")}},a.fn.typeahead=function(c){return this.each(function(){var d=a(this),e=d.data("typeahead"),f=typeof c=="object"&&c;e||d.data("typeahead",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1},a.fn.typeahead.Constructor=b,a(function(){a("body").on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(b){var c=a(this);if(c.data("typeahead"))return;b.preventDefault(),c.typeahead(c.data())})})}(window.jQuery);


(function(w){var k=function(b,c){typeof c=="undefined"&&(c={});this.init(b,c)},a=k.prototype,o,p=["canvas","vml"],f=["oval","spiral","square","rect","roundRect"],x=/^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,v=navigator.appVersion.indexOf("MSIE")!==-1&&parseFloat(navigator.appVersion.split("MSIE")[1])===8?true:false,y=!!document.createElement("canvas").getContext,q=true,n=function(b,c,a){var b=document.createElement(b),d;for(d in a)b[d]=a[d];typeof c!=="undefined"&&c.appendChild(b);return b},m=function(b,
c){for(var a in c)b.style[a]=c[a];return b},t=function(b,c){for(var a in c)b.setAttribute(a,c[a]);return b},u=function(b,c,a,d){b.save();b.translate(c,a);b.rotate(d);b.translate(-c,-a);b.beginPath()};a.init=function(b,c){if(typeof c.safeVML==="boolean")q=c.safeVML;try{this.mum=document.getElementById(b)!==void 0?document.getElementById(b):document.body}catch(a){this.mum=document.body}c.id=typeof c.id!=="undefined"?c.id:"canvasLoader";this.cont=n("div",this.mum,{id:c.id});if(y)o=p[0],this.can=n("canvas",
this.cont),this.con=this.can.getContext("2d"),this.cCan=m(n("canvas",this.cont),{display:"none"}),this.cCon=this.cCan.getContext("2d");else{o=p[1];if(typeof k.vmlSheet==="undefined"){document.getElementsByTagName("head")[0].appendChild(n("style"));k.vmlSheet=document.styleSheets[document.styleSheets.length-1];var d=["group","oval","roundrect","fill"],e;for(e in d)k.vmlSheet.addRule(d[e],"behavior:url(#default#VML); position:absolute;")}this.vml=n("group",this.cont)}this.setColor(this.color);this.draw();
m(this.cont,{display:"none"})};a.cont={};a.can={};a.con={};a.cCan={};a.cCon={};a.timer={};a.activeId=0;a.diameter=40;a.setDiameter=function(b){this.diameter=Math.round(Math.abs(b));this.redraw()};a.getDiameter=function(){return this.diameter};a.cRGB={};a.color="#000000";a.setColor=function(b){this.color=x.test(b)?b:"#000000";this.cRGB=this.getRGB(this.color);this.redraw()};a.getColor=function(){return this.color};a.shape=f[0];a.setShape=function(b){for(var c in f)if(b===f[c]){this.shape=b;this.redraw();
break}};a.getShape=function(){return this.shape};a.density=40;a.setDensity=function(b){this.density=q&&o===p[1]?Math.round(Math.abs(b))<=40?Math.round(Math.abs(b)):40:Math.round(Math.abs(b));if(this.density>360)this.density=360;this.activeId=0;this.redraw()};a.getDensity=function(){return this.density};a.range=1.3;a.setRange=function(b){this.range=Math.abs(b);this.redraw()};a.getRange=function(){return this.range};a.speed=2;a.setSpeed=function(b){this.speed=Math.round(Math.abs(b))};a.getSpeed=function(){return this.speed};
a.fps=24;a.setFPS=function(b){this.fps=Math.round(Math.abs(b));this.reset()};a.getFPS=function(){return this.fps};a.getRGB=function(b){b=b.charAt(0)==="#"?b.substring(1,7):b;return{r:parseInt(b.substring(0,2),16),g:parseInt(b.substring(2,4),16),b:parseInt(b.substring(4,6),16)}};a.draw=function(){var b=0,c,a,d,e,h,k,j,r=this.density,s=Math.round(r*this.range),l,i,q=0;i=this.cCon;var g=this.diameter;if(o===p[0]){i.clearRect(0,0,1E3,1E3);t(this.can,{width:g,height:g});for(t(this.cCan,{width:g,height:g});b<
r;){l=b<=s?1-1/s*b:l=0;k=270-360/r*b;j=k/180*Math.PI;i.fillStyle="rgba("+this.cRGB.r+","+this.cRGB.g+","+this.cRGB.b+","+l.toString()+")";switch(this.shape){case f[0]:case f[1]:c=g*0.07;e=g*0.47+Math.cos(j)*(g*0.47-c)-g*0.47;h=g*0.47+Math.sin(j)*(g*0.47-c)-g*0.47;i.beginPath();this.shape===f[1]?i.arc(g*0.5+e,g*0.5+h,c*l,0,Math.PI*2,false):i.arc(g*0.5+e,g*0.5+h,c,0,Math.PI*2,false);break;case f[2]:c=g*0.12;e=Math.cos(j)*(g*0.47-c)+g*0.5;h=Math.sin(j)*(g*0.47-c)+g*0.5;u(i,e,h,j);i.fillRect(e,h-c*0.5,
c,c);break;case f[3]:case f[4]:a=g*0.3,d=a*0.27,e=Math.cos(j)*(d+(g-d)*0.13)+g*0.5,h=Math.sin(j)*(d+(g-d)*0.13)+g*0.5,u(i,e,h,j),this.shape===f[3]?i.fillRect(e,h-d*0.5,a,d):(c=d*0.55,i.moveTo(e+c,h-d*0.5),i.lineTo(e+a-c,h-d*0.5),i.quadraticCurveTo(e+a,h-d*0.5,e+a,h-d*0.5+c),i.lineTo(e+a,h-d*0.5+d-c),i.quadraticCurveTo(e+a,h-d*0.5+d,e+a-c,h-d*0.5+d),i.lineTo(e+c,h-d*0.5+d),i.quadraticCurveTo(e,h-d*0.5+d,e,h-d*0.5+d-c),i.lineTo(e,h-d*0.5+c),i.quadraticCurveTo(e,h-d*0.5,e+c,h-d*0.5))}i.closePath();i.fill();
i.restore();++b}}else{m(this.cont,{width:g,height:g});m(this.vml,{width:g,height:g});switch(this.shape){case f[0]:case f[1]:j="oval";c=140;break;case f[2]:j="roundrect";c=120;break;case f[3]:case f[4]:j="roundrect",c=300}a=d=c;e=500-d;for(h=-d*0.5;b<r;){l=b<=s?1-1/s*b:l=0;k=270-360/r*b;switch(this.shape){case f[1]:a=d=c*l;e=500-c*0.5-c*l*0.5;h=(c-c*l)*0.5;break;case f[0]:case f[2]:v&&(h=0,this.shape===f[2]&&(e=500-d*0.5));break;case f[3]:case f[4]:a=c*0.95,d=a*0.28,v?(e=0,h=500-d*0.5):(e=500-a,h=
-d*0.5),q=this.shape===f[4]?0.6:0}i=t(m(n("group",this.vml),{width:1E3,height:1E3,rotation:k}),{coordsize:"1000,1000",coordorigin:"-500,-500"});i=m(n(j,i,{stroked:false,arcSize:q}),{width:a,height:d,top:h,left:e});n("fill",i,{color:this.color,opacity:l});++b}}this.tick(true)};a.clean=function(){if(o===p[0])this.con.clearRect(0,0,1E3,1E3);else{var b=this.vml;if(b.hasChildNodes())for(;b.childNodes.length>=1;)b.removeChild(b.firstChild)}};a.redraw=function(){this.clean();this.draw()};a.reset=function(){typeof this.timer===
"number"&&(this.hide(),this.show())};a.tick=function(b){var a=this.con,f=this.diameter;b||(this.activeId+=360/this.density*this.speed);o===p[0]?(a.clearRect(0,0,f,f),u(a,f*0.5,f*0.5,this.activeId/180*Math.PI),a.drawImage(this.cCan,0,0,f,f),a.restore()):(this.activeId>=360&&(this.activeId-=360),m(this.vml,{rotation:this.activeId}))};a.show=function(){if(typeof this.timer!=="number"){var a=this;this.timer=self.setInterval(function(){a.tick()},Math.round(1E3/this.fps));m(this.cont,{display:"block"})}};
a.hide=function(){typeof this.timer==="number"&&(clearInterval(this.timer),delete this.timer,m(this.cont,{display:"none"}))};a.kill=function(){var a=this.cont;typeof this.timer==="number"&&this.hide();o===p[0]?(a.removeChild(this.can),a.removeChild(this.cCan)):a.removeChild(this.vml);for(var c in this)delete this[c]};w.CanvasLoader=k})(window);

(function(a){a.fn.llskala=function(b){var b=a.extend({bleed:false,margin:0,align:"center",valign:"center"},b);var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q;c=a(this);d=c.width();e=c.height();l=d/e;if(b.bleed){j=Math.floor(d);k=Math.floor(e)}else{j=Math.round(d)-b.margin*2;k=Math.round(e)-b.margin*2}h=c.children();h.each(function(c){i=a(this);f=Math.round(i.width());g=Math.round(i.height());m=f/g;q={left:0,top:0};if(b.bleed){if(l>=1){if(m>=1){rw=f/d;rh=g/e;if(rw>rh){n=e/g;o=Math.round(f*n);p=k}else{n=d/f;p=Math.round(g*n);p<e?p=e+2:p=p;o=j}}else{n=d/f;p=Math.round(g*n);p<e?p=e+2:p=p;o=j}}else{if(m>=1){n=e/g;o=Math.round(f*n);o<d?o=d+2:o=o;p=k}else{rw=f/j;rh=g/k;if(rw>rh){n=e/g;o=Math.round(f*n);p=k}else{n=d/f;p=Math.round(g*n);o=j}}}if(b.align=="center"){if(o>d)a.extend(q,{left:"-"+Math.round((o-d)/2)+"px"})}else if(b.align=="right"){if(o>d)a.extend(q,{left:"-"+(Math.round(o-d)-b.margin)+"px"})}if(b.valign=="center"){if(p>e)a.extend(q,{top:"-"+Math.round((p-e)/2)+"px"})}else if(b.valign=="bottom"){if(p>e)a.extend(q,{top:"-"+(Math.round(p-e)-b.margin)+"px"})}}else{if(l>=1){if(m>=1){rw=f/j;rh=g/k;if(rw>rh){n=j/f;p=Math.round(g*n);o=j}else{n=k/g;o=Math.round(f*n);p=k}}else{n=k/g;o=Math.round(f*n);p=k}}else{if(m>=1){n=j/f;p=Math.round(g*n);o=j}else{rw=f/j;rh=g/k;if(rw>rh){n=j/f;p=Math.round(g*n);o=j}else{n=k/g;o=Math.round(f*n);p=k}}}if(b.align=="center"){if(d>=o)a.extend(q,{left:Math.round((d-o)/2)+"px"})}else if(b.align=="right"){if(d>=o)a.extend(q,{left:Math.round(d-o)-b.margin+"px"})}if(b.valign=="center"){if(e>=p)a.extend(q,{top:Math.round((e-p)/2)+"px"})}else if(b.valign=="bottom"){if(e>=p)a.extend(q,{top:Math.round(e-p)-b.margin+"px"})}}i.width(o).height(p).css(q)})}})(jQuery);

// https://github.com/pentatonicfunk/jQuery-hoverIntent-Live/blob/master/jquery.hoverIntent.min.js

(function(a){a.fn.hoverIntent=function(k,j){var l={sensitivity:7,interval:100,timeout:0};l=a.extend(l,j?{over:k,out:j}:k);var n,m,h,d;var e=function(f){n=f.pageX;m=f.pageY};var c=function(g,f){f.hoverIntent_t=clearTimeout(f.hoverIntent_t);if((Math.abs(h-n)+Math.abs(d-m))<l.sensitivity){a(f).die({mousemove:function(o){e(o)}});f.hoverIntent_s=1;return l.over.apply(f,[g])}else{h=n;d=m;f.hoverIntent_t=setTimeout(function(){c(g,f)},l.interval)}};var i=function(g,f){f.hoverIntent_t=clearTimeout(f.hoverIntent_t);f.hoverIntent_s=0;return l.out.apply(f,[g])};var b=function(o,f){var g=jQuery.extend({},o);if(f.hoverIntent_t){f.hoverIntent_t=clearTimeout(f.hoverIntent_t)}if(o.type=="mouseenter"){h=g.pageX;d=g.pageY;a(f).live("mousemove",function(p){e(p)});if(f.hoverIntent_s!=1){f.hoverIntent_t=setTimeout(function(){c(g,f)},l.interval)}}else{a(f).die("mousemove",function(p){e(p)});if(f.hoverIntent_s==1){f.hoverIntent_t=setTimeout(function(){i(g,f)},l.timeout)}}};return this.live({mouseenter:function(f){b(f,this)},mouseleave:function(f){b(f,this)}})}})(jQuery);



;(function ($, window, document, undefined) {
        $.fn.overThumb = function (options) {
                var opts = $.extend({}, $.fn.overThumb.defaults, options);
                return this.each(function () {


                        if (!$(this).hasClass("thumbinized")) {

                                $(this).addClass("thumbinized");
                                var $img = $(this).find('img, a > .fluid-width-video-wrapper');
                                var imageTitle = $(this).attr("data-overlay");
                                var imageArea = $(this).attr("data-area");
                                var textDesc;
                                if (opts.innerText) {
	                                if (imageArea != undefined) textDesc = "<div class='thumb-overlay-inner'><div class='thumb-overlay-content'><p class='thumb-overlay-desc'>" + imageTitle + "</p><p class='thumb-type'>" + imageArea + "</p></div></div>";
	                                else textDesc = "<div class='thumb-overlay-inner'><div class='thumb-overlay-content'><p class='thumb-overlay-desc'>" + imageTitle + "</p></div></div>";
	                            }
                                var overElems = "<div class='thumb-overlay'></div><div class='thumb-overlay-icon'>" + textDesc + "</div>";

                                $img.before(overElems);

                               /* $(this).find('.thumb-overlay, .thumb-overlay-icon, .thumb-overlay-content').css({
                                        "opacity": "0"
                                });

                                (opts.innerText) ? $(this).find('.thumb-overlay-icon').css('color', opts.descColor) : $(this).find('.thumb-overlay-icon');
                                */
                                function thumbIn() { 
                                		if(!$(this).parent().data('disable')) {
	                                		$(this).find('.thumb-overlay').stop().animate({
                                                opacity: opts.overlayOpacity
	                                        }, {           duration: opts.overlayInTime,
	                                                          easing: 'easeOutSine'        
	                                        });
	                                        $(this).find('.thumb-overlay-icon, .thumb-overlay-content').stop().delay(opts.descriptionDelay).animate({
	                                                opacity: 1
	                                        }, {           duration: opts.overlayDescInTime,
	                                                          easing: 'easeOutSine'        
	                                        })
                                		} 
                                };

                                function thumbOut() {
                                        $(this).find('.thumb-overlay, .thumb-overlay-icon, .thumb-overlay-content').stop().animate({
                                                opacity: 0
                                        }, opts.overlayOutTime, 'easeInSine');
                                }
                                var config = {
                                        over: thumbIn,
                                        sensitivity: 7,
                                        interval: 20,
                                        timeout: 0,
                                        out: thumbOut 
                                };
                                //$(this).hoverIntent(config)

                        }
                });
        };
        $.fn.overThumb.defaults = {
                innerText: true,
                overlayInTime: 200,
                overlayDescInTime: 200,
                overlayOutTime: 200,
                descriptionDelay: 0,
                overlayOpacity: 0.9,
                // overlayColor: '#141414',
                // iconUrl: siteUrl + "/img/plus3.png",
                descColor: '#ffffff'
        };
})(jQuery, window, document);

/*!
 * Fresco - A Beautiful Responsive Lightbox - v1.4.5
 * (c) 2012-2014 Nick Stakenburg
 *
 * http://www.frescojs.com
 *
 * License: http://www.frescojs.com/license
 */

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(J($){J 1g(i){K t={};23(K e 4N i)t[e]=i[e]+"1g";T t}J 5v(){K i=z.38();T i.N>i.M?"3a":"3W"}J 6z(i){T 5w.7V.2L(5w,i.3F(","))}J 6A(){23(K i="",t=6z("9Z,97,a0,7W,a1,a2");!/^([a-5x-Z])+/.5y(i);)i=19[t]().a3(36).5z(2,5);T i}J 6z(i){T 5w.7V.2L(5w,i.3F(","))}J 5A(i){1d.6B&&6B[6B.5A?"5A":"a4"](i)}J 6C(i,t){W(!2f.7X)T t(!1,1),2M 0;K e={M:i.M,N:i.N},s={M:4g,N:4g},n=1,o=1;e.M>s.M&&(n=s.M/e.M),e.N>s.N&&(o=s.N/e.N);K a=19.24(n,o);1>a&&(e.M*=a,e.N*=a);K h=25 6D,r=$("<4O>").2C(e)[0],d=r.6E("2d");d.a5=.8,d.a6(i,0,0,e.M,e.N),h.3X=J(){t(h,a)};5B{h.3u=r.6F("1x/7Y")}5C(u){t(!1,1)}}J 5D(i,t){23(K e 4N t)t[e]&&t[e].7Z&&t[e].7Z===a7?(i[e]=$.1i({},i[e])||{},5D(i[e],t[e])):i[e]=t[e];T i}J 3G(i,t){T 5D($.1i({},i),t)}J 4h(){I.1F.2L(I,k.2q(1R))}J 6G(){I.1F.2L(I,k.2q(1R))}J 6H(){I.1F.2L(I,k.2q(1R))}J 6I(){I.1F.2L(I,k.2q(1R))}J 6J(){I.1F.2L(I,k.2q(1R))}J 4i(){I.1F.2L(I,k.2q(1R))}J 6K(){I.1F.2L(I,k.2q(1R))}J 4P(i){K t={13:"1x"};T $.1m(H,J(e,s){K n=s.1j(i);n&&(t=n,t.13=e,t.1B=i)}),t}J 5E(i){K t=(i||"").a8(/\\?.*/g,"").6L(/\\.([^.]{3,4})$/);T t?t[1].6M():1t}K j=1d.6N||{};$.1i(j,{6O:"1.4.5"}),j.3Y={80:{1z:{1v:{1o:0,1e:0,1N:a9,5F:!0},1S:{1o:0,1e:6P,2V:6Q},1a:{1o:4g,3H:0,2g:6P,2V:6Q},1V:{81:4g,82:4g},1d:{1o:aa,1e:6P,1A:ab},U:{1o:6Q,1e:4g,2V:ac}},5G:{U:{1o:83,1e:83,2V:ad}},5H:{1p:!0,2w:!0,5I:!0},3b:!1,3Z:"1J-1G",2x:"2D",1Y:{2h:!0},1A:!1,40:!0,84:{2D:{2k:20,2I:20},x:{2k:0,2I:0},y:{2k:0,2I:0},3c:{2k:0,2I:0}},1a:!0,14:{M:{3a:.8,3W:.6}},U:"2i",1W:{5J:1,4Q:1,ae:1,af:1,3a:0,3b:0},2j:{5J:1,3d:1,ag:1,6R:1,ah:3,3b:0,ai:1,aj:0},5K:{1x:{},1W:{M:85},2j:{M:85,N:ak}}},86:{},2l:{},87:{}};K k=al.3e.am,2y={5L:J(i){T i&&1==i.88},1c:{an:J(){J i(i){23(K t=i;t&&t.89;)t=t.89;T t}T J(t){K e=i(t);T!(!e||!e.4R)}}()}};(J(){J i(i){K t;W(i.3v.8a?t=i.3v.8a/ao:i.3v.8b&&(t=-i.3v.8b/3),t){K e=$.ap("2l:5M");$(i.2N).aq(e,t),e.ar()&&i.2E(),e.as()&&i.2r()}}$(2z.4S).1C("5M at",i)})();K q=J(){K i=0,t=6A()+6A();T J(e){23(e=e||t,i++;$("#"+e+i)[0];)i++;T e+i}}(),3I={};(J(){K i={};$.1m(["au","av","aw","ax","ay"],J(t,e){i[e]=J(i){T 19.8c(i,t+2)}}),$.1i(i,{az:J(i){T 1-19.aA(i*19.aB/2)}}),$.1m(i,J(i,t){3I["aC"+i]=t,3I["aD"+i]=J(i){T 1-t(1-i)},3I["aE"+i]=J(i){T.5>i?t(2*i)/2:1-t(-2*i+2)/2}}),$.1m(3I,J(i,t){$.3I[i]||($.3I[i]=t)})})();K z={38:J(){K i={N:$(1d).N(),M:$(1d).M()};T 1h.4T&&(i.M=1d.6S,i.N=1d.4j),i}},3J={3K:J(i){K t=$.1i({2s:"3c"},1R[1]||{});t.2W||(t.2W=$.1i({},Y.26));K e=t.2W,s=$.1i({},i),n=1,o=5;t.3L&&(e.M-=2*t.3L,e.N-=2*t.3L);K a={N:!0,M:!0};2O(t.2s){1K"2D":a={};1K"M":1K"N":a={},a[t.2s]=!0}23(;o>0&&(a.M&&s.M>e.M||a.N&&s.N>e.N);){K h=1,r=1;a.M&&s.M>e.M&&(h=e.M/s.M),a.N&&s.N>e.N&&(r=e.N/s.N);K n=19.24(h,r);s={M:19.3f(i.M*n),N:19.3f(i.N*n)},o--}T s.M=19.1H(s.M,0),s.N=19.1H(s.N,0),s}},1h=J(i){J t(t){K e=aF(t+"([\\\\d.]+)").5N(i);T e?4U(e[1]):!0}T{1q:!(!1d.aG||-1!==i.3g("6T"))&&t("aH "),6T:i.3g("6T")>-1&&(!!1d.6U&&6U.6O&&4U(6U.6O())||7.55),4k:i.3g("8d/")>-1&&t("8d/"),8e:i.3g("8e")>-1&&-1===i.3g("aI")&&t("aJ:"),4T:!!i.6L(/aK.*aL.*aM/),6V:i.3g("6V")>-1&&t("6V/"),8f:i.3g("8g")>-1&&t("8g/"),3M:i.3g("3M")>-1&&t("3M "),5O:i.3g("5O")>-1&&t("5O/")}}(8h.aN),2f=J(){J i(i){T e(i,"8i")}J t(i,t){23(K e 4N i)W(2M 0!==s.3w[i[e]])T"8i"==t?i[e]:!0;T!1}J e(i,e){K s=i.aO(0).8j()+i.5z(1),o=(i+" "+n.aP(s+" ")+s).3F(" ");T t(o,e)}K s=2z.6W("11"),n="aQ aR O aS aT".3F(" ");T{4O:J(){K i=2z.6W("4O");T!(!i.6E||!i.6E("2d"))}(),14:J(){5B{T!!("aU"4N 1d||1d.8k&&2z aV 8k)}5C(i){T!1}}(),6X:!(!1d.6X||1h.1q&&9>1h.1q),16:{8l:e("8l"),aW:i}}}();2f.2X=2f.14&&(1h.4T||1h.3M||1h.5O||1h.8f||!/^(aX|aY|aZ)/.5y(8h.b0)),2f.7X=2f.4O&&J(){K i=2z.6W("4O");T i.6F&&0===i.6F("1x/6Y").3g("1j:1x/6Y")}();K A={41:{28:{6Z:"1.4.4",70:1d.28&&28.b1.b2}},8m:J(){J i(i){23(K e=i.6L(t),s=e&&e[1]&&e[1].3F(".")||[],n=0,o=0,a=s.1u;a>o;o++)n+=3x(s[o]*19.8c(10,6-2*o));T e&&e[3]?n-1:n}K t=/^(\\d+(\\.?\\d+){0,3})([A-8n-b3-]+[A-8n-b4-9]+)?/;T J(t){(!I.41[t].70||i(I.41[t].70)<i(I.41[t].6Z)&&!I.41[t].8o)&&(I.41[t].8o=!0,5A("6N b5 "+t+" >= "+I.41[t].6Z))}}()},3y={4l:J(i){T{4m:i?"4m":"5P",5Q:i?"5Q":"b6",5R:i?"5R":"b7"}}(2f.2X),1C:J(i){J t(t){J s(t){W(e.2r&&t.2r(),l){p=t.3v.5S?t.3v.5S[0]:t,d=(25 71).72(),h=p.3h,r=p.3i,o=h-m,a=r-v;K s=(25 71).72();g&&(e.b8&&19.4n(o)<e.73||e.b9&&19.4n(a)<e.73||l&&7W>s-l)||(w&&(w=!1,g=!1,m=p.3h,v=p.3i,o=h-m,a=r-v),"J"==$.13(e.1N)&&e.1N({2N:i,x:o,y:a}))}}J n(){W(u.4o(3y.4l.4m),l&&d){K t=!1;e.8p>d-l&&19.4n(c-h)>e.8q&&19.4n(f-r)<e.8r&&(t=!0,"J"==$.13(e.4p)&&e.4p({2N:i,8s:c>h?"1p":"2w",x:o,y:a})),"J"==$.13(e.4V)&&e.4V({2N:i,8t:t,x:o,y:a})}l=d=1t}K o,a,h,r,d,u=$(I),l=(25 71).72(),p=t.3v.5S?t.3v.5S[0]:t,c=p.3h,f=p.3i,m=p.3h,v=p.3i,w=!0,g=!0;e.2E&&t.ba(),"J"==$.13(e.42)&&e.42({2N:i}),u.1j("L-4m",s).1j("L-5R",n),u.1C(3y.4l.4m,s).bb(3y.4l.5R,n)}K e=$.1i({8q:15,8r:75,73:10,8u:!1,bc:!1,8p:bd,2E:!1,2r:!1,42:!1,1N:!1,4V:!1,4p:!1},1R[1]||{});$(i).1j("L-5Q",t),$(i).1C(3y.4l.5Q,t)},4o:J(i){K t={42:0,1N:0,4V:0};$.1m(t,J(e){t[e]=$(i).1j("L-14"+e),t[e]&&$(i).4o(3y.4l["14"+e],t[e]).bf("L-14"+e)})}},1y={1P:J(i,t,e){"J"==$.13(t)&&(e=t,t={}),t=$.1i({43:!1,13:!1,bg:bh,3j:!0},t||{});K s=1y.1I.1P(i),n=t.13||4P(i).13,o={13:n,4q:e};W(!s){K a;(a=1y.3N.1P(i))&&a.1f&&(s=a,1y.1I.29(i,a.1f,a.1j))}W(s)e&&e($.1i({},s.1f),s.1j);1Z 2O(t.43&&1y.1S.2m(i),n){1K"1x":K h=25 6D;h.3X=J(){h.3X=J(){},s={1f:{M:h.M,N:h.N}},o.1x=h,t.3j?6C(h,J(n,a){o.3j=n,o.4W=a,1y.1I.29(i,s.1f,o),t.43&&1y.1S.2m(i),e&&e(s.1f,o)}):(1y.1I.29(i,s.1f,o),t.43&&1y.1S.2m(i),e&&e(s.1f,o))},h.3u=i,t.43&&1y.1S.29(i,{1x:h,13:n});2Y;1K"1W":K r=4P(i).3z,d="4X"+(1d.2Z&&"4Y:"==1d.2Z.4Z?"s":"")+":",u=$.8v(d+"//1W.3k/4Q/8w.8x?1B="+d+"//1W.3k/"+r+"&4q=?",$.X(J(s){K n={1f:{M:s.M,N:s.N}};1y.1I.29(i,n.1f,o),t.43&&1y.1S.2m(i),e&&e(n.1f,o)},I));t.43&&1y.1S.29(i,{5T:u,13:n})}}};1y.74=J(){T I.1F.2L(I,k.2q(1R))},$.1i(1y.74.3e,{1F:J(){I.1I=[]},1P:J(i){23(K t=1t,e=0;I.1I.1u>e;e++)I.1I[e]&&I.1I[e].1B==i&&(t=I.1I[e]);T t},29:J(i,t,e){I.1T(i),I.1I.2n({1B:i,1f:t,1j:e})},1T:J(i){23(K t=0;I.1I.1u>t;t++)I.1I[t]&&I.1I[t].1B==i&&4r I.1I[t]},bi:J(i){K t=1P(i.1B);t?$.1i(t,i):I.1I.2n(i)}}),1y.1I=25 1y.74,1y.4h=J(){T I.1F.2L(I,k.2q(1R))},$.1i(1y.4h.3e,{1F:J(){I.1I=[]},29:J(i,t){I.2m(i),I.1I.2n({1B:i,1j:t})},1P:J(i){23(K t=1t,e=0;I.1I.1u>e;e++)I.1I[e]&&I.1I[e].1B==i&&(t=I.1I[e]);T t},2m:J(i){23(K t=I.1I,e=0;t.1u>e;e++)W(t[e]&&t[e].1B==i&&t[e].1j){K s=t[e].1j;2O(s.13){1K"1x":s.1x&&s.1x.3X&&(s.1x.3X=J(){});2Y;1K"1W":s.5T&&(s.5T.bj(),s.5T=1t)}4r t[e]}}}),1y.1S=25 1y.4h,1y.40=J(i,t,e){W("J"==$.13(t)&&(e=t,t={}),t=$.1i({3j:!0,76:!1},t||{}),!t.76||!1y.3N.1P(i)){K s;W((s=1y.3N.1P(i))&&s.1f)T"J"==$.13(e)&&e($.1i({},s.1f),s.1j),2M 0;K n={1B:i,1j:{13:"1x"}},o=25 6D;n.1j.1x=o,o.3X=J(){o.3X=J(){},n.1f={M:o.M,N:o.N},t.3j?6C(o,J(i,t){$.1i(n.1j,{3j:i,4W:t}),"J"==$.13(e)&&e(n.1f,n.1j)}):"J"==$.13(e)&&e(n.1f,n.1j)},1y.3N.1I.1U(n),o.3u=i}},1y.3N={1P:J(i){T 1y.3N.1I.1P(i)},8y:J(i){K t=I.1P(i);T t&&t.1f}},1y.3N.1I=J(){J i(i){23(K t=1t,s=0,n=e.1u;n>s;s++)e[s]&&e[s].1B&&e[s].1B==i&&(t=e[s]);T t}J t(i){e.2n(i)}K e=[];T{1P:i,1U:t}}();K B=J(){J i(i,s,n){i=i||{},n=n||{},i.44=i.44||(j.3Y[D.4s]?D.4s:"2l"),1h.1q&&7>1h.1q&&(i.44="87");K o=i.44?$.1i({},j.3Y[i.44]||j.3Y[D.4s]):{},a=3G(e,o);s&&a.5K[s]&&(a=3G(a.5K[s],a),4r a.5K);K h=3G(a,i);W(2f.2X?h.U="14":"14"==h.U&&(h.U="14"!=a.U?a.U:"14"!=e.U?e.U:"14"!=t.U?t.U:"2i"),h.2s||(h.2x?"5U"==$.13(h.2x)?h.2s="2D":$.13("4t"==h.2x)&&(h.2s="x"==h.2x?"N":"y"==h.2x?"M":"3c"==h.2x?"2D":"3c"):h.2s="3c"),h.2s?"5U"==$.13(h.2s)&&(h.2s="3c"):h.2s="2D","14"==h.U&&(h.2s="3c"),h.3d&&(h.3d="4t"==$.13(h.3d)?3G(a.3d||e.3d||t.3d,{13:h.3d}):3G(t.3d,h.3d)),!h.1z||2f.2X&&!h.5G?(h.1z={},$.1m(t.1z,J(i,t){$.1m(h.1z[i]=$.1i({},t),J(t){h.1z[i][t]=0})})):2f.2X&&h.5G&&(h.1z=3G(h.1z,h.5G)),1h.1q&&9>1h.1q&&5D(h.1z,{1v:{1o:0,1e:0},1a:{3H:0},1d:{1o:0,1e:0},U:{1o:0,1e:0}}),("14"==h.U||1h.1q&&7>1h.1q)&&(h.1a=!1),h.5H&&"1x"!=s&&$.1i(h.5H,{1p:!1,2w:!1}),!h.1r&&"5U"!=$.13(h.1r)){K r=!1;2O(s){1K"2j":K d="4X"+(1d.2Z&&"4Y:"==1d.2Z.4Z?"s":"")+":";r=d+"//5V.2j.3k/77/"+n.3z+"/0.8z";2Y;1K"1x":1K"1W":r=!0}h.1r=r}T h}K t=j.3Y.80,e=3G(t,j.3Y.86);T{78:i}}();$.1i(4h.3e,{1F:J(i){I.46=i,I.Q=$.1i({1a:F,2t:"L-1S"},1R[1]||{}),I.Q.1a&&(I.1a=I.Q.1a),I.2A(),I.3l()},2A:J(){W($(2z.4R).V(I.1c=$("<11>").R(I.Q.2t).1e().V(I.51=$("<11>").R(I.Q.2t+"-51").V($("<11>").R(I.Q.2t+"-2F")).V($("<11>").R(I.Q.2t+"-2P")))),1h.1q&&7>1h.1q){K i=I.1c[0].3w;i.1A="79",i.4u("1s","((!!1d.28 ? 28(1d).52() + (.5 * 28(1d).N()) : 0) + \'1g\')"),i.4u("1p","((!!1d.28 ? 28(1d).5W() + (.5 * 28(1d).M()): 0) + \'1g\')")}},4v:J(i){I.1c[0].2t=I.Q.2t+" "+I.Q.2t+"-"+i},3l:J(){I.1c.1C("21",$.X(J(){I.46.1e()},I))},42:J(i){I.7a();K t=Y.12&&Y.12[Y.1b-1];I.1c.1O(1,0).47(t?t.P.Q.1z.1S.1o:0,1,i)},1O:J(i,t){K e=Y.12&&Y.12[Y.1b-1];I.1c.1O(1,0).2V(t?0:e?e.P.Q.1z.1S.bk:0).53(e.P.Q.1z.1S.1e,i)},7a:J(){K i=0,t="2k"==I.1a.1w.3m;W(I.1a){I.1a.2J();K i=I.1a.1w.1a[t?"N":"M"]}I.51.16(1g({"1k-1s":I.46.P.Q.1a?t?i*-.5:0:0,"1k-1p":I.46.P.Q.1a?t?0:.5*i:0}))}}),$.1i(6G.3e,{1F:J(i){I.Q=$.1i({2t:"L-1Y"},1R[1]||{}),I.46=i,I.2A(),1h.1q&&9>1h.1q&&$(1d).1C("1Q",$.X(J(){I.1c&&I.1c.2Q(":1M")&&I.1H()},I)),I.7b()},2A:J(){W(I.1c=$("<11>").R(I.Q.2t).V(I.2F=$("<11>").R(I.Q.2t+"-2F")),$(2z.4R).48(I.1c),1h.1q&&7>1h.1q){I.1c.16({1A:"79"});K i=I.1c[0].3w;i.4u("1s","((!!1d.28 ? 28(1d).52() : 0) + \'1g\')"),i.4u("1p","((!!1d.28 ? 28(1d).5W() : 0) + \'1g\')")}I.1c.1e(),I.1c.1C("21",$.X(J(){K i=I.46.P;W(i){K t=i.Q;W(t.1Y&&!t.1Y.2h||"14"==t.U)T}I.46.1e()},I)),I.1c.1C("2l:5M",J(i){i.2r()})},4v:J(i){I.1c[0].2t=I.Q.2t+" "+I.Q.2t+"-"+i},bl:J(i){I.Q=i,I.7b()},7b:J(){I.1H()},1o:J(i){I.1H(),I.1c.1O(1,0);K t=Y.12&&Y.12[Y.1b-1];T I.4w(1,t?t.P.Q.1z.1d.1o:0,i),I},1e:J(i){K t=Y.12&&Y.12[Y.1b-1];T I.1c.1O(1,0).53(t?t.P.Q.1z.1d.1e||0:0,"8A",i),I},4w:J(i,t,e){I.1c.47(t||0,i,"8A",e)},8B:J(){K i={};T $.1m(["M","N"],J(t,e){K s=e.5z(0,1).8j()+e.5z(1),n=2z.4S;i[e]=(1h.1q?19.1H(n["51"+s],n["4x"+s]):1h.4k?2z.4R["4x"+s]:n["4x"+s])||0}),i},1H:J(){1h.4T&&1h.4k&&8C.18>1h.4k&&I.1c.16(1g(I.8B())),1h.1q&&9>1h.1q&&I.1c.16(1g({N:$(1d).N(),M:$(1d).M()}))}}),$.1i(6H.3e,{1F:J(){I.2G={},I.5X=0},29:J(i,t,e){W("4t"==$.13(i)&&I.2m(i),"J"==$.13(i)){23(e=t,t=i;I.2G["8D"+I.5X];)I.5X++;i="8D"+I.5X}I.2G[i]=1d.54($.X(J(){t&&t(),I.2G[i]=1t,4r I.2G[i]},I),e)},1P:J(i){T I.2G[i]},2m:J(i){i||($.1m(I.2G,$.X(J(i,t){1d.56(t),I.2G[i]=1t,4r I.2G[i]},I)),I.2G={}),I.2G[i]&&(1d.56(I.2G[i]),I.2G[i]=1t,4r I.2G[i])}}),$.1i(6I.3e,{1F:J(){I.7c={}},29:J(i,t){I.7c[i]=t},1P:J(i){T I.7c[i]||!1}});K D={4s:"2l",1F:J(){I.3O=[],I.3O.7d=$({}),I.3O.8E=$({}),I.2K=25 6I,I.3P=25 6H,I.2A(),I.3l(),I.4v(I.4s)},2A:J(){W(I.1Y=25 6G(I),$(2z.4R).48(I.1c=$("<11>").R("L-1d").V(I.3n=$("<11>").R("L-3n").1e().V(I.2a=$("<11>").R("L-2a").V(I.1N=$("<11>").R("L-2a-1N"))).V(I.1a=$("<11>").R("L-1a")).V(I.4y=$("<11>").R("L-14-49")).V(I.1V=$("<11>").R("L-14-17")))),I.1S=25 4h(I),1h.1q&&7>1h.1q){K i=I.1c[0].3w;i.1A="79",i.4u("1s","((!!1d.28 ? 28(1d).52() : 0) + \'1g\')"),i.4u("1p","((!!1d.28 ? 28(1d).5W() : 0) + \'1g\')")}W(1h.1q){9>1h.1q&&I.1c.R("L-bm");23(K t=6;9>=t;t++)t>1h.1q&&I.1c.R("L-bn"+t)}2f.14&&I.1c.R("L-14-22"),2f.2X&&I.1c.R("L-bo-14-22"),I.1c.1j("8F-8G",I.1c[0].2t),F.1F(I.1c),Y.1F(I.1c),G.1F(I.1c),E.1F(),I.1c.1e()},4v:J(i,t){t=t||{},i&&(t.44=i),I.1Y.4v(i);K e=I.1c.1j("8F-8G");T I.1c[0].2t=e+" L-1d-"+i,I},7e:J(i){j.3Y[i]&&(I.4s=i)},3l:J(){$(2z.4S).3A(".2l[57]","21",J(i,t){i.2E(),i.2r();K t=i.bp;Y.3Q({x:i.3h,y:i.3i}),5Y.1o(t)}),$(2z.4S).1C("21",J(i){Y.3Q({x:i.3h,y:i.3i})}),I.1c.3A(".L-U-2o, .L-2b-2o","21",$.X(J(i){i.2E()},I)),$(2z.4S).3A(".L-1Y, .L-U, .L-1n, .L-3n","21",$.X(J(i){K t=D.P;W(t){K e=t.Q;W(e.1Y&&!e.1Y.2h||"14"==e.U)T}i.2r(),i.2E(),D.1e()},I)),I.1c.1C("2l:5M",J(i){i.2r()})},2g:J(i,t){K e=$.1i({},1R[2]||{});I.4z(),I.2u=!0;K s=2>i.1u;W($.1m(i,J(i,t){T t.Q.1r?2M 0:(s=!0,!1)}),s&&$.1m(i,J(i,t){t.Q.1r=!1,t.Q.1a=!1}),2>i.1u){K n=i[0].Q.3Z;n&&"2h"!=n&&(i[0].Q.3Z="2h")}I.4A=i,F.2g(i),G.2g(i),Y.2g(i),E.22={5I:!0},t&&I.2R(t,$.X(J(){I.2u&&(I.2u=!1,e.4q&&e.4q())},I))},8H:J(){W(!I.2K.1P("58")){K i=$("5Z, 7f, bq"),t=[];i.1m(J(i,e){K s;$(e).2Q("7f, 5Z")&&(s=$(e).2B(\'7g[br="8I"]\')[0])&&s.8J&&"8K"==s.8J.6M()||$(e).2Q("[8I=\'8K\']")||t.2n({1c:e,31:$(e).16("31")})}),$.1m(t,J(i,t){$(t.1c).16({31:"8L"})}),I.2K.29("58",t)}},8M:J(){K i=I.2K.1P("58");i&&i.1u>0&&$.1m(i,J(i,t){$(t.1c).16({31:t.31})}),I.2K.29("58",1t)},bs:J(){K i=I.2K.1P("58");i&&$.1m(i,$.X(J(i,t){K e;(e=$(t.1c).59(".bt-1v")[0])&&e==I.1v[0]&&$(t.1c).16({31:t.31})},I))},1o:J(){K i=J(){};T J(t){K e=Y.12&&Y.12[Y.1b-1],s=I.3O.7d,n=e&&e.P.Q.1z.1d.1e||0;W(I.2K.1P("1M"))T"J"==$.13(t)&&t(),2M 0;I.2K.29("1M",!0),s.3R([]),I.8H(),e&&"J"==$.13(e.P.Q.8N)&&e.P.Q.8N.2q(j);K o=2;s.3R($.X(J(i){e.P.Q.1Y&&I.1Y.1o($.X(J(){1>--o&&i()},I)),I.3P.29("1o-1d",$.X(J(){I.8O(J(){1>--o&&i()})},I),n>1?19.24(.5*n,50):1)},I)),i(),s.3R($.X(J(i){E.4B(),i()},I)),s.3R($.X(J(i){F.8P(),i()},I)),"J"==$.13(t)&&s.3R($.X(J(i){t(),i()}),I)}}(),8O:J(i){Y.1Q(),I.1c.1o(),I.3n.1O(!0);K t=Y.12&&Y.12[Y.1b-1];T I.4w(1,t.P.Q.1z.1d.1o,$.X(J(){i&&i()},I)),I},1e:J(){K i=Y.12&&Y.12[Y.1b-1],t=I.3O.7d;t.3R([]),I.7h(),I.1S.1O(1t,!0);K e=1;t.3R($.X(J(t){K s=i.P.Q.1z.1d.1e||0;I.3n.1O(!0,!0).53(s,"60",$.X(J(){I.1c.1e(),Y.8Q(),1>--e&&(I.7i(),t())},I)),i.P.Q.1Y&&(e++,I.3P.29("1e-1Y",$.X(J(){I.1Y.1e($.X(J(){1>--e&&(I.7i(),t())},I))},I),s>1?19.24(.5*s,bu):1))},I))},7i:J(){I.2K.29("1M",!1),I.8M(),E.4a(),F.7j();K i=Y.12&&Y.12[Y.1b-1];i&&"J"==$.13(i.P.Q.8R)&&i.P.Q.8R.2q(j),I.3P.2m(),I.4z()},4z:J(){K i=$.1i({7k:!1,61:!1},1R[0]||{});"J"==$.13(i.61)&&i.61.2q(j),I.7h(),I.3P.2m(),I.1A=-1,I.4A=1t,F.2m(),Y.8S(),I.bv=!1,I.2u=!1,D.2K.29("5a",!1),I.5a&&($(I.5a).1O().1T(),I.5a=1t),I.7l&&($(I.7l).1O().1T(),I.7l=1t),"J"==$.13(i.7k)&&i.7k.2q(j)},4w:J(i,t,e){I.3n.1O(!0,!0).47(t||0,i||1,"7m",e)},7h:J(){I.3O.8E.3R([]),I.3n.1O(!0)},2R:J(i,t){i&&I.1A!=i&&(I.3P.2m("5a"),I.1b,I.1A=i,I.P=I.4A[i-1],I.4v(I.P.Q&&I.P.Q.44,I.P.Q),Y.2R(i,t),G.2R(i))}};"62"==$.13(1h.3M)&&3>1h.3M&&$.1m(D,J(i,t){"J"==$.13(t)&&(D[i]=J(){T I})});K E={22:!1,5b:{1p:37,2w:39,5I:27},4B:J(){I.7n()},4a:J(){I.22=!1},1F:J(){I.7n(),$(2z).bw($.X(I.8T,I)).bx($.X(I.8U,I)),E.4a()},7n:J(){K i=Y.12&&Y.12[Y.1b-1];I.22=i&&i.P.Q.5H},8T:J(i){W(I.22&&D.1c.2Q(":1M")){K t=I.7o(i.5b);W(t&&(!t||!I.22||I.22[t]))2O(i.2r(),i.2E(),t){1K"1p":Y.1J();2Y;1K"2w":Y.1G()}}},8U:J(i){W(I.22&&D.4A){K t=I.7o(i.5b);W(t&&(!t||!I.22||I.22[t]))2O(t){1K"5I":D.1e()}}},7o:J(i){23(K t 4N I.5b)W(I.5b[t]==i)T t;T 1t}},Y={1F:J(i){i&&(I.1c=i,I.1b=-1,I.2S=[],I.32=0,I.33=[],I.4C=[],I.3O=[],I.3O.2c=$({}),I.2a=I.1c.2B(".L-2a:3B"),I.1N=I.1c.2B(".L-2a-1N:3B"),I.8V=I.1c.2B(".L-8V:3B"),I.63(5v()),I.5c(),I.3l())},63:J(){K i={3a:"3W",3W:"3a"};T J(t){I.2a.R("L-2a-"+t).2H("L-2a-"+i[t])}}(),3l:J(){$(1d).1C("1Q",$.X(J(){D.2K.1P("1M")&&(I.1Q(),I.7p())},I)),$(1d).1C("8W",$.X(J(){I.63(5v()),D.2K.1P("1M")&&(I.1Q(),I.7p())},I)),I.2a.3A(".L-1l","21",$.X(J(i){i.2E(),I.3Q({x:i.3h,y:i.3i});K t=$(i.2N).59(".L-1l").1j("1l");I[t]()},I))},by:J(){3y.1C(I.2a,{42:$.X(J(){W(!(I.12&&1>=I.12.1u)){K i=4U(I.1N.16("1p"));I.1N.1j("L-8X-1p",i)}},I),1N:$.X(J(i){W(!(I.12&&1>=I.12.1u)){K t=i.x,e=.4*I.26.M;1==I.1b&&t>e||I.1b==I.12.1u&&-1*e>t||I.1N.16({1p:I.1N.1j("L-8X-1p")+t+"1g"})}},I),4p:$.X(J(i){I.12&&1>=I.12.1u||I["2w"==i.8s?"1J":"1G"]()},I),4V:$.X(J(i){I.12&&1>=I.12.1u||i.8t||(i.x&&19.4n(i.x)>.5*I.26.M?I[i.x>0?"1J":"1G"]():I.3o(I.1b),I.bz=1t)},I),8u:!0,2E:!0,2r:!0})},8S:J(){3y.4o(I.2a)},2g:J(i){I.12&&($.1m(I.12,J(i,t){t.1T()}),I.12=1t,I.7q=!1,I.33=[],I.4C=[]),I.32=0,I.1N.7r("3w"),I.12=[],5d=!1,64=!1,$.1m(i,$.X(J(i,t){5d=5d||"14"==t.Q.U,I.12.2n(25 6J(t,i+1)),!64&&t.17&&(64=!0)},I)),I[(5d?"1C":"4o")+"3y"](),I.2a[(5d?"1U":"1T")+"3S"]("L-2a-2T-14-U"),I.65=!64,I.5c()},8Y:J(i){1h.1q&&9>1h.1q?(I.3Q({x:i.3h,y:i.3i}),I.1A()):I.66=54($.X(J(){I.3Q({x:i.3h,y:i.3i}),I.1A()},I),30)},8Z:J(){I.66&&(56(I.66),I.66=1t)},90:J(){2f.2X||I.5e||I.1c.1C("5P",I.5e=$.X(I.8Y,I))},91:J(){!2f.2X&&I.5e&&(I.1c.4o("5P",I.5e),I.5e=1t,I.8Z())},7p:J(){I.3o(I.1b,1t,!0)},3o:J(i,t,e){I.7q||(e=!0,I.7q=!0),I.5c();K s=I.12[i-1];W("14"==s.P.Q.U){K n=.5*I.1L.M-.5*I.26.M;n-=(i-1)*I.26.M;K o=e?0:s.P.Q.1z.1v.1N,a=4U(I.1N.16("1p")),h=19.4n(a-n);W(I.26.M>h){K r=h/I.26.M;o=19.4D(o*r)}$.1m(I.12,J(i,t){1d.67&&t.3p&&t.5f?(t.3p.bA(),t.92=1t,t.4E(),t.7s()):t.7t&&t.5f&&(t.7t.4Q("bB"),t.92=1t,t.4E(),t.7u())}),I.1N.1O().68({1p:n+"1g"},{7v:e?0:s.P.Q.1z.1v.1N,3I:"60",93:J(){t&&t()}})}},2R:J(i,t){I.94(),I.1b=i;K e=I.12[i-1],s=e.P.Q.U,n=1;"14"==s?(n++,I.3o(i,J(){"J"==$.13(e.P.Q.69)&&1>--n&&e.P.Q.69.2q(j,i)})):I.1N.V(e.1n),I.2a.2B(".L-1n").2H("L-1n-4b"),e.1n.R("L-1n-4b"),F.2R(i),e.2g($.X(J(){!e||e&&!e.P||I.1o(i,J(){e&&e.P&&(t&&t(),"J"==$.13(e.P.Q.69)&&1>--n&&e.P.Q.69.2q(j,i))})},I)),I.95()},95:J(){W(I.12&&I.12.1u>1){K i=I.5g(),t=i.1J,e=i.1G,s={1J:t!=I.1b&&I.12[t-1],1G:e!=I.1b&&I.12[e-1]};1==I.1b&&(s.1J=1t),I.1b==I.12.1u&&(s.1G=1t);K n,o=(n=I.12[I.1b-1])&&n.P&&"14"==n.P.Q.U;W(o){23(K a=5,h=19.4D(I.1b/a)*a+1,r=0;a>r;r++){K d=h+r,u=I.12[d-1],l=u&&u.P;l&&-1>=$.6a(d,I.4C)&&(I.4C.2n(d),d!=I.1b&&u.2g(1t,!0))}K p=h-1,c=h+a;$.1m([p-1,p,c,c+1],$.X(J(i,t){K e=I.12[t-1],s=e&&e.P;s&&-1>=$.6a(t,I.4C)&&(I.4C.2n(t),t!=I.1b&&e.2g(1t,!0))},I))}1Z $.1m(s,$.X(J(i,t){K e=t&&t.P;e&&"1x"==e.13&&e.Q.40&&1y.40(e.1B,{76:!0})},I))}},5g:J(){W(!I.12)T{};K i=I.1b,t=I.12.1u,e=1>=i?t:i-1,s=i>=t?1:i+1;T{1J:e,1G:s}},96:J(){K i=Y.12&&Y.12[Y.1b-1];T i&&i.P.Q.3b&&I.12&&I.12.1u>1||1!=I.1b},1J:J(i){K t=I.96();W(i||t)D.2R(I.5g().1J);1Z{K e;!t&&(e=Y.12&&Y.12[Y.1b-1])&&"14"==e.P.Q.U&&I.3o(I.1b)}},98:J(){K i=Y.12&&Y.12[Y.1b-1];T i&&i.P.Q.3b&&I.12&&I.12.1u>1||I.12&&I.12.1u>1&&1!=I.5g().1G},1G:J(i){K t=I.98();W(i||t)D.2R(I.5g().1G);1Z{K e;!t&&(e=Y.12&&Y.12[Y.1b-1])&&"14"==e.P.Q.U&&I.3o(I.1b)}},99:J(i){I.9a(i)||I.2S.2n(i)},9b:J(i){I.2S=$.9c(I.2S,J(t){T t!=i})},9a:J(i){T $.6a(i,I.2S)>-1},3Q:J(i){i.y-=$(1d).52(),i.x-=$(1d).5W(),F.1M()&&"2I"==F.1w.3m&&(i.x-=F.1w.1a.M);K t={y:19.24(19.1H(i.y/I.1L.N,0),1),x:19.24(19.1H(i.x/I.1L.M,0),1)},e=20,s={x:"M",y:"N"},n={};$.1m("x y".3F(" "),$.X(J(i,o){n[o]=19.24(19.1H(e/I.1L[s[o]],0),1),t[o]*=1+2*n[o],t[o]-=n[o],t[o]=19.24(19.1H(t[o],0),1)},I)),I.9d(t)},9d:J(i){I.7w=i},1A:J(){1>I.33.1u||$.1m(I.33,J(i,t){t.1A()})},1Q:J(){1h.1q&&7>1h.1q||F.1Q(),I.5c(),I.2a.16(1g(I.1L)),$.1m(I.12,J(i,t){t.1Q()}),I.12[0]&&"14"==I.12[0].P.Q.U&&($.1m(I.12,J(i,t){t.1n.16({M:Y.6b+"1g"})}),I.1N.16({M:Y.6b*I.12.1u+"1g"}))},5c:J(){K i=z.38(),t=I.12&&I.12[0].P.Q.U;W(F.1M()){F.2J();K e="2k"==F.1w.3m,s=e?"N":"M",n=F.1w.1a[s],o={1p:e?0:n};i[s]-=n,I.2a.16(1g(o))}1Z I.2a.7r("3w");G.1M()&&(G.2J(),i.N-=G.1w.49.N+G.1w.17.N,I.65&&(i.N+=G.1w.17.N));K a=$.1i({},i);2O(I.32=0,t){1K"2i":$.1m(I.12,$.X(J(i,t){K e=t.2h;I.12.1u>1&&(t.7x&&(e=e.1U(t.7x)),t.4F&&(e=e.1U(t.4F)));K s=0;t.6c(J(){$.1m(e,J(i,t){s=19.1H(s,$(t).bC(!0))})}),I.32=19.1H(I.32,s)||0},I)),a.M-=2*(I.32||0);2Y;1K"14":K h=5v();I.12&&I.12[0].1n;K r=I.1N.2C("3w");I.1N.7r("3w");K d,u;I.2a.16(1g({N:a.N})),$.1m(I.12,$.X(J(t,e){K s=e.1n;W(s.1j("3a"))d=19.4D(i.M*s.1j("3a")),u=19.4D(i.M*s.1j("3W"));1Z{K n=e.P.Q.14.M;s.1j("3a",19.1H(n.3a,.5)).1j("3W",19.1H(n.3W,.5))}},I)),I.63(h),I.6b="3a"==h?d:u,$.1i(a,{M:I.6b||0}),I.1N.2C("3w",r)}I.1L=i,I.26=a,I.bD=1s},bE:J(){T{1J:I.1b-1>0,1G:I.1b+1<=I.12.1u}},1o:J(i,t){K e=[];$.1m(I.12,J(t,s){s.1b!=i&&e.2n(s)});K s=e.1u+1,n=I.12[I.1b-1];F[n.P.Q.1a?"1o":"1e"](),G["14"==n.P.Q.U?"1o":"1e"](),("14"!=n.P.Q.U||"1x"!=n.P.13)&&I.1Q();K o=n.P.Q.1z.1v.5F;$.1m(e,$.X(J(e,n){n.1e($.X(J(){o?t&&1>=s--&&t():2>=s--&&I.12[i-1].1o(t)},I))},I)),o&&I.12[i-1].1o(J(){t&&1>=s--&&t()})},8Q:J(){$.1m(I.2S,$.X(J(i,t){K e=I.12[t-1];e.4E(),e.1e()},I)),F.1e(),I.3Q({x:0,y:0})},bF:J(i){$.1m(I.12,$.X(J(t,e){e.1A!=i&&e.1e()},I))},9e:J(i){I.9f(i)||(I.33.2n(I.12[i-1]),1==I.33.1u&&I.90())},bG:J(){I.33=[]},7y:J(i){I.33=$.9c(I.33,J(t){T t.1b!=i}),1>I.33.1u&&I.91()},9f:J(i){K t=!1;T $.1m(I.33,J(e,s){T s.1b==i?(t=!0,!1):2M 0}),t},2W:J(){K i=I.1L;T D.bH&&(i.M-=bI),i},94:J(){$.1m(I.12,$.X(J(i,t){t.7z()},I))}};$.1i(6J.3e,{1F:J(i,t){I.P=i,I.1b=t,I.1L={},I.2A()},1T:J(){I.6d(),I.5h&&(Y.7y(I.1b),I.5h=!1),I.4E(),I.4z(),I.1n.1T(),I.1n=1t,I.U&&(I.U.1T(),I.U=1t),I.P=1t,I.1L={},I.7z()},2A:J(){K i=I.P.Q.U,t=D.4A.1u;W(Y.1N.V(I.1n=$("<11>").R("L-1n").V(I.2b=$("<11>").R("L-2b").R("L-2b-2T-U-"+i).R("L-2b-2T-13-"+I.P.13))),I.2b.V(I.4G=$("<11>").R("L-2b-2o").V(I.7A=$("<11>").R("L-2b-3q").V(I.6e=$("<11>").R("L-2b-9g-3L").V(I.3r=$("<11>").R("L-2b-1D"))))),"1x"==I.P.13&&"14"!=i&&(I.3C=$("<11>").R("L-7B-1x")),"14"==i)I.1n.R("L-1n-14").1o(),"1x"==I.P.13&&"2h"==I.P.Q.3Z&&(I.1n.R("L-1n-2U-2h"),I.3r.1C("21",J(i){i.2r(),i.2E(),D.1e()}));1Z{I.1n.1o();K e=I.P.Q.3Z;W("1x"==I.P.13&&("1G"==e&&(I.P.Q.3b||!I.P.Q.3b&&I.1b!=D.4A.1u)||"2h"==e)&&I.1n.R("L-1n-2U-"+e.6M()),"2i"==i?I.1n.48(I.U=$("<11>").R("L-U L-U-2i")):I.1n.V(I.U=$("<11>").R("L-U L-U-34")),I.4G.1C("21",$.X(J(i){i.2N==I.4G[0]&&I.P.Q.1Y&&I.P.Q.1Y.2h&&D.1e()},I)),"2i"==I.P.Q.U?I.U.V(I.2p=$("<11>").R("L-U-1D-2i")):(I.U.V(I.7C=$("<11>").R("L-U-2o").V(I.6f=$("<11>").R("L-U-3q").V(I.7D=$("<11>").R("L-U-9g-3L").V(I.9h=$("<11>").R("L-U-bJ").V(I.2p=$("<11>").R("L-U-1D")))))),I.3C&&I.2p.V(I.3C.6g())),t>1&&(I.2p.V(I.5i=$("<11>").R("L-1l L-1l-1G").V(I.4F=$("<11>").R("L-1l-1X").V($("<11>").R("L-1l-1X-2P"))).1j("1l","1G")),I.1b!=t||I.P.Q.3b||(I.5i.R("L-1l-5j"),I.4F.R("L-1l-1X-5j")),I.2p.V(I.4c=$("<11>").R("L-1l L-1l-1J").V(I.6h=$("<11>").R("L-1l-1X").V($("<11>").R("L-1l-1X-2P"))).1j("1l","1J")),1!=I.1b||I.P.Q.3b||(I.4c.R("L-1l-5j"),I.6h.R("L-1l-1X-5j"))),I.3C&&"34"==I.P.Q.U&&I.2p.2B(".L-1l").48(I.3C.6g()),I.1n.R("L-35-17"),(I.P.17||"34"==I.P.Q.U&&!I.P.17)&&(I["34"==I.P.Q.U?"2p":"1n"].V(I.1E=$("<11>").R("L-1E L-1E-"+I.P.Q.U).V(I.bK=$("<11>").R("L-1E-2F")).V(I.6i=$("<11>").R("L-1E-3q"))),I.1E.1C("21",J(i){i.2E()})),I.P.17&&(I.1n.2H("L-35-17").R("L-2T-17"),I.6i.V(I.17=$("<11>").R("L-17").6j(I.P.17))),t>1&&I.P.Q.1A){K s=I.1b+" / "+t;I.1n.R("L-2T-1A");K i=I.P.Q.U;I["34"==i?"6i":"2p"]["34"==i?"48":"V"](I.7x=$("<11>").R("L-1A").V($("<11>").R("L-1A-2F")).V($("<4d>").R("L-1A-7E").6j(s)))}I.2p.V(I.2h=$("<11>").R("L-2h").1C("21",J(){D.1e()}).V($("<4d>").R("L-2h-2F")).V($("<4d>").R("L-2h-2P"))),"1x"==I.P.13&&"2h"==I.P.Q.3Z&&I["2i"==I.P.Q.U?"3r":"6f"].1C("21",J(i){i.2r(),i.2E(),D.1e()}),I.1n.1e()}},7F:J(i){W(!I.P.17)T 0;"2i"==I.P.Q.U&&(i=19.24(i,Y.26.M));K t,e=I.1E.16("M");T I.1E.16({M:i+"1g"}),t=4U(I.1E.16("N")),I.1E.16({M:e}),t},6c:J(i,t){K e=[],s=D.1c.1U(D.3n).1U(I.1n).1U(I.U);t&&(s=s.1U(t)),$.1m(s,J(i,t){e.2n({1M:$(t).2Q(":1M"),1c:$(t).1o()})}),i(),$.1m(e,J(i,t){t.1M||t.1c.1e()})},4e:J(){I.2J();K i=I.1L.1H,t=I.P.Q.U,e=I.7G,s=I.9i,n=I.6k,o=3J.3K(i,{2s:e,U:t,3L:n}),a=$.1i({},o);W(n&&(a=3J.3K(a,{2W:o,U:t}),o.M+=2*n,o.N+=2*n),s.2k||s.2I){K h=$.1i({},Y.26);n&&(h.M-=2*n,h.N-=2*n),h={M:19.1H(h.M-2*s.2k,0),N:19.1H(h.N-2*s.2I,0)},a=3J.3K(a,{2s:e,2W:h,U:t})}K r={17:!0},d=!1;W("2i"==t){K s={N:o.N-a.N,M:o.M-a.M},u=$.1i({},a);I.17&&I.1n.4f("L-35-17");K l;W(I.17){l=I.17,I.1E.2H("L-35-17");K p=I.1n.4f("L-35-17");I.1n.2H("L-35-17");K c=I.1n.4f("L-2T-17");I.1n.R("L-2T-17")}D.1c.16({31:"1M"}),I.6c($.X(J(){23(K i=0,o=2;o>i;){r.N=I.7F(a.M);K h=.5*(Y.26.N-2*n-(s.2I?2*s.2I:0)-a.N);r.N>h&&(a=3J.3K(a,{2W:$.1i({},{M:a.M,N:19.1H(a.N-r.N,0)}),2s:e,U:t})),i++}r.N=I.7F(a.M);K d=z.38();(6l>=d.N&&6m>=d.M||6l>=d.M&&6m>=d.N||r.N>=.5*a.N||r.N>=.6*a.M)&&(r.17=!1,r.N=0,a=u)},I),l),D.1c.16({31:"1M"}),p&&I.1n.R("L-35-17"),c&&I.1n.R("L-2T-17");K f={N:o.N-a.N,M:o.M-a.M};o.N+=s.N-f.N,o.M+=s.M-f.M,a.N!=u.N&&(d=!0)}1Z r.N=0;K m={M:a.M+2*n,N:a.N+2*n};r.N&&(o.N+=r.N),"34"==t&&(r.N=0);K v={2o:{1f:o},3q:{1f:m},1D:{1f:a,2W:m,1k:{1s:.5*(o.N-m.N)-.5*r.N,1p:.5*(o.M-m.M)}},1v:{1f:a},1E:r};"2i"==t&&(v.1E.1s=v.1D.1k.1s,r.M=19.24(a.M,Y.26.M));K h=$.1i({},Y.26);T"2i"==t&&(v.2b={1f:{M:Y.26.M},1A:{1p:.5*(Y.1L.M-Y.26.M)}}),v.U={2o:{1f:{M:19.24(o.M,h.M),N:19.24(o.N,h.N)}},3q:{1f:m},1D:{1f:{M:19.24(v.1D.1f.M,h.M-2*n),N:19.24(v.1D.1f.N,h.N-2*n)},1k:{1s:v.1D.1k.1s+n,1p:v.1D.1k.1p+n}}},v},2J:J(){K i=$.1i({},I.1L.1H),t=3x(I.6e.16("3L-1s-M"));I.6k=t,t&&(i.M-=2*t,i.N-=2*t);K e=I.P.Q.2s;"bL"==e?e=i.M>i.N?"N":i.N>i.M?"M":"2D":e||(e="2D"),I.7G=e;K s={2D:"3c",M:"y",N:"x",3c:"2D"},n=I.P.Q.84[s[I.7G]];I.9i=n},7H:J(){I.5k&&(56(I.5k),I.5k=1t)},7z:J(){I.5k&&I.2u&&!I.3T&&(I.7H(),I.2u=!1)},2g:J(i,t){T I.3T||I.2u?(I.3T&&I.6n(i),2M 0):(t||1y.1I.1P(I.P.1B)||1y.3N.8y(I.P.1B)||D.1S.42(),I.2u=!0,I.5k=54($.X(J(){2O(I.7H(),I.P.13){1K"1x":K e=I.P.Q.U;1y.1P(I.P.1B,{3j:"14"!=e},$.X(J(s,n){W(I.P){I.1L.9j=s,I.1L.1H=s,I.3T=!0,I.2u=!1,I.2J();K o=I.4e();I.1L.2o=o.2o.1f,I.1L.1v=o.1v.1f,I.1v=$("<5V>").2C({3u:I.P.1B}).R("L-1v L-1v-1x"),I.3r.V(I.1v),"14"==e&&I.1v.1C("9k",J(i){i.2r()});K a;I.3r.V(a=$("<11>").R("L-1v-1x-1Y")),I.3C&&a.V(I.3C.6g());K h;W("2i"==I.P.Q.U&&((h=I.P.Q.3Z)&&"1G"==h||"1J-1G"==h)){K r=I.P.Q.3b;(I.1b!=Y.12.1u||r)&&I.3r.V($("<11>").R("L-2U-1l L-2U-1G").1j("1l","1G")),"1J-1G"!=h||1==I.1b&&!r||I.3r.V($("<11>").R("L-2U-1l L-2U-1J").1j("1l","1J")),I.3C&&I.3r.2B(".L-2U-1l").1m($.X(J(i,t){K e=$(t).1j("1l");$(t).48(I.3C.6g().1j("1l",e))},I)),I.1n.3A(".L-2U-1l","21",J(i){K t=$(i.2N).59(".L-2U-1l").1j("1l");Y[t]()}),I.1n.3A(".L-2U-1l","9l",$.X(J(i){K t=$(i.2N).59(".L-2U-1l").1j("1l"),e=t&&I["2y"+t+"6o"];e&&I["2y"+t+"6o"].R("L-1l-1X-4b")},I)).3A(".L-2U-1l","9m",$.X(J(i){K t=$(i.2N).1j("1l"),e=t&&I["2y"+t+"6o"];e&&I["2y"+t+"6o"].2H("L-1l-1X-4b")},I))}I.1n.2B(".L-7B-1x").1m($.X(J(i,t){K e=$("<5V>").R("L-7B-1x").2C({3u:I.P.1B}).16({bM:0}),s=$(t).1j("1l");W(1h.1q&&9>1h.1q){K o=3x(D.1c.16("z-7I"))||0;e.16({"z-7I":o}),$(t).bN().16({"z-7I":o}),/^(x|3c)$/.5y(I.P.Q.2x||"")&&e.1e()}n.3j&&!2f.2X&&e.1U(I.1v).1C("9k",$.X(J(i){W("14"==I.P.Q.U)T i.2r(),2M 0;K t=i.3v,e=t.bO||{};W(n.3j&&e.9n){K s=t.3h||0,o=t.3i||0,a=I.1v.51();s=19.3f(s-a.1p),o=19.3f(o-a.1s),1>n.4W&&(s*=n.4W,o*=n.4W),e.9n(n.3j,s,o)}1Z e.9o?e.9o(I.1v[0]):i.2r()},I)),s&&e.1j("1l",s),$(t).bP(e)},I)),I.6n(i,t)}},I));2Y;1K"2j":K s={M:I.P.Q.M,N:I.P.Q.N};I.P.Q.2j&&I.P.Q.2j.6R&&(I.P.3s.9p=s.M>bQ?"bR":"bS"),I.7J(s,i);2Y;1K"1W":K s={M:I.P.Q.M,N:I.P.Q.N};1y.1P(I.P.1B,$.X(J(t){W(I.P){K e=s.M,n=s.N,o=t.M,a=t.N,h=!1;(h=e&&!n||n&&!e)||e&&n?(h&&(e&&!n?s.N=e*a/o:s.M=n*o/a),s=3J.3K(t,{2W:s})):s=t,I.7J(s,i)}},I))}},I),10),2M 0)},7J:J(i,t){I.1L.9j=i,I.1L.1H=i,I.3T=!0,I.2u=!1,I.2J();K e=I.4e();I.1L.2o=e.2o.1f,I.1L.1v=e.1v.1f,I.3r.V(I.1v=$("<11>").R("L-1v L-1v-"+I.P.13)),"14"!=I.P.Q.U||"2j"!=I.P.13&&"1W"!=I.P.13||(I.1Q(),("2j"==I.P.13&&1d.67||"1W"==I.P.13&&2f.6X)&&I.1o()),I.6n(t)},6n:J(i){K t=I.P.Q.U;I.1Q(),"34"==t&&I.7D.1C("9l",$.X(I.5l,I)).1C("9m",$.X(I.6p,I)),I.U&&(2f.2X?I.2b.1C("21",$.X(J(){I.2p.2Q(":1M")||I.5l(),I.5m()},I)):I.U.3A(".L-U-3q","5P",$.X(J(){I.2p.2Q(":1M")||I.5l(),I.5m()},I)));K e;Y.12&&(e=Y.12[Y.1b-1])&&(e.P.1B==I.P.1B||"14"==e.P.Q.U)&&D.1S.1O(),i&&i()},1Q:J(){W(I.1v){K i=I.4e(),t=I.P.Q.U;I.1L.2o=i.2o.1f,I.1L.1v=i.1v.1f,I.4G.16(1g(i.2o.1f)),"34"==t&&I.7C.16(1g(i.U.2o.1f)),I.3r.1U(I.6e).16(1g(i.1D.1f));K e=0;2O("2i"==I.P.Q.U&&i.1E.17&&(e=i.1E.N),I.6e.16({"6q-5n":e+"1g"}),I.7A.16(1g({M:i.3q.1f.M,N:i.3q.1f.N+e})),i.2o.1f.M>("2i"==I.P.Q.U?i.2b.1f.M:z.38().M)?I.2b.R("L-9q-4p"):I.2b.2H("L-9q-4p"),t){1K"2i":I.17&&I.1E.16(1g({M:i.1E.M}));2Y;1K"34":I.2p.1U(I.7D).1U(I.9h).16(1g(i.U.1D.1f)),I.6f.16(1g(i.U.3q.1f));K s=0;W(I.17){K n=I.1n.4f("L-35-17"),o=I.1n.4f("L-2T-17");I.1n.2H("L-35-17"),I.1n.R("L-2T-17");K s=0;I.6c($.X(J(){s=I.1E.bT()},I),I.2p.1U(I.17));K a=z.38();(s>=.45*i.1D.1f.N||6l>=a.N&&6m>=a.M||6l>=a.M&&6m>=a.N)&&(i.1E.17=!1),n&&I.1n.R("L-35-17"),o||I.1n.2H("L-2T-17")}}W(I.17){K h=i.1E.17;I.17[h?"1o":"1e"](),I.1n[(h?"1T":"1U")+"3S"]("L-35-17"),I.1n[(h?"1U":"1T")+"3S"]("L-2T-17")}I.7A.1U(I.6f).16(1g(i.1D.1k));K r=Y.26,d=I.1L.2o;W(I.6r={y:d.N-r.N,x:d.M-r.M},I.5h=I.6r.x>0||I.6r.y>0,Y[(I.5h?"29":"1T")+"bU"](I.1b),1h.1q&&8>1h.1q&&"1x"==I.P.13&&I.1v.16(1g(i.1D.1f)),/^(1W|2j)$/.5y(I.P.13)){K u=i.1D.1f;I.3p?I.3p.bV(u.M,u.N):I.3D&&I.3D.2C(u)}}I.1A()},1A:J(){W(I.1v){K i=Y.7w,t=Y.26,e=I.1L.2o,s={1s:0,1p:0},n=I.6r;s.1s=n.y>0?0-i.y*n.y:.5*t.N-.5*e.N,s.1p=n.x>0?0-i.x*n.x:.5*t.M-.5*e.M,2f.2X&&(n.y>0&&(s.1s=0),n.x>0&&(s.1p=0),I.4G.16({1A:"bW"})),I.bX=s,I.4G.16({1s:s.1s+"1g",1p:s.1p+"1g"});K o=$.1i({},s);0>o.1s&&(o.1s=0),0>o.1p&&(o.1p=0);K a=I.P.Q.U;2O(a){1K"2i":K h=I.4e();W(I.2b.16(1g(h.2b.1f)).16(1g(h.2b.1A)),I.P.17){K r=s.1s+h.1D.1k.1s+h.1D.1f.N+I.6k;r>Y.26.N-h.1E.N&&(r=Y.26.N-h.1E.N);K d=Y.32+s.1p+h.1D.1k.1p+I.6k;Y.32>d&&(d=Y.32),d+h.1E.M>Y.32+h.2b.1f.M&&(d=Y.32),I.1E.16({1s:r+"1g",1p:d+"1g"})}2Y;1K"34":I.7C.16({1p:o.1p+"1g",1s:o.1s+"1g"})}}},bY:J(i){I.1f=i},7s:J(){K i=1h.1q&&8>1h.1q,t=I.4e(),e=t.1D.1f,s=$.1i({},I.P.Q.2j||{}),n="4X"+(1d.2Z&&"4Y:"==1d.2Z.4Z?"s":"")+":";W("14"==I.P.Q.U&&(s.5J=0),1d.67){K o;I.1v.V(I.5o=$("<11>").V(o=$("<11>")[0])),I.3p=25 67.bZ(o,{N:e.N,M:e.M,c0:I.P.3s.3z,c1:s,c2:i?{}:{c3:$.X(J(i){W(I.P.Q.2j.6R)5B{i.2N.c4(I.P.3s.9p)}5C(t){}I.1Q()},I),c5:$.X(J(i){i.1j>-1&&(I.5f=!0)},I)}})}1Z{K a=$.7g(s);I.1v.V(I.3D=$("<9r 9s 9t 9u>").2C({3u:n+"//c6.2j.3k/5Z/"+I.P.3s.3z+"?"+a,N:e.N,M:e.M,9v:0}))}},7u:J(){K i=I.4e(),t=i.1D.1f,e=$.1i({},I.P.Q.1W||{});"14"==I.P.Q.U&&(e.5J=0);K s="4X"+(1d.2Z&&"4Y:"==1d.2Z.4Z?"s":"")+":",n=q()+"1W";e.c7=n,e.4Q=1;K o=$.7g(e);I.1v.V(I.3D=$("<9r 9s 9t 9u>").2C({3u:s+"//3p.1W.3k/c8/"+I.P.3s.3z+"?"+o,3z:n,N:t.N,M:t.M,9v:0})),1d.c9&&$f(I.3D[0]).9w("9x",$.X(J(i){I.7t=$f(i).9w("ca",$.X(J(){I.5f=!0},I))},I))},9y:J(){2O(I.P.13){1K"2j":I.7s();2Y;1K"1W":I.7u()}},1o:J(i){W("14"==I.P.Q.U){W(I.9z)T i&&i(),2M 0;I.9z=!0}I.9y(),Y.99(I.1b),I.1n.1O(1,0),I.U&&(I.U.1O(1,0),I.5l(1t,!0)),I.5h&&Y.9e(I.1b),I.4w(1,19.1H(I.P.Q.1z.1v.1o,1h.1q&&9>1h.1q?0:10),$.X(J(){i&&i()},I))},9A:J(){I.P&&I.1v&&"14"!=I.P.Q.U&&I.4E()},4E:J(){W(I.5f=!1,I.3D&&(I.3D.1T(),I.3D=1t),I.3p){5B{I.3p.cb()}5C(i){}I.3p=1t}I.5o&&(I.5o.1T(),I.5o=1t),("2j"==I.P.13||"1W"==I.P.13)&&(I.1v&&I.1v.6j(""),I.5o=1t,I.3p=1t,I.3D=1t)},4z:J(i){Y.7y(I.1b),Y.9b(I.1b),I.9A(i)},1e:J(i){W("14"==I.P.Q.U)T i&&i(),2M 0;K t=19.1H(I.P.Q.1z.1v.1e||0,1h.1q&&9>1h.1q?0:10),e=I.P.Q.1z.1v.5F?"cc":"7m";I.1n.1O(1,0).53(t,e,$.X(J(){I.4z(),i&&i()},I))},4w:J(i,t,e){K s=I.P.Q.1z.1v.5F?"cd":"60";I.1n.1O(1,0).47(t||0,i,s,e)},5l:J(i,t){I.U&&(t?(I.2p.1o(),I.5m(),"J"==$.13(i)&&i()):I.2p.1O(1,0).47(t?0:I.P.Q.1z.U.1o,1,"60",$.X(J(){I.5m(),"J"==$.13(i)&&i()},I)))},6p:J(i,t){I.U&&"2i"!=I.P.Q.U&&(t?(I.2p.1e(),"J"==$.13(i)&&i()):I.2p.1O(1,0).53(t?0:I.P.Q.1z.U.1e,"7m",J(){"J"==$.13(i)&&i()}))},6d:J(){I.5p&&(56(I.5p),I.5p=1t)},5m:J(){I.6d(),I.5p=54($.X(J(){I.6p()},I),I.P.Q.1z.U.2V)},ce:J(){I.6d(),I.5p=54($.X(J(){I.6p()},I),I.P.Q.1z.U.2V)}}),$.1i(4i.3e,{1F:J(a){K b=1R[1]||{},d={};W("4t"==$.13(a))a={1B:a};1Z W(a&&1==a.88){K c=$(a);a={1c:c[0],1B:c.2C("57"),17:c.1j("2l-17"),4H:c.1j("2l-4H"),5q:c.1j("2l-5q"),13:c.1j("2l-13"),Q:c.1j("2l-Q")&&7K("({"+c.1j("2l-Q")+"})")||{}}}W(a&&(a.5q||(a.5q=5E(a.1B)),!a.13)){K d=4P(a.1B);a.3s=d,a.13=d.13}T a.3s||(a.3s=4P(a.1B)),a.Q=a&&a.Q?$.1i(!0,$.1i({},b),$.1i({},a.Q)):$.1i({},b),a.Q=B.78(a.Q,a.13,a.3s),$.1i(I,a),I}});K F={1F:J(i){I.1c=i,I.2v=[],I.1w={3m:"2k",1r:{N:0,M:0},2e:{N:0,M:0},1a:{N:0,M:0}},I.1a=I.1c.2B(".L-1a:3B"),I.2A(),I.7j(),I.1e(),I.3l()},2A:J(){I.1a.V(I.1D=$("<11>").R("L-1a-1D").V(I.7L=$("<11>").R("L-1a-cf").V(I.4c=$("<11>").R("L-1a-1l L-1a-1l-1J").V(I.6h=$("<11>").R("L-1a-1l-1X").V($("<11>").R("L-1a-1l-1X-2F")).V($("<11>").R("L-1a-1l-1X-2P")))).V(I.7M=$("<11>").R("L-1a-5r").V(I.4I=$("<11>").R("L-1a-3H"))).V(I.5i=$("<11>").R("L-1a-1l L-1a-1l-1G").V(I.4F=$("<11>").R("L-1a-1l-1X").V($("<11>").R("L-1a-1l-1X-2F")).V($("<11>").R("L-1a-1l-1X-2P")))))),I.3U=$("<11>").R("L-1a L-1a-2k").V($("<11>").R("L-1a-1l L-1a-1l-1J")).V($("<11>").R("L-1r")).V($("<11>").R("L-1a-1l L-1a-1l-1G"))},3l:J(){I.7L.3A(".L-1r","21",$.X(J(i){i.2E();K t=$(i.2N).59(".L-1r")[0],e=t&&$(t).1j("L-1A");e&&(I.7N(e),D.2R(e))},I)),I.7L.1C("21",J(i){i.2E()}),I.4c.1C("21",$.X(I.9B,I)),I.5i.1C("21",$.X(I.9C,I))},2g:J(i){W(I.2m(),I.2v=[],!(2>i.1u)){K t=!1;W($.1m(i,$.X(J(i,e){T"14"==e.Q.U?(t=!0,!1):2M 0},I)),!t){K e="2k";$.1m(i,$.X(J(i,t){"2I"==t.Q.1a&&(e="2I")},I)),I.1w.3m=e,I.9D(e),$.1m(i,$.X(J(i,t){I.2v.2n(25 6K(I.4I,t,i+1))},I)),1h.1q&&7>1h.1q||I.1Q()}}},2m:J(){$.1m(I.2v,J(i,t){t.1T()}),I.2v=[],I.1b=-1,I.3t=-1},9D:J(i){I.1a.2H("L-1a-2k L-1a-2I").R("L-1a-"+i)},9E:J(i){$.1m(i,$.X(J(i,t){I.9F(t)},I))},9F:J(i){K t=i["1k-1p"],e=i["1k-2w"];i["1k-1p"]=0,i["1k-2w"]=0,i["1k-1s"]=t,i["1k-5n"]=e},9G:J(i){K t=i.M;i.M=i.N,i.N=t},9H:J(i){$.1m(i,$.X(J(i,t){I.9G(t)},I))},2J:J(){K i=D.1c,t=D.3n,e=I.1w,s=e.3m,n=z.38(),o=i.2Q(":1M");o||i.1o();K a=t.2Q(":1M");a||t.1o(),I.1a.61(I.3U);K h=I.3U.2B(".L-1a-1l-1J:3B"),r=I.3U.2B(".L-1a-1l-1G:3B"),d=I.3U.2B(".L-1r:3B"),u=I.3U.4j(),l=3x(I.3U.16("6q-1s"))||0;$.1i(e.1a,{N:u,6q:l});K p=u-2*l,c=3x(d.16("1k-1p"));$.1i(e.1r,{N:p,M:p}),$.1i(e.2e,{M:p+2*c,N:u}),e.2c={1J:{1f:{M:h.6S(),N:u},1k:{"1k-1s":0,"1k-5n":0,"1k-1p":3x(h.16("1k-1p"))||0,"1k-2w":3x(h.16("1k-2w"))||0}},1G:{1f:{M:r.6S(),N:u},1k:{"1k-1s":0,"1k-5n":0,"1k-1p":3x(r.16("1k-1p"))||0,"1k-2w":3x(r.16("1k-2w"))||0}}};K f=n["2k"==s?"M":"N"],m=e.2e.M,v=I.2v.1u;e.1a.M=f,e.2c.22=v*m/f>1;K w=f,g=e.2c,b=g.1J,2y=g.1G,x=b.1k["1k-1p"]+b.1f.M+b.1k["1k-2w"]+2y.1k["1k-1p"]+2y.1f.M+2y.1k["1k-2w"];e.2c.22&&(w-=x),w=19.4D(w/m)*m;K y=v*m;w>y&&(w=y);K C=w+(e.2c.22?x:0);e.3V=w/m,I.5s="6s",1>=e.3V&&(w=f,C=f,e.2c.22=!1,I.5s="7a"),e.7O=19.5t(v*m/w),e.1D={M:C+1,N:u},e.5r={M:w,N:u},e.3H={M:v*m+1,N:u},"2I"==s&&(I.9H([e.1a,e.1D,e.5r,e.3H,e.2e,e.1r,e.2c.1J.1f,e.2c.1G.1f]),I.9E([e.2c.1J.1k,e.2c.1G.1k])),I.3U.cg(),a||t.1e(),o||i.1e()},4a:J(){I.4J=!0},4B:J(){I.4J=!1},22:J(){T!I.4J},1o:J(){2>I.2v.1u||(I.4B(),I.1a.1o(),I.2S=!0)},1e:J(){I.4a(),I.1a.1e(),I.2S=!1},1M:J(){T!!I.2S},1Q:J(){I.2J();K i=I.1w,t="2k"==I.1w.3m,e=i.1a;I.1a.16({M:e.M+"1g",N:e.N+"1g","24-N":"2D","1H-N":"2D","24-M":"2D","1H-M":"2D",6q:0}),$.1m(I.2v,J(i,t){t.1Q()}),I.4c[i.2c.22?"1o":"1e"]().16(1g(i.2c.1J.1f)).16(1g(i.2c.1J.1k)),I.5i[i.2c.22?"1o":"1e"]().16(1g(i.2c.1G.1f)).16(1g(i.2c.1G.1k)),1h.1q&&9>1h.1q&&(D.3P.2m("9I-9J-1a"),D.3P.29("9I-9J-1a",$.X(J(){I.2J(),I.7M.16(1g(i.5r)),I.4I.16(1g(i.3H))},I),ch)),I.7M.16(1g(i.5r)),I.4I.16(1g(i.3H));K s=$.1i({},1g(i.1D));s["1k-"+(t?"1p":"1s")]=19.3f(-.5*i.1D[t?"M":"N"])+"1g",s["1k-"+(t?"1s":"1p")]=0,I.1D.16(s),I.4c.16(1g(i.2c.1J)),I.4c.16(1g(i.2c.1G)),I.1b&&I.3o(I.1b,!0)},7P:J(i){W(!(1>i||i>I.1w.7O||i==I.3t)){K t=I.1w.3V*(i-1)+1;I.3o(t)}},9B:J(){I.7P(I.3t-1)},9C:J(){I.7P(I.3t+1)},ci:J(){K i=z.38();T i},2R:J(i){W(!(1h.1q&&7>1h.1q)){K t=0>I.1b;1>i&&(i=1);K e=I.2v.1u;i>e&&(i=e),I.1b=i,I.7N(i),("6s"!=I.5s||I.3t!=19.5t(i/I.1w.3V))&&I.3o(i,t)}},3o:J(i,t){I.2J();K e,s="2k"==I.1w.3m,n=z.38()[s?"M":"N"],o=.5*n,a=I.1w.2e[s?"M":"N"];W("6s"==I.5s){K h=19.5t(i/I.1w.3V);I.3t=h,e=-1*a*(I.3t-1)*I.1w.3V;K r="L-1a-1l-1X-5j";I.6h[(2>h?"1U":"1T")+"3S"](r),I.4F[(h>=I.1w.7O?"1U":"1T")+"3S"](r)}1Z e=o+-1*(a*(i-1)+.5*a);K d=Y.12&&Y.12[Y.1b-1],u={},l={};u[s?"1s":"1p"]=0,l[s?"1p":"1s"]=e+"1g",I.4I.1O(1,0).16(u).68(l,t?0:d?d.P.Q.1z.1a.3H:0,$.X(J(){I.7Q()},I))},7j:J(){I.7R=!0},8P:J(){I.7R=!1,I.2v.1u>0&&I.7Q()},7Q:J(){K i=!1;I.7R&&(i=!0);K t,e;W(I.1b&&I.1w.2e.M&&!(1>I.2v.1u)){W("6s"==I.5s){W(1>I.3t)T;t=(I.3t-1)*I.1w.3V+1,e=19.24(t-1+I.1w.3V,I.2v.1u)}1Z{K s="2k"==I.1w.3m,n=19.5t(I.1w.1a[s?"M":"N"]/I.1w.2e[s?"M":"N"]);t=19.1H(19.4D(19.1H(I.1b-.5*n,0)),1),e=19.5t(19.24(I.1b+.5*n)),e>I.2v.1u&&(e=I.2v.1u)}23(K o=t;e>=o;o++)I.2v[o-1][i?"2A":"2g"]()}},7N:J(i){I.4I.2B(".L-1r-4b").2H("L-1r-4b");K t=i&&I.2v[i-1];t&&t.9K()},cj:J(){I.1b&&I.2R(I.1b)}};$.1i(6K.3e,{1F:J(i,t,e){I.1c=i,I.P=t,I.ck={},I.1b=e,I.9L()},9L:J(){I.1r=$("<11>").R("L-1r").1j("L-1A",I.1b)},2A:J(){W(!I.2e){K i=I.P.Q;I.1c.V(I.2e=$("<11>").R("L-1r-1n").V(I.1r.V(I.6t=$("<11>").R("L-1r-1D")))),"1x"==I.P.13&&I.1r.R("L-2g-1r").1j("1r",{P:I.P,3u:i.1r||I.P.1B});K t=i.1r&&i.1r.2P;t&&I.1r.V($("<11>").R("L-1r-2P L-1r-2P-"+t));K e;I.1r.V(e=$("<11>").R("L-1r-1Y").V($("<11>").R("L-1r-1Y-2F")).V(I.1S=$("<11>").R("L-1r-1S").V($("<11>").R("L-1r-1S-2F")).V($("<11>").R("L-1r-1S-2P"))).V($("<11>").R("L-1r-1Y-3L"))),I.1r.V($("<11>").R("L-1r-cl")),I.1Q()}},1T:J(){I.2e&&(I.2e.1T(),I.2e=1t,I.cm=1t),I.2u=!1,I.9M=!0},2g:J(){W(!I.3T&&!I.2u&&F.1M()&&!I.9M){I.6t||I.2A(),I.2u=!0;K i=I.P.Q.1r,t=i&&"5U"==$.13(i)?I.P.1B:i||I.P.1B;W(I.4K=t,t)W("1W"==I.P.13)W(t==i)1y.40(I.4K,{13:"1x"},$.X(I.6u,I));1Z{K e="4X"+(1d.2Z&&"4Y:"==1d.2Z.4Z?"s":"")+":";$.8v(e+"//1W.3k/4Q/8w.8x?1B="+e+"//1W.3k/"+I.P.3s.3z+"&4q=?",$.X(J(i){i&&i.9N?(I.4K=i.9N,1y.40(I.4K,{13:"1x"},$.X(I.6u,I))):(I.3T=!0,I.2u=!1,I.1S.1O(1,0).2V(I.P.Q.1z.1a.2V).47(I.P.Q.1z.1a.2g,0))},I))}1Z 1y.40(I.4K,{13:"1x"},$.X(I.6u,I))}},6u:J(i){I.2e&&I.2u&&(I.3T=!0,I.2u=!1,I.1L=i,I.1x=$("<5V>").2C({3u:I.4K}),I.6t.48(I.1x),I.1Q(),I.1S.1O(1,0).2V(I.P.Q.1z.1a.2V).47(I.P.Q.1z.1a.2g,0))},1Q:J(){W(I.2e){I.2e.16(1g(F.1w.2e));K i="2k"==F.1w.3m;W(I.2e.16(1g({1s:i?0:F.1w.2e.N*(I.1b-1),1p:i?F.1w.2e.M*(I.1b-1):0})),I.6t){K t=F.1w.1r;W(I.1r.16(1g({M:t.M,N:t.N,"1k-1s":19.3f(-.5*t.N),"1k-1p":19.3f(-.5*t.M),"1k-5n":0,"1k-2w":0})),I.1x){K e,s={M:t.M,N:t.N},n=19.1H(s.M,s.N),o=$.1i({},I.1L);W(o.M>s.M&&o.N>s.N){e=3J.3K(o,{2W:s});K a=1,h=1;e.M<s.M&&(a=s.M/e.M),e.N<s.N&&(h=s.N/e.N);K r=19.1H(a,h);r>1&&(e.M*=r,e.N*=r),$.1m("M N".3F(" "),J(i,t){e[t]=19.3f(e[t])})}1Z e=3J.3K(o.M<s.M||o.N<s.N?{M:n,N:n}:s,{2W:I.1L});K d=19.3f(.5*s.M-.5*e.M),u=19.3f(.5*s.N-.5*e.N);I.1x.16(1g($.1i({},e,{1s:u,1p:d})))}}}},9K:J(){I.1r.R("L-1r-4b")}});K G={1F:J(i){I.1c=i,I.6v=[],I.6w=!1,I.1w={49:{},17:{}},I.4y=I.1c.2B(".L-14-49:3B"),I.1V=I.1c.2B(".L-14-17:3B"),I.2A(),I.1e(),I.3l()},2A:J(){I.4y.V(I.cn=$("<11>").R("L-14-49-1D").V($("<11>").R("L-14-49-2F")).V(I.2h=$("<11>").R("L-14-1X L-14-2h").V($("<4d>").R("L-14-1X-2F")).V($("<4d>").R("L-14-1X-2P")))).1e(),I.1V.V(I.9O=$("<11>").R("L-14-17-1D").V(I.co=$("<11>").R("L-14-17-2F")).V(I.1E=$("<11>").R("L-14-17-1E").V(I.6i=$("<11>").R("L-14-17-1E-3q").V(I.9O=$("<11>").R("L-14-17-7E-1D").V(I.17=$("<11>").R("L-14-17-7E"))))).V(I.4L=$("<11>").R("L-14-1X L-14-17-4L").V($("<4d>").R("L-14-1X-2F")).V($("<4d>").R("L-14-1X-2P")))).1e()},3l:J(){I.2h.1C("21",J(){D.1e()}),$(1d).1C("1Q 8W",$.X(J(){D.2K.1P("1M")&&I.1Q()},I)),I.4L.1C("21",$.X(J(){I[I.6w?"6x":"9P"]()},I)),I.1V.1C("4m",$.X(J(i){I.6y||i.2r()},I))},1o:J(){I.4B(),I.4y.1o(),I.1V[I.65?"1e":"1o"](),I.2S=!0},1e:J(){I.4a(),I.4y.1e(),I.1V.1e(),I.2S=!1},1M:J(){T!!I.2S},2J:J(){K i=D.1c,t=D.3n,e=I.1w;I.1V.16({31:"8L"});K s=I.4L;$.1m(s,$.X(J(i,t){K e=$(t);e.1j("9Q-1k-1s",e.16("1k-1s")),e.16({"1k-1s":0})},I));K n=i.2Q(":1M");n||i.1o();K o=t.2Q(":1M");o||t.1o();K a=I.9R();a&&I.3E(!1);K h=I.4y.4j(),r=I.1V.4j();a&&I.3E(!0),e.49.N=h,e.17.N=r,a||I.3E(!0);K d=I.1V.4j(),u=d>r;e.2x=u,a&&I.3E(!0),u&&(I.3E(!0),d=I.1V.4j()),e.17.7S=d,I.3E(a),$.1m(s,$.X(J(i,t){K e=$(t);e.16({"1k-1s":e.1j("9Q-1k-1s")})},I)),I.1V.16({31:"1M"}),o||t.1e(),n||i.1e()},cp:J(){T I.1V.4f("L-14-17-9S")},7T:J(i){I.1V[(i?"1U":"1T")+"3S"]("L-14-17-9S")},9R:J(){T I.1V.4f("L-14-17-2x")},3E:J(i){I.1V[(i?"1U":"1T")+"3S"]("L-14-17-2x")},4a:J(){I.4J=!0},4B:J(){I.4J=!1},22:J(){T!I.4J},2g:J(i){I.2m();K t=!1;$.1m(i,$.X(J(i,e){I.6v.2n(e),!t&&e.17&&(t=!0)},I)),I.1V[(t?"1T":"1U")+"3S"]("L-14-17-cq"),I.65=!t},2m:J(){I.6v=[],I.P=1t,I.1b=-1,I.3t=-1},2R:J(i){W(i!=I.1b){K t=I.6v[i-1];W("14"==t.Q.U){I.P=t;K e=t.17||"";I.17.6j(e),I.1Q(),I.6x(!0)}}},1Q:J(){I.6x(!0),I.2J()},9P:J(i){I.3E(!0),I.7T(!0),I.6w=!0,I.4L.R("L-14-17-9T");K t=z.38(),e=-1*19.24(t.N,I.1w.17.7S||0);I.1w.17.7S>t.N?(I.1E.16({N:t.N+"1g"}).R("L-14-17-2x-4x"),I.6y=!0):(I.1E.16({N:"9U"}).2H("L-14-17-2x-4x"),I.6y=!1),I.1V.1O(1,0).68({"1k-1s":e+"1g"},{7v:i?0:I.P.Q.1z.1V.81})},6x:J(i){I.6w=!1,I.4L.2H("L-14-17-9T"),I.1E.52(0),I.1E.16({N:"9U"}).2H("L-14-17-2x-4x"),I.6y=!1,I.1V.1O(1,0).68({"1k-1s":-1*(I.1w.17.N||0)+"1g"},{7v:i?0:I.P.Q.1z.1V.82,93:$.X(J(){I.3E(!1),I.7T(I.1w.2x)},I)})}},5Y={1o:J(b){K c=1R[1]||{},1A=1R[2];1R[1]&&"62"==$.13(1R[1])&&(1A=1R[1],c=B.78({}));K d=[],9V;2O(9V=$.13(b)){1K"4t":1K"7f":K f=25 4i(b,c),5u="1j-2l-4H-Q";W(f.4H){W(2y.5L(b)){K g=$(\'.2l[1j-2l-4H="\'+$(b).1j("2l-4H")+\'"]\'),h={};g.cr("["+5u+"]").1m(J(i,a){$.1i(h,7K("({"+($(a).2C(5u)||"")+"})"))}),g.1m(J(i,t){1A||t!=b||(1A=i+1),d.2n(25 4i(t,$.1i({},h,c)))})}}1Z{K h={};2y.5L(b)&&$(b).2Q("["+5u+"]")&&($.1i(h,7K("({"+($(b).2C(5u)||"")+"})")),f=25 4i(b,$.1i({},h,c))),d.2n(f)}2Y;1K"9W":$.1m(b,J(i,t){K e=25 4i(t,c);d.2n(e)})}(!1A||1>1A)&&(1A=1),1A>d.1u&&(1A=d.1u),Y.7w||Y.3Q({x:0,y:0}),D.2g(d,1A,{4q:J(){D.1o(J(){})}})}};$.1i(j,{1F:J(){A.8m("28"),D.1F()},1o:J(){5Y.1o.2L(5Y,k.2q(1R))},1e:J(){D.1e()},7e:J(i){D.7e(i)}}),("62"==$.13(1h.3M)&&3>1h.3M||1h.4T&&"62"==$.13(1h.4k)&&8C.18>1h.4k)&&(j.1o=J(){J i(t){K e,s=$.13(t);W("4t"==s)e=t;1Z W("9W"==s&&t[0])e=i(t[0]);1Z W(2y.5L(t)&&$(t).2C("57"))K e=$(t).2C("57");1Z e=t.1B?t.1B:!1;T e}T J(t){K e=i(t);e&&(1d.2Z.57=e)}}());K H={1x:{9X:"cs ct 6Y 8z 7Y",4M:J(i){T $.6a(5E(i),I.9X.3F(" "))>-1},1j:J(i){T I.4M()?{5q:5E(i)}:!1}},2j:{4M:J(i){K t=/(2j\\.3k|9Y\\.be)\\/cu\\?(?=.*77?=([a-5x-7U-9-2y]+))(?:\\S+)?$/.5N(i);T t&&t[2]?t[2]:(t=/(2j\\.3k|9Y\\.be)\\/(77?\\/|u\\/|5Z\\/)?([a-5x-7U-9-2y]+)(?:\\S+)?$/i.5N(i),t&&t[3]?t[3]:!1)},1j:J(i){K t=I.4M(i);T t?{3z:t}:!1}},1W:{4M:J(i){K t=/(1W\\.3k)\\/([a-5x-7U-9-2y]+)(?:\\S+)?$/i.5N(i);T t&&t[2]?t[2]:!1},1j:J(i){K t=I.4M(i);T t?{3z:t}:!1}}};$(2z).9x(J(){j.1F()}),1d.6N=j})(28);',62,775,'||||||||||||||||||||||||||||||||||||||||||||this|function|var|fr|width|height||view|options|addClass||return|ui|append|if|proxy|Frames|||div|_frames|type|touch||css|caption||Math|thumbnails|_position|element|window|hide|dimensions|px|Browser|extend|data|margin|side|each|frame|show|left|IE|thumbnail|top|null|length|content|_vars|image|Dimensions|effects|position|url|bind|wrapper|info|initialize|next|max|cache|previous|case|_dimensions|visible|move|stop|get|resize|arguments|loading|remove|add|touchCaption|vimeo|button|overlay|else||click|enabled|for|min|new|_boxDimensions||jQuery|set|frames|box|sides||thumbnail_frame|Support|load|close|outside|youtube|horizontal|fresco|clear|push|spacer|ui_wrapper|call|preventDefault|fit|className|_loading|_thumbnails|right|overflow|_|document|build|find|attr|none|stopPropagation|background|_timeouts|removeClass|vertical|updateVars|states|apply|void|target|switch|icon|is|setPosition|_visible|has|onclick|delay|bounds|mobileTouch|break|location||visibility|_sideWidth|_tracking|inside|no|||viewport||portrait|loop|both|controls|prototype|round|indexOf|pageX|pageY|dragImage|com|startObserving|orientation|bubble|moveTo|player|padder|box_wrapper|_data|_page|src|originalEvent|style|parseInt|Touch|id|delegate|first|download_image|player_iframe|setOverflowClass|split|deepExtendClone|slide|easing|Fit|within|border|Android|preloaded|queues|timeouts|setXY|queue|Class|_loaded|measure|ipp|landscape|onload|skins|onClick|preload|scripts|start|track|skin||Window|fadeTo|prepend|menu|disable|active|_previous|span|getLayout|hasClass|200|Loading|View|innerHeight|WebKit|_events|touchmove|abs|unbind|swipe|callback|delete|defaultSkin|string|setExpression|setSkin|setOpacity|scroll|touchMenu|_reset|views|enable|_preloaded|floor|_removeVideo|_next_button|box_spacer|group|_slide|_disabled|_url|more|detect|in|canvas|getURIData|api|body|documentElement|MobileSafari|parseFloat|end|dragScale|http|https|protocol||offset|scrollTop|fadeOut|setTimeout||clearTimeout|href|overlapping|closest|_m|keyCode|updateDimensions|isTouch|_handleTracking|_playing|getSurroundingIndexes|_track|_next|disabled|_loadTimer|showUI|startUITimer|bottom|player_div|_ui_timer|extension|thumbs|_mode|ceil|_dgo|getOrientation|String|zA|test|substr|warn|try|catch|deepExtend|detectExtension|sync|touchEffects|keyboard|esc|autoplay|initialTypeOptions|isElement|mousewheel|exec|IEMobile|mousemove|touchstart|touchend|touches|xhr|boolean|img|scrollLeft|_count|_Fresco|embed|easeInSine|before|number|setOrientation|oneCaption|_noCaptions|_tracking_timer|YT|animate|afterPosition|inArray|_touchWidth|_whileVisible|clearUITimer|box_outer_border|ui_padder|clone|_previous_button|info_padder|html|_border|320|568|afterLoad|_button|hideUI|padding|overlap|page|thumbnail_wrapper|_afterLoad|_views|_expanded|collapse|_scrolling|sfcc|rs|console|createDragImage|Image|getContext|toDataURL|Overlay|Timeouts|States|Frame|Thumbnail|match|toLowerCase|Fresco|version|300|250|hd|innerWidth|Opera|opera|Chrome|createElement|postMessage|jpeg|required|available|Date|getTime|scrollSupressionThreshold|Cache||once|vi|create|absolute|center|draw|_states|showhide|setDefaultSkin|object|param|stopQueues|_hide|block|after|_s|easeOutSine|fetchOptions|getKeyByKeyCode|updateMove|_touched|removeAttr|insertYoutubeVideo|froogaloop|insertVimeoVideo|duration|_xyp|_pos|removeTracking|clearLoad|box_padder|download|ui_spacer|ui_outer_border|text|_getInfoHeight|_fit|clearLoadTimer|index|_movieLoaded|eval|_slider|_thumbs|setActive|pages|moveToPage|loadCurrentPage|_blocked|overflowHeight|setPaddedClass|Z0|fromCharCode|100|canvasToDataUrlPNG|png|constructor|base|slideOut|slideIn|175|spacing|640|reset|IE6|nodeType|parentNode|wheelDelta|detail|pow|AppleWebKit|Gecko|ChromeMobile|CrMo|navigator|prefix|toUpperCase|DocumentTouch|pointerEvents|check|Za|notified|durationThreshold|horizontalDistanceThreshold|verticalDistanceThreshold|direction|swiped|supressX|getJSON|oembed|json|getDimensions|jpg|easeInOutSine|getScrollDimensions|533|timeout_|update|class|skinless|hideOverlapping|wmode|value|transparent|hidden|restoreOverlapping|onShow|_show|unblock|hideAll|afterHide|unbindTouch|onkeydown|onkeyup|uis|orientationchange|original|handleTracking|clearTrackingTimer|startTracking|stopTracking|playing|complete|clearLoads|preloadSurroundingImages|mayPrevious||mayNext|setVisible|isVisible|setHidden|grep|setXYP|setTracking|isTracking|outer|ui_toggle|_spacing|_max|dragstart|mouseenter|mouseleave|setDragImage|addElement|quality|prevent|iframe|webkitAllowFullScreen|mozallowfullscreen|allowFullScreen|frameborder|addEvent|ready|_preShow|_shown|_postHide|previousPage|nextPage|setOrientationClass|flipMargins|flipMargin|flipDimensions|flipMultiple|ie|resizing|activate|preBuild|_removed|thumbnail_url|caption_wrapper|expand|restore|hasOverflowClass|padded|less|auto|object_type|array|extensions|youtu|114|110|111|109|toString|log|globalAlpha|drawImage|Object|replace|400|440|180|3e3|5e3|title|byline|enablejsapi|iv_load_policy|modestbranding|rel|360|Array|slice|isAttached|120|Event|trigger|isPropagationStopped|isDefaultPrevented|DOMMouseScroll|Quad|Cubic|Quart|Quint|Expo|Sine|cos|PI|easeIn|easeOut|easeInOut|RegExp|attachEvent|MSIE|KHTML|rv|Apple|Mobile|Safari|userAgent|charAt|join|Webkit|Moz|ms|Khtml|ontouchstart|instanceof|prefixed|Win|Mac|Linux|platform|fn|jquery|z_|z0|requires|mousedown|mouseup|suppresX|suppresY|stopImmediatePropagation|one|supressY|1e3||removeData|lifetime|3e5|inject|abort|dela|setOptions|oldIE|ltIE|mobile|currentTarget|select|name|restoreOverlappingWithinContent|fs|150|_pinchZoomed|keydown|keyup|bindTouch|_startMoveTime|stopVideo|unload|outerWidth|_top|pn|hideAllBut|clearTracking|_scrollbarWidth|scrollbarWidth|toggle|info_background|smart|opacity|parents|dataTransfer|replaceWith|720|hd1080|hd720|outerHeight|Tracking|setSize|relative|_style|setDimensions|Player|videoId|playerVars|events|onReady|setPlaybackQuality|onStateChange|www|player_id|video|Froogaloop|play|destroy|easeInQuad|easeOutQuart|hideUIDelayed|slider|detach|500|adjustToViewport|refresh|_dimension|state|thumbnail_image|menu_wrapper|drag|hasPaddedClass|nocaptions|filter|bmp|gif|watch'.split('|'),0,{}));

jQuery.extend(Fresco.skins, {
   // Don't modify! Its recommended to use custom skins for customization,
   // see: http://www.frescojs.com/documentation/skins
  'base': {
    effects: {
      content: { show: 0, hide: 0, sync: true },
      loading: { show: 0,  hide: 300, delay: 250 },
      thumbnails: { show: 200, slide: 0, load: 300, delay: 250 },
      window:  { show: 440, hide: 300, position: 180 },
      ui:      { show: 250, hide: 200, delay: 3000 }
    },
    touchEffects: {
      ui: { show: 175, hide: 175, delay: 5000 }
    },
    fit: 'both',
    keyboard: {
      left:  true,
      right: true,
      esc:   true
    },
    loop: false,
    onClick: false,
    overlay: { close: true },
    position: false,
    preload: true,
    spacing: {
      both: { horizontal: 0, vertical: 0 },
      width: { horizontal: 0, vertical: 0 },
      height: { horizontal: 0, vertical: 0 },
      none: { horizontal: 0, vertical: 0 }
    },
    thumbnails: false,
    ui: 'outside',
    vimeo: {
      autoplay: 1,
      title: 1,
      byline: 1,
      portrait: 0,
      loop: 0
    },
    youtube: {
      autoplay: 1,
      controls: 1,
      enablejsapi: 1,
      hd: 1,
      iv_load_policy: 3,
      loop: 0,
      modestbranding: 1,
      rel: 0
    },

    initialTypeOptions: {
      'image': { },
      'youtube': {
      	autoplay: 1,
        width: 1920,
        height: 1080
      },
      'vimeo': {
      	autoplay: 1,
        width: 1920,
        height: 1080
      }
    },
    onShow: function() {
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		 jQuery('.fr-loading').css('top','50%');
	  }
      
	}
  },

  // reserved for resetting options on the base skin
  'reset': { },

  // the default skin
  'fresco': { },

  // IE6 fallback skin
  'IE6': { }
});

Fresco.setDefaultSkin('base');

/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];

    div.className = 'fit-vids-style';
    div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';

    ref.parentNode.insertBefore(div,ref);

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='www.youtube.com']",
        "iframe[src*='www.youtube-nocookie.com']",
        "iframe[src*='www.kickstarter.com']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));

      $allVideos.each(function(){
        var $this = $(this);
        if ($(this).closest('.rev_slider_wrapper').length != 1) {
	        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
	        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
	            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
	            aspectRatio = height / width;
	        if(!$this.attr('id')){
	          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
	          $this.attr('id', videoID);
	        }
	        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
	        $this.removeAttr('height').removeAttr('width');
        }
      });
    });
  };
})( jQuery );

/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://isotope.metafizzy.co/docs/license.html
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright 2013 Metafizzy
 */
(function(a,b,c){"use strict";var d=a.document,e=a.Modernizr,f=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},g="Moz Webkit O Ms".split(" "),h=function(a){var b=d.documentElement.style,c;if(typeof b[a]=="string")return a;a=f(a);for(var e=0,h=g.length;e<h;e++){c=g[e]+a;if(typeof b[c]=="string")return c}},i=h("transform"),j=h("transitionProperty"),k={csstransforms:function(){return!!i},csstransforms3d:function(){var a=!!h("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),f=b('<div id="modernizr" />').appendTo("html");a=f.height()===3,f.remove(),e.remove()}return a},csstransitions:function(){return!!j}},l;if(e)for(l in k)e.hasOwnProperty(l)||e.addTest(l,k[l]);else{e=a.Modernizr={_version:"1.6ish: miniModernizr for Isotope"};var m=" ",n;for(l in k)n=k[l](),e[l]=n,m+=" "+(n?"":"no-")+l;b("html").addClass(m)}if(e.csstransforms){var o=e.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},p=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},g,h={},j;f[c]=d,b.extend(e,f);for(g in e)j=e[g],h[g]=o[g](j);var k=h.translate||"",l=h.scale||"",m=k+l;b.data(a,"isoTransform",e),a.style[i]=m};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){p(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){p(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var q,r;e.csstransitions&&(q={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd otransitionend",transitionProperty:"transitionend"}[j],r=h("transitionDuration"));var s=b.event,t=b.event.handle?"handle":"dispatch",u;s.special.smartresize={setup:function(){b(this).bind("resize",s.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",s.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",u&&clearTimeout(u),u=setTimeout(function(){s[t].apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c,d){this.element=b(c),this._create(a),this._init(d)};var v=["width","height"],w=b(a);b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(a){this.options=b.extend({},b.Isotope.settings,a),this.styleQueue=[],this.elemCount=0;var c=this.element[0].style;this.originalStyle={};var d=v.slice(0);for(var e in this.options.containerStyle)d.push(e);for(var f=0,g=d.length;f<g;f++)e=d[f],this.originalStyle[e]=c[e]||"";this.element.css(this.options.containerStyle),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount++,b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems(),this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var i=this;setTimeout(function(){i.element.addClass(i.options.containerClass)},0),this.options.resizable&&w.bind("smartresize.isotope",function(){i.resize()}),this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};return c=c.filter(function(a,b){return b.nodeType===1}),this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0),c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var d in a)c="_update"+f(d),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,""),b;switch(a){case"css":case"none":b=!1;break;case"jquery":b=!0;break;default:b=!e.csstransitions}this.isUsingJQueryAnimation=b,this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var a=this.usingTransforms=this.options.transformsEnabled&&e.csstransforms&&e.csstransitions&&!this.isUsingJQueryAnimation;a||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale),this.getPositionStyles=a?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}return this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c),a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)!c&&a==="original-order"?g[a]=b.data(this,"isotope-sort-data")[a]:g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g)})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);return f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order")),(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b=Math.round(b+this.offset.left),c=Math.round(c+this.offset.top);var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(a,b),this.isLaidOut=!0},_processStyleQueue:function(a,c){var d=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",f=this.options.animationOptions,g=this.options.onLayout,h,i,j,k;i=function(a,b){b.$el[d](b.style,f)};if(this._isInserting&&this.isUsingJQueryAnimation)i=function(a,b){h=b.$el.hasClass("no-transition")?"css":d,b.$el[h](b.style,f)};else if(c||g||f.complete){var l=!1,m=[c,g,f.complete],n=this;j=!0,k=function(){if(l)return;var b;for(var c=0,d=m.length;c<d;c++)b=m[c],typeof b=="function"&&b.call(n.element,a,n);l=!0};if(this.isUsingJQueryAnimation&&d==="animate")f.complete=k,j=!1;else if(e.csstransitions){var o=0,p=this.styleQueue[0],s=p&&p.$el,t;while(!s||!s.length){t=this.styleQueue[o++];if(!t)return;s=t.$el}var u=parseFloat(getComputedStyle(s[0])[r]);u>0&&(i=function(a,b){b.$el[d](b.style,f).one(q,k)},j=!1)}}b.each(this.styleQueue,i),j&&k(),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._isInserting=!1,c._processStyleQueue(a,b)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a,b){this.$allAtoms=this.$allAtoms.not(a),this.$filteredAtoms=this.$filteredAtoms.not(a);var c=this,d=function(){a.remove(),b&&b.call(c.element)};a.filter(":not(."+this.options.hiddenClass+")").length?(this.styleQueue.push({$el:a,style:this.options.hiddenStyle}),this._sort(),this.reLayout(d)):d()},shuffle:function(a){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout(a)},destroy:function(){var a=this.usingTransforms,b=this.options;this.$allAtoms.removeClass(b.hiddenClass+" "+b.itemClass).each(function(){var b=this.style;b.position="",b.top="",b.left="",b.opacity="",a&&(b[i]="")});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".isotope").undelegate("."+b.hiddenClass,"click").removeClass(b.containerClass).removeData("isotope"),w.unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",d=a?"height":"width",e=a?"rows":"cols",g=this.element[d](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+f(d)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][e]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];return this._getSegments(a),this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=Math.floor(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=Math.floor(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var x=function(b){a.console&&a.console.error(b)};b.fn.isotope=function(a,c){if(typeof a=="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var c=b.data(this,"isotope");if(!c){x("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(c[a])||a.charAt(0)==="_"){x("no such method '"+a+"' for isotope instance");return}c[a].apply(c,d)})}else this.each(function(){var d=b.data(this,"isotope");d?(d.option(a),d._init(c)):b.data(this,"isotope",new b.Isotope(a,this,c))});return this}})(window,jQuery);

// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

// Place any jQuery/helper plugins in here.

// 1) Isotope
// 2) DetectMobileBrowser
// 3) ScrollToFixed
// 4) Easing
// 5) gMaps



/*!
 * jQuery imagesLoaded plugin v2.1.0
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

/*jshint curly: true, eqeqeq: true, noempty: true, strict: true, undef: true, browser: true */
/*global jQuery: false */

;(function($, undefined) {
'use strict';

// blank image data-uri bypasses webkit log warning (thx doug jones)
var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

$.fn.imagesLoaded = function( callback ) {
	var $this = this,
		deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
		hasNotify = $.isFunction(deferred.notify),
		$images = $this.find('img').add( $this.filter('img') ),
		loaded = [],
		proper = [],
		broken = [];

	// Register deferred callbacks
	if ($.isPlainObject(callback)) {
		$.each(callback, function (key, value) {
			if (key === 'callback') {
				callback = value;
			} else if (deferred) {
				deferred[key](value);
			}
		});
	}

	function doneLoading() {
		var $proper = $(proper),
			$broken = $(broken);

		if ( deferred ) {
			if ( broken.length ) {
				deferred.reject( $images, $proper, $broken );
			} else {
				deferred.resolve( $images );
			}
		}

		if ( $.isFunction( callback ) ) {
			callback.call( $this, $images, $proper, $broken );
		}
	}

	function imgLoaded( img, isBroken ) {
		// don't proceed if BLANK image, or image is already loaded
		if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
			return;
		}

		// store element in loaded images array
		loaded.push( img );

		// keep track of broken and properly loaded images
		if ( isBroken ) {
			broken.push( img );
		} else {
			proper.push( img );
		}

		// cache image and its state for future calls
		$.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

		// trigger deferred progress method if present
		if ( hasNotify ) {
			deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
		}

		// call doneLoading and clean listeners if all images are loaded
		if ( $images.length === loaded.length ){
			setTimeout( doneLoading );
			$images.unbind( '.imagesLoaded' );
		}
	}

	// if no images, trigger immediately
	if ( !$images.length ) {
		doneLoading();
	} else {
		$images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
			// trigger imgLoaded
			imgLoaded( event.target, event.type === 'error' );
		}).each( function( i, el ) {
			var src = el.src;

			// find out if this image has been already checked for status
			// if it was, and src has not changed, call imgLoaded on it
			var cached = $.data( el, 'imagesLoaded' );
			if ( cached && cached.src === src ) {
				imgLoaded( el, cached.isBroken );
				return;
			}

			// if complete is true and browser supports natural sizes, try
			// to check for image status manually
			if ( el.complete && el.naturalWidth !== undefined ) {
				imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
				return;
			}

			// cached images don't fire load sometimes, so we reset src, but only when
			// dealing with IE, or image is complete (loaded) and failed manual check
			// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			if ( el.readyState || el.complete ) {
				el.src = BLANK;
				el.src = src;
			}
		});
	}

	return deferred ? deferred.promise( $this ) : $this;
};

})(jQuery);


// 2) DetectMobileBrowser
// =============================================================================================================================


/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){jQuery.browser.mobile=/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);




// 3) ScrolltoFixed
// =============================================================================================================================


(function($) {
    $.isScrollToFixed = function(el) {
        return $(el).data('ScrollToFixed') !== undefined;
    };

    $.ScrollToFixed = function(el, options) {
        // To avoid scope issues, use 'base' instead of 'this' to reference this
        // class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element.
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object.
        base.$el.data('ScrollToFixed', base);

        // A flag so we know if the scroll has been reset.
        var isReset = false;

        // The element that was given to us to fix if scrolled above the top of
        // the page.
        var target = base.$el;

        var position;
        var originalPosition;

        // The offset top of the element when resetScroll was called. This is
        // used to determine if we have scrolled past the top of the element.
        var offsetTop = 0;

        // The offset left of the element when resetScroll was called. This is
        // used to move the element left or right relative to the horizontal
        // scroll.
        var offsetLeft = 0;
        var originalOffsetLeft = -1;

        // This last offset used to move the element horizontally. This is used
        // to determine if we need to move the element because we would not want
        // to do that for no reason.
        var lastOffsetLeft = -1;

        // This is the element used to fill the void left by the target element
        // when it goes fixed; otherwise, everything below it moves up the page.
        var spacer = null;

        var spacerClass;

        var className;

        // Capture the original offsets for the target element. This needs to be
        // called whenever the page size changes or when the page is first
        // scrolled. For some reason, calling this before the page is first
        // scrolled causes the element to become fixed too late.
        function resetScroll() {
            // Set the element to it original positioning.
            target.trigger('preUnfixed.ScrollToFixed');
            setUnfixed();
            target.trigger('unfixed.ScrollToFixed');

            // Reset the last offset used to determine if the page has moved
            // horizontally.
            lastOffsetLeft = -1;

            // Capture the offset top of the target element.
            offsetTop = target.offset().top;

            // Capture the offset left of the target element.
            offsetLeft = target.offset().left;
            
            // If the offsets option is on, alter the left offset.
            if (base.options.offsets) {
                offsetLeft += (target.offset().left - target.position().left);
            }
            
            if (originalOffsetLeft == -1) {
                originalOffsetLeft = offsetLeft;
            }

            position = target.css('position');

            // Set that this has been called at least once.
            isReset = true;
            
            if (base.options.bottom != -1) {
                target.trigger('preFixed.ScrollToFixed');
                setFixed();
                target.trigger('fixed.ScrollToFixed');
            }
        }

        function getLimit() {
            var limit = base.options.limit;
            if (!limit) return 0;

            if (typeof(limit) === 'function') {
                return limit();
            }
            return limit;
        }

        // Returns whether the target element is fixed or not.
        function isFixed() {
            return position === 'fixed';
        }

        // Returns whether the target element is absolute or not.
        function isAbsolute() {
            return position === 'absolute';
        }

        function isUnfixed() {
            return !(isFixed() || isAbsolute());
        }

        // Sets the target element to fixed. Also, sets the spacer to fill the
        // void left by the target element.
        function setFixed() {
            // Only fix the target element and the spacer if we need to.
            if (!isFixed()) {
                // Set the spacer to fill the height and width of the target
                // element, then display it.
                spacer.css({
                    'display' : target.css('display'),
                    'width' : target.outerWidth(true),
                    'height' : target.outerHeight(true),
                    'float' : target.css('float')
                });

                // Set the target element to fixed and set its width so it does
                // not fill the rest of the page horizontally. Also, set its top
                // to the margin top specified in the options.
                target.css({
                    'width' : target.width(),
                    'position' : 'fixed',
                    'top' : base.options.bottom == -1?getMarginTop():'',
                    'bottom' : base.options.bottom == -1?'':base.options.bottom,
                    'margin-left' : '0px'
                });

                if (base.options.className) {
                    target.addClass(base.options.className);
                }

                position = 'fixed';
            }
        }

        function setAbsolute() {
            target.css({
                'width' : target.width(),
                'position' : 'absolute',
                'top' : getLimit(),
                'left' : offsetLeft,
                'margin-left' : '0px',
                'bottom' : ''
            });
            
            position = 'absolute';
            
        }

        // Sets the target element back to unfixed. Also, hides the spacer.
        function setUnfixed() {
            // Only unfix the target element and the spacer if we need to.
            if (!isUnfixed()) {
                lastOffsetLeft = -1;

                // Hide the spacer now that the target element will fill the
                // space.
                spacer.css('display', 'none');

                // Remove the style attributes that were added to the target.
                // This will reverse the target back to the its original style.
                target.css({
                    'width' : '',
                    'position' : '',
                    'left' : '',
                    'top' : '',
                    'margin-left' : ''
                });

                if (base.options.className) {
                    target.removeClass(base.options.className);
                }

                position = null;
            }
        }

        // Moves the target element left or right relative to the horizontal
        // scroll position.
        function setLeft(x) {
            // Only if the scroll is not what it was last time we did this.
            if (x != lastOffsetLeft) {
                // Move the target element horizontally relative to its original
                // horizontal position.
                target.css('left', offsetLeft - x);

                // Hold the last horizontal position set.
                lastOffsetLeft = x;
            }
        }

        function getMarginTop() {
            return base.options.marginTop;
        }

        // Checks to see if we need to do something based on new scroll position
        // of the page.
        function checkScroll() {
            if (!$.isScrollToFixed(target)) return;
            var wasReset = isReset;

            // If resetScroll has not yet been called, call it. This only
            // happens once.
            if (!isReset) {
                resetScroll();
            }

            // Grab the current horizontal scroll position.
            var x = $(window).scrollLeft();

            // Grab the current vertical scroll position.
            var y = $(window).scrollTop();

            // Get the limit, if there is one.
            var limit = getLimit();

            // If the vertical scroll position, plus the optional margin, would
            // put the target element at the specified limit, set the target
            // element to absolute.
            if (base.options.minWidth && $(window).width() < base.options.minWidth) {
                if (!isUnfixed() || !wasReset) {
                    postPosition();
                    target.trigger('preUnfixed.ScrollToFixed');
                    setUnfixed();
                    target.trigger('unfixed.ScrollToFixed');
                }
            } else if (base.options.bottom == -1) {
                // If the vertical scroll position, plus the optional margin, would
                // put the target element at the specified limit, set the target
                // element to absolute.
                if (limit > 0 && y >= limit - getMarginTop()) {
                    if (!isAbsolute() || !wasReset) {
                        postPosition();
                        target.trigger('preAbsolute.ScrollToFixed');
                        setAbsolute();
                        target.trigger('unfixed.ScrollToFixed');
                    }
                // If the vertical scroll position, plus the optional margin, would
                // put the target element above the top of the page, set the target
                // element to fixed.
                } else if (y >= offsetTop - getMarginTop()) {
                    if (!isFixed() || !wasReset) {
                        postPosition();
                        target.trigger('preFixed.ScrollToFixed');

                        // Set the target element to fixed.
                        setFixed();

                        // Reset the last offset left because we just went fixed.
                        lastOffsetLeft = -1;

                        target.trigger('fixed.ScrollToFixed');
                    }
                    // If the page has been scrolled horizontally as well, move the
                    // target element accordingly.
                    setLeft(x);
                } else {
                    // Set the target element to unfixed, placing it where it was
                    // before.
                    if (!isUnfixed() || !wasReset) {
                        postPosition();
                        target.trigger('preUnfixed.ScrollToFixed');
                        setUnfixed();
                        target.trigger('unfixed.ScrollToFixed');
                    }
                }
            } else {
                if (limit > 0) {
                    if (y + $(window).height() - target.outerHeight(true) >= limit - (getMarginTop() || -getBottom())) {
                        if (isFixed()) {
                            postPosition();
                            target.trigger('preUnfixed.ScrollToFixed');
                            
                            if (originalPosition === 'absolute') {
                                setAbsolute();
                            } else {
                                setUnfixed();
                            }

                            target.trigger('unfixed.ScrollToFixed');
                        }
                    } else {
                        if (!isFixed()) {
                            postPosition();
                            target.trigger('preFixed.ScrollToFixed');
                            setFixed();
                        }
                        setLeft(x);
                        target.trigger('fixed.ScrollToFixed');
                    }
                } else {
                    setLeft(x);
                }
            }
        }

        function getBottom() {
            if (!base.options.bottom) return 0;
            return base.options.bottom;
        }

        function postPosition() {
            var position = target.css('position');
            
            if (position == 'absolute') {
                target.trigger('postAbsolute.ScrollToFixed');
            } else if (position == 'fixed') {
                target.trigger('postFixed.ScrollToFixed');
            } else {
                target.trigger('postUnfixed.ScrollToFixed');
            }
        }

        var windowResize = function(event) {
            // Check if the element is visible before updating it's position, which
            // improves behavior with responsive designs where this element is hidden.
            if(target.is(':visible')) {
                isReset = false;
                checkScroll();
			}
        }

        var windowScroll = function(event) {
            checkScroll();
        }

        var isPositionFixedSupported = function() {
            var container = document.body;

            if (document.createElement && container && container.appendChild && container.removeChild) {
                var el = document.createElement('div');

                if (!el.getBoundingClientRect) return null;

                el.innerHTML = 'x';
                el.style.cssText = 'position:fixed;top:100px;';
                container.appendChild(el);

                var originalHeight = container.style.height,
                originalScrollTop = container.scrollTop;

                container.style.height = '3000px';
                container.scrollTop = 500;

                var elementTop = el.getBoundingClientRect().top;
                container.style.height = originalHeight;

                var isSupported = (elementTop === 100);
                container.removeChild(el);
                container.scrollTop = originalScrollTop;

                return isSupported;
            }

            return null;
        }

        var preventDefault = function(e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        // Initializes this plugin. Captures the options passed in, turns this
        // off for devices that do not support fixed position, adds the spacer,
        // and binds to the window scroll and resize events.
        base.init = function() {
            // Capture the options for this plugin.
            base.options = $
                    .extend({}, $.ScrollToFixed.defaultOptions, options);

            // Turn off this functionality for devices that do not support it.
            if (!(base.options && base.options.dontCheckForPositionFixedSupport)) {
                var fixedSupported = isPositionFixedSupported();
                if (!fixedSupported) return;
            }

            // Put the target element on top of everything that could be below
            // it. This reduces flicker when the target element is transitioning
            // to fixed.
            base.$el.css('z-index', base.options.zIndex);

            // Create a spacer element to fill the void left by the target
            // element when it goes fixed.
            spacer = $('<div />');

            position = target.css('position');
            originalPosition = target.css('position');

            // Place the spacer right after the target element.
            if (isUnfixed() && spacer.lenght == 0) base.$el.after(spacer);

            // Reset the target element offsets when the window is resized, then
            // check to see if we need to fix or unfix the target element.
            $(window).bind('resize.ScrollToFixed', windowResize);

            // When the window scrolls, check to see if we need to fix or unfix
            // the target element.
            $(window).bind('scroll.ScrollToFixed', windowScroll);
            
            if (base.options.preFixed) {
                target.bind('preFixed.ScrollToFixed', base.options.preFixed);
            }
            if (base.options.postFixed) {
                target.bind('postFixed.ScrollToFixed', base.options.postFixed);
            }
            if (base.options.preUnfixed) {
                target.bind('preUnfixed.ScrollToFixed', base.options.preUnfixed);
            }
            if (base.options.postUnfixed) {
                target.bind('postUnfixed.ScrollToFixed', base.options.postUnfixed);
            }
            if (base.options.preAbsolute) {
                target.bind('preAbsolute.ScrollToFixed', base.options.preAbsolute);
            }
            if (base.options.postAbsolute) {
                target.bind('postAbsolute.ScrollToFixed', base.options.postAbsolute);
            }
            if (base.options.fixed) {
                target.bind('fixed.ScrollToFixed', base.options.fixed);
            }
            if (base.options.unfixed) {
                target.bind('unfixed.ScrollToFixed', base.options.unfixed);
            }

            if (base.options.spacerClass) {
                spacer.addClass(base.options.spacerClass);
            }

            target.bind('resize.ScrollToFixed', function() {
                spacer.height(target.height());
            });

            target.bind('scroll.ScrollToFixed', function() {
                target.trigger('preUnfixed.ScrollToFixed');
                setUnfixed();
                target.trigger('unfixed.ScrollToFixed');
                checkScroll();
            });

            target.bind('remove.ScrollToFixed', function(ev) {
                preventDefault(ev);
                
                target.trigger('preUnfixed.ScrollToFixed');
                setUnfixed();
                target.trigger('unfixed.ScrollToFixed');

                $(window).unbind('resize.ScrollToFixed', windowResize);
                $(window).unbind('scroll.ScrollToFixed', windowScroll);

                target.unbind('.ScrollToFixed');
                base.$el.removeData('ScrollToFixed');
            });
            
            // Reset everything.
            windowResize();
        };

        // Initialize the plugin.
        base.init();
    };

    // Sets the option defaults.
    $.ScrollToFixed.defaultOptions = {
        marginTop : 0,
        limit : 0,
        bottom : -1,
        zIndex : 1000
    };

    // Returns enhanced elements that will fix to the top of the page when the
    // page is scrolled.
    $.fn.scrollToFixed = function(options) {
        return this.each(function() {
            (new $.ScrollToFixed(this, options));
        });
    };
})(jQuery);



// 4) Easing
// =============================================================================================================================

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright � 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158; 
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});


// 4) gMap
// =============================================================================================================================



/**
 * jQuery gMap - Google Maps API V3
 *
 * @url		http://github.com/marioestrada/jQuery-gMap
 * @author	Mario Estrada <me@mario.ec> based on original plugin by Cedric Kastner <cedric@nur-text.de
 * @version	2.1.2
 */
 (function(a){a.fn.gMap=function(b,c){switch(b){case"addMarker":return a(this).trigger("gMap.addMarker",[c.latitude,c.longitude,c.content,c.icon,c.popup]);case"centerAt":return a(this).trigger("gMap.centerAt",[c.latitude,c.longitude,c.zoom])}var d=a.extend({},a.fn.gMap.defaults,b);return this.each(function(){var b=new google.maps.Map(this),c=new google.maps.Geocoder;d.address?c.geocode({address:d.address},function(a,c){a&&a.length&&b.setCenter(a[0].geometry.location)}):d.latitude&&d.longitude?b.setCenter(new google.maps.LatLng(d.latitude,d.longitude)):a.isArray(d.markers)&&d.markers.length>0?d.markers[0].address?c.geocode({address:d.markers[0].address},function(a,c){a&&a.length>0&&b.setCenter(a[0].geometry.location)}):b.setCenter(new google.maps.LatLng(d.markers[0].latitude,d.markers[0].longitude)):b.setCenter(new google.maps.LatLng(34.885931,9.84375)),b.setZoom(d.zoom),b.setMapTypeId(google.maps.MapTypeId[d.maptype]);var e={scrollwheel:d.scrollwheel,disableDoubleClickZoom:!d.doubleclickzoom};d.controls===!1?a.extend(e,{disableDefaultUI:!0}):d.controls.length!=0&&a.extend(e,d.controls,{disableDefaultUI:!0}),b.setOptions(e);var f=new google.maps.Marker;marker_icon=new google.maps.MarkerImage(d.icon.image),marker_icon.size=new google.maps.Size(d.icon.iconsize[0],d.icon.iconsize[1]),marker_icon.anchor=new google.maps.Point(d.icon.iconanchor[0],d.icon.iconanchor[1]),f.setIcon(marker_icon),d.icon.shadow&&(marker_shadow=new google.maps.MarkerImage(d.icon.shadow),marker_shadow.size=new google.maps.Size(d.icon.shadowsize[0],d.icon.shadowsize[1]),marker_shadow.anchor=new google.maps.Point(d.icon.shadowanchor[0],d.icon.shadowanchor[1]),f.setShadow(marker_shadow)),a(this).bind("gMap.centerAt",function(a,c,d,e){e&&b.setZoom(e),b.panTo(new google.maps.LatLng(parseFloat(c),parseFloat(d)))});var g;a(this).bind("gMap.addMarker",function(a,c,e,h,i,j){var k=new google.maps.LatLng(parseFloat(c),parseFloat(e)),l=new google.maps.Marker({position:k});i?(marker_icon=new google.maps.MarkerImage(i.image),marker_icon.size=new google.maps.Size(i.iconsize[0],i.iconsize[1]),marker_icon.anchor=new google.maps.Point(i.iconanchor[0],i.iconanchor[1]),l.setIcon(marker_icon),i.shadow&&(marker_shadow=new google.maps.MarkerImage(i.shadow),marker_shadow.size=new google.maps.Size(i.shadowsize[0],i.shadowsize[1]),marker_shadow.anchor=new google.maps.Point(i.shadowanchor[0],i.shadowanchor[1]),f.setShadow(marker_shadow))):(l.setIcon(f.getIcon()),l.setShadow(f.getShadow()));if(h){h=="_latlng"&&(h=c+", "+e);var m=new google.maps.InfoWindow({content:d.html_prepend+h+d.html_append});google.maps.event.addListener(l,"click",function(){g&&g.close(),m.open(b,l),g=m}),j&&google.maps.event.addListenerOnce(b,"tilesloaded",function(){m.open(b,l)})}l.setMap(b)});for(var h=0;h<d.markers.length;h++){marker=d.markers[h];if(marker.address){marker.html=="_address"&&(marker.html=marker.address);var i=this;c.geocode({address:marker.address},function(b,c){return function(d,e){d&&d.length>0&&a(c).trigger("gMap.addMarker",[d[0].geometry.location.lat(),d[0].geometry.location.lng(),b.html,b.icon,b.popup])}}(marker,i))}else a(this).trigger("gMap.addMarker",[marker.latitude,marker.longitude,marker.html,marker.icon,marker.popup])}})},a.fn.gMap.defaults={address:"",latitude:0,longitude:0,zoom:1,markers:[],controls:[],scrollwheel:!1,doubleclickzoom:!0,maptype:"ROADMAP",html_prepend:'<div class="gmap_marker">',html_append:"</div>",icon:{image:"http://www.google.com/mapfiles/marker.png",shadow:"http://www.google.com/mapfiles/shadow50.png",iconsize:[20,34],shadowsize:[37,34],iconanchor:[9,34],shadowanchor:[6,34]}}})(jQuery)
 
 /*
 * jQuery FlexSlider v2.2.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;(function(d){d.flexslider=function(g,l){var a=d(g);a.vars=d.extend({},d.flexslider.defaults,l);var e=a.vars.namespace,v=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,t=("ontouchstart"in window||v||window.DocumentTouch&&document instanceof DocumentTouch)&&a.vars.touch,m="",u,p="vertical"===a.vars.direction,n=a.vars.reverse,h=0<a.vars.itemWidth,r="fade"===a.vars.animation,q=""!==a.vars.asNavFor,c={};d.data(g,"flexslider",a);c={init:function(){a.animating=!1;a.currentSlide=parseInt(a.vars.startAt?
a.vars.startAt:0,10);isNaN(a.currentSlide)&&(a.currentSlide=0);a.animatingTo=a.currentSlide;a.atEnd=0===a.currentSlide||a.currentSlide===a.last;a.containerSelector=a.vars.selector.substr(0,a.vars.selector.search(" "));a.slides=d(a.vars.selector,a);a.container=d(a.containerSelector,a);a.count=a.slides.length;a.syncExists=0<d(a.vars.sync).length;"slide"===a.vars.animation&&(a.vars.animation="swing");a.prop=p?"top":"marginLeft";a.args={};a.manualPause=!1;a.stopped=!1;a.started=!1;a.startTimeout=null;
a.transitions=!a.vars.video&&!r&&a.vars.useCSS&&function(){var b=document.createElement("div"),f=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],k;for(k in f)if(void 0!==b.style[f[k]])return a.pfx=f[k].replace("Perspective","").toLowerCase(),a.prop="-"+a.pfx+"-transform",!0;return!1}();""!==a.vars.controlsContainer&&(a.controlsContainer=0<d(a.vars.controlsContainer).length&&d(a.vars.controlsContainer));""!==a.vars.manualControls&&(a.manualControls=0<d(a.vars.manualControls).length&&
d(a.vars.manualControls));a.vars.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-0.5}),a.container.empty().append(a.slides));a.doMath();a.setup("init");a.vars.controlNav&&c.controlNav.setup();a.vars.directionNav&&c.directionNav.setup();a.vars.keyboard&&(1===d(a.containerSelector).length||a.vars.multipleKeyboard)&&d(document).bind("keyup",function(b){b=b.keyCode;a.animating||39!==b&&37!==b||(b=39===b?a.getTarget("next"):37===b?a.getTarget("prev"):!1,a.flexAnimate(b,a.vars.pauseOnAction))});
a.vars.mousewheel&&a.bind("mousewheel",function(b,f,k,d){b.preventDefault();b=0>f?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(b,a.vars.pauseOnAction)});a.vars.pausePlay&&c.pausePlay.setup();a.vars.slideshow&&a.vars.pauseInvisible&&c.pauseInvisible.init();a.vars.slideshow&&(a.vars.pauseOnHover&&a.hover(function(){a.manualPlay||a.manualPause||a.pause()},function(){a.manualPause||a.manualPlay||a.stopped||a.play()}),a.vars.pauseInvisible&&c.pauseInvisible.isHidden()||(0<a.vars.initDelay?a.startTimeout=
setTimeout(a.play,a.vars.initDelay):a.play()));q&&c.asNav.setup();t&&a.vars.touch&&c.touch();(!r||r&&a.vars.smoothHeight)&&d(window).bind("resize orientationchange focus",c.resize);a.find("img").attr("draggable","false");setTimeout(function(){a.vars.start(a)},200)},asNav:{setup:function(){a.asNav=!0;a.animatingTo=Math.floor(a.currentSlide/a.move);a.currentItem=a.currentSlide;a.slides.removeClass(e+"active-slide").eq(a.currentItem).addClass(e+"active-slide");if(v)g._slider=a,a.slides.each(function(){this._gesture=
new MSGesture;this._gesture.target=this;this.addEventListener("MSPointerDown",function(a){a.preventDefault();a.currentTarget._gesture&&a.currentTarget._gesture.addPointer(a.pointerId)},!1);this.addEventListener("MSGestureTap",function(b){b.preventDefault();b=d(this);var f=b.index();d(a.vars.asNavFor).data("flexslider").animating||b.hasClass("active")||(a.direction=a.currentItem<f?"next":"prev",a.flexAnimate(f,a.vars.pauseOnAction,!1,!0,!0))})});else a.slides.on("click touchend MSPointerUp",function(b){b.preventDefault();
b=d(this);var f=b.index();0>=b.offset().left-d(a).scrollLeft()&&b.hasClass(e+"active-slide")?a.flexAnimate(a.getTarget("prev"),!0):d(a.vars.asNavFor).data("flexslider").animating||b.hasClass(e+"active-slide")||(a.direction=a.currentItem<f?"next":"prev",a.flexAnimate(f,a.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){a.manualControls?c.controlNav.setupManual():c.controlNav.setupPaging()},setupPaging:function(){var b=1,f,k;a.controlNavScaffold=d('<ol class="'+e+"control-nav "+e+("thumbnails"===
a.vars.controlNav?"control-thumbs":"control-paging")+'"></ol>');if(1<a.pagingCount)for(var g=0;g<a.pagingCount;g++)k=a.slides.eq(g),f="thumbnails"===a.vars.controlNav?'<img src="'+k.attr("data-thumb")+'"/>':"<a>"+b+"</a>","thumbnails"===a.vars.controlNav&&!0===a.vars.thumbCaptions&&(k=k.attr("data-thumbcaption"),""!=k&&void 0!=k&&(f+='<span class="'+e+'caption">'+k+"</span>")),a.controlNavScaffold.append("<li>"+f+"</li>"),b++;a.controlsContainer?d(a.controlsContainer).append(a.controlNavScaffold):
a.append(a.controlNavScaffold);c.controlNav.set();c.controlNav.active();a.controlNavScaffold.delegate("a, img","click touchend MSPointerUp",function(b){b.preventDefault();if(""===m||m===b.type){var f=d(this),k=a.controlNav.index(f);f.hasClass(e+"active")||(a.direction=k>a.currentSlide?"next":"prev",a.flexAnimate(k,a.vars.pauseOnAction))}""===m&&(m=b.type);c.setToClearWatchedEvent()})},setupManual:function(){a.controlNav=a.manualControls;c.controlNav.active();a.controlNav.bind("click touchend MSPointerUp",
function(b){b.preventDefault();if(""===m||m===b.type){var f=d(this),k=a.controlNav.index(f);f.hasClass(e+"active")||(k>a.currentSlide?a.direction="next":a.direction="prev",a.flexAnimate(k,a.vars.pauseOnAction))}""===m&&(m=b.type);c.setToClearWatchedEvent()})},set:function(){a.controlNav=d("."+e+"control-nav li "+("thumbnails"===a.vars.controlNav?"img":"a"),a.controlsContainer?a.controlsContainer:a)},active:function(){a.controlNav.removeClass(e+"active").eq(a.animatingTo).addClass(e+"active")},update:function(b,
f){1<a.pagingCount&&"add"===b?a.controlNavScaffold.append(d("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(f).closest("li").remove();c.controlNav.set();1<a.pagingCount&&a.pagingCount!==a.controlNav.length?a.update(f,b):c.controlNav.active()}},directionNav:{setup:function(){var b=d('<ul class="'+e+'direction-nav"><li><a class="'+e+'prev" href="#" data-icon="&#xe0bf;">'+a.vars.prevText+'</a></li><li><a class="'+e+'next" href="#" data-icon="&#xe0c2;">'+a.vars.nextText+"</a></li><li><a class='flex-full visible-desktop' data-icon='&#xe015;' href='#'></a></li></ul>");
a.controlsContainer?(d(a.controlsContainer).append(b),a.directionNav=d("."+e+"direction-nav li a",a.controlsContainer)):(a.append(b),a.directionNav=d("."+e+"direction-nav li a",a));c.directionNav.update();a.directionNav.bind("click touchend MSPointerUp",function(b){b.preventDefault();var k;if(""===m||m===b.type)k=d(this).hasClass(e+"next")?a.getTarget("next"):a.getTarget("prev"),a.flexAnimate(k,a.vars.pauseOnAction);""===m&&(m=b.type);c.setToClearWatchedEvent()})},update:function(){var b=e+"disabled";
1===a.pagingCount?a.directionNav.addClass(b).attr("tabindex","-1"):a.vars.animationLoop?a.directionNav.removeClass(b).removeAttr("tabindex"):0===a.animatingTo?a.directionNav.removeClass(b).filter("."+e+"prev").addClass(b).attr("tabindex","-1"):a.animatingTo===a.last?a.directionNav.removeClass(b).filter("."+e+"next").addClass(b).attr("tabindex","-1"):a.directionNav.removeClass(b).removeAttr("tabindex")}},pausePlay:{setup:function(){var b=d('<div class="'+e+'pauseplay"><a></a></div>');a.controlsContainer?
(a.controlsContainer.append(b),a.pausePlay=d("."+e+"pauseplay a",a.controlsContainer)):(a.append(b),a.pausePlay=d("."+e+"pauseplay a",a));c.pausePlay.update(a.vars.slideshow?e+"pause":e+"play");a.pausePlay.bind("click touchend MSPointerUp",function(b){b.preventDefault();if(""===m||m===b.type)d(this).hasClass(e+"pause")?(a.manualPause=!0,a.manualPlay=!1,a.pause()):(a.manualPause=!1,a.manualPlay=!0,a.play());""===m&&(m=b.type);c.setToClearWatchedEvent()})},update:function(b){"play"===b?a.pausePlay.removeClass(e+
"pause").addClass(e+"play").html(a.vars.playText):a.pausePlay.removeClass(e+"play").addClass(e+"pause").html(a.vars.pauseText)}},touch:function(){var b,f,k,d,c,e,m=!1,l=0,q=0,s=0;if(v){g.style.msTouchAction="none";g._gesture=new MSGesture;g._gesture.target=g;g.addEventListener("MSPointerDown",t,!1);g._slider=a;g.addEventListener("MSGestureChange",u,!1);g.addEventListener("MSGestureEnd",y,!1);var t=function(b){b.stopPropagation();a.animating?b.preventDefault():(a.pause(),g._gesture.addPointer(b.pointerId),
s=0,d=p?a.h:a.w,e=Number(new Date),k=h&&n&&a.animatingTo===a.last?0:h&&n?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+a.vars.itemMargin)*a.move*a.currentSlide:n?(a.last-a.currentSlide+a.cloneOffset)*d:(a.currentSlide+a.cloneOffset)*d)},u=function(a){a.stopPropagation();var b=a.target._slider;if(b){var f=-a.translationX,h=-a.translationY;c=s+=p?h:f;m=p?Math.abs(s)<Math.abs(-f):Math.abs(s)<Math.abs(-h);if(a.detail===a.MSGESTURE_FLAG_INERTIA)setImmediate(function(){g._gesture.stop()});
else if(!m||500<Number(new Date)-e)a.preventDefault(),!r&&b.transitions&&(b.vars.animationLoop||(c=s/(0===b.currentSlide&&0>s||b.currentSlide===b.last&&0<s?Math.abs(s)/d+2:1)),b.setProps(k+c,"setTouch"))}},y=function(a){a.stopPropagation();if(a=a.target._slider){if(a.animatingTo===a.currentSlide&&!m&&null!==c){var g=n?-c:c,h=0<g?a.getTarget("next"):a.getTarget("prev");a.canAdvance(h)&&(550>Number(new Date)-e&&50<Math.abs(g)||Math.abs(g)>d/2)?a.flexAnimate(h,a.vars.pauseOnAction):r||a.flexAnimate(a.currentSlide,
a.vars.pauseOnAction,!0)}k=c=f=b=null;s=0}}}else{g.addEventListener("touchstart",z,!1);var z=function(c){if(a.animating)c.preventDefault();else if(window.navigator.msPointerEnabled||1===c.touches.length)a.pause(),d=p?a.h:a.w,e=Number(new Date),l=c.touches[0].pageX,q=c.touches[0].pageY,k=h&&n&&a.animatingTo===a.last?0:h&&n?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+a.vars.itemMargin)*a.move*a.currentSlide:n?(a.last-a.currentSlide+a.cloneOffset)*
d:(a.currentSlide+a.cloneOffset)*d,b=p?q:l,f=p?l:q,g.addEventListener("touchmove",w,!1),g.addEventListener("touchend",x,!1)},w=function(g){l=g.touches[0].pageX;q=g.touches[0].pageY;c=p?b-q:b-l;m=p?Math.abs(c)<Math.abs(l-f):Math.abs(c)<Math.abs(q-f);if(!m||500<Number(new Date)-e)g.preventDefault(),!r&&a.transitions&&(a.vars.animationLoop||(c/=0===a.currentSlide&&0>c||a.currentSlide===a.last&&0<c?Math.abs(c)/d+2:1),a.setProps(k+c,"setTouch"))},x=function(h){g.removeEventListener("touchmove",w,!1);if(a.animatingTo===
a.currentSlide&&!m&&null!==c){h=n?-c:c;var l=0<h?a.getTarget("next"):a.getTarget("prev");a.canAdvance(l)&&(550>Number(new Date)-e&&50<Math.abs(h)||Math.abs(h)>d/2)?a.flexAnimate(l,a.vars.pauseOnAction):r||a.flexAnimate(a.currentSlide,a.vars.pauseOnAction,!0)}g.removeEventListener("touchend",x,!1);k=c=f=b=null}}},resize:function(){!a.animating&&a.is(":visible")&&(h||a.doMath(),r?c.smoothHeight():h?(a.slides.width(a.computedW),a.update(a.pagingCount),a.setProps()):p?(a.viewport.height(a.h),a.setProps(a.h,
"setTotal")):(a.vars.smoothHeight&&c.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))},smoothHeight:function(b){if(!p||r){var f=r?a:a.viewport;b?f.animate({height:a.slides.eq(a.animatingTo).height()},b):f.height(a.slides.eq(a.animatingTo).height())}},sync:function(b){var f=d(a.vars.sync).data("flexslider"),c=a.animatingTo;switch(b){case "animate":f.flexAnimate(c,a.vars.pauseOnAction,!1,!0);break;case "play":f.playing||f.asNav||f.play();break;case "pause":f.pause()}},
uniqueID:function(a){a.find("[id]").each(function(){var a=d(this);a.attr("id",a.attr("id")+"_clone")});return a},pauseInvisible:{visProp:null,init:function(){var b=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var f=0;f<b.length;f++)b[f]+"Hidden"in document&&(c.pauseInvisible.visProp=b[f]+"Hidden");c.pauseInvisible.visProp&&(b=c.pauseInvisible.visProp.replace(/[H|h]idden/,"")+"visibilitychange",document.addEventListener(b,function(){c.pauseInvisible.isHidden()?a.startTimeout?
clearTimeout(a.startTimeout):a.pause():a.started?a.play():0<a.vars.initDelay?setTimeout(a.play,a.vars.initDelay):a.play()}))},isHidden:function(){return document[c.pauseInvisible.visProp]||!1}},setToClearWatchedEvent:function(){clearTimeout(u);u=setTimeout(function(){m=""},3E3)}};a.flexAnimate=function(b,f,k,g,m){a.vars.animationLoop||b===a.currentSlide||(a.direction=b>a.currentSlide?"next":"prev");q&&1===a.pagingCount&&(a.direction=a.currentItem<b?"next":"prev");if(!a.animating&&(a.canAdvance(b,
m)||k)&&a.is(":visible")){if(q&&g)if(k=d(a.vars.asNavFor).data("flexslider"),a.atEnd=0===b||b===a.count-1,k.flexAnimate(b,!0,!1,!0,m),a.direction=a.currentItem<b?"next":"prev",k.direction=a.direction,Math.ceil((b+1)/a.visible)-1!==a.currentSlide&&0!==b)a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),b=Math.floor(b/a.visible);else return a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),!1;a.animating=!0;a.animatingTo=b;
f&&a.pause();a.vars.before(a);a.syncExists&&!m&&c.sync("animate");a.vars.controlNav&&c.controlNav.active();h||a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide");a.atEnd=0===b||b===a.last;a.vars.directionNav&&c.directionNav.update();b===a.last&&(a.vars.end(a),a.vars.animationLoop||a.pause());if(r)t?(a.slides.eq(a.currentSlide).css({opacity:0,zIndex:1}),a.slides.eq(b).css({opacity:1,zIndex:2}),a.wrapup(l)):(a.slides.eq(a.currentSlide).css({zIndex:1}).animate({opacity:0},a.vars.animationSpeed,
a.vars.easing),a.slides.eq(b).css({zIndex:2}).animate({opacity:1},a.vars.animationSpeed,a.vars.easing,a.wrapup));else{var l=p?a.slides.filter(":first").height():a.computedW;h?(b=a.vars.itemMargin,b=(a.itemW+b)*a.move*a.animatingTo,b=b>a.limit&&1!==a.visible?a.limit:b):b=0===a.currentSlide&&b===a.count-1&&a.vars.animationLoop&&"next"!==a.direction?n?(a.count+a.cloneOffset)*l:0:a.currentSlide===a.last&&0===b&&a.vars.animationLoop&&"prev"!==a.direction?n?0:(a.count+1)*l:n?(a.count-1-b+a.cloneOffset)*
l:(b+a.cloneOffset)*l;a.setProps(b,"",a.vars.animationSpeed);a.transitions?(a.vars.animationLoop&&a.atEnd||(a.animating=!1,a.currentSlide=a.animatingTo),a.container.unbind("webkitTransitionEnd transitionend"),a.container.bind("webkitTransitionEnd transitionend",function(){a.wrapup(l)})):a.container.animate(a.args,a.vars.animationSpeed,a.vars.easing,function(){a.wrapup(l)})}a.vars.smoothHeight&&c.smoothHeight(a.vars.animationSpeed)}};a.wrapup=function(b){r||h||(0===a.currentSlide&&a.animatingTo===
a.last&&a.vars.animationLoop?a.setProps(b,"jumpEnd"):a.currentSlide===a.last&&0===a.animatingTo&&a.vars.animationLoop&&a.setProps(b,"jumpStart"));a.animating=!1;a.currentSlide=a.animatingTo;a.vars.after(a)};a.animateSlides=function(){a.animating||a.flexAnimate(a.getTarget("next"))};a.pause=function(){clearInterval(a.animatedSlides);a.animatedSlides=null;a.playing=!1;a.vars.pausePlay&&c.pausePlay.update("play");a.syncExists&&c.sync("pause")};a.play=function(){a.playing&&clearInterval(a.animatedSlides);
a.animatedSlides=a.animatedSlides||setInterval(a.animateSlides,a.vars.slideshowSpeed);a.started=a.playing=!0;a.vars.pausePlay&&c.pausePlay.update("pause");a.syncExists&&c.sync("play")};a.stop=function(){a.pause();a.stopped=!0};a.canAdvance=function(b,f){var c=q?a.pagingCount-1:a.last;return f?!0:q&&a.currentItem===a.count-1&&0===b&&"prev"===a.direction?!0:q&&0===a.currentItem&&b===a.pagingCount-1&&"next"!==a.direction?!1:b!==a.currentSlide||q?a.vars.animationLoop?!0:a.atEnd&&0===a.currentSlide&&b===
c&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===c&&0===b&&"next"===a.direction?!1:!0:!1};a.getTarget=function(b){a.direction=b;return"next"===b?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-1};a.setProps=function(b,f,c){var d=function(){var c=b?b:(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo;return-1*function(){if(h)return"setTouch"===f?b:n&&a.animatingTo===a.last?0:n?a.limit-(a.itemW+a.vars.itemMargin)*a.move*a.animatingTo:a.animatingTo===a.last?a.limit:
c;switch(f){case "setTotal":return n?(a.count-1-a.currentSlide+a.cloneOffset)*b:(a.currentSlide+a.cloneOffset)*b;case "setTouch":return b;case "jumpEnd":return n?b:a.count*b;case "jumpStart":return n?a.count*b:b;default:return b}}()+"px"}();a.transitions&&(d=p?"translate3d(0,"+d+",0)":"translate3d("+d+",0,0)",c=void 0!==c?c/1E3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",c),a.container.css("transition-duration",c));a.args[a.prop]=d;(a.transitions||void 0===c)&&a.container.css(a.args);
a.container.css("transform",d)};a.setup=function(b){if(r)a.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===b&&(t?a.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+a.vars.animationSpeed/1E3+"s ease",zIndex:1}).eq(a.currentSlide).css({opacity:1,zIndex:2}):a.slides.css({opacity:0,display:"block",zIndex:1}).eq(a.currentSlide).css({zIndex:2}).animate({opacity:1},a.vars.animationSpeed,a.vars.easing)),a.vars.smoothHeight&&c.smoothHeight();else{var f,
g;"init"===b&&(a.viewport=d('<div class="'+e+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(a).append(a.container),a.cloneCount=0,a.cloneOffset=0,n&&(g=d.makeArray(a.slides).reverse(),a.slides=d(g),a.container.empty().append(a.slides)));a.vars.animationLoop&&!h&&(a.cloneCount=2,a.cloneOffset=1,"init"!==b&&a.container.find(".clone").remove(),c.uniqueID(a.slides.first().clone().addClass("clone").attr("aria-hidden","true")).appendTo(a.container),c.uniqueID(a.slides.last().clone().addClass("clone").attr("aria-hidden",
"true")).prependTo(a.container));a.newSlides=d(a.vars.selector,a);f=n?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset;p&&!h?(a.container.height(200*(a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){a.newSlides.css({display:"block"});a.doMath();a.viewport.height(a.h);a.setProps(f*a.h,"init")},"init"===b?100:0)):(a.container.width(200*(a.count+a.cloneCount)+"%"),a.setProps(f*a.computedW,"init"),setTimeout(function(){a.doMath();a.newSlides.css({width:a.computedW,
"float":"left",display:"block"});a.vars.smoothHeight&&c.smoothHeight()},"init"===b?100:0))}h||a.slides.removeClass(e+"active-slide").eq(a.currentSlide).addClass(e+"active-slide");a.vars.init(a)};a.doMath=function(){var b=a.slides.first(),c=a.vars.itemMargin,d=a.vars.minItems,e=a.vars.maxItems;a.w=void 0===a.viewport?a.width():a.viewport.width();a.h=b.height();a.boxPadding=b.outerWidth()-b.width();h?(a.itemT=a.vars.itemWidth+c,a.minW=d?d*a.itemT:a.w,a.maxW=e?e*a.itemT-c:a.w,a.itemW=a.minW>a.w?(a.w-
c*(d-1))/d:a.maxW<a.w?(a.w-c*(e-1))/e:a.vars.itemWidth>a.w?a.w:a.vars.itemWidth,a.visible=Math.floor(a.w/a.itemW),a.move=0<a.vars.move&&a.vars.move<a.visible?a.vars.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===a.pagingCount?0:a.vars.itemWidth>a.w?a.itemW*(a.count-1)+c*(a.count-1):(a.itemW+c)*a.count-a.w-c):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1);a.computedW=a.itemW-a.boxPadding};a.update=function(b,d){a.doMath();h||(b<a.currentSlide?
a.currentSlide+=1:b<=a.currentSlide&&0!==b&&(a.currentSlide-=1),a.animatingTo=a.currentSlide);if(a.vars.controlNav&&!a.manualControls)if("add"===d&&!h||a.pagingCount>a.controlNav.length)c.controlNav.update("add");else if("remove"===d&&!h||a.pagingCount<a.controlNav.length)h&&a.currentSlide>a.last&&(a.currentSlide-=1,a.animatingTo-=1),c.controlNav.update("remove",a.last);a.vars.directionNav&&c.directionNav.update()};a.addSlide=function(b,c){var e=d(b);a.count+=1;a.last=a.count-1;p&&n?void 0!==c?a.slides.eq(a.count-
c).after(e):a.container.prepend(e):void 0!==c?a.slides.eq(c).before(e):a.container.append(e);a.update(c,"add");a.slides=d(a.vars.selector+":not(.clone)",a);a.setup();a.vars.added(a)};a.removeSlide=function(b){var c=isNaN(b)?a.slides.index(d(b)):b;a.count-=1;a.last=a.count-1;isNaN(b)?d(b,a.slides).remove():p&&n?a.slides.eq(a.last).remove():a.slides.eq(b).remove();a.doMath();a.update(c,"remove");a.slides=d(a.vars.selector+":not(.clone)",a);a.setup();a.vars.removed(a)};c.init()};d(window).blur(function(d){focused=
!1}).focus(function(d){focused=!0});d.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7E3,animationSpeed:600,initDelay:0,randomize:!1,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,
pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}};d.fn.flexslider=function(g){void 0===g&&(g={});if("object"===typeof g)return this.each(function(){var a=d(this),e=a.find(g.selector?g.selector:".slides > li");1===e.length&&!0===g.allowOneSlide||0===e.length?
(e.fadeIn(400),g.start&&g.start(a)):void 0===a.data("flexslider")&&new d.flexslider(this,g)});var l=d(this).data("flexslider");switch(g){case "play":l.play();break;case "pause":l.pause();break;case "stop":l.stop();break;case "next":l.flexAnimate(l.getTarget("next"),!0);break;case "prev":case "previous":l.flexAnimate(l.getTarget("prev"),!0);break;default:"number"===typeof g&&l.flexAnimate(g,!0)}}})(jQuery);

 /*
 *  Sharrre.com - Make your sharing widget!
 *  Version: beta 1.3.4
 *  Author: Julien Hany
 *  License: MIT http://en.wikipedia.org/wiki/MIT_License or GPLv2 http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';(6($,g,h,i){l j=\'1Y\',23={3i:\'1Y\',L:{O:C,E:C,z:C,I:C,p:C,K:C,N:C,B:C},2a:0,18:\'\',12:\'\',3:h.3h.1a,x:h.12,1p:\'1Y.3d\',y:{},1q:0,1w:w,3c:w,3b:w,2o:C,1X:6(){},38:6(){},1P:6(){},26:6(){},8:{O:{3:\'\',15:C,1j:\'37\',13:\'35-4Y\',2p:\'\'},E:{3:\'\',15:C,R:\'1L\',11:\'4V\',H:\'\',1A:\'C\',2c:\'C\',2d:\'\',1B:\'\',13:\'4R\'},z:{3:\'\',15:C,y:\'33\',2m:\'\',16:\'\',1I:\'\',13:\'35\'},I:{3:\'\',15:C,Q:\'4K\'},p:{3:\'\',15:C,1j:\'37\'},K:{3:\'\',15:C,11:\'1\'},N:{3:\'\',15:C,22:\'\'},B:{3:\'\',1s:\'\',1C:\'\',11:\'33\'}}},1n={O:"",E:"1D://4J.E.o/4x?q=4u%2X,%4j,%4i,%4h,%4f,%4e,46,%45,%44%42%41%40%2X=%27{3}%27&1y=?",z:"S://3W.3P.z.o/1/3D/y.2G?3={3}&1y=?",I:"S://3l.I.o/2.0/5a.59?54={3}&Q=1c&1y=?",p:\'S://52.p.o/4Q/2G/4B/m?3={3}&1y=?\',K:"",N:"S://1o.N.o/4z/y/L?4r=4o&3={3}&1y=?",B:""},2A={O:6(b){l c=b.4.8.O;$(b.r).X(\'.8\').Z(\'<n G="U 4d"><n G="g-25" m-1j="\'+c.1j+\'" m-1a="\'+(c.3!==\'\'?c.3:b.4.3)+\'" m-2p="\'+c.2p+\'"></n></n>\');g.3Z={13:b.4.8.O.13};l d=0;9(A 2x===\'F\'&&d==0){d=1;(6(){l a=h.1g(\'P\');a.Q=\'x/1c\';a.1r=w;a.17=\'//3w.2w.o/Y/25.Y\';l s=h.1d(\'P\')[0];s.1e.1f(a,s)})()}J{2x.25.3X()}},E:6(c){l e=c.4.8.E;$(c.r).X(\'.8\').Z(\'<n G="U E"><n 2T="1V-47"></n><n G="1V-1L" m-1a="\'+(e.3!==\'\'?e.3:c.4.3)+\'" m-1A="\'+e.1A+\'" m-11="\'+e.11+\'" m-H="\'+e.H+\'" m-3u-2c="\'+e.2c+\'" m-R="\'+e.R+\'" m-2d="\'+e.2d+\'" m-1B="\'+e.1B+\'" m-16="\'+e.16+\'"></n></n>\');l f=0;9(A 1i===\'F\'&&f==0){f=1;(6(d,s,a){l b,2s=d.1d(s)[0];9(d.3x(a)){1v}b=d.1g(s);b.2T=a;b.17=\'//4c.E.4n/\'+e.13+\'/4t.Y#4C=1\';2s.1e.1f(b,2s)}(h,\'P\',\'E-5g\'))}J{1i.3n.3p()}},z:6(b){l c=b.4.8.z;$(b.r).X(\'.8\').Z(\'<n G="U z"><a 1a="1D://z.o/L" G="z-L-U" m-3="\'+(c.3!==\'\'?c.3:b.4.3)+\'" m-y="\'+c.y+\'" m-x="\'+b.4.x+\'" m-16="\'+c.16+\'" m-2m="\'+c.2m+\'" m-1I="\'+c.1I+\'" m-13="\'+c.13+\'">3q</a></n>\');l d=0;9(A 2j===\'F\'&&d==0){d=1;(6(){l a=h.1g(\'P\');a.Q=\'x/1c\';a.1r=w;a.17=\'//1M.z.o/1N.Y\';l s=h.1d(\'P\')[0];s.1e.1f(a,s)})()}J{$.3C({3:\'//1M.z.o/1N.Y\',3E:\'P\',3F:w})}},I:6(a){l b=a.4.8.I;$(a.r).X(\'.8\').Z(\'<n G="U I"><a G="3H \'+b.Q+\'" 3L="3U 3V" 1a="S://I.o/2y?3=\'+V((b.3!==\'\'?b.3:a.4.3))+\'"></a></n>\');l c=0;9(A 43===\'F\'&&c==0){c=1;(6(){l s=h.1g(\'2z\'),24=h.1d(\'2z\')[0];s.Q=\'x/1c\';s.1r=w;s.17=\'//1N.I.o/8.Y\';24.1e.1f(s,24)})()}},p:6(a){9(a.4.8.p.1j==\'4g\'){l b=\'H:2r;\',2e=\'D:2B;H:2r;1B-1j:4y;1t-D:2B;\',2l=\'D:2C;1t-D:2C;2k-50:1H;\'}J{l b=\'H:53;\',2e=\'2g:58;2f:0 1H;D:1u;H:5c;1t-D:1u;\',2l=\'2g:5d;D:1u;1t-D:1u;\'}l c=a.1w(a.4.y.p);9(A c==="F"){c=0}$(a.r).X(\'.8\').Z(\'<n G="U p"><n 1T="\'+b+\'1B:5i 5j,5k,5l-5n;5t:3k;1S:#3m;2D:3o-2E;2g:2F;D:1u;1t-D:3r;2k:0;2f:0;x-3s:0;3t-2b:3v;">\'+\'<n 1T="\'+2e+\'2H-1S:#2I;2k-3y:3z;3A:3B;x-2b:2J;1O:2K 2L #3G;1O-2M:1H;">\'+c+\'</n>\'+\'<n 1T="\'+2l+\'2D:2E;2f:0;x-2b:2J;x-3I:2F;H:2r;2H-1S:#3J;1O:2K 2L #3K;1O-2M:1H;1S:#2I;">\'+\'<2N 17="S://1o.p.o/3M/2N/p.3N.3O" D="10" H="10" 3Q="3R" /> 3S</n></n></n>\');$(a.r).X(\'.p\').3T(\'1P\',6(){a.2O(\'p\')})},K:6(b){l c=b.4.8.K;$(b.r).X(\'.8\').Z(\'<n G="U K"><2P:28 11="\'+c.11+\'" 3h="\'+(c.3!==\'\'?c.3:b.4.3)+\'"></2P:28></n>\');l d=0;9(A 1E===\'F\'&&d==0){d=1;(6(){l a=h.1g(\'P\');a.Q=\'x/1c\';a.1r=w;a.17=\'//1M.K.o/1/1N.Y\';l s=h.1d(\'P\')[0];s.1e.1f(a,s)})();s=g.3Y(6(){9(A 1E!==\'F\'){1E.2Q();21(s)}},20)}J{1E.2Q()}},N:6(b){l c=b.4.8.N;$(b.r).X(\'.8\').Z(\'<n G="U N"><P Q="1Z/L" m-3="\'+(c.3!==\'\'?c.3:b.4.3)+\'" m-22="\'+c.22+\'"></P></n>\');l d=0;9(A g.2R===\'F\'&&d==0){d=1;(6(){l a=h.1g(\'P\');a.Q=\'x/1c\';a.1r=w;a.17=\'//1M.N.o/1Z.Y\';l s=h.1d(\'P\')[0];s.1e.1f(a,s)})()}J{g.2R.1W()}},B:6(b){l c=b.4.8.B;$(b.r).X(\'.8\').Z(\'<n G="U B"><a 1a="S://B.o/1K/2u/U/?3=\'+(c.3!==\'\'?c.3:b.4.3)+\'&1s=\'+c.1s+\'&1C=\'+c.1C+\'" G="1K-3j-U" y-11="\'+c.11+\'">48 49</a></n>\');(6(){l a=h.1g(\'P\');a.Q=\'x/1c\';a.1r=w;a.17=\'//4a.B.o/Y/4b.Y\';l s=h.1d(\'P\')[0];s.1e.1f(a,s)})()}},2S={O:6(){},E:6(){1V=g.2v(6(){9(A 1i!==\'F\'){1i.2t.2q(\'2U.2u\',6(a){1m.1l([\'1k\',\'E\',\'1L\',a])});1i.2t.2q(\'2U.4k\',6(a){1m.1l([\'1k\',\'E\',\'4l\',a])});1i.2t.2q(\'4m.1A\',6(a){1m.1l([\'1k\',\'E\',\'1A\',a])});21(1V)}},2V)},z:6(){2W=g.2v(6(){9(A 2j!==\'F\'){2j.4p.4q(\'1J\',6(a){9(a){1m.1l([\'1k\',\'z\',\'1J\'])}});21(2W)}},2V)},I:6(){},p:6(){},K:6(){},N:6(){6 4s(){1m.1l([\'1k\',\'N\',\'L\'])}},B:6(){}},2Y={O:6(a){g.19("1D://4v.2w.o/L?4w="+a.8.O.13+"&3="+V((a.8.O.3!==\'\'?a.8.O.3:a.3)),"","1b=0, 1G=0, H=2Z, D=20")},E:6(a){g.19("S://1o.E.o/30/30.3d?u="+V((a.8.E.3!==\'\'?a.8.E.3:a.3))+"&t="+a.x+"","","1b=0, 1G=0, H=2Z, D=20")},z:6(a){g.19("1D://z.o/4A/1J?x="+V(a.x)+"&3="+V((a.8.z.3!==\'\'?a.8.z.3:a.3))+(a.8.z.16!==\'\'?\'&16=\'+a.8.z.16:\'\'),"","1b=0, 1G=0, H=31, D=32")},I:6(a){g.19("S://I.o/4D/4E/2y?3="+V((a.8.I.3!==\'\'?a.8.I.3:a.3))+"&12="+a.x+"&1I=w&1T=w","","1b=0, 1G=0, H=31, D=32")},p:6(a){g.19(\'S://1o.p.o/4F?v=5&4G&4H=4I&3=\'+V((a.8.p.3!==\'\'?a.8.p.3:a.3))+\'&12=\'+a.x,\'p\',\'1b=1F,H=1h,D=1h\')},K:6(a){g.19(\'S://1o.K.o/28/?3=\'+V((a.8.p.3!==\'\'?a.8.p.3:a.3)),\'K\',\'1b=1F,H=1h,D=1h\')},N:6(a){g.19(\'1D://1o.N.o/4L/L?3=\'+V((a.8.p.3!==\'\'?a.8.p.3:a.3))+\'&4M=&4N=w\',\'N\',\'1b=1F,H=1h,D=1h\')},B:6(a){g.19(\'S://B.o/1K/2u/U/?3=\'+V((a.8.B.3!==\'\'?a.8.B.3:a.3))+\'&1s=\'+V(a.8.B.1s)+\'&1C=\'+a.8.B.1C,\'B\',\'1b=1F,H=4O,D=4P\')}};6 T(a,b){7.r=a;7.4=$.4S(w,{},23,b);7.4.L=b.L;7.4T=23;7.4U=j;7.1W()};T.W.1W=6(){l c=7;9(7.4.1p!==\'\'){1n.O=7.4.1p+\'?3={3}&Q=O\';1n.K=7.4.1p+\'?3={3}&Q=K\';1n.B=7.4.1p+\'?3={3}&Q=B\'}$(7.r).4W(7.4.3i);9(A $(7.r).m(\'12\')!==\'F\'){7.4.12=$(7.r).4X(\'m-12\')}9(A $(7.r).m(\'3\')!==\'F\'){7.4.3=$(7.r).m(\'3\')}9(A $(7.r).m(\'x\')!==\'F\'){7.4.x=$(7.r).m(\'x\')}$.1z(7.4.L,6(a,b){9(b===w){c.4.2a++}});9(c.4.3b===w){$.1z(7.4.L,6(a,b){9(b===w){4Z{c.34(a)}51(e){}}})}J 9(c.4.18!==\'\'){7.4.26(7,7.4)}J{7.2n()}$(7.r).1X(6(){9($(7).X(\'.8\').36===0&&c.4.3c===w){c.2n()}c.4.1X(c,c.4)},6(){c.4.38(c,c.4)});$(7.r).1P(6(){c.4.1P(c,c.4);1v C})};T.W.2n=6(){l c=7;$(7.r).Z(\'<n G="8"></n>\');$.1z(c.4.L,6(a,b){9(b==w){2A[a](c);9(c.4.2o===w){2S[a]()}}})};T.W.34=6(c){l d=7,y=0,3=1n[c].1x(\'{3}\',V(7.4.3));9(7.4.8[c].15===w&&7.4.8[c].3!==\'\'){3=1n[c].1x(\'{3}\',7.4.8[c].3)}9(3!=\'\'&&d.4.1p!==\'\'){$.55(3,6(a){9(A a.y!=="F"){l b=a.y+\'\';b=b.1x(\'\\56\\57\',\'\');y+=1Q(b,10)}J 9(a.m&&a.m.36>0&&A a.m[0].39!=="F"){y+=1Q(a.m[0].39,10)}J 9(A a.3a!=="F"){y+=1Q(a.3a,10)}J 9(A a[0]!=="F"){y+=1Q(a[0].5b,10)}J 9(A a[0]!=="F"){}d.4.y[c]=y;d.4.1q+=y;d.2i();d.1R()}).5e(6(){d.4.y[c]=0;d.1R()})}J{d.2i();d.4.y[c]=0;d.1R()}};T.W.1R=6(){l a=0;5f(e 1Z 7.4.y){a++}9(a===7.4.2a){7.4.26(7,7.4)}};T.W.2i=6(){l a=7.4.1q,18=7.4.18;9(7.4.1w===w){a=7.1w(a)}9(18!==\'\'){18=18.1x(\'{1q}\',a);$(7.r).1U(18)}J{$(7.r).1U(\'<n G="5h"><a G="y" 1a="#">\'+a+\'</a>\'+(7.4.12!==\'\'?\'<a G="L" 1a="#">\'+7.4.12+\'</a>\':\'\')+\'</n>\')}};T.W.1w=6(a){9(a>=3e){a=(a/3e).3f(2)+"M"}J 9(a>=3g){a=(a/3g).3f(1)+"k"}1v a};T.W.2O=6(a){2Y[a](7.4);9(7.4.2o===w){l b={O:{14:\'5m\',R:\'+1\'},E:{14:\'E\',R:\'1L\'},z:{14:\'z\',R:\'1J\'},I:{14:\'I\',R:\'29\'},p:{14:\'p\',R:\'29\'},K:{14:\'K\',R:\'29\'},N:{14:\'N\',R:\'L\'},B:{14:\'B\',R:\'1K\'}};1m.1l([\'1k\',b[a].14,b[a].R])}};T.W.5o=6(){l a=$(7.r).1U();$(7.r).1U(a.1x(7.4.1q,7.4.1q+1))};T.W.5p=6(a,b){9(a!==\'\'){7.4.3=a}9(b!==\'\'){7.4.x=b}};$.5q[j]=6(b){l c=5r;9(b===i||A b===\'5s\'){1v 7.1z(6(){9(!$.m(7,\'2h\'+j)){$.m(7,\'2h\'+j,5u T(7,b))}})}J 9(A b===\'5v\'&&b[0]!==\'5w\'&&b!==\'1W\'){1v 7.1z(6(){l a=$.m(7,\'2h\'+j);9(a 5x T&&A a[b]===\'6\'){a[b].5y(a,5z.W.5A.5B(c,1))}})}}})(5C,5D,5E);',62,351,'|||url|options||function|this|buttons|if||||||||||||var|data|div|com|delicious||element|||||true|text|count|twitter|typeof|pinterest|false|height|facebook|undefined|class|width|digg|else|stumbleupon|share||linkedin|googlePlus|script|type|action|http|Plugin|button|encodeURIComponent|prototype|find|js|append||layout|title|lang|site|urlCount|via|src|template|open|href|toolbar|javascript|getElementsByTagName|parentNode|insertBefore|createElement|550|FB|size|_trackSocial|push|_gaq|urlJson|www|urlCurl|total|async|media|line|20px|return|shorterTotal|replace|callback|each|send|font|description|https|STMBLPN|no|status|3px|related|tweet|pin|like|platform|widgets|border|click|parseInt|rendererPerso|color|style|html|fb|init|hover|sharrre|in|500|clearInterval|counter|defaults|s1|plusone|render||badge|add|shareTotal|align|faces|colorscheme|cssCount|padding|float|plugin_|renderer|twttr|margin|cssShare|hashtags|loadButtons|enableTracking|annotation|subscribe|50px|fjs|Event|create|setInterval|google|gapi|submit|SCRIPT|loadButton|35px|18px|display|block|none|json|background|fff|center|1px|solid|radius|img|openPopup|su|processWidgets|IN|tracking|id|edge|1000|tw|20url|popup|900|sharer|650|360|horizontal|getSocialJson|en|length|medium|hide|total_count|shares|enableCounter|enableHover|php|1e6|toFixed|1e3|location|className|it|pointer|services|666666|XFBML|inline|parse|Tweet|normal|indent|vertical|show|baseline|apis|getElementById|bottom|5px|overflow|hidden|ajax|urls|dataType|cache|ccc|DiggThisButton|decoration|7EACEE|40679C|rel|static|small|gif|api|alt|Delicious|Add|on|nofollow|external|cdn|go|setTimeout|___gcfg|20WHERE|20link_stat|20FROM|__DBW|20click_count|20comments_fbid|commentsbox_count|root|Pin|It|assets|pinit|connect|googleplus|20total_count|20comment_count|tall|20like_count|20share_count|20normalized_url|remove|unlike|message|net|jsonp|events|bind|format|LinkedInShare|all|SELECT|plus|hl|fql|15px|countserv|intent|urlinfo|xfbml|tools|diggthis|save|noui|jump|close|graph|DiggCompact|cws|token|isFramed|700|300|v2|en_US|extend|_defaults|_name|button_count|addClass|attr|US|try|top|catch|feeds|93px|links|getJSON|u00c2|u00a0|right|getInfo|story|total_posts|26px|left|error|for|jssdk|box|12px|Arial|Helvetica|sans|Google|serif|simulateClick|update|fn|arguments|object|cursor|new|string|_|instanceof|apply|Array|slice|call|jQuery|window|document'.split('|'),0,{}))

;(function($) {

    $.fn.extend({
        becenter: function(options,arg) {
            if (options && typeof(options) == 'object') {
                options = $.extend( {}, $.becenter.defaults, options );
            }
            this.each(function() {
                new $.becenter(this, options, arg );
            });
            return;
        }
    });

    $.becenter = function( elem, options, arg ) {

        if (options && typeof(options) == 'string') {
           if (options == 'boundaries') {
               initbe( arg );
           }
           return;
        }

        function initbe(arg)
        {
        	var headerOffset;
        	var footerOffset;
        	
        	var topel = jQuery(arg[0]);
        	var bottomel = jQuery(arg[1]);
        	var el = jQuery(elem);
        	var mobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) ? true : false;
    
        	function centerelement() {
        		if (jQuery('body.left-menu').length && !mobile && jQuery(window).width() > 767) {
	        		el.css('top','50%');
	        		el.css('margin-left',topel.width() / 2+'px');
	        		
        		} else {
		        	if (topel.offset().top + topel.height() - jQuery(window).scrollTop() > 0 && topel.css('opacity') != 0) headerOffset = topel.offset().top + topel.height() - jQuery(window).scrollTop();
					else  headerOffset = 0;
					if (((jQuery(window).height() + jQuery(window).scrollTop()) - bottomel.offset().top) > 0 && bottomel.css('opacity') != 0) footerOffset = (jQuery(window).height() + jQuery(window).scrollTop()) - bottomel.offset().top;
					else footerOffset = 0;
					
					offsetScroll = (headerOffset + (jQuery(window).height() - headerOffset - footerOffset) / 2);
					
					if ($('.fr-window-fresco').css('display') != 'none' && mobile) el.css('top','50%');
					else el.css('top',offsetScroll+'px');
				}
        	}
			
			$(window).resize(function() {
				centerelement();
			});
		
			centerelement();
        }
    };

    $.becenter.defaults = {
	    
    };

})(jQuery);

/*global Element */
(function(window, document) {
	'use strict';

	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element, // IE6 throws without typeof check

		fn = (function() {
			var val, valLength;
			var fnMap = [
				[
					'requestFullscreen',
					'exitFullscreen',
					'fullscreenElement',
					'fullscreenEnabled',
					'fullscreenchange',
					'fullscreenerror'
				],
				// new WebKit
				[
					'webkitRequestFullscreen',
					'webkitExitFullscreen',
					'webkitFullscreenElement',
					'webkitFullscreenEnabled',
					'webkitfullscreenchange',
					'webkitfullscreenerror'

				],
				// old WebKit (Safari 5.1)
				[
					'webkitRequestFullScreen',
					'webkitCancelFullScreen',
					'webkitCurrentFullScreenElement',
					'webkitCancelFullScreen',
					'webkitfullscreenchange',
					'webkitfullscreenerror'

				],
				[
					'mozRequestFullScreen',
					'mozCancelFullScreen',
					'mozFullScreenElement',
					'mozFullScreenEnabled',
					'mozfullscreenchange',
					'mozfullscreenerror'
				]
			];
			var i = 0;
			var l = fnMap.length;
			var ret = {};

			for (; i < l; i++) {
				val = fnMap[i];
				if (val && val[1] in document) {
					for (i = 0, valLength = val.length; i < valLength; i++) {
						ret[fnMap[0][i]] = val[i];
					}
					return ret;
				}
			}
			return false;
		})(),

		screenfull = {
			request: function(elem) {
				var request = fn.requestFullscreen;

				elem = elem || document.documentElement;

				// Work around Safari 5.1 bug: reports support for
				// keyboard in fullscreen even though it doesn't.
				// Browser sniffing, since the alternative with
				// setTimeout is even worse
				if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
					elem[request]();
				} else {
					elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
				}
			},
			exit: function() {
				document[fn.exitFullscreen]();
			},
			toggle: function( elem ) {
				if (this.isFullscreen) {
					this.exit();
				} else {
					this.request(elem);
				}
			},
			onchange: function() {},
			onerror: function() {}
		};

	if (!fn) {
		return window.screenfull = false;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function() {
				return !!document[fn.fullscreenElement];
			}
		},
		element: {
			enumerable: true,
			get: function() {
				return document[fn.fullscreenElement];
			}
		},
		enabled: {
			enumerable: true,
			get: function() {
				// Coerce to boolean in case of old WebKit
				return !!document[fn.fullscreenEnabled];
			}
		}
	});

	document.addEventListener(fn.fullscreenchange, function(e) {
		screenfull.onchange.call(screenfull, e);
	});

	document.addEventListener(fn.fullscreenerror, function(e) {
		screenfull.onerror.call(screenfull, e);
	});

	window.screenfull = screenfull;

})(window, document);