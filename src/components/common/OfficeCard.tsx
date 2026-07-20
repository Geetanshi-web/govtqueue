import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { Office } from '@/data/mockData';

interface OfficeCardProps {
  office: Office;
}

const OfficeCard: React.FC<OfficeCardProps> = ({ office }) => {
  return (
    <Card className="gov-card group overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-muted p-4 border-b">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                {office.department}
              </p>
              <h3 className="font-semibold text-foreground truncate">{office.name}</h3>
            </div>
            <StatusBadge status={office.status} />
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          {/* Address */}
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
            <span className="line-clamp-2">{office.address}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-foreground">{office.queueLength}</span>
              <span className="text-muted-foreground">in queue</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-foreground">{office.avgWaitTime}</span>
              <span className="text-muted-foreground">min wait</span>
            </div>
          </div>

          {/* Services Preview */}
          <div className="flex flex-wrap gap-1.5">
            {office.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="inline-flex items-center px-2 py-0.5 rounded-md bg-secondary text-xs text-secondary-foreground"
              >
                {service}
              </span>
            ))}
            {office.services.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs text-muted-foreground">
                +{office.services.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <Link to={`/office/${office.id}`}>
            <Button className="w-full gov-button-primary group-hover:bg-gov-navy-light">
              View Details
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfficeCard;
