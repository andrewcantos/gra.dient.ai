import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'backgroundCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    const generateSquares = () => Array.from({ length: 150 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 100 + 20, // Random size between 20 and 120
      color: 'rgba(211, 211, 211, 0.1)', // Increased translucency for the light grey boxes
      angle: Math.random() * 360, // Random angle for rotation
    }));

    let squares = generateSquares();

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      squares.forEach((square) => {
        ctx.save();
        ctx.translate(square.x + square.size / 2, square.y + square.size / 2);
        ctx.rotate((square.angle * Math.PI) / 180);
        ctx.fillStyle = square.color; // Use fill for fully filled boxes
        ctx.fillRect(-square.size / 2, -square.size / 2, square.size, square.size);
        ctx.restore();
      });
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    squares = generateSquares(); // Regenerate squares on each page load

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.body.removeChild(canvas);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
