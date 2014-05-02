Sword = function (game) {
    this.game = game;

    this.sprite = null;
    this.wielder = null; //A character object which this will be near- needs .sprite
    this.effectSprite = null;
    this.effectDuration = 200; //milliseconds that effect should last
    this.effectScale = (1/6);
}

Sword.prototype = {

    preload: function() {
    },

    create: function(equipped_to) {

        this.sprite = this.game.add.sprite(this.game.width/2, this.game.height - 64, 'sword');
        this.effectSprite = this.game.add.sprite(this.game.width/2, this.game.height - 64, 'slash', 1);
        this.effectSprite.scale.x = this.effectScale;
        this.effectSprite.scale.y = this.effectScale;
        this.effectSprite.kill();

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        //Where the sword pivots from, ratio of X/totalX, Y/totalY
        this.sprite.anchor.setTo(-0.4, 0.5);

        this.wielder = equipped_to;
    },

    update: function() {

        if (this.game.input.activePointer.isDown) {
            this.effectSprite.lifespan = this.effectDuration;
            this.effectSprite.x = this.wielder.sprite.x;
            this.effectSprite.y = this.wielder.sprite.y;
            this.effectSprite.revive();
        }
        this.sprite.x = this.wielder.sprite.x + this.wielder.sprite.body.width/2;
        this.sprite.y = this.wielder.sprite.y + this.wielder.sprite.body.height/2;
    }

};
