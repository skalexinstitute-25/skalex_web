# Design Document: Team Section Redesign

## Overview

This design document outlines the approach for redesigning the team section of the Skalex Academy website. The redesign removes photo elements from team member cards and creates a modern, professional, text-focused card layout that maintains excellent readability and visual hierarchy across all device sizes.

The current implementation uses circular profile images positioned above card content with hover effects that move images upward. The redesigned approach eliminates images entirely and focuses on typography, spacing, and subtle visual effects to create professional, accessible team cards.

## Architecture

### Component Structure

The team section follows a simple, flat architecture:

```
Team Section Container
├── Section Heading (title and subtitle)
├── First Row (3 cards - desktop)
│   ├── Team Card 1
│   ├── Team Card 2
│   └── Team Card 3
└── Second Row (2 cards - desktop, centered)
    ├── Team Card 4
    └── Team Card 5
```

### Layout System

The design uses Bootstrap's grid system (already in place) with custom CSS modifications:
- **Desktop (>992px)**: 3-2 grid layout (first row: 3 cards, second row: 2 centered cards)
- **Tablet (768-991px)**: 2-column responsive grid
- **Mobile (≤767px)**: Single column, full-width cards

### Design Principles

1. **Content-First**: Without images, text becomes the primary visual element
2. **Visual Hierarchy**: Name > Title > Social Icons
3. **Whitespace**: Generous padding and spacing for breathing room
4. **Consistency**: Uniform card dimensions and styling
5. **Accessibility**: High contrast, readable fonts, touch-friendly targets

## Components and Interfaces

### Team Card Component

Each team card is a self-contained component with the following structure:

```html
<div class="team-member">
  <div class="main-content">
    <span class="category">[Title/Role]</span>
    <h4>[Full Name]</h4>
    <ul class="social-icons">
      <li><a href="#"><i class="fab fa-facebook"></i></a></li>
      <li><a href="#"><i class="fab fa-twitter"></i></a></li>
      <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
    </ul>
  </div>
</div>
```

**Key Changes from Current Implementation:**
- Remove `<img>` tag entirely
- Reorder elements: category/title appears first, then name
- Adjust padding to remove space previously allocated for images

### Visual Design Specifications

#### Card Styling
- **Background**: White or subtle light background
- **Border Radius**: 25px (maintain existing rounded corners)
- **Padding**: 40px 30px (reduced from 140px top padding)
- **Shadow**: Subtle box-shadow for depth
- **Hover Effect**: Slight elevation with enhanced shadow

#### Typography
- **Name (h4)**:
  - Font size: 24px (desktop), 20px (mobile)
  - Font weight: 600 (semi-bold)
  - Color: Dark text color (existing theme)
  - Margin: 12px top, 16px bottom
  
- **Title/Category (span.category)**:
  - Font size: 14px (desktop), 13px (mobile)
  - Font weight: 400 (regular)
  - Color: rgba(59, 130, 246, 0.5) (existing brand blue)
  - Text transform: uppercase
  - Letter spacing: 0.5px
  - Display: block
  - Margin bottom: 8px

#### Social Icons
- **Container**: Centered, margin-top: 20px
- **Icon Size**: 36px × 36px
- **Icon Spacing**: 8px between icons
- **Icon Style**: 
  - Background: White
  - Border: 1px solid rgba(59, 130, 246, 0.2)
  - Border radius: 50%
  - Color: rgba(59, 130, 246, 0.5)
  - Hover: Background becomes brand blue, text becomes white

#### Spacing and Layout
- **Card Spacing (Desktop)**: 30px horizontal gap between cards
- **Row Spacing (Desktop)**: 80px vertical gap between rows
- **Card Spacing (Mobile)**: 30px vertical gap between cards
- **Section Padding**: 140px top, 100px bottom (desktop)

### Responsive Breakpoints

```css
/* Desktop: >992px */
- 3-2 grid layout
- Full card dimensions
- Standard typography sizes

/* Tablet: 768-991px */
- 2-column grid
- Slightly reduced padding
- Maintained typography

/* Mobile: ≤767px */
- Single column
- Reduced padding (30px 20px)
- Smaller typography
- Full-width cards
```

## Data Models

### Team Member Data Structure

Each team member is represented with the following data:

```typescript
interface TeamMember {
  name: string;           // Full name (e.g., "CA Sharang R")
  title: string;          // Role/category (e.g., "Practicing Chartered Accountant")
  socialLinks: {
    facebook?: string;    // Facebook profile URL
    twitter?: string;     // Twitter profile URL
    linkedin?: string;    // LinkedIn profile URL
  };
}
```

### Current Team Data

```typescript
const teamMembers: TeamMember[] = [
  {
    name: "CA Sharang R",
    title: "Practicing Chartered Accountant",
    socialLinks: { facebook: "#", twitter: "#", linkedin: "#" }
  },
  {
    name: "CA Mubeen Mujeeb",
    title: "Practicing Chartered Accountant",
    socialLinks: { facebook: "#", twitter: "#", linkedin: "#" }
  },
  {
    name: "CA Athul S Nath",
    title: "Practicing Chartered Accountant",
    socialLinks: { facebook: "#", twitter: "#", linkedin: "#" }
  },
  {
    name: "CA Vivek MP",
    title: "Audit associate KPMG Global",
    socialLinks: { facebook: "#", twitter: "#", linkedin: "#" }
  },
  {
    name: "Vipin Bhaktar",
    title: "Ex-Lead HR, Tosell",
    socialLinks: { facebook: "#", twitter: "#", linkedin: "#" }
  }
];
```

## CSS Implementation Strategy

### Files to Modify

1. **assets/css/templatemo-scholar.css**
   - Update `.team-member` styles
   - Remove/override image-related styles
   - Adjust padding and spacing
   - Update hover effects

2. **assets/css/responsive.css**
   - Update mobile breakpoint styles
   - Adjust tablet breakpoint styles
   - Remove image-specific responsive rules

### Key CSS Changes

#### Remove Image Styles
```css
/* REMOVE or set to display: none */
.team-member img {
  display: none;
}

/* REMOVE image hover effect */
.team-member:hover img {
  /* Remove this rule */
}
```

#### Update Card Padding
```css
.team-member .main-content {
  border-radius: 25px;
  padding: 40px 30px; /* Changed from 140px 30px 40px 30px */
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-align: center;
}
```

#### Enhanced Hover Effect
```css
.team-member:hover .main-content {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}
```

#### Typography Adjustments
```css
.team-member .main-content span.category {
  display: block;
  color: rgba(59, 130, 246, 0.5);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  font-weight: 400;
}

.team-member .main-content h4 {
  font-size: 24px;
  font-weight: 600;
  margin: 12px 0 16px 0;
  color: #2a2a2a;
}
```

#### Social Icons Styling
```css
.team-member .main-content ul {
  margin-top: 20px;
  padding: 0;
  list-style: none;
}

.team-member .main-content ul li {
  display: inline-block;
  margin: 0 4px;
}

.team-member .main-content ul li a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #fff;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  color: rgba(59, 130, 246, 0.5);
  transition: all 0.3s ease;
}

.team-member .main-content ul li a:hover {
  background-color: rgba(59, 130, 246, 0.5);
  border-color: rgba(59, 130, 246, 0.5);
  color: #fff;
  transform: scale(1.1);
}
```

#### Mobile Responsive Styles
```css
@media (max-width: 767px) {
  .team-member .main-content {
    padding: 30px 20px;
  }
  
  .team-member .main-content h4 {
    font-size: 20px;
    margin: 10px 0 14px 0;
  }
  
  .team-member .main-content span.category {
    font-size: 13px;
  }
  
  .team-member .main-content ul li a {
    width: 32px;
    height: 32px;
  }
}
```

### HTML Modifications

The HTML structure requires minimal changes:

1. **Remove image tags** from each `.team-member` div
2. **Reorder elements** (optional but recommended): Place category before name for better visual flow
3. **Maintain Bootstrap grid classes**: Keep existing `col-lg-3`, `col-md-6`, `col-sm-12` classes

Example transformation:

**Before:**
```html
<div class="team-member">
  <div class="main-content">
    <img src="assets/images/sharan.png" alt="">
    <span class="category">Practicing Chartered Accountant</span>
    <h4>CA Sharang R</h4>
    <ul class="social-icons">...</ul>
  </div>
</div>
```

**After:**
```html
<div class="team-member">
  <div class="main-content">
    <span class="category">Practicing Chartered Accountant</span>
    <h4>CA Sharang R</h4>
    <ul class="social-icons">...</ul>
  </div>
</div>
```

## Visual Design Mockup

### Desktop Layout (>992px)

```
┌─────────────────────────────────────────────────────────────┐
│                      Our Team                                │
│                 Meet Our Expert Team                         │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  PRACTICING CA   │  │  PRACTICING CA   │  │  PRACTICING CA   │
│                  │  │                  │  │                  │
│  CA Sharang R    │  │ CA Mubeen Mujeeb │  │ CA Athul S Nath  │
│                  │  │                  │  │                  │
│   [f] [t] [in]   │  │   [f] [t] [in]   │  │   [f] [t] [in]   │
└──────────────────┘  └──────────────────┘  └──────────────────┘

       ┌──────────────────┐  ┌──────────────────┐
       │  AUDIT ASSOCIATE │  │   EX-LEAD HR     │
       │   KPMG GLOBAL    │  │     TOSELL       │
       │                  │  │                  │
       │  CA Vivek MP     │  │  Vipin Bhaktar   │
       │                  │  │                  │
       │   [f] [t] [in]   │  │   [f] [t] [in]   │
       └──────────────────┘  └──────────────────┘
```

### Mobile Layout (≤767px)

```
┌─────────────────────────┐
│       Our Team          │
│  Meet Our Expert Team   │
└─────────────────────────┘

┌─────────────────────────┐
│   PRACTICING CA         │
│                         │
│   CA Sharang R          │
│                         │
│    [f] [t] [in]         │
└─────────────────────────┘

┌─────────────────────────┐
│   PRACTICING CA         │
│                         │
│   CA Mubeen Mujeeb      │
│                         │
│    [f] [t] [in]         │
└─────────────────────────┘

[... continues for all 5 members]
```



## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: No Image Elements in Team Cards

*For any* team card element in the team section, the card should not contain any img elements or have background-image styles applied.

**Validates: Requirements 1.1, 1.2**

### Property 2: All Team Cards Contain Required Elements

*For any* team card in the team section, the card must contain a name element (h4), a title/category element (span.category), and a social icons list (ul.social-icons).

**Validates: Requirements 2.1, 2.2, 2.3**

### Property 3: Consistent Card Dimensions and Spacing

*For any* two team cards displayed at the same viewport size, both cards should have equal computed width and equal spacing (margin/padding) values.

**Validates: Requirements 3.1, 4.3**

### Property 4: Visual Hierarchy Maintained

*For any* team card, the computed font-size of the name element (h4) must be greater than the computed font-size of the title element (span.category).

**Validates: Requirements 3.2**

### Property 5: Hover Effects Provide Visual Feedback

*For any* team card, when a hover state is simulated, at least one computed style property (transform, box-shadow, or background-color) must change from its non-hover state.

**Validates: Requirements 3.5, 8.2**

### Property 6: Social Icons Are Clickable

*For any* social icon link within a team card, the element must have an href attribute and be a clickable anchor element.

**Validates: Requirements 8.1**

### Example Test Cases

The following are specific examples that validate particular viewport behaviors and exact counts:

**Example 1: Exactly Five Team Members**
- The team section should contain exactly 5 team member cards
- **Validates: Requirements 2.4**

**Example 2: Desktop Layout Structure**
- At viewport width >992px, the first row should contain 3 cards
- At viewport width >992px, the second row should contain 2 cards
- **Validates: Requirements 4.1, 4.2**

**Example 3: Mobile Single Column Layout**
- At viewport width ≤767px, each team card should span 100% of container width
- At viewport width ≤767px, cards should stack vertically (one per row)
- **Validates: Requirements 6.1, 6.2**

**Example 4: Card Padding Specifications**
- Team card padding should be 40px 30px on desktop
- Team card padding should be 30px 20px on mobile
- **Validates: Requirements 1.4**

**Example 5: Typography Specifications**
- Name (h4) font-size should be 24px on desktop, 20px on mobile
- Title (span.category) font-size should be 14px on desktop, 13px on mobile
- **Validates: Requirements 3.3, 6.4**

**Example 6: Social Icon Sizing**
- Social icon links should be 36px × 36px on desktop
- Social icon links should be 32px × 32px on mobile
- **Validates: Requirements 6.5**

**Example 7: Card Visual Effects**
- Team cards should have box-shadow CSS property applied
- **Validates: Requirements 3.4**

**Example 8: Image Styles Removed**
- CSS for .team-member img should have display: none or the selector should not exist
- **Validates: Requirements 7.3**

**Example 9: Bootstrap Grid Compatibility**
- Team cards should maintain Bootstrap column classes (col-lg-3, col-md-6, col-sm-12)
- Grid layout should not break when Bootstrap CSS is loaded
- **Validates: Requirements 7.4**

**Example 10: Navigation Scroll Functionality**
- Clicking the "Team" navigation link should scroll to the element with id="team"
- **Validates: Requirements 8.3**

**Example 11: No Layout Shifts in Other Sections**
- Sections before and after the team section should maintain their original heights and positions
- **Validates: Requirements 8.4**

## Error Handling

### Missing Elements

**Scenario**: A team card is missing required elements (name, title, or social icons)

**Handling**: 
- During development, use browser console warnings to alert developers
- In production, the card should still render with available information
- CSS should gracefully handle missing elements without breaking layout

### Invalid Viewport Sizes

**Scenario**: Browser viewport is resized dynamically

**Handling**:
- CSS media queries handle all viewport transitions smoothly
- Use CSS transitions to prevent jarring layout shifts
- Test at common breakpoints: 320px, 768px, 992px, 1200px

### Browser Compatibility

**Scenario**: Older browsers may not support certain CSS features

**Handling**:
- Use CSS fallbacks for modern features (flexbox, grid)
- Test in major browsers: Chrome, Firefox, Safari, Edge
- Provide graceful degradation for older browsers
- Ensure core functionality works without advanced CSS

### Accessibility Concerns

**Scenario**: Users with screen readers or keyboard navigation

**Handling**:
- Maintain semantic HTML structure (h4 for names, proper list markup)
- Ensure social icon links have proper aria-labels
- Maintain sufficient color contrast (WCAG AA minimum)
- Ensure focus states are visible for keyboard navigation

## Testing Strategy

### Dual Testing Approach

This redesign requires both **unit tests** and **property-based tests** to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and exact specifications (viewport layouts, specific dimensions, exact counts)
- **Property tests**: Verify universal properties that should hold across all team cards and viewport sizes

Both testing approaches are complementary and necessary for comprehensive validation.

### Unit Testing Focus

Unit tests should focus on:
- **Specific viewport behaviors**: Desktop 3-2 layout, tablet responsive grid, mobile single column
- **Exact specifications**: Specific padding values, font sizes, icon dimensions
- **Edge cases**: Missing elements, empty social links, very long names
- **Integration points**: Navigation scroll, Bootstrap grid compatibility
- **Regression prevention**: Ensuring other sections aren't affected

Unit tests should NOT try to cover all possible inputs - that's what property tests are for.

### Property-Based Testing Focus

Property tests should focus on:
- **Universal invariants**: All cards have required elements, no images present
- **Consistency across cards**: Equal dimensions, consistent spacing
- **Visual hierarchy**: Name always larger than title
- **Interactive behaviors**: Hover effects work for all cards
- **Accessibility**: All social links are clickable

### Property-Based Testing Configuration

- **Testing Library**: For JavaScript/TypeScript, use **fast-check** library
- **Minimum Iterations**: Each property test must run at least **100 iterations**
- **Test Tagging**: Each property test must include a comment referencing the design property

**Tag Format**:
```javascript
// Feature: team-section-redesign, Property 1: No Image Elements in Team Cards
```

### Test Implementation Guidelines

1. **DOM Testing**: Use a testing library like Jest + jsdom or Playwright for browser automation
2. **Viewport Testing**: Use browser automation tools to test responsive behavior
3. **Visual Regression**: Consider using Percy or Chromatic for visual diff testing
4. **Accessibility Testing**: Use axe-core or similar tools for automated accessibility checks

### Test Coverage Goals

- **Unit Tests**: Cover all example test cases (11 examples listed above)
- **Property Tests**: Cover all 6 properties listed above
- **Integration Tests**: Verify team section works within full page context
- **Visual Tests**: Capture screenshots at key breakpoints for regression testing

### Manual Testing Checklist

In addition to automated tests, perform manual testing for:
- [ ] Visual appearance matches design mockups
- [ ] Smooth transitions during viewport resize
- [ ] Hover effects feel responsive and polished
- [ ] Text is readable at all viewport sizes
- [ ] Social icons are easy to click/tap
- [ ] Layout looks professional without images
- [ ] No visual bugs in major browsers (Chrome, Firefox, Safari, Edge)
- [ ] Keyboard navigation works properly
- [ ] Screen reader announces content correctly

## Implementation Notes

### Development Workflow

1. **Backup Current Files**: Create backups of CSS files before modification
2. **Incremental Changes**: Make changes incrementally and test at each step
3. **Browser DevTools**: Use browser inspector to verify computed styles
4. **Responsive Testing**: Test at multiple viewport sizes during development
5. **Cross-Browser Testing**: Test in multiple browsers before finalizing

### CSS Modification Strategy

**Phase 1: Remove Images**
- Add `display: none` to `.team-member img`
- Test that images are hidden

**Phase 2: Adjust Padding**
- Update `.team-member .main-content` padding
- Test card appearance without images

**Phase 3: Typography**
- Update font sizes, weights, and spacing
- Test readability and hierarchy

**Phase 4: Hover Effects**
- Update hover transitions
- Remove image-specific hover effects

**Phase 5: Responsive**
- Update mobile and tablet breakpoints
- Test all viewport sizes

**Phase 6: Polish**
- Fine-tune spacing, shadows, and colors
- Final cross-browser testing

### Potential Challenges

1. **Vertical Spacing**: Without images, cards may feel too compact - adjust padding generously
2. **Visual Interest**: Text-only cards need strong typography and subtle effects to remain engaging
3. **Alignment**: Ensure text is properly centered and aligned across all cards
4. **Mobile Touch Targets**: Ensure social icons are large enough for touch (minimum 44px × 44px recommended)

### Performance Considerations

- **Removed Images**: Eliminating images reduces page load time and bandwidth
- **CSS Transitions**: Keep transitions lightweight (transform and opacity are GPU-accelerated)
- **Reflow Prevention**: Avoid CSS changes that trigger layout reflows during interactions

## Conclusion

This design provides a comprehensive approach to redesigning the team section without photos. By focusing on typography, spacing, and subtle visual effects, the redesigned cards maintain professionalism and readability while creating a cleaner, more modern aesthetic. The design is fully responsive, accessible, and maintains compatibility with the existing website structure.
