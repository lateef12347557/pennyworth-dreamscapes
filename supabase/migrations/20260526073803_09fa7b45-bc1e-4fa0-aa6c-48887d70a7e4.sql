-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  email text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- Profile auto-create
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Properties
create table public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  address text not null,
  price text not null,
  bed int,
  bath int,
  sqft text,
  description text,
  image_url text not null,
  featured boolean not null default false,
  status text not null default 'available',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.properties enable row level security;

create policy "Anyone can view properties" on public.properties for select using (true);
create policy "Admins can insert properties" on public.properties for insert with check (has_role(auth.uid(), 'admin'));
create policy "Admins can update properties" on public.properties for update using (has_role(auth.uid(), 'admin'));
create policy "Admins can delete properties" on public.properties for delete using (has_role(auth.uid(), 'admin'));

-- Likes
create table public.property_likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, property_id)
);
alter table public.property_likes enable row level security;

create policy "Users see own likes" on public.property_likes for select using (auth.uid() = user_id or has_role(auth.uid(), 'admin'));
create policy "Users can like" on public.property_likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike" on public.property_likes for delete using (auth.uid() = user_id);

-- Views
create table public.property_views (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  viewed_at timestamptz not null default now()
);
alter table public.property_views enable row level security;
create policy "Anyone can record a view" on public.property_views for insert with check (true);
create policy "Admins read views" on public.property_views for select using (has_role(auth.uid(), 'admin'));

-- Bookings
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  phone text not null,
  preferred_date date,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
alter table public.bookings enable row level security;

create policy "Anyone can create a booking" on public.bookings for insert with check (true);
create policy "Users see own bookings, admins see all" on public.bookings for select using (auth.uid() = user_id or has_role(auth.uid(), 'admin'));
create policy "Admins update bookings" on public.bookings for update using (has_role(auth.uid(), 'admin'));

-- Profile policies
create policy "Anyone can view profiles" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);

-- Roles policies
create policy "Users read own roles" on public.user_roles for select using (auth.uid() = user_id or has_role(auth.uid(), 'admin'));
create policy "Admins manage roles" on public.user_roles for all using (has_role(auth.uid(), 'admin')) with check (has_role(auth.uid(), 'admin'));

-- Seed properties
insert into public.properties (title, address, price, bed, bath, sqft, description, image_url, featured) values
('Willow Brook Estate', 'Sonoma, California', '$2.4M', 4, 3, '3,200', 'A light-drenched estate framed by ancient oaks, with hand-finished interiors.', '/src/assets/property-1.jpg', true),
('Casa de la Luna', 'Ojai Valley, California', '$3.1M', 5, 4, '4,100', 'Spanish-revival villa with citrus groves and a glass-roofed atrium.', '/src/assets/property-2.jpg', true),
('The Marin Loft', 'Sausalito, California', '$1.8M', 3, 2, '2,400', 'A serene waterfront loft with floor-to-ceiling windows and bay views.', '/src/assets/property-3.jpg', true);