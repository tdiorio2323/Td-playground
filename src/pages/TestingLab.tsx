import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TestingLab = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <Card className="mx-auto max-w-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/20">
        <CardHeader>
          <CardTitle className="text-3xl">Testing Lab</CardTitle>
          <p className="text-white/70">Reserved for risky experiments and device labs.</p>
        </CardHeader>
        <CardContent className="space-y-4 text-white/80">
          <p>
            Use the lab to validate integrations, run destructive tests, and stage
            unreleased concepts. Pair with a QA engineer when flipping experimental
            flags.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Spin up preview builds</li>
            <li>Record edge-case findings</li>
            <li>Sync outcomes with the product board</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestingLab;
