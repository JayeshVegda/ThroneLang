import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "react-monaco-editor";
import * as monaco from "monaco-editor";
import "./Editor.css";

function Editor() {
  const [code, setCode] = useState(
    "winter_is_coming\n\n# Write your ThroneLang code here\n# Example:\n# decarys(\"Hello, Westeros!\")\n\nwinter_is_ended"
  );
  const [output, setOutput] = useState(null);
  const [outputVisible, setOutputVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const editorRef = useRef(null);
  const STORAGE_KEY = "throneLangEditorState";

  // ThroneLang keywords for syntax highlighting
  const throneLangTokens = {
    decarys: "print",
    attack: "if",
    attack_again: "elif",
    fallback: "else",
    watch: "while",
    march: "for",
    siege: "do",
    declare: "def",
    house: "class",
    summon: "import",
    rightful: "True",
    traitor: "False",
    claim: "",
    send: "return",
  };

  // Special keywords for additional highlighting
  const specialKeywords = ["winter_is_coming", "winter_is_ended"];

  // Define custom ThroneLang language for Monaco Editor
  const defineCustomLanguage = () => {
    monaco.languages.register({ id: "throneLang" });

    monaco.languages.setMonarchTokensProvider("throneLang", {
      tokenizer: {
        root: [
          // Match ThroneLang tokens
          [
            new RegExp(`\\b(${Object.keys(throneLangTokens).join("|")})\\b`),
            "throne-keyword",
          ],
          // Match special keywords
          [
            new RegExp(`\\b(${specialKeywords.join("|")})\\b`),
            "throne-special",
          ],
          // Match strings
          [/".*?"/, "throne-string"],
          [/'.*?'/, "throne-string"],
          // Match comments
          [/#.*$/, "throne-comment"],
          // Match numbers
          [/\d+/, "throne-number"],
        ],
      },
    });

    // Define custom theme with Game of Thrones inspired blue colors
    monaco.editor.defineTheme("throneLangTheme", 
    {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "throne-keyword", foreground: "#778da9", fontStyle: "bold" },
        { token: "throne-special", foreground: "#d4af37", fontStyle: "bold" },
        { token: "throne-string", foreground: "#a8dadc" },
        { token: "throne-comment", foreground: "#6c757d" },
        { token: "throne-number", foreground: "#e9c46a" },
      ],
      colors: {
        "editor.background": "#0d1b2a",
        "editor.foreground": "#e0e0e0",
        "editorCursor.foreground": "#d4af37",
        "editor.lineHighlightBackground": "#1b263b",
        "editorLineNumber.foreground": "#415a77",
        "editor.selectionBackground": "#415a77",
        "editor.inactiveSelectionBackground": "#1b263b",
        "editorWidget.background": "#1b263b",
        "editorWidget.border": "#415a77",
      },
    });
  };

  // Initialize editor
  const editorDidMount = (editor, monaco) => {
    defineCustomLanguage();
    monaco.editor.setTheme("throneLangTheme");
    editorRef.current = editor;

    // Restore editor state from localStorage
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const { content, viewState } = JSON.parse(savedState);
        if (content) {
          editor.setValue(content);
        }
        if (viewState) {
          editor.restoreViewState(viewState);
        }
        editor.focus();
      } catch (e) {
        console.error("Failed to restore editor state:", e);
      }
    }
  };

  // Editor options
  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
    fontSize: 14,
    fontFamily: "'Fira Code', Consolas, monospace",
    fontLigatures: true,
    minimap: { enabled: false },
    scrollbar: {
      useShadows: false,
      vertical: "auto",
      horizontal: "auto",
    },
    lineNumbers: "on",
    wordWrap: "on",
    padding: { top: 10 },
  };

  // Save editor state
  const saveEditorState = () => {
    if (editorRef.current) {
      const viewState = editorRef.current.saveViewState();
      const content = editorRef.current.getValue();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ content, viewState }));
    }
  };

  // Save state on component unmount
  useEffect(() => {
    return () => saveEditorState();
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(saveEditorState, 30000);
    return () => clearInterval(interval);
  }, []);

  // Submit code to backend
  const handleSubmit = async () => 
    {
    setIsLoading(true);
    setError(null);
    saveEditorState();
    setOutputVisible(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/receive_code/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setOutput(data.output || "Code executed successfully!");
      } else {
        setError(data.error || "Failed to execute code");
        setOutput(null);
      }
    } catch (error) {
      setError(`Network error: ${error.message}`);
      setOutput(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear editor
  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the editor?")) {
      setCode("winter_is_coming\n\nwinter_is_ended");
      setOutput(null);
      setError(null);
      setOutputVisible(false);
    }
  };

  return (
    <div className="throne-ide-container">
      <h1 className="throne-title">ThroneLang IDE</h1>
      
      <div className="throne-editor-area">
        {/* Editor */}
        <div className="monaco-container">
          <MonacoEditor
            width="100%"
            height="100%"
            language="throneLang"
            theme="throneLangTheme"
            value={code}
            onChange={setCode}
            options={editorOptions}
            editorDidMount={editorDidMount}
          />
        </div>
        
        {/* Output */}
        {outputVisible && (
          <div className={`output-container ${outputVisible ? 'visible' : ''}`}>
            <div className="output-title">Output</div>
            
            {isLoading && (
              <div className="loading-text">
                The ravens are carrying your message
              </div>
            )}
            
            {error && (
              <div className="output-content error-message">
                {error}
              </div>
            )}
            
            {output && (
              <div className="output-content">
                {output}
              </div>
            )}
            
            {!isLoading && !error && !output && (
              <div className="output-content" style={{color: '#778da9', fontStyle: 'italic'}}>
                Run your code to see the output here
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="control-bar">
        <button 
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Running..." : "Run Code"}
        </button>
        
        <button 
          className="btn"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default Editor;