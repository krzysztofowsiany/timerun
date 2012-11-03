
function TimeRun()
{
	this.width = 100;
	this.height = 100;	
	this.pos=1;
	this.left=50;
	this.right=50;
	this.wsk_size=4;
	this.time_step;
	this.top_1;
	this.top_5;
	this.ctx;
	this.time_pos = new Array();
	

	this.drawLine = function(x1,y1,x2,y2, color)
	{
		this.ctx.strokeStyle = color;
		this.ctx.beginPath();

		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
	}

	this.addTimePos = function(dt,name)
	{
		this.time_pos.push({dt:dt, name:name});	
	}

	this.drawNumber = function(x,y, txt, color)
	{
		this.ctx.strokeStyle = color;
		this.ctx.font="10px Georgia";
		this.ctx.strokeText(txt,x,y);
	}

	this.drawTime = function()
	{
		for (x=0;x<65;x++)
		{
			if ((x % 5) == 0)
			{
				this.drawNumber(x * this.time_step + this.pos, this.top_5 - 5,  x, "red");
				this.drawLine(x * this.time_step + this.pos, this.top_5, x * this.time_step + this.pos, this.height, "black");
			}
			else
				this.drawLine(x * this.time_step + this.pos, this.top_1, x * this.time_step + this.pos, this.height, "black");
		}
	}

	this.drawRect = function(x,y,width,height,color)
	{
		this.ctx.strokeStyle=color;
		this.ctx.strokeRect(x,y,width,height);
	}

	this.drawFillRect = function(x,y,width,height,color)
	{
		this.ctx.fillStyle=color;
		this.ctx.fillRect(x,y,width,height);
	}

	this.redraw = function()
	{
		this.drawFillRect(0,0,this.width, this.height, "white");
		this.drawTime();
		this.drawFillRect(0,0, this.left, this.height, "rgba(128, 0, 200, 0.5)");
		this.drawRect(this.left, 0, this.width - this.right - this.left,
			this.height, "rgba(0, 0, 200, 0.5)");
		this.pos--;
		if ((this.pos + (this.time_step * 5)) == 0)
			this.pos=0;
	}

	this.onLoad = function ()
	{
		var c=document.getElementById("timeRun");
		this.ctx=c.getContext("2d");	
		this.width = c.width;
		this.height = c.height;		
		this.right = this.left = (this.width - this.wsk_size) /2;
		this.time_step = this.width / 60;
		this.top_5 = Math.floor(this.height * 0.6);
		this.top_1 = Math.floor(this.height * 0.8);	
		this.redraw();
	}
	
	this.init = function()
	{
		
	}

}

var tm;
function start()
{
	tm = new TimeRun(); 
	tm.onLoad();
	window.setInterval("tm.redraw()",1000);
	
}

window.onload = start;