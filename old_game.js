
(function($, Etsy) {
var GameState = function(game) {
};

// Load images and sounds
GameState.prototype.preload = function() {
    this.game.load.image('ground', '/assets/gfx/ground.png');
    this.game.load.image('sword', '/images/rpg/sword.png');
};

// Setup the example
GameState.prototype.create = function() {
    this.game.world.setBounds(0,0,2000,2000);

    // Set stage background to something sky colored
    this.game.stage.backgroundColor = 0x4488cc;


    // Create a player sprite
    this.sword = this.game.add.sprite(this.game.width/2, this.game.height - 64, 'sword');

    // Enable physics on the player
    this.game.physics.enable(this.sword, Phaser.Physics.ARCADE);

    this.sword.anchor.setTo(-0.4, 0.5);


    // Set player minimum and maximum movement speed
    //this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y

    // Add drag to the player that slows them down when they are not accelerating

    // Create some ground for the player to walk on
    /*
    this.ground = this.game.add.group();
    for(var x = 0; x < this.game.world.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }
    */

    // Capture certain keys to prevent their default actions in the browser.
    // This is only necessary because this is an HTML5 game. Games on other
    // platforms may not need code like this.
    //
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

    this.sword.rotation = this.game.physics.arcade.angleToPointer(this.sword);

    // Collide the player with the ground
    this.game.physics.arcade.collide(this.player, this.ground);

    this.sword.x = this.player.x + this.player.body.width/2;
    this.sword.y = this.player.y + this.player.body.height/2;

    this.game.camera.follow(this.player);

};

var game = new Phaser.Game(900, 500, Phaser.CANVAS, 'game_view');
game.state.add('game', GameState, true);

})(window.jQuery, window.Etsy);
