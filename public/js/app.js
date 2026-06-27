/**
 * AMS Font Converter - Frontend Application
 * Handles UI interactions, conversion triggers, transliteration
 */
(function() {
    'use strict';

    // DOM Elements
    const inputEditor = document.getElementById('unicodeInput');
    const outputEditor = document.getElementById('amsOutput');
    const suggestions = document.getElementById('suggestions');
    const convertBtn = document.getElementById('convertBtn');
    const pasteBtn = document.getElementById('pasteBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearOutputBtn = document.getElementById('clearOutputBtn');
    const v2Toggle = document.getElementById('v2Toggle');
    const notification = document.getElementById('notification');
    const langButtons = document.querySelectorAll('.lang-btn');

    // State
    let notificationTimeout = null;
    let translationTimeout = null;
    let isTranslating = false;

    // Notification
    function showNotification(message) {
        if (notificationTimeout) clearTimeout(notificationTimeout);
        notification.textContent = message;
        notification.classList.add('show');
        notificationTimeout = setTimeout(() => notification.classList.remove('show'), 3000);
    }

    // Toolbar Buttons
    pasteBtn.addEventListener('click', () => {
        if (navigator.clipboard && navigator.clipboard.readText) {
            navigator.clipboard.readText()
                .then(text => { inputEditor.value = text; showNotification('Text pasted!'); })
                .catch(() => showNotification('Failed to paste. Use Ctrl+V.'));
        } else {
            showNotification('Paste not supported. Use Ctrl+V.');
        }
    });

    clearInputBtn.addEventListener('click', () => {
        inputEditor.value = '';
        suggestions.innerHTML = '';
    });

    copyBtn.addEventListener('click', () => {
        const text = outputEditor.value;
        if (!text) { showNotification('Nothing to copy!'); return; }
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => showNotification('AMS text copied!'));
        } else {
            outputEditor.select();
            document.execCommand('copy');
            showNotification('AMS text copied!');
        }
    });

    clearOutputBtn.addEventListener('click', () => {
        outputEditor.value = '';
        outputEditor.dataset.pristineAms = '';
        v2Toggle.checked = false;
    });

    // Convert
    convertBtn.addEventListener('click', performConversion);
    inputEditor.addEventListener('input', debounce(performConversion, 300));

    function performConversion() {
        const text = inputEditor.value;
        if (!text) {
            outputEditor.value = '';
            outputEditor.dataset.pristineAms = '';
            return;
        }

        const amsText = unicodeToAms(text, { v2: v2Toggle.checked });
        outputEditor.dataset.pristineAms = unicodeToAms(text, { v2: false });
        outputEditor.value = amsText;
        showNotification('Conversion complete!');
    }

    // V2 Toggle
    v2Toggle.addEventListener('change', () => {
        const pristine = outputEditor.dataset.pristineAms || '';
        if (!pristine) { outputEditor.value = ''; return; }
        outputEditor.value = v2Toggle.checked ? applyV2Rules(pristine) : pristine;
    });

    // Language Buttons (Transliteration)
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.lang === 'off') suggestions.innerHTML = '';
            inputEditor.focus();
        });
    });

    function getSelectedLang() {
        const active = document.querySelector('.lang-btn.active');
        return active ? active.dataset.lang : 'off';
    }

    // Transliteration on typing
    inputEditor.addEventListener('input', () => {
        const lang = getSelectedLang();
        if (lang === 'off') return;
        clearTimeout(translationTimeout);
        translationTimeout = setTimeout(() => fetchSuggestions(lang), 400);
    });

    inputEditor.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            const lang = getSelectedLang();
            if (lang !== 'off') {
                const wordInfo = getCurrentWordInfo();
                if (wordInfo.word) {
                    e.preventDefault();
                    commitTranslation(wordInfo.word, wordInfo.start, e.key === ' ' ? ' ' : '\n', lang);
                }
            }
        }
    });

    function getCurrentWordInfo() {
        const text = inputEditor.value;
        const pos = inputEditor.selectionStart;
        const before = text.substring(0, pos);
        let start = Math.max(before.lastIndexOf(' ') + 1, before.lastIndexOf('\n') + 1);
        return { word: text.substring(start, pos), start, end: pos };
    }

    async function commitTranslation(word, startPos, charAdded, lang) {
        if (!word || !/^[a-zA-Z]+$/.test(word)) return;
        isTranslating = true;

        try {
            const url = `https://inputtools.google.com/request?text=${encodeURIComponent(word)}&itc=${lang}-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=convertamsfont`;
            const res = await fetch(url);
            const data = await res.json();

            let translation = word;
            if (data && data[1] && data[1][0] && data[1][0][1] && data[1][0][1].length > 0) {
                translation = data[1][0][1][0];
            }

            const text = inputEditor.value;
            const beforeWord = text.substring(0, startPos);
            const afterWord = text.substring(startPos + word.length);
            inputEditor.value = beforeWord + translation + charAdded + afterWord;

            const newPos = beforeWord.length + translation.length + charAdded.length;
            inputEditor.setSelectionRange(newPos, newPos);
            suggestions.innerHTML = '';
        } catch (err) {
            console.error('Transliteration error:', err);
        } finally {
            isTranslating = false;
        }
    }

    async function fetchSuggestions(lang) {
        const wordInfo = getCurrentWordInfo();
        const word = wordInfo.word.trim();
        if (!word || !/^[a-zA-Z]+$/.test(word)) { suggestions.innerHTML = ''; return; }
        if (isTranslating) return;
        isTranslating = true;

        try {
            const url = `https://inputtools.google.com/request?text=${encodeURIComponent(word)}&itc=${lang}-t-i0-und&num=5&cp=0&cs=1&ie=utf-8&oe=utf-8&app=convertamsfont`;
            const res = await fetch(url);
            const data = await res.json();

            let translations = [];
            if (data && data[1] && data[1][0] && data[1][0][1]) {
                translations = data[1][0][1];
            }
            displaySuggestions(translations, wordInfo.start, word);
        } catch (err) {
            suggestions.innerHTML = '';
        } finally {
            isTranslating = false;
        }
    }

    function displaySuggestions(translations, wordStart, englishWord) {
        suggestions.innerHTML = '';
        translations.forEach(trans => {
            const chip = document.createElement('div');
            chip.className = 'suggestion-chip';
            chip.textContent = trans;
            chip.addEventListener('click', () => {
                const text = inputEditor.value;
                const before = text.substring(0, wordStart);
                const after = text.substring(wordStart + englishWord.length);
                inputEditor.value = before + trans + after;
                const newPos = before.length + trans.length;
                inputEditor.setSelectionRange(newPos, newPos);
                suggestions.innerHTML = '';
                inputEditor.focus();
            });
            suggestions.appendChild(chip);
        });
    }

    // Utility
    function debounce(fn, delay) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // Auto-convert on load if there's pre-filled text
    if (inputEditor.value) performConversion();
})();
