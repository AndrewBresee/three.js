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

	var vector;
	var dir;
	var pos;

	var clientX;
	var clientY;


	window.addEventListener( "mousemove", onMouseMove );

	function update() {

	
		// this will serve as the new "origin" for the cursor
		// the cursor will then move around this point
		var currentPosition = controls.getObject().position;
		var xLocation = currentPosition.x; 
		var yLocation = currentPosition.y; 
		var zLocation = currentPosition.z;

		var pointerVector = camera.getWorldDirection();


		// // http://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z
		// vector = new THREE.Vector3();
		// vector.set(
		//     ( clientX / window.innerWidth ) * 2 - 1,
		//     - ( clientY / window.innerHeight ) * 2 + 1,
		//     -0.5 );

		// vector.unproject( camera );

		// dir = vector.sub( currentPosition ).normalize();
		// distance = - zLocation / dir.z;
		// pos = currentPosition.clone().add( dir.multiplyScalar( distance ) );

		// console.log("vector: ", vector);


		var vectorX = pointerVector.x;
		var vectorY = pointerVector.y;
		var vectorZ = pointerVector.z;

		// make something that is relative to the player
		// make a max distance and a min distance
		// this will also correspond to the raycaster hit

		cursor.position.x = xLocation + (vectorX * 50); 
		cursor.position.y = yLocation + (vectorY * 50);
		cursor.position.z = zLocation + (vectorZ * 50);

		var minX = Math.min(xLocation + vectorX, MAX_DISTANCE); 
		var minY = Math.min(yLocation + vectorY, MAX_DISTANCE);
		var minZ = Math.min(zLocation + vectorZ, MAX_DISTANCE);

		// cursor.position.x = Math.min(xLocation + vectorX, MAX_DISTANCE);
		// cursor.position.y = Math.min(yLocation + vectorY, MAX_DISTANCE);
		// cursor.position.z = zLocation + 10;

		// TODO: Write this function.

	}

	function onMouseMove( event ) {

		clientX = event.clientX;
		clientY = event.clientY;

		movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		// TODO: Write this function.

		// For debugging, can remove it.
		// console.log("movementX=" + movementX + ", movementY=" + movementY );

	}

	return {
		update: update
	};

}();

