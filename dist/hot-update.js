webpackHotUpdate(0,{

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585003855260
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585003855259
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 724:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585003855254
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 725:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585003855257
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 726:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585003855252
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585003855258
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 870:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585003855253
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 890:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585003855248
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 896:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585003855251
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 924:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585003855253
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 927:
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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(__webpack_require__(369));
const react_hooks_1 = __webpack_require__(426);
const mutation_1 = __webpack_require__(721);
const mutation_2 = __webpack_require__(721);
__webpack_require__(928);
const Context_1 = __webpack_require__(455);
function EachWord(props) {
    let defArray = props.def.split(' ');
    const addWord = e => {
        props.addVocabulary(e.target.innerHTML);
    };
    return (react_1.default.createElement("p", null, defArray.map((indi, key) => {
        return react_1.default.createElement("span", { key: key, name: indi, onClick: addWord }, indi);
    })));
}
function ListBucket(props) {
    //the individual words that are in the database
    const [removeVocab] = react_hooks_1.useMutation(mutation_1.REMOVE_VOCABULARY);
    const [word, addWord] = react_1.useState(props);
    const removeWord = (e) => {
        //when x is clicked have a confirmation message and then remove
        const yesOrNo = confirm(`Do you want to delete the word: ${word.word.vocabulary_word}?`);
        if (yesOrNo == true) {
            removeVocab({ variables: { vocab_id: e.target.name } }).then((e) => {
                location.reload();
            });
        }
    };
    return (react_1.default.createElement("div", { className: "section-word" },
        react_1.default.createElement(Context_1.MyContext.Consumer, null, context => (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement("p", { onClick: e => context.lookUp(word.word.vocabulary_word), className: props.dupeWord === word.word.vocabulary_word || props.dupeWordt === word.word.vocabulary_word ? 'vocabulary duped' : 'vocabulary' }, word.word.vocabulary_word),
            react_1.default.createElement("button", { className: "not-button", name: word.word.vocab_id, onClick: removeWord }, "\u00D7"))))));
}
function VocabBucket(props) {
    const [vocab, addVocabu] = react_1.useState(false);
    const [addVocab, { data }] = react_hooks_1.useMutation(mutation_2.ADD_VOCABULARY);
    const [dupeWord, setDupeWord] = react_1.useState('');
    const [showDict, setShowDict] = react_1.useState([]);
    const [show, setShow] = react_1.useState(false);
    const [selectedword, setselectedword] = react_1.useState(null);
    const submitVocabulary = e => {
        e.preventDefault();
        //before adding the word manually, let's capitalize the first letter
        let formattedWord = vocab.charAt(0).toUpperCase() + vocab.slice(1);
        let isMatch = false;
        if (props.vocab) {
            for (let x of props.vocab) {
                if (x.vocabulary_word === formattedWord) {
                    isMatch = true;
                    break;
                }
            }
            if (!isMatch) {
                //save to database if word doesn't already exist
                addVocab({
                    variables: {
                        input: {
                            student_id: props.student_id,
                            teacher_id: props.teacher_id,
                            vocabulary_word: formattedWord,
                        }
                    }
                }).then((e) => {
                    //then let's show it
                    props.showVocab(formattedWord);
                }).catch((err) => console.log(err));
            }
            else {
                setDupeWord(formattedWord);
            }
        }
    };
    const childDef = (e) => __awaiter(this, void 0, void 0, function* () {
        setselectedword(e);
        if (!show) {
            setShow(true);
        }
    });
    const closeit = e => {
        if (show) {
            setShow(false);
        }
        else {
            setShow(true);
        }
    };
    react_1.useEffect(() => {
        fetch(`https://www.dictionaryapi.com/api/v3/references/sd2/json/${selectedword}?key=${"d91a24cc-9957-4c9b-80b8-b519d2016477"}`)
            .then((res) => {
            return res.json();
        }).then((res) => {
            setShowDict(res);
        });
    }, [selectedword]);
    return (react_1.default.createElement("div", { className: "vocab-bucket" },
        react_1.default.createElement("form", { onSubmit: submitVocabulary },
            react_1.default.createElement("label", { htmlFor: "vocab" },
                react_1.default.createElement("h2", null, "Vocabulary Bucket")),
            react_1.default.createElement("input", { id: "vocab", placeholder: "Add Word to Bucket", onChange: e => addVocabu(e.target.value) }),
            react_1.default.createElement("button", { type: "submit", className: "submit-word" },
                "submit ",
                vocab ? vocab : 'word')),
        react_1.default.createElement("h3", null, "Vocabularies"),
        react_1.default.createElement("div", { className: "list-of-vocabularies" },
            props.vocab.map((wordt, key) => {
                return react_1.default.createElement(ListBucket, { dupeWordt: props.dupeWord, dupeWord: dupeWord, word: wordt, key: key, index: key, sendDef: childDef, closeit: closeit });
            }),
            react_1.default.createElement(Context_1.MyContext.Consumer, null, context => (context.vocabulary && (react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: "x-close", onClick: e => context.setVocabulary(null) }, "close"),
                context.def && context.def.map((indi, key) => {
                    return react_1.default.createElement("span", { key: key }, indi.shortdef.map((def, key) => react_1.default.createElement("p", null, def)));
                }))))))));
}
exports.default = VocabBucket;


/***/ }),

/***/ 928:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585003855741
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 958:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585003855250
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 962:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585003855249
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ })

})
//# sourceMappingURL=hot-update.js.map