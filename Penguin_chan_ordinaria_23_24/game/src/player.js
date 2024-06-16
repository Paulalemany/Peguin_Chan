/* Clase que representa al jugador */

export default class Player extends Phaser.GameObjects.Container { 

    /**
     * Constructora del jugador
     * @param {String} playerSprite 
     * @param {String} iz tecla que se utilizará para ir a la izquierda
     * @param {String} der tecla que se utilizará para ir a la derecha
     * @param {String} shoot tecla que se utilizará para disparar
     * @param {String} sound sonido
     */

    //constructor del jugador
    constructor(scene, x, y, playerSprite, iz, der, shoot, sound){

        //NO DEBE TENER {} SI SE PONEN INTERPRETA QUE PASAS UN OBJETO
        super(scene, x, y);

        // crea un sprite de ARCADE con fisicas con la posicion y la imagen
        this.player = this.scene.physics.add.spritesheet(x, y, playerSprite);
    }
}