c = document.getElementById("spider");
var ctx = c.getContext('2d');

ctx.canvas.width = 200;
ctx.canvas.height = 200;

class Point {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class Polygon {
  constructor(points) {
    this.points = points;
  }

  Draw()
  {
    ctx.beginPath();

    for (var i = 0; i < this.points.length; i++)
    {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }

    ctx.lineTo(this.points[0].x, this.points[0].y);
    ctx.closePath();
  }
}

requestAnimationFrame(Tick);

var p = new Polygon([
  new Point(10, 10),
  new Point(10, 20),
  new Point(20, 20),
  new Point(20, 10),
  new Point(25, 30)
]);

function Tick()
{
  ctx.clearRect(0, 0, 200, 200);

  requestAnimationFrame(Tick);

  p.Draw();

  ctx.fillStyle = "#000000";
  ctx.fill();
}
