import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import './styles/va-icon.scss';

const iconDocs = getWebComponentDocs('va-icon');

export default {
  title: 'USWDS/Icon USWDS',
  id: 'uswds/va-icon',
  parameters: {
    componentSubtitle: 'va-icon web component',
    docs: {
      page: () => <StoryDocs data={iconDocs} />,
    }
  }
}

const defaultArgs = {
  'icon': 'alarm',
  'size': 7,
  'srtext': null
}

const Template = ({
  icon,
  size,
  srtext
}) => {
  return (
    <va-icon icon={icon} size={size} srtext={srtext} />
  );
}

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
  srtext: 'add some text for a screen reader to describe the icon\'s semantic meaning'
};
Default.argTypes = propStructure(iconDocs);

const IconsTemplate = ({
  size
}) => {
  return (
    <div className='wrapper'>
      {icons.map(icon => (
        <div key={icon}>
          <va-icon icon={icon} size={size} />
          <p>{icon}</p>
        </div>
      ))}
    </div>
  )
}

export const Icons = IconsTemplate.bind(null);
Icons.args = {
  ...defaultArgs, size: 7
}

const icons = [
  "accessibility_new",
  "accessible_forward",
  "account_balance",
  "account_box",
  "account_circle",
  "add",
  "add_circle",
  "add_circle_outline",
  "alarm",
  "alternate_email",
  "announcement",
  "api",
  "arrow_back",
  "arrow_downward",
  "arrow_drop_down",
  "arrow_drop_up",
  "arrow_forward",
  "arrow_upward",
  "assessment",
  "attach_file",
  "attach_money",
  "autorenew",
  "backpack",
  "bathtub",
  "bedding",
  "bookmark",
  "bug_report",
  "build",
  "calendar_check",
  "calendar_today",
  "campaign",
  "camping",
  "cancel",
  "chat",
  "check",
  "check_box_outline_blank",
  "check_circle",
  "check_circle_outline",
  "checkroom",
  "chevron_left",
  "chevron_right",
  "clean_hands",
  "clipboard_check",
  "clipboard_list",
  "close",
  "closed_caption",
  "clothes",
  "cloud",
  "code",
  "comment",
  "connect_without_contact",
  "construction",
  "construction_worker",
  "contact_page",
  "content_copy",
  "coronavirus",
  "credit_card",
  "deaf",
  "deck",
  "delete",
  "device_thermostat",
  "directions",
  "directions_bike",
  "directions_bus",
  "directions_car",
  "directions_walk",
  "do_not_disturb",
  "do_not_touch",
  "dot_circle",
  "drag_handle",
  "eco",
  "edit",
  "electrical_services",
  "emoji_events",
  "error",
  "error_outline",
  "event",
  "expand_less",
  "expand_more",
  "facebook",
  "fast_forward",
  "fast_rewind",
  "favorite",
  "favorite_border",
  "fax",
  "file_alt",
  "file_download",
  "file_invoice_dollar",
  "file_medical",
  "file_present",
  "file_upload",
  "filter_alt",
  "filter_list",
  "fingerprint",
  "first_page",
  "flag",
  "flickr",
  "flight",
  "flooding",
  "folder",
  "folder_open",
  "format_quote",
  "format_size",
  "forum",
  "github",
  "grid_view",
  "group_add",
  "groups",
  "handshake",
  "hearing",
  "help",
  "help_outline",
  "highlight_off",
  "history",
  "home",
  "hospital",
  "hotel",
  "hourglass_empty",
  "hurricane",
  "identification",
  "image",
  "info",
  "info_outline",
  "insights",
  "instagram",
  "keyboard",
  "label",
  "language",
  "last_page",
  "launch",
  "lightbulb",
  "lightbulb_outline",
  "link",
  "link_off",
  "linkedin",
  "list",
  "local_cafe",
  "local_fire_department",
  "local_gas_station",
  "local_grocery_store",
  "local_hospital",
  "local_laundry_service",
  "local_library",
  "local_offer",
  "local_parking",
  "local_pharmacy",
  "local_police",
  "local_taxi",
  "location_city",
  "location_on",
  "lock",
  "lock_open",
  "lock_outline",
  "login",
  "logout",
  "loop",
  "mail",
  "mail_outline",
  "map",
  "masks",
  "medical_services",
  "menu",
  "military_tech",
  "more_horiz",
  "more_vert",
  "my_location",
  "navigate_before",
  "navigate_far_before",
  "navigate_far_next",
  "navigate_next",
  "near_me",
  "notifications",
  "notifications_active",
  "notifications_none",
  "notifications_off",
  "park",
  "people",
  "person",
  "pets",
  "phone",
  "photo_camera",
  "play_circle",
  "prescription_bottle",
  "print",
  "priority_high",
  "public",
  "push_pin",
  "radio_button_unchecked",
  "rain",
  "reduce_capacity",
  "remove",
  "remove_circle",
  "report",
  "restaurant",
  "road",
  "rss_feed",
  "safety_divider",
  "sanitizer",
  "save_alt",
  "schedule",
  "school",
  "science",
  "search",
  "security",
  "send",
  "sentiment_dissatisfied",
  "sentiment_neutral",
  "sentiment_satisfied",
  "sentiment_satisfied_alt",
  "sentiment_very_dissatisfied",
  "settings",
  "severe_weather",
  "share",
  "shield",
  "shopping_basket",
  "snow",
  "soap",
  "social_distance",
  "sort_arrow",
  "spellcheck",
  "star",
  "star_half",
  "star_outline",
  "store",
  "support",
  "support_agent",
  "text_fields",
  "thumb_down_alt",
  "thumb_up_alt",
  "timer",
  "toggle_off",
  "toggle_on",
  "topic",
  "tornado",
  "translate",
  "trending_down",
  "trending_up",
  "twitter",
  "undo",
  "unfold_less",
  "unfold_more",
  "update",
  "upload_file",
  "user_check",
  "verified",
  "verified_user",
  "video_appointment",
  "visibility",
  "visibility_off",
  "volume_off",
  "warning",
  "wash",
  "wifi",
  "work",
  "youtube",
  "zoom_in",
  "zoom_out",
  "zoom_out_map"
];