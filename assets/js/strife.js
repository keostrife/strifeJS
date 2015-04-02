(function(){
	//=========sX===========
	function _sX(selector) {
		return _sX.getEl(selector);
	}
	_sX.getEl = function(selector){
		if(selector instanceof HTMLElement || selector.isNodeList) return selector;
		if(typeof selector == "string" && selector != "")
			if(selector.indexOf(" ") < 0 && selector.indexOf(":") < 0) {
				if(selector[0] == ".") {
					var els = document.getElementsByClassName(selector.substring(1));
					return (els.length > 1)?els:els[0];
				} else if(selector[0] == "#") {
					return document.getElementById(selector.substring(1));
				} else {
					return document.getElementsByTagName(selector);
				}
			} else {
				els = document.querySelectorAll(selector);
				return (els.length == 1)?els[0]:els;
			}
		return false;
	}
	_sX.createEl = function(string){
		try {
			var parcer = new DOMParser();
			var el = parcer.parseFromString(string, "text/xml");
			return el.firstChild;
		} catch(error){
			return false;
		}
	}
	_sX.move = function(selector){
		return {
			els: _sX(selector),
			before: function(selector){
				try {
					var destinationEls = _sX(selector),
						originalEls = this.els;
					destinationEls = destinationEls.length?Array.prototype.slice.call(destinationEls):[destinationEls];
					originalEls = originalEls.length?Array.prototype.slice.call(originalEls):[originalEls];
					for(var i = 0, iLen = destinationEls.length; i<iLen; i++) {
						var destinationEl = destinationEls[i];
						for(var t = 0, tLen = originalEls.length; t<tLen; t++) {
							var originalEl = originalEls[t];
							if (!originalEl.isSameNode(destinationEl))
								destinationEl.parentNode.insertBefore(originalEl.cloneNode(), destinationEl);
						}
					}
					for(var i = 0, iLen = originalEls.length; i<iLen; i++) {
						var originalEl = originalEls[i];
						originalEl.parentNode.removeChild(originalEl);
					}
				} catch(error){
					return false;
				}
				return this;
			},
			after: function(selector) {
				try {
					var destinationEls = _sX(selector),
						originalEls = this.els;
					destinationEls = destinationEls.length?Array.prototype.slice.call(destinationEls):[destinationEls];
					originalEls = originalEls.length?Array.prototype.slice.call(originalEls):[originalEls];
					for(var i = 0, iLen = destinationEls.length; i<iLen; i++) {
						var destinationEl = destinationEls[i];
						var previousEl;
						for(var t = 0, tLen = originalEls.length; t<tLen; t++) {
							var originalEl = originalEls[t];
							if (!originalEl.isSameNode(destinationEl)) {
								if(!previousEl){
									var currentEl = originalEl.cloneNode();
									destinationEl.parentNode.insertBefore(currentEl, destinationEl.nextSibling);
									previousEl = currentEl;
								} else {
									var currentEl = originalEl.cloneNode();
									destinationEl.parentNode.insertBefore(currentEl, previousEl.nextSibling);
									previousEl = currentEl;
								}
							}
						}
					}
					for(var i = 0, iLen = originalEls.length; i<iLen; i++) {
						var originalEl = originalEls[i];
						originalEl.parentNode.removeChild(originalEl);
					}
				} catch(error){
					return false;
				}
				return this;
			},
			toTop: function(){
				try {
					var originalEls = this.els;
					originalEls = originalEls.length?Array.prototype.slice.call(originalEls):[originalEls];
					for(var i = 0, iLen = originalEls.length; i<iLen; i++) {
						var originalEl = originalEls[iLen-i-1];
						var destinationEl = originalEl.parentNode.firstChild;
						if(destinationEl && !destinationEl.isSameNode(originalEl)) 
							destinationEl.parentNode.insertBefore(originalEl, destinationEl);
					}
				} catch(error){
					return false;
				}
				return this;
			},
			toBottom: function(){
				try {
					var originalEls = this.els;
					originalEls = originalEls.length?Array.prototype.slice.call(originalEls):[originalEls];
					for(var i = 0, iLen = originalEls.length; i<iLen; i++) {
						var originalEl = originalEls[i];
						var destinationEl = originalEl.parentNode.lastChild;
						if(destinationEl && !destinationEl.isSameNode(originalEl)) 
							destinationEl.parentNode.insertBefore(originalEl, destinationEl.nextSibling);
					}
				} catch(error){
					return false;
				}
				return this;
			},
			toTopOf: function(selector){
				try {
					var containerEls = _sX(selector);
					var originalEls = this.els;
					originalEls = originalEls.length?Array.prototype.slice.call(originalEls):[originalEls];
					containerEls = containerEls.length?Array.prototype.slice.call(containerEls):[containerEls];
					for(var i = 0, iLen = containerEls.length; i<iLen; i++) {
						var containerEl = containerEls[i];
						var destinationEl = containerEl.firstChild;
						for(var t = 0, tLen = originalEls.length; t<tLen; t++) {
							var originalEl = originalEls[t];
							if(destinationEl && !destinationEl.isSameNode(originalEl)) 
								destinationEl.parentNode.insertBefore(originalEl.cloneNode(), destinationEl);
							else 
								containerEl.appendChild(originalEl.cloneNode());
						}
					}
					for(var i = 0, iLen = originalEls.length; i<iLen; i++) {
						var originalEl = originalEls[i];
						originalEl.parentNode.removeChild(originalEl);
					}
				} catch(error){
					return false;
				}
				
				return this;
			},
			toBottomOf: function(selector){
				try {
					var containerEls = _sX(selector);
					var originalEls = this.els;
					originalEls = originalEls.length?Array.prototype.slice.call(originalEls):[originalEls];
					containerEls = containerEls.length?Array.prototype.slice.call(containerEls):[containerEls];
					for(var i = 0, iLen = containerEls.length; i<iLen; i++) {
						var containerEl = containerEls[i];
						for(var t = 0, tLen = originalEls.length; t<tLen; t++) {
							var originalEl = originalEls[t];
							containerEl.appendChild(originalEl.cloneNode());
						}
					}
					for(var i = 0, iLen = originalEls.length; i<iLen; i++) {
						var originalEl = originalEls[i];
						originalEl.parentNode.removeChild(originalEl);
					}
				} catch(error){
					return false;
				}
				return this;
			},
			into: function(selector){
				return this.toBottomOf(selector);
			}
		}
	}
	_sX.ajax = function(url, options) {
		if(!url) return;
		options = options || {};
		options.method = options.method || "GET";
		options.async = options.async || true;
		options.data = options.data || {};
		var xhr = new XMLHttpRequest();
		var query = [];
		for(var key in options.data) {
			query.push(encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]));
		}
		if (options.method == 'POST') {
			xhr.open('POST', url, options.async);
	        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	        options.data = query.join("&");
	    } else {
	    	if(query.length)
	    		url=url+"?"+query.join('&');
	    	xhr.open(options.method, url, options.async);
	    	options.data = null;
	    }
    	xhr.onreadystatechange = function(){
    		if (xhr.readyState == 4 && xhr.status==200 && options.callback && options.async) {
                options.callback(xhr.responseText);
            } else {
            	options.error({
            		readyState: xhr.readyState,
            		status: xhr.status
            	});
            }
    	}
    	xhr.send(options.data);
    	if(!options.async && options.callback && xhr.readyState == 4 && xhr.status==200) {
    		options.callback(xhr.responseText);
    	} else {
    		options.error({
        		readyState: xhr.readyState,
        		status: xhr.status
        	});
    	}
	}
	_sX.animationFrame = function(functionName){
		if ( !window.requestAnimationFrame ) {
			window.requestAnimationFrame = ( function() {
				return window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function(callback, element ) {
					window.setTimeout( callback, 1000 / 60 );
				};
			})();
		}
		function animate() {
			requestAnimationFrame(animate);
			functionName();
		}
		animate();
	}
	_sX.nl2br = function(text){
		var newText = text.replace('\r\n','<br />',"g");
		newText = newText.replace('\r','<br />',"g");
		newText = newText.replace('\n','<br />',"g");
		return newText;
	}
	_sX.createCookie = function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
	_sX.eraseCookie = function(name) {
		createCookie(name,"",-1);
	}
	_sX.readCookie = function(name){
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	_sX.animate = function(selector){
		function handleProperties(property, propertyValue, addPX) {
			if(!propertyValue) return this;
			if(!isNaN(propertyValue))
				propertyValue += ((addPX)?"px":"");
			this.properties[property] = propertyValue;
		}
		return {
			els: _sX(selector),
			properties: {},
			animationDuration: 800,
			animationEasing: "linear",
			duration: function(newDuration){
				if(!newDuration) return this;
				this.animationDuration = newDuration;
				return this;
			},
			ease: function(easing){
				if(!easing) return this;
				this.animationEasing = easing;
				return this;
			},
			custom: function(cssRule, cssValue){
				if(!cssRule || !cssValue) return this;
				this.properties[cssRule] = cssValue;
				return this;
			},
			setup: function(options){
				for(var key in options)
					this.properties[key] = options[key];
				return this;
			},
			end: function(callback, options){
				var options = options || {};
				var els = this.els;
				this.callback = this.callback || callback;
				els = els.length?Array.prototype.slice.call(els):[els];
				for(var i = 0, iLen = els.length; i<iLen; i++) {
					var el = els[i];
					var duration = options.forceSpeed || this.animationDuration;
					el.style.transition = duration/1000+"s "+this.animationEasing;
					var properties = options.forceProperties || this.properties;
					for(var key in properties) {
						el.style[key] = properties[key];
						el.addEventListener('webkitTransitionEnd', function event1(event){
							if(this.callback) this.callback();
							el.style.transition = "all 0 ease 0";
							el.removeEventListener('webkitTransitionEnd', event1)
						});
						el.addEventListener('transitionend', function event2(event){
							if(this.callback) this.callback();
							el.style.transition = "all 0 ease 0";
							el.removeEventListener('transitionend', event2)
						});
					}
				}
				return this;
			},
			pause: function(){
				var els = this.els;
				els = els.length?Array.prototype.slice.call(els):[els];
				var properties = this.properties;
				for(var i = 0, iLen = els.length; i<iLen; i++) {
					var el = els[i];
					var forceProperties = {};
					for(var key in properties) {
						var currentEl = window.getComputedStyle(el);
						forceProperties[key] = currentEl[key];
					}
					this.end(null, {
						forceProperties: forceProperties,
						forceSpeed: 0
					});
				}
				return this;
			},
			resume: function(){
				return this.end();
			},
			stop: function(){
				var els = this.els;
				els = els.length?Array.prototype.slice.call(els):[els];
				var properties = this.properties;
				for(var i = 0, iLen = els.length; i<iLen; i++) {
					var el = els[i];
					var properties = this.properties;
					for(var key in properties) {
						var currentEl = window.getComputedStyle(el);
						properties[key] = currentEl[key];
					}
					this.end(null, {
						forceSpeed: 0
					});
				}
				return this;
			}
		}
	}

	//globalize main object
	sX = _sX;


	//========Dom Extending=========
	Element.prototype.hasClass = function(className){
		return this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
	Element.prototype.addClass = NodeList.prototype.addClass = HTMLCollection.prototype.addClass = function(className){
		var els = this.length?this:[this];
		for(var i = 0, iLen = els.length; i<iLen; i++) {
			var el = els[i];
			if(!el.hasClass(className)) el.className += " " + className;
		}
	}
	Element.prototype.removeClass = NodeList.prototype.removeClass = HTMLCollection.prototype.removeClass = function(className){
		var els = this.length?this:[this];
		for(var i = 0, iLen = els.length; i<iLen; i++) {
			var el = els[i];
			el.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
		}
	}
	Element.prototype.toggleClass = NodeList.prototype.toggleClass = HTMLCollection.prototype.toggleClass = function(className){
		var els = this.length?this:[this];
		for(var i = 0, iLen = els.length; i<iLen; i++) {
			var el = els[i];
			if(!el.hasClass(className)) el.addClass(className);
			else el.removeClass(className);
		}
	}
	Element.prototype.move = NodeList.prototype.move = HTMLCollection.prototype.move = function(){
		return _sX.move(this);
	}
	Element.prototype.animate = NodeList.prototype.animate = HTMLCollection.prototype.animate = function(){
		return _sX.animate(this);
	}
	Element.prototype.isNodeList = function() {return false;}
	NodeList.prototype.isNodeList = HTMLCollection.prototype.isNodeList = function(){return true;}
	NodeList.prototype.clone = HTMLCollection.prototype.clone = function(){
		return Array.prototype.slice.call(this);
	}
	Element.prototype.clone = function(){
		return this.cloneNode();
	}
	Element.prototype.empty = NodeList.prototype.empty = HTMLCollection.prototype.empty = function(){
		var els = this.length?this:[this];
		for(var i = 0, iLen = els.length; i<iLen; i++) {
			var el = els[i];
			while(el.childNodes.length) el.removeChild(el.childNodes[0]);
		}
	}
}())



