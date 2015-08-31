class BootState extends Phaser.State
{
    construcotr(props)
    {
        super(props);

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }

    preload()
    {
        this.load.image('preloadBar', 'images/bar.png');
        this.load.image('logo', 'images/logo.png');
    }

	create()
    {
        this.game.stage.backgroundColor = '#fff';
        // Start preload state
        this.state.start('PreloadState');
	}

}

export default BootState;
