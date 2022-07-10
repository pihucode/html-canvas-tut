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
    calcDistance = (x1, y1, x2, y2) => {
        let xDist = x2 - x1;
        let yDist = y2 - y1;
        return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
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

    // Variables
    let balls = [];
    let colors = [
        '#FFA69E', '#FAF3DD', '#B8F2E6',
        '#AED9E0', '#5E6472', '#BDD9BF',
        '#FFC857', '#C3D350', '#575D90',
        '#BBB6DF', '#A30B37', '#C45AB3'];

    // Objects
    function Circle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        this.draw = () => {
            c.beginPath();
            c.arc(this.x, this.y, radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
            c.stroke();
            c.closePath();
        }

        this.update = () => {
            this.draw();
        }
    }

    let circle1, circle2;
    (init = () => {
        circle1 = new Circle(300, 300, 100, 'blue');
        circle2 = new Circle(undefined, undefined, 30, 'whitesmoke');

    })();

    (animate = () => {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = "black";
        c.fillRect(0, 0, canvas.width, canvas.height);

        circle1.update();
        circle2.x = mouse.x;
        circle2.y = mouse.y;
        circle2.update();

        let dist = calcDistance(circle1.x, circle1.y, circle2.x, circle2.y);
        if (dist < circle1.radius + circle2.radius) {
            circle1.color = 'red';
        } else {
            circle1.color = 'blue';
        }
    })();

});
