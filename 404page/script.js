window.onload = function() {
	var $container = $('.bola');
	var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	var camera = new THREE.PerspectiveCamera(80,1,0.1,10000);
	var scene = new THREE.Scene();
	
	scene.add(camera);
	renderer.setSize(300,300);
	renderer.setClearColor(0xffffff, 0);
	$container.append(renderer.domElement);

	///////////////////////////////////////////////

	// Camera
	camera.position.z = 200;

	// Material
	var mat = new THREE.MeshPhongMaterial({
		color      :  new THREE.Color("rgb(255,200,0)"),
		emissive   :  new THREE.Color("rgb(0,0,0)"),
		specular   :  new THREE.Color("rgb(255,155,255)"),
		shininess  :  100,
		flatShading:  true,
		transparent: 1,
		opacity    : 1
	});

	var L1 = new THREE.PointLight( 0xffffff, 1);
	L1.position.z = 100;
	L1.position.y = 100;
	L1.position.x = 100;
	scene.add(L1);

	var L2 = new THREE.PointLight( 0xffffff, 0.8);
	L2.position.z = 200;
	L2.position.y = 400;
	L2.position.x = -100;
	scene.add(L2);

	var ball = new THREE.Mesh(new THREE.DodecahedronGeometry(80,1), mat);
	ball.rotation.z = 0.5;
	ball.position.x = 25;
	scene.add(ball);

	function update(){
		ball.rotation.x+=2/100;
		ball.rotation.y+=2/100;
	}

	// Render
	function render() {
		requestAnimationFrame(render);			
		renderer.render(scene, camera);	
		update();
	}

	render();
}