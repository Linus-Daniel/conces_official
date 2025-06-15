
type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};
export default function LoadingSpinner({ size = 'md', className = '' }:LoadingSpinnerProps) {
    const sizes = {
      sm: 'h-5 w-5',
      md: 'h-8 w-8',
      lg: 'h-12 w-12'
    };
  
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <div
          className={`${sizes[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-500`}
        />
      </div>
    );
  }