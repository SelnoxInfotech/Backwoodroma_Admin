import React, { useEffect } from 'react';
import { CKEditor } from 'ckeditor4-react';

function App({ SetDescription, Description }) {

    return (
        <div>
            <CKEditor
                initData={Description} // Provide initial data to the CKEditor component
                onChange={(event) => {
                    SetDescription(event.editor.getData());
                }}
                //    debug={true}
                activeClass="editor"
                // config={{
                //     extraPlugins: 'autogrow,clipboard,lineutils,widget,dialog', // Add other plugins as needed
                //     height: 300,
                //     toolbar: [
                //         { name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates'] },
                //         { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
                //         { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker'] },
                //         { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
                //         '/',
                //         { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
                //         { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
                //         { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
                //         { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
                //         '/',
                //         { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                //         { name: 'colors', items: ['TextColor', 'BGColor'] },
                //         { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
                //         { name: 'about', items: ['About'] }
                //     ]
                // }}
            />
        </div>
    );
}

export default App;
