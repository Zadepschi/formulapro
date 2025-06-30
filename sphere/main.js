    window.addEventListener('DOMContentLoaded', () => {
      const container = document.getElementById("three-container");

      let sphere, radiusCylinder, label;
      let scene, camera, renderer;
      let texture, ctx, canvas;

      init();

      function init() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.set(1.2, 1.2, 2.5);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setClearColor(0x141313, 0.6);
        container.appendChild(renderer.domElement);

        canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 64;
        ctx = canvas.getContext('2d');

        texture = new THREE.CanvasTexture(canvas);

        const labelMaterial = new THREE.SpriteMaterial({ map: texture });
        label = new THREE.Sprite(labelMaterial);
        scene.add(label);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        createObjects();

        animate();
      }

      function createObjects() {
        // Удаляем старые объекты, если есть
        if (sphere) {
          scene.remove(sphere);
          sphere.geometry.dispose();
          sphere.material.dispose();
        }

        if (radiusCylinder) {
          scene.remove(radiusCylinder);
          radiusCylinder.geometry.dispose();
          radiusCylinder.material.dispose();
        }

        // Проверяем текущую ширину экрана
        const isMobile = window.innerWidth <= 700;
        const sphereRadius = isMobile ? 0.9 : 1;

        // Сфера
        const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 24, 24);
        const sphereMaterial = new THREE.MeshBasicMaterial({
          color: 0x2fc7ff,
          wireframe: true,
          opacity: 0.3,
          transparent: true
        });
        sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);

        // Радиус (цилиндр)
        const radiusLength = sphereRadius;
        const radiusGeometry = new THREE.CylinderGeometry(0.013, 0.013, radiusLength, 16);
        radiusGeometry.translate(0, radiusLength / 2, 0);

        const radiusMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        radiusCylinder = new THREE.Mesh(radiusGeometry, radiusMaterial);
        radiusCylinder.rotation.z = Math.PI / 2;
        radiusCylinder.position.set(0, 0, 0);
        scene.add(radiusCylinder);

        // Обновляем надпись
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff0000';
        ctx.font = isMobile ? '60px Arial' : '30px Arial';
        ctx.fillText('R', 50, 50);
        texture.needsUpdate = true;

        label.position.set(sphereRadius + 0.1, 0.2, 0);
        label.scale.set(
          isMobile ? 0.3 : 0.6,
          isMobile ? 0.15 : 0.3,
          1
        );
      }

      function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.005;
        radiusCylinder.rotation.y += 0.005;
        label.rotation.y += 0.005;
        renderer.render(scene, camera);
      }

      window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);

        createObjects();
      });

      // Вызываем resize при первой загрузке
      window.dispatchEvent(new Event('resize'));
    });