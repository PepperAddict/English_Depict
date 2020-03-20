webpackHotUpdate(0,{

/***/ 368:
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
const react_dom_1 = __importDefault(__webpack_require__(374));
const apollo_boost_1 = __importStar(__webpack_require__(380));
const react_apollo_1 = __webpack_require__(423);
const react_router_dom_1 = __webpack_require__(436);
const Context_1 = __webpack_require__(455);
const client = new apollo_boost_1.default({
    uri: '/graphql',
    cache: new apollo_boost_1.InMemoryCache({
        freezeResults: true
    }),
});
// components
const Welcome_1 = __importDefault(__webpack_require__(456));
const Login_1 = __importDefault(__webpack_require__(487));
const Register_1 = __importDefault(__webpack_require__(720));
const Dashboard_1 = __importDefault(__webpack_require__(722));
const RegWithClient = react_apollo_1.withApollo(Register_1.default);
const StudentLogin_1 = __importDefault(__webpack_require__(894));
const studentDashboard_1 = __importDefault(__webpack_require__(921));
const Verify_1 = __importDefault(__webpack_require__(960));
const IndividualTask_1 = __importDefault(__webpack_require__(962));
function App() {
    const [teacherid, setValue] = react_1.useState('testing if this works');
    const [studentid, setStudentID] = react_1.useState(null);
    return (react_1.default.createElement(react_apollo_1.ApolloProvider, { client: client },
        react_1.default.createElement(Context_1.MyContext.Provider, { value: { teacherid, setValue: e => { setValue(e); } } },
            react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(react_1.Fragment, null,
                    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/" },
                        react_1.default.createElement(Welcome_1.default, null)),
                    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/login" },
                        react_1.default.createElement(Login_1.default, null)),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/dashboard/:page?" },
                        react_1.default.createElement(Dashboard_1.default, null)),
                    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/register" },
                        react_1.default.createElement(RegWithClient, null)),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/student_login" },
                        react_1.default.createElement(StudentLogin_1.default, null)),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/student/:page?" },
                        react_1.default.createElement(studentDashboard_1.default, null)),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/verify" },
                        react_1.default.createElement(Verify_1.default, null)),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/todo/:page?" },
                        react_1.default.createElement(IndividualTask_1.default, null)))))));
}
;
react_dom_1.default.render(react_1.default.createElement(App, null), document.getElementById('app'));
// if (module.hot) {
//   module.hot.accept();
// }


/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584727343590
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584727343589
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 722:
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
const react_hooks_1 = __webpack_require__(426);
const helpers_1 = __webpack_require__(491);
const query_1 = __webpack_require__(488);
const AddStudent_1 = __importDefault(__webpack_require__(723));
__webpack_require__(725);
__webpack_require__(726);
__webpack_require__(727);
const DashboardSidebar_1 = __importDefault(__webpack_require__(728));
const IndividualStudent_1 = __importDefault(__webpack_require__(734));
const StudentCard_1 = __importDefault(__webpack_require__(870));
const TeacherTasks_1 = __importDefault(__webpack_require__(871));
const Settings_1 = __importDefault(__webpack_require__(891));
function Dashboard() {
    const userId = parseInt(helpers_1.cookieParser('userID', true));
    const { loading, error, data } = react_hooks_1.useQuery(query_1.getUserByID, { variables: { userId: userId } });
    const [info, setInfo] = react_1.useState('');
    const [student_id, setStudent_id] = react_1.useState(null);
    react_1.useEffect(() => {
        let pathname = window.location.pathname;
        switch (true) {
            case pathname.includes('add_student'):
                setInfo({
                    buttonAdd: true
                });
                break;
            case pathname.includes('student_posts'):
                setInfo({
                    posts: true
                });
                break;
            case pathname.includes('settings'):
                setInfo({
                    settings: true
                });
                break;
            case pathname.includes('student-info'):
                setInfo({
                    student: true
                });
                break;
            case pathname.includes('task'):
                setInfo({
                    task: true
                });
                break;
        }
    }, []);
    return (react_1.default.createElement("div", { className: "dashboard-container" },
        react_1.default.createElement("div", { className: "dashboard-sidebar" }, data && react_1.default.createElement(DashboardSidebar_1.default, { username: data.getUser.username, email: data.getUser.email })),
        loading ? react_1.default.createElement("p", null, "loading") : error ? react_1.default.createElement("p", null, error.message) : (react_1.default.createElement("div", { className: "dashboard-content" },
            !data.getUser.verified && react_1.default.createElement("div", { className: "top-banner" }, "Please verify your account"),
            info.buttonAdd ? (react_1.default.createElement("div", null,
                " ",
                data.getUser.students.length > 0 ?
                    (react_1.default.createElement("div", null,
                        react_1.default.createElement(StudentCard_1.default, { data: data.getUser, userId: userId, setStudentID: setStudent_id, students: data.getUser.students }),
                        react_1.default.createElement(AddStudent_1.default, null))) : (react_1.default.createElement(AddStudent_1.default, null)),
                " ")) :
                info.settings ? (react_1.default.createElement(Settings_1.default, { userId: userId })) :
                    info.task ? react_1.default.createElement(TeacherTasks_1.default, { students: data.getUser.students, teacher_data: data.getUser }) :
                        info.student ? (react_1.default.createElement(IndividualStudent_1.default, { teacher_id: userId, student_id: student_id, data: data.getUser })) : (react_1.default.createElement("div", null, data.getUser.students.length > 0 ? (react_1.default.createElement(StudentCard_1.default, { students: data.getUser.students, data: data.getUser, userId: userId, setStudentID: setStudent_id })) : (react_1.default.createElement(AddStudent_1.default, null))))))));
}
exports.default = Dashboard;


/***/ }),

/***/ 724:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584727337899
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 725:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584727343587
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 726:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584727337856
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584727343588
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 868:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584727337995
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 888:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584727337857
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 895:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584727337855
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 923:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584727337858
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 927:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584727337859
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 957:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584727337853
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 961:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1584727337855
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ })

})
//# sourceMappingURL=hot-update.js.map