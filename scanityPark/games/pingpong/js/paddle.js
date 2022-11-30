export default class Paddle{
    constructor(ctx,posX,PosY,SizeX,SizeY){
        this.updateSize(ctx.canvas.width,ctx.canvas.height)
    }

    updateSize(gameWidth,GameHeight){
        this.gameWidth = gameWidth;
        this.GameHeight = GameHeight;
        this.width = gameWidth/8;
        this.height = GameHeight/20;

        this.postion = {
            x:gameWidth/2 - this.width/2,
            y:GameHeight - this.height*2
        };
    }

    draw(ctx){
        ctx.fillRect(this.postion.x,this.postion.y,this.width,this.height);
        console.log("draw");
    }

    update(ctx){
        if(this.gameWidth!=ctx.canvas.width || this.GameHeight !=ctx.canvas.height){
            this.updateSize(ctx.canvas.width,ctx.canvas.height);
        }
    }
}