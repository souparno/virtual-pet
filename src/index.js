import BootState    from './states/BootState';
import PreloadState from './states/PreloadState';
import MenuState    from './states/MenuState';
import PlayState    from './states/PlayState';

class Game extends Phaser.Game {

	constructor() {
        super(640, 360, Phaser.AUTO);

        this.state.add('BootState', BootState, false);
        this.state.add('PreloadState', PreloadState, false);
        this.state.add('MenuState', MenuState, false);
        this.state.add('PlayState', PlayState, false);

		this.state.start('BootState');
	}

}

new Game();
