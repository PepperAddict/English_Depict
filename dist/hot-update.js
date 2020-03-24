webpackHotUpdate(0,{

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585061084030
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585061084029
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 724:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585061084027
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 725:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585061084028
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 726:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585061084024
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585061084028
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 870:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585061084026
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 890:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585061084025
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 896:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585061084024
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 924:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585061084026
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 927:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
    const [addVocab, { data }] = react_hooks_1.useMutation(mutation_2.ADD_VOCABULARY);
    const [dupeWord, setDupeWord] = react_1.useState('');
    const submitVocabulary = (e, word) => {
        e.preventDefault();
        //before adding the word manually, let's capitalize the first letter
        if (word) {
            let formattedWord = word.charAt(0).toUpperCase() + word.slice(1);
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
        }
    };
    return (react_1.default.createElement("div", { className: "vocab-bucket" },
        react_1.default.createElement(Context_1.MyContext.Consumer, null, context => (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement("form", { onSubmit: e => submitVocabulary(e, context.vocabulary) },
                react_1.default.createElement("label", { htmlFor: "vocab" },
                    react_1.default.createElement("h2", null, "Vocabulary Bucket")),
                react_1.default.createElement("input", { id: "vocab", placeholder: "Add Word to Bucket", onChange: e => context.setVocabulary(e.target.value) }),
                react_1.default.createElement("button", { type: "submit", className: "submit-word" },
                    "submit ",
                    context.vocabulary ? context.vocabulary : 'word')),
            react_1.default.createElement("h3", null, "Vocabularies"),
            react_1.default.createElement("div", { className: "list-of-vocabularies" },
                props.vocab.map((wordt, key) => {
                    return react_1.default.createElement(ListBucket, { dupeWordt: props.dupeWord, dupeWord: dupeWord, word: wordt, key: key, index: key });
                }),
                context.def && (react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: "x-close", onClick: e => context.setVocabulary(null) }, "close"),
                    react_1.default.createElement("h3", null, context.vocabulary),
                    context.def && context.def.map((indi, key) => {
                        return react_1.default.createElement("span", { key: key },
                            indi[0],
                            " ",
                            react_1.default.createElement("p", null, indi[1]));
                    })))))))));
}
exports.default = VocabBucket;


/***/ }),

/***/ 928:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585061084276
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 958:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585061084023
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ 962:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1585061084022
      var cssReload = __webpack_require__(463)(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ })

})
//# sourceMappingURL=hot-update.js.map