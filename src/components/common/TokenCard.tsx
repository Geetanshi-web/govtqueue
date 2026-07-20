import React from 'react';
import { Ticket, Clock, Users, Building2, X } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Token } from '@/data/mockData';
import { useToken } from '@/context/TokenContext';
import { cn } from '@/lib/utils';

interface TokenCardProps {
  token: Token;
  showActions?: boolean;
}

const TokenCard: React.FC<TokenCardProps> = ({ token, showActions = true }) => {
  const { cancelToken } = useToken();

  const isActive = token.status === 'waiting';
  const isNearTurn = token.queuePosition <= 3 && isActive;

  return (
    <Card
      className={cn(
        'gov-card overflow-hidden transition-all duration-300',
        isNearTurn && 'ring-2 ring-accent shadow-lg',
        !isActive && 'opacity-60'
      )}
    >
      <CardHeader className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            <span className="text-sm font-medium">Digital Token</span>
          </div>
          <span
            className={cn(
              'text-xs px-2 py-0.5 rounded-full',
              token.status === 'waiting' && 'bg-accent text-accent-foreground',
              token.status === 'serving' && 'bg-success text-success-foreground',
              token.status === 'completed' && 'bg-muted text-muted-foreground',
              token.status === 'cancelled' && 'bg-destructive text-destructive-foreground'
            )}
          >
            {token.status.charAt(0).toUpperCase() + token.status.slice(1)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Token Number */}
        <div className="text-center py-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            Your Token Number
          </p>
          <p className="text-3xl md:text-4xl font-bold text-primary tracking-wider">
            {token.tokenNumber}
          </p>
        </div>

        {/* Office & Service */}
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <Building2 className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <div>
              <p className="font-medium text-foreground">{token.officeName}</p>
              <p className="text-muted-foreground">{token.service}</p>
            </div>
          </div>
        </div>

        {/* Queue Info */}
        {isActive && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <Users className="h-4 w-4" />
                <span className="text-xs">Position</span>
              </div>
              <p
                className={cn(
                  'text-2xl font-bold',
                  isNearTurn ? 'text-accent' : 'text-foreground'
                )}
              >
                #{token.queuePosition}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-xs">Est. Wait</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{token.estimatedTime}m</p>
            </div>
          </div>
        )}

        {/* Near Turn Alert */}
        {isNearTurn && (
          <div className="bg-accent/10 border border-accent rounded-lg p-3 text-center animate-pulse-slow">
            <p className="text-sm font-semibold text-accent-foreground">
              🔔 Your turn is approaching! Please proceed to the counter.
            </p>
          </div>
        )}

        {/* Created Time */}
        <p className="text-xs text-center text-muted-foreground">
          Token generated: {new Date(token.createdAt).toLocaleString()}
        </p>

        {/* Actions */}
        {showActions && isActive && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => cancelToken(token.id)}
            className="w-full text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel Token
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenCard;
