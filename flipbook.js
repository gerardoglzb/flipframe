var coloring = false;
var side = 15;
var max_frame = 0;
var frame = 0;
var intervalID;
var isPlaying = false;
var brush = 4;

var matrix = [];
var colorCodes = ["211, 12, 123", "219, 180, 173", "162, 173, 145", "58, 45, 50", "255, 255, 255"];

document.getElementById("canvas").style.width = ((50*side) + (2*side)).toString(10) + "px";

function paint(square_id, brush_id, transparency) {
	//rgb(245, 141, 66, 1)
	document.getElementById(square_id).style.backgroundColor = "rgb(" + colorCodes[4-brush_id] + "," + transparency + ")";
}

function user_paint(square_id) {
	paint(square_id, brush, "1");
	square_int = square_id.substring(7, square_id.length);
	matrix[square_int][frame] = brush;
}

function initializeFrame() {
	for (i = 0; i < side*side; i++) {
		matrix[i][frame] = 0;
	}
}

function displayFrame() {
	// TODO: CHANGE TO SPAN SO YOU DON'T HAVE TO CHANGE TEXT EVERY TIME.
	document.getElementById('frame-p').innerHTML = "Frame: " + (frame+1).toString(10);
}

function addTransparentColors() {
	for (i = 0; i < side*side; i++) {
		paint("square-" + i, matrix[i][frame-1], ".4");
	}
}

function changeColors() {
	// If you add a transparency thing, don't use it during animations.
	for (i = 0; i < side*side; i++) {
		paint("square-" + i, matrix[i][frame], "1");
	}
	// if (frame > 0) {
	// 	addTransparentColors();
	// }
}

function animate() {
	if (frame < max_frame) {
		frame++;
	} else {
		frame = 0;
	}
	displayFrame();
	changeColors();
}

function createCanvas() {
	for (i = 0; i < side*side; i++) {
		matrix[i] = [0];
	}
}

function setUpCanvas() {
	for (x = 0; x < side*side; x++) {
	    var pixel = document.createElement('div');
	    pixel.className = "square";
	    pixel.id = 'square-' + x;
	    document.getElementById('canvas').appendChild(pixel);
	    var currentSquare = document.getElementById('square-' + x);
	    currentSquare.onmousedown = function(e) {
	    	id_string = e.target.id;
	    	user_paint(id_string);
	    	coloring = true;
	    }
	    currentSquare.onmouseover = function(e) {
	    	// If anything goes wrong, copy-paste the id_string thing into both parts of the conditional.
	    	id_string = e.target.id;
	    	if (coloring) {
	    		user_paint(id_string);
	    	} else {
	    		paint(id_string, brush, "1");
	    	}
	    }
	    currentSquare.onmouseout = function(e) {
	    	if (!coloring) {
	    		id_string = e.target.id;
	    		square_int = id_string.substring(7, id_string.length);
	    		paint(id_string, matrix[square_int][frame], "1");
	    	}
	    }
	}
}

function setUpPalette() {
	for (x = 0; x < 5; x++) {
		var color_sq = document.createElement('div');
		color_sq.className = "square";
		color_sq.id = 'colorSquare-' + x;
		document.getElementById('color-palette').appendChild(color_sq);
		currentSquare = document.getElementById(color_sq.id);
		currentSquare.style.backgroundColor = 'rgb(' + colorCodes[x] + ', 1)';
		currentSquare.onclick = function(e) {
			id_string = e.target.id;
			brush = 4-id_string.substring(12, id_string.length);
		}
	}
}

function setUp() {
	createCanvas();
	setUpCanvas();
	setUpPalette();
	window.onmouseup = function(e) {
  		coloring = false;
	}
}

setUp();

document.getElementById('new-frame-btn').onclick = function() {
	frame++;
	if (frame > max_frame) {
		initializeFrame();
	}
	displayFrame();
	changeColors();
	if (frame > max_frame) {
		max_frame = frame;
	}
	// TODO: ADD A SPAN SO YOU DON'T HAVE TO CHANGE THE TEXT EVERY TIME.
	document.getElementById('frame-counter').innerHTML = "Out of " + (max_frame+1).toString(10);
}

document.getElementById('last-frame-btn').onclick = function() {
	if (frame > 0) {
		frame--;
		displayFrame();
		changeColors();
	} else {
		alert("You're in the first frame, buddy.");
	}
}

var playBtn = document.getElementById('play-btn');
playBtn.onclick = function() {
	if (isPlaying) {
		clearInterval(intervalID);
		isPlaying = false;
		playBtn.innerHTML = 'Play';
	} else {
		intervalID = setInterval(animate, 150);
		isPlaying = true;
		playBtn.innerHTML = 'Stop';
	}
}

// document.onkeydown = function(e) {
// 	// CHECK FOR OTHER BROWSRES AND OS.
// 	if (e.metaKey && e.which == 90) {
// 		// DELETE LASAT DRAWING.
// 		alert("Cmd+Z");
// 	}
// }