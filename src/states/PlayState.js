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

        //buttons
        this.apple = this.game.add.sprite(72, 570, 'apple');
        this.apple.anchor.setTo(0.5);
        this.apple.inputEnabled = true;
        this.apple.customParams = {health: 20};

        this.apple.events.onInputDown.add(this.pickItem, this);

        this.candy = this.game.add.sprite(144, 570, 'candy');
        this.candy.anchor.setTo(0.5);
        this.candy.inputEnabled = true;
        this.candy.customParams = {health: -10, fun: 10};

        this.candy.events.onInputDown.add(this.pickItem, this);

        this.toy = this.game.add.sprite(216, 570, 'toy');
        this.toy.anchor.setTo(0.5);
        this.toy.inputEnabled = true;
        this.toy.customParams = {fun: 20};

        this.toy.events.onInputDown.add(this.pickItem, this);

        this.rotate = this.game.add.sprite(288, 570, 'rotate');
        this.rotate.anchor.setTo(0.5);
        this.rotate.inputEnabled = true;
        this.rotate.events.onInputDown.add(this.rotatePet, this);

        this.buttons = [this.apple, this.candy, this.toy, this.rotate];

        //nothing is selected
        this.selectedItem = null;

        //the user interface (UI) is not blocked at the start
        this.uiBlocked = false;

        //decrease the health every 5 seconds
        this.statsDecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this);

        this.refreshStats();
    }

    update()
    {
        if(this.pet.customParams.health <= 0 || this.pet.customParams.fun <= 0)
        {
            this.pet.frame = 4;
            this.clearSelection();
            this.uiBlocked = true;

            this.game.time.events.add(2000, this.gameOver, this);
        }
    }

    pickItem(sprite)
    {
        if( this.selectedItem === sprite )
            {
                this.clearSelection();
                return;
            }

            if(this.uiBlocked) return;

            this.uiBlocked = true;

            this.clearSelection();

            //alpha to indicate selection
            sprite.alpha = 0.4;

            this.selectedItem = sprite;
    }

    rotatePet(sprite)
    {
        if(this.uiBlocked) return;

        this.uiBlocked = true;

        this.clearSelection();

        //alpha to indicate selection
        sprite.alpha = 0.4;

        let petRotation = this.game.add.tween(this.pet);

        //make the pet do two loops during 1 sec
        petRotation.to({angle: '+720'}, 1000);

        petRotation.onComplete.add(() => {
            //release the UI
            this.uiBlocked = false;

            sprite.alpha = 1;

            //increse the fun of the pet
            this.pet.customParams.fun += 10;

            //update the visuals for the stats
            this.refreshStats();
        }, this);

        //start the tween animation
        petRotation.start();
    }

    clearSelection()
    {
        this.uiBlocked = false;

        this.buttons.forEach( (element) => {
            element.alpha = 1;
        });

        //we are not selecting anything now
        this.selectedItem = null;
    }

    reduceProperties()
    {
        this.pet.customParams.health -= 10;
        this.pet.customParams.fun -= 15;
        this.refreshStats();
    }

    placeItem(sprite, event)
    {
        if(!this.selectedItem && this.uiBlocked) return;

        let x = event.position.x;
        let y = event.position.y;

        let newItem = this.game.add.sprite(x, y, this.selectedItem.key);

        newItem.anchor.setTo(0.5);
        newItem.customParams = this.selectedItem.customParams;

        this.uiBlocked = true;

        //move the pet towards the item
        let petMovement = this.game.add.tween(this.pet);

        petMovement.to({x: x, y: y}, 700);

        petMovement.start();

        petMovement.onComplete.add( this.consume.bind(this, newItem), this );
    }

    consume( item )
    {
        item.destroy();

        //play animation
        this.pet.animations.play('funnyfaces');

        //release the ui
        this.uiBlocked = false;

        let stat;

        for(stat in item.customParams)
        {
            //we only want the properties of the customParams object, not properties that may existing in customParams.prototype
            //this filters out all non-desired properties
            if(item.customParams.hasOwnProperty(stat))
            {
                this.pet.customParams[stat] += item.customParams[stat];
            }
        }

        //update the visuals for the stats
        this.refreshStats();
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
