"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Trash2, Lock } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [logs, setLogs] = useState<any[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Akash8969") { // Set your simple password here
      setIsAuthenticated(true);
      fetchLogs();
    } else {
      alert("Wrong Password");
    }
  };

  const fetchLogs = async () => {
    const q = query(collection(db, "contact_logs"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    setLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Delete this message?")) return;
    await deleteDoc(doc(db, "contact_logs", id));
    fetchLogs();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <form onSubmit={handleLogin} className="flex gap-2">
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Admin PIN"
            className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <button className="p-2 bg-blue-600 rounded hover:bg-blue-700"><Lock size={16}/></button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid gap-4">
        {logs.map(log => (
          <div key={log.id} className="p-5 rounded-xl bg-gray-900 border border-gray-800 flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-blue-400">{log.name}</h3>
                <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded">
                  {log.email}
                </span>
              </div>
              <p className="text-gray-300 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                {log.message}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                {log.timestamp?.toDate().toLocaleString()}
              </p>
            </div>
            <button 
              onClick={() => handleDelete(log.id)}
              className="p-2 bg-red-900/20 text-red-500 rounded-lg hover:bg-red-900/40 transition-colors self-end md:self-start"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {logs.length === 0 && <p className="text-gray-500">No messages yet.</p>}
      </div>
    </div>
  );
}