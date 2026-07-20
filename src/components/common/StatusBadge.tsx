import React from 'react';
import { cn } from '@/lib/utils';
import { OfficeStatus } from '@/data/mockData';
import { Circle, Clock, XCircle, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
  status: OfficeStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  open: {
    label: 'Open',
    icon: Circle,
    className: 'gov-badge-open',
  },
  closed: {
    label: 'Closed',
    icon: XCircle,
    className: 'gov-badge-closed',
  },
  lunch: {
    label: 'Lunch Break',
    icon: Clock,
    className: 'gov-badge-lunch',
  },
  busy: {
    label: 'Busy',
    icon: AlertTriangle,
    className: 'gov-badge-busy',
  },
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

const iconSizes = {
  sm: 'h-3 w-3',
  md: 'h-3.5 w-3.5',
  lg: 'h-4 w-4',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showLabel = true, size = 'md' }) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn('gov-badge', config.className, sizeClasses[size])}>
      <Icon className={cn(iconSizes[size], status === 'open' && 'fill-current')} />
      {showLabel && config.label}
    </span>
  );
};

export default StatusBadge;
