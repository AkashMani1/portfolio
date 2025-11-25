// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
      <p>© {new Date().getFullYear()} Akash Mani. Built with Next.js & Tailwind.</p>
    </footer>
  );
}