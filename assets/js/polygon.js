c = document.getElementById("spider");
var ctx = c.getContext('2d');

ctx.canvas.width = 200;
ctx.canvas.height = 200;

class Color {
   constructor(r, g, b, a)
   {
     this.r = r;
     this.g = g;
     this.b = b;
     this.a = a;
   }

   Lerp(c, t)
   {
     return new Color(
     Math.round(this.r + t * (c.r - this.r)),
     Math.round(this.g + t * (c.g - this.g)),
     Math.round(this.b + t * (c.b - this.b)),
     this.a + t * (c.a - this.a)
         );
   }

   SetFillStyle(z)
   {
     ctx.fillStyle =
     "rgba(" +
     this.r + "," +
     this.g + "," +
     this.b + "," +
     this.a + ")";
   }

   ToHex()
   {
      return "#" +
      ("0" + parseInt(this.r,10).toString(16)).slice(-2) +
      ("0" + parseInt(this.g,10).toString(16)).slice(-2) +
      ("0" + parseInt(this.b,10).toString(16)).slice(-2);
   }
}

class Point {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class Polygon {
  constructor(points) {
    this.origin = new Point(0,0);
    this.points = points;
    this.color = new Color(255,255,255,1);
    this.rotation = 0;
  }

  Draw()
  {
    ctx.beginPath();

    for (var i = 0; i < this.points.length; i++)
    {
      var p = RotatePoint(this.points[i]);
      ctx.lineTo(
        (this.origin.x + p.x) + ,
        (this.origin.y + p.y)
      );
    }

    ctx.lineTo(
      this.origin.x + this.points[0].x,
      this.origin.y + this.points[0].y);

    ctx.closePath();

    this.color.SetFillStyle();
    ctx.fill();
  }

  Scale(x, y)
  {
    for (var i = 0; i < this.points.length; i++)
    {
      this.points[i].x *= x;
      this.points[i].y *= y;
    }
  }

  Translate(x, y)
  {
    this.origin.x = x;
    this.origin.y = y;
  }

  RotatePoint(point)
  {
    var angle = v * Math.PI / 180.0;

    outputPoint = new Point(0,0);

    outputPoint.x = Math.cos(this.rotation) * (point.x) - Math.sin(this.rotation) * (point.y);
    outputPoint.y = Math.sin(this.rotation) * (point.x) + Math.cos(this.rotation) * (point.y);

    return outputPoint;
  }

  Rotate(v)
  {
    this.rotation += v;
  }
}

function Lerp(c1, c2, t)
{
   return new Color(
     Math.round(c1.r + t * (c2.r - c1.r)),
     Math.round(c1.g + t * (c2.g - c1.g)),
     Math.round(c1.b + t * (c2.b - c1.b)),
                c1.a + t * (c2.a - c1.a)
       );
}

var p = new Polygon([
  new Point(-1,-0.2),
  new Point(-0,-1),
  new Point(1, -0.2),
  new Point(0.6, 1),
  new Point(-0.6, 1)
]);

/*
var o = new Polygon([
  new Point(-1,-0.2),
  new Point(-0,-1),
  new Point(1, -0.2),
  new Point(0.6, 1),
  new Point(-0.6, 1)
]);
*/

p.Translate(100, 100);

requestAnimationFrame(Tick);

var ticks = 0;
var norm = 1;

function Tick()
{
  ctx.clearRect(0, 0, 200, 200);

  p.Rotate(1);

  requestAnimationFrame(Tick);

  p.Draw();
}
