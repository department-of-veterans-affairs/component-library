/* eslint-disable i18next/no-literal-string */
import {
  Component,
  h,
  Prop,
  State,
} from '@stencil/core';
// todo i think we need the react-bindings to pass the children prop along but getting an error currently 
//import { VaFileInput } from '@department-of-veterans-affairs/web-components/react-bindings';

type FileInfo = {
  id: number,
  uploadStatus: string
}
/**
 * @componentName Multiple file input
 * @maturityCategory caution
 * @maturityLevel available
 * @guidanceHref form/file-input
 */

@Component({
  tag: 'va-multiple-file-input',
  styleUrl: 'va-file-input.scss',
  shadow: true,
})
export class VaMultipleFileInput {
  @State() fileList: FileInfo[] = [];
  @State() fileCount: number = 0;
  
  /**
   * The label for the file input.
   */
  @Prop() label?: string;

  /**
   * The name for the input element.
   */
  @Prop() name?: string;

  /**
   * The text displayed on the button.
   */
  @Prop() buttonText: string;

  /**
   * Sets the input to required and renders the (*Required) text.
   */
  @Prop() required?: boolean = false;

  /**
   * A comma-separated list of unique file type specifiers.
   */
  @Prop() accept?: string;

  /**
   * The error message to render.
   */
  @Prop() error?: string;

  /**
   * Optional hint text.
   */
  @Prop() hint?: string;

  /**
   * Emit component-library-analytics events on the file input change event.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * Shows a va-progress-bar at this percentage when uploading
   */
  @Prop() uploadPercentage?: number;

  /**
   * Optionally specifies the size of the header element to use instead of the base label.
   * Accepts a number from 1 to 6, corresponding to HTML header elements h1 through h6.
   * If not provided, defaults to standard label styling.
   */
  @Prop() headerSize?: number;

  private handleChange(e) {
    // todo i think we need to bubble the event up

    const fileInfo = this.findFile(e.target.id);
    if(!fileInfo) {
      // if the fileInfo exists, we don't need to update anything
      // if it doesn't exist it's a new file, add it to fileList array
      this.fileList = [...this.fileList, ({id: this.fileCount,  uploadStatus:'success'})]
      this.fileCount++;
    }    
  }

  private findFile(id: string):FileInfo {
    return this.fileList.find((file) => {
      return file.id.toString() === id
    })
  }

  private handleRemoveFile(e) {
    let removedFile = this.findFile(e.target.id);
    let index = this.fileList.indexOf(removedFile);
    removedFile.uploadStatus = 'deleted'
    this.fileList =  [...this.fileList.slice(0,index), removedFile, ...this.fileList.slice(index + 1, this.fileList.length)]
  }

  private renderFileInput(label, name, required, accept, error, hint, uploadPercentage, headerSize, enableAnalytics, fileInfo:FileInfo) {

    if(!fileInfo || (fileInfo && fileInfo.uploadStatus !== 'deleted')) {
      const id = fileInfo && fileInfo.id.toString() || this.fileCount;
      return(
        <va-file-input
          id={id.toString()}
          label={label}
          name={name}
          accept={accept}
          required={required}
          error={error}
          hint={hint}
          enable-analytics={enableAnalytics}
          onVaChange={(e) => this.handleChange(e)}
          onVaRemoveFile={(e) => this.handleRemoveFile(e)}
          uswds={true}
          uploadPercentage={uploadPercentage}
          headerSize={headerSize}
          //children={"children"}
        />
      )
    }
    // todo this feels hacky
    // return something for deleted uploads to replace what was there or the dom won't be updated
    return <span></span>
  }
  
  render() {
    const { label, name, required, accept, error, hint, uploadPercentage, headerSize, enableAnalytics } = this;
    
    return(
      <div>
        { // show the already uploaded files
          this.fileList.map((fileInfo) => { 
            return this.renderFileInput(label, name, required, accept, error, hint, uploadPercentage, headerSize, enableAnalytics, fileInfo) 
          })
        }
        { // show an empty one for the next upload
          this.renderFileInput(label, name, required, accept, error, hint, uploadPercentage, headerSize, enableAnalytics, null)
        }
      </div>
    )
  }
 
}
