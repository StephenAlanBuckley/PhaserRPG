Player = function(game) {
    this.game = game;
    this.sprite = null;
    this.weapon = null;
    this.keyboard = game.input.keyboard;

    // Define movement constants
    this.MOVE_SPEED = 0;
    this.WALK_SPEED = 250; // pixels/second
    this.RUN_SPEED = 400;
    this.facing = "down";
}

Player.prototype = {

    preload: function() {
        this.game.load.image('player', '/images/rpg/player.png');
    },

    create: function() {
        this.sprite = this.game.add.sprite(this.game.width/2, this.game.height - 64, 'player');

        this.game.weapons.create_weapon(this, 'sword');

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.set(.4, .4); //bounces back with 40% of the force it hits with

        //Get all player controls here
        this.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.W,
            Phaser.Keyboard.A,
            Phaser.Keyboard.S,
            Phaser.Keyboard.D,
            Phaser.Keyboard.SHIFT
        ]);

    },

    update: function() {
        if (this.weapon != null) {
            this.weapon.update();
        }

        this.MOVE_SPEED = this.WALK_SPEED;

        if (this.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
            this.MOVE_SPEED = this.RUN_SPEED;
        }

        if (this.keyboard.isDown(Phaser.Keyboard.LEFT) || this.keyboard.isDown(Phaser.Keyboard.A)) {
            // If the LEFT key is down, set the player velocity to move left
            this.sprite.body.velocity.x = -this.MOVE_SPEED;
            this.facing = "left";
        } else if (this.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.keyboard.isDown(Phaser.Keyboard.D)) {
            // If the RIGHT key is down, set the player velocity to move right
            this.sprite.body.velocity.x = this.MOVE_SPEED;
            this.facing = "right";
        } else {
            this.sprite.body.velocity.x = 0;
        }


        if (this.keyboard.isDown(Phaser.Keyboard.UP) || this.keyboard.isDown(Phaser.Keyboard.W)) {
            this.sprite.body.velocity.y = -this.MOVE_SPEED;
            this.facing = "up";
        } else if (this.keyboard.isDown(Phaser.Keyboard.DOWN) || this.keyboard.isDown(Phaser.Keyboard.S)) {
            this.sprite.body.velocity.y = this.MOVE_SPEED;
            this.facing = "down";
        } else {
            this.sprite.body.velocity.y = 0;
        }

    }
};
