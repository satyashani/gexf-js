/* * ************************************************************ 
 * 
 * Date: Jan 28, 2013
 * version: 1.0
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Description:
 * IMplements  Fruchterman & Reingold algo for laying out nodes in a graph.
 * Javascript file FRLayout.js
 * 
 * 
 * *************************************************************** */


FR = {
    width : 0,
    height: 0,
    graph : {},
    k : 1,  //force constant, higher=more repulsion, less attraction
    coef: 1,
    run: false,
    P : [],
    edges : [],
    conv: true,
    itr:0,
    t:100,
    
    stop:function(){
        FR.run = false;
    },
    
    start : function(){
        FR.run = true;
        FR.conv = false;
        FR.itr = 0;
        FR.width = GexfJS.graphZone.width;
        FR.height = GexfJS.graphZone.height;
        var area = FR.width*FR.height;
        FR.P = GexfJS.graph.nodeList;
        FR.edges = GexfJS.graph.edgeList;
        FR.coef = 0.2;     //Importance of force constant, higher = more replusion
        FR.k = FR.coef*Math.sqrt(area/FR.P.length);
        FR.t = Math.sqrt(area);
        
        if(GexfJS.p.developer)
            console.log("starting FR layout for N="+FR.P.length+", E="+FR.edges.length);
        for(var i in FR.P){
            FR.P[i].degree = 1;
        }
        for(var e in FR.edges){
            var _s= FR.edges[e].source,_t = FR.edges[e].target;
                FR.P[_s].degree++;
                FR.P[_t].degree++;
        }
        FR.calcPos();
    },
    
    calcPos: function(){
        FR.startTime = new Date().getTime();
        FR.startTime = new Date().getTime();
        var runtime = new Date().getTime() - FR.startTime;
        var cl=2; //a constant calculated to separate highly connected nodes further apart
        
        while((!FR.conv)&&runtime<1000&&FR.run){
            FR.itr++;
            E0 = FR.E; FR.E=0;
            for(var i in FR.P){
                FR.P[i].disp = {x:0,y:0};
                for(var j in FR.P){
                    if(i!=j){
                        cl = Math.pow(FR.P[i].degree*FR.P[j].degree/(FR.P[i].degree+FR.P[j].degree),4);
                        FR.P[i].disp = FR.plus(FR.P[i].disp, FR.fr(i,j,cl));
                    }
                }
            }
            for(var e in FR.edges){
                var _s= FR.edges[e].source,_t = FR.edges[e].target;
                FR.P[_s].disp = FR.minus(FR.P[_s].disp,FR.fa(_s,_t,cl));
                FR.P[_t].disp = FR.plus(FR.P[_t].disp,FR.fa(_s,_t,cl));
            }
            for(var i in FR.P){
                var c = Math.min(FR.mod(FR.P[i].disp),FR.t)/FR.mod(FR.P[i].disp);
                FR.P[i].disp.x = FR.P[i].disp.x*c;
                FR.P[i].disp.y = FR.P[i].disp.y*c;
                var x = FR.P[i].coords.base.x;
                var y = FR.P[i].coords.base.y;
                FR.P[i].coords.base.x = Math.min(FR.width,Math.max(0,x+FR.P[i].disp.x));
                FR.P[i].coords.base.y = Math.min(FR.height,Math.max(0,y+FR.P[i].disp.y))
            }
            FR.t = 0.9*FR.t;
            if(FR.t<5) FR.conv=true;
            runtime = new Date().getTime() - FR.startTime;
        }
        
        var ve = (FR.P.length+FR.edges.length);
        if(GexfJS.p.developer)
            console.log("converged: "+FR.conv+", itr="+FR.itr+",ve:"+ve+",run:"+FR.run);
        if((!FR.conv)&&FR.run&&(FR.itr<ve)){
            FR.timer = window.setTimeout(FR.calcPos, ve/10);
            GexfJS.draw(true);
        }else{
            window.clearTimeout(FR.timer);
            FR.stop();
            GexfJS.draw(true);
        }
    },
    
    fr  : function(i,j,cl){
        var v = FR.minus(FR.P[i].coords.base, FR.P[j].coords.base);
        var d = FR.mod(v);
        var mind = FR.P[i].coords.base.r + FR.P[j].coords.base.r;
        if(d < mind){
            d = 0.01;
            var c = (FR.k*FR.k)*cl/(d*d);
        }else{
            var c = (FR.k*FR.k)*cl/(d*d);
        }
        
        return {x:v.x*c,y:v.y*c};
    },
    
    fa  : function(i,j,cl){
        var v = FR.minus(FR.P[i].coords.base, FR.P[j].coords.base);
        var c = FR.mod(v)/(FR.k*cl);
        return {x:v.x*c,y:v.y*c};
    },
    
    mod : function(pos){
        return Math.sqrt(pos.x*pos.x+pos.y*pos.y);
    },
    
    plus: function(v1,v2){
        return {x:(v1.x+v2.x),y:(v1.y+v2.y)};
    },
    
    minus: function(v1,v2){
        return {x:(v1.x-v2.x),y:(v1.y-v2.y)};
    }
    
}