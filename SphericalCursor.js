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

		vector = new THREE.Vector3();
		vector.set(
		    ( clientX / window.innerWidth ) * 2 - 1,
		    - ( clientY / window.innerHeight ) * 2 + 1,
		    0.5 );

		vector.unproject( camera );

		// this will serve as the new "origin" for the cursor
		// the cursor will then move around this point
		var currentPosition = controls.getObject().position;
		var xLocation = currentPosition.x; 
		var yLocation = currentPosition.y; 
		var zLocation = currentPosition.z;

		dir = vector.sub( currentPosition ).normalize();
		distance = - zLocation / dir.z;
		pos = currentPosition.clone().add( dir.multiplyScalar( distance ) );

		console.log("pos: ", pos);

		// var vector = new THREE.Vector3();

		// vector.set(
		//     ( event.clientX / window.innerWidth ) * 2 - 1,
		//     - ( event.clientY / window.innerHeight ) * 2 + 1,
		//     0.5 );

		// vector.unproject( camera );

		// var dir = vector.sub( camera.position ).normalize();

		// var distance = - camera.position.z / dir.z;

		// var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );



		var vectorX = vector.x;
		var vectorY = vector.y;
		var vectorZ = vector.z;

		cursor.position.x = pos.x;
		cursor.position.y = pos.y;
		cursor.position.z = pos.z - zLocation;

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

