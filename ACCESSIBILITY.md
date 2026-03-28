# Accessibility Guide

## Overview

SmartCompta is built with accessibility in mind to ensure all users, including those with disabilities, can effectively use the application. We follow the **WCAG 2.1 Level AA** guidelines.

## Color & Contrast

### Color Palette (WCAG AA Compliant)

All text colors have been tested for sufficient contrast ratios against backgrounds:

- **Primary Text** (`--text-primary: #1F2937`)
  - Contrast on white: 14.5:1 (AAA compliant)
  - Used for main headings, labels, and body text
  
- **Secondary Text** (`--text-secondary: #4B5563`)
  - Contrast on white: 7.5:1 (AA compliant)
  - Used for descriptions and helper text
  
- **Tertiary Text** (`--text-tertiary: #6B7280`)
  - Contrast on white: 4.8:1 (AA compliant)
  - Used for muted text and placeholders

- **Accent Color** (`--accent: #059669`)
  - Used for interactive elements and focus states
  - Contrasts well against both light and dark backgrounds

### Error States
- **Error Text** (`--error: #DC2626`)
- **Error Background** (`--error-bg: #FEF2F2`)
- Error messages use dark red text on light red background achieving 8.2:1 contrast

## Keyboard Navigation

### Tab Order
All interactive elements are reachable via keyboard:
- Login form fields and buttons
- Sidebar navigation items
- Table pagination controls
- Form inputs and validation buttons
- Modal dialogs and alerts

### Focus Indicators
- All buttons and links show a visible focus ring using `focus-visible:ring`
- Focus rings use the accent color for clear visibility
- Minimum 3px visual indication for accessibility standards

### Keyboard Shortcuts
- **Tab**: Navigate forward through interactive elements
- **Shift+Tab**: Navigate backward through interactive elements
- **Enter**: Activate buttons and submit forms
- **Space**: Toggle checkboxes and switches
- **Escape**: Close modals and dropdowns

## Form Accessibility

### Form Labels
- All form inputs have associated `<label>` elements with `htmlFor` attributes
- Labels are visible (not hidden) and placed above or beside inputs
- Required fields are marked with clear visual indicators

### Error Messages
- Form validation errors are announced to screen readers
- Error messages are associated with inputs via `aria-describedby`
- Each error has a unique `id` for proper association
- Error text appears in red with an alert icon for visual emphasis

### Example:
```tsx
<Input
  id="email"
  aria-invalid={!!emailError}
  aria-describedby={emailError ? 'email-error' : undefined}
/>
{emailError && (
  <p id="email-error" className="text-error text-sm">
    {emailError}
  </p>
)}
```

## Navigation & Structure

### Semantic HTML
- Page headers use `<h1>`, `<h2>`, `<h3>` hierarchy
- Navigation uses `<nav>` elements
- Lists use proper `<ol>` and `<ul>` elements
- Form inputs use proper semantic `<input type="email">`, `<input type="password">`, etc.

### Breadcrumbs
- Breadcrumb navigation uses ordered lists (`<ol>`)
- Current page is marked without a link
- Screen readers announce "Breadcrumb" before the navigation

### Skip Links
- Users can skip navigation and go directly to main content (future enhancement)

## Screen Reader Support

### ARIA Labels
- Icons-only buttons have `aria-label` attributes
- Sidebar toggle: `aria-label="Toggle sidebar"`
- Notification button: `aria-label="Notifications"`
- Interactive divs have appropriate `role` and `aria-*` attributes

### ARIA Descriptions
- Complex components include `aria-describedby` for additional context
- Multi-step forms explain requirements to screen readers

### Live Regions
- Success/error messages use `role="alert"` (implicit in certain components)
- Toast notifications are announced to screen readers

## Images & Icons

### Decorative Elements
- Purely decorative icons don't need labels
- Icons that convey meaning have `aria-label` or are wrapped in labeled text

### Alternative Text
- All images have descriptive `alt` attributes
- Chart icons use labels or descriptions for context

## Tables

### DataTable Accessibility
- Table headers use `<th>` elements with proper scope
- Column headers have `scope="col"`
- Row headers have `scope="row"` when applicable
- Sortable columns indicate direction with `aria-sort="ascending"`/`aria-sort="descending"`

## Color Blindness

### Design Considerations
- Information is conveyed through multiple channels (color + icons + text)
- Status badges use both color and icons (e.g., ✓ for success, ✗ for error)
- Charts include patterns or labels, not just color
- Links are underlined or otherwise distinguished, not just colored

## Motion & Animations

### Reduced Motion
- `prefers-reduced-motion` is respected (future enhancement)
- Critical animations can be disabled for users with vestibular disorders
- Animations are not required to use the application

## Testing

### Automated Tools
- Using Lighthouse accessibility audits
- WAVE browser extension for contrast and ARIA checking
- axe DevTools for accessibility violations

### Manual Testing
- Keyboard-only navigation testing
- Screen reader testing with NVDA, JAWS, and VoiceOver
- Color contrast verification with online tools
- Browser zoom testing at 200% magnification

## Known Limitations

1. **Print Media**: Print styles have not been optimized for accessibility
2. **Mobile Screen Reader**: Mobile screen reader experience may vary by device
3. **Third-party Components**: Some Radix UI components may have minor gaps

## Continuous Improvement

Accessibility is an ongoing process. We regularly:
1. Test with real users with disabilities
2. Update libraries to their latest accessible versions
3. Monitor WCAG guidelines for improvements
4. Gather feedback from accessibility community

## Resources

- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/
- **WebAIM**: https://webaim.org/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility

## Feedback

If you find any accessibility issues, please report them with:
- Description of the issue
- Steps to reproduce
- Assistive technology used (if applicable)
- Expected behavior
