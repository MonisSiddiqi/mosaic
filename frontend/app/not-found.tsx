import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="mb-2 text-4xl font-bold text-gray-800">
        404 - Page Not Found
      </h1>
      <p className="mb-4 text-lg text-gray-600">
        Oops! The page {"you're"} looking for {"doesn't"} exist.
      </p>
      <Link href="/">
        <span className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700">
          Go Back Home
        </span>
      </Link>
    </div>
  );
}
