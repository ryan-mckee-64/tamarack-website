-- supabase/portal-sample-data.sql
--
-- Optional. Puts enough content in the portal to see every page working
-- before real data is loaded. Delete these rows whenever you like:
--
--   delete from public.parts where sku like 'DEMO-%';
--
-- Run in the Supabase SQL Editor after portal-schema.sql.

insert into public.parts (sku, name, description, product_line, category, list_price_cents, stock_qty, lead_time_days)
values
  ('DEMO-HK-1042', 'Burner nozzle assembly', 'Complete nozzle and electrode assembly.', 'heat-king', 'Burner', 28900, 24, null),
  ('DEMO-HK-2210', 'Glycol pump, 1.5 HP', 'Direct replacement circulation pump.', 'heat-king', 'Hydronic', 149500, 3, null),
  ('DEMO-HK-3080', 'Hose reel bearing kit', 'Bearings, seals and retaining hardware.', 'heat-king', 'Hose reel', 8450, 0, 14),
  ('DEMO-TZ-5501', 'Heat exchanger gasket set', 'Full gasket set for XHR series exchangers.', 'thawzall-xhr', 'Heat exchanger', 12750, 41, null),
  ('DEMO-TZ-5620', 'Combustion air blower', 'Blower motor and housing.', 'thawzall-xhr', 'Burner', 87400, 6, null),
  ('DEMO-MD-7710', 'Drum drive chain', 'Heavy duty chain, cut to length.', 'mud-dog', 'Drivetrain', 21900, 12, null),
  ('DEMO-YD-8830', 'Fifth wheel lock pin', 'Hardened replacement pin and clip.', 'yard-dog', 'Coupling', 6400, 30, null),
  ('DEMO-RN-9120', 'Hydraulic filter element', '10 micron return line element.', 'renegade', 'Hydraulics', 4950, 58, null),
  ('DEMO-MV-9440', 'Main broom, poly', 'Poly bristle main broom.', 'maverick', 'Brooms', 62300, 4, 21)
on conflict (sku) do nothing;


insert into public.bulletins (kind, reference, title, summary, details, product_line, published_on)
values
  (
    'bulletin',
    'SB-2025-03',
    'Glycol pump seal inspection at 500 hours',
    'Inspect the pump seal at the 500 hour service and replace if weeping.',
    'Units built before the 2025 season may show minor seepage at the pump seal. Inspect at 500 hours, replace with kit DEMO-HK-2210 if any weeping is present.',
    'heat-king',
    current_date - 45
  ),
  (
    'recall',
    'RC-2024-11',
    'Hose reel latch replacement',
    'Affected units need the reel latch replaced before further use.',
    'A limited run of hose reel latches may not hold under vibration. Contact your service centre for a no-charge replacement. Do not operate the reel until the latch is replaced.',
    'heat-king',
    current_date - 220
  ),
  (
    'bulletin',
    'SB-2025-07',
    'Cold weather starting procedure update',
    'Revised pre-heat timing for temperatures below minus 30.',
    'Allow the pre-heat cycle to complete fully before cranking. The revised procedure is in section 4 of the operator manual.',
    'thawzall-xhr',
    current_date - 20
  )
on conflict do nothing;


insert into public.service_centers (name, address, city, region, postal_code, country, phone, email, services, is_authorized, sort_order)
values
  ('Tamarack Industries — Factory Service', '1 Industrial Way', 'Winnipeg', 'MB', 'R3T 0A1', 'Canada', '(204) 555-0100', 'service@tamarackindustries.com', array['Warranty', 'Parts', 'Full service', 'Rebuilds'], true, 0),
  ('Prairie Equipment Service', '4420 Highway 16', 'Saskatoon', 'SK', 'S7K 3J8', 'Canada', '(306) 555-0142', null, array['Parts', 'Field service'], true, 1),
  ('Northern Heat Services', '88 Mackenzie Blvd', 'Fort McMurray', 'AB', 'T9H 4W2', 'Canada', '(780) 555-0177', null, array['Warranty', 'Parts', 'Field service'], true, 2)
on conflict do nothing;


insert into public.maintenance_schedules (product_line, model, interval_label, interval_hours, tasks, sort_order)
values
  ('heat-king', null, 'Daily / every 10 hours', 10,
   array['Check glycol level and top up as needed', 'Inspect hoses and fittings for leaks', 'Clear debris from the burner air intake', 'Check fuel level and water separator'], 0),
  ('heat-king', null, 'Every 250 hours', 250,
   array['Replace fuel filter', 'Inspect burner nozzle and electrodes', 'Test glycol freeze point', 'Grease hose reel bearings'], 1),
  ('heat-king', null, 'Every 500 hours', 500,
   array['Inspect glycol pump seal for weeping', 'Replace burner nozzle', 'Full combustion analysis', 'Inspect and torque all electrical connections'], 2),
  ('thawzall-xhr', null, 'Daily / every 10 hours', 10,
   array['Check fuel and water separator', 'Inspect exhaust and ducting connections', 'Clear intake screens'], 0),
  ('thawzall-xhr', null, 'Every 500 hours', 500,
   array['Replace heat exchanger gaskets if leaking', 'Service combustion air blower', 'Full combustion analysis'], 1),
  ('mud-dog', null, 'Every 100 hours', 100,
   array['Check drum drive chain tension', 'Grease all pivot points', 'Inspect hydraulic hoses'], 0)
on conflict do nothing;
