---
name: 🤖 AI-Assisted Component Request
about: Request a new component to be created with AI assistance
title: 'feat(ai): Add [ComponentName] [ComponentType]'
labels: ['enhancement', 'ai-assisted', 'component']
assignees: ''
---

## Component Specification

### Basic Information
- **Component Name**: <!-- e.g., SearchBox, PetCard, UserProfile -->
- **Component Type**: <!-- Atom | Molecule | Organism -->
- **Component Location**: `src/components/[atoms|molecules|organisms]/[ComponentName]`

### Functionality Requirements
<!-- Describe what the component should do -->

**Core Features**:
- [ ] <!-- Feature 1 -->
- [ ] <!-- Feature 2 -->  
- [ ] <!-- Feature 3 -->

**Props Interface**:
```typescript
interface ComponentNameProps {
  // Specify expected props
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  // Add other props...
}
```

### Design Requirements

**Visual Variants**:
- [ ] Primary state
- [ ] Secondary state
- [ ] Loading state
- [ ] Error state
- [ ] Disabled state

**Design Tokens to Use**:
- Colors: `theme.colors.[category]`
- Typography: `theme.typography.[category]`
- Spacing: `theme.spacing.[category]`
- Other: <!-- Specify additional tokens -->

### Accessibility Requirements
- [ ] ARIA labels and roles
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Color contrast compliance (WCAG AA)
- [ ] Focus management

### Testing Requirements
- [ ] Unit tests for all props and states
- [ ] User interaction testing
- [ ] Accessibility testing
- [ ] Error boundary testing
- [ ] Integration tests (if applicable)

### Storybook Requirements
- [ ] Default story
- [ ] All variants showcase
- [ ] Interactive controls
- [ ] Usage documentation
- [ ] Accessibility tools integration

## AI Assistance Details

### Preferred AI Approach
- [ ] Full component generation via AI
- [ ] AI-assisted scaffolding with manual refinement
- [ ] AI code review and suggestions only

### Specific AI Prompts to Use
<!-- Provide specific prompts that should be used for generation -->

```
Example prompt:
"Create a [ComponentName] [ComponentType] component that [functionality]. Include TypeScript interfaces, accessibility attributes, error handling, unit tests, and Storybook story following atomic design principles. Use design tokens from theme.ts."
```

### Context for AI Assistant
<!-- Additional context that will help AI understand requirements -->

**Related Components**: 
- <!-- List related components that AI should reference -->

**Business Logic**:
- <!-- Any specific business rules or logic -->

**Integration Points**:
- <!-- APIs, services, or other components this will integrate with -->

## Acceptance Criteria

### Code Quality
- [ ] TypeScript strict mode compliance
- [ ] ESLint rules pass without warnings
- [ ] 80%+ test coverage  
- [ ] Proper error handling
- [ ] Performance optimized

### Design System Compliance  
- [ ] Uses design tokens consistently
- [ ] Follows atomic design principles
- [ ] Maintains visual consistency
- [ ] Responsive design implemented

### Documentation
- [ ] JSDoc comments for all props
- [ ] Storybook story with examples
- [ ] Usage guidelines documented
- [ ] Accessibility features documented

### AI Code Review
- [ ] Generated code reviewed for business logic accuracy
- [ ] Accessibility manually validated
- [ ] Performance implications assessed
- [ ] Integration points verified

## Additional Notes
<!-- Any other information that would be helpful -->

## Related Issues
<!-- Link to related issues or dependencies -->
Closes #[issue-number]
Related to #[issue-number]