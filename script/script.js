$(document).ready(function(){

	if(window.innerWidth <= 800 && window.innerHeight <= 600) {return;}

	var $height = $(window).height();

	//ScrollMagic Controller
	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
	    	duration: $height,
	    	triggerHook: 0,
	    	reverse: true,
	    	offset:0
	  	}
	});

	//Modify behavior of controller to scroll instead of jump
	controller.scrollTo(function(target){
		//Callback triggered when scrolled to "target" position

		TweenMax.to(window,.5,{
			scrollTo:{
				y:target,
				autoKill:true
			},
			ease:Cubic.easeInOut
		})
	})

	//Add scenes for anchor scroll
	//TODO: durations need adjustment

	var anchor1 = new ScrollMagic.Scene({
			triggerElement:'#intro',
		})
		.setClassToggle('#intro-anchor','active')
		.addTo(controller);

	var anchor2 = new ScrollMagic.Scene({
			triggerElement:'#history',
		})
		.setClassToggle('#history-anchor','active')
		.addTo(controller);

	var anchor3 = new ScrollMagic.Scene({triggerElement:'#approach'})
		.setClassToggle('#approach-anchor','active')
		.addTo(controller);

	var anchor4 = new ScrollMagic.Scene({triggerElement:'#process'})
		.setClassToggle('#process-anchor','active')
		.addTo(controller);

	var anchor5 = new ScrollMagic.Scene({triggerElement:'#engagement-1'})
		.setClassToggle('#engagement-anchor','active')
		.addTo(controller);
	var anchor6 = new ScrollMagic.Scene({triggerElement:'#team'})
		.setClassToggle('#team-anchor','active')
		.addTo(controller);

	// SCENES
	TweenMax.fromTo('#intro .arrow',.5,{
			top:'0px'
		},{
			top:'10px',
			repeat:-1,
			yoyo:true
		});

	TweenMax.fromTo('#process .arrow',.5,{
			top:'0px'
		},{
			top:'10px',
			repeat:-1,
			yoyo:true
		});

	//Fade overlay to 0 in #intro
	var tween1 = TweenMax.to('#aerial-overlay',0.5,{
			opacity:0
		});
	var tween4 = TweenMax.to('.overlay-label',.5,{
			opacity:1
		})
	var scene1 = new ScrollMagic.Scene({
			triggerElement:'#intro-2',
		})
		.setTween(tween1)
		.addTo(controller)
		.triggerHook(0.25)
		.duration(0);
	var scene2 = new ScrollMagic.Scene({
			triggerElement:'#intro-2'
		})
		.setTween(tween4)
		.addTo(controller)
		.duration(0)
		.triggerHook(.25)


	//Move cirlces
	var tween2 = TweenMax.to('#design',1,{top:'300px'}),
		tween3 = TweenMax.to('#strategy',1,{top:'-300px'}).eventCallback('onComplete',function(){
				$('#approach #arrow').css({
					background:'url(assets/arrow-04.png) no-repeat 75px top',
					'background-size':'auto 100%'
				})
			})
			.eventCallback('onReverseComplete',function(){
				$('#approach #arrow').css({
					background:'url(assets/arrow-03.png) no-repeat 75px top',
					'background-size':'auto 100%'
				})
			})
	var scene3_1 = new ScrollMagic.Scene({
			triggerElement:'#approach'
		})
		.setTween(tween2)
		.addTo(controller)
		.duration(0);
	var scene3_2 = new ScrollMagic.Scene({
			triggerElement:'#approach'
		})
		.setTween(tween3)
		.addTo(controller)
		.duration(0);

	//Pin process diagram to top
	var scene5 = new ScrollMagic.Scene({
			triggerElement:'#process'
		})
		.setPin('#three-step')
		.addTo(controller)
		.duration($height*4)
	//Animate the three steps
	var tween4 = TweenMax.to('#step-1',.5,{opacity:0}),
		tween5 = TweenMax.fromTo('#step-2',.5,{opacity:0},{opacity:1}),
		tween6 = TweenMax.fromTo('#step-3',.5,{opacity:0},{opacity:1});
	/*var scene6 = new ScrollMagic.Scene({
			triggerElement:'#process-3' //when "engagement" comes on, flash on public meeting icons
		})
		.setTween(tween5)
		.addTo(controller)
		.triggerHook(.5)
		.duration(0)*/
	var scene7 = new ScrollMagic.Scene({
			triggerElement:'#process-4'
		})
		.setTween(tween4)
		.addTo(controller)
		.triggerHook(.5)
		.duration(0)
	var scene8 = new ScrollMagic.Scene({
			triggerElement:'#process-4' //"Phase 1"
		})
		.setTween(tween6)
		.addTo(controller)
		.triggerHook(.5)
		.duration(0)



	//Wire navigation bar
	$('.nav-item a').on('click',function(e){
		var id = $(this).attr('href');

		if($(id).length > 0){
			e.preventDefault();

			controller.scrollTo(id);
		}
	})


	//Resize the image containers
	$('.image-overlay').each(function(){
		var that = $(this);
			$target = $('#' + that.data('overlay-target'));

		$target.imagesLoaded()
			.done(function(instance){
				var img = instance.elements[0];

				that.css({
					width: img.clientWidth + 'px',
					height: img.clientHeight + 'px'
				})
				.fadeIn();
			})
	}); 

});