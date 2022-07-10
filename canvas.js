window.addEventListener('DOMContentLoaded', event => {
    console.log('hihi');

    // // canvas
    let canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas);

    // // context
    let c = canvas.getContext('2d');
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

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
    });

    // Circle object
    function Circle(x, y, dx, dy, radius, red, green, blue) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.initialRadius = radius;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.color = `rgb(${red}, ${green}, ${blue})`;

        this.draw = () => {
            c.beginPath();
            c.arc(x += dx, y += dy, radius, 0, Math.PI * 2, false);
            // c.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
            c.fillStyle = this.color;
            // c.stroke();
            c.fill();
        }

        this.setRadius = (newRadius) => {
            let dr = 20;
            let maxRadius = this.initialRadius + dr;
            let minRadius = (this.initialRadius - dr) > 10 ? this.initialRadius - dr : 10;
            if (newRadius < maxRadius && newRadius > minRadius)
                radius = newRadius;
        }

        this.update = () => {
            if (x + radius > innerWidth || x - radius < 0)
                dx = -dx;
            if (y + radius > innerHeight || y - radius < 0)
                dy = -dy;

            // interact on mousemove
            if (mouse.x - x < 50 && mouse.x - x > -50
                && mouse.y - y < 50 && mouse.y - y > -50) {
                this.setRadius(radius + 1);
            } else {
                this.setRadius(radius - 1);
            }

            this.draw();
        }
    }

    let circles = [];
    (init = () => {
        circles = [];
        for (let i = 0; i < 42; i++) {
            let radius = randRange(10, 100);
            let red = randRange(0, 255);
            let green = randRange(0, 255);
            let blue = randRange(0, 255);
            let x = randRange(radius, innerWidth - radius);
            let y = randRange(radius, innerHeight - radius);
            let dir = Math.random() < 0.5 ? -1 : 1;
            let dx = dy = 100 / radius * randRange(0.1, 0.5) * dir;

            circles.push(new Circle(x, y, dx, dy, radius, red, green, blue));
        }
    })();

    (animate = () => {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);

        c.fillStyle = "black";
        c.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < circles.length; i++) {
            circles[i].update();
        }
    })();

});
