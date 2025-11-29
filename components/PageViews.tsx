"use client";
import { useEffect, useState } from "react";
import { db } from "../app/lib/firebase";
import { doc, setDoc, increment, onSnapshot } from "firebase/firestore";
import { Eye } from "lucide-react";

export default function PageViews() {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const docRef = doc(db, "analytics", "views");

    // Increment on mount
    setDoc(docRef, { count: increment(1) }, { merge: true });

    // Listen for updates
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setViews(doc.data().count);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs font-mono text-white/70 shadow-lg pointer-events-none">
      <Eye size={12} />
      <span>{views.toLocaleString()} Views</span>
    </div>
  );
}