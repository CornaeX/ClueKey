// ClueKey - HTTP Bypass Attack Detector
// MikuMikuBeam's HTTP Bypass mimics real browsers with headers/cookies/redirects
// This detects the telltale patterns

export default async (request: Request, context: any) => {
    const headers = request.headers;
    const ua = headers.get("user-agent") || "";
    const accept = headers.get("accept") || "";
    const acceptLang = headers.get("accept-language") || "";
    const cookie = headers.get("cookie") || "";
    
    // MikuMikuBeam sends lots of fake-but-convincing requests
    // Detection signals:
    const signals = {
      // Too many cookies sent in a single request (MikuMikuBeam copies cookies aggressively)
      excessiveCookies: (cookie.match(/;/g) || []).length > 15,
      
      // Missing critical headers that real browsers always send
      missingAcceptLanguage: !acceptLang && !!ua,
      
      // Generic user-agent from Miku's default pool (check for common patterns)
      suspiciousUA: /(curl|wget|python-requests|go-http-client|node-fetch)/i.test(ua) && !/bot|crawler|spider/i.test(ua),
      
      // High number of headers (MikuMikuBeam's bypass mode adds many realistic headers)
      excessiveHeaders: [...headers.entries()].length > 25,
    };
  
    const suspiciousScore = Object.values(signals).filter(Boolean).length;
    
    if (suspiciousScore >= 2) {
      console.warn(`[ClueKey] Suspicious request pattern (score: ${suspiciousScore}) from ${context.geo?.ip}`);
      
      // Use a challenge-response (JS challenge) instead of outright blocking
      // This stops automated flood tools while letting real users through
      if (signals.suspiciousUA || signals.missingAcceptLanguage) {
        return new Response(null, {
          status: 307,
          headers: {
            "Location": "/.netlify/functions/challenge",
            "X-ClueKey-Challenge": "true",
          },
        });
      }
    }
  
    return context.next();
  };