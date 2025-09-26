// src/components/HistoryLog.js
import React, { useState } from "react";

function HistoryLog({ history }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Filtered history
  const filteredHistory = history.filter((h) =>
    h.message.toLowerCase().includes(search.toLowerCase())
  );

  // Export to CSV
  const exportToCSV = () => {
    const rows = [
      ["Time", "Message"],
      ...history.map((h) => [h.time, h.message]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.map((x) => `"${x}"`).join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "history_log.csv";
    link.click();
  };

  // Export to PDF (basic via window.print)
  const exportToPDF = () => {
    const newWin = window.open("", "_blank");
    newWin.document.write("<h3>Task History Log</h3>");
    newWin.document.write("<ul>");
    history.forEach((h) => {
      newWin.document.write(`<li>[${h.time}] ${h.message}</li>`);
    });
    newWin.document.write("</ul>");
    newWin.print();
    newWin.close();
  };

  return (
    <div className="mb-3">
      <button
        className="btn btn-outline-primary w-100 mb-2"
        onClick={() => setOpen(!open)}
      >
        {open ? "⬆ Hide History Log" : "⬇ Show History Log"}
      </button>

      {open && (
        <div
          className="dropdown-menu show w-100 p-2 shadow-sm"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {/* Search bar */}
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Export buttons */}
          <div className="d-flex justify-content-between mb-2">
            <button className="btn btn-sm btn-success" onClick={exportToCSV}>
              Export CSV
            </button>
            <button className="btn btn-sm btn-danger" onClick={exportToPDF}>
              Export PDF
            </button>
          </div>

          {/* History list */}
          {filteredHistory.length === 0 ? (
            <p className="text-muted m-0">No history found...</p>
          ) : (
            <ul className="list-unstyled m-0">
              {filteredHistory.map((h, idx) => (
                <li key={idx} className="mb-1">
                  <small className="text-muted me-2">[{h.time}]</small>
                  {h.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default HistoryLog;
