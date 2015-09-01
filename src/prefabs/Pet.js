class Pet extends Phaser.Sprite
{
    constructor(game, x, y)
    {
        super(game, x, y, 'pet', 0);

        this.anchor.setTo(0.5);

        //spritesheet animation
        this.animations.add('funnyfaces', [1, 2, 3, 2, 1], 7, false);

        this.customParams = {health: 100, fun: 100};

        this.inputEnabled = true;
        this.input.enableDrag();
    }
}

export default Pet;
