
//格子类
class Tile extends egret.DisplayObjectContainer {

    data: TileData;

    constructor(data: TileData) {
        super();
        this.data = data;
        var bitmap = new egret.Bitmap;
        var size:number = 50;
        bitmap.texture = RES.getRes(data.image);
        bitmap.x = (data.x - 1) * size;
        bitmap.y = (data.y - 1) * size;
        this.addChild(bitmap);
        //console.log(data.image)
    }

    public clickEvent(): void {
        console.log(this.x);
        console.log(this.y);
    }
}

//地图类
class TileMap extends egret.DisplayObjectContainer {

    public static TILE_SIZE = 100;

    constructor() {
        super();
        this.init();
    }

    private init() {

        for (var i = 0; i < config.length; i++) {
            var data = config[i];
            var tile = new Tile(data);
            this.addChild(tile);
            //console.log("init success")
        }
        this.touchEnabled = true;

    }

    private grid: Grid = new Grid(10, 10);
    private astar: AStar = new AStar();

    public astarPath(beginX: number, beginY: number, endX: number, endY: number): Point[] {

        var path: Point[] = new Array();
        this.grid.setStartPoint(beginX, beginY);
        this.grid.setEndPoint(endX, endY);

        if (this.astar.findPath(this.grid)) {
            path = this.astar.getPath();
        }

        return path;

    }

}

