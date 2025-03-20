// Translation service utility functions

// Language codes and names mapping
export const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "zh", name: "Mandarin" },
  { code: "ar", name: "Arabic" },
  { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "uk", name: "Ukrainian" },
  { code: "vi", name: "Vietnamese" },
  { code: "tl", name: "Tagalog" },
];

// Medical terminology dictionary for common terms
export const medicalTerminology: Record<string, Record<string, string>> = {
  en: {
    headache: "headache (cephalgia)",
    "blood pressure": "blood pressure (BP)",
    "heart rate": "heart rate (HR)",
    temperature: "temperature (temp)",
    pain: "pain (on a scale of 1-10)",
    fever: "fever (pyrexia)",
    nausea: "nausea (N)",
    vomiting: "vomiting (V)",
    dizziness: "dizziness (vertigo)",
    fatigue: "fatigue (asthenia)",
  },
  es: {
    "dolor de cabeza": "dolor de cabeza (cefalea)",
    "presión arterial": "presión arterial (PA)",
    "ritmo cardíaco": "ritmo cardíaco (RC)",
    temperatura: "temperatura (temp)",
    dolor: "dolor (en una escala de 1-10)",
    fiebre: "fiebre (pirexia)",
    náusea: "náusea (N)",
    vómito: "vómito (V)",
    mareo: "mareo (vértigo)",
    fatiga: "fatiga (astenia)",
  },
  fr: {
    "mal de tête": "mal de tête (céphalalgie)",
    "tension artérielle": "tension artérielle (TA)",
    "rythme cardiaque": "rythme cardiaque (RC)",
    température: "température (temp)",
    douleur: "douleur (sur une échelle de 1 à 10)",
    fièvre: "fièvre (pyrexie)",
    nausée: "nausée (N)",
    vomissement: "vomissement (V)",
    vertige: "vertige (vertigo)",
    fatigue: "fatigue (asthénie)",
  },
};

// Function to translate text using the LibreTranslate API
export async function translateText(
  text: string,
  sourceLanguage: string,
  targetLanguage: string,
) {
  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: "text",
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}

// Function to enhance translations with medical terminology
export function enhanceWithMedicalTerminology(
  text: string,
  language: string,
): string {
  if (!medicalTerminology[language]) return text;

  let enhancedText = text;
  Object.entries(medicalTerminology[language]).forEach(
    ([term, replacement]) => {
      const regex = new RegExp(term, "gi");
      enhancedText = enhancedText.replace(regex, replacement);
    },
  );

  return enhancedText;
}

// Function to get language name from code
export function getLanguageName(code: string): string {
  return languages.find((lang) => lang.code === code)?.name || code;
}
