import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand Column */}
          <div>
            <h3 className="mb-4 font-semibold text-white">MOSAIC</h3>
            <p className="text-sm leading-relaxed">
              Connecting homeowners with trusted professionals for all your home
              improvement needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-white"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/add-project"
                  className="transition-colors hover:text-white"
                >
                  Add Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Connect With Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          © {new Date().getFullYear()} Mosaic. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
