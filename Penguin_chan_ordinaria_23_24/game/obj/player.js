/* Clase que representa al jugador */

export default class Player extends Phaser.Physics.Arcade.Sprite {
    
    //constructor del jugador
    constructor(scene, x, y){

        //NO DEBE TENER {} SI SE PONEN INTERPRETA QUE PASAS UN OBJETO
        super(scene, x, y);
       
        // crea un sprite de ARCADE con fisicas con la posicion y la imagen
        this.play('penguinIdle');

        //Guardamos las animaciones para poder usarlas en cualquier momento
        this.idleAnim = 'penguinIdle';


        // añade a la escena el objeto entero
        // si no añades esto no se mete en la escena y no mira el preupdate
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
    }


    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
    }

    animate(anim) {
        if (this.anims.currentAnim.key !== anim) {
            this.anims.play(anim);
        }
    }
    

}
