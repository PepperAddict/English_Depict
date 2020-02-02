import React, {useState, Fragment} from 'react';

interface TheWordsProps {
  addVocabulary: any, 
  content: string,
  index: number
}

function TheWords(props: TheWordsProps) {
  const [newWord] = useState(props.content.split(' '));
  const handleMenu = (e) => {
    //send selected word to dashboard to figure out what to do with it
    if (props.addVocabulary) {
      props.addVocabulary(e.target.innerHTML);
    }
    
  };
  return (
    <Fragment>

      {newWord.map((word, key) => {
        return <span
          role="button"
          key={key}
          className="blog-content"
          tabIndex={key}
          onClick={handleMenu}
          onKeyDown={handleMenu}>
          {word}
        </span>;
      })}
    </Fragment>


  );
}

interface BlogContentProps {
  addVocabulary: any, 
  content: string,

}

export default function BlogContent(props: BlogContentProps) {

  let contentArray = props.content.split('\n');
  if (contentArray.length === 1) {
    props.content.split(' ');
  }


  return (
    <Fragment>

      {
        contentArray.map((content, index) => {
          return <p
            index={index}
            key={index}>
            <TheWords content={content} addVocabulary={props.addVocabulary} index={index} />
          </p>;
        })
      }
    </Fragment>



  );

}