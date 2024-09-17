function Ball(options) {
  this.radius = options.radius;
  this.point = options.position;
  this.vector = options.vector;
  this.isStatic = options.static || false;
  this.maxVec = 0.4;
  this.numSegment = Math.floor(options.radius / 2 + 1);
  this.boundOffset = [];
  this.boundOffsetBuff = [];
  this.sidePoints = [];
  if (!this.isStatic) {
    this.sidePoints2 = [];

    this.path2 = new Path({
      blendMode: "lighten",
      fillColor: "white"
    });
  }
  this.mouse = options.mouse || false;
  this.fillColor = options.fillColor;
  this.path = new Path({
    blendMode: "lighter",
    fillColor: options.fillColor || "transparent"
  });

  if (this.mouse) {
    this.path.fillColor = "transparent";
  }

  for (var i = 0; i < this.numSegment; i++) {
    this.boundOffset.push(this.radius);
    this.boundOffsetBuff.push(this.radius);
    this.path.add(new Point());
    this.path.closed = true;

    if (!this.isStatic) {
      this.path2.add(new Point());
      this.path2.closed = true;

      this.sidePoints2.push(
        new Point({
          angle: (360 / this.numSegment) * i,
          length: 0.5
        })
      );
    }

    this.sidePoints.push(
      new Point({
        angle: (360 / this.numSegment) * i,
        length: 1
      })
    );
  }
}

Ball.prototype = {
  iterate: function() {
    this.checkBorders();
    if (this.vector.length > this.maxVec) {
      this.vector.length = this.maxVec;
    }
    this.point += this.vector;
    this.updateShape();
  },

  checkBorders: function() {
    var size = view.size;

    if (this.point.x < this.radius) {
      this.vector.angle = 180 - this.vector.angle;
    }
    if (this.point.x > size.width - this.radius) {
      this.vector.angle = 180 - this.vector.angle;
    }
    if (this.point.y < this.radius) {
      this.vector.angle = -this.vector.angle;
    }
    if (this.point.y > size.height - this.radius) {
      this.vector.angle = -this.vector.angle;
    }
  },

  updateShape: function() {
    var segments = this.path.segments;
    if (!this.isStatic) {
      var segments2 = this.path2.segments;
    }

    for (var i = 0; i < this.numSegment; i++) {
      segments[i].point = this.getSidePoint(i);
      if (!this.isStatic) {
        segments2[i].point = this.getSidePoint2(i);
      }
    }

    this.path.smooth();
    if (!this.isStatic) {
      this.path2.smooth();
    }
    for (var i = 0; i < this.numSegment; i++) {
      if (this.boundOffset[i] < this.radius / 2)
        this.boundOffset[i] = this.radius / 2;
      var next = (i + 1) % this.numSegment;
      var prev = i > 0 ? i - 1 : this.numSegment - 1;
      var offset = this.boundOffset[i];
      offset += (this.radius - offset) / 15;
      offset +=
        ((this.boundOffset[next] + this.boundOffset[prev]) / 2 - offset) / 25;
      this.boundOffsetBuff[i] = this.boundOffset[i] = offset;
    }
  },

  react: function(b) {
    if (!this.isStatic) {
      var dist = this.point.getDistance(b.point);
      if (dist < this.radius + b.radius && dist != 0) {
        var overlap = this.radius + b.radius - dist;
        var direc = (this.point - b.point).normalize(overlap * 0.0015);
        this.vector += direc;
        b.vector -= direc;
        this.calcBounds(b);
        b.calcBounds(this);
        this.updateBounds();
        b.updateBounds();
      }
    }
  },

  getBoundOffset: function(b) {
    var diff = this.point - b;

    var angle = (diff.angle + 180) % 360;

    return this.boundOffset[
      Math.floor((angle / 360) * this.boundOffset.length)
    ];
  },

  calcBounds: function(b) {
    for (var i = 0; i < this.numSegment; i++) {
      var tp = this.getSidePoint(i);

      var bLen = b.getBoundOffset(tp);
      var td = tp.getDistance(b.point);
      if (td < bLen) {
        if (b.mouse) {
          this.boundOffsetBuff[i] -= (bLen - td) / 30;
        } else {
          this.boundOffsetBuff[i] -= (bLen - td) / 2;
        }
      }
    }
  },

  getSidePoint: function(index) {
    return this.point + this.sidePoints[index] * this.boundOffset[index];
  },

  getSidePoint2: function(index) {
    return this.point + this.sidePoints2[index] * this.boundOffset[index];
  },

  updateBounds: function() {
    for (var i = 0; i < this.numSegment; i++) {
      this.boundOffset[i] = this.boundOffsetBuff[i];
    }
  },

  changePos: function(pos) {
    this.point = pos;
  }
};

//--------------------- main ---------------------

var balls = [];
var numBalls = 2;

var windowWidth = $(window).width();

for (var i = 0; i < numBalls; i++) {
  var position;
  if (windowWidth > 700) {
    position = i === 0 ? new Point(300, 200) : new Point(1000, 500);
  } else {
    position = i === 0 ? new Point(150, 300) : new Point(400, 250);
  }
  var fillColor = i === 0 ? "#b8dab4" : "#f59eb7";
  var vector = new Point({
    angle: 360 * Math.random(),
    length: Math.random() * 15
  });
  var radius = windowWidth > 700 ? 200 : 100;
  balls.push(
    new Ball({
      radius: radius,
      position: position,
      vector: vector,
      fillColor: fillColor
    })
  );
}

balls.push(
  new Ball({
    radius: windowWidth > 700 ? 50 : 25,
    position: windowWidth > 700 ? new Point(600, 500) : new Point(300, 200),
    vector: new Point({
      angle: 360 * Math.random(),
      length: Math.random()
    }),
    fillColor: "#ebc388",
    static: true
  })
);

// circle for mouse
var circlePath = new Ball({
  radius: windowWidth > 700 ? 50 : 25,
  position: new Point(0, 0),
  vector: 0,
  mouse: true
});
balls.push(circlePath);

function onFrame() {
  for (var i = 0; i < balls.length - 1; i++) {
    for (var j = i + 1; j < balls.length; j++) {
      balls[i].react(balls[j]);
    }
  }
  for (var i = 0, l = balls.length; i < l; i++) {
    balls[i].iterate();
  }
}

function onMouseMove(event) {
  // set position for mouseCircle
  balls[balls.length - 1].changePos(event.point);
}
