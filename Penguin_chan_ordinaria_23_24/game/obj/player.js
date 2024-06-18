import Ball from "./ball.js";

/* Clase que representa al jugador */
export default class Player extends Phaser.Physics.Arcade.Sprite {
    
    //constructor del jugador
    constructor(scene, x, y, player){

        //NO DEBE TENER {} SI SE PONEN INTERPRETA QUE PASAS UN OBJETO
        super(scene, x, y);

        //Variables
        this.player = player;
        this.scene = scene;
        this.stunned = false;
        this.playerInput = true;
        

        //Datos
        this.offsetx = 12;
        this.offsety = 5;
        this.stun = 200;

        //Balas
        this.balldir;
        this.haveBall = false; 
        this.ballOnHand = scene.add.image (this.x + this.offsetx, this.y - this.offsety, 'ball');
        this.ballOnHand.setVisible(false);
       
        // crea un sprite de ARCADE con fisicas con la posicion y la imagen
        if (player == 1) {
            this.play('penguinIdle');

            //Guardamos las animaciones para poder usarlas en cualquier momento
            this.idleAnim = 'penguinIdle';
            this.moveAnim = 'penguinMove';
            this.getBallAnim = 'penguinIdleBall';
            this.moveBallAnim = 'penguinMoveBall';
            this.stunAnim = 'penguinStun';
    
            /* INPUT */
            this.a = this.scene.input.keyboard.addKey('A');
            this.d = this.scene.input.keyboard.addKey('D');
            this.space = this.scene.input.keyboard.addKey('SPACE');

            this.balldir = -1;
        }
        else {
            this.play('ratIdle');

            //Guardamos las animaciones para poder usarlas en cualquier momento
            this.idleAnim = 'ratIdle';
            this.moveAnim = 'ratMove';
            this.getBallAnim = 'ratIdleBall';
            this.moveBallAnim = 'ratMoveBall';
            this.stunAnim = 'ratStun';
    
            /* INPUT */
            this.a = this.scene.input.keyboard.addKey('LEFT');
            this.d = this.scene.input.keyboard.addKey('RIGHT');
            this.space = this.scene.input.keyboard.addKey('DOWN');

            this.offsetx *= -1;
            this.balldir = 1;
        }
        
        this.speed = 50;

        //Logica de las pelotas
        this.space.on('up', () =>{
            if (!this.stunned) {
                if (this.haveBall) {    //Tenemos una pelota en las manos
                    //la lanza
                    //Añadimos una nueva pelota en la escena
                    this.haveBall = false;
                    this.scene.pelotas.push(new Ball(this.scene, this.x, this.y, this.balldir));
                    this.ballOnHand.setVisible(false);
                    
                }
                else {
                    if (this.player == 1 && this.scene.playerOneCanTake) {
                        this.haveBall = true;
                        this.ballOnHand.setVisible(true);
                    }
                    else if (this.player == 2 && this.scene.playerTwoCanTake) {
                        this.haveBall = true;
                        this.ballOnHand.setVisible(true);
                    }
                }
            }
        });

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
            this.ballOnHand.x = this.x + this.offsetx;
        }

        if (this.stunned) { this.stuneado();}
        else{ this.move(); }
    }

    //Se encarga de cambiar las animaciones
    animate(anim) {
        if (this.anims.currentAnim.key !== anim) {
            this.anims.play(anim);
        }
    }

    stuneado() {
        this.animate(this.stunAnim);
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
