
/**
 * @param direction dirección de la pelota (Arriba o abajo)
 */
export default class Ball extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, direction) {
    super(scene, x, y, 'ball');

    //Direction:
        //0 -> Quieta
        //1 -> Abajo
        //-1 -> Arriba
    this.direction = direction;
    scene.add.existing(this);   //Añadimos el objeto a la escena
    scene.physics.world.enable(this);

    this.speed = 100;

    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);

        //Movimiento de la pelota
        //Si no está quieta lo movemos
        if(this.direction !== 0) {
            this.setVelocityY(this.speed * this.direction);

            //Si llega al final la paramos en la fila donde debe estar
            if (this.y > 460 || this.y < 168) {

                if (this.y >= 460) {this.y = 460}
                else {this.y = 168}

                this.direction = 0;
                this.setVelocityY(0);
            }
        }

        
    }

    die() {

        this.setVelocityY(0);
        this.direction = 0;
    }
}