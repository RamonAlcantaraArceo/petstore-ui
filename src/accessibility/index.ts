/**
 * Accessibility (a11y) Module
 * Comprehensive accessibility utilities and components for petstore-ui
 * 
 * @example
 * ```tsx
 * import { useAccessibility, generateFocusStyles } from './accessibility';
 * 
 * function MyComponent() {
 *   const { ariaAttributes, handleKeyDown } = useAccessibility({
 *     enterActivation: true,
 *     announceOnMount: 'Component loaded'
 *   });
 *   
 *   return (
 *     <div {...ariaAttributes} onKeyDown={handleKeyDown}>
 *       Content
 *     </div>
 *   );
 * }
 * ```
 */

// Hook exports
export {
  useAccessibilityId,
  useFocusManagement,
  useKeyboardNavigation,
  useAnnouncements,
  useAccessibility,
  validateAccessibility
} from './hooks';

// Utility function exports
export {
  calculateContrastRatio,
  meetsContrastRequirements,
  hasKeyboardAccessibility,
  generateFocusStyles,
  createScreenReaderOnlyStyles,
  isTextReadable,
  validateFormAccessibility,
  generateAccessibilityId,
  debounceAnnouncement,
  prefersReducedMotion,
  hasHighContrastMode
} from './utils';

// Type exports
export type {
  BaseAccessibilityProps,
  InteractiveAccessibilityProps,
  FormAccessibilityProps,
  ContainerAccessibilityProps,
  ButtonAccessibilityProps,
  InputAccessibilityProps,
  AccessibilityProps,
  FocusManagementProps,
  KeyboardNavigationProps,
  AnnouncementProps,
  ComprehensiveAccessibilityProps,
  WCAGLevel,
  ColorContrastProps
} from './types';