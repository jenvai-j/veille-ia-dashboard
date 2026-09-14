-- Vote du groupe EVG Vikky Boy.
-- A coller dans Supabase > SQL Editor, puis "Run".
-- Un seul vote par prenom, modifiable jusqu'a la cloture.

create table if not exists public.votes (
  name text primary key check (
    name in (
      'Athusan',
      'Mayooran',
      'Mahinthan',
      'Jehanan',
      'Lukshan',
      'Rathusan',
      'Rajith'
    )
  ),
  choice     text not null check (choice in ('tenerife', 'marrakech')),
  updated_at timestamptz not null default now()
);

alter table public.votes enable row level security;

-- Le site est prive et partage par lien, sans comptes utilisateurs. On autorise
-- donc la lecture et l'ecriture anonymes. Les contraintes CHECK ci-dessus font
-- le vrai travail : impossible d'inserer un prenom inconnu ou une destination
-- inventee, meme en appelant l'API Supabase directement.
drop policy if exists "lecture publique" on public.votes;
create policy "lecture publique" on public.votes
  for select using (true);

drop policy if exists "insertion publique" on public.votes;
create policy "insertion publique" on public.votes
  for insert with check (true);

drop policy if exists "mise a jour publique" on public.votes;
create policy "mise a jour publique" on public.votes
  for update using (true) with check (true);
