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
const StudentLogin_1 = __importDefault(__webpack_require__(895));
const studentDashboard_1 = __importDefault(__webpack_require__(922));
const Verify_1 = __importDefault(__webpack_require__(961));
const IndividualTask_1 = __importDefault(__webpack_require__(963));
const vocab_1 = __webpack_require__(967);
function App() {
    const [vocabulary, setVocabulary] = react_1.useState(null);
    const [def, setDef] = react_1.useState(null);
    const [listWords, setwords] = react_1.useState(null);
    const vocabLookup = e => {
        setVocabulary(e);
        const definition = vocab_1.vocab(e);
        setDef(definition);
    };
    const spellCheck = e => {
        const list = vocab_1.listCheck(e);
        setVocabulary(e);
        setwords(list);
    };
    return (react_1.default.createElement(react_apollo_1.ApolloProvider, { client: client },
        react_1.default.createElement(Context_1.MyContext.Provider, { value: {
                vocabulary,
                def,
                setVocabulary: e => setVocabulary(e),
                lookUp: e => vocabLookup(e),
                spellCheck: e => spellCheck(e),
                listWords
            } },
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
      // 1585087541966
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585087541965
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 724:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585087537078
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 725:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585087541964
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 726:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585087536245
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585087541967
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 870:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585087536739
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 890:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585087536290
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 896:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585087536246
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 922:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const id = parseInt(helpers_1.cookieParser('student_id', true));
const query_1 = __webpack_require__(488);
const AddBlog_1 = __importDefault(__webpack_require__(923));
const ViewBlogs_1 = __importDefault(__webpack_require__(925));
const Vocabulary_1 = __importDefault(__webpack_require__(926));
const VocabBucket_1 = __importDefault(__webpack_require__(927));
const StudentSettings_1 = __importDefault(__webpack_require__(929));
const EditBlog_1 = __importDefault(__webpack_require__(956));
const Comments_1 = __importDefault(__webpack_require__(957));
__webpack_require__(958);
const moment_1 = __importDefault(__webpack_require__(739));
const Student_DashboardSidebar_1 = __importDefault(__webpack_require__(959));
const StudentTasks_1 = __importDefault(__webpack_require__(960));
const defaultImage = __webpack_require__(871);
function StudentDashboard() {
    const todaysdate = moment_1.default();
    const currentDate = todaysdate.format('dddd, MMMM Do YYYY');
    const [dupeWordt, setDupeWord] = react_1.useState('');
    const { loading, error, data } = react_hooks_1.useQuery(query_1.getStudentInfo, { variables: { student_id: id } });
    const student = data ? data.getStudentByID[0] : false;
    const [dashboard, setDashboard] = react_1.useState({
        options: 'welcome',
        newVocab: new Array()
    });
    const [specialDay, setSpecialDay] = react_1.useState(null);
    const [specialDayMessage, setSpecialDayMessage] = react_1.useState(null);
    react_1.useEffect(() => {
        //Special Day 
        var eventdate = moment_1.default('2020-4-12', "YYYY-MM-DD");
        setSpecialDay(eventdate.diff(todaysdate, 'days'));
        setSpecialDayMessage(" Days until Easter!");
        let pathname = window.location.pathname;
        switch (true) {
            case pathname.includes('add_blog'):
                setDashboard(Object.assign(Object.assign({}, dashboard), { options: 'addblog' }));
                break;
            case pathname.includes('blogs'):
                setDashboard(Object.assign(Object.assign({}, dashboard), { options: 'blogs' }));
                break;
            case pathname.includes('settings'):
                setDashboard(Object.assign(Object.assign({}, dashboard), { options: 'settings' }));
                break;
            case pathname.includes('edit-blog'):
                setDashboard(Object.assign(Object.assign({}, dashboard), { options: 'edit-blog' }));
                break;
            case pathname.includes('view-comments'):
                setDashboard(Object.assign(Object.assign({}, dashboard), { options: 'view-comments' }));
                break;
            default:
                setDashboard(Object.assign(Object.assign({}, dashboard), { options: 'welcome' }));
        }
    }, []);
    const addVocabulary = (word) => __awaiter(this, void 0, void 0, function* () {
        var regex = /[.,():;\s]/g;
        var resultfirst = word ? word.replace(regex, '') : false;
        var result = word ? resultfirst.charAt(0).toUpperCase() + resultfirst.slice(1) : false;
        yield fetch(`https://www.dictionaryapi.com/api/v3/references/sd2/json/${result}?key=${"d91a24cc-9957-4c9b-80b8-b519d2016477"}`)
            .then((res) => {
            return res.json();
        }).then((e) => {
            setDashboard(Object.assign(Object.assign({}, dashboard), { vocabulary: result, definition: e[0].shortdef }));
        }).catch(() => console.log());
    });
    const showVocab = word => {
        setDashboard(Object.assign(Object.assign({}, dashboard), { newVocab: [...dashboard.newVocab, word] }));
    };
    const dupeWord = word => {
        setDupeWord(word);
    };
    const logout = () => {
        clearCookies('student_id');
        clearCookies('student_key');
        location.replace('/');
    };
    const clearCookies = (keyName = null) => {
        let expireDate = new Date();
        expireDate.setTime(expireDate.getTime() - 1);
        if (keyName) {
            document.cookie = `${keyName}=; expires=${expireDate.toUTCString()};Path=/;`;
        }
        else {
            const cookies = document.cookie.split(';');
            cookies.forEach((value) => {
                document.cookie = value.replace(/^ +/, '').replace(/=.*/, '=;expires=' + expireDate.toUTCString());
            });
        }
    };
    return (react_1.default.createElement("div", { className: "student-container" },
        react_1.default.createElement("div", { className: "sidebar" },
            react_1.default.createElement(Student_DashboardSidebar_1.default, null),
            react_1.default.createElement("button", { type: "button", onClick: logout }, "Logout")),
        loading ? 'loading' : error ? 'error' :
            data && dashboard.options === 'welcome' ? (react_1.default.createElement("div", { className: "welcome-hero" },
                " ",
                react_1.default.createElement("span", { className: "avatar" },
                    react_1.default.createElement("img", { className: "avatar-image", src: data.getStudentByID[0].avatar ? data.getStudentByID[0].avatar : defaultImage.src, alt: data.getStudentByID[0].name + ' avatar' })),
                react_1.default.createElement("h1", null,
                    "Welcome ",
                    react_1.default.createElement("strong", null, student.name ? student.name : student.username),
                    "!"),
                react_1.default.createElement("h2", null,
                    "Today is ",
                    react_1.default.createElement("strong", null, currentDate)),
                react_1.default.createElement("h2", { className: "holiday-theme" },
                    specialDay,
                    " ",
                    specialDayMessage),
                data.getStudentByID[0].message &&
                    react_1.default.createElement("h2", { className: "message" },
                        "\u275D",
                        data.getStudentByID[0].message,
                        "\u275E"),
                react_1.default.createElement(StudentTasks_1.default, { tasks: data.getStudentByID[0].tasks }))) :
                data && dashboard.options === 'addblog' ? react_1.default.createElement(AddBlog_1.default, { student_id: id, name: data.getStudentByID[0].name, username: data.getStudentByID[0].username }) :
                    data && dashboard.options === 'blogs' ? react_1.default.createElement(ViewBlogs_1.default, { student_id: id, addVocabulary: addVocabulary, blogs: data.getStudentByID[0].blogs }) :
                        data && dashboard.options === 'settings' ? react_1.default.createElement(StudentSettings_1.default, { student_id: id, avatar: data.getStudentByID[0].avatar, name: data.getStudentByID[0].name, username: data.getStudentByID[0].username }) :
                            data && dashboard.options === 'edit-blog' ? react_1.default.createElement(EditBlog_1.default, { student_id: id }) :
                                data && dashboard.options === 'view-comments' ? react_1.default.createElement(Comments_1.default, { addVocabulary: addVocabulary, student_id: id }) : null,
        react_1.default.createElement("div", { className: "student-vocabulary" },
            dashboard.vocabulary ?
                react_1.default.createElement(Vocabulary_1.default, { dupeWord: dupeWord, student_id: id, showVocab: showVocab, vocab: dashboard.vocabulary, allVocab: data.getStudentByID[0].vocabularies, definition: dashboard.definition, addVocabulary: addVocabulary }) : '',
            data ? react_1.default.createElement(VocabBucket_1.default, { teacher_id: data.getStudentByID[0].teacher_id, dupeWord: dupeWordt, student_id: id, showVocab: showVocab, vocab: data.getStudentByID[0].vocabularies, definition: dashboard.definition, addVocabulary: addVocabulary }) : '',
            dashboard.newVocab && dashboard.newVocab.map((word, key) => {
                return react_1.default.createElement("p", { className: "new-vocab", key: key },
                    " ",
                    word,
                    " ",
                    react_1.default.createElement("b", null, "New!"));
            }),
            " ")));
}
exports.default = StudentDashboard;


/***/ }),

/***/ 924:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585087537236
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 928:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585087537209
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 958:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585087536247
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 962:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585087536244
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ })

})
//# sourceMappingURL=hot-update.js.map