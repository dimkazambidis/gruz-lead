
/*!
* Main code
*/
(function() {
	'Use strict'

	//===== Function for search closest element =====//
	function closest(el, selector) {
		if (Element.prototype.closest) {
			return el.closest(selector);
		}

		var parent = el;

		while (parent) {
			if (parent.matches(selector)) {
				return parent;
			}
			parent = parent.parentElement;
		}

		return parent;
	}

	//===== Popup callback =====//
	//Function popup In
	function popupIn(el) {
		var b = document.body;
		var elem = document.querySelector(el);
		var padL = window.innerWidth - b.clientWidth;

		b.classList.add('popup_on');
		b.setAttribute( 'style', 'margin-right: ' + padL + 'px' );
		elem.classList.add('active');

		setTimeout (function() {
			elem.classList.add('visible');
		}, 50);
	}

	//Function popup Out
	function popupOut(el, timeOut) {
		var b = document.body;
		var elem = document.querySelector(el);

		elem.classList.remove('visible');

		setTimeout (function() {
			b.classList.remove('popup_on');
			b.setAttribute( 'style', '' );

			document.querySelectorAll(el).forEach( function(item, i, arr) {
				item.classList.remove('active');
			});
		}, timeOut);
	}

	//Function popup Out for All
	function popupOutAll(timeOut) {
		var b = document.body;

		document.querySelectorAll('.popup').forEach( function(item, i, arr) {
			item.classList.remove('visible');

			setTimeout (function() {
				item.classList.remove('active');
			}, timeOut);
		});

		setTimeout (function() {
			b.classList.remove('popup_on');
			b.setAttribute( 'style', '' );
		}, timeOut);
	}

	//Click to activator for popup
	document.querySelectorAll('a[data-popup]').forEach( function(item, i, arr) {
		item.addEventListener('click', function(e) {
			e.preventDefault();

			var b = document.querySelector('body');
			var t = this.getAttribute('href').replace('#', '');

			if ( b.classList.contains('popup_on') ) {
				popupOut('#' + t, 600);
			} else {
				popupIn('#' + t);
			}
		});
	});

	//Close popup (click to close button)
	document.querySelectorAll('.popup-close').forEach( function(item, i, arr) {
		item.addEventListener('click', function(e) {
			e.preventDefault();

			var p = closest(this, '.popup');
			var t = p.id;

			popupOut('#' + t, 600);

			if ( t === 'product-card' ) {
				homeScroll.setPosition(0, 0);
			}
		});
	});

	//Close popup (click out of content)
	document.querySelectorAll('.popup').forEach( function(item, i, arr) {
		item.addEventListener('click', function(e) {

			var p = closest(e.target, '.popup-content');
			var t = this.id;

			if ( p ) {
				return;
			} else {
				popupOut('#' + t, 600);
				e.stopPropagation();
			}
		});
	});

	//===== Click Esc =====//
	document.addEventListener( 'keyup', function(e) {
		var b = document.querySelector('body');

		if (e.keyCode == 27) {
			if ( b.classList.contains('popup_on') ) {
				popupOutAll(600);
			}
		}
	});

	//===== Input mask =====//
	Inputmask({"mask": "+7 (999) 999-9999"}).mask(document.querySelectorAll('input[type="tel"]'));

})()

$(function() {
	//===== Scroll to Anchor =====//
	$('a[data-anchor]').on('click',function(){
		var thisId = $(this).attr('href');
		var elScroll = $(thisId).offset().top;
		$('html, body').animate({
			scrollTop: elScroll
		}, 600);
		return false;
	});
});
