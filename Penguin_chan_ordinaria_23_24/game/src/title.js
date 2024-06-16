//Creamos la escena
export default class Title extends Phaser.Scene {

	//Constructor de la escena
	constructor(){
        super({ key: 'title' });
    }

	//Hacemos el create, lo que ocurre al crear la escena
	create() {

		console.log("Título");
	}
}
