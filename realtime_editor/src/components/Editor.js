import React, {useEffect, useRef} from "react";
import Codemirror from "codemirror";
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/theme/dracula.css';
import {language} from '../../src/atoms';
import {useRecoilState} from 'recoil';
import ACTIONS from '../Actions';

const Editor = ({socketRef, roomId, onCodeChange}) =>{

    const [lang, setLang] = useRecoilState(language);

    const editorRef = useRef(null);

    useEffect(() => {
       async function init() {
        editorRef.current = Codemirror.fromTextArea(document.getElementById("realtimeEditor"), {
           mode: { name: 'javascript', json: true },
           theme: 'dracula',
           autoCloseTags: true,
           autoCloseBrackets: true,
           lineNumbers: true,
        });

        editorRef.current.on('change', (instance, changes) => {
            const { origin } = changes;
            const code = instance.getValue();
            onCodeChange(code);
            if (origin !== 'setValue') {
                socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                    roomId,
                    code,
                });
            }
        });
       }

       init();

    }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);

    return (
        <div className="editor">
           <div className="editor-bar">
           <label>
                Select Language : 
                <select value={lang} onChange={(e) => {setLang(e.target.value); window.location.reload();}} className="seLang">
                        <option value="clike">C / C++ / C# / Java</option>
                        <option value="css">CSS</option>
                        <option value="dart">Dart</option>
                        <option value="django">Django</option>
                        <option value="dockerfile">Dockerfile</option>
                        <option value="go">Go</option>
                        <option value="htmlmixed">HTML-mixed</option>
                        <option value="javascript">JavaScript</option>
                        <option value="jsx">JSX</option>
                        <option value="markdown">Markdown</option>
                        <option value="php">PHP</option>
                        <option value="python">Python</option>
                        <option value="r">R</option>
                        <option value="rust">Rust</option>
                        <option value="ruby">Ruby</option>
                        <option value="sass">Sass</option>
                        <option value="shell">Shell</option>
                        <option value="sql">SQL</option>
                        <option value="swift">Swift</option>
                        <option value="xml">XML</option>
                        <option value="yaml">yaml</option>
                </select>
            </label>
           </div>
           <textarea id="realtimeEditor"></textarea>
        </div>
        
    )
}

export default Editor;