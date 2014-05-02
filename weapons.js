Weapons = function(game) {
    this.game = game;
}

Weapons.prototype = {

    preload: function() {
        this.game.load.image('sword', '/images/rpg/sword.png');
        this.game.load.spritesheet('slash', '/images/rpg/slash.png', 180, 182, 5);
    },

    create_weapon: function(wielder, type) {
        var weapon = wielder.game.add.sprite(0,0, type);
        weapon.name = type;
        weapon.x = 0;
        weapon.y = 0;
        weapon.parent = wielder.sprite;
        weapon.wielder = wielder;
        weapon.effectSprite = wielder.game.add.sprite(0,0, 'slash', 1);
        weapon.effectSprite.scale.x = (1/6);
        weapon.effectSprite.scale.y = (1/6);
        weapon.effectSprite.x = 0;
        weapon.effectSprite.y = 0;
        weapon.effectSprite.parent = wielder.sprite;
        weapon.effectDuration = 200;
        weapon.effectSprite.kill();
        weapon.update = function() {
            if (this.parent.game.input.activePointer.isDown) {
                var directionX = 1;
                var directionY = 1;
                switch (this.wielder.facing) {
                    case 'up':
                        directionX = 0;
                        directionY = -1;
                        break;
                    case 'right':
                        directionX = 1;
                        directionY = 0;
                        break;
                    case 'down':
                        directionX = 0;
                        directionY = 1;
                        break;
                    case 'left':
                        directionX = -1;
                        directionY = 0;
                        break;
                }

                this.effectSprite.lifespan = this.effectDuration;
                this.effectSprite.x = directionX * this.parent.width;
                this.effectSprite.y = directionY * this.parent.height;
                this.effectSprite.revive();
            }
        };
        wielder.weapon = weapon;
    }
};
