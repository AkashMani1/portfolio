#!/usr/bin/env python3
from pathlib import Path


PAGE_W = 612
PAGE_H = 792
LEFT = 46
TOP = 752


def esc(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def draw_text(lines, x, y, font="F1", size=11, leading=14):
    parts = ["BT", f"/{font} {size} Tf", f"{x} {y} Td", f"{leading} TL"]
    for idx, line in enumerate(lines):
        if idx:
            parts.append("T*")
        parts.append(f"({esc(line)}) Tj")
    parts.append("ET")
    return "\n".join(parts)


def draw_rule(x1, y1, x2, y2, width=0.8):
    return f"{width} w\n{x1} {y1} m\n{x2} {y2} l\nS"


def build_pdf(content: str) -> bytes:
    objects = []

    def add(obj: str):
        objects.append(obj.encode("latin-1"))

    add("<< /Type /Catalog /Pages 2 0 R >>")
    add("<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    add(
        f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_W} {PAGE_H}] "
        f"/Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>"
    )
    stream = content.encode("latin-1")
    add(f"<< /Length {len(stream)} >>\nstream\n{content}\nendstream")
    add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")

    pdf = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    for i, obj in enumerate(objects, start=1):
        offsets.append(len(pdf))
        pdf.extend(f"{i} 0 obj\n".encode("latin-1"))
        pdf.extend(obj)
        pdf.extend(b"\nendobj\n")
    xref_pos = len(pdf)
    pdf.extend(f"xref\n0 {len(objects) + 1}\n".encode("latin-1"))
    pdf.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        pdf.extend(f"{offset:010d} 00000 n \n".encode("latin-1"))
    pdf.extend(
        (
            f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\n"
            f"startxref\n{xref_pos}\n%%EOF\n"
        ).encode("latin-1")
    )
    return bytes(pdf)


def main():
    out = Path("output/pdf/app-summary-one-pager.pdf")
    out.parent.mkdir(parents=True, exist_ok=True)

    features = [
        "Single-page portfolio with Hero, About, Skills, Projects, Experience, Contact, and Guestbook sections.",
        "Animated UI with Framer Motion plus smooth scrolling, particle background, cursor glow, and scroll progress.",
        "AI assistant widget that sends user questions to /api/chat and can return the resume link.",
        "Contact form validated with Zod/react-hook-form, then saved to Firestore contact_logs.",
        "Realtime guestbook backed by Firestore onSnapshot listeners.",
        "Firestore-backed skills, projects, certifications, admin sync tools, and a live page-view counter.",
    ]

    run_steps = [
        "Run npm install.",
        "Set GEMINI_API_KEY for the chat API; Firebase keys are committed in app/lib/firebase.ts.",
        "Run npm run dev, then open the local Next.js URL.",
        "If Firestore collections are empty, use /admin to sync projects, skills, and certifications.",
    ]

    arch_lines = [
        "UI: Next.js App Router page composes React sections; layout adds theme, analytics, chatbot, and global effects.",
        "Data: Static portfolio seed data lives in app/data/portfolio.ts; several sections fetch live content from Firestore.",
        "Services: Firestore stores contact_logs, guestbook, analytics/views, projects, skills, and certifications.",
        "AI flow: PersonalChatbot -> POST /api/chat -> GoogleGenerativeAI with GEMINI_API_KEY + embedded portfolio/resume context.",
        "Admin flow: /admin reads contact_logs and writes portfolioData into Firestore collections for site content seeding.",
    ]

    y = TOP
    parts = [
        "q",
        "1 1 1 rg",
        f"0 0 {PAGE_W} {PAGE_H} re f",
        "Q",
        "0 0 0 rg",
        "0 0 0 RG",
    ]
    parts.append(draw_text(["App Summary"], LEFT, y, font="F2", size=22, leading=24))
    y -= 18
    parts.append(draw_rule(LEFT, y, PAGE_W - LEFT, y, width=1))
    y -= 26

    parts.append(draw_text(["What it is"], LEFT, y, font="F2", size=13, leading=14))
    y -= 18
    parts.append(
        draw_text(
            [
                "A personal portfolio web app for Akash Mani built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
                "Beyond showcasing profile content, it includes a chat assistant, Firestore-backed interactions, and an admin console.",
            ],
            LEFT,
            y,
            size=10,
            leading=12,
        )
    )
    y -= 38

    parts.append(draw_text(["Who it's for"], LEFT, y, font="F2", size=13, leading=14))
    y -= 18
    parts.append(
        draw_text(
            ["Primary persona: recruiters, hiring managers, collaborators, and visitors evaluating Akash's work and contacting him."],
            LEFT,
            y,
            size=10,
            leading=12,
        )
    )
    y -= 28

    parts.append(draw_text(["What it does"], LEFT, y, font="F2", size=13, leading=14))
    y -= 16
    bullet_x = LEFT + 10
    for item in features:
        parts.append(draw_text([f"- {item}"], bullet_x, y, size=9.2, leading=11))
        y -= 17
    y -= 4

    parts.append(draw_text(["How it works"], LEFT, y, font="F2", size=13, leading=14))
    y -= 16
    for item in arch_lines:
        parts.append(draw_text([f"- {item}"], bullet_x, y, size=9.1, leading=11))
        y -= 16
    y -= 2

    parts.append(draw_text(["How to run"], LEFT, y, font="F2", size=13, leading=14))
    y -= 16
    for idx, item in enumerate(run_steps, start=1):
        parts.append(draw_text([f"{idx}. {item}"], bullet_x, y, size=9.3, leading=11))
        y -= 16

    parts.append(
        draw_text(
            ["Not found in repo: production deployment URL, test commands, and environment setup beyond GEMINI_API_KEY."],
            LEFT,
            42,
            size=8.8,
            leading=10,
        )
    )

    out.write_bytes(build_pdf("\n".join(parts)))
    print(out.resolve())


if __name__ == "__main__":
    main()
