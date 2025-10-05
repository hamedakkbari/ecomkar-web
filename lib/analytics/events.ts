/**
 * Analytics Events System
 * Event queue, debouncing, throttling, and DOM event mapping
 */

import { AnalyticsEvent, AnalyticsProvider } from "./provider";

// ===========================================
// TYPES & INTERFACES
// ===========================================

interface QueuedEvent extends AnalyticsEvent {
  id: string;
  retryCount: number;
}

interface EventQueue {
  events: QueuedEvent[];
  maxSize: number;
  debounceMap: Map<string, NodeJS.Timeout>;
  viewEvents: Set<string>;
}

// ===========================================
// EVENT QUEUE
// ===========================================

class EventQueueManager {
  private queue: EventQueue;
  private provider: AnalyticsProvider | null;
  private isDev: boolean;

  constructor(provider: AnalyticsProvider | null) {
    this.provider = provider;
    this.isDev = process.env.NODE_ENV === "development";
    this.queue = {
      events: [],
      maxSize: 50,
      debounceMap: new Map(),
      viewEvents: new Set()
    };
  }

  // ===========================================
  // QUEUE MANAGEMENT
  // ===========================================

  enqueue(event: AnalyticsEvent): void {
    if (!this.provider) {
      if (this.isDev) {
        console.info("Analytics (disabled):", event.name, event.props);
      }
      return;
    }

    // Create queued event
    const queuedEvent: QueuedEvent = {
      ...event,
      id: `${event.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      retryCount: 0
    };

    // Check for duplicate events (debounce)
    const debounceKey = `${event.name}_${JSON.stringify(event.props)}`;
    const existingTimeout = this.queue.debounceMap.get(debounceKey);
    
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Debounce similar events
    const timeout = setTimeout(() => {
      this.processEvent(queuedEvent);
      this.queue.debounceMap.delete(debounceKey);
    }, 300);

    this.queue.debounceMap.set(debounceKey, timeout);
  }

  private processEvent(event: QueuedEvent): void {
    if (!this.provider) return;

    try {
      this.provider.track(event);
      
      if (this.isDev) {
        console.info("Analytics:", event.name, event.props);
      }
    } catch (error) {
      // Retry once after 500ms
      if (event.retryCount < 1) {
        event.retryCount++;
        setTimeout(() => this.processEvent(event), 500);
      } else {
        console.warn("Analytics event failed:", event.name, error);
      }
    }
  }

  // ===========================================
  // VIEW EVENTS (IntersectionObserver)
  // ===========================================

  setupViewTracking(): void {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const eventName = element.getAttribute("data-analytics");
            
            if (eventName && eventName.startsWith("view_")) {
              const eventId = `${eventName}_${element.id || element.className}`;
              
              if (!this.queue.viewEvents.has(eventId)) {
                this.queue.viewEvents.add(eventId);
                
                const props = this.extractProps(element);
                this.enqueue({
                  name: eventName,
                  props
                });
              }
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    // Observe all elements with data-analytics="view_*"
    const viewElements = document.querySelectorAll('[data-analytics^="view_"]');
    viewElements.forEach((element) => observer.observe(element));
  }

  // ===========================================
  // CLICK EVENTS
  // ===========================================

  setupClickTracking(): void {
    if (typeof window === "undefined") return;

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const analyticsElement = target.closest('[data-analytics]') as HTMLElement;
      
      if (analyticsElement) {
        const eventName = analyticsElement.getAttribute("data-analytics");
        
        if (eventName && !eventName.startsWith("view_") && !eventName.startsWith("debug_")) {
          const props = this.extractProps(analyticsElement);
          
          // Add href_path for links
          if (analyticsElement.tagName === "A") {
            const href = analyticsElement.getAttribute("href");
            if (href) {
              props.href_path = this.normalizePath(href);
            }
          }
          
          this.enqueue({
            name: eventName,
            props
          });
        } else if (eventName && eventName.startsWith("debug_") && this.isDev) {
          console.info("Debug event:", eventName, this.extractProps(analyticsElement));
        }
      }
    }, { capture: true });
  }

  // ===========================================
  // HELPER FUNCTIONS
  // ===========================================

  private extractProps(element: HTMLElement): Record<string, any> {
    const props: Record<string, any> = {};
    
    // Extract data-prop
    const dataProp = element.getAttribute("data-prop");
    if (dataProp) {
      props.prop = dataProp;
    }
    
    // Extract other data attributes (excluding analytics and sensitive data)
    const sensitiveAttrs = ["data-analytics", "data-prop", "data-email", "data-phone", "data-name"];
    
    Array.from(element.attributes).forEach((attr) => {
      if (attr.name.startsWith("data-") && !sensitiveAttrs.includes(attr.name)) {
        const key = attr.name.replace("data-", "").replace(/-/g, "_");
        props[key] = attr.value;
      }
    });
    
    return props;
  }

  private normalizePath(href: string): string {
    try {
      const url = new URL(href, window.location.origin);
      return url.pathname + url.search;
    } catch {
      return href;
    }
  }

  // ===========================================
  // PUBLIC API
  // ===========================================

  track(eventName: string, props?: Record<string, any>): void {
    this.enqueue({ name: eventName, props });
  }

  pageview(path: string): void {
    if (this.provider) {
      this.provider.pageview(path);
    }
  }

  setup(): void {
    this.setupClickTracking();
    this.setupViewTracking();
  }
}

// ===========================================
// EXPORTS
// ===========================================

export function createEventQueue(provider: AnalyticsProvider | null): EventQueueManager {
  return new EventQueueManager(provider);
}
