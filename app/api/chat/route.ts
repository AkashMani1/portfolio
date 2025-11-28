import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { portfolioData } from "@/app/data/portfolio";

export async function POST(req: Request) {
  try {
    // 1. Validate & Clean API Key
    let apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { reply: "Error: GEMINI_API_KEY is missing. Check your .env.local file." },
        { status: 500 }
      );
    }

    // 2. Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const { message } = await req.json();

    // 3. Define the System Prompt
    const systemPrompt = `
      You are an AI Assistant for **Akash Mani**, a Computer Science Student and Full-Stack Developer.
      
      Your goal is to answer questions about Akash based strictly on his portfolio data provided below.
      
      **Traits:**
      - Be professional, friendly, and concise.
      - Use "He" or "Akash" when referring to him.
      - If the user asks for contact info, provide his email (${portfolioData.personalInfo.email}).
      - If the user asks for a resume, mention it is available on the site.
      - If asked about something NOT in the data, politely say you only know about his professional background.
      
      **Portfolio Data Context:**
      ${JSON.stringify(portfolioData)}
    `;

    // 4. Create the Model
    // UPDATED: Using 'gemini-2.0-flash' as confirmed by your model list
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash", 
      systemInstruction: systemPrompt 
    });

    // 5. Generate Content
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { reply: `AI Error: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}