export function Testimonials() {
  return (
    <section className="section-spacing bg-ai-gradient">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Aspirant Success Stories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[143, 144, 145].map((rank, idx) => (
            <div key={idx} className="exam-card p-8">
              <div className="flex text-yellow-400 mb-4">★★★★★</div>
              <p className="text-muted-foreground italic mb-6">
                "ExamSarthi's AI explanations helped me understand Medieval History like never before. The mock tests are exactly like the real OPSC prelims!"
              </p>
              <div className="flex items-center gap-3 border-t pt-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  PD
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Priyanka Dash</h4>
                  <p className="text-xs text-muted-foreground">OPSC ASO Rank {rank}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}