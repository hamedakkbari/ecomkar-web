# Analytics Documentation

Complete guide for EcomKar analytics implementation with privacy-first approach.

## Overview

EcomKar uses a lightweight, privacy-first analytics system that supports:
- **Plausible Analytics** (recommended)
- **Google Analytics 4** (GA4)
- **Microsoft Clarity** (optional)
- **None** (disabled)

## Provider Selection

### Environment Configuration

```bash
# Choose your analytics provider
ANALYTICS_PROVIDER=plausible  # or "ga" or "none"

# For Plausible
ANALYTICS_DOMAIN=ecomkar.com

# For Google Analytics 4
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# For Microsoft Clarity (optional)
CLARITY_ID=xxxxxxxxxxxxxxxx
```

### Provider Comparison

| Feature | Plausible | GA4 | Clarity |
|---------|-----------|-----|---------|
| Privacy | ✅ GDPR compliant | ⚠️ Requires consent | ✅ GDPR compliant |
| Performance | ✅ Lightweight | ⚠️ Heavy | ✅ Lightweight |
| Cost | 💰 Paid | ✅ Free | ✅ Free |
| Features | Basic | Advanced | Session replay |

## Event Tracking

### DOM-Based Event Tracking

Add `data-analytics` attributes to any element:

```html
<!-- Click events -->
<button data-analytics="click_hero_cta_primary">
  Get Started
</button>

<!-- View events (tracked when element enters viewport) -->
<section data-analytics="view_hero">
  <h1>Welcome to EcomKar</h1>
</section>

<!-- With additional properties -->
<a href="/services" 
   data-analytics="click_service_cta" 
   data-prop="agent_site">
  Learn More
</a>
```

### Event Naming Convention

Use descriptive, hierarchical names:

```html
<!-- Page views -->
data-analytics="view_hero"
data-analytics="view_services"
data-analytics="view_contact"

<!-- Click events -->
data-analytics="click_hero_cta_primary"
data-analytics="click_service_cta"
data-analytics="click_footer_email"

<!-- Form events -->
data-analytics="submit_contact_form"
data-analytics="submit_lead_form"
data-analytics="success_demo_teaser"

<!-- Navigation events -->
data-analytics="open_cmdk"
data-analytics="close_modal"
data-analytics="toggle_theme"
```

### Event Properties

Add additional data with `data-prop` and other attributes:

```html
<!-- Service selection -->
<button data-analytics="click_service_cta" 
        data-prop="agent_site"
        data-service="agent"
        data-budget="under_500">
  Choose Agent Service
</button>

<!-- Link tracking -->
<a href="/course" 
   data-analytics="click_course_cta"
   data-prop="hero_section">
  View Course
</a>
```

### Debug Events

Events starting with `debug_` are only logged in development:

```html
<button data-analytics="debug_test_event">
  Test (Dev Only)
</button>
```

## Manual Tracking

### Using the Hook

```tsx
import { useAnalytics } from "@/components/analytics/AnalyticsProvider";

function MyComponent() {
  const { track, pageview } = useAnalytics();

  const handleCustomEvent = () => {
    track("custom_event", {
      category: "engagement",
      value: 100
    });
  };

  const handlePageChange = () => {
    pageview("/new-page");
  };

  return (
    <div>
      <button onClick={handleCustomEvent}>
        Track Custom Event
      </button>
    </div>
  );
}
```

### Global Analytics Object

```javascript
// Access analytics globally
window.__analytics.track("event_name", { prop: "value" });
window.__analytics.pageview("/path");
```

## Privacy & Compliance

### Do Not Track (DNT)

Analytics automatically respects DNT headers:

```javascript
// DNT is automatically detected
navigator.doNotTrack === "1"
window.doNotTrack === "1"
```

### Data Filtering

Sensitive data is automatically filtered:

```html
<!-- These attributes are filtered out -->
<button data-analytics="click_submit"
        data-email="user@example.com"  <!-- Filtered -->
        data-phone="+1234567890"       <!-- Filtered -->
        data-name="John Doe">          <!-- Filtered -->
  Submit
</button>
```

### GDPR Compliance

- No cookies are set by default
- No personal data is collected
- Respects DNT headers
- Plausible is GDPR compliant by design

## Testing

### Development Testing

1. **Check Console Logs**:
   ```bash
   # Look for analytics events in console
   Analytics: click_hero_cta_primary {prop: "hero_section"}
   ```

2. **Network Tab**:
   - Filter by `plausible` or `gtag`
   - Look for POST requests to analytics endpoints

3. **Debug Events**:
   ```html
   <button data-analytics="debug_test">
     Test Event
   </button>
   ```

### Production Testing

1. **Plausible Dashboard**:
   - Check real-time events
   - Verify pageviews are tracking
   - Test custom events

2. **GA4 Debug View**:
   - Enable debug mode
   - Check real-time reports
   - Verify event parameters

3. **Health Check**:
   ```bash
   curl https://yourdomain.com/api/health
   # Check analytics_provider status
   ```

## Common Events

### Page Views

```html
<!-- Automatic pageview tracking -->
<!-- No additional markup needed -->
```

### Hero Section

```html
<section data-analytics="view_hero">
  <h1>EcomKar - AI Agents</h1>
  <button data-analytics="click_hero_cta_primary">
    Get Started
  </button>
  <button data-analytics="click_hero_cta_secondary">
    Learn More
  </button>
</section>
```

### Services Section

```html
<section data-analytics="view_services">
  <div data-analytics="click_service_card" 
       data-prop="agent"
       data-service="agent">
    <h3>AI Agent</h3>
    <button data-analytics="click_service_cta">
      Choose Service
    </button>
  </div>
</section>
```

### Contact Forms

```html
<form data-analytics="submit_contact_form">
  <input name="name" />
  <input name="email" />
  <button type="submit" data-analytics="click_submit_contact">
    Send Message
  </button>
</form>
```

### Demo Teaser

```html
<div data-analytics="view_demo_teaser">
  <form data-analytics="submit_demo_teaser">
    <input name="website" />
    <button data-analytics="click_demo_submit">
      Get Demo
    </button>
  </form>
</div>
```

## Troubleshooting

### Analytics Not Working

1. **Check Environment Variables**:
   ```bash
   echo $ANALYTICS_PROVIDER
   echo $ANALYTICS_DOMAIN
   echo $GA_MEASUREMENT_ID
   ```

2. **Check DNT Status**:
   ```javascript
   console.log("DNT:", navigator.doNotTrack);
   ```

3. **Check Provider Status**:
   ```bash
   curl https://yourdomain.com/api/health
   ```

### Events Not Tracking

1. **Check Console Logs**:
   - Look for "Analytics:" messages
   - Check for error messages

2. **Verify DOM Attributes**:
   ```html
   <!-- Correct -->
   <button data-analytics="click_test">Test</button>
   
   <!-- Incorrect -->
   <button data-analytics="">Test</button>
   ```

3. **Check Network Requests**:
   - Open DevTools → Network
   - Filter by analytics provider
   - Look for failed requests

### SPA Navigation Issues

1. **Check Router Integration**:
   - Verify `useAnalyticsRouter` is working
   - Check for pageview events in console

2. **Manual Pageview**:
   ```javascript
   window.__analytics.pageview("/new-path");
   ```

## Performance

### Optimization Tips

1. **Use Defer Loading**:
   - Scripts load with `defer` attribute
   - No render-blocking

2. **Event Debouncing**:
   - Duplicate events are debounced (300ms)
   - Prevents spam tracking

3. **Queue Management**:
   - Events are queued if provider isn't ready
   - Queue size limited to 50 events

### Monitoring

1. **Performance Impact**:
   - Minimal JavaScript overhead
   - No heavy dependencies
   - Lazy loading of analytics scripts

2. **Bundle Size**:
   - Analytics code: ~5KB gzipped
   - No external dependencies
   - Tree-shakeable

## Advanced Configuration

### Custom Event Mapping

```typescript
// Custom event transformation
const customEvent = (event: AnalyticsEvent) => {
  if (event.name === "click_service_cta") {
    return {
      ...event,
      props: {
        ...event.props,
        timestamp: Date.now(),
        user_agent: navigator.userAgent
      }
    };
  }
  return event;
};
```

### A/B Testing Integration

```html
<button data-analytics="click_cta" 
        data-variant="A"
        data-test="hero_cta_test">
  Get Started
</button>
```

## Migration Guide

### From Google Analytics

1. **Update Environment**:
   ```bash
   ANALYTICS_PROVIDER=plausible
   ANALYTICS_DOMAIN=yourdomain.com
   ```

2. **Update Event Names**:
   ```html
   <!-- Old GA4 events -->
   data-analytics="ga_event"
   
   <!-- New Plausible events -->
   data-analytics="click_event"
   ```

3. **Test Events**:
   - Verify events in Plausible dashboard
   - Check for data consistency

### From Other Analytics

1. **Disable Old Analytics**:
   - Remove old tracking codes
   - Update environment variables

2. **Update Event Attributes**:
   - Change `data-ga` to `data-analytics`
   - Update event naming convention

3. **Test Implementation**:
   - Use debug events for testing
   - Verify in new analytics dashboard

## Support

- **Documentation**: Check this guide first
- **Health Check**: `/api/health` for system status
- **Debug Mode**: Use `debug_*` events in development
- **Issues**: Create GitHub issue with console logs
