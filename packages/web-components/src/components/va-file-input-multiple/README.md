# VA File Input Multiple Component - Architecture & Usage Overview

## Component Overview

The `va-file-input-multiple` component is a multi-file upload web component that wraps individual `va-file-input` components.

The component uses an event-driven architecture where it pushes file data to external consumers rather than requiring them to pull data from the component.

## Architecture

### Core Architecture Pattern

- **State Management**: The component uses two `@State` decorators for internal reactive state management with the primary one tracking the state of all files.
- **Event Orchestration**: Aggregates child component events and emits a unified `vaMultipleChange` event to external consumers
- **Slot Content Management**: Slot content is captured, cloned, and distributed to individual file input instances
- **Error Handling**: Consumers are responsible for validating files and updating the `errors` and `passwordErrors` props to signify which file has an error.

### State Management

The component uses two `@State` decorators to manage internal reactive state:

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

### Event System

#### Primary Event: `vaMultipleChange`

This event will be emitted when any change to a file occurs.

```typescript
{
  action: 'FILE_ADDED' | 'FILE_UPDATED' | 'FILE_REMOVED' | 'PASSWORD_UPDATE',
  file: File,           // The file that triggered the event. 
  state: FileDetails[]  // An array of objects representing the current state of all files including the file that triggered the event.
}
```

Each `vaMultipleChange` event includes a `state` array where:

- **`changed: true`**: Indicates which file was affected by the current action
- **`changed: false`**: All other files in the current state
- **Deletion Exception**: No `changed` property is set during `FILE_REMOVED` actions

```typescript
// Example: Adding a file at index 1
state: [
  { file: existingFile1, changed: false, password: undefined },
  { file: newFile, changed: true, password: undefined },      // ← This file triggered the event
  { file: existingFile3, changed: false, password: "secret" }
]
```

The File object of the file that triggered the change event is available in both the `file` property and the `state` array. This provides both granular (what changed) and holistic (complete state) information in a single event.

### Event Flow & Triggers

The `va-file-input-multiple` component listens to two types of `va-file-input` component events:

#### File Change: `onVaChange`

This event is emitted when a file is selected, changed, or removed in any `va-file-input` child component.

- **Trigger**: User selects, changes, or removes a file
- **Handler**: `handleChange(event, fileKey, pageIndex)`
- **Action**:
  - `FILE_UPDATED`: If `newFile` exists and `fileObject.file` exists
  - `FILE_ADDED`: If `newFile` exists and `fileObject.file` is null
  - `FILE_REMOVED`: If no `newFile` (deletion)

#### Password Change: `onVaPasswordChange`
- **Trigger**: User enters/changes password for encrypted files
- **Handler**: `handlePasswordChange(event, fileKey)`
- **Action**: 
  - `PASSWORD_UPDATE`: Always

### Password Event Flow

Password events operate independently from file events:

- **Separate Handler**: `handlePasswordChange()` vs `handleChange()`
- **State Persistence**: Password is stored in `fileObject.password`
- **No File Creation**: Password changes don't trigger new file slots
- **Immediate Emission**: Password events emit immediately without additional state changes

### Event Flow Diagram

```
┌─────────────────┐    onVaChange      ┌──────────────────┐
│   va-file-input │ ────────────────►  │  va-file-input-multiple
│   (child #1)    │                    │                  │
└─────────────────┘                    │  • Determine     │
                                       │    action type   │
┌─────────────────┐  onVaPasswordChange│  • Update state  │    ┌───────────────────┐
│   va-file-input │ ────────────────► `│  • Build array   │───►│ vaMultipleChange  │
│   (child #2)    │                    │                  │    │     EVENT         │
└─────────────────┘                    └──────────────────┘    └───────────────────┘
                                               │                        │
┌─────────────────┐    onVaChange              │                        │
│   va-file-input │ ───────────────────────────►                        ▼
│   (child #N)    │                                          ┌────────────────────┐
└─────────────────┘                                          │ External Consumer  │
                                                             │ of Parent Component│
                                                             └────────────────────┘
```


**Flow Summary:**
1. **Child Event Received**: `va-file-input` emits `vaChange` or `vaPasswordChange`
2. **State Update**: Internal `files` array is modified
3. **Array Building**: `buildFilesArray()` constructs the event payload
4. **Event Emission**: `vaMultipleChange` is emitted with complete state
5. **State Sync**: Component state is synchronized with `this.files = Array.of(...this.files)`

#### Example for handling `vaMultipleChange` events

```jsx
document.querySelector('va-file-input-multiple')
  .addEventListener('vaMultipleChange', (event) => {
    const { action, file, state } = event.detail;
    
    switch(action) {
      case 'FILE_ADDED':
        console.log('A new file was added:', file.name);
        break;
        
      case 'FILE_UPDATED':
        console.log('An existing file was replaced:', file.name);
        break;
        
      case 'FILE_REMOVED':
        console.log('A file was deleted:', file.name);
        break;
        
      case 'PASSWORD_UPDATE':
        console.log('Password was entered for:', file.name);
        break;
    }
    
    // You can also check the state array to see which file has changed: true
    const changedFile = state.find(fileDetail => fileDetail.changed === true);
    if (changedFile) {
      console.log('Changed file:', changedFile.file.name);
    }
  });
```

## Slot Content Management 

The component has a general slot that can be used to add content to each file input instance.

### Main Slot (`<slot></slot>`)
- **Location**: Rendered at the bottom of each file added
- **Purpose**: Serves as a capture mechanism for displaying consumer provided content
- **Limitation**: The slot is cloned and added to each file input instance, so it is not possible to have multiple slots.

#### Usage

The `slotFieldIndexes` prop can be used to control which file inputs receive the content. By default, the content is added to all file inputs.

```jsx
<va-file-input-multiple>
  <va-select label="Document Type">
    <option value="public">Public Document</option>
    <option value="private">Private Document</option>
  </va-select>
</va-file-input-multiple>
```

#### Identifying File Context in Slot Interactions

Since slot content is cloned for each file input, it can be challenging to identify which file triggered an interaction. For example, if `va-select` is used for selecting a document type, it is not possible to know which file input the selection belongs to out of the box.

An approach for handling this could be:

#### Shadow DOM Traversal Method

```javascript
function extractDocumentTypesFromShadowDOM = () => {
  const fileInputMultiple = document.querySelector('va-file-input-multiple');

  const fileInputs = Array.from(
    fileInputMultiple?.shadowRoot?.querySelectorAll('va-file-input') || [],
  );

  return fileInputs.map(fileInput => {
    const vaSelect = fileInput.querySelector('va-select');
    return vaSelect?.value || '';
  });
};
```

TODO SLOT ENHANCEMENTS: 

1. Add data attributes to the cloned content to identify which file input triggered the interaction (file id or index position?). ie. `data-file-key="0"`.
  - This will be for experimental slot content. The hope is that it will evolve into a prop driven solution.
2. Add components like `va-select` to the `va-file-input` component itself and pass the value of the interaction as part of the event payload like password.
  - This should be preferred to having to traverse the shadow DOM to find the value of the interaction.

## Error Handling

Error handling is designed to be declarative. The parent component is responsible for validating the file and updating the `errors` and `passwordErrors` props to signify which file has an error.

There are two error props because `error` is needed to signal, for example, a network issue with the upload. But the component needed a way internally to indicate that the error is only with the password input field. The alternative was to look for a magic string in the error message, but that is not a robust solution.

A possible approach for handling errors could be index based like:

```jsx
const [files, setFiles] = useState([]);
const [errors, setErrors] = useState([]);
const [passwordErrors, setPasswordErrors] = useState([]);

const handleFilesChange = (event) => {
  const { state } = event.detail;
  
  // Ensure all arrays have the same length
  const newErrors = new Array(state.length).fill('');
  const newPasswordErrors = new Array(state.length).fill(null);
  
  state.forEach((fileDetail, index) => {
    // Validate file
    if (fileDetail.file.size > 5 * 1024 * 1024) {
      newErrors[index] = 'File too large';
    }
    
    // Validate password if encrypted
    if (encrypted[index] && !fileDetail.password) {
      newPasswordErrors[index] = 'Password required for encrypted file';
    }
  });
  
  setErrors(newErrors);
  setPasswordErrors(newPasswordErrors);
};

<VaFileInputMultiple
  errors={errors}
  passwordErrors={passwordErrors}
  onVaMultipleChange={handleFilesChange}
/>
```

### Slot content error handling

Error handling for main slot content would need to extend beyond the current `errors` and `passwordErrors` arrays since slot content could contain unknown types and number of interactive elements.

An apporach for handling this could be:

#### Shadow DOM Validation Pattern

```jsx
const validateSlotContent = () => {
  const fileInputMultiple = document.querySelector('va-file-input-multiple');
  const fileInputs = Array.from(
    fileInputMultiple?.shadowRoot?.querySelectorAll('va-file-input') || []
  );
  
  fileInputs.forEach((fileInput, index) => {
    const slotElements = {
      documentType: fileInput?.shadowRoot?.querySelector('va-select[name="documentType"]'),
      description: fileInput?.shadowRoot?.querySelector('va-text-input[name="description"]')
    };
    
    // Validate and set errors directly on elements
    Object.entries(slotElements).forEach(([name, element]) => {
      if (element) {
        if (!element.value) {
          // Set error attribute directly on the element
          element.error = `${name} is required`;
        } else {
          // Clear error if validation passes
          element.error = '';
        }
      }
    });
  });
};
```

TODO ERROR HANDLING ENHANCEMENTS: 

1. Add data attributes to the cloned content to identify which file input triggered the interaction (file id or index position?). ie. `data-file-key="0"`.
  - This will be for experimental slot content. The hope is that it will evolve into a prop driven solution.
2. Add components like `va-select` to the `va-file-input` component itself and connect it to the `error` prop.
  - This should be preferred to having to traverse the shadow DOM to find the value of the interaction.

## Validation

The component provides validation for file size and file type through the `maxFileSize`, `minFileSize`, and `accept` props. Otherwise teams should implement their own validation for files and update the `errors` and `passwordErrors` props to signify which file has an error.

See the [decision log](https://github.com/department-of-veterans-affairs/va.gov-team/blob/master/products/design-system-forms-library/products/components/va-file-input/design-decision-log.md) for more information about the validation strategy.

