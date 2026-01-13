import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './styles.module.css';

interface StoryEmbedProps {
  /** Storybook story ID (e.g., "uswds-va-button--default") */
  storyId?: string;
  /** Minimum height of the iframe in pixels (default: 200) */
  minHeight?: number;
  /** Maximum height of the iframe in pixels (default: 1200) */
  maxHeight?: number;
  /** Accessible title for the iframe */
  title?: string;
  /** Optional code snippet to display */
  code?: string;
  /** Disable auto-resize and use fixed height */
  fixedHeight?: number;
}

const VA_STORYBOOK = 'https://design.va.gov/storybook';

// Toolbar height in Storybook (approximate) - only added for the toolbar itself
const TOOLBAR_HEIGHT = 50;

// In development, use current hostname to work around Chrome localhost issues
// Falls back to localhost if window is not available (SSR)
const getLocalStorybookUrl = () => {
  if (typeof window === 'undefined') return 'http://localhost:6006';
  const hostname = window.location.hostname;
  // Use same hostname as Docusaurus but different port for Storybook
  return `http://${hostname}:6006`;
};

// Use local storybook in development
const isDev = process.env.NODE_ENV === 'development';

export default function StoryEmbed({
  storyId,
  minHeight = 200,
  maxHeight = 1200,
  title,
  code,
  fixedHeight,
}: StoryEmbedProps): JSX.Element | null {
  const [iframeError, setIframeError] = useState(false);
  const defaultHeight = minHeight;
  const [dynamicHeight, setDynamicHeight] = useState(defaultHeight + TOOLBAR_HEIGHT);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Listen for height messages from Storybook iframe
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (event.data?.type === 'storybook-resize' && typeof event.data.height === 'number') {
        const newHeight = Math.min(
          Math.max(event.data.height + TOOLBAR_HEIGHT, minHeight),
          maxHeight
        );
        setDynamicHeight(newHeight);
      }
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  // Request height update when iframe loads
  const handleIframeLoad = useCallback(() => {
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage({ type: 'request-height' }, '*');
    }, 500);
  }, []);

  // Show placeholder if no storyId provided (e.g., mobile examples without Storybook stories)
  // This must come AFTER all hooks to comply with React Rules of Hooks
  if (!storyId) {
    return (
      <div className={styles.storyEmbed}>
        <div className={styles.placeholder}>
          <div className={styles.placeholderIcon}>
            <MobileIcon />
          </div>
          <div className={styles.placeholderText}>
            <span className={styles.placeholderLabel}>Mobile Preview</span>
            <span className={styles.placeholderDescription}>See code usage below for implementation details</span>
          </div>
        </div>
      </div>
    );
  }

  const storybookUrl = `${VA_STORYBOOK}/?path=/story/${storyId}`;
  // Use full Storybook URL with toolbar for light/dark mode toggle
  // singleStory=true hides sidebar, panel=false hides addon panel, shortcuts=false prevents hotkey conflicts
  const localStorybookUrl = isDev ? getLocalStorybookUrl() : '';
  const baseUrl = isDev ? localStorybookUrl : VA_STORYBOOK;
  const iframeSrc = `${baseUrl}/?path=/story/${storyId}&singleStory=true&shortcuts=false&panel=false`;

  // Format the story ID for display (e.g., "uswds-va-button--default" -> "Default")
  const storyName = storyId.split('--').pop()?.replace(/-/g, ' ') || storyId;
  const formattedName = storyName.charAt(0).toUpperCase() + storyName.slice(1);

  // Use fixed height if specified, otherwise use dynamic height
  const iframeHeight = fixedHeight ?? dynamicHeight;

  return (
    <div className={styles.storyEmbed}>
      {!iframeError ? (
        <div className={styles.iframeContainer}>
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title={title || `${formattedName} example`}
            height={iframeHeight}
            className={styles.iframe}
            allow="clipboard-write"
            onLoad={handleIframeLoad}
            onError={() => setIframeError(true)}
            style={{ transition: 'height 0.2s ease-out' }}
          />
        </div>
      ) : (
        <div className={styles.preview} style={{ minHeight: minHeight }}>
          <div className={styles.previewContent}>
            <div className={styles.previewIcon}>
              <StorybookIcon />
            </div>
            <div className={styles.previewText}>
              <span className={styles.previewLabel}>Interactive Example</span>
              <span className={styles.previewName}>{formattedName}</span>
            </div>
          </div>
        </div>
      )}

      {code && (
        <div className={styles.codeBlock}>
          <pre><code>{code}</code></pre>
        </div>
      )}

      <div className={styles.actions}>
        <a
          href={storybookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.storybookLink}
        >
          <StorybookIcon size={14} />
          View in Storybook
        </a>
      </div>
    </div>
  );
}

function StorybookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M16.71.243l-.12 2.71a.18.18 0 00.29.15l1.06-.8.9.7a.18.18 0 00.28-.14l-.1-2.76 1.33-.1a1.2 1.2 0 011.28 1.2v21.81a1.2 1.2 0 01-1.26 1.2l-14.17-.83a1.2 1.2 0 01-1.14-1.18V1.33A1.2 1.2 0 016.2.14l10.5-.02.01.1zm-5.4 10.52c0 .45 2.94.24 3.33-.08 0-2.93-1.58-4.47-4.48-4.47-2.9 0-4.53 1.57-4.53 3.92 0 4.1 5.52 4.18 5.52 6.42 0 .63-.27 1-.87 1-.78 0-1.09-.43-1.05-1.9 0-.35-3.4-.47-3.52 0-.2 3.68 2.03 4.74 4.6 4.74 2.49 0 4.44-1.32 4.44-3.7 0-4.4-5.6-4.27-5.6-6.48 0-.9.64-1.02 1.05-1.02.47 0 1.14.08 1.1 1.57z" />
    </svg>
  );
}

function MobileIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
    </svg>
  );
}
