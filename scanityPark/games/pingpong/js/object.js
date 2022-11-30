export default  class Obj {
    static last_id = 0;
    constructor(posX,posY,sizeX,sizeY,color,collision=1,velX=0,velY=0,mass=1,drag=0){
        Obj.last_id +=1;
        this.id = Obj.last_id;

        this.pos={
            x:posX,
            y:posY
        }
        this.size={
            x:sizeX,
            y:sizeY
        }
        this.velocity={
            x:velX,
            y:velY
        }

        this.color=color;

        this.collision=collision;
        this.drag=drag;
        this.mass=mass;
    }

    revVel(){
        this.velocity.x = -this.velocity.x;
        this.velocity.y = -this.velocity.y;
    }
    revVelx(){
        this.velocity.x = -this.velocity.x;
    }
    revVely(){
        this.velocity.y = -this.velocity.y;
    }

    addVel(velX=0, velY=0){
        this.velocity.x += velX;
        this.velocity.y += velY;
    }
    scalVel(scale){
        this.velocity.x *= scale;
        this.velocity.y *= scale;
    }

    addforce(forceX,forceY){
        this.velocity.x += velX/mass;
        this.velocity.y += velY/mass;
    }
    
    
    
}
