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

        //Para el movimiento
        this.dir = 1;
        this.speed = 50;
    }


    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        this.move();
    }

    move() {

        //input
        if (this.x > 145 && this.dir == -1) {    //Izquierda

            this.animate(this.moveAnim);
            this.setVelocityX(-this.speed);
        }
        else if (this.x < 340 && this.dir == 1) {   //Derecha

            this.animate(this.moveAnim);
            this.setVelocityX(this.speed);
        }
        else {  //Cambio de dirección
            this.dir *= -1
        }
    }

    animate(anim) {
        if (this.anims.currentAnim.key !== anim) {
            this.anims.play(anim);
        }
    }
}