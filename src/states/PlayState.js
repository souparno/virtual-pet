class PlayState extends Phaser.State {
    create()
    {
        this.background = this.game.add.sprite(0, 0, 'backyard');
        this.background.inputEnabled = true;
        this.background.events.onInputDown.add(this.placeItem, this);

        this.pet = this.game.add.sprite(100, 400, 'pet');
        this.pet.anchor.setTo(0.5);

        //spritesheet animation
        this.pet.animations.add('funnyfaces', [1, 2, 3, 2, 1], 7, false);

        //custom properties
        this.pet.customParams = {health: 100, fun: 100};

        //draggable pet
        this.pet.inputEnabled = true;
        this.pet.input.enableDrag();

        //pet health and fun texts
        let style = { font: '20px Arial', fill: '#fff'};
        this.game.add.text(10, 20, 'Health:', style);
        this.game.add.text(140, 20, 'Fun:', style);

        this.healthText = this.game.add.text(80, 20, '', style);
        this.funText = this.game.add.text(185, 20, '', style);

        this.refreshStats();
    }

    update()
    {
    }

    placeItem()
    {
        console.log('placing item');
    }

    refreshStats()
    {
        this.healthText.text = this.pet.customParams.health;
        this.funText.text = this.pet.customParams.fun;
    }

    gameOver()
    {
        this.state.start('MenuState', true, false, 'GAME OVER!');
    }
}

export default PlayState;
