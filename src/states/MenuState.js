class MenuState extends Phaser.State {
    init( message )
    {
        this.message = message;
    }

    create()
    {
        var background = this.game.add.sprite(0,0,'backyard');
        background.inputEnabled = true;

        background.events.onInputDown.add( this.startPlay, this );

        var style = {font: '35px Arial', fill: '#fff'};

        this.game.add.text(30, this.game.world.centerY + 200, 'TOUCH TO START', style);

        if(this.message)
        {
            this.game.add.text(60, this.game.world.centerY - 200, this.message, style);
        }
    }

    startPlay()
    {
        this.state.start('PlayState');
    }
}

export default MenuState;
