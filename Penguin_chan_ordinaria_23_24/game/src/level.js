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

        //Colocamos todo lo visual
        this.bg = this.add.image(256, 255, "fondo");    //fondo
        this.mesa = this.add.image(240, 320, "mesa");   //Mesa
        this.score = this.add.image(400,300, "score");  //Puntuación
    }
}