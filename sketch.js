let player;
let bullets = [];
let enemies = [];
let score = 0;

let isShooting = true;
let bulletSpeed = 10;
let fireInterval = 2.5;

let restartButton;
let gameOver = false;

function preload() {
    player = loadImage("st.jpg.png");
    enemyImage = loadImage("hs.png");
    backgroundImage = loadImage("tex.jpg");
}

function setup() {

    createCanvas(400, 580);

    for (let i = 0; i < 10; i++) {
        let enemy = {
            x: random(0, width),
            y: random(-480, 0),
        };
        enemies.push(enemy);
    }

    // Adjust the button position and size
    restartButton = createButton("Restart");
    restartButton.position(width / 2 + 380, height / 2 + 50); // Middle of the screen
    restartButton.style("font-size", "24px"); // Increase the font size
    restartButton.size(200, 60); // Increase the button size
    restartButton.mousePressed(restartGame);
    restartButton.hide();
}

function draw() {
    background(backgroundImage);
    image(backgroundImage, width / 2, height / 2);
    imageMode(CENTER);
    image(player, mouseX, height - 50, 100, 100);

    if (!gameOver && isShooting && frameCount % fireInterval === 0) {
        let bullet = {
            x: mouseX,
            y: height - 80,
        };
        bullets.push(bullet);
    }

    for (let i = bullets.length - 1; i >= 0; i--) {
        let bullet = bullets[i];
        bullet.y -= bulletSpeed;
        circle(bullet.x, bullet.y, 5);
        fill(255, 255, 255);

        if (bullet.y < 0) {
            bullets.splice(i, 1);
        }
    }

    for (let enemy of enemies) {
        enemy.y += 2.5;
        image(enemyImage, enemy.x, enemy.y, 30, 55);

        if (enemy.y > height) {
            textSize(32);
            text("You've been eaten...", width / 7, height / 2);
            gameOver = true;
            restartButton.show();
            noLoop();
        }
    }

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

    text(score, 25, 50);
}

function restartGame() {
    score = 0;
    bullets = [];
    enemies = [];
    for (let i = 0; i < 10; i++) {
        let enemy = {
            x: random(0, width),
            y: random(-480, 0),
        };
        enemies.push(enemy);
    }
    gameOver = false;
    restartButton.hide();
    loop();
}
