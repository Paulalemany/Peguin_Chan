import Ball from "./ball.js";
/* Clase que representa al enemigo */

//DEBEMOS PONERLO EN ARCADE PARA PODER USAR LAS FUNCIONES   
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    
    //constructor del jugador
    constructor(scene, x, y){

        //NO DEBE TENER {} SI SE PONEN INTERPRETA QUE PASAS UN OBJETO
        super(scene, x, y);
        this.scene = scene;
        this.stunned = false;

        //Datos
        this.offsetx = -12;
        this.offsety = 5;
        this.stun = 200;
        this.throwBall = scene.sound.add('throw');
        this.stunSound = scene.sound.add('stun');
        this.shootTime = 100;

        //Balas
        this.balldir;
        this.haveBall = false; 
        this.ballOnHand = scene.add.image (this.x + this.offsetx, this.y - this.offsety, 'ball');
        this.ballOnHand.setVisible(false);
       
        this.play('ratIdle');

        //Guardamos las animaciones para poder usarlas en cualquier momento
        this.idleAnim = 'ratIdle';
        this.moveAnim = 'ratMove';
        this.getBallAnim = 'ratIdleBall';
        this.moveBallAnim = 'ratMoveBall';
        this.stunAnim = 'ratStun';

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);

        //Para el movimiento
        this.dir = 1;
        this.balldir = 1;
        this.speed = 50;
    }


    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);

        if (this.haveBall && this.shootTime == 100) {    //Tenemos una pelota en las manos y podemos disparar
            //la lanza
            //Añadimos una nueva pelota en la escena
            this.stunTwoContador = setInterval(() => {
                this.shootTime--;
            }, 1000);

            this.haveBall = false;            
        }
        else {
            this.haveBall = true;
            this.ballOnHand.setVisible(true);
        }

        this.move();

        if (this.shootTime == 0) {
            this.scene.pelotas.push(new Ball(this.scene, this.x, this.y, this.balldir));
            this.ballOnHand.setVisible(false);
            this.throwBall.play();
            this.shootTime = 100;
        }
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