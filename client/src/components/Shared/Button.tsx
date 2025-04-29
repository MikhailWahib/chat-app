import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
    size?: 'sm' | 'md' | 'lg'
}

const Button = ({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) => {
    const baseStyles = 'relative font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02]'
    const variants = {
        primary: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90',
        secondary: 'bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-90'
    }
    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-xl'
    }

    return (
        <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
            <div className='absolute inset-0 bg-white/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
        </button>
    )
}

export default Button
