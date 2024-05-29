// import React, { useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// const App = () => {
//     const [editorData, setEditorData] = useState("<p>Hello from CKEditor&nbsp;5!</p>");

//     const handleEditorChange = (event, editor) => {
//         const data = editor.getData();
//         setEditorData(data);
//     };



//     return (
//         <div className="App">
//             <h2>Using CKEditor&nbsp;5 build in React</h2>
//             <CKEditor
//                 editor={ClassicEditor}
//                 data={editorData}
//                 onReady={editor => {
//                     // You can store the "editor" and use when it is needed.
//                 }}
//                 onChange={handleEditorChange}
//                 onBlur={(event, editor) => {
//                 }}
//                 onFocus={(event, editor) => {
//                 }}
//                 config={{
//                     ckfinder: {
//                         uploadUrl: 'your-upload-url'
//                     },
//                     // Add more plugins here
//                     toolbar: [
//                         'heading',
//                         '|',
//                         'bold',
//                         'italic',
//                         'link',
//                         'bulletedList',
//                         'numberedList',
//                         '|',
//                         'indent',
//                         'outdent',
//                         '|',
//                         'blockQuote',
//                         'insertTable',
//                         'mediaEmbed',
//                         'undo',
//                         'redo',
//                         '|',
//                         'alignment',
//                         'fontBackgroundColor',
//                         'fontColor',
//                         'fontSize',
//                         'fontFamily',
//                         'highlight',
//                         'horizontalLine',
//                         'removeFormat',
//                         'specialCharacters',
//                         'subscript',
//                         'superscript',
//                         'underline',
//                         '|',
//                         'imageInsert',
//                         'imageUpload',
//                         'MathType',
//                         'ChemType',
//                         'htmlEmbed',
//                         '|',
//                         'codeBlock',
//                         'code',
//                         'exportPdf',
//                         'insertFile',
//                         'todoList'
//                     ],
//                     image: {
//                         toolbar: [
//                             'imageTextAlternative',
//                             '|',
//                             'imageStyle:alignLeft',
//                             'imageStyle:full',
//                             'imageStyle:alignRight'
//                         ],
//                         styles: [
//                             'full',
//                             'alignLeft',
//                             'alignRight'
//                         ],
//                         resizeOptions: [
//                             {
//                                 name: 'resizeImage:original',
//                                 label: 'Original',
//                                 value: null
//                             },
//                             {
//                                 name: 'resizeImage:50',
//                                 label: '50%',
//                                 value: '50'
//                             },
//                             {
//                                 name: 'resizeImage:75',
//                                 label: '75%',
//                                 value: '75'
//                             }
//                         ],
//                         toolbar: [
//                             'imageStyle:alignLeft',
//                             'imageStyle:full',
//                             'imageStyle:alignRight',
//                             '|',
//                             'resizeImage',
//                             '|',
//                             'imageTextAlternative'
//                         ]
//                     },
//                     table: {
//                         contentToolbar: [
//                             'tableColumn',
//                             'tableRow',
//                             'mergeTableCells'
//                         ]
//                     }
//                 }}
//             />
//         </div>
//     );
// }

// export default App;

import React from 'react';
import { CKEditor } from 'ckeditor4-react';

function App() {
    const [data, setData] = React.useState(``);
    return (
        <div>
            <CKEditor
                //   config={ckeditorConfig}
                onChange={(event) => {
                    setData(event.editor.getData());
                }}
                initData={data}
                // data={data} // Provide initial data to the CKEditor component
            />
        </div>
    );
}

export default App;
