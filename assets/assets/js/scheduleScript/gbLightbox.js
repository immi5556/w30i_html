 (function($){
  $.fn.gbLightbox = function(opt){
  var defaults = {
  triggerElem : '.click',
  lightCont :'.lightbox',
  shadow:'.shadow',
  closei:'.cls-btn',
  saveData:"#saveData"
  },
  set = $.extend({},defaults,opt);
  
  return this.each(function(){
                   var $this = $(this),
                   focusElem = $this.find(set.triggerElem),
                   lightContbox = $this.find(set.lightCont),
                   closeIcon = $this.find(set.closei),
                   shadowbx = $this.find(set.shadow),
                   Ww = $(window).outerWidth(),
                   Wh = $(window).outerHeight(),
                   //contentHh = Wh - ($(set.lightCont).outerHeight()),
                   //lightContboxHh = $(set.lightCont).outerHeight(),
                   getVal;
                   
                   //var oldElement = null;
                   var currentElement = null;
                   var curElemWid = null;
                   var curElemHih = null;
                   
                   init();
                   
                   function init(){
                   $(set.triggerElem).on('click',function(){
                                         //oldElement = $(this).attr('data-id');
                                         currentElement = $(this).attr('data-id');
                                         curElemWid = $(currentElement).outerWidth();
                                         curElemHih = $(currentElement).outerHeight();
                                         console.log($(curElemHih))
                                         openLightbox(this);
                                         responsive();
                                         $(shadowbx).show();
                                         });
                   $(closeIcon).on('click',function(){
                                   closeLightbox();
                                   });
                   
                   $(lightContbox).on('click',function(ev){
                                      //ev.stopPropagation();
                                      });
                   
                   
                   $(shadowbx).on('click',function(){
                                  closeLightbox();
                                  });
                   
                   $(document).on('keyup',function(evt) {
                                  if (evt.keyCode == 27) {
                                  closeLightbox();
                                  }
                                  });
                   
                   //responsive();
                   }
                   
                   //init close here
                   
                   function openLightbox(_this){
                   getVal = $(_this).attr('data-id');
                   $(getVal).show();
                   }
                   
                   //openLightbox close here
                   
                   function responsive(){
                   Ww = $(window).outerWidth();
                   Wh = $(window).outerHeight();
                   curElemWid = $(currentElement).outerWidth();
                   curElemHih = $(currentElement).outerHeight();
                   //var roundVal = Math.round($(oldElement).height());
                   contentHh = Wh - curElemHih;		
                   
                   //console.log(roundVal)
                   if(contentHh <0){
                   contentHh = 40;
                   }
                   $(set.lightCont).css({
                                        top: contentHh / 2,
                                        left: (Ww - curElemWid)/2
                                        });
                   
                   if($(curElemHih) > Wh){
                   $(set.lightCont).css({
                                        maxHeight:Wh-20,
                                        height:"100%"
                                        });
                   }else{
                   $(set.lightCont).css({
                                        maxHeight:Wh-20,
                                        height:"auto",               
                                        });	
                   }
                   
                   }
                   
                   //responsive close here
                   function closeLightbox(){
                   $(shadowbx).hide();
                   $(lightContbox).hide();
                   }
                   var timers;
                   //closeLightbox close here
                   
                   $(window).on('resize',function(eve) {
                                clearInterval(timers)
                                myCount();
                                });
                   
                   
                   function myCount(){
                   timers= setTimeout(function(){
                                      openLightbox();
                                      
                                      responsive();
                                      //setTimeout(responsive, 600);
                                      },300)
                   
                   }
                   
                   
                   
                   //resize close here
                   
                   // Elements append here
                   //lightContbox.append(closeIcon);
                   //$this.append(shadowbx);
                   })
  }
  }(jQuery))
