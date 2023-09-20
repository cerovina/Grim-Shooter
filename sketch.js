let player;
let bullets = [];
let enemies = [];
let score = 0;

let isShooting = true;
let bulletSpeed = 10;
let fireInterval = 2.5; //Value to control the firing rate

function preload() {
    // Load your image files
    player = loadImage("st.jpg.png");
    enemyImage = loadImage("hs.png");
    backgroundImage = loadImage("tex.jpg")
}

function setup() {
    if (windowWidth < windowHeight) {
        // Portrait mode on mobile, make canvas height the full height of the screen
        createCanvas(windowWidth, windowHeight);
    } else {
        // Landscape mode on mobile or desktop, set a fixed canvas size
        createCanvas(400, 580);
    }

    for (let i = 0; i < 10; i++) {
        let enemy = {
            x: random(0, width),
            y: random(-480, 0),
        };
        enemies.push(enemy);
    }
}

function draw() {
    background(backgroundImage);
    image(backgroundImage, width / 2, height / 2);
    imageMode(CENTER);
    image(player, mouseX, height - 50, 100, 100); // Display the player image

    if (isShooting && frameCount % fireInterval === 0) {
        // Create a new bullet at the current mouse position
        let bullet = {
            x: mouseX,
            y: height - 80
        };
        bullets.push(bullet);
    }

    for (let i = bullets.length - 1; i >= 0; i--) {
        let bullet = bullets[i];
        bullet.y -= bulletSpeed;
        circle(bullet.x, bullet.y, 5);
        fill(255,255,255)

        // Remove bullets that go off-screen
        if (bullet.y < 0) {
            bullets.splice(i, 1);
        }
    }

    for (let enemy of enemies) {
        enemy.shakeOffset = map(noise(frameCount * 0.05), 0, 1, -5, 5);
        enemy.y += 2.5;
        image(enemyImage, enemy.x, enemy.y, 30, 55); // Display the enemy image
        if (enemy.y > height) {
            textSize(32);
            text("You're eaten...", width / 4, height / 2);
            noLoop();
        }
    }

    // Dealing with collisions
    for (let enemy of enemies) {
        for (let bullet of bullets) {
            if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 10) {
                enemies.splice(enemies.indexOf(enemy), 1);
                bullets.splice(bullets.indexOf(bullet), 1);
                for (let i = 0; i < 1; i++) {
                    let newEnemy = {
                        x: random(0, width),
                        y: random(-800, 0),
                    };
                    enemies.push(newEnemy);
                    score += 1;
                }
            }
        }
    }
    text(score, 15, 25);
}

function windowResized() {
    // Resize the canvas if the window is resized
    if (windowWidth < windowHeight) {
        resizeCanvas(windowWidth, windowHeight);
    } else {
        resizeCanvas(400, 610);
    }
}
