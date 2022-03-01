import * as THREE from 'three';
import { TextGeometry } from './node_modules/three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from './node_modules/three/examples/jsm/loaders/FontLoader.js';

function drawingCube() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    // ligth
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);


    // Geometry
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2),
    ];

    function render(time) {
        time *= 0.001;  // convert time to seconds

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

}

function drawingLines() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    const points = [];
    points.push(new THREE.Vector3(- 10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add( line );

    function makeInstance(pointA, pointB, color) {
        const material = new THREE.LineBasicMaterial({ color });

        const geometry = new THREE.BufferGeometry().setFromPoints([pointA, pointB]);
        const line = new THREE.Line(geometry, material);
        scene.add(line);
    }
    makeInstance(new THREE.Vector3(-10, 0, 0), new THREE.Vector3(0, 10, 0), 0x0000ff)
    makeInstance(new THREE.Vector3(0, 10, 0), new THREE.Vector3(10, 0, 0), 0xff0000)
    renderer.render(scene, camera);
}

// only mesh can move position
function drawingText() {
    const offset = 20;
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth - offset, window.innerHeight - offset);

    const camera = new THREE.PerspectiveCamera(
        50, (window.innerWidth - offset) / (window.innerHeight - offset), 1, 500);
    camera.position.set(0, 0, 150);
    camera.lookAt(0, 0, 0);
    const scene = new THREE.Scene();

    //  ligth
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const loader = new FontLoader();
    loader.load('./node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new TextGeometry("Hello", {
            font: font,
            size: 30,
            height: 10,
            bevelThickness: 1,
            bevelSize: 1,
            bevelEnabled: true
        });
        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, specular: 0xffffff });
        const mesh = new THREE.Mesh(textGeometry, textMaterial);
        mesh.position.x = -30;
        mesh.position.y = -10;

        scene.add(mesh);
        renderer.render(scene, camera);
    });
}

// drawingCube();
// drawingLines();
drawingText();
