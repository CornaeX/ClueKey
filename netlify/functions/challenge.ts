// ClueKey - JavaScript Proof-of-Work Challenge
// Forces clients to solve a simple puzzle before accessing the site
// MikuMikuBeam's goroutine workers can't execute JS, so they get filtered

interface Challenge {
    answer: string;
    expires: number;
  }
  
  const challenges = new Map<string, Challenge>();
  
  // Clean up expired challenges periodically
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of challenges) {
      if (now > val.expires) challenges.delete(key);
    }
  }, 60_000);
  
  export const handler = async (event: any) => {
    const ip = event.headers["x-nf-client-connection-ip"] || "unknown";
    const query = event.queryStringParameters;
    
    // If they're submitting a challenge answer
    if (query?.answer && query?.id) {
      const challenge = challenges.get(query.id);
      if (!challenge) {
        return { statusCode: 403, body: "Challenge expired" };
      }
      challenges.delete(query.id);
      
      if (query.answer === challenge.answer) {
        // Set a session cookie to bypass future challenges
        return {
          statusCode: 302,
          headers: {
            "Location": "/",
            "Set-Cookie": `cluekey_session=${generateSessionToken()}; Max-Age=3600; HttpOnly; Secure; SameSite=Strict`,
          },
        };
      }
      return { statusCode: 403, body: "Incorrect" };
    }
    
    // Issue a new challenge
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const challengeId = crypto.randomUUID();
    
    challenges.set(challengeId, {
      answer: String(num1 + num2),
      expires: Date.now() + 30_000,
    });
    
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: `
        <!DOCTYPE html>
        <html>
        <head><title>ClueKey - Verification</title></head>
        <body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;">
          <div style="text-align:center;">
            <h1>🔑 ClueKey Verification</h1>
            <p>Solve this to continue:</p>
            <p style="font-size:24px;font-weight:bold;">${num1} + ${num2} = ?</p>
            <form>
              <input type="hidden" name="id" value="${challengeId}" />
              <input type="number" name="answer" required autofocus />
              <button type="submit">Verify</button>
            </form>
          </div>
          <script>
            // Auto-submit won't work here — real humans type the answer
            document.querySelector('form').addEventListener('submit', function(e) {
              e.preventDefault();
              const answer = this.querySelector('[name=answer]').value;
              const id = this.querySelector('[name=id]').value;
              window.location.href = '/.netlify/functions/challenge?answer=' + encodeURIComponent(answer) + '&id=' + encodeURIComponent(id);
            });
          </script>
        </body>
        </html>
      `,
    };
  };
  
  function generateSessionToken(): string {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  }