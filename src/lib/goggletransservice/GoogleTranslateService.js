// lib/GoogleTranslateService.js
export const translateText = async (source_lang, target_lang, text) => {
  const url = 'https://script.google.com/macros/s/AKfycbzH0j33NFHmTA7lvflkJwnmjST-iIGBZdIz1st_NlPHhvNsndS2s6Sbz8OU0OfOOjmTLg/exec'; // Replace with your deployed Apps Script URL

  const data = new URLSearchParams({
    source_lang: source_lang,
    target_lang: target_lang,
    text: text,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
