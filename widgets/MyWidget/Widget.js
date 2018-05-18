define(['dojo/_base/declare', 'jimu/BaseWidget', 'esri/toolbars/draw', 'esri/symbols/SimpleMarkerSymbol', 'esri/Color', 'esri/graphic', 'dojo/dom', 'dojo/on', 'dojo/query'],
  function (declare, BaseWidget, Draw, SimpleMarkerSymbol, Color, Graphic, dom, on, query) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-mywidget',

      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',


      //methods to communication with app container:

      /*postCreate: function () {
        this.inherited(arguments);
        console.log('postCreate');
      },*/

      startup: function () {

        this.inherited(arguments);

        //console.log(this.map);
        let mapTb = this.map;
        let color;

        let inputs = document.querySelectorAll(".colorpicker input");

        for (let i = 0; i < inputs.length; i++) {
          let inPut = inputs[i];
          inPut.addEventListener("click", function () {
            color = this.value;
            //console.log(color);
          })
        }

        initToolbar();

        var markerSymbol = new SimpleMarkerSymbol();
        markerSymbol.setStyle("circle");
        markerSymbol.size = 18;
        
        function initToolbar() {

          tb = new Draw(mapTb);
          tb.on("draw-end", addGraphic);
          let colorPicker = query(".colorpicker")[0];

          on(colorPicker, "click", function (evt) {

            if (evt.target.className === "colorpicker") {
              return;
            }

            mapTb.disableMapNavigation();
            tb.activate(Draw.POINT);

          });
        }

        function addGraphic(evt) {
          //tb.deactivate();
          mapTb.enableMapNavigation();
          var symbol;
          symbol = markerSymbol;
          symbol.setColor(color);
          mapTb.graphics.add(new Graphic(evt.geometry, symbol));
        }

      },

      onOpen: function () {
      },

      // onClose: function(){
      //   console.log('onClose');
      // },

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:

    });
  });