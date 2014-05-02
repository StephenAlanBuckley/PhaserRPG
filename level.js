Level = function(game) {
    this.game = game;
}

Level.prototype = {

    preload: function() {
        this.game.load.image('ground', '/assets/gfx/ground.png');
    },

    create: function(enemies) {
        this.game.world.setBounds(0,0,2000,2000);

        // Set stage background to something sky colored
        this.game.stage.backgroundColor = 0x4488cc;

        enemies.create_enemy(100,100,'enemy');
    },

    update: function() {
    }
};
