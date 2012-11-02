
var TimeRun = Class.create( {
	initialize: function (){
			this.width = 100;
			this.height = 100;	
			this.pos=1;
			this.left=50;
			this.right=50;
			this.wsk_size=4;
			this.time_step;
			this.top_1;
			this.top_5;
			this.ctx=Null;
			this.time_pos = new Array();
			window.onload = this.onLoad;
		},

		drawLine: function(x1,y1,x2,y2, color)
		{
			this.ctx.strokeStyle = color;
			this.ctx.beginPath();

			this.ctx.moveTo(x1,y1);
			this.ctx.lineTo(x2,y2);
			this.ctx.stroke();
		},

		addTimePos: function(dt,name)
		{
			this.time_pos.push({dt:dt, name:name});	
		},

		drawNumber: function(x,y,txt,  color)
		{
			this.ctx.strokeStyle = color;
			this.ctx.font="10px Georgia";
			this.ctx.strokeText(txt,x,y);
		},

		drawTime: function()
		{
			for (x=0;x<65;x++)
			{
				if ((x % 5) == 0)
				{
					this.drawNumber(x*time_step +pos,
					top_5 - 5,x*time_step+pos, x,"red");
					this.drawLine(x*time_step +pos,top_5,x*time_step+pos,height, "black");
				}
				else
					this.drawLine(x*time_step+pos,top_1,x*time_step+pos,height, "black");
			}
		},

		drawRect: function(x,y,width,height,color)
		{
			this.ctx.strokeStyle=color;
			this.ctx.strokeRect(x,y,width,height);
		},

		drawFillRect: function(x,y,width,height,color)
		{
			this.ctx.fillStyle=color;
			this.ctx.fillRect(x,y,width,height);
		},

		redraw: function()
		{
			this.drawFillRect(0,0,this.width, this.height, "white");
			this.drawTime();
			this.drawFillRect(0,0, this.left, this.height, "rgba(128, 0, 200, 0.5)");
			this.drawRect(this.left, 0, this.width - this.right - this.left,
				this.height, "rgba(0, 0, 200, 0.5)");
			pos--;
			if ((pos + (time_step*5)) == 0)
				pos=0;
		},

		onLoad: function ()
		{
			var c=document.getElementById("timeRun");
			ctx=c.getContext("2d");	
			width = c.width;
			height = c.height;		
			right = left = (width - wsk_size) /2;
			time_step = width / 60;
			top_5 = Math.floor(height * 0.6);
			top_1 = Math.floor(height * 0.8);
			setInterval(function(){redraw()},1000);	
		}
	});

	
	var tm = new TimeRun(); 
