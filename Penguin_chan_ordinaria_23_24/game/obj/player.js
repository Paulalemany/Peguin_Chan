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
        this.moveAnim = 'penguinMove';

        /* INPUT */
        this.speed = 50;

        this.a = this.scene.input.keyboard.addKey('A');
        this.d = this.scene.input.keyboard.addKey('D');
        this.space = this.scene.input.keyboard.addKey('SPACE');

        // añade a la escena el objeto entero
        // si no añades esto no se mete en la escena y no mira el preupdate
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setSize(32, 32);  //Para que ambos personajes tengan el mismo collider
    }


    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        this.move();

        //Boton de acción
        if (this.space.isDown) {
            console.log("Accion");
        }

    }

    //Se encarga de cambiar las animaciones
    animate(anim) {
        if (this.anims.currentAnim.key !== anim) {
            this.anims.play(anim);
        }
    }

    //Imput unicamente de movimiento
    move() {

        //input
        if (this.x > 145 && this.a.isDown) {    //Izquierda

            this.animate(this.moveAnim);
            this.setVelocityX(-this.speed);
        }
        else if (this.x < 340 && this.d.isDown) {   //Derecha

            this.animate(this.moveAnim);
            this.setVelocityX(this.speed);
        }
        else {  //Quieta
            this.animate(this.idleAnim);
            this.setVelocityX(0);
        }
    }
    

}
