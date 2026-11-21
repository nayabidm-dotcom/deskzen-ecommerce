-- DeskZen Supabase schema
-- Run this in Supabase SQL Editor. Optional — app works in demo mode without it.

create extension if not exists "uuid-ossp";

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  category text not null,
  description text not null,
  specifications jsonb default '{}'::jsonb,
  price numeric(10,2) not null,
  discounted_price numeric(10,2),
  image text,
  stock integer default 0,
  rating numeric(2,1) default 0,
  sku text unique not null,
  created_at timestamptz default now()
);

create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  mobile text not null,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null,
  customer_id uuid references customers(id) on delete set null,
  total_amount numeric(10,2) not null,
  payment_method text not null,
  payment_status text not null,
  order_status text not null default 'Order Placed',
  shipping_address jsonb not null,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  product_id text not null,
  product_name_snapshot text not null,
  quantity integer not null,
  unit_price numeric(10,2) not null,
  subtotal numeric(10,2) not null
);

create table if not exists wishlist (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references customers(id) on delete cascade,
  product_id text not null
);

create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id text not null,
  customer_name text not null,
  rating integer check (rating between 1 and 5),
  review_text text not null,
  created_at timestamptz default now()
);

create index if not exists idx_products_category on products(category);
create index if not exists idx_orders_customer on orders(customer_id);
create index if not exists idx_order_items_order on order_items(order_id);

-- Row Level Security
alter table products enable row level security;
alter table reviews enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table customers enable row level security;
alter table wishlist enable row level security;

-- Public read for products & reviews (via anon key)
create policy "public_read_products" on products for select using (true);
create policy "public_read_reviews" on reviews for select using (true);

-- Orders/customers/wishlist: server-side only (service role bypasses RLS).
-- Do NOT create anon policies for these tables.