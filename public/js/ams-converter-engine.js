/**
 * AMS Font Converter Engine
 * Standalone, zero-dependency Unicode↔AMS bidirectional converter
 * 
 * Based on reverse-engineered mapping from indianfontconverter.in
 * AMS font uses ASCII codepoints (0x20-0x7E) to render Devanagari glyphs
 */

// ============================================================
// 1. UNICODE → AMS MAPPING (504 entries from initialMapping)
// ============================================================
const unicodeToAmsMap = new Map([
  ["\u0910","Fe"],["\u20b9","#"],["\u0943","&"],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["0","0"],
  ["\u0967","1"],["\u0968","2"],["\u0969","3"],["\u096a","4"],["\u096b","5"],["\u096c","6"],["\u096d","7"],["\u096e","8"],["\u096f","9"],["\u0966","0"],
  ["\u0930\u0941","@"],["\u0905","A"],["\u092d","Ba"],["\u091b","C"],["\u0921","D"],["\u0948","E"],["\u090f","F"],["\u0918","Ga"],
  ["\u0915\u094d\u0937","Ha"],["\u0940","I"],["\u091d","Ja"],["\u0916","Ka"],["\u0933","L"],["\u0936\u094d\u0930","Ma"],["\u0923","Na"],["\u0920","O"],
  ["\u0924\u094d\u0930","Pa"],["\u0930\u094d","Q"],["\u090b","R"],["\u0936","Sa"],["\u0925","Ta"],["\u0942","U"],["\u0937","Va"],["\u090a","W"],
  ["\u094d","x"],["\u094d\u0930","X"],["\u0927","Ya"],["\u0922","Z"],["\u093e","a"],["\u092c","ba"],["\u091a","ca"],["\u0926","d"],
  ["\u0947","e"],["\u092b","f"],["\u0917","ga"],["\u0939","h"],["\u093f","i"],["\u091c","ja"],["\u0915","k"],["\u0932","la"],
  ["\u092e","ma"],["\u0928","na"],["\u091f","o"],["\u092a","pa"],["\u0907","q"],["\u0930","r"],["\u0938","sa"],["\u0924","ta"],
  ["\u0941","u"],["\u0935","va"],["\u0909","w"],["\u092f","ya"],["\u091c\u094d\u091e","za"],
  ["\u0915\u094d","|"],["\u092d\u094d","B"],["\u0918\u094d","G"],["\u0915\u094d\u0937\u094d","H"],["\u091d\u094d","J"],["\u0916\u094d","K"],
  ["\u0936\u094d\u0930\u094d","M"],["\u0923\u094d","N"],["\u0924\u094d\u0930\u094d","P"],["\u0936\u094d","S"],["\u0925\u094d","T"],
  ["\u0937\u094d","V"],["\u0927\u094d","Y"],["\u092c\u094d","b"],["\u091a\u094d","c"],["\u0917\u094d","g"],["\u091c\u094d","j"],
  ["\u0932\u094d","l"],["\u092e\u094d","m"],["\u0928\u094d","n"],["\u092a\u094d","p"],["\u0938\u094d","s"],["\u0924\u094d","t"],
  ["\u0935\u094d","v"],["\u092f\u094d","y"],["\u091c\u094d\u091e\u094d","z"],
  ["\u200b\u092b\u094d","\u2663"],["\u0932\u094d\u0915\u093f","\\lk"],["\u0936\u094d\u0915\u093f","\\Sk"],["\u0938\u094d\u0924\u093f","\\sta"],
  ["\u0924\u094d\u0935\u093f","\\tva"],["\u0938\u094d\u091c\u093f","\\sja"],["\u0938\u094d\u0932\u093f","\\sla"],["\u0938\u094d\u0925\u093f","\\sTa"],
  ["\u0906","Aa"],["\u092c\u093e","baa"],["\u0915\u093e","ka"],
  ["\u0926\u094d\u0935","\u263a"],["\u200b\u0939\u094d\u0928","\u2640"],["\u0915\u094d\u0915","\u2660"],["\u0926\u094d\u0926","\u263b"],
  ["\u200b\u200b\u0926\u094d\u0928","\u2642"],["\u0926\u094d\u0927","\u2665"],["\u0964\u0964","\u263c"],["\u0950","\u25ba"],
  ["\u091f\u094d\u091f","\u25d8"],["\u0920\u094d\u0920","\u25cb"],["\u091f\u094d\u0920","\u2022"],
  ["\u0914","AaE"],["\u0913","Aae"],["\u0902","/"],["\u094b","ae"],["\u0901","~"],["\u0908","qQ"],["\u093e\u0948","aE"],
  ["\u092d\u094c","BaaE"],["\u091b\u094c","CaE"],["\u0921\u094c","DaE"],["\u090f\u094c","FaE"],["\u0918\u094c","GaaE"],
  ["\u0915\u094d\u0937\u094c","HaaE"],["\u091d\u094c","JaaE"],["\u0916\u094c","KaaE"],["\u0933\u094c","LaE"],
  ["\u0936\u094d\u0930\u094c","MaaE"],["\u0923\u094c","NaaE"],["\u0920\u094c","OaE"],["\u0924\u094d\u0930\u094c","PaaE"],
  ["\u090b\u094c","RaE"],["\u0936\u094c","SaaE"],["\u0925\u094c","TaaE"],["\u0937\u094c","VaaE"],["\u090a\u094c","WaE"],
  ["\u0927\u094c","YaaE"],["\u0922\u094c","ZaE"],["\u092c\u094c","baaE"],["\u091a\u094c","caaE"],["\u0926\u094c","daE"],
  ["\u092b\u094c","faE"],["\u0917\u094c","gaaE"],["\u0939\u094c","haE"],["\u091c\u094c","jaaE"],["\u0915\u094c","kaE"],
  ["\u0932\u094c","laaE"],["\u092e\u094c","maaE"],["\u0928\u094c","naaE"],["\u091f\u094c","oaE"],["\u092a\u094c","paaE"],
  ["\u0907\u094c","qaE"],["\u0930\u094c","raE"],["\u0938\u094c","saaE"],["\u0924\u094c","taaE"],["\u0935\u094c","vaaE"],
  ["\u0909\u094c","waE"],["\u092f\u094c","yaaE"],["\u091c\u094d\u091e\u094c","zaaE"],
  ["\u091f\u094d\u091f\u094c","\u25d8aE"],["\u0920\u094d\u0920\u094c","\u25cbaE"],["\u091f\u094d\u0920\u094c","\u2022aE"],
  ["\u0949","a`"],["\u0945","`"],
  ["\u0930\u094d\u092d\u093e","BaaQ"],["\u0930\u094d\u091b\u093f","iCQ"],["\u0930\u094d\u091b","CQ"],["\u0930\u094d\u091b\u093e","CaQ"],
  ["\u0930\u094d\u0921\u093f","iDQ"],["\u0930\u094d\u0921\u093e","DaQ"],["\u0930\u094d\u090f","FQ"],["\u0930\u094d\u090f\u093e","FaQ"],
  ["\u0930\u094d\u0918\u093f","iGaQ"],["\u0930\u094d\u0918","GaQ"],["\u0930\u094d\u0918\u093e","GaaQ"],
  ["\u0930\u094d\u0915\u094d\u0937\u093f","iHaQ"],["\u0930\u094d\u0915\u094d\u0937","HaQ"],["\u0930\u094d\u0915\u094d\u0937\u093e","HaaQ"],
  ["\u0930\u094d\u091d\u093f","iJaQ"],["\u0930\u094d\u091d","JaQ"],["\u0930\u094d\u091d\u093e","JaaQ"],
  ["\u0930\u094d\u0916\u093f","iKaQ"],["\u0930\u094d\u0916\u093e","KaaQ"],
  ["\u0930\u094d\u0936\u094d\u0930","MaQ"],["\u0930\u094d\u0936\u094d\u0930\u093e","MaaQ"],["\u0930\u094d\u0936\u094d\u0930\u093f","iMaQ"],
  ["\u0930\u094d\u0920\u093f","iOQ"],["\u0930\u094d\u0920","OQ"],["\u0930\u094d\u0920\u093e","OaQ"],
  ["\u0930\u094d\u0924\u094d\u0930\u093e","PaaQ"],["\u0930\u094d\u0924\u094d\u0930","PaQ"],["\u0930\u094d\u0924\u094d\u0930\u093f","iPaQ"],
  ["\u0930\u094d\u0925\u093f","iTaQ"],["\u0930\u094d\u0925","TaQ"],["\u0930\u094d\u0925\u093e","TaaQ"],
  ["\u0930\u094d\u0927\u093f","iYaQ"],["\u0930\u094d\u0922\u093f","iZQ"],["\u0930\u094d\u0922\u093e","ZaQ"],
  ["\u0930\u094d\u092c\u093f","ibaQ"],["\u0930\u094d\u091a\u093f","icaQ"],["\u0930\u094d\u0926\u093f","idQ"],
  ["\u0930\u094d\u092b\u093f","ifQ"],["\u0930\u094d\u092b","fQ"],["\u0930\u094d\u0917\u093f","igaQ"],
  ["\u0930\u094d\u0939\u093f","ihQ"],["\u0930\u094d\u0939","hQ"],["\u0930\u094d\u0939\u093e","haQ"],
  ["\u0930\u094d\u091c\u093f","ijaQ"],["\u0930\u094d\u0915\u093e","kaQ"],["\u0930\u094d\u0928\u093f","inaQ"],
  ["\u0930\u094d\u091f\u093f","ioQ"],["\u0930\u094d\u092a\u093f","ipaQ"],["\u0930\u094d\u0930\u093f","irQ"],
  ["\u0930\u094d\u0938\u093f","isaQ"],["\u0930\u094d\u0938\u093e","saaQ"],["\u0930\u094d\u0935\u093f","ivaQ"],
  ["\u0930\u094d\u092f\u093f","iyaQ"],["\u0930\u094d\u091c\u094d\u091e","zaQ"],["\u0930\u094d\u091c\u094d\u091e\u093e","zaaQ"],
  ["\u0930\u094d\u091c\u094d\u091e\u093f","izaQ"],
  ["\u0930\u094d\u091f\u094d\u091f\u093e","\u25d8aQ"],["\u0930\u094d\u091f\u094d\u091f","\u25d8Q"],["\u0930\u094d\u091f\u094d\u091f\u093f","i\u25d8Q"],
  ["\u0930\u094d\u0920\u094d\u0920\u093e","\u25cbaQ"],["\u0930\u094d\u0920\u094d\u0920","\u25cbQ"],["\u0930\u094d\u0920\u094d\u0920\u093f","i\u25cbQ"],
  ["\u0930\u094d\u091f\u094d\u0920\u093e","\u2022aQ"],["\u0930\u094d\u091f\u094d\u0920","\u2022Q"],["\u0930\u094d\u091f\u094d\u0920\u093f","i\u2022Q"],
  ["\u0915\u094d\u093f\u0930","ikX"],["\u0915\u094d\u0930\u093f","ikX"],["\u0915\u094d\u0930","kX"],["\u0915\u094d\u0930\u0940","kXI"],
  ["\u0915\u094d\u0930\u094b","kXae"],["\u0915\u094d\u0930\u0949","kXa`"],["\u0915\u094d\u0930\u0942","kXU"],
  ["\u0915\u094d\u0930\u0941","kXu"],["\u0915\u094d\u0930\u093e","kXa"],["\u0915\u094d\u0930\u094c","kXaE"],
  ["\u0931","*"]
]);

// ============================================================
// 2. MAPPING PATCHES (5 rounds, applied sequentially)
// ============================================================
const mappingPatches = [
  new Map([
    ["fx","\u2663"],["lik","\\lk"],["Sik","\\Sk"],["sita","\\sta"],["tiva","\\tva"],["sija","\\sja"],["sila","\\sla"],["siTa","\\sTa"],
    ["oX","o^"],["DX","D^"],["gr","gaX"],["sio","\\so"],["sima","\\sma"],["Sima","\\Sma"],
    ["Qk","kQ"],["QVa","VaQ"],["QjaI","jaIQ"],["QSaI","SaIQ"],["QTaI","TaIQ"],["QVaa","VaaQ"],
    ["Qmaa","maaQ"],["QmaI","maIQ"],["QtaI","taIQ"],["Qyaa","yaaQ"],["Qya","yaQ"],["pr","paX"],
    ["Qlaa","laaQ"],["Qla","laQ"],["QsaI","saIQ"],["QBaI","BaIQ"],["QiBa","iBaQ"],["QBa","BaQ"],
    ["Qma","maQ"],["Qga","gaQ"],["QgaI","gaIQ"],["QkI","kIQ"],["QKaI","KaIQ"],["QKa","KaQ"],
    ["Qgaa","gaaQ"],["QiVa","iVaQ"],["QiSa","iSaQ"],["Qita","itaQ"],["Vio","\\Vo"],["Qva","vaQ"],
    ["QvaI","vaIQ"],["Qvaa","vaaQ"],["QfI","fIQ"],["Qf'","fQ"],["Qfa","faQ"],["QSa","SaQ"],
    ["Y@va","YaXuva"],["Qnaa","naaQ"],["Qna","naQ"],["Qima","imaQ"],["QnaI","naIQ"],["QSaa","SaaQ"],
    ["Qta","taQ"],["Qtaa","taaQ"],["Sva","Mva"],["dxiYa","i\u2665"],["YiYa","iYYa"],
    ["QNa","NaQ"],["QNaa","NaaQ"],["QNaI","NaIQ"],["QiNa","iNaQ"],["tita","itta"],
    ["Q\u2665a","\u2665aQ"],["Q\u2665","\u2665Q"],["QYaa","YaaQ"],["QYa","YaQ"],["QdI","dIQ"],
    ["Qd","dQ"],["Qda","daQ"],["QD","DQ"],["QDI","DIQ"],["QbaI","baIQ"],["Qba","baQ"],
    ["Qbaa","baaQ"],["pir","ipaX"],["piryaa","ipaXyaa"],
    ["\u090d","F`"],["QJaI","JaIQ"],["AQI","AIQ"],["QGaI","GaIQ"],["QHaI","HaIQ"],
    ["QMaI","MaIQ"],["QOI","OIQ"],["QrI","rIQ"],["QPaI","PaIQ"],["VaQI","VaIQ"],["YaQI","YaIQ"],
    ["QZI","ZIQ"],["QcaI","caIQ"],["Qca","caQ"],["Qcaa","caaQ"],["QhI","hIQ"],["Qja","jaQ"],
    ["Qjaa","jaaQ"],["Qila","ilaQ"],["QoI","oIQ"],["Qo","oQ"],["Qoa","oaQ"],["QpaI","paIQ"],
    ["Qpa","paQ"],["Qpaa","paaQ"],["Qr","rQ"],["Qra","raQ"],["Qsa","saQ"],["Qttaa","ttaaQ"],
    ["yaQI","yaIQ"],["QzaI","zaIQ"],["Qik","ikQ"],
    ["\u0911","Aa`"],["QLI/","LI/Q"],["QL","LQ"],["QLI","LIQ"],["QiL","iLQ"],["QLa","LaQ"],
    ["Siva","iMva"],["QiC","iCQ"],["QiD","iDQ"],["QiGa","iGaQ"],["Q|iVa","iHaQ"],
    ["QiJa","iJaQ"],["QiKa","iKaQ"],["QiO","iOQ"],["Qtir","iPaQ"],["QiTa","iTaQ"],
    ["QiYa","iYaQ"],["QiZ","iZQ"],["Qiba","ibaQ"],["Qica","icaQ"],["Qid","idQ"],["Qif","ifQ"],
    ["Qiga","igaQ"],["Qih","ihQ"],["Qija","ijaQ"],["Qina","inaQ"],["Qio","ioQ"],["Qipa","ipaQ"],
    ["Qir","irQ"],["Qisa","isaQ"],["Qiva","ivaQ"],["Qiya","iyaQ"],["Qji\u091e","izaQ"],
    ["oQxio","i\u25d8Q"],["OQxiO","i\u25cbQ"],["oQxiO","i\u2022Q"],["|ir","i|r"],
    ["TaQI","TaIQ"],["OQI","OIQ"],["JaQI","JaIQ"],["fQI","fIQ"],["hQI","hIQ"],
    ["HaQI","HaIQ"],["GaQI","GaIQ"],["zaQI","zaIQ"],["MaQI","MaIQ"],["CQI","CIQ"],
    ["fQa","faQ"],["dxyaa","\u2666a"],["dxya","\u2666"],["rU","@"],
    ["nita","inta"],["Nid","iNd"],["niD","inD"],["dxiva","i\u263a"],["oxiva","ioxva"],
    ["h&","\u266b"],["Ni","\\N"],["niGa","\\nGa"],
    ["Z\u093c","Z"],["D\u093c","D"],["ja\u093c","ja"],
    ["\u095b","ja"],["\u095d","Z"],["\u0958","k"],["k\u093c","k"],
    ["\u0959","Ka"],["Ka\u093c","Ka"],["\u095e","f"],["f\u093c","f"]
  ]),
  new Map([
    ["laQI","laIQ"],["br","baX"],["hxma","\u2640"],["Gr","GaX"],["cr","caX"],["jr","jaX"],
    ["OX","O^"],["ZX","Z^"],["Tr","TaX"],["Yr","YaX"],["nr","naX"],["Br","BaX"],
    ["mr","maX"],["yr","yaX"],["vr","vaX"],["Vr","VaX"],["sr","saX"],["Hr","HaX"],
    ["|ita","i|ta"],["nid","ind"],["sipaX/","ispaX/"],["yaQI","yaIQ"],["YaQI","YaIQ"],
    ["\u2663ir","ifX"]
  ]),
  new Map([
    ["\\tvar","tvair"],["i|ta","\\|ta"],["Kita","\\Kta"],["\u2663ita","\\\u2663ta"],
    ["ind","\\nd"],["niYa","\\nYa"],["\u095c","D"],["inta","\\nta"],["nisa","\\nsa"],
    ["s\\tva","\\stva"],["sit","\\st"],["sipa","\\spa"],["bir","ibaX"],["sir","isaX"],
    ["sik","\\sk"],["tir","iPa"],["stir","\\sPa"],["Sir","iMa"]
  ]),
  new Map([
    ["gir","igaX"],["Bir","iBaX"],["mir","imaX"],
    ["qSaaQna","qQSaana"],["qSaaQ","qQSaa"],["qSaQ","qQSa"],["qiSaQ","qQiSa"],["qiVaQ","qQiVa"],
    ["idgiva","id\\gva"],["ViO","iVO"],["|iVa","iHa"],["pisa","\\psa"],
    ["dxir","idX"],["Di\u093c","iD"],["Di","iD"],["Vima","\\Vma"],["pita","\\pta"],
    ["viya","\\vya"],["giva","\\gva"],["oxir","io^"],["Sica","\\Sca"],["sica","\\sca"],
    ["cica","\\cca"],["ciC","\\cC"],["Yid","\\Yd"],["siva","\\sva"],["mima","\\mma"]
  ]),
  new Map([
    ["nidX","\\ndX"],["*x","*"]
  ])
];

// ============================================================
// 3. MATRAS CONFIG (ि matra needs to swap position)
// ============================================================
const matrasToMove = {
  left: ["\u093f"],  // ि matra: moves from after consonant to before
  right: []
};

// ============================================================
// 4. HELPER FUNCTIONS
// ============================================================

/** Escape regex special characters */
function sp(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

/** 
 * Regex-based replacement using a Map.
 * Sorts keys by length (descending) to match longest first.
 */
function op(text, map) {
  const sorted = Array.from(map.entries()).sort((a, b) => b[0].length - a[0].length);
  const pattern = sorted.map(([k]) => sp(k)).join("|");
  const regex = new RegExp(pattern, "g");
  const sortedMap = new Map(sorted);
  return text.replace(regex, (match) => sortedMap.get(match) || match);
}

/**
 * Move matras to correct position before conversion.
 * For ि (i-matra): swap from "consonant + ि" to "ि + consonant"
 */
function handleMatras(text, config) {
  let result = text;
  for (const m of config.right) {
    result = result.replace(new RegExp(`(${m})(.)`, "g"), (_, t, n) => n + t);
  }
  for (const m of config.left) {
    result = result.replace(new RegExp(`(.)(${m})`, "g"), (_, t, n) => n + t);
  }
  return result;
}

/**
 * Handle q..Q pattern transformation.
 * e.g., qtaQr → qQtar (reorder इ + consonant + र् sequences)
 */
function handleQPattern(text) {
  return text.replace(/q(.{2})Q/g, (_, chars) => `qQ${chars}`);
}

/**
 * Apply V2 (OTF font) rules to AMS text.
 * V1 = TTF font, V2 = OTF font with slightly different encoding.
 */
function applyV2Rules(text) {
  let v2 = text;
  v2 = v2.replace(/I/g, "aI");       // Rule 1: I → aI
  v2 = v2.replace(/i/g, "ai");       // Rule 2: i → ai
  v2 = v2.replace(/Aa/g, "Aaa");     // Rule 3a: Aa → Aaa
  v2 = v2.replace(/A(?!a)/g, "Aa");  // Rule 3b: A (not followed by a) → Aa
  return v2;
}

// ============================================================
// 5. MAIN CONVERSION: Unicode (Devanagari) → AMS
// ============================================================

/**
 * Convert Unicode Devanagari text to AMS font encoding.
 * @param {string} text - Unicode Devanagari text
 * @param {object} options - { v2: boolean } for OTF mode
 * @returns {string} AMS-encoded text
 */
function unicodeToAms(text, options = {}) {
  if (!text) return "";
  
  let amsText = text;
  
  // Step 1: Move ि matra position (consonant+ि → ि+consonant)
  amsText = handleMatras(amsText, matrasToMove);
  
  // Step 2: Apply initial mapping (longest match first)
  amsText = op(amsText, unicodeToAmsMap);
  
  // Step 3: Apply mapping patches sequentially (5 rounds)
  for (const patch of mappingPatches) {
    amsText = op(amsText, patch);
  }
  
  // Step 4: Handle q..Q pattern
  amsText = handleQPattern(amsText);
  
  // Step 5: Apply V2 rules if OTF mode
  if (options.v2) {
    amsText = applyV2Rules(amsText);
  }
  
  return amsText;
}

// ============================================================
// 6. REVERSE CONVERSION: AMS → Unicode (Devanagari)
// ============================================================

/**
 * Build reverse mapping from the forward mapping + patches.
 * Since patches override initial mapping for specific sequences,
 * we need to build a consolidated reverse map.
 */
function buildAmsToUnicodeMap() {
  const reverseMap = new Map();
  
  // Build reverse map from unicodeToAmsMap ONLY (patches are AMS→AMS, not Unicode→AMS)
  // Convert all \u093f positions to "pre-swap" form (\u093f before consonant cluster)
  // so the amsToUnicode swap regex can uniformly handle all \u093f positioning
  for (const [uni, ams] of unicodeToAmsMap) {
    let val = uni;
    // Convert to pre-swap form: consonant_cluster + \u093f → \u093f + consonant_cluster
    val = val.replace(/([\u0915-\u0939](?:\u094d[\u0915-\u0939])*)\u093f/g, '\u093f$1');
    reverseMap.set(ams, val);
  }
  
  // Nukta fixes: prefer non-nukta forms (AMS encoding is lossy for nukta)
  reverseMap.set('k', '\u0915');   // \u0915 (not \u0915\u093c)
  reverseMap.set('f', '\u092b');   // \u092b (not \u092b\u093c)
  reverseMap.set('ja', '\u091c');  // \u091c (not \u091c\u093c)
  reverseMap.set('D', '\u0921');   // \u0921 (not \u0921\u093c)
  reverseMap.set('Z', '\u0922');   // \u0922 (not \u0922\u093c)
  reverseMap.set('Ka', '\u0916');  // \u0916 (not \u0916\u093c)
  
  // Special symbol mappings (from patches, not in base reverse map)
  reverseMap.set('@', '\u0930\u0941');             // \u0930\u0941
  reverseMap.set('\u2666', '\u0926\u094d\u092f');   // \u2666 → \u0926\u094d\u092f
  reverseMap.set('\u2666a', '\u0926\u094d\u092f\u093e'); // \u2666a → \u0926\u094d\u092f\u093e
  reverseMap.set('\u2665', '\u0926\u094d\u0935');    // \u2665 → \u0926\u094d\u0935
  reverseMap.set('\u2665a', '\u0926\u094d\u0935\u093e'); // \u2665a → \u0926\u094d\u0935\u093e
  reverseMap.set('\u266b', '\u0939\u0943');          // \u266b → \u0939\u0943
  reverseMap.set('^', '\u094d\u0930');               // ^ → \u094d\u0930
  reverseMap.set('o^', '\u091f\u094d\u0930');         // o^ → \u091f\u094d\u0930
  reverseMap.set('Mva', '\u0936\u094d\u0935');        // Mva → \u0936\u094d\u0935 (from patch Sva→Mva)
  
  return reverseMap;
}

const amsToUnicodeMap = buildAmsToUnicodeMap();

/**
 * Convert AMS font encoded text back to Unicode Devanagari.
 * @param {string} amsText - AMS-encoded text (V1/TTF mode)
 * @returns {string} Unicode Devanagari text
 */
function amsToUnicode(amsText) {
  if (!amsText) return "";
  
  // Step 1: Character-by-character longest-match mapping using reverse map
  let result = '';
  let i = 0;
  const sortedKeys = Array.from(amsToUnicodeMap.entries())
    .sort((a, b) => b[0].length - a[0].length);
  const sortedMap = new Map(sortedKeys);
  
  while (i < amsText.length) {
    let matched = false;
    for (const [key] of sortedMap) {
      if (amsText.substring(i, i + key.length) === key) {
        result += sortedMap.get(key);
        i += key.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result += amsText[i];
      i++;
    }
  }
  
  // Step 2: Clean up nukta remnants
  result = result.replace(/f\u093c/g, '\u092b');
  result = result.replace(/k\u093c/g, '\u0915');
  result = result.replace(/j\u093c/g, '\u091c');
  result = result.replace(/D\u093c/g, '\u0921');
  result = result.replace(/Z\u093c/g, '\u0922');
  result = result.replace(/K\u093c/g, '\u0916');
  
  // Step 3: Move \u0930\u094d (reph) before the syllable it follows
  // In AMS, Q (\u0930\u094d) is placed AFTER the syllable it modifies.
  // Combined pattern: consonant_cluster + (matra)? + \u0930\u094d → \u0930\u094d + consonant_cluster + (matra)?
  result = result.replace(/([\u0915-\u0939](?:\u094d[\u0915-\u0939])*)([\u093e-\u094c\u0949\u0945])?\u0930\u094d/g, '\u0930\u094d$1$2');
  
  // Step 4: Swap \u093f after consonant cluster (single pass only)
  // In AMS, \u093f appears before the consonant cluster (pre-swap form).
  // Move it after: \u093f + consonant_cluster → consonant_cluster + \u093f
  result = result.replace(/\u093f([\u0915-\u0939](?:\u094d[\u0915-\u0939])*)/g, '$1\u093f');
  
  return result;
}

// ============================================================
// 7. TRANSLITERATION: English → Devanagari (via Google Input Tools)
// ============================================================

/**
 * Fetch Devanagari transliteration suggestions from Google Input Tools.
 * @param {string} englishWord - English word to transliterate
 * @param {string} lang - Language code (default: 'hi' for Hindi)
 * @returns {Promise<string[]>} Array of transliteration suggestions
 */
async function transliterate(englishWord, lang = 'hi') {
  if (!englishWord || !/^[a-zA-Z]+$/.test(englishWord)) return [];
  
  try {
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(englishWord)}&itc=${lang}-t-i0-und&num=5&cp=0&cs=1&ie=utf-8&oe=utf-8&app=convertamsfont`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data && data[1] && data[1][0] && data[1][0][1]) {
      return data[1][0][1];
    }
    return [];
  } catch (error) {
    console.error('Transliteration error:', error);
    return [];
  }
}

// ============================================================
// 8. EXPORTS (works in both browser and Node.js)
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    unicodeToAms,
    amsToUnicode,
    transliterate,
    applyV2Rules,
    handleMatras,
    handleQPattern,
    unicodeToAmsMap: unicodeToAmsMap,
    amsToUnicodeMap,
    mappingPatches,
    matrasToMove
  };
}
