//Phaser needs to load all of its images up front. This is for the images
//which aren't used upon game start but which still need to exist for the
//game to function.
Preloader = function(game) {
        game.load.image('sword', '/images/rpg/sword.png');
        game.load.spritesheet('slash', '/images/rpg/slash.png', 180, 182, 5);
};
