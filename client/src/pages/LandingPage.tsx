import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { CalendarDays, Clock3, Sparkles } from 'lucide-react';
import { navigationService } from '@/shared/services/navigation.service';
import GetStartedButton from '@/shared/components/GetStartedButton';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="w-full border-b bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">TimeTable Generator</h1>

          <Button onClick={() => navigationService.navigate('/login')}>Login</Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Smart Time Table
              <span className="text-primary"> Generation System</span>
            </h2>

            <p className="text-muted-foreground text-lg">
              Automatically generate optimized college timetables with intelligent scheduling,
              conflict detection, and faculty management.
            </p>

            <div className="flex gap-4">
              <GetStartedButton onClick={() => navigationService.navigate('/login')} />

              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Feature Cards */}
          <div className="grid gap-4">
            <Card>
              <CardContent className="p-6 flex gap-4 items-start">
                <CalendarDays className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Auto Scheduling</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate timetables automatically in seconds.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex gap-4 items-start">
                <Clock3 className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Conflict Detection</h3>
                  <p className="text-sm text-muted-foreground">
                    Avoid faculty & class overlaps intelligently.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex gap-4 items-start">
                <Sparkles className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Smart Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Balanced and optimized schedules for institutions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} TimeTable Generator. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
