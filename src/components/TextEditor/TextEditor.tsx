import "./style.css";
import MDEditor from "@uiw/react-md-editor";
import { LegacyRef, useEffect, useRef, useState } from "react";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(true);
  const editorRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);
  const [value, setValue] = useState("# Header");
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        editorRef.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={editorRef}>
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </div>
    );
  }

  return (
    <div className="text-editor" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
