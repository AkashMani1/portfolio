import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { portfolioData } from "@/app/data/portfolio";

// --- 1. DATA SOURCES ---
const RESUME_LINK = "/Developer_Resume.pdf"; 

const RESUME_CONTENT = `
  Name: Akash Mani
  Contact: akashmani9955@gmail.com | linkedin.com/in/akashmanil
  
  SUMMARY:
  Motivated Computer Science student skilled in Java, C++, and MEAN stack development. Strong foundation in full-stack design, mobile apps, and data analytics. Seeking backend/software roles.
  
  EDUCATION:
  - B.Tech in CSE, Narula Institute of Technology (2023 - Present)
  
  SKILLS:
  - Languages: Java, C++, JavaScript
  - Stack: MEAN (MongoDB, Express, React/Angular, Node), Django
  - Tools: Git, GitHub, VS Code, Figma
  
  EXPERIENCE:
  - Web Development Intern @ CodeCrafters (Remote) | Apr 2025 - Jun 2025
    * Built responsive React pages with Tailwind.
    * Developed RESTful APIs with Node.js/Express.
  
  PROJECTS:
  1. Medical App (Android, Figma): Medicine recommendations, used SQLite for offline access.
  2. Gamified Financial Platform (MEAN): Uses Stock Market API simulation and a leaderboard.
`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ reply: "Error: API Key missing." }, { status: 500 });

    const genAI = new GoogleGenerativeAI(apiKey);
    const { message } = await req.json();

    // --- 2. FINAL LOGIC CONTROLLER (Cleaned for Natural Tone) ---
    const systemPrompt = `
      You are the professional AI Assistant for **Akash Mani**, a Full-Stack Developer.
      
      **YOUR PRIMARY KNOWLEDGE BASE:**
      1. Resume: ${RESUME_CONTENT}
      2. Portfolio Data: ${JSON.stringify(portfolioData)}

      **STRICT LOGIC:**
      1. **CV Link Control:** ONLY provide the link if the user explicitly asks for "resume", "cv", "download", or "file". 
         The link response must be exactly: "Here is the resume: [Download PDF](${RESUME_LINK})"
      2. **Off-Topic Guardrail:** If asked about irrelevant topics (e.g., weather, cooking), politely state you only discuss Akash's professional background.
      3. **Skill Inference:** Infer related skills (e.g., if he knows Node.js, he knows REST APIs).
      
      **ANSWERING GUIDELINES:**
      - **Basis:** Base ALL answers strictly on the knowledge base provided above.
      - **Length:** Keep answers concise and summary-like (max 3 sentences) to optimize chat readability.
      - **Tone:** Confident, persuasive, and friendly.
      
      **User Query:** ${message}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", systemInstruction: systemPrompt });
    const result = await model.generateContent(message);
    const response = await result.response.text();

    return NextResponse.json({ reply: response });

  } catch (error: any) {
    return NextResponse.json({ reply: "Network error. Please try again." }, { status: 500 });
  }
}
