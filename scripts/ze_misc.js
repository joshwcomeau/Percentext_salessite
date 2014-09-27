// Because we have that fancy parallax effect, an element's offset from the top changes as you scroll.
// Supply the number of sections between the element and the current position, and this will take it into account.
function anchor_scroll(target, num_of_sections) {
  target_scroll = $(target).offset().top - (PARALLAX_PADDING * num_of_sections);
  $("html, body").animate({ scrollTop: target_scroll }, 2000);

}
$(document).ready(function() {
  $("#go_to_precise").on("click", function(ev) {
    anchor_scroll("#precise_mode_anchor", 2);

  });
  $("#button_1_learn_more").on("click", function() {
    anchor_scroll("#quick_start_anchor", 3);
  });

});
