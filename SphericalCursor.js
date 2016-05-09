var SphericalCursor = function() {

	// This class uses Javascript module pattern.

	// CONSTANTS - defaults, adjust if needed
	var SENSITIVITY = 500;              // to adjust how sensitive the mouse control is
	var DISTANCE_SCALE_FACTOR = -0.05;  // to scale down the cursor based on its collision distance
	var DEFAULT_CURSOR_SCALE = 0.6;     // scale to set the cursor if no raycast hit is found
	var MAX_DISTANCE = 100;             // maximum distance to raycast
	var SPHERE_RADIUS = 1000;           // sphere radius to project cursor onto if no raycast hit

	var movementX;
	var movementY;
	var movementZ;

	window.addEventListener( "mousemove", onMouseMove );

	function update() {

		var currentPosition = controls.getObject().position;
		var xLocation = currentPosition.x + movementX;
		var yLocation = currentPosition.y; 
		var zLocation = currentPosition.z;

		cursor.position.x = xLocation;
		cursor.position.y = yLocation;
		cursor.position.z = zLocation + 10;

		// TODO: Write this function.


	}

	function onMouseMove( event ) {

		movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		// TODO: Write this function.

		// For debugging, can remove it.
		console.log("movementX=" + movementX + ", movementY=" + movementY );

	}

	return {
		update: update
	};

}();

