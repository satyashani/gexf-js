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
    
    stop:function(){
        YH.run = false;
    },
    
    start : function(){
        this.run = true;
//        this.startTime = new Date().getTime();
        this.width = GexfJS.graphZone.width;
        this.height = GexfJS.graphZone.height;
        var area = this.width*this.height;
        YH.Edges = GexfJS.graph.edgeList;
        var tol=0.1,N=GexfJS.graph.nodeList.length;
        this.CR= 0.4;     //Importance of repulsive force constant, higher = more replusion
        this.CA= 1*Math.pow(N, 0.25);     //Importance of attractive force constant, higher = more attraction
        this.k = Math.sqrt(area/N);
        var itr=1,i=0,j=0,c=1;
        
        var conv = false,E = 100000,E0=0,f={x:0,y:0};
        var P0 = [];
        
        
        for(i in GexfJS.graph.nodeList){
            YH.P[i] = {x:   GexfJS.graph.nodeList[i].coords.base.x,
                       y:   GexfJS.graph.nodeList[i].coords.base.y}
        }
        
//        console.log("YH.P initialised in ms: "+(new Date().getTime()-YH.startTime));
        YH.startTime = new Date().getTime();
        
        while(!conv&&itr<50&&YH.run){
            itr++;
            for(i in YH.P){
                P0[i] = {x:YH.P[i].x,y:YH.P[i].y};
            }
            E0 = E; E=0;
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
                YH.P[i].x = Math.min(YH.width,Math.max(0,YH.P[i].x+f.x));
                YH.P[i].y = Math.min(YH.height,Math.max(0,YH.P[i].y+f.y))
//                YH.P[i] = YH.plus(YH.P[i], f);
//                console.log("f = "+JSON.stringify(f)+"P["+i+"] = "+JSON.stringify(YH.P[i])+"P0["+i+"] = "+JSON.stringify(P0[i]));
//                console.log('pdif from P0: '+JSON.stringify(YH.minus(YH.P[i], P0[i])));
                
                E = E + c*c;
            }
            YH.updateStep(E, E0);
            
//            console.log("iteration: "+itr+" time ms: "+(new Date().getTime()-YH.startTime)+" , energy change "+(E-E0));
//            YH.startTime = new Date().getTime();
            
            if(YH.rmsDiff(P0)<this.k*tol) conv=true;
        }
//        console.log("iterations: "+itr+" in time ms: "+(new Date().getTime()-YH.startTime)+" , energy change "+(E-E0));
//        YH.startTime = new Date().getTime();
        for(i in YH.P){
            GexfJS.graph.nodeList[i].coords.base.x = YH.P[i].x;
            GexfJS.graph.nodeList[i].coords.base.y = YH.P[i].y;
        }
        YH.stop();
        GexfJS.draw();
//        window.setTimeout(GexfJS.draw,1000);
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
        var v = YH.minus(YH.P[i], YH.P[j])
        var d = FR.mod(v),c=0;
        if(d ==0){
            d = 0.01;
            c = (this.CR*this.CR*this.k*this.k)*cl/(d*d);
        }else{
            c = (this.CR*this.CR*this.k*this.k)*cl/(d*d);
        }
        return {x:v.x*c,y:v.y*c};
    },
    
    fa  : function(i,j,cl){
        var v = YH.minus(YH.P[j], YH.P[i])
        var c = this.CA*FR.mod(v)/(this.k*cl);
        return {x:v.x*c,y:v.y*c};
    },
    
    rmsDiff  : function(P0){
        var X=0;
        for(var i in YH.P){
                    X+= Math.pow(YH.mod(YH.minus(YH.P[i], P0[i])), 2);
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