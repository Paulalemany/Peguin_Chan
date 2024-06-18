import Player from "../obj/player.js";
import Enemy from "../obj/enemy.js";
import Ball from "../obj/ball.js";

export default class Level extends Phaser.Scene { 

    //constructor de la escena
    constructor(){
        //Nombre de la escena
        super({ key: 'level' });
    
    }

    //Funcion init para recibir la informacion pasada al cambiar de escena
    //Aquí llega la info puesta como segundo parámetro en el start
	init(players){

        // settea el número de jugadores
        this.modGame = players;
	}

    create() {

        console.log("Nivel");

        const scene = this;     //Referencia a esta misma escena

        /* VISUALES */
        this.bg = this.add.image(256, 255, "fondo");    //fondo
        this.mesa = this.add.image(240, 320, "mesa");   //Mesa
        this.score = this.add.image(400, 300, "score");  //Puntuación

        //Pelotas
        this.up = 0;
        this.down = 0;

        //Bucles for en javaScript
        this.pelotas = []; 
        for (let step = 0; step < 10; step++) {

            let ball; 

            if (step < 5) {    //pelotas de la rat
                ball = new Ball(scene, 160 + ( step * 40 ), 170, 0);
                this.up++;
            }
            else {  //Pelotas del pinguino
                ball = new Ball(scene, 160 + ( (step - 5) * 40 ), 460, 0);
                this.down++;
            }

            this.pelotas.push(ball);
            
        }


        /* PERSONAJES*/
        //El primer personaje es obligatorio
        this.player = new Player(scene, 230, 450, 1); //Jugador 1

        //El segundo personaje va a depender del modo de juego que sea player o enemy
        if(this.modGame == 'vs') {   //Jugador contra jugador
            this.playerdos = new Player(scene, 230, 170, 2);
        }
        else {  //Jugador contra IA
            this.playerdos = new Enemy(scene, 230, 170);
        }
        

        /* CONTADOR */
        this.time = 90  //Tiempo que vamos a ir modificando
        this.contador = this.add.text(230, 30, this.time, { //Texto
            fontFamily: 'Babelgam',
            fontSize: 25,
            stroke: '#000000',
            strokeThickness: 3,
            color: '#FFFFFF',
            align: 'center'
        })

        //Contador en si
        //Creamos un intervalo 
        //Ponemos lo que tiene que hacer al pasar el tiempo
        //Ponemos cada cuanto tiempo tiene que hacer la acción
        this.intervaloContador = setInterval(() => {
            this.time--;
        }, 1000);
    }

    update() {

        //Pelotas
        //Para comprobar si lo puede coger o no
        this.playerOneCanTake = this.physics.overlap(   //Si se superponen
            this.pelotas, this.player, (ball, player) => {
                if (!player.stunned && !player.haveBall && player.space.isDown) {
                    player.haveBall = true;
                    ball.destroy()
                    this.down--;
                }
                else if(ball.direction == 1) {
                    player.stunned = true;
                    this.stunOneContador = setInterval(() => {
                        player.stunned = false;
                    }, 2000);
                }
            }, null, this
        );

        //Si hay jugador dos lo hacemos también con el jugador dos
        //Es para que se haga independientemente de si es la IA o el jugador
        if (this.playerdos !== undefined && this.modGame == 'vs') {
            this.playerTwoCanTake = this.physics.overlap(
                this.pelotas, this.playerdos, (ball, player) => {
                if (!player.stunned &&!player.haveBall && player.space.isDown) {
                    player.haveBall = true;
                    ball.destroy();
                    this.up--;
                }
                else if(ball.direction == -1) {
                    player.stunned = true;
                    this.stunTwoContador = setInterval(() => {
                        player.stunned = false;
                    }, 2000);
                }
            }, null, this);
        }

        //Contador
        if (this.time >= 0) {
            this.contador.setText(this.time);
        }
        else {
            this.gameOver();
        }

        //pelotas en juego
        if(this.up >= 10 || this.down >= 10) { this.gameOver(); }
    }

    gameOver() {
        this.winText = this.add.text(130, 200, 'Peguin-Chan', {
            fontFamily: 'Babelgam',
            fontSize: 50,
            stroke: "#FFFFFF" ,
            strokeThickness: 3,
            color: '#5163BB',
            align: 'center'
        })

        if (this.up >= 10) {    //Hemos ganado
            this.winText.setText("You Won :)");
        } else {    //Hemos perdido
            this.winText.setText("You Lost :(");
        }

        //Ponemos la puntuación del juego
        this.puntuacion = this.add.text(150,250, this.up + '/' + this.down, {
            fontFamily: 'Babelgam',
            fontSize: 50,
            stroke: "#FFFFFF" ,
            strokeThickness: 3,
            color: '#5163BB',
            align: 'center'
        })

        this.finalContador = setInterval(() => {
            this.scene.start("title");
        }, 4000);
    }
}