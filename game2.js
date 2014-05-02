GameState = function(game) {
    this.player = null;
};

// Load images and sounds
GameState.prototype.preload = function() {
    this.game.load.image('ground', '/images/rpg/ground.png');
    this.game.load.image('player', '/images/rpg/player.png');
};

// Setup the example
GameState.prototype.create = function() {
    // Set stage background to something sky colored
    this.game.stage.backgroundColor = 0x4488cc;

    // Define movement constants
    this.MAX_SPEED = 250; // pixels/second
    this.ACCELERATION = 900; // pixels/second/second
    this.DRAG = 400; // pixels/second
    this.GRAVITY = 980; // pixels/second/second
    this.JUMP_SPEED = -440; // pixels/second (negative y is up)

    this.game.world.setBounds(0, 0, 5400, 900);

    // Create a player sprite
    this.player = this.game.add.sprite(100, 300, 'player');
    this.game.camera.follow(this.player);

    // Enable physics on the player
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

    // Make player collide with world boundaries so he doesn't leave the stage
    this.player.body.collideWorldBounds = true;

    // Set player minimum and maximum movement speed
    this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); // x, y

    // Add drag to the player that slows them down when they are not accelerating
    this.player.body.drag.setTo(this.DRAG, 0); // x, y

    // Since we're jumping we need gravity
    game.physics.arcade.gravity.y = this.GRAVITY;

    // Set a flag for tracking if we've double jumped
    this.canDoubleJump = true;

    // Set a flag for tracking if the player can adjust their jump height
    this.canVariableJump = true;

    // Create some ground for the player to walk on
    this.ground = this.game.add.group();
    for(var x = 0; x < this.game.world.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.world.height - 32, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }

    // Capture certain keys to prevent their default actions in the browser.
    // This is only necessary because this is an HTML5 game. Games on other
    // platforms may not need code like this.
    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ]);

    // Show FPS
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(
        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );
};

// The update() method is called every frame
GameState.prototype.update = function() {
    if (this.game.time.fps !== 0) {
        this.fpsText.setText(this.game.time.fps + ' FPS');
    }

    // Collide the player with the ground
    this.game.physics.arcade.collide(this.player, this.ground);

    if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.input.keyboard.isDown(Phaser.Keyboard.A)) {
        // If the LEFT key is down, set the player velocity to move left
        this.player.body.acceleration.x = -this.ACCELERATION;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.input.keyboard.isDown(Phaser.Keyboard.D)) {
        // If the RIGHT key is down, set the player velocity to move right
        this.player.body.acceleration.x = this.ACCELERATION;
    } else {
        this.player.body.acceleration.x = 0;
    }

    // Set a variable that is true when the player is touching the ground
    var onTheGround = this.player.body.touching.down;
    if (onTheGround) this.canDoubleJump = true;

    if (this.input.keyboard.justPressed(Phaser.Keyboard.UP, 5) || this.input.keyboard.justPressed(Phaser.Keyboard.W, 5)) {
        // Allow the player to adjust his jump height by holding the jump button
        if (this.canDoubleJump) this.canVariableJump = true;

        if (this.canDoubleJump || onTheGround) {
            // Jump when the player is touching the ground or they can double jump
            this.player.body.velocity.y = this.JUMP_SPEED;

            // Disable ability to double jump if the player is jumping in the air
            if (!onTheGround) this.canDoubleJump = false;
        }
    }

    // Keep y velocity constant while the jump button is held for up to 400 ms
    if (this.canVariableJump && (this.input.keyboard.justPressed(Phaser.Keyboard.UP, 400) || this.input.keyboard.justPressed(Phaser.Keyboard.W, 400))) {
        this.player.body.velocity.y = this.JUMP_SPEED;
    }

    // Don't allow variable jump height after the jump button is released
    if (!this.input.keyboard.isDown(Phaser.Keyboard.UP) && !this.input.keyboard.isDown(Phaser.Keyboard.W)) {
        this.canVariableJump = false;
    }

};

var game = new Phaser.Game(848, 450, Phaser.AUTO, 'game_view');
game.state.add('game', GameState, true);
