   const aInput = document.getElementById("sideA");
    const bInput = document.getElementById("sideB");
    const angleInput = document.getElementById("angle");
    const results = document.getElementById("results");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    function degToRad(deg) {
      return (deg * Math.PI) / 180;
    }

    function resizeCanvas() {
      const canvasStyle = window.getComputedStyle(canvas);
      const displayWidth = parseFloat(canvasStyle.width);

     
      const displayHeight = displayWidth * (2 / 3);

      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }

    function drawParallelogram() {
      resizeCanvas();

      const a = parseFloat(aInput.value);
      const b = parseFloat(bInput.value);
      const alpha = parseFloat(angleInput.value);

      if (
        isNaN(a) ||
        isNaN(b) ||
        isNaN(alpha) ||
        a <= 0 ||
        b <= 0 ||
        alpha <= 0 ||
        alpha >= 180
      ) {
        results.innerHTML =
          "<span style='color:red;'>Please enter valid values.</span>";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const rad = degToRad(alpha);
      const sinA = Math.sin(rad);
      const cosA = Math.cos(rad);

      const area = a * b * sinA;
      const perimeter = 2 * (a + b);
      const d1 = Math.sqrt(a * a + b * b + 2 * a * b * cosA);
      const d2 = Math.sqrt(a * a + b * b - 2 * a * b * cosA);
results.innerHTML = `
  <p><strong>Area:</strong> <span style="color:red;">${area.toFixed(2)}</span></p>
  <p><strong>Perimeter:</strong> <span style="color:red;">${perimeter.toFixed(2)}</span></p>
  <p><strong>Diagonal d₁:</strong> <span style="color:red;">${d1.toFixed(2)}</span></p>
  <p><strong>Diagonal d₂:</strong> <span style="color:red;">${d2.toFixed(2)}</span></p>
`;

      
      let A = { x: 0, y: 0 };
      let B = { x: a, y: 0 };
      let D = { x: b * cosA, y: -b * sinA };
      let C = { x: D.x + a, y: D.y };

  
      const xs = [A.x, B.x, C.x, D.x];
      const ys = [A.y, B.y, C.y, D.y];
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      const width = maxX - minX;
      const height = maxY - minY;

      const scaleX = (canvas.width * 0.8) / width;
      const scaleY = (canvas.height * 0.8) / height;
      const scale = Math.min(scaleX, scaleY);
      const finalScale = Math.max(scale, 0.1);

      A = { x: (A.x - minX) * finalScale, y: (A.y - minY) * finalScale };
      B = { x: (B.x - minX) * finalScale, y: (B.y - minY) * finalScale };
      C = { x: (C.x - minX) * finalScale, y: (C.y - minY) * finalScale };
      D = { x: (D.x - minX) * finalScale, y: (D.y - minY) * finalScale };

      const centerX = (A.x + B.x + C.x + D.x) / 4;
      const centerY = (A.y + B.y + C.y + D.y) / 4;

      const offsetX = canvas.width / 2 - centerX;
      const offsetY = canvas.height / 2 - centerY;

      [A, B, C, D].forEach((p) => {
        p.x += offsetX;
        p.y += offsetY;
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);

    
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.lineTo(C.x, C.y);
      ctx.lineTo(D.x, D.y);
      ctx.closePath();

      ctx.fillStyle = "#BFF6C3";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

   
      [A, B, C, D].forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = "#000";
        ctx.fill();
      });


      ctx.fillStyle = "#000";
      ctx.font = "16px sans-serif";
      ctx.fillText("a", (A.x + B.x) / 2, A.y - 14);
      ctx.fillText("b", (A.x + D.x) / 2 - 18, (A.y + D.y) / 2);


      ctx.strokeStyle = "#ff0000";
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(C.x, C.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(B.x, B.y);
      ctx.lineTo(D.x, D.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    [aInput, bInput, angleInput].forEach((input) =>
      input.addEventListener("input", drawParallelogram)
    );
    drawParallelogram();

    window.addEventListener("resize", drawParallelogram);