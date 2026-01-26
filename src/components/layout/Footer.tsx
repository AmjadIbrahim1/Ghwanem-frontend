import { Heart, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* School Info */}
          <div className="text-center md:text-right">
            <p className="flex items-center justify-center md:justify-start gap-2 text-gray-300 mb-2">
              صُنع بـ
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              في مصر
            </p>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} مدرسة الغوانم - جميع الحقوق محفوظة
            </p>
          </div>

          {/* Developer Info */}
          <div className="text-center md:text-left border-r border-gray-700 pr-8">
            <h3 className="text-lg font-bold mb-3 text-green-400">تطوير وبرمجة</h3>
            <div className="space-y-2">
              <p className="font-semibold text-white">Eng : Amjad Ibrahim</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4" />
                <a href="tel:+201030615045" className="hover:text-green-400 transition-colors">
                  +201030615045
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:amjadibrahim218@gmail.com" className="hover:text-green-400 transition-colors">
                  amjadibrahim218@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}