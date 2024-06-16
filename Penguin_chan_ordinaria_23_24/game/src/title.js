//Creamos la escena
export default class Title extends Phaser.Scene {

	//Constructor de la escena
	constructor(){
        super({ key: 'title' });
    }

    //Añadimos los listener para los eventos
    preload() {
        this.eventEmitter = new Phaser.Events.EventEmitter();
    }

	//Hacemos el create, lo que ocurre al crear la escena
	create() {

		console.log("Título");

        //Hacemos referencia a esta misma escena
        const scene = this;

        /* TEXTO */
        //Primero añadimos la posición (x,y)
        //Luego ponemos el texto que queremos que escriba
        //Por último entre corchetes todas las características de estilo

        //fontFamily -> Tipografía del texto
        //fontSize -> Tamaño de la letra
        //stroke -> Borde de la letra
        //strokeThickness -> Grosor del borde
        //Color -> Color de la letra
        //align -> alineación

        //TITULO DEL JUEGO
        this.add.text(115, 25, 'Peguin-Chan', {
            fontFamily: 'Babelgam',
            fontSize: 50,
            stroke: "#FFFFFF" ,
            strokeThickness: 3,
            color: '#5163BB',
            align: 'center'
        })

        this.add.text(200, 80, 'Wars', {
            fontFamily: 'Babelgam',
            fontSize: 50,
            stroke: "#FFFFFF" ,
            strokeThickness: 3,
            color: '#5163BB',
            align: 'center'
        })

        /* BOTONES */
        //Escribimos los textos de lo botones
        //Asignamos la variable al texto

        //1P. Game
        this.OneplayerButton = this.add.text(200, 200, '1P. Game', {
            fontFamily: 'Babelgam',
            fontSize: 25,
            stroke: '#000000',
            strokeThickness: 3,
            color: '#FFFFFF',
            align: 'center'
        })

        //VS. Game
        this.VSButton = this.add.text(200, 240, 'VS. Game', {
            fontFamily: 'Babelgam',
            fontSize: 25,
            stroke: '#000000',
            strokeThickness: 3,
            color: '#FFFFFF',
            align: 'center'
        })
        
        /* INPUT DE TECLAS */

        //Teclas utilizadas para el input
        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            select: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        //Emitimos el evento de cambio de escena cuando seleccionamos una opción
        //Lo hacemos así porque scene no existe fuera del create
        this.eventEmitter.on('select', function() {
            this.ChangeScene('level', scene, this.selection)
        }, this);

        /* CURSOR */
        //Ponemos la posición y luego la imagen en si
        this.ball = this.add.image(this.OneplayerButton.x - 10, this.OneplayerButton.y + 12, 'ball');
        this.selection = 'one'; //Para saber el modo que se elige
	}

    update() {
        if (this.cursors.up.isDown) {
            this.selection = 'one';
            this.ball.y = this.OneplayerButton.y + 12;
        }
        if (this.cursors.down.isDown) {
            this.selection = 'vs'
            this.ball.y = this.VSButton.y + 12;
        }

        if (this.cursors.select.isDown) {
            this.eventEmitter.emit('select')
        }
    }

    //Métodos
    ChangeScene(newScene, escena, players) {
        //Cargamos la nueva escena
        //El segundo parámetro dicta el número de jugadores
        escena.scene.start(newScene, players);
    }
}
