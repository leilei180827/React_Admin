import React, { useState, useImperativeHandle } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./rich_text_editor.less";
const RichTextEditor = React.forwardRef((props, ref) => {
  //convert html in props to editorstate
  const convertFromProps = (props) => {
    let initialState = EditorState.createEmpty();
    if (props.description) {
      const contentBlock = htmlToDraft(props.description);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        initialState = EditorState.createWithContent(contentState);
      }
    }
    return initialState;
  };
  const [editorState, setEditorState] = useState(() => {
    const initialState = convertFromProps(props);
    return initialState;
  });
  const onEditorStateChange = (currentEditorState) => {
    setEditorState(currentEditorState);
  };
  //forwardRef access component's state editorstate and convert to html
  useImperativeHandle(
    ref,
    () => ({
      getRichTextEditor: () => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()));
      },
    }),
    [editorState]
  );
  const options = [
    "inline",
    "blockType",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "embedded",
    "emoji",
    "remove",
    "history",
  ];
  return (
    <Editor
      editorState={editorState}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={onEditorStateChange}
      toolbar={options}
    />
  );
});
export default RichTextEditor;
//  {/* <textarea
//         disabled
//         value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//       /> */}
