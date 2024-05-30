import React, { useEffect } from 'react';
import { CKEditor } from 'ckeditor4-react';
import { FaTrashAlt } from "react-icons/fa";
function App({ SetDescription, Description }) {
    const addAccordionTemplate = (editor) => {
        const accordionTemplate = `
          <div class="accordion">
            <div class="accordion-item">
              <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('active');">
                Header 1
              </div>
              <div class="accordion-content">
                Content 1
              </div>
            </div>
            <div class="accordion-item">
              <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('active');">
                Header 2
              </div>
              <div class="accordion-content">
                Content 2
              </div>
            </div>
          </div>
        `;

        editor.insertHtml(accordionTemplate);
    };
    return (
        <div>
            <CKEditor
                initData={Description} 
                onChange={(event) => {
                    SetDescription(event.editor.getData());
                }}
                activeClass="editor"
                onInstanceReady={(evt) => {
                    const editor = evt.editor;
                    editor.ui.addButton('Accordion', {
                      label: 'Insert Accordion',
                      command: 'insertAccordion',
                      toolbar: 'insert',
                      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`
                    });
                    editor.addCommand('insertAccordion', {
                      exec: () => addAccordionTemplate(editor)
                    });
                  }}
                  config={{
                    extraPlugins: 'autogrow,clipboard,lineutils,widget,dialog',
                    toolbar: [
                        { name: 'insert', items: ['Accordion'] },
                        { name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates'] },
                        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
                        { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker'] },
                        { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
                        '/',
                        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
                        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
                        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
                        { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
                        '/',
                        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                        { name: 'colors', items: ['TextColor', 'BGColor'] },
                        { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
                        { name: 'about', items: ['About'] }
                    ]
                  }}
            />
            {/* <CKEditor
                initData={Description}
                onChange={(event) => {
                    SetDescription(event.editor.getData());
                }}
                onInstanceReady={(evt) => {
                    const editor = evt.editor;

                    // Add the Accordion button
                    editor.ui.addButton('Accordion', {
                        label: 'Insert Accordion',
                        command: 'insertAccordion',
                        toolbar: 'insert',
                        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`
                    });

                    // Define the command to insert the accordion template
                    editor.addCommand('insertAccordion', {
                        exec: () => addAccordionTemplate(editor)
                    });
                }}
                config={{
                    extraPlugins: 'divarea',
                    toolbar: [
                        { name: 'insert', items: ['Accordion'] },
                    ]
                }}
            /> */}


        </div>
    );
}

export default App;



// import React from 'react';
// import { CKEditor } from 'ckeditor4-react';

// function App({ SetDescription, Description }) {
//     const addAccordionTemplate = (editor) => {
//         const accordionTemplate = `
//           <div class="accordion">
//             <div class="accordion-item">
//               <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('active');">
//                 Header 1
//               </div>
//               <div class="accordion-content">
//                 Content 1
//               </div>
//             </div>
//             <div class="accordion-item">
//               <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('active');">
//                 Header 2
//               </div>
//               <div class="accordion-content">
//                 Content 2
//               </div>
//             </div>
//           </div>
//           <style>
//             .accordion-content { display: none; }
//             .accordion-content.active { display: block; }
//           </style>
//         `;

//         editor.insertHtml(accordionTemplate);
//     };

//     return (
//         <div>
//             <CKEditor
//                 initData={Description} 
//                 onChange={(event) => {
//                     SetDescription(event.editor.getData());
//                 }}
//                 activeClass="editor"
//                 onInstanceReady={(evt) => {
//                     const editor = evt.editor;

//                     // Add the Accordion button
//                     editor.ui.addButton('Accordion', {
//                       label: 'Insert Accordion',
//                       command: 'insertAccordion',
//                       toolbar: 'insert',
//                       icon: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBESEhERERIQEQ8REhEREQ8PDxERDw8PGBQZGRgUGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHxISHjQhISE0NDQ0NDQxPzQ0NDQ0NDQ0NDQ0NDQ4NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0PzE0NDQ0Pz80NP/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQMCBAcFCAb/xAA5EAACAQICBwcCBAUFAQAAAAAAAQIDEQQhBRIWUlSS0SIxQVFhcYEToSORscEGMnLh8EJic4KyFP/EABsBAQACAwEBAAAAAAAAAAAAAAAEBgIDBQEH/8QANhEAAQMBBgIHBgYDAAAAAAAAAAECAxEEBRIVUqEhYRMiMTJB0eEGFlFTgbEUI3GRwfAkQmL/2gAMAwEAAhEDEQA/AOMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyyDO66i3YcqNrRX0VWgqsIuMnqpamWu1lc5cF6JNIkaMpXmcGO/WvejejpXn6HABkfQOmadFYicadOEYx1ctVPvXejT1Fuw5Ue2i8+gkWNzOKcz2S/GxvVvR1pz9DhWQyO6akd2HKidRbsOVGnOW6NzX7wN+Xv6HCsiEd11I7sOVD6cd2HKj1t8NVaYN/Qybf7XKidHSvP0OFZGVj6olisDHDNv6X04ws1aOspW7rd97n4lRi1dKDTzTsnlYnWu0/hmo5W1r9Do262/hGNcra4udDhmQyO66i3YcqI1I7sOVEDOW6Nzme8Dfl7+hwvIZHddRbsOVEakd2HKhnLdG494G/L39DheQZ3Rwjuw5UX6J+l9aH1IpwUrtOKtbPNm+z3j070YjKV5kyx3mtrkSNsdOdfQ4GiWfSf8VSwzjD6caeve7cIxyj5O3+d5+dpqL/0w5EbrXa1sypVtfqSLfa3WREVWKqLzocOyGR3TUjuw5UTqLdhyohZy3Rucv3gb8vf0OFZDI7pqR3YcqGpHdhyoZy3RuPeBvy9/Q4XkLHdNSO7DlQ+nHxjBLVd3qrJHrb3RzkajO3mZNv5HORqR9vP0OFqwyPqmvofB/8AztqEElDWjVSWs3a6dz8T9OO7T5ES7XbPw6IqtrXmT7db1siIqsrXn6HDMhkd01I7sOVE6i3YcqIect0bnO94G/L39DhWRB3XUjuw5URKEUm9WGSb/kQS+EX/AEX9xn7fl7+hwsM+j8bDCxwtJqko1amrqvVzb73f4ueK4R3YcqJdstv4VyNc2tUr2m6e+WxKiYK1SvBfQ4XkDun047sOVEkPOW6NzT7wN+Xv6EkOVpU35TgwVYp2jfykn9zm2F2G0xr/ANJ90K5H3kN3ST/EhPxlFxfr4r9ygy0jP8OnPyt9jBO+Z1vaODBaGyJ/sm6HrmqiJUkAFeNYH9iQFB+bndzxkLvfS9Yz/uevomtr0ab8UlF/CR5clbGOPhUjUh73TsW/w7O0ZU34O35WL3fEfT3THJ4tRq7UUu97s6e6opPFqIu1D2yQQUQpAAJPT2lSqpLIrwrvVgvOSv6rvMqxRQnaU5bkJte9rL7tFhuuFEchfPZ6yIyi+PabeLqOdOnL/dOMvW71l+pRRkWt3hOO7Om18xt+yNak80TbyjRy8fFDqXxZ2vRUd4obiJMYmRU3twrQ+ZzR9G9WgkgGBqBp6VralGb8XFxXymbh4n8R1G4xgu+Ul90zo3VZ+ntkbF7K8fpxJ92wdNamM5/biZU8bV1sJRc5uEoqc4az1c5JxuvRI9g8KCvjLLupxhD2ske6jse1TkW0sRNNf3VV+x2PaiTFamp8G/dVJABVisAwrZrV3nq/D7/sZlad6tOPlm/nIn3ZD01rYzwrVfpxM404m7pOpnRg/BtpeVkapljZ3rpbsZfqiCd7Qura0T4NT+VDkVKIoABwjAgqxi/Dl7FxXiV2Jf0s2wLhlavNPuhkzvITra2F9Ve5Xg5Xpx9Ek/hEaNlelOHpcp0fKznHyba+1y4X/GklmxaFr9FJk7Ooim8CQUogkEkEAHgaQeriac/BTjd/LGHX08TVXcr63xkZacj2k/KV/wBTHFO1aE/CcI39y/2Z3S3cka+LVT+S+Wdelu1GL8D9ACvDyvFemX5FhQ3swOVq+BRntwuVASYmXgex942QJV5RXPOVTKp5ycYr2vd/+T0MS7RZ4yfaXvcs1gWh9IuJOFT1JztOsvOmmveGrL9LmNHwNevL8ZeTiov2cbfuW4J3XsSLatUJt6dzEehAE0wyrWjvHzS8E69QCQRjnGJ4OI/ExNKPetbWf9KbZ7deVov8jw8K71qk/CEJW9/Asvs5HSV0y+CULH7Ox/nLJ8CdFvWxFSXnN/qj3zwtBQzv5tnuIj+0L8Vs/REQjX8/Ha1XkZEAHCOKSa+j3rV3Ldvb4ZbVnaLfkmyjRWSnPzTLH7PRJjfLpSn1Ul2VlVEZ61eb8k190bJoYB3nN+n7o3yJfrsVudyRE2NU/fAAOOaQY1V2Zez/AEMiJrJ+0jJvBUU9TtNLRc/5l5owg9Sr6PIxwLtNonGLtpl7lpLG5mpp03cWUPRJMabvFPzRkUNUotDmKlAADw8PI0xC6l/ngzVxOdOlPxjkz0NJRvrey/c04rWotbrZcrtl/wAdv97ULjdkn+OiKelgJ5NeaT+TbPMwE8ovysj0iuXjHgmr8f4K5b48Mqgy8DEzIkfeNEC9c08a+zbzPJf8x6uN/wA+55c1mWWxLRp9IuWjYULMVLtX9I/ojawDzZo1c5X9jdweTN1pWrCXeLqwr+h6cSGSiGVi0LxPmttWrgSQQRznmrjp2VvJXZ5OHVqVae9kje0jPKT87pexqTjagl5suF1t6KGnitPMt10t6KIv0PCyX5/ZHsHm6NVtVf7eh6Jwb1fjtKr/AHtU4N5uxWhVAAOac81cfO0LeLdjKh2aUvVGtj5Xkl5F9Z2hb0LhdLOjsrf+lqdCzpRpVo1ZzZ6Bo6NWUn6o3iv3o7Ha3rzIk3fUEAHPNQDJIPQeVTyn8stxkb2ZVNWm/cvrK6+C4xS9Rq8jpNXqluBleFvI2jz8DKza8zfKxbmYJ3Injx/cgypRxJABENZpYxZv/jNLCrsyj7no4pZr2PPw6tKSLHYpKQU5IWK730ipyGD8Y+T/ACPXpSul5+PueTRVpv1PSw770RrxTEmL6kW8UqqqWmRiL5HIZ2nMh75p4nNmhOObPQqo1JRLDZnUafQ7tkwxoU2zNzDrM19Q26UTZM/gb7bL+XQ3ovIgmHcSV2ZaqfO7UvXoQY1JWTfoZFOIl3L5PIW4nohoibieiHl43O0fUjFrKETOqr1EY11eSRaIX4Won1LRA/Cw3sFHP/qbhq4VZv2RtFety1l+iFdta1lUENkleIlaL/IitbicjU8SMiVU87+abfhdl2Ll2UivDrO5OKfgXFjkYjW/BDootENjR67D9zbNbBLsfJsFVta4p3rzIMi1cpJABGNYIJIYB5+IjabLO9EYqPaJj3Fhgk/KaTWu4FVJ2kvc9FHnNZnoUnkiBeHFUcaZuPEyJIJOaaUNbELNGglaZ6GIXcac12jsWR9I0Tkdaxvo1DCStK5u03aS9cjWnE2I9yPZVxNp8TK0LiQ2jGTEXkJHJbwdQ5cXB6FFRGs4m3JFMonYgfwLhYZqNKlE2IIwUS6mjKZ/A2WyfqlsHkZmETI40veKbaFq9STVqO7fobEnkas+5m+ypxVTOzJxVTUjG8m/Ui15osihTj2jrJJwX9Dr40Rpt4dZv5Ngpw/iXHGtK1lU4toWsig1cbLKxtGlis5GVkbWVF+BhH3jCgsjGv3lsFkVSjmd3pO0lYjdw67KLTCkrJGZW5Vq9V5kN3aASQYGIAABq4mOZjAvrIqijpQSdShvYvArlE2KHcVtFlIwtDqtPHrVC4gkECppK6y7jVqRzNuoUVIk2B/VQmQPohW0WU1lYhRM4RM3SG17+BbBksxgjNohyd6pDctHVQwkiqSL5IqaJkL+B2bHN1TGMS6CK0i6KPZnmVrn4EIyIsSc9y1U4T3YlqYVO4oqF0yqaJUK0RDfFwRCpLIilHNljRMI95Jx8CSsnVoXUfEtK6XcZnPlWr1IEi1cpDNOazNuRr2N1mWi1DOBCWRgo5ljQhEmOko1TYrjZj3IkhEnKrVTQoAB4eAAAGM0VKJcyHE2Rvw8DJFoV2M4IlIySMnvqFUAA0mJjMwcSxoWM2uohm11CnVM4RJaMooyc+pk59SESLA1qtTWq1IZgZyMDdG6hMgkwoEWJmCRmhI6otEmJCSCQaCEYWMZwLGiJIzR5sRxTqmcYmSiTY2dIZq8QMiESanLVTSvaRIqaLSGj1jsJ6ilTRlCJlYySM3yVSh6qkgA0mAAAAAAAIJABFiSSAAAACSAACASAAAADFkWMhYyRxmjqEIImwPKniuqSADwxJMSQAQCQAQSAACLEgAixIAAAAAAABIOR7XaQ4mfLT6Da7SHEz5afQ6+Ty6k3O7kM+tu/kdcByPa7SHEz5afQbXaQ4mfLT6DJ5dSbjIZ9bd/I64Dke12kOJny0+g2u0hxM+Wn0GTy6k3GQz627+R1wHI9rtIcTPlp9BtdpDiZ8tPoMnl1JuMhn1t38jrgOR7XaQ4mfLT6Da7SHEz5afQZPLqTcZDPrbv5HXAcj2u0hxM+Wn0G12kOJny0+gyeXUm4yGfW3fyOuA5HtdpDiZ8tPoNrtIcTPlp9Bk8upNxkM+tu/kdcByPa7SHEz5afQbXaQ4mfLT6DJ5dSbjIZ9bd/I64Dke12kOJny0+g2u0hxM+Wn0GTy6k3GQz627+R1wHI9rtIcTPlp9BtdpDiZ8tPoMnl1JuMhn1t38jrgOR7XaQ4mfLT6Da7SHEz5afQZPLqTcZDPrbv5HXAcj2u0hxM+Wn0G12kOJny0+gyeXUm4yGfW3fyOuA5HtdpDiZ8tPoNrtIcTPlp9Bk8upNxkM+tu/kdcByPa7SHEz5afQbXaQ4mfLT6DJ5dSbjIZ9bd/I64Dke12kOJny0+g2u0hxM+Wn0GTy6k3GQz627+R1wHI9rtIcTPlp9BtdpDiZ8tPoMnl1JuMhn1t38jrhByTa7SHEz5afQDJ5dSbjIZ9bd/I8IAFgLUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z'  // URL to the icon image
//                     });

//                     // Define the command to insert the accordion template
//                     editor.addCommand('insertAccordion', {
//                       exec: () => addAccordionTemplate(editor)
//                     });
//                 }}
//                 config={{
//                     extraPlugins: 'divarea',  // 'divarea' plugin ensures that content is editable in a div area
//                     toolbar: [
//                         { name: 'insert', items: ['Accordion'] },  // Ensure the custom button is added to the toolbar
//                         { name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates'] },
//                         { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
//                         { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker'] },
//                         { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
//                         '/',
//                         { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
//                         { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
//                         { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
//                         { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
//                         '/',
//                         { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
//                         { name: 'colors', items: ['TextColor', 'BGColor'] },
//                         { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
//                         { name: 'about', items: ['About'] }
//                     ]
//                 }}
//             />
//         </div>
//     );
// }

// export default App;
