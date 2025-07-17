 const canvas = document.getElementById("circleCanvas");
    const ctx = canvas.getContext("2d");
    const radiusInput = document.getElementById("radius");
    const angleInput = document.getElementById("angle");
    const result = document.getElementById("result");

    document.getElementById("calcBtn").addEventListener("click", () => {
      const r = parseFloat(radiusInput.value);
      const angle = parseFloat(angleInput.value);

      const area = Math.PI * r * r;
      const arcLength = (2 * Math.PI * r) * (angle / 360);

      result.innerHTML = `
        Area S = ${area.toFixed(2)}<br>
        Arc length L = ${arcLength.toFixed(2)}
      `;

      drawCircle(r, angle);
    });

    function drawCircle(r, angleDeg) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // масштабируем радиус так, чтобы круг занимал 80% canvas
      const maxRadius = (canvas.width / 2) * 0.8;
      const scale = maxRadius / r;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scaledRadius = r * scale;

      // рисуем полную окружность
      ctx.beginPath();
      ctx.arc(centerX, centerY, scaledRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "#2fc7ff33";
      ctx.fill();
      ctx.strokeStyle = "#2fc7ff";
      ctx.lineWidth = 3;
      ctx.stroke();

     
      if (angleDeg > 0) {
        const startAngle = 0;
        const endAngle = (angleDeg * Math.PI) / 180;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, scaledRadius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = "#ff000055";
        ctx.fill();

       
        const midAngle = startAngle + (endAngle - startAngle) / 2;
        const labelX = centerX + (scaledRadius / 2) * Math.cos(midAngle);
        const labelY = centerY + (scaledRadius / 2) * Math.sin(midAngle);

        ctx.fillStyle = "#333";
        ctx.font = "16px Ubuntu Mono";
        ctx.fillText(`${angleDeg}°`, labelX, labelY);
      }

    
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + scaledRadius, centerY);
      ctx.strokeStyle = "#ff0000";
      ctx.lineWidth = 2;
      ctx.stroke();

    
      ctx.fillStyle = "#333";
      ctx.font = "16px Ubuntu Mono";
      ctx.fillText(`r = ${r}`, centerX + scaledRadius / 2 - 10, centerY - 10);
    }

   
    document.getElementById("calcBtn").click();