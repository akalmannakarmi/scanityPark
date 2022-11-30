export default class PhyEngine{
    layers = {
        UI2:0,
        UI1:1,
        L1:2,
        L2:3,
        L3:4,
        Bg1:5,
        Bg2:6
    }
    objectsUI1=[];
    objectsUI2=[];
    objectsL1=[];
    objectsL2=[];
    objectsL3=[];
    objectsBg1=[];
    objectsBg2=[];

    drag=0.1;

    constructor(ctx){
        this.ctx=ctx;
        
        this.updateSize()
    }
    
    updateSize(){
        this.gameWidth= this.ctx.canvas.width;
        this.gameHeight= this.ctx.canvas.height;
        this.unitX = this.gameWidth/100;
        this.unitY = this.gameHeight/80;
    }

    addObj(obj,layer=PhyEngine.layers.L1){
        switch (layer) {
            case 0:
                this.objectsUI1.push(obj);
                break;
            case 1:
                this.objectsUI2.push(obj);
                break;
            case 2:
                this.objectsL1.push(obj);
                break;
            case 3:
                this.objectsL2.push(obj);
                break;
            case 4:
                this.objectsL3.push(obj);
                break;
            case 5:
                this.objectsBg1.push(obj);
                break;
            case 6:
                this.objectsBg2.push(obj);
                break;
            default:
                this.objectsL1.push(obj);
                break;
        }
    }

    update(deltatime){
        this.updateSize();
        this.collision(deltatime);
        this.move(deltatime);
    }

    collision(deltatime){
        let objects = [...this.objectsBg2, ...this.objectsBg1, ...this.objectsL3,
            ...this.objectsL2, ...this.objectsL1, ...this.objectsUI2, ...this.objectsUI1];

       objects.forEach(obj1 => {
           objects.forEach(obj2 => {
                //horizontal COllision
                if(obj1.pos.x*this.gameWidth>obj2.pos.x*this.gameWidth && 
                    obj1.pos.x*this.gameWidth+obj1.size.x*this.unitX<
                    obj2.pos.x*this.gameWidth+obj2.size.x*this.unitX &&
                    obj1.id != obj2.id){
                    let d = obj1.pos.x-obj2.pos.x
                    if(d<0){
                        obj1.addVel(-Math.abs(obj1.velocity.x));
                    }else if(d>0){
                        obj1.addVel(Math.abs(obj1.velocity.x));
                    }
                    else{
                        // obj1.scalVel(2);
                    }
                }
           });
       });
    }

    move(deltatime){
        let objects = [...this.objectsBg2, ...this.objectsBg1, ...this.objectsL3,
            ...this.objectsL2, ...this.objectsL1, ...this.objectsUI2, ...this.objectsUI1];

        objects.forEach(obj => {
            // move
            obj.pos.x += obj.velocity.x/deltatime;
            obj.pos.y += obj.velocity.y/deltatime;

            // drag to reduce velocity
            if(obj.velocity.x>0){
                obj.velocity.x -= this.drag * obj.drag/deltatime;
                if(obj.velocity.x<0){obj.velocity.x=0}
            }else if(obj.velocity.x<0){
                obj.velocity.x += this.drag * obj.drag/deltatime;
                if(obj.velocity.x>0){obj.velocity.x=0}
            }
            if(obj.velocity.y>0){
                obj.velocity.y -= this.drag * obj.drag/deltatime;
                if(obj.velocity.y<0){obj.velocity.y=0}
            }else if(obj.velocity.y<0){
                obj.velocity.y += this.drag * obj.drag/deltatime;
                if(obj.velocity.y>0){obj.velocity.y=0}
            }

            //out of bounds check
            if((obj.pos.x*this.gameWidth<0 && obj.velocity.x<0)||(obj.pos.x*this.gameWidth+obj.size.x*this.unitX>this.gameWidth && obj.velocity.x>0)){
                obj.velocity.x = -obj.velocity.x;
            }
            if((obj.pos.y*this.gameHeight<0 && obj.velocity.y<0)||(obj.pos.y*this.gameHeight+obj.size.y*this.unitY>this.gameHeight && obj.velocity.y>0)){
                obj.velocity.y = -obj.velocity.y;
            }
            console.log(obj);
        });
    }

    draw(){
        let objects = [...this.objectsBg2, ...this.objectsBg1, ...this.objectsL3,
             ...this.objectsL2, ...this.objectsL1, ...this.objectsUI2, ...this.objectsUI1];

        objects.forEach(obj => {
            this.ctx.fillStyle = obj.color;
            this.ctx.fillRect(obj.pos.x * this.gameWidth,
                 obj.pos.y*this.gameHeight,
                 obj.size.x*this.unitX, obj.size.y*this.unitY)
        });
    }
}