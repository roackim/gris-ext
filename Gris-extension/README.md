# Grayscale Toggle - Firefox Extension

A lightweight Firefox extension that allows you to toggle grayscale rendering for websites with automatic per-domain persistence.

## Features

- **One-click toggle**: Click the extension icon to instantly toggle grayscale for the current website
- **Automatic persistence**: Your preferences are saved per domain
- **Automatic application**: Grayscale is automatically applied when you revisit saved domains
- **Minimal UI**: No popups - just click and go
- **Lightweight**: Minimal resource usage and event-driven architecture

## Installation

### For Development/Testing

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on..."
4. Navigate to this directory and select `manifest.json`

The extension will be loaded temporarily (until Firefox is closed).

### For Permanent Installation (Unsigned)

1. Open Firefox and navigate to `about:config`
2. Set `xpinstall.signatures.required` to `false` (not recommended for regular use)
3. Package the extension as a zip file
4. Install via `about:addons`

### For Production

1. Package the extension as a zip file
2. Submit to [Firefox Add-ons](https://addons.mozilla.org/developers/) for signing
3. Install the signed XPI file

## Usage

1. Click the extension icon in the toolbar to toggle grayscale for the current domain
2. The setting is automatically saved
3. Next time you visit any page on that domain, grayscale will be applied automatically
4. Click the icon again to remove the filter and clear the saved preference

## Project Structure

```
.
├── manifest.json       # Extension metadata and permissions
├── background.js       # Background script handling state and events
├── icons/              # Extension icons
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   └── icon-96.png
└── README.md           # This file
```

## Technical Details

### Permissions

- `storage`: For saving domain preferences
- `tabs`: For accessing tab URLs and injecting CSS
- `<all_urls>`: For applying CSS to any website

### How It Works

1. When you toggle grayscale, the domain is extracted from the current tab URL
2. The domain is added/removed from local storage
3. CSS filter is injected/removed: `filter: grayscale(100%)`
4. On page navigation, the extension checks if the domain is in storage
5. If found, grayscale is automatically applied

### Domain Matching

- Domains are normalized by removing the `www.` prefix
- Matching is done at the domain level (not full URL)
- Example: both `example.com` and `www.example.com` are treated as the same domain

## Known Limitations

- Complex TLDs (like `co.uk`) are not specially handled
- CSS injection may be blocked by strict Content Security Policies (rare)
- Some single-page applications (SPAs) may need page refresh for proper application
- Site-specific CSS overrides may conflict with the filter

## Future Enhancements

- Badge icon or visual indicator showing current grayscale status
- Keyboard shortcut for quick toggle
- Sync across devices using `storage.sync`
- Whitelist/blacklist modes
- Temporary override per tab
- Context menu integration
- Better subdomain handling

## License

MIT License - Feel free to use, modify, and distribute.

## Contributing

Suggestions and pull requests are welcome!
