import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import SearchBar from '@/components/common/SearchBar';
import OfficeCard from '@/components/common/OfficeCard';
import { offices, serviceCategories, OfficeStatus } from '@/data/mockData';

const OfficeList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState<OfficeStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState<'name' | 'queue' | 'wait'>('queue');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredOffices = useMemo(() => {
    let result = [...offices];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (office) =>
          office.name.toLowerCase().includes(query) ||
          office.department.toLowerCase().includes(query) ||
          office.services.some((s) => s.toLowerCase().includes(query)) ||
          office.address.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((office) => office.status === statusFilter);
    }

    // Sort
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'queue':
        result.sort((a, b) => a.queueLength - b.queueLength);
        break;
      case 'wait':
        result.sort((a, b) => a.avgWaitTime - b.avgWaitTime);
        break;
    }

    return result;
  }, [searchQuery, statusFilter, categoryFilter, sortBy]);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-8">
        <div className="gov-container">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
            Government Offices
          </h1>
          <p className="text-primary-foreground/80">
            Find and visit government offices with real-time queue information
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-6 border-b bg-background sticky top-16 z-40">
        <div className="gov-container">
          <div className="flex flex-col md:flex-row gap-4">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search offices, services..."
              className="flex-1"
            />
            <div className="flex gap-2 flex-wrap">
              <Select
                value={statusFilter}
                onValueChange={(v) => setStatusFilter(v as OfficeStatus | 'all')}
              >
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                <SelectTrigger className="w-[160px]">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="queue">Shortest Queue</SelectItem>
                  <SelectItem value="wait">Shortest Wait</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="gov-section">
        <div className="gov-container">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredOffices.length}</span>{' '}
              offices
            </p>
          </div>

          {filteredOffices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffices.map((office) => (
                <OfficeCard key={office.id} office={office} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No offices found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default OfficeList;
