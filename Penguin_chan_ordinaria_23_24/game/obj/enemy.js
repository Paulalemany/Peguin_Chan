/* Clase que representa al enemigo */

export default class Enemy extends Phaser.GameObjects.Container {
    
    //constructor del jugador
    constructor(scene, x, y){

        //NO DEBE TENER {} SI SE PONEN INTERPRETA QUE PASAS UN OBJETO
        super(scene, x, y);
       
        // crea un sprite de ARCADE con fisicas con la posicion y la imagen
        this.player = this.scene.physics.add.sprite(x, y, 'rat');

        
        // añade a la escena el objeto entero
        // si no añades esto no se mete en la escena y no mira el preupdate
        this.scene.add.existing(this);
    }


    preUpdate() {
        //para el input
       

    }

    

}
