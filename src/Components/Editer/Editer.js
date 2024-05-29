import React, { useEffect } from 'react';
import { CKEditor } from 'ckeditor4-react';

function App({ SetDescription, Description }) {

    return (
        <div>
            <CKEditor
                initData={Description} 
                onChange={(event) => {
                    SetDescription(event.editor.getData());
                }}
                activeClass="editor"
            />
        </div>
    );
}

export default App;
