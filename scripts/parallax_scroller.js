// This simple scroller separates the sections by an ever-decreasing padding-top.
var PARALLAX_PADDING = 200;

function parallax_scroller(boxes) {

  _(boxes).forEach(function(container) {        
    $(window).on("scroll load", function() {

      var 
      elem_top    = $(container).offset().top, 
      scroll_top  = $(window).scrollTop(),
      win_height  = $(window).height(),
      win_top, new_padding, padding_multiplier;

      // We only need to worry about calculations when the top of the container is inside the window.
      if ( scroll_top < elem_top < (scroll_top + win_height) ) {
        win_top = elem_top - scroll_top;
        padding_multiplier = win_top / win_height;
        new_padding = PARALLAX_PADDING * padding_multiplier;

        $(container).css("padding-top", new_padding);
      } else if (elem_top < scroll_top) {
        $(container).css("padding-top", "0px");
      }

    })
  });
}
