import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={twMerge(
        clsx(
          'px-4 py-2 rounded-md font-medium transition-colors',
          'bg-blue-600 text-white hover:bg-blue-700',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
}