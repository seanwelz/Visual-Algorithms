
var NS = "http://www.w3.org/2000/svg";
var txt_s='acabaabaabcaccaabc'
var pat_s='abaabcac'
var x=100
var y=100
var side_len=40
var font_size=24
var pre_button='button1'
var pre_val="Introduction"
var dash="4,4"

var nxt=[-1,0]
kmp_pmt()

function build_button(val,id,part,x_cor,y_cor,x_txt,y_txt){    
    var svg= document.getElementById(part);
    var rect = document.createElementNS(NS, "rect"); 
    rect.setAttribute('id',id+'r')  
    rect.setAttribute("x", x_cor);
    rect.setAttribute("y",y_cor);
    rect.setAttribute("width", '18.5vh');
    rect.setAttribute("height", '4vh');  
    rect.setAttribute("stroke", "black");
    rect.setAttribute("fill", "white");
    rect.setAttribute("cursor",'pointer')

    rect.addEventListener('mouseover', function(){
    if (txt.textContent[0]=="+"){
        rect.setAttribute("stroke","red");
        txt.setAttribute("fill","red")
    }else{
        rect.setAttribute("fill","red")
    }
    });
    rect.addEventListener('mouseout', function(){
    if (txt.textContent[0]=="+"){
        rect.setAttribute("stroke","black");
        txt.setAttribute("fill","black")
    }else{
        rect.setAttribute("fill","black");          
    }
    });
    rect.onclick=function(){click(rect,txt,val,id)}
    svg.appendChild(rect);
    
    var txt = document.createElementNS(NS, 'text'); 
    txt.setAttribute('x', x_txt);  
    txt.setAttribute("y", y_txt);
    txt.setAttribute('id',id+'t') 
    txt.setAttribute("font-size",'2.2vh');
    txt.setAttribute("fill","black");
    txt.innerHTML = '+'+'&nbsp  &nbsp &nbsp'+val;
    txt.setAttribute("cursor",'pointer')
        
    txt.addEventListener('mouseover', function(){
    if (txt.textContent[0]=="+"){
        rect.setAttribute("stroke","red");
        txt.setAttribute("fill","red")
    }else{
        rect.setAttribute("fill","red")
    }        
    });
    txt.addEventListener('mouseout', function(){
    if (txt.textContent[0]=="+"){
        rect.setAttribute("stroke","black");
        txt.setAttribute("fill","black")
    }else{
        rect.setAttribute("fill","black");          
    }
    });

    txt.onclick=function(){click(rect,txt,val,id)}
    svg.appendChild(txt);     
}

function click(rect,txt,val,id){    
    
    if (pre_button!=id){
        
        document.getElementById(pre_button+'t').innerHTML="+"+'&nbsp  &nbsp &nbsp'+pre_val
        document.getElementById(pre_button+'t').setAttribute("fill","black")
        document.getElementById(pre_button+'r').setAttribute("fill","white")
        document.getElementById(pre_button+'r').setAttribute("stroke","black")
        
        document.getElementById(pre_val).style.display='none'
        
        reset()
        
        txt.innerHTML="&times"+'&nbsp  &nbsp &nbsp'+val
        txt.setAttribute("fill","white")
        rect.setAttribute("fill","red")
        rect.setAttribute("stroke","none")
        pre_button=id
        pre_val=val
        context(val)
    }

}

build_button("Introduction","button1","sp_svg",'0.7vh','3vh','1.5vh','5.7vh')
document.getElementById(pre_button+'t').innerHTML="&times"+'&nbsp  &nbsp &nbsp'+pre_val
document.getElementById(pre_button+'t').setAttribute("fill","white")
document.getElementById(pre_button+'r').setAttribute("fill","black")
document.getElementById(pre_button+'r').setAttribute("stroke","none")
build_button("Pre/Suffix","button2","sp_svg",'0.7vh','23vh','1.5vh','25.7vh')
build_button("PMT","button3","sp_svg",'0.7vh','43vh','1.5vh','45.7vh')
build_button("Animation","button4","sp_svg",'0.7vh','63vh','1.5vh','65.7vh')

function build_string(xx,yy,val,interval,square_side_length,i,part,stroke_color,fill_color,txt_color,seg){

    var svg= document.getElementById(part)
    var rect = document.createElementNS(NS, "rect");  
    rect.setAttribute('id',seg+'r'+i.toString())  
    rect.setAttribute("x", xx + i*interval);  
    rect.setAttribute("y",yy);
    rect.setAttribute("width", square_side_length);
    rect.setAttribute("height", square_side_length);    
    rect.setAttribute("stroke", stroke_color);
    rect.setAttribute("fill", fill_color);
    rect.setAttribute("stroke-width","2")
    
    // rect.onclick=function(){select(i)}
    svg.appendChild(rect);
        
    var txt = document.createElementNS(NS, 'text'); 
    txt.setAttribute('id',seg+'t'+i.toString())  
    if (val.toString().length>1){
      txt.setAttribute('x', xx+side_len*3/8+i*interval);
    }else{
      txt.setAttribute('x', xx+side_len/2+i*interval);
    }
    txt.setAttribute("y", yy+font_size);
    txt.setAttribute("font-size",font_size);
    txt.setAttribute("text-anchor","middle")
    txt.setAttribute("dominant-baseline", "middle")
    txt.setAttribute("fill",txt_color);
    txt.innerHTML = val;
    
    txt.onclick=function(){select(i)}
    svg.appendChild(txt);
}

function generate(){
    reset()
    sub_title(x+10,y+100,"Index",'rp_1')
    sub_title(x+10,y+100+side_len+10,"Text String",'rp_1')
    sub_title(x+10,y+100+2*side_len+20,"Pattern String",'rp_1')
    
    for (var i=0;i<txt_s.length;i++){
        build_string(x+170,y+100,i,side_len,side_len,i,'rp_1','black','white','black','ori_txt_idx')
        build_string(x+170,y+100+side_len+10,txt_s[i],side_len,side_len,i,'rp_1','black','white','black','ori_txt')
        
    }

    for (var i=0;i<pat_s.length;i++){
        build_string(x+170,y+100+2*side_len+20,pat_s[i],side_len,side_len,i,'rp_1','black','white','black','ori_pat')
    }
}

function sub_title(xx,yy,val,part){
    var txt=document.createElementNS(NS,'text')
    txt.setAttribute("x",xx)
    txt.setAttribute("y",yy+side_len*0.75)  
    txt.setAttribute("fill","black")
    txt.setAttribute("font-size",font_size)
    txt.innerHTML=val
    document.getElementById(part).appendChild(txt)
}

function brute_force(){
    
    generate()
    for (var j=0;j<txt_s.length-pat_s.length+1;j++){
        var sgn=0
        for (var i=0;i<pat_s.length;i++){
            if (sgn==0){
                if (pat_s[i]==txt_s[i+j]){
                    build_string(x+170+j*side_len,y+100+3*side_len+30+j*(side_len+10),pat_s[i],side_len,side_len,i,'rp_1','black','green','white','brute'+j)
                }else{
                    build_string(x+170+j*side_len,y+100+3*side_len+30+j*(side_len+10),pat_s[i],side_len,side_len,i,'rp_1','black','red','white','brute'+j)
                    sgn=1
                }            
            }else{
                build_string(x+170+j*side_len,y+100+3*side_len+30+j*(side_len+10),pat_s[i],side_len,side_len,i,'rp_1','black','white','black','brute'+j)
            }

        }
        if (sgn==0){
            for (var i=0;i<pat_s.length;i++){
                document.getElementById('ori_txtr'+(j+i).toString()).setAttribute('fill','grey')
                document.getElementById('ori_txtt'+(j+i).toString()).setAttribute('fill','white')
            }
        }
    } 
}

function context(id){
    document.getElementById(id).style.display='inline-block'


}

function improvement(j){
    reset()
    sub_title(x+10,y+100+side_len+10,"sub-string "+(j+1).toString(),'rp_1')
    sub_title(x+10,y+100+2*side_len+20,"Patten String",'rp_1')
    var sgn=0
    var unmatch=0
    for (var i=0;i<txt_s.length;i++){
        build_string(x+170,y+100,i,side_len,side_len,i,'rp_1','black','white','black','ori_txt_idx')
        if (i>=j && i<j+pat_s.length){
            if (sgn==0){
                if (pat_s[i-j]==txt_s[i]){
                    build_string(x+170,y+100+side_len+10,txt_s[i],side_len,side_len,i,'rp_1','black','green','black','ori_txt')
                    build_string(x+170,y+100+2*side_len+20,pat_s[i-j],side_len,side_len,i,'rp_1','black','green','black','brute'+j)
                }else{
                    build_string(x+170,y+100+side_len+10,txt_s[i],side_len,side_len,i,'rp_1','black','red','black','ori_txt')
                    build_string(x+170,y+100+2*side_len+20,pat_s[i-j],side_len,side_len,i,'rp_1','black','red','black','brute'+j)
                    unmatch=i
                    sgn=1
                }            
            }else{
                build_string(x+170,y+100+side_len+10,txt_s[i],side_len,side_len,i,'rp_1','black','white','black','ori_txt')
                build_string(x+170,y+100+2*side_len+20,pat_s[i-j],side_len,side_len,i,'rp_1','black','white','black','brute'+j)
            }            
        }else{
            build_string(x+170,y+100+side_len+10,txt_s[i],side_len,side_len,i,'rp_1','lightgrey','white','lightgrey','ori_txt')
        }        
    }  
    
    next_substring(j,j+1,unmatch,y,false)
    next_substring(j,j+2,unmatch,y,false)
    next_substring(j,j+3,unmatch,y,false)
    next_substring(j,j+4,unmatch,y,false)
}

function next_substring(ref,j,stop,yy,dsh){
    var diff=(j-ref)*2*(side_len+10)
    sub_title(x+10,yy+100+side_len+10+diff,"sub-string "+(j+1).toString(),'rp_1')
    sub_title(x+10,yy+100+2*side_len+20+diff,"Patten String",'rp_1')
    var sgn=0
    for (var i=0;i<txt_s.length;i++){
        if (i>=j && i<j+pat_s.length){
            if (sgn==0){
                if (i!=stop){
                    build_string(x+170,yy+100+side_len+10+diff,txt_s[i],side_len,side_len,i,'rp_1','green','white','green','ori_txt'+j)
                    build_string(x+170,yy+100+2*side_len+20+diff,pat_s[i-j],side_len,side_len,i,'rp_1','green','white','green','brute'+j)
                }else{
                    build_string(x+170,yy+100+side_len+10+diff,txt_s[i],side_len,side_len,i,'rp_1','red','white','red','ori_txt'+j)
                    build_string(x+170,yy+100+2*side_len+20+diff,pat_s[i-j],side_len,side_len,i,'rp_1','red','white','red','brute'+j)
                    sgn=1
                }            
            }else{
                build_string(x+170,yy+100+side_len+10+diff,txt_s[i],side_len,side_len,i,'rp_1','black','white','black','ori_txt'+j)
                build_string(x+170,yy+100+2*side_len+20+diff,pat_s[i-j],side_len,side_len,i,'rp_1','black','white','black','brute'+j)
            }    
            if (dsh){
                document.getElementById('ori_txt'+j+'r'+i).setAttribute("stroke-dasharray",dash)
                document.getElementById('brute'+j+'r'+i).setAttribute("stroke-dasharray",dash)
            }        
        }else{
            build_string(x+170,yy+100+side_len+10+diff,txt_s[i],side_len,side_len,i,'rp_1','lightgrey','white','lightgrey','ori_txt'+j)
        }        
    }   

}

function reset(){
    document.getElementById('rp_1').innerHTML=''
}

function pre_suf(string){
    reset()
    for (var i=0;i<string.length;i++){
        build_string(x+360,y+60,string[i],side_len,side_len,i,'rp_1','black','green','black','sub_pat')
    }

    sub_title(x+300,y+10,'Matched Fragment of Pattern String','rp_1')

    sub_title(x+230,y+30+2*side_len,'Prefix','rp_1')
    sub_title(x+640,y+30+2*side_len,'Suffix','rp_1')

    for (var i=0;i<string.length-1;i++){

        for (var j=0;j<string.length-1-i;j++){
            build_string(x+180,y+40+3*side_len+i*(side_len+10),string[j],side_len,side_len,j,'rp_1','green','white','green','prefix')
            
        }
        for (var k=string.length-1;k>i;k--){
            build_string(x+550,y+40+3*side_len+i*(side_len+10),string[k],side_len,side_len,k,'rp_1','green','white','green','suffix')
        }
    }
}

function skip(j){
    
    pre_suf('abaab')
    sub_title(x+10,y+400+side_len+10,"sub-string "+(j+1).toString(),'rp_1')
    sub_title(x+10,y+400+2*side_len+20,"Patten String",'rp_1')
    var sgn=0
    var unmatch=0
    for (var i=0;i<txt_s.length;i++){
        build_string(x+170,y+400,i,side_len,side_len,i,'rp_1','black','white','black','ori_txt_idx')
        if (i>=j && i<j+pat_s.length){
            if (sgn==0){
                if (pat_s[i-j]==txt_s[i]){
                    build_string(x+170,y+400+side_len+10,txt_s[i],side_len,side_len,i,'rp_1','black','green','black','ori_txt')
                    build_string(x+170,y+400+2*side_len+20,pat_s[i-j],side_len,side_len,i,'rp_1','black','green','black','brute'+j)
                }else{
                    build_string(x+170,y+400+side_len+10,txt_s[i],side_len,side_len,i,'rp_1','black','red','black','ori_txt')
                    build_string(x+170,y+400+2*side_len+20,pat_s[i-j],side_len,side_len,i,'rp_1','black','red','black','brute'+j)
                    unmatch=i
                    sgn=1
                }            
            }else{
                build_string(x+170,y+400+side_len+10,txt_s[i],side_len,side_len,i,'rp_1','black','white','black','ori_txt')
                build_string(x+170,y+400+2*side_len+20,pat_s[i-j],side_len,side_len,i,'rp_1','black','white','black','brute'+j)
            }            
        }else{
            build_string(x+170,y+400+side_len+10,txt_s[i],side_len,side_len,i,'rp_1','lightgrey','white','lightgrey','ori_txt')
        }        
    }  
    
    next_substring(j,j+1,unmatch,y+300,true)
    next_substring(j,j+2,unmatch,y+300,true)
    next_substring(j,j+3,unmatch,y+300,false)
    
}

function pmt(){   
    reset()    
    for (var i=0;i<pat_s.length;i++){        
        for (var j=0;j<pat_s.length;j++){
            build_string(x+170,y+100+i*(side_len+10),pat_s[j],side_len,side_len,j,'rp_1','black','white','black','pmt'+i)     
            
            if (j>i){
                document.getElementById('pmt'+i+'r'+j).setAttribute('stroke-dasharray',dash)
            }else if (j<nxt[i+1] || j>i-nxt[i+1]){
                document.getElementById('pmt'+i+'r'+j).setAttribute('fill','green')
            }         
        }
        sub_title(x+550,y+100+i*(side_len+10),nxt[i+1],'rp_1')
        
    }

    for (var i=0;i<pat_s.length;i++){  
        build_string(x+600,y+100+i*(side_len+10),pat_s[i],side_len,side_len,i,'rp_1','black','white','black','pmt_table')
        if (nxt[i+1]>0){
            document.getElementById('pmt_table'+'r'+i).setAttribute('fill','green')
        }         
    }
   

    
}

function next(){
    pmt()
    sub_title(x+440,y+600,"Pattern String",'rp_1')
    sub_title(x+440,y+650,"PMT",'rp_1')
    sub_title(x+440,y+700,"NEXT",'rp_1')
    for (var i=0;i<pat_s.length;i++){
        build_string(x+600,y+600,pat_s[i],side_len,side_len,i,'rp_1','black','white','black','ori_pat')
    }

    for (var i=0;i<pat_s.length;i++){
        build_string(x+600,y+700,nxt[i],side_len,side_len,i,'rp_1','black','white','black','nxt')
        build_string(x+600,y+650,nxt[i+1],side_len,side_len,i,'rp_1','black','white','black','pat_idx')
    }
    build_string(x+600,y+700,nxt[i],side_len,side_len,i,'rp_1','black','white','black','nxt')

}

// pre,suf is the end index of pre/suffix
function kmp_pmt(){    
    
    var pre=0
    var suf=1
    
    while (suf<pat_s.length){
        
        if (pat_s[pre]==pat_s[suf]){
            pre+=1
            suf+=1
            nxt.push(pre)
            
        }else if(pre){
            pre=nxt[pre-1+1]

        }else{
            nxt.push(0)
            suf+=1
            
        }
        
    }
    
}

function arrow(x,y,i,colour,val,seg,reverse){  

    var svg = document.getElementById("rp_1")
    var arrow = document.createElementNS(NS, "polygon");   
    var m = i* side_len
    
    arrow.setAttribute("id",seg+"p")
    arrow.setAttribute("points", ""+(side_len/2)+","+(0.75*side_len)+" "+(0.4*side_len)+","+(0.5*side_len)+" "+(0.45*side_len)+","+(0.5*side_len)+" "+(0.45*side_len)+",0 "+(0.55*side_len)+",0 "+(0.55*side_len)+","+(0.5*side_len)+" "+(0.6*side_len)+","+(0.5*side_len)+"");
      
    arrow.setAttribute("stroke", colour);
    arrow.setAttribute("fill", colour);  
    svg.appendChild(arrow);
  
    var txt = document.createElementNS(NS, 'text'); 
    txt.setAttribute("id",seg+"t")
    txt.setAttribute('x', x+m+side_len/2);
    
    txt.setAttribute("text-anchor","middle")
    txt.setAttribute("font-size",font_size);
    txt.innerHTML = val;  
    svg.appendChild(txt);
  
    if (reverse==true){
      for (var i=0;i<7;i++){
        arrow.points.getItem(i).x+= x+ m
        arrow.points.getItem(i).y+= y
        txt.setAttribute("y", y-10);
      }  
    }else{
      for (var i=0;i<7;i++){
        arrow.points.getItem(i).x+= x+ m
        arrow.points.getItem(i).y*=(-1)
        arrow.points.getItem(i).y+=y+side_len*0.75
        txt.setAttribute("y", y+side_len*0.75+20);
      }  
    }
}


var rec=[0]
var sgn=[0]
var back=[0]
function Animation(){
    clearInterval(ani)
    clearTimeout(t1)
    clearTimeout(t2)
    clearTimeout(t3)
    clearTimeout(t4)
    clearTimeout(t5)
    clearTimeout(t6)
    document.getElementById('ani_btn').disabled=false

    reset() 
    generate()

    for (var i=0;i<pat_s.length;i++){
        build_string(x+170,y+250,nxt[i],side_len,side_len,i,'rp_1','black','white','black','nxt')
        build_string(x+170,y+300,i,side_len,side_len,i,'rp_1','black','white','black','pat_idx')
    }
    build_string(x+170,y+250,nxt[i],side_len,side_len,i,'rp_1','black','white','black','nxt')

    sub_title(x+10,y+250,'NEXT','rp_1')
    sub_title(x+10,y+300,'Pattern Index','rp_1')
    arrow(x+170,y+60,0,'black','TP','txt_pos',true)
    arrow(x+170,y+350,0,'black','PP','pat_pos',false)

    
    var txt_pos=0
    var pat_pos=0
    
    while (txt_pos-pat_pos+pat_s.length<=txt_s.length){
        if (txt_s[txt_pos]==pat_s[pat_pos]){
            txt_pos+=1
            pat_pos+=1

        }else if(pat_pos){
            pat_pos=nxt[pat_pos]
            rec.push(txt_pos)
            sgn.push(1)
            back.push(pat_pos)
        }else{            
            txt_pos+=1
            rec.push(txt_pos)
            sgn.push(0)
            back.push(0)
        }

        if (pat_pos==pat_s.length){
            pat_pos=nxt[pat_pos]
            rec.push(txt_pos)
            sgn.push(1)
            back.push(pat_pos)
        }
    }    
}
document.getElementById('ani_btn').disabled=true
function color_change(start,end,match,unmatch){
    for (var i=start;i<end;i++){
        document.getElementById('ori_txtr'+i).setAttribute('fill',match)
        document.getElementById('ori_patr'+(i-start)).setAttribute('fill',match)
    }
    document.getElementById('ori_txtr'+end).setAttribute('fill',unmatch)
    if ((end-start)<pat_s.length){
        document.getElementById('ori_patr'+(end-start)).setAttribute('fill',unmatch)

    }
    
    
}

function tp_move(start,end){

   
        var update_rb=setInterval(right_move6,1)
        var cnt6=0    
        var itv=(end-start)*side_len/100
        step_interval6=start*side_len+itv

        function right_move6(){
          if (cnt6>=100){
            clearInterval(update_rb)
       
          }else{        
            document.getElementById('txt_posp').setAttribute("transform","translate("+step_interval6+",0)");
            document.getElementById('txt_post').setAttribute("transform","translate("+step_interval6+",0)");
            
            
            step_interval6+=itv
            cnt6+=1
      
          }    
        }    

}

function pp_move(start,end){

   
    var update_rb=setInterval(right_move5,1)
    var cnt5=0    
    var itv=(end-start)*side_len/100
    step_interval5=start*side_len+itv

    function right_move5(){
      if (cnt5>=100){
        clearInterval(update_rb)
   
      }else{        
        
        document.getElementById('pat_posp').setAttribute("transform","translate("+step_interval5+",0)");
        document.getElementById('pat_post').setAttribute("transform","translate("+step_interval5+",0)");
        
        step_interval5+=itv
        cnt5+=1
  
      }    
    }    

}

function pattern_move(start,end,seg){  
    var update_rb=setInterval(right_move4,1)
    var cnt4=0    
    var itv4=(end-start)*side_len/100
    var step_interval4=start*side_len+itv4
    var lens=pat_s.length
    if (seg=='nxt') {
        lens+=1
    }

    function right_move4(){

        if (cnt4>=100){
            clearInterval(update_rb)
    
        }else{    

            
            for (var i=0;i<lens;i++) {
            document.getElementById(seg+'r'+i).setAttribute("transform","translate("+step_interval4+",0)");
            document.getElementById(seg+'t'+i).setAttribute("transform","translate("+step_interval4+",0)");
        }   

        
        step_interval4+=itv4
        cnt4+=1    
        }    
    }
}

var ani,t1,t2,t3,t4,t5,t6
// 0,1,2,3, 4, 5, 6, 7, 8      k
// 0,1,2,7,13,14,15,17,18     rec
// 0,1,0,1, 1, 0, 1, 1, 0     sgn
// 0,0,0,2, 0, 0, 0, 0, 0     back
//-1,0,0,1, 1, 2, 0, 1, 0

function step(k){
    
     
    color_change(rec[k-1]-back[k-1],rec[k],'green','red')
    t1=setTimeout(function(){
        tp_move(rec[k-1],rec[k])            
        if (sgn[k]){                
            pp_move(rec[k-1],rec[k])

            t2=setTimeout(function(){
                document.getElementById('nxtr'+(rec[k]-rec[k-1]+back[k-1])).setAttribute('fill','red')
    
                t3=setTimeout(function(){
                    document.getElementById('pat_idxr'+nxt[rec[k]-rec[k-1]]).setAttribute('fill','red')

                    t4=setTimeout(function(){
                        color_change(rec[k-1]-back[k-1],rec[k],'white','white')
                        document.getElementById('nxtr'+(rec[k]-rec[k-1]+back[k-1])).setAttribute('fill','white')
                        
                        t5=setTimeout(function(){
                            if (sgn[k]==0){
                                pp_move(rec[k-1],rec[k])
                            }                            
                            pattern_move(rec[k-1]-back[k-1],rec[k]-nxt[rec[k]-rec[k-1]+back[k-1]],'pat_idx')
                            pattern_move(rec[k-1]-back[k-1],rec[k]-nxt[rec[k]-rec[k-1]+back[k-1]],'nxt')
                            pattern_move(rec[k-1]-back[k-1],rec[k]-nxt[rec[k]-rec[k-1]+back[k-1]],'ori_pat')

                            t6=setTimeout(function(){
                                document.getElementById('pat_idxr'+nxt[rec[k]-rec[k-1]]).setAttribute('fill','white')
                            },1000)                            
                        },1000)
                    },500)   
                },500)         
            },1000)
        }else{
            t4=setTimeout(function(){
                color_change(rec[k-1]-nxt[rec[k-1]],rec[k],'white','white')
                
                t5=setTimeout(function(){
                    if (sgn[k]==0){
                        pp_move(rec[k-1],rec[k])
                    }
                    pattern_move(rec[k-1],rec[k],'pat_idx')
                    pattern_move(rec[k-1],rec[k],'nxt')
                    pattern_move(rec[k-1],rec[k],'ori_pat')
                },1000)
            },1000)   
        }          
    },1000)   
}

function run(){
    document.getElementById('ani_btn').disabled=true
    
    step(1)   
    
    ani=setInterval(run,6000)
    
    var i=2
    
    function run(){

        if (i>=rec.length){
            clearInterval(ani)
            document.getElementById('ani_btn').disabled=false
            alert('Animation ends.')
        }else{
            step(i)        

        i+=1
        }
    }   
}

function menu(){
    var sub_menu = document.getElementById('menu');
    var dis_v = sub_menu.style.display;    
    if(dis_v == "block")
        sub_menu.style.display = "none";
    else
        sub_menu.style.display = "block";        
}