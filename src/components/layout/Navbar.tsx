import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2, Ticket, MessageSquare, Shield, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToken } from '@/context/TokenContext';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/offices', label: 'Offices', icon: Building2 },
  { href: '/my-token', label: 'My Token', icon: Ticket },
  { href: '/feedback', label: 'Feedback', icon: MessageSquare },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { activeToken } = useToken();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary shadow-sm">
      <div className="gov-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
              <Building2 className="h-5 w-5 text-accent-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary-foreground">GovQueue</h1>
              <p className="text-xs text-primary-foreground/70">Queue Management Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              const hasNotification = link.href === '/my-token' && activeToken;

              return (
                <Link key={link.href} to={link.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'relative text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10',
                      isActive && 'bg-primary-foreground/10 text-primary-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {link.label}
                    {hasNotification && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-pulse" />
                    )}
                  </Button>
                </Link>
              );
            })}
            <Link to="/admin">
              <Button
                variant="outline"
                size="sm"
                className="ml-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary-foreground/20 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;
                const hasNotification = link.href === '/my-token' && activeToken;

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'relative flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors',
                      isActive && 'bg-primary-foreground/10 text-primary-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                    {hasNotification && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-accent" />
                    )}
                  </Link>
                );
              })}
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
               className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"


              >
                <Shield className="h-5 w-5" />
                Admin Portal
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
