import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Backroom = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white py-16 px-4">
      <Card className="mx-auto max-w-3xl bg-white/5 border-white/15">
        <CardHeader>
          <CardTitle className="text-3xl">Back Room</CardTitle>
          <p className="text-white/70">Operations desk for team-only briefs.</p>
        </CardHeader>
        <CardContent className="space-y-4 text-white/80">
          <p>
            The Back Room aggregates staging toggles, rollout notes, and quick links to
            infrastructure dashboards. Keep this space tidy and record changes before handing off to
            production.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Track environment changes</li>
            <li>Attach QA evidence and timestamps</li>
            <li>Escalate blockers to the core crew</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Backroom;
