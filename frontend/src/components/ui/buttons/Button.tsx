import { twMerge } from 'tailwind-merge'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: React.ReactNode
  color?: 'blue-gradient' | 'indigo'
  size?: 'small' | 'medium' | 'large'
}

const buttonColors = {
  'blue-gradient': 'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl',
  indigo: 'bg-indigo-600 hover:bg-indigo-700'
}

const buttonSizes = {
  small: 'px-2 py-1 text-xs',
  medium: 'px-3 py-2.5 text-sm',
  large: 'px-4 py-3 text-base'
}

export default function Button({ className, children, color = 'blue-gradient', size = 'medium', ...rest }: Props) {
  const buttonClassNames = twMerge(
    'text-white font-medium rounded-full text-center',
    buttonColors[color],
    buttonSizes[size],
    className
  )
  return (
    <button {...rest} className={buttonClassNames}>
      {children}
    </button>
  )
}
