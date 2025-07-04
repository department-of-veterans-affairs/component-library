import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import './styles/va-icon.scss';
import { initIconSpriteLocation } from '@department-of-veterans-affairs/component-library';

const iconDocs = getWebComponentDocs('va-icon');

export default {
  title: 'Components/Icon USWDS',
  id: 'uswds/va-icon',
  parameters: {
    componentSubtitle: 'va-icon web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={iconDocs} />,
      description: {
        component: `
          ### Global Sprite Path Configuration

          You can globally set the SVG sprite path for all \`<va-icon>\` components in your application using the following methods:

          \`\`\`js
          // Import the setter from the package
          import { setVaIconSpriteLocation } from '@department-of-veterans-affairs/web-components';

          // Set the sprite path globally (do this before rendering any <va-icon>)
          setVaIconSpriteLocation('/img/sprite.svg');
          \`\`\`

          Or, if you are not using a module system, you can set it on \`window\` or \`globalThis\`:

          \`\`\`js
          window.setVaIconSpriteLocation && window.setVaIconSpriteLocation('/img/sprite.svg');
          \`\`\`

          To get the current sprite path:

          \`\`\`js
          const currentPath = window.getVaIconSpriteLocation && window.getVaIconSpriteLocation();
          \`\`\`

          **Note:** This must be set before any \`<va-icon>\` is rendered to ensure all icons use the correct sprite path.
        `
      },
    },
  },
};

const defaultArgs = {
  icon: 'alarm',
  size: 3,
  srtext: null,
};

const Template = ({ icon, size, srtext }) => {
  return <va-icon icon={icon} size={size} srtext={srtext} />;
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
  srtext:
    "add some text for a screen reader to describe the icon's semantic meaning",
};
Default.argTypes = propStructure(iconDocs);

const IconsTemplate = ({ size }) => {
  const handleChange = event => {
    const search = event.target.value.toLowerCase();
    const iconExamples = document.querySelectorAll('.icon-example');

    iconExamples.forEach(row => {
      const text = row.getAttribute('data-icon') || ''; // Ensure text is not null or undefined
      const isVisible = text.toLowerCase().includes(search);
      row.classList.toggle('vads-u-display--none', !isVisible);
    });

    const iconCount = document.querySelectorAll(
      '.icon-example:not(.vads-u-display--none)',
    ).length;
    const word = iconCount === 1 ? 'icon' : 'icons';
    document.getElementById('icon-count').textContent = `${iconCount} ${word}.`;
  };

  return (
    <div className="container">
      <div className="filter">
        <va-text-input
          label="Type to filter icons"
          name="filter-term"
          onInput={handleChange}
        />
        <span id="icon-count">{icons.length} icons.</span>
      </div>

      <div className="icons">
        {icons.map(icon => (
          <div key={icon} className="icon-example" data-icon={icon}>
            <va-icon icon={icon} size={size} />
            <code className="icon__label">{icon}</code>
          </div>
        ))}
      </div>
    </div>
  );
};

const iconPathConfigurationDocs = () => {
  return (
    <div>
      <p>
        The icon sprite.svg file is bundled with the web components package and can be found at <code style={{ fontSize: '.75em', background: `var(--vads-color-gray-light-alt)`, padding: `5px` }}>@department-of-veterans-affairs/component-library/dist/img/sprite.svg</code>. If you are using a custom implementation other than on va.gov you will need to copy the sprite.svg file to your project and set the path accordingly.
      </p>
      <p>
        You can globally set the SVG sprite path for all <code style={{ fontSize: '.75em', background: `var(--vads-color-gray-light-alt)`, padding: `5px` }}>&lt;va-icon&gt;</code> components in your application using the following methods:
      </p>
      <pre style={{ fontSize: '.75em', background: `var(--vads-color-gray-light-alt)`, padding: `10px` }}>
        {`
// Import the the init function from the web-components package
import { initIconSpriteLocation } from '@department-of-veterans-affairs/web-components';

// Initialize the global sprite path configuration
initIconSpriteLocation();
// Set the sprite path globally (do this before rendering any icon)
globalThis.setVaIconSpriteLocation('[custom sprite path]');
        `}
      </pre>
      <p>
        To get the current sprite path:
      </p>
      <pre style={{ fontSize: '.75em', background: `var(--vads-color-gray-light-alt)`, padding: `10px` }}>
        {`let currentIconPath = globalThis.getVaIconSpriteLocation();`}
      </pre>
      <p>
        <strong>Note:</strong> This must be set before any <code style={{ fontSize: '.75em', background: `var(--vads-color-gray-light-alt)`, padding: `5px` }}>&lt;va-icon&gt;</code> is rendered to ensure all icons use the correct sprite path.
      </p>
      <i>* The sprite.svg path must be loaded from the same origin as you application, cannot traverse the file system using ".." and must be a ".svg" file.</i>
    </div>
  );
}
export const GlobalSpritePathConfiguration = iconPathConfigurationDocs.bind(null);
GlobalSpritePathConfiguration.parameters = {
  docs: {
    canvas: {
      sourceState: 'none',
    },
  }
};

export const Icons = IconsTemplate.bind(null);
Icons.args = {
  ...defaultArgs,
};

const icons = [
  'accessibility_new',
  'accessible_forward',
  'account_balance',
  'account_box',
  'account_circle',
  'acute',
  'add',
  'add_circle',
  'add_circle_outline',
  'adjust',
  'alarm',
  'alternate_email',
  'announcement',
  'api',
  'app_store',
  'arrow_back',
  'arrow_circle_right',
  'arrow_downward',
  'arrow_drop_down',
  'arrow_drop_up',
  'arrow_forward',
  'arrow_upward',
  'assessment',
  'assignment',
  'assignment_turned_in',
  'attach_file',
  'attach_money',
  'autorenew',
  'backpack',
  'bathtub',
  'bedding',
  'bookmark',
  'bug_report',
  'build',
  'calendar_today',
  'campaign',
  'camping',
  'cancel',
  'chat',
  'check',
  'check_box_outline_blank',
  'check_circle',
  'check_circle_outline',
  'checkroom',
  'chevron_left',
  'chevron_right',
  'clean_hands',
  'close',
  'closed_caption',
  'clothes',
  'cloud',
  'code',
  'comment',
  'connect_without_contact',
  'construction',
  'construction_worker',
  'contact_page',
  'content_copy',
  'coronavirus',
  'credit_card',
  'crop_square',
  'deck',
  'delete',
  'description_outlined',
  'description',
  'device_thermostat',
  'directions',
  'directions_bike',
  'directions_bus',
  'directions_car',
  'directions_walk',
  'do_not_disturb',
  'do_not_touch',
  'drag_handle',
  'eco',
  'edit',
  'electrical_services',
  'emoji_events',
  'error',
  'error_outline',
  'event',
  'event_available',
  'expand_less',
  'expand_more',
  'facebook',
  'fact_check',
  'fast_forward',
  'fast_rewind',
  'favorite',
  'favorite_border',
  'fax',
  'file_download',
  'file_present',
  'file_upload',
  'filter_alt',
  'filter_list',
  'fingerprint',
  'first_page',
  'flag',
  'flickr',
  'flight',
  'flooding',
  'folder',
  'folder_open',
  'format_quote',
  'format_size',
  'forum',
  'github',
  'google_play',
  'grid_view',
  'group_add',
  'groups',
  'handshake',
  'hearing',
  'hearing_disabled',
  'help',
  'help_outline',
  'highlight_off',
  'history',
  'home',
  'home_outlined',
  'hospital',
  'hotel',
  'hourglass_empty',
  'how_to_reg',
  'hurricane',
  'identification',
  'image',
  'inbox',
  'indeterminate_check_box',
  'info',
  'info_outline',
  'insights',
  'instagram',
  'key',
  'keyboard',
  'label',
  'language',
  'last_page',
  'launch',
  'lightbulb',
  'lightbulb_outline',
  'link',
  'link_off',
  'linkedin',
  'list',
  'local_cafe',
  'local_fire_department',
  'local_gas_station',
  'local_grocery_store',
  'local_hospital',
  'local_laundry_service',
  'local_library',
  'local_offer',
  'local_parking',
  'local_pharmacy',
  'local_police',
  'local_shipping',
  'local_taxi',
  'location_city',
  'location_on',
  'lock',
  'lock_open',
  'lock_outline',
  'login',
  'logout',
  'loop',
  'mail',
  'mail_outline',
  'map',
  'mark_email_read',
  'masks',
  'medical_services',
  'medical_services_outlined',
  'medication',
  'menu',
  'military_tech',
  'more_horiz',
  'more_vert',
  'my_location',
  'navigate_before',
  'navigate_far_before',
  'navigate_far_next',
  'navigate_next',
  'near_me',
  'note_add',
  'notifications',
  'notifications_active',
  'notifications_none',
  'notifications_off',
  'park',
  'people',
  'person',
  'pets',
  'phone',
  'phone_iphone',
  'photo_camera',
  'pill',
  'play_circle',
  'print',
  'priority_high',
  'public',
  'push_pin',
  'radio_button_checked',
  'radio_button_unchecked',
  'rain',
  'reduce_capacity',
  'refresh',
  'remove',
  'remove_circle',
  'report',
  'request_quote',
  'request_quote_outlined',
  'restaurant',
  'rss_feed',
  'safety_divider',
  'sanitizer',
  'save_alt',
  'schedule',
  'school',
  'science',
  'search',
  'security',
  'sell',
  'send',
  'sentiment_dissatisfied',
  'sentiment_neutral',
  'sentiment_satisfied',
  'sentiment_satisfied_alt',
  'sentiment_very_dissatisfied',
  'settings',
  'severe_weather',
  'share',
  'shield',
  'shopping_basket',
  'snow',
  'soap',
  'social_distance',
  'sort_arrow',
  'spellcheck',
  'star',
  'star_half',
  'star_outline',
  'store',
  'support',
  'support_agent',
  'text_fields',
  'thumb_down_alt',
  'thumb_up_alt',
  'timer',
  'toggle_off',
  'toggle_on',
  'topic',
  'tornado',
  'translate',
  'trending_down',
  'trending_up',
  'tty',
  'twitter',
  'undo',
  'unfold_less',
  'unfold_more',
  'update',
  'upload_file',
  'verified',
  'verified_user',
  'videocam',
  'visibility',
  'visibility_off',
  'volume_off',
  'warning',
  'wash',
  'wifi',
  'work',
  'x',
  'youtube',
  'zoom_in',
  'zoom_out',
  'zoom_out_map',
];


