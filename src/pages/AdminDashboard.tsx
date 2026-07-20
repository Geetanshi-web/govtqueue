import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  Building2,
  Users,
  Clock,
  FileText,
  Settings,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Save,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import StatusBadge from '@/components/common/StatusBadge';
import { offices, Office, OfficeStatus } from '@/data/mockData';
import { useAdmin } from '@/context/AdminContext';
import { toast } from '@/hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAdmin();
  const [officeData, setOfficeData] = useState<Office[]>(offices);
  const [editingOffice, setEditingOffice] = useState<Office | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleUpdateStatus = (officeId: string, newStatus: OfficeStatus) => {
    setOfficeData((prev) =>
      prev.map((office) =>
        office.id === officeId ? { ...office, status: newStatus } : office
      )
    );
    toast({
      title: 'Status Updated',
      description: 'Office status has been updated successfully.',
    });
  };

  const handleUpdateQueue = (officeId: string, newQueue: number) => {
    setOfficeData((prev) =>
      prev.map((office) =>
        office.id === officeId ? { ...office, queueLength: newQueue } : office
      )
    );
    toast({
      title: 'Queue Updated',
      description: 'Queue length has been updated successfully.',
    });
  };

  const handleSaveOffice = () => {
    if (editingOffice) {
      setOfficeData((prev) =>
        prev.map((office) =>
          office.id === editingOffice.id ? editingOffice : office
        )
      );
      setIsEditDialogOpen(false);
      setEditingOffice(null);
      toast({
        title: 'Office Updated',
        description: 'Office details have been saved successfully.',
      });
    }
  };

  // Stats
  const totalQueueLength = officeData.reduce((acc, o) => acc + o.queueLength, 0);
  const openOffices = officeData.filter((o) => o.status === 'open').length;
  const avgWaitTime = Math.round(
    officeData.reduce((acc, o) => acc + o.avgWaitTime, 0) / officeData.length
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-primary text-primary-foreground border-b">
        <div className="gov-container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                <Settings className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Admin Dashboard</h1>
                <p className="text-xs text-primary-foreground/70">Queue Management System</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="gov-container py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="gov-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Offices</p>
                  <p className="text-2xl font-bold text-foreground">{officeData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="gov-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-status-open/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-status-open" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Open Now</p>
                  <p className="text-2xl font-bold text-foreground">{openOffices}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="gov-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total in Queue</p>
                  <p className="text-2xl font-bold text-foreground">{totalQueueLength}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="gov-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                  <p className="text-2xl font-bold text-foreground">{avgWaitTime} min</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="offices" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="offices">
              <Building2 className="h-4 w-4 mr-2" />
              Offices
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <MessageSquare className="h-4 w-4 mr-2" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="forms">
              <FileText className="h-4 w-4 mr-2" />
              Forms
            </TabsTrigger>
          </TabsList>

          {/* Offices Tab */}
          <TabsContent value="offices">
            <Card className="gov-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Offices</CardTitle>
                <Button size="sm" className="gov-button-accent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Office
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Office Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Queue</TableHead>
                        <TableHead>Avg Wait</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {officeData.map((office) => (
                        <TableRow key={office.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{office.name}</p>
                              <p className="text-xs text-muted-foreground">{office.department}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={office.status}
                              onValueChange={(value) =>
                                handleUpdateStatus(office.id, value as OfficeStatus)
                              }
                            >
                              <SelectTrigger className="w-[130px]">
                                <StatusBadge status={office.status} size="sm" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="busy">Busy</SelectItem>
                                <SelectItem value="lunch">Lunch</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={office.queueLength}
                              onChange={(e) =>
                                handleUpdateQueue(office.id, parseInt(e.target.value) || 0)
                              }
                              className="w-20"
                              min={0}
                            />
                          </TableCell>
                          <TableCell>{office.avgWaitTime} min</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog
                                open={isEditDialogOpen && editingOffice?.id === office.id}
                                onOpenChange={(open) => {
                                  setIsEditDialogOpen(open);
                                  if (open) setEditingOffice({ ...office });
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-lg">
                                  <DialogHeader>
                                    <DialogTitle>Edit Office</DialogTitle>
                                    <DialogDescription>
                                      Update office details and settings
                                    </DialogDescription>
                                  </DialogHeader>
                                  {editingOffice && (
                                    <div className="space-y-4 py-4">
                                      <div className="space-y-2">
                                        <Label>Office Name</Label>
                                        <Input
                                          value={editingOffice.name}
                                          onChange={(e) =>
                                            setEditingOffice({
                                              ...editingOffice,
                                              name: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Department</Label>
                                        <Input
                                          value={editingOffice.department}
                                          onChange={(e) =>
                                            setEditingOffice({
                                              ...editingOffice,
                                              department: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Address</Label>
                                        <Input
                                          value={editingOffice.address}
                                          onChange={(e) =>
                                            setEditingOffice({
                                              ...editingOffice,
                                              address: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label>Phone</Label>
                                          <Input
                                            value={editingOffice.phone}
                                            onChange={(e) =>
                                              setEditingOffice({
                                                ...editingOffice,
                                                phone: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label>Email</Label>
                                          <Input
                                            value={editingOffice.email}
                                            onChange={(e) =>
                                              setEditingOffice({
                                                ...editingOffice,
                                                email: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Opening Hours</Label>
                                        <Input
                                          value={editingOffice.openingHours}
                                          onChange={(e) =>
                                            setEditingOffice({
                                              ...editingOffice,
                                              openingHours: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() => setIsEditDialogOpen(false)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      className="gov-button-primary"
                                      onClick={handleSaveOffice}
                                    >
                                      <Save className="h-4 w-4 mr-2" />
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <Card className="gov-card">
              <CardHeader>
                <CardTitle>Citizen Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No feedback submissions yet.</p>
                  <p className="text-sm">Citizen feedback will appear here for review.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms">
            <Card className="gov-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Downloadable Forms</CardTitle>
                <Button size="sm" className="gov-button-accent">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Form
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Form management coming soon.</p>
                  <p className="text-sm">Upload and manage downloadable forms here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
