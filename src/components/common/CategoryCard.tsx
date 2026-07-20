import React from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Home,
  Car,
  Receipt,
  Users,
  Briefcase,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceCategory } from '@/data/mockData';

const iconMap: Record<string, LucideIcon> = {
  'id-card': CreditCard,
  home: Home,
  car: Car,
  receipt: Receipt,
  users: Users,
  briefcase: Briefcase,
};

interface CategoryCardProps {
  category: ServiceCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const Icon = iconMap[category.icon] || Briefcase;

  return (
    <Link to={`/offices?category=${category.id}`}>
      <Card className="gov-card group cursor-pointer h-full">
        <CardContent className="p-5 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
          <p className="text-sm text-muted-foreground flex-1">{category.description}</p>
          <p className="text-xs text-primary font-medium mt-3">
            {category.officeCount} offices available
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
