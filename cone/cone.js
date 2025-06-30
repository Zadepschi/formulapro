
    const container = document.getElementById("three-container");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      1, // aspect will be updated
      0.1,
      1000
    );
    camera.position.set(6, 6, 8);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    container.appendChild(renderer.domElement);

function resizeRenderer() {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  renderer.setSize(containerWidth, containerHeight);
  camera.aspect = containerWidth / containerHeight;
  camera.updateProjectionMatrix();
}
    resizeRenderer();

    window.addEventListener("resize", () => {
      resizeRenderer();
      fitCameraToObject(camera, coneGroup, 1.4);
    });

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const coneGroup = new THREE.Group();
    scene.add(coneGroup);

    let coneMesh, coneWireframe, radiusLine, heightLine;

    function createCone(r, h) {
      if (coneMesh) coneGroup.remove(coneMesh);
      if (coneWireframe) coneGroup.remove(coneWireframe);

      const geometry = new THREE.ConeGeometry(r, h, 32, 1, true);
      const material = new THREE.MeshPhongMaterial({
        color: 0xffa500,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
      });

      coneMesh = new THREE.Mesh(geometry, material);
      coneMesh.position.y = h / 2;

      const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });

      coneWireframe = new THREE.Mesh(geometry.clone(), wireMaterial);
      coneWireframe.position.y = h / 2;

      coneGroup.add(coneMesh);
      coneGroup.add(coneWireframe);
    }

    function createLine(start, end, color) {
      const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
      const material = new THREE.LineBasicMaterial({ color });
      return new THREE.Line(geometry, material);
    }

    function fitCameraToObject(camera, object, offset = 1.4) {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = THREE.MathUtils.degToRad(camera.fov);
      let cameraZ = (maxDim / 2) / Math.tan(fov / 2);
      cameraZ *= offset;

      camera.position.set(center.x, center.y, cameraZ);
      camera.lookAt(center);
      camera.updateProjectionMatrix();
    }

    function update() {
      const r = parseFloat(document.getElementById("radius").value);
      const h = parseFloat(document.getElementById("height").value);
      if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) {
        document.getElementById("results").innerHTML = "Введите корректные значения.";
        return;
      }

      const l = Math.sqrt(r * r + h * h);
      const volume = (1 / 3) * Math.PI * r * r * h;
      const surfaceArea = Math.PI * r * (r + l);
      document.getElementById("results").innerHTML = `
        Volume: ${volume.toFixed(2)} <br>
        Surface Area: ${surfaceArea.toFixed(2)}
      `;

      createCone(r, h);

      const maxSize = Math.max(2 * r, h);
      const desiredSize = 8;
      const scale = (desiredSize * 0.8) / maxSize;
      coneGroup.scale.set(scale, scale, scale);

      if (radiusLine) scene.remove(radiusLine);
      if (heightLine) scene.remove(heightLine);

      radiusLine = createLine(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(r, 0, 0),
        0xff0000
      );
      radiusLine.scale.set(scale, scale, scale);
      scene.add(radiusLine);

      heightLine = createLine(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, h, 0),
        0x00ff00
      );
      heightLine.scale.set(scale, scale, scale);
      scene.add(heightLine);

      fitCameraToObject(camera, coneGroup, 1.4);
    }

    document.getElementById("radius").addEventListener("input", update);
    document.getElementById("height").addEventListener("input", update);
    update();

    function animate() {
      requestAnimationFrame(animate);
      coneGroup.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();