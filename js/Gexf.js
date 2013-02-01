/* * ************************************************************ 
 * 
 * Date: Jan 27, 2013
 * version: 1.0
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Description:   
 * Holds GexfJS Object and methods
 * Javascript file Gexf.js
 * requires jquery
 * 
 * *************************************************************** */
GexfJS = {
    oldGraphZone : {},
    graphZone : {
        width : 0,
        height : 0
    },
    lensRadius : 200,
    lensGamma : 0.5,
    oldParams : {},
    minZoom : -3,
    maxZoom : 10,
    overviewWidth : 200,
    overviewHeight : 175,
    baseWidth : 800,
    baseHeight : 700,
    overviewScale : .25,
    totalScroll : 0,
    autoCompletePosition : 0,
    maindiv: {},
    ovdiv : {},
    canvas : {},
    ovview : {},
    slider : {},
    
    p : {
        centreX : 800,
        centreY : 320,
        margin : 30,
        activeNode : -1,
        currentNode : -1,
        mainViewDiv : "#zonecentre",
        mainDivTop : '0px',
        overviewDiv : "#overviewzone",
        zoomSlider : "#zoomSlider",
        graphFile : false,
        useLayout: true,
        layoutClass: {}
    },
    messageShow: function(data){
        console.log(data);
    },
    messageHide: function(){
        
    },
    zoomin : function(){
        GexfJS.p.zoomLevel = Math.min( GexfJS.maxZoom, GexfJS.p.zoomLevel + 1);
        GexfJS.slider.slider("value", GexfJS.p.zoomLevel);
        GexfJS.draw();
        return false;
    },
    zoomout : function(){
        GexfJS.p.zoomLevel = Math.max( GexfJS.minZoom, GexfJS.p.zoomLevel - 1);
        GexfJS.slider.slider("value",GexfJS.p.zoomLevel);
        GexfJS.draw();
        return false;
    },
    toggleLens : function(){
        $(this).attr("class",GexfJS.p.useLens?"":"off")
            .attr("title", i18n.strLang( GexfJS.p.showEdges ? "lensOff" : "lensOn" ) );
        GexfJS.p.useLens = !GexfJS.p.useLens;
        GexfJS.draw();
        return false;
    },
    toggleEdges : function(){
        $(this).attr("class",GexfJS.p.showEdges?"":"off")
            .attr("title", i18n.strLang( GexfJS.p.showEdges ? "edgeOff" : "edgeOn" ) );
        GexfJS.p.showEdges = !GexfJS.p.showEdges;
        GexfJS.draw();
        return false;
    },
    toggleLayoutUse: function(){
        if(GexfJS.p.useLayout){
            GexfJS.p.useLayout = false;
            GexfJS.p.layoutClass.stop();
            $(this).addClass('off');
        }else{
            GexfJS.p.useLayout = true;
            $(this).removeClass('off');
            GexfJS.p.layoutClass.start();
        }
    },
    
    init : function(conf){
        GexfJS.setConf(conf);
        GexfJS.maindiv = $(GexfJS.p.mainViewDiv);
        GexfJS.ovdiv = $(GexfJS.p.overviewDiv);
        if(typeof GexfJS.p.messageShow=='function') GexfJS.messageShow = GexfJS.p.messageShow
        if(typeof GexfJS.p.messageHide=='function') GexfJS.messageHide = GexfJS.p.messageHide
//        GexfJS.p.centreX = (GexfJS.maindiv.width()-GexfJS.ovdiv.width())/2;
//        GexfJS.p.centreY = GexfJS.maindiv.height()/2;
        GexfJS.addCanvas();
        GexfJS.addEvents();
        if(GexfJS.p.useLayout&&(!GexfJS.p.layoutClass)&&FR){
            GexfJS.p.layoutClass = FR;
        }
        GexfJS.initMap();
        if(GexfJS.p.graphFile)
            GexfJS.loadAndDrawGraph();
    },
    
    setConf: function(conf){
        $.extend(GexfJS.p,conf);
    },
    
    addCanvas : function(){
        if ( !document.createElement('canvas').getContext ) {
            alert("Error!! This browser doesn't support htmp5 canvas, get a better browser.");
            return;
        }
        GexfJS.canvas = $('<canvas/>',{'id':'carte'}).attr({'height':0,'width':0});
        GexfJS.ovview = $('<canvas/>',{'id':'overview'}).attr({'height':0,'width':0});;
        GexfJS.maindiv.prepend(GexfJS.canvas);
        GexfJS.ovdiv.prepend(GexfJS.ovview);
        GexfJS.ctxGraphe = document.getElementById('carte').getContext('2d');
        GexfJS.ctxMini = document.getElementById('overview').getContext('2d');
    },
    
    addEvents : function(){
        GexfJS.slider = $(GexfJS.p.zoomSlider);
        GexfJS.canvas.mousemove(GexfJS.onGraphMove).click(GexfJS.onGraphClick)
            .mousedown(GexfJS.startMove).mousewheel(GexfJS.onGraphScroll)
            .mouseout(function(){
                GexfJS.mousePosition = null;
                GexfJS.endMove();
            });
        GexfJS.ovview.mousemove(GexfJS.onOverviewMove).mousedown(GexfJS.startMove).mouseup(GexfJS.endMove)
            .mouseout(GexfJS.endMove).mousewheel(GexfJS.onGraphScroll);
        GexfJS.ovdiv.mouseover(function()
            {
                $(this).animate({'opacity':1});
            }).mouseleave(function(){
                $(this).animate({'opacity':0.3});
            }).animate({'opacity':0.3});
    },
    
    initMap : function(){
        GexfJS.oldParams = {};
        GexfJS.ctxGraphe.clearRect(0, 0, GexfJS.graphZone.width, GexfJS.graphZone.height);
        GexfJS.p.zoomLevel = -1;
        GexfJS.slider.slider({
            orientation: "vertical",
            value: GexfJS.p.zoomLevel,
            min: GexfJS.minZoom,
            max: GexfJS.maxZoom,
            range: "min",
            step: 1,
            slide: function( event, ui ) {
                GexfJS.p.zoomLevel = ui.value;
            }
        });
        GexfJS.ovdiv.css({
            width : GexfJS.overviewWidth + "px",
            height : GexfJS.overviewHeight + "px"
        });
        GexfJS.ovview.attr({
            width : GexfJS.overviewWidth,
            height : GexfJS.overviewHeight
        });
        GexfJS.graph = null;
    },
    
    loadAndDrawGraph : function(url){
        var u = (typeof url !== 'undefined') ? url : (document.location.hash.length > 1 ? document.location.hash.substr(1) : GexfJS.p.graphFile );
        GexfJS.messageShow("Loading Gexf File..");
        $.ajax({
            url: u,
            dataType: "xml",
            success: GexfJS.parseGraph,
            error: function(jxr,status,error){
                console.log("graph loading failed,\n status - "+status+",\nerror - "+error);
            }
        });
    },
    
    parseGraph: function(data){
        GexfJS.messageShow("Parsing graph..");
        GexfJS.updateWorkspaceBounds();
        var _s = new Date();
        var _g = $(data).find("graph"),
            _nodes = _g.children().filter("nodes").children(),
            _edges = _g.children().filter("edges").children(),
            _attrs = _g.children().filter("attributes").children(),
            _colorid,_sizeid,_wtid;
        $(_attrs).each(function(){
            if($(this).attr('title')=='color')
                _colorid = $(this).attr('id');
            if($(this).attr('title')=='size')
                _sizeid = $(this).attr('id')
            if($(this).attr('title')=='weight')
                _wtid = $(this).attr('id')
        })
        GexfJS.graph = {
            directed : ( _g.attr("defaultedgetype") == "directed" ),
            source : data,
            nodeList : [],
            nodeIndexById : [],
            nodeIndexByLabel : [],
            edgeList : []
        }

        var _xmin = 0, _xmax = 0, _ymin = 0, _ymax = 0,_smax = 1,_smin=1;
        $(_nodes).each(function() {
            var _n = $(this),_x,_y,_r,_g,_b,
                    _pos = _n.find("viz\\:position,position"),
                    _size = _n.find("viz\\:size,size").attr("value"),
                    _id = _n.attr("id"),
                    _label = _n.attr("label") || _id,
                    _col = _n.find("viz\\:color,color"),
                    _attr = _n.find("attvalue"),
                    _d = {
                        id: _id,
                        label: _label
                    };
            if(isNaN(_size)){
                _size = _n.find('attvalue[for="'+_sizeid+'"]').attr('value');
                _size = isNaN(_size)?5:_size;
            }

            if(!_col.size()){
                var color = _n.find('attvalue[for="'+_colorid+'"]').attr('value') || 150;
                _r = _g = _b = color;
            }else{
                _r = _col.attr("r");
                _g = _col.attr("g");
                _b = _col.attr("b");
            }

            _d.color = {
                rgb : {
                    r : _r,
                    g : _g,
                    b : _b
                },
                base : "rgba(" + _r + "," + _g + "," + _b + ",.7)",
                gris : "rgba(" + Math.floor(84 + .33 * _r) + "," + Math.floor(84 + .33 * _g) + "," + Math.floor(84 + .33 * _b) + ",.5)"
            }
            _d.attributes = [];
            $(_attr).each(function() {
                var _a = $(this),
                    _for = _a.attr("for");                    
                _d.attributes[ _for ? _for : 'attribute_' + _a.attr("id") ] = _a.attr("value");
            });
            
            if(!_pos.size()){
                _x = Math.floor((Math.random())*GexfJS.baseWidth);
                _y = Math.floor((Math.random())*GexfJS.baseHeight);
            }else{
                _x = _pos.attr("x"),
                _y = _pos.attr("y");   
            }

            _d.coords = {
                base : {
                    x : _x,
                    y : _y,
                    r : _size
                }
            }


            GexfJS.graph.nodeIndexById.push(_id);
            GexfJS.graph.nodeIndexByLabel.push(_label.toLowerCase());
            GexfJS.graph.nodeList.push(_d);

            _xmin = Math.min(_x, _xmin);
            _xmax = Math.max(_x, _xmax);
            _ymin = Math.min(_y, _ymin);
            _ymax = Math.max(_y, _ymax);
            _smax = Math.max(_size, _smax);
            _smin = Math.min(_size, _smin);

        });

        var _echelle = Math.min( ( GexfJS.baseWidth ) / ( _xmax - _xmin ) , ( GexfJS.baseHeight) / ( _ymax - _ymin ) );
        var _pxmax = GexfJS.baseWidth,_pxmin = 0, _pymax = GexfJS.baseHeight, _pymin = 0;
        var range_xa = (_pxmax - _pxmin)/(_xmax-_xmin);
        var range_xb = (_xmax*_pxmin - _xmin*_pxmax)/(_xmax-_xmin);
        var range_ya = (_pymax - _pymin)/(_ymax-_ymin);
        var range_yb = (_ymax*_pymin - _ymin*_pymax)/(_ymax-_xmin);
        var _nsmin = GexfJS.p.minNodeSize || 1, _nsmax = GexfJS.p.maxNodeSize || 10;
        var range_a = (_nsmax - _nsmin)/(_smax-_smin);
        var range_b = (_smax*_nsmin - _smin*_nsmax)/(_smax-_smin);

        for(var i in GexfJS.graph.nodeList) {
            var _b = GexfJS.graph.nodeList[i].coords.base;
            _b = 
                {
                    x : (range_xa*_b.x + range_xb),
                    y : (range_ya*_b.y + range_yb),
                    r : (range_a*_b.r + range_b)
                }
            GexfJS.graph.nodeList[i].coords.base = _b;
        }

        var _wmax = 1,_wmin=1;
        $(_edges).each(function() {
            var _e = $(this),
                _sid = _e.attr("source"),
                _six = GexfJS.graph.nodeIndexById.indexOf(_sid),
                _tid = _e.attr("target"),
                _tix = GexfJS.graph.nodeIndexById.indexOf(_tid),
                _w = _e.find('attvalue[for="weight"]').attr('value') || _e.attr('weight'),
                _col = _e.find("color");

            _w = isNaN(_w)?1:_w;

            _wmax = Math.max(_w, _wmax);
            _wmin = Math.min(_w, _wmin);

            if (_col.length) {
                var _r = _col.attr("r"),
                    _g = _col.attr("g"),
                    _b = _col.attr("b");
            } else {
                var _scol = GexfJS.graph.nodeList[_six].color.rgb;
                if (GexfJS.graph.directed) {
                    var _r = _scol.r,
                        _g = _scol.g,
                        _b = _scol.b;
                } else {
                    var _tcol = GexfJS.graph.nodeList[_tix].color.rgb,
                        _r = Math.floor( .5 * _scol.r + .5 * _tcol.r ),
                        _g = Math.floor( .5 * _scol.g + .5 * _tcol.g ),
                        _b = Math.floor( .5 * _scol.b + .5 * _tcol.b );
                }
            }
            GexfJS.graph.edgeList.push({
                source : _six,
                target : _tix,
                width : _w,
                weight : parseFloat(_w || 0),
                color : "rgba(" + _r + "," + _g + "," + _b + ",.7)"
            });
        });

        _nsmin = GexfJS.p.minEdgeWidth || 1;
        _nsmax = GexfJS.p.maxEdgeWidth || 10;
        range_a = (_nsmax - _nsmin)/(_wmax-_wmin);
        range_b = (_wmax*_nsmin - _wmin*_nsmax)/(_wmax-_wmin);

        for(var j in GexfJS.graph.edgeList){
            GexfJS.graph.edgeList[j].width = (range_a*GexfJS.graph.edgeList[j].width + range_b);
        }
        if(GexfJS.p.useLayout){
            GexfJS.messageShow("Creating Layout..");
            GexfJS.messageHide();
            GexfJS.p.layoutClass.start();
        }
        else
            GexfJS.draw();

    },
    
    
    updateWorkspaceBounds : function() {
    
        var _top = {
            top : GexfJS.p.mainDivTop
        }
        GexfJS.maindiv.css(_top);

        GexfJS.graphZone.width = GexfJS.maindiv.width();
        GexfJS.graphZone.height = GexfJS.maindiv.height();
        
        GexfJS.baseWidth = GexfJS.graphZone.width-GexfJS.p.margin;
        GexfJS.baseHeight = GexfJS.graphZone.height - GexfJS.p.margin;
        
        GexfJS.areParamsIdentical = true;

        for (var i in GexfJS.graphZone) {
            GexfJS.areParamsIdentical = GexfJS.areParamsIdentical && ( GexfJS.graphZone[i] == GexfJS.oldGraphZone[i] );
        }
        if (!GexfJS.areParamsIdentical) {

        GexfJS.canvas
            .attr({
                width : GexfJS.graphZone.width,
                height : GexfJS.graphZone.height
            })
            .css({
                width : GexfJS.graphZone.width + "px",
                height : GexfJS.graphZone.height + "px"
            });
            for (var i in GexfJS.graphZone) {
                GexfJS.oldGraphZone[i] = GexfJS.graphZone[i];
            }
        }
    },

    startMove : function(evt) {
        evt.preventDefault();
        GexfJS.dragOn = true;
        GexfJS.lastMouse = {
            x : evt.pageX,
            y : evt.pageY
        }
        GexfJS.mouseHasMoved = false;
    },

    endMove : function(evt) {
        document.body.style.cursor = "default";
        GexfJS.dragOn = false;
        GexfJS.mouseHasMoved = false;
    },

    onGraphClick : function(evt) {
        if (!GexfJS.mouseHasMoved) {
            displayNode(GexfJS.p.activeNode);
        }
        GexfJS.endMove();
        GexfJS.draw();
    },

    changeGraphPosition : function(evt, echelle) {
        document.body.style.cursor = "move";
        var _coord = {
            x : evt.pageX,
            y : evt.pageY
        };
        GexfJS.p.centreX += ( GexfJS.lastMouse.x - _coord.x ) / echelle;
        GexfJS.p.centreY += ( GexfJS.lastMouse.y - _coord.y ) / echelle;
        GexfJS.lastMouse = _coord;
    },

    onGraphMove : function(evt) {
        evt.preventDefault();
        if (!GexfJS.graph) {
            return;
        }
        GexfJS.mousePosition = {
            x : evt.pageX - $(this).offset().left,
            y : evt.pageY - $(this).offset().top
        }
        if (GexfJS.dragOn) {
            GexfJS.changeGraphPosition(evt,GexfJS.echelleGenerale);
            GexfJS.mouseHasMoved = true;
            GexfJS.draw();
        } else {
            GexfJS.p.activeNode = GexfJS.getNodeFromPos(GexfJS.mousePosition);
            document.body.style.cursor = ( GexfJS.p.activeNode != -1 ? "pointer" : "default" );
            GexfJS.draw();
        }
    },

    onOverviewMove : function(evt) {
        if (GexfJS.dragOn) {
            GexfJS.changeGraphPosition(evt,-GexfJS.overviewScale);
            GexfJS.draw();
        }
    },

    onGraphScroll : function(evt, delta) {
        GexfJS.totalScroll += delta;
        if (Math.abs(GexfJS.totalScroll) >= 1) {
            if (GexfJS.totalScroll < 0) {
                if (GexfJS.p.zoomLevel > GexfJS.minZoom) {
                    GexfJS.p.zoomLevel--;
                    var _el = $(this),
                        _off = $(this).offset(),
                        _deltaX = evt.pageX - _el.width() / 2 - _off.left,
                        _deltaY = evt.pageY - _el.height() / 2 - _off.top;
                    GexfJS.p.centreX -= ( Math.SQRT2 - 1 ) * _deltaX / GexfJS.echelleGenerale;
                    GexfJS.p.centreY -= ( Math.SQRT2 - 1 ) * _deltaY / GexfJS.echelleGenerale;
                    $("#zoomSlider").slider("value",GexfJS.p.zoomLevel);
                }
            } else {
                if (GexfJS.p.zoomLevel < GexfJS.maxZoom) {
                    GexfJS.p.zoomLevel++;
                    GexfJS.echelleGenerale = Math.pow( Math.SQRT2, GexfJS.p.zoomLevel );
                    var _el = $(this),
                        _off = $(this).offset(),
                        _deltaX = evt.pageX - _el.width() / 2 - _off.left,
                        _deltaY = evt.pageY - _el.height() / 2 - _off.top;
                    GexfJS.p.centreX += ( Math.SQRT2 - 1 ) * _deltaX / GexfJS.echelleGenerale;
                    GexfJS.p.centreY += ( Math.SQRT2 - 1 ) * _deltaY / GexfJS.echelleGenerale;
                    $("#zoomSlider").slider("value",GexfJS.p.zoomLevel);
                }
            }
            GexfJS.draw();
            GexfJS.totalScroll = 0;
        }
    },


    getNodeFromPos : function( _coords ) {
        for (var i = GexfJS.graph.nodeList.length - 1; i >= 0; i--) {
            var _d = GexfJS.graph.nodeList[i];
            if (_d.visible && _d.withinFrame) {
                var _c = _d.coords.actual;
                    _r = Math.sqrt( Math.pow( _c.x - _coords.x , 2) + Math.pow( _c.y - _coords.y , 2 ) );
                if ( _r < _c.r ) {
                    return i;
                }
            }
        }
        return -1;
    },

    calcCoord : function(x, y, coord) {
        var _r = Math.sqrt( Math.pow( coord.x - x , 2 ) + Math.pow( coord.y - y , 2 ) );
        if ( _r < GexfJS.lensRadius ) {
            var _cos = ( coord.x - x ) / _r;
            var _sin = ( coord.y - y ) / _r;
            var _newr = GexfJS.lensRadius * Math.pow( _r / GexfJS.lensRadius, GexfJS.lensGamma );
            var _coeff = ( GexfJS.lensGamma * Math.pow( ( _r + 1 ) / GexfJS.lensRadius, GexfJS.lensGamma - 1 ) );
            return {
                "x" : x + _newr * _cos,
                "y" : y + _newr * _sin,
                "r" : _coeff * coord.r
            }
        }
        else {
            return coord;
        }
    },
    
    draw : function(){
        GexfJS.traceMini();
        GexfJS.traceMap();
    },

    traceArc : function(contexte, source, target) {
        contexte.beginPath();
        contexte.moveTo(source.x, source.y);
        if (GexfJS.p.curvedEdges) {
            if ( ( source.x == target.x ) && ( source.y == target.y ) ) {
                var x3 = source.x + 2.8 * source.r;
                var y3 = source.y - source.r;
                var x4 = source.x;
                var y4 = source.y + 2.8 * source.r;
                contexte.bezierCurveTo(x3,y3,x4,y4,source.x + 1,source.y);
            } else {
                var x3 = .3 * target.y - .3 * source.y + .8 * source.x + .2 * target.x;
                var y3 = .8 * source.y + .2 * target.y - .3 * target.x + .3 * source.x;
                var x4 = .3 * target.y - .3 * source.y + .2 * source.x + .8 * target.x;
                var y4 = .2 * source.y + .8 * target.y - .3 * target.x + .3 * source.x;
                contexte.bezierCurveTo(x3,y3,x4,y4,target.x,target.y);
            }
        } else {
            contexte.lineTo(target.x,target.y);
        }
        contexte.stroke();
    },
    
    traceMini : function(){
        GexfJS.ctxMini.clearRect(0, 0, GexfJS.overviewWidth, GexfJS.overviewHeight);
        for(var i in GexfJS.graph.nodeList) {
            var _d = GexfJS.graph.nodeList[i];

            GexfJS.ctxMini.fillStyle = _d.color.base;
            GexfJS.ctxMini.beginPath();
            GexfJS.ctxMini.arc( _d.coords.base.x * GexfJS.overviewScale , _d.coords.base.y * GexfJS.overviewScale , _d.coords.base.r * GexfJS.overviewScale + 1 , 0 , Math.PI*2 , true );
            GexfJS.ctxMini.closePath();
            GexfJS.ctxMini.fill();
        }
        GexfJS.imageMini = GexfJS.ctxMini.getImageData(0, 0, GexfJS.overviewWidth, GexfJS.overviewHeight);
    },

    traceMap : function() {
        GexfJS.updateWorkspaceBounds();
        
        if (!GexfJS.graph) {
            return;
        }
        var _identical = GexfJS.areParamsIdentical;
        GexfJS.p.mousePosition = ( GexfJS.p.useLens ? ( GexfJS.mousePosition ? ( GexfJS.mousePosition.x + "," + GexfJS.mousePosition.y ) : "out" ) : null );
        for (var i in GexfJS.p) {
            _identical = _identical && ( GexfJS.p[i] == GexfJS.oldParams[i] );
        }
        if (_identical) {
            return;
        } else {
            for (var i in GexfJS.p) {
                GexfJS.oldParams[i] = GexfJS.p[i];
            }
        }
        GexfJS.echelleGenerale = Math.pow( Math.SQRT2, GexfJS.p.zoomLevel );
        GexfJS.decalageX = ( GexfJS.graphZone.width / 2 ) - ( GexfJS.p.centreX * GexfJS.echelleGenerale );
        GexfJS.decalageY = ( GexfJS.graphZone.height / 2 ) - ( GexfJS.p.centreY * GexfJS.echelleGenerale );
        
        var _sizeFactor = GexfJS.echelleGenerale * Math.pow(GexfJS.echelleGenerale, -.15),
            _edgeSizeFactor = _sizeFactor * GexfJS.p.edgeWidthFactor,
            _nodeSizeFactor = _sizeFactor * GexfJS.p.nodeSizeFactor,
            _textSizeFactor = 1,
            _limTxt = 9;

        GexfJS.ctxGraphe.clearRect(0, 0, GexfJS.graphZone.width, GexfJS.graphZone.height);

        if (GexfJS.p.useLens && GexfJS.mousePosition) {
            GexfJS.ctxGraphe.fillStyle = "rgba(220,220,250,0.4)";
            GexfJS.ctxGraphe.beginPath();
            GexfJS.ctxGraphe.arc( GexfJS.mousePosition.x , GexfJS.mousePosition.y , GexfJS.lensRadius , 0 , Math.PI*2 , true );
            GexfJS.ctxGraphe.closePath();
            GexfJS.ctxGraphe.fill();
        }

        var _centralNode = ( ( GexfJS.p.activeNode != -1 ) ? GexfJS.p.activeNode : GexfJS.p.currentNode );

        for (var i in GexfJS.graph.nodeList) {
            var _d = GexfJS.graph.nodeList[i];
            _d.coords.actual = {
                x : GexfJS.echelleGenerale * _d.coords.base.x + GexfJS.decalageX,
                y : GexfJS.echelleGenerale * _d.coords.base.y + GexfJS.decalageY,
                r : _nodeSizeFactor * _d.coords.base.r 
            }
            _d.withinFrame = ( ( _d.coords.actual.x + _d.coords.actual.r > 0 )
                            && ( _d.coords.actual.x - _d.coords.actual.r < GexfJS.graphZone.width )
                            && ( _d.coords.actual.y + _d.coords.actual.r > 0)
                            && (_d.coords.actual.y - _d.coords.actual.r < GexfJS.graphZone.height) );
            _d.visible = ( GexfJS.p.currentNode == -1 || i == _centralNode || GexfJS.p.showEdges );
        }

        var _tagsMisEnValeur = [];

        if ( _centralNode != -1 ) {
            _tagsMisEnValeur = [ _centralNode ];
        }

        var _displayEdges = ( GexfJS.p.showEdges && GexfJS.p.currentNode == -1 );

        for (var i in GexfJS.graph.edgeList) {
            var _d = GexfJS.graph.edgeList[i],
                _six = _d.source,
                _tix = _d.target,
                _ds = GexfJS.graph.nodeList[_six],
                _dt = GexfJS.graph.nodeList[_tix];
            var _isLinked = false;
            if (_centralNode != -1) {
                if (_six == _centralNode) {
                    _tagsMisEnValeur.push(_tix);
                    _coulTag = _dt.color.base;
                    _isLinked = true;
                    _dt.visible = true;
                }
                if (_tix == _centralNode) {
                    _tagsMisEnValeur.push(_six);
                    _coulTag = _ds.color.base;
                    _isLinked = true;
                    _ds.visible = true;
                }
            }

            if ( ( _isLinked || _displayEdges ) && ( _ds.withinFrame || _dt.withinFrame ) &&  _ds.visible && _dt.visible ) {
                GexfJS.ctxGraphe.lineWidth = _edgeSizeFactor * _d.width;
                var _coords = ( ( GexfJS.p.useLens && GexfJS.mousePosition ) ? GexfJS.calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _ds.coords.actual ) : _ds.coords.actual );
                _coordt = ( (GexfJS.p.useLens && GexfJS.mousePosition) ? GexfJS.calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _dt.coords.actual ) : _dt.coords.actual );
                GexfJS.ctxGraphe.strokeStyle = ( _isLinked ? _d.color : "rgba(100,100,100,0.2)" );
                GexfJS.traceArc(GexfJS.ctxGraphe, _coords, _coordt);
            }
        }
        GexfJS.ctxGraphe.lineWidth = 4;
        GexfJS.ctxGraphe.strokeStyle = "rgba(0,100,0,0.8)";

        if (_centralNode != -1) {
            var _dnc = GexfJS.graph.nodeList[_centralNode];
            _dnc.coords.real = ( (GexfJS.p.useLens && GexfJS.mousePosition ) ? GexfJS.calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _dnc.coords.actual ) : _dnc.coords.actual );
        }

        for (var i in GexfJS.graph.nodeList) {
            var _d = GexfJS.graph.nodeList[i];
            if (_d.visible && _d.withinFrame) {
                if (i != _centralNode) {
                    _d.coords.real = ( ( GexfJS.p.useLens && GexfJS.mousePosition ) ? GexfJS.calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _d.coords.actual ) : _d.coords.actual );
                    _d.isTag = ( _tagsMisEnValeur.indexOf(parseInt(i)) != -1 );
                    GexfJS.ctxGraphe.beginPath();
                    GexfJS.ctxGraphe.fillStyle = ( ( _tagsMisEnValeur.length && !_d.isTag ) ? _d.color.gris : _d.color.base );
                    GexfJS.ctxGraphe.arc( _d.coords.real.x , _d.coords.real.y , _d.coords.real.r , 0 , Math.PI*2 , true );
                    GexfJS.ctxGraphe.closePath();
                    GexfJS.ctxGraphe.fill();
                }
            }
        }

        for (var i in GexfJS.graph.nodeList) {
            var _d = GexfJS.graph.nodeList[i];
            if (_d.visible && _d.withinFrame) {
                if (i != _centralNode) {
                    var _fs = _d.coords.real.r * _textSizeFactor;
                    if (_d.isTag) {
                        if (_centralNode != -1) {
                            var _dist = Math.sqrt( Math.pow( _d.coords.real.x - _dnc.coords.real.x, 2 ) + Math.pow( _d.coords.real.y - _dnc.coords.real.y, 2 ) );
                            if (_dist > 80) {
                                _fs = Math.max(_limTxt + 2, _fs);
                            }
                        } else {
                            _fs = Math.max(_limTxt + 2, _fs);
                        }
                    }
                    if (_fs > _limTxt) {
                        GexfJS.ctxGraphe.fillStyle = ( ( i != GexfJS.p.activeNode ) && _tagsMisEnValeur.length && ( ( !_d.isTag ) || ( _centralNode != -1 ) ) ? "rgba(60,60,60,0.7)" : "rgb(0,0,0)" );
                        GexfJS.ctxGraphe.font = Math.floor( _fs )+"px Arial";
                        GexfJS.ctxGraphe.textAlign = "center";
                        GexfJS.ctxGraphe.textBaseline = "middle";
                        GexfJS.ctxGraphe.fillText(_d.label, _d.coords.real.x, _d.coords.real.y);
                    }
                }
            }
        }

        if (_centralNode != -1) {
            GexfJS.ctxGraphe.fillStyle = _dnc.color.base;
            GexfJS.ctxGraphe.beginPath();
            GexfJS.ctxGraphe.arc( _dnc.coords.real.x , _dnc.coords.real.y , _dnc.coords.real.r , 0 , Math.PI*2 , true );
            GexfJS.ctxGraphe.closePath();
            GexfJS.ctxGraphe.fill();
            GexfJS.ctxGraphe.stroke();
            var _fs = Math.max(_limTxt + 2, _dnc.coords.real.r * _textSizeFactor) + 2;
            GexfJS.ctxGraphe.font = "bold " + Math.floor( _fs )+"px Arial";
            GexfJS.ctxGraphe.textAlign = "center";
            GexfJS.ctxGraphe.textBaseline = "middle";
            GexfJS.ctxGraphe.fillStyle = "rgba(255,255,250,0.8)";
            GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x - 2, _dnc.coords.real.y);
            GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x + 2, _dnc.coords.real.y);
            GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x, _dnc.coords.real.y - 2);
            GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x, _dnc.coords.real.y + 2);
            GexfJS.ctxGraphe.fillStyle = "rgb(0,0,0)";
            GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.real.x, _dnc.coords.real.y);
        }

        GexfJS.ctxMini.putImageData(GexfJS.imageMini, 0, 0);
        var _r = GexfJS.overviewScale / GexfJS.echelleGenerale,
            _x = - _r * GexfJS.decalageX,
            _y = - _r * GexfJS.decalageY,
            _w = _r * GexfJS.graphZone.width,
            _h = _r * GexfJS.graphZone.height;

        GexfJS.ctxMini.strokeStyle = "rgb(220,0,0)";
        GexfJS.ctxMini.lineWidth = 3;
        GexfJS.ctxMini.fillStyle = "rgba(120,120,120,0.2)";
        GexfJS.ctxMini.beginPath();
        GexfJS.ctxMini.fillRect( _x, _y, _w, _h );
        GexfJS.ctxMini.strokeRect( _x, _y, _w, _h );
    },
    
    mapGraph : function(url){
        GexfJS.p.graphFile = (typeof url != 'undefined') ? url : GexfJS.p.graphFile;
        GexfJS.initMap();
        GexfJS.loadAndDrawGraph();
    },
    mapFromLink: function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        if(href!=='undefined')
            GexfJS.mapGraph(href);
    }

}