import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/notes")
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch notes", err);
      });
  }, []);

  const downloadNote = (id) => {
    window.location.href = `http://localhost:8080/api/notes/${id}/download`;
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>📘 Download Notes</h2>

      {notes.length === 0 ? (
        <p style={{ textAlign: "center" }}>No notes available.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>File Download</th>
              <th>Note Link</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={note.id}>
                <td>{index + 1}</td>
                <td>{note.className}</td>
                <td>
                  {note.fileUrl ? (
                    <button onClick={() => downloadNote(note.id)}>Download</button>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {note.noteLink ? (
                    <a href={note.noteLink} target="_blank" rel="noopener noreferrer">
                      🔗 Open Link
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentNotes;
