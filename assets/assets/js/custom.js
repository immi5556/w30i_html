 (function(){
  
  //Chenges in commit....
  $('.form-row input').each(function(){
                            if($(this).val() > 0){
                            $(this).closest('.form-row').addClass('focus');
                            $(this).closest('.form-row').find('label').addClass('animated zoomOutLeft');
                            $(this).closest('.form-row').find('.closeIcon').addClass('animated rotateIn');
                            }else {
                            $(this).closest('.form-row').removeClass('focus');
                            $(this).closest('.form-row').find('label').removeClass('animated zoomOutLeft');
                            $(this).closest('.form-row').find('label').addClass('animated zoomInRight');
                            $(this).closest('.form-row').find('.closeIcon').removeClass('animated rotateIn');
                            $(this).closest('.form-row').find('.closeIcon').addClass('animated rotateOut');
                            }
                            })
  
  $('.form-row input').focus(function(){
                             $(this).closest('.form-row').addClass('focus');
                             $(this).closest('.form-row').find('label').addClass('animated zoomOutLeft');
                             $(this).closest('.form-row').find('.closeIcon').removeClass('animated rotateOut');
                             $(this).closest('.form-row').find('.closeIcon').addClass('animated rotateIn');
                             if($(this).val().length > 0){
                             $(this).closest('.form-row').addClass('focus');
                             $(this).closest('.form-row').find('label').addClass('animated zoomOutLeft');
                             $(this).closest('.form-row').find('.closeIcon').removeClass('animated rotateOut');
                             $(this).closest('.form-row').find('.closeIcon').addClass('animated rotateIn');
                             }
                             });
  $('.form-row input').blur(function(){
                            if($(this).val().length > 0){
                            $(this).closest('.form-row').addClass('focus');
                            
                            $(this).closest('.form-row').find('label').removeClass('animated zoomInRight');
                            $(this).closest('.form-row').find('label').addClass('animated zoomOutLeft');
                            $(this).closest('.form-row').find('.closeIcon').removeClass('animated rotateOut');
                            $(this).closest('.form-row').find('.closeIcon').addClass('animated rotateIn');
                            }else {
                            $(this).closest('.form-row').removeClass('focus');
                            $(this).closest('.form-row').find('label').removeClass('animated zoomOutLeft');
                            $(this).closest('.form-row').find('label').addClass('animated zoomInRight');
                            $(this).closest('.form-row').find('.closeIcon').removeClass('animated rotateIn');
                            $(this).closest('.form-row').find('.closeIcon').addClass('animated rotateOut');
                            }
                            });
  
  $('.closeIcon').on('click',function(){
                     $(this).closest('.form-row').find('input').val('');
                     $(this).closest('.form-row').removeClass('focus');
                     $(this).removeClass('animated rotateIn');
                     $(this).addClass('animated rotateOut');
                     $(this).closest('.form-row').find('label').removeClass('animated zoomOutLeft');
                     $(this).closest('.form-row').find('label').addClass('animated zoomInRight');
                     });
  
  $(document).on('click','.fa-bars',function(e){
                 e.stopPropagation();
                 $(this).removeClass('fa-bars');
                 $(this).addClass('fa-times');
                 $(".search-icon").removeClass("fa-search");
                 $(".search-icon").removeClass("fa-close");
                 $('.mynav').slideDown();
                 $(".pop_up").hide();
                 $('.shadow').click();
                 });
  /*$(document).on('click','.fa-times',function(e){
                 //e.stopPropagation();
                 $(this).removeClass('fa-times');
                 $(this).addClass('fa-bars');
                 $('.mynav').fadeOut();
                 });*/
  
  $(document).on('click','.search-icon',function(e){
                 e.stopPropagation();
                 if($(".search-icon").hasClass("fa-search") || $(".search-icon").hasClass("fa-close")){
                    $('.search-input').toggleClass('open');
                    $('.input_filter').val('');
                    searchWidth();
                    if($('.search-input').hasClass('open')){
                        $('.input_filter').focus();
                    }else{
                        $('.dropdownWrap').hide();
                    }
                    $('.dropdownWrap p').hide();
                    if($(this).hasClass("fa-search")){
                        $(this).removeClass("fa-search");
                        $(this).addClass("fa-close");
                    }else{
                        $(this).removeClass("fa-close");
                        $(this).addClass("fa-search");
                        $(".input_filter").val('');
                        $(".businessBlocks li").each(function(){
                            $(this).hide();
                        });
                    }
                 }else{
                    window.location.href = 'selectCatagory.html';
                 }
});
  $(document).on('click','.search-sec',function(e){
                 e.stopPropagation();
                 });
  $(document).on('click',function(){
                 $('#searchCatagories').val('');
                 searchWidth();
                 $('.dropdownWrap').hide();
                 $('.dropdownWrap p').hide();
                 });
  
  function searchWidth(){
  if($('.search-input').hasClass('open')){
  var hW = $('header').width();
  $('.search-input.open').width(hW - 50);
  }else{
  $('.search-input').width(34);
  }
  };
  
  $('.mynav').fadeOut();
  
  var Wh = $(window).height() - 45;
  $('#map').height(Wh);
  
  $('.directionArrowTop').on('click',function(){
                             var reqHeight = $('.serviceCont').outerHeight()+$('.serviceSection').outerHeight();
                             reqHeight = reqHeight+20+"px";
                              $('.serviceSection').animate({
                               height:reqHeight
                              },500);
                             $('.directionArrowTop').hide();
                             $('.directionArrowBottom').show();
                             $('.shadow').show();
                             });
  $('.directionArrowBottom').on('click',function(){
                                $('.serviceSection').animate({
                                                             height:'115px'
                                                             },500);
                                $('.directionArrowBottom').hide();
                                $('.directionArrowTop').show();
                                $('.shadow').show();
                                });
  
  $('.shadow').on('click',function(){
                  $(".serviceSection").animate({height:'0'},500);
                  $('.shadow').hide();
                  });
  })(jQuery);
