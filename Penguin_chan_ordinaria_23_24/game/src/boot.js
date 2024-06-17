export default class Boot extends Phaser.Scene {

    //constructor de la escena
    constructor(){
        super({ key: 'boot' });
        console.log('boot');
    }

    //Cargamos en esta clase todas las img del juego
    preload(){

        this.load.image('ball', './assets/ball16.png');     //Pelota

        this.load.image('fondo', './assets/background.png'); //Fondo
        this.load.image('mesa', './assets/table.png');       //mesa
        this.load.image('score', './assets/score.png');      //Puntuación

        //Personajes
        this.load.spritesheet('penguin', './assets/penguin40.png', {frameWidth: 40, frameHeight: 40});
        this.load.spritesheet('rat', './assets/rat32.png', {frameWidth: 32, frameHeight: 32});
    }

    //Animaciones por spritesheet
    createAnimations() {

        //Animaciones de la rata
        this.anims.create({
            key: 'ratIdle',
            frames: this.anims.generateFrameNumbers('rat', {start:5, end:5}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'ratIdleBall',
            frames: this.anims.generateFrameNumbers('rat', {start:0, end:0}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'ratMove',
            frames: this.anims.generateFrameNumbers('rat', {start:3, end:4}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'ratMoveBall',
            frames: this.anims.generateFrameNumbers('rat', {start:1, end:2}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'ratStun',
            frames: this.anims.generateFrameNumbers('rat', {start:8, end:10}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'ratWin',
            frames: this.anims.generateFrameNumbers('rat', {start:6, end:6}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'ratLose',
            frames: this.anims.generateFrameNumbers('rat', {start:11, end:12}),
            frameRate: 5,
            repeat: -1
        });

        //Animaciones del pinguino

        this.anims.create({
            key: 'penguinIdle',
            frames: this.anims.generateFrameNumbers('penguin', {start:0, end:0}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'penguinIdleBall',
            frames: this.anims.generateFrameNumbers('penguin', {start:5, end:5}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'penguinMove',
            frames: this.anims.generateFrameNumbers('penguin', {start:1, end:2}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'penguinMoveBall',
            frames: this.anims.generateFrameNumbers('penguin', {start:6, end:7}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'penguinStun',
            frames: this.anims.generateFrameNumbers('penguin', {start:3, end:4}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'penguinWin',
            frames: this.anims.generateFrameNumbers('penguin', {start:11, end:12}),
            frameRate: 5,
            repeat: -1
        });
        
        this.anims.create({
            key: 'penguinLose',
            frames: this.anims.generateFrameNumbers('penguin', {start:8, end:10}),
            frameRate: 5,
            repeat: -1
        });

        
    }

    //Pasamos a la escena del menú
    create() {
        this.createAnimations();
        this.scene.start("level");
    }
}