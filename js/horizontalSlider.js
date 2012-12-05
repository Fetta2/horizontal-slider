$(document).ready(function(){
	// get id's from all contentWrappers
	$.contentElements = document.getElementsByClassName('contentWrapper');
	$.contentArray = [];
	var count = 0;
	$.each($.contentElements, function() {
		$.contentArray.push('#' + this.id);
		count++;
	});

	// set the initial content
	$.currentContent = $.contentArray[0];
	$.dontScrollBitch = true;

	// go to the first content
	goToByScroll($.currentContent);
	dealWithRezising();

	$(window).resize(function() {
		dealWithRezising();
	});

	// clicking on one of the nav buttons
	$(".navButton").click(function(event) {
		$.dontScrollBitch = true;
		goToByScroll($(this).attr('href'));
		event.preventDefault();
	});

	$(window).scroll(function(event) {
		if ($.dontScrollBitch != true) {
			var pos = self.pageYOffset;
			var con = $($.currentContent).position().top;
			if (pos - con > 30) {
				$.dontScrollBitch = true;

				$.each($.contentArray, function(index, value) {
					if (value == $.currentContent) {
						if (parseInt(index) != $.contentArray.length - 1) {
							goToByScroll($.contentArray[parseInt(index) + 1]);
						} else {
							goToByScroll($.contentArray[parseInt(index)]);
						}
					}
				});
			} else if (con - pos > 30) {
				$.dontScrollBitch = true;

				$.each($.contentArray, function(index, value) {
					if (value == $.currentContent) {
						if (parseInt(index) != 0) {
							goToByScroll($.contentArray[parseInt(index) - 1]);
						} else {
							goToByScroll($.contentArray[parseInt(index)]);
						}
					}
				});
			}
		}
	});

	// scroll function
	function goToByScroll(id) {
		$('html,body').animate({scrollTop: $(id).offset().top}, 'slow', function() {
			$.dontScrollBitch = false;
			$(".navButton").removeClass('activ');
			$('a[href$="' + id + '"]').addClass('activ');
			$.currentContent = id;
		});
	}

	// Deal with rezising window
	function dealWithRezising() {
		var windowHeight = $(document).height();
		if (windowHeight < 900) {
			windowHeight = 900;
		}

		var contentElements = document.getElementsByClassName('contentWrapper');
		var count = 0;
		$.each(contentElements, function() {
			$(this).css('top', (count * windowHeight));
			count++;
		});
	}
});
