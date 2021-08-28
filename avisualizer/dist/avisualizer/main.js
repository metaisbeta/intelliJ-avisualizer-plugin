(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Sergio\Documents\Projetos\TCC\intelliJ-avisualizer-plugin\avisualizer\src\main.ts */"zUnb");


/***/ }),

/***/ "76FL":
/*!**************************************!*\
  !*** ./src/app/utils/HeaderUtils.ts ***!
  \**************************************/
/*! exports provided: HeaderUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderUtils", function() { return HeaderUtils; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class HeaderUtils {
    static setSystemViewHeader(root) {
        HeaderUtils.packageInfoUpdate('');
        HeaderUtils.classInfoUpdate('');
        HeaderUtils.elementInfoUpdate('');
        HeaderUtils.viewInfoUpdate('System');
        let title = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#header').attr('view') + ' View' + ': Project ' + String(root) + '/';
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#header').select('h2').text(title);
    }
    static setPackageViewHeader(view, pacote, root) {
        HeaderUtils.packageInfoUpdate(pacote);
        HeaderUtils.viewInfoUpdate(view);
        let title = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#header').attr('view') + ' View' + ': Project ' + String(root) + '/' + d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#header').attr('package') + '/';
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#header').select('h2').text(title);
    }
    static setClassViewHeader(view, classe, pacote, root) {
        HeaderUtils.classInfoUpdate(classe);
        HeaderUtils.viewInfoUpdate(view);
        HeaderUtils.packageInfoUpdate(pacote);
        let title = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#header').attr('view') + ' View' + ': Project ' + String(root) + '/' + d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#header').attr('package') + '/' + d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#header').attr('class') + '/';
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#header').select('h2').text(title);
    }
    static viewInfoUpdate(view) {
        // tslint:disable-next-line:indent
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#header').attr('view', view);
    }
    static packageInfoUpdate(pacote) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#header').attr('package', pacote);
    }
    static classInfoUpdate(classe) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#header').attr('class', classe);
    }
    static elementInfoUpdate(element) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#header').attr('element', element);
    }
    static headerUpdate(viewName, elementInfo) {
        let annotMetric = 'Annotation Metric: ';
        console.log(viewName);
        if (viewName === 'System View') {
            annotMetric = annotMetric.concat('Number of Annotations');
        }
        else if (viewName === 'Package View') {
            annotMetric = annotMetric.concat('LOC in Annotation Declaration (LOCAD)');
        }
        else {
            annotMetric = annotMetric.concat('Arguments in Annotations (AA)');
        }
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#viewName').text(viewName);
        var color = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#elementInfo').style("fill");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#elementInfo').text(elementInfo);
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#elementInfo').
            transition().duration(100).style('fill', 'white')
            //.transition().duration(100).style('fill',d3.color(color).formatHex());
            .transition().duration(100).style('fill', d3__WEBPACK_IMPORTED_MODULE_0__["color"](color).formatHex());
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#annotMetric').text(annotMetric);
    }
    static metricInfoUpdate(metric) {
        if (metric == "aa") {
            var metricName = "Annotation Metric: Arguments in Annotation (AA)";
        }
        else if (metric == "locad") {
            var metricName = "Annotation Metric: LOC in Annotation Declaration (LOCAD)";
        }
        else {
            var metricName = "Annotation Metric: Annotation Nesting Level (ANL)";
        }
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#annotMetric').text(metricName);
    }
    static setProjectName(projectName) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#projectUnderAnalysis').text('Project Under Analysis: ' + projectName);
    }
}


/***/ }),

/***/ "7UeH":
/*!******************************************************!*\
  !*** ./src/app/system-view/system-view.component.ts ***!
  \******************************************************/
/*! exports provided: SystemViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemViewComponent", function() { return SystemViewComponent; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _utils_AnnotationSchemas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/AnnotationSchemas */ "S3CC");
/* harmony import */ var _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/CircleUtils */ "e/6K");
/* harmony import */ var _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/SVGUtils */ "tOky");
/* harmony import */ var _utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/ZoomUtils */ "N8JQ");
/* harmony import */ var _utils_NavUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/NavUtils */ "Vixg");
/* harmony import */ var _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/HeaderUtils */ "76FL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");








class SystemViewComponent {
    constructor() {
        this.width = 960;
        this.height = 960;
        this.zoomProp = {};
        this.node = null;
        this.root = null;
    }
    ngOnInit() {
        // read data from JSON
        d3__WEBPACK_IMPORTED_MODULE_0__["json"]('./assets/SpaceWeatherTSI-SV.json').then(data => this.readPackageView(data))
            .catch(error => console.log(error));
        //  d3.json('./assets/guj/Guj-SV.json').then(data => this.readPackageView(data as any[]))
        //   .catch(error => console.log(error));
        //d3.json('./assets/geostore/Geostore-SV.json').then(data => this.readPackageView(data as any[]))
        //  .catch(error => console.log(error));
        //d3.json("./assets/shopizer/Shopizer-SV.json").then(data => this.readPackageView(data as any[]))
        //  .c atch(error => console.log(error));
    }
    readPackageView(data) {
        this.root = d3__WEBPACK_IMPORTED_MODULE_0__["hierarchy"](data);
        this.root.sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        const pack = d3__WEBPACK_IMPORTED_MODULE_0__["pack"]()
            .size([this.width - 2, this.height - 10])
            .padding(3);
        pack(this.root);
        this.zoomProp.focus = this.root;
        // Fetch Annotations Schemas
        const anot = new _utils_AnnotationSchemas__WEBPACK_IMPORTED_MODULE_1__["AnnotationSchemas"](this.root, 'locad');
        this.schemasMap = anot.getSchemasColorMap();
        const colorsMap = anot.getSchemasColorMap();
        // Create the SVG
        //console.log(this.root.descendants()[1].data.name)
        this.svg = _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].createSvg('.svg-container-sv', this.width, this.height, 'sistema');
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.svg-container-sv').attr('lastSelected', String(this.root.descendants()[1].data.name));
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.svg-container-sv').attr('rootName', this.root.children[0].data.name);
        // Create the nodes
        this.node = _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].createNode(this.svg, this.root);
        // Initial Zoom
        _utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__["ZoomUtils"].zoomTo([this.root.x, this.root.y, this.root.r * 2], this.svg, this.zoomProp, this.node);
        //Initial header setup
        _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_6__["HeaderUtils"].setSystemViewHeader(this.root.data.name);
        _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_6__["HeaderUtils"].headerUpdate('System View', 'Package: ' + this.root.children[0].data.name);
        _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_6__["HeaderUtils"].setProjectName(this.root.data.name);
        // Color all circles
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.svg-container-sv').selectAll('circle').attr('stroke', d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].addCircleStroke(d))
            .attr('stroke-dasharray', d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].addCircleDashArray(d))
            .attr('fill', d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].colorCircles(d, this.schemasMap));
        // Apply zoom to all circles in this specific view
        this.svg.selectAll('circle')
            .on('click', (event, d) => {
            d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#packagesList').selectAll('option').each(function (e, i) {
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('value') == d.parent.data.name && d.data.type == 'schema') {
                    return d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).property('selected', true);
                }
                else if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('value') == d.data.name) {
                    return d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).property('selected', true);
                }
            });
            if (d.data.type == 'schema') {
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_5__["NavUtils"].updateSelectBoxText("SelectViewBox", "packageView");
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].hide('.svg-container-pv', d.parent.data.name);
                _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].highlightNode('.svg-container-sv', d.parent.data.name);
                this.zoomProp.focus !== d && (_utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__["ZoomUtils"].zoom(event, d, this.zoomProp, this.svg, this.node), event.stopPropagation(), _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].setFocus(d.parent.data.name, '.svg-container-sv'));
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].showView('system-view', 'package-view');
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.svg-container-sv').attr('lastSelected')), '.svg-container-pv');
                //HeaderUtils.setPackageViewHeader('Package', d.parent.data.name, this.root.data.name);
                _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_6__["HeaderUtils"].headerUpdate('Package View', 'Package: ' + d.parent.data.name);
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].resetView('.svg-container-sv');
                //console.log(d3.select('.svg-container-sv').attr('lastSelected'));
            }
            else {
                _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].highlightNode('.svg-container-sv', d.data.name);
                this.zoomProp.focus !== d && (_utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__["ZoomUtils"].zoom(event, d, this.zoomProp, this.svg, this.node), event.stopPropagation(), _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].setFocus(d.data.name, '.svg-container-sv'));
                _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_6__["HeaderUtils"].headerUpdate('System View', 'Package: ' + d.data.name);
            }
        })
            .on('mouseover', (event, d) => {
            _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].createPopUp(d, this.svg, event);
            var name = d.data.name;
            //console.log(d.data)
            d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").selectAll("circle").each(function (d, i) {
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name") == name) {
                    var color = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("fill");
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"]("tbody").selectAll("td").each(function (d, i) {
                        if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("class") == "td-schema" && d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name") == name) {
                            d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("color", color);
                        }
                    });
                }
            });
        })
            .on('mouseout', (event, d) => {
            _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].destroyPopUp(this.svg);
            var name = d.data.name;
            d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").selectAll("circle").each(function (d, i) {
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name") == name) {
                    var color = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("fill");
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"]("tbody").selectAll("td").each(function (d, i) {
                        if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("class") == "td-schema" && d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name") == name) {
                            d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("color", "black");
                        }
                    });
                }
            });
        })
            .on('mousemove', (event, d) => _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].movePopUp(d, this.svg, event))
            .on('contextmenu', (event, d) => {
            event.preventDefault();
        });
        //       NavUtils.createSelectBox("packages","packagesList","Select Package","select package","Package List",80,400,".svg-container-sv");
        // NavUtils.createSelectBox("classes","classList","Select Class","select class","Class List",200,400,".svg-container-pv");
        // NavUtils.createSelectBox("interfaces","interfaceList","Select Interface","select interface","Interface List",320,400,".svg-container-pv");
        // NavUtils.createSelectBox("methods","methodList","Select Method","select method","Method List",440,400,".svg-container-cv");
        // NavUtils.createSelectBox("fields","fieldList","Select Field","select field","Field List",560,400,".svg-container-cv");
        //
        //
    }
}
SystemViewComponent.ɵfac = function SystemViewComponent_Factory(t) { return new (t || SystemViewComponent)(); };
SystemViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: SystemViewComponent, selectors: [["system-view"]], decls: 1, vars: 0, consts: [[1, "svg-container-sv"]], template: function SystemViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "div", 0);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzeXN0ZW0tdmlldy5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "N8JQ":
/*!************************************!*\
  !*** ./src/app/utils/ZoomUtils.ts ***!
  \************************************/
/*! exports provided: ZoomUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomUtils", function() { return ZoomUtils; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class ZoomUtils {
    static zoom(event, d, zoomProp, svg, node) {
        if ((d.data.type == "annotation" || d.data.type == "schema") || (d.data.type == "method" || d.data.type == "field"))
            return;
        zoomProp.focus = d;
        svg.transition()
            .duration(event.altKey ? 7500 : 0)
            .tween("zoom", d => {
            const i = d3__WEBPACK_IMPORTED_MODULE_0__["interpolateZoom"](zoomProp.view, [zoomProp.focus.x, zoomProp.focus.y, zoomProp.focus.r * 2]);
            return t => this.zoomTo(i(t), svg, zoomProp, node);
        });
    }
    static zoomTo(v, svg, zoomProp, node) {
        const k = svg.attr("width") / v[2];
        zoomProp.view = v;
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
    }
}


/***/ }),

/***/ "QR5Y":
/*!*************************************************!*\
  !*** ./src/app/services/avisualizer.service.ts ***!
  \*************************************************/
/*! exports provided: AvisualizerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvisualizerService", function() { return AvisualizerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");


class AvisualizerService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    getWelComeMessage() {
        return this.httpClient.get('/rest');
    }
}
AvisualizerService.ɵfac = function AvisualizerService_Factory(t) { return new (t || AvisualizerService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
AvisualizerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AvisualizerService, factory: AvisualizerService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "S3CC":
/*!********************************************!*\
  !*** ./src/app/utils/AnnotationSchemas.ts ***!
  \********************************************/
/*! exports provided: AnnotationSchemas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationSchemas", function() { return AnnotationSchemas; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "LvDl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


class AnnotationSchemas {
    //root is the root node after running d3.hierarchy
    constructor(root, name) {
        this.schemasColorMap = new Map();
        this.schemasObjectArray = [];
        //obtain a list o schemas
        const schemaSet = new Set();
        if (name == "class") {
            root.descendants().forEach(d => { if (d.data.type == "annotation") {
                schemaSet.add(d.data.properties.schema);
            } });
        }
        else {
            const schemasNode = root.descendants().filter(d => !lodash__WEBPACK_IMPORTED_MODULE_1__["isEmpty"](d.data.properties));
            //To not get repeated schemas
            schemasNode.forEach(d => schemaSet.add(d.data.properties.schema));
        }
        this.annotationsList = new Map();
        this.annotationsCount = new Map();
        var cors = ['#1f78b4', '#33a02c', '#fb9a99', '#e31a1c', '#40004b', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'];
        var corslight = ['#80b1d3', '#B9D48C', '#fccde5', '#fb8072', '#fdb462', '#ffffb3', '#9970ab', '#bc80bd', '#ffed6f', '#bebada'];
        //Sort the array with the schemas
        this.schemasOrdered = Array.from(schemaSet);
        this.schemasOrdered.sort();
        for (var s in this.schemasOrdered) {
            this.annotationsList.set(this.schemasOrdered[s], []);
        }
        root.descendants().forEach(d => {
            if (d.data.type == "annotation" && d.data.properties.schema != null) {
                var arr = this.annotationsList.get(d.data.properties.schema);
                if (!arr.includes(d.data.name)) {
                    arr.push(d.data.name);
                    this.annotationsCount.set(d.data.name, d.data.value);
                }
                else {
                    var value = this.annotationsCount.get(d.data.name);
                    value = value + 1;
                    this.annotationsCount.set(d.data.name, value);
                }
                this.annotationsList.set(d.data.properties.schema, arr);
            }
        });
        //console.log(this.annotationsCount)
        this.schemasGroups = [];
        this.schemasTotalAnnotations = new Map();
        var somatotal = new Map();
        //counting total annotations of each schema
        for (var i = 0; i < this.schemasOrdered.length; i++) {
            this.schemasTotalAnnotations.set(this.schemasOrdered[i], 0);
            somatotal.set(this.schemasOrdered[i], 0);
        }
        for (var i = 0; i < root.descendants().length; i++) {
            if (root.descendants()[i].data.type == "annotation") {
                var total = this.schemasTotalAnnotations.get(root.descendants()[i].data.properties.schema);
                var toSum = root.descendants()[i].data.value;
                this.schemasTotalAnnotations.set(root.descendants()[i].data.properties.schema, (total + 1));
            }
        }
        //build schemas families
        var groupsMap = new Map();
        var colorsArray = [];
        var hexColors = new Map();
        this.schemasOrdered.forEach((value, i) => {
            var schema = value.split("."); // divide o nome do schema a cada "."]
            if (schema[0] == "javax") {
                if (schema[1] == "persistence" || schema[1] == "ejb")
                    var family = schema[0] + "." + schema[1];
                else
                    var family = schema[0];
                //console.log(schema[0],schema[1]);
            }
            else {
                //console.log(family);
                var family = schema[0] + "." + schema[1];
            }
            //console.log(value,family)
            if (groupsMap.has(family)) { // se já existe família; ex: org.springframework
                var elem = groupsMap.get(family); // busca o array de elementos desta família
                elem.push(value); // insere o valor ex: javax.persistence.metamodel na família javax.persistence
                groupsMap.set(family, elem);
            }
            else {
                colorsArray.push(family);
                groupsMap.set(family, [value]);
            }
        });
        var startColors = new Map();
        var endColors = new Map();
        var schemasArr = ["java.lang", "javax.persistence", "org.hibernate", "org.springframework", "org.junit", "org.mockito", "javax.ejb"];
        var startArr = ["#146FF2", "#B55DB4", "#D7A3D1", "#ff7f00", "#40004b", "#6B00B8", "#32F214"];
        var endArr = ["#146FF2", "#F9B9E8", "#D7A3D1", "#ffffb3", "#3E05A8", "#C77EFB", "#32F214"];
        for (var i = 0; i < schemasArr.length; i++) {
            startColors.set(schemasArr[i], startArr[i]);
            endColors.set(schemasArr[i], endArr[i]);
        }
        for (let s in colorsArray) {
            if (startColors.has(colorsArray[s])) {
                const cores = d3__WEBPACK_IMPORTED_MODULE_0__["scaleSequential"](d3__WEBPACK_IMPORTED_MODULE_0__["interpolateRgbBasis"]([String(startColors.get(colorsArray[s])), String(endColors.get(colorsArray[s]))])).domain([0, groupsMap.get(colorsArray[s]).length]);
                //console.log(groupsMap.get(colorsArray[s]),startColors.get(colorsArray[s]),endColors.get(colorsArray[s]),startColors.has(colorsArray[s]))
                for (let r = 0; r < groupsMap.get(colorsArray[s]).length; r++) {
                    hexColors.set(groupsMap.get(colorsArray[s])[r], d3__WEBPACK_IMPORTED_MODULE_0__["color"](cores(r)).formatHex());
                }
            }
            else if (colorsArray[s] == "javax") {
                //console.log(groupsMap.get(colorsArray[s]),cors[s],corslight[s])
                const cores = d3__WEBPACK_IMPORTED_MODULE_0__["scaleSequential"](d3__WEBPACK_IMPORTED_MODULE_0__["interpolateRgbBasis"]([String("red"), String("#FEBAB8")])).domain([0, groupsMap.get(colorsArray[s]).length]);
                for (let r = 0; r < groupsMap.get(colorsArray[s]).length; r++) {
                    hexColors.set(groupsMap.get(colorsArray[s])[r], d3__WEBPACK_IMPORTED_MODULE_0__["color"](cores(r)).formatHex());
                }
            }
            else {
                //console.log(groupsMap.get(colorsArray[s]),cors[s],corslight[s])
                const cores = d3__WEBPACK_IMPORTED_MODULE_0__["scaleSequential"](d3__WEBPACK_IMPORTED_MODULE_0__["interpolateRgbBasis"]([String("#23201F"), String("#B6B5B4")])).domain([0, groupsMap.get(colorsArray[s]).length]);
                for (let r = 0; r < groupsMap.get(colorsArray[s]).length; r++) {
                    //console.log(d3.color(cores(r)).formatHex(),groupsMap.get(colorsArray[s])[r]);
                    hexColors.set(groupsMap.get(colorsArray[s])[r], d3__WEBPACK_IMPORTED_MODULE_0__["color"](cores(r)).formatHex());
                }
            }
        }
        this.schemasOrdered.forEach((value, i) => {
            this.schemasColorMap.set(value, hexColors.get(value));
            this.schemasObjectArray.push({ "schema": value, "color": hexColors.get(value) });
        });
    }
    getSchemasOrdered() {
        return this.schemasOrdered;
    }
    getSchemasColorMap() {
        return this.schemasColorMap;
    }
    getSchemasObjectArray() {
        return this.schemasObjectArray;
    }
    getAnnotationsList() {
        return this.annotationsList;
    }
    getAnnotationsCount() {
        return this.annotationsCount;
    }
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_avisualizer_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/avisualizer.service */ "QR5Y");
/* harmony import */ var _avisualizer_main_view_avisualizer_main_view_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./avisualizer-main-view/avisualizer-main-view.component */ "tpbK");



class AppComponent {
    constructor(aVisualizerService) {
        this.aVisualizerService = aVisualizerService;
        this.title = 'avisualizer';
        this.message = 'Meta is yet to be Beta';
    }
    ngOnInit() {
        // this.aVisualizerService.getWelComeMessage().subscribe(response => this.message = response.message);
        this.aVisualizerService.getWelComeMessage().subscribe(response => this.message = response.message);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_avisualizer_service__WEBPACK_IMPORTED_MODULE_1__["AvisualizerService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 1, consts: [["align", "center"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "avisualizer-main-view");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.message);
    } }, directives: [_avisualizer_main_view_avisualizer_main_view_component__WEBPACK_IMPORTED_MODULE_2__["AvisualizerMainViewComponent"]], styles: ["h3[_ngcontent-%COMP%] {\r\n    color: rgb(0, 0, 255);\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0kscUJBQXFCO0FBQ3pCIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaDMge1xyXG4gICAgY29sb3I6IHJnYigwLCAwLCAyNTUpO1xyXG59Il19 */"] });


/***/ }),

/***/ "Vixg":
/*!***********************************!*\
  !*** ./src/app/utils/NavUtils.ts ***!
  \***********************************/
/*! exports provided: NavUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavUtils", function() { return NavUtils; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/CircleUtils */ "e/6K");


class NavUtils {
    static getPackagesName(svg) {
        var names = [];
        svg.selectAll("circle").each(d => {
            if (d.data.type == "package" && d.data.children.length > 0) {
                names.push(d.data.name);
            }
        });
        return names;
    }
    static getClassName(svg, pacote, div) {
        var names = [];
        svg.selectAll("circle").each(d => {
            if (div == "classes") {
                if (d.data.type == "class" && d.data.children.length > 0) {
                    //var split =d.data.name.split("."); 
                    if (d.parent.data.name.includes(pacote))
                        names.push(d.data.name);
                }
            }
            else if (div == "interfaces") {
                if (d.data.type == "interface" && d.data.children.length > 0) {
                    //var split =d.data.name.split("."); 
                    if (d.parent.data.name.includes(pacote))
                        names.push(d.data.name);
                }
            }
        });
        return names;
    }
    static getElementName(svg, classe, element) {
        var names = [];
        svg.selectAll("circle").each(d => {
            if (d.data.type == element) {
                //var split =d.data.name.split("."); 
                if (d.parent.data.name == classe)
                    names.push(d.data.name);
            }
        });
        return names;
    }
    static createSelectBox(divName, selectBoxId, defaultBoxText, defaultBoxValue, label, top, width, svg) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("body")
            .append("div")
            .attr("id", divName)
            .attr("class", "nav-bar")
            .style("position", "fixed")
            .style("left", 0 + "px")
            .style("top", top + "px")
            .style("background-color", "#fff")
            .style("width", 400)
            .style("overflow", "auto")
            .append("h5").html(label + " <br/>")
            .append("select").attr("id", selectBoxId).attr("label", label).style("width", "20vw").style("left", "5vw");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + divName).select("select").append("option").text(defaultBoxText).attr("value", defaultBoxText);
        if (svg == ".svg-container-sv") {
            var options = NavUtils.getPackagesName(d3__WEBPACK_IMPORTED_MODULE_0__["select"](svg));
            //console.log(options);
            NavUtils.insertOptions(".svg-container-sv", divName, selectBoxId, options);
        }
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + selectBoxId).on("change", (d, event) => {
            if (d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + divName).select("select option:checked").attr("value") == "Select Package") {
                _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_1__["CircleUtils"].highlightNode(".svg-container-sv", "select package");
            }
            else if (d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + divName).select("select option:checked").attr("value") == "Select Class") {
                _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_1__["CircleUtils"].highlightNode(".svg-container-pv", "select class");
            }
            else if (d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + divName).select("select option:checked").attr("value") == "Select Method") {
                _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_1__["CircleUtils"].highlightNode(".svg-container-cv", "select method");
            }
            else if (d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + divName).select("select option:checked").attr("value") == "Select Field") {
                _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_1__["CircleUtils"].highlightNode(".svg-container-cv", "select field");
            }
            else if (d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + divName).select("select option:checked").attr("value") == "Select Interface") {
                _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_1__["CircleUtils"].highlightNode(".svg-container-pv", "select interface");
            }
            d3__WEBPACK_IMPORTED_MODULE_0__["select"](svg).selectAll("circle").each(function (d, i) {
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name") == d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + divName).select("select option:checked").attr("value")) {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).dispatch("click");
                }
            });
        });
    }
    static insertOptions(svg, div, boxId, options) {
        options.sort();
        if (svg == ".svg-container-sv" || svg == ".svg-container-cv") {
            for (var i = 0; i < options.length; i++) {
                d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + div).select("select").append("option")
                    .text(options[i])
                    .attr("value", options[i]);
            }
        }
        else {
            for (var i = 0; i < options.length; i++) {
                var text = options[i].split(".");
                d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + div).select("select").append("option")
                    .text(text[text.length - 1])
                    .attr("value", options[i]);
            }
        }
    }
    static refreshBox(boxName, divName, defaultBoxText, defaultValue, element, container, component) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + boxName).selectAll("option").remove();
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + divName).select("select").append("option").text(defaultBoxText).attr("value", defaultValue);
        if (divName == "fields" || divName == "methods")
            var options = NavUtils.getElementName(d3__WEBPACK_IMPORTED_MODULE_0__["select"](container), element, component);
        else if (divName == "classes" || "interfaces")
            var options = NavUtils.getClassName(d3__WEBPACK_IMPORTED_MODULE_0__["select"](container), element, divName);
        NavUtils.insertOptions(container, divName, boxName, options);
    }
    static resetBox(boxName, divName, defaultBoxText, defaultValue) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + boxName).selectAll("option").remove();
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + divName).select("select").append("option").text(defaultBoxText).attr("value", defaultValue);
    }
    static updateSelectBoxText(boxName, option) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#" + boxName).selectAll("option").each(function (e, i) {
            //console.log(d3.select(this).attr("value"))
            if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("value") == option) {
                //console.log(d3.select(this).attr("value"))
                return d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).property("selected", true);
            }
        });
    }
}


/***/ }),

/***/ "XQXR":
/*!********************************************************!*\
  !*** ./src/app/schema-table/schema-table.component.ts ***!
  \********************************************************/
/*! exports provided: SchemaTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchemaTableComponent", function() { return SchemaTableComponent; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/SVGUtils */ "tOky");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class SchemaTableComponent {
    constructor() { }
    ngOnInit() { }
    static populateSchemasTable(annotationSchemas) {
        //get the table with schemas
        const schema_table = d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#schemas-table");
        var annotations = annotationSchemas.getAnnotationsList();
        var counts = annotationSchemas.getAnnotationsCount();
        //populate table
        var rows = schema_table.select("tbody").selectAll("tr").
            data(annotationSchemas.getSchemasObjectArray()).enter().append("tr");
        rows.selectAll("td").append("td").text("\u25B2");
        var cells = rows.selectAll("td").data(function (row) {
            return ["schema", "color"].map(function (column) {
                return { column: column, value: row[column] };
            });
        }).enter().append("td")
            .attr("class", d => {
            if (String(d.value).includes("."))
                return "td-schema";
            else
                return "td-color";
        })
            .attr("name", d => { return d.value; })
            .attr("style", d => {
            if (String(d.value).includes("."))
                return "background-color:#FFFFFF";
            else
                return "background-color:" + d.value;
        })
            .text(d => { if (d.value.includes("."))
            return "\u25BC" + d.value;
        else
            return ""; })
            .on("dblclick", (event, d) => {
            event.preventDefault();
            var name = d.value;
            d3__WEBPACK_IMPORTED_MODULE_0__["select"]("tbody").selectAll("ul").each(function (d, i) {
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name") == name) {
                    if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("display")) == "block") {
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("display", "none");
                    }
                    else {
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("display", "block");
                    }
                }
            });
        });
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("tbody").selectAll("td").each(function (d, i) {
            if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name')).includes(".")) {
                var schema = String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name'));
                var names = annotations.get(String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name')));
                for (var n in names) {
                    names[n] = names[n] + " ";
                }
                var ul = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).append('ul').attr("name", String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name'))).style("display", "none");
                for (var e in names) {
                    ul.append("li").html(names[e] + " (" + counts.get(names[e].replace(" ", "")) + ") ").attr("id", names[e]).attr("schema", schema);
                }
            }
        });
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("tbody").selectAll("ul").each(function (d, i) {
            d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).selectAll("li").each(function (e, j) {
                var nome = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("id");
                var schema = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("schema");
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).append("input")
                    .attr('type', 'checkbox')
                    .attr("id", String(nome))
                    .attr("schema", schema)
                    .property('checked', true)
                    .on("click", function (d) {
                    var container = String(d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#SelectViewBox").select("select option:checked").attr("value"));
                    var boxSchema = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("schema");
                    var checked = false;
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"]("tbody").selectAll("ul").each(function (d, i) {
                        if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name") == boxSchema) {
                            d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).selectAll("li").each(function (e, j) {
                                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).select("input").property("checked")) {
                                    checked = true;
                                }
                            });
                        }
                    });
                    _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_1__["SVGUtils"].hideAnnotations(container, this.id.replace(" ", ""), this.checked);
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"]("tbody").selectAll("input").each(function (d, i) {
                        if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("class") == "parent" && d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("id") == boxSchema)
                            d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).property("checked", checked);
                    });
                });
            });
        });
        //column for total annotations of each schema
        rows.append("td").text(function (d, i) {
            return annotationSchemas.schemasTotalAnnotations.get(annotationSchemas.getSchemasObjectArray()[i].schema);
        });
        //column with checkboxes
        rows.append("input").property('checked', true)
            .attr('type', 'checkbox')
            .attr("class", "parent")
            .attr("id", function (d, i) { return annotationSchemas.getSchemasObjectArray()[i].schema; })
            .on("click", function (d) {
            //console.log(d3.select("system-view").attr("hidden"),d3.select("package-view").attr("hidden"),d3.select("class-view").attr("hidden"))
            var container = String(d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#SelectViewBox").select("select option:checked").attr("value"));
            _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_1__["SVGUtils"].hideCircles(container, this.id, this.checked);
            var checked = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).property("checked");
            var boxName = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("id");
            d3__WEBPACK_IMPORTED_MODULE_0__["select"]("tbody").selectAll("ul").each(function (d, i) {
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name") == boxName) {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).selectAll("input").each(function (e, j) {
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).property("checked", checked);
                    });
                }
            });
            d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#UnselectAllBox").property("checked", false);
        });
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#schemas-table").select("tbody").append("tr").attr("id", "selectAllRow").append("td").text("Select All");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#selectAllRow").append("td").text(" ");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#selectAllRow").append("td").text(" ");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#selectAllRow").append("input").property('checked', true)
            .attr('type', 'checkbox')
            .attr("id", "selectAllBox")
            .on("click", (event, d) => {
            var container = String(d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#SelectViewBox").select("select option:checked").attr("value"));
            if (container == "systemView") {
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_1__["SVGUtils"].displayAllCircles(".svg-container-sv");
            }
            else if (container == "packageView") {
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_1__["SVGUtils"].displayAllCircles(".svg-container-pv");
            }
            else {
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_1__["SVGUtils"].displayAllCircles(".svg-container-cv");
            }
            d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#schemas-table").selectAll("input").each(function (d, i) {
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("id") != "UnselectAllBox")
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).property("checked", true);
                else
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).property("checked", false);
            });
        });
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#schemas-table").select("tbody").append("tr").attr("id", "UnselectAllRow").append("td").text("Remove All");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#UnselectAllRow").append("td").text(" ");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#UnselectAllRow").append("td").text(" ");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#UnselectAllRow").append("input").property('checked', false)
            .attr('type', 'checkbox')
            .attr("id", "UnselectAllBox")
            .on("click", (event, d) => {
            var container = String(d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#SelectViewBox").select("select option:checked").attr("value"));
            if (container == "systemView") {
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_1__["SVGUtils"].hideAllCircles(".svg-container-sv");
            }
            else if (container == "packageView") {
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_1__["SVGUtils"].hideAllCircles(".svg-container-pv");
            }
            else {
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_1__["SVGUtils"].hideAllCircles(".svg-container-cv");
            }
            d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#schemas-table").selectAll("input").each(function (d, i) {
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("id") != "UnselectAllBox")
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).property("checked", false);
                else
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).property("checked", true);
            });
        });
    }
}
SchemaTableComponent.ɵfac = function SchemaTableComponent_Factory(t) { return new (t || SchemaTableComponent)(); };
SchemaTableComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SchemaTableComponent, selectors: [["schema-table"]], decls: 11, vars: 0, consts: [["id", "schema-table-container"], ["id", "schemas-table", 1, "table"], [1, "thead-light"]], template: function SchemaTableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "thead", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Annotation Schemas");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Color");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Total Annotations");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } }, styles: ["#schema-table-container[_ngcontent-%COMP%] {\r\n  width: auto;\r\n  font-family: \"Arial\", sans-serif;\r\n  font-weight: 100;\r\n  font-variant-ligatures: normal;\r\n  font-size: 15pt;\r\n  letter-spacing: 1px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVtYS10YWJsZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLGdDQUFnQztFQUNoQyxnQkFBZ0I7RUFDaEIsOEJBQThCO0VBQzlCLGVBQWU7RUFDZixtQkFBbUI7QUFDckIiLCJmaWxlIjoic2NoZW1hLXRhYmxlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjc2NoZW1hLXRhYmxlLWNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IGF1dG87XHJcbiAgZm9udC1mYW1pbHk6IFwiQXJpYWxcIiwgc2Fucy1zZXJpZjtcclxuICBmb250LXdlaWdodDogMTAwO1xyXG4gIGZvbnQtdmFyaWFudC1saWdhdHVyZXM6IG5vcm1hbDtcclxuICBmb250LXNpemU6IDE1cHQ7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _package_view_package_view_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./package-view/package-view.component */ "bwui");
/* harmony import */ var _avisualizer_main_view_avisualizer_main_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./avisualizer-main-view/avisualizer-main-view.component */ "tpbK");
/* harmony import */ var _schema_table_schema_table_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./schema-table/schema-table.component */ "XQXR");
/* harmony import */ var _system_view_system_view_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./system-view/system-view.component */ "7UeH");
/* harmony import */ var _class_view_class_view_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./class-view/class-view.component */ "xIn7");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");









class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"],
        _package_view_package_view_component__WEBPACK_IMPORTED_MODULE_2__["PackageViewComponent"],
        _avisualizer_main_view_avisualizer_main_view_component__WEBPACK_IMPORTED_MODULE_3__["AvisualizerMainViewComponent"],
        _schema_table_schema_table_component__WEBPACK_IMPORTED_MODULE_4__["SchemaTableComponent"],
        _system_view_system_view_component__WEBPACK_IMPORTED_MODULE_5__["SystemViewComponent"],
        _class_view_class_view_component__WEBPACK_IMPORTED_MODULE_6__["ClassViewComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"]] }); })();


/***/ }),

/***/ "bwui":
/*!********************************************************!*\
  !*** ./src/app/package-view/package-view.component.ts ***!
  \********************************************************/
/*! exports provided: PackageViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PackageViewComponent", function() { return PackageViewComponent; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _schema_table_schema_table_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schema-table/schema-table.component */ "XQXR");
/* harmony import */ var _utils_AnnotationSchemas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/AnnotationSchemas */ "S3CC");
/* harmony import */ var _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/CircleUtils */ "e/6K");
/* harmony import */ var _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/SVGUtils */ "tOky");
/* harmony import */ var _utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/ZoomUtils */ "N8JQ");
/* harmony import */ var _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/NavUtils */ "Vixg");
/* harmony import */ var _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/HeaderUtils */ "76FL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");









class PackageViewComponent {
    constructor() {
        this.width = 960;
        this.height = 960;
        this.zoomProp = {};
    }
    ngOnInit() {
        //read data from JSON
        d3__WEBPACK_IMPORTED_MODULE_0__["json"]("./assets/SpaceWeatherTSI-PV.json").then(data => this.readPackageView(data))
            .catch(error => console.log(error));
        //
        //  d3.json("./assets/guj/Guj-PV.json").then(data => this.readPackageView(data as any[]))
        //   .catch(error => console.log(error));
        //
        // d3.json("./assets/geostore/Geostore-PV.json").then(data => this.readPackageView(data as any[]))
        //  .catch(error => console.log(error));
        //d3.json("./assets/shopizer/Shopizer-PV.json").then(data => this.readPackageView(data as any[]))
        // .catch(error => console.log(error));
    }
    readPackageView(data) {
        this.root = d3__WEBPACK_IMPORTED_MODULE_0__["hierarchy"](data);
        //Now using LOCAD, no need to add 1 anymore
        // this.root.descendants().forEach(d => {
        //
        //     d.data.value = d.data.value+1;//adding 1 to each AA, to avoid 0
        // });
        this.root.sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        const pack = d3__WEBPACK_IMPORTED_MODULE_0__["pack"]()
            .size([this.width - 2, this.height - 10])
            .padding(3);
        pack(this.root);
        this.zoomProp.focus = this.root;
        //Fetch Annotations Schemas
        const anot = new _utils_AnnotationSchemas__WEBPACK_IMPORTED_MODULE_2__["AnnotationSchemas"](this.root, 'locad');
        this.schemasMap = anot.getSchemasColorMap();
        //console.log(this.schemasMap.size);
        //Create the table with Annotation Schemas
        _schema_table_schema_table_component__WEBPACK_IMPORTED_MODULE_1__["SchemaTableComponent"].populateSchemasTable(anot);
        this.svg = _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].createSvg(".svg-container-pv", this.width, this.height, "pacote");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastSelected", this.root.data.name);
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastClicked", "");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastClass", "");
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("rootName", this.root.children[0].data.name);
        this.node = _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].createNode(this.svg, this.root);
        //Initial Zoom
        _utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_5__["ZoomUtils"].zoomTo([this.root.x, this.root.y, this.root.r * 2], this.svg, this.zoomProp, this.node);
        //Color all circles
        //this.svg.selectAll("circle").each(function(d){if(d.data.type=="annotation")console.log(d.data.value);});
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]("circle").attr("stroke", d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_3__["CircleUtils"].addCircleStroke(d))
            .attr("stroke-dasharray", d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_3__["CircleUtils"].addCircleDashArray(d))
            .attr("fill", d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_3__["CircleUtils"].colorCircles(d, this.schemasMap));
        //Apply zoom to all circles in this specific view
        this.svg.selectAll("circle")
            .on("click", (event, d) => {
            if (d.data.type == "package" && (d.data.name.includes(d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").
                attr("lastSelected")) ||
                d.data.name == d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").attr("lastSelected"))) {
                if (d.data.name == this.root.descendants()[1].data.name) {
                    var node = d.descendants()[0].data.children[0].name;
                    console.log(node);
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").selectAll('circle').each(function (d, i) {
                        if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name')) == node) {
                            console.log("click");
                            d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).dispatch('click');
                            return this;
                        }
                    });
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").attr("lastSelected", node);
                }
                else {
                    this.zoomProp.focus !== d && (_utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_5__["ZoomUtils"].zoom(event, d, this.zoomProp, this.svg, this.node), event.stopPropagation(), _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].setFocus(d.data.name, ".svg-container-pv"));
                    _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_3__["CircleUtils"].highlightNode(".svg-container-pv", d.data.name);
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastSelected", d.data.name);
                    if (d.data.name == d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").attr("lastSelected")) {
                        _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].refreshBox("classList", "classes", "Select Class", "select class", d.data.name, ".svg-container-pv", "");
                        _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].refreshBox("interfaceList", "interfaces", "Select Interface", "select interface", d.data.name, ".svg-container-pv", "interface");
                    }
                    _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].updateSelectBoxText("packagesList", d.data.name);
                    //HeaderUtils.setPackageViewHeader("Package",d.data.name,this.root.data.name);
                    _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_7__["HeaderUtils"].headerUpdate('Package View', 'Package: ' + d.data.name);
                }
            }
            else if (d.data.type == "class" || d.data.type == "interface") {
                //HeaderUtils.setPackageViewHeader("Package",d.parent.data.name,this.root.data.name);
                _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_7__["HeaderUtils"].headerUpdate('Package View', d.data.type.charAt(0).toUpperCase() + d.data.type.slice(1) + ': ' + d.data.name);
                this.zoomProp.focus !== d && (_utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_5__["ZoomUtils"].zoom(event, d, this.zoomProp, this.svg, this.node), event.stopPropagation(), _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].setFocus(d.parent.data.name, ".svg-container-pv"));
                if (d.data.type == "class")
                    _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].updateSelectBoxText("classList", d.data.name);
                else
                    _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].updateSelectBoxText("interfaceList", d.data.name);
                _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_3__["CircleUtils"].highlightNode(".svg-container-pv", d.data.name);
            }
            else if (d.data.type == "package" && !d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").attr("lastSelected").includes(d.parent.data.name)) {
                //HeaderUtils.setSystemViewHeader(this.root.data.name);
                _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_7__["HeaderUtils"].headerUpdate('System View', 'Package: ' + d.data.name);
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].updateSelectBoxText("SelectViewBox", "systemView");
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].showView("package-view", "system-view");
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].resetBox("interfaceList", "interfaces", "Select Interface", "select interface");
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].resetBox("classList", "classes", "Select Class", "select class");
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].updateSelectBoxText("packagesList", d.data.name);
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastSelected", d.data.name);
            }
            else if (d.data.type == "annotation") {
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastClicked", d.data.name);
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastClass", d.parent.data.name);
                //console.log(d3.select(".svg-container-pv").attr("lastClicked"))
                _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_3__["CircleUtils"].highlightNode(".svg-container-sv", d.parent.parent.data.name);
                if (d.parent.data.type == "class") {
                    _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].updateSelectBoxText("classList", d.parent.data.name);
                }
                else {
                    _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].updateSelectBoxText("interfaceList", d.parent.data.name);
                }
                this.zoomProp.focus !== d && (_utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_5__["ZoomUtils"].zoom(event, d, this.zoomProp, this.svg, this.node), event.stopPropagation(), _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].setFocus(String(d.parent.data.name), ".svg-container-pv"));
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].hide(".svg-container-cv", d.parent.data.name);
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].showView("package-view", "class-view");
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastSelected")), ".svg-container-cv");
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].refreshBox("fieldList", "fields", "Select Field", "select field", d.parent.data.name, ".svg-container-cv", "field");
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].refreshBox("methodList", "methods", "Select Method", "select method", d.parent.data.name, ".svg-container-cv", "method");
                var split = d.parent.data.name.split(".");
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastSelected", d.parent.parent.data.name);
                //HeaderUtils.setClassViewHeader("Class",split[split.length-1],d3.select(".svg-container-pv").attr("lastSelected"),this.root.data.name);
                _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_7__["HeaderUtils"].headerUpdate('Class View', 'Class: ' + d.parent.data.name);
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].resetView(".svg-container-pv");
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].updateSelectBoxText("packagesList", d.parent.parent.data.name);
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_6__["NavUtils"].updateSelectBoxText("SelectViewBox", "classView");
            }
            else {
                _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_3__["CircleUtils"].highlightNode('.svg-container-sv', d.data.name);
                this.zoomProp.focus !== d && (_utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_5__["ZoomUtils"].zoom(event, d, this.zoomProp, this.svg, this.node), event.stopPropagation(), _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].setFocus(d.data.name, '.svg-container-sv'));
                _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_7__["HeaderUtils"].headerUpdate('Package View', 'Package: ' + d.data.name);
            }
        })
            .on("mouseover", (event, d) => {
            _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].createPopUp(d, this.svg, event);
            var name = d.data.properties.schema;
            d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").selectAll("circle").each(function (d, i) {
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("schema") == name) {
                    var color = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("fill");
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"]("tbody").selectAll("td").each(function (d, i) {
                        if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("class") == "td-schema" && d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name") == name) {
                            d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("color", color);
                        }
                    });
                }
            });
        })
            .on("mouseout", (event, d) => {
            _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].destroyPopUp(this.svg);
            var name = d.data.properties.schema;
            d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").selectAll("circle").each(function (d, i) {
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("schema") == name) {
                    var color = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("fill");
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"]("tbody").selectAll("td").each(function (d, i) {
                        if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("class") == "td-schema" && d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name") == name) {
                            d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("color", "black");
                        }
                    });
                }
            });
        })
            .on("mousemove", (event, d) => _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_4__["SVGUtils"].movePopUp(d, this.svg, event))
            .on("contextmenu", (event, d) => {
            event.preventDefault();
        });
    }
}
PackageViewComponent.ɵfac = function PackageViewComponent_Factory(t) { return new (t || PackageViewComponent)(); };
PackageViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: PackageViewComponent, selectors: [["package-view"]], decls: 1, vars: 0, consts: [[1, "svg-container-pv"]], template: function PackageViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "div", 0);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYWNrYWdlLXZpZXcuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "e/6K":
/*!**************************************!*\
  !*** ./src/app/utils/CircleUtils.ts ***!
  \**************************************/
/*! exports provided: CircleUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CircleUtils", function() { return CircleUtils; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class CircleUtils {
    constructor() { }
    static addCircleStroke(node) {
        if (node.data.type == "package")
            return "black";
        else
            return "blue";
    }
    static addCircleDashArray(node) {
        if (node.data.type == "package")
            return "5,5";
        else
            return null;
    }
    static colorCircles(node, schemasMap) {
        if (node.data.type == "package")
            return "#e0dada";
        else if (node.data.type == "annotation")
            return schemasMap.get(node.data.properties.schema);
        //return "url('#green-pattern')";
        else if (node.data.type == "schema")
            return schemasMap.get(node.data.name);
        //return "url('#green-pattern')";
        else if (node.data.type == "method")
            return "#D2D2D2";
        else if (node.data.type == "field")
            return "#e3e3e3";
        else
            return "white";
    }
    static highlightNode(container, name) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).selectAll("circle").each(function (d, i) {
            //var splitter = String(d3.select(this).attr("name").split(".");
            if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name")) == String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).attr("highlightedNode"))) {
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("class") == "package")
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("stroke", "black");
                else
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("stroke", "blue");
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("stroke-width", "1px");
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("fill", "");
            }
        });
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).selectAll("circle").each(function (d, i) {
            if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name")) == name) {
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).attr("highlightedNode", String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name")));
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("stroke", "blue");
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("stroke-width", "2px");
                var color = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("fill");
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).transition()
                    .duration(CircleUtils.transitionDur)
                    .style("fill", "gray")
                    .transition()
                    .duration(CircleUtils.transitionDur)
                    .style("fill", String(d3__WEBPACK_IMPORTED_MODULE_0__["color"](color).formatHex()));
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("class") == "package")
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("stroke", "black");
                else
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("stroke", "blue");
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("stroke-width", "1px");
            }
        });
    }
}
CircleUtils.transitionDur = 150;


/***/ }),

/***/ "tOky":
/*!***********************************!*\
  !*** ./src/app/utils/SVGUtils.ts ***!
  \***********************************/
/*! exports provided: SVGUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGUtils", function() { return SVGUtils; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class SVGUtils {
    constructor() { }
    static createSvg(svgContainer, width, height, nome) {
        const svg = d3__WEBPACK_IMPORTED_MODULE_0__["select"](svgContainer)
            .append('svg')
            .attr('viewBox', `-${width / 2} -${(height / 2)} ${width} ${height}`)
            .attr('width', width)
            .attr('height', height)
            .attr('name', nome)
            .attr('highlightedNode', '')
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('display', 'block')
            .style('margin', '0 -14px')
            .style('background', 'lightblue')
            .style('cursor', 'pointer');
        // .on("click", (event) => this.zoom(event, this.root));
        return svg;
    }
    static createNode(svg, root) {
        const node = svg.append('g')
            .selectAll('circle')
            .data(root.descendants())
            .join('circle')
            .attr('class', d => {
            return d.data.type;
        })
            .attr('name', function (d) { return d.data.name; })
            .attr('schema', function (d) { return d.data.type == 'annotation' ? d.data.properties.schema : d.data.type; })
            .attr('zoom', 'a')
            .attr('value', function (d) { return d.data.type == 'schema' ? d.data.value : 0; })
            .attr('parent', d => d.parent == null ? '' : d.parent.data.name)
            .attr('grandfather', d => {
            if (d.parent == null) {
                return '';
            }
            else if (d.parent.parent == null) {
                return '';
            }
            else {
                return d.parent.parent.data.name;
            }
        })
            .attr('grandgrandfather', d => {
            if (d.parent == null) {
                return '';
            }
            else if (d.parent.parent == null) {
                return '';
            }
            else if (d.parent.parent.parent == null) {
                return '';
            }
            else {
                return d.parent.parent.parent.data.name;
            }
        });
        return node;
    }
    static hideAnnotations(container, id, show) {
        if (container == "systemView")
            var view = ".svg-container-sv";
        else if (container == "packageView")
            var view = ".svg-container-pv";
        else
            var view = ".svg-container-cv";
        console.log(id, show, view);
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](view).selectAll("circle").each(function (d, i) {
            if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name')) == id) { // schema se for package name se for system
                if (!show) {
                    // console.log(d3.select(this).attr("name")+" "+id);
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'hidden');
                }
                else {
                    // console.log(d3.select(this).attr("name")+" "+id+" hide");
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                }
            }
        });
    }
    static showView(origin, view) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](view).attr('hidden', null);
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](origin).attr('hidden', '');
    }
    // view related methods
    static viewTransition(origin, view) {
        //console.log(origin,view)
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](String(view)).selectAll('circle').each(function (d, i) {
            if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name')) == origin) {
                //console.log(d3.select(this).attr('name'))
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).dispatch('click');
                SVGUtils.setFocus(origin, view);
                return this;
            }
        });
    }
    static setFocus(toZoom, view) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](String(view)).attr('lastSelected', String(toZoom));
    }
    static hide(container, name) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).selectAll('circle').each(function (d, i) {
            if (container == '.svg-container-pv') {
                if ((d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class') == 'class' || d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class') == 'interface') && d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('parent').includes(name)) {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                }
                else if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name').includes(name)) {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                }
                else if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class') == 'annotation' && d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('grandfather').includes(name)) {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                }
                else if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name') == d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).attr('rootName')) {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                }
                else {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'hidden');
                }
            }
            else if (container == '.svg-container-cv') {
                let split = name.split('.');
                let pacote = '';
                for (let i = 0; i < split.length - 1; i++) {
                    if (i < split.length - 2) {
                        pacote = pacote + split[i] + '.';
                    }
                    else {
                        pacote = pacote + split[i];
                    }
                }
                if ((d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class') == 'class' || d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class') == 'interface') && String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name')) == name) {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                }
                else if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('parent')) == name) {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                }
                else if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class')) == 'annotation' && String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('grandfather')) == name) {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                }
                else if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name')) == d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).attr('rootName')) {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                }
                else if ((String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class')) == 'field' || String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class')) == 'method') && String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('grandfather')) == name) {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                }
                else if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name') == pacote) {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                }
                else {
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'hidden');
                }
            }
        });
    }
    static hideAllCircles(container) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).selectAll('circle').each(function (d, i) {
            if (container == ".svg-container-sv") {
                if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class')) == "schema") { // schema se for package name se for system
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'hidden');
                }
            }
            else {
                if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class')) == "annotation") { // schema se for package name se for system
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'hidden');
                }
            }
        });
    }
    static displayAllCircles(container) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](container).selectAll('circle').each(function (d, i) {
            if (container == ".svg-container-sv") {
                if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class')) == "schema") { // schema se for package name se for system
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                }
            }
            else {
                if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class')) == "annotation" && (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('parent').includes(d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").attr("lastSelected")) || d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name') == d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-sv").attr("lastSelected"))) { // schema se for package name se for system
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                }
            }
        });
    }
    static hideCircles(container, id, show) {
        if (d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('system-view').attr('hidden') !== '') { // hide circles for system-view
            let view = d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.svg-container-sv').select('svg');
            view.selectAll('circle').each(function (d, i) {
                if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name')) == id) { // schema se for package name se for system
                    if (!show) {
                        // console.log(d3.select(this).attr("name")+" "+id);
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'hidden');
                    }
                    else {
                        // console.log(d3.select(this).attr("name")+" "+id+" hide");
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                    }
                }
            });
        }
        else if (d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('system-view').attr('hidden') == '' && d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('class-view').attr('hidden') == '') {
            let view = d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.svg-container-pv').select('svg');
            view.selectAll('circle').each(function (d, i) {
                if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('schema')) == id && d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('grandfather').includes(d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.svg-container-sv').attr('lastSelected'))) { // schema se for package name se for system
                    if (!show) {
                        // console.log(d3.select(this).attr("name")+" "+id);
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'hidden');
                    }
                    else {
                        // console.log(d3.select(this).attr("name")+" "+id+" hide");
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                    }
                }
            });
        }
        else if (d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('system-view').attr('hidden') == '' && d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('package-view').attr('hidden') == '') {
            let view = d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.svg-container-cv').select('svg');
            view.selectAll('circle').each(function (d, i) {
                //if (String(d3.select(this).attr('schema')) == id && ( d3.select(this).attr('grandfather') == d3.select('#classList').select('select option:checked').attr('value') || d3.select(this).attr('parent') == d3.select('#classList').select('select option:checked').attr('value'))){ // schema se for package name se for system
                if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('schema')) == id && (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("grandgrandfather") == d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastSelected") || d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("grandfather") == d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-pv").attr("lastSelected"))) {
                    if (!show) {
                        // console.log(d3.select(this).attr("name")+" "+id);
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'hidden');
                    }
                    else {
                        // console.log(d3.select(this).attr("name")+" "+id+" hide");
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
                    }
                }
            });
        }
    }
    static resetView(viewToUpdate) {
        let view = d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"](String(viewToUpdate)).select('svg');
        view.selectAll('circle').each(function (d, i) {
            if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('parent').includes(d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.svg-container-sv').attr('lastSelected'))) {
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
            }
            else if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('class') == 'schema') {
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style('visibility', 'visible');
            }
        });
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#schemas-table").selectAll("input").each(function (d, i) {
            if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("id") != "UnselectAllBox")
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).property("checked", true);
            else
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).property("checked", false);
        });
    }
    // popUp methods
    static createPopUp(d, svg, event) {
        if (d.data.type == 'schema') { // system view
            const divTooltip = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('body').append('div')
                .attr('class', 'tooltip')
                .style('opacity', 1)
                .style('left', (event.pageX) + 'px')
                .style('top', (event.pageY - 70) + 'px')
                .style('background', '#BCC5F7')
                .html('Schema Name: ' + d.data.name + '<br/>' + 'Package Name ' + d.parent.data.name + '<br/>' + 'Number of Annotation occurrence: ' + d.data.value)
                .transition()
                .duration(this.popUpTransition);
        }
        else if (d.data.type === 'annotation' && (d.parent.data.type === 'class' || d.parent.data.type === 'interface')) { // type definition label (interface/class)
            const classname = d.parent.data.name.split('.');
            let label = 'Package Name: ' + d.parent.parent.parent.data.name + '<br/>' +
                'Class Name: ' + classname[classname.length - 1] + '<br/>' +
                'Annotation name: ' + d.data.name + '<br/>';
            //if(Object.keys(d.data.properties).length === this.pvPropertiesSize){
            //   label = label.concat('LOCAD: ' + d.data.value); //in package view, the metrics is LOCAD
            //}else{
            // label = label.concat('AA: ' + d.data.properties.aa); //in class view, the metric is AA
            //}
            let metrics = d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#annotMetric").text().split(" ");
            let metric = "";
            let data;
            console.log(metrics[metrics.length - 1]);
            if (metrics[metrics.length - 1] == "(ANL)") {
                metric = 'ANL';
                data = d.data.properties.anl;
                label = label.concat(metric + " " + data);
            }
            else if (metrics[metrics.length - 1] == "(LOCAD)") {
                metric = 'LOCAD';
                if (Object.keys(d.data.properties).length === this.pvPropertiesSize) {
                    data = d.data.value;
                }
                else
                    data = d.data.properties.locad;
                label = label.concat(metric + " " + data);
            }
            else {
                metric = 'AA';
                data = d.data.properties.aa;
                label = label.concat(metric + " " + data);
            }
            const divTooltip = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('body').append('div')
                .attr('class', 'tooltip')
                .style('opacity', 1)
                .style('left', (event.pageX + 30) + 'px')
                .style('top', (event.pageY - 60) + 'px')
                .style('background', '#BCC5F7')
                .html(label)
                .transition()
                .duration(this.popUpTransition);
        }
        else if (d.data.type == 'annotation' && ((d.parent.data.type == 'field' || d.parent.data.type == 'method'))) {
            let componentname = d.parent.data.name.split('.');
            let classname = d.parent.parent.data.name.split('.');
            let metrics = d3__WEBPACK_IMPORTED_MODULE_0__["select"]("#annotMetric").text().split(" ");
            let metric = "";
            let data;
            console.log(metrics[metrics.length - 1]);
            if (metrics[metrics.length - 1] == "(ANL)") {
                metric = 'ANL';
                data = d.data.properties.anl;
            }
            else if (metrics[metrics.length - 1] == "(LOCAD)") {
                metric = 'LOCAD';
                data = d.data.properties.locad;
            }
            else {
                metric = 'AA';
                data = d.data.properties.aa;
            }
            const divTooltip = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('body').append('div')
                .attr('class', 'tooltip')
                .style('opacity', 1)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 60) + 'px')
                .style('background', '#BCC5F7')
                .html('Package Name: ' + d.parent.parent.parent.data.name + '<br/>' + 'Class Name: ' + classname[classname.length - 1] + '<br/>' + d.parent.data.type + ' Name ' + componentname[componentname.length - 1] + '<br/>' + 'Annotation name: ' + d.data.name + '<br/>' + metric + ": " + data)
                .transition()
                .duration(this.popUpTransition);
        }
        else if (d.data.type == 'class' || d.data.type == 'interface') {
            let classname = d.data.name.split('.');
            const divTooltip = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('body').append('div')
                .attr('class', 'tooltip')
                .style('opacity', 1)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 60) + 'px')
                .style('background', '#BCC5F7')
                .html(d.data.type + ' Name: ' + classname[classname.length - 1] + '<br/>')
                .transition()
                .duration(this.popUpTransition);
        }
    }
    static destroyPopUp(svg) {
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.tooltip').remove();
    }
    static movePopUp(d, svg, event) {
        SVGUtils.destroyPopUp(svg);
        SVGUtils.createPopUp(d, svg, event);
    }
}
SVGUtils.pvPropertiesSize = 1;
SVGUtils.popUpTransition = 200;


/***/ }),

/***/ "tpbK":
/*!**************************************************************************!*\
  !*** ./src/app/avisualizer-main-view/avisualizer-main-view.component.ts ***!
  \**************************************************************************/
/*! exports provided: AvisualizerMainViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvisualizerMainViewComponent", function() { return AvisualizerMainViewComponent; });
/* harmony import */ var _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/SVGUtils */ "tOky");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _system_view_system_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../system-view/system-view.component */ "7UeH");
/* harmony import */ var _package_view_package_view_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../package-view/package-view.component */ "bwui");
/* harmony import */ var _class_view_class_view_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../class-view/class-view.component */ "xIn7");
/* harmony import */ var _schema_table_schema_table_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../schema-table/schema-table.component */ "XQXR");







class AvisualizerMainViewComponent {
    constructor() {
        this.initialViewName = 'System View';
        this.isSVHidden = false;
        this.isPVHidden = true;
        this.isCVHidden = true;
        this.isCVHidden = true;
        this.selectedView = 'Package';
    }
    ngOnInit() {
    }
    selectSystemView() {
        this.isSVHidden = false;
        this.isPVHidden = true;
        this.isCVHidden = true;
        //reset workspace on change. SHOULD NOT BE IT!!!!!
        _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].resetView(".svg-container-sv");
        //transition between zoomed views
        if (!(this.selectedView == "System")) {
            if (this.selectedView == "Package")
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_1__["select"](".svg-container-pv").attr("lastSelected")), ".svg-container-sv");
            else {
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_1__["select"](".svg-container-cv").attr("lastSelected")), ".svg-container-sv");
            }
        }
        this.selectedView = "System";
        this.initialViewName = 'System View';
    }
    selectPackageView() {
        this.isSVHidden = true;
        this.isPVHidden = false;
        this.isCVHidden = true;
        //reset workspace on change. SHOULD NOT BE IT!!!!!
        _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].resetView(".svg-container-pv");
        //transition between zoomed views
        console.log(this.isSVHidden, this.isPVHidden);
        if (!(this.selectedView == "Package")) {
            if (this.selectedView == "System")
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_1__["select"](".svg-container-sv").attr("lastSelected")), ".svg-container-pv");
            else
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_1__["select"](".svg-container-cv").attr("lastSelected")), ".svg-container-pv");
        }
        this.selectedView = "Package";
        this.initialViewName = 'Package View';
    }
    selectClassView() {
        this.isSVHidden = true;
        this.isPVHidden = true;
        this.isCVHidden = false;
        _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].resetView(".svg-container-cv");
        if (!(this.selectedView == "Class")) {
            if (this.selectedView == "System")
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_1__["select"](".svg-container-sv").attr("lastSelected")), ".svg-container-cv");
            else
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_0__["SVGUtils"].viewTransition(String(d3__WEBPACK_IMPORTED_MODULE_1__["select"](".svg-container-pv").attr("lastSelected")), ".svg-container-cv");
        }
        this.selectedView = "Class";
        this.initialViewName = 'Class View';
    }
    selectViewHandler(view) {
        // update view
        if (view.target.value === 'systemView') {
            this.selectSystemView();
        }
        else if (view.target.value === 'packageView') {
            this.selectPackageView();
        }
        else {
            this.selectClassView();
        }
    }
}
AvisualizerMainViewComponent.ɵfac = function AvisualizerMainViewComponent_Factory(t) { return new (t || AvisualizerMainViewComponent)(); };
AvisualizerMainViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AvisualizerMainViewComponent, selectors: [["avisualizer-main-view"]], decls: 29, vars: 4, consts: [["align", "center"], ["align", "left", "id", "projectUnderAnalysis"], ["id", "header"], [1, "container-fluid"], [1, "row"], [1, "col-sm"], ["viewBox", "0 0 350 32", "xmlns", "http://www.w3.org/2000/svg"], ["x", "0", "y", "10", "id", "viewName", 1, "heavy", 2, "text-decoration", "underline"], ["x", "0", "y", "20", "id", "annotMetric", 1, "medium"], ["x", "0", "y", "30", "id", "elementInfo", 1, "small"], ["id", "SelectViewBox", 1, "col-sm"], [3, "change"], ["value", "systemView"], ["value", "packageView"], ["value", "classView"], [3, "hidden"], [1, "col-1"]], template: function AvisualizerMainViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Annotation Visualizer: Visualizing Code Annotations Distribution");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Project Under Analysis:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "svg", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "style");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, " .small { font: bold 9px sans-serif; } .medium { font: bold 10px sans-serif; } .heavy { font: bold 11px sans-serif; } ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "text", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "text", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "text", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "select", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AvisualizerMainViewComponent_Template_select_change_16_listener($event) { return ctx.selectViewHandler($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "option", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "System View");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "option", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Package View");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Class View");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](24, "system-view", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](25, "package-view", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](26, "class-view", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](28, "schema-table");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.initialViewName);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", ctx.isSVHidden);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", ctx.isPVHidden);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("hidden", ctx.isCVHidden);
    } }, directives: [_system_view_system_view_component__WEBPACK_IMPORTED_MODULE_3__["SystemViewComponent"], _package_view_package_view_component__WEBPACK_IMPORTED_MODULE_4__["PackageViewComponent"], _class_view_class_view_component__WEBPACK_IMPORTED_MODULE_5__["ClassViewComponent"], _schema_table_schema_table_component__WEBPACK_IMPORTED_MODULE_6__["SchemaTableComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF2aXN1YWxpemVyLW1haW4tdmlldy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFHNUIsYUFBYTtBQUNiLDBDQUEwQztBQUMxQyxJQUFJO0FBQ0osMkJBQTJCO0FBQzNCLDhCQUE4QjtBQUM5QiwyQkFBMkI7QUFDM0Isa0NBQWtDO0FBQ2xDLGtDQUFrQztBQUNsQyw4QkFBOEI7QUFDOUIsSUFBSSIsImZpbGUiOiJhdmlzdWFsaXplci1tYWluLXZpZXcuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qISpIMSB7ZGlzcGxheTogaW5saW5lO30qISovXHJcbi8qISpIMiB7ZGlzcGxheTogaW5saW5lO30qISovXHJcblxyXG5cclxuLyouYmxpbmtpbmd7Ki9cclxuLyogIGFuaW1hdGlvbjpibGlua2luZ1RleHQgMS4ycyBpbmZpbml0ZTsqL1xyXG4vKn0qL1xyXG4vKkBrZXlmcmFtZXMgYmxpbmtpbmdUZXh0eyovXHJcbi8qICAwJXsgICAgIGNvbG9yOiAjMDAwOyAgICB9Ki9cclxuLyogIDQ5JXsgICAgY29sb3I6ICMwMDA7IH0qL1xyXG4vKiAgNjAleyAgICBjb2xvcjogdHJhbnNwYXJlbnQ7IH0qL1xyXG4vKiAgOTkleyAgICBjb2xvcjp0cmFuc3BhcmVudDsgIH0qL1xyXG4vKiAgMTAwJXsgICBjb2xvcjogIzAwMDsgICAgfSovXHJcbi8qfSovXHJcbiJdfQ== */"] });


/***/ }),

/***/ "xIn7":
/*!****************************************************!*\
  !*** ./src/app/class-view/class-view.component.ts ***!
  \****************************************************/
/*! exports provided: ClassViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassViewComponent", function() { return ClassViewComponent; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _utils_AnnotationSchemas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/AnnotationSchemas */ "S3CC");
/* harmony import */ var _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/CircleUtils */ "e/6K");
/* harmony import */ var _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/SVGUtils */ "tOky");
/* harmony import */ var _utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/ZoomUtils */ "N8JQ");
/* harmony import */ var _utils_NavUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/NavUtils */ "Vixg");
/* harmony import */ var _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/HeaderUtils */ "76FL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");








class ClassViewComponent {
    constructor() {
        this.width = 960;
        this.height = 960;
        this.zoomProp = {};
        this.zoomProp_locad = {};
    }
    ngOnInit() {
        // read data from JSON
        d3__WEBPACK_IMPORTED_MODULE_0__["json"]('./assets/SpaceWeatherTSI-CV.json').then(data => this.readPackageView(data, 0, ""))
            .catch(error => console.log(error));
        //  d3.json("./assets/guj/Guj-CV.json").then(data => this.readPackageView(data as any[]))
        //   .catch(error => console.log(error));
        // d3.json('./assets/geostore/Geostore-CV.json').then(data => this.readPackageView(data as any[]))
        //  .catch(error => console.log(error));
        // d3.json("./assets/shopizer/Shopizer-CV.json").then(data => this.readPackageView(data as any[]))
        //  .catch(error => console.log(error));
    }
    readPackageView(data, metric, lastSelected) {
        // For class view use the AA metric
        this.root = d3__WEBPACK_IMPORTED_MODULE_0__["hierarchy"](data);
        // this.root.descendants().forEach(d => {
        //
        //     d.data.value = d.data.value + 1; // adding 1 to each AA, to avoid 0
        // });
        console.log(metric);
        if (metric == 0) {
            var newMetric = "aa";
            this.root.sum(d => { d.value; if (d.type == 'annotation') {
                d.value = (parseInt(d.properties.aa) + 1);
            }
            else if (Number.isNaN(d.value)) {
                d.value = 0;
            } })
                .sort((a, b) => { b.value - a.value; });
            this.root.sum(d => d.value);
        }
        else if (metric == 1) {
            var newMetric = "anl";
            this.root.sum(d => { d.value; if (d.type == 'annotation') {
                d.value = (parseInt(d.properties.anl) + 1);
            }
            else if (Number.isNaN(d.value)) {
                d.value = 0;
            } })
                .sort((a, b) => { b.value - a.value; });
            this.root.sum(d => d.value);
        }
        else {
            var newMetric = "locad";
            this.root.sum(d => { d.value; if (d.type == 'annotation') {
                d.value = (parseInt(d.properties.locad) + 1);
            }
            else if (Number.isNaN(d.value)) {
                d.value = 0;
            } })
                .sort((a, b) => { b.value - a.value; });
            this.root.sum(d => d.value);
        }
        const pack = d3__WEBPACK_IMPORTED_MODULE_0__["pack"]()
            .size([this.width - 2, this.height - 10])
            .padding(3);
        pack(this.root);
        this.zoomProp.focus = this.root;
        // Fetch Annotations Schemas
        const anot = new _utils_AnnotationSchemas__WEBPACK_IMPORTED_MODULE_1__["AnnotationSchemas"](this.root, 'class');
        this.schemasMap = anot.getSchemasColorMap();
        // Create the SVG
        this.svg = _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].createSvg('.svg-container-cv', this.width, this.height, 'classe');
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.svg-container-cv').attr('lastSelected', lastSelected);
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.svg-container-cv').attr('rootName', this.root.data.name);
        // Create the nodes
        this.node = _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].createNode(this.svg, this.root);
        // Initial Zoom
        _utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__["ZoomUtils"].zoomTo([this.root.x, this.root.y, this.root.r * 2], this.svg, this.zoomProp, this.node);
        // Color all circles
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('circle').attr('stroke', d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].addCircleStroke(d))
            .attr('stroke-dasharray', d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].addCircleDashArray(d))
            // .attr("fill", d => CircleUtils.colorCircles(d,this.schemasMap));
            .attr('fill', d => _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].colorCircles(d, this.schemasMap));
        // Apply zoom to all circles in this specific view
        this.svg.selectAll('circle')
            .on('click', (event, d) => {
            //console.log("aa?")
            if (d.data.type == 'class' || d.data.type == 'interface') {
                this.zoomProp.focus !== d && (_utils_ZoomUtils__WEBPACK_IMPORTED_MODULE_4__["ZoomUtils"].zoom(event, d, this.zoomProp, this.svg, this.node), event.stopPropagation(), _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].setFocus(String(d.data.name), '.svg-container-cv'));
                _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].highlightNode('.svg-container-cv', d.data.name);
                d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.svg-container-pv').attr('lastSelected', d.parent.data.name);
                // d3.select(".svg-container-sv").attr("lastSelected",d.parent.data.name);
            }
            else if (d.data.type == 'method' || d.data.type == 'field') {
                _utils_CircleUtils__WEBPACK_IMPORTED_MODULE_2__["CircleUtils"].highlightNode('.svg-container-cv', d.data.name);
                if (d.data.type == 'method') {
                    _utils_NavUtils__WEBPACK_IMPORTED_MODULE_5__["NavUtils"].updateSelectBoxText('methodList', d.data.name);
                }
                else {
                    _utils_NavUtils__WEBPACK_IMPORTED_MODULE_5__["NavUtils"].updateSelectBoxText('fieldList', d.data.name);
                }
            }
            else if (d.data.type == 'package') {
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_5__["NavUtils"].updateSelectBoxText("SelectViewBox", "packageView");
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].showView('class-view', 'package-view');
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_5__["NavUtils"].resetBox('methodList', 'methods', 'Select Method', 'select method');
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_5__["NavUtils"].resetBox('fieldList', 'fields', 'Select Field', 'select field');
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_5__["NavUtils"].refreshBox('classList', 'classes', 'Select Class', 'select class', d.data.name, '.svg-container-pv', '');
                _utils_NavUtils__WEBPACK_IMPORTED_MODULE_5__["NavUtils"].refreshBox('interfaceList', 'interfaces', 'Select Interface', 'select interface', d.data.name, '.svg-container-pv', 'interface');
                // HeaderUtils.setPackageViewHeader("Package",d.data.name,this.root.data.name);
                _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_6__["HeaderUtils"].headerUpdate('Packge View', d.data.name);
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].resetView('.svg-container-cv');
                d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.svg-container-pv').attr('lastSelected', d.data.name);
                d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.svg-container-pv').selectAll('circle').each(function (d, i) {
                    if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name') == d3__WEBPACK_IMPORTED_MODULE_0__["select"]('.svg-container-pv').attr('lastSelected')) {
                        d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).dispatch('click');
                    }
                });
            }
        })
            .on('mouseover', (event, d) => {
            _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].createPopUp(d, this.svg, event);
            var name = d.data.properties.schema;
            d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-cv").selectAll("circle").each(function (d, i) {
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("schema") == name) {
                    var color = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("fill");
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"]("tbody").selectAll("td").each(function (d, i) {
                        if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("class") == "td-schema" && d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name") == name) {
                            d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("color", color);
                        }
                    });
                }
            });
        })
            .on('mouseout', (event, d) => {
            _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].destroyPopUp(this.svg);
            var name = d.data.properties.schema;
            d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-cv").selectAll("circle").each(function (d, i) {
                if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("schema") == name) {
                    var color = d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("fill");
                    d3__WEBPACK_IMPORTED_MODULE_0__["select"]("tbody").selectAll("td").each(function (d, i) {
                        if (d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("class") == "td-schema" && d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr("name") == name) {
                            d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).style("color", "black");
                        }
                    });
                }
            });
        })
            .on('mousemove', (event, d) => _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].movePopUp(d, this.svg, event))
            .on('contextmenu', function (event) {
            event.preventDefault();
            // react on right-clicking
        });
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-cv").selectAll('circle').each(function (d, i) {
            if (String(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name')) == lastSelected) {
                console.log(d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).attr('name'));
                d3__WEBPACK_IMPORTED_MODULE_0__["select"](this).dispatch('click');
                _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].setFocus(lastSelected, ".svg-container-cv");
                return this;
            }
        });
        _utils_SVGUtils__WEBPACK_IMPORTED_MODULE_3__["SVGUtils"].hide(".svg-container-cv", lastSelected);
    }
    updateView(metric) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-cv").selectAll("*").remove();
        console.log(d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-cv").attr("lastSelected"));
        d3__WEBPACK_IMPORTED_MODULE_0__["json"]('./assets/SpaceWeatherTSI-CV.json').then(data => this.readPackageView(data, metric, d3__WEBPACK_IMPORTED_MODULE_0__["select"](".svg-container-cv").attr("lastSelected")))
            .catch(error => console.log(error));
        if (metric == 0) {
            _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_6__["HeaderUtils"].metricInfoUpdate("aa");
        }
        else if (metric == 1) {
            _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_6__["HeaderUtils"].metricInfoUpdate("anl");
        }
        else {
            _utils_HeaderUtils__WEBPACK_IMPORTED_MODULE_6__["HeaderUtils"].metricInfoUpdate("locad");
        }
    }
}
ClassViewComponent.ɵfac = function ClassViewComponent_Factory(t) { return new (t || ClassViewComponent)(); };
ClassViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: ClassViewComponent, selectors: [["class-view"]], decls: 7, vars: 0, consts: [[3, "click"], [1, "svg-container-cv"]], template: function ClassViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ClassViewComponent_Template_button_click_0_listener() { return ctx.updateView(0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "AA");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ClassViewComponent_Template_button_click_2_listener() { return ctx.updateView(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "ANL");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ClassViewComponent_Template_button_click_4_listener() { return ctx.updateView(2); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5, "LOCAD");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "div", 1);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjbGFzcy12aWV3LmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map