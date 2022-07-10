window.addEventListener('DOMContentLoaded', event => {
    console.log('hihi');

    // canvas
    let canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas);

    // context
    let c = canvas.getContext('2d');
    c.fillStyle = 'rgba(255, 0, 0, 1)';
    c.fillRect(100, 100, 50, 50); //c.fillRect(x, y, width, height);
    c.fillStyle = 'rgba(0, 255, 0, 1)';
    c.fillRect(50, 250, 120, 200);
    console.log(canvas);

    // draw lines
    c.beginPath();
    c.moveTo(0, 0); // start position
    c.lineTo(20, 100); // move line to here
    c.lineTo(150, 150);
    c.strokeStyle = "#fa34a3";
    c.stroke();

    // arc circle
    randRange = (min, max) => {
        return Math.random() * (max - min) + min;
    }
    for (let i = 0; i < 42; i++) {
        // set rand vars
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        let radius = randRange(10, 100);
        let red = randRange(0, 255);
        let green = randRange(0, 255);
        let blue = randRange(0, 255);
        // draw arc circle
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, false);
        c.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
        c.stroke();
    }
});