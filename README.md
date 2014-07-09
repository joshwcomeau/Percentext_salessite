If you want a div to take up 75% of the width, all you need to do is give it a width of 75%.

If you want a header to take up 75% of the width, you need to play with font-size until it's roughly the width you want.

(Oh, but the second you resize your window or view the page on any other device, it's a completely different relative size.)

<h2>Is that a solution in your pocket?</h2>
I'm sick of dealing with this dumb problem, so I'm writing a jQuery plugin. When it's done, you'll just need to call it, like so:

$("#main_header").textPerc(75);

This will find the font-size sweet spot to make that text take up 75% of the width, and it'll bind an event-listener to make sure it changes when the window size changes.