//	Originally written by jerczu.
//	 edited by Daryl Thornhill
//
//
//
//	Added functionality:
//		keypress searching on dropdowns  
//		Onselect - triggers on select "change".

(function($){
            var zIndex = 999;
            $.fn.nervReplacer = function(options){
            
            $(".nervSelectReplace").remove();
            
            //this removes all styles and resets the form        
            $(".reset").on("click",function(event){
               $.fn.nervReplacer.reset(); 
            });
			
			// allows you to search using keypresses when a dropdown is open.
			$(document).keypress(function(e){
				var keypressnow = String.fromCharCode(e.keyCode).toLowerCase()
				var selects = $('.nervSelect')
				for (i=0;i<selects.length;i++){
					if ($(selects[i]).hasClass("active")){
						$thiswrapper = $(selects[i]);
						var options = $thiswrapper.find('.nervSubberOption');
						var found = false;
						for (e=0;e<options.length;e++){
							var firstletter = $(options[e]).text().substr(0,1);
							if (firstletter.toLowerCase() == keypressnow && found == false){
								var optionfound = $(options[e])
								var optionId = optionfound.attr("id").split("_")[1];
								var selectInfo = optionfound.parent().parent().find("select");
								selectInfo.find("option").each(function(){
									$(this).removeAttr("selected");    
								});
								selectInfo.find("option").eq(optionId).attr("selected","selected");
								optionfound.parent().parent().find(".nervSelectReplace p").html(optionfound.find("p").text());
								$thiswrapper.find('.nervSelectSubber').scrollTop(optionfound.position().top);
								found = true;
							}
						}
					}
				}
			})
            
            return this.each(function(index,element){
                $this = $(this);
                
                $.fn.nervReplacer.replaceSelect($this,index,element);
                if(($("select").length)-1 == index){
                  $(".reset").removeAttr("disabled");
                }
            })
         
            };
            
            
            
            $.fn.nervReplacer.reset = function(){
                $("option").removeAttr("selected");
                $("label").removeClass("errorLabel");
                $("div.error").remove();
                $("select").each(function(i,e){
                    var selector = $("#select_"+i); 
                    var option = $(this).find("option").first();
                    selector.find("p").text(option.text());
                });
                
            }
          
           $.fn.nervReplacer.replaceSelect = function($this,index,element){
                
                var menu = $this.find("option:selected").text();
                
                if($this.hasClass("shortreplace")){
                      $this.wrap('<div class="nervSelect shortSelect" />');
                }else{
                    $this.wrap('<div class="nervSelect" />');    
                }
                //console.log()
                $this.parent().attr("class", "nervSelect "+$this.attr("class"))

                if(!$this.hasClass("noclear")){
                    $this.parent().after('<div class="clear nervClearer" />');
                }
                $this.parent().css("z-index",zIndex);
                
                $this.after('<div class="nervSelectReplace" id="select_'+index+'"><p>'+menu+'</p></div>');
                $this.parent().append('<div class="nervSelectSubber" />');
                $this.parent().find(".nervSelectSubber").css("z-index",zIndex);
                zIndex--;
                
                $this.find("option").each(function(i,e){
                     $this.parent().find(".nervSelectSubber").append('<div class="nervSubberOption" id="option_'+i+'"><p>'+$(this).text()+"</p></div>");  
                });
                
                var wrapper = $this.parent();
                wrapper.find(".nervSelectSubber").hide();
                wrapper.on("click",function(){
					  $(this).find(".nervSelectSubber").toggle();    
					  $(this).toggleClass("active");  
                });
				var alphabet =  '•????????$??-=~`!@#$%^&*()?|{}[]:;<>,./\'"_+0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ  abcdefghijklmnopqrstuvwxyz';
               
                var selectOptionContainer = wrapper.find(".nervSelectSubber");
                var option = selectOptionContainer.find(".nervSubberOption");
                
                option.on("click",function(){
                    var optionId = $(this).attr("id").split("_")[1];
                    var selectInfo = $(this).parent().parent().find("select");
                    selectInfo.find("option").each(function(){
                        $(this).removeAttr("selected");    
                    })
                    selectInfo.find("option").eq(optionId).attr("selected","selected");
                    $(this).parent().parent().find(".nervSelectReplace p").html($(this).find("p").text());
					$($this).trigger("change");
                });                
                
                option.hover(function(){$(this).addClass("nervHovered");},function(){$(this).removeClass("nervHovered");});
                
                $this.hide();
           }
     
    })(jQuery);