import Ball from "./ball.js";

/* Clase que representa al jugador */
export default class Player extends Phaser.Physics.Arcade.Sprite {
    
    //constructor del jugador
    constructor(scene, x, y, player){

        //NO DEBE TENER {} SI SE PONEN INTERPRETA QUE PASAS UN OBJETO
        super(scene, x, y);
        this.player = player;
        this.scene = scene;
        this.ballOnHand = scene.add.image (this.x + 12, this.y - 5, 'ball');
        this.ballOnHand.setVisible(false);
       
        // crea un sprite de ARCADE con fisicas con la posicion y la imagen
        if (player == 1) {
            this.play('penguinIdle');

            //Guardamos las animaciones para poder usarlas en cualquier momento
            this.idleAnim = 'penguinIdle';
            this.moveAnim = 'penguinMove';
            this.getBallAnim = 'penguinIdleBall';
            this.moveBallAnim = 'penguinMoveBall';
    
            /* INPUT */
            this.a = this.scene.input.keyboard.addKey('A');
            this.d = this.scene.input.keyboard.addKey('D');
            this.space = this.scene.input.keyboard.addKey('SPACE');
        }
        else {
            this.play('ratIdle');

            //Guardamos las animaciones para poder usarlas en cualquier momento
            this.idleAnim = 'ratIdle';
            this.moveAnim = 'ratMove';
    
            /* INPUT */
            this.a = this.scene.input.keyboard.addKey('LEFT');
            this.d = this.scene.input.keyboard.addKey('RIGHT');
            this.space = this.scene.input.keyboard.addKey('DOWN');
        }
        
        this.speed = 50;

        //Pelotas
        this.haveBall = false;  //Al principio no tenemos ninguna pelota cogida

        // añade a la escena el objeto entero
        // si no añades esto no se mete en la escena y no mira el preupdate
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setSize(32, 32);  //Para que ambos personajes tengan el mismo collider
    }


    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);

        //Pelota que llevamos en la mano
        if(this.haveBall) {
            this.ballOnHand.setVisible(true);
            this.ballOnHand.x = this.x + 12;
        }

        this.move();

        //Logica de las pelotas
        if (this.space.isDown) {
            
            if (this.haveBall) {    //Tenemos una pelota en las manos

                
            }
            else {  //No tenemos ninguna pelota en las manos
                //Diferenciamos que jugador coge la pelota
                if (this.player == 1 && this.scene.playerOneCanTake){

                    //Tenemos una pelota aproposito para la que cojamos
                    

                    
                } else if (this.player == 2 && this.scene.playerTwoCanTake){

                    console.log("Puede el 2");
                }
            }
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
        if (this.a.isDown || this.d.isDown) {

            //movimiento
            if (this.x > 145 && this.a.isDown) {    //Izquierda
                this.setVelocityX(-this.speed);
            }
            else if (this.x < 340 && this.d.isDown) {   //Derecha
                this.setVelocityX(this.speed);
            }

            //Animación
            if (this.haveBall){
                this.animate(this.moveBallAnim);
            }
            else {
                this.animate(this.moveAnim);
            }
        }
        
        else {  //Quieta

            if (this.haveBall) {
                this.animate(this.getBallAnim)
            }
            else {
                this.animate(this.idleAnim);
            }
            this.setVelocityX(0);
        }
    }
    

}
