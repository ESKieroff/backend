--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Gender" AS ENUM (
    'MALE',
    'FEMALE',
    'OTHER'
);


ALTER TYPE public."Gender" OWNER TO postgres;

--
-- Name: Origin; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Origin" AS ENUM (
    'RAW_MATERIAL',
    'MADE',
    'CONSUMABLE',
    'OTHER'
);


ALTER TYPE public."Origin" OWNER TO postgres;

--
-- Name: Person_Type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Person_Type" AS ENUM (
    'COSTUMER',
    'SUPPLIER'
);


ALTER TYPE public."Person_Type" OWNER TO postgres;

--
-- Name: Price_Type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Price_Type" AS ENUM (
    'COST',
    'SALE'
);


ALTER TYPE public."Price_Type" OWNER TO postgres;

--
-- Name: Production_Status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Production_Status" AS ENUM (
    'CREATED',
    'SCHEDULED',
    'OPEN',
    'IN_PROGRESS',
    'FINISHED',
    'STOPPED',
    'CANCELED'
);


ALTER TYPE public."Production_Status" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'DEFAULT',
    'ROOT',
    'ADMIN',
    'DEMO',
    'API',
    'SYSTEM'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: Stock_Moviment; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Stock_Moviment" AS ENUM (
    'INPUT',
    'TRANSIT',
    'OUTPUT',
    'RESERVED',
    'BALANCE',
    'ADJUST',
    'INVENTORY'
);


ALTER TYPE public."Stock_Moviment" OWNER TO postgres;

--
-- Name: Unit_Measure; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Unit_Measure" AS ENUM (
    'UN',
    'PC',
    'PCT',
    'ML',
    'L',
    'GR',
    'KG',
    'TON'
);


ALTER TYPE public."Unit_Measure" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: composition_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.composition_items (
    id integer NOT NULL,
    composition_id integer NOT NULL,
    sequence integer NOT NULL,
    product_id integer NOT NULL,
    quantity double precision NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.composition_items OWNER TO postgres;

--
-- Name: composition_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.composition_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.composition_items_id_seq OWNER TO postgres;

--
-- Name: composition_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.composition_items_id_seq OWNED BY public.composition_items.id;


--
-- Name: compositions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compositions (
    id integer NOT NULL,
    product_id integer NOT NULL,
    description character varying(255) NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer,
    production_steps json
);


ALTER TABLE public.compositions OWNER TO postgres;

--
-- Name: compositions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.compositions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.compositions_id_seq OWNER TO postgres;

--
-- Name: compositions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compositions_id_seq OWNED BY public.compositions.id;


--
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groups (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    father_id integer,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.groups OWNER TO postgres;

--
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.groups_id_seq OWNER TO postgres;

--
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;


--
-- Name: ocurrences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ocurrences (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.ocurrences OWNER TO postgres;

--
-- Name: ocurrences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ocurrences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ocurrences_id_seq OWNER TO postgres;

--
-- Name: ocurrences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ocurrences_id_seq OWNED BY public.ocurrences.id;


--
-- Name: ocurrences_of_production_stages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ocurrences_of_production_stages (
    id integer NOT NULL,
    ocurrence_id integer NOT NULL,
    description character varying(255) NOT NULL,
    observation text,
    image_link text,
    photo bytea[],
    stage_ocurred_id integer NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.ocurrences_of_production_stages OWNER TO postgres;

--
-- Name: ocurrences_of_production_stages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ocurrences_of_production_stages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ocurrences_of_production_stages_id_seq OWNER TO postgres;

--
-- Name: ocurrences_of_production_stages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ocurrences_of_production_stages_id_seq OWNED BY public.ocurrences_of_production_stages.id;


--
-- Name: persons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.persons (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    type public."Person_Type" DEFAULT 'SUPPLIER'::public."Person_Type" NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.persons OWNER TO postgres;

--
-- Name: persons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.persons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.persons_id_seq OWNER TO postgres;

--
-- Name: persons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.persons_id_seq OWNED BY public.persons.id;


--
-- Name: prices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prices (
    id integer NOT NULL,
    product_id integer NOT NULL,
    price double precision NOT NULL,
    type public."Price_Type" DEFAULT 'COST'::public."Price_Type" NOT NULL,
    is_current boolean DEFAULT true NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.prices OWNER TO postgres;

--
-- Name: prices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.prices_id_seq OWNER TO postgres;

--
-- Name: prices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prices_id_seq OWNED BY public.prices.id;


--
-- Name: production_lines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.production_lines (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.production_lines OWNER TO postgres;

--
-- Name: production_lines_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.production_lines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.production_lines_id_seq OWNER TO postgres;

--
-- Name: production_lines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.production_lines_id_seq OWNED BY public.production_lines.id;


--
-- Name: production_order_steps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.production_order_steps (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.production_order_steps OWNER TO postgres;

--
-- Name: production_order_steps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.production_order_steps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.production_order_steps_id_seq OWNER TO postgres;

--
-- Name: production_order_steps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.production_order_steps_id_seq OWNED BY public.production_order_steps.id;


--
-- Name: production_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.production_orders (
    id integer NOT NULL,
    number integer NOT NULL,
    description character varying(255),
    production_date timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer,
    "Production_Status" public."Production_Status" DEFAULT 'CREATED'::public."Production_Status" NOT NULL
);


ALTER TABLE public.production_orders OWNER TO postgres;

--
-- Name: production_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.production_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.production_orders_id_seq OWNER TO postgres;

--
-- Name: production_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.production_orders_id_seq OWNED BY public.production_orders.id;


--
-- Name: production_orders_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.production_orders_items (
    id integer NOT NULL,
    production_order_id integer NOT NULL,
    sequence integer NOT NULL,
    final_product_id integer NOT NULL,
    prodution_quantity_estimated double precision NOT NULL,
    production_quantity_real double precision NOT NULL,
    production_quantity_loss double precision NOT NULL,
    lote character varying(255),
    lote_expiration timestamp(3) without time zone,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.production_orders_items OWNER TO postgres;

--
-- Name: production_orders_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.production_orders_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.production_orders_items_id_seq OWNER TO postgres;

--
-- Name: production_orders_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.production_orders_items_id_seq OWNED BY public.production_orders_items.id;


--
-- Name: production_steps_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.production_steps_progress (
    id integer NOT NULL,
    production_id integer NOT NULL,
    step_id integer NOT NULL,
    sequence integer NOT NULL,
    raw_product_id integer NOT NULL,
    start_time timestamp(3) without time zone,
    end_time timestamp(3) without time zone,
    total_time double precision,
    initial_quantity double precision,
    final_quantity double precision,
    quantity_loss double precision,
    machine text,
    line_id integer DEFAULT 1,
    image_link text,
    photo bytea[],
    observation text,
    operator_id integer,
    ocurrences json,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.production_steps_progress OWNER TO postgres;

--
-- Name: production_steps_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.production_steps_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.production_steps_progress_id_seq OWNER TO postgres;

--
-- Name: production_steps_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.production_steps_progress_id_seq OWNED BY public.production_steps_progress.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    code character varying(255) NOT NULL,
    sku character varying(255) NOT NULL,
    origin public."Origin" DEFAULT 'RAW_MATERIAL'::public."Origin" NOT NULL,
    unit_measure public."Unit_Measure" DEFAULT 'UN'::public."Unit_Measure" NOT NULL,
    category_id integer DEFAULT 1 NOT NULL,
    group_id integer DEFAULT 1 NOT NULL,
    supplier_id integer,
    nutritional_info jsonb,
    image_link text,
    photo bytea[],
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: stock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stock (
    id integer NOT NULL,
    document_number character varying(255) NOT NULL,
    document_date timestamp(6) without time zone NOT NULL,
    stock_moviment public."Stock_Moviment" NOT NULL,
    is_balance boolean DEFAULT false NOT NULL,
    document_type character varying(255),
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.stock OWNER TO postgres;

--
-- Name: stock_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stock_id_seq OWNER TO postgres;

--
-- Name: stock_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stock_id_seq OWNED BY public.stock.id;


--
-- Name: stock_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stock_items (
    id integer NOT NULL,
    stock_id integer NOT NULL,
    sequence integer NOT NULL,
    product_id integer NOT NULL,
    quantity double precision NOT NULL,
    unit_price double precision NOT NULL,
    total_price double precision NOT NULL,
    lote text,
    expiration timestamp(3) without time zone,
    image_link text,
    photo bytea[],
    supplier integer,
    costumer integer,
    stock_location_id integer NOT NULL,
    observation text,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.stock_items OWNER TO postgres;

--
-- Name: stock_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stock_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stock_items_id_seq OWNER TO postgres;

--
-- Name: stock_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stock_items_id_seq OWNED BY public.stock_items.id;


--
-- Name: stock_location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stock_location (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.stock_location OWNER TO postgres;

--
-- Name: stock_location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stock_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stock_location_id_seq OWNER TO postgres;

--
-- Name: stock_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stock_location_id_seq OWNED BY public.stock_location.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public."Role" DEFAULT 'DEFAULT'::public."Role" NOT NULL,
    username character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    gender public."Gender" DEFAULT 'OTHER'::public."Gender",
    active boolean DEFAULT true NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: composition_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.composition_items ALTER COLUMN id SET DEFAULT nextval('public.composition_items_id_seq'::regclass);


--
-- Name: compositions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compositions ALTER COLUMN id SET DEFAULT nextval('public.compositions_id_seq'::regclass);


--
-- Name: groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);


--
-- Name: ocurrences id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ocurrences ALTER COLUMN id SET DEFAULT nextval('public.ocurrences_id_seq'::regclass);


--
-- Name: ocurrences_of_production_stages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ocurrences_of_production_stages ALTER COLUMN id SET DEFAULT nextval('public.ocurrences_of_production_stages_id_seq'::regclass);


--
-- Name: persons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persons ALTER COLUMN id SET DEFAULT nextval('public.persons_id_seq'::regclass);


--
-- Name: prices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prices ALTER COLUMN id SET DEFAULT nextval('public.prices_id_seq'::regclass);


--
-- Name: production_lines id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_lines ALTER COLUMN id SET DEFAULT nextval('public.production_lines_id_seq'::regclass);


--
-- Name: production_order_steps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_order_steps ALTER COLUMN id SET DEFAULT nextval('public.production_order_steps_id_seq'::regclass);


--
-- Name: production_orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_orders ALTER COLUMN id SET DEFAULT nextval('public.production_orders_id_seq'::regclass);


--
-- Name: production_orders_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_orders_items ALTER COLUMN id SET DEFAULT nextval('public.production_orders_items_id_seq'::regclass);


--
-- Name: production_steps_progress id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_steps_progress ALTER COLUMN id SET DEFAULT nextval('public.production_steps_progress_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: stock id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock ALTER COLUMN id SET DEFAULT nextval('public.stock_id_seq'::regclass);


--
-- Name: stock_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_items ALTER COLUMN id SET DEFAULT nextval('public.stock_items_id_seq'::regclass);


--
-- Name: stock_location id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_location ALTER COLUMN id SET DEFAULT nextval('public.stock_location_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, description, active, created_at, updated_at, created_by, updated_by) FROM stdin;
1	Premium	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	Importado	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	Nacional	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	Top Demais	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
5	Promo├º├úo	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: composition_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.composition_items (id, composition_id, sequence, product_id, quantity, created_at, updated_at, created_by, updated_by) FROM stdin;
1	1	1	1	20	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	2	1	2	20	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	3	1	3	20	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	4	1	4	20	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
5	5	1	5	20	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
6	6	1	6	20	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
7	7	1	7	20	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: compositions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.compositions (id, product_id, description, created_at, updated_at, created_by, updated_by, production_steps) FROM stdin;
1	8	batata frita	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N	\N
2	9	cenoura cubinhos	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N	\N
3	10	aipim descascado	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N	\N
4	11	mirtilos selecionados	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N	\N
5	12	laranja fatiada	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N	\N
6	13	mix de verduras	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N	\N
7	14	suco natural de uva	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N	\N
\.


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.groups (id, description, father_id, active, created_at, updated_at, created_by, updated_by) FROM stdin;
1	Batata	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	Tomate	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	Cebola	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	Couve	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
5	Melancia	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
6	Batata Branca	1	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
7	Tomate Cereja	2	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
8	Cebola Roxa	3	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
9	Couve Mirim	4	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
10	Melancia Gigante	5	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: ocurrences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ocurrences (id, description, created_at, updated_at, created_by, updated_by) FROM stdin;
1	Problema na Linha de Produ├º├úo	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	Manuten├º├úo Necess├íria	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	Falha na Verifica├º├úo de Qualidade	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	Novo Equipamento Instalado	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
5	Incidente de Seguran├ºa	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
6	Corpo estranho	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
7	Mau odor	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
8	Falta de energia	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
9	Defeito no equipamento	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
10	Impr├│prio para consumo	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
11	N├úo especificado	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
12	Controle de qualidade	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: ocurrences_of_production_stages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ocurrences_of_production_stages (id, ocurrence_id, description, observation, image_link, photo, stage_ocurred_id, created_at, updated_at, created_by, updated_by) FROM stdin;
1	1	Problema na Linha de Produ├º├úo	Houve um problema na linha de produ├º├úo que causou um atraso.	https://images.app.goo.gl/DDnkSGBFhtAJ6LAF7	\N	1	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	2	Manuten├º├úo Necess├íria	Manuten├º├úo programada ├® necess├íria para o equipamento.	https://th.bing.com/th/id/R.185f438e71c11e0506d11e41566f22e4?rik=lHVWNPA5HwV8Sg&pid=ImgRaw&r=0	\N	2	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	3	Falha na Verifica├º├úo de Qualidade	A verifica├º├úo de qualidade falhou para o lote #123.	https://images.app.goo.gl/xyXxbBfENNM2R1fM9	\N	3	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	4	Novo Equipamento Instalado	Novo equipamento foi instalado na linha de produ├º├úo.	https://th.bing.com/th/id/R.185f438e71c11e0506d11e41566f22e4?rik=lHVWNPA5HwV8Sg&pid=ImgRaw&r=0	\N	4	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
5	5	Incidente de Seguran├ºa	Ocorreu um incidente de seguran├ºa no armaz├®m.	https://th.bing.com/th/id/OIP.iFm2DffdX5eMg2LjmcRovQHaEK?rs=1&pid=ImgDetMain	\N	5	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: persons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.persons (id, name, type, active, created_at, updated_at, created_by, updated_by) FROM stdin;
1	Pedro Cabral	SUPPLIER	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	Machado Assis	SUPPLIER	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	Clarice Lispector	SUPPLIER	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	Sebasti├úo Costa	SUPPLIER	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
5	Produtor Rural	SUPPLIER	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
6	Ecologia na Veia	SUPPLIER	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: prices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.prices (id, product_id, price, type, is_current, created_at, updated_at, created_by, updated_by) FROM stdin;
1	1	1	COST	f	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	1	1.5	COST	f	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	1	2	COST	f	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	1	3	COST	f	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
5	1	4	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
6	2	2	COST	f	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
7	2	10	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
8	3	13	COST	f	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
9	3	15	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
10	4	21	COST	f	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
11	4	20	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
12	5	18	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
13	6	14	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
14	7	11	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
15	8	7	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
16	9	9	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
17	10	8	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
18	11	12	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
19	12	3	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
20	13	4	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
21	14	5	COST	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
22	8	7	SALE	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
23	9	9	SALE	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
24	10	8	SALE	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
25	11	12	SALE	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
26	12	3	SALE	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
27	13	4	SALE	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
28	14	5	SALE	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: production_lines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.production_lines (id, description, active, created_at, updated_at, created_by, updated_by) FROM stdin;
1	Esteira 1	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	Esteira 2	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	Esteira 3	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	Linha 4	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
5	Linha 5	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: production_order_steps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.production_order_steps (id, description, active, created_at, updated_at, created_by, updated_by) FROM stdin;
1	Corte	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	Descascamento	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	Sele├º├úo	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	Desfolhamento	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
5	Embalagem	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
6	Sele├º├úo de Qualidade	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
7	Higieniza├º├úo	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
8	Lavagem	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
9	Sele├º├úo de Tamanho	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
10	Sele├º├úo de Cor	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
11	Sele├º├úo de Maturidade	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
12	Sele├º├úo de Peso	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
13	Sele├º├úo de Textura	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
14	Sele├º├úo de Sabor	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
15	Sele├º├úo de Aroma	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: production_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.production_orders (id, number, description, production_date, created_at, updated_at, created_by, updated_by, "Production_Status") FROM stdin;
1	1	Production A	2024-12-31 23:59:59	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N	CREATED
2	2	Production B	2024-12-15 23:59:59	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N	SCHEDULED
3	3	Production C	2024-12-31 23:59:59	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N	IN_PROGRESS
4	4	Production D	2024-12-15 23:59:59	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N	SCHEDULED
5	5	Production E	2024-12-31 23:59:59	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N	OPEN
\.


--
-- Data for Name: production_orders_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.production_orders_items (id, production_order_id, sequence, final_product_id, prodution_quantity_estimated, production_quantity_real, production_quantity_loss, lote, lote_expiration, created_at, updated_at, created_by, updated_by) FROM stdin;
1	1	1	10	1000	950	50	LoteTY123	2024-12-31 23:59:59	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	2	2	11	2000	1900	100	LoteER56	2024-12-15 23:59:59	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	3	3	12	1000	950	50	LoteOI123	2024-12-31 23:59:59	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	4	4	13	2000	1900	100	LoteB456	2024-12-15 23:59:59	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
5	5	5	14	2000	1900	100	LoteABC123	2024-12-15 23:59:59	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: production_steps_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.production_steps_progress (id, production_id, step_id, sequence, raw_product_id, start_time, end_time, total_time, initial_quantity, final_quantity, quantity_loss, machine, line_id, image_link, photo, observation, operator_id, ocurrences, created_at, updated_at, created_by, updated_by) FROM stdin;
1	1	1	1	10	2024-09-01 08:00:00	2024-09-01 10:00:00	120	1000	950	50	Machine A	1	\N	\N	No issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	1	2	2	10	2024-09-02 08:00:00	2024-09-02 12:00:00	240	2000	1900	100	Machine B	1	\N	\N	Minor issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	1	3	3	10	2024-09-01 08:00:00	2024-09-01 10:00:00	120	1000	950	50	Machine C	1	\N	\N	No issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	1	4	4	10	2024-09-02 08:00:00	2024-09-02 12:00:00	240	2000	1900	100	Machine D	1	\N	\N	Minor issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
5	1	5	5	10	2024-09-01 08:00:00	2024-09-01 10:00:00	120	1000	950	50	Machine E	1	\N	\N	No issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
6	1	6	6	10	2024-09-02 08:00:00	2024-09-02 12:00:00	240	2000	1900	100	Machine F	1	\N	\N	Minor issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
7	1	1	1	10	2024-09-01 08:00:00	2024-09-01 10:00:00	120	1000	950	50	Machine A	1	\N	\N	No issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
8	1	2	2	10	2024-09-02 08:00:00	2024-09-02 12:00:00	240	2000	1900	100	Machine B	1	\N	\N	Minor issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
9	1	3	3	10	2024-09-01 08:00:00	2024-09-01 10:00:00	120	1000	950	50	Machine C	1	\N	\N	No issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
10	1	4	4	10	2024-09-02 08:00:00	2024-09-02 12:00:00	240	2000	1900	100	Machine D	1	\N	\N	Minor issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
11	1	5	5	10	2024-09-01 08:00:00	2024-09-01 10:00:00	120	1000	950	50	Machine E	1	\N	\N	No issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
12	1	6	6	10	2024-09-02 08:00:00	2024-09-02 12:00:00	240	2000	1900	100	Machine F	1	\N	\N	Minor issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
13	2	1	1	11	2024-09-01 08:00:00	2024-09-01 10:00:00	120	1000	950	50	Machine A	2	\N	\N	No issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
14	2	2	2	11	2024-09-02 08:00:00	2024-09-02 12:00:00	240	2000	1900	100	Machine B	2	\N	\N	Minor issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
15	2	3	3	11	2024-09-01 08:00:00	2024-09-01 10:00:00	120	1000	950	50	Machine C	2	\N	\N	No issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
16	2	4	4	11	2024-09-02 08:00:00	2024-09-02 12:00:00	240	2000	1900	100	Machine D	2	\N	\N	Minor issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
17	2	5	5	11	2024-09-01 08:00:00	2024-09-01 10:00:00	120	1000	950	50	Machine E	2	\N	\N	No issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
18	2	6	6	11	2024-09-02 08:00:00	2024-09-02 12:00:00	240	2000	1900	100	Machine F	2	\N	\N	Minor issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
19	3	1	1	12	2024-09-01 08:00:00	2024-09-01 10:00:00	120	1000	950	50	Machine A	2	\N	\N	No issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
20	3	2	2	12	2024-09-02 08:00:00	2024-09-02 12:00:00	240	2000	1900	100	Machine B	2	\N	\N	Minor issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
21	3	3	3	12	2024-09-01 08:00:00	2024-09-01 10:00:00	120	1000	950	50	Machine C	2	\N	\N	No issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
22	3	4	4	12	2024-09-02 08:00:00	2024-09-02 12:00:00	240	2000	1900	100	Machine D	2	\N	\N	Minor issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
23	3	5	5	12	2024-09-01 08:00:00	2024-09-01 10:00:00	120	1000	950	50	Machine E	2	\N	\N	No issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
24	3	6	6	12	2024-09-02 08:00:00	2024-09-02 12:00:00	240	2000	1900	100	Machine F	2	\N	\N	Minor issues	\N	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, description, code, sku, origin, unit_measure, category_id, group_id, supplier_id, nutritional_info, image_link, photo, active, created_at, updated_at, created_by, updated_by) FROM stdin;
1	batata branca	CODE001	SKU001	RAW_MATERIAL	KG	1	1	1	{"fat": {"total": 8, "trans": 0, "saturated": 3}, "sodium": 150, "protein": 10, "calories": 200, "vitamins": {"iron": 10, "calcium": 30, "vitamin_a": 20, "vitamin_c": 15}, "carbohydrates": {"fiber": 5, "total": 30, "sugars": 12}}	https://images.app.goo.gl/DDnkSGBFhtAJ6LAF7	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	cenoura	CODE002	SKU015	RAW_MATERIAL	KG	1	1	1	{"fat": {"total": 8, "trans": 0, "saturated": 3}, "sodium": 150, "protein": 10, "calories": 200, "vitamins": {"iron": 10, "calcium": 30, "vitamin_a": 20, "vitamin_c": 15}, "carbohydrates": {"fiber": 5, "total": 30, "sugars": 12}}	https://images.app.goo.gl/xyXxbBfENNM2R1fM9	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	aipim	CODE003	SKU002	RAW_MATERIAL	KG	1	1	1	{"fat": {"total": 8, "trans": 0, "saturated": 3}, "sodium": 150, "protein": 10, "calories": 200, "vitamins": {"iron": 10, "calcium": 30, "vitamin_a": 20, "vitamin_c": 15}, "carbohydrates": {"fiber": 5, "total": 30, "sugars": 12}}	https://th.bing.com/th/id/OIP.iFm2DffdX5eMg2LjmcRovQHaEK?rs=1&pid=ImgDetMain	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	mirtilo	CODE004	SKU003	RAW_MATERIAL	KG	1	1	1	{"fat": {"total": 8, "trans": 0, "saturated": 3}, "sodium": 150, "protein": 10, "calories": 200, "vitamins": {"iron": 10, "calcium": 30, "vitamin_a": 20, "vitamin_c": 15}, "carbohydrates": {"fiber": 5, "total": 30, "sugars": 12}}	https://th.bing.com/th/id/R.185f438e71c11e0506d11e41566f22e4?rik=lHVWNPA5HwV8Sg&pid=ImgRaw&r=0	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
5	laranja	CODE005	SKU004	RAW_MATERIAL	KG	1	1	1	{"fat": {"total": 8, "trans": 0, "saturated": 3}, "sodium": 150, "protein": 10, "calories": 200, "vitamins": {"iron": 10, "calcium": 30, "vitamin_a": 20, "vitamin_c": 15}, "carbohydrates": {"fiber": 5, "total": 30, "sugars": 12}}	https://th.bing.com/th/id/OIP.0bFqMiCtpbitfhNSc3fd9gHaFj?rs=1&pid=ImgDetMain	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
6	couve	CODE006	SKU005	RAW_MATERIAL	KG	1	1	1	{"fat": {"total": 8, "trans": 0, "saturated": 3}, "sodium": 150, "protein": 10, "calories": 200, "vitamins": {"iron": 10, "calcium": 30, "vitamin_a": 20, "vitamin_c": 15}, "carbohydrates": {"fiber": 5, "total": 30, "sugars": 12}}	https://images.app.goo.gl/xyXxbBfENNM2R1fM9	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
7	uva	CODE007	SKU006	RAW_MATERIAL	KG	1	1	1	\N	https://images.app.goo.gl/xyXxbBfENNM2R1fM9	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
8	Batata cubinhos	CODE016	SKU007	MADE	KG	2	2	2	\N	https://images.app.goo.gl/xyXxbBfENNM2R1fM9	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
9	cenoura cubinhos	CODE008	SKU008	MADE	KG	2	2	2	\N	https://images.app.goo.gl/xyXxbBfENNM2R1fM9	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
10	Mandioca descascada	CODE009	SKU009	MADE	KG	2	2	2	\N	https://images.app.goo.gl/xyXxbBfENNM2R1fM9	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
11	mirtilos selecionados	CODE010	SKU010	MADE	KG	2	2	2	\N	https://images.app.goo.gl/xyXxbBfENNM2R1fM9	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
12	laranja descascada	CODE011	SKU011	MADE	KG	2	2	2	\N	https://images.app.goo.gl/xyXxbBfENNM2R1fM9	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
13	mix de verduras	CODE012	SKU012	MADE	KG	2	2	2	\N	https://images.app.goo.gl/xyXxbBfENNM2R1fM9	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
14	suco natural de uva	CODE013	SKU013	MADE	KG	2	2	2	\N	https://images.app.goo.gl/xyXxbBfENNM2R1fM9	\N	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: stock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stock (id, document_number, document_date, stock_moviment, is_balance, document_type, created_at, updated_at, created_by, updated_by) FROM stdin;
4	NFE124	2024-09-02 10:00:00	OUTPUT	f	documento saida	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
5	1001	2024-09-02 10:00:00	RESERVED	f	reserva producao	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
6	3005	2024-10-16 17:36:44.801	INPUT	f	\N	2024-10-16 17:36:44.801	2024-10-16 17:36:44.801	\N	\N
7	3006	2024-10-16 17:36:56.511	INPUT	f	\N	2024-10-16 17:36:56.511	2024-10-16 17:36:56.511	\N	\N
10	3007	2024-10-16 18:02:29.97	INPUT	f	\N	2024-10-16 18:02:29.97	2024-10-16 18:02:29.97	\N	\N
21	3009	2024-09-15 10:30:00	INPUT	f	\N	2024-10-16 19:47:07.66	2024-10-16 19:47:07.66	\N	\N
22	3010	2024-09-15 10:30:00	INPUT	f	\N	2024-10-16 19:51:17.011	2024-10-16 19:51:17.011	\N	\N
23	3011	2024-09-15 10:30:00	INPUT	f	\N	2024-10-16 20:02:46.683	2024-10-16 20:02:46.683	\N	\N
24	3012	2024-09-15 10:30:00	INPUT	f	\N	2024-10-16 20:02:55.239	2024-10-16 20:02:55.239	\N	\N
25	3013	2024-09-15 10:30:00	INPUT	f	\N	2024-10-16 20:03:22.365	2024-10-16 20:03:22.365	\N	\N
29	3017	2024-09-15 10:30:00	INPUT	f	\N	2024-10-16 20:41:13.972	2024-10-16 20:41:13.972	\N	\N
30	3018	2024-09-15 10:30:00	INPUT	f	\N	2024-10-17 03:36:34.064	2024-10-17 03:36:34.064	\N	\N
31	3019	2024-09-15 10:30:00	INPUT	f	\N	2024-10-17 03:37:05.849	2024-10-17 03:37:05.849	\N	\N
26	3014	2024-09-15 10:30:00	INPUT	f	\N	2024-10-16 20:39:41.08	2024-10-16 20:39:41.08	\N	\N
27	3015	2024-09-15 10:30:00	INPUT	f	\N	2024-10-16 20:40:13.041	2024-10-16 20:40:13.041	\N	\N
28	3016	2024-09-15 10:30:00	INPUT	f	\N	2024-10-16 20:40:35.554	2024-10-16 20:40:35.554	\N	\N
3	DOC123	2024-09-01 09:00:00	INPUT	f	documento entrada	2024-10-16 14:33:03.216807	2024-10-17 15:18:05.76	\N	\N
\.


--
-- Data for Name: stock_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stock_items (id, stock_id, sequence, product_id, quantity, unit_price, total_price, lote, expiration, image_link, photo, supplier, costumer, stock_location_id, observation, created_at, updated_at, created_by, updated_by) FROM stdin;
10	3	2	2	20	10	1000	LoteC123	2024-12-31 23:59:59	\N	\N	\N	\N	1	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
11	3	3	3	20	20	4000	LoteD456	2024-12-15 23:59:59	\N	\N	\N	\N	3	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
12	3	4	4	10	10	1000	LoteE123	2024-12-31 23:59:59	\N	\N	\N	\N	1	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
13	3	5	5	10	10	1000	LoteF123	2024-12-31 23:59:59	\N	\N	\N	\N	1	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
14	3	6	6	20	20	4000	LoteG456	2024-12-15 23:59:59	\N	\N	\N	\N	3	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
16	3	2	8	10	10	1000	LoteC123	2024-12-31 23:59:59	\N	\N	\N	\N	1	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
23	4	1	9	10	10	1000	LoteKK123	2024-12-31 23:59:59	\N	\N	\N	\N	1	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
24	4	2	10	10	10	1000	LoteTY123	2024-12-31 23:59:59	\N	\N	\N	\N	1	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
25	4	3	11	20	20	4000	LoteER56	2024-12-15 23:59:59	\N	\N	\N	\N	3	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
26	4	4	12	10	10	1000	LoteOI123	2024-12-31 23:59:59	\N	\N	\N	\N	1	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
27	4	5	13	10	10	1000	LoteABC123	2024-12-31 23:59:59	\N	\N	\N	\N	1	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
28	4	6	14	20	20	4000	LoteWW456	2024-12-15 23:59:59	\N	\N	\N	\N	3	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
29	5	5	13	10	10	1000	LOTE-TESTE	2024-12-31 23:59:59	\N	\N	\N	\N	1	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
30	5	6	14	20	20	4000	LOTE-TESTE	2024-12-15 23:59:59	\N	\N	\N	\N	3	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
9	3	1	1	20	10	1000	LOTE-TESTE	2024-12-31 23:59:59	\N	\N	\N	\N	1	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
37	21	1	1	15	10.5	157.5	LOTE-TESTE	\N	\N	\N	\N	\N	1	\N	2024-10-16 19:47:07.678	2024-10-16 19:47:07.678	\N	\N
38	21	2	2	15	10.5	157.5	LOTE-TESTE	\N	\N	\N	\N	\N	1	\N	2024-10-16 19:47:08.095	2024-10-16 19:47:08.095	\N	\N
39	22	1	1	100	10.5	1050	LOTE-TESTE	\N	\N	\N	\N	\N	1	\N	2024-10-16 19:51:17.024	2024-10-16 19:51:17.024	\N	\N
40	22	2	2	100	10.5	1050	LOTE-TESTE	\N	\N	\N	\N	\N	1	\N	2024-10-16 19:51:17.037	2024-10-16 19:51:17.037	\N	\N
41	23	1	1	5	10.5	52.5	LOTE-TESTE	\N	\N	\N	\N	\N	1	\N	2024-10-16 20:02:46.765	2024-10-16 20:02:46.765	\N	\N
42	23	2	2	5	10.5	52.5	LOTE-TESTE	\N	\N	\N	\N	\N	1	\N	2024-10-16 20:02:46.818	2024-10-16 20:02:46.818	\N	\N
43	24	1	1	5	10.5	52.5	LOTE-TESTE	\N	\N	\N	\N	\N	1	\N	2024-10-16 20:02:55.246	2024-10-16 20:02:55.246	\N	\N
44	24	2	2	5	10.5	52.5	LOTE-TESTE	\N	\N	\N	\N	\N	1	\N	2024-10-16 20:02:55.265	2024-10-16 20:02:55.265	\N	\N
45	25	1	1	50	10.5	525	LOTE-TESTE	\N	\N	\N	\N	\N	1	\N	2024-10-16 20:03:22.378	2024-10-16 20:03:22.378	\N	\N
46	25	2	2	50	10.5	525	LOTE-TESTE	\N	\N	\N	\N	\N	1	\N	2024-10-16 20:03:22.432	2024-10-16 20:03:22.432	\N	\N
47	26	1	1	5	10.5	52.5	LOTE-TESTE	2025-01-15 00:00:00	http://example.com/image.jpg	\N	1	\N	1	\N	2024-10-16 20:39:41.681	2024-10-16 20:39:41.681	\N	\N
48	27	1	1	5	10.5	52.5	LOTE-TESTE	2025-01-15 00:00:00	http://example.com/image.jpg	\N	1	\N	1	\N	2024-10-16 20:40:13.058	2024-10-16 20:40:13.058	\N	\N
49	28	1	1	200	10.5	2100	LOTE-TESTE	2025-01-15 00:00:00	http://example.com/image.jpg	\N	1	\N	1	\N	2024-10-16 20:40:35.575	2024-10-16 20:40:35.575	\N	\N
50	29	1	1	200	10.5	2100	LOTE-TESTE	2025-01-15 00:00:00	http://example.com/image.jpg	\N	1	\N	1	\N	2024-10-16 20:41:13.983	2024-10-16 20:41:13.983	\N	\N
51	30	1	2	200	10.5	2100	LOTE-TESTE	2025-01-15 00:00:00	http://example.com/image.jpg	\N	1	\N	1	\N	2024-10-17 03:36:34.228	2024-10-17 03:36:34.228	\N	\N
52	31	1	2	200	10.5	2100	LOTE-TESTE	2025-01-15 00:00:00	http://example.com/image.jpg	\N	1	\N	1	\N	2024-10-17 03:37:05.863	2024-10-17 03:37:05.863	\N	\N
15	3	1	7	10	20	1000	LoteA123	2024-12-31 23:59:59	http://localhost/home	\N	3	3	3	\N	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: stock_location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stock_location (id, description, active, created_at, updated_at, created_by, updated_by) FROM stdin;
1	C├ómara Fria A	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	Dep├│sito	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	P├ítio	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	C├ómara Fria B	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role, username, first_name, last_name, gender, active, created_at, updated_at, created_by, updated_by) FROM stdin;
1	cassio@gmail.com	$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC	ROOT	Cassio	Cassio	Santos	MALE	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
2	fulano@gmail.com	$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC	DEMO	Roberto	Roberto	Da Silva	MALE	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
3	ana@gmail.com	$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC	DEMO	Ana	Ana	Oliveira	FEMALE	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
4	maria@gmail.com	$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC	DEMO	Maria	Maria	Silva	FEMALE	t	2024-10-16 14:33:03.216807	2024-10-16 14:33:03.216807	\N	\N
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 5, true);


--
-- Name: composition_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.composition_items_id_seq', 7, true);


--
-- Name: compositions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compositions_id_seq', 7, true);


--
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.groups_id_seq', 10, true);


--
-- Name: ocurrences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ocurrences_id_seq', 12, true);


--
-- Name: ocurrences_of_production_stages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ocurrences_of_production_stages_id_seq', 5, true);


--
-- Name: persons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.persons_id_seq', 6, true);


--
-- Name: prices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.prices_id_seq', 28, true);


--
-- Name: production_lines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.production_lines_id_seq', 5, true);


--
-- Name: production_order_steps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.production_order_steps_id_seq', 15, true);


--
-- Name: production_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.production_orders_id_seq', 5, true);


--
-- Name: production_orders_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.production_orders_items_id_seq', 5, true);


--
-- Name: production_steps_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.production_steps_progress_id_seq', 24, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 14, true);


--
-- Name: stock_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stock_id_seq', 31, true);


--
-- Name: stock_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stock_items_id_seq', 52, true);


--
-- Name: stock_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stock_location_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: composition_items composition_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.composition_items
    ADD CONSTRAINT composition_items_pkey PRIMARY KEY (id);


--
-- Name: compositions compositions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compositions
    ADD CONSTRAINT compositions_pkey PRIMARY KEY (id);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: ocurrences_of_production_stages ocurrences_of_production_stages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ocurrences_of_production_stages
    ADD CONSTRAINT ocurrences_of_production_stages_pkey PRIMARY KEY (id);


--
-- Name: ocurrences ocurrences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ocurrences
    ADD CONSTRAINT ocurrences_pkey PRIMARY KEY (id);


--
-- Name: persons persons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persons
    ADD CONSTRAINT persons_pkey PRIMARY KEY (id);


--
-- Name: prices prices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT prices_pkey PRIMARY KEY (id);


--
-- Name: production_lines production_lines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_lines
    ADD CONSTRAINT production_lines_pkey PRIMARY KEY (id);


--
-- Name: production_order_steps production_order_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_order_steps
    ADD CONSTRAINT production_order_steps_pkey PRIMARY KEY (id);


--
-- Name: production_orders_items production_orders_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_orders_items
    ADD CONSTRAINT production_orders_items_pkey PRIMARY KEY (id);


--
-- Name: production_orders production_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_orders
    ADD CONSTRAINT production_orders_pkey PRIMARY KEY (id);


--
-- Name: production_steps_progress production_steps_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_steps_progress
    ADD CONSTRAINT production_steps_progress_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: stock_items stock_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_items
    ADD CONSTRAINT stock_items_pkey PRIMARY KEY (id);


--
-- Name: stock_location stock_location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_location
    ADD CONSTRAINT stock_location_pkey PRIMARY KEY (id);


--
-- Name: stock stock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: categories_description_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX categories_description_key ON public.categories USING btree (description);


--
-- Name: production_orders_number_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX production_orders_number_key ON public.production_orders USING btree (number);


--
-- Name: products_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX products_code_key ON public.products USING btree (code);


--
-- Name: products_sku_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX products_sku_key ON public.products USING btree (sku);


--
-- Name: stock_document_number_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX stock_document_number_key ON public.stock USING btree (document_number);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- Name: composition_items composition_items_composition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.composition_items
    ADD CONSTRAINT composition_items_composition_id_fkey FOREIGN KEY (composition_id) REFERENCES public.compositions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: composition_items composition_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.composition_items
    ADD CONSTRAINT composition_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: compositions compositions_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compositions
    ADD CONSTRAINT compositions_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: production_orders_items final_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_orders_items
    ADD CONSTRAINT final_product_fkey FOREIGN KEY (final_product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: groups groups_father_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_father_id_fkey FOREIGN KEY (father_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ocurrences_of_production_stages ocurrences_of_production_stages_ocurrence_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ocurrences_of_production_stages
    ADD CONSTRAINT ocurrences_of_production_stages_ocurrence_id_fkey FOREIGN KEY (ocurrence_id) REFERENCES public.ocurrences(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ocurrences_of_production_stages ocurrences_of_production_stages_stage_ocurred_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ocurrences_of_production_stages
    ADD CONSTRAINT ocurrences_of_production_stages_stage_ocurred_id_fkey FOREIGN KEY (stage_ocurred_id) REFERENCES public.production_steps_progress(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: prices prices_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT prices_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: production_orders_items production_orders_items_production_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_orders_items
    ADD CONSTRAINT production_orders_items_production_order_id_fkey FOREIGN KEY (production_order_id) REFERENCES public.production_orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: production_steps_progress production_steps_progress_line_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_steps_progress
    ADD CONSTRAINT production_steps_progress_line_id_fkey FOREIGN KEY (line_id) REFERENCES public.production_lines(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: production_steps_progress production_steps_progress_operator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_steps_progress
    ADD CONSTRAINT production_steps_progress_operator_id_fkey FOREIGN KEY (operator_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: production_steps_progress production_steps_progress_production_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_steps_progress
    ADD CONSTRAINT production_steps_progress_production_id_fkey FOREIGN KEY (production_id) REFERENCES public.production_orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: production_steps_progress production_steps_progress_raw_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_steps_progress
    ADD CONSTRAINT production_steps_progress_raw_product_id_fkey FOREIGN KEY (raw_product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: production_steps_progress production_steps_progress_step_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.production_steps_progress
    ADD CONSTRAINT production_steps_progress_step_id_fkey FOREIGN KEY (step_id) REFERENCES public.production_order_steps(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: products products_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: products products_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.persons(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: stock_items stock_items_costumer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_items
    ADD CONSTRAINT stock_items_costumer_fkey FOREIGN KEY (costumer) REFERENCES public.persons(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: stock_items stock_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_items
    ADD CONSTRAINT stock_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: stock_items stock_items_stock_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_items
    ADD CONSTRAINT stock_items_stock_id_fkey FOREIGN KEY (stock_id) REFERENCES public.stock(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: stock_items stock_items_stock_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_items
    ADD CONSTRAINT stock_items_stock_location_id_fkey FOREIGN KEY (stock_location_id) REFERENCES public.stock_location(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: stock_items stock_items_supplier_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_items
    ADD CONSTRAINT stock_items_supplier_fkey FOREIGN KEY (supplier) REFERENCES public.persons(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

