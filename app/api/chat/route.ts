import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { portfolioData } from "@/app/data/portfolio";

// 1. YOUR REAL RESUME DATA (Formatted for the AI)
const RESUME_CONTENT = `
  Name: Akash Mani
  Contact: +91-8969606915 | akashmani9955@gmail.com
  Links: linkedin.com/in/akashmani1 | github.com/AkashMani1
  
  SUMMARY:
  Motivated Computer Science student skilled in Java, C++, and MEAN stack development. Strong foundation in full-stack design, mobile apps, and data analytics. Seeking software or backend engineering roles.

  EDUCATION:
  - B.Tech in Computer Science and Engineering, Narula Institute of Technology (2023 - Present)
  - Higher Secondary (XII), T.N.B. Collegiate (2022) - 76.17%

  TECHNICAL SKILLS:
  - Languages: Java, C++, JavaScript
  - Web/App: MEAN Stack, Android, Django
  - Databases: MongoDB, MySQL
  - Tools: Git, GitHub, VS Code, Figma, Adobe XD
  - Core CS: DSA, OOP, DBMS

  EXPERIENCE:
  - Web Development Intern at CodeCrafters Technologies (Remote) | Apr 2025 - Jun 2025
    * Stack: React, Node.js, MongoDB, GitHub
    * Built responsive web pages using React and Tailwind CSS.
    * Developed RESTful APIs with Node.js/Express for auth and product listings.
    * Integrated MongoDB for secure data storage.
  
  PROJECTS:
  1. Medical App & Website (Android, Figma, Adobe XD) | 2024
     * Android app providing medicine recommendations and home remedies.
     * Validated content with medical professionals.
     * Implemented SQLite for offline access and push notifications for dosage reminders.
  
  2. Gamified Financial Literacy Platform (MEAN Stack) | Ongoing
     * Interactive platform teaching financial management via gamification.
     * Features: Leaderboards, reward systems, and real-time stock market API simulation.
  
  CERTIFICATIONS:
  - Android Development Training Program (BCT Training): Built a functional to-do list app.
  - MEAN Stack Development Training Program (BCT Training).
`;

// 2. YOUR RESUME LINK
const RESUME_LINK = "/Developer_Resume.pdf"; // Ensure this file matches exactly in your 'public' folder

export async function POST(req: Request) {
  try {
    let apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { reply: "Error: GEMINI_API_KEY is missing." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const { message } = await req.json();

    // 3. STRICT SYSTEM PROMPT
    const systemPrompt = `
      You are an AI Assistant for **Akash Mani**.
      
      **DATA SOURCE:**
      1. Portfolio: ${JSON.stringify(portfolioData)}
      2. Resume: ${RESUME_CONTENT}

      **STRICT RULES:**
      1. **Keep it Short:** Answers must be brief summaries (max 3-4 sentences). Avoid long paragraphs to prevent scrolling.
      2. **Resume Requests:** If asked for a resume/CV, strictly reply: "You can download his resume here: [Download Resume](${RESUME_LINK})."
      3. **Formatting:** Use bullet points for lists.
      4. **Tone:** Professional, enthusiastic, and direct.
      
      **Task:** Answer the user's question using the data above.
    `;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash", 
      systemInstruction: systemPrompt 
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { reply: "Sorry, I am having trouble connecting right now." },
      { status: 500 }
    );
  }
}
