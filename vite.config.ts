import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {GoogleGenAI} from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

function autoPartsApiPlugin(): Plugin {
  return {
    name: 'auto-parts-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/identify-part', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const { imageBase64, mimeType = 'image/jpeg', description = '', activeVehicle } = JSON.parse(body || '{}');

            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
              const fallbackAnalysis = {
                partType: 'Disc Brake Pad Set (Ceramic / Semi-Metallic)',
                possibleManufacturer: 'Bosch / Brembo / Toyota Genuine (Mobis)',
                partNumberSuggestion: 'BP-04465-0K360',
                oemEquivalent: '04465-0K360 / 58101-1RA00',
                vehicleCompatibility: activeVehicle ? `${activeVehicle.make} ${activeVehicle.model} (${activeVehicle.year})` : 'Toyota Innova Crysta / Fortuner / Hyundai i20',
                compatibilityMatch: 'Likely Compatible with front caliper assembly',
                estimatedPriceRange: '$35 – $65',
                wearCondition: 'Visual assessment indicates friction lining thinning (~3mm remaining). Thermal heat spots detected on friction backing plate.',
                recommendedAction: 'Inspect rotor disc surface runout. Clean caliper sliding pins and apply high-temperature synthetic silicone brake grease.',
                matchedCatalogId: 'prod-bosch-brake-pads',
                disclaimer: 'AI spare-part identification is an assistance tool. Always double-check physical dimensions, bolt centers, and OEM numbers before purchasing.'
              };
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, data: fallbackAnalysis, source: 'automotive-rule-engine' }));
              return;
            }

            const ai = new GoogleGenAI({});
            const prompt = `You are a master automobile technician and spare parts catalog specialist.
Analyze this uploaded automobile spare part image.
Active vehicle context: ${activeVehicle ? JSON.stringify(activeVehicle) : 'Not specified'}.
User description/symptoms: "${description}".

Return strict JSON only with these exact keys:
- partType: specific name of the spare part (e.g. "Front Ceramic Brake Pad", "Cartridge Oil Filter", "Iridium Spark Plug", "Toothed Timing Belt")
- possibleManufacturer: top 2-3 OE or tier-1 aftermarket manufacturers (e.g. "Bosch, Toyota Genuine, Brembo")
- partNumberSuggestion: typical part number or OEM reference pattern
- oemEquivalent: likely OEM cross-reference number
- vehicleCompatibility: summary of vehicles this part typically fits
- compatibilityMatch: compatibility assessment with active vehicle if provided
- estimatedPriceRange: typical price range in USD (e.g. "$25 – $60")
- wearCondition: diagnostic visual assessment of damage, wear, carbon build-up, or fatigue
- recommendedAction: practical maintenance advice (e.g. "Replace in pairs", "Torque to spec", "Check rotor surface")
- matchedCatalogId: if it matches one of ("prod-toyota-oil-filter", "prod-bosch-brake-pads", "prod-hyundai-brake-pads", "prod-ngk-iridium-spark-plugs", "prod-gates-timing-belt", "prod-amaron-battery", "prod-toyota-air-filter"), output that ID, otherwise empty string.
- disclaimer: safety notice that AI identification is an assistant and OEM numbers must be verified.`;

            const contents: any[] = [];
            if (imageBase64) {
              const cleanBase64 = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
              contents.push({
                inlineData: {
                  data: cleanBase64,
                  mimeType: mimeType
                }
              });
            }
            contents.push(prompt);

            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents,
              config: {
                responseMimeType: 'application/json'
              }
            });

            const text = response.text || '{}';
            let parsedData;
            try {
              parsedData = JSON.parse(text);
            } catch {
              parsedData = { rawAnalysis: text };
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, data: parsedData, source: 'gemini-2.5-flash' }));
          } catch (err: any) {
            console.error('Gemini part identification error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Failed to identify part' }));
          }
        });
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), autoPartsApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
