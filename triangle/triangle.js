const canvas = document.getElementById("triangleCanvas");
    const ctx = canvas.getContext("2d");

    const sideAInput = document.getElementById("sideA");
    const sideBInput = document.getElementById("sideB");
    const result = document.getElementById("result");

    document.getElementById("calcBtn").addEventListener("click", () => {
      const a = parseFloat(sideAInput.value);
      const b = parseFloat(sideBInput.value);
      const c = Math.sqrt(a * a + b * b);

      result.textContent = `Hypotenuse  С  = ${c.toFixed(2)}`;

      drawTriangle(a, b, c);
    });

    function drawTriangle(a, b, c) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      
      const scale = Math.min(
        (canvas.width - 50) / a,
        (canvas.height - 50) / b
      );

      
      const startX = 50;
      const startY = canvas.height - 50;

     
      const xA = startX;
      const yA = startY;

      const xB = startX + a * scale;
      const yB = startY;

      const xC = startX;
      const yC = startY - b * scale;

     
      ctx.beginPath();
      ctx.moveTo(xA, yA);
      ctx.lineTo(xB, yB);
      ctx.lineTo(xC, yC);
      ctx.closePath();

     ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
     ctx.shadowBlur = 10;
     ctx.shadowOffsetX = 5;
     ctx.shadowOffsetY = 5;

      ctx.fillStyle = "#BFFFF0";
      ctx.fill();
      ctx.strokeStyle = "#2fc7ff";
      ctx.lineWidth = 2;
      ctx.stroke();

     
      ctx.fillStyle = "black";
      ctx.font = "16px sans-serif";

     
      ctx.fillText(`a = ${a}`, (xA + xB) / 2 - 20, yA + 20);

    
      ctx.fillText(`b = ${b}`, xA - 40, (yA + yC) / 2);

     
      ctx.fillText(`c = ${c.toFixed(2)}`, (xB + xC) / 2, (yB + yC) / 2 - 10);

     
      const squareSize = 15;
      ctx.beginPath();
      ctx.moveTo(xA, yA);
      ctx.lineTo(xA + squareSize, yA);
      ctx.lineTo(xA + squareSize, yA - squareSize);
      ctx.lineTo(xA, yA - squareSize);
      ctx.closePath();
      ctx.fillStyle = "#ff0000";
      ctx.fill();
    }

   
    document.getElementById("calcBtn").click();