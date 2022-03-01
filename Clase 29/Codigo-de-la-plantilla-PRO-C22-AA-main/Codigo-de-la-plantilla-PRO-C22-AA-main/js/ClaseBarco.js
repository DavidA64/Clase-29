class ClaseBarco{
    constructor(x,y,w,h,posicionBote,boatAnimation){
        //this.x=x
        //this.y=y
        this.h=h
        this.w=w 
        this.posicionBote=posicionBote
        this.boatAnimation=boatAnimation
        this.body=Bodies.rectangle(x,y,w,h)
        this.ImU=loadImage("assets/boat.png")
        World.add(world,this.body)
    }

   MostrarBarquito(){
        var pos=this.body.position 
        //var index= falta piso
        push() 
        translate(pos.x,pos.y);
        imageMode(CENTER)
        image(this.ImU,0,this.posicionBote,this.w,this.h)
        pop()
    }
    animacion(){
        this.speed+=0.05;
        
    }
    remove(index){
        setTimeout(()=>{
            Matter.World.remove(world,barcomatriz[index].body);
            delete barcomatriz[index]
            delete municionMatriz[index]
        },100)

    }
}

