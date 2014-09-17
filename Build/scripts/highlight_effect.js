// Function to change the background color of an element depending on its scroll height.
// Essentially, I want the background color of selected elements to lighten as they move from the bottom of the
// screen to the top.
function silly_highlight_effect(lines) {
  var
  start_ratio   = 0.8,
  end_ratio     = 0.1;
  
  $(lines).each(function(index) {
    var line = this;

    $(window).on("scroll", function() {
      var 
      elem_top    = $(line).offset().top, 
      scroll_top  = $(window).scrollTop(),
      win_height  = $(window).height(),
      win_top;

      if ( scroll_top < elem_top < (scroll_top + win_height) ) {
        win_top = elem_top - scroll_top;
        progress_multiplier = win_top / win_height;

        if ( end_ratio < progress_multiplier && progress_multiplier < start_ratio ) {
          $(line).addClass('line_effect_highlight');
        } else {
          $(line).removeClass('line_effect_highlight');
        }
      }
    });
  });
}