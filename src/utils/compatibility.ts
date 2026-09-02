import { Product, Vehicle } from '../types';

export interface CompatibilityResult {
  status: 'Compatible' | 'Possible Match' | 'Not Compatible';
  badgeClass: string;
  message: string;
  matchedRuleNotes?: string;
}

export function checkCompatibility(product: Product, vehicle: Vehicle | null): CompatibilityResult {
  if (!vehicle) {
    return {
      status: 'Possible Match',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
      message: 'Select your vehicle to verify 100% guaranteed fitment'
    };
  }

  // Universal accessories
  if (product.category === 'Car Care & Accessories') {
    return {
      status: 'Compatible',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      message: `Universal automotive accessory compatible with ${vehicle.make} ${vehicle.model} (${vehicle.year}).`
    };
  }

  for (const rule of product.compatibleVehicles) {
    const makeMatch = rule.make.toLowerCase().trim() === vehicle.make.toLowerCase().trim();
    const modelMatch = rule.model.toLowerCase().trim() === vehicle.model.toLowerCase().trim();

    if (makeMatch && modelMatch) {
      const yearMatch = vehicle.year >= rule.yearFrom && vehicle.year <= rule.yearTo;

      if (yearMatch) {
        if (rule.engine && rule.engine.length > 0) {
          const vehicleEngineLower = vehicle.engine.toLowerCase();
          const engineFound = rule.engine.some(eng => 
            vehicleEngineLower.includes(eng.toLowerCase()) || eng.toLowerCase().includes(vehicleEngineLower)
          );

          if (engineFound) {
            return {
              status: 'Compatible',
              badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
              message: `100% compatibility match for your ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.engine}).`,
              matchedRuleNotes: rule.fitmentNotes
            };
          } else {
            return {
              status: 'Possible Match',
              badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
              message: `Matches ${vehicle.make} ${vehicle.model} (${vehicle.year}), but engine variant (${vehicle.engine}) requires OEM/part number verification.`,
              matchedRuleNotes: rule.fitmentNotes
            };
          }
        }

        return {
          status: 'Compatible',
          badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          message: `100% compatibility match based on factory vehicle fitment data for ${vehicle.year} ${vehicle.make} ${vehicle.model}.`,
          matchedRuleNotes: rule.fitmentNotes
        };
      } else {
        return {
          status: 'Not Compatible',
          badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
          message: `Fits ${rule.make} ${rule.model} (${rule.yearFrom}-${rule.yearTo}), but your model year is ${vehicle.year}.`
        };
      }
    }
  }

  return {
    status: 'Not Compatible',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
    message: `This part does not match your ${vehicle.year} ${vehicle.make} ${vehicle.model}.`
  };
}
