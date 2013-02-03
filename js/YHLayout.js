/* * ************************************************************ 
 * 
 * Date: Jan 30, 2013
 * version: 1.0
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Description:   
 * Javascript file YHLayout.js
 * 
 * 
 * *************************************************************** */



YH = {
    width : 0,
    height: 0,
    graph : {},
    run: false,
    d: [],
    P : [],
    Edges : {},
    progress : 0,
    step: 25,
    t: 0.9,
    startTime : 0,
    k:1,
    CR: 1,
    CA: 1,
    E:100000,
    N:0,
    conv : false,
    timer: 0,
    itr:0,
    
    stop:function(){
        YH.run = false;
    },
    
    start: function(){
        YH.itr=0;
        YH.width = GexfJS.graphZone.width;
        YH.height = GexfJS.graphZone.height;
        var area = YH.width*YH.height;
        YH.Edges = GexfJS.graph.edgeList;
        YH.P = GexfJS.graph.nodeList;
        YH.tol=0.1;
        YH.conv = false;
        YH.N=GexfJS.graph.nodeList.length;
        YH.CR= 0.4;     //Importance of repulsive force constant, higher = more replusion
        YH.CA= Math.pow(YH.N, 0.25);     //Importance of attractive force constant, higher = more attraction
        YH.k = Math.sqrt(area/YH.N);
        YH.E = 100000,
        console.log("nodes : "+YH.N+" edges: "+YH.Edges.length);
        YH.calcPos();
    },
    
    calcPos : function(){
        YH.run = true;
        YH.startTime = new Date().getTime();
        var runtime = new Date().getTime() - YH.startTime;
        var i=0,j=0,c=1;
        var E0=0,f={x:0,y:0};
        var P0 = [];
        var rmsdif = 0;
        
        while((!YH.conv)&&runtime<1000&&YH.run){
            YH.itr++;
            for(i in YH.P){
                P0[i] = {x:YH.P[i].coords.base.x,y:YH.P[i].coords.base.y};
            }
            E0 = YH.E; YH.E=0;
            for(i in YH.P){
                f.x=0;f.y=0;
                for(var e in YH.Edges){
                    if(YH.Edges[e].source==i)
                        f = YH.plus(f,YH.fa(i, YH.Edges[e].target,1));
                    if(YH.Edges[e].target==i)
                        f = YH.plus(f,YH.fa(i, YH.Edges[e].source,1));
                }
                
                for(j in YH.P){
                    if(i!=j){
                        f = YH.plus(f,YH.fr(i, j,1));
                    }
                }
                
                c = YH.mod(f);
                f = {x:f.x*YH.step/c,y:f.y*YH.step/c};
                YH.P[i].coords.base.x = Math.min(YH.width,Math.max(0,YH.P[i].coords.base.x+f.x));
                YH.P[i].coords.base.y = Math.min(YH.height,Math.max(0,YH.P[i].coords.base.y+f.y))    
                YH.E = YH.E + c*c;
            }
            YH.updateStep(YH.E, E0);
            
            rmsdif = YH.rmsDiff(P0);
            if(rmsdif<YH.k*YH.tol) YH.conv=true;
            runtime = new Date().getTime() - YH.startTime;
        }
        var ve = (YH.N+YH.Edges.length)/5;
        if((!YH.conv)&&YH.run&&(YH.itr<ve)){
            YH.timer = window.setTimeout(YH.calcPos, ve/2);
            GexfJS.draw(true);
        }else{
            window.clearTimeout(YH.timer);
            YH.stop();
            GexfJS.draw(true);
        }
    },
    
    calcDistances : function(){
        var d = new Array();
        for(var n in YH.P){
            d[n] = new Array();
            for(var m in YH.P){
                d[n][m] = 0;
            }
        }
        for(var e in YH.Edges){
            d[YH.Edges[e].source][YH.Edges[e].target] = 1;
        }
        for(var k in YH.P){
           for(var i in YH.P){
              for(var j in YH.P){
                 if(d[i][k] + d[k][j] < d[i][j])
                    d[i][j] = d[i][k] + d[k][j];
              }
           }
        }
        YH.d = d;
    },
    
    fr  : function(i,j,cl){
        var v = YH.minus(YH.P[i].coords.base, YH.P[j].coords.base)
        var d = FR.mod(v),c=0;
        if(d ==0){
            d = 0.01;
            c = (YH.CR*YH.CR*YH.k*YH.k)*cl/(d*d);
        }else{
            c = (YH.CR*YH.CR*YH.k*YH.k)*cl/(d*d);
        }
        return {x:v.x*c,y:v.y*c};
    },
    
    fa  : function(i,j,cl){
        var v = YH.minus(YH.P[j].coords.base, YH.P[i].coords.base)
        var c = YH.CA*FR.mod(v)/(YH.k*cl);
        return {x:v.x*c,y:v.y*c};
    },
    
    rmsDiff  : function(P0){
        var X=0;
        for(var i in YH.P){
                    X+= Math.pow(YH.mod(YH.minus(YH.P[i].coords.base, P0[i])), 2);
        }
        X = Math.sqrt(X);
        
        return X;
    },
    
    updateStep: function(E,E0){
        if(E<E0){
            YH.progress++;
            if(YH.progress>=2){
                YH.progress=0;
                YH.step = YH.step/YH.t;
            }
        }else{
            YH.progress=0;
            YH.step = YH.step*YH.t;
        }
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