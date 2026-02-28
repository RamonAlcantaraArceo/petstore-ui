/**
 * English (en) locale translations
 * Primary locale for the petstore-ui component library
 */

export const en = {
  components: {
    button: {
      loading: 'Loading: {content}',
      submit: 'Submit',
      cancel: 'Cancel',
      delete: 'Delete',
      save: 'Save',
      edit: 'Edit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      ariaLabel: 'Button: {content}',
      ariaLabelLoading: 'Loading: {content}',
      ariaPressed: 'Button pressed: {content}',
      ariaExpanded: 'Button expanded: {content}'
    },
    input: {
      required: 'Required field',
      invalid: 'Invalid input',
      placeholder: 'Enter text...',
      ariaLabel: 'Input field: {label}',
      ariaRequired: 'Required input: {label}',
      ariaInvalid: 'Invalid input: {label}',
      emailPlaceholder: 'Enter email address...',
      passwordPlaceholder: 'Enter password...',
      searchPlaceholder: 'Search...'
    },
    card: {
      ariaLabel: 'Card: {title}',
      ariaLabelContent: 'Card content: {content}',
      defaultTitle: 'Card',
      moreActions: 'More actions'
    },
    navigation: {
      menu: 'Navigation menu',
      mainMenu: 'Main navigation',
      skipToMain: 'Skip to main content',
      openMenu: 'Open menu', 
      closeMenu: 'Close menu'
    },
    form: {
      submitSuccess: 'Form submitted successfully',
      submitError: 'Error submitting form',
      validationError: 'Please fix validation errors',
      fieldRequired: 'This field is required',
      fieldInvalid: 'This field is invalid'
    },
    loading: {
      default: 'Loading...',
      content: 'Loading content...',
      page: 'Loading page...',
      ariaLabel: 'Loading indicator'
    },
    error: {
      general: 'An error occurred',
      notFound: 'Content not found',
      network: 'Network error occurred',
      ariaLabel: 'Error message: {message}'
    }
  },
  stories: {
    button: {
      title: 'Button Component',
      description: 'Basic button component with multiple variants, sizes, and accessibility features. Supports primary, secondary, and danger color schemes.',
      variants: {
        primary: 'Primary Button',
        secondary: 'Secondary Button',
        danger: 'Danger Button'
      },
      sizes: {
        small: 'Small Button',
        medium: 'Medium Button',
        large: 'Large Button'
      },
      states: {
        default: 'Default Button',
        disabled: 'Disabled Button',
        loading: 'Loading Button',
        fullWidth: 'Full Width Button'
      },
      examples: {
        clickMe: 'Click me',
        submitForm: 'Submit Form',
        deleteAccount: 'Delete Account',
        saveChanges: 'Save Changes',
        cancelOrder: 'Cancel Order'
      },
      accessibility: {
        title: 'Accessibility Features',
        description: 'Demonstrates button accessibility features including ARIA labels, focus management, and keyboard navigation.'
      },
      allVariants: {
        title: 'All Variants',
        description: 'Shows all button variants in a single view for comparison.'
      }
    },
    input: {
      title: 'Input Component',
      description: 'Form input component with validation, accessibility features, and multiple types.',
      variants: {
        text: 'Text Input',
        email: 'Email Input',
        password: 'Password Input',
        search: 'Search Input'
      },
      states: {
        default: 'Default Input',
        required: 'Required Input',
        invalid: 'Invalid Input',
        disabled: 'Disabled Input'
      },
      examples: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        password: 'Password'
      }
    },
    card: {
      title: 'Card Component',
      description: 'Flexible card component for displaying content with optional headers, footers, and actions.',
      variants: {
        basic: 'Basic Card',
        withHeader: 'Card with Header',
        withFooter: 'Card with Footer',
        interactive: 'Interactive Card'
      },
      examples: {
        title: 'Example Card',
        content: 'This is an example card with some content to demonstrate the component.',
        headerTitle: 'Card Header',
        footerText: 'Card Footer'
      }
    },
    general: {
      examples: 'Examples',
      variants: 'Variants',
      states: 'States',
      accessibility: 'Accessibility',
      documentation: 'Documentation',
      playground: 'Playground'
    }
  },
  accessibility: {
    announcements: {
      localeChanged: 'Language changed to {locale}',
      pageLoaded: 'Page loaded',
      contentUpdated: 'Content updated',
      formSubmitted: 'Form submitted',
      errorOccurred: 'Error occurred: {error}'
    },
    instructions: {
      keyboard: 'Use Tab to navigate between elements',
      buttonActivation: 'Press Enter or Space to activate button',
      menuNavigation: 'Use arrow keys to navigate menu items',
      formNavigation: 'Use Tab to move between form fields'
    },
    labels: {
      required: 'Required',
      optional: 'Optional',
      invalid: 'Invalid',
      loading: 'Loading',
      expanded: 'Expanded',
      collapsed: 'Collapsed'
    }
  },
  petstore: {
    common: {
      close: 'Close',
      selectLabel: 'Select option',
      status: {
        available: 'Available',
        pending: 'Pending',
        sold: 'Sold',
        placed: 'Placed',
        approved: 'Approved',
        delivered: 'Delivered',
        info: 'Info',
        default: 'Status',
      },
    },
    navigation: {
      tabsAriaLabel: 'Petstore sections',
      pets: 'Pets',
      orders: 'Orders',
      users: 'Users',
    },
    tabs: {
      activeLabel: 'Active tab',
    },
    select: {
      statusLabel: 'Status',
      petTypeLabel: 'Pet type',
      petTypes: {
        dog: 'Dog',
        cat: 'Cat',
        bird: 'Bird',
        fish: 'Fish',
      },
    },
    modal: {
      defaultTitle: 'Modal',
      openButton: 'Open modal',
      content: 'Modal content goes here.',
      editPetTitle: 'Edit Pet',
      smallTitle: 'Small modal',
      mediumTitle: 'Medium modal',
      largeTitle: 'Large modal',
      reopenButton: 'Re-open modal',
      focusTrapTitle: 'Focus trap demo',
      firstInputPlaceholder: 'First input',
      secondInputPlaceholder: 'Second input',
      doneButton: 'Done',
    },
    table: {
      ariaLabel: 'Data table',
      emptyState: 'No data available',
      emptyInventory: 'No inventory found',
      headers: {
        status: 'Status',
        count: 'Count',
      },
    },
  }
} as const;

export type EnLocale = typeof en;
export type TranslationKey = keyof typeof en | string;