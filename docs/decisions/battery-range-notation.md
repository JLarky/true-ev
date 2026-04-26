# Battery Range Notation

## Decision

Use **80–10%** for discharge (range) measurements and **10–80%** for charging measurements.

## Rationale

The order should reflect the direction of the operation:

- **Discharge / roadtrip range**: the car starts at 80% and drives down to 10%, so the notation reads 80–10%.
- **Charging**: the car starts at 10% and charges up to 80%, so the notation reads 10–80%.

Using 10–80% for discharge was misleading because it implied charging direction.

## Affected locations

- Discharge: `app/page.tsx`, `app/methodology/page.tsx`, `data/evs.ts`, `lib/compare.ts`
- Charging (unchanged): `app/page.tsx`, `components/EvCard.tsx`, `app/methodology/page.tsx`, `app/ev/[slug]/page.tsx`, `lib/compare.ts`
