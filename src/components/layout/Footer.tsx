import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="gov-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                <Building2 className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-bold">GovQueue</h3>
                <p className="text-xs text-primary-foreground/70">Queue Management Portal</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Streamlining government services by reducing wait times and providing digital queue management for citizens.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link to="/offices" className="hover:text-accent transition-colors">
                  Find Offices
                </Link>
              </li>
              <li>
                <Link to="/my-token" className="hover:text-accent transition-colors">
                  My Token Status
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-accent transition-colors">
                  Submit Feedback
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-accent transition-colors">
                  Official Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Identity Documents</li>
              <li>Property & Land</li>
              <li>Transport & Vehicles</li>
              <li>Tax Services</li>
              <li>Social Welfare</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Government Complex, Sector 1, New Delhi - 110001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>support@govqueue.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
            <p>© {new Date().getFullYear()} GovQueue Portal. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-accent transition-colors flex items-center gap-1">
                Privacy Policy <ExternalLink className="h-3 w-3" />
              </a>
              <a href="#" className="hover:text-accent transition-colors flex items-center gap-1">
                Terms of Service <ExternalLink className="h-3 w-3" />
              </a>
              <a href="#" className="hover:text-accent transition-colors flex items-center gap-1">
                Accessibility <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
