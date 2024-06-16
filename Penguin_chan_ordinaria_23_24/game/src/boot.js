export default class Boot extends Phaser.Scene {

    //constructor de la escena
    constructor(){
        super({ key: 'boot' });
        console.log('boot');
    }

    //Cargamos en esta clase todas las img del juego
    preload(){
        this.load.image('ball', './assets/ball16.png');
    }

    //Pasamos a la escena del menú
    create() {
        this.scene.start("title");
    }
}