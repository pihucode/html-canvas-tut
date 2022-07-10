window.addEventListener('DOMContentLoaded', event => {
    console.log('hihi');

    // // canvas
    let canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas);

    // // context
    let c = canvas.getContext('2d');

    // // rectangle
    // c.fillStyle = 'rgba(255, 0, 0, 1)';
    // c.fillRect(100, 100, 50, 50); //c.fillRect(x, y, width, height);
    // c.fillStyle = 'rgba(0, 255, 0, 1)';
    // c.fillRect(50, 250, 120, 200);
    // console.log(canvas);

    // // draw lines
    // c.beginPath();
    // c.moveTo(0, 0); // start position
    // c.lineTo(20, 100); // move line to here
    // c.lineTo(150, 150);
    // c.strokeStyle = "#fa34a3";
    // c.stroke();

    // // arc circle
    randRange = (min, max) => {
        return Math.random() * (max - min) + min;
    }
    // for (let i = 0; i < 42; i++) {
    //     // set rand vars
    //     let x = Math.random() * window.innerWidth;
    //     let y = Math.random() * window.innerHeight;
    //     let radius = randRange(10, 100);
    //     let red = randRange(0, 255);
    //     let green = randRange(0, 255);
    //     let blue = randRange(0, 255);
    //     // draw arc circle
    //     c.beginPath();
    //     c.arc(x, y, radius, 0, Math.PI * 2, false);
    //     c.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
    //     c.stroke();
    // }

    // Circle object
    function Circle(x, y, dx, dy, radius, red, green, blue) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.red = red;
        this.green = green;
        this.blue = blue;

        this.draw = () => {
            c.beginPath();
            c.arc(x += dx, y += dy, radius, 0, Math.PI * 2, false);
            c.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
            c.stroke();
        }

        this.update = () => {
            this.draw();
            if (x + radius > innerWidth || x - radius < 0)
                dx = -dx;
            if (y + radius > innerHeight || y - radius < 0)
                dy = -dy;
        }
    }

    let circles = [];
    for (let i = 0; i < 42; i++) {
        let radius = randRange(10, 100);
        let red = randRange(0, 255);
        let green = randRange(0, 255);
        let blue = randRange(0, 255);
        let x = randRange(radius, innerWidth - radius);
        let y = randRange(radius, innerHeight - radius);
        let dir = Math.random() < 0.5 ? -1 : 1;
        let dx = dy = 100 / radius * randRange(0.25, 1) * dir;

        circles.push(new Circle(x, y, dx, dy, radius, red, green, blue));

    }

    animate = () => {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < circles.length; i++) {
            circles[i].update();
        }
    }
    animate();
});
