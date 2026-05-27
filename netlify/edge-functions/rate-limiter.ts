// ClueKey Rate Limiter Edge Function
// Counters: HTTP Flood, HTTP Bypass, HTTP Slowloris from MikuMikuBeam

interface RateLimitStore {
    [key: string]: {
      count: number;
      resetAt: number;
    };
  }
  
  const store: RateLimitStore = {};
  
  // Apply limits differently based on path/behavior
  const RULES = [
    // Strict: API endpoints (prevents HTTP Flood with payloads)
    { pattern: /^\/api\//, maxRequests: 30, windowMs: 60_000 },
    // Moderate: General pages
    { pattern: /^\/$|^\/[^.]*$/, maxRequests: 60, windowMs: 60_000 },
    // Relaxed: Static assets (CDN cached anyway)
    { pattern: /\.(js|css|png|jpg|svg|woff2?)$/, maxRequests: 200, windowMs: 60_000 },
  ];
  
  export default async (request: Request, context: any) => {
    const url = new URL(request.url);
    const ip = context.geo?.ip || request.headers.get("x-nf-client-connection-ip") || "unknown";
    
    // Find matching rule
    const rule = RULES.find(r => r.pattern.test(url.pathname));
    if (!rule) return context.next();
  
    const key = `${ip}:${url.pathname}`;
    const now = Date.now();
    const entry = store[key];
  
    if (!entry || now > entry.resetAt) {
      store[key] = { count: 1, resetAt: now + rule.windowMs };
      return context.next();
    }
  
    entry.count++;
    
    if (entry.count > rule.maxRequests) {
      // Detect Slowloris-like behavior (slow headers)
      const contentLength = request.headers.get("content-length");
      const connection = request.headers.get("connection");
      
      if (connection?.toLowerCase() === "keep-alive" && !contentLength) {
        // Suspicious: Slowloris keeps connections open with no body
        console.warn(`[ClueKey] Slowloris detected from ${ip}`);
      }
  
      return new Response("Rate limit exceeded", {
        status: 429,
        headers: {
          "Retry-After": "60",
          "X-ClueKey-Blocked": "true",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  
    return context.next();
  };