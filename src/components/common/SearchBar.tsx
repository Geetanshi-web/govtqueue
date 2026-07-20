import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search offices, services, departments...',
  onSearch,
  className,
  size = 'md',
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const sizeClasses = {
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-14 text-lg',
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className="relative flex items-center">
        <Search
          className={cn(
            'absolute left-4 text-muted-foreground',
            size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
          )}
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(
            'gov-input w-full pl-11 pr-20 rounded-full shadow-sm',
            sizeClasses[size]
          )}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-14 h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="submit"
          size={size === 'lg' ? 'default' : 'sm'}
          className="absolute right-1.5 gov-button-accent rounded-full"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
