import React from 'react';
import { CKEditor } from 'ckeditor4-react';

function App({SetDescription , Description}) {
  

    return (
        <div>
            <CKEditor
                //   config={ckeditorConfig}
                onChange={(event) => {
                    SetDescription(event.editor.getData());
                }}
                initData={Description}
                // data={data} // Provide initial data to the CKEditor component
            />
        </div>
    );
}

export default App;