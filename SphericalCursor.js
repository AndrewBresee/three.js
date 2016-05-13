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

	var targetItem; 

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

		targetItem = 0; 
		var minItemDistance = 100;



		if (intersects.length >= 1 ) {
			if (intersects[0].distance > targetItem && intersects[0].distance < MAX_DISTANCE) {

					// code attempting to update color when mouse is over one cube face
					// intersects[0].face.color.setRGB( 0.8 * Math.random() + 0.2, 0, 0 ); 
					// // this allows the target cube color face to be updated
					// intersects[0].object.geometry.colorsNeedUpdate = true;

					targetItem = intersects[0];

					var itemLocation = targetItem.object.position;

					var faceLocation = targetItem.face.normal; 

					var faceX = faceLocation.x; 
					var faceY = faceLocation.y;
					var faceZ = faceLocation.z;

					cursor.position.x = itemLocation.x;
					cursor.position.y = itemLocation.y;
					cursor.position.z = itemLocation.z;

					
					// place the cursor on the cube face
					// with slight difference for cube center
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
		} else {

			// sets the cursor to be at a certain distance 
			// if no cube is targed
			cursor.position.x = xLocation + (vectorX * 50); 
			cursor.position.y = yLocation + (vectorY * 50);
			cursor.position.z = zLocation + (vectorZ * 50);
		}


		
		// check to see if max or min are objects 
		// if minItemDistance is an object, then put the cursor there
		// else if targetItem is an object, put the cursor there
		// otherwise, put the cursor at its fixed distance.  

		// if the targetItem is an object
		// change it back to its original color; 

	}

	function onMouseMove( event ) {

		// // attempt to reset on color after cursor moves away
		// if (typeof targetItem === 'object') {
		// 	console.log("hit here")
		// 	targetItem.face.color.setRGB( 1, 1, 1 );
		// }

		// For debugging, can remove it.
		// console.log("movementX=" + movementX + ", movementY=" + movementY );

		clientX = event.clientX;
		clientY = event.clientY;

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	

		movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

	}

	return {
		update: update
	};

}();

