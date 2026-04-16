// Extract domain from URL (remove www. prefix)
function extractDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "").toLowerCase();
  } catch (e) {
    return null;
  }
}

// Get stored grayscale domains
async function getGrayscaleDomains() {
  const result = await browser.storage.local.get("gris_grayscale_domains");
  return result.gris_grayscale_domains || [];
}

// Save grayscale domains
async function saveGrayscaleDomains(domains) {
  await browser.storage.local.set({ gris_grayscale_domains: domains });
}

// Apply grayscale filter to tab
async function applyGrayscale(tabId) {
  try {
    await browser.tabs.insertCSS(tabId, {
      code: "html { filter: grayscale(100%) !important; }",
      runAt: "document_start"
    });
  } catch (e) {
    console.error("Failed to apply grayscale:", e);
  }
}

// Remove grayscale filter from tab
async function removeGrayscale(tabId) {
  try {
    await browser.tabs.removeCSS(tabId, {
      code: "html { filter: grayscale(100%) !important; }"
    });
  } catch (e) {
    console.error("Failed to remove grayscale:", e);
  }
}

// Check if domain has grayscale enabled
async function isGrayscaleEnabled(domain) {
  const domains = await getGrayscaleDomains();
  return domains.includes(domain);
}

// Toggle grayscale for a domain
async function toggleGrayscale(tabId, domain) {
  const domains = await getGrayscaleDomains();
  const index = domains.indexOf(domain);
  
  if (index === -1) {
    // Enable grayscale
    domains.push(domain);
    await saveGrayscaleDomains(domains);
    
    // Apply to ALL tabs with this domain
    const tabs = await browser.tabs.query({});
    for (const tab of tabs) {
      if (extractDomain(tab.url) === domain) {
        await applyGrayscale(tab.id);
      }
    }
    return true;
  } else {
    // Disable grayscale
    domains.splice(index, 1);
    await saveGrayscaleDomains(domains);
    
    // Remove from ALL tabs with this domain
    const tabs = await browser.tabs.query({});
    for (const tab of tabs) {
      if (extractDomain(tab.url) === domain) {
        await removeGrayscale(tab.id);
      }
    }
    return false;
  }
}

// Handle tab updates (navigation, page load)
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Only act when the page is loading or complete
  if (changeInfo.status === "loading" && tab.url) {
    const domain = extractDomain(tab.url);
    if (domain && await isGrayscaleEnabled(domain)) {
      await applyGrayscale(tabId);
    }
  }
});

// Handle browser action click (icon click)
browser.browserAction.onClicked.addListener(async (tab) => {
  const domain = extractDomain(tab.url);
  if (domain) {
    await toggleGrayscale(tab.id, domain);
  }
});
