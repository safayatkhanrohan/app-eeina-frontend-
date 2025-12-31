import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const AccordionContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

const AccordionItemContext = React.createContext<{
  value: string;
}>({ value: '' });

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
  }
>(({ className, value: controlledValue, onValueChange, defaultValue, ...props }, ref) => {
  const [value, setValue] = React.useState(defaultValue || '');

  const handleValueChange = (newValue: string) => {
    const finalValue = newValue === (controlledValue ?? value) ? '' : newValue;
    if (onValueChange) {
      onValueChange(finalValue);
    } else {
      setValue(finalValue);
    }
  };

  return (
    <AccordionContext.Provider
      value={{
        value: controlledValue ?? value,
        onValueChange: handleValueChange,
      }}
    >
      <div ref={ref} className={cn('space-y-4', className)} {...props} />
    </AccordionContext.Provider>
  );
});
Accordion.displayName = 'Accordion';

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
  <AccordionItemContext.Provider value={{ value }}>
    <div
      ref={ref}
      className={cn(
        'bg-white rounded-[20px] shadow-[0px_0px_19px_0px_rgba(28,39,49,0.05)] overflow-hidden mb-4',
        className,
      )}
      {...props}
    />
  </AccordionItemContext.Provider>
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = React.useContext(AccordionContext);
  const { value: itemValue } = React.useContext(AccordionItemContext);
  const isOpen = selectedValue === itemValue;

  return (
    <button
      ref={ref}
      onClick={() => onValueChange?.(itemValue)}
      className={cn(
        'flex flex-1 items-center justify-between py-6 px-8 font-semibold transition-all w-full text-left [&[data-state=open]>div>svg]:rotate-180',
        className,
      )}
      data-state={isOpen ? 'open' : 'closed'}
      {...props}
    >
      {children}
      <div
        className={cn(
          'h-10 w-10 rounded-lg flex items-center justify-center transition-colors duration-200 shrink-0 ml-4',
          isOpen ? 'bg-[#6AB240]' : 'bg-[#f3f4f6]',
        )}
      >
        <ChevronDown
          className={cn(
            'h-5 w-5 transition-transform duration-200',
            isOpen ? 'text-white' : 'text-gray-500',
          )}
        />
      </div>
    </button>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { value: selectedValue } = React.useContext(AccordionContext);
    const { value: itemValue } = React.useContext(AccordionItemContext);
    const isOpen = selectedValue === itemValue;

    return (
      <div
        ref={ref}
        className={cn(
          'grid overflow-hidden text-sm transition-all duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        <div className="overflow-hidden">
          <div className={cn('pb-6 px-8 pt-0', className)}>{children}</div>
        </div>
      </div>
    );
  },
);
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
