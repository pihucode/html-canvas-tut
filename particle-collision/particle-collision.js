window.addEventListener('DOMContentLoaded', event => {
    console.log('hihi');

    // canvas
    let canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
    distance = (x1, y1, x2, y2) => {
        let xDist = x2 - x1;
        let yDist = y2 - y1;
        return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    }
    rotate = (velocity, angle) => {
        const rotatedVelocities = {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };
        return rotatedVelocities;
    }
    resolveCollision = (particle, otherParticle) => {
        const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
        const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

        const xDist = otherParticle.x - particle.x;
        const yDist = otherParticle.y - particle.y;

        // prevent accidental overlap of particles
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
            // Grab angle between the two colliding particles
            const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

            // Store mass in var for better readability in collision equation
            const m1 = particle.mass;
            const m2 = otherParticle.mass;

            // Velocity before equation
            const u1 = rotate(particle.velocity, angle);
            const u2 = rotate(otherParticle.velocity, angle);

            // Velocity after 1d collision equation
            const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
            const v2 = { x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2), y: u2.y };

            // Final velocity after rotating axis back to original location
            const vFinal1 = rotate(v1, -angle);
            const vFinal2 = rotate(v2, -angle);

            // Swap particle velocities for realistic bounce effect
            particle.velocity = vFinal1;
            otherParticle.velocity = vFinal2;
        }

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
    function Particle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.velocity = {
            x: randRange(-4, 4),
            y: randRange(-4, 4)
        }
        this.radius = radius;
        this.mass = radius / 5 * 10;
        this.color = color;
        this.opacity = 0.4;

        this.draw = () => {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

            c.save();
            c.globalAlpha = this.opacity;
            c.fillStyle = this.color;
            c.fill();
            c.restore();

            c.strokeStyle = this.color;
            c.lineWidth = 2;
            c.stroke();
            c.closePath();
        }

        this.update = (particles) => {
            this.draw();

            for (let i = 0; i < particles.length; i++) {
                // skip calculation of current particle (ie, do not compare with itself)
                if (this === particles[i]) continue;

                // if particle[i] collides with current particle
                if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
                    resolveCollision(this, particles[i]);
                }
            }

            if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) this.velocity.x *= -1;
            if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) this.velocity.y *= -1;

            //mouse collision detection
            if (distance(mouse.x, mouse.y, this.x, this.y < 5) && this.opacity < 1) {
                this.opacity += 0.02;
            } else if (this.opacity > 0) {
                this.opacity -= 0.02;
                this.opacity = Math.max(0, this.opacity);
                console.log(this.opacity);
            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
    }

    let particles;
    (init = () => {
        particles = [];

        for (let i = 0; i < 42; i++) {
            const radius = randRangeInt(10, 20);
            const color = randColor(colors);
            let x = randRangeInt(radius, canvas.width - radius);
            let y = randRangeInt(radius, canvas.height - radius);

            if (i !== 0) {
                for (let j = 0; j < particles.length; j++) {
                    // regenerate coors if overlap
                    if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                        x = randRangeInt(radius, canvas.width - radius);
                        y = randRangeInt(radius, canvas.height - radius);
                        j = -1;
                    }
                }
            }
            particles.push(new Particle(x, y, radius, color));
        }

    })();

    (animate = () => {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = "black";
        c.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update(particles);
        });
    })();

});
