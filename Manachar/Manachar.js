
var side_len=40;
var x =7.5*side_len;
var y =1.5*side_len; 

var NS = "http://www.w3.org/2000/svg";
var string
var s 
var lens

var radius
var frb
var mirror
var mutual_l
var font_size=24

var t1,t2,t3,t4, new_boundary;

var cur_p
var cur=-1

var tree_di
var tree_fc

var next_l
var next_r
var dash="4,4"

var step_cnt=0

document.getElementById("aaa").setAttribute("height",y+460)


function build(xx,yy,val,interval,square_side_length,i,part,stroke_color,fill_color,txt_color,seg){

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
  // $(rect).addClass('unit');
 
  
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
  // $(txt).addClass('num');
  
  // txt.onclick=function(){select(i)}
  svg.appendChild(txt);
}

function build_center(xx,yy,val,interval,square_side_length,i,part,stroke_color,fill_color,txt_color,seg){

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
  rect.style.cursor='pointer';  
  
  rect.onclick=function(){select(i)}
  svg.appendChild(rect);
      
  var txt = document.createElementNS(NS, 'text'); 
  txt.setAttribute('id',seg+'t'+i.toString())  
  // if (val.toString().length>1){
  //   txt.setAttribute('x', xx+interval/2+i*interval);
  // }else{
  //   txt.setAttribute('x', xx+interval/2+i*interval);
  // }
  txt.setAttribute('x', xx+interval/2+i*interval);
  txt.setAttribute("y", yy+0.6*interval);
  txt.setAttribute("font-size",15);
  txt.setAttribute("text-anchor","middle")
  txt.setAttribute("dominant-baseline", "middle")
  txt.setAttribute("fill",txt_color);
  txt.style.fontWeight='bold';
  txt.style.cursor='pointer';
  txt.innerHTML = val;  
  
  txt.onclick=function(){select(i)}
  svg.appendChild(txt);
}

function generate(){
  
  string=document.getElementById("string").value
  
  if (string.length==0){
    alert('String box cannot be empty!\n\nPlease input a string or refresh web page to use default one: "ABACABACABB".')
    
  }else{
    
    document.getElementById('start').setAttribute('disabled',true)
    
    document.getElementById('aaa').innerHTML = '';  
    document.getElementById('ddd').innerHTML=""
    document.getElementById('eee').innerHTML=""
    document.getElementById('fff').innerHTML=""
    clearInterval(new_boundary);
    document.getElementById("flow").innerHTML=""
    draw_flowchart()  


    s = '#' + string.split("").join('#') + '#' 
    lens = s.length;

    radius= palindrome().p
    frb=palindrome().center
    mirror=palindrome().m_r
    mutual_l=palindrome().m_l
    

    for (var i = 1; i < string.length*2+1; i+=2) {    
      build(x+side_len/2,y+35+side_len,string[(i-1)/2],side_len/2,side_len,i,"aaa","white","grey","white","ori");      
    };

    t1=setTimeout(function(){
      preprocessing()
    },1000)
  }
}

function preprocessing(){  
  var stretch=setInterval(move,1)       
  var cnt=0
  var step_interval=side_len/200
  
  function move(){
    if (cnt>=200){
      clearInterval(stretch)
      
    }else{
      for (var i=0;i<string.length;i++){
       
        document.getElementById('orir'+(i*2+1).toString()).setAttribute("transform","translate("+(i*step_interval)+",0)");
        document.getElementById('orit'+(i*2+1).toString()).setAttribute("transform","translate("+(i*step_interval)+",0)");
      }
      step_interval+=side_len/200
      cnt+=1
    }  
  }

  for (var i = 0; i < string.length*2+1; i+=2) {        
    build(x,-5-side_len,"#",side_len,side_len,i,"aaa","white","grey","white","ori"); 
  }   
  var drop_dis=y+35+side_len-(-5-side_len)
  t1=setTimeout(function(){
    var dropdown=setInterval(down,1)
    cnt1=0
    step_interval1=drop_dis/200
    function down(){
      if (cnt1>=200){
        clearInterval(dropdown)
        
      }else{
        for (var i=0;i<string.length*2+1;i+=2){
          document.getElementById('orir'+(i).toString()).setAttribute("transform","translate(0,"+step_interval1+")");
          document.getElementById('orit'+(i).toString()).setAttribute("transform","translate(0,"+step_interval1+")");
        }
        step_interval1+=drop_dis/200
        cnt1+=1
  
      }    
    };
    
    t2=setTimeout(function(){
      for (var i = 0; i < string.length*2+1; i++) {   
        build(x,y+35,i,side_len,side_len,i,"aaa","white","white","black","idx");
        build_center(2,10,i,20,20,i,"select_center","black","white",'black',"cen_idx");
      };
      
      document.getElementById('start').disabled=false
      document.getElementById('step_forward').disabled=false
    },1000)
  },1000)
}

function palindrome(){      
  
  var p = new Array(lens);        
  // mx 是当前的最右边界 
  var mx = 0;                    
  var id = 0;   
  var center= new Array(lens)
  var m_r= new Array(lens)   
  var m_l= new Array(lens)

  for (var i=0;i<lens;i++){
    center[i]=id
    if (mx > i){
        p[i] = Math.min(mx-i, p[2*id-i]);
    }else{
        p[i] = 1;
    }           
               
    while (i-p[i] >= 0 && i+p[i] < lens && s[i-p[i]] == s[i+p[i]]){  
      p[i] += 1;            
      if ((i+p[i]) > mx){
        mx= i+p[i];
        id= i; 
      }                
    } 
    m_r[i]=2*center[i]-i;
    m_l[i]=Math.max(center[i]-p[center[i]]+1,m_r[i]-p[m_r[i]]+1)
  }     

  var i_res = p.indexOf(Math.max.apply(Math,p)); 
  // var s_res = s.slice(i_res-(p[i_res]-1),i_res+p[i_res]);   
  return {p,center,m_r,m_l}
}

function arrow(y,i,colour,val,seg,reverse,part){  

  var svg = document.getElementById(part)
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

function remove(){
  if (svg=document.getElementById("curp")){
    document.getElementById("curp").remove()
    document.getElementById("curt").remove()
    document.getElementById("mirp").remove()
    document.getElementById("mirt").remove()
    document.getElementById("cenp").remove()
    document.getElementById("cent").remove()
    document.getElementById("celp").remove()
    document.getElementById("celt").remove()
    document.getElementById("cerp").remove()
    document.getElementById("cert").remove()
  }
  
  
  // svg=document.getElementById(part)
  // for (var i=0;i<n;i++){
  //   svg.removeChild(svg.lastChild);
  // }
}

function substring(left,right,y,part,seg){
  for (var i=left;i<right+1;i++){
     build(x,y,s[i],side_len,side_len,i,part,"red","white","black",seg); 
  }
}

function subindex(left,right,y,part,seg){
  for (var i=left;i<right+1;i++){
     build(x,y,i,side_len,side_len,i,part,"red","white","black",seg); 
  }
}

function subpal(left,right,y,part,seg){
  for (var i=left;i<right+1;i++){
     build(x,y,left+right-i,side_len,side_len,i,part,"blue","white","black",seg); 
  }
}

// function mapping(i){

//   clearTimeout(t1);
//   clearTimeout(t2);
//   clearTimeout(t3);
//   clearTimeout(t4);
//   clearTimeout(new_boundary);

//   document.getElementById('bbb').innerHTML = '';
//   // document.getElementById("ccc").setAttribute("width", 500) 
//   var nodes=document.getElementById('ccc');
//   var k=nodes.childNodes.length
//   // 总觉得大于2就行
//   while (k>=4) {
//     nodes.removeChild(nodes.lastChild);
//     k--  
//   }  
//   // document.getElementById('ccc').innerHTML=''
//   document.getElementById('ddd').innerHTML = '';
  
//   for (var j=0;j<=i;j++){
//     build(0,25,radius[j],side_len,side_len,j,"ddd","red","white","black"); 
//   }
//   var cur_p=document.getElementById('ddd').lastChild
//   cur_p.setAttribute('x', x+7+i*side_len);
//   cur_p.innerHTML="?";
  
//   if (i<frb[i]+radius[frb[i]]-1){
//     substring(frb[i]-radius[frb[i]]+1,frb[i],0,"bbb");
//     var mirror=2*frb[i]-i;
//     substring(mirror-radius[mirror]+1,mirror,25,"bbb");  
    
//     t1=setTimeout(function(){         

//       t2=setTimeout(function(){
         
//         var mutual_l=Math.max(frb[i]-radius[frb[i]]+1,mirror-radius[mirror]+1)
//         substring(mutual_l,2*mirror-mutual_l,0,"ccc");   
//         var kk=(frb[i]*2+1)*20
//         document.getElementById("ccc").setAttribute("width", kk)   
//         document.getElementById('animate_scale').beginElement()
        
//         t3=setTimeout(function(){
          
//           var map_r=2*frb[i]-mutual_l
//           substring(i,map_r,0,"ddd");
//           cur.innerHTML=map_r-i+1;

//           t4=setTimeout(function(){
//             var map_l=2*i-2*frb[i]+mutual_l
//             substring(map_l,i-1,0,"ddd")

//             new_boundary=setInterval(nb,2000)
//             var j=1
//             var rest=radius[i]+i-1-(2*frb[i]-mutual_l)
//             function nb(){
//               if (j>rest){
//                 clearInterval(new_boundary);
//               }else{
//                 build(0,0,s[map_r+j],side_len,side_len,map_r+j,"ddd","red","white","black");
//                 build(0,0,s[map_l-j],side_len,side_len,map_l-j,"ddd","red","white","black");
//                 svg.lastChild.innerHTML=j;
//                 j++
//                 if (map_r-i+j>9){
//                   cur_p.setAttribute('x', x+1+i*side_len);
//                 }
//                 cur_p.innerHTML=map_r-i+j;          
//               }
//             }
//           }, 2000);        
//         }, 5000);      
//       }, 1000);    
//     }, 1000);     
//   }else{
//     t1=setTimeout(function(){
//       build(0,0,s[i],side_len,side_len,i,"ddd","red","white","black");
//       cur_p.innerHTML=1;

//       new_boundary=setInterval(nb,2000)
//       var j=1
//       var rest=radius[i]-1
//       function nb(){
//         if (j>rest){
//           clearInterval(new_boundary);
//         }else{
//           build(0,0,s[i+j],side_len,side_len,i+j,"ddd","red","white","black");
//           build(0,0,s[i-j],side_len,side_len,i-j,"ddd","red","white","black");
//           j++
//           cur_p.innerHTML=j;
//         }            
//       }
//     }, 2000); 
//   }
// }

// function run(){
//   ttt=setInterval(nb,10000)
//   var i=0
//   function nb(){
//     if (i==lens){
//       clearInterval(ttt);
//     }else{
//       mapping(i)
//       i++
//     }
//   }
// }

function sub_title(y,val,svg){
  var txt=document.createElementNS(NS,'text')
  txt.setAttribute("x",x-250)
  txt.setAttribute("y",y)  
  txt.setAttribute("fill","black")
  txt.setAttribute("font-size",font_size)
  txt.innerHTML=val
  document.getElementById(svg).appendChild(txt)
}

function test(){

  plus_one(x,side_len*4+5,cur,"fff")
  
 
  
}

function step0(){
  	
  document.getElementById('step_forward').setAttribute("disabled", true);
  
  fc_track(1)
  fc_process(3)
  subindex(frb[cur]-radius[frb[cur]]+1,frb[cur]+radius[frb[cur]]-1,y+35,"aaa","cl"); 
  document.getElementById("clr"+frb[cur]).setAttribute("fill","red")
  document.getElementById("clt"+frb[cur]).setAttribute("fill","white")
  arrow(y,frb[cur],"black","C","center_element",true,'aaa');
  arrow(y+side_len,frb[cur],"black","C","center_element",false,'fff');
 

  t0=setTimeout(function(){
    var dropdown=setInterval(down,1)
    cnt1=0
    var c_drop=6*side_len+10*2+60
    step_interval1=c_drop/100
    function down(){
      if (cnt1>=100){
        
        sub_title(y+35+6*side_len+10*2+font_size+60,"Palingdrom 2","aaa")
        clearInterval(dropdown)
        document.getElementById('step_forward').disabled=false     	

   
      }else{
        for (var i=frb[cur]-radius[frb[cur]]+1;i<frb[cur]+radius[frb[cur]];i++){
          document.getElementById('clr'+(i).toString()).setAttribute("transform","translate(0,"+step_interval1+")");
          document.getElementById('clt'+(i).toString()).setAttribute("transform","translate(0,"+step_interval1+")");
        }
        step_interval1+=c_drop/100
        cnt1+=1
  
      }    
    }
    
  },1000)
  
} 

function step1(){
  document.getElementById('step_forward').setAttribute("disabled", true);

  fc_track(3)
  fc_process(4)
  subindex(mirror[cur]-radius[mirror[cur]]+1,mirror[cur]+radius[mirror[cur]]-1,y+35,"aaa","ml"); 
  document.getElementById("mlr"+mirror[cur]).setAttribute("fill","red")
  document.getElementById("mlt"+mirror[cur]).setAttribute("fill","white")
  arrow(y,mirror[cur],"black","M","mirror_element",true,'aaa');
  arrow(y+side_len,mirror[cur],"black","M","mirror_element",false,'fff');

  t1=setTimeout(function(){
    var dropdown=setInterval(down,1)
    cnt1=0
    var m_drop=3*side_len+10+60
    step_interval2=m_drop/100
    function down(){
      if (cnt1>=100){
        clearInterval(dropdown)
        sub_title(y+35+3*side_len+10+font_size+60,"Palingdrom 1","aaa")
        document.getElementById('step_forward').disabled=false
      }else{
        for (var i=mirror[cur]-radius[mirror[cur]]+1;i<mirror[cur]+radius[mirror[cur]];i++){
          document.getElementById('mlr'+(i).toString()).setAttribute("transform","translate(0,"+step_interval2+")");
          document.getElementById('mlt'+(i).toString()).setAttribute("transform","translate(0,"+step_interval2+")");
        }
        step_interval2+=m_drop/100
        cnt1+=1
  
      }    
    }
  },1000)  
  
}

function highlight(l,r,part){
  for (var i=l;i<=r;i++){
    var highlight=document.createElementNS(NS, 'animate');
    highlight.setAttribute("id","myAnimation"); 
    highlight.setAttribute("attributeType","XML"); 
    highlight.setAttribute("attributeName","stroke-width"); 
    highlight.setAttribute("values","6;1;6;1"); 
    highlight.setAttribute("dur","1.5s"); 
    highlight.setAttribute("repeatCount","1");

    var rect=document.getElementById(part+'r'+i.toString())  
    rect.appendChild(highlight)
    highlight.beginElement()
  }
}

function step2(){
  document.getElementById('step_forward').setAttribute("disabled", true);

  fc_track(4)
  fc_process(5)
  highlight(mutual_l[cur],2*mirror[cur]-mutual_l[cur],"cl")
  highlight(mutual_l[cur],2*mirror[cur]-mutual_l[cur],'ml')
  
  t2=setTimeout(function(){
    fc_track(5)
 
    if (frb[cur]-radius[frb[cur]]+1<mutual_l[cur]){
      tree_di=9
      tree_fc=13
  
    }else if(mirror[cur]-radius[mirror[cur]]+1<mutual_l[cur]){
      tree_di=8
      tree_fc=12
  
    }else{
      tree_di=7
      tree_fc=11
    }
    di_process(tree_di)
    fc_process(tree_fc)
    subindex(mutual_l[cur],2*mirror[cur]-mutual_l[cur],5,"ddd","mtu");  
    document.getElementById("mtur"+mirror[cur]).setAttribute("fill","red")
    document.getElementById("mtut"+mirror[cur]).setAttribute("fill","white")
    sub_title(font_size,"Palingdrom 3","ddd")
    document.getElementById('step_forward').disabled=false
  },1500)
}

function step3(){
  document.getElementById('step_forward').setAttribute("disabled", true);
  fc_track(tree_fc)    
  fc_process(18)
  // subindex(mutual_l[cur],2*mirror[cur]-mutual_l[cur],side_len+5,"eee","m_c"); 
  // document.getElementById("m_cr"+mirror[cur]).setAttribute("fill","red")
  // document.getElementById("m_ct"+mirror[cur]).setAttribute("fill","white")   
  // var flip=document.createElementNS(NS, 'animateTransform');
  // flip.setAttribute("type","scale"); 
  // flip.setAttribute("attributeName","transform"); 
  // flip.setAttribute("begin","1s"); 
  // flip.setAttribute("dur","2s"); 
  // flip.setAttribute("from","1,1"); 
  // flip.setAttribute("to","-1,1"); 
  // flip.setAttribute("fill","freeze");   
  // var kk=(frb[cur]*2+1)*side_len+x*2  
  // document.getElementById("eee").appendChild(flip)  
  // document.getElementById("eee").setAttribute("width", kk)     
  // flip.beginElement()  
  
  var flip_animation=setInterval(flip,3)
  cnt_flip=0
  var flip_step=[]
  var flip_interval=[]  
  for (var i=mutual_l[cur];i<=2*mirror[cur]-mutual_l[cur];i++){
    flip_step[i]=(2*frb[cur]-i-i)*side_len/200
    flip_interval[i]=(2*frb[cur]-i-i)*side_len/200
  }
    
  function flip(){
    if (cnt_flip>=200){         
      clearInterval(flip_animation)             
  
    }else{
      for (var i=mutual_l[cur];i<=2*mirror[cur]-mutual_l[cur];i++){          
        document.getElementById('mtur'+(i).toString()).setAttribute("transform","translate("+flip_interval[i]+",0)");
        document.getElementById('mtut'+(i).toString()).setAttribute("transform","translate("+flip_interval[i]+",0)");
        flip_interval[i]+=flip_step[i]        
      }      
      cnt_flip+=1      
    }    
  }
  
  t3=setTimeout(function(){
    if (frb[cur]-radius[frb[cur]]==mirror[cur]-radius[mirror[cur]]){
      fc_process(25)
      
    }else{
      fc_process(26)      
    }
    di_process(tree_di+8)
    
    document.getElementById('eee').innerHTML='';
    subindex(2*frb[cur]-2*mirror[cur]+mutual_l[cur],2*frb[cur]-mutual_l[cur],side_len+5,"eee","cur");     
    // document.getElementById("eee").setAttribute("width", "100%")  
    fc_track(18)
    document.getElementById("fcr18").setAttribute("fill", "whitesmoke") 
  
    document.getElementById("curr"+cur).setAttribute("fill","red")
    document.getElementById("curt"+cur).setAttribute("fill","white")
    sub_title(side_len+font_size,"Palingdrom 4","eee")
    document.getElementById('step_forward').disabled=false 
  },2000)  
}

function step4(){    
  document.getElementById('step_forward').setAttribute("disabled", true);

  if (frb[cur]-radius[frb[cur]]==mirror[cur]-radius[mirror[cur]]){
    fc_track(25)
    document.getElementById("fcr25").setAttribute("fill", "whitesmoke")
    fc_process(19)      
    step_cnt+=1
  }else{
    fc_track(26)
    document.getElementById("fcr26").setAttribute("fill", "whitesmoke")
    fc_process(20)
    step_cnt+=3
  }

  build(x,side_len+5,radius[mirror[cur]],side_len,side_len,mirror[cur],"fff","black","grey","white","projection"); 
  highlight(mirror[cur],mirror[cur],"projection")
  t5=setTimeout(function(){
    var projection=setInterval(right_move,1)
    cnt1=0
    var update_dis=(cur-mirror[cur])*side_len
    step_interval3=update_dis/200
    function right_move(){
      if (cnt1>=200){
        document.getElementById("radr"+cur).remove()
        document.getElementById("radt"+cur).remove()  
        document.getElementById("projectionr"+mirror[cur]).setAttribute("id","radr"+cur.toString())      
        document.getElementById("projectiont"+mirror[cur]).setAttribute("id","radt"+cur.toString())     
        clearInterval(projection)
        
        // document.getElementById("fcr18").setAttribute("fill", "whitesmoke")
        
        document.getElementById('step_forward').disabled=false
        
    
      }else{        
        document.getElementById("projectionr"+mirror[cur]).setAttribute("transform","translate("+step_interval3+",0)");
        document.getElementById('projectiont'+mirror[cur]).setAttribute("transform","translate("+step_interval3+",0)");
        
        step_interval3+=update_dis/200
        cnt1+=1    
      }    
    }
  },2000)
  
}

function step5(){
    
    
    build(x,side_len+5,cur,side_len,side_len,cur,"eee","red","white","black","cur");    
    document.getElementById("radt"+cur).innerHTML=1;
    fc_track(1)
    di_process(6)
    fc_process(10)
    sub_title(side_len+font_size,"Palingdrom 4","eee")
}

function plus_one(x,y,i,svg){  
  var txt=document.createElementNS(NS,"text")  
  // txt.setAttribute('id',seg)  
  txt.setAttribute('x', x+side_len*(i-1/4));  
  txt.setAttribute("y", y+font_size);
  txt.setAttribute("font-size",24);
  txt.setAttribute("font-weight","bold")
  txt.innerHTML = "+1";  
  document.getElementById(svg).appendChild(txt);
  
  var plusone=document.createElementNS(NS, 'animate');
  plusone.setAttribute("id","myAnimation"); 
  plusone.setAttribute("attributeType","XML"); 
  plusone.setAttribute("attributeName","fill"); 
  // plusone.setAttribute("begin",begin)
  plusone.setAttribute("from","black"); 
  plusone.setAttribute("to","white"); 
  plusone.setAttribute("dur","1s");   

  txt.appendChild(plusone)
  plusone.beginElement()  

  var plus1=setInterval(gradient,1)
  var cnt1=0  
  var step_interval5=2*side_len/200
  function gradient(){
    if (cnt1>=200){            
      clearInterval(plus1)
      txt.remove()
    }else{        
      txt.setAttribute("transform","translate("+step_interval5+",0)");          
      step_interval5+=2*side_len/200
      cnt1+=1    
    }    
  }
}

var rest
function step6(){  
  document.getElementById('step_forward').setAttribute('disabled',true)

  var j=1 
  for (var k=0;k<lens;k++){
    build(x,5,s[k],side_len,side_len,k,"fff","black","white","black","rad_s"); 
  }

  if (cur<(frb[cur]+radius[frb[cur]]-1)){   
    new_boundary=setInterval(nb,1000)  
    rest=radius[cur]+cur-1-(2*frb[cur]-mutual_l[cur])
    var map_r=2*frb[cur]-mutual_l[cur]
    var map_l=2*cur-2*frb[cur]+mutual_l[cur]
    fc_track(19)
    di_process(24)
    fc_process(23)
    function nb(){
      if (j>rest){
        clearInterval(new_boundary);
        document.getElementById('step_forward').disabled=false
      }else{
        build(x,side_len+5,map_r+j,side_len,side_len,map_r+j,"eee","green","white","black","cur");
        build(x,side_len+5,map_l-j,side_len,side_len,map_l-j,"eee","green","white","black","cur");
        
        document.getElementById("rad_sr"+(map_r+j).toString()).setAttribute("stroke","none")
        document.getElementById("rad_sr"+(map_r+j).toString()).setAttribute("fill","green")
        document.getElementById("rad_st"+(map_r+j).toString()).setAttribute("fill","white")

        document.getElementById("rad_sr"+(map_l-j).toString()).setAttribute("stroke","none")
        document.getElementById("rad_sr"+(map_l-j).toString()).setAttribute("fill","green")
        document.getElementById("rad_st"+(map_l-j).toString()).setAttribute("fill","white")
        
        j++    
        document.getElementById("radt"+cur).innerHTML=map_r-cur+j
        plus_one(x,side_len*4+5,cur,"fff")        
      }
    }
  }else{   
    new_boundary=setInterval(nb,1000)    
    rest=radius[cur]-1  
    fc_track(10)
    di_process(14)
    fc_process(23)  
    function nb(){
      if (j>rest){
        clearInterval(new_boundary);
        document.getElementById('step_forward').disabled=false
      }else{
        build(x,side_len+5,cur+j,side_len,side_len,cur+j,"eee","green","white","black","cur");
        build(x,side_len+5,cur-j,side_len,side_len,cur-j,"eee","green","white","black","cur");
        
        document.getElementById("rad_sr"+(cur+j).toString()).setAttribute("stroke","none")
        document.getElementById("rad_sr"+(cur+j).toString()).setAttribute("fill","green")
        document.getElementById("rad_st"+(cur+j).toString()).setAttribute("fill","white")

        document.getElementById("rad_sr"+(cur-j).toString()).setAttribute("stroke","none")
        document.getElementById("rad_sr"+(cur-j).toString()).setAttribute("fill","green")
        document.getElementById("rad_st"+(cur-j).toString()).setAttribute("fill","white")
        j++
        document.getElementById("radt"+cur).innerHTML=j;
        plus_one(x,side_len*4+5,cur,"fff")  
      }
    }
  }  
}

function step7(){
  document.getElementById('step_forward').setAttribute('disabled',true)
  
  fc_track(23)
  di_process(27)
  fc_process(0)

  t6=setTimeout(function(){
    var update_rb=setInterval(right_move1,1)
    cnt1=0
    var update_dis=rest*side_len
    if (cur>(frb[cur]+radius[frb[cur]]-1)){
      update_dis+=side_len
    }
    
    step_interval4=update_dis/100
    function right_move1(){
      if (cnt1>=100){
        clearInterval(update_rb)
        document.getElementById('step_forward').disabled=false
           
      }else{        
        document.getElementById('rightmostp').setAttribute("transform","translate("+step_interval4+",0)");
        document.getElementById('rightmostt').setAttribute("transform","translate("+step_interval4+",0)");
        
        step_interval4+=update_dis/100
        cnt1+=1
  
      }    
    }
  },1000)
}

function step8(){
  fc_track(20)  
  flowchart_block(21,fx+625,fy+700,375,70,"<tspan x="+(fx+812.5)+" y="+(fy+700+20)+">Why not need to compare elements</tspan><tspan x="+(fx+812.5)+" y="+(fy+700+50)+">outside of the flipped substring?</tspan>")
  fc_process(21)
  
  next_l=2*frb[cur]-2*mirror[cur]+mutual_l[cur]-1
  next_r=2*frb[cur]-mutual_l[cur]+1
  build(x,side_len+5,next_l,side_len,side_len,next_l,"eee","grey","white","black","cur");
  build(x,side_len+5,next_r,side_len,side_len,next_r,"eee","grey","white","black","cur");
 
  build_question(x,5-2,next_l,side_len,"eee","cur_sgn")
  build_question(x,5-2,next_r,side_len,"eee","cur_sgn")
  
}

function step9(){
  flowchart_block(22,fx+625,fy+770,375,170,nc_txt)
  fc_track(22)
  

  subpal(mirror[cur]-radius[mirror[cur]]+1,mirror[cur]+radius[mirror[cur]]-1,4*side_len+y+35+10+60,"aaa","ml_pal")
  subpal(frb[cur]-radius[frb[cur]]+1,frb[cur]+radius[frb[cur]]-1,7*side_len+y+35+10*2+60,"aaa","cl_pal")

  subpal(2*frb[cur]-2*mirror[cur]+mutual_l[cur],2*frb[cur]-mutual_l[cur],2*side_len+5+60,"eee","cur_pal"); 

  build(x,2*side_len+5,next_r,side_len,side_len,next_l,"eee","grey","white","black","cur_pal");
  build(x,2*side_len+5,next_l,side_len,side_len,next_r,"eee","grey","white","black","cur_pal");
}

function step10(){ 
  nc_txt+="<tspan x="+(fx+812.5)+" y="+(fy+770+50)+">Inside substring 1: S[<tspan class=ori>"+next_l+"</tspan>]=S[<tspan class=rev>"+(2*frb[cur]-next_l)+"</tspan>]</tspan>"
  document.getElementById("fct22").innerHTML=nc_txt

  for (var i=frb[cur]-radius[frb[cur]]+1;i<frb[cur]+radius[frb[cur]];i++){
    if (i!=next_l){
      document.getElementById("clr"+i.toString()).setAttribute("stroke","lightgrey")
      document.getElementById("clt"+i.toString()).setAttribute("fill","lightgrey")

      document.getElementById("cl_palr"+i.toString()).setAttribute("stroke","lightgrey")
      document.getElementById("cl_palt"+i.toString()).setAttribute("fill","lightgrey")
    }
  }
  build_done(x,5*side_len+y+35+10*2+60,next_l,side_len,"aaa","cl_sgn")  
}

function step11(){
  

  for (var i=mirror[cur]-radius[mirror[cur]]+1;i<mirror[cur]+radius[mirror[cur]];i++){
    if (i!=frb[cur]*2-next_l){
      document.getElementById("mlr"+i.toString()).setAttribute("stroke","lightgrey")
      document.getElementById("mlt"+i.toString()).setAttribute("fill","lightgrey")

      document.getElementById("ml_palr"+i.toString()).setAttribute("stroke","lightgrey")
      document.getElementById("ml_palt"+i.toString()).setAttribute("fill","lightgrey")
    }    
  }

  if (mirror[cur]-radius[mirror[cur]]+1>frb[cur]-radius[frb[cur]]+1){
    build(x,3*side_len+y+35+10+60,mutual_l[cur]-1,side_len,side_len,mutual_l[cur]-1,"aaa","red","white","black","ml");
    build(x,3*side_len+y+35+10+60,2*mirror[cur]-mutual_l[cur]+1,side_len,side_len,2*mirror[cur]-mutual_l[cur]+1,"aaa","red","white","black","ml");
    build(x,4*side_len+y+35+10+60,mutual_l[cur]-1,side_len,side_len,2*mirror[cur]-mutual_l[cur]+1,"aaa","blue","white","black","ml_pal");
    build(x,4*side_len+y+35+10+60,2*mirror[cur]-mutual_l[cur]+1,side_len,side_len,mutual_l[cur]-1,"aaa","blue","white","black","ml_pal");

    document.getElementById("mlr"+(mutual_l[cur]-1).toString()).setAttribute("stroke-dasharray",dash)
    document.getElementById("mlr"+(2*mirror[cur]-mutual_l[cur]+1).toString()).setAttribute("stroke-dasharray",dash)
    document.getElementById("ml_palr"+(mutual_l[cur]-1).toString()).setAttribute("stroke-dasharray",dash)
    document.getElementById("ml_palr"+(2*mirror[cur]-mutual_l[cur]+1).toString()).setAttribute("stroke-dasharray",dash)

    build_error(x,2*side_len+y+35+10+60,frb[cur]*2-next_l,side_len,"aaa","ml_sgn")
    nc_txt+="<tspan x="+(fx+812.5)+" y="+(fy+770+80)+">Outside substring 2: S[<tspan class=ori>"+(frb[cur]*2-next_l)+"</tspan>]!=S[<tspan class=rev>"+(2*mirror[cur]-2*frb[cur]+next_l)+"</tspan>]</tspan>"
  }else{
    build_done(x,2*side_len+y+35+10+60,frb[cur]*2-next_l,side_len,"aaa","ml_sgn")
    nc_txt+="<tspan x="+(fx+812.5)+" y="+(fy+770+80)+">Inside substring 2: S[<tspan class=ori>"+(frb[cur]*2-next_l)+"</tspan>]=S[<tspan class=rev>"+(2*mirror[cur]-2*frb[cur]+next_l)+"</tspan>]</tspan>"
  }  
  
  document.getElementById("fct22").innerHTML=nc_txt
}

function step12(){
  if (mirror[cur]-radius[mirror[cur]]+1<frb[cur]-radius[frb[cur]]+1) {
    build(x,6*side_len+y+35+10*2+60,mutual_l[cur]-1,side_len,side_len,mutual_l[cur]-1,"aaa","red","white","black","cl");
    build(x,6*side_len+y+35+10*2+60,2*frb[cur]-mutual_l[cur]+1,side_len,side_len,2*frb[cur]-mutual_l[cur]+1,"aaa","red","white","black","cl");
    build(x,7*side_len+y+35+10*2+60,mutual_l[cur]-1,side_len,side_len,2*frb[cur]-mutual_l[cur]+1,"aaa","blue","white","black","cl_pal");
    build(x,7*side_len+y+35+10*2+60,2*frb[cur]-mutual_l[cur]+1,side_len,side_len,mutual_l[cur]-1,"aaa","blue","white","black","cl_pal");

    document.getElementById("clr"+(mutual_l[cur]-1).toString()).setAttribute("stroke-dasharray",dash)
    document.getElementById("clr"+(2*frb[cur]-mutual_l[cur]+1).toString()).setAttribute("stroke-dasharray",dash)
    document.getElementById("cl_palr"+(mutual_l[cur]-1).toString()).setAttribute("stroke-dasharray",dash)
    document.getElementById("cl_palr"+(2*frb[cur]-mutual_l[cur]+1).toString()).setAttribute("stroke-dasharray",dash)
    
    build_error(x,5*side_len+y+35+10*2+60,mutual_l[cur]-1,side_len,"aaa","cl_sgn")
    nc_txt+="<tspan x="+(fx+812.5)+" y="+(fy+770+110)+">Outside substring 1: S[<tspan class=ori>"+(2*mirror[cur]-2*frb[cur]+next_l)+"</tspan>]!=S[<tspan class=rev>"+(4*frb[cur]-2*mirror[cur]-next_l)+"</tspan>]</tspan>"
  }else{
    document.getElementById("clr"+(mutual_l[cur]-1).toString()).setAttribute("stroke","red")
    document.getElementById("clt"+(mutual_l[cur]-1).toString()).setAttribute("fill","black")

    document.getElementById("cl_palr"+(mutual_l[cur]-1).toString()).setAttribute("stroke","blue")
    document.getElementById("cl_palt"+(mutual_l[cur]-1).toString()).setAttribute("fill","black")
    build_done(x,5*side_len+y+35+10*2+60,mutual_l[cur]-1,side_len,"aaa","cl_sgn")
    nc_txt+="<tspan x="+(fx+812.5)+" y="+(fy+770+110)+">Inside substring 1: S[<tspan class=ori>"+(2*mirror[cur]-2*frb[cur]+next_l)+"</tspan>]=S[<tspan class=rev>"+(4*frb[cur]-2*mirror[cur]-next_l)+"</tspan>]</tspan>"
  }  
  
  document.getElementById("fct22").innerHTML=nc_txt
}

function step13(){

  document.getElementById("curr"+next_l.toString()).setAttribute("stroke","red")
  document.getElementById("curr"+next_l.toString()).setAttribute("stroke-dasharray",dash)
  document.getElementById("curr"+next_r.toString()).setAttribute("stroke","red")
  document.getElementById("curr"+next_r.toString()).setAttribute("stroke-dasharray",dash)
  document.getElementById("cur_palr"+next_l.toString()).setAttribute("stroke","blue")
  document.getElementById("cur_palr"+next_l.toString()).setAttribute("stroke-dasharray",dash)
  document.getElementById("cur_palr"+next_r.toString()).setAttribute("stroke","blue")
  document.getElementById("cur_palr"+next_r.toString()).setAttribute("stroke-dasharray",dash)
 
  
  document.getElementById("cur_sgnt"+next_l.toString()).remove()
  document.getElementById("cur_sgnt"+next_r.toString()).remove()
  build_error(x,5-2,next_l,side_len,"eee","cur_sgn")
  build_error(x,5-2,next_r,side_len,"eee","cur_sgn")

  nc_txt+="<tspan x="+(fx+812.5)+" y="+(fy+770+140)+">Hence: S[<tspan class=ori>"+next_l+"</tspan>]!=S[<tspan class=rev>"+(4*frb[cur]-2*mirror[cur]-next_l)+"</tspan>]</tspan>"
  document.getElementById("fct22").innerHTML=nc_txt
}

function build_done(x,y,i,interval,part,seg){
  var svg= document.getElementById(part)
  var polyline = document.createElementNS(NS, "polyline");  
  polyline.setAttribute('id',seg+'p'+i.toString())  
  polyline.setAttribute("points", 
  ""+(x+i*interval+1)+","+(y+0.5*side_len)+" "+(x+i*interval+0.5*side_len)+","+(y+0.9*side_len)+" "+(x+i*interval+0.95*side_len)+","+(y+0.05*side_len)+"");
  polyline.setAttribute("stroke-width", "5");    
  polyline.setAttribute("stroke", "lightgreen");
  polyline.setAttribute("fill", "none");
  svg.appendChild(polyline);
}

function build_error(x,y,i,interval,part,seg){
  var svg= document.getElementById(part)
  var txt = document.createElementNS(NS, 'text'); 
  txt.setAttribute('id',seg+'t'+i.toString())  
  txt.setAttribute('x', x+i*interval);
  txt.setAttribute("y", y+40);
  txt.setAttribute("font-size",70);
  txt.setAttribute("font-weight","bold")
  txt.setAttribute("fill","red");
  txt.innerHTML = "&times";
  svg.appendChild(txt);
}

function build_question(x,y,i,interval,part,seg){
  var svg= document.getElementById(part)
  var txt = document.createElementNS(NS, 'text'); 
  txt.setAttribute('id',seg+'t'+i.toString())  
  txt.setAttribute('x', x+i*interval+5);
  txt.setAttribute("y", y+30);
  txt.setAttribute("font-size","40");
  txt.setAttribute("font-weight","bold")
  txt.setAttribute("fill","orange");
  txt.innerHTML = "?";
  svg.appendChild(txt);
}

function reset(){
  step_cnt=0  
  nc_txt="<tspan x="+(fx+812.5)+" y="+(fy+770+20)+">Reverse all palindromic substrings:</tspan>"
  
  document.getElementById("aaa").innerHTML=""
  document.getElementById('ddd').innerHTML=""
  document.getElementById('eee').innerHTML=""
  document.getElementById('fff').innerHTML=""
  clearInterval(new_boundary);
  document.getElementById("flow").innerHTML=""
  document.getElementById("select_center").innerHTML=""
  for (var i = 0; i < lens; i++) {    
    build(x,y+35+side_len,s[i],side_len,side_len,i,"aaa","white","grey","white","ori");   
    build(x,y+35,i,side_len,side_len,i,"aaa","white","white","black","idx"); 
    build_center(2,10,i,20,20,i,"select_center","black","white",'black',"cen_idx");
  };
  

  draw_flowchart()
}

function select(i){
  reset()
  arrow(y,i,"Black","Cur","current_element",true,'aaa');
  arrow(y+side_len,i,"Black","Cur","current_element",false,'fff');
  arrow(y+side_len*3,frb[i]+radius[frb[i]]-1,"green","Rightmost border","rightmost",false,'aaa');
  fc_process(1)
  // document.getElementById('idxr'+i.toString()).setAttribute('stroke',"black")
  document.getElementById('idxr'+i.toString()).setAttribute('fill',"grey")
  document.getElementById('idxt'+i.toString()).setAttribute('fill',"white")
  
  document.getElementById('orir'+i.toString()).setAttribute('stroke',"black")
  document.getElementById('orir'+i.toString()).setAttribute('fill',"white")
  document.getElementById('orit'+i.toString()).setAttribute('fill',"black")
  cur=i
  document.getElementById('cen_idxr'+i.toString()).setAttribute('fill',"black")
  document.getElementById('cen_idxt'+i.toString()).setAttribute('fill',"white")

  for (var j=0;j<cur;j++){
    build(x,side_len+5,radius[j],side_len,side_len,j,"fff","black","white","black","rad"); 
  }
  for (var j=cur;j<lens;j++){
    build(x,side_len+5,"?",side_len,side_len,j,"fff","black","white","black","rad");
  }
  
  document.getElementById('radr'+cur).setAttribute("fill","grey")
  document.getElementById("radt"+cur).innerHTML="?"
  document.getElementById("radt"+cur).setAttribute("fill","white")  
  sub_title(font_size,"<tspan x="+(x-250)+" y="+(font_size)+">Radius of longest</tspan><tspan x="+(x-250)+" y="+(font_size*2)+">palingdrom centered</tspan><tspan x="+(x-250)+" y="+(font_size*3)+">on current element</tspan>","fff")
}

function stepforward(){
  if (cur==-1){
    alert('Please select an index as palindrom center before loading the animation.')
  }else{
    
    switch(step_cnt){
      case 0:
        if (cur>=(frb[cur]+radius[frb[cur]]-1)){ 
          di_process(6)  
          fc_process(10) 
          step5()
          step_cnt=6
          break
        }else{
          di_process(2)
          step0()
          step_cnt+=1
          break    
        }
        
      case 1:
        step1()
        step_cnt+=1

        break
      case 2:
        step2()
        step_cnt+=1
        break
      case 3:
        step3()
        step_cnt+=1
        break
      case 4:
        step4()
        step_cnt+=1
        break
      case 5:
        step5()
        step_cnt+=1
        break
      case 6:
        step6()
        step_cnt+=1
        break
      case 7:
        step7()
        step_cnt=14
        break
      
      case 8:
        step8()
        step_cnt+=1
        break
      case 9:
        step9()
        step_cnt+=1
        break
      case 10:
        step10()
        step_cnt+=1
        break
      case 11:
        step11()
        step_cnt+=1
        break
      case 12:
        step12()
        step_cnt+=1
        break
      case 13:
        step13()
        step_cnt+=1
        break

      case 14:
        alert('Animation ended, take your time to review the flowchart;\n\n'
        +'or you can try other index as palindrom center,\nor re-create a new string.')
        break 
    }
  }
}

// flow chart
// document.getElementById("Algorithms Introduction").style.display="none"
// document.getElementById("Generate String").style.display="none"

var svg_flow=document.getElementById("flow")
var fc_color="lightgrey"
function flowchart_block(id,x_val,y_val,width,height,val){
  var rect=document.createElementNS(NS,"rect")
  rect.setAttribute("id","fcr"+id)
  rect.setAttribute("x",x_val)
  rect.setAttribute("y",y_val)
  rect.setAttribute("width",width)
  rect.setAttribute("height",height)
  rect.setAttribute("stroke",fc_color)
  rect.setAttribute("fill","None")
  svg_flow.appendChild(rect)

  var txt=document.createElementNS(NS,"text")
  txt.setAttribute("id","fct"+id)
  txt.setAttribute("x",x_val+5+width/2)
  txt.setAttribute("y",y_val+25)
  txt.setAttribute("font-size",20)
  txt.setAttribute("fill",fc_color)
  txt.setAttribute("text-anchor","middle")
  txt.setAttribute("dominant-baseline", "middle")
  txt.innerHTML=val
  svg_flow.appendChild(txt)
}

function direction(id,x1,y1,x2,y2,val){    
  var line=document.createElementNS(NS,"line")
  line.setAttribute('id',"dil"+id)
  line.setAttribute("x1",x1)
  line.setAttribute("y1",y1)
  line.setAttribute("x2",x2)
  line.setAttribute("y2",y2)
  line.setAttribute("stroke-width",5)
  line.setAttribute("stroke",fc_color)
  svg_flow.appendChild(line)  

  var txt=document.createElementNS(NS,"text")
  txt.setAttribute("id","dit"+id)
  if (x1==x2){
    txt.setAttribute("x",x1-50)
    txt.setAttribute("y",(y1+y2)/2)
  }else{
    txt.setAttribute("x",(x1+x2)/2)
    txt.setAttribute("y",y1-10)
  }
  txt.setAttribute("fill",fc_color)
  txt.setAttribute("font-size",20)
  txt.innerHTML=val
  svg_flow.appendChild(txt)
  
  var pointer = document.createElementNS(NS, "polygon");   
  pointer.setAttribute("id","dip"+id)
  if (x1==x2){
    if (y1<y2){
      pointer.setAttribute("points", ""+x2+","+(y2+5)+" "+(x2-10)+","+(y2-20)+" "+(x2+10)+","+(y2-20)+"");
    }else{
      pointer.setAttribute("points", ""+x2+","+(y2-5)+" "+(x2-10)+","+(y2+20)+" "+(x2+10)+","+(y2+20)+"");
    }
  }else if(x1>x2){
    pointer.setAttribute("points", ""+(x2-5)+","+y2+" "+(x2+20)+","+(y2-10)+" "+(x2+20)+","+(y2+10)+"");
  }else{    
    pointer.setAttribute("points", ""+(x2+5)+","+y2+" "+(x2-20)+","+(y2-10)+" "+(x2-20)+","+(y2+10)+"");
  }
  pointer.setAttribute("fill", fc_color);  
  svg_flow.appendChild(pointer);
  
}

var fx=200
var fy=70
// nc:no need to compare
var nc_txt

function draw_flowchart(){
  flowchart_block(0,fx-150,fy-50,100,160,"<tspan x="+(fx-100)+" y="+(fy-30)+">Update</tspan><tspan x="+(fx-100)+" y="+fy+">rightmost</tspan><tspan x="+(fx-100)+" y="+(fy+30)+">border</tspan>.")
  flowchart_block(1,fx-50,fy-50,300,160,"<tspan x="+(fx+100)+" y="+(fy-30)+">To check whether or not the</tspan><tspan x="+(fx+100)+" y="+(fy)+"> selected current element is in the</tspan>"+
  "<tspan x="+(fx+100)+" y="+(fy+30)+">left hand side of the rightmost</tspan><tspan x="+(fx+100)+" y="+(fy+60)+">border of all known palingdromes</tspan>"+
  "<tspan x="+(fx+100)+" y="+(fy+90)+">centered on previous elements.</tspan>")
  direction(2,fx+250,fy,fx+400-5,fy,"Yes")

  flowchart_block(3,fx+400,fy-50,300,100,"<tspan x="+(fx+550)+" y="+(fy-30)+">The palindrom 2 centered on <tspan class=bold>C</tspan></tspan>"
  +"<tspan x="+(fx+550)+" y="+fy+">has the rightmost border among</tspan><tspan x="+(fx+550)+" y="+(fy+30)+">all known palingdrmic substrings.</tspan>")

  flowchart_block(4,fx+700,fy-50,300,100,"<tspan x="+(fx+850)+" y="+(fy-30)+">Palindrom 1 is longest palingdrom</tspan>"+
  "<tspan x="+(fx+850)+" y="+fy+">centered on <tspan class=bold>M</tspan>, which is symmetrical</tspan><tspan x="+(fx+850)+" y="+(fy+30)+">to current element in palindrom 2.</tspan>")

  flowchart_block(5,fx+400,fy+50,600,100,"<tspan x="+(fx+700)+" y="+(fy+50+20)+">Among all the subsets from intersection of palingdrom 1 and 2,</tspan>"
  +"<tspan x="+(fx+700)+" y="+(fy+50+50)+">the longest palindrom centered on <tspan class=bold>M</tspan> is palindrom 3; its start point </tspan>"
  +"<tspan x="+(fx+700)+" y="+(fy+50+80)+">is from left borders of palingdrom 1 and 2 which is closer to <tspan class=bold>M</tspan>.</tspan>")

  direction(6,fx+100,fy+110,fx+100,fy+250-5,"No")
  direction(7,fx+475,fy+150,fx+475,fy+250-5,"")
  direction(8,fx+700,fy+150,fx+700,fy+250-5,"")
  direction(9,fx+925,fy+150,fx+925,fy+250-5,"")
  flowchart_block(10,fx-50,fy+250,300,70,"<tspan x="+(fx+100)+" y="+(fy+250+20)+">Current element itself is also </tspan><tspan x="+(fx+100)+" y="+(fy+250+50)+">palingdromic: palingdrom 4.</tspan>")
  
  flowchart_block(11,fx+400,fy+250,150,70,"<tspan x="+(fx+475)+" y="+(fy+250+20)+">Same left</tspan><tspan x="+(fx+475)+" y="+(fy+250+50)+">side borders</tspan>")
  flowchart_block(12,fx+625,fy+250,150,70,"<tspan x="+(fx+700)+" y="+(fy+250+20)+">Palingdrom 2 has</tspan><tspan x="+(fx+700)+" y="+(fy+250+50)+">closer left border</tspan>")
  flowchart_block(13,fx+850,fy+250,150,70,"<tspan x="+(fx+925)+" y="+(fy+250+20)+">Palingdrom 1 has</tspan><tspan x="+(fx+925)+" y="+(fy+250+50)+">closer left border</tspan>")

  direction(14,fx+100,fy+320,fx+100,fy+400-5,"")
  flowchart_block(23,fx-150,fy+400,500,140,"<tspan x="+(fx+100)+" y="+(fy+400+25)+">Traversing right side elements outside palingdrom 4</tspan>"
  +"<tspan x="+(fx+100)+" y="+(fy+400+55)+">from near to far; comparing with left side elements</tspan>"
  +"<tspan x="+(fx+100)+" y="+(fy+400+85)+">which have equal distance to current element,</tspan>"
  +"<tspan x="+(fx+100)+" y="+(fy+400+115)+">break out while values differed or end reached.</tspan>")
  direction(27,fx-100,fy+400,fx-100,fy+110+5,"")
  
  direction(15,fx+475,fy+320,fx+475,fy+600-5,"")
  direction(16,fx+700,fy+320,fx+700,fy+600-5,"")
  direction(17,fx+925,fy+320,fx+925,fy+600-5,"")

  
  flowchart_block(25,fx+395,fy+440,225,100,"<tspan x="+(fx+507.5)+" y="+(fy+440+20)+">which is <tspan class=emphasize>part of</tspan> longest</tspan>"
  +"<tspan x="+(fx+507.5)+" y="+(fy+440+50)+">palingdrom centered</tspan><tspan x="+(fx+507.5)+" y="+(fy+440+80)+">on current element.</tspan>")
  flowchart_block(26,fx+620,fy+440,375,100,"<tspan x="+(fx+807.5)+" y="+(fy+440+20)+">which is <tspan class=emphasize>exactly</tspan> the longest </tspan><tspan x="+(fx+807.5)+" y="+(fy+440+50)+">palingdrom centered</tspan>"
  +"<tspan x="+(fx+807.5)+" y="+(fy+440+80)+">on current element.</tspan>")
  flowchart_block(18,fx+395,fy+400,600,40,"To flip palingdrom 3 by the center <tspan class=bold>C</tspan> to get palindrom 4.")

  document.getElementById("fcr18").setAttribute("stroke-dasharray","8,8")
  document.getElementById("fcr18").setAttribute("fill", "whitesmoke")
  document.getElementById("fcr25").setAttribute("stroke-dasharray","8,8")
  document.getElementById("fcr25").setAttribute("fill", "whitesmoke")
  document.getElementById("fcr26").setAttribute("stroke-dasharray","8,8")
  document.getElementById("fcr26").setAttribute("fill", "whitesmoke")

  flowchart_block(19,fx+175,fy+600,375,100,"<tspan x="+(fx+362.5)+" y="+(fy+600+20)+">The radius of longest palindromic substring</tspan>"
  +"<tspan x="+(fx+362.5)+" y="+(fy+600+50)+">centered on current element <tspan class=emphasize>is no less than</tspan> its</tspan>"
  +"<tspan x="+(fx+362.5)+" y="+(fy+600+80)+">reversed one centered on <tspan class=ebold>M</tspan> flipped around <tspan class=bold>C</tspan>.</tspan>")
  direction(24,fx+250,fy+600,fx+250,fy+540+5,"")

  flowchart_block(20,fx+625,fy+600,375,100,"<tspan x="+(fx+812.5)+" y="+(fy+600+20)+">The radius of longest palindromic substring</tspan>"
  +"<tspan x="+(fx+812.5)+" y="+(fy+600+50)+">centered on current element <tspan class=emphasize>is equal to</tspan> its</tspan>"
  +"<tspan x="+(fx+812.5)+" y="+(fy+600+80)+">reversed one centered on <tspan class=bold>M</tspan> flipped around <tspan class=bold>C</tspan>.</tspan>")
  
}



var track_color="black"
function fc_process(fc_id){  
  document.getElementById("fcr"+fc_id).setAttribute("stroke",track_color)
  document.getElementById("fcr"+fc_id).setAttribute("fill",track_color)
  document.getElementById("fct"+fc_id).setAttribute("fill","white")
}

function fc_track(fc_id){  
  document.getElementById("fcr"+fc_id).setAttribute("stroke",track_color)
  document.getElementById("fcr"+fc_id).setAttribute("fill","none")
  document.getElementById("fct"+fc_id).setAttribute("fill",track_color)
}

function di_process(di_id){
  document.getElementById("dil"+di_id).setAttribute("stroke",track_color)
  document.getElementById("dip"+di_id).setAttribute("fill",track_color)
  document.getElementById("dit"+di_id).setAttribute("fill",track_color)
}

function menu(){
  var sub_menu = document.getElementById('menu');
  var dis_v = sub_menu.style.display;    
  if(dis_v == "block")
      sub_menu.style.display = "none";
  else
      sub_menu.style.display = "block";        
}


// 只需要P-1就行 不需要p
// introduction 解释回文
// 点出总共只跑了O(n)
// 改下flowchart的顺序
