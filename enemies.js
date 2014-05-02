Enemies = function(game) {
    this.game = game;
    this.sprites = this.game.add.group();
    this.sprites.enableBody = true;
    this.sprites.physicsBodyType = Phaser.Physics.ARCADE;
}

Enemies.prototype = {

    preload: function() {
        this.game.load.image('enemy', '/images/rpg/enemy.png');
    },

    create_enemy: function(x,y,type) {
        var e = this.sprites.create(x, y, type);
        e.body.bounce.set(1.4, 1.4);
        e.body.collideWorldBounds = true;
    }
};


