function render() {
  bgCanvas.patternizer(bgStripes);
}
 
// resize the canvas to the window size
function onResize(bgCanvas) {
 
  // number of pixels of extra canvas drawn
  var buffer = 100;

  // if extra canvas size is less than the buffer amount
  if (bgCanvas.width - window.innerWidth < buffer ||
    bgCanvas.height - window.innerHeight < buffer) {

    // resize the canvas to window plus double the buffer
    bgCanvas.width = window.innerWidth + (buffer * 2);
    bgCanvas.height = window.innerHeight + (buffer * 2);

    render();
  }   

}
 
function init(bgCanvas) {
    onResize(bgCanvas);
    // create a listener for resize
    // cowboy's throttle plugin keeps this event from running hog wild
    window.addEventListener('resize', $.throttle(200, onResize), false);
}
