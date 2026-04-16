<div style="text-align: left; width: 100%;">
<table>
<tr>
  <td width="30%">
    <picture>
      <source srcset="gris-ext/icons/icon.svg" width="150">
      <img alt="Gris extension logo">
    </picture>
  </td>
  <td width="70%">
    <h1>
    Gris
    </h1>
    Firefox extension to toggle grayscale on websites
  </td>
</tr>
</table>
</div>

## What it does

Click the extension icon to turn the current website grayscale. Click again to turn it off. That's it.

Your preference is saved per domain and automatically applied when you visit that site again.

## Local Install

Load it in Firefox:

1. Go to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select `manifest.json`

## How it works

- Injects `filter: grayscale(100%)` CSS on the domain
- Stores enabled domains in local storage
- Auto-applies the filter when you navigate to saved domains
