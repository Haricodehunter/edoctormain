


$(document).ready(function () {

  $('.carousel').carousel();
  
  
  
    $(".parallax-bg").parallaxScroll({friction:.5,direction:"vertical"});
    
  var affixElement = 'header';
  
  $(affixElement).affix({
    offset: {
      // Distance of between element and top page
      top: function () {
        return (this.top = $(affixElement).offset().top)
      },
      // when start #footer 
      bottom: function () { 
        return (this.bottom = $('#footer').outerHeight(true))
      }
    }
  });
  
  $('.owl-carousel').owlCarousel({
      loop:true,
      margin:10,
      nav:true,
      dots:true,
      autoplay:true,
      animateOut: 'fadeOut',
      responsive:{
          0:{
              items:1
          },
          600:{
              items:2
          },
          1000:{
              items:4
          }
      }
  });
  

    $('.navbar-toggle').sidr({
        name: 'respNav',
        source: '.navbar-collapse', 
    });

    $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
      }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
      });


      $(function(){
        $('#happinessorm').on('submit', function(e){
          e.preventDefault();
          $.post('', 
             $('#myForm').serialize(), 
             function(data, status, xhr){
               // do something here with response;
             });
        });
    });

  

    
	var clickEvent = false;
	$('#videoCarousel').carousel({
		interval:   4000	
	}).on('click', '.list-group li', function() {
			clickEvent = true;
			$('.list-group li').removeClass('active');
			$(this).addClass('active');		
	}).on('slid.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('.list-group').children().length -1;
			var current = $('.list-group li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('.list-group li').first().addClass('active');	
			}
		}
		clickEvent = false;
    });
    

    $('.multi-item-carousel').carousel({
        interval: false
      });


      $('.counter .count').each(function() {
        var $this = $(this);
        jQuery({
          Counter: 0
        }).animate({
          Counter: $this.text()
        }, {
          duration: 4500,
          easing: 'swing',
          step: function() {
            var num = Math.ceil(this.Counter).toString();
            if (Number(num) > 999) {
              while (/(\d+)(\d{3})/.test(num)) {
                num = num.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
              }
            }
            $this.text(num);
          }
        });
      });

})

 //this code is close sidr menu if clicked outside  {optional}
 $(document).bind("click", function () {
     $.sidr('close', 'respNav');

     $(function(){
        var $refreshButton = $('#refresh');
        var $results = $('#css_result');
        
        function refresh(){
          var css = $('style.cp-pen-styles').text();
          $results.html(css);
        }
      
        refresh();
        $refreshButton.click(refresh);
        
        // Select all the contents when clicked
        $results.click(function(){
          $(this).select();
        });
      });
      

     videos = document.querySelectorAll("video");
     for (var i = 0, l = videos.length; i < l; i++) {
         var video = videos[i];
         var src = video.src || (function () {
             var sources = video.querySelectorAll("source");
             for (var j = 0, sl = sources.length; j < sl; j++) {
                 var source = sources[j];
                 var type = source.type;
                 var isMp4 = type.indexOf("mp4") != -1;
                 if (isMp4) return source.src;
             }
             return null;
         })();
         if (src) {
             var isYoutube = src && src.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
             if (isYoutube) {
                 var id = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
                 id = (id.length > 1) ? id.splice(1) : id;
                 id = id.toString();
                 var mp4url = "http://www.youtubeinmp4.com/redirect.php?video=";
                 video.src = mp4url + id;
             }
         }
     }
 });