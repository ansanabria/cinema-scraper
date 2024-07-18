create table "public"."cineColombia" (
    "id" bigint generated by default as identity not null,
    "title" text,
    "original_title" text,
    "tmdb_id" bigint
);


alter table "public"."cineColombia" enable row level security;

create table "public"."cinepolis" (
    "id" bigint generated by default as identity not null,
    "title" text,
    "original_title" text,
    "tmdb_id" bigint
);


alter table "public"."cinepolis" enable row level security;

create table "public"."movies" (
    "id" bigint generated by default as identity not null,
    "title" text,
    "tmdb_id" bigint
);


alter table "public"."movies" enable row level security;

create table "public"."procinal" (
    "id" bigint generated by default as identity not null,
    "title" text,
    "original_title" text,
    "tmdb_id" bigint
);


alter table "public"."procinal" enable row level security;

CREATE UNIQUE INDEX "cineColombia_pkey" ON public."cineColombia" USING btree (id);

CREATE UNIQUE INDEX cinepolis_pkey ON public.cinepolis USING btree (id);

CREATE UNIQUE INDEX movies_pkey ON public.movies USING btree (id);

CREATE UNIQUE INDEX procinal_pkey ON public.procinal USING btree (id);

alter table "public"."cineColombia" add constraint "cineColombia_pkey" PRIMARY KEY using index "cineColombia_pkey";

alter table "public"."cinepolis" add constraint "cinepolis_pkey" PRIMARY KEY using index "cinepolis_pkey";

alter table "public"."movies" add constraint "movies_pkey" PRIMARY KEY using index "movies_pkey";

alter table "public"."procinal" add constraint "procinal_pkey" PRIMARY KEY using index "procinal_pkey";

grant delete on table "public"."cineColombia" to "anon";

grant insert on table "public"."cineColombia" to "anon";

grant references on table "public"."cineColombia" to "anon";

grant select on table "public"."cineColombia" to "anon";

grant trigger on table "public"."cineColombia" to "anon";

grant truncate on table "public"."cineColombia" to "anon";

grant update on table "public"."cineColombia" to "anon";

grant delete on table "public"."cineColombia" to "authenticated";

grant insert on table "public"."cineColombia" to "authenticated";

grant references on table "public"."cineColombia" to "authenticated";

grant select on table "public"."cineColombia" to "authenticated";

grant trigger on table "public"."cineColombia" to "authenticated";

grant truncate on table "public"."cineColombia" to "authenticated";

grant update on table "public"."cineColombia" to "authenticated";

grant delete on table "public"."cineColombia" to "service_role";

grant insert on table "public"."cineColombia" to "service_role";

grant references on table "public"."cineColombia" to "service_role";

grant select on table "public"."cineColombia" to "service_role";

grant trigger on table "public"."cineColombia" to "service_role";

grant truncate on table "public"."cineColombia" to "service_role";

grant update on table "public"."cineColombia" to "service_role";

grant delete on table "public"."cinepolis" to "anon";

grant insert on table "public"."cinepolis" to "anon";

grant references on table "public"."cinepolis" to "anon";

grant select on table "public"."cinepolis" to "anon";

grant trigger on table "public"."cinepolis" to "anon";

grant truncate on table "public"."cinepolis" to "anon";

grant update on table "public"."cinepolis" to "anon";

grant delete on table "public"."cinepolis" to "authenticated";

grant insert on table "public"."cinepolis" to "authenticated";

grant references on table "public"."cinepolis" to "authenticated";

grant select on table "public"."cinepolis" to "authenticated";

grant trigger on table "public"."cinepolis" to "authenticated";

grant truncate on table "public"."cinepolis" to "authenticated";

grant update on table "public"."cinepolis" to "authenticated";

grant delete on table "public"."cinepolis" to "service_role";

grant insert on table "public"."cinepolis" to "service_role";

grant references on table "public"."cinepolis" to "service_role";

grant select on table "public"."cinepolis" to "service_role";

grant trigger on table "public"."cinepolis" to "service_role";

grant truncate on table "public"."cinepolis" to "service_role";

grant update on table "public"."cinepolis" to "service_role";

grant delete on table "public"."movies" to "anon";

grant insert on table "public"."movies" to "anon";

grant references on table "public"."movies" to "anon";

grant select on table "public"."movies" to "anon";

grant trigger on table "public"."movies" to "anon";

grant truncate on table "public"."movies" to "anon";

grant update on table "public"."movies" to "anon";

grant delete on table "public"."movies" to "authenticated";

grant insert on table "public"."movies" to "authenticated";

grant references on table "public"."movies" to "authenticated";

grant select on table "public"."movies" to "authenticated";

grant trigger on table "public"."movies" to "authenticated";

grant truncate on table "public"."movies" to "authenticated";

grant update on table "public"."movies" to "authenticated";

grant delete on table "public"."movies" to "service_role";

grant insert on table "public"."movies" to "service_role";

grant references on table "public"."movies" to "service_role";

grant select on table "public"."movies" to "service_role";

grant trigger on table "public"."movies" to "service_role";

grant truncate on table "public"."movies" to "service_role";

grant update on table "public"."movies" to "service_role";

grant delete on table "public"."procinal" to "anon";

grant insert on table "public"."procinal" to "anon";

grant references on table "public"."procinal" to "anon";

grant select on table "public"."procinal" to "anon";

grant trigger on table "public"."procinal" to "anon";

grant truncate on table "public"."procinal" to "anon";

grant update on table "public"."procinal" to "anon";

grant delete on table "public"."procinal" to "authenticated";

grant insert on table "public"."procinal" to "authenticated";

grant references on table "public"."procinal" to "authenticated";

grant select on table "public"."procinal" to "authenticated";

grant trigger on table "public"."procinal" to "authenticated";

grant truncate on table "public"."procinal" to "authenticated";

grant update on table "public"."procinal" to "authenticated";

grant delete on table "public"."procinal" to "service_role";

grant insert on table "public"."procinal" to "service_role";

grant references on table "public"."procinal" to "service_role";

grant select on table "public"."procinal" to "service_role";

grant trigger on table "public"."procinal" to "service_role";

grant truncate on table "public"."procinal" to "service_role";

grant update on table "public"."procinal" to "service_role";


