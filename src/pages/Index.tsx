import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Users, Building2, CheckCircle2, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import SearchBar from '@/components/common/SearchBar';
import CategoryCard from '@/components/common/CategoryCard';
import OfficeCard from '@/components/common/OfficeCard';
import { offices, serviceCategories } from '@/data/mockData';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Get busy offices (highest queue length)
  const busyOffices = [...offices]
    .filter((o) => o.status !== 'closed')
    .sort((a, b) => b.queueLength - a.queueLength)
    .slice(0, 3);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      navigate(`/offices?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTh2Mkg0djJIMnYtMmgtMnYtMmgydi0yaDJ2MmgzMHptMC0xMnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="gov-container relative py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              Skip the Lines, <br className="hidden sm:block" />
              <span className="text-accent">Not Your Turn</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Generate digital tokens from home. Check real-time queue status and get notified when your turn is near. No more wasting hours in queues.
            </p>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search offices, services, departments..."
              size="lg"
              className="max-w-2xl mx-auto mb-8"
            />

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-accent">50+</p>
                <p className="text-xs md:text-sm text-primary-foreground/70">Offices</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-accent">10k+</p>
                <p className="text-xs md:text-sm text-primary-foreground/70">Tokens Daily</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-accent">2hr</p>
                <p className="text-xs md:text-sm text-primary-foreground/70">Avg Saved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="gov-section bg-muted">
        <div className="gov-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              How It Works
            </h2>
            <p className="text-muted-foreground">Get your token in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Building2,
                step: '01',
                title: 'Find Office',
                description: 'Search for the government office and service you need',
              },
              {
                icon: Clock,
                step: '02',
                title: 'Check Queue',
                description: 'View real-time queue length and estimated wait time',
              },
              {
                icon: CheckCircle2,
                step: '03',
                title: 'Get Token',
                description: 'Generate your digital token and visit when your turn approaches',
              },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                  <item.icon className="h-7 w-7" />
                </div>
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                  {item.step}
                </span>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-3 h-6 w-6 text-muted-foreground/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="gov-section">
        <div className="gov-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                Browse by Service
              </h2>
              <p className="text-muted-foreground">Find offices by service category</p>
            </div>
            <Link to="/offices">
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serviceCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Busy Offices */}
      <section className="gov-section bg-muted">
        <div className="gov-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                <span className="text-status-busy">Busy</span> Offices Right Now
              </h2>
              <p className="text-muted-foreground">Plan your visit to avoid peak hours</p>
            </div>
            <Link to="/offices">
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {busyOffices.map((office) => (
              <OfficeCard key={office.id} office={office} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gov-section bg-primary">
        <div className="gov-container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Ready to Save Time?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Start using the digital queue system today and never waste hours in government office lines again.
          </p>
          <Link to="/offices">
            <Button size="lg" className="gov-button-accent">
              Find an Office
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
