/* * ************************************************************ 
 * 
 * Date: Jan 23, 2013
 * version: 1.0
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Description:   
 * Javascript file page.js
 * 
 * 
 * *************************************************************** */

/* Copyright (c) 2011 Raphaël Velt
 * Licensed under the MIT License
 * Translations by :
 *    Vicenzo Cosenza (Italian)
 *    Eduardo Ramos Ibáñez (Spanish)
 *    Jaakko Salonen (Finnish)
 *    Zeynep Akata (Turkish)
 *    Σωτήρης Φραγκίσκος (Greek)
 * */

// Namespace
i18n = {
    'lang' : 'en',
    "el" : {
            "search" : "Αναζήτηση Κόμβων",
            "nodeAttr" : "Χαρακτηριστικά",
            "nodes" : "Κόμβοι",
            "inLinks" : "Εισερχόμενοι δεσμοί από",
            "outLinks" : "Εξερχόμενοι δεσμοί προς",
            "undirLinks" : "Ακατεύθυντοι δεσμοί με",
            "lensOn" : "Ενεργοποίηση φακού",
            "lensOff" : "Απενεργοποίηση φακού",
            "edgeOn" : "Εμφάνιση ακμών",
            "edgeOff" : "Απόκρυψη ακμών",
            "zoomIn" : "Μεγέθυνση",
            "zoomOut" : "Σμίκρυνση",
            "browserErr" : 'Ο περιηγητής σας δεν μπορεί να εμφανίσει σωστά αυτή τη σελίδα.<br />Σας προτείνουμε να χρησιμοποιήσετε την τελευταία έκδοση του <a href="http://www.mozilla.com/" target="_blank">Firefox</a> ή του <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>'
        },
    "en" : {
        "search" : "Search nodes",
        "nodeAttr" : "Attributes",
        "nodes" : "Nodes",
        "inLinks" : "Inbound Links from :",
        "outLinks" : "Outbound Links to :",
        "undirLinks" : "Undirected links with :",
        "lensOn" : "Activate lens mode",
        "lensOff" : "Deactivate lens mode",
        "edgeOn" : "Show edges",
        "edgeOff" : "Hide edges",
        "zoomIn" : "Zoom In",
        "zoomOut" : "Zoom Out",
        "browserErr" : 'Your browser cannot properly display this page.<br />We recommend you use the latest <a href="http://www.mozilla.com/" target="_blank">Firefox</a> or <a href="http://www.google.com/chrome/" target="_blank">Chrome</a> version'
    },
    "es" : {
        "search" : "Buscar un nodo",
        "nodeAttr" : "Atributos",
        "nodes" : "Nodos",
        "inLinks" : "Aristas entrantes desde :",
        "outLinks" : "Aristas salientes hacia :",
        "undirLinks" : "Aristas no dirigidas con :",
        "lensOn" : "Activar el modo lupa",
        "lensOff" : "Desactivar el modo lupa",
        "edgeOn" : "Mostrar aristas",
        "edgeOff" : "Ocultar aristas",
        "zoomIn" : "Acercar",
        "zoomOut" : "Alejar",
        "browserErr" : 'Tu navegador no es capaz de mostrar esta p&aacute;gina correctamente.<br />Le recomendamos utilizar la &uacute;ltima versi&oacute;n de <a href="http://www.mozilla.com/" target="_blank">Firefox</a> o <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>',
        "modularity_class" : "Clase de modularidad",
        "degree" : "Grado",
        "indegree" : "Grado de entrada",
        "outdegree" : "Grado de salida",
        "weighted degree" : "Grado ponderado",
        "weighted indegree" : "Grado de entrada ponderado",
        "weighted outdegree" : "Grado de salida ponderado",
        "closnesscentrality" : "Cercan&iacute;a",
        "betweenesscentrality" : "Intermediaci&oacute;n",
        "authority" : "Puntuaci&oacute;n de autoridad (HITS)",
        "hub" : "Puntuaci&oacute; de hub (HITS)",
        "pageranks" : "Puntuaci&oacute; de PageRank"
    },
    "fi" : {
        "search" : "Etsi solmuja",
        "nodeAttr" : "Attribuutit",
        "nodes" : "Solmut",
        "inLinks" : "Lähtevät yhteydet :",
        "outLinks" : "Tulevat yhteydet :",
        "undirLinks" : "Yhteydet :",
        "lensOn" : "Ota linssitila käyttöön",
        "lensOff" : "Poista linssitila käytöstä",
        "edgeOn" : "Näytä kaikki yhteydet",
        "edgeOff" : "Näytä vain valitun solmun yhteydet",
        "zoomIn" : "Suurenna",
        "zoomOut" : "Pienennä",
        "browserErr" : 'Selaimesi ei voi näyttää tätä sivua.<br />Suosittelemme käyttämään uusinta versiota <a href="http://www.mozilla.com/" target="_blank">Firefox</a>- tai <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>-selaimesta'
    },
    "fr" : {
        "search" : "Rechercher un n&oelig;ud",
        "nodeAttr" : "Attributs",
        "nodes" : "N&oelig;uds",
        "inLinks" : "Liens entrants depuis :",
        "outLinks" : "Liens sortants vers :",
        "undirLinks" : "Liens non-dirigés avec :",
        "lensOn" : "Activer le mode loupe",
        "lensOff" : "Désactiver le mode loupe",
        "edgeOn" : "Afficher les sommets",
        "edgeOff" : "Cacher les sommets",
        "zoomIn" : "S'approcher",
        "zoomOut" : "S'éloigner",
        "browserErr" : 'Votre navigateur n\'est malheureusement pas compatible avec les fonctionnalités de ce site<br />Nous vous suggérons d\'utiliser une version récente de <a href="http://www.mozilla.com/" target="_blank">Firefox</a> ou <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>',
        "modularity_class" : "Classe de modularité",
        "degree" : "Degr&eacute;",
        "indegree" : "&frac12; degr&eacute; int&eacute;rieur",
        "outdegree" : "&frac12; degr&eacute; ext&eacute;rieur",
        "weighted degree" : "Degr&eacute; pond&eacute;r&eacute;",
        "weighted indegree" : "&frac12; degr&eacute; int&eacute;rieur pond&eacute;r&eacute;",
        "weighted outdegree" : "&frac12; degr&eacute; ext&eacute;rieur pond&eacute;r&eacute;",
        "closnesscentrality" : "Centralit&eacute; de proximit&eacute;",
        "betweenesscentrality" : "Centralit&eacute; d'interm&eacute;diarit&eacute;",
        "authority" : "Score d'autorit&eacute; (HITS)",
        "hub" : "Score de hub (HITS)",
        "pageranks" : "Score de PageRank"
    },
    "it" : {
        "search" : "Cerca i nodi",
        "nodeAttr" : "Attributi",
        "nodes" : "Nodi",
        "inLinks" : "Link in entrata da :",
        "outLinks" : "Link in uscita verso :",
        "undirLinks" : "Link non direzionati con :",
        "lensOn" : "Attiva la lente d'ingrandimento",
        "lensOff" : "Disattiva la lente d'ingrandimento",
        "edgeOn" : "Mostra gli spigoli",
        "edgeOff" : "Nascondi gli spigoli",
        "zoomIn" : "Zoom in avanti",
        "zoomOut" : "Zoom indietro",
        "browserErr" : 'Il tuo browser non pu&ograve; visualizzare correttamente questa pagina.<br />Ti raccomandiamo l\'uso dell\'ultima versione di  <a href="http://www.mozilla.com/" target="_blank">Firefox</a> o <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>'
    },
    "tr" : {
        "search" : "Düğüm ara",
        "nodeAttr" : "Özellikler",
        "nodes" : "Düğümler",
        "inLinks" : "Gelen bağlantılar",
        "outLinks" : "Giden bağlantılar",
        "undirLinks" : "Yönsüz bağlantılar",
        "lensOn" : "Merceği etkinleştir",
        "lensOff" : "Merceği etkisizleştir",
        "edgeOn" : "Kenar çizgilerini göster",
        "edgeOff" : "Kenar çizgilerini gizle",
        "zoomIn" : "Yaklaştır",
        "zoomOut" : "Uzaklaştır",
        "browserErr" : "Tarayıcınız sayfayı doğru bir biçimde görüntüleyemiyor.<br />En son Firefox veya Chrome sürümünü kullanmanızı tavsiye ederiz."
        },
    strLang: function(_str) {
        var _l = this[this.lang];
        return ( _l[_str] ? _l[_str] : ( this["en"][_str] ? this["en"][_str] : _str.replace("_"," ") ) );
    }
};



function replaceURLWithHyperlinks(text) {
    if (GexfJS.p.replaceUrls) {
        var _urlExp = /(\b(https?:\/\/)?[-A-Z0-9]+\.[-A-Z0-9.:]+(\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*)?)/ig,
            _protocolExp = /^https?:\/\//i;
        return text.replace(_urlExp, function(_found) {
            return '<a href="'
                + ( _protocolExp.test(_found) ? '' : 'http://' )
                + _found + '" target="_blank">'
                + _found.replace(_protocolExp,'')
                + "</a>";
        });
    }
    return text;
}

function displayNode(_nodeIndex, _recentre) {
    GexfJS.p.currentNode = _nodeIndex;
    if (_nodeIndex != -1) {
        var _d = GexfJS.graph.nodeList[_nodeIndex],
            _b = _d.coords.base,
            _str = '',
            _cG = $("#leftcolumn");
            _cG.animate({
                "left" : "0px"
            }, function() {
                $("#aUnfold").attr("class","leftarrow");
                $("#zonecentre").css({
                    left: _cG.width() + "px"
                });
            });
        _str += '<h3><div class="largepill" style="background: ' + _d.color.base +'"></div>' + _d.label + '</h3>';
        _str += '<h4>' + i18n.strLang("nodeAttr") + '</h4>';
        _str += '<ul><li><b>id</b> : ' + _d.id + '</li>';
        for (var i in _d.attributes) {
            _str += '<li><b>' + i18n.strLang(i) + '</b> : ' + replaceURLWithHyperlinks( _d.attributes[i] ) + '</li>';
        }
        _str += '</ul><h4>' + ( GexfJS.graph.directed ? i18n.strLang("inLinks") : i18n.strLang("undirLinks") ) + '</h4><ul>';
        for (var i in GexfJS.graph.edgeList) {
            var _e = GexfJS.graph.edgeList[i]
            if ( _e.target == _nodeIndex ) {
                var _n = GexfJS.graph.nodeList[_e.source];
                _str += '<li><div class="smallpill" style="background: ' + _n.color.base +'"></div><a href="#" onmouseover="GexfJS.p.activeNode = ' + _e.source + '" onclick="displayNode(' + _e.source + ', true); return false;">' + _n.label + '</a>' + ( GexfJS.p.showEdgeWeight && _e.weight ? ' [' + _e.weight + ']' : '') + '</li>';
            }
        }
        if (GexfJS.graph.directed) _str += '</ul><h4>' + i18n.strLang("outLinks") + '</h4><ul>';
        for (var i in GexfJS.graph.edgeList) {
            var _e = GexfJS.graph.edgeList[i]
            if ( _e.source == _nodeIndex ) {
                var _n = GexfJS.graph.nodeList[_e.target];
                _str += '<li><div class="smallpill" style="background: ' + _n.color.base +'"></div><a href="#" onmouseover="GexfJS.p.activeNode = ' + _e.target + '" onclick="displayNode(' + _e.target + ', true); return false;">' + _n.label + '</a>' + ( GexfJS.p.showEdgeWeight && _e.weight ? ' [' + _e.weight + ']' : '') + '</li>';
            }
        }
        _str += '</ul><p></p>';
        $("#leftcontent").html(_str);
        if (_recentre) {
            GexfJS.p.centreX = _b.x;
            GexfJS.p.centreY = _b.y;
        }
        $("#searchinput")
            .val(_d.label)
            .removeClass('grey');
    }
}

function hoverAC() {
    $("#autocomplete li").removeClass("hover");
    $("#liac_"+GexfJS.autoCompletePosition).addClass("hover");
    GexfJS.p.activeNode = GexfJS.graph.nodeIndexByLabel.indexOf( $("#liac_"+GexfJS.autoCompletePosition).text().toLowerCase() );
}

function changePosAC(_n) {
    GexfJS.autoCompletePosition = _n;
    hoverAC();
}

function updateAutoComplete(_sender) {
    var _val = $(_sender).val().toLowerCase();
    var _ac = $("#autocomplete");
    if (_val != GexfJS.dernierAC || _ac.html() == "") {
        GexfJS.dernierAC = _val;
        var _strAC = "<div><h4>" + i18n.strLang("nodes") + "</h4><ul>";
        var _n = 0;
        for (var i in GexfJS.graph.nodeIndexByLabel) {
            var _l = GexfJS.graph.nodeIndexByLabel[i];
            if (_l.search(_val) != -1) {
                _strAC += '<li id="liac_' + _n + '" onmouseover="changePosAC(' + _n + ')"><a href="#" onclick="displayNode(\'' + i + '\', true); return false;"><span>' + GexfJS.graph.nodeList[i].label + '</span></a>';
                _n++;
            }
            if (_n >= 20) {
                break;
            }
        }
        GexfJS.autoCompletePosition = 0;
        _ac.html(_strAC + "</ul></div>");
    }
    hoverAC();
    _ac.show();
}

$(document).ready(function() {
    GexfJS.init({
        graphFile : "./data/Acces-2011-09-24-23.gexf",
            /*
                The GEXF file to show ! -- can be overriden by adding
                a hash to the document location, e.g. index.html#celegans.gexf
            */
        showEdges : true,
            /*
                Default state of the "show edges" button
            */
        useLens : false,
            /*
                Default state of the "use lens" button
            */
        zoomLevel : -1,
            /*
                Default zoom level. At zoom = 0, the graph should fill a 800x700px zone
             */
        curvedEdges : false,
            /*
                False for curved edges, true for straight edges
                this setting can't be changed from the User Interface
            */
        edgeWidthFactor : 0.1,
            /*
                Change this parameter for wider or narrower edges
                this setting can't be changed from the User Interface
            */
        minEdgeWidth : 10,
        maxEdgeWidth : 50,
        minNodeSize  : 5,
        maxNodeSize  : 20,
        nodeSizeFactor : 1,
        mainDivTop : $("#titlebar").height() + "px",
            /*
                Change this parameter for smaller or larger nodes
               this setting can't be changed from the User Interface
            */
        replaceUrls : true,
            /*
                Enable the replacement of Urls by Hyperlinks
                this setting can't be changed from the User Interface
            */
        showEdgeWeight : true,
            /*
                Show the weight of edges in the list
                this setting can't be changed from the User Interface
            */
        language: false,
            /*
                Set to an ISO language code to switch the interface to that language.
                Available languages are English [en], French [fr], Spanish [es],
                Italian [it], Finnish [fi], Turkish [tr] and Greek [el].
                If set to false, the language will be that of the user's browser.
            */
        useLayout : true,
        layoutClass : YH
    });

    var lang = (
        typeof GexfJS.p.language != "undefined" && GexfJS.p.language
        ? GexfJS.p.language
        : (
            navigator.language
            ? navigator.language.substr(0,2).toLowerCase()
            : (
                navigator.userLanguage
                ? navigator.userLanguage.substr(0,2).toLowerCase()
                : "en"
            )
        )
    );
    i18n.lang = (i18n[lang] ? lang : "en");
    
    $("#leftcolumn").css({'top':$("#titlebar").height() + "px"});
    
    $('.gexflink').click(GexfJS.mapFromLink);
    $("#searchinput")
        .focus(function() {
            if ( $(this).is('.grey') ) {
                $(this).val('').removeClass('grey');
            }
        })
        .keyup(function(evt) {
            updateAutoComplete(this);
        }).keydown(function(evt){
            var _l = $("#autocomplete li").length;
            switch (evt.keyCode) {
                case 40 :
                    if (GexfJS.autoCompletePosition < _l - 1) {
                        GexfJS.autoCompletePosition++;
                    } else {
                        GexfJS.autoCompletePosition = 0;
                    }
                break;
                case 38 :
                    if (GexfJS.autoCompletePosition > 0) {
                        GexfJS.autoCompletePosition--;
                    } else {
                        GexfJS.autoCompletePosition = _l - 1;
                    }
                break;
                case 27 :
                    $("#autocomplete").slideUp();
                break;
                case 13 :
                    if ($("#autocomplete").is(":visible")) {
                        var _liac = $("#liac_"+GexfJS.autoCompletePosition);
                        if (_liac.length) {
                            $(this).val(_liac.find("span").text());
                        }
                    }
                break;
                default :
                    GexfJS.autoCompletePosition = 0;
                break;
            }
            updateAutoComplete(this);
            if (evt.keyCode == 38 || evt.keyCode == 40) {
                return false;
            }
        });
    $("#recherche").submit(function() {
        if (GexfJS.graph) {
            displayNode( GexfJS.graph.nodeIndexByLabel.indexOf($("#searchinput").val().toLowerCase()), true);
        }
        return false;
    });
    
    $("#zoomMinusButton").attr("title", i18n.strLang("zoomOut"));
    $("#zoomPlusButton").attr("title", i18n.strLang("zoomIn"));
    
    $("#zoomMinusButton").click(GexfJS.zoomout)
    $("#zoomPlusButton").click(GexfJS.zoomin)
    $("#lensButton").click(GexfJS.toggleLens);
    $("#edgesButton").click(GexfJS.toggleEdges);
    $("#FRButton").click(GexfJS.toggleLayoutUse);
    
    $(document).click(function(evt) {
        $("#autocomplete").slideUp();
    });
    $("#autocomplete").css({
        top: ( $("#searchinput").offset().top + $("#searchinput").outerHeight() ) + "px",
        left: $("#searchinput").offset().left + "px"
    });
    
    $("#aUnfold").click(function() {
        var _cG = $("#leftcolumn");
        if (_cG.offset().left < 0) {
            _cG.animate({
                "left" : "0px"
            }, function() {
                $("#aUnfold").attr("class","leftarrow");
                $("#zonecentre").css({
                    left: _cG.width() + "px"
                });
            });
        } else {
            _cG.animate({
                "left" : "-" + _cG.width() + "px"
            }, function() {
                $("#aUnfold").attr("class","rightarrow");
                $("#zonecentre").css({
                    left: "0"
                });
            });
        }
        return false;
    });
});