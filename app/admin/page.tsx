"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, query, orderBy, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { Trash2, Lock, Mail, UploadCloud, Code2, Award } from "lucide-react";
import { portfolioData } from "../data/portfolio";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [seeding, setSeeding] = useState(false);
  const [seedingSkills, setSeedingSkills] = useState(false);
  const [seedingCertifications, setSeedingCertifications] = useState(false); // NEW

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Akash8969") { // Simple PIN check
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

  const syncProjectsToCloud = async () => {
    if(!confirm("This will overwrite/add projects to the database. Continue?")) return;
    setSeeding(true);
    try {
      const projectsCollection = collection(db, "projects");
      for (const project of portfolioData.projects) {
        const id = project.title.toLowerCase().replace(/\s+/g, '-');
        await setDoc(doc(projectsCollection, id), project);
      }
      alert("✅ Projects Synced to Firebase Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error syncing projects");
    } finally {
      setSeeding(false);
    }
  };

  const syncSkillsToCloud = async () => {
    if(!confirm("This will overwrite skills in the database. Continue?")) return;
    setSeedingSkills(true);
    try {
      const skillsCollection = collection(db, "skills");
      for (const [category, items] of Object.entries(portfolioData.skills)) {
        await setDoc(doc(skillsCollection, category), { items });
      }
      alert("✅ Skills Synced to Firebase Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error syncing skills");
    } finally {
      setSeedingSkills(false);
    }
  };

  // --- NEW: SYNC CERTIFICATIONS TO FIREBASE ---
  const syncCertificationsToCloud = async () => {
    if(!confirm("This will overwrite certifications in the database. Continue?")) return;
    setSeedingCertifications(true);
    try {
      const certsCollection = collection(db, "certifications");
      // Assuming portfolioData has a certifications array
      for (const cert of portfolioData.certifications) {
        const id = cert.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        await setDoc(doc(certsCollection, id), cert);
      }
      alert("✅ Certifications Synced to Firebase Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error syncing certifications");
    } finally {
      setSeedingCertifications(false);
    }
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Mail className="text-blue-500" /> Admin Console
        </h1>
        
        <div className="flex flex-wrap gap-4">
            {/* Project Sync */}
            <button 
            onClick={syncProjectsToCloud}
            disabled={seeding}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
            <UploadCloud size={18} />
            {seeding ? "Syncing..." : "Sync Projects"}
            </button>

            {/* Skills Sync */}
            <button 
            onClick={syncSkillsToCloud}
            disabled={seedingSkills}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
            <Code2 size={18} />
            {seedingSkills ? "Syncing..." : "Sync Skills"}
            </button>

            {/* Certifications Sync */}
            <button 
            onClick={syncCertificationsToCloud}
            disabled={seedingCertifications}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
            <Award size={18} />
            {seedingCertifications ? "Syncing..." : "Sync Certs"}
            </button>
        </div>
      </div>
      
      <div className="grid gap-4">
        {logs.map(log => (
          <div key={log.id} className="p-5 rounded-xl bg-gray-900 border border-gray-800 flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-blue-400">{log.name}</h3>
                  <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded">
                    {log.email}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {log.timestamp?.toDate().toLocaleString()}
                </span>
              </div>
              <p className="text-gray-300 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 text-sm leading-relaxed">
                {log.message}
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