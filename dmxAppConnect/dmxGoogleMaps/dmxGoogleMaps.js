/*!
 DMXzone Google Maps
 Version: 1.0.3
 (c) 2018 DMXzone.com
 @build 2018-01-24 11:22:03
 */
/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function MarkerClusterer(e,t,r){this.extend(MarkerClusterer,google.maps.OverlayView),this.map_=e,this.markers_=[],this.clusters_=[],this.sizes=[53,56,66,78,90],this.styles_=[],this.ready_=!1;var s=r||{};this.gridSize_=s.gridSize||60,this.minClusterSize_=s.minimumClusterSize||2,this.maxZoom_=s.maxZoom||null,this.styles_=s.styles||[],this.imagePath_=s.imagePath||this.MARKER_CLUSTER_IMAGE_PATH_,this.imageExtension_=s.imageExtension||this.MARKER_CLUSTER_IMAGE_EXTENSION_,this.zoomOnClick_=!0,void 0!=s.zoomOnClick&&(this.zoomOnClick_=s.zoomOnClick),this.averageCenter_=!1,void 0!=s.averageCenter&&(this.averageCenter_=s.averageCenter),this.setupStyles_(),this.setMap(e),this.prevZoom_=this.map_.getZoom();var o=this;google.maps.event.addListener(this.map_,"zoom_changed",function(){var e=o.map_.getZoom(),t=o.map_.minZoom||0,r=Math.min(o.map_.maxZoom||100,o.map_.mapTypes[o.map_.getMapTypeId()].maxZoom);e=Math.min(Math.max(e,t),r),o.prevZoom_!=e&&(o.prevZoom_=e,o.resetViewport())}),google.maps.event.addListener(this.map_,"idle",function(){o.redraw()}),t&&(t.length||Object.keys(t).length)&&this.addMarkers(t,!1)}function Cluster(e){this.markerClusterer_=e,this.map_=e.getMap(),this.gridSize_=e.getGridSize(),this.minClusterSize_=e.getMinClusterSize(),this.averageCenter_=e.isAverageCenter(),this.center_=null,this.markers_=[],this.bounds_=null,this.clusterIcon_=new ClusterIcon(this,e.getStyles(),e.getGridSize())}function ClusterIcon(e,t,r){e.getMarkerClusterer().extend(ClusterIcon,google.maps.OverlayView),this.styles_=t,this.padding_=r||0,this.cluster_=e,this.center_=null,this.map_=e.getMap(),this.div_=null,this.sums_=null,this.visible_=!1,this.setMap(this.map_)}MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_="../images/m",MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_="png",MarkerClusterer.prototype.extend=function(e,t){return function(e){for(var t in e.prototype)this.prototype[t]=e.prototype[t];return this}.apply(e,[t])},MarkerClusterer.prototype.onAdd=function(){this.setReady_(!0)},MarkerClusterer.prototype.draw=function(){},MarkerClusterer.prototype.setupStyles_=function(){if(!this.styles_.length)for(var e,t=0;e=this.sizes[t];t++)this.styles_.push({url:this.imagePath_+(t+1)+"."+this.imageExtension_,height:e,width:e})},MarkerClusterer.prototype.fitMapToMarkers=function(){for(var e,t=this.getMarkers(),r=new google.maps.LatLngBounds,s=0;e=t[s];s++)r.extend(e.getPosition());this.map_.fitBounds(r)},MarkerClusterer.prototype.setStyles=function(e){this.styles_=e},MarkerClusterer.prototype.getStyles=function(){return this.styles_},MarkerClusterer.prototype.isZoomOnClick=function(){return this.zoomOnClick_},MarkerClusterer.prototype.isAverageCenter=function(){return this.averageCenter_},MarkerClusterer.prototype.getMarkers=function(){return this.markers_},MarkerClusterer.prototype.getTotalMarkers=function(){return this.markers_.length},MarkerClusterer.prototype.setMaxZoom=function(e){this.maxZoom_=e},MarkerClusterer.prototype.getMaxZoom=function(){return this.maxZoom_},MarkerClusterer.prototype.calculator_=function(e,t){for(var r=0,s=e.length,o=s;0!==o;)o=parseInt(o/10,10),r++;return r=Math.min(r,t),{text:s,index:r}},MarkerClusterer.prototype.setCalculator=function(e){this.calculator_=e},MarkerClusterer.prototype.getCalculator=function(){return this.calculator_},MarkerClusterer.prototype.addMarkers=function(e,t){if(e.length)for(var r,s=0;r=e[s];s++)this.pushMarkerTo_(r);else if(Object.keys(e).length)for(var r in e)this.pushMarkerTo_(e[r]);t||this.redraw()},MarkerClusterer.prototype.pushMarkerTo_=function(e){if(e.isAdded=!1,e.draggable){var t=this;google.maps.event.addListener(e,"dragend",function(){e.isAdded=!1,t.repaint()})}this.markers_.push(e)},MarkerClusterer.prototype.addMarker=function(e,t){this.pushMarkerTo_(e),t||this.redraw()},MarkerClusterer.prototype.removeMarker_=function(e){var t=-1;if(this.markers_.indexOf)t=this.markers_.indexOf(e);else for(var r,s=0;r=this.markers_[s];s++)if(r==e){t=s;break}return t!=-1&&(e.setMap(null),this.markers_.splice(t,1),!0)},MarkerClusterer.prototype.removeMarker=function(e,t){var r=this.removeMarker_(e);return!(t||!r)&&(this.resetViewport(),this.redraw(),!0)},MarkerClusterer.prototype.removeMarkers=function(e,t){for(var r,s=e===this.getMarkers()?e.slice():e,o=!1,i=0;r=s[i];i++){var a=this.removeMarker_(r);o=o||a}if(!t&&o)return this.resetViewport(),this.redraw(),!0},MarkerClusterer.prototype.setReady_=function(e){this.ready_||(this.ready_=e,this.createClusters_())},MarkerClusterer.prototype.getTotalClusters=function(){return this.clusters_.length},MarkerClusterer.prototype.getMap=function(){return this.map_},MarkerClusterer.prototype.setMap=function(e){this.map_=e},MarkerClusterer.prototype.getGridSize=function(){return this.gridSize_},MarkerClusterer.prototype.setGridSize=function(e){this.gridSize_=e},MarkerClusterer.prototype.getMinClusterSize=function(){return this.minClusterSize_},MarkerClusterer.prototype.setMinClusterSize=function(e){this.minClusterSize_=e},MarkerClusterer.prototype.getExtendedBounds=function(e){var t=this.getProjection(),r=new google.maps.LatLng(e.getNorthEast().lat(),e.getNorthEast().lng()),s=new google.maps.LatLng(e.getSouthWest().lat(),e.getSouthWest().lng()),o=t.fromLatLngToDivPixel(r);o.x+=this.gridSize_,o.y-=this.gridSize_;var i=t.fromLatLngToDivPixel(s);i.x-=this.gridSize_,i.y+=this.gridSize_;var a=t.fromDivPixelToLatLng(o),n=t.fromDivPixelToLatLng(i);return e.extend(a),e.extend(n),e},MarkerClusterer.prototype.isMarkerInBounds_=function(e,t){return t.contains(e.getPosition())},MarkerClusterer.prototype.clearMarkers=function(){this.resetViewport(!0),this.markers_=[]},MarkerClusterer.prototype.resetViewport=function(e){for(var t,r=0;t=this.clusters_[r];r++)t.remove();for(var s,r=0;s=this.markers_[r];r++)s.isAdded=!1,e&&s.setMap(null);this.clusters_=[]},MarkerClusterer.prototype.repaint=function(){var e=this.clusters_.slice();this.clusters_.length=0,this.resetViewport(),this.redraw(),window.setTimeout(function(){for(var t,r=0;t=e[r];r++)t.remove()},0)},MarkerClusterer.prototype.redraw=function(){this.createClusters_()},MarkerClusterer.prototype.distanceBetweenPoints_=function(e,t){if(!e||!t)return 0;var r=6371,s=(t.lat()-e.lat())*Math.PI/180,o=(t.lng()-e.lng())*Math.PI/180,i=Math.sin(s/2)*Math.sin(s/2)+Math.cos(e.lat()*Math.PI/180)*Math.cos(t.lat()*Math.PI/180)*Math.sin(o/2)*Math.sin(o/2),a=2*Math.atan2(Math.sqrt(i),Math.sqrt(1-i)),n=r*a;return n},MarkerClusterer.prototype.addToClosestCluster_=function(e){for(var t,r=4e4,s=null,o=(e.getPosition(),0);t=this.clusters_[o];o++){var i=t.getCenter();if(i){var a=this.distanceBetweenPoints_(i,e.getPosition());a<r&&(r=a,s=t)}}if(s&&s.isMarkerInClusterBounds(e))s.addMarker(e);else{var t=new Cluster(this);t.addMarker(e),this.clusters_.push(t)}},MarkerClusterer.prototype.createClusters_=function(){if(this.ready_)for(var e,t=new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),this.map_.getBounds().getNorthEast()),r=this.getExtendedBounds(t),s=0;e=this.markers_[s];s++)!e.isAdded&&this.isMarkerInBounds_(e,r)&&this.addToClosestCluster_(e)},Cluster.prototype.isMarkerAlreadyAdded=function(e){if(this.markers_.indexOf)return this.markers_.indexOf(e)!=-1;for(var t,r=0;t=this.markers_[r];r++)if(t==e)return!0;return!1},Cluster.prototype.addMarker=function(e){if(this.isMarkerAlreadyAdded(e))return!1;if(this.center_){if(this.averageCenter_){var t=this.markers_.length+1,r=(this.center_.lat()*(t-1)+e.getPosition().lat())/t,s=(this.center_.lng()*(t-1)+e.getPosition().lng())/t;this.center_=new google.maps.LatLng(r,s),this.calculateBounds_()}}else this.center_=e.getPosition(),this.calculateBounds_();e.isAdded=!0,this.markers_.push(e);var o=this.markers_.length;if(o<this.minClusterSize_&&e.getMap()!=this.map_&&e.setMap(this.map_),o==this.minClusterSize_)for(var i=0;i<o;i++)this.markers_[i].setMap(null);return o>=this.minClusterSize_&&e.setMap(null),this.updateIcon(),!0},Cluster.prototype.getMarkerClusterer=function(){return this.markerClusterer_},Cluster.prototype.getBounds=function(){for(var e,t=new google.maps.LatLngBounds(this.center_,this.center_),r=this.getMarkers(),s=0;e=r[s];s++)t.extend(e.getPosition());return t},Cluster.prototype.remove=function(){this.clusterIcon_.remove(),this.markers_.length=0,delete this.markers_},Cluster.prototype.getSize=function(){return this.markers_.length},Cluster.prototype.getMarkers=function(){return this.markers_},Cluster.prototype.getCenter=function(){return this.center_},Cluster.prototype.calculateBounds_=function(){var e=new google.maps.LatLngBounds(this.center_,this.center_);this.bounds_=this.markerClusterer_.getExtendedBounds(e)},Cluster.prototype.isMarkerInClusterBounds=function(e){return this.bounds_.contains(e.getPosition())},Cluster.prototype.getMap=function(){return this.map_},Cluster.prototype.updateIcon=function(){var e=this.map_.getZoom(),t=this.markerClusterer_.getMaxZoom();if(t&&e>t)for(var r,s=0;r=this.markers_[s];s++)r.setMap(this.map_);else{if(this.markers_.length<this.minClusterSize_)return void this.clusterIcon_.hide();var o=this.markerClusterer_.getStyles().length,i=this.markerClusterer_.getCalculator()(this.markers_,o);this.clusterIcon_.setCenter(this.center_),this.clusterIcon_.setSums(i),this.clusterIcon_.show()}},ClusterIcon.prototype.triggerClusterClick=function(){var e=this.cluster_.getMarkerClusterer();google.maps.event.trigger(e.map_,"clusterclick",this.cluster_),e.isZoomOnClick()&&this.map_.fitBounds(this.cluster_.getBounds())},ClusterIcon.prototype.onAdd=function(){if(this.div_=document.createElement("DIV"),this.visible_){var e=this.getPosFromLatLng_(this.center_);this.div_.style.cssText=this.createCss(e),this.div_.innerHTML=this.sums_.text}var t=this.getPanes();t.overlayMouseTarget.appendChild(this.div_);var r=this;google.maps.event.addDomListener(this.div_,"click",function(){r.triggerClusterClick()})},ClusterIcon.prototype.getPosFromLatLng_=function(e){var t=this.getProjection().fromLatLngToDivPixel(e);return t.x-=parseInt(this.width_/2,10),t.y-=parseInt(this.height_/2,10),t},ClusterIcon.prototype.draw=function(){if(this.visible_){var e=this.getPosFromLatLng_(this.center_);this.div_.style.top=e.y+"px",this.div_.style.left=e.x+"px"}},ClusterIcon.prototype.hide=function(){this.div_&&(this.div_.style.display="none"),this.visible_=!1},ClusterIcon.prototype.show=function(){if(this.div_){var e=this.getPosFromLatLng_(this.center_);this.div_.style.cssText=this.createCss(e),this.div_.style.display=""}this.visible_=!0},ClusterIcon.prototype.remove=function(){this.setMap(null)},ClusterIcon.prototype.onRemove=function(){this.div_&&this.div_.parentNode&&(this.hide(),this.div_.parentNode.removeChild(this.div_),this.div_=null)},ClusterIcon.prototype.setSums=function(e){this.sums_=e,this.text_=e.text,this.index_=e.index,this.div_&&(this.div_.innerHTML=e.text),this.useStyle()},ClusterIcon.prototype.useStyle=function(){var e=Math.max(0,this.sums_.index-1);e=Math.min(this.styles_.length-1,e);var t=this.styles_[e];this.url_=t.url,this.height_=t.height,this.width_=t.width,this.textColor_=t.textColor,this.anchor_=t.anchor,this.textSize_=t.textSize,this.backgroundPosition_=t.backgroundPosition},ClusterIcon.prototype.setCenter=function(e){this.center_=e},ClusterIcon.prototype.createCss=function(e){var t=[];t.push("background-image:url("+this.url_+");");var r=this.backgroundPosition_?this.backgroundPosition_:"0 0";t.push("background-position:"+r+";"),"object"==typeof this.anchor_?("number"==typeof this.anchor_[0]&&this.anchor_[0]>0&&this.anchor_[0]<this.height_?t.push("height:"+(this.height_-this.anchor_[0])+"px; padding-top:"+this.anchor_[0]+"px;"):t.push("height:"+this.height_+"px; line-height:"+this.height_+"px;"),"number"==typeof this.anchor_[1]&&this.anchor_[1]>0&&this.anchor_[1]<this.width_?t.push("width:"+(this.width_-this.anchor_[1])+"px; padding-left:"+this.anchor_[1]+"px;"):t.push("width:"+this.width_+"px; text-align:center;")):t.push("height:"+this.height_+"px; line-height:"+this.height_+"px; width:"+this.width_+"px; text-align:center;");var s=this.textColor_?this.textColor_:"black",o=this.textSize_?this.textSize_:11;return t.push("cursor:pointer; top:"+e.y+"px; left:"+e.x+"px; color:"+s+"; position:absolute; font-size:"+o+"px; font-family:Arial,sans-serif; font-weight:bold"),t.join("")},window.MarkerClusterer=MarkerClusterer,MarkerClusterer.prototype.addMarker=MarkerClusterer.prototype.addMarker,MarkerClusterer.prototype.addMarkers=MarkerClusterer.prototype.addMarkers,MarkerClusterer.prototype.clearMarkers=MarkerClusterer.prototype.clearMarkers,MarkerClusterer.prototype.fitMapToMarkers=MarkerClusterer.prototype.fitMapToMarkers,MarkerClusterer.prototype.getCalculator=MarkerClusterer.prototype.getCalculator,MarkerClusterer.prototype.getGridSize=MarkerClusterer.prototype.getGridSize,MarkerClusterer.prototype.getExtendedBounds=MarkerClusterer.prototype.getExtendedBounds,MarkerClusterer.prototype.getMap=MarkerClusterer.prototype.getMap,MarkerClusterer.prototype.getMarkers=MarkerClusterer.prototype.getMarkers,MarkerClusterer.prototype.getMaxZoom=MarkerClusterer.prototype.getMaxZoom,MarkerClusterer.prototype.getStyles=MarkerClusterer.prototype.getStyles,MarkerClusterer.prototype.getTotalClusters=MarkerClusterer.prototype.getTotalClusters,MarkerClusterer.prototype.getTotalMarkers=MarkerClusterer.prototype.getTotalMarkers,MarkerClusterer.prototype.redraw=MarkerClusterer.prototype.redraw,MarkerClusterer.prototype.removeMarker=MarkerClusterer.prototype.removeMarker,MarkerClusterer.prototype.removeMarkers=MarkerClusterer.prototype.removeMarkers,MarkerClusterer.prototype.resetViewport=MarkerClusterer.prototype.resetViewport,MarkerClusterer.prototype.repaint=MarkerClusterer.prototype.repaint,MarkerClusterer.prototype.setCalculator=MarkerClusterer.prototype.setCalculator,MarkerClusterer.prototype.setGridSize=MarkerClusterer.prototype.setGridSize,MarkerClusterer.prototype.setMaxZoom=MarkerClusterer.prototype.setMaxZoom,MarkerClusterer.prototype.onAdd=MarkerClusterer.prototype.onAdd,MarkerClusterer.prototype.draw=MarkerClusterer.prototype.draw,Cluster.prototype.getCenter=Cluster.prototype.getCenter,Cluster.prototype.getSize=Cluster.prototype.getSize,Cluster.prototype.getMarkers=Cluster.prototype.getMarkers,ClusterIcon.prototype.onAdd=ClusterIcon.prototype.onAdd,ClusterIcon.prototype.draw=ClusterIcon.prototype.draw,ClusterIcon.prototype.onRemove=ClusterIcon.prototype.onRemove,Object.keys=Object.keys||function(e){var t=[];for(var r in e)e.hasOwnProperty(r)&&t.push(r);return t},dmx.Component("google-maps",{initialData:{zoom:10,maptype:"roadmap",latitude:null,longitude:null},attributes:{width:{type:[String,Number],default:"100%"},height:{type:[String,Number],default:400},latitude:{type:Number,default:null},longitude:{type:Number,default:null},address:{type:String,default:null},zoom:{type:Number,default:10},maptype:{type:String,default:"roadmap"},scrollwheel:{type:Boolean,default:!1},tilt:{type:Boolean,default:!1},"rotate-control":{type:Boolean,default:!1},"scale-control":{type:Boolean,default:!1},"fullscreen-control":{type:Boolean,default:!1},"zoom-control":{type:Boolean,default:!1},"streetview-control":{type:Boolean,default:!1},"maptype-control":{type:Boolean,default:!1},"enable-clusters":{type:Boolean,default:!1},"traffic-layer":{type:Boolean,default:!1},"transit-layer":{type:Boolean,default:!1},"bicycling-layer":{type:Boolean,default:!1},markers:{type:Array,default:null},"marker-id":{type:String,default:"id"},"marker-latitude":{type:String,default:"latitude"},"marker-longitude":{type:String,default:"longitude"},"marker-address":{type:String,default:"address"},"marker-label":{type:String,default:"label"},"marker-title":{type:String,default:"title"},"marker-info":{type:String,default:"info"},"marker-type":{type:String,default:"type"},"marker-image":{type:String,default:"type"},"marker-animation":{type:String,default:"animation"},"marker-draggable":{type:String,default:"draggable"}},methods:{addMarker:function(e){var t=this.addMarker(e);this.cluster&&this.props["enable-clusters"]?this.cluster.addMarker(t):t.setMap(this.map)},goToMarker:function(e){var t=this.findMarker(e);t&&this.map.setCenter(t.position)},panToMarker:function(e){var t=this.findMarker(e);t&&this.map.panTo(t.position)},bounceMarker:function(e){var t=this.findMarker(e);t&&t.setAnimation(1)},fitBoundsToMarkers:function(){if(this.markers.length){for(var e=new google.maps.LatLngBounds,t=0;t<this.markers.length;t++)e.extend(this.markers[t].getPosition());this.map.fitBounds(e)}},stopBounce:function(e){var t=this.findMarker(e);t&&t.setAnimation(null)},showInfo:function(e){var t=this.findMarker(e);t&&t.infoWindow&&t.infoWindow.open(this.map,t)},removeAllMarkers:function(){this.removeAllMarkers()},panTo:function(e,t){this.map.panTo({lat:e,lng:t})},setCenter:function(e,t){this.map.setCenter({lat:e,lng:t})},setMapType:function(e){this.map.setMapTypeId(e)},setZoom:function(e){this.map.setZoom(e)},refresh:function(){google.maps.event.trigger(this.map,"resize")}},events:{ready:Event,boundschanged:Event,centerchanged:Event,maptypechanged:Event,zoomchanged:Event},render:function(e){this.$parse(),e.style.display="block",e.style.width=this.getSize(this.props.width),e.style.height=this.getSize(this.props.height),this.geocodeCache=JSON.parse(localStorage.geocodeCache||"{}"),this.geocoder=new google.maps.Geocoder,this.markers=[],this.getMarkerTypes(),this.map=new google.maps.Map(e,{zoom:+this.props.zoom,center:{lat:+this.props.latitude,lng:+this.props.longitude},mapTypeId:this.props.maptype,scrollwheel:this.props.scrollwheel,scaleControl:this.props["scale-control"],zoomControl:this.props["zoom-control"],panControl:this.props["pan-control"],streetViewControl:this.props["streetview-control"],mapTypeControl:this.props["maptype-control"],rotateControl:this.props["rotate-control"],fullscreenControl:this.props["fullscreen-control"]}),this.set("latitude",+this.props.latitude),this.set("longitude",+this.props.longitude),this.set("maptype",this.map.getMapTypeId()),this.set("zoom",this.map.getZoom()),this.map.addListener("bounds_changed",dmx.debounce(this.onBoundsChanged.bind(this),100)),this.map.addListener("center_changed",dmx.debounce(this.onCenterChanged.bind(this),100)),this.map.addListener("maptypeid_changed",dmx.debounce(this.onMaptypeChanged.bind(this),100)),this.map.addListener("zoom_changed",dmx.debounce(this.onZoomChanged.bind(this),100)),setTimeout(this.dispatchEvent.bind(this,"ready"),100),window.googleMapsTheme&&this.map.setOptions({styles:window.googleMapsTheme}),this.props.tilt&&this.map.setTilt(45),this.getMarkers(),this.props["enable-clusters"]&&(this.cluster=new MarkerClusterer(this.map,this.markers,{imagePath:this.getImageFolder()})),this.props.latitude&&this.props.longitude||!this.props.address||this.geocode(this.props.address),this.props["traffic-layer"]&&(this.trafficLayer=new google.maps.TrafficLayer,this.trafficLayer.setMap(this.map)),this.props["transit-layer"]&&(this.transitLayer=new google.maps.TransitLayer,this.transitLayer.setMap(this.map)),this.props["bicycling-layer"]&&(this.bikeLayer=new google.maps.BicyclingLayer,this.bikeLayer.setMap(this.map))},update:function(e){this.props.latitude==e.latitude&&this.props.longitude==e.longitude||this.map.setCenter({lat:+this.props.latitude,lng:+this.props.longitude}),this.props.address&&this.props.address!=e.address&&this.geocode(this.props.address),this.props.zoom!=e.zoom&&this.map.setZoom(+this.props.zoom),this.props.maptype!=e.maptype&&this.map.setMapTypeId(this.props.maptype),this.props.tilt!=e.tilt&&this.map.setTilt(this.props.tilt?45:0),JSON.stringify(this.props.markers)!=JSON.stringify(e.markers)&&(this.removeAllMarkers(),Array.isArray(this.props.markers)&&(this.props.markers.forEach(function(e){var t=new dmx.DataScope(e);this.addMarker({id:dmx.parse(this.props["marker-id"],t),latitude:+dmx.parse(this.props["marker-latitude"],t),longitude:+dmx.parse(this.props["marker-longitude"],t),address:dmx.parse(this.props["marker-address"],t),label:dmx.parse(this.props["marker-label"],t),title:dmx.parse(this.props["marker-title"],t),info:dmx.parse(this.props["marker-info"],t),type:dmx.parse(this.props["marker-type"],t),image:dmx.parse(this.props["marker-image"],t),animation:dmx.parse(this.props["marker-animation"],t),draggable:!!dmx.parse(this.props["marker-draggable"],t)})},this),this.props["enable-clusters"]&&(this.cluster=new MarkerClusterer(this.map,this.markers,{imagePath:this.getImageFolder()})))),JSON.stringify(this.props)!=JSON.stringify(e)&&this.map.setOptions({scrollwheel:this.props.scrollwheel,scaleControl:this.props["scale-control"],zoomControl:this.props["zoom-control"],panControl:this.props["pan-control"],streetViewControl:this.props["streetview-control"],mapTypeControl:this.props["maptype-control"],rotateControl:this.props["rotate-control"],fullscreenControl:this.props["fullscreen-control"]}),this.props["traffic-layer"]!=e["traffic-layer"]&&(this.trafficLayer=this.trafficLayer||new google.maps.TrafficLayer,this.trafficLayer.setMap(this.props["traffic-layer"]?this.map:null)),this.props["transit-layer"]!=e["transit-layer"]&&(this.transitLayer=this.transitLayer||new google.maps.TransitLayer,this.transitLayer.setMap(this.props["transit-layer"]?this.map:null)),this.props["bicycling-layer"]!=e["bicycling-layer"]&&(this.bikeLayer=this.bikeLayer||new google.maps.BicyclingLayer,this.bikeLayer.setMap(this.props["bicycling-layer"]?this.map:null))},onBoundsChanged:function(){this.dispatchEvent("boundschanged")},onCenterChanged:function(){var e=this.map.getCenter();this.set("latitude",e.lat()),this.set("longitude",e.lng()),this.dispatchEvent("centerchanged")},onMaptypeChanged:function(){this.set("maptype",this.map.getMapTypeId()),this.dispatchEvent("maptypechanged")},onZoomChanged:function(){this.set("zoom",this.map.getZoom()),this.dispatchEvent("zoomchanged")},geocode:function(e){e&&(this.geocodeCache[e]?this.map.setCenter(this.geocodeCache[e]):this.geocoder.geocode({address:this.props.address},function(t,r){"OK"==r?(this.geocodeCache[e]=t[0].geometry.location,this.map.setCenter(this.geocodeCache[e]),localStorage.geocodeCache=JSON.stringify(this.geocodeCache)):console.warn("Geocode was not successful for the following reason: "+r)}.bind(this)))},getSize:function(e){return"string"==typeof e&&"%"==e.slice(-1)?e:parseInt(e,10)+"px"},getImageFolder:function(){var e=document.querySelector('script[src$="dmxGoogleMaps.js"]');return e&&e.src?e.src.replace(/dmxGoogleMaps.js$/,"images/m"):"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"},getMarkerAnimation:function(e){switch(e.toLowerCase()){case"bounce":return 1;case"drop":return 2}return null},findMarker:function(e){return this.markers.find(function(t){return t.id==e})},getMarkers:function(e){for(var t=0;t<this.children.length;t++){var r=this.children[t];r instanceof dmx.Component("google-maps-marker")&&(r.marker=this.addMarker({id:r.name,latitude:+r.props.latitude,longitude:+r.props.longitude,address:r.props.address,label:r.props.label,title:r.props.title,info:r.props.info,type:r.props.type,image:r.props.image,animation:r.props.animation,draggable:!!r.props.draggable}))}},addMarker:function(e){var t=new google.maps.Marker({position:{lat:e.latitude,lng:e.longitude},label:e.label,title:e.title,icon:this.markerTypes[e.type],draggable:e.draggable});return e.id&&(t.id=e.id),e.image&&t.setIcon(e.image),e.info&&(t.infoWindow=new google.maps.InfoWindow({content:e.info}),t.addListener("click",function(){t.infoWindow.open(this.map,t)})),e.animation&&t.setAnimation(this.getMarkerAnimation(e.animation)),e.latitude&&e.longitude||(e.address?this.geocodeCache[e.address]?t.setPosition(this.geocodeCache[e.address]):this.geocoder.geocode({address:e.address},function(r,s){"OK"==s?(this.geocodeCache[e.address]=r[0].geometry.location,t.setPosition(this.geocodeCache[e.address]),t.setVisible(!0),localStorage.geocodeCache=JSON.stringify(this.geocodeCache)):console.warn("Geocode was not successful for the following reason: "+s)}.bind(this)):t.setVisible(!1)),this.map&&!this.props["enable-clusters"]&&t.setMap(this.map),this.markers.push(t),t},removeAllMarkers:function(){this.cluster&&this.cluster.clearMarkers(),this.markers.forEach(function(e){e.setMap(null)}),this.markers=[]},getMarkerTypes:function(){var e="http://maps.google.com/mapfiles/",t="http://maps.google.com/intl/en_us/mapfiles/ms/micons/";this.markerTypes={black:e+"marker_black.png",grey:e+"marker_grey.png",orange:e+"marker_orange.png",white:e+"marker_white.png",yellow:e+"marker_yellow.png",purple:e+"marker_purple.png",green:e+"marker_green.png",start:e+"dd-start.png",end:e+"dd-end.png",arrow:e+"arrow.png",tree:t+"tree.png",lodging:t+"lodging.png",bar:t+"bar.png",restaurant:t+"restaurant.png",horsebackriding:t+"horsebackriding.png",convienancestore:t+"convienancestore.png",hiker:t+"hiker.png",swimming:t+"swimming.png",fishing:t+"fishing.png",golfer:t+"golfer.png",sportvenue:t+"sportvenue.png"}}}),dmx.Component("google-maps-marker",{attributes:{latitude:{type:Number,default:null},longitude:{type:Number,default:null},address:{type:String,default:null},label:{type:String,default:null},title:{type:String,default:null},info:{type:String,default:null},type:{type:String,default:null},image:{type:String,default:null},animation:{type:String,default:null},draggable:{type:Boolean,default:!1}},update:function(e){this.props.latitude==e.latitude&&this.props.longitude==e.longitude||(this.marker.setPosition({lat:+this.props.latitude,lng:+this.props.longitude}),this.marker.setVisible(!0)),this.props.address!=e.address&&(this.parent.geocodeCache[this.props.address]?this.marker.setPosition(this.parent.geocodeCache[this.props.address]):this.parent.geocoder.geocode({address:this.props.address},function(e,t){"OK"==t?(this.parent.geocodeCache[this.props.address]=e[0].geometry.location,this.marker.setPosition(this.parent.geocodeCache[this.props.address]),this.marker.setVisible(!0),localStorage.geocodeCache=JSON.stringify(this.parent.geocodeCache)):console.warn("Geocode was not successful for the following reason: "+t)}.bind(this))),this.props.label!=e.label&&this.marker.setLabel(this.props.label),this.props.title!=e.title&&this.marker.setTitle(this.props.title),this.props.info!=e.info&&(this.marker.infoWindow=new google.maps.infoWindow({content:this.props.info})),this.props.type!=e.type&&this.setIcon(this.parent.markerTypes[this.props.type]),this.props.image!=e.image&&this.setIcon(this.props.image),this.props.animation!=e.animation&&this.marker.setAnimation(this.parent.getMarkerAnimation(this.props.animation)),this.props.draggable!=e.draggable&&this.marker.setDraggable(this.props.draggable)}});
//# sourceMappingURL=../maps/dmxGoogleMaps.js.map
