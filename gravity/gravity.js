window.addEventListener('DOMContentLoaded', event => {
    console.log('hihi');

    // canvas
    let canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas);

    // context
    let c = canvas.getContext('2d');
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Utility functions
    randRange = (min, max) => {
        return Math.random() * (max - min) + min;
    }
    randRangeInt = (min, max) => {
        return Math.floor(randRange(min, max));
    }
    randColor = (cols) => {
        return cols[randRangeInt(0, cols.length)];
    }

    let mouse = {
        x: undefined,
        y: undefined
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    window.addEventListener('click', (event) => {
        init();
    });

    // Variables
    let gravity = 0.5;
    let friction = 0.9;
    let balls = [];
    let colors = [
        '#FFA69E', '#FAF3DD', '#B8F2E6',
        '#AED9E0', '#5E6472', '#BDD9BF',
        '#FFC857', '#C3D350', '#575D90',
        '#BBB6DF', '#A30B37', '#C45AB3'];

    // Objects
    function Ball(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;

        this.draw = () => {
            c.beginPath();
            c.arc(x, y, radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
            c.stroke();
            c.closePath();
        }

        this.update = () => {
            if (y + radius + dy > canvas.height) dy = -dy * friction;
            else dy += gravity;

            if (x + radius + dx > canvas.height || x - radius < 0) dx = -dx;

            x += dx;
            y += dy;
            this.draw();
        }
    }

    (init = () => {
        balls = [];
        for (let i = 0; i < 42; i++) {
            let radius = randRangeInt(10, 50);
            let x = randRangeInt(radius, canvas.width - radius);
            let y = randRange(radius, canvas.height - radius);
            let color = randColor(colors);
            let dx = randRangeInt(-2, 2);
            let dy = randRangeInt(-2, 2);
            balls.push(new Ball(x, y, dx, dy, radius, color));
        }
    })();

    (animate = () => {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = "black";
        c.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < balls.length; i++) {
            balls[i].update();
        }
    })();

});
