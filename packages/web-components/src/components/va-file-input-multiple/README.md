# VA File Input Multiple Component - Architecture & Usage Overview

## Component Overview

The `va-file-input-multiple` component is a presentational multi-file upload web component that wraps individual `va-file-input` components. It focuses on managing the UI and user interactions while delegating business logic to consuming applications.

Each `va-file-input` instance is assigned a unique `id` attribute in the format `instance-{index}`.

## Architecture

### Overview

- **State**: The component uses two `@State` decorators for internal reactive state management with the primary one tracking the state of all files.
- **Events**: Aggregates child component events and emits `vaMultipleChange` for file changes and emits `vaFileInputError` for file size and file type validation errors.
- **Slot Content**: Slot content is captured, cloned, and distributed to individual file input instances
- **Error Handling**: Errors are assigned to individual files using the `errors` and `passwordErrors` props to signify which file has an error.
- **Integration Patterns**: Designed to work with external state management, file upload services, and encryption detection libraries

### Key Integration Considerations

- **State Arrays**: All props that manage file-specific data (`errors`, `passwordErrors`, `percentUploaded`, `encrypted`, `resetVisualState`) are arrays that correspond by index to the files
- **File Index Detection**: Use the `changed: true` property in the `state` array to identify which file triggered an event
- **Encryption Workflow**: Integrate with file analysis libraries (like the platform utility `standardFileChecks`) to detect encrypted PDFs
- **Progress Tracking**: Use `percentUploaded` array to show upload progress, setting to `null` when complete
- **Error Recovery**: Use `resetVisualState` to automatically reset file inputs to initial state when errors occur

### State Management

The component uses two `@State` decorators internallyto manage internal reactive state:

#### `@State() files: FileIndex[]`

- **Purpose**: Core state array that tracks all files and their metadata
- **Initial Value**: Starts with one empty file input; `[{ key: 0, file: null, content: null }]`
- **Structure**: Each file entry contains:
  - `key`: Unique identifier for the file input instance
  - `file`: A File object with all browser File API properties
  - `content`: Cloned slot content nodes for this specific file input
- **Behavior**: Automatically adds new empty file input when files are added; removes entries when files are deleted

#### `@State() valueAdded: boolean`

- **Purpose**: The state serves as a **one-time initialization flag** to track whether files added via the `value` prop have already been added to the `files` state or not.
- **Initial Value**: `false`
- **Behavior**: Set to `true` after files from the `value` prop are processed in `componentDidRender()`
- **Use Case**: Ensures files provided via the `value` prop are only added to state once during component initialization

### Events

#### Primary Event: `vaMultipleChange`

This event will be emitted when any change to a file occurs.

```typescript
{
  action: 'FILE_ADDED' | 'FILE_UPDATED' | 'FILE_REMOVED' | 'PASSWORD_UPDATE',
  file: File,           // The file that triggered the event. 
  state: FileDetails[]  // An array of objects representing the current state of all files including the file that triggered the event.
}
```

The `FileDetails` interface is defined as:

```typescript
interface FileDetails {
  file: File,
  changed: Boolean,
  password?: string
}
```

Each `vaMultipleChange` event includes a `state` array where:

- **`changed: true`**: Indicates which file was affected by the current action
- **`changed: false`**: All other files in the current state
- **Deletion Exception**: No `changed` property is set during `FILE_REMOVED` actions

```typescript
// Example: A new file added
state: [
  { file: existingFile1, changed: false, password: undefined },
  { file: newFile, changed: true, password: undefined },  // ← This slot received a file
  { file: null, changed: false, password: undefined }     // ← New empty slot added ready for a file
]
```

The File object of the file that triggered the change event is available in both the `file` property and the `state` array. This provides both granular (what changed) and holistic (complete state) information in a single event.

#### Error Event: `vaFileInputError`

This event is emitted when a file size or file type validation fails in any `va-file-input` child component.

```typescript
{
  index: number,  // The index of the file that triggered the error
  message: string // The error message
}
```

### Event Flow & Triggers

The `va-file-input-multiple` component listens to three types of `va-file-input` component events:

#### File Change: `vaChange`

This event is emitted when a file is selected, changed, or removed in any `va-file-input` child component.

- **Trigger**: User selects, changes, or removes a file
- **Action**:
  - `FILE_UPDATED`: If `newFile` exists and `fileObject.file` exists
  - `FILE_ADDED`: If `newFile` exists and `fileObject.file` is null
  - `FILE_REMOVED`: If no `newFile` (deletion)

#### Password Change: `vaPasswordChange`

This event is emitted when a password is entered or changed in any `va-file-input` child component.

- **Trigger**: User enters/changes password for encrypted files
- **Frequency**: Event fires on every keystroke; consumers should implement debouncing to avoid excessive processing
- **Action**: 
  - `PASSWORD_UPDATE`: Always

#### Validation Error: `vaFileInputError`

This event is emitted when a file size or file type validation fails in any `va-file-input` child component.

- **Trigger**: Built-in validation fails (file size, type, empty file)
- **Action**: Event emitted with error message and file index

#### Password Event Flow

Password events operate independently from file events:

- **Separate Handler**: `handlePasswordChange()` vs `handleChange()`
- **State Persistence**: Password is stored in `fileObject.password`
- **No File Creation**: Password changes don't trigger new file slots
- **Immediate Emission**: Password events emit immediately without additional state changes
- **Debouncing Required**: Since password events fire on every keystroke, consumers should implement debouncing to avoid excessive processing

#### Password Event Debouncing

Since `PASSWORD_UPDATE` events fire on every keystroke, it's essential to implement debouncing to prevent excessive API calls or processing:

```jsx
import { debounce } from 'lodash';

const DEBOUNCE_WAIT = 1000; // Wait 1 second after user stops typing

// Create debounced password handler
const debouncePassword = useMemo(
  () => debounce(({ file, password }, index) => {
    if (password && password.length > 0) {
      // Clear previous password errors
      setPasswordErrors(prev => {
        const newPasswordErrors = [...prev];
        newPasswordErrors[index] = null;
        return newPasswordErrors;
      });
      
      // Process the encrypted file with password
      processEncryptedFile(file, password, index);
    }
  }, DEBOUNCE_WAIT),
  [processEncryptedFile]
);

// In your PASSWORD_UPDATE handler
case 'PASSWORD_UPDATE': {
  const updatedIndex = state.findIndex(
    fileDetails => fileDetails.changed === true
  );
  if (updatedIndex !== -1) {
    const fileDetails = state[updatedIndex];
    debouncePassword(fileDetails, updatedIndex);
  }
  break;
}
```

**Key Benefits:**
- **Performance**: Reduces unnecessary API calls during typing
- **User Experience**: Prevents flickering error states
- **Resource Management**: Avoids overwhelming backend services
- **Error Handling**: Allows time for complete password entry before validation

### Event Flow Diagram

```
┌─────────────────┐    onVaChange      ┌────────────────────────┐
│  va-file-input  │ ────────────────►  │  va-file-input-multiple│
│  id: instance-0 │                    │                        │
└─────────────────┘                    │  • Determine           │
        │                              │    action type         │
        │ onVaFileInputError           │  • Update state        │
        └───────────────────────────►  │  • Emit files          │
                                       │    array               │
                                       │                        │
                                       │                        │
┌─────────────────┐  onVaPasswordChange│                        │
│  va-file-input  │ ────────────────►  │                        │
│  id: instance-1 │                    │                        │
└─────────────────┘                    │                        │
        │                              │                        │
        │ onVaFileInputError           │                        │
        └───────────────────────────►  │                        │
                                       └────────────────────────┘
                                                    │
                                                    │ onVaMultipleChange
                                                    │ onVaFileInputError
                                                    │
                                                    ▼
                                          ┌────────────────────┐
                                          │ External Consumer  │
                                          │ of Parent Component│
                                          │ Receives events    │
                                          │                    │
                                          └────────────────────┘
```

**Flow Summary:**
1. **Child Event Received**: `va-file-input` emits `vaChange`, `vaPasswordChange`, or `vaFileInputError`
2. **State Update**: Internal `files` array is modified
3. **Array Building**: `buildFilesArray()` constructs the event payload
4. **Event Emission**: `vaMultipleChange` or `vaFileInputError` is emitted with complete state

## Slot Content 

The component has a general slot that can be used to add content to each file input instance. 

Individual slot content is initially stored in `@State() files: FileIndex[]` in order to distribute the content to each file input instance.

The content in `files` state serves as a template for initial distribution, not a live reflection of current slot element states.

### Main Slot (`<slot></slot>`)
- **Location**: Rendered at the bottom of each file added
- **Purpose**: Serves as a capture mechanism for displaying consumer provided content
- **Limitation**: The slot is cloned and added to each file input instance, so it is not possible to have multiple unique slots.
- **Events**: Events emitted from the slot will bubble up to the `va-file-input-multiple` component where they can be handled using a callback.

#### Usage

```jsx
<VaFileInputMultiple
  onVaMultipleChange={handleMultipleChange}
  onVaSelect={handleSlotInteraction}
  errors={fileErrors}
  passwordErrors={passwordErrors}
  percentUploaded={percentsUploaded}
  encrypted={encrypted}
  resetVisualState={resetVisualState}
  hint="Upload PDF, JPEG, or PNG files. Encrypted PDFs will require a password."
  label="Select files to upload"
>
  <div className="additional-input-container">
    <VaSelect required label="Document status">
      <option value="">Select status</option>
      <option value="public">Public</option>
      <option value="private">Private</option>
    </VaSelect>
  </div>
</VaFileInputMultiple>
```

The `slotFieldIndexes` prop can be used to control which file inputs receive the content. By default, the content is added to all file inputs.

#### Identifying File Context in Slot Interactions

Since slot content is cloned for each file input, you will need to identify which slot interaction occurred for which file. For example, if `va-select` is used in the slot for selecting a document type, it is not possible to know which file input the selection belongs to out of the box.

Slot interaction events will bubble up to the `va-file-input-multiple` component where they can be handled using a callback.

An approach for handling slot interactions could be:

#### Shadow DOM Querying

```javascript
// Get all va-file-input elements from shadow DOM
const getFileInputElements = () => {
  const componentRef = document.querySelector('va-file-input-multiple');
  if (!componentRef?.shadowRoot) return [];
  return Array.from(
    componentRef.shadowRoot.querySelectorAll('va-file-input')
  );
};

// Get the va-file-input instance index from an event
function getFileInputInstanceIndex(event) {
  const [vaFileInput] = event
    .composedPath()
    .filter(el => el.tagName === 'VA-FILE-INPUT');

  const els = getFileInputElements();
  return els.findIndex(el => el.id === vaFileInput.id);
}

// Update slot element error states
const updateSlotElementError = (fileIndex, errorMessage) => {
  const fileInputs = getFileInputElements();
  if (fileInputs.length === 0) return;

  if (fileInputs[fileIndex]) {
    // Find the slot element within this file input
    const slotElement = fileInputs[fileIndex].querySelector('va-select');
    
    if (slotElement) {
      if (errorMessage) {
        slotElement.setAttribute('error', errorMessage);
      } else {
        slotElement.removeAttribute('error');
      }
    }
  }
};

function handleVaSelect(event) {
    const { detail } = event;
    const { value } = detail;
    const fileIndex = getFileInputInstanceIndex(event);

    // additional handling as needed
}

<VaFileInputMultiple onVaSelect={handleVaSelect}>
  <div className="additional-input-container">
    <VaSelect required label="Document status">
      <option value="">Select status</option>
      <option value="public">Public</option>
      <option value="private">Private</option>
    </VaSelect>
  </div>
</VaFileInputMultiple>
```

## Error Handling

Error handling is designed to be declarative in that the consumer is responsible for validating the file and updating the `errors` and `passwordErrors` props to signify which file has an error. 

The exception is **file size** and **file type** validation which is handled internally by the component. The component will emit the `vaFileInputError` event with the error message when these validations fail.

There are two error props because `errors` is needed to signal, for example, a network issue with the upload. But the component also needed a way internally to indicate that the error is only with the password input field using `passwordErrors`. The alternative was to look for a magic string in the error message, but that is not a robust solution.

### Reset Visual State

The `resetVisualState` prop is used to reset the visual state of individual files. It is an array of booleans that correspond to each file input.

- **`true`**: Forces the file input back to its initial state, displaying the file selection interface and any error messages
- **`false` or `null`**: Shows the normal file state (selected file with upload progress or uploaded file details)

The component automatically resets `resetVisualState` to `false` when a user selects a new file.

### Slot content error handling

Error handling for main slot content would need to extend beyond the current `errors` and `passwordErrors` arrays since slot content could contain unknown types and number of interactive elements.

An approach for handling interactive elements in the slot could be:

#### Shadow DOM Validation Pattern

```jsx
const validateSlotContent = () => {
  // Get the va-file-input-multiple element
  const fileInputMultiple = document.querySelector('va-file-input-multiple');
  
  // Get all va-file-input elements within the shadow DOM
  const fileInputs = Array.from(
    fileInputMultiple?.shadowRoot?.querySelectorAll('va-file-input') || []
  );

  const slotErrors = []; // Array to track slot validation errors

  // Map over the file inputs
  fileInputs.forEach((fileInput, index) => {
    // Get all interactive elements within the shadow DOM
    const slotElements = {
      documentType: fileInput?.shadowRoot?.querySelector('va-select[name="documentType"]'),
      description: fileInput?.shadowRoot?.querySelector('va-text-input[name="description"]')
    };

    let hasSlotError = false;
    const elementErrors = [];

    // Validate and set errors directly on slot elements
    Object.entries(slotElements).forEach(([name, element]) => {
      if (element) {
        if (!element.value) {
          // Set error attribute directly on the element
          element.error = `${name} is required`;
          elementErrors.push(`${name} is required`);
          hasSlotError = true;
        } else {
          // Clear error if validation passes
          element.error = '';
        }
      }
    });
    // Store slot error for this file index
    slotErrors[index] = hasSlotError ? elementErrors.join(', ') : '';
  });

  // Return the array of slot errors
  return slotErrors;
};

// Update component errors prop
const [errors, setErrors] = useState([]);
const [slotErrors, setSlotErrors] = useState([]);

const handleSlotValidation = () => {
  const newSlotErrors = validateSlotContent();
  setSlotErrors(newSlotErrors);
  
  // Combine existing file errors with slot errors
  const combinedErrors = errors.map((fileError, index) => {
    const slotError = newSlotErrors[index];
    
    if (fileError && slotError) {
      return `${fileError}; ${slotError}`;
    }
    return fileError || slotError || '';
  });
  
  setErrors(combinedErrors);
};

<VaFileInputMultiple
  errors={errors}
  onVaMultipleChange={handleSlotValidation}
/>
```

## Validation

The component provides built-in validation for file size and file type through the `maxFileSize`, `minFileSize`, and `accept` props. These validations emit `vaFileInputError` events when they fail.

### Custom Validation Patterns

For custom validation (network errors, business rules, etc.), teams should:

1. **Implement validation logic** in their file processing handlers
2. **Update error arrays** (`errors`, `passwordErrors`) to reflect validation state
3. **Use resetVisualState** to provide visual feedback for error recovery
4. **Handle encryption detection** using external libraries like the platform utility in `standardFileChecks`

See the [decision log](https://github.com/department-of-veterans-affairs/va.gov-team/blob/master/products/design-system-forms-library/products/components/va-file-input/design-decision-log.md) for more information about the validation strategy.

## Integration Example

For a basic integration example, see the **VA Design System Playground** implementation:

**📁 [VaFileInputMultiple.jsx](https://github.com/department-of-veterans-affairs/vets-website/blob/main/src/applications/ds-v3-playground/pages/VaFileInputMultiple.jsx)**

This implementation serves as a **reference** for integrating `va-file-input-multiple` in applications outside the forms library. It is a basic example that demonstrates the component's core functionality and provides a starting point for more complex integrations.

This example demonstrates:

### State Management
- Synchronized arrays for `files`, `percentsUploaded`, `encrypted`, `fileErrors`, and `passwordErrors`
- State cleanup when files are removed
- File index detection using the `changed: true` property

### Encryption Workflow
- Integration with `standardFileChecks` platform utility for PDF encryption detection
- Debounced password processing to prevent excessive API calls
- Automatic password field management and error handling

### Progress Tracking & Error Handling
- Mock file upload with progress simulation
- Multiple error scenarios based on filename patterns:
  - **Network errors**: Files with "error" in filename
  - **Server errors**: Files with "server" in filename  
  - **Rate limiting**: Files with "limit" in filename
  - **File size validation**: Files larger than 1MB
  - **Password validation**: Passwords shorter than 8 characters

### Slot Content Integration
- Document status selection for each uploaded file
- Shadow DOM traversal for slot element manipulation
- Event handling using callback function

### Visual State Management
- Automatic `resetVisualState` triggering when errors occur
- Progress bar reset on upload failures
- Retry experience after error resolution
