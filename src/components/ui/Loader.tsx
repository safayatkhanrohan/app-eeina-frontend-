import { cn } from '../../lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Universal Loader Component
 * A modern, animated loading indicator that matches the app's design system
 */
export const Loader = ({ size = 'md', className }: LoaderProps): JSX.Element => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('fixed inset-0 flex items-center justify-center h-screen', className)}>
      <div className="relative">
        {/* Outer rotating ring */}
        <div
          className={cn('border-2 border-gray-200 rounded-full animate-spin', sizeClasses[size])}
          style={{
            borderTopColor: '#22ae4b',
            animation: 'spin 1s linear infinite',
          }}
        />

        {/* Inner pulsing dot */}
        <div
          className={cn(
            'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
            'bg-primaryColor rounded-full animate-pulse',
          )}
          style={{
            width: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
            height: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
};

/**
 * Text Loader Component for inline loading states
 */
export const TextLoader = ({ className }: { className?: string }): JSX.Element => {
  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 bg-primaryColor rounded-full animate-bounce"
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  );
};

/**
 * Skeleton Loader Component for content placeholders
 */
export const SkeletonLoader = ({
  className,
  lines = 1,
}: {
  className?: string;
  lines?: number;
}): JSX.Element => {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse"
          style={{
            animationDelay: `${i * 0.1}s`,
          }}
        >
          <div
            className={cn(
              'h-4 bg-gray-200 rounded',
              i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full',
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default Loader;
