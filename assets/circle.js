$(function() {

	var len = $("li").length;

	$("li").each(function(i) {

		var deg = 360 / len * i;

		$(this).css({

			"background": "url(assets/images/" + i + ".png) round",

			"transition": "1s all ease-in-out " + (len-i) * 200 + "ms",

			"transform": "rotateY(" +deg+ "deg) translateZ(450px)"

		}).bind("transitionend", function() {

			fn.change_opacity();

		});
	});

	var fn = {

		/* ===== 改变不透明度 ===== */
		change_opacity: function() {

			$("li").each(function(i) {

				var deg = (360 / len * i + x / 10) % 360;

				if(deg > 180){

					deg = 360 - deg;

				}

				deg = Math.abs(180 - deg);

				var opacity_mun = deg / 180;

				opacity_mun < 0.3 && (opacity_mun = 0.3);

				$(this).css({

					"transition": "1s all ease",

					"opacity": opacity_mun
				});
			})		
		},

		set_timing: function() {

			timing = setInterval(function() {
					
				x += swingx;

				y += swingy;

				/* ===== 速度逐渐减小 ===== */
				swingx *= 0.96;

				swingy *= 0.96;

				/* ===== 当速度小于 1 时 停止运动 ===== */
				if (Math.abs(swingx) < 1) {

					swingx = 0;
				}

				if (Math.abs(swingy) < 1) {

					swingy = 0;
				}

				fn.range();

				/* ===== x 与 y 的速度都等于 0 时，清除定时函数 ===== */
				if (swingx == 0 && swingy == 0) {

					clearInterval(timing);

				}
				
				fn.set_deg();

			}, 30);
		},

		/* ===== 限定 y 的范围 ===== */
		range: function() {

			if (y > 666) {

				y = 666;

			} else if (y < -666) {

				y = -666;
				
			}				
		},

		/* ===== 改变角度 ===== */
		set_deg: function() {

			$(".container").css("transform", "rotateX(" +(-y/10)+ "deg) rotateY(" +x/10+ "deg)")
		},

		/* ===== 鼠标或触屏甩动之后的匀速 ===== */
		speed: function() {

			swingx = x - endx;

			swingy = y - endy;			

			endx = x;

			endy = y;
		}
	};

	/* ===== 声明坐标参数 ===== */
	var x = 0;

	var y = 100;

	var swingx = 0;

	var swingy = 0;

	var endx = 0;

	var endy = 0;

	/* ===== 鼠标按下事件 ===== */
	$(document).mousedown(function(e) {

		var index = 0;

		/* ===== 获取鼠标坐标 ===== */
		var coorx = e.clientX - x;

		var coory = e.clientY - y;

		/* ===== 阻止默认事件 ===== */
		e.preventDefault()

		$(document).bind({
 			
 			/* ===== 鼠标移动事件 ===== */
			"mousemove": function(e) {
				
				index++;

				x = e.clientX - coorx;

				y = e.clientY - coory;

				fn.range();
				
				fn.set_deg();

				fn.speed();

				if (index == 1) {

					swingx = 0;

					swingy = 0;

				}
			},

			/* ===== 鼠标松开事件 ===== */
			"mouseup": function(e) {

				$(document).off("mousemove mouseup");
				
				fn.change_opacity();

				fn.set_timing();
			}
		});
	});

	/* ===== 触摸开始 ===== */
	document.ontouchstart = function(e) {

		e.preventDefault();

		/* ===== 获取第一个触点 ===== */
		var touch = e.targetTouches[0];

		start_posx = touch.pageX -x;

		start_posy = touch.pageY -y;
		
	};

	/* ===== 触摸移动 ===== */
	document.ontouchmove = function(e) {

		var touch = e.targetTouches[0];

		x = touch.pageX - start_posx;

		y = touch.pageY - start_posy;

		fn.range();

		fn.set_deg();

		fn.speed();
	};

	/* ===== 触摸结束 ===== */
	document.ontouchend = function(e) {
		
		fn.change_opacity();

		fn.set_timing();
	};
});