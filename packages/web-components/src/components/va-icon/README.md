# Adding an Icon to `va-icon`

To add a new icon to the `va-icon` web component in this repository, follow these steps:

### Use the `dst-uswds-compile` Tool

The icons for `va-icon` are managed and compiled using the [dst-uswds-compile](https://github.com/department-of-veterans-affairs/dst-uswds-compile) repository. This tool helps you generate and update the SVG sprite file used by the component library.

### Steps to Add an Icon

1. **Clone and install the Tool Repository**
   ```sh
   git clone https://github.com/department-of-veterans-affairs/dst-uswds-compile.git
   cd dst-uswds-compile
   npm install
   npm run init
   ```

2. **Add or Update Icons**
   - Place your SVG icon(s) in the /assets/icons directory.
   - Follow the instructions in [that](https://github.com/department-of-veterans-affairs/dst-uswds-compile) repo to ensure your icon is named and formatted correctly.

3. **Compile the Sprite**
   - Run the compile command as described in the tool's README:
     ```sh
     npm run compileIcons
     ```
   - This will generate a new `sprite.svg` file containing your icon.

4. **Copy the Sprite File**
   - Run the deploy command to copy the generated sprite.svg file to component-library, vets-website, content-build, and vets-design-system-documentation
      ```sh
          npm run deploy
      ```

5. **Verify the Icon**
   - Ensure your icon's `<symbol id="your_icon_name">` is present in the new `sprite.svg`.
   - Rebuild and test the component library and Storybook to confirm your icon appears as expected.

6. Commit and Push
   - Commit your changes to all repos (component-library, vets-website, content-build, and vets-design-system-documentation)

---

For more details, see the [dst-uswds-compile documentation](https://github.com/department-of-veterans-affairs/dst-uswds-compile?tab=readme-ov-file#dst-uswds-compile).
