webpackHotUpdate(0,{

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584726111887
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584726111887
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 724:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584726111884
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 725:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584726111885
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 726:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584726111881
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584726111886
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 734:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
const query_1 = __webpack_require__(488);
const IndieStudentBlog_1 = __importDefault(__webpack_require__(735));
const react_hooks_1 = __webpack_require__(426);
const mutation_1 = __webpack_require__(721);
__webpack_require__(868);
const noPic = __webpack_require__(869);
function StudentProfile(props) {
    const [updateMessage] = react_hooks_1.useMutation(mutation_1.UPDATE_MESSAGE);
    const [message, setMessage] = react_1.useState(props.data.message);
    const submitMessage = e => {
        e.preventDefault();
        updateMessage({ variables: { input: { student_id: props.student_id, message: message } } })
            .then(() => {
            location.reload();
        }).catch((err) => console.log(err));
    };
    return (react_1.default.createElement("div", { className: "individual-student" },
        react_1.default.createElement("div", { className: "avatar" },
            react_1.default.createElement("img", { className: "avatar-image", src: props.data.avatar ? props.data.avatar : noPic, alt: "Student's avatar" })),
        react_1.default.createElement("center", null,
            react_1.default.createElement("h1", null, props.data.name)),
        react_1.default.createElement("form", { onSubmit: submitMessage },
            react_1.default.createElement("label", { htmlFor: "message" },
                react_1.default.createElement("h2", null, "Welcome Message")),
            react_1.default.createElement("input", { id: "message", defaultValue: message ? message : 'enter a message for ' + props.data.name, onChange: e => setMessage(e.target.value) }),
            react_1.default.createElement("button", { type: "submit" }, "Submit Message")),
        react_1.default.createElement("h2", null, "Vocabulary Words"),
        react_1.default.createElement("ul", { className: "vocabulary-list" }, props.data.vocabularies.length > 0 ? props.data.vocabularies.map((words, key) => {
            return react_1.default.createElement("li", { key: words.vocab_id, index: key }, words.vocabulary_word);
        }) : 'No Vocabulary'),
        react_1.default.createElement("div", { className: "containers" }, props.data.tasks.map((task, index) => {
            if (!task.accepted) {
                return react_1.default.createElement("div", { key: index },
                    "Caption the image",
                    react_1.default.createElement("img", { src: task.entry.clue_image.urls.thumb, alt: task.entry.clue_image.alt_description }),
                    react_1.default.createElement("p", null, task.submission ? task.submission.CIC : 'not yet completed'));
            }
        })),
        react_1.default.createElement("h2", null, "Blogs"),
        props.data.blogs.length > 0 ? props.data.blogs.map((blog, key) => {
            return react_1.default.createElement(IndieStudentBlog_1.default, { key: key, blog_id: blog.blog_id, index: key, subject: blog.subject, content: blog.content, comments: blog.comments, teacher_id: props.teacher_id });
        }) : 'No Blog'));
}
function IndividualStudent(props) {
    const pathname = window.location.pathname.split('=');
    const student_id = pathname[pathname.length - 1];
    const [students] = react_1.useState(props.data.students);
    const [myStudent, setMyStudent] = react_1.useState(false);
    const { loading, error, data } = react_hooks_1.useQuery(query_1.getStudentInfo, { variables: { student_id } });
    if (data) {
        console.log(data);
    }
    react_1.useEffect(() => {
        //only show student information if student id is in teacher's student list 
        for (let x of students) {
            if (x.student_id === student_id) {
                setMyStudent(true);
                break;
            }
        }
    }, []);
    return (react_1.default.createElement(react_1.Fragment, null, loading ? react_1.default.createElement("p", null, "loading") : error ? react_1.default.createElement("p", null, "error") : myStudent && data ?
        react_1.default.createElement(StudentProfile, { data: data.getStudentByID[0], teacher_id: props.teacher_id, student_id: student_id }) : null));
}
exports.default = IndividualStudent;


/***/ }),

/***/ 868:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584726112167
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 888:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584726111877
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 895:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584726111880
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 923:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584726111882
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 927:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584726111884
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 957:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584726111879
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 961:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584726111878
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ })

})
//# sourceMappingURL=hot-update.js.map