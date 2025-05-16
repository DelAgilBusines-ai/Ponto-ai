-- Tabela de perfis de usuários
create table user_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    role varchar(50) default 'user'
);

-- Tabela de pontos (exemplo para o app ponto-ai)
create table points (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    timestamp timestamptz default now(),
    description text
);

-- Tabela de configurações do usuário
create table user_settings (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    notifications_enabled boolean default true
);

-- Roles e permissões
create role admin;
grant all privileges on all tables in schema public to admin;

create role "user"; -- Corrigido: usando aspas duplas para evitar conflito com palavra reservada
grant select, insert, update, delete on all tables in schema public to "user";

-- Atribuir roles automaticamente
create policy "assign_user_role"
on user_profiles
for insert
with check (role = 'user'); -- Corrigido: Apenas valida o valor do campo 'role'

-- Permitir que apenas o próprio usuário insira ou altere seu perfil
create policy "user_can_manage_own_profile"
on user_profiles
for all
using (auth.uid() = id)
with check (auth.uid() = id);
