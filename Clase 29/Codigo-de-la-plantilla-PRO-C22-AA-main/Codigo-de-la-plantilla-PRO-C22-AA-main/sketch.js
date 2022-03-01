const World = Matter.World 
const Bodies = Matter.Bodies
const Engine = Matter.Engine 

var world 
var engine 
var pistola, a=15, balas, a, barquitos,piso
var fondo, torre, barco, municionMatriz=[], animacionBote=[],barcomatriz=[], datosBote,sheet



function preload() {
fondo = loadImage("assets/background.gif")
torre = loadImage("assets/tower.png")
datosBase = loadJSON("boat/boat.json")
sheet = loadImage("boat/boat.png")
}

function setup() {
    createCanvas(1200,600)
    angleMode(DEGREES)
    a=15
    engine = Engine.create();
    world = engine.world;
    pistola = new ClaseCannon(140,130,130,100,a)
   piso= Bodies.rectangle(width,height,width*2,10,{isStatic:true})
   World.add(world,piso)
    /*var frameBarco=datosBote.frames
    for(var I = 0;I>frameBarco.length;I++){
        var pos = frameBarco[I].position;
        var imagenBote= sheet.get(pos.x,pos.y,pos.w,pos.h)
        animacionBote.push(imagenBote)
    }*/

}

function draw() { 
  
    image(fondo,0,0,width,height)
    image(torre,50,210,150,300)
    Engine.update(engine);  


    for(var I = 0;I<municionMatriz.length;I++){
        Mostrarbalas(municionMatriz[I],I)
        destruccion(I)
        pisobala(I)

    }

    pistola.Mostrar()
    rect(piso.position.x,piso.position.y,width*2,1)
     //barquitos.MostrarBarquito()

     crearBarco()
}

function keyPressed(){
    if(keyCode===DOWN_ARROW){
        balas = new ClaseBalas(pistola.x,pistola.y) 
        Matter.Body.setAngle(balas.body,pistola.a)    
        municionMatriz.push(balas)
        console.log("indicadorBalas",municionMatriz.length)
    }
}
  
function Mostrarbalas(bala,index){
    if(bala){
     bala.MostrarBala() 
    }
}

function keyReleased(){
    if(keyCode===DOWN_ARROW){
        municionMatriz[municionMatriz.length-1].Disparos();
    }
}

function crearBarco(){
    
    if(barcomatriz.length>0){
        if(barcomatriz[barcomatriz.length-1]===undefined ||barcomatriz[barcomatriz.length-1].body.position.x<width-300){
            var posiciones =[-20,-40,-60,-70]
            var posicion = random(posiciones);
            var barquitos = new ClaseBarco(width,height-100,200,200,posicion,{resitution:-10})
            barcomatriz.push(barquitos)
        }
        for(var B=0;B<barcomatriz.length;B++){
            if(barcomatriz[B]){
                Matter.Body.setVelocity(barcomatriz[B].body,{x:-3,y:0})
                barcomatriz[B].MostrarBarquito()
            }
        }
    }
    else{
        var barquitos 
        barquitos = new ClaseBarco(width,height-100,100,100,-60,{resitution:-10})
        barcomatriz.push(barquitos)
    }
}


function destruccion(index){
    for(var I=0;I<barcomatriz.length;I++){
        if(municionMatriz[index]!== undefined && barcomatriz[I]!==undefined){
            var colision = Matter.SAT.collides(municionMatriz[index].body,barcomatriz[I].body);
            if(colision.collided){
                barcomatriz[I].remove(I)
                Matter.World.remove(world,municionMatriz[index].body)
                delete municionMatriz[index]
            }
        }
    }
}

function pisobala(index){
    console.log("contador",index)
   if(municionMatriz[index]!==undefined){
       console.log("marcador",municionMatriz[index])
       console.log("elpiso",piso.body)
       var colision2 = Matter.SAT.collides(municionMatriz[index].body,piso.body)
       if(colision2.collided){
           //municionMatriz[index].remover(index)
           Matter.World.remove(world,municionMatriz[index].body)
           delete municionMatriz[index]
       }
   }
}
