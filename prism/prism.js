const container = document.getElementById("three-container");

// Создаём сцену и задаём цвет фона
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFDFFC2);

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 1));

const boxGroup = new THREE.Group();
scene.add(boxGroup);

let boxMesh, boxWireframe;

function createBox(a, b, h) {
  if (boxMesh) boxGroup.remove(boxMesh);
  if (boxWireframe) boxGroup.remove(boxWireframe);

  const geometry = new THREE.BoxGeometry(a, h, b); // width, height, depth
  const material = new THREE.MeshPhongMaterial({
    color: 0xB13BFF,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  });

  boxMesh = new THREE.Mesh(geometry, material);

  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });

  boxWireframe = new THREE.Mesh(geometry.clone(), wireMaterial);

  boxGroup.add(boxMesh);
  boxGroup.add(boxWireframe);
}
function scaleToFitBox(a, b, h) {
  const boxSize = new THREE.Vector3(a, h, b);
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  // Рассчитываем размер бокса в 2D проекции (камерное пространство)
  const maxBoxSize = Math.max(boxSize.x, boxSize.y, boxSize.z);
  const fov = THREE.MathUtils.degToRad(camera.fov);
  const distance = Math.abs(camera.position.z); // расстояние до камеры
  const visibleHeight = 2 * Math.tan(fov / 2) * distance;
  const visibleWidth = visibleHeight * (containerWidth / containerHeight);

  // Подбираем масштаб так, чтобы объект занимал ~80% ширины и высоты
  const scaleX = (visibleWidth * 0.8) / boxSize.x;
  const scaleY = (visibleHeight * 0.8) / boxSize.y;
  const scaleZ = (visibleWidth * 0.8) / boxSize.z;

  const scale = Math.min(scaleX, scaleY, scaleZ);
  boxGroup.scale.set(scale, scale, scale);
}


function update() {
  const a = parseFloat(document.getElementById("length").value);
  const b = parseFloat(document.getElementById("width").value);
  const h = parseFloat(document.getElementById("height").value);

  if (isNaN(a) || isNaN(b) || isNaN(h) || a <= 0 || b <= 0 || h <= 0) {
    document.getElementById("results").innerHTML = "Please enter valid values.";
    return;
  }

  const volume = a * b * h;
  const surfaceArea = 2 * (a * b + a * h + b * h);
  document.getElementById("results").innerHTML = `
    Volume: ${volume.toFixed(2)} <br>
   Surface area: ${surfaceArea.toFixed(2)}
  `;

  createBox(a, b, h);
  scaleToFitBox(a, b, h);
}

document.getElementById("length").addEventListener("input", update);
document.getElementById("width").addEventListener("input", update);
document.getElementById("height").addEventListener("input", update);
update();

function animate() {
  requestAnimationFrame(animate);
  boxGroup.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();