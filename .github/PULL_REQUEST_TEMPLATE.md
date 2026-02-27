## Description
<!-- Brief description of changes made -->

## Type of Change
- [ ] 🤖 AI-assisted new feature
- [ ] 🐛 Bug fix (AI-assisted or manual)
- [ ] 🔧 Refactoring with AI suggestions
- [ ] 📚 Documentation update
- [ ] 🧪 Test improvements
- [ ] 🎨 Design system updates
- [ ] ⚡ Performance improvements

## AI Assistance Details

### AI Tools Used
- [ ] GitHub Copilot
- [ ] ChatGPT/OpenAI
- [ ] Claude/Anthropic  
- [ ] Cursor AI
- [ ] Other: <!-- Specify -->

### Level of AI Assistance
- [ ] **Full Generation**: AI generated most/all of the code
- [ ] **Partial Assistance**: AI helped with specific functions/components
- [ ] **Code Review**: AI provided suggestions for existing code
- [ ] **Minimal/None**: Primarily manual development

### AI Prompts Used
<details>
<summary>Show AI prompts for transparency and future reference</summary>

```
1. Initial prompt:
"[Include the main prompt used to generate core functionality]"

2. Follow-up prompts:
"[Include any refinement or additional prompts]"

3. Code review prompts:
"[Include any prompts used for review/improvement]"
```
</details>

## Changes Made

### Components Added/Modified
- [ ] `src/components/[path]/ComponentName.tsx` - <!-- Brief description -->
- [ ] `src/components/[path]/ComponentName.stories.tsx` - <!-- Story details -->
- [ ] `src/components/[path]/ComponentName.test.tsx` - <!-- Test coverage -->

### Other Files
- [ ] `src/tokens/theme.ts` - <!-- Token changes -->
- [ ] `README.md` - <!-- Documentation updates -->
- [ ] Package dependencies - <!-- Dependency changes -->

## Testing Performed

### Automated Tests
- [ ] Unit tests pass (`bun run test`)
- [ ] TypeScript compilation passes (`bun run type-check`)
- [ ] Linting passes (`bun run lint`)
- [ ] Storybook builds successfully (`bun run build-storybook`)

### Manual Testing  
- [ ] Component renders correctly in isolation
- [ ] All props work as expected
- [ ] Error states handled appropriately
- [ ] Loading states display correctly
- [ ] Responsive design verified

### Accessibility Testing
- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility verified
- [ ] Color contrast checked
- [ ] ARIA attributes validated
- [ ] Focus management tested

### Cross-Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox  
- [ ] Safari
- [ ] Edge

## AI Code Review Notes

### Human Review Areas
<!-- Describe what aspects were manually reviewed beyond AI generation -->
- [ ] Business logic validation
- [ ] Security considerations
- [ ] Performance implications
- [ ] Integration with existing code
- [ ] Edge case handling

### AI-Generated Code Quality
- [ ] Generated code follows project conventions
- [ ] TypeScript types are accurate and complete
- [ ] Error handling is comprehensive
- [ ] Accessibility requirements met
- [ ] Performance considerations addressed

### Manual Adjustments Made
<!-- List any changes made to AI-generated code -->
- <!-- Adjustment 1 -->
- <!-- Adjustment 2 -->
- <!-- Adjustment 3 -->

## Design System Compliance

- [ ] Uses design tokens from `theme.ts`
- [ ] Follows atomic design principles
- [ ] Consistent with existing components
- [ ] Responsive design implemented
- [ ] Proper CSS class naming (BEM methodology)

## Documentation Updates

- [ ] JSDoc comments added for all public APIs
- [ ] Storybook story includes usage examples
- [ ] README updated (if applicable)
- [ ] CONTRIBUTING.md updated (if applicable)
- [ ] Copilot instructions updated (if needed)

## Breaking Changes
- [ ] No breaking changes
- [ ] Breaking changes (describe below)

### Breaking Change Details
<!-- If there are breaking changes, describe them here -->

## Performance Impact

### Bundle Size Impact
- [ ] Minimal impact (< 5KB)
- [ ] Moderate impact (5-20KB)
- [ ] Significant impact (> 20KB) - <!-- Justify if necessary -->

### Runtime Performance
- [ ] No performance impact
- [ ] Performance improvement
- [ ] Potential performance impact - <!-- Explain mitigation -->

## Screenshots/Recordings

### Component Examples
<!-- Include screenshots of the component in various states -->

### Storybook Stories
<!-- Include screenshots of Storybook stories showing component variants -->

## Checklist

### Code Quality
- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Code is documented with JSDoc comments
- [ ] No TODO comments left in production code
- [ ] No console.log statements in production code

### Testing
- [ ] Unit tests added for new functionality
- [ ] Integration tests added (if applicable)
- [ ] Test coverage is adequate (≥ 80%)
- [ ] All tests pass locally

### Documentation  
- [ ] Storybook story created/updated
- [ ] Component props documented
- [ ] Usage examples provided
- [ ] Accessibility features documented

### Review Ready
- [ ] PR is ready for review
- [ ] Related issues are linked
- [ ] Reviewers assigned
- [ ] Labels applied correctly

## Related Issues
<!-- Link related issues -->
Closes #[issue-number]
Fixes #[issue-number]  
Related to #[issue-number]

## Reviewer Focus Areas
<!-- Guide reviewers on what to focus on -->

**Please pay special attention to**:
- [ ] Business logic accuracy (AI-generated code)
- [ ] Accessibility implementation
- [ ] Performance implications
- [ ] Integration with existing components
- [ ] Edge case handling

---

## For Reviewers: AI Code Review Guidelines

When reviewing AI-assisted code, please verify:
1. **Business Logic**: AI understood requirements correctly
2. **Architecture**: Follows project patterns and atomic design
3. **Accessibility**: Manual testing of screen reader/keyboard usage
4. **Performance**: No unnecessary re-renders or optimizations needed
5. **Security**: Input validation and XSS prevention
6. **Integration**: Works well with existing components

**AI-Generated Code Quality Checklist**:
- [ ] TypeScript types are accurate and complete
- [ ] Error handling is comprehensive
- [ ] Component props follow established patterns
- [ ] Design tokens used consistently
- [ ] Test coverage is adequate
- [ ] Documentation is helpful and accurate