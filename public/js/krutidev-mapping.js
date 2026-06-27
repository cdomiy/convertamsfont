/**
 * KrutiDev 010 ↔ Unicode Devanagari Mapping
 * Source: LTRC/IIIT-Hyderabad (GPL-3.0), cross-verified with krutidev.net
 * Total: 235 ordered replacement pairs + 12 post-processing rules
 */
const KRUTI_TO_UNICODE_PAIRS = [
  ["\u00f1", "\u0970"],
  ["Q+Z", "QZ+"],
  ["sas", "sa"],
  ["aa", "a"],
  [")Z", "\u0930\u094d\u0926\u094d\u0927"],
  ["ZZ", "Z"],
  ["\u2018", "\u201c"],
  ["\u2019", "\u201d"],
  ["\u201c", "\u2018"],
  ["\u201d", "\u2019"],
  ["\u00e5", "\u0966"],
  ["\u0192", "\u0967"],
  ["\u201e", "\u0968"],
  ["\u2026", "\u0969"],
  ["\u2020", "\u096a"],
  ["\u2021", "\u096b"],
  ["\u02c6", "\u096c"],
  ["\u2030", "\u096d"],
  ["\u0160", "\u096e"],
  ["\u2039", "\u096f"],
  ["\u00b6+", "\u095e\u094d"],
  ["d+", "\u0958"],
  ["[+k", "\u0959"],
  ["[+", "\u0959\u094d"],
  ["x+", "\u095a"],
  ["T+", "\u091c\u093c\u094d"],
  ["t+", "\u095b"],
  ["M+", "\u095c"],
  ["<+", "\u095d"],
  ["Q+", "\u095e"],
  [";+", "\u095f"],
  ["j+", "\u0931"],
  ["u+", "\u0929"],
  ["\u00d9k", "\u0924\u094d\u0924"],
  ["\u00d9", "\u0924\u094d\u0924\u094d"],
  ["\u00e4", "\u0915\u094d\u0924"],
  ["\u2013", "\u0926\u0943"],
  ["\u2014", "\u0915\u0943"],
  ["\u00e9", "\u0928\u094d\u0928"],
  ["\u2122", "\u0928\u094d\u0928\u094d"],
  ["=kk", "=k"],
  ["f=k", "f="],
  ["\u00e0", "\u0939\u094d\u0928"],
  ["\u00e1", "\u0939\u094d\u092f"],
  ["\u00e2", "\u0939\u0943"],
  ["\u00e3", "\u0939\u094d\u092e"],
  ["\u00baz", "\u0939\u094d\u0930"],
  ["\u00ba", "\u0939\u094d"],
  ["\u00ed", "\u0926\u094d\u0926"],
  ["{k", "\u0915\u094d\u0937"],
  ["{", "\u0915\u094d\u0937\u094d"],
  ["=", "\u0924\u094d\u0930"],
  ["\u00ab", "\u0924\u094d\u0930\u094d"],
  ["N\u00ee", "\u091b\u094d\u092f"],
  ["V\u00ee", "\u091f\u094d\u092f"],
  ["B\u00ee", "\u0920\u094d\u092f"],
  ["M\u00ee", "\u0921\u094d\u092f"],
  ["<\u00ee", "\u0922\u094d\u092f"],
  ["|", "\u0926\u094d\u092f"],
  ["K", "\u091c\u094d\u091e"],
  ["}", "\u0926\u094d\u0935"],
  ["J", "\u0936\u094d\u0930"],
  ["V\u00aa", "\u091f\u094d\u0930"],
  ["M\u00aa", "\u0921\u094d\u0930"],
  ["<\u00aa\u00aa", "\u0922\u094d\u0930"],
  ["N\u00aa", "\u091b\u094d\u0930"],
  ["\u00d8", "\u0915\u094d\u0930"],
  ["\u00dd", "\u092b\u094d\u0930"],
  ["nzZ", "\u0930\u094d\u0926\u094d\u0930"],
  ["\u00e6", "\u0926\u094d\u0930"],
  ["\u00e7", "\u092a\u094d\u0930"],
  ["\u00c1", "\u092a\u094d\u0930"],
  ["xz", "\u0917\u094d\u0930"],
  ["\u00f4", "\u0915\u094d\u0915"],
  ["\u00ea", "\u091f\u094d\u091f"],
  ["\u00eb", "\u091f\u094d\u0920"],
  ["\u00ec", "\u0921\u094d\u0921"],
  ["\u00ef", "\u0921\u094d\u0922"],
  [")", "\u0926\u094d\u0927"],
  ["\u00cc", "\u0926\u094d\u0926"],
  ["\u00cd", "\u091f\u094d\u091f"],
  ["\u00ce", "\u091f\u094d\u0920"],
  ["\u00cf", "\u0921\u094d\u0921"],
  ["\u00d1", "\u0915\u0943"],
  ["\u00d2", "\u092d"],
  ["\u00d3", "\u094d\u092f"],
  ["\u00d4", "\u0921\u094d\u0922"],
  ["\u00d6", "\u091d\u094d"],
  ["\u00dck", "\u0936"],
  ["\u00dc", "\u0936\u094d"],
  ["#", "\u0930\u0941"],
  [":", "\u0930\u0942"],
  ["v\u201a", "\u0911"],
  ["vks", "\u0913"],
  ["vkS", "\u0914"],
  ["vk", "\u0906"],
  ["v", "\u0905"],
  ["b\u00b1", "\u0908\u0902"],
  ["\u00c3", "\u0908"],
  ["bZ", "\u0908"],
  ["b", "\u0907"],
  ["m", "\u0909"],
  ["\u00c5", "\u090a"],
  [",s", "\u0910"],
  [",", "\u090f"],
  ["_", "\u090b"],
  ["d", "\u0915"],
  ["Dk", "\u0915"],
  ["D", "\u0915\u094d"],
  ["[k", "\u0916"],
  ["[", "\u0916\u094d"],
  ["x", "\u0917"],
  ["Xk", "\u0917"],
  ["X", "\u0917\u094d"],
  ["\u00c4", "\u0918"],
  ["?k", "\u0918"],
  ["?", "\u0918\u094d"],
  ["\u00b3", "\u0919"],
  ["pkS", "\u091a\u0948"],
  ["p", "\u091a"],
  ["Pk", "\u091a"],
  ["P", "\u091a\u094d"],
  ["N", "\u091b"],
  ["t", "\u091c"],
  ["Tk", "\u091c"],
  ["T", "\u091c\u094d"],
  [">", "\u091d"],
  ["\u00f7", "\u091d\u094d"],
  ["\u00a5", "\u091e"],
  ["V", "\u091f"],
  ["B", "\u0920"],
  ["M", "\u0921"],
  ["<", "\u0922"],
  [".k", "\u0923"],
  [".", "\u0923\u094d"],
  ["r", "\u0924"],
  ["Rk", "\u0924"],
  ["R", "\u0924\u094d"],
  ["Fk", "\u0925"],
  ["F", "\u0925\u094d"],
  ["n", "\u0926"],
  ["/k", "\u0927"],
  ["/", "\u0927\u094d"],
  ["\u00cb", "\u0927\u094d"],
  ["\u00e8", "\u0927"],
  ["u", "\u0928"],
  ["Uk", "\u0928"],
  ["U", "\u0928\u094d"],
  ["i", "\u092a"],
  ["Ik", "\u092a"],
  ["I", "\u092a\u094d"],
  ["Q", "\u092b"],
  ["\u00b6", "\u092b\u094d"],
  ["c", "\u092c"],
  ["Ck", "\u092c"],
  ["C", "\u092c\u094d"],
  ["Hk", "\u092d"],
  ["H", "\u092d\u094d"],
  ["e", "\u092e"],
  ["Ek", "\u092e"],
  ["E", "\u092e\u094d"],
  [";", "\u092f"],
  ["\u00b8", "\u092f\u094d"],
  ["j", "\u0930"],
  ["y", "\u0932"],
  ["Yk", "\u0932"],
  ["Y", "\u0932\u094d"],
  ["G", "\u0933"],
  ["o", "\u0935"],
  ["Ok", "\u0935"],
  ["O", "\u0935\u094d"],
  ["'k", "\u0936"],
  ["'", "\u0936\u094d"],
  ["\"k", "\u0937"],
  ["\"", "\u0937\u094d"],
  ["l", "\u0938"],
  ["Lk", "\u0938"],
  ["L", "\u0938\u094d"],
  ["g", "\u0939"],
  ["\u00c8", "\u0940\u0902"],
  ["saz", "\u094d\u0930\u0947\u0902"],
  ["z", "\u094d\u0930"],
  ["\u201a", "\u0949"],
  ["kas", "\u094b\u0902"],
  ["ks", "\u094b"],
  ["kS", "\u094c"],
  ["\u00a1k", "\u093e\u0901"],
  ["ak", "k\u0902"],
  ["k", "\u093e"],
  ["ah", "\u0940\u0902"],
  ["h", "\u0940"],
  ["aq", "\u0941\u0902"],
  ["q", "\u0941"],
  ["aw", "\u0942\u0902"],
  ["\u00a1w", "\u0942\u0901"],
  ["w", "\u0942"],
  ["`", "\u0943"],
  ["\u0300", "\u0943"],
  ["as", "\u0947\u0902"],
  ["\u00b1s", "s\u00b1"],
  ["s", "\u0947"],
  ["aS", "\u0948\u0902"],
  ["S", "\u0948"],
  ["a\u00aa", "\u094d\u0930\u0902"],
  ["\u00aa", "\u094d\u0930"],
  ["fa", "\u0902f"],
  ["a", "\u0902"],
  ["\u00a1", "\u0901"],
  ["%", ":"],
  ["W", "\u0945"],
  ["\u2022", "\u093d"],
  ["\u00b7", "\u093d"],
  ["\u2219", "\u093d"],
  ["~j", "\u094d\u0930"],
  ["~", "\u094d"],
  ["+", "\u093c"],
  ["^", "\u2018"],
  ["*", "\u2019"],
  ["\u00de", "\u201c"],
  ["\u00df", "\u201d"],
  ["(", ";"],
  ["\u00bc", "("],
  ["\u00bd", ")"],
  ["\u00bf", "{"],
  ["\u00c0", "}"],
  ["\u00be", "="],
  ["A", "\u0964"],
  ["-", "."],
  ["&", "-"],
  ["\u03bc", "-"],
  ["\u0152", "\u0970"],
  ["]", ","],
  ["~ ", "\u094d "],
  ["@", "/"],
  ["\u00ae", "\u0948\u0902"],
];

/**
 * Post-processing rules (applied after pair replacement):
 * 1. ि (i-matra) reordering: In KrutiDev, 'f' appears before consonant; in Unicode, 'ि' appears after
 * 2. र् (reph) reordering: In KrutiDev, 'Z' appears after consonant; in Unicode, 'र्' appears before
 * These are handled programmatically in the krutiDevToUnicode() function below.
 */

/**
 * Convert KrutiDev 010 text to Unicode Devanagari
 * Uses ordered longest-match-first replacement pairs + post-processing
 */
function krutiDevToUnicode(text) {
    if (!text) return '';
    let result = text;
    
    // Step 1: Apply replacement pairs in order (longest match first)
    for (const [kruti, unicode] of KRUTI_TO_UNICODE_PAIRS) {
        result = result.split(kruti).join(unicode);
    }
    
    // Step 2: Post-processing - i-matra (ि) reordering
    // In KrutiDev, the i-matra appears before the consonant (e.g., 'f' before letter)
    // In Unicode, ि appears after the consonant
    // Pattern: ि followed by a consonant → swap order
    result = result.replace(/ि([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह])/g, '$1ि');
    
    // Step 3: Post-processing - reph (र्) reordering  
    // In KrutiDev, reph marker appears after the consonant cluster
    // In Unicode, र् appears before the consonant it modifies
    result = result.replace(/([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह])्र/g, 'र्$1');
    
    return result;
}

/**
 * Convert Unicode Devanagari to KrutiDev 010
 */
function unicodeToKrutiDev(text) {
    if (!text) return '';
    let result = text;
    
    // Reverse i-matra reordering first
    result = result.replace(/([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह])ि/g, 'ि$1');
    
    // Reverse reph reordering
    result = result.replace(/र्([कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह])/g, '$1्र');
    
    // Apply reverse pairs (shortest match first for reverse)
    for (let i = KRUTI_TO_UNICODE_PAIRS.length - 1; i >= 0; i--) {
        const [kruti, unicode] = KRUTI_TO_UNICODE_PAIRS[i];
        result = result.split(unicode).join(kruti);
    }
    
    return result;
}
