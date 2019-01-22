# Intent

The MegaMenu is the initial design for navigation between va.gov and vets.gov. The MegaMenu is dynamically generated through data. The intent is to have va.gov people be able to modify labels and links on the page without ever touching the codebase. We will be getting data from the original TeamSite system that runs va.gov.

## Data Props

This is the data that is used to generate the MegaMenu. There are 2 variations of how the MegaMenu can be rendered. It is important to format your data prop to properly generate the MegaMenu. Below is examples of the data structure.

#### Dropdown with Side Navigation
This layout will generate a dropdown with a left column that comprises of multiple sections.

```
{
  title: 'Nav Title 1',
  menuSections: [
    {
      title: 'Section Title 1',
      links: {
        columnOne: {
          title: 'Menu Item 1',
          links: [
            {
              text: 'First link',
              href: '#'
            }
          ]
        },
        columnTwo: {
          title: 'Column 2 title',
          links: [
            {
              text: 'First link',
              href: '#'
            }
          ]
        },
        columnThree: {
          img: {
            src: 'http://via.placeholder.com/228x128',
            alt: 'Place Holder Image'
          },
          link: {
            text: 'Text for link',
            href: '#'
          },
          description: 'Add a description of the marketing content'
        },
        seeAllLink: {
          text: 'Link to menu page',
          href: '#'
        }
      }
    },
    {
      title: 'Section Title 2',
      links: {
        columnOne: {
          title: 'Menu Item 1',
          links: [
            {
              text: 'First link',
              href: '#'
            }
          ]
        },
        columnTwo: {
          title: 'Column 2 title',
          links: [
            {
              text: 'First link',
              href: '#'
            }
          ]
        },
        columnThree: {
          img: {
            src: 'http://via.placeholder.com/228x128',
            alt: 'Place Holder Image'
          },
          link: {
            text: 'Text for Marketing Link',
            href: '#'
          },
          description: 'Add a description of the marketing content'
        },
        seeAllLink: {
          text: 'Link to menu page',
          href: '#'
        }
      }
    }
  ]
},
```
** This is what it will generate. **

![alt nav style 1](/img/docs/mega-menu/nav-version-1.png)

#### Dropdown with Only links
This will generate a dropdown with only links.

```
{
  title: 'Nav Title 2',
  menuSections: {
    mainColumn: {
      title: 'Main Dropdown Section Title',
      links: [
        {
          text: 'First Link',
          href: '#'
        },
      ]
    },
    columnOne: {
      title: 'Column 1 Title',
      links: [
        {
          text: 'Link 1',
          href: '#'
        }
      ]
    },
    columnTwo: {
      title: 'Column 2 Title',
      links: [
        {
          text: 'Link 1',
          href: '#'
        },
      ]
    },
    columnThree: {
      img: {
        src: 'http://via.placeholder.com/228x128',
        alt: 'Place Holder Image'
      },
      link: {
        text: 'Text for Marketing Link',
        href: '#'
      },
      description: 'Add a description of the marketing content'
    },
  }
},
```
**This will generate this view.**

![alt nav style 1](/img/docs/mega-menu/nav-version-2.png)

#### Just a link
This will just generate a link in the nav-bar

```
{
  title: 'Nav Title 3 link only',
  href: '#'
}
```
