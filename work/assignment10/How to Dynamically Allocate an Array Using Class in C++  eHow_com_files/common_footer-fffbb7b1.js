(function(){var a=false,b=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.Class=function(){};Class.extend=function(g){var f=this.prototype;a=true;var e=new this();a=false;for(var d in g){e[d]=typeof g[d]=="function"&&typeof f[d]=="function"&&b.test(g[d])?(function(h,i){return function(){var k=this._super;this._super=f[h];var j=i.apply(this,arguments);this._super=k;return j}})(d,g[d]):g[d]}function c(){if(!a&&this.init){this.init.apply(this,arguments)}}c.prototype=e;c.constructor=c;c.extend=arguments.callee;return c}})();
/*
  * Fidel - A javascript controller
  * v1.2.2
  * https://github.com/jgallen23/fidel
  * copyright JGA 2011
  * MIT License
  */
!function(b){var a={};a.guid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(f){var e=Math.random()*16|0,d=f==="x"?e:(e&3|8);return d.toString(16)}).toUpperCase()};a.extend=function(){throw new Error("Fidel.extend is deprecated, please use Fidel.ViewController.extend")};var c=b.Fidel;a.noConflict=function(){b.Fidel=c;return this};b.Fidel=a}(this);!function(c){var a=false,b=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;c.Class=function(){};c.Class.extend=function(h){var g=this.prototype;a=true;var f=new this();a=false;for(var e in h){f[e]=typeof h[e]=="function"&&typeof g[e]=="function"&&b.test(h[e])?(function(i,j){return function(){var l=this._super;this._super=g[i];var k=j.apply(this,arguments);this._super=l;return k}})(e,h[e]):h[e]}function d(k){if(!a){this.guid=c.guid();if(this.defaults){for(var j in this.defaults){if(typeof k!=="object"||!k[j]){this[j]=this.defaults[j]}}}if(typeof k==="object"){for(var i in k){this[i]=k[i]}}if(this._initialize){this._initialize.apply(this,arguments)}if(this.init){this.init.apply(this,arguments)}}}d.prototype=f;d.prototype.proxy=function(j){var i=this;return(function(){if(!j){return}return j.apply(i,arguments)})};d.constructor=d;d.extend=arguments.callee;return d}}(Fidel||this);!function(b){var a={};b.publish=function(e,d){var f=a[e],c=f?f.length:0;while(c--){f[c].apply(this,d||[])}};b.subscribe=function(c,d){if(!a[c]){a[c]=[]}a[c].push(d);return[c,d]};b.unsubscribe=function(e){var d=a[e[0]],f=e[1],c=d?d.length:0;while(c--){if(d[c]===f){d.splice(c,1)}}};b.Class.prototype.on=b.Class.prototype.bind=function(c,d){return b.subscribe(this.guid+"."+c,this.proxy(d))};b.Class.prototype.emit=b.Class.prototype.trigger=function(c,d){b.publish(this.guid+"."+c,d);b.publish(c,d)};b.Class.prototype.removeListener=b.Class.prototype.unbind=function(c){b.unsubscribe(c)}}(Fidel||this);(function(c){var b=/^(\w+)\s*(.*)$/;var a=c.Class.extend({_initialize:function(d){if(!this.el){throw"el is required"}this._subscribeHandles={};this._processedActions={};if(this.events){this.delegateEvents()}if(this.elements){this.refreshElements()}if(this.templateSelector){this.loadTemplate()}if(!this.actionEvent){this.actionEvent="click"}if(this.subscribe){this.bindSubscriptions()}this.delegateActions();this.getDataElements()},delegateEvents:function(){for(var h in this.events){var f=this.events[h];var g=h.match(b);var e=g[1],d=g[2];var i=this.proxy(this[f]);if(d===""){this.el.bind(e,i)}else{this.el.delegate(d,e,i)}}},delegateActions:function(){var j=this.find("[data-action]");for(var g=0,l=j.length;g<l;g++){var h=$(j[g]);var f=h.attr("data-action");var k=this.proxy(this[f]);var e=this.actionEvent,d='[data-action="'+f+'"]';if(!this._processedActions[f]){this.el.delegate(d,e,k);this._processedActions[f]=true}}},refreshElements:function(){for(var d in this.elements){this[d]=this.find(this.elements[d])}},getDataElements:function(){var d=this;var h=this.find("[data-element]");for(var f=0,j=h.length;f<j;f++){var e=h[f].getAttribute("data-element");if(!d[e]){var g=this.find('[data-element="'+e+'"]');d[e]=g}}},bindSubscriptions:function(){for(var d in this.subscribe){this._subscribeHandles[d]=Fidel.subscribe(d,this.proxy(this[this.subscribe[d]]))}},loadTemplate:function(){this.template=$(this.templateSelector).html()},find:function(d){return $(d,this.el[0])},render:function(f,d){var g=window.str||$;if(g){var e=g.template(this.template,f);d=(d)?$(d):this.el;d.html(e)}},destroy:function(){for(var d in this._subscribeHandles){Fidel.unsubscribe(this._subscribeHandles[d])}for(var e in this._processedActions){this.el.unbind(e)}this.el=null}});c.ViewController=a})(Fidel||this);jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});dmjs.ModalClass=Class.extend({defaults:{selector:"",imageReg:/\.(jpe?g|png|gif|bmp)/gi,clickCallback:function(){}},init:function(b){var a=this;this.options=$.extend({},this.defaults,b);if(this.options.selector.length>0){$(this.options.selector).each(function(){var c=$(this).attr("data-modal-trigger");if(typeof c!=="undefined"){$this=$(this);var d={modalClass:$this.data("modal-class")||"",modalUrl:$this.attr("href")||$this.attr("data-href")||"",modalContent:$this.data("modal-content")||"",modalShowCloseButton:$this.data("modal-close")||"true",modalInline:$(this).data("modal-inline")||"",modalScroll:$(this).data("modal-scroll")||"no",disableOverlayClose:$(this).data("modal-disable-overlay-close")||false};$(c).click(function(){a.showModal(d)})}else{$(this).click(function(g){g.preventDefault();$this=$(this);var f={modalClass:$this.data("modal-class")||"",modalUrl:$this.attr("href")||$this.attr("data-href")||"",modalContent:$this.data("modal-content")||"",modalShowCloseButton:$this.data("modal-close")||"true",modalInline:$(this).data("modal-inline")||"",modalScroll:$(this).data("modal-scroll")||"no",disableOverlayClose:$(this).data("modal-disable-overlay-close")||false};a.showModal(f)})}})}},showModal:function(e){var l=this;this.removeModal();var g=$("body");var j=$("<div/>").addClass("Modal");var a=$("<div/>").addClass("ModalOverlay").appendTo(j);var f=$("<div/>").addClass("ModalContainer").addClass(e.modalClass).appendTo(j);var b=$("<div/>").addClass("contents").appendTo(f);g.addClass("ModalOpen");if(e.modalUrl.length>0){if(e.modalUrl.match(this.options.imageReg)){var c=new Image();c.src=e.modalUrl;var k=$("<div/>").addClass("ModalImage").appendTo(b);f.css({display:"block",width:c.width});$(c).appendTo(k);f.css({width:622,display:"block",left:"50%",marginLeft:"-"+622/2+"px"})}else{this.iframe=$("<iframe/>").attr({height:"300",width:"100%",scrolling:e.modalScroll,frameborder:"0",src:e.modalUrl}).css("border","0");f.css({width:460+22});var i=$("<div/>").addClass("ModalFrame").appendTo(b);$(this.iframe).appendTo(i)}}else{if(e.modalInline!==""){$(b).append($(e.modalInline).html())}}if(e.modalContent.length>0){var h=$("<div/>").addClass("ModalContent Note").html(e.modalContent).appendTo(b)}if(e.modalShowCloseButton=="true"){var d=$("<a/>").addClass("ModalClose").html("<span class='text'>X</span>").prependTo(f);d.one("click",function(){l.removeModal(true)})}a.css("opacity",0);f.css("opacity",0);a.css("opacity",0.85);f.css("opacity",1);this.modalOverlay=a;this.modalContainer=f;j.prependTo(g);if(!e.disableOverlayClose){a.click(function(){l.removeModal()})}this.options.clickCallback()},removeModal:function(a){if(a){this.modalContainer.animate({opacity:0},250);this.modalOverlay.animate({opacity:0},500,function(){$(".Modal").remove();$("body").removeClass("ModalOpen")})}else{$(".Modal").remove();$("body").removeClass("ModalOpen")}$("body").trigger("modal.close")},resize:function(b,a){this.iframe.animate({width:b+22,height:a+22},500)}});dmjs.NavigationClass=Class.extend({init:function(c,b){var a=this;a._nav=c;if(b==null){b=".body"}$("ul li",c).hover(function(){$(b,this).parent().addClass("huvr");$(b,this).css("display","block");$(b,this).parent().prev().css("border-color","transparent")},function(){$(b,this).parent().removeClass("huvr");$(b,this).css("display","none");$(b,this).parent().prev().css("border-color","")})}});dmjs.TooltipClass=Class.extend({defaults:{selector:"a[data-tooltip]"},init:function(b){var a=this;this.options=$.extend({},this.defaults,b);this.windowWidth=$("html").width();this.bodyWidth=$("body").width();this.el=$(this.options.selector);this.el.live("mouseenter.tooltip",function(){a.show(this)});this.el.live("mouseleave.tooltip",function(){a.hide(this)})},show:function(b){var b=$(b),a=this;this.tooltipElement=$("<div></div>").addClass("TooltipContainer").html(b.data("tooltip")).appendTo("body").show();$("body").bind("mousemove.tooltip",function(c){a.updatePosition(c)})},hide:function(a){$("body").unbind("mousemove.tooltip");$(".TooltipContainer").remove()},updatePosition:function(a){this.tooltipElement.css({left:a.pageX-(this.windowWidth-this.bodyWidth)/2-18,top:a.pageY-45})}});$.fn.linky=function(){return this.each(function(){var a=$(this);a.attr("href",a.attr("data-url"))})};$("[data-copy]").each(function(a){var b=$(this).attr("data-copy");$(this).html(b)});(function(){var a=[];dmjs.addLoadEvent=function(d,c){if(typeof c=="function"){var b=c;c=arguments[2]}if(c==undefined){c=3}a.push({fn:d,priority:c,cb:b})};dmjs.fireEvents=function(){dmjs.sortQueue();for(var b=0;b<a.length;b++){if(typeof a[b].fn=="string"){$.ajax({url:a[b].fn,dataType:"script",success:a[b].cb,error:function(c){return false}})}else{a[b].fn()}}};dmjs.sortQueue=function(){a.sort(function(d,c){return d.priority-c.priority})}})();$.fn.lazyImage=function(a){var b={errorImg:dmjs.errImg,callback:false};if(a){$.extend(b,a)}return this.each(function(){var c=this;$("<img />").bind("load",function(){$(c).attr("src",$(c).attr("data-img"));if(b.callback){b.callback.call(c)}}).bind("error",function(){if(b.errorImg){$(c).attr("src",b.errorImg)}}).attr("src",$(c).attr("data-img"))})};var onFBInit=[];var response=null;window.fbAsyncInit=function(){if(typeof FB!="undefined"){FB.init({appId:dmjs.global.facebook.app_id,status:true,cookie:true,xfbml:true,oauth:true,channelUrl:(window.location.protocol+"//"+window.location.host+"/xd_receiver.htm")});FB.XFBML.parse();for(var b=0,d=dmjs.onFBInit.length;b<d;b++){dmjs.onFBInit[b]()}$(".facebookLike").css("background","transparent");if(dmjs.maintenance.facebook_login){FB.getLoginStatus(function(c){if(c.authResponse){a()}else{a(true)}});function a(e,c){if(e){return}FB.api("/me",function(f){if(c){$.post(dmjs.global.facebook.login_service,{uid:f.id,email:f.email})}$("#FBLogout").one("click",function(){FB.logout(function(g){a(true)})});$("#FacebookFacepile").appendTo("#FacebookLogin");$("#FacebookLogin").hover(function(){$("#FacebookFacepile").show()},function(){$("#FacebookFacepile").hide()})})}FB.Event.subscribe("auth.sessionChange",function(c){if(c.authResponse){a()}})}}};dmjs.addLoadEvent(document.location.protocol+"//connect.facebook.net/en_US/all.js",4);dmjs.addLoadEvent("http://platform.twitter.com/widgets.js",5);dmjs.addLoadEvent("https://apis.google.com/js/plusone.js?onload=gpoLoaded",6);function plusone_vote(a){_gaq.push(["_trackEvent","plusone",a.state])}if(dmjs.maintenance.demdex){dmjs.addLoadEvent(function(){if(typeof Tim!=="undefined"){Tim.Provider("chango").execute();Tim.Provider("simplifi").execute()}},20)}dmjs.errImg=dmjs.setting.cdn.cdnImage+"/ui/images/modules/loading/no-image.gif";ehow.Navigation=new dmjs.NavigationClass("#primaryNav");ehow.secondaryNav=new dmjs.NavigationClass("#secondaryNav");ehow.tooltips=new dmjs.TooltipClass();$("a[data-url], area[data-url]").linky();var tyntVariables={ap:"Read more: "};dmjs.addLoadEvent("http://tcr.tynt.com/javascripts/Tracer.js?user=bpZvKQBBer360wadbi-bnq&amp;st=1",6);$("#verisignSeal").live("contextmenu",function(){alert("The VeriSign Seal is a trademark of VeriSign, Inc. and its subsidiaries. Unauthorized copying is prohibited.");return false});ehow.Modal=new dmjs.ModalClass({selector:"a[data-type=modal]"});dmjs.addLoadEvent(function(){$(".ArticlePreview img").lazyImage();$(".ContentPreview img").lazyImage();$(".Newsletter").addClass("NewsletterLoaded");$("#verisignSeal").find("img").lazyImage();$("#comscoreBrick").lazyImage();$("#Comments").find(".comment img").lazyImage()},0);dmjs.onFBInit.push(function(){dmjs.fbLikeJumpFix()});if(dmjs.global.skin!=="corporate"&&dmjs.global.skin!=="mom"){dmjs.addLoadEvent(function(){if(!dmjs.hasTakeoverSkin){$("html").css({"background-image":"url("+dmjs.setting.cdn.cdnImage+"/ui/images/skins/background/"+dmjs.global.skin+".jpg)","background-repeat":"no-repeat","background-position":"center top"})}},-5)}if($(document).scrollTop()<70){$("#searchHeader input:text[data-type=searchinput]")[0].focus()}$("#searchHeader").bind("submit",function(){if($("input",this).val()===""){return false}});