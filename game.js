(function($, Etsy) {
var GameState = function(game) {
    var player = null;
    var level = null;
};

killFirst = function(sprite_1, sprite_2) {
    sprite_1.kill();
}

killSecond = function(sprite_1, sprite_2) {
    sprite_2.kill();
}


// Load images and sounds
GameState.prototype.preload = function() {
    Preloader(this.game);

    this.game.weapons = new Weapons(this.game);
    this.game.weapons.preload();

    this.enemies = new Enemies(this.game);
    this.enemies.preload();

    this.level = new Level(this.game);
    this.level.preload();

    this.player = new Player(this.game);
    this.player.preload();
};

// Setup the example
GameState.prototype.create = function() {

    this.level.create(this.enemies);
    this.player.create();

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

    this.level.update();
    this.player.update();

    // Collide the player with the ground
    this.game.physics.arcade.collide(this.player.sprite, this.enemies.sprites);
    if (this.player.weapon != null) {
        this.game.physics.arcade.overlap(this.player.weapon.sprite, this.enemies.sprites, killSecond, null, this);
    }

    this.game.camera.follow(this.player.sprite);
};

var game = new Phaser.Game(900, 500, Phaser.CANVAS, 'game_view');
game.state.add('game', GameState, true);

})(window.jQuery, window.Etsy);
