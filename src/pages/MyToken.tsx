import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Building2, ArrowRight, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import TokenCard from '@/components/common/TokenCard';
import { useToken } from '@/context/TokenContext';

const MyToken: React.FC = () => {
  const { tokens } = useToken();

  const activeTokens = tokens.filter((t) => t.status === 'waiting' || t.status === 'serving');
  const pastTokens = tokens.filter((t) => t.status === 'completed' || t.status === 'cancelled');

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-8">
        <div className="gov-container">
          <div className="flex items-center gap-3 mb-2">
            <Ticket className="h-8 w-8 text-accent" />
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">My Tokens</h1>
          </div>
          <p className="text-primary-foreground/80">
            Track your queue position and get notified when your turn approaches
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="gov-section">
        <div className="gov-container">
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="active" className="flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                Active ({activeTokens.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History ({pastTokens.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              {activeTokens.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeTokens.map((token) => (
                    <TokenCard key={token.id} token={token} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-muted rounded-lg">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Ticket className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Active Tokens</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    You don't have any active tokens. Generate a token from an office to get started.
                  </p>
                  <Link to="/offices">
                    <Button className="gov-button-primary">
                      <Building2 className="h-4 w-4 mr-2" />
                      Find an Office
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              {pastTokens.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastTokens.map((token) => (
                    <TokenCard key={token.id} token={token} showActions={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-muted rounded-lg">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <History className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Token History</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Your completed and cancelled tokens will appear here.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Tips */}
          {activeTokens.length > 0 && (
            <div className="mt-8 bg-info/10 border border-info/20 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">💡 Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Queue positions update automatically every 30 seconds</li>
                <li>• You'll see an alert when your turn is approaching (position 1-3)</li>
                <li>• Please arrive at the office before your turn to avoid delays</li>
                <li>• Cancelled tokens cannot be restored</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MyToken;
