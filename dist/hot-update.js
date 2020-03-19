webpackHotUpdate(0,{

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584573773744
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584573773744
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 724:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584573773740
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 725:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584573773741
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 726:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584573773737
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584573773743
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 868:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584573773740
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 871:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
The teacher side of creating the task for the students
so far image clue
*/
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(__webpack_require__(369));
const Teacher_Image_Clue_1 = __importDefault(__webpack_require__(872));
const ShowTaskList_1 = __importDefault(__webpack_require__(890));
function Tasks(props) {
    const [students] = react_1.useState(props.students);
    const [task, setTask] = react_1.useState('task');
    react_1.useEffect(() => {
        let pathname = window.location.pathname;
        switch (true) {
            case pathname.includes('image-clue'):
                setTask('image-clue');
                break;
            case pathname.includes('WOTD'):
                setTask('wotd');
                break;
        }
    }, []);
    return (react_1.default.createElement(react_1.Fragment, null, task === 'task' ?
        react_1.default.createElement("div", null,
            "Which task would you like to make?",
            react_1.default.createElement("nav", null,
                react_1.default.createElement("a", { href: "/dashboard/task=image-clue" }, "Image Clue")),
            react_1.default.createElement("h2", null, "All Tasks"),
            react_1.default.createElement(ShowTaskList_1.default, { students: props.teacher_data.students })) : task === 'image-clue' ?
        react_1.default.createElement(Teacher_Image_Clue_1.default, { teacher_data: props.teacher_data, students: students }) : null));
}
exports.default = Tasks;


/***/ }),

/***/ 888:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584573773732
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 890:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
To show a list of tasks:
* Image Clue / Image Caption
Sort by date
*/
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(__webpack_require__(369));
const moment_1 = __importDefault(__webpack_require__(737));
function TaskInfo(props) {
    const [taskType] = react_1.useState(props.what);
    return (react_1.default.createElement(react_1.Fragment, null, taskType === 'CIC' &&
        react_1.default.createElement("img", { src: props.entry.clue_image.urls.thumb, alt: props.entry.clue_image.alt_description })));
}
function Tasks(props) {
    console.log(props.task);
    return (react_1.default.createElement(react_1.Fragment, null, props.task.map((task, key) => {
        if (!task.accepted) {
            return (react_1.default.createElement("div", { key: key, className: "individual-task" },
                react_1.default.createElement("h3", null, moment_1.default(new Date(task.task_date)).format('dddd, MMMM D')),
                react_1.default.createElement("p", null,
                    "student: ",
                    props.student_name),
                react_1.default.createElement(TaskInfo, { what: task.task_code, entry: task.entry }),
                task.completed_at && 'completed on ' + moment_1.default(new Date(task.completed_at)).format('dddd, MMMM D'),
                react_1.default.createElement("p", null, !task.accepted ? 'Awaiting approval' : 'Not Completed Yet')));
        }
    })));
}
function TaskList(props) {
    const [students] = react_1.useState(props.students);
    return (react_1.default.createElement("div", { className: "task-container" }, students.map((student, key) => {
        return react_1.default.createElement(Tasks, { key: key, task: student.tasks, student_name: student.name });
    })));
}
exports.default = TaskList;


/***/ }),

/***/ 895:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584573773735
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 923:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584573773738
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 927:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584573773739
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 957:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584573773734
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 961:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584573773733
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ })

})
//# sourceMappingURL=hot-update.js.map