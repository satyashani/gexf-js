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
    run: false,
    
    stop:function(){
        FR.run = false;
    },
    
    start : function(){
        this.run = true;
        this.width = GexfJS.graphZone.width;
        this.height = GexfJS.graphZone.height;
        var area = this.width*this.height;
        var nodes = GexfJS.graph.nodeList;
        var edges = GexfJS.graph.edgeList
        var coef = 0.1;     //Importance of force constant, higher = more replusion
        var cl=1; //a constant calculated to separate highly connected nodes further apart
        this.k = coef*Math.sqrt(area/nodes.length);
        var t = Math.sqrt(area),del,itr=1;
        
        console.log("starting FR layout");
        for(var i in nodes){
            nodes[i].degree = 1;
        }
        for(var e in edges){
            var _s= edges[e].source,_t = edges[e].target;
                nodes[_s].degree++;
                nodes[_t].degree++;
        }
        
        while(t>5&&itr<50&&FR.run){
            for(var i in nodes){
                nodes[i].disp = {x:0,y:0};
                for(var j in nodes){
                    if(i!=j){
                        del = FR.minus(nodes[i].coords.base, nodes[j].coords.base);
                        cl = Math.pow(nodes[i].degree*nodes[j].degree/(nodes[i].degree+nodes[j].degree),4);
                        nodes[i].disp = FR.plus(nodes[i].disp, FR.fr(del,cl));
                    }
                }
            }
            for(var e in edges){
                var _s= edges[e].source,_t = edges[e].target;
                del = FR.minus(nodes[_s].coords.base,nodes[_t].coords.base);
                nodes[_s].disp = FR.minus(nodes[_s].disp,FR.fa(del,cl));
                nodes[_t].disp = FR.plus(nodes[_t].disp,FR.fa(del,cl));
            }
            for(var i in nodes){
                var c = Math.min(FR.mod(nodes[i].disp),t)/FR.mod(nodes[i].disp);
                nodes[i].disp.x = nodes[i].disp.x*c;
                nodes[i].disp.y = nodes[i].disp.y*c;
                var x = nodes[i].coords.base.x;
                var y = nodes[i].coords.base.y;
                nodes[i].coords.base.x = Math.min(FR.width,Math.max(0,x+nodes[i].disp.x));
                nodes[i].coords.base.y = Math.min(FR.height,Math.max(0,y+nodes[i].disp.y))
            }
            t = 0.9*t;
            GexfJS.areParamsIdentical = false;
        }
        
        FR.stop();
        GexfJS.draw();
    },
    
    fr  : function(v,cl){
        var d = FR.mod(v);
        if(d ==0){
            d = 0.01;
            var c = (this.k*this.k)*cl/(d*d);
        }else{
            var c = (this.k*this.k)*cl/(d*d);
        }
        
        return {x:v.x*c,y:v.y*c};
    },
    
    fa  : function(v,cl){
        var c = FR.mod(v)/(this.k*cl);
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