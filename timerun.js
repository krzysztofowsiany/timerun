function TimeRun(history, future, rows)
{
	this.history_seconds = history;
	this.future_seconds = future;
	this.rows = rows;
	this.full_size =  history + future;
	this.width = 100;
	this.height = 100;	
	this.pos=1;
	this.left=50;
	this.right=50;
	this.wsk_size=4;
	this.time_step;
	this.step = 10;
	this.top_1;
	this.top_5;
	this.ctx;
	this.currentSeconds;
	this.curr_row=0;
	this.row_height=30;
	this.time_pos = new Array();	

	this.drawLine = function(x1,y1,x2,y2, color)
	{
		this.ctx.strokeStyle = color;
		this.ctx.beginPath();
		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
	}

	this.addTimePos = function(dt,length,name)
	{
		this.time_pos.push({dt:dt / 1000, length:length,name:name});	
	}

	this.drawNumber = function(x,y, txt, color)
	{
		this.ctx.strokeStyle = color;
		this.ctx.font="10px Georgia";
		this.ctx.strokeText(txt,x,y);
	}
	
	this.drawText = function(x,y, txt, color, font)
	{	
		this.ctx.fillStyle = color;
		this.ctx.font=font;
		this.ctx.fillText(txt,x,y);
	}

	this.drawTime = function()
	{
		for (x=0;x<this.full_size;x++)
		{
			if ((x % this.step) == 0)
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
	
	
	this.drawEvent = function(id)
	{
		var start = this.time_pos[id].dt - this.currentSeconds;
		var x=(this.history_seconds + start) * this.time_step;
		this.ctx.fillStyle="blue";
		this.ctx.fillRect(x,this.curr_row*this.row_height,this.time_pos[id].length * this.time_step ,this.row_height);	
		
		this.drawText(x,this.curr_row*this.row_height+20,this.time_pos[id].name,"white","20px Georgia");
		 
		if (this.curr_row>= this.rows)
			this.curr_row=0;
		else
			this.curr_row++;
			
	}
	
	this.drawEvents = function()
	{
		for (i=0;i<this.time_pos.length;i++)
		{
			if ((this.time_pos[i].dt>= this.currentSeconds - this.history_seconds)
				||
				(this.time_pos[i].dt<= this.currentSeconds + this.future_seconds)
				)
					this.drawEvent(i);
					
			//alert(this.currentSeconds+":"+this.time_pos[i].dt);
		}
	}
	
	this.setCurrentDate = function()
	{
		var d = new Date();
		this.currentSeconds = d.getTime() / 1000; 
	}
	
	this.redraw = function()
	{
		this.setCurrentDate();
		this.drawFillRect(0,0,this.width, this.height, "white");
		//this.drawTime();
		this.curr_row=0;
		this.drawEvents();
		this.drawFillRect(0,0, this.left, this.height, "rgba(128, 128, 128, 0.8)");
		this.drawRect(this.left, 0, this.width - this.right - this.left,
			this.height, "rgba(0, 0, 200, 0.5)");
		this.pos--;
		
		if ((this.pos + (this.time_step * this.step)) == 0)
			this.pos=0;
	}

	this.onLoad = function ()
	{
		var c=document.getElementById("timeRun");
		this.ctx=c.getContext("2d");	
		this.width = c.width;
		this.height = c.height;		
		this.time_step = this.width / this.full_size;
		this.row_height = this.height / this.rows; 
		this.right = this.time_step * this.future_seconds - this.wsk_size /2;
		this.left = this.time_step * this.history_seconds - this.wsk_size /2;
		
		this.top_5 = Math.floor(this.height * 0.6);
		this.top_1 = Math.floor(this.height * 0.8);	
		this.step = this.full_size /10;
		this.redraw();
	}
	
}

