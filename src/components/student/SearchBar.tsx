import { useState } from 'react'
import { Search } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'

interface SearchBarProps {
  onSearch: (seatNumber: string) => void
  loading?: boolean
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [seatNumber, setSeatNumber] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (seatNumber.trim()) {
      onSearch(seatNumber.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <div className="flex-1">
        <Input
          type="text"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
          placeholder="أدخل رقم الجلوس"
          icon={<Search className="w-5 h-5" />}
          className="text-lg py-4"
        />
      </div>
      <Button
        type="submit"
        variant="secondary"
        size="lg"
        loading={loading}
        disabled={!seatNumber.trim()}
      >
        بحث
      </Button>
    </form>
  )
}