
var SMath={
round:function(x,y) {var y=y||0;y=Math.pow(10,y); var x = x * y; x = Math.round(x); x = x / y; return x;},
ceil:function(x,y) {var y=y||0;y=Math.pow(10,y); var x = x * y; x = Math.ceil(x); x = x / y; return x;},
floor:function(x,y) {var y=y||0;y=Math.pow(10,y); var x = x * y; x = Math.floor(x); x = x / y; return x;}
}
