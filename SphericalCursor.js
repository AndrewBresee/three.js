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


		// this is the vector where the camera is looking
		var pointerVector = camera.getWorldDirection();


		var vectorX = pointerVector.x;
		var vectorY = pointerVector.y;
		var vectorZ = pointerVector.z;

		// make a ray that extends out from the user to the max distance
		// http://threejs.org/docs/#Reference/Math/Ray
		// if the line intersects with anything, make the cursor at that location
		// + a little 
		// make the line invisable 

		// the cursor will be at a fixed location close to the user
		// unless there is an object a certain distance away
		// if that object is within the max distance, then the cursor will go to that


		// http://threejs.org/docs/#Reference/Core/Raycaster.intersectObject
		var raycaster = new THREE.Raycaster();
		mouse = new THREE.Vector2();
		raycaster.setFromCamera( mouse, camera );	

		//Checks to see if user is interacting with a box
		var intersects = raycaster.intersectObjects( objects );
		var intersectsFloor = raycaster.intersectObjects( floorObject );

		var maxItemDistance = 0; 
		var minItemDistance = 100;  


		// if (intersectsFloor.length >= 1 ) {
		// 	var point = intersectsFloor[0].point;

		// 	if (point.y === 0 && Math.abs(point.x) < MAX_DISTANCE && Math.abs(point.z) < MAX_DISTANCE) {
		// 		console.log("touching floor at: ", point);
		// 		cursor.position.x = point.x;
		// 		cursor.position.y = point.y + 10;
		// 		cursor.position.z = point.z;
		// 	}

		// }


		if (intersects.length >= 1 ) {
			for (var i = 0; i < intersects.length; i++) {
				if (intersects[i].object.distance < minItemDistance) {
					minItemDistance = intersects[i];
				} else if (intersects[i].distance > maxItemDistance && intersects[i].distance < MAX_DISTANCE) {

					maxItemDistance = intersects[i];

					var color = maxItemDistance.object.material.color;
					var itemLocation = maxItemDistance.object.position;
					var faceLocation = maxItemDistance.face.normal; 

					var faceX = faceLocation.x; 
					var faceY = faceLocation.y;
					var faceZ = faceLocation.z;

					// place the cursor on the cube face
					// with slight difference for cube center
					cursor.position.x = itemLocation.x;
					cursor.position.y = itemLocation.y;
					cursor.position.z = itemLocation.z;

					console.log("Thing is at: ", maxItemDistance.face);

					// targets the face of the cube
					if (faceX !== 0 || faceX !== -0) {
						if (faceX > 0) {
							cursor.position.x = itemLocation.x + faceX + 9;	
						} else {
							cursor.position.x = itemLocation.x + faceX - 9;	
						}
					}
					if (faceY !== 0 || faceY !== -0) {
						if (faceY > 0) {
							cursor.position.y = itemLocation.y + faceY + 9;
						} else {
							cursor.position.y = itemLocation.y + faceY - 9;	
						}
					}
					if (faceZ !== 0 || faceZ !== -0) {
						if (faceZ > 0) {
							cursor.position.z = itemLocation.z + faceZ + 9;	
						} else {
							cursor.position.z = itemLocation.z + faceZ - 9;	
						}
					}
				} 
			}


		} else {
			// also want to add the slight movement of the mouse
			// so that it is not just in the direct center of the screen
			cursor.position.x = xLocation + (vectorX * 50); 
			cursor.position.y = yLocation + (vectorY * 50);
			cursor.position.z = zLocation + (vectorZ * 50);

		}

		

		// check to see if max or min are objects 
		// if minItemDistance is an object, then put the cursor there
		// else if maxItemDistance is an object, put the cursor there
		// otherwise, put the cursor at its fixed distance.  


	}

	function onMouseMove( event ) {

		clientX = event.clientX;
		clientY = event.clientY;

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	

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

