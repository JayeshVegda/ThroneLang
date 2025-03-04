import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "react-monaco-editor";
import * as monaco from "monaco-editor";
import "./edit.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { PrimaryButton } from "./PrimaryButton/PrimaryButton";

function Editor() {
  const [code, setCode] = useState(
    "winter_is_coming\n\n# Write your ThroneLang code here\n# Example:\n# decarys(\"Hello, Westeros!\")\n\nwinter_is_ended"
  );

  const [output, setOutput] = useState(null);
  const editorRef = useRef(null);
  const outputRef = useRef(null);
  const STORAGE_KEY = "monacoEditorState";

  const compileToken = {
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

  const defineCustomLanguage = () => {
    monaco.languages.register({ id: "customLang" });

    monaco.languages.setMonarchTokensProvider("customLang", {
      tokenizer: {
        root: [
          [
            new RegExp(`\\b(${Object.keys(compileToken).join("|")})\\b`),
            "custom-token",
          ],
        ],
      },
    });

    monaco.editor.defineTheme("customTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [{ token: "custom-token", foreground: "FF0000", fontStyle: "bold" }],
      colors: {},
    });
  };

  const editorDidMount = (editor, monaco) => {
    defineCustomLanguage();
    monaco.editor.setTheme("customTheme");
    editorRef.current = editor;

    // Restore the editor state if available
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const { content, viewState } = JSON.parse(savedState);
      editor.setValue(content);
      if (viewState) {
        editor.restoreViewState(viewState);
      }
      editor.focus();
    }
  };

  const options = {
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

  const handleSaveState = () => {
    if (editorRef.current) {
      const viewState = editorRef.current.saveViewState();
      const content = editorRef.current.getValue();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ content, viewState }));
    }
  };

  useEffect(() => {
    return () => handleSaveState();
  }, []);

  const handleSubmit = async () => {
    console.log("Submitted Code:", code);
    handleSaveState();

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
        console.log("Server Response:", data);
        setOutput(data.output || "Code executed successfully!");
      } else {
        console.error("Failed to submit code:", response.status);
        setOutput(`Error: Failed to submit code. Status ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      setOutput(`Error: ${error.message}`);
    }
  };

  // Auto-scroll to the latest output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <>
      <div className="editor-container" id="editor-id">
        <MonacoEditor
          width="70%"
          height="500px"
          language="customLang"
          theme="customTheme"
          value={code}
          onChange={setCode}
          options={options}
          editorDidMount={editorDidMount}
        />

        <PrimaryButton
          className="submit-button"
          color="primary"
          size="large"
          onClick={handleSubmit}
        >
          Submit
        </PrimaryButton>

        {output && (
          <Box
            className="output-container h-[300px] mt-5 w-[70%] p-4 bg-[#1e1e1e] text-[#d4d4d4] rounded-md text-sm shadow-lg overflow-auto"
          >
            <Button
              onClick={() => setOutput(null)}
              sx={{
                position: "absolute",
                top: "5px",
                right: "10px",
                color: "#ff4d4d",
                fontSize: "12px",
                minWidth: "30px",
              }}
            >
              ✖
            </Button>
            <strong>Output:</strong>
            <pre style={{ whiteSpace: "pre-wrap" }}>{output}</pre>
          </Box>
        )}
      </div>
    </>
  );
}

export default Editor;
