import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  FileText,
  Download,
  Ticket,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import StatusBadge from '@/components/common/StatusBadge';
import TokenCard from '@/components/common/TokenCard';
import { offices } from '@/data/mockData';
import { useToken } from '@/context/TokenContext';
import { toast } from '@/hooks/use-toast';

const OfficeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { generateToken, tokens } = useToken();
  const [selectedService, setSelectedService] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<ReturnType<typeof generateToken> | null>(
    null
  );

  const office = offices.find((o) => o.id === id);

  if (!office) {
    return (
      <Layout>
        <div className="gov-container py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Office Not Found</h1>
          <Link to="/offices">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Offices
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const existingToken = tokens.find(
    (t) => t.officeId === office.id && t.status === 'waiting'
  );

  const handleGenerateToken = () => {
    if (!selectedService) {
      toast({
        title: 'Please select a service',
        description: 'You must select a service to generate a token.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const newToken = generateToken(office.id, selectedService);
      setGeneratedToken(newToken);
      toast({
        title: 'Token Generated!',
        description: `Your token number is ${newToken.tokenNumber}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate token. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted border-b">
        <div className="gov-container py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/offices" className="hover:text-foreground">
              Offices
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium truncate">{office.name}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-primary py-8">
        <div className="gov-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-primary-foreground/70 text-sm mb-1">{office.department}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                {office.name}
              </h1>
              <div className="flex items-center gap-3">
                <StatusBadge status={office.status} size="lg" />
                <span className="text-primary-foreground/80 text-sm">{office.openingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="gov-section">
        <div className="gov-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="gov-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Queue</p>
                      <p className="text-2xl font-bold text-foreground">{office.queueLength}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="gov-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                      <p className="text-2xl font-bold text-foreground">{office.avgWaitTime} min</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <Card className="gov-card">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <span className="text-foreground">{office.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a href={`tel:${office.phone}`} className="text-primary hover:underline">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <a href={`mailto:${office.email}`} className="text-primary hover:underline">
                      {office.email}
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="gov-card">
                <CardHeader>
                  <CardTitle className="text-lg">Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {office.services.map((service) => (
                      <li key={service} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-status-open shrink-0" />
                        <span className="text-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Required Documents */}
              <Card className="gov-card">
                <CardHeader>
                  <CardTitle className="text-lg">Required Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {office.requiredDocs.map((doc) => (
                      <li key={doc} className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-foreground">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Downloadable Forms */}
              <Card className="gov-card">
                <CardHeader>
                  <CardTitle className="text-lg">Downloadable Forms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {office.downloadableForms.map((form) => (
                      <a
                        key={form.name}
                        href={form.url}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="text-foreground">{form.name}</span>
                        </div>
                        <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Token Generation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {existingToken ? (
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Your Active Token</h3>
                    <TokenCard token={existingToken} />
                  </div>
                ) : generatedToken ? (
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Token Generated!</h3>
                    <TokenCard token={generatedToken} />
                    <Link to="/my-token" className="block mt-4">
                      <Button className="w-full" variant="outline">
                        View All My Tokens
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Card className="gov-card">
                    <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                      <CardTitle className="flex items-center gap-2">
                        <Ticket className="h-5 w-5" />
                        Generate Token
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      {office.status === 'closed' ? (
                        <div className="text-center py-4">
                          <p className="text-muted-foreground mb-2">
                            This office is currently closed.
                          </p>
                          <p className="text-sm text-muted-foreground">{office.openingHours}</p>
                        </div>
                      ) : (
                        <>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">
                              Select Service
                            </label>
                            <Select value={selectedService} onValueChange={setSelectedService}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose a service" />
                              </SelectTrigger>
                              <SelectContent>
                                {office.services.map((service) => (
                                  <SelectItem key={service} value={service}>
                                    {service}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="bg-muted rounded-lg p-3 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Current Queue</span>
                              <span className="font-semibold text-foreground">
                                {office.queueLength} people
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Est. Wait Time</span>
                              <span className="font-semibold text-foreground">
                                ~{office.avgWaitTime} min
                              </span>
                            </div>
                          </div>

                          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                className="w-full gov-button-accent"
                                disabled={!selectedService}
                              >
                                <Ticket className="h-4 w-4 mr-2" />
                                Generate Token
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirm Token Generation</DialogTitle>
                                <DialogDescription>
                                  You are about to generate a token for:
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-2 py-4">
                                <p className="font-medium">{office.name}</p>
                                <p className="text-muted-foreground">Service: {selectedService}</p>
                                <p className="text-muted-foreground">
                                  Estimated wait: ~{office.avgWaitTime} minutes
                                </p>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button
                                  className="gov-button-accent"
                                  onClick={() => {
                                    handleGenerateToken();
                                    setIsDialogOpen(false);
                                  }}
                                >
                                  Confirm & Generate
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <p className="text-xs text-center text-muted-foreground">
                            You will be notified when your turn is approaching
                          </p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OfficeDetails;
