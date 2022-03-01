class ClaseCannon{
    constructor(x,y,w,h,a){      
            this.x=x;
            this.y=y;
            this.w=w;
            this.h=h;
            this.a=a;
            this.ImB=loadImage("assets/cannonBase.png");
            this.ImC=loadImage("assets/canon.png");
    }

    Mostrar(){
        if(keyIsDown(LEFT_ARROW)&&this.a>-30){
            this.a -= 1
        }   
        if(keyIsDown(RIGHT_ARROW)&&this.a<60){
            this.a += 1
        }   
        push();
            translate(this.x,this.y);
            rotate(this.a);
            imageMode(CENTER);
            image(this.ImC,0,0,this.w,this.h);
        pop();
        image(this.ImB,35,40,200,200);
    }
}