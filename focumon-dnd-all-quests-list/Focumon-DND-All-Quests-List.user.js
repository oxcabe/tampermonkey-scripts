// Copyright (C) 2024 Óscar Carrasco

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU
// General Public License as published by the Free Software Foundation, version 3.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
// even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
// Public License for more details.

// You should have received a copy of the GNU General Public License along with this program. If not,
// see <https://www.gnu.org/licenses/>.

// ==UserScript==
// @name         Focumon DND All Quests List
// @namespace    https://oxca.be/
// @copyright    2024, Óscar Carrasco
// @version      2024-05-07
// @description  Adds Drag & Drop sorting functionality to the "All quests" list in Focumon.
// @author       Óscar Carrasco <me@oxca.be>
// @source       https://github.com/oxcabe/tampermonkey-scripts/
// @match        https://www.focumon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=focumon.com
// @grant        none
// ==/UserScript==

'use strict';

// Regex matching for paths running this script
const enabledPathRegex = /^\/(quests)|(training_centers\/.+)$/g;

const integrateDnd = () => {
    // Get DOM node containing document URL as attribute
    const [ogMeta] = document.querySelectorAll('[property="og:url"]');
    if (ogMeta === undefined) {
        return;
    }

    const documentUrl = new URL(document.URL);

    // Check if document URL and og:url content attribute values match
    const urlsMatch = documentUrl.href === ogMeta.getAttribute("content");
    // Match valid path regex against the URL path slice
    const isValidUrl = [...documentUrl.pathname.matchAll(enabledPathRegex)].length > 0;

    if (urlsMatch && isValidUrl) {
        // Configure draggables and DND logic
    }
}

(function() {
    // Try integrating DND on initial page load
    integrateDnd();

    // Create an observer instance to integrate DND on route changes
    const pathObserver = new MutationObserver(integrateDnd);
    // <head> tag is observed since its children nodes mutate when changing routes
    pathObserver.observe(document.head, {
        childList: true
    });
})();
