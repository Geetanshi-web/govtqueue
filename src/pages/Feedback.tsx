import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { offices } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

type FeedbackType = 'complaint' | 'suggestion' | 'appreciation' | 'query';

const feedbackTypes: { value: FeedbackType; label: string }[] = [
  { value: 'complaint', label: 'Complaint' },
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'appreciation', label: 'Appreciation' },
  { value: 'query', label: 'General Query' },
];

const Feedback: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    officeId: '',
    feedbackType: '' as FeedbackType | '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.feedbackType || !formData.message) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    // Simulate submission
    setIsSubmitted(true);
    toast({
      title: 'Feedback Submitted',
      description: 'Thank you for your feedback. We will respond shortly.',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="gov-section">
          <div className="gov-container">
            <div className="max-w-lg mx-auto text-center py-16">
              <div className="h-20 w-20 rounded-full bg-status-open/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-status-open" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Thank You for Your Feedback!
              </h1>
              <p className="text-muted-foreground mb-6">
                Your feedback has been submitted successfully. Our team will review it and respond within 3-5 business days.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Reference Number: <span className="font-mono font-semibold">FB-{Date.now().toString().slice(-8)}</span>
              </p>
              <Button onClick={() => setIsSubmitted(false)} className="gov-button-primary">
                Submit Another Feedback
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-8">
        <div className="gov-container">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-8 w-8 text-accent" />
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              Citizen Feedback
            </h1>
          </div>
          <p className="text-primary-foreground/80">
            Share your experience, suggestions, or concerns with us
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="gov-section">
        <div className="gov-container">
          <div className="max-w-2xl mx-auto">
            <Card className="gov-card">
              <CardHeader>
                <CardTitle>Submit Your Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="gov-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="gov-input"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="gov-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="office">Related Office (Optional)</Label>
                      <Select
                        value={formData.officeId}
                        onValueChange={(value) => handleChange('officeId', value)}
                      >
                        <SelectTrigger id="office" className="gov-input">
                          <SelectValue placeholder="Select an office" />
                        </SelectTrigger>
                        <SelectContent>
                          {offices.map((office) => (
                            <SelectItem key={office.id} value={office.id}>
                              {office.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Feedback Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="feedbackType">
                        Feedback Type <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.feedbackType}
                        onValueChange={(value) => handleChange('feedbackType', value)}
                      >
                        <SelectTrigger id="feedbackType" className="gov-input">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {feedbackTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Brief subject"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        className="gov-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Your Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your feedback, concern, or suggestion in detail..."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="gov-input min-h-[150px]"
                    />
                  </div>

                  <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Note:</strong> All feedback is reviewed by our team. For urgent
                      matters, please contact our toll-free helpline at{' '}
                      <span className="font-semibold text-primary">1800-XXX-XXXX</span>.
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full gov-button-accent">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Feedback;
