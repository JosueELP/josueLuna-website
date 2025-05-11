"use strict";

import * as THREE from "three";

import Stats from 'three/examples/jsm/libs/stats.module.js'; // To get FPS counter

import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

// POST-PROCESSING
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";

/////////////////////////////////////////////////////////////////////////////////
// RETROWAVE SCENE
/////////////////////////////////////////////////////////////////////////////////

/**
 * RetrowaveScene class
 * On call, sets all minimum requirement for the scene to work
 */
export var RetrowaveScene = function (scenePath, isMobile) {
	// DEFAULT ANIMATION SPEED
	// This can be changed anytime with setAnimationSpeed method (changing directly this.animationSpeed won't have any effect as the whole animation relies on shaders uniforms)
	this.animationSpeed = 12;

	// SCENE PATH
	// As relative path doesn't work properly, the user can set the scene path to be able to load graphics
	if (!scenePath) {
		scenePath = ''; // If unspecified, scenePath is an empty string
	}
	this.scenePath = scenePath;

	// DEFAULT TEXTURE RESOLUTION
	// As for the skybox, for some odd reason, 2048 are heavier than 4096 in file weight, but use less ressource... 1024 textures are really hugly, use only if required
	this.textureResolution = 2048; // Could make this dynamically editable later on

	// RESSOURCES
	// You can set all SVG files you want to load in this array...
 if (!isMobile) {
		this.svgFiles = [
			[`./${this.scenePath}svg/sun.svg`, 0, 40, -400, 0.083, 0,0,0,"sun"],
		];
 } else {
		this.svgFiles = [
			[`./${this.scenePath}svg/sun.svg`, 0, 40, -600, 0.083, 0,0,0,"sun"],
		];
 }

	// POSITION HISTORY (avoid overlaping geometries)
	this.positionHistory = [];

	// MATERIAL ARRAY (store all shaders)
	this.materialShaders = [];

	// FPS COUNTER
	// Off by default, call addFpsCounter method to enable it
	this.fpsCounterIsActive = false;

	/////////////////////////////////////////////////////////////////////////////
	// THREE SCENE BASIS

	// MOUSE/GYRO CONTROLS variables
	this.mouse = new THREE.Vector2();
	this.target = new THREE.Vector2();

	// CLOCK
	this.clock = new THREE.Clock();
	this.time = 0;

	// RENDERER (+ THREE JS CONTAINER)
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setPixelRatio(window.devicePixelRatio);
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.renderer.domElement.id = "retrowaveScene";

	// This lets the user chose where he wants to include the scene. If the id "retrowaveSceneContainer" isn't found in the DOM, it includes it in the body
	let canvas = document.getElementById("retrowaveSceneContainer");
	if (!canvas) {
		document.body.appendChild(this.renderer.domElement);
	}
	else { canvas.appendChild(this.renderer.domElement); }

	// SCENE
	this.scene = new THREE.Scene();
	this.scene.background = new THREE.Color(0xc9a298);
	// this.scene.background = null;

	// CAMERA
	this.camera = new THREE.PerspectiveCamera(
		65,  // Field of view (degrees)
		window.innerWidth / window.innerHeight,
		0.1,  // Near clipping plane
		1000  // Far clipping plane
	);
	// Change these values to bring the camera closer
	if (!isMobile) {
		this.camera.position.set(60, 8, 37);
		this.camera.lookAt(this.scene.position);
		this.scene.add(this.camera);
	} else {
		this.camera.position.set(0, 8, 37);
		this.camera.lookAt(this.scene.position);
		this.scene.add(this.camera);
	}
};

/////////////////////////////////////////////////////////////////////////////////
// SCENE PREPARATION
/////////////////////////////////////////////////////////////////////////////////

/**
 * Prepare the scene. Use this method to simplify RetrowaveScene setup
 *
 * @param {boolean} wantProceduralSky Set to true if you want to use the procedural sky (ressource intensive). Default is false (Skybox)
 * @param {boolean} wantAnimation Set to true if you want to start the animation directly. Default is false
 */
RetrowaveScene.prototype.prepareScene = function (
	wantProceduralSky = false,
	wantAnimation = false
) {
	this.autoAdjustOnResize();
	this.addControls();
	this.setPostProcessing();
	// this.addFpsCounter();

	this.addSvgGraphics();
	this.addFloor();
	this.addSidewalk();
	this.addRoad();
	this.addRoadLines();
	this.addPalmtrees();

	if (wantAnimation) {
		this.animate();
	}
};

/////////////////////////////////////////////////////////////////////////////////
// CHANGE ANIMATION SPEED
/////////////////////////////////////////////////////////////////////////////////

/**
 * Change animation speed
 *
 * @param {number} speed The wanted speed. Default is 15
 */
RetrowaveScene.prototype.setAnimationSpeed = function (speed = 15) {
	this.animationSpeed = speed;
	for (let i = 0; i < this.materialShaders.length; i++) {
		this.materialShaders[i].uniforms.speed.value = speed;
	}
};

/////////////////////////////////////////////////////////////////////////////////
// FPS COUNTER
/////////////////////////////////////////////////////////////////////////////////

/**
 * Add and enable THREE FPS counter
 */
RetrowaveScene.prototype.addFpsCounter = function () {
	this.stats = new Stats();
	document.body.appendChild(this.stats.dom);
	this.fpsCounterIsActive = true;
};

/**
 * Remove and disable THREE FPS counter
 */
RetrowaveScene.prototype.removeFpsCounter = function () {
	document.body.removeChild(this.stats.dom);
	this.fpsCounterIsActive = true;
};

/////////////////////////////////////////////////////////////////////////////////
// AUTO-ADJUST ON RESIZE
/////////////////////////////////////////////////////////////////////////////////

/**
 * Event listener to adjust scene width/height according to window size (responsive)
 */
RetrowaveScene.prototype.autoAdjustOnResize = function () {
	window.onresize = onresizefunction.bind(this);
	function onresizefunction() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(this.width, this.height);
		this.composer.setSize(this.width, this.height);
	}
};

/////////////////////////////////////////////////////////////////////////////////
// POST-PROCESSING
/////////////////////////////////////////////////////////////////////////////////

/**
 * Enable all post-processing effects
 */
RetrowaveScene.prototype.setPostProcessing = function () {
	// RENDER PASS
	this.renderScene = new RenderPass(this.scene, this.camera);

	// BLOOM PASS
	this.renderer.toneMapping = THREE.ReinhardToneMapping; // Necessary for bloom pass (or it gets overexposed), other options available (but all overexposed by default)
	this.renderer.toneMappingExposure = Math.pow(1, 4.0);

	this.bloomPass = new UnrealBloomPass(
		new THREE.Vector2(window.innerWidth, window.innerHeight),
		1.5,
		0,
		0.8
	); // Settings here appear to have no effect

  this.bloomPass.strength = 0.4; // Reduced from 1.5
  this.bloomPass.threshold = 0.2; // Increased from 0
  this.bloomPass.radius = 0.5; // Reduced from 0.8

	// GLITCH PASS
	this.glitchPass = new GlitchPass();

	// CRT EFFECT (FILM PASS)
	this.effectFilm = new FilmPass(
		0.2, // noise intensity
		0.75, // scanline intensity
		2048, // scanline count
		false // grayscale
	);

	// COMPOSER (MERGE RENDER PASS: Render, Bloom...)
	this.composer = new EffectComposer(this.renderer);
	this.composer.addPass(this.renderScene);
	this.composer.addPass(this.bloomPass);
	this.composer.addPass(this.glitchPass);
	this.glitchPass.enabled = false; // Disables glitch pass by defaults in order to control how often it happens
	this.composer.addPass(this.effectFilm);
};

/////////////////////////////////////////////////////////////////////////////////
// FLOOR
/////////////////////////////////////////////////////////////////////////////////

/**
 * Add the floor (grid) to the scene
 */
// 2. Change the floor material to a darker color for contrast
RetrowaveScene.prototype.addFloor = function () {
  let floorGeometry = new THREE.PlaneBufferGeometry(300, window.innerWidth, 0, 0);
  floorGeometry.translate(0, 110, 0);
  floorGeometry.rotateX(-Math.PI * 0.5);
  let floorMaterial = new THREE.MeshBasicMaterial({
    color: 0xfff0e5,
  });
  this.createGridMaterial(floorMaterial);

  // Add floor to scene
  this.grid = new THREE.Mesh(floorGeometry, floorMaterial);
  this.scene.add(this.grid);
};

/////////////////////////////////////////////////////////////////////////////////
// ROAD
/////////////////////////////////////////////////////////////////////////////////

/**
 * Add the road (semi-transparent) to the scene
 */
RetrowaveScene.prototype.addRoad = function () {
	let roadGeometry = new THREE.PlaneBufferGeometry(12, window.innerWidth, 0, 0);
	roadGeometry.translate(0, 110, 0.1);
	roadGeometry.rotateX(-Math.PI * 0.5);

	// Change the road material color to black
	let roadMaterial = new THREE.MeshBasicMaterial({
		color: 0x000000, // Changed from 0x03353b
		transparent: true,
		opacity: 0.7,
	});

	// Add road to scene
	this.road = new THREE.Mesh(roadGeometry, roadMaterial);
	this.scene.add(this.road);
};

/////////////////////////////////////////////////////////////////////////////////
// ROAD LINES
/////////////////////////////////////////////////////////////////////////////////

/**
 * Add road lines to the scene
 */
RetrowaveScene.prototype.addRoadLines = function () {
	let roadLineLeftGeometry = new THREE.PlaneBufferGeometry(0.35, 300, 0, 0);
	roadLineLeftGeometry.translate(-5.2, 110, 0.2);
	roadLineLeftGeometry.rotateX(-Math.PI * 0.5);

	let roadLineRightGeometry = new THREE.PlaneBufferGeometry(0.35, 300, 0, 0);
	roadLineRightGeometry.translate(5.2, 110, 0.2);
	roadLineRightGeometry.rotateX(-Math.PI * 0.5);

	let roadLineCenterLeftGeometry = new THREE.PlaneBufferGeometry(
		0.15,
		300,
		0,
		0
	);
	roadLineCenterLeftGeometry.translate(-1.8, 110, 0.2);
	roadLineCenterLeftGeometry.rotateX(-Math.PI * 0.5);

	let roadLineCenterRightGeometry = new THREE.PlaneBufferGeometry(
		0.15,
		300,
		0,
		0
	);
	roadLineCenterRightGeometry.translate(1.8, 110, 0.2);
	roadLineCenterRightGeometry.rotateX(-Math.PI * 0.5);

	// Merge all road lines geometries
	let roadLinesConception = [];
	roadLinesConception.push(roadLineLeftGeometry);
	roadLinesConception.push(roadLineRightGeometry);
	roadLinesConception.push(roadLineCenterLeftGeometry);
	roadLinesConception.push(roadLineCenterRightGeometry); // Push all geometries into roadLinesConception array

	let roadLinesGeometry = BufferGeometryUtils.mergeBufferGeometries(
		roadLinesConception,
		false
	); // Merge all geometries within sidewalkConception array

	// Material
	let roadLineMaterial = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		transparent: true,
		opacity: 0.3,
	});

	// Add road lines to the scene
	this.roadLines = new THREE.Mesh(roadLinesGeometry, roadLineMaterial);
	this.scene.add(this.roadLines);
};

/////////////////////////////////////////////////////////////////////////////////
// SIDEWALK
/////////////////////////////////////////////////////////////////////////////////

/**
 * Add grid sidewalk to the scene
 */
RetrowaveScene.prototype.addSidewalk = function () {
	let sidewalkTopLeftGeometry = new THREE.PlaneBufferGeometry(8, window.innerWidth, 0, 0);
	sidewalkTopLeftGeometry.translate(-10, 110, 0.5);
	sidewalkTopLeftGeometry.rotateX(-Math.PI * 0.5);

	let sidewalkSideLeftGeometry = new THREE.PlaneBufferGeometry(0.5, window.innerWidth, 0, 0);
	sidewalkSideLeftGeometry.translate(0.06, 110, 6);
	sidewalkSideLeftGeometry.rotateX(-Math.PI * 0.5);
	sidewalkSideLeftGeometry.rotateZ(Math.PI * 0.49);

	let sidewalkTopRightGeometry = new THREE.PlaneBufferGeometry(8, window.innerWidth, 0, 0);
	sidewalkTopRightGeometry.translate(10, 110, 0.5);
	sidewalkTopRightGeometry.rotateX(-Math.PI * 0.5);

	let sidewalkSideRightGeometry = new THREE.PlaneBufferGeometry(0.5, window.innerWidth, 0, 0);
	sidewalkSideRightGeometry.translate(0.44, 110, -6);
	sidewalkSideRightGeometry.rotateX(-Math.PI * 0.5);
	sidewalkSideRightGeometry.rotateZ(Math.PI * 0.49);

	// Merge all sidewalk geometries
	let sidewalkConception = [];
	sidewalkConception.push(sidewalkTopLeftGeometry);
	sidewalkConception.push(sidewalkSideLeftGeometry);
	sidewalkConception.push(sidewalkTopRightGeometry);
	sidewalkConception.push(sidewalkSideRightGeometry); // Push all geometries into sidewalkConception array

	let sidewalkGeometry = BufferGeometryUtils.mergeBufferGeometries(
		sidewalkConception,
		false
	); // Merge all geometries within sidewalkConception array

	let sidewalkMaterial = new THREE.MeshBasicMaterial({
    color: 0x0078a8, // Darker blue for contrast
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9, // Increased opacity for better visibility
  });
  this.createGridMaterial(sidewalkMaterial); // Call function that sets the moving grid shader (common shader between sidewalk and floor, with different color)

	// Add sidewalk to the scene
	this.sidewalk = new THREE.Mesh(sidewalkGeometry, sidewalkMaterial);
	this.scene.add(this.sidewalk);
};

/////////////////////////////////////////////////////////////////////////////////
// PALMTREES
/////////////////////////////////////////////////////////////////////////////////

RetrowaveScene.prototype.addPalmtrees = function () {
	let palmTreeConception = [];

	// Paltree log
	var logGeometry = new THREE.CylinderBufferGeometry(
		0.25,
		0.125,
		10,
		5,
		4,
		true
	);
	logGeometry.translate(0, 5, 0);
	palmTreeConception.push(logGeometry);
	// Palmtree leaves
	for (let i = 0; i < 35; i++) {
		let leavesGeometry = new THREE.CircleBufferGeometry(1.25, 4);
		leavesGeometry.translate(0, 1.25, 0);
		leavesGeometry.rotateX(-Math.PI * 0.5);
		leavesGeometry.scale(0.25, 1, THREE.Math.randFloat(1, 1.5));
		leavesGeometry.attributes.position.setY(0, 0.25);
		leavesGeometry.rotateX(THREE.Math.randFloatSpread(Math.PI * 0.5));
		leavesGeometry.rotateY(THREE.Math.randFloat(0, Math.PI * 2));
		leavesGeometry.translate(0, 10, 0);
		palmTreeConception.push(leavesGeometry);
	}

	// Merge (log + leaves)
	var palmTree = BufferGeometryUtils.mergeBufferGeometries(
		palmTreeConception,
		false
	);
	palmTree.rotateZ(THREE.Math.degToRad(-1.5));

	var palmTreeInstance = new THREE.InstancedBufferGeometry();
	palmTreeInstance.attributes.position = palmTree.attributes.position;
	palmTreeInstance.attributes.uv = palmTree.attributes.uv;
	palmTreeInstance.index = palmTree.index;
	var palmTreePosition = [];

	for (let i = 0; i < 40; i++) {
		var resultLeft = -this.randomize(20, 80, 1); // Left side
		var resultRight = this.randomize(20, 80, 2); // Right side

		palmTreePosition.push(-10, 0, i * 2 * 15 - 10 - 50);
		palmTreePosition.push(10, 0, i * 2 * 15 - 50);
		palmTreePosition.push(resultLeft, 0, i * 2 * 15 - resultLeft - 50);
		palmTreePosition.push(resultRight, 0, i * 2 * 15 + resultRight - 50);
	}

	palmTreeInstance.setAttribute(
		"instPosition",
		new THREE.InstancedBufferAttribute(new Float32Array(palmTreePosition), 3)
	);

	// Change the palm tree color to black
  var palmTreeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000, // Darker green for contrast 0x004010
    side: THREE.DoubleSide,
    wireframe: true,
  });

  palmTreeMaterial.onBeforeCompile = (shader) => {
    // Increase these values to make palm trees travel further before resetting
    // Original values were: 600, 500
    this.prepareShader(shader, 1200, 1000, undefined, 0.8, true);
  };

	// Add palm trees to the scene
	var palmTrees = new THREE.Mesh(palmTreeInstance, palmTreeMaterial);
	this.scene.add(palmTrees);
};

/////////////////////////////////////////////////////////////////////////////////
// CHECK POSITION HISTORY
/////////////////////////////////////////////////////////////////////////////////

RetrowaveScene.prototype.checkPositionHistory = function (
	sizeOfGeometry,
	currentPositionX,
	currentPositionZ
) {
	let overlapDetected = false;
	let currentSize;

	if (sizeOfGeometry != undefined) {
		currentSize = sizeOfGeometry; // As X and Z are at the center, we divide the current size by two
	} else {
		currentSize = 1;
	}

	for (let i = 0; i < this.positionHistory.length; i++) {
		if (
			// if current position + current size overlaps with previously set positions (-/+) their own size
			currentPositionX + currentSize >
			this.positionHistory[i].positionX - this.positionHistory[i].size &&
			currentPositionZ + currentSize >
			this.positionHistory[i].positionZ - this.positionHistory[i].size &&
			currentPositionX - currentSize <
			this.positionHistory[i].positionX + this.positionHistory[i].size &&
			currentPositionZ - currentSize <
			this.positionHistory[i].positionZ + this.positionHistory[i].size
		) {
			overlapDetected = true;
		}
	}
	return overlapDetected;
};

/**
 * This method loads SVG elements and add them to the scene
 *
 * @param {!string} svgUrl URL to your svg file. Mandatory
 * @param {number} positionX X position of your SVG (according to its center). Default is 0
 * @param {number} positionY Y position of your SVG (according to its center). Default is 0
 * @param {number} positionZ Z position of your SVG. Default is 0
 * @param {number} scale Size of your SVG. Default is 1
 * @param {number} rotationX Rotation around X axis in radians. Default is 0
 * @param {number} rotationY Rotation around Y axis in radians. Default is 0
 * @param {number} rotationZ Rotation around Z axis in radians. Default is 0
 * @param {string} objectName Name of your SVG in the scene. Default is 'svg'
 */
RetrowaveScene.prototype.loadSvgGraphics = async function (
	svgUrl,
	positionX = 0,
	positionY = 0,
	positionZ = 0,
	scale = 1,
	rotationX = 0,
	rotationY = 0,
	rotationZ = 0,
	objectName = "svg"
) {
	if (svgUrl === null || svgUrl === undefined || svgUrl === "") {
		console.error("You must specify an URL for your SVG file");
	}

	// Function to convert the SVGLoader into a promise loader, as otherwise SVG elements might end-up in a wrong position (ie: city behind the sun)
	function promisifyLoader(loader, onProgress) {
		function promiseLoader(url) {
			return new Promise((resolve, reject) => {
				loader.load(url, resolve, onProgress, reject);
			});
		}

		return {
			originalLoader: loader,
			load: promiseLoader,
		};
	}

	// Convert SVGLoader into a promise, as required
	let promiseLoader = promisifyLoader(new SVGLoader());

	// Await for load, then...
	await promiseLoader
		.load(svgUrl)
		.then((data) => {
			this.svgGroup = new THREE.Group();

			this.paths = data.paths;

			// Create a parent group to handle rotations properly
			this.svgParent = new THREE.Group();
			this.scene.add(this.svgParent);
			this.svgParent.name = objectName;

			for (var i = 0; i < this.paths.length; i++) {
				this.path = this.paths[i];

				this.fillColor = this.path.userData.style.fill;
				if (this.fillColor !== undefined && this.fillColor !== "none") {
					this.svgMaterial = new THREE.MeshBasicMaterial({
						color: new THREE.Color().setStyle(this.fillColor),
						opacity: this.path.userData.style.fillOpacity,
						transparent: this.path.userData.style.fillOpacity < 1,
						side: THREE.DoubleSide,
						depthWrite: false,
					});

					this.svgShapes = this.path.toShapes(true);

					for (var j = 0; j < this.svgShapes.length; j++) {
						this.svgShape = this.svgShapes[j];

						// Use ShapeGeometry instead of ShapeBufferGeometry (which is deprecated)
						this.svgGeometry = new THREE.ShapeGeometry(this.svgShape);
						this.svgMesh = new THREE.Mesh(this.svgGeometry, this.svgMaterial);

						this.svgGroup.add(this.svgMesh);
					}
				}
			}

			// Add the SVG group to the parent
			this.svgParent.add(this.svgGroup);

			// Set scale (apply scale before calculating bounding box)
			this.svgGroup.scale.x = scale;
			this.svgGroup.scale.y = -scale; // Flip vertically as SVGLoader loads SVGs upside-down

			// Get SVG shape size to center it
			this.svgInfo = new THREE.Box3().setFromObject(this.svgGroup);
			this.svgSize = this.svgInfo.getSize(new THREE.Vector3());

			// Center SVG shape on X/Y axis
			this.svgGroup.position.x = -this.svgSize.x / 2;
			this.svgGroup.position.y = this.svgSize.y / 2;
			
			// Apply rotations to the parent group (which will affect the SVG)
			this.svgParent.rotation.x = rotationX;
			this.svgParent.rotation.y = rotationY;
			this.svgParent.rotation.z = rotationZ;
			
			// Set the final position of the parent group
			this.svgParent.position.set(positionX, positionY, positionZ);
		})
		.catch((err) => {
			console.error(err);
		});
};

/**
 * Add SVG graphics to the scene
 *
 * Does not receive any parameters as all urls and settings are set in the class itself
 */
RetrowaveScene.prototype.addSvgGraphics = async function () {
	for (let i = 0; i < this.svgFiles.length; i++) {
		await this.loadSvgGraphics(
			this.svgFiles[i][0],
			this.svgFiles[i][1],
			this.svgFiles[i][2],
			this.svgFiles[i][3],
			this.svgFiles[i][4],
			this.svgFiles[i][5]
		);
	}
};

/////////////////////////////////////////////////////////////////////////////////
// SHADER TOOLBOX
/////////////////////////////////////////////////////////////////////////////////

RetrowaveScene.prototype.createGridMaterial = function (materialVar) {
	materialVar.onBeforeCompile = (shader) => {
		shader.uniforms.speed = {
			value: this.animationSpeed,
		};
		shader.uniforms.time = {
			value: 0,
		};
		shader.vertexShader =
			`
      uniform float speed;
			uniform float time;
			varying vec3 vPos;
			` + shader.vertexShader;
		shader.vertexShader = shader.vertexShader.replace(
			`#include <begin_vertex>`,
			`#include <begin_vertex>

				vec2 tuv = uv;
				float t = time * 0.001 * speed;
				vPos = transformed;
				`
		);
		shader.fragmentShader =
			`
			#extension GL_OES_standard_derivatives : enable

      uniform float speed;
			uniform float time;
			varying vec3 vPos;

			float line(vec3 position, float width, vec3 step){
				vec3 tempCoord = position / step;

				vec2 coord = tempCoord.xz;
				coord.y -= time * speed / 2.;

				vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord * width);
				float line = min(grid.x, grid.y);

				return min(line, 1.0);
			}
			` + shader.fragmentShader;
			shader.fragmentShader = shader.fragmentShader.replace(
				`gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
				`
					float l = line(vPos, 1.0, vec3(2.0)); // grid line width
					vec3 backgroundColor = vec3(1.0, 0.941, 0.898); // #fff0e5 in RGB
					
					// Use the material's color for the grid lines, but make them darker for contrast
					vec3 gridColor = outgoingLight * 0.6; // Darken the grid color
					
					// Mix the grid color with the background based on the line value
					vec3 c = mix(gridColor, backgroundColor, 1.0 - l);
					
					gl_FragColor = vec4(c, diffuseColor.a);
				`
			);
		this.materialShaders.push(shader);
	};
};

/**
 * Prepare Shader method, made to avoid code repetition
 *
 * @param {object} shader The material you're compiling the shader for
 * @param {number} value1 Distance related
 * @param {number} value2 Distance related
 * @param {string|number} transformedY The scale on Y axis. Default is '1.'. Use a string ended with your number ended with a dot if it's an INT, or simply the value if it's a FLOAT
 * @param {string|number} scale The scale of your object. Default is '3.'. Use a string ended with your number ended with a dot if it's an INT, or simply the value if it's a FLOAT
 * @param {boolean} wantFlip Set to true if you want your objects to be flipped on either sides. Default is false. Only usefull with palm trees
 */
RetrowaveScene.prototype.prepareShader = function (
	shader,
	value1,
	value2,
	transformedY = "1.",
	scale = "3.",
	wantFlip = false
) {
	let transformedX = "";
	if (wantFlip) {
		transformedX = "transformed.x *= sign(instPosition.x);";
	}

	shader.uniforms.speed = {
		value: this.animationSpeed,
	};
	shader.uniforms.time = {
		value: 0,
	};
	shader.vertexShader =
		`
        uniform float speed;
    	uniform float time;
    	attribute vec3 instPosition;
    	` + shader.vertexShader;
	shader.vertexShader = shader.vertexShader.replace(
		`#include <begin_vertex>`,
		`#include <begin_vertex>

            ${transformedX}
    		vec3 ip = instPosition;
    		ip.z = mod(ip.z + time * speed, ${value1}.) - ${value2}.; //ip.z = mod(ip.z + time * 15., 1250.) - 1100.;
            transformed *= ${scale};
            transformed.y *= ${transformedY};
    		transformed += ip;
    		`
	);
	this.materialShaders.push(shader);
};

/////////////////////////////////////////////////////////////////////////////////
// ANIMATION
/////////////////////////////////////////////////////////////////////////////////

RetrowaveScene.prototype.animate = function () {
	// Launch animation
	requestAnimationFrame(this.animate.bind(this));

	this.time += this.clock.getDelta();

	// FPS stats update (only if activated)
	if (this.fpsCounterIsActive) {
		this.stats.update();
	}

	this.materialShaders.forEach((m) => {
		m.uniforms.time.value = this.time;
	});

	this.composer.render();
};

// REDUCE GLITCH PASS INTERVAL (by default it runs way too often)
RetrowaveScene.prototype.reduceGlitchPassInterval = function () {
	if (this.glitchPass.enabled == false) {
		// Enables glitch pass every 30 seconds
		let timeout = setTimeout(enableGlithPass.bind(this), 30000);

		function enableGlithPass() {
			this.glitchPass.enabled = true;
			this.reduceGlitchPassInterval();
		}
	} else if (this.glitchPass.enabled == true) {
		// Disables glitch pass after 5 seconds
		let timeout = setTimeout(disableGlithPass.bind(this), 5000);

		function disableGlithPass() {
			this.glitchPass.enabled = false;
			this.reduceGlitchPassInterval();
		}
	}
};

/////////////////////////////////////////////////////////////////////////////////
// CAMERA CONTROLS
/////////////////////////////////////////////////////////////////////////////////
// Mouse on PC, motion on mobile

RetrowaveScene.prototype.addControls = function () {
	// Event listener to move camera according to mouse position
	document.addEventListener("mousemove", onMouseMove.bind(this), false);

	if (window.DeviceOrientationEvent) {
		window.addEventListener(
			"deviceorientation",
			motionControls.bind(this),
			false
		);
	}

	// MOUSEMOUVE MOVES CAMERA FUNCTION
	function onMouseMove(event) {
		this.mouse.x = event.clientX - window.innerWidth / 2;
		this.mouse.y = event.clientY - window.innerHeight / 2;
	}

	function motionControls(event) {
		this.y = -event.beta; // -180° -> 180° / rotation arround x axis, so it affects y axis here
		this.x = -event.gamma; // -90° -> 90° / rotation arround y axis, so it affects x axis here

		if (this.x > 90) {
			this.x = 90;
		}
		if (this.x < -90) {
			this.x = -90;
		}
		if (this.y > 90) {
			this.y = 90;
		}
		if (this.y < -90) {
			this.y = -90;
		}

		if (window.innerHeight > window.innerWidth) {
			// Portrait mode
			this.mouse.x = this.x * 20;
			this.mouse.y = (30 + this.y) * 20;
		} // Landscape mode
		else {
			this.mouse.x = this.y * 40;
			this.mouse.y = -(30 + this.x) * 15;
		}
	}
};

/////////////////////////////////////////////////////////////////////////////////
// RANDOMIZER
/////////////////////////////////////////////////////////////////////////////////
// Method to obtain random numbers (int, float, odd or even) according to its settings

RetrowaveScene.prototype.randomize = function (min, max, setting) {
	let randomResult;

	if (setting == "float") {
		// Get random float
		randomResult = Math.random() * (max - min + 1) + min;

		if (randomResult == this.previousRandomFloat) {
			do {
				randomResult = Math.random() * (max - min + 1) + min;
			} while (randomResult == this.previousRandomFloat);
			this.previousRandomFloat = randomResult;
		}
	} else if (setting == "int") {
		// Get random integer
		randomResult = Math.floor(Math.random() * (max - min + 1)) + min;

		if (randomResult == this.previousRandomInteger) {
			do {
				randomResult = Math.floor(Math.random() * (max - min + 1)) + min;
			} while (randomResult == this.previousRandomInteger);
			this.previousRandomInteger = randomResult;
		}
	} else if (setting == 1 || setting == 2) {
		// Get random integer (Odd or Even)
		randomResult = Math.floor(Math.random() * (max - min + 1)) + min;

		if (
			randomResult == this.previousOddRandomInteger ||
			randomResult == this.previousEvenRandomInteger
		) {
			if (setting == 1) {
				if (
					randomResult < this.previousOddRandomInteger + 1 &&
					randomResult > this.previousOddRandomInteger - 1
				) {
					do {
						randomResult = Math.floor(Math.random() * (max - min + 1)) + min;
					} while (
						randomResult < this.previousOddRandomInteger + 1 &&
						randomResult > this.previousOddRandomInteger - 1
					);
				}

				this.previousOddRandomInteger = randomResult;
			} else if (setting == 2) {
				if (
					randomResult < this.previousEvenRandomInteger + 1 &&
					randomResult > this.previousEvenRandomInteger - 1
				) {
					do {
						randomResult = Math.floor(Math.random() * (max - min + 1)) + min;
					} while (
						randomResult < this.previousEvenRandomInteger + 1 &&
						randomResult > this.previousEvenRandomInteger - 1
					);
				}

				this.previousEvenRandomInteger = randomResult;
			}
		}
	}

	return randomResult;
};
