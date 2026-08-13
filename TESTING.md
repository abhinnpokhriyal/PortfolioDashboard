# Testing Documentation

## Overview
This project follows a **strategic testing approach** — testing high-value business logic while skipping low-value presentational components.

## Testing Philosophy

### ✅ What We Test (High ROI)
- **Business logic functions** (`lib/*.ts`) — pure algorithms with clear inputs/outputs
- **Form validation logic** — user-facing validation that can silently break
- Edge cases, boundary conditions, and error handling

### ❌ What We Don't Test (Low ROI)
- **UI components** — presentational React components (About, Experience, Projects, Home)
- **Navigation & Layout** — simple DOM structure (Navbar, Footer)
- **Animations** — Framer Motion effects (better verified visually)
- **Static content rendering** — no dynamic logic to test
- **Third-party integrations** — html2canvas, jspdf (already tested by maintainers)

## Test Coverage

**Target:** 80%+ coverage on `lib/` folder  
**Actual:** 86.02% coverage on `lib/` folder ✅

| File | Coverage | Tests |
|------|----------|-------|
| `lib/keywordExtractor.ts` | 78.57% | 15 test cases |
| `lib/resumeOptimizer.ts` | 100% | 19 test cases |
| `app/contact/validation` | 100% | 16 test cases |
| **Total** | **86.02%** | **50 test cases** |

## Test Suites

### 1. `lib/__tests__/keywordExtractor.test.ts` (15 tests)
Tests the job description keyword extraction algorithm.

**Covered scenarios:**
- ✅ Basic tech keyword extraction (React, TypeScript, Next.js)
- ✅ Role-specific keywords (Senior, Frontend, UI/UX)
- ✅ Empty input handling
- ✅ Case-insensitive matching
- ✅ Required vs. Nice-to-have skill splitting
- ✅ Multiple section format variations ("nice to have", "preferred", "good to have")
- ✅ Complex tech stack combinations
- ✅ Hyphenated and dotted variations (Next.js, front-end)
- ✅ Design tool keywords (Figma, Sketch, Jira)
- ✅ Keyword de-duplication
- ✅ Special character handling
- ✅ Return type consistency
- ✅ Fallback splitting when no explicit sections
- ✅ Real-world job description format

**Why these tests matter:**
- Keyword extraction is the core algorithm driving the ATS match score
- Silent failures would result in incorrect job matching
- Many edge cases in real job descriptions (formatting variations)

---

### 2. `lib/__tests__/resumeOptimizer.test.ts` (19 tests)
Tests the resume optimization and ATS scoring algorithm.

**Covered scenarios:**
- ✅ 100% score for perfect keyword match
- ✅ 0% score for no keyword match
- ✅ 50% score calculation accuracy
- ✅ Empty keywords graceful handling
- ✅ Case-insensitive keyword normalization
- ✅ Special character normalization (React.js vs reactjs)
- ✅ Missing required skills detection
- ✅ Low-score suggestions (< 50%)
- ✅ Medium-score suggestions (50-75%)
- ✅ High-score suggestions (≥ 75%)
- ✅ Quantification and summary suggestions always included
- ✅ Top 5 missing keywords in suggestions
- ✅ Optimized bullets generation per experience
- ✅ Keyword matching in experience bullets
- ✅ Keyword matching in project highlights
- ✅ Cross-section keyword matching (summary, skills, experience, projects)
- ✅ No experience edge case
- ✅ Score rounding to nearest integer

**Why these tests matter:**
- Score calculation directly impacts user's resume optimization decisions
- Normalization bugs could cause false negatives (missing valid matches)
- Suggestion quality is critical for user value

---

### 3. `app/contact/__tests__/validation.test.ts` (16 tests)
Tests the contact form validation logic.

**Covered scenarios:**
- ✅ Valid form with all required fields
- ✅ Valid form without optional subject
- ✅ Empty name validation
- ✅ Whitespace-only name rejection
- ✅ Empty email validation
- ✅ Whitespace-only email rejection
- ✅ Invalid email format (no @)
- ✅ Invalid email format (no domain)
- ✅ Invalid email format (no TLD)
- ✅ Email with spaces rejection
- ✅ Complex valid email formats (john.doe@example.com, john+tag@company.co.uk)
- ✅ Empty message validation
- ✅ Whitespace-only message rejection
- ✅ Multiple field errors simultaneously
- ✅ Whitespace trimming behavior
- ✅ Names with special characters (O'Brien, Müller)
- ✅ Very long messages (5000+ chars)

**Why these tests matter:**
- Form validation is user-facing and creates poor UX if broken
- Email regex is notoriously tricky and prone to edge cases
- Contact form is the primary conversion point for job opportunities

---

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Coverage Thresholds

Jest is configured to enforce 80% coverage on the `lib/` folder:

```javascript
// jest.config.js
coverageThreshold: {
  'lib/': {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
}
```

## Why This Strategy?

### Benefits of Strategic Testing
1. **High ROI** — Tests focus on code with the highest bug potential
2. **Maintainability** — Fewer tests = less maintenance burden
3. **Fast CI/CD** — 50 tests run in < 1 second
4. **Clear intent** — Tests document critical business logic
5. **Portfolio value** — Demonstrates understanding of testing tradeoffs

### What We Avoided
- ❌ **Over-testing** — 300+ tests for 100% coverage would waste time
- ❌ **Brittle tests** — UI component tests break on every style change
- ❌ **False confidence** — High coverage ≠ quality tests
- ❌ **Slow feedback** — Large test suites slow down development

## Interview Talking Points

When discussing this project's testing strategy:

> "I implemented strategic testing for my portfolio — 50 test cases achieving 86% coverage on business logic (keyword extraction, ATS scoring, form validation). I deliberately skipped UI component tests because they're low ROI — they break on every style change and don't catch real bugs. Instead, I focused on pure functions with complex edge cases that could silently fail. This approach matches what I did at Optum, where I maintained 80%+ coverage on critical paths while keeping the test suite fast and maintainable."

## Continuous Integration

Tests run automatically on:
- Pre-commit (recommended hook)
- Pull request validation
- Production build verification

## Future Improvements

If this project needed more testing:
1. **E2E tests** — Playwright for critical user flows (form submission, PDF download)
2. **Visual regression** — Snapshot testing for design consistency
3. **Performance tests** — Lighthouse CI for load time monitoring
4. **Accessibility tests** — axe-core automated WCAG checks

But for a portfolio project, **the current coverage is optimal** — showcasing testing skills without over-engineering.

---

**Last updated:** February 2025  
**Test framework:** Jest 29 + Testing Library  
**Coverage:** 86.02% (lib folder)
