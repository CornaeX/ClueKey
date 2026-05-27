// src/utils/requestThrottle.ts
// Client-side rate tracking to complement edge defenses

class RequestMonitor {
    private timestamps: number[] = [];
    private readonly threshold = 50; // max requests
    private readonly window = 10_000; // per 10 seconds
    
    isRateLimited(): boolean {
      const now = Date.now();
      this.timestamps = this.timestamps.filter(t => now - t < this.window);
      
      if (this.timestamps.length >= this.threshold) {
        console.warn('[ClueKey] Client-side rate limit triggered');
        return true;
      }
      
      this.timestamps.push(now);
      return false;
    }
  }
  
  export const requestMonitor = new RequestMonitor();