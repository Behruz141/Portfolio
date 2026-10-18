import Link from "next/link";

// Mavjud bo'lmagan manzil ochilganda ko'rsatiladi (404)
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-40 text-center">
      <h1 className="text-6xl font-extrabold text-amber-500">404</h1>
      <p className="text-gray-600 dark:text-gray-400">Sahifa topilmadi.</p>
      <Link
        href="/"
        className="rounded-xl bg-amber-500 px-5 py-2 font-semibold text-white transition-transform hover:-translate-y-1"
      >
        Bosh sahifa
      </Link>
    </div>
  );
}
