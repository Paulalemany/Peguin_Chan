/* Clase que representa al enemigo */

//DEBEMOS PONERLO EN ARCADE PARA PODER USAR LAS FUNCIONES   
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    
    //constructor del jugador
    constructor(scene, x, y){

        //NO DEBE TENER {} SI SE PONEN INTERPRETA QUE PASAS UN OBJETO
        super(scene, x, y);
       
        // En vez de poner un sprite, activamos una animación
        this.play('ratIdle');

        //Guardamos las animaciones para poder usarlas en cualquier momento
        this.idleAnim = 'ratIdle';
        this.moveAnim = 'ratMove';

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
    }


    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
    }

    move() {

    }

    animate(anim) {
        if (this.anims.currentAnim.key !== anim) {
            this.anims.play(anim);
        }
    }
}