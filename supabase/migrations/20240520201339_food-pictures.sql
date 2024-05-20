insert into storage.buckets
  (id, name)
values
  ('food-pictures', 'food-pictures');

create policy "Give users access to own folder hd805g_0" on storage.objects
  as permissive
  for insert
  to authenticated
  with check (((bucket_id = 'food-pictures'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



