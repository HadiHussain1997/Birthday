kaboom({
    width: 640,
    height: 360,
    scale: 2,
    background: [255, 200, 220],
});

loadSprite("sehru", "assets/sprites/sehru.png");
loadSprite("cupcake", "assets/sprites/cupcake.png");
loadSprite("door", "assets/sprites/door.png");
loadSound("ending", "sounds/ending.mp3");

scene("game", () => {
    setGravity(800);
    const SPEED = 120;
    const JUMP_FORCE = 360;

    const player = add([
        sprite("sehru"),
        pos(30, 0),
        area(),
        body(),
        "player"
    ]);

    const cupcakes = [
        vec2(100, 260),
        vec2(200, 200),
        vec2(300, 240),
        vec2(400, 180),
    ];

    cupcakes.forEach((p) => {
        add([sprite("cupcake"), pos(p), area(), "cupcake"]);
    });

    add([sprite("door"), pos(580, 280), area(), "door"]);

    player.onCollide("cupcake", (c) => {
        destroy(c);
        addKaboom(player.pos);
    });

    player.onCollide("door", () => {
        go("ending");
    });

    onKeyDown("left", () => player.move(-SPEED, 0));
    onKeyDown("right", () => player.move(SPEED, 0));
    onKeyPress("space", () => {
        if (player.isGrounded()) player.jump(JUMP_FORCE);
    });

    addLevel([
        "===========================",
        "=                         =",
        "=                         =",
        "=                         =",
        "=                         =",
        "=                         =",
        "=                         =",
        "=                         =",
        "=                         =",
        "===========================",
    ], {
        tileWidth: 32,
        tileHeight: 32,
        "=": () => [rect(32, 32), area(), solid(), color(255, 150, 200)],
    });
});

scene("ending", () => {
    add([rect(640, 360), pos(0, 0), color(0, 0, 0)]);
    add([
        text("Happy Birthday,\nmy forever hmmm machine ❤️\n— Dora", {
            size: 24,
            width: 600,
            align: "center",
        }),
        pos(320, 180),
        anchor("center"),
        color(255, 255, 255),
    ]);
    try {
        play("ending", { volume: 0.5 });
    } catch (e) {
        console.log("No ending.mp3 found.");
    }
});

go("game");
