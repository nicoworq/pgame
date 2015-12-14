// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/*
 *
 *	jQuery Timer plugin v0.2
 *      Ferron Hanse [http://pragmatic-coding.blogspot.com/2012/01/jquery-timer-library.html]
 *		Matt Schmidt [http://www.mattptr.net]   : author of v1
 *
 *	Licensed under the BSD License:
 *		http://mattptr.net/license/license.txt
 *
 */

jQuery.timer = function (interval, callback, type) {
    /**
     *
     * timer() provides a cleaner way to handle intervals
     *
     *    @usage
     * $.timer(interval, callback);
     *
     *
     * @example
     * $.timer(1000, function (timer) {
     *     alert("hello");
     *     timer.stop();
     * },'interval');
     * @desc Show an alert box after 1 second and stop
     *
     * @example
     * var second = false;
     *    $.timer(1000, function (timer) {
     *        if (!second) {
     *            alert('First time!');
     *            second = true;
     *            timer.reset(3000);
     *        }
     *        else {
     *            alert('Second time');
     *            timer.stop();
     *        }
     *    },'interval');
     * @desc Show an alert box after 1 second and show another after 3 seconds
     *
     *
     */

    var interval = interval || 100;

    if (!callback)
        return false;


    _timer = function (interval, callback, type) {
        if (type === 'interval')
            _timerInterval(interval, callback);
        else if (typeof (type) === 'undefined' || type === 'timeout')
            _timerOut(interval, callback);
    };

    _timerInterval = function (interval, callback) {
        this.stop = function () {
            clearInterval(self.id);
        };

        this.internalCallback = function () {
            callback(self);
        };

        this.reset = function (val) {
            if (self.id)
                clearInterval(self.id);

            var val = val || 100;
            this.id = setInterval(this.internalCallback, val);
        };

        this.interval = interval;
        this.id = setInterval(this.internalCallback, this.interval);

        var self = this;
    };

    _timerOut = function (interval, callback) {
        this.stop = function () {
            clearTimeout(self.id);
        };

        this.internalCallback = function () {
            callback(self);
        };

        this.reset = function (val) {
            if (self.id)
                clearTimeout(self.id);

            var val = val || 1000;
            this.id = setTimeout(this.internalCallback, val);
        };

        this.interval = interval;
        this.id = setTimeout(this.internalCallback, this.interval);

        var self = this;
    };

    return new _timer(interval, callback, type);
};


/*!
 * jQuery Color Animations v@VERSION
 * https://github.com/jquery/jquery-color
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: @DATE
 */
(function( jQuery, undefined ) {

	var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",

	// plusequals test for += 100 -= 100
	rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
	// a set of RE's that can match strings and generate color tuples.
	stringParsers = [{
			re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function( execResult ) {
				return [
					execResult[ 1 ],
					execResult[ 2 ],
					execResult[ 3 ],
					execResult[ 4 ]
				];
			}
		}, {
			re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function( execResult ) {
				return [
					execResult[ 1 ] * 2.55,
					execResult[ 2 ] * 2.55,
					execResult[ 3 ] * 2.55,
					execResult[ 4 ]
				];
			}
		}, {
			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
			parse: function( execResult ) {
				return [
					parseInt( execResult[ 1 ], 16 ),
					parseInt( execResult[ 2 ], 16 ),
					parseInt( execResult[ 3 ], 16 )
				];
			}
		}, {
			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
			parse: function( execResult ) {
				return [
					parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),
					parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),
					parseInt( execResult[ 3 ] + execResult[ 3 ], 16 )
				];
			}
		}, {
			re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			space: "hsla",
			parse: function( execResult ) {
				return [
					execResult[ 1 ],
					execResult[ 2 ] / 100,
					execResult[ 3 ] / 100,
					execResult[ 4 ]
				];
			}
		}],

	// jQuery.Color( )
	color = jQuery.Color = function( color, green, blue, alpha ) {
		return new jQuery.Color.fn.parse( color, green, blue, alpha );
	},
	spaces = {
		rgba: {
			props: {
				red: {
					idx: 0,
					type: "byte"
				},
				green: {
					idx: 1,
					type: "byte"
				},
				blue: {
					idx: 2,
					type: "byte"
				}
			}
		},

		hsla: {
			props: {
				hue: {
					idx: 0,
					type: "degrees"
				},
				saturation: {
					idx: 1,
					type: "percent"
				},
				lightness: {
					idx: 2,
					type: "percent"
				}
			}
		}
	},
	propTypes = {
		"byte": {
			floor: true,
			max: 255
		},
		"percent": {
			max: 1
		},
		"degrees": {
			mod: 360,
			floor: true
		}
	},
	support = color.support = {},

	// element for support tests
	supportElem = jQuery( "<p>" )[ 0 ],

	// colors = jQuery.Color.names
	colors,

	// local aliases of functions called often
	each = jQuery.each;

// determine rgba support immediately
supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
support.rgba = supportElem.style.backgroundColor.indexOf( "rgba" ) > -1;

// define cache name and alpha properties
// for rgba and hsla spaces
each( spaces, function( spaceName, space ) {
	space.cache = "_" + spaceName;
	space.props.alpha = {
		idx: 3,
		type: "percent",
		def: 1
	};
});

function clamp( value, prop, allowEmpty ) {
	var type = propTypes[ prop.type ] || {};

	if ( value == null ) {
		return (allowEmpty || !prop.def) ? null : prop.def;
	}

	// ~~ is an short way of doing floor for positive numbers
	value = type.floor ? ~~value : parseFloat( value );

	// IE will pass in empty strings as value for alpha,
	// which will hit this case
	if ( isNaN( value ) ) {
		return prop.def;
	}

	if ( type.mod ) {
		// we add mod before modding to make sure that negatives values
		// get converted properly: -10 -> 350
		return (value + type.mod) % type.mod;
	}

	// for now all property types without mod have min and max
	return 0 > value ? 0 : type.max < value ? type.max : value;
}

function stringParse( string ) {
	var inst = color(),
		rgba = inst._rgba = [];

	string = string.toLowerCase();

	each( stringParsers, function( i, parser ) {
		var parsed,
			match = parser.re.exec( string ),
			values = match && parser.parse( match ),
			spaceName = parser.space || "rgba";

		if ( values ) {
			parsed = inst[ spaceName ]( values );

			// if this was an rgba parse the assignment might happen twice
			// oh well....
			inst[ spaces[ spaceName ].cache ] = parsed[ spaces[ spaceName ].cache ];
			rgba = inst._rgba = parsed._rgba;

			// exit each( stringParsers ) here because we matched
			return false;
		}
	});

	// Found a stringParser that handled it
	if ( rgba.length ) {

		// if this came from a parsed string, force "transparent" when alpha is 0
		// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
		if ( rgba.join() === "0,0,0,0" ) {
			jQuery.extend( rgba, colors.transparent );
		}
		return inst;
	}

	// named colors
	return colors[ string ];
}

color.fn = jQuery.extend( color.prototype, {
	parse: function( red, green, blue, alpha ) {
		if ( red === undefined ) {
			this._rgba = [ null, null, null, null ];
			return this;
		}
		if ( red.jquery || red.nodeType ) {
			red = jQuery( red ).css( green );
			green = undefined;
		}

		var inst = this,
			type = jQuery.type( red ),
			rgba = this._rgba = [];

		// more than 1 argument specified - assume ( red, green, blue, alpha )
		if ( green !== undefined ) {
			red = [ red, green, blue, alpha ];
			type = "array";
		}

		if ( type === "string" ) {
			return this.parse( stringParse( red ) || colors._default );
		}

		if ( type === "array" ) {
			each( spaces.rgba.props, function( key, prop ) {
				rgba[ prop.idx ] = clamp( red[ prop.idx ], prop );
			});
			return this;
		}

		if ( type === "object" ) {
			if ( red instanceof color ) {
				each( spaces, function( spaceName, space ) {
					if ( red[ space.cache ] ) {
						inst[ space.cache ] = red[ space.cache ].slice();
					}
				});
			} else {
				each( spaces, function( spaceName, space ) {
					var cache = space.cache;
					each( space.props, function( key, prop ) {

						// if the cache doesn't exist, and we know how to convert
						if ( !inst[ cache ] && space.to ) {

							// if the value was null, we don't need to copy it
							// if the key was alpha, we don't need to copy it either
							if ( key === "alpha" || red[ key ] == null ) {
								return;
							}
							inst[ cache ] = space.to( inst._rgba );
						}

						// this is the only case where we allow nulls for ALL properties.
						// call clamp with alwaysAllowEmpty
						inst[ cache ][ prop.idx ] = clamp( red[ key ], prop, true );
					});

					// everything defined but alpha?
					if ( inst[ cache ] && jQuery.inArray( null, inst[ cache ].slice( 0, 3 ) ) < 0 ) {
						// use the default of 1
						inst[ cache ][ 3 ] = 1;
						if ( space.from ) {
							inst._rgba = space.from( inst[ cache ] );
						}
					}
				});
			}
			return this;
		}
	},
	is: function( compare ) {
		var is = color( compare ),
			same = true,
			inst = this;

		each( spaces, function( _, space ) {
			var localCache,
				isCache = is[ space.cache ];
			if (isCache) {
				localCache = inst[ space.cache ] || space.to && space.to( inst._rgba ) || [];
				each( space.props, function( _, prop ) {
					if ( isCache[ prop.idx ] != null ) {
						same = ( isCache[ prop.idx ] === localCache[ prop.idx ] );
						return same;
					}
				});
			}
			return same;
		});
		return same;
	},
	_space: function() {
		var used = [],
			inst = this;
		each( spaces, function( spaceName, space ) {
			if ( inst[ space.cache ] ) {
				used.push( spaceName );
			}
		});
		return used.pop();
	},
	transition: function( other, distance ) {
		var end = color( other ),
			spaceName = end._space(),
			space = spaces[ spaceName ],
			startColor = this.alpha() === 0 ? color( "transparent" ) : this,
			start = startColor[ space.cache ] || space.to( startColor._rgba ),
			result = start.slice();

		end = end[ space.cache ];
		each( space.props, function( key, prop ) {
			var index = prop.idx,
				startValue = start[ index ],
				endValue = end[ index ],
				type = propTypes[ prop.type ] || {};

			// if null, don't override start value
			if ( endValue === null ) {
				return;
			}
			// if null - use end
			if ( startValue === null ) {
				result[ index ] = endValue;
			} else {
				if ( type.mod ) {
					if ( endValue - startValue > type.mod / 2 ) {
						startValue += type.mod;
					} else if ( startValue - endValue > type.mod / 2 ) {
						startValue -= type.mod;
					}
				}
				result[ index ] = clamp( ( endValue - startValue ) * distance + startValue, prop );
			}
		});
		return this[ spaceName ]( result );
	},
	blend: function( opaque ) {
		// if we are already opaque - return ourself
		if ( this._rgba[ 3 ] === 1 ) {
			return this;
		}

		var rgb = this._rgba.slice(),
			a = rgb.pop(),
			blend = color( opaque )._rgba;

		return color( jQuery.map( rgb, function( v, i ) {
			return ( 1 - a ) * blend[ i ] + a * v;
		}));
	},
	toRgbaString: function() {
		var prefix = "rgba(",
			rgba = jQuery.map( this._rgba, function( v, i ) {
				return v == null ? ( i > 2 ? 1 : 0 ) : v;
			});

		if ( rgba[ 3 ] === 1 ) {
			rgba.pop();
			prefix = "rgb(";
		}

		return prefix + rgba.join() + ")";
	},
	toHslaString: function() {
		var prefix = "hsla(",
			hsla = jQuery.map( this.hsla(), function( v, i ) {
				if ( v == null ) {
					v = i > 2 ? 1 : 0;
				}

				// catch 1 and 2
				if ( i && i < 3 ) {
					v = Math.round( v * 100 ) + "%";
				}
				return v;
			});

		if ( hsla[ 3 ] === 1 ) {
			hsla.pop();
			prefix = "hsl(";
		}
		return prefix + hsla.join() + ")";
	},
	toHexString: function( includeAlpha ) {
		var rgba = this._rgba.slice(),
			alpha = rgba.pop();

		if ( includeAlpha ) {
			rgba.push( ~~( alpha * 255 ) );
		}

		return "#" + jQuery.map( rgba, function( v ) {

			// default to 0 when nulls exist
			v = ( v || 0 ).toString( 16 );
			return v.length === 1 ? "0" + v : v;
		}).join("");
	},
	toString: function() {
		return this._rgba[ 3 ] === 0 ? "transparent" : this.toRgbaString();
	}
});
color.fn.parse.prototype = color.fn;

// hsla conversions adapted from:
// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021

function hue2rgb( p, q, h ) {
	h = ( h + 1 ) % 1;
	if ( h * 6 < 1 ) {
		return p + (q - p) * h * 6;
	}
	if ( h * 2 < 1) {
		return q;
	}
	if ( h * 3 < 2 ) {
		return p + (q - p) * ((2/3) - h) * 6;
	}
	return p;
}

spaces.hsla.to = function ( rgba ) {
	if ( rgba[ 0 ] == null || rgba[ 1 ] == null || rgba[ 2 ] == null ) {
		return [ null, null, null, rgba[ 3 ] ];
	}
	var r = rgba[ 0 ] / 255,
		g = rgba[ 1 ] / 255,
		b = rgba[ 2 ] / 255,
		a = rgba[ 3 ],
		max = Math.max( r, g, b ),
		min = Math.min( r, g, b ),
		diff = max - min,
		add = max + min,
		l = add * 0.5,
		h, s;

	if ( min === max ) {
		h = 0;
	} else if ( r === max ) {
		h = ( 60 * ( g - b ) / diff ) + 360;
	} else if ( g === max ) {
		h = ( 60 * ( b - r ) / diff ) + 120;
	} else {
		h = ( 60 * ( r - g ) / diff ) + 240;
	}

	// chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
	// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
	if ( diff === 0 ) {
		s = 0;
	} else if ( l <= 0.5 ) {
		s = diff / add;
	} else {
		s = diff / ( 2 - add );
	}
	return [ Math.round(h) % 360, s, l, a == null ? 1 : a ];
};

spaces.hsla.from = function ( hsla ) {
	if ( hsla[ 0 ] == null || hsla[ 1 ] == null || hsla[ 2 ] == null ) {
		return [ null, null, null, hsla[ 3 ] ];
	}
	var h = hsla[ 0 ] / 360,
		s = hsla[ 1 ],
		l = hsla[ 2 ],
		a = hsla[ 3 ],
		q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,
		p = 2 * l - q;

	return [
		Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),
		Math.round( hue2rgb( p, q, h ) * 255 ),
		Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),
		a
	];
};


each( spaces, function( spaceName, space ) {
	var props = space.props,
		cache = space.cache,
		to = space.to,
		from = space.from;

	// makes rgba() and hsla()
	color.fn[ spaceName ] = function( value ) {

		// generate a cache for this space if it doesn't exist
		if ( to && !this[ cache ] ) {
			this[ cache ] = to( this._rgba );
		}
		if ( value === undefined ) {
			return this[ cache ].slice();
		}

		var ret,
			type = jQuery.type( value ),
			arr = ( type === "array" || type === "object" ) ? value : arguments,
			local = this[ cache ].slice();

		each( props, function( key, prop ) {
			var val = arr[ type === "object" ? key : prop.idx ];
			if ( val == null ) {
				val = local[ prop.idx ];
			}
			local[ prop.idx ] = clamp( val, prop );
		});

		if ( from ) {
			ret = color( from( local ) );
			ret[ cache ] = local;
			return ret;
		} else {
			return color( local );
		}
	};

	// makes red() green() blue() alpha() hue() saturation() lightness()
	each( props, function( key, prop ) {
		// alpha is included in more than one space
		if ( color.fn[ key ] ) {
			return;
		}
		color.fn[ key ] = function( value ) {
			var vtype = jQuery.type( value ),
				fn = ( key === "alpha" ? ( this._hsla ? "hsla" : "rgba" ) : spaceName ),
				local = this[ fn ](),
				cur = local[ prop.idx ],
				match;

			if ( vtype === "undefined" ) {
				return cur;
			}

			if ( vtype === "function" ) {
				value = value.call( this, cur );
				vtype = jQuery.type( value );
			}
			if ( value == null && prop.empty ) {
				return this;
			}
			if ( vtype === "string" ) {
				match = rplusequals.exec( value );
				if ( match ) {
					value = cur + parseFloat( match[ 2 ] ) * ( match[ 1 ] === "+" ? 1 : -1 );
				}
			}
			local[ prop.idx ] = value;
			return this[ fn ]( local );
		};
	});
});

// add cssHook and .fx.step function for each named hook.
// accept a space separated string of properties
color.hook = function( hook ) {
	var hooks = hook.split( " " );
	each( hooks, function( i, hook ) {
		jQuery.cssHooks[ hook ] = {
			set: function( elem, value ) {
				var parsed, curElem,
					backgroundColor = "";

				if ( value !== "transparent" && ( jQuery.type( value ) !== "string" || ( parsed = stringParse( value ) ) ) ) {
					value = color( parsed || value );
					if ( !support.rgba && value._rgba[ 3 ] !== 1 ) {
						curElem = hook === "backgroundColor" ? elem.parentNode : elem;
						while (
							(backgroundColor === "" || backgroundColor === "transparent") &&
							curElem && curElem.style
						) {
							try {
								backgroundColor = jQuery.css( curElem, "backgroundColor" );
								curElem = curElem.parentNode;
							} catch ( e ) {
							}
						}

						value = value.blend( backgroundColor && backgroundColor !== "transparent" ?
							backgroundColor :
							"_default" );
					}

					value = value.toRgbaString();
				}
				try {
					elem.style[ hook ] = value;
				} catch( e ) {
					// wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
				}
			}
		};
		jQuery.fx.step[ hook ] = function( fx ) {
			if ( !fx.colorInit ) {
				fx.start = color( fx.elem, hook );
				fx.end = color( fx.end );
				fx.colorInit = true;
			}
			jQuery.cssHooks[ hook ].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );
		};
	});

};

color.hook( stepHooks );

jQuery.cssHooks.borderColor = {
	expand: function( value ) {
		var expanded = {};

		each( [ "Top", "Right", "Bottom", "Left" ], function( i, part ) {
			expanded[ "border" + part + "Color" ] = value;
		});
		return expanded;
	}
};

// Basic color names only.
// Usage of any of the other color names requires adding yourself or including
// jquery.color.svg-names.js.
colors = jQuery.Color.names = {
	// 4.1. Basic color keywords
	aqua: "#00ffff",
	black: "#000000",
	blue: "#0000ff",
	fuchsia: "#ff00ff",
	gray: "#808080",
	green: "#008000",
	lime: "#00ff00",
	maroon: "#800000",
	navy: "#000080",
	olive: "#808000",
	purple: "#800080",
	red: "#ff0000",
	silver: "#c0c0c0",
	teal: "#008080",
	white: "#ffffff",
	yellow: "#ffff00",

	// 4.2.3. "transparent" color keyword
	transparent: [ null, null, null, 0 ],

	_default: "#ffffff"
};

}( jQuery ));



!function(e,t){"use strict";function n(){function n(t){var n=t||e.event,o=n.keyCode||n.which;if(-1!==[9,13,32,27].indexOf(o)){for(var a=n.target||n.srcElement,r=-1,i=0;i<x.length;i++)if(a===x[i]){r=i;break}9===o?(a=-1===r?k:n.shiftKey?0===r?x[x.length-1]:x[r-1]:r===x.length-1?x[0]:x[r+1],H(n),l(a)):13===o||32===o?-1===r&&I(k,n):27===o&&u.allowEscapeKey===!0&&I(B,n)}}if(void 0===arguments[0])return e.console.error("sweetAlert expects at least 1 attribute!"),!1;var u=r({},w);switch(typeof arguments[0]){case"string":u.title=arguments[0],u.text=arguments[1]||"",u.type=arguments[2]||"";break;case"object":u.title=arguments[0].title||w.title,u.text=arguments[0].text||w.text,u.html=arguments[0].html||w.html,u.type=arguments[0].type||w.type,u.animation=void 0!==arguments[0].animation?arguments[0].animation:w.animation,u.customClass=arguments[0].customClass||u.customClass,u.allowOutsideClick=void 0!==arguments[0].allowOutsideClick?arguments[0].allowOutsideClick:w.allowOutsideClick,u.allowEscapeKey=void 0!==arguments[0].allowEscapeKey?arguments[0].allowEscapeKey:w.allowEscapeKey,u.showConfirmButton=void 0!==arguments[0].showConfirmButton?arguments[0].showConfirmButton:w.showConfirmButton,u.showCancelButton=void 0!==arguments[0].showCancelButton?arguments[0].showCancelButton:w.showCancelButton,u.closeOnConfirm=void 0!==arguments[0].closeOnConfirm?arguments[0].closeOnConfirm:w.closeOnConfirm,u.closeOnCancel=void 0!==arguments[0].closeOnCancel?arguments[0].closeOnCancel:w.closeOnCancel,u.timer=parseInt(arguments[0].timer)||w.timer,u.width=parseInt(arguments[0].width)||w.width,u.padding=parseInt(arguments[0].padding)||w.padding,u.background=void 0!==arguments[0].background?arguments[0].background:w.background,u.confirmButtonText=arguments[0].confirmButtonText||w.confirmButtonText,u.confirmButtonColor=arguments[0].confirmButtonColor||w.confirmButtonColor,u.confirmButtonClass=arguments[0].confirmButtonClass||u.confirmButtonClass,u.cancelButtonText=arguments[0].cancelButtonText||w.cancelButtonText,u.cancelButtonColor=arguments[0].cancelButtonColor||w.cancelButtonColor,u.cancelButtonClass=arguments[0].cancelButtonClass||u.cancelButtonClass,u.imageUrl=arguments[0].imageUrl||w.imageUrl,u.imageSize=arguments[0].imageSize||w.imageSize,u.callback=arguments[1]||null,e.sweetAlert.callback=e.swal.callback=function(e){"function"==typeof u.callback&&u.callback(e)};break;default:return e.console.error('Unexpected type of argument! Expected "string" or "object", got '+typeof arguments[0]),!1}o(u),c(),i();var y=b();u.timer&&(y.timeout=setTimeout(function(){s(),"function"==typeof u.callback&&u.callback()},u.timer));var g,p=function(t){var n=t||e.event,o=n.target||n.srcElement,r=C(o,"confirm"),l=C(o,"cancel"),i=C(y,"visible");switch(n.type){case"mouseover":case"mouseup":case"focus":r?o.style.backgroundColor=a(u.confirmButtonColor,-.1):l&&(o.style.backgroundColor=a(u.cancelButtonColor,-.1));break;case"mouseout":case"blur":r?o.style.backgroundColor=u.confirmButtonColor:l&&(o.style.backgroundColor=u.cancelButtonColor);break;case"mousedown":r?o.style.backgroundColor=a(u.confirmButtonColor,-.2):l&&(o.style.backgroundColor=a(u.cancelButtonColor,-.2));break;case"click":if(r&&u.callback&&i)u.callback(!0),u.closeOnConfirm&&s();else if(u.callback&&i){var c=String(u.callback).replace(/\s/g,""),m="function("===c.substring(0,9)&&")"!==c.substring(9,10);m&&u.callback(!1),u.closeOnCancel&&s()}else s()}},v=y.querySelectorAll("button");for(g=0;g<v.length;g++)v[g].onclick=p,v[g].onmouseover=p,v[g].onmouseout=p,v[g].onmousedown=p;m=t.onclick,t.onclick=function(t){var n=t||e.event,o=n.target||n.srcElement;o===h()&&u.allowOutsideClick&&s()};var k=y.querySelector("button.confirm"),B=y.querySelector("button.cancel"),x=y.querySelectorAll("button, input:not([type=hidden]), textarea");for(g=0;g<x.length;g++)x[g].addEventListener("focus",p,!0),x[g].addEventListener("blur",p,!0);d=e.onkeydown,e.onkeydown=n,k.style.borderLeftColor=u.confirmButtonColor,k.style.borderRightColor=u.confirmButtonColor,e.swal.toggleLoading=function(){k.disabled=!k.disabled,B.disabled=!B.disabled},e.swal.enableButtons=function(){k.disabled=!1,B.disabled=!1},e.swal.disableButtons=function(){k.disabled=!0,B.disabled=!0},swal.enableButtons(),e.onfocus=function(){e.setTimeout(function(){void 0!==f&&(f.focus(),f=void 0)},0)}}function o(n){var o=b();o.style.width=n.width+"px",o.style.padding=n.padding+"px",o.style.marginLeft=-n.width/2+"px",o.style.background=n.background;var a=t.getElementsByTagName("head")[0],r=t.createElement("style");r.type="text/css",r.id=p,r.innerHTML="@media screen and (max-width: "+n.width+"px) {.sweet-alert {max-width: 100%;left: 0 !important;margin-left: 0 !important;}}",a.appendChild(r);var l=o.querySelector("h2"),i=o.querySelector("p"),s=o.querySelector("button.cancel"),c=o.querySelector("button.confirm"),u=o.querySelector("hr");if(l.innerHTML=x(n.title).split("\n").join("<br>"),e.jQuery?i=$(i).html(x(n.text.split("\n").join("<br>"))||n.html):(i.innerHTML=x(n.text.split("\n").join("<br>"))||n.html,i.innerHTML&&E(i)),n.customClass&&k(o,n.customClass),q(o.querySelectorAll(".icon")),n.type){for(var m=!1,d=0;d<v.length;d++)if(n.type===v[d]){m=!0;break}if(!m)return e.console.error("Unknown alert type: "+n.type),!1;var f=o.querySelector(".icon."+n.type);switch(E(f),n.type){case"success":k(f,"animate"),k(f.querySelector(".tip"),"animate-success-tip"),k(f.querySelector(".long"),"animate-success-long");break;case"error":k(f,"animate-error-icon"),k(f.querySelector(".x-mark"),"animate-x-mark");break;case"warning":k(f,"pulse-warning"),k(f.querySelector(".body"),"pulse-warning-ins"),k(f.querySelector(".dot"),"pulse-warning-ins")}}if(n.imageUrl){var y=o.querySelector(".icon.custom");if(y.style.backgroundImage="url("+n.imageUrl+")",E(y),n.imageSize){var g=n.imageSize.match(/(\d+)x(\d+)/);g?y.setAttribute("style",y.getAttribute("style")+"width:"+g[1]+"px; height:"+g[2]+"px"):e.console.error("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+n.imageSize)}}n.showCancelButton?s.style.display="inline-block":q(s),n.showConfirmButton?c.style.display="inline-block":q(c),n.showConfirmButton||n.showCancelButton||q(u),c.innerHTML=x(n.confirmButtonText),s.innerHTML=x(n.cancelButtonText),c.style.backgroundColor=n.confirmButtonColor,s.style.backgroundColor=n.cancelButtonColor,c.className="confirm",k(c,n.confirmButtonClass),s.className="cancel",k(s,n.cancelButtonClass),n.animation===!0?B(o,"no-animation"):k(o,"no-animation")}function a(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;for(var n="#",o=0;3>o;o++){var a=parseInt(e.substr(2*o,2),16);a=Math.round(Math.min(Math.max(0,a+a*t),255)).toString(16),n+=("00"+a).substr(a.length)}return n}function r(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function l(e){e.focus()}function i(){var e=b();L(h(),10),E(e),k(e,"show-sweet-alert"),B(e,"hide-sweet-alert"),u=t.activeElement,setTimeout(function(){k(e,"visible")},500)}function s(){var n=b();M(h(),5),M(n,5),B(n,"showSweetAlert"),k(n,"hideSweetAlert"),B(n,"visible");var o=n.querySelector(".icon.success");B(o,"animate"),B(o.querySelector(".tip"),"animate-success-tip"),B(o.querySelector(".long"),"animate-success-long");var a=n.querySelector(".icon.error");B(a,"animate-error-icon"),B(a.querySelector(".x-mark"),"animate-x-mark");var r=n.querySelector(".icon.warning");B(r,"pulse-warning"),B(r.querySelector(".body"),"pulse-warning-ins"),B(r.querySelector(".dot"),"pulse-warning-ins"),e.onkeydown=d,t.onclick=m,u&&u.focus(),f=void 0,clearTimeout(n.timeout);var l=t.getElementsByTagName("head")[0],i=t.getElementById(p);l.removeChild(i)}function c(){var e=b();e.style.marginTop=O(b())}var u,m,d,f,y=".sweet-alert",g=".sweet-overlay",p="sweet-alert-mediaquery",v=["error","warning","info","success"],w={title:"",text:"",html:"",type:null,animation:!0,allowOutsideClick:!0,allowEscapeKey:!0,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#3085d6",confirmButtonClass:null,cancelButtonText:"Cancel",cancelButtonColor:"#aaa",cancelButtonClass:null,imageUrl:null,imageSize:null,timer:null,width:500,padding:20,background:"#fff"},b=function(){return t.querySelector(y)},h=function(){return t.querySelector(g)},C=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},k=function(e,t){t&&!C(e,t)&&(e.className+=" "+t)},B=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(C(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},x=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},S=function(e){e.style.opacity="",e.style.display="block"},E=function(e){if(e&&!e.length)return S(e);for(var t=0;t<e.length;++t)S(e[t])},T=function(e){e.style.opacity="",e.style.display="none"},q=function(e){if(e&&!e.length)return T(e);for(var t=0;t<e.length;++t)T(e[t])},O=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt(n/2+t)+"px"},L=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)};o()}e.style.display="block"},M=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"};o()},I=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},H=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};e.sweetAlert=e.swal=function(){var e=arguments;if(null!==b())n.apply(this,e);else var t=setInterval(function(){null!==b()&&(clearInterval(t),n.apply(this,e))},100)},e.sweetAlert.closeModal=e.swal.closeModal=function(){s()},e.swal.init=function(){var e='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert" tabIndex="-1"><div class="icon error"><span class="x-mark"><span class="line left"></span><span class="line right"></span></span></div><div class="icon warning"> <span class="body"></span> <span class="dot"></span> </div> <div class="icon info"></div> <div class="icon success"> <span class="line tip"></span> <span class="line long"></span> <div class="placeholder"></div> <div class="fix"></div> </div> <div class="icon custom"></div> <h2>Title</h2><p>Text</p><hr><button class="confirm">OK</button><button class="cancel">Cancel</button></div>',n=t.createElement("div");n.className="sweet-container",n.innerHTML=e,t.body.appendChild(n)},e.swal.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");r(w,e)},function(){"complete"===t.readyState||"interactive"===t.readyState&&t.body?swal.init():t.addEventListener?t.addEventListener("DOMContentLoaded",function e(){t.removeEventListener("DOMContentLoaded",e,!1),swal.init()},!1):t.attachEvent&&t.attachEvent("onreadystatechange",function n(){"complete"===t.readyState&&(t.detachEvent("onreadystatechange",n),swal.init())})}()}(window,document);
                                                    
                                                    
/*! odometer 0.4.6 */
(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G=[].slice;q='<span class="odometer-value"></span>',n='<span class="odometer-ribbon"><span class="odometer-ribbon-inner">'+q+"</span></span>",d='<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">'+n+"</span></span>",g='<span class="odometer-formatting-mark"></span>',c="(,ddd).dd",h=/^\(?([^)]*)\)?(?:(.)(d+))?$/,i=30,f=2e3,a=20,j=2,e=.5,k=1e3/i,b=1e3/a,o="transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",y=document.createElement("div").style,p=null!=y.transition||null!=y.webkitTransition||null!=y.mozTransition||null!=y.oTransition,w=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,l=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,s=function(a){var b;return b=document.createElement("div"),b.innerHTML=a,b.children[0]},v=function(a,b){return a.className=a.className.replace(new RegExp("(^| )"+b.split(" ").join("|")+"( |$)","gi")," ")},r=function(a,b){return v(a,b),a.className+=" "+b},z=function(a,b){var c;return null!=document.createEvent?(c=document.createEvent("HTMLEvents"),c.initEvent(b,!0,!0),a.dispatchEvent(c)):void 0},u=function(){var a,b;return null!=(a=null!=(b=window.performance)?"function"==typeof b.now?b.now():void 0:void 0)?a:+new Date},x=function(a,b){return null==b&&(b=0),b?(a*=Math.pow(10,b),a+=.5,a=Math.floor(a),a/=Math.pow(10,b)):Math.round(a)},A=function(a){return 0>a?Math.ceil(a):Math.floor(a)},t=function(a){return a-x(a)},C=!1,(B=function(){var a,b,c,d,e;if(!C&&null!=window.jQuery){for(C=!0,d=["html","text"],e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(function(a){var b;return b=window.jQuery.fn[a],window.jQuery.fn[a]=function(a){var c;return null==a||null==(null!=(c=this[0])?c.odometer:void 0)?b.apply(this,arguments):this[0].odometer.update(a)}}(a));return e}})(),setTimeout(B,0),m=function(){function a(b){var c,d,e,g,h,i,l,m,n,o,p=this;if(this.options=b,this.el=this.options.el,null!=this.el.odometer)return this.el.odometer;this.el.odometer=this,m=a.options;for(d in m)g=m[d],null==this.options[d]&&(this.options[d]=g);null==(h=this.options).duration&&(h.duration=f),this.MAX_VALUES=this.options.duration/k/j|0,this.resetFormat(),this.value=this.cleanValue(null!=(n=this.options.value)?n:""),this.renderInside(),this.render();try{for(o=["innerHTML","innerText","textContent"],i=0,l=o.length;l>i;i++)e=o[i],null!=this.el[e]&&!function(a){return Object.defineProperty(p.el,a,{get:function(){var b;return"innerHTML"===a?p.inside.outerHTML:null!=(b=p.inside.innerText)?b:p.inside.textContent},set:function(a){return p.update(a)}})}(e)}catch(q){c=q,this.watchForMutations()}}return a.prototype.renderInside=function(){return this.inside=document.createElement("div"),this.inside.className="odometer-inside",this.el.innerHTML="",this.el.appendChild(this.inside)},a.prototype.watchForMutations=function(){var a,b=this;if(null!=l)try{return null==this.observer&&(this.observer=new l(function(){var a;return a=b.el.innerText,b.renderInside(),b.render(b.value),b.update(a)})),this.watchMutations=!0,this.startWatchingMutations()}catch(c){a=c}},a.prototype.startWatchingMutations=function(){return this.watchMutations?this.observer.observe(this.el,{childList:!0}):void 0},a.prototype.stopWatchingMutations=function(){var a;return null!=(a=this.observer)?a.disconnect():void 0},a.prototype.cleanValue=function(a){var b;return"string"==typeof a&&(a=a.replace(null!=(b=this.format.radix)?b:".","<radix>"),a=a.replace(/[.,]/g,""),a=a.replace("<radix>","."),a=parseFloat(a,10)||0),x(a,this.format.precision)},a.prototype.bindTransitionEnd=function(){var a,b,c,d,e,f,g=this;if(!this.transitionEndBound){for(this.transitionEndBound=!0,b=!1,e=o.split(" "),f=[],c=0,d=e.length;d>c;c++)a=e[c],f.push(this.el.addEventListener(a,function(){return b?!0:(b=!0,setTimeout(function(){return g.render(),b=!1,z(g.el,"odometerdone")},0),!0)},!1));return f}},a.prototype.resetFormat=function(){var a,b,d,e,f,g,i,j;if(a=null!=(i=this.options.format)?i:c,a||(a="d"),d=h.exec(a),!d)throw new Error("Odometer: Unparsable digit format");return j=d.slice(1,4),g=j[0],f=j[1],b=j[2],e=(null!=b?b.length:void 0)||0,this.format={repeating:g,radix:f,precision:e}},a.prototype.render=function(a){var b,c,d,e,f,g,h,i,j,k,l,m;for(null==a&&(a=this.value),this.stopWatchingMutations(),this.resetFormat(),this.inside.innerHTML="",g=this.options.theme,b=this.el.className.split(" "),f=[],i=0,k=b.length;k>i;i++)c=b[i],c.length&&((e=/^odometer-theme-(.+)$/.exec(c))?g=e[1]:/^odometer(-|$)/.test(c)||f.push(c));for(f.push("odometer"),p||f.push("odometer-no-transitions"),f.push(g?"odometer-theme-"+g:"odometer-auto-theme"),this.el.className=f.join(" "),this.ribbons={},this.digits=[],h=!this.format.precision||!t(a)||!1,m=a.toString().split("").reverse(),j=0,l=m.length;l>j;j++)d=m[j],"."===d&&(h=!0),this.addDigit(d,h);return this.startWatchingMutations()},a.prototype.update=function(a){var b,c=this;return a=this.cleanValue(a),(b=a-this.value)?(v(this.el,"odometer-animating-up odometer-animating-down odometer-animating"),b>0?r(this.el,"odometer-animating-up"):r(this.el,"odometer-animating-down"),this.stopWatchingMutations(),this.animate(a),this.startWatchingMutations(),setTimeout(function(){return c.el.offsetHeight,r(c.el,"odometer-animating")},0),this.value=a):void 0},a.prototype.renderDigit=function(){return s(d)},a.prototype.insertDigit=function(a,b){return null!=b?this.inside.insertBefore(a,b):this.inside.children.length?this.inside.insertBefore(a,this.inside.children[0]):this.inside.appendChild(a)},a.prototype.addSpacer=function(a,b,c){var d;return d=s(g),d.innerHTML=a,c&&r(d,c),this.insertDigit(d,b)},a.prototype.addDigit=function(a,b){var c,d,e,f;if(null==b&&(b=!0),"-"===a)return this.addSpacer(a,null,"odometer-negation-mark");if("."===a)return this.addSpacer(null!=(f=this.format.radix)?f:".",null,"odometer-radix-mark");if(b)for(e=!1;;){if(!this.format.repeating.length){if(e)throw new Error("Bad odometer format without digits");this.resetFormat(),e=!0}if(c=this.format.repeating[this.format.repeating.length-1],this.format.repeating=this.format.repeating.substring(0,this.format.repeating.length-1),"d"===c)break;this.addSpacer(c)}return d=this.renderDigit(),d.querySelector(".odometer-value").innerHTML=a,this.digits.push(d),this.insertDigit(d)},a.prototype.animate=function(a){return p&&"count"!==this.options.animation?this.animateSlide(a):this.animateCount(a)},a.prototype.animateCount=function(a){var c,d,e,f,g,h=this;if(d=+a-this.value)return f=e=u(),c=this.value,(g=function(){var i,j,k;return u()-f>h.options.duration?(h.value=a,h.render(),void z(h.el,"odometerdone")):(i=u()-e,i>b&&(e=u(),k=i/h.options.duration,j=d*k,c+=j,h.render(Math.round(c))),null!=w?w(g):setTimeout(g,b))})()},a.prototype.getDigitCount=function(){var a,b,c,d,e,f;for(d=1<=arguments.length?G.call(arguments,0):[],a=e=0,f=d.length;f>e;a=++e)c=d[a],d[a]=Math.abs(c);return b=Math.max.apply(Math,d),Math.ceil(Math.log(b+1)/Math.log(10))},a.prototype.getFractionalDigitCount=function(){var a,b,c,d,e,f,g;for(e=1<=arguments.length?G.call(arguments,0):[],b=/^\-?\d*\.(\d*?)0*$/,a=f=0,g=e.length;g>f;a=++f)d=e[a],e[a]=d.toString(),c=b.exec(e[a]),e[a]=null==c?0:c[1].length;return Math.max.apply(Math,e)},a.prototype.resetDigits=function(){return this.digits=[],this.ribbons=[],this.inside.innerHTML="",this.resetFormat()},a.prototype.animateSlide=function(a){var b,c,d,f,g,h,i,j,k,l,m,n,o,p,q,s,t,u,v,w,x,y,z,B,C,D,E;if(s=this.value,j=this.getFractionalDigitCount(s,a),j&&(a*=Math.pow(10,j),s*=Math.pow(10,j)),d=a-s){for(this.bindTransitionEnd(),f=this.getDigitCount(s,a),g=[],b=0,m=v=0;f>=0?f>v:v>f;m=f>=0?++v:--v){if(t=A(s/Math.pow(10,f-m-1)),i=A(a/Math.pow(10,f-m-1)),h=i-t,Math.abs(h)>this.MAX_VALUES){for(l=[],n=h/(this.MAX_VALUES+this.MAX_VALUES*b*e),c=t;h>0&&i>c||0>h&&c>i;)l.push(Math.round(c)),c+=n;l[l.length-1]!==i&&l.push(i),b++}else l=function(){E=[];for(var a=t;i>=t?i>=a:a>=i;i>=t?a++:a--)E.push(a);return E}.apply(this);for(m=w=0,y=l.length;y>w;m=++w)k=l[m],l[m]=Math.abs(k%10);g.push(l)}for(this.resetDigits(),D=g.reverse(),m=x=0,z=D.length;z>x;m=++x)for(l=D[m],this.digits[m]||this.addDigit(" ",m>=j),null==(u=this.ribbons)[m]&&(u[m]=this.digits[m].querySelector(".odometer-ribbon-inner")),this.ribbons[m].innerHTML="",0>d&&(l=l.reverse()),o=C=0,B=l.length;B>C;o=++C)k=l[o],q=document.createElement("div"),q.className="odometer-value",q.innerHTML=k,this.ribbons[m].appendChild(q),o===l.length-1&&r(q,"odometer-last-value"),0===o&&r(q,"odometer-first-value");return 0>t&&this.addDigit("-"),p=this.inside.querySelector(".odometer-radix-mark"),null!=p&&p.parent.removeChild(p),j?this.addSpacer(this.format.radix,this.digits[j-1],"odometer-radix-mark"):void 0}},a}(),m.options=null!=(E=window.odometerOptions)?E:{},setTimeout(function(){var a,b,c,d,e;if(window.odometerOptions){d=window.odometerOptions,e=[];for(a in d)b=d[a],e.push(null!=(c=m.options)[a]?(c=m.options)[a]:c[a]=b);return e}},0),m.init=function(){var a,b,c,d,e,f;if(null!=document.querySelectorAll){for(b=document.querySelectorAll(m.options.selector||".odometer"),f=[],c=0,d=b.length;d>c;c++)a=b[c],f.push(a.odometer=new m({el:a,value:null!=(e=a.innerText)?e:a.textContent}));return f}},null!=(null!=(F=document.documentElement)?F.doScroll:void 0)&&null!=document.createEventObject?(D=document.onreadystatechange,document.onreadystatechange=function(){return"complete"===document.readyState&&m.options.auto!==!1&&m.init(),null!=D?D.apply(this,arguments):void 0}):document.addEventListener("DOMContentLoaded",function(){return m.options.auto!==!1?m.init():void 0},!1),"function"==typeof define&&define.amd?define(["jquery"],function(){return m}):typeof exports===!1?module.exports=m:window.Odometer=m}).call(this);



/*!
 * Parallaxify.js v0.0.2
 * http://hwthorn.github.io/parallaxify
 *
 * Copyright 2013, Felix Pflaum
 * Released under the MIT license
 * http://hwthorn.mit-license.org
 *
 * Based on stellar.js by Mark Dalgleish
 * http://markdalgleish.com/projects/stellar.js
 */

 ;(function($, window, document, undefined) {

	var pluginName = 'parallaxify',
		maxFPS = 30,
		defaults = {
			positionProperty: 'position',
			horizontalParallax: true,
			verticalParallax: true,
			parallaxBackgrounds: true,
			parallaxElements: true,
			responsive: false,
			useMouseMove: true,
			useGyroscope: true,
			alphaFilter: 0.9,			// use Low Pass Filter to smooth sensor readings (1 = no filter)
			motionType: 'natural',
			mouseMotionType: 'gaussian',
			inputPriority: 'mouse',		// define which input device has priority over the other 'mouse' or 'gyroscope'
			motionAngleX: 80,			// (0 < motionAngle < 90) delta angle that is used to render max parallax in this direction
			motionAngleY: 80,
			adjustBasePosition: true,	// using Low Pass Filter to adjust base position
			alphaPosition: 0.05			// alpha for Low Pass Filter used to adjust average position
		},

		// Options for positioning of elements
		// e.g. using css positioning with top and left
		// or using css transforms
		positionProperty = {
			position: {
				setLeft: function($element, left) { $element.css('left', left); },
				setTop: function($element, top) { $element.css('top', top); }
			},
			transform: {
				setPosition: function($element, left, originalLeft, top, originalTop) {
					$element[0].style[prefixedTransform] = 'translate3d(' + (left - originalLeft) + 'px, ' + (top - originalTop) + 'px, 0)';
				}
			}
		},

		// approximation of Gaussian cumulative distribution function with parameter a to influence standard deviation sigma
		gCDFApprox = function(x, a) {
			return 1 / (1 + Math.exp(-(0.07056*a*(x^3))-(1.5976*a*x)));
		},

		// low pass filter for motion events (http://en.wikipedia.org/wiki/Low-pass_filter)
		lowPassFilter = function(curSignal, prevSignal, alpha) {
			if (prevSignal === null) return curSignal;
			if (typeof alpha === "undefined") alpha = 0.5;
			return (alpha * curSignal) + ((1 - alpha) * prevSignal);
		},

		// cached variable to speed up motionTypes
		factorCache = [],

		// Options for calculating the parallax effect
		// naturally a tangent is used, alternatively a Gaussian cumulative distribution function can be used
		motionType = {
			linear: function(delta, deltaMax) {
				if (delta <= -deltaMax) return 1;
				if (delta >= deltaMax) return -1;
				return -delta/deltaMax;
			},
			natural: function(delta, deltaMax) {
				if (delta <= -deltaMax) return 1;
				if (delta >= deltaMax) return -1;
				if (factorCache['n'+deltaMax] === undefined) factorCache['n'+deltaMax] = Math.tan(deltaMax*0.01745);
				return -Math.tan(delta*0.01745) / factorCache['n'+deltaMax];
			},
			performance: function(delta, deltaMax) {
				if (delta <= -deltaMax) return 1;
				if (delta >= deltaMax) return -1;
				if (factorCache['p'+deltaMax] === undefined) factorCache['p'+deltaMax] = (deltaMax/90) + (4.2*Math.pow(deltaMax/90,7));
				return -((delta/90) + (4.2*Math.pow(delta/90,7))) / factorCache['p'+deltaMax];
			},
			gaussian: function(delta, deltaMax) {
				return 1 - 2 * gCDFApprox(delta/90, 135/deltaMax);
			}
		},

		// Returns a function which adds a vendor prefix to any CSS property name
		vendorPrefix = (function() {
			var prefixes = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
				style = $('script')[0].style,
				prefix = '',
				prop;

			for (prop in style) {
				if (prefixes.test(prop)) {
					prefix = prop.match(prefixes)[0];
					break;
				}
			}

			if ('WebkitOpacity' in style) { prefix = 'Webkit'; }
			if ('KhtmlOpacity' in style) { prefix = 'Khtml'; }

			return function(property) {
				return prefix + (prefix.length > 0 ? property.charAt(0).toUpperCase() + property.slice(1) : property);
			};
		}()),

		prefixedTransform = vendorPrefix('transform'),

		supportsBackgroundPositionXY = $('<div />', { style: 'background:#fff' }).css('background-position-x') !== undefined,

		setBackgroundPosition = (supportsBackgroundPositionXY ?
			function($element, x, y) {
				$element.css({
					'background-position-x': x,
					'background-position-y': y
				});
			} :
			function($element, x, y) {
				$element.css('background-position', x + ' ' + y);
			}
		),

		getBackgroundPosition = (supportsBackgroundPositionXY ?
			function($element) {
				return [
					$element.css('background-position-x'),
					$element.css('background-position-y')
				];
			} :
			function($element) {
				return $element.css('background-position').split(' ');
			}
		),

		// using requestAnimationFrame to limit execution to
		// the animation frames and reduce browser load
		// fallback to 60x per second
		requestAnimationFrame = (
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback) {
				setTimeout(callback, 1000 / maxFPS);
			}
		);

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {
		init: function() {
			this.name = pluginName + '_' + Math.floor(Math.random() * 1e9);
			this.tilt = {
				beta : 0,
				gamma : 0
			};

			this._defineElements();
			this._defineGetters();
			this._defineSetters();
			this._detectMobile();
			this._detectMotionType();
			this._detectViewport();
			this._handleWindowLoadAndResize();

			this.refresh({ firstLoad: true });

			this._startAnimation();
		},
		_defineElements: function() {
			this.$element = ( this.element === document.body || this.element === window ? $('body') : $(this.element) );
			this.$viewportElement = $(window);
		},
		_defineGetters: function() {

		// define getters
		// sensor data and mouse move
		// return value is between -1 and +1

			var self = this,
				motionTypeAdapter = motionType[self.options.motionType],
				mouseMoveAdapter = motionType[self.options.mouseMotionType];

			this._getMoveHorizontal = function() {

				if (this.useMouseMove && this.clientX !== null && this.clientX !== this.oldClientX ) {
					return mouseMoveAdapter( this.options.motionAngleX * (1 - (2*this.clientX/this.viewportWidth)), this.options.motionAngleX);
				}

				if (this.useSensor && this.beta !== null && this.gamma !== null) {
				// output = 2*gCDFApprox(tilt/180, 0.75*90/(0.5*this.options.motionAngle))-1;
				// -180 < tilt < 180 => multiply beta x 2

					// tilt.gamma and tilt.beta
					var tilt = this.tilt;

					if (this.viewportLandscape) {
						if (this.viewportFlipped) {
						// landscape flipped
							return motionTypeAdapter(-tilt.beta, this.options.motionAngleX);
						} else {
						// landscape regular
							return motionTypeAdapter(tilt.beta, this.options.motionAngleX);
						}
					} else {
						if (this.viewportFlipped) {
						// portrait flipped
							return motionTypeAdapter(-tilt.gamma, this.options.motionAngleX);
						} else {
						// portrait regular
							return motionTypeAdapter(tilt.gamma, this.options.motionAngleX);
						}
					}
				} else {
					this.useSensor = false;
				}

				return mouseMoveAdapter( this.options.motionAngleX * (1 - (2*this.oldClientX/this.viewportWidth)), this.options.motionAngleX);
			};

			this._getMoveVertical = function() {

				if (this.options.useMouseMove && this.clientY !== null && this.clientY !== this.oldClientY ) {
					return mouseMoveAdapter( this.options.motionAngleY * (1 - (2*this.clientY/this.viewportHeight)), this.options.motionAngleY);
				}

				if (this.useSensor && this.beta !== null && this.gamma !== null) {

					// tilt.gamma and tilt.beta
					var tilt = this.tilt;

					if (this.viewportLandscape) {
						if (this.viewportFlipped) {
						// landscape flipped
							return motionTypeAdapter(-tilt.gamma, this.options.motionAngleY);
						} else {
						// landscape regular
							return motionTypeAdapter(tilt.gamma, this.options.motionAngleY);
						}
					} else {
						if (this.viewportFlipped) {
						// portrait flipped
							return motionTypeAdapter(-tilt.beta, this.options.motionAngleY);
						} else {
						// portrait regular
							return motionTypeAdapter(tilt.beta, this.options.motionAngleY);
						}
					}
				} else {
					this.useSensor = false;
				}

				return mouseMoveAdapter( this.options.motionAngleY * (1 - (2*this.oldClientY/this.viewportHeight)), this.options.motionAngleY);
			};

		},
		_defineSetters: function() {

		// define setters
		// set position of elements

			var self = this,
				positionPropertyAdapter = positionProperty[self.options.positionProperty];

			// use .setPosition or if not available use .setLeft and .setTop
			this._setPosition = positionPropertyAdapter.setPosition ||
				function($element, left, originalLeft, top, originalTop) {
					if (self.options.horizontalParallax) {
						positionPropertyAdapter.setLeft($element, left, originalLeft);
					}
					if (self.options.verticalParallax) {
						positionPropertyAdapter.setTop($element, top, originalTop);
					}
				};

		},
		refresh: function(options) {
			if (!options || !options.firstLoad) {
				this._reset();
			}
			this._findElements();
			this._findBackgrounds();
			// Fix for WebKit background rendering bug
			if (options && options.firstLoad && /WebKit/.test(navigator.userAgent)) {
				$(window).load(function() {
					var $el = $('body');
						oldLeft = $el.scrollLeft();
						oldTop = $el.scrollTop();

					$el.scrollLeft(oldLeft + 1);
					$el.scrollTop(oldTop + 1);

					$el.scrollLeft(oldLeft);
					$el.scrollTop(oldTop);
				});
			}
		},
		_detectViewport: function() {
			this.viewportWidth = this.$viewportElement.width();
			this.viewportHeight = this.$viewportElement.height();
			if (this.useSensor) {
				this.viewportFlipped = (window.orientation === 180);
				this.viewportLandscape = (Math.abs(window.orientation) === 90);
			}
		},
		_detectMobile: function() {
			// see http://detectmobilebrowser.com/mobile
			var browser = navigator.userAgent || navigator.vendor || window.opera;
			this.isMobile = (/(bb\d+|meego).+mobile|android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|playbook|plucker|pocket|psp|series(4|6)0|silk|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(browser)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(browser.substr(0,4)));
		},
		_detectMotionType: function() {
			this.useSensor = false;
			this.useSensorWebkit = false;
			this.useSensorMoz = false;
			this.useMouseMove = false;

			if (this.options.useGyroscope && (this.isMobile || this.options.inputPriority === 'gyroscope')) {
				// Webkit uses deviceorientation (DeviceOrientationEvent)
				this.useSensorWebkit = window.DeviceOrientationEvent !== undefined;
				// Mozilla uses MozOrientation (OrientationEvent)
				this.useSensorMoz = window.OrientationEvent !== undefined;
				this.useSensor = this.useSensorWebkit || this.useSensorMoz;
			}
			if (this.options.useMouseMove && !this.isMobile) {
				this.useMouseMove = this.$viewportElement.mousemove !== undefined;
			}
		},
		_findElements: function() {
			var self = this;

			if (this.elements !== undefined) {
				for (var i = this.elements.length - 1; i >= 0; i--) {
					this.elements[i].$element.data('parallaxify-ElementIsActive', undefined);
				}
			}

			this.elements = [];

			if(!this.options.parallaxElements) return;

			this.$element.find('[data-parallaxify-range],[data-parallaxify-range-x],[data-parallaxify-range-y]').each(function(i) {
				var $this = $(this);

				if (!$this.data('parallaxify-ElementIsActive')) {
					$this.data('parallaxify-ElementIsActive', this);
				} else if ($this.data('parallaxify-ElementIsActive') !== this) {
					return; // stop, because already set previously
				}

				// saving/restoring original positions
				if (!$this.data('parralaxify-originalLeft')) {
					$this.data('parallaxify-originalLeft', $this.css('left'));
					$this.data('parallaxify-originalTop', $this.css('top'));
				} else {
					$this.css('left', $this.data('parallaxify-originalLeft'));
					$this.css('top', $this.data('parallaxify-originalTop'));
				}

				// adding objects to element collection
				self.elements.push({
					$element: $this,
					originalPositionLeft: $this.position().left,
					originalPositionTop: $this.position().top,
					parallaxDistanceX: ($this.data('parallaxify-range-x') !== undefined ? $this.data('parallaxify-range-x') : ($this.data('parallaxify-range') !== undefined ? $this.data('parallaxify-range') : 0)),
					parallaxDistanceY: ($this.data('parallaxify-range-y') !== undefined ? $this.data('parallaxify-range-y') : ($this.data('parallaxify-range') !== undefined ? $this.data('parallaxify-range') : 0)),
					width: $this.outerWidth(true),
					height: $this.outerHeight(true)
				});
			});
		},
		_findBackgrounds: function() {
			var self = this,
				$backgroundElements;

			this.backgrounds = [];

			if(!this.options.parallaxBackgrounds) return;

			$backgroundElements = this.$element.find('[data-parallaxify-background-range],[data-parallaxify-background-range-x],[data-parallaxify-background-range-y]');

			if (this.$element.data('parallaxify-background-range') || this.$element.data('parallaxify-background-range-x') || this.$element.data('parallaxify-background-range-y')) {
				$backgroundElements = $backgroundElements.add(this.$element);
			}

			$backgroundElements.each(function() {
				var $this = $(this),
					backgroundPosition = getBackgroundPosition($this);

				if (!$this.data('parallaxify-backgroundIsActive')) {
					$this.data('parallaxify-backgroundIsActive', this);
				} else if ($this.data('parallaxify-backgroundIsActive') !== this) {
					return; // stop, because already set previously
				}

				// saving/restoring original background positions
				if (!$this.data('parralaxify-backgroundOriginalLeft')) {
					$this.data('parallaxify-backgroundOriginalLeft', backgroundPosition[0]);
					$this.data('parallaxify-backgroundOriginalTop', backgroundPosition[1]);
				} else {
					setBackgroundPosition($this, $this.data('parallaxify-backgroundOriginalLeft'), $this.data('parallaxify-backgroundOriginalTop'));
				}

				self.backgrounds.push({
					$element: $this,
					originalValueLeft: backgroundPosition[0],
					originalValueTop: backgroundPosition[1],
					originalBackgroundPositionLeft: (isNaN(parseInt(backgroundPosition[0], 10)) ? 0 : parseInt(backgroundPosition[0], 10)),
					originalBackgroundPositionTop: (isNaN(parseInt(backgroundPosition[1], 10)) ? 0 : parseInt(backgroundPosition[1], 10)),
					originalPositionLeft: $this.position().left,
					originalPositionTop: $this.position().top,
					parallaxDistanceX: ($this.data('parallaxify-background-range-x') !== undefined ? $this.data('parallaxify-background-range-x') : ($this.data('parallaxify-background-range') !== undefined ? $this.data('parallaxify-background-range') : 0)),
					parallaxDistanceY: ($this.data('parallaxify-background-range-y') !== undefined ? $this.data('parallaxify-background-range-y') : ($this.data('parallaxify-background-range') !== undefined ? $this.data('parallaxify-background-range') : 0))
				});
			});
		},
		_reset: function() {
			var element,
				originalPositionLeft,
				originalPositionTop,
				background,
				i;

			for (i = this.elements.length - 1; i >= 0; i--) {
				element = this.elements[i];
				originalPositionLeft = element.$element.data('parallaxify-originalLeft');
				originalPositionTop = element.$element.data('parallaxify-originalTop');

				this._setPosition(element.$element, originalPositionLeft, originalPositionLeft, originalPositionTop, originalPositionTop);

				element.$element.data('parallaxify-originalLeft', null).data('parallaxify-originalLeft', null).data('parallaxify-elementIsActive', null).data('parallaxify-backgroundIsActive', null);
			}

			for (i = this.backgrounds.length - 1; i >= 0; i--) {
				background = this.backgrounds[i];

				background.$element.data('parallaxify-backgroundOriginalLeft', null).data('parallaxify-backgroundOriginalTop', null).data('parallaxify-backgroundIsActive', null);

				setBackgroundPosition(background.$element, background.originalValueLeft, background.originalValueTop);
			}
		},
		destroy: function() {
			this._reset();

			if (this.useMouseMove) this.$viewportElement.unbind('mousemove.' + this.name);
			if (this.useSensorWebkit) window.removeEventListener('deviceorientation', this._handleSensorWebkit, false);
			if (this.useSensorMoz) window.removeEventListener('MozOrientation', this._handleSensorMoz, false);

			$(window).unbind('load.' + this.name).unbind('resize.' + this.name).unbind('orientationchange.' + this.name);
		},
		_processSensorData: function() {

			if (!this.useSensor) return;

			// beta is device pitch (moving up - down)
			// values are from -90 to 90
			// gamma is device roll (moving left right)
			// values are from -180 to 180

			var beta = this.beta,
				gamma = this.gamma,
				deltaBeta = 0,
				deltaGamma = 0;

			// counteract some bugs on Android where return values are 270 upon flipping the device
			if (beta > 90) beta = beta - 180;
			if (gamma > 180) gamma = gamma - 360;

			if (this.initialBeta === undefined && beta !== null) {
				this.initialBeta = beta;
				if (this.useSensor && this.options.inputPriority === 'gyroscope') {
					this.useMouseMove = false;
					if (this.useMouseMove) this.$viewportElement.unbind('mousemove.' + this.name);
				}
			}

			if (this.initialGamma === undefined && gamma !== null) {
				this.initialGamma = gamma;
				if (this.useSensor && this.options.inputPriority === 'gyroscope') {
					this.useMouseMove = false;
					if (this.useMouseMove) this.$viewportElement.unbind('mousemove.' + this.name);
				}
			}

			if (this.options.adjustBasePosition && this.initialGamma !== undefined && this.initialBeta !== undefined) {

				// adjust positions (accepting position out of range to smooth laying device upside down)
				if (gamma - this.initialGamma < -180) {
					this.initialGamma = lowPassFilter(gamma + 360, this.initialGamma, this.options.alphaPosition);
				} else if (gamma - this.initialGamma > 180) {
					this.initialGamma = lowPassFilter(gamma - 360, this.initialGamma, this.options.alphaPosition);
				} else {
					this.initialGamma = lowPassFilter(gamma, this.initialGamma, this.options.alphaPosition);
				}

				if (beta - this.initialBeta < -90) {
					this.initialBeta = lowPassFilter(beta + 180, this.initialBeta, this.options.alphaPosition);
				} else if (beta - this.initialBeta > 90) {
					this.initialBeta = lowPassFilter(beta - 180, this.initialBeta, this.options.alphaPosition);
				} else {
					this.initialBeta = lowPassFilter(beta, this.initialBeta, this.options.alphaPosition);
				}

			}

			deltaBeta = (this.initialBeta !== undefined ? beta - this.initialBeta : beta);
			deltaGamma = (this.initialGamma !== undefined ? gamma - this.initialGamma : gamma);

			if (deltaBeta > 100) {
				deltaBeta = deltaBeta - 180;
			} else if (deltaBeta < -100) {
				deltaBeta = deltaBeta + 180;
			}

			if (deltaGamma > 200) {
				deltaGamma = deltaGamma - 360;
			} else if (deltaGamma < -200) {
				deltaGamma = deltaGamma + 360;
			}

			// use low pass filter on signal
			deltaBeta = lowPassFilter(deltaBeta, this.tilt.beta, this.options.alphaFilter);
			deltaGamma = lowPassFilter(deltaGamma, this.tilt.gamma, this.options.alphaFilter);

			this.tilt.beta = deltaBeta;
			this.tilt.gamma = deltaGamma;

		},
		_repositionElements: function() {
			var moveHorizontal = this._getMoveHorizontal(),
				moveVertical = this._getMoveVertical(),
				element,
				background,
				bgLeft,
				bgTop,
				newPositionLeft,
				newPositionTop,
				i;

			if (this.currentMoveHorizontal === moveHorizontal && this.currentMoveVertical === moveVertical && this.currentWidth === this.viewportWidth && this.currentHeight === this.viewportHeight) {
				return;
			} else {
				this.currentMoveHorizontal = moveHorizontal;
				this.currentMoveVertical = moveVertical;
				this.currentWidth = this.viewportWidth;
				this.currentHeight = this.viewportHeight;
			}

			// Reposition elements
			for (i = this.elements.length - 1; i >= 0; i--) {
				element = this.elements[i];

				// New positions
				if (this.options.horizontalParallax) {
					newPositionLeft = Math.floor(moveHorizontal * element.parallaxDistanceX / 2) + element.originalPositionLeft;
				} else {
					newPositionLeft = element.originalPositionLeft;
				}

				if (this.options.verticalParallax) {
					newPositionTop = Math.floor(moveVertical * element.parallaxDistanceY / 2) + element.originalPositionTop;
				} else {
					newPositionTop = element.originalPositionTop;
				}

				this._setPosition(element.$element, newPositionLeft, element.originalPositionLeft, newPositionTop, element.originalPositionTop);

			}

			// Reposition backgrounds
			for (i = this.backgrounds.length - 1; i >= 0; i--) {
				background = this.backgrounds[i];

				bgLeft = (this.options.horizontalParallax ? Math.floor(moveHorizontal * background.parallaxDistanceX / 2)  + background.originalBackgroundPositionLeft + 'px' : background.originalValueLeft);
				bgTop = (this.options.verticalParallax ? Math.floor(moveVertical * background.parallaxDistanceY / 2)  + background.originalBackgroundPositionTop + 'px' : background.originalValueTop);

				setBackgroundPosition(background.$element, bgLeft, bgTop);
			}
		},
		_handleWindowLoadAndResize: function() {
			var self = this,
				$window = $(window);

			if (self.options.responsive) {
				$window.bind('load.' + this.name, function() {
					self.refresh();
				});
			}

			$window.bind('resize.' + this.name, function() {
				self._detectViewport();

				if (self.options.responsive) {
					self.refresh();
				}
			});

			$window.bind('orientationchange.' + this.name, function() {
				self._detectViewport();

				if (self.options.responsive) {
					self.refresh();
				}
			});
		},
		// self loading function to constantly reposition elements within each animation frame
		_startAnimation: function() {
			var self = this,
				ticking = false;

			this.beta = 0;
			this.gamma = 0;
			this.clientX = this.oldClientX = Math.round(self.viewportWidth / 2);
			this.clientY = this.oldClientY = Math.round(self.viewportHeight / 2); // */

			var update = function() {
				self._processSensorData();
				self._repositionElements();
				ticking = false;
			};

			var requestTick = function() {
				if (!ticking) {
					requestAnimationFrame(update);
					ticking = true;
				}
			};

			this._handleSensorWebkit = function(e) {
				// gamma is device roll (moving left right)
				// values are from -180 to 180
				self.gamma = e.gamma;

				// beta is device pitch (moving up - down)
				// values are from -90 to 90
				self.beta = e.beta;

				requestTick();
			};

			this._handleSensorMoz = function(e) {
				// x is device roll (moving left right)
				// values are from -1 to 1
				self.gamma = e.x * 180;

				// y is device pitch (moving up - down)
				// values are from +1 to -1
				self.beta = e.y * -90;

				requestTick();
			};

			this._handleMouseMove = function(e) {
				self.oldClientX = self.clientX;
				self.oldClientY = self.clientY;
				e.clientX !== undefined ? self.clientX = e.clientX : self.clientX = e.pageX;
				e.clientY !== undefined ? self.clientY = e.clientY : self.clientY = e.pageY;

				requestTick();
			};

			// bind sensor events to updates
			if (this.useSensorWebkit) {
				window.addEventListener('deviceorientation', self._handleSensorWebkit, false);
			} else if (this.useSensorMoz) {
				window.addEventListener('MozOrientation', self._handleSensorMoz, false);
			}
			// bind mouse move event
			if (this.useMouseMove) {
				this.$viewportElement.bind('mousemove.' + this.name, self._handleMouseMove);
			}

			requestTick();
		}
	};

	$.fn[pluginName] = function (options) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
				}
			});
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			return this.each(function () {
				var instance = $.data(this, 'plugin_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}
				if (options === 'destroy') {
					$.data(this, 'plugin_' + pluginName, null);
				}
			});
		}
	};

	$[pluginName] = function(options) {
		var $window = $(window);
		return $window[pluginName].apply($window, Array.prototype.slice.call(arguments, 0));
	};

	// Expose the position property function hashes so they can be extended
	$[pluginName].positionProperty = positionProperty;

	// Expose the motion type function hashes so they can be extended
	$[pluginName].motionType = motionType;

	// Expose the plugin class so it can be modified
	window[pluginName] = Plugin;
}(jQuery, this, document));