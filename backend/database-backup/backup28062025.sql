--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3
-- Dumped by pg_dump version 17.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: BidStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."BidStatus" AS ENUM (
    'PENDING',
    'ACCEPTED',
    'REJECTED'
);


ALTER TYPE public."BidStatus" OWNER TO postgres;

--
-- Name: FileType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."FileType" AS ENUM (
    'BEFORE',
    'AFTER'
);


ALTER TYPE public."FileType" OWNER TO postgres;

--
-- Name: Mode; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Mode" AS ENUM (
    'PAID',
    'ADMIN',
    'TRIAL',
    'COUPON'
);


ALTER TYPE public."Mode" OWNER TO postgres;

--
-- Name: OtpType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."OtpType" AS ENUM (
    'REGISTRATION',
    'FORGOT_PASSWORD'
);


ALTER TYPE public."OtpType" OWNER TO postgres;

--
-- Name: ProjectStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ProjectStatus" AS ENUM (
    'IN_PROGRESS',
    'AWARDED',
    'COMPLETED',
    'VENDOR_FOUND'
);


ALTER TYPE public."ProjectStatus" OWNER TO postgres;

--
-- Name: Type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Type" AS ENUM (
    'MONTHLY',
    'YEARLY'
);


ALTER TYPE public."Type" OWNER TO postgres;

--
-- Name: Unit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Unit" AS ENUM (
    'METER',
    'FEET',
    'YARD'
);


ALTER TYPE public."Unit" OWNER TO postgres;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'USER',
    'VENDOR',
    'ADMIN'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Address" (
    id character varying(36) NOT NULL,
    line1 text NOT NULL,
    line2 text,
    "postalCode" text NOT NULL,
    "userId" character varying(36),
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    state text NOT NULL
);


ALTER TABLE public."Address" OWNER TO postgres;

--
-- Name: Bid; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Bid" (
    id character varying(36) NOT NULL,
    "projectId" character varying(36) NOT NULL,
    "vendorId" character varying(36) NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userStatus" public."BidStatus" DEFAULT 'PENDING'::public."BidStatus" NOT NULL,
    "vendorAttachmentName" text,
    "vendorAttachmentUrl" text,
    "vendorMessage" text,
    "vendorStatus" public."BidStatus" DEFAULT 'PENDING'::public."BidStatus" NOT NULL
);


ALTER TABLE public."Bid" OWNER TO postgres;

--
-- Name: Blog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Blog" (
    id character varying(36) NOT NULL,
    "authorId" character varying(36) NOT NULL,
    "imageUrl" text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    content text NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Blog" OWNER TO postgres;

--
-- Name: BusinessAddress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BusinessAddress" (
    id character varying(36) NOT NULL,
    "userId" character varying(36),
    line1 text NOT NULL,
    line2 text,
    country text NOT NULL,
    state text NOT NULL,
    city text NOT NULL,
    "postalCode" text NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."BusinessAddress" OWNER TO postgres;

--
-- Name: Coupon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Coupon" (
    id character varying(36) NOT NULL,
    code text NOT NULL,
    description text,
    "monthsFree" integer NOT NULL,
    "limit" integer,
    "isActive" boolean DEFAULT true NOT NULL,
    "expiresAt" timestamp(3) without time zone,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Coupon" OWNER TO postgres;

--
-- Name: LoginHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LoginHistory" (
    id character varying(36) NOT NULL,
    "userId" character varying(36) NOT NULL,
    status boolean DEFAULT false NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    message text
);


ALTER TABLE public."LoginHistory" OWNER TO postgres;

--
-- Name: Notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notification" (
    id character varying(36) NOT NULL,
    "userId" character varying(36) NOT NULL,
    "projectId" character varying(36),
    heading text NOT NULL,
    message text NOT NULL,
    data jsonb,
    "isRead" boolean DEFAULT false NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Notification" OWNER TO postgres;

--
-- Name: Otp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Otp" (
    id character varying(36) NOT NULL,
    type public."OtpType" NOT NULL,
    "userId" character varying(36) NOT NULL,
    "oneTimePassword" text NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Otp" OWNER TO postgres;

--
-- Name: Plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Plan" (
    id character varying(36) NOT NULL,
    name text NOT NULL,
    description text,
    amount double precision NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "priceId" text,
    "productId" text,
    "isPopular" boolean DEFAULT false NOT NULL,
    "yearlyPriceId" text,
    "yearlyProductId" text
);


ALTER TABLE public."Plan" OWNER TO postgres;

--
-- Name: Project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Project" (
    id character varying(36) NOT NULL,
    "userId" character varying(36) NOT NULL,
    "serviceId" text,
    title text NOT NULL,
    description text NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "addressId" character varying(36),
    status public."ProjectStatus" DEFAULT 'IN_PROGRESS'::public."ProjectStatus" NOT NULL,
    "budgetPreference" integer DEFAULT 5 NOT NULL,
    "preferenceMessage" text
);


ALTER TABLE public."Project" OWNER TO postgres;

--
-- Name: ProjectFile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProjectFile" (
    id character varying(36) NOT NULL,
    "projectId" character varying(36) NOT NULL,
    url text NOT NULL,
    type public."FileType" NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProjectFile" OWNER TO postgres;

--
-- Name: ProjectTag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProjectTag" (
    "projectId" character varying(36) NOT NULL,
    "tagId" character varying(36) NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProjectTag" OWNER TO postgres;

--
-- Name: ProjectUpdate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProjectUpdate" (
    id character varying(36) NOT NULL,
    "projectId" character varying(36) NOT NULL,
    "vendorId" character varying(36),
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text NOT NULL
);


ALTER TABLE public."ProjectUpdate" OWNER TO postgres;

--
-- Name: ProjectUpdateFile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProjectUpdateFile" (
    "projectUpdateId" character varying(36) NOT NULL,
    "fileUrl" text NOT NULL,
    type public."FileType" NOT NULL
);


ALTER TABLE public."ProjectUpdateFile" OWNER TO postgres;

--
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    id character varying(36) NOT NULL,
    "projectId" character varying(36) NOT NULL,
    "vendorId" character varying(36) NOT NULL,
    rating integer NOT NULL,
    comment text,
    "isPublished" boolean DEFAULT true NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- Name: SampleFile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SampleFile" (
    id character varying(36) NOT NULL,
    "projectId" character varying(36) NOT NULL,
    url text NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."SampleFile" OWNER TO postgres;

--
-- Name: Service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Service" (
    id character varying(36) NOT NULL,
    description text NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text NOT NULL,
    "iconUrl" text,
    "planId" character varying(36)
);


ALTER TABLE public."Service" OWNER TO postgres;

--
-- Name: SiteMeasurement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SiteMeasurement" (
    id character varying(36) NOT NULL,
    "projectId" character varying(36) NOT NULL,
    length numeric(10,2),
    width numeric(10,2),
    height numeric(10,2),
    area numeric(10,2),
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    unit public."Unit" DEFAULT 'METER'::public."Unit" NOT NULL,
    description text
);


ALTER TABLE public."SiteMeasurement" OWNER TO postgres;

--
-- Name: Tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tag" (
    id character varying(36) NOT NULL,
    name text NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "serviceId" character varying(36) NOT NULL
);


ALTER TABLE public."Tag" OWNER TO postgres;

--
-- Name: Testimonial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Testimonial" (
    id character varying(36) NOT NULL,
    "userId" character varying(36) NOT NULL,
    rating integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Testimonial" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id character varying(36) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "isEmailVerified" boolean DEFAULT false NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    "sameAsAddress" boolean DEFAULT false NOT NULL,
    "serviceDistance" integer DEFAULT 100 NOT NULL,
    "isPhoneVerified" boolean DEFAULT false NOT NULL,
    phone text,
    "budgetPreference" integer DEFAULT 5 NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: UserCoupon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserCoupon" (
    id character varying(36) NOT NULL,
    "couponId" character varying(36) NOT NULL,
    "userId" character varying(36),
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."UserCoupon" OWNER TO postgres;

--
-- Name: UserPlan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserPlan" (
    id character varying(36) NOT NULL,
    "userId" character varying(36),
    "couponId" character varying(36),
    "paymentId" text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    type public."Type" DEFAULT 'MONTHLY'::public."Type" NOT NULL,
    mode public."Mode" DEFAULT 'PAID'::public."Mode" NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "planId" character varying(36),
    amount double precision NOT NULL
);


ALTER TABLE public."UserPlan" OWNER TO postgres;

--
-- Name: UserProfile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserProfile" (
    id character varying(36) NOT NULL,
    "userId" character varying(36) NOT NULL,
    name text NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    image text,
    license text
);


ALTER TABLE public."UserProfile" OWNER TO postgres;

--
-- Name: VendorService; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VendorService" (
    "userId" character varying(36) NOT NULL,
    "serviceId" character varying(36) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."VendorService" OWNER TO postgres;

--
-- Name: VendorTag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VendorTag" (
    "userId" character varying(36) NOT NULL,
    "tagId" character varying(36) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."VendorTag" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Address" (id, line1, line2, "postalCode", "userId", "updatedAt", "createdAt", city, country, state) FROM stdin;
8e3e2f04-988f-40d9-b14b-91aa5de79a20	A-80	Om Vihar	48103	\N	2025-06-12 01:10:53.455+05:30	2025-06-12 01:10:27.988+05:30	Ann Arbor	United States	Michigan
ea239e11-d422-4be0-94a8-8535b5ec3ed1	A-80	Om Vihar	48088	eec01203-9c0f-4dad-a1c9-cab74a6aa2a9	2025-06-12 01:10:53.455+05:30	2025-06-12 01:10:53.455+05:30	Warren	United States	Michigan
6d3a4bfd-e6f1-4b48-9aa8-aea97007fb76	A-80	Om Vihar	110059	\N	2025-03-09 17:09:26.39+05:30	2025-03-09 17:09:26.39+05:30	West Delhi	India	Delhi
81f913b9-fed8-43ad-8e7d-784947890e2d	A-80	Om Vihar	110059	\N	2025-03-09 19:14:51.964+05:30	2025-03-09 19:14:51.964+05:30	West Delhi	India	Delhi
df392cad-c6ec-4ed5-9267-d0de5294ede0	A-80	Om Vihar	110059	\N	2025-03-09 19:14:54.282+05:30	2025-03-09 19:14:54.282+05:30	West Delhi	India	Delhi
2ca07b9c-e5ca-48de-868f-1cb7b67b37de	A-80	Om Vihar	110059	\N	2025-03-09 19:14:54.73+05:30	2025-03-09 19:14:54.73+05:30	West Delhi	India	Delhi
532a0a8e-5c00-4961-bef4-513adced333d	A-80	Om Vihar phase 5	110059	\N	2025-03-16 16:10:59.754+05:30	2025-03-16 16:10:59.754+05:30	Uttam Nagar	India	Delhi
a8e7cbcc-30a9-40a5-9120-4b819153eb15	A-80	Om Vihar	110059	\N	2025-03-16 20:43:08.713+05:30	2025-03-16 20:43:08.713+05:30	West Delhi	India	Delhi
0bf46549-30c4-4f09-8e9f-02ce5497d190	A-80	Om Vihar phase 5	110059	\N	2025-03-29 13:15:35.534+05:30	2025-03-29 13:15:35.534+05:30	Uttam Nagar	India	Delhi
ddcae458-eb67-48ad-916a-98d654d5cd67	1234 Maple Street		48204	\N	2025-06-12 01:29:51.812+05:30	2025-06-12 01:28:27.276+05:30	Detroit	USA	Michigan
b25537dc-df2b-4b35-b607-1d0323947832	1234 Maple Street		48204	\N	2025-06-12 01:31:45.378+05:30	2025-06-12 01:29:51.812+05:30	Detroit	USA	Michigan
200b62ed-ced3-4257-8602-d2fe63aef3c9	A-80	Om Vihar	48103	\N	2025-06-12 01:42:32.451+05:30	2025-06-12 01:41:42.438+05:30	Ann Arbor	United States	Michigan
be538f67-3cdd-4292-8eb9-5e8ed2f9113d	1234 Maple Street		48204	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	2025-05-26 01:38:18.333+05:30	2025-05-25 22:17:01.76+05:30	Detroit	United States	Michigan
52b54af3-991f-45a1-961b-c0de54a5fbb5	1234 Maple Street		48204	\N	2025-06-04 22:22:47.538+05:30	2025-06-04 22:22:36.508+05:30	Detroit	USA	Michigan
829ff6bd-a035-4e75-8218-476ff9d5aed3	1234 Maple Street		48204	012a7d28-f472-43f6-a21b-a91c44ad6667	2025-06-04 22:23:53.471+05:30	2025-06-04 22:23:53.471+05:30	Detroit	USA	Michigan
c4c71ae5-d153-43f3-a9f9-765c408f9e3a	1234 Maple Street		48204	d44e1c1f-77b7-44dd-bdf1-e2a5cea006dd	2025-06-04 22:26:09.477+05:30	2025-06-04 22:26:09.477+05:30	Detroit	USA	Michigan
14652512-029a-42d8-b823-6d11886012ae	A-80	Om Vihar	48104	facc1e9e-db53-4fec-9d5a-aedafb1e863b	2025-06-04 23:13:20.619+05:30	2025-06-04 23:13:20.619+05:30	Ann Arbor	United States	Michigan
4b8fa740-d1e3-471e-afe1-0a60006a4f4e	A-80	Om Vihar	48310	11ecf0a7-2d61-4296-924d-7a9863944696	2025-06-04 23:35:08.794+05:30	2025-06-04 23:35:08.794+05:30	Sterling Heights	United States	Michigan
346baa4a-65d1-4e1b-8a3c-58146811a66b	A-80	Om Vihar	48103	\N	2025-06-12 01:10:27.988+05:30	2025-06-12 01:08:31.206+05:30	Ann Arbor	United States	Michigan
cbdd1bea-d14d-450c-8357-180168548ca4	A-80	Om Vihar	48103	571b4a2b-ff4f-4931-bb82-910e72b5d20d	2025-06-12 01:42:32.451+05:30	2025-06-12 01:42:32.451+05:30	Ann Arbor	United States	Michigan
1731e89a-6d66-4b25-a561-42c643dc09e8	1234 Maple Street		48204	\N	2025-06-14 21:15:15.055+05:30	2025-06-12 01:31:45.378+05:30	Detroit	USA	Michigan
c2cee8b7-43a2-4214-ac67-05c9677cba00	1234 Maple Street		48204	\N	2025-06-14 21:15:21.923+05:30	2025-06-14 21:15:15.055+05:30	Detroit	USA	Michigan
70e5e453-96f1-4413-8cf0-9b20b43d9eda	1234 Maple Street		48204	\N	2025-06-14 21:15:23.209+05:30	2025-06-14 21:15:21.923+05:30	Detroit	USA	Michigan
3fe7dec1-0ff7-4009-ad5c-9ff58704b531	1234 Maple Street		48204	\N	2025-06-14 21:15:24.056+05:30	2025-06-14 21:15:23.209+05:30	Detroit	USA	Michigan
8ccfc2c4-d30c-48ae-894a-5e11267f6555	1234 Maple Street		48204	\N	2025-06-14 21:15:24.866+05:30	2025-06-14 21:15:24.056+05:30	Detroit	USA	Michigan
e2bd3b26-aef5-4e2c-a740-28d0c335c34c	1234 Maple Street		48204	714bc6d9-e1b4-4500-a04e-b2112842236e	2025-06-14 21:15:24.866+05:30	2025-06-14 21:15:24.866+05:30	Detroit	USA	Michigan
6cef5cd4-603b-4a7d-965f-2f7d8d7c7efb	A-80	Om Vihar phase 5	48089	\N	2025-06-21 17:03:57.673+05:30	2025-06-21 16:59:38.114+05:30	Warren	United States	Michigan
b0a3c04f-88c7-43b0-8ac4-c83090615725	A-80	Om Vihar phase 5	48091	88d44268-8f35-4885-9537-4c6b5608fe15	2025-06-21 17:03:57.673+05:30	2025-06-21 17:03:57.673+05:30	Warren	United States	Michigan
\.


--
-- Data for Name: Bid; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Bid" (id, "projectId", "vendorId", "updatedAt", "createdAt", "userStatus", "vendorAttachmentName", "vendorAttachmentUrl", "vendorMessage", "vendorStatus") FROM stdin;
d9be81ba-bf8e-4a2e-9420-a6ce98e955c0	e8a099de-0ccd-4e58-b784-8a5b214b8e06	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	2025-04-05 02:50:40.474+05:30	2025-04-05 02:50:40.474+05:30	PENDING	\N	\N	\N	PENDING
6931e042-c6f2-48f5-8317-a4e964500e4d	9f50733f-b418-4215-8fbd-ea1efa8a83bc	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	2025-04-05 02:50:40.486+05:30	2025-04-05 02:50:40.486+05:30	PENDING	\N	\N	\N	PENDING
3b64a60f-56f9-4ff7-8314-95ae1c17efe2	22e3b58d-fc6f-4df6-b562-3d6b681a6326	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	2025-05-03 18:14:07.626+05:30	2025-03-09 19:16:54.975+05:30	PENDING	\N	\N	\N	REJECTED
d10b57c5-ab00-48e1-8f09-4659c6509f5e	0d6357fa-bc9c-4b57-a7a4-0b3b4ec5b652	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	2025-05-04 08:36:25.682+05:30	2025-05-03 15:59:24.39+05:30	REJECTED	My Proposal.docx	projects/9efcd21a-cf7c-4dd6-80d1-797234cd62c8.docx	I am accepting this project and happy to start working on this.	ACCEPTED
5f8baa34-7380-4dba-80f1-347ab6cdcf08	72afefed-b99b-4b2e-88fc-aaee880fc3fb	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	2025-05-04 08:37:28.014+05:30	2025-03-09 19:17:25.32+05:30	REJECTED	Project Acceptance document.docx	projects/a3ccf406-8f51-4771-90e3-5a8ee5fd3a30.docx	I like the concept of this project and want to contribute to this beautiful idea.	ACCEPTED
2c839fa8-88d0-460e-ab0a-675d18c88c42	58144c41-81d0-403a-9817-bb8d7ab5c2e3	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	2025-05-04 08:42:26.748+05:30	2025-03-09 19:17:09.584+05:30	ACCEPTED	My Proposal.docx	projects/33882a93-cb0c-4622-8d9c-39463d7a741d.docx	I'm ready to work on this proeject	ACCEPTED
d0eb7fb8-ba9f-4cc2-ae74-3f41e36fd6e9	2581861a-6f1f-4626-bcaf-43777bc260f5	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	2025-05-11 18:14:21.759+05:30	2025-04-05 02:50:40.484+05:30	PENDING	My Proposal.docx	projects/ca954b2b-b2cd-4cc2-88d0-5e5d1f3d98f3.docx	I want to work on this project	ACCEPTED
\.


--
-- Data for Name: Blog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Blog" (id, "authorId", "imageUrl", title, description, content, "updatedAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: BusinessAddress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BusinessAddress" (id, "userId", line1, line2, country, state, city, "postalCode", "updatedAt", "createdAt") FROM stdin;
19cc66ea-9f2d-4b16-b59f-feea76c155f3	012a7d28-f472-43f6-a21b-a91c44ad6667	1234 Maple Street Office		USA	Michigan	Detroit	48204	2025-06-04 22:23:53.471+05:30	2025-06-04 22:23:53.471+05:30
3fd2fb74-0f25-466d-a1b3-5a3959a1410a	11ecf0a7-2d61-4296-924d-7a9863944696	A-80 Office		United States	Michigan	Livonia	48152	2025-06-04 23:35:08.794+05:30	2025-06-04 23:35:08.794+05:30
\.


--
-- Data for Name: Coupon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Coupon" (id, code, description, "monthsFree", "limit", "isActive", "expiresAt", "updatedAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: LoginHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LoginHistory" (id, "userId", status, "updatedAt", "createdAt", message) FROM stdin;
5d5d6a17-52f5-428c-b787-cf3130ba5ec0	f6cea268-8eda-4f3a-a207-5da7994240f1	f	2025-04-05 13:07:24.71+05:30	2025-04-05 13:07:24.71+05:30	Invalid Password
9742c39b-b308-4688-bdd1-f8734122491c	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-05 13:08:03.808+05:30	2025-04-05 13:08:03.808+05:30	Login Successfully
b09400f3-ec87-4d9c-b498-f2a29d3f6ba5	9bd611de-aeda-494d-806d-c0aed4f2aee1	t	2025-04-05 13:10:04.329+05:30	2025-04-05 13:10:04.329+05:30	Login Successfully
b9944e5b-12bc-4a40-9f7e-d9a2719bb2ef	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-05 13:10:21.371+05:30	2025-04-05 13:10:21.371+05:30	Login Successfully
02211a2a-a9b5-42f5-a5fa-7c9697aa54c4	9bd611de-aeda-494d-806d-c0aed4f2aee1	f	2025-04-05 14:41:31.94+05:30	2025-04-05 14:41:31.94+05:30	Invalid Password
be410731-6ff7-47d2-9e07-0bf01a835e00	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-05 16:42:07.526+05:30	2025-04-05 16:42:07.526+05:30	Login Successfully
c7f7eba8-7474-4860-864b-ace5d9232b7d	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-05 16:42:54.214+05:30	2025-04-05 16:42:54.214+05:30	Login Successfully
43859a5d-c0c8-4962-ad77-0004bf07e13c	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-05 16:44:51.95+05:30	2025-04-05 16:44:51.95+05:30	Login Successfully
66c8b7b4-52d1-4764-8122-5eaa7f129245	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-05 16:45:26.544+05:30	2025-04-05 16:45:26.544+05:30	Login Successfully
2fb06f44-44ab-4a68-8580-b7e80ce15813	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-05 20:51:22.327+05:30	2025-04-05 20:51:22.327+05:30	Login Successfully
153bb902-f6c7-4c2d-a3dc-96f26d9ff163	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-06 20:15:49.32+05:30	2025-04-06 20:15:49.32+05:30	Login Successfully
147ff102-9ac1-4aea-92be-c286040d2d3b	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-06 20:16:59.005+05:30	2025-04-06 20:16:59.005+05:30	Login Successfully
687f2410-7565-4e6b-aecd-c9d13cc6262a	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-13 15:23:16.307+05:30	2025-04-13 15:23:16.307+05:30	Login Successfully
32f943e8-d923-414a-9d82-8af46d83836e	9bd611de-aeda-494d-806d-c0aed4f2aee1	f	2025-04-13 16:47:55.554+05:30	2025-04-13 16:47:55.554+05:30	Invalid Password
591b6e61-415d-47e0-bd8d-f51a86277724	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-13 16:48:14.756+05:30	2025-04-13 16:48:14.756+05:30	Login Successfully
416b9292-aa65-41a9-8770-e997d9477047	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-13 21:20:08.544+05:30	2025-04-13 21:20:08.544+05:30	Login Successfully
2592eba7-75ae-4f84-8908-fb54aad4f705	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-13 21:46:42.554+05:30	2025-04-13 21:46:42.554+05:30	Login Successfully
e9d3a67d-d8ab-4e0a-811c-e1d7d368b23c	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-20 02:09:27.775+05:30	2025-04-20 02:09:27.775+05:30	Login Successfully
5c864391-3da8-4c77-9b63-0c6db6c260c1	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-20 03:05:16.822+05:30	2025-04-20 03:05:16.822+05:30	Login Successfully
61b101ed-b004-492e-acd3-66a3dd1f23a7	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-20 18:59:15.551+05:30	2025-04-20 18:59:15.551+05:30	Login Successfully
23c13035-eb7e-4e6b-b206-3b6b68f02c70	9bd611de-aeda-494d-806d-c0aed4f2aee1	t	2025-04-22 23:13:31.802+05:30	2025-04-22 23:13:31.802+05:30	Login Successfully
904dc762-0213-40bc-b6c2-5097d7e6409b	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-04-22 23:28:11.526+05:30	2025-04-22 23:28:11.526+05:30	Login Successfully
acc1e656-61d1-4f4e-8a36-aff52341c1f5	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-04-22 23:41:30.604+05:30	2025-04-22 23:41:30.604+05:30	Login Successfully
2153157d-a1ff-44b6-8441-9662f7d914d9	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-22 23:46:46.536+05:30	2025-04-22 23:46:46.536+05:30	Login Successfully
0738554b-0b0d-42d7-b4e4-1dfd43be900a	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-24 00:17:59.051+05:30	2025-04-24 00:17:59.051+05:30	Login Successfully
f3f4af63-67b1-4a18-ab7c-9af1bca7e6a5	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-24 00:31:06.75+05:30	2025-04-24 00:31:06.75+05:30	Login Successfully
f9baab43-8815-490d-90bc-660333621c01	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-25 14:36:00.895+05:30	2025-04-25 14:36:00.895+05:30	Login Successfully
4fdd7efa-3965-48b5-add3-6a82cb2fd72f	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-04-26 12:34:19.823+05:30	2025-04-26 12:34:19.823+05:30	Login Successfully
b098c6f5-9b4b-4f19-8d2c-f0d4dbf2d5c7	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-04-26 16:38:26.183+05:30	2025-04-26 16:38:26.183+05:30	Login Successfully
e4786764-98ea-4a51-aedd-364bd24c0784	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-04-26 16:39:51.579+05:30	2025-04-26 16:39:51.579+05:30	Login Successfully
989d4f24-812f-48b7-b30c-3de85bbbe4c4	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-04-27 10:14:27.724+05:30	2025-04-27 10:14:27.724+05:30	Login Successfully
23c4b21d-6f83-40fa-bd98-34a6df7c9296	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-01 19:14:15.3+05:30	2025-05-01 19:14:15.3+05:30	Login Successfully
6953aec8-10a7-4f5a-950d-7a0e77fe94d5	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-02 00:57:15.995+05:30	2025-05-02 00:57:15.995+05:30	Login Successfully
3955bea8-37b5-42ac-9a30-99d8b465b4ef	9bd611de-aeda-494d-806d-c0aed4f2aee1	t	2025-05-03 15:11:24.273+05:30	2025-05-03 15:11:24.273+05:30	Login Successfully
9d0e3a0d-9ff7-405d-b28d-c7a9a3f36903	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-03 16:55:56.967+05:30	2025-05-03 16:55:56.967+05:30	Login Successfully
1ea2cb3b-9b4f-4b60-a96d-e028de05b49b	9bd611de-aeda-494d-806d-c0aed4f2aee1	t	2025-05-07 22:58:22.903+05:30	2025-05-07 22:58:22.903+05:30	Login Successfully
a2db09da-1782-4abc-bed9-14029064912e	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-07 23:47:51.788+05:30	2025-05-07 23:47:51.788+05:30	Login Successfully
8a9e2b85-f24e-4256-89e3-302dd2f246e7	9bd611de-aeda-494d-806d-c0aed4f2aee1	f	2025-05-10 14:22:29.506+05:30	2025-05-10 14:22:29.506+05:30	Invalid Password
387a20ad-a9db-4d89-b3e0-5acffdd154e0	9bd611de-aeda-494d-806d-c0aed4f2aee1	t	2025-05-10 14:22:41.44+05:30	2025-05-10 14:22:41.44+05:30	Login Successfully
6988e28e-421a-4510-8e81-50b263dbf67c	9bd611de-aeda-494d-806d-c0aed4f2aee1	t	2025-05-10 19:13:48.699+05:30	2025-05-10 19:13:48.699+05:30	Login Successfully
9c5b11cf-805d-4f42-9155-07e5d55faffd	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-11 17:12:53.945+05:30	2025-05-11 17:12:53.945+05:30	Login Successfully
5af2e6dd-da27-477e-8d66-061abaca56de	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-11 18:40:27.961+05:30	2025-05-11 18:40:27.961+05:30	Login Successfully
923bc493-0fa5-472b-9598-35a40bcf171a	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-05-11 19:06:27.77+05:30	2025-05-11 19:06:27.77+05:30	Login Successfully
69774c0f-e672-40e4-a10f-fe0d41302425	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-13 01:25:46.77+05:30	2025-05-13 01:25:46.77+05:30	Login Successfully
792eddd5-09b2-45f1-ab25-0b28a8e3c4a4	9bd611de-aeda-494d-806d-c0aed4f2aee1	t	2025-05-25 20:47:42.034+05:30	2025-05-25 20:47:42.034+05:30	Login Successfully
10e4ddee-06c0-4ec0-8820-4cf624e8e10e	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-25 22:06:40.792+05:30	2025-05-25 22:06:40.792+05:30	Login Successfully
54655b3d-ec1e-4f62-b7c9-ac5339f1c7ca	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-25 22:26:20.603+05:30	2025-05-25 22:26:20.603+05:30	Login Successfully
04028548-c9c3-4c1e-8c4d-53c3dbf1e3be	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 01:01:03.961+05:30	2025-05-26 01:01:03.961+05:30	Login Successfully
3ddea888-7551-498b-b594-a3eb006fba55	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 01:14:28.973+05:30	2025-05-26 01:14:28.973+05:30	Login Successfully
33362aa6-c403-45de-b3b7-c286d6050375	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 01:40:24.709+05:30	2025-05-26 01:40:24.709+05:30	Login Successfully
f5f33dd4-83d9-47ac-9ca8-2f7cc0587794	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 01:48:10.03+05:30	2025-05-26 01:48:10.03+05:30	Login Successfully
1bcebd71-eceb-426b-9963-edca2eecdfd2	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 01:49:50.171+05:30	2025-05-26 01:49:50.171+05:30	Login Successfully
3b7c0759-0c63-4d04-93c3-9a2ae32ad5f4	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 01:50:06.99+05:30	2025-05-26 01:50:06.99+05:30	Login Successfully
ba8d750c-eb36-4c53-9802-9c768d102ad0	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 01:50:18.936+05:30	2025-05-26 01:50:18.936+05:30	Login Successfully
9c41c1a6-8198-481d-b5e1-22a062f486c9	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 01:50:48.271+05:30	2025-05-26 01:50:48.271+05:30	Login Successfully
cfefa04d-cb79-4562-b774-92a742ecd257	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 01:51:35.818+05:30	2025-05-26 01:51:35.818+05:30	Login Successfully
94a3270b-c8e1-43b9-9111-9d58a62e509a	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 01:53:35.464+05:30	2025-05-26 01:53:35.464+05:30	Login Successfully
0e75d61e-f4e8-4ee0-b73f-db46ebe2a39c	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 02:12:59.848+05:30	2025-05-26 02:12:59.848+05:30	Login Successfully
5d8a4326-4383-49af-a9d6-721d4da25701	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 02:26:12.364+05:30	2025-05-26 02:26:12.364+05:30	Login Successfully
203a0e5f-b1a6-4c79-891c-822cf4efec6e	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 02:26:20.87+05:30	2025-05-26 02:26:20.87+05:30	Login Successfully
a3700e76-fbce-40a9-a1bb-9027a6c41b58	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 02:29:37.273+05:30	2025-05-26 02:29:37.273+05:30	Login Successfully
c6b6b4f5-0de5-4790-8484-179815d2f8af	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 02:33:25.313+05:30	2025-05-26 02:33:25.313+05:30	Login Successfully
817ebc52-2e00-4635-bc9a-c7ef6c50bfd8	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 02:33:53.303+05:30	2025-05-26 02:33:53.303+05:30	Login Successfully
15e78f69-2f36-495c-a9d6-9469a66c5700	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 02:35:10.318+05:30	2025-05-26 02:35:10.318+05:30	Login Successfully
27458827-b228-45b8-96cb-a9bef0e3ccd7	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 02:37:36.414+05:30	2025-05-26 02:37:36.414+05:30	Login Successfully
067d7642-c5db-4b07-96fc-39b6ca5760fc	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-26 02:38:22.311+05:30	2025-05-26 02:38:22.311+05:30	Login Successfully
49dd003e-da32-4ec1-9317-565007982abd	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-31 00:50:49.825+05:30	2025-05-31 00:50:49.825+05:30	Login Successfully
4b3fae2a-bc07-434a-85ae-3a10c8a5e538	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-31 00:53:27.593+05:30	2025-05-31 00:53:27.593+05:30	Login Successfully
e4ff0d91-410d-456d-b7a9-a2e0ddefb4cd	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-31 01:34:21.924+05:30	2025-05-31 01:34:21.924+05:30	Login Successfully
cb1ced33-ef81-4465-add5-6657402670c5	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-31 01:45:53.124+05:30	2025-05-31 01:45:53.124+05:30	Login Successfully
4490e80d-e39e-41c5-beeb-bf61f2484df1	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-31 01:46:45.469+05:30	2025-05-31 01:46:45.469+05:30	Login Successfully
0369509e-edb1-4786-94b2-25b76a1ac458	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-31 01:50:40.974+05:30	2025-05-31 01:50:40.974+05:30	Login Successfully
92ee54f9-6036-47f4-a5c4-e2bd6d36fb62	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-31 01:52:01.089+05:30	2025-05-31 01:52:01.089+05:30	Login Successfully
b66f4b9f-cfc1-4481-87a4-0488c37ed38f	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-31 01:58:07.155+05:30	2025-05-31 01:58:07.155+05:30	Login Successfully
6972c95b-dee3-4732-9c4e-bdf71c4e3b0a	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-31 02:03:31.479+05:30	2025-05-31 02:03:31.479+05:30	Login Successfully
b2e3eb70-45b7-4e2d-8139-bce75aefb19d	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-31 02:07:26.267+05:30	2025-05-31 02:07:26.267+05:30	Login Successfully
04550984-1a37-425b-913d-028720596c2e	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-31 02:13:54.914+05:30	2025-05-31 02:13:54.914+05:30	Login Successfully
9c95c1a8-6ce4-4dc4-897d-79577c80dd0a	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-05-31 02:18:07.535+05:30	2025-05-31 02:18:07.535+05:30	Login Successfully
4f347ae5-909e-4f16-a3d4-c9b9fbe57e71	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-06-01 16:20:44.493+05:30	2025-06-01 16:20:44.493+05:30	Login Successfully
59b91d9b-e880-463a-9f44-296bbcec888c	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-06-01 16:23:07.192+05:30	2025-06-01 16:23:07.192+05:30	Login Successfully
105fd31a-64ee-48c2-980f-fe40d063fce7	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-06-01 17:20:41.815+05:30	2025-06-01 17:20:41.815+05:30	Login Successfully
32b8d9e5-57c8-41a9-a07b-dcb113a15961	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-01 17:22:54.429+05:30	2025-06-01 17:22:54.429+05:30	Login Successfully
8e3b61fa-ebb4-4444-8240-d7ea1dd322f6	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-01 17:25:39.988+05:30	2025-06-01 17:25:39.988+05:30	Login Successfully
874cde9d-bd15-4550-b4c6-5f16932b623d	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-01 17:28:18.346+05:30	2025-06-01 17:28:18.346+05:30	Login Successfully
9cfd7367-f96d-4529-ae9b-99f50a76b08f	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-01 18:05:45.031+05:30	2025-06-01 18:05:45.031+05:30	Login Successfully
512e2cc6-3e28-444e-85d8-099e760c8d05	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-06-01 19:34:18.165+05:30	2025-06-01 19:34:18.165+05:30	Login Successfully
9fb678c1-5777-4561-8051-3855b9af700d	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-03 00:46:53.936+05:30	2025-06-03 00:46:53.936+05:30	Login Successfully
3ba39b1e-3fb4-482f-910e-70a9e4f20f0d	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-03 22:35:11.215+05:30	2025-06-03 22:35:11.215+05:30	Login Successfully
c756566a-cb4e-48b2-bbff-94d6db8f442e	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-03 23:00:31.113+05:30	2025-06-03 23:00:31.113+05:30	Login Successfully
b9aa5666-5dee-4053-81dc-df698336db35	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-04 20:05:38.101+05:30	2025-06-04 20:05:38.101+05:30	Login Successfully
09f4a6f0-31b4-4a52-83a6-0e7ffdbeb501	012a7d28-f472-43f6-a21b-a91c44ad6667	t	2025-06-04 22:25:19.085+05:30	2025-06-04 22:25:19.085+05:30	Login Successfully
30ccbaa7-ac6e-4cf0-86c5-0284747aa125	012a7d28-f472-43f6-a21b-a91c44ad6667	t	2025-06-04 22:25:38.023+05:30	2025-06-04 22:25:38.023+05:30	Login Successfully
d9619587-e5e1-4637-b717-b88c76cec3ae	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-05 01:41:29.243+05:30	2025-06-05 01:41:29.243+05:30	Login Successfully
b7df4e27-640c-4704-81cd-2c0bb35787ad	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-05 10:19:45.315+05:30	2025-06-05 10:19:45.315+05:30	Login Successfully
1d213290-6750-4bc6-9417-8702baa9af6c	11ecf0a7-2d61-4296-924d-7a9863944696	t	2025-06-05 10:25:11.743+05:30	2025-06-05 10:25:11.743+05:30	Login Successfully
6852f9c4-658c-4c2c-9ee5-2f27ff7b5d7f	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-05 22:13:02.207+05:30	2025-06-05 22:13:02.207+05:30	Login Successfully
9af920d6-4f46-4e32-9f1b-f27bd1b3b230	11ecf0a7-2d61-4296-924d-7a9863944696	t	2025-06-05 22:13:47.948+05:30	2025-06-05 22:13:47.948+05:30	Login Successfully
e01183ce-da65-4555-8f72-888f87658680	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-05 22:30:14.525+05:30	2025-06-05 22:30:14.525+05:30	Login Successfully
67d748ca-bc86-4cd0-956b-7fdca2eabd26	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-06-06 01:15:13.351+05:30	2025-06-06 01:15:13.351+05:30	Login Successfully
9552cfe8-553e-4f5c-a8f4-5818d9509831	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-07 20:41:58.278+05:30	2025-06-07 20:41:58.278+05:30	Login Successfully
716377a9-8c59-41a0-a932-6b3240fc507a	11ecf0a7-2d61-4296-924d-7a9863944696	t	2025-06-07 20:49:16.791+05:30	2025-06-07 20:49:16.791+05:30	Login Successfully
209ee7a8-e983-49de-9a1e-81efc44a9e11	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-08 12:14:01.72+05:30	2025-06-08 12:14:01.72+05:30	Login Successfully
e5b0338d-119b-421a-a70b-59575315ac61	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-11 22:35:15.012+05:30	2025-06-11 22:35:15.012+05:30	Login Successfully
12bd9a31-fe95-4b7b-a9dc-2d4c1b3103b7	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-11 22:41:49.469+05:30	2025-06-11 22:41:49.469+05:30	Login Successfully
664e24de-20cf-4347-a02a-973b595563dc	11ecf0a7-2d61-4296-924d-7a9863944696	t	2025-06-11 22:57:06.548+05:30	2025-06-11 22:57:06.548+05:30	Login Successfully
92fc07d6-ce1e-4c90-8ce7-07f32ec95e2c	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-14 19:18:49.544+05:30	2025-06-14 19:18:49.544+05:30	Login Successfully
bda46cd8-5cf2-4057-9310-c85a4a88628a	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-15 21:23:48.958+05:30	2025-06-15 21:23:48.958+05:30	Login Successfully
dae3376f-c585-455f-939e-69fa66720ec9	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-06-15 21:42:30.037+05:30	2025-06-15 21:42:30.037+05:30	Login Successfully
86eee3fb-26e5-41ae-a9b8-711f8fa0e07c	11ecf0a7-2d61-4296-924d-7a9863944696	t	2025-06-15 21:50:39.511+05:30	2025-06-15 21:50:39.511+05:30	Login Successfully
f2e13d46-1d09-40eb-93e7-c9fd4a5d48bd	9bd611de-aeda-494d-806d-c0aed4f2aee1	t	2025-06-21 16:18:54.321+05:30	2025-06-21 16:18:54.321+05:30	Login Successfully
a523828e-9256-4e06-a243-b7530e1024db	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-06-21 17:05:46.386+05:30	2025-06-21 17:05:46.386+05:30	Login Successfully
40d58ae7-c29b-420e-bc96-48429b5502e8	9bd611de-aeda-494d-806d-c0aed4f2aee1	t	2025-06-21 23:01:56.417+05:30	2025-06-21 23:01:56.417+05:30	Login Successfully
dcf71c07-3969-43d3-896f-ced41a19e08b	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-28 13:33:04.068+05:30	2025-06-28 13:33:04.068+05:30	Login Successfully
baa32d04-ffff-4bdb-8c4a-7b489454751d	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-06-28 13:33:17.502+05:30	2025-06-28 13:33:17.502+05:30	Login Successfully
ef26de58-33c0-46c5-965d-2fea25662728	f6cea268-8eda-4f3a-a207-5da7994240f1	t	2025-06-28 14:43:54.674+05:30	2025-06-28 14:43:54.674+05:30	Login Successfully
b86989ab-f58a-401a-8767-4374b0789a0d	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	t	2025-06-28 16:58:35.261+05:30	2025-06-28 16:58:35.261+05:30	Login Successfully
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notification" (id, "userId", "projectId", heading, message, data, "isRead", "updatedAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: Otp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Otp" (id, type, "userId", "oneTimePassword", "isVerified", "updatedAt", "createdAt") FROM stdin;
541d651e-581a-4497-8300-daccf85c95d2	REGISTRATION	d44e1c1f-77b7-44dd-bdf1-e2a5cea006dd	$2b$10$RveWOmBd5uBnuTRI9.gFsONh8NzcZE4.Ep7ZDHidYwUAjhFSTQdoe	f	2025-06-04 16:56:09.599	2025-06-04 16:56:09.599
9515ebfc-5054-425f-a60e-37a33d9026fe	REGISTRATION	eec01203-9c0f-4dad-a1c9-cab74a6aa2a9	$2b$10$MMn.UoEDFO1/4UxakCUXC.wmH87S9201UCrKcROrFF2vQkcU079we	f	2025-06-11 19:40:53.586	2025-06-11 19:38:31.35
845f9e03-a512-442e-840f-9a00249197bc	REGISTRATION	571b4a2b-ff4f-4931-bb82-910e72b5d20d	$2b$10$sY5I3/Ky3E8m3pMrJNjabupiEi5UkZG6bEHteqjpZcAgoMYGhDnZm	f	2025-06-11 20:12:32.573	2025-06-11 20:11:42.562
72bb281d-ffc3-4eed-b6b7-bde30eb93a6d	REGISTRATION	714bc6d9-e1b4-4500-a04e-b2112842236e	$2b$10$f2UoRimmBkYfrye1pWCC9OX4WBAOM3IP5.abbx5JAnlwcmmNUraYi	f	2025-06-14 15:45:24.98	2025-06-11 19:58:27.403
d720ff1b-ff2b-4c6e-88f2-1ba926e0f954	REGISTRATION	c24365b9-b0b5-4e1c-8e16-8a5e42513ac0	$2b$10$oo6dyTyqUBYh68yDQLW8Guv4zjdx7fzIdM1f8hZs3Sqy255aR3v/O	f	2025-06-21 10:28:15.932	2025-06-21 09:56:51.942
dc0c5f3c-b73f-49c1-82f0-9f5708a404e4	REGISTRATION	88d44268-8f35-4885-9537-4c6b5608fe15	$2b$10$2U1y/ebvTquuOPB5LFBEiO3QxBTLZbYjrfuCFGoK2vO.FKpjLMr92	f	2025-06-21 11:33:57.812	2025-06-21 11:29:38.246
\.


--
-- Data for Name: Plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Plan" (id, name, description, amount, "updatedAt", "createdAt", "priceId", "productId", "isPopular", "yearlyPriceId", "yearlyProductId") FROM stdin;
82039509-b495-4087-8fbb-db3dd0319e46	High-Value Trades	\N	99	2025-05-12 16:44:46.831	2025-04-19 21:35:32.148	price_1RNxoBL4fcg7zzCFg7OoqzIc	prod_SIYwRBQSrC8Hil	f	price_1RNzT8L4fcg7zzCF26YWuXaS	prod_SIaetOdwVp5QMJ
1ea4a0df-c42e-438b-a5c9-1eab27ee08b9	Skilled Trades	\N	80	2025-05-12 16:44:47.856	2025-04-19 21:35:32.146	price_1RNxoCL4fcg7zzCFZar5yerU	prod_SIYw22Jix33xTH	t	price_1RNzT9L4fcg7zzCFt4Rcjd3f	prod_SIaeD3rsbRwnQg
7f0e4a96-69ae-48ed-bdaf-717d9b7b714c	Essential Trades	\N	50	2025-05-12 16:44:48.878	2025-04-19 21:35:32.14	price_1RNxoCL4fcg7zzCFTcfwuAbW	prod_SIYwrsG45KVqEh	f	price_1RNzTAL4fcg7zzCFk7wAiG8H	prod_SIaeTufLYR9Hlu
\.


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Project" (id, "userId", "serviceId", title, description, "updatedAt", "createdAt", "addressId", status, "budgetPreference", "preferenceMessage") FROM stdin;
72afefed-b99b-4b2e-88fc-aaee880fc3fb	9bd611de-aeda-494d-806d-c0aed4f2aee1	\N	Home Renovation	Home Renovation for old house	2025-06-04 22:18:53.786+05:30	2025-03-09 17:09:26.39+05:30	6d3a4bfd-e6f1-4b48-9aa8-aea97007fb76	VENDOR_FOUND	5	\N
58144c41-81d0-403a-9817-bb8d7ab5c2e3	9bd611de-aeda-494d-806d-c0aed4f2aee1	\N	Painting	I want to paint my ground floor	2025-05-04 08:42:26.764+05:30	2025-03-09 19:14:54.73+05:30	2ca07b9c-e5ca-48de-868f-1cb7b67b37de	AWARDED	5	\N
2581861a-6f1f-4626-bcaf-43777bc260f5	9bd611de-aeda-494d-806d-c0aed4f2aee1	f321f007-7d03-4eda-83a6-947a344243aa	This is my plumbing project	This is the description.	2025-05-11 18:14:21.779+05:30	2025-03-16 20:43:08.713+05:30	a8e7cbcc-30a9-40a5-9120-4b819153eb15	VENDOR_FOUND	5	My budget message.
e8a099de-0ccd-4e58-b784-8a5b214b8e06	9bd611de-aeda-494d-806d-c0aed4f2aee1	f287a2c9-ec74-4ed6-bcb9-810179b9ffda	My new projct	This is my new project.	2025-06-04 22:18:53.772+05:30	2025-03-16 16:10:59.754+05:30	532a0a8e-5c00-4961-bef4-513adced333d	VENDOR_FOUND	5	This is budget description.
9f50733f-b418-4215-8fbd-ea1efa8a83bc	9bd611de-aeda-494d-806d-c0aed4f2aee1	f287a2c9-ec74-4ed6-bcb9-810179b9ffda	My Project	This is my project	2025-06-04 22:18:53.779+05:30	2025-03-29 13:15:35.534+05:30	0bf46549-30c4-4f09-8e9f-02ce5497d190	VENDOR_FOUND	5	\N
22e3b58d-fc6f-4df6-b562-3d6b681a6326	9bd611de-aeda-494d-806d-c0aed4f2aee1	\N	Flooring	This project is related to the flooring of my house	2025-06-04 22:18:53.782+05:30	2025-03-09 19:14:51.964+05:30	81f913b9-fed8-43ad-8e7d-784947890e2d	VENDOR_FOUND	5	\N
0d6357fa-bc9c-4b57-a7a4-0b3b4ec5b652	9bd611de-aeda-494d-806d-c0aed4f2aee1	\N	Plumbing	I want to have plumbing in my home.	2025-06-04 22:18:53.784+05:30	2025-03-09 19:14:54.282+05:30	df392cad-c6ec-4ed5-9267-d0de5294ede0	VENDOR_FOUND	5	\N
\.


--
-- Data for Name: ProjectFile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProjectFile" (id, "projectId", url, type, "updatedAt", "createdAt") FROM stdin;
cbaeaf62-bd9d-4be6-9da6-85ee47d29aac	e8a099de-0ccd-4e58-b784-8a5b214b8e06	projects/2cb375f1-4151-4e31-98cb-4b9f3fe183e0.png	BEFORE	2025-03-16 16:10:59.754+05:30	2025-03-16 16:10:59.754+05:30
f31bf367-b1e2-4312-a68a-fcfaaefe12fe	e8a099de-0ccd-4e58-b784-8a5b214b8e06	projects/299ae6da-4238-4650-9750-43378f6e4a30.png	BEFORE	2025-03-16 16:10:59.754+05:30	2025-03-16 16:10:59.754+05:30
a557f30b-94fc-47b9-8e1a-06bc1bd088e4	2581861a-6f1f-4626-bcaf-43777bc260f5	projects/4f81e9ca-0d7e-4725-89ec-e13d18793c47.png	BEFORE	2025-03-16 20:43:08.713+05:30	2025-03-16 20:43:08.713+05:30
f3415535-ec3b-4e25-8bc3-fdcd6a0ff492	2581861a-6f1f-4626-bcaf-43777bc260f5	projects/8c259fc3-63c6-48c5-a9de-92ff03559e22.png	BEFORE	2025-03-16 20:43:08.713+05:30	2025-03-16 20:43:08.713+05:30
45aef9d1-f4be-479a-9880-f417f71bb051	9f50733f-b418-4215-8fbd-ea1efa8a83bc	projects/3f6d3888-0c74-4e39-ae55-f01b00c97a5c.mp4	BEFORE	2025-03-29 13:15:35.534+05:30	2025-03-29 13:15:35.534+05:30
\.


--
-- Data for Name: ProjectTag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProjectTag" ("projectId", "tagId", "updatedAt", "createdAt") FROM stdin;
e8a099de-0ccd-4e58-b784-8a5b214b8e06	adbdf6d6-fb71-496e-b885-e1891f2aaef1	2025-03-16 16:10:59.79+05:30	2025-03-16 16:10:59.79+05:30
e8a099de-0ccd-4e58-b784-8a5b214b8e06	18e9aa5c-6ada-405d-90fd-1eab6d96c945	2025-03-16 16:10:59.79+05:30	2025-03-16 16:10:59.79+05:30
e8a099de-0ccd-4e58-b784-8a5b214b8e06	f56631eb-fe11-4645-b22c-200ca35484c0	2025-03-16 16:10:59.79+05:30	2025-03-16 16:10:59.79+05:30
2581861a-6f1f-4626-bcaf-43777bc260f5	9f373690-7820-4c4d-b426-dbadaea562fa	2025-03-16 20:43:08.739+05:30	2025-03-16 20:43:08.739+05:30
2581861a-6f1f-4626-bcaf-43777bc260f5	8ec74262-5a9d-4dc6-aa51-02b6b5226f25	2025-03-16 20:43:08.739+05:30	2025-03-16 20:43:08.739+05:30
9f50733f-b418-4215-8fbd-ea1efa8a83bc	adbdf6d6-fb71-496e-b885-e1891f2aaef1	2025-03-29 13:15:35.582+05:30	2025-03-29 13:15:35.582+05:30
9f50733f-b418-4215-8fbd-ea1efa8a83bc	782b6170-cb3c-4ee2-8a91-5b5ef49df634	2025-03-29 13:15:35.582+05:30	2025-03-29 13:15:35.582+05:30
\.


--
-- Data for Name: ProjectUpdate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProjectUpdate" (id, "projectId", "vendorId", "updatedAt", "createdAt", description) FROM stdin;
b2499484-a2ff-4561-a608-a71a2cce726e	58144c41-81d0-403a-9817-bb8d7ab5c2e3	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	2025-05-10 12:49:26.61+05:30	2025-05-10 12:49:26.61+05:30	Greate quality work
22448554-1656-4aa5-ae81-c2bf3a22330d	58144c41-81d0-403a-9817-bb8d7ab5c2e3	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	2025-05-10 13:58:33.558+05:30	2025-05-10 13:58:33.558+05:30	Greate quality work
1bc66d38-4621-4102-baa8-a40108b805b5	58144c41-81d0-403a-9817-bb8d7ab5c2e3	\N	2025-05-10 14:22:57.68+05:30	2025-05-10 14:22:57.68+05:30	Greate quality work from user
21ffff87-25e4-4267-93cc-2fcbbeee852c	58144c41-81d0-403a-9817-bb8d7ab5c2e3	\N	2025-05-11 14:26:55.693+05:30	2025-05-11 14:26:55.693+05:30	Greate quality work from user
bc2fe1e9-8b0e-4ae1-8c7b-a77028c967e4	58144c41-81d0-403a-9817-bb8d7ab5c2e3	\N	2025-05-11 14:26:58.836+05:30	2025-05-11 14:26:58.836+05:30	Greate quality work from user
cb7dca66-7c83-45fa-8402-ebbce628c560	58144c41-81d0-403a-9817-bb8d7ab5c2e3	\N	2025-05-11 15:25:36.65+05:30	2025-05-11 14:26:48.415+05:30	Greate quality work from user updated hai
618f93c6-5356-4c97-84d1-d4187c4116d9	58144c41-81d0-403a-9817-bb8d7ab5c2e3	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	2025-05-11 17:35:17.259+05:30	2025-05-11 17:35:17.259+05:30	From vendor
\.


--
-- Data for Name: ProjectUpdateFile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProjectUpdateFile" ("projectUpdateId", "fileUrl", type) FROM stdin;
b2499484-a2ff-4561-a608-a71a2cce726e	projects/8fd075f2-c511-425c-8aa9-1c5131bd8ce2.png	BEFORE
b2499484-a2ff-4561-a608-a71a2cce726e	projects/ba6d7286-7506-46f8-b014-1698225c184a.png	AFTER
22448554-1656-4aa5-ae81-c2bf3a22330d	projects/2bbaa9e6-6f33-41d9-bcca-8bf1c166412b.png	BEFORE
22448554-1656-4aa5-ae81-c2bf3a22330d	projects/1865e9f6-547c-4e5c-a308-0784f86fb64f.png	AFTER
1bc66d38-4621-4102-baa8-a40108b805b5	projects/79d94988-b932-4c9b-a711-3dde5e513268.png	BEFORE
1bc66d38-4621-4102-baa8-a40108b805b5	projects/d7a011d5-116f-4d8e-a1a0-aad65ceba624.png	AFTER
cb7dca66-7c83-45fa-8402-ebbce628c560	projects/003af9da-93e1-4368-9c65-9153bd580aa9.png	BEFORE
cb7dca66-7c83-45fa-8402-ebbce628c560	projects/509767b0-34ec-4601-bede-3dcec46c6af7.png	AFTER
21ffff87-25e4-4267-93cc-2fcbbeee852c	projects/68488808-857f-466b-b783-caf334949c99.png	BEFORE
21ffff87-25e4-4267-93cc-2fcbbeee852c	projects/990df912-3c3d-4dc7-bdf6-c7035705bdd3.png	AFTER
bc2fe1e9-8b0e-4ae1-8c7b-a77028c967e4	projects/cf4b47d9-1206-46d2-a269-74b17f982256.png	BEFORE
bc2fe1e9-8b0e-4ae1-8c7b-a77028c967e4	projects/c0f18f74-f75c-4b78-bce3-6ca52a63d897.png	AFTER
618f93c6-5356-4c97-84d1-d4187c4116d9	projects/0211ae2e-4666-4ad5-b153-67dd4b443716.svg	BEFORE
618f93c6-5356-4c97-84d1-d4187c4116d9	projects/6f7bc3a9-57d0-4d5c-805d-5172f495446f.svg	AFTER
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, "projectId", "vendorId", rating, comment, "isPublished", "updatedAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: SampleFile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SampleFile" (id, "projectId", url, "updatedAt", "createdAt") FROM stdin;
3aea270c-a021-40f5-94a9-487c962959cb	e8a099de-0ccd-4e58-b784-8a5b214b8e06	projects/5e8f97ab-442d-4ee9-bddb-43d5bc5e143c.png	2025-03-16 16:10:59.754+05:30	2025-03-16 16:10:59.754+05:30
50f952f9-b9ee-448d-8c42-376e68994601	e8a099de-0ccd-4e58-b784-8a5b214b8e06	projects/51647b3a-1121-432d-86b6-1c44dae75190.png	2025-03-16 16:10:59.754+05:30	2025-03-16 16:10:59.754+05:30
22b02560-8910-44bf-bf6e-ee034c02a446	2581861a-6f1f-4626-bcaf-43777bc260f5	projects/4c67fd4f-a92a-4d8b-9b38-3d2daaad1bda.png	2025-03-16 20:43:08.713+05:30	2025-03-16 20:43:08.713+05:30
fe50640d-dbd9-440f-ac63-ea2ffa2e4e8a	2581861a-6f1f-4626-bcaf-43777bc260f5	projects/ea92e6e2-9610-4d76-aefb-923ce139790d.png	2025-03-16 20:43:08.713+05:30	2025-03-16 20:43:08.713+05:30
\.


--
-- Data for Name: Service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Service" (id, description, "updatedAt", "createdAt", name, "iconUrl", "planId") FROM stdin;
f321f007-7d03-4eda-83a6-947a344243aa	We shield properties from moisture damage with basement, roof, and exterior wall waterproofing. Our specialized techniques, including crawl space sealing, protect against leaks and deterioration.	2025-06-28 16:21:15.063+05:30	2025-03-15 00:19:14.328+05:30	Waterproofing	services/38976737-ca10-4d08-82cf-d994be18107b.webp	7f0e4a96-69ae-48ed-bdaf-717d9b7b714c
b41365c8-a8b6-411a-9250-0fa2e460b2c3	Upgrade your home’s exterior with our stucco services, from initial application to color matching and waterproofing. We repair cracks, restore finishes, and ensure lasting protection.	2025-06-28 16:34:19.953+05:30	2025-03-15 00:19:14.303+05:30	Stucco	services/9201070a-f338-462d-a40c-1f62b9ea7ed3.webp	\N
a0e7b523-2667-4617-9854-a7234f457f5a	We tackle all plumbing issues, from clogged drains and leaking faucets to sump pump repairs and water heater installations. Count on us for efficient solutions and gas line services.	2025-06-28 16:31:15.345+05:30	2025-03-15 00:19:14.308+05:30	Plumbing	services/7057f5d8-474c-4fc5-b3a8-a859092fcb0d.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
947ae27c-5c7e-4480-ad2c-59fb10f92bee	Our professional electricians handle everything from wiring and panel upgrades to installing smart home systems and EV chargers. We ensure safe, compliant, and efficient electrical work.	2025-06-28 16:30:01.04+05:30	2025-03-15 00:19:14.311+05:30	Electrical	services/e1b49962-9192-4a13-af29-dd0d90e9b1a9.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
5326d998-a814-4bc7-a51b-2f3b7e336402	Safeguard your property with reliable fire and smoke suppression solutions. We install sprinklers, smoke detectors, and emergency signage, conduct fire alarm testing, and offer fireproofing measures.	2025-06-28 16:24:27.763+05:30	2025-03-15 00:19:14.322+05:30	Suppression Systems (Fire/Smoke)	services/b36ac010-d99e-404b-b107-9a42d4a34751.webp	\N
f287a2c9-ec74-4ed6-bcb9-810179b9ffda	We offer professional wood and metal framing solutions for residential and commercial projects. Our services include load-bearing wall removals, beam installations, and structural reinforcements, ensuring a durable building framework.	2025-06-28 16:38:32.719+05:30	2025-03-15 00:19:14.247+05:30	Framework	services/e498d510-e373-4f9e-95ec-5cf164499a3d.webp	\N
2037b176-b99a-4705-bb01-a48a75b06c4e	We provide essential utility services, including gas line repairs, water line installations, and electrical pole setups. Our specialized team ensures safe underground wiring and mapping.	2025-06-28 16:27:13.098+05:30	2025-03-15 00:19:14.318+05:30	Utilities	services/87afd39f-4731-49a2-b81d-e88f395da8d8.webp	\N
1f788053-ae28-487e-9910-67ffe0b3adb5	Specializing in foundation repairs, crack sealing, and reinforcement, we protect your home’s structural integrity. Our services include leveling slabs, waterproofing basements, and providing crawl space support.	2025-06-28 16:36:52.917+05:30	2025-03-15 00:19:14.294+05:30	Foundation	services/3e80265b-b09e-4459-91c5-8a2b57280b63.webp	\N
583a9bda-ab90-4878-a4a7-0336db218529	Elevate your interior with professional flooring solutions, from hardwood refinishing and tile installation to vinyl and laminate options. We also repair subfloors and apply epoxy coatings.	2025-06-28 16:19:09.499+05:30	2025-03-15 00:19:14.329+05:30	Flooring Services	services/a8f885aa-43e5-4aa0-85e8-008366b9d21b.webp	\N
8eeefac0-498e-43aa-9f12-b40e55c16966	We provide safe, efficient demolition solutions for interiors, full structures, and selective removals. Our team handles debris hauling, concrete removal, and site preparation for seamless rebuilding.	2025-06-28 16:35:04.707+05:30	2025-03-15 00:19:14.301+05:30	Demolition	services/b442e213-8fa5-4fb0-8204-9c5e25bb6e40.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
f6318a72-8133-4bf7-9ee8-470f19511b48	Revitalize your lawn with grass and sod solutions, including seeding, turf removal, and fresh sod installation. We focus on proper soil preparation for a vibrant yard.	2025-06-28 16:07:13.154+05:30	2025-03-15 00:19:14.343+05:30	Grass / Sod Service	services/f003912f-dbbf-4791-8b73-2246757c2387.webp	\N
a0072499-2327-49d6-bc1b-4edd392a0c28	Beautify your outdoors with tree trimming, lawn resodding, retaining wall landscaping, and more. We also install outdoor lighting, artificial turf, and drainage solutions for visually appealing spaces.	2025-06-28 16:13:37.139+05:30	2025-03-15 00:19:14.336+05:30	Landscaping / Trees	services/63afcbac-7250-4771-8cf3-0a90f2bdf33c.webp	\N
d19e50db-d46a-4701-9112-af354d05f51e	Shield your windows, patios, and pergolas from sun and rain with quality awnings. We specialize in retractable systems, canopies, and custom covers for extended outdoor enjoyment.	2025-06-28 16:12:40.859+05:30	2025-03-15 00:19:14.338+05:30	Awnings	services/54a841b5-6f6b-49c9-a687-1217aab3fd95.webp	\N
2388f4e4-cc9c-45cd-81df-5fb323bc3a40	Our tile installation services cover bathrooms, kitchens, backsplashes, and mosaic designs. We handle grout repairs and ensure precise alignment for a stylish, durable surface.	2025-06-28 16:14:20.944+05:30	2025-03-15 00:19:14.335+05:30	Tile Install	services/c6379014-2925-44d7-86ee-edc86fab898c.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
e48a92e4-2541-4015-8906-f387e2549062	Keep your roof drainage efficient with our gutter services, from cleaning and guard installations to seamless replacements and downspout repairs. We prevent water damage and foundation issues.	2025-06-28 16:22:40.467+05:30	2025-03-15 00:19:14.326+05:30	Gutters	services/04a64bf7-15e4-414c-9226-a88f22cebf06.webp	\N
70d5a727-f889-449d-a4b2-9583337ddaf5	Protect your home with expert roofing services, including leak repairs, shingle replacements, metal roof installations, and skylight setups. We ensure longevity and weather resistance.	2025-06-28 16:23:22.262+05:30	2025-03-15 00:19:14.324+05:30	Roofing	services/9e74bfe4-0646-4c47-a3fe-653ddb4811ec.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
e867a6e3-ee25-46ee-8152-5594ba20ac8d	From industrial equipment repairs to ventilation fan maintenance, we address complex mechanical needs. Our experts handle conveyor system fixes, air compressors, and routine machine servicing.	2025-06-28 16:27:50.422+05:30	2025-03-15 00:19:14.316+05:30	Mechanical Services	services/b27d8ec2-76cc-4294-8986-c45cab417b90.webp	\N
48f8faeb-2b02-4e33-b1ba-ec29dc514329	We offer comprehensive heating, ventilation, and air conditioning services, including system installations, repairs, and maintenance. Keep your space comfortable with our ductwork solutions and thermostat setups.	2025-06-28 16:29:03.007+05:30	2025-03-15 00:19:14.314+05:30	HVAC	services/65747296-85ee-4d44-bd09-4a8d26c3eed8.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
a6a0102f-262f-4610-990e-ed81bf6c1826	Improve land stability and drainage with professional grading services. We level uneven terrain, control soil erosion, and prepare sites for healthier landscaping or construction.	2025-06-28 16:41:57.097+05:30	2025-03-15 00:19:14.34+05:30	Grading	services/b7366edc-d10d-4333-a985-a6301d9de0e0.webp	\N
2fe2bace-8ec9-4d36-8955-64c9902ccce3	Our comprehensive concrete services range from foundations and driveways to decorative stamped finishes. We expertly pour, cut, resurface, and repair concrete to enhance durability and visual appeal.	2025-06-28 16:40:17.445+05:30	2025-03-15 00:19:14.292+05:30	Concrete	services/db9cc3f1-7824-4418-aca4-7769d1bc68a7.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
a20a556c-cc71-48fd-a13a-1a8cfd814f17	Transform interiors with new drywall installations or repairs. We handle ceiling fixes, patching, and popcorn ceiling removals for a smooth, flawless finish.	2025-06-28 16:01:47.792+05:30	2025-03-15 00:19:14.349+05:30	Drywall	services/b035b968-685b-42f9-bdea-e8d3eb661015.webp	7f0e4a96-69ae-48ed-bdaf-717d9b7b714c
204d2363-685a-40cd-b41b-05a1cc3ab0a3	Connect to municipal utilities with our professional underground tap services. We handle sewer, water, and gas line connections safely and in compliance with regulations.	2025-06-28 16:04:25.698+05:30	2025-03-15 00:19:14.346+05:30	Underground Tap	services/2bd5a25f-9a3d-4933-94d7-30fcf760d7d7.webp	82039509-b495-4087-8fbb-db3dd0319e46
86532f3b-fd86-4781-aa55-f06d136492bf	Refresh any space with professional painting, from interior walls to exterior facades and cabinets. We also offer epoxy paint options for a durable, vibrant finish.	2025-06-28 16:00:36.922+05:30	2025-03-15 00:19:14.351+05:30	Painting	services/18cdee0a-a62f-4416-8371-a4dd4730f63a.webp	7f0e4a96-69ae-48ed-bdaf-717d9b7b714c
2347c376-962f-42a9-900c-46b0711140a0	Improve efficiency and curb appeal with window replacements, repairs, and tinting. We install storm windows, repair glass damage, and ensure a tight seal against the elements.	2025-06-28 15:59:01.502+05:30	2025-03-15 00:19:14.354+05:30	Windows Installation & Repair	services/b064bbc1-6322-4f92-9063-de65111b8ed8.webp	7f0e4a96-69ae-48ed-bdaf-717d9b7b714c
4c434225-84e0-497c-ab37-852914135672	Upgrade or maintain your garage door with opener installations, spring replacements, and insulation services. We ensure smooth operation, enhanced security, and improved energy efficiency.	2025-06-28 15:57:40.76+05:30	2025-03-15 00:19:14.356+05:30	Garage Doors	services/d3960073-8a34-4ac4-9702-39b8331607ec.webp	7f0e4a96-69ae-48ed-bdaf-717d9b7b714c
12e76f71-9da0-4a9a-8e0f-40ab6e5c6a05	Expand or remodel your commercial space with confidence. We handle office buildouts, retail renovations, and warehouse expansions, delivering cost-effective and code-compliant solutions.	2025-06-28 15:13:38.897+05:30	2025-03-15 00:19:14.377+05:30	Commercial Construction	services/5eea0881-c863-41f9-9b6f-5c4e4291a476.webp	82039509-b495-4087-8fbb-db3dd0319e46
613c2d41-b042-4126-b0ed-4ccd37d8b98a	Upgrade residential garages and commercial floors with our epoxy solutions. We offer anti-slip, metallic, and industrial-grade finishes that resist wear and enhance appearance.	2025-06-28 16:15:41.942+05:30	2025-03-15 00:19:14.333+05:30	Epoxy Flooring	services/235dac3f-c252-46bd-9426-45e70e630d3b.webp	7f0e4a96-69ae-48ed-bdaf-717d9b7b714c
f57e3bbd-dd23-4230-8ba9-3258e6e10069	Enjoy a cozy, safe fireplace with our installation, repair, and chimney sweeping. We install gas fireplaces, maintain wood stoves, and ensure optimal performance.	2025-06-28 15:15:30.233+05:30	2025-03-15 00:19:14.374+05:30	Fireplace Services	services/fce36432-b111-4b7a-af6b-9a4c03183825.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
36143573-976b-4734-82d1-85aa54edd513	Ensure proper waste management with our septic services, including tank pumping, new system installations, and drain field repairs. We prioritize health, safety, and environmental compliance.	2025-06-28 15:16:31.547+05:30	2025-03-15 00:19:14.371+05:30	Septic System	services/06ff3dcd-3be2-4d11-9921-cad46ae64d1a.webp	82039509-b495-4087-8fbb-db3dd0319e46
3fffadfb-7449-4f2b-a747-ffb8849bf4ad	Our engineering team ensures building safety through load calculations, code compliance reviews, and site planning. We collaborate with architects and contractors for efficient, stable designs.	2025-06-28 15:23:14.527+05:30	2025-03-15 00:19:14.362+05:30	Engineering Services	services/6d49367c-ee57-4b61-8958-18d1bfd8c7c7.webp	82039509-b495-4087-8fbb-db3dd0319e46
1ea07acc-b317-4d58-b261-284ae66c3346	Bring your vision to life with our architectural expertise, from drafting and blueprints to structural design. We plan home expansions and renovations with code compliance in mind.	2025-06-28 15:24:25.624+05:30	2025-03-15 00:19:14.361+05:30	Architectural Services	services/36cd9186-1ee5-4ce2-9fc4-0a46f08236a3.webp	\N
29f7c2e4-73ff-4801-a28a-0750ce1005e2	Boost your business visibility with custom signs and signage installation. We provide LED signboards, billboard repairs, and display solutions that communicate your brand message effectively.	2025-06-28 15:45:58.763+05:30	2025-03-15 00:19:14.378+05:30	Signs & Signage Installation	services/4ab4cc63-ddad-4d62-91f2-30a25cb0b3a8.webp	7f0e4a96-69ae-48ed-bdaf-717d9b7b714c
4ba22b58-fcce-437d-a1c9-8e9fd38a5629	Install or replace suspended ceilings for improved acoustics and easy overhead access. We fit acoustic tiles and drop ceiling systems, enhancing functionality and appearance.	2025-06-28 15:55:26.311+05:30	2025-03-15 00:19:14.357+05:30	Drop Ceilings	services/4fc5f163-8ef2-4650-a207-60db776d0d74.webp	7f0e4a96-69ae-48ed-bdaf-717d9b7b714c
5b0bdbda-7976-4605-8778-63ce3e06bb9c	We craft bespoke woodwork, built-in shelving, and custom furniture for homes or businesses. Our artisans focus on quality, functionality, and unique design details.	2025-06-28 15:54:04.798+05:30	2025-03-15 00:19:14.359+05:30	Custom Work	services/591ad8f4-6f5f-458f-813a-c60b09305b44.webp	82039509-b495-4087-8fbb-db3dd0319e46
998e63a2-0350-4aa6-beff-1fbada9e56e2	Our tree services include removals, stump grinding, and emergency cutting for storm-damaged or hazardous trees. We ensure safety and preserve your property’s appearance.	2025-06-28 16:06:00.176+05:30	2025-03-15 00:19:14.345+05:30	Tree Service	services/e729d9f5-0d93-4e1f-8eaf-77fa7337c0d2.webp	7f0e4a96-69ae-48ed-bdaf-717d9b7b714c
4f521eeb-dc39-4dd4-8629-baaab6c8340b	Simplify cleanup with our dumpster rentals. We provide various container sizes for residential or construction debris, ensuring convenient waste disposal and efficient site management.	2025-06-28 15:18:20.021+05:30	2025-03-15 00:19:14.368+05:30	Dumpster Services	services/ae78adfa-0e35-4fd3-8c61-fb760c0608d6.webp	82039509-b495-4087-8fbb-db3dd0319e46
ff1a4dc8-662f-4b78-94e2-5e1b911a1a44	Recover from fire, water, or mold damage with our professional restoration. We repair structural components, remove contaminants, and restore your property to pre-loss condition.	2025-06-28 15:19:34.569+05:30	2025-03-15 00:19:14.367+05:30	Restoration Services	services/f4b8a84b-f31d-4605-ae37-d6e6804fcac4.webp	\N
1b7970d5-0303-4c55-a9ff-5083d7c89584	We handle tenant repair requests, routine maintenance, and emergency services for rental properties. Our management solutions ensure upkeep, timely responses, and a stress-free experience for owners.	2025-06-28 15:20:15.578+05:30	2025-03-15 00:19:14.365+05:30	Property Management	services/12696d98-1516-4902-9114-47f2c6d7e9db.webp	82039509-b495-4087-8fbb-db3dd0319e46
8d00f18a-604b-4686-ac14-bbdf42f3dcbb	Access quality materials at competitive prices. We supply bulk lumber, stone, tile, and metal framing components, ensuring reliable resources for your construction needs.	2025-06-28 15:48:47.851+05:30	2025-03-15 00:19:14.37+05:30	Materials Suppliers	services/6c1df04f-1cff-4876-b87f-175daa347ac0.webp	82039509-b495-4087-8fbb-db3dd0319e46
0da03003-9850-46fd-977b-19e24339da7b	From brick wall restorations to stone veneer installations, our expert masons handle various projects. We also repair chimneys, build outdoor fireplaces, and create stunning brick paver designs.	2025-06-28 16:36:14.419+05:30	2025-03-15 00:19:14.297+05:30	Masonry	services/dcdf4b1a-bdc1-47e9-b3ad-a8636bd31fca.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
34e0ea81-a07a-4ed4-b081-0875a6b98d84	Improve energy efficiency and comfort with our insulation services, from attic upgrades to spray foam applications. We also offer soundproofing solutions for noise reduction.	2025-06-28 15:14:19.792+05:30	2025-03-15 00:19:14.375+05:30	Insulation	services/7b525cee-9c37-40f4-8590-51221c027340.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
9ffd447e-2fb2-4832-b2af-d2367b8226d4	Secure a reliable water supply with well drilling, pump replacements, and water filtration. We ensure proper installation, routine maintenance, and efficient repairs for residential or commercial wells.	2025-06-28 15:51:04.029+05:30	2025-03-15 00:19:14.372+05:30	Well Installation & Repair	services/b5f2e4f7-f932-489a-a5ff-267cdb1e1389.webp	82039509-b495-4087-8fbb-db3dd0319e46
9ecdb21f-8e7e-4251-875b-2566a93d1a39	Create a strong first impression with home and office staging. We choose furnishings, decor, and layouts that showcase space potential, appealing to buyers or guests.	2025-06-28 15:52:00.807+05:30	2025-03-15 00:19:14.364+05:30	Staging Services	services/c4441c43-d2b9-445d-b3f7-80a6dc0d6696.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
9ade946f-7501-47b1-ab3b-a6aa0bec32cb	We offer expert finish carpentry, including crown molding, trim installations, stair railings, and custom cabinetry. Our detail-oriented approach enhances aesthetics and creates a polished interior.	2025-06-28 15:59:50.006+05:30	2025-03-15 00:19:14.353+05:30	Finish Carpentry	services/d00ef8ed-fb09-45c0-91f6-e24c3867e76c.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
54deab7e-f6ae-45a1-b19a-d12ca2f14e03	Enhance curb appeal with asphalt driveway paving and maintenance. We provide sealcoating, crack repairs, and resurfacing to keep your driveway smooth and protected.	2025-06-28 16:09:09.302+05:30	2025-03-15 00:19:14.342+05:30	Asphalt / Driveway	services/504f7216-c995-4983-8c21-11cdfe20f12a.webp	\N
00357a5a-9003-4ef9-9ad2-7d0a07027ba7	Transform kitchens, bathrooms, and fireplaces with custom granite or stone installations. We handle countertops, backsplashes, and flooring, adding elegance and lasting durability.	2025-06-28 16:16:47.234+05:30	2025-03-15 00:19:14.331+05:30	Granite & Stone Install	services/14a56892-f9c2-497f-b98f-9e736d6d50b0.webp	\N
be4c17ba-6015-4a81-9aa7-8efaa12333a7	Maintain a healthy landscape with our irrigation services, from leak detection and valve replacements to sprinkler repairs and drip installations. We optimize water usage and timing.	2025-06-28 16:26:14.585+05:30	2025-03-15 00:19:14.32+05:30	Irrigation System	services/a0ae9fb9-67b5-4f99-80cd-a2b7ac143262.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
8c399b67-44ad-4538-b8aa-a0b2db6178c2	Enhance your outdoor living with expertly built decks, porches, fences, and pergolas. We offer precise woodwork and repair services, ensuring durability and aesthetic appeal for any exterior project.	2025-06-28 16:33:11.082+05:30	2025-03-15 00:19:14.305+05:30	Exterior Carpentry	services/7e82fe2c-bbc2-496a-b452-3cf0f4746a1f.webp	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9
\.


--
-- Data for Name: SiteMeasurement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SiteMeasurement" (id, "projectId", length, width, height, area, "updatedAt", "createdAt", unit, description) FROM stdin;
fe8c6ed0-75d9-4c64-a223-915a8b39e88a	72afefed-b99b-4b2e-88fc-aaee880fc3fb	2.00	4.00	6.00	8.00	2025-03-09 17:09:26.39+05:30	2025-03-09 17:09:26.39+05:30	METER	\N
0ea62a54-eb4e-4fc8-b110-98d2a15d1e9a	22e3b58d-fc6f-4df6-b562-3d6b681a6326	2.00	4.00	6.00	8.00	2025-03-09 19:14:51.964+05:30	2025-03-09 19:14:51.964+05:30	METER	\N
fb35ed76-6310-437f-94aa-8050c9da0b09	0d6357fa-bc9c-4b57-a7a4-0b3b4ec5b652	2.00	4.00	6.00	8.00	2025-03-09 19:14:54.282+05:30	2025-03-09 19:14:54.282+05:30	METER	\N
8a1af920-79e0-489f-ba50-fee14df963a4	58144c41-81d0-403a-9817-bb8d7ab5c2e3	2.00	4.00	6.00	8.00	2025-03-09 19:14:54.73+05:30	2025-03-09 19:14:54.73+05:30	METER	\N
d5be75f8-04be-45c4-b219-f062f7ec136c	e8a099de-0ccd-4e58-b784-8a5b214b8e06	20.00	20.00	20.00	400.00	2025-03-16 16:10:59.754+05:30	2025-03-16 16:10:59.754+05:30	METER	\N
47fbff09-590a-45f1-a08b-16561d3e8145	2581861a-6f1f-4626-bcaf-43777bc260f5	20.00	20.00	20.00	400.00	2025-03-16 20:43:08.713+05:30	2025-03-16 20:43:08.713+05:30	METER	This is my site description.
c6237a35-5970-458b-95b1-8ec9c8318a85	9f50733f-b418-4215-8fbd-ea1efa8a83bc	\N	\N	\N	\N	2025-03-29 13:15:35.534+05:30	2025-03-29 13:15:35.534+05:30	METER	Hello
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tag" (id, name, "updatedAt", "createdAt", "serviceId") FROM stdin;
adbdf6d6-fb71-496e-b885-e1891f2aaef1	Wood Framing	2025-03-15 00:19:14.247+05:30	2025-03-15 00:19:14.247+05:30	f287a2c9-ec74-4ed6-bcb9-810179b9ffda
782b6170-cb3c-4ee2-8a91-5b5ef49df634	Metal Framing	2025-03-15 00:19:14.247+05:30	2025-03-15 00:19:14.247+05:30	f287a2c9-ec74-4ed6-bcb9-810179b9ffda
18e9aa5c-6ada-405d-90fd-1eab6d96c945	Load-Bearing Wall Removal	2025-03-15 00:19:14.247+05:30	2025-03-15 00:19:14.247+05:30	f287a2c9-ec74-4ed6-bcb9-810179b9ffda
f56631eb-fe11-4645-b22c-200ca35484c0	Structural Reinforcement	2025-03-15 00:19:14.247+05:30	2025-03-15 00:19:14.247+05:30	f287a2c9-ec74-4ed6-bcb9-810179b9ffda
ed27f31c-c674-4f59-983f-88b58fb66b97	Roof Trusses	2025-03-15 00:19:14.247+05:30	2025-03-15 00:19:14.247+05:30	f287a2c9-ec74-4ed6-bcb9-810179b9ffda
506b0784-bc08-4fde-add1-5ead17c3bf46	Beam Installation	2025-03-15 00:19:14.247+05:30	2025-03-15 00:19:14.247+05:30	f287a2c9-ec74-4ed6-bcb9-810179b9ffda
9302487e-6f97-4517-95b1-24fa58d6691f	Partition Walls	2025-03-15 00:19:14.247+05:30	2025-03-15 00:19:14.247+05:30	f287a2c9-ec74-4ed6-bcb9-810179b9ffda
0eb6e36b-07ce-4bb5-b25c-fe740ceecbca	Frame Repair	2025-03-15 00:19:14.247+05:30	2025-03-15 00:19:14.247+05:30	f287a2c9-ec74-4ed6-bcb9-810179b9ffda
996cb01f-7ab4-4e09-b8f5-f4b233800a48	Foundation Slab	2025-03-15 00:19:14.292+05:30	2025-03-15 00:19:14.292+05:30	2fe2bace-8ec9-4d36-8955-64c9902ccce3
320e5dfc-3c8e-412f-bf33-8164cc181920	Driveway Pouring	2025-03-15 00:19:14.292+05:30	2025-03-15 00:19:14.292+05:30	2fe2bace-8ec9-4d36-8955-64c9902ccce3
3ed89f4b-e8bb-4dba-be34-aeaf2ead2bf1	Sidewalk Repair	2025-03-15 00:19:14.292+05:30	2025-03-15 00:19:14.292+05:30	2fe2bace-8ec9-4d36-8955-64c9902ccce3
9fa76f25-a783-4684-a653-0e314b5c8cdb	Stamped Concrete	2025-03-15 00:19:14.292+05:30	2025-03-15 00:19:14.292+05:30	2fe2bace-8ec9-4d36-8955-64c9902ccce3
2c6df10e-14f1-4efd-bcc5-7136684eaba0	Concrete Cutting	2025-03-15 00:19:14.292+05:30	2025-03-15 00:19:14.292+05:30	2fe2bace-8ec9-4d36-8955-64c9902ccce3
cef64ca0-efa6-43fd-91ee-c5cc27db3fb3	Concrete Resurfacing	2025-03-15 00:19:14.292+05:30	2025-03-15 00:19:14.292+05:30	2fe2bace-8ec9-4d36-8955-64c9902ccce3
da707bdd-97c2-45d6-80cb-71221ebcb660	Retaining Walls	2025-03-15 00:19:14.292+05:30	2025-03-15 00:19:14.292+05:30	2fe2bace-8ec9-4d36-8955-64c9902ccce3
678e51f4-6618-4973-8266-4b05ac86e453	Concrete Steps	2025-03-15 00:19:14.292+05:30	2025-03-15 00:19:14.292+05:30	2fe2bace-8ec9-4d36-8955-64c9902ccce3
276a2368-c145-46c8-b79d-b2665bc8253f	Foundation Crack Repair	2025-03-15 00:19:14.294+05:30	2025-03-15 00:19:14.294+05:30	1f788053-ae28-487e-9910-67ffe0b3adb5
594ccf23-4312-4b3f-89f9-670ac3a19039	Slab Foundation Leveling	2025-03-15 00:19:14.294+05:30	2025-03-15 00:19:14.294+05:30	1f788053-ae28-487e-9910-67ffe0b3adb5
3298977d-7d07-40af-96e3-cf21dae51a73	Basement Foundation Repair	2025-03-15 00:19:14.294+05:30	2025-03-15 00:19:14.294+05:30	1f788053-ae28-487e-9910-67ffe0b3adb5
53567c60-660a-40b4-8b25-a0679766d9b8	Crawl Space Support	2025-03-15 00:19:14.294+05:30	2025-03-15 00:19:14.294+05:30	1f788053-ae28-487e-9910-67ffe0b3adb5
954b0b9a-2f63-4281-92a4-343cd5b89cf5	Waterproofing Foundation	2025-03-15 00:19:14.294+05:30	2025-03-15 00:19:14.294+05:30	1f788053-ae28-487e-9910-67ffe0b3adb5
c8ddcc48-f61c-40e3-9751-6c0f48d340e7	Structural Foundation Reinforcement	2025-03-15 00:19:14.294+05:30	2025-03-15 00:19:14.294+05:30	1f788053-ae28-487e-9910-67ffe0b3adb5
cd3ad3a6-281b-4077-9308-45106959e277	Brick Wall Repair	2025-03-15 00:19:14.297+05:30	2025-03-15 00:19:14.297+05:30	0da03003-9850-46fd-977b-19e24339da7b
f180d260-cc71-438f-ab4c-f2538388cee2	Stone Veneer Installation	2025-03-15 00:19:14.297+05:30	2025-03-15 00:19:14.297+05:30	0da03003-9850-46fd-977b-19e24339da7b
ae4aa298-08ee-4297-a191-c8d000260dc7	Chimney Repair	2025-03-15 00:19:14.297+05:30	2025-03-15 00:19:14.297+05:30	0da03003-9850-46fd-977b-19e24339da7b
7875c9a1-e532-4c9a-8e1f-dafa0407b195	Outdoor Fireplace	2025-03-15 00:19:14.297+05:30	2025-03-15 00:19:14.297+05:30	0da03003-9850-46fd-977b-19e24339da7b
2395619c-62b5-4b75-8a47-a7ba64222726	Brick Paver Installation	2025-03-15 00:19:14.297+05:30	2025-03-15 00:19:14.297+05:30	0da03003-9850-46fd-977b-19e24339da7b
c486361e-2120-4224-8c7b-b4e5cc5c789a	Stucco Masonry	2025-03-15 00:19:14.297+05:30	2025-03-15 00:19:14.297+05:30	0da03003-9850-46fd-977b-19e24339da7b
937be0d0-e03e-4660-ab10-875acc9839d6	Interior Demolition	2025-03-15 00:19:14.301+05:30	2025-03-15 00:19:14.301+05:30	8eeefac0-498e-43aa-9f12-b40e55c16966
6ef75c66-da59-4a8b-9e47-1fc1dde77819	Full Structure Tear-Down	2025-03-15 00:19:14.301+05:30	2025-03-15 00:19:14.301+05:30	8eeefac0-498e-43aa-9f12-b40e55c16966
1934d50d-2781-4e93-90b0-ec80eb803e30	Concrete Removal	2025-03-15 00:19:14.301+05:30	2025-03-15 00:19:14.301+05:30	8eeefac0-498e-43aa-9f12-b40e55c16966
ba3ea928-0af4-4e8a-b000-997c1d1dcc74	Drywall Removal	2025-03-15 00:19:14.301+05:30	2025-03-15 00:19:14.301+05:30	8eeefac0-498e-43aa-9f12-b40e55c16966
4f9b3ed8-f2b0-4f53-8068-b3e8539149b4	Selective Demolition	2025-03-15 00:19:14.301+05:30	2025-03-15 00:19:14.301+05:30	8eeefac0-498e-43aa-9f12-b40e55c16966
04e9de33-f7cd-4441-98b4-86f2212843c5	Junk & Debris Hauling	2025-03-15 00:19:14.301+05:30	2025-03-15 00:19:14.301+05:30	8eeefac0-498e-43aa-9f12-b40e55c16966
9679ed61-257e-4c3d-9c38-4fefbdd1d252	Stucco Repair	2025-03-15 00:19:14.303+05:30	2025-03-15 00:19:14.303+05:30	b41365c8-a8b6-411a-9250-0fa2e460b2c3
658d2deb-cafc-4857-ab2a-5b09acf484d9	New Stucco Application	2025-03-15 00:19:14.303+05:30	2025-03-15 00:19:14.303+05:30	b41365c8-a8b6-411a-9250-0fa2e460b2c3
4bed6d02-b119-440b-b4b1-88102ef57e23	Exterior Stucco Coating	2025-03-15 00:19:14.303+05:30	2025-03-15 00:19:14.303+05:30	b41365c8-a8b6-411a-9250-0fa2e460b2c3
0b59cde2-00fb-43f5-b6e3-14661d2ba989	Stucco Waterproofing	2025-03-15 00:19:14.303+05:30	2025-03-15 00:19:14.303+05:30	b41365c8-a8b6-411a-9250-0fa2e460b2c3
4546ce67-ceaa-402a-b7b3-d7d2934e1246	Color Matching	2025-03-15 00:19:14.303+05:30	2025-03-15 00:19:14.303+05:30	b41365c8-a8b6-411a-9250-0fa2e460b2c3
0075c0bd-ac71-49e3-a78c-1bf4589d89c4	Porch Repair	2025-03-15 00:19:14.305+05:30	2025-03-15 00:19:14.305+05:30	8c399b67-44ad-4538-b8aa-a0b2db6178c2
d7b76eff-607f-4e23-83d8-691337bb8c50	Deck Building	2025-03-15 00:19:14.305+05:30	2025-03-15 00:19:14.305+05:30	8c399b67-44ad-4538-b8aa-a0b2db6178c2
1b5c038e-3498-49e0-aaa7-ba9e0b65f5e8	Wooden Fences	2025-03-15 00:19:14.305+05:30	2025-03-15 00:19:14.305+05:30	8c399b67-44ad-4538-b8aa-a0b2db6178c2
5ff7d01f-a6c2-4822-b953-b0f237c93e8e	Outdoor Stairs	2025-03-15 00:19:14.305+05:30	2025-03-15 00:19:14.305+05:30	8c399b67-44ad-4538-b8aa-a0b2db6178c2
df1ad55e-6f8b-41b4-8dd1-994aea1e09e3	Pergolas & Gazebos	2025-03-15 00:19:14.305+05:30	2025-03-15 00:19:14.305+05:30	8c399b67-44ad-4538-b8aa-a0b2db6178c2
c9e7ae50-f028-42af-933c-357be3ff5425	Exterior Trim Repair	2025-03-15 00:19:14.305+05:30	2025-03-15 00:19:14.305+05:30	8c399b67-44ad-4538-b8aa-a0b2db6178c2
5a3a1e1c-4ae2-4fa1-9a8f-d8f41fe7cd01	Leaking Faucet	2025-03-15 00:19:14.308+05:30	2025-03-15 00:19:14.308+05:30	a0e7b523-2667-4617-9854-a7234f457f5a
05275436-7340-4baa-8cbf-5afd9e994f5b	Burst Pipe Repair	2025-03-15 00:19:14.308+05:30	2025-03-15 00:19:14.308+05:30	a0e7b523-2667-4617-9854-a7234f457f5a
37fc86a3-9554-416d-8c1e-86902ae3f057	Water Heater Repair	2025-03-15 00:19:14.308+05:30	2025-03-15 00:19:14.308+05:30	a0e7b523-2667-4617-9854-a7234f457f5a
db82fd29-4276-4278-b26f-6e9603aa6a59	Clogged Drain	2025-03-15 00:19:14.308+05:30	2025-03-15 00:19:14.308+05:30	a0e7b523-2667-4617-9854-a7234f457f5a
fa6b7955-708a-4f86-b0fb-5da64a7e0d0d	Toilet Installation	2025-03-15 00:19:14.308+05:30	2025-03-15 00:19:14.308+05:30	a0e7b523-2667-4617-9854-a7234f457f5a
05a5ebbd-2816-4ac9-ac85-a827301a5808	Sump Pump Repair	2025-03-15 00:19:14.308+05:30	2025-03-15 00:19:14.308+05:30	a0e7b523-2667-4617-9854-a7234f457f5a
8fb2b0bf-d806-4019-9526-f8f924a1fb05	Shower & Tub Installation	2025-03-15 00:19:14.308+05:30	2025-03-15 00:19:14.308+05:30	a0e7b523-2667-4617-9854-a7234f457f5a
4e95623d-2e0f-4f43-87aa-3b305ad9e78d	Garbage Disposal Repair	2025-03-15 00:19:14.308+05:30	2025-03-15 00:19:14.308+05:30	a0e7b523-2667-4617-9854-a7234f457f5a
37a232bc-0ffa-4c2a-9703-87114a35fed4	Gas Line Installation	2025-03-15 00:19:14.308+05:30	2025-03-15 00:19:14.308+05:30	a0e7b523-2667-4617-9854-a7234f457f5a
2a817416-e53d-4d74-b550-0a19882f5ae7	Light Fixture Installation	2025-03-15 00:19:14.311+05:30	2025-03-15 00:19:14.311+05:30	947ae27c-5c7e-4480-ad2c-59fb10f92bee
79294eaf-339f-4d8b-8c1d-973b724b9e3d	Wiring & Rewiring	2025-03-15 00:19:14.311+05:30	2025-03-15 00:19:14.311+05:30	947ae27c-5c7e-4480-ad2c-59fb10f92bee
e952e9aa-4c2f-4ae7-ac52-bbda9bfc572a	Electrical Panel Upgrade	2025-03-15 00:19:14.311+05:30	2025-03-15 00:19:14.311+05:30	947ae27c-5c7e-4480-ad2c-59fb10f92bee
685c5eb6-284e-4b8e-aa11-8c24287d56b2	Outlet Installation	2025-03-15 00:19:14.311+05:30	2025-03-15 00:19:14.311+05:30	947ae27c-5c7e-4480-ad2c-59fb10f92bee
4e2c5171-3c5e-4f98-b371-2c6ff83a61d7	Circuit Breaker Repair	2025-03-15 00:19:14.311+05:30	2025-03-15 00:19:14.311+05:30	947ae27c-5c7e-4480-ad2c-59fb10f92bee
35a8277b-7984-4630-8730-87f506b975a9	Generator Installation	2025-03-15 00:19:14.311+05:30	2025-03-15 00:19:14.311+05:30	947ae27c-5c7e-4480-ad2c-59fb10f92bee
96fb0dd2-f294-4d82-9d46-7901ae6026af	Smart Home Wiring	2025-03-15 00:19:14.311+05:30	2025-03-15 00:19:14.311+05:30	947ae27c-5c7e-4480-ad2c-59fb10f92bee
3b712aec-ac6c-483f-9b03-be40807449ce	EV Charger Installation	2025-03-15 00:19:14.311+05:30	2025-03-15 00:19:14.311+05:30	947ae27c-5c7e-4480-ad2c-59fb10f92bee
f8112e14-7e92-49ec-9b3c-d785d08fc032	AC Repair	2025-03-15 00:19:14.314+05:30	2025-03-15 00:19:14.314+05:30	48f8faeb-2b02-4e33-b1ba-ec29dc514329
5900ba33-922b-43c9-8856-e5ed25041500	AC Installation	2025-03-15 00:19:14.314+05:30	2025-03-15 00:19:14.314+05:30	48f8faeb-2b02-4e33-b1ba-ec29dc514329
d7c4ae65-7703-445d-9913-6856387f2ae9	Heating System Repair	2025-03-15 00:19:14.314+05:30	2025-03-15 00:19:14.314+05:30	48f8faeb-2b02-4e33-b1ba-ec29dc514329
94f2c3fb-6914-4a84-8007-b580a287e974	Thermostat Installation	2025-03-15 00:19:14.314+05:30	2025-03-15 00:19:14.314+05:30	48f8faeb-2b02-4e33-b1ba-ec29dc514329
99d831f3-5c95-490d-8ebf-6d0b3f60a80a	Ductwork Installation	2025-03-15 00:19:14.314+05:30	2025-03-15 00:19:14.314+05:30	48f8faeb-2b02-4e33-b1ba-ec29dc514329
4cb866a3-737d-418e-95a3-4113574ef736	Furnace Maintenance	2025-03-15 00:19:14.314+05:30	2025-03-15 00:19:14.314+05:30	48f8faeb-2b02-4e33-b1ba-ec29dc514329
ff6a2cd0-320b-4a23-b570-b8dde12e2ee6	Ventilation System Cleaning	2025-03-15 00:19:14.314+05:30	2025-03-15 00:19:14.314+05:30	48f8faeb-2b02-4e33-b1ba-ec29dc514329
9e252b10-25bd-4bc0-822b-8b1e274eec5a	Industrial Equipment Repair	2025-03-15 00:19:14.316+05:30	2025-03-15 00:19:14.316+05:30	e867a6e3-ee25-46ee-8152-5594ba20ac8d
ad7e042b-015c-434c-b191-43de2215ef9f	Air Compressors	2025-03-15 00:19:14.316+05:30	2025-03-15 00:19:14.316+05:30	e867a6e3-ee25-46ee-8152-5594ba20ac8d
2c83f658-82f5-4cdb-8749-c2288c3d0442	Ventilation Fans	2025-03-15 00:19:14.316+05:30	2025-03-15 00:19:14.316+05:30	e867a6e3-ee25-46ee-8152-5594ba20ac8d
9107fdfe-8764-486d-a509-cad2d5c0b253	Conveyor System Repair	2025-03-15 00:19:14.316+05:30	2025-03-15 00:19:14.316+05:30	e867a6e3-ee25-46ee-8152-5594ba20ac8d
79c226ea-6666-46e6-bc74-99b803686faa	Machine Maintenance	2025-03-15 00:19:14.316+05:30	2025-03-15 00:19:14.316+05:30	e867a6e3-ee25-46ee-8152-5594ba20ac8d
e1d092e5-b4e4-4a95-b974-dc6e4891fb17	Gas Line Repair	2025-03-15 00:19:14.318+05:30	2025-03-15 00:19:14.318+05:30	2037b176-b99a-4705-bb01-a48a75b06c4e
ddde0d1c-12f9-483a-a642-0c261da01793	Water Line Installation	2025-03-15 00:19:14.318+05:30	2025-03-15 00:19:14.318+05:30	2037b176-b99a-4705-bb01-a48a75b06c4e
ebf82914-ae08-4030-9e49-d0b1fc5d81c4	Electrical Pole Installation	2025-03-15 00:19:14.318+05:30	2025-03-15 00:19:14.318+05:30	2037b176-b99a-4705-bb01-a48a75b06c4e
f8e7be2b-b913-4667-879c-1b764ea18100	Utility Mapping	2025-03-15 00:19:14.318+05:30	2025-03-15 00:19:14.318+05:30	2037b176-b99a-4705-bb01-a48a75b06c4e
6b46c1db-c9b4-4396-a6a3-9ea37bfb0d83	Underground Wiring	2025-03-15 00:19:14.318+05:30	2025-03-15 00:19:14.318+05:30	2037b176-b99a-4705-bb01-a48a75b06c4e
d4161fc9-74d2-427e-a06a-241262532a63	Sprinkler System Repair	2025-03-15 00:19:14.32+05:30	2025-03-15 00:19:14.32+05:30	be4c17ba-6015-4a81-9aa7-8efaa12333a7
f381711b-ea68-4097-81d1-d49d6f09b997	Drip Irrigation Installation	2025-03-15 00:19:14.32+05:30	2025-03-15 00:19:14.32+05:30	be4c17ba-6015-4a81-9aa7-8efaa12333a7
e42b0739-5285-4643-8f0e-17c4e37299f8	Valve Replacement	2025-03-15 00:19:14.32+05:30	2025-03-15 00:19:14.32+05:30	be4c17ba-6015-4a81-9aa7-8efaa12333a7
88d88a3d-07ec-473e-a023-101e0a4663a9	Irrigation Timer Setup	2025-03-15 00:19:14.32+05:30	2025-03-15 00:19:14.32+05:30	be4c17ba-6015-4a81-9aa7-8efaa12333a7
c2cc6421-8740-4806-99e6-fe61e3e34847	Leak Detection	2025-03-15 00:19:14.32+05:30	2025-03-15 00:19:14.32+05:30	be4c17ba-6015-4a81-9aa7-8efaa12333a7
464b2fd8-ada7-426f-87ab-0ff91393d86f	Fire Sprinkler Installation	2025-03-15 00:19:14.322+05:30	2025-03-15 00:19:14.322+05:30	5326d998-a814-4bc7-a51b-2f3b7e336402
4065ab92-8dbc-4d13-9255-ff2d5a1fa419	Smoke Detector Installation	2025-03-15 00:19:14.322+05:30	2025-03-15 00:19:14.322+05:30	5326d998-a814-4bc7-a51b-2f3b7e336402
33497c00-62a1-42ab-8c15-4ef2899b2f25	Emergency Exit Signs	2025-03-15 00:19:14.322+05:30	2025-03-15 00:19:14.322+05:30	5326d998-a814-4bc7-a51b-2f3b7e336402
7dbddd8f-7bc4-4f21-b769-031f599c9986	Fire Alarm Testing	2025-03-15 00:19:14.322+05:30	2025-03-15 00:19:14.322+05:30	5326d998-a814-4bc7-a51b-2f3b7e336402
e567640a-26e2-4f3a-82a8-a8c4afc5adf9	Fireproofing	2025-03-15 00:19:14.322+05:30	2025-03-15 00:19:14.322+05:30	5326d998-a814-4bc7-a51b-2f3b7e336402
210b1297-cf68-45ee-89c2-2cfeba7a98a6	Roof Leak Repair	2025-03-15 00:19:14.324+05:30	2025-03-15 00:19:14.324+05:30	70d5a727-f889-449d-a4b2-9583337ddaf5
3da26280-a318-4fb5-91a3-5eb93407aa7a	Shingle Replacement	2025-03-15 00:19:14.324+05:30	2025-03-15 00:19:14.324+05:30	70d5a727-f889-449d-a4b2-9583337ddaf5
0bbf2086-ecb9-4e35-a189-ed3a86d27cc4	Metal Roof Installation	2025-03-15 00:19:14.324+05:30	2025-03-15 00:19:14.324+05:30	70d5a727-f889-449d-a4b2-9583337ddaf5
ad9ea03a-fd44-4492-8ab9-ee0f038f81fa	Flat Roof Repair	2025-03-15 00:19:14.324+05:30	2025-03-15 00:19:14.324+05:30	70d5a727-f889-449d-a4b2-9583337ddaf5
1db9a38c-563e-46e3-b4e5-a18f91ff9cd9	Skylight Installation	2025-03-15 00:19:14.324+05:30	2025-03-15 00:19:14.324+05:30	70d5a727-f889-449d-a4b2-9583337ddaf5
53a6659c-f68a-4570-9d0f-c3f82ec454cc	Roof Coating	2025-03-15 00:19:14.324+05:30	2025-03-15 00:19:14.324+05:30	70d5a727-f889-449d-a4b2-9583337ddaf5
0f3265ec-f0c9-4a96-adea-0e887eb5b758	Flashing Repair	2025-03-15 00:19:14.324+05:30	2025-03-15 00:19:14.324+05:30	70d5a727-f889-449d-a4b2-9583337ddaf5
4cc93ccd-33bc-452d-9b14-14cc4615d705	Gutter Cleaning	2025-03-15 00:19:14.326+05:30	2025-03-15 00:19:14.326+05:30	e48a92e4-2541-4015-8906-f387e2549062
bd39d3a3-d2d6-4314-a1ea-c4d8cb7bbe54	Gutter Guard Installation	2025-03-15 00:19:14.326+05:30	2025-03-15 00:19:14.326+05:30	e48a92e4-2541-4015-8906-f387e2549062
a95450a1-1744-4f98-8aaf-89dba5b6402d	Downspout Repair	2025-03-15 00:19:14.326+05:30	2025-03-15 00:19:14.326+05:30	e48a92e4-2541-4015-8906-f387e2549062
1b812867-2f59-472e-8b10-b92a59ad9e86	Seamless Gutter Installation	2025-03-15 00:19:14.326+05:30	2025-03-15 00:19:14.326+05:30	e48a92e4-2541-4015-8906-f387e2549062
4c57189c-cb6b-4e13-bef0-9eb21133db42	Gutter Replacement	2025-03-15 00:19:14.326+05:30	2025-03-15 00:19:14.326+05:30	e48a92e4-2541-4015-8906-f387e2549062
43a197c2-86b5-4b14-8b75-3b44366389d4	Basement Waterproofing	2025-03-15 00:19:14.328+05:30	2025-03-15 00:19:14.328+05:30	f321f007-7d03-4eda-83a6-947a344243aa
9f373690-7820-4c4d-b426-dbadaea562fa	Roof Sealing	2025-03-15 00:19:14.328+05:30	2025-03-15 00:19:14.328+05:30	f321f007-7d03-4eda-83a6-947a344243aa
8ec74262-5a9d-4dc6-aa51-02b6b5226f25	Exterior Wall Waterproofing	2025-03-15 00:19:14.328+05:30	2025-03-15 00:19:14.328+05:30	f321f007-7d03-4eda-83a6-947a344243aa
79b58202-a862-4685-8bf3-babb7852ced0	Concrete Sealing	2025-03-15 00:19:14.328+05:30	2025-03-15 00:19:14.328+05:30	f321f007-7d03-4eda-83a6-947a344243aa
63444d40-be59-4fb0-b695-3e33298ac23b	Crawl Space Waterproofing	2025-03-15 00:19:14.328+05:30	2025-03-15 00:19:14.328+05:30	f321f007-7d03-4eda-83a6-947a344243aa
d664ed4c-1d46-4e21-be5a-a31eca2793c6	Hardwood Floor Refinishing	2025-03-15 00:19:14.329+05:30	2025-03-15 00:19:14.329+05:30	583a9bda-ab90-4878-a4a7-0336db218529
61fe8d58-39e0-4796-a52d-8a232299f568	Tile Installation	2025-03-15 00:19:14.329+05:30	2025-03-15 00:19:14.329+05:30	583a9bda-ab90-4878-a4a7-0336db218529
0111a6d7-d902-48db-8044-b4631dd6975e	Carpet Replacement	2025-03-15 00:19:14.329+05:30	2025-03-15 00:19:14.329+05:30	583a9bda-ab90-4878-a4a7-0336db218529
3e00072a-0b1f-4000-b7f1-1fbf048c14ba	Vinyl & Laminate Flooring	2025-03-15 00:19:14.329+05:30	2025-03-15 00:19:14.329+05:30	583a9bda-ab90-4878-a4a7-0336db218529
8aa7fcf9-8833-4ebf-8906-0566d63bf37a	Epoxy Floor Coating	2025-03-15 00:19:14.329+05:30	2025-03-15 00:19:14.329+05:30	583a9bda-ab90-4878-a4a7-0336db218529
3b18d710-f23e-4ac4-9929-af78a35f37de	Subfloor Repair	2025-03-15 00:19:14.329+05:30	2025-03-15 00:19:14.329+05:30	583a9bda-ab90-4878-a4a7-0336db218529
2eca286e-4113-475f-a570-a1670bb48f4b	Granite Countertop Installation	2025-03-15 00:19:14.331+05:30	2025-03-15 00:19:14.331+05:30	00357a5a-9003-4ef9-9ad2-7d0a07027ba7
6e1fed6a-16c0-4bd1-a994-46d06c668327	Stone Flooring	2025-03-15 00:19:14.331+05:30	2025-03-15 00:19:14.331+05:30	00357a5a-9003-4ef9-9ad2-7d0a07027ba7
8b3c7486-e23c-465d-9c74-26ac9ef5b998	Backsplash Installation	2025-03-15 00:19:14.331+05:30	2025-03-15 00:19:14.331+05:30	00357a5a-9003-4ef9-9ad2-7d0a07027ba7
1367493f-b2ae-4dd6-b00a-39a0df75092f	Fireplace Stonework	2025-03-15 00:19:14.331+05:30	2025-03-15 00:19:14.331+05:30	00357a5a-9003-4ef9-9ad2-7d0a07027ba7
b359221f-f01f-43a0-8c8f-085e3eb234ae	Garage Floor Epoxy	2025-03-15 00:19:14.333+05:30	2025-03-15 00:19:14.333+05:30	613c2d41-b042-4126-b0ed-4ccd37d8b98a
39b5208e-897e-415d-b0d6-3aa77db96665	Warehouse Epoxy Coating	2025-03-15 00:19:14.333+05:30	2025-03-15 00:19:14.333+05:30	613c2d41-b042-4126-b0ed-4ccd37d8b98a
d2f73b92-53e1-4c86-ad7b-e6de4cbc6353	Anti-Slip Epoxy	2025-03-15 00:19:14.333+05:30	2025-03-15 00:19:14.333+05:30	613c2d41-b042-4126-b0ed-4ccd37d8b98a
805758fe-9b1d-4631-86e7-1e004b8682a4	Metallic Epoxy Finish	2025-03-15 00:19:14.333+05:30	2025-03-15 00:19:14.333+05:30	613c2d41-b042-4126-b0ed-4ccd37d8b98a
f8faec35-d534-4eea-b31d-810d1e3d874b	Bathroom Tile Installation	2025-03-15 00:19:14.335+05:30	2025-03-15 00:19:14.335+05:30	2388f4e4-cc9c-45cd-81df-5fb323bc3a40
202ff398-b5db-454f-bea4-37f0bfef2ded	Kitchen Backsplash	2025-03-15 00:19:14.335+05:30	2025-03-15 00:19:14.335+05:30	2388f4e4-cc9c-45cd-81df-5fb323bc3a40
90c2e7ab-5dfe-4d4e-9e1c-fef38dad7b02	Grout Repair	2025-03-15 00:19:14.335+05:30	2025-03-15 00:19:14.335+05:30	2388f4e4-cc9c-45cd-81df-5fb323bc3a40
0e383b56-c6a9-476d-bd4a-dfa7359a1d28	Mosaic Tile Work	2025-03-15 00:19:14.335+05:30	2025-03-15 00:19:14.335+05:30	2388f4e4-cc9c-45cd-81df-5fb323bc3a40
034ab7fc-7869-4323-a1a2-35409adacbfd	Tree Trimming	2025-03-15 00:19:14.336+05:30	2025-03-15 00:19:14.336+05:30	a0072499-2327-49d6-bc1b-4edd392a0c28
e6722dc7-2282-4ff8-92a9-d31146fd26e1	Lawn Resodding	2025-03-15 00:19:14.336+05:30	2025-03-15 00:19:14.336+05:30	a0072499-2327-49d6-bc1b-4edd392a0c28
629cfba5-9d58-414d-ba1f-3556158e0460	Outdoor Lighting Installation	2025-03-15 00:19:14.336+05:30	2025-03-15 00:19:14.336+05:30	a0072499-2327-49d6-bc1b-4edd392a0c28
c6220663-b82a-4e0c-8062-1128afd7d791	Artificial Turf Installation	2025-03-15 00:19:14.336+05:30	2025-03-15 00:19:14.336+05:30	a0072499-2327-49d6-bc1b-4edd392a0c28
310887bf-9532-41bb-bc54-0bfe67e7946d	Retaining Wall Landscaping	2025-03-15 00:19:14.336+05:30	2025-03-15 00:19:14.336+05:30	a0072499-2327-49d6-bc1b-4edd392a0c28
aae7c946-a319-42ad-a830-68b8d2b4dc62	Outdoor Drainage Solutions	2025-03-15 00:19:14.336+05:30	2025-03-15 00:19:14.336+05:30	a0072499-2327-49d6-bc1b-4edd392a0c28
e74a70b1-8671-480f-8e25-901fd258d68c	Retractable Awnings	2025-03-15 00:19:14.338+05:30	2025-03-15 00:19:14.338+05:30	d19e50db-d46a-4701-9112-af354d05f51e
fdfef08a-f325-4954-b4bb-824a19bc5cf0	Window Canopies	2025-03-15 00:19:14.338+05:30	2025-03-15 00:19:14.338+05:30	d19e50db-d46a-4701-9112-af354d05f51e
dd960908-63d0-4a94-9369-25eec7d3cbc1	Pergola Covers	2025-03-15 00:19:14.338+05:30	2025-03-15 00:19:14.338+05:30	d19e50db-d46a-4701-9112-af354d05f51e
40cb48fa-55f0-4434-97c1-63b9c50622e3	Patio Awning Installation	2025-03-15 00:19:14.338+05:30	2025-03-15 00:19:14.338+05:30	d19e50db-d46a-4701-9112-af354d05f51e
e57a2d71-b9fa-4e16-912a-f5f414626e27	Land Leveling	2025-03-15 00:19:14.34+05:30	2025-03-15 00:19:14.34+05:30	a6a0102f-262f-4610-990e-ed81bf6c1826
9644c98c-7831-4822-85b5-cbf4f07216fe	Drainage Grading	2025-03-15 00:19:14.34+05:30	2025-03-15 00:19:14.34+05:30	a6a0102f-262f-4610-990e-ed81bf6c1826
03c723be-387b-4283-9ce7-d26966452e6e	Soil Erosion Control	2025-03-15 00:19:14.34+05:30	2025-03-15 00:19:14.34+05:30	a6a0102f-262f-4610-990e-ed81bf6c1826
f9b5e5b6-0da7-4789-973e-849fa631a1d8	Driveway Paving	2025-03-15 00:19:14.342+05:30	2025-03-15 00:19:14.342+05:30	54deab7e-f6ae-45a1-b19a-d12ca2f14e03
376010b8-3450-4e43-b1c0-d3159c364bd8	Asphalt Sealcoating	2025-03-15 00:19:14.342+05:30	2025-03-15 00:19:14.342+05:30	54deab7e-f6ae-45a1-b19a-d12ca2f14e03
ed55a2d6-2e77-4e9e-ab8a-6724d34a0bdd	Crack Repair	2025-03-15 00:19:14.342+05:30	2025-03-15 00:19:14.342+05:30	54deab7e-f6ae-45a1-b19a-d12ca2f14e03
81f27256-e1bc-4c7d-a0de-671463608bbc	Resurfacing	2025-03-15 00:19:14.342+05:30	2025-03-15 00:19:14.342+05:30	54deab7e-f6ae-45a1-b19a-d12ca2f14e03
fe2731fa-308d-40f4-971a-501ea9603fa7	Lawn Seeding	2025-03-15 00:19:14.343+05:30	2025-03-15 00:19:14.343+05:30	f6318a72-8133-4bf7-9ee8-470f19511b48
e5fb4cf5-a930-4e28-a831-5750525f1fdf	Sod Installation	2025-03-15 00:19:14.343+05:30	2025-03-15 00:19:14.343+05:30	f6318a72-8133-4bf7-9ee8-470f19511b48
9cbab8a3-5b5f-44fd-ae43-fad14b0e4623	Turf Removal	2025-03-15 00:19:14.343+05:30	2025-03-15 00:19:14.343+05:30	f6318a72-8133-4bf7-9ee8-470f19511b48
de5360c1-71bc-4558-a8a6-06e11bef6765	Tree Removal	2025-03-15 00:19:14.345+05:30	2025-03-15 00:19:14.345+05:30	998e63a2-0350-4aa6-beff-1fbada9e56e2
0c42942f-7d00-4154-8ff8-e84ef0938a86	Stump Grinding	2025-03-15 00:19:14.345+05:30	2025-03-15 00:19:14.345+05:30	998e63a2-0350-4aa6-beff-1fbada9e56e2
2bb85893-1afa-47bb-81ea-cf50cffe6933	Emergency Tree Cutting	2025-03-15 00:19:14.345+05:30	2025-03-15 00:19:14.345+05:30	998e63a2-0350-4aa6-beff-1fbada9e56e2
ce24f449-f6f6-4419-93cb-060c2c9053ac	Sewer Line Tap	2025-03-15 00:19:14.346+05:30	2025-03-15 00:19:14.346+05:30	204d2363-685a-40cd-b41b-05a1cc3ab0a3
c5f805ec-29e0-4737-aa53-028a5333f020	Water Main Connection	2025-03-15 00:19:14.346+05:30	2025-03-15 00:19:14.346+05:30	204d2363-685a-40cd-b41b-05a1cc3ab0a3
77e74027-5c37-4c8f-a9a2-32c8f2975097	Gas Tap Service	2025-03-15 00:19:14.346+05:30	2025-03-15 00:19:14.346+05:30	204d2363-685a-40cd-b41b-05a1cc3ab0a3
1ac5fa0e-ba5d-4f96-80c6-fe0fb065546d	Drywall Installation	2025-03-15 00:19:14.349+05:30	2025-03-15 00:19:14.349+05:30	a20a556c-cc71-48fd-a13a-1a8cfd814f17
f1801d97-f51f-4c40-9d3b-e45c61fb52fd	Ceiling Repair	2025-03-15 00:19:14.349+05:30	2025-03-15 00:19:14.349+05:30	a20a556c-cc71-48fd-a13a-1a8cfd814f17
6fb0df37-9073-4a0c-9c10-cc44ffa4fc5c	Drywall Patching	2025-03-15 00:19:14.349+05:30	2025-03-15 00:19:14.349+05:30	a20a556c-cc71-48fd-a13a-1a8cfd814f17
df046dd6-ebcc-485e-b573-688138c2b03d	Popcorn Ceiling Removal	2025-03-15 00:19:14.349+05:30	2025-03-15 00:19:14.349+05:30	a20a556c-cc71-48fd-a13a-1a8cfd814f17
ec1f8229-36cb-486b-9a0c-5e62a38fb71e	Interior Wall Painting	2025-03-15 00:19:14.351+05:30	2025-03-15 00:19:14.351+05:30	86532f3b-fd86-4781-aa55-f06d136492bf
9e8f72ed-d6a0-47e5-b236-d1af5a63016b	Exterior House Painting	2025-03-15 00:19:14.351+05:30	2025-03-15 00:19:14.351+05:30	86532f3b-fd86-4781-aa55-f06d136492bf
6ad40941-dc7b-4932-b60c-7756093250ef	Cabinet Painting	2025-03-15 00:19:14.351+05:30	2025-03-15 00:19:14.351+05:30	86532f3b-fd86-4781-aa55-f06d136492bf
7c0c3ce2-5839-43eb-ad01-535431de9e1c	Epoxy Paint Finishing	2025-03-15 00:19:14.351+05:30	2025-03-15 00:19:14.351+05:30	86532f3b-fd86-4781-aa55-f06d136492bf
aebbd25f-fb90-4170-bb94-89abb2a2510d	Crown Molding Installation	2025-03-15 00:19:14.353+05:30	2025-03-15 00:19:14.353+05:30	9ade946f-7501-47b1-ab3b-a6aa0bec32cb
19ad64eb-a67b-4d45-99da-c44622a81e60	Trim & Baseboards	2025-03-15 00:19:14.353+05:30	2025-03-15 00:19:14.353+05:30	9ade946f-7501-47b1-ab3b-a6aa0bec32cb
b567402f-1cfa-4bb0-95a1-3ab81b60210f	Custom Cabinets	2025-03-15 00:19:14.353+05:30	2025-03-15 00:19:14.353+05:30	9ade946f-7501-47b1-ab3b-a6aa0bec32cb
d0711c78-54f5-4577-aa7c-e58fd69173f0	Stair Railings	2025-03-15 00:19:14.353+05:30	2025-03-15 00:19:14.353+05:30	9ade946f-7501-47b1-ab3b-a6aa0bec32cb
71661956-3e35-4bee-a578-ac7afb1ba419	Window Replacement	2025-03-15 00:19:14.354+05:30	2025-03-15 00:19:14.354+05:30	2347c376-962f-42a9-900c-46b0711140a0
424c140f-5490-47eb-aa4f-182493d6afbd	Storm Window Installation	2025-03-15 00:19:14.354+05:30	2025-03-15 00:19:14.354+05:30	2347c376-962f-42a9-900c-46b0711140a0
9c4fd022-90eb-4ca4-9a35-16edbaf2a21a	Glass Repair	2025-03-15 00:19:14.354+05:30	2025-03-15 00:19:14.354+05:30	2347c376-962f-42a9-900c-46b0711140a0
c84a1fcf-6aaa-4c8a-880e-147f240d62d6	Window Tinting	2025-03-15 00:19:14.354+05:30	2025-03-15 00:19:14.354+05:30	2347c376-962f-42a9-900c-46b0711140a0
21f5815d-7083-4430-9dc9-b447067ad48c	Garage Door Opener Installation	2025-03-15 00:19:14.356+05:30	2025-03-15 00:19:14.356+05:30	4c434225-84e0-497c-ab37-852914135672
58501cb9-fe06-4ac4-8e84-64bfe46f6f23	Spring Replacement	2025-03-15 00:19:14.356+05:30	2025-03-15 00:19:14.356+05:30	4c434225-84e0-497c-ab37-852914135672
701fbe07-f5b1-4395-bc79-a3a09a20b544	Garage Door Insulation	2025-03-15 00:19:14.356+05:30	2025-03-15 00:19:14.356+05:30	4c434225-84e0-497c-ab37-852914135672
65d9d6ab-5ab1-4742-b7ba-eef462190830	Suspended Ceiling Installation	2025-03-15 00:19:14.357+05:30	2025-03-15 00:19:14.357+05:30	4ba22b58-fcce-437d-a1c9-8e9fd38a5629
82cca6f0-5ff6-4ef6-9d48-762cdec593eb	Acoustic Tile Replacement	2025-03-15 00:19:14.357+05:30	2025-03-15 00:19:14.357+05:30	4ba22b58-fcce-437d-a1c9-8e9fd38a5629
95238de5-789b-4e2a-914d-8258517134ae	Built-In Shelving	2025-03-15 00:19:14.359+05:30	2025-03-15 00:19:14.359+05:30	5b0bdbda-7976-4605-8778-63ce3e06bb9c
3e8a72d4-303b-48b6-9c3a-7974764a71fe	Custom Furniture	2025-03-15 00:19:14.359+05:30	2025-03-15 00:19:14.359+05:30	5b0bdbda-7976-4605-8778-63ce3e06bb9c
7f535293-0096-4e2e-aaf0-cf091a56d147	Interior Woodwork	2025-03-15 00:19:14.359+05:30	2025-03-15 00:19:14.359+05:30	5b0bdbda-7976-4605-8778-63ce3e06bb9c
66505cf5-a195-448d-83b1-6e7b3d12748a	Drafting & Blueprints	2025-03-15 00:19:14.361+05:30	2025-03-15 00:19:14.361+05:30	1ea07acc-b317-4d58-b261-284ae66c3346
f33a2679-f772-430b-b27f-b2b9ae4ce99d	Structural Design	2025-03-15 00:19:14.361+05:30	2025-03-15 00:19:14.361+05:30	1ea07acc-b317-4d58-b261-284ae66c3346
e9e3d647-b36b-4d16-8189-eaa40672ebc8	Home Expansion Planning	2025-03-15 00:19:14.361+05:30	2025-03-15 00:19:14.361+05:30	1ea07acc-b317-4d58-b261-284ae66c3346
d7b34625-eae8-4012-bcf2-163d78efd5dd	Load Calculations	2025-03-15 00:19:14.362+05:30	2025-03-15 00:19:14.362+05:30	3fffadfb-7449-4f2b-a747-ffb8849bf4ad
89ce9c0c-9fb6-47d3-b99e-dfa93c919475	Building Code Compliance	2025-03-15 00:19:14.362+05:30	2025-03-15 00:19:14.362+05:30	3fffadfb-7449-4f2b-a747-ffb8849bf4ad
96e14dd9-62cf-40f7-831b-353f835e2308	Site Planning	2025-03-15 00:19:14.362+05:30	2025-03-15 00:19:14.362+05:30	3fffadfb-7449-4f2b-a747-ffb8849bf4ad
a70e8f3a-5429-49f7-be34-bbdb2ae4a07b	Home Staging for Sale	2025-03-15 00:19:14.364+05:30	2025-03-15 00:19:14.364+05:30	9ecdb21f-8e7e-4251-875b-2566a93d1a39
020b931f-8660-4d56-9a0a-b7241ee1e726	Office Space Staging	2025-03-15 00:19:14.364+05:30	2025-03-15 00:19:14.364+05:30	9ecdb21f-8e7e-4251-875b-2566a93d1a39
c969e8b3-2288-4b2f-a19d-28d78466c881	Tenant Repair Requests	2025-03-15 00:19:14.365+05:30	2025-03-15 00:19:14.365+05:30	1b7970d5-0303-4c55-a9ff-5083d7c89584
88443510-7115-48fb-ac85-17787a4241db	Rental Property Maintenance	2025-03-15 00:19:14.365+05:30	2025-03-15 00:19:14.365+05:30	1b7970d5-0303-4c55-a9ff-5083d7c89584
a4245741-7064-4ab2-9353-f5928a33007f	Emergency Property Services	2025-03-15 00:19:14.365+05:30	2025-03-15 00:19:14.365+05:30	1b7970d5-0303-4c55-a9ff-5083d7c89584
ff33d294-cd22-40f5-9e07-dc25e5761f1d	Fire Damage Restoration	2025-03-15 00:19:14.367+05:30	2025-03-15 00:19:14.367+05:30	ff1a4dc8-662f-4b78-94e2-5e1b911a1a44
a2857a89-71d5-4646-82bd-2423740bf467	Water Damage Cleanup	2025-03-15 00:19:14.367+05:30	2025-03-15 00:19:14.367+05:30	ff1a4dc8-662f-4b78-94e2-5e1b911a1a44
3473d8e4-041e-492d-bebb-723d0341fbc2	Mold Remediation	2025-03-15 00:19:14.367+05:30	2025-03-15 00:19:14.367+05:30	ff1a4dc8-662f-4b78-94e2-5e1b911a1a44
32429c83-f63e-47d3-8b87-69ec6d691f7b	Residential Dumpster Rental	2025-03-15 00:19:14.368+05:30	2025-03-15 00:19:14.368+05:30	4f521eeb-dc39-4dd4-8629-baaab6c8340b
202b9295-0b03-49d8-9d4c-cd5e5af4256a	Construction Debris Hauling	2025-03-15 00:19:14.368+05:30	2025-03-15 00:19:14.368+05:30	4f521eeb-dc39-4dd4-8629-baaab6c8340b
605e549b-1460-493c-a4da-29b6bf03d087	Bulk Lumber Supply	2025-03-15 00:19:14.37+05:30	2025-03-15 00:19:14.37+05:30	8d00f18a-604b-4686-ac14-bbdf42f3dcbb
96678ae9-17b9-4501-a58c-090c7ea2cd3c	Stone & Tile Wholesale	2025-03-15 00:19:14.37+05:30	2025-03-15 00:19:14.37+05:30	8d00f18a-604b-4686-ac14-bbdf42f3dcbb
f8831872-e662-4025-9d9d-f61cf580ea84	Metal Framing Materials	2025-03-15 00:19:14.37+05:30	2025-03-15 00:19:14.37+05:30	8d00f18a-604b-4686-ac14-bbdf42f3dcbb
ed41d5e5-9dbc-4970-8734-78727a360d26	Septic Tank Pumping	2025-03-15 00:19:14.371+05:30	2025-03-15 00:19:14.371+05:30	36143573-976b-4734-82d1-85aa54edd513
481b416c-9430-41b7-8385-27686a72810f	New Septic Installation	2025-03-15 00:19:14.371+05:30	2025-03-15 00:19:14.371+05:30	36143573-976b-4734-82d1-85aa54edd513
793f5927-5416-4145-8c6b-bd9b6a2e7ac1	Drain Field Repair	2025-03-15 00:19:14.371+05:30	2025-03-15 00:19:14.371+05:30	36143573-976b-4734-82d1-85aa54edd513
f760f9dc-ae6a-4839-974f-dba2ae53ddff	Well Drilling	2025-03-15 00:19:14.372+05:30	2025-03-15 00:19:14.372+05:30	9ffd447e-2fb2-4832-b2af-d2367b8226d4
aaec3a6b-7899-4334-bafa-ff30edc09759	Pump Replacement	2025-03-15 00:19:14.372+05:30	2025-03-15 00:19:14.372+05:30	9ffd447e-2fb2-4832-b2af-d2367b8226d4
6c7691f6-d6dd-4d13-87a1-be7da3091157	Water Filtration Systems	2025-03-15 00:19:14.372+05:30	2025-03-15 00:19:14.372+05:30	9ffd447e-2fb2-4832-b2af-d2367b8226d4
74a4a78d-2537-42c0-bb15-3f49fb891430	Gas Fireplace Installation	2025-03-15 00:19:14.374+05:30	2025-03-15 00:19:14.374+05:30	f57e3bbd-dd23-4230-8ba9-3258e6e10069
3f42d269-f9d1-46fc-91a0-19f0bc8698ef	Chimney Sweeping	2025-03-15 00:19:14.374+05:30	2025-03-15 00:19:14.374+05:30	f57e3bbd-dd23-4230-8ba9-3258e6e10069
e41097df-072b-4336-89d7-4b2c13c109b4	Wood Stove Repair	2025-03-15 00:19:14.374+05:30	2025-03-15 00:19:14.374+05:30	f57e3bbd-dd23-4230-8ba9-3258e6e10069
7e3bf1af-3908-4c98-8d13-c04abb76ba08	Attic Insulation	2025-03-15 00:19:14.375+05:30	2025-03-15 00:19:14.375+05:30	34e0ea81-a07a-4ed4-b081-0875a6b98d84
581dc284-51b1-48db-8a91-ff4aa345db3c	Spray Foam Installation	2025-03-15 00:19:14.375+05:30	2025-03-15 00:19:14.375+05:30	34e0ea81-a07a-4ed4-b081-0875a6b98d84
9cc6902e-83bf-456e-83f3-fe7557ce82bd	Soundproofing	2025-03-15 00:19:14.375+05:30	2025-03-15 00:19:14.375+05:30	34e0ea81-a07a-4ed4-b081-0875a6b98d84
eaee4fd2-4e28-44a5-9282-904d9aee83c6	Office Buildouts	2025-03-15 00:19:14.377+05:30	2025-03-15 00:19:14.377+05:30	12e76f71-9da0-4a9a-8e0f-40ab6e5c6a05
ec8d735a-63f4-429a-9dc5-42c532513dff	Retail Space Remodeling	2025-03-15 00:19:14.377+05:30	2025-03-15 00:19:14.377+05:30	12e76f71-9da0-4a9a-8e0f-40ab6e5c6a05
1ce0871e-a865-44a5-938f-6a7f6732fa28	Warehouse Expansions	2025-03-15 00:19:14.377+05:30	2025-03-15 00:19:14.377+05:30	12e76f71-9da0-4a9a-8e0f-40ab6e5c6a05
fc620971-1974-4e8a-b659-3b17d715afa5	Business Signs	2025-03-15 00:19:14.378+05:30	2025-03-15 00:19:14.378+05:30	29f7c2e4-73ff-4801-a28a-0750ce1005e2
c3d9f4f0-b068-49c1-9431-503d8d1600a0	LED Signboard Installation	2025-03-15 00:19:14.378+05:30	2025-03-15 00:19:14.378+05:30	29f7c2e4-73ff-4801-a28a-0750ce1005e2
4268d6c9-1d94-4134-9baa-6031b8aadb3d	Billboard Repairs	2025-03-15 00:19:14.378+05:30	2025-03-15 00:19:14.378+05:30	29f7c2e4-73ff-4801-a28a-0750ce1005e2
\.


--
-- Data for Name: Testimonial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Testimonial" (id, "userId", rating, title, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, "isEmailVerified", "isActive", "updatedAt", "createdAt", role, "sameAsAddress", "serviceDistance", "isPhoneVerified", phone, "budgetPreference") FROM stdin;
f6cea268-8eda-4f3a-a207-5da7994240f1	sam@mosaic.com	$2b$10$KGt3bEkaXDDEP83cYAtYNukQ.vvBqjMaI0dI9lK2cYF5YgiKgeJ2q	t	t	2025-02-25 00:39:53.296+05:30	2025-02-24 22:27:44.793+05:30	ADMIN	f	50	f	\N	5
eec01203-9c0f-4dad-a1c9-cab74a6aa2a9	vishal@gmail.com	$2b$10$1IE4I.RdzeXpPEI097j/leYkDrBiVTJRm93rR7Ti2d0Te/bHKdV/2	f	t	2025-06-12 01:10:53.455+05:30	2025-06-12 01:08:31.206+05:30	VENDOR	t	50	f	\N	5
571b4a2b-ff4f-4931-bb82-910e72b5d20d	vishal.service@gmail.com	$2b$10$pCP6fbqoqxeg.78TOlJTM./aFjxUyFsrGHffHeZCxdy6JRejqLar6	f	t	2025-06-12 01:42:32.451+05:30	2025-06-12 01:41:42.438+05:30	VENDOR	t	1226	f	\N	5
9bd611de-aeda-494d-806d-c0aed4f2aee1	user@mosaic.com	$2b$10$NkCwYhbEkHdlkhEdO2BxgeFUY9tXck/tEj66ooa6ECDwLcNNXIW02	t	t	2025-04-13 20:03:06.942+05:30	2025-02-24 22:27:44.874+05:30	USER	f	50	f	\N	5
714bc6d9-e1b4-4500-a04e-b2112842236e	vendor6@mosaic.com	$2b$10$sQPPY2ocV/AH7Dy2EvdJGe6ZOKyo.y1NxN/kZGQ.e0nOeHGumna4K	f	t	2025-06-14 21:15:24.866+05:30	2025-06-12 01:28:27.276+05:30	VENDOR	t	1000	f	+1234567890	5
5a68f781-f500-4d70-a1d0-fcb71e19e048	home@gmail.com	$2b$10$r07YZuk3n7BjL7bnvsPjWO26JwNfnNTG94JnMMtMFtkYJjyNp46Ji	t	f	2025-04-13 20:47:33.715+05:30	2025-03-09 21:53:33.175+05:30	USER	f	50	f	\N	5
c24365b9-b0b5-4e1c-8e16-8a5e42513ac0	monissiddiqi123@gmail.com	$2b$10$LNmXVwz7lle5O4QqGfypOOvHIQ91pkW4X4l77aocLDZs77ILZz6qe	f	t	2025-06-21 15:58:15.803+05:30	2025-06-21 15:26:51.806+05:30	USER	f	100	f	+17557503282	5
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	vendor@mosaic.com	$2b$10$8pb1tfR1iBPFSaB5lLKio.grfFH9S9Za9jvfoV4a0dhK2Kav/4BAm	t	t	2025-04-13 21:17:37.71+05:30	2025-03-04 22:05:16.325+05:30	VENDOR	f	50	f	\N	5
88d44268-8f35-4885-9537-4c6b5608fe15	vendor@budget.com	$2b$10$WE0C7X27YETgLTzuDoG4hOOF4dEWnUllvOkIOIFKbAa5WMzbA8Oi2	f	t	2025-06-21 17:03:57.673+05:30	2025-06-21 16:59:38.114+05:30	VENDOR	t	100	f	+17557503283	7
012a7d28-f472-43f6-a21b-a91c44ad6667	vendor1@mosaic.com	$2b$10$T/urmg49GHGoPKvD1nihg.DMGB4cGHZdv5GSQ96XrgoCSYg1v/aGC	t	t	2025-06-04 22:25:15.233+05:30	2025-06-04 22:23:53.471+05:30	VENDOR	f	50	f	\N	5
d44e1c1f-77b7-44dd-bdf1-e2a5cea006dd	vendor2@mosaic.com	$2b$10$cqwBpTK4ExZgvSEkX5Kz4.vh4mxrXOvqpUrPIsFsivLBG/TDZWvM6	f	t	2025-06-04 22:26:09.477+05:30	2025-06-04 22:26:09.477+05:30	VENDOR	t	50	f	\N	5
facc1e9e-db53-4fec-9d5a-aedafb1e863b	vendor3@gmail.com	$2b$10$nZq8SsqGbyKLT0dIfD0aoubQSyvC.z/VTUFYZIgl1GOq3YWdVu7Ca	t	t	2025-06-04 23:21:34.965+05:30	2025-06-04 23:13:20.619+05:30	VENDOR	t	50	f	\N	5
11ecf0a7-2d61-4296-924d-7a9863944696	vendor4@gmail.com	$2b$10$ROAI1gXMmU8VM5yQrsq1k.wlOoRRl4/462Iz8bsxOUZHA0VtdRi4u	t	t	2025-06-04 23:37:10.277+05:30	2025-06-04 23:35:08.794+05:30	VENDOR	f	50	f	\N	5
\.


--
-- Data for Name: UserCoupon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserCoupon" (id, "couponId", "userId", "updatedAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: UserPlan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserPlan" (id, "userId", "couponId", "paymentId", "startDate", "endDate", type, mode, "updatedAt", "createdAt", "planId", amount) FROM stdin;
fe1ef5c0-1942-4381-9027-02d8a1ace2f0	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	\N	abc123	2025-06-02 19:51:50.01	2025-07-02 19:51:50.01	MONTHLY	PAID	2025-06-02 19:57:18.233	2025-06-02 19:51:50.071	1ea4a0df-c42e-438b-a5c9-1eab27ee08b9	80
\.


--
-- Data for Name: UserProfile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserProfile" (id, "userId", name, "updatedAt", "createdAt", image, license) FROM stdin;
6633072b-3e7d-404e-bf6f-961ec6ab5eb0	571b4a2b-ff4f-4931-bb82-910e72b5d20d	Vishal with service distance updated	2025-06-12 01:42:32.451+05:30	2025-06-12 01:41:42.438+05:30	\N	\N
f697da73-ff2f-433c-b3f8-a0021e4346f7	714bc6d9-e1b4-4500-a04e-b2112842236e	Vendor with service distance from postman	2025-06-14 21:15:24.866+05:30	2025-06-12 01:28:27.276+05:30	\N	\N
bfdc148c-8bbd-42f4-8510-f4ba84574487	c24365b9-b0b5-4e1c-8e16-8a5e42513ac0	Monis Siddiqi	2025-06-21 15:58:15.803+05:30	2025-06-21 15:26:51.806+05:30	\N	\N
60c468d4-bd49-491f-a960-67d325abc3e0	88d44268-8f35-4885-9537-4c6b5608fe15	Vendor with Budget Preference	2025-06-21 17:03:57.673+05:30	2025-06-21 16:59:38.114+05:30	\N	\N
496b2ce8-d931-4b04-8900-6cb37c90cbdf	4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	John	2025-03-07 23:29:59.333+05:30	2025-03-04 22:05:16.325+05:30	users/1c2f2803-52c9-4acc-9ace-c227e3cbcb8c.jpg	\N
a4b1dc78-357a-4a5d-ae80-7508370b4248	9bd611de-aeda-494d-806d-c0aed4f2aee1	Jack	2025-03-09 12:22:08.564+05:30	2025-02-24 22:27:44.874+05:30	\N	\N
2aabf58e-75ae-4714-8344-8a99d478224f	f6cea268-8eda-4f3a-a207-5da7994240f1	Sam	2025-03-09 19:38:06.39+05:30	2025-02-24 22:27:44.793+05:30	users/4556098f-1b0c-46c1-9244-ed1af2404d1c.jpg	\N
cd07e256-36f5-4d36-b51b-62d05a9b8ec4	5a68f781-f500-4d70-a1d0-fcb71e19e048	Home Owner	2025-03-09 21:53:33.175+05:30	2025-03-09 21:53:33.175+05:30	\N	\N
0283c1a2-15d9-4ff2-af79-e18c561c6195	012a7d28-f472-43f6-a21b-a91c44ad6667	Vendor 1	2025-06-04 22:23:53.471+05:30	2025-06-04 22:23:53.471+05:30	\N	\N
2c1dc6cf-79e1-4026-bdfc-01f15ee819b2	d44e1c1f-77b7-44dd-bdf1-e2a5cea006dd	Vendor 2	2025-06-04 22:26:09.477+05:30	2025-06-04 22:26:09.477+05:30	\N	\N
6552b3be-b973-4ae7-8577-30de974869bf	facc1e9e-db53-4fec-9d5a-aedafb1e863b	Vendor 3	2025-06-04 23:13:20.619+05:30	2025-06-04 23:13:20.619+05:30	\N	\N
d7fb6819-6be0-4387-a615-bd8de2a68fb6	11ecf0a7-2d61-4296-924d-7a9863944696	Vendor 4	2025-06-04 23:35:08.794+05:30	2025-06-04 23:35:08.794+05:30	\N	\N
8254304d-7568-453a-9a9e-9cf2206bdc41	eec01203-9c0f-4dad-a1c9-cab74a6aa2a9	Vishal	2025-06-12 01:10:53.455+05:30	2025-06-12 01:08:31.206+05:30	\N	\N
\.


--
-- Data for Name: VendorService; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VendorService" ("userId", "serviceId", "createdAt", "updatedAt") FROM stdin;
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	f321f007-7d03-4eda-83a6-947a344243aa	2025-05-01 19:25:59.264+05:30	2025-05-01 19:25:59.264+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	613c2d41-b042-4126-b0ed-4ccd37d8b98a	2025-05-01 19:26:10.347+05:30	2025-05-01 19:26:10.347+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	2037b176-b99a-4705-bb01-a48a75b06c4e	2025-05-31 01:59:14.083+05:30	2025-05-31 01:59:14.083+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	0da03003-9850-46fd-977b-19e24339da7b	2025-06-08 10:23:54.318+05:30	2025-06-08 10:23:54.318+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	2388f4e4-cc9c-45cd-81df-5fb323bc3a40	2025-06-08 10:24:04.93+05:30	2025-06-08 10:24:04.93+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	b41365c8-a8b6-411a-9250-0fa2e460b2c3	2025-06-01 17:28:54.305+05:30	2025-06-01 17:28:54.305+05:30
\.


--
-- Data for Name: VendorTag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VendorTag" ("userId", "tagId", "createdAt", "updatedAt") FROM stdin;
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	782b6170-cb3c-4ee2-8a91-5b5ef49df634	2025-04-22 23:42:10.5+05:30	2025-04-22 23:42:10.5+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	7e3bf1af-3908-4c98-8d13-c04abb76ba08	2025-06-06 00:54:25.077+05:30	2025-06-06 00:54:25.077+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	9cc6902e-83bf-456e-83f3-fe7557ce82bd	2025-06-06 00:54:26.478+05:30	2025-06-06 00:54:26.478+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	f56631eb-fe11-4645-b22c-200ca35484c0	2025-06-01 17:23:59.017+05:30	2025-06-01 17:23:59.017+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	506b0784-bc08-4fde-add1-5ead17c3bf46	2025-06-01 17:25:51.442+05:30	2025-06-01 17:25:51.442+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	0eb6e36b-07ce-4bb5-b25c-fe740ceecbca	2025-06-01 17:28:30.982+05:30	2025-06-01 17:28:30.982+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	202ff398-b5db-454f-bea4-37f0bfef2ded	2025-06-06 01:09:40.786+05:30	2025-06-06 01:09:40.786+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	0e383b56-c6a9-476d-bd4a-dfa7359a1d28	2025-06-06 01:11:29.542+05:30	2025-06-06 01:11:29.542+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	3ed89f4b-e8bb-4dba-be34-aeaf2ead2bf1	2025-06-01 18:11:28+05:30	2025-06-01 18:11:28+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	53567c60-660a-40b4-8b25-a0679766d9b8	2025-06-01 18:11:53.607+05:30	2025-06-01 18:11:53.607+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	fa6b7955-708a-4f86-b0fb-5da64a7e0d0d	2025-06-06 01:13:52.056+05:30	2025-06-06 01:13:52.056+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	db82fd29-4276-4278-b26f-6e9603aa6a59	2025-06-07 21:50:47.209+05:30	2025-06-07 21:50:47.209+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	05a5ebbd-2816-4ac9-ac85-a827301a5808	2025-06-07 21:50:48.006+05:30	2025-06-07 21:50:48.006+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	210b1297-cf68-45ee-89c2-2cfeba7a98a6	2025-06-08 10:20:29.935+05:30	2025-06-08 10:20:29.935+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	3da26280-a318-4fb5-91a3-5eb93407aa7a	2025-06-08 10:20:32.04+05:30	2025-06-08 10:20:32.04+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	0bbf2086-ecb9-4e35-a189-ed3a86d27cc4	2025-06-08 10:20:33.397+05:30	2025-06-08 10:20:33.397+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	ad9ea03a-fd44-4492-8ab9-ee0f038f81fa	2025-06-08 10:20:36.941+05:30	2025-06-08 10:20:36.941+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	cef64ca0-efa6-43fd-91ee-c5cc27db3fb3	2025-06-05 01:46:47.922+05:30	2025-06-05 01:46:47.922+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	3298977d-7d07-40af-96e3-cf21dae51a73	2025-06-06 00:25:40.675+05:30	2025-06-06 00:25:40.675+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	954b0b9a-2f63-4281-92a4-343cd5b89cf5	2025-06-06 00:25:52.916+05:30	2025-06-06 00:25:52.916+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	678e51f4-6618-4973-8266-4b05ac86e453	2025-06-06 00:28:36.09+05:30	2025-06-06 00:28:36.09+05:30
4d18d2c1-3822-4dae-8e75-51b0fc6b1e70	adbdf6d6-fb71-496e-b885-e1891f2aaef1	2025-06-06 00:28:48.303+05:30	2025-06-06 00:28:48.303+05:30
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
58a005bd-fd5c-424e-bc21-fccb2dc8055c	c404fb2996f54bc16652a704b97874618c832a532e7428cbd43cb082d71de6c5	2025-02-24 22:26:59.793984+05:30	20250112080722_init	\N	\N	2025-02-24 22:26:59.749506+05:30	1
34835c08-84bc-4878-b2a9-92cd5f45153f	bf6755bb2923cbe721d66e0f2201687804c44adf5a47ab605ae22d13e21588f7	2025-06-04 20:38:48.963004+05:30	20250604150848_same_as_address_added	\N	\N	2025-06-04 20:38:48.959968+05:30	1
ad324b80-2b57-4ba9-920c-b2d20073340c	b753425919ce26677bc856d020b87653626546598d7ad1e00af2866c9e0549e8	2025-02-24 22:26:59.795779+05:30	20250112132249_service_name_unique	\N	\N	2025-02-24 22:26:59.794286+05:30	1
e0006fe5-b777-41e1-aeb9-1cfa08568c80	63f6fc380c6b40e664f4e1ed58f53b6725363112da9d7009675ccbbec79ef4a2	2025-03-15 00:39:33.679003+05:30	20250314190933_filename_removed	\N	\N	2025-03-15 00:39:33.67725+05:30	1
6a94e975-a9d1-4cd6-a5e6-c83a97a1229f	c557cae9b98770e4991a0e48adea1fbf6282cf49ea87687053fce8f294438f24	2025-02-24 22:26:59.797013+05:30	20250112132628_icon_field_changed_to_icon_url	\N	\N	2025-02-24 22:26:59.796038+05:30	1
99033e74-4d7c-4182-80ef-b5fff344d347	240fa3f56a1172a6898f9d348e01e2ea05960826b5df72ed96171eb7a2590e37	2025-02-24 22:26:59.799679+05:30	20250112165307_otp_added	\N	\N	2025-02-24 22:26:59.797273+05:30	1
f48e07fa-16f9-4c20-86fc-98df5d13ee4f	96392a2a19f76856c997a3ddbaa3e75be75fa86f4b675d876f155401a8f9cda9	2025-04-20 01:57:21.835467+05:30	20250419202721_payment_and_coupon_added	\N	\N	2025-04-20 01:57:21.81192+05:30	1
fb041925-82d0-4ed4-8742-1a67808a2182	be5509e603bb2f5f21392cc398a35b249bf5ed286d06020704b0dd00e00338a9	2025-02-24 22:26:59.800807+05:30	20250112170129_default_role_added	\N	\N	2025-02-24 22:26:59.799917+05:30	1
cfa14ac3-5f58-45c0-8c82-d60296ab7642	18082511ffc07eb604d0d9aa653610788ccf9db7cb321c834f899e986e4254bd	2025-03-15 10:42:21.775965+05:30	20250315051221_project_tag_composite_key_removed	\N	\N	2025-03-15 10:42:21.771696+05:30	1
c34534a0-5a26-446a-845d-c086a1a44639	7a81bc69bd7675ee033dda41bc5091c844942c7b618993fbdda974035417244b	2025-02-24 22:26:59.803315+05:30	20250118073424_address_added	\N	\N	2025-02-24 22:26:59.801084+05:30	1
715eb497-5b9e-4cd7-879e-b272efa168fe	615b90e8bb6d69f243fe94de4c1273e72796492d738fb3fce89877a9e47a5f5e	2025-02-24 22:26:59.807148+05:30	20250125071422_address_table_simplified	\N	\N	2025-02-24 22:26:59.803577+05:30	1
0dddba5e-eac8-4ad2-9497-e763e4d5ca31	607e51ecbc6b020957b28cbd68b5ddd64d391e263e54db206ab3a8fd6267cd9a	2025-02-24 22:26:59.808024+05:30	20250201114517_image_added_to_user_profile_table	\N	\N	2025-02-24 22:26:59.807373+05:30	1
d75fdd9a-6384-4552-a151-28586e95cebe	dee165045e06c78acadd982198c98cbc308cf6135a0e92c6bebffb01e6b2210b	2025-03-15 10:45:41.63785+05:30	20250315051541_project_tag_composite_key_added	\N	\N	2025-03-15 10:45:41.635148+05:30	1
ddc0d3e5-0e2f-4a28-92ee-6d59e22b258e	09b769f5de9348de8f086c560ed19592c2047dbdb5978ddad5a72b6a792fa6bd	2025-02-24 22:26:59.808959+05:30	20250202101427_preference_added_to_the_project_table	\N	\N	2025-02-24 22:26:59.80826+05:30	1
67b1f3e1-a31e-46f3-b6dc-a228d9eeaf87	9b6e0e23a93219a39f6dc7ece08369b4b5d71ca5fa3da7ce257f79b82f9b3397	2025-02-24 22:27:42.521248+05:30	20250224165742_schema_modified	\N	\N	2025-02-24 22:27:42.517649+05:30	1
4d44396f-024d-419d-900b-23757cbc3b55	7569276ef7ff1254aa8480671f7d0b3723807ca4fdad6c1ade15c9d9c6b52b45	2025-05-10 12:48:53.594011+05:30	20250510071853_project_update_file_type_added_in_composite_key	\N	\N	2025-05-10 12:48:53.588793+05:30	1
dd105f9c-326d-4c9f-acb2-1cfd802563d8	30295ae7725b34f04f2e1751e8aeb65ec6091a6dc12b375e0ec75bbf78fd6b5e	2025-03-08 17:20:41.22583+05:30	20250308115041_created_at_and_updated_at_added_to_tags_table	\N	\N	2025-03-08 17:20:41.213132+05:30	1
7708c057-0046-4b19-8d5a-f4ee219b58a9	9e6e0f0b23c68d641ea3849d5de756a1bc07cd819fc193f7fab9ad419e9870d1	2025-03-15 16:46:27.47324+05:30	20250315111627_service_id_made_index_in_tag_table	\N	\N	2025-03-15 16:46:27.469819+05:30	1
1c7946c2-5797-47f4-90d3-9d4d4778172e	b1573820d98488695e3d8a81c1ed3a395e6886f59f8f361834b7d212376358c5	2025-03-15 00:11:09.040655+05:30	20250314184108_database_modified	\N	\N	2025-03-15 00:11:08.935037+05:30	1
e0fbbdc7-0e3b-4057-a532-aa754a533665	d0c6f0a6e0a51703da6574b1c040ea3f36c0c467734fef1cc2b4758874326c6e	2025-03-15 00:37:05.908015+05:30	20250314190705_filetype_added	\N	\N	2025-03-15 00:37:05.904794+05:30	1
00e29ec7-c7ee-4ac6-9520-971d63a49d35	e6f7d5b601f0be7f87f78d18c5b81019a1493771cb582f8865ac8e5f51fe0ba6	2025-04-20 02:58:26.456193+05:30	20250419212826_plan_description_optional	\N	\N	2025-04-20 02:58:26.448763+05:30	1
6ffcf0ad-069e-4521-b9ec-39df06a94c34	f2e4c5966cc55a4ce57353212eb7e6b4caac29df2ad377feb1ff95ef83c3ab7d	2025-03-16 01:26:12.475496+05:30	20250315195612_database_modified	\N	\N	2025-03-16 01:26:12.4663+05:30	1
d69db410-2202-4d51-b356-88aa0a50a45f	e4784675775b28b600530400f8f020ed04929ad6d3760174d22c97be1d292bc2	2025-04-05 11:32:53.914249+05:30	20250405060253_business_address_and_license_added	\N	\N	2025-04-05 11:32:53.905281+05:30	1
40e690bc-3601-4196-8693-5b27975340ea	4e93d0e0181ed484b27bcd6e90b2d8f48efddee37394e38489c7ce7283071cd1	2025-04-05 13:04:50.645809+05:30	20250405073450_login_history_message_added	\N	\N	2025-04-05 13:04:50.640977+05:30	1
b757f772-ea90-45e2-8832-1c1626d33892	f18efb67727046e64d48797394e8cb31e6e13ec483d813700c4d8686cead1e09	2025-04-20 03:00:11.659485+05:30	20250419213011_plan_description_made_optional	\N	\N	2025-04-20 03:00:11.657834+05:30	1
cca2b8c3-df93-4ee4-a9dd-15a8a942b83e	562abe77259b4ebdf433356a75bd9d5e13efbefb490bebbe81966c1fef12391e	2025-04-05 16:10:29.596037+05:30	20250405104029_notification_added	\N	\N	2025-04-05 16:10:29.589087+05:30	1
0a15142d-3ed0-4201-ae49-6f83d80ad532	e2f6b03ad2be1edaab7cf6b7503caa5954f4306c6152ea5c61d8ee3b2e9fc534	2025-05-12 21:47:52.773326+05:30	20250512161752_yearly_plan_added	\N	\N	2025-05-12 21:47:52.771452+05:30	1
593f6ddb-8e19-443d-902f-22ae1da93935	da07859e46654dd99147dc9b5f5dd6a729f85607f3d80936bd1f49a9d8b293d6	2025-05-03 15:41:09.705019+05:30	20250503101109_vendor_found_status_added	\N	\N	2025-05-03 15:41:09.701373+05:30	1
bcee1e99-14d3-4e68-87ec-2431bc7d0059	4a54e2414971f88b0ea090ea7dffc991a0aabc9b793b2ca743e34a23dd7cd55b	2025-05-11 22:08:54.182255+05:30	20250511163854_price_id_added_to_plan_table	\N	\N	2025-05-11 22:08:54.17897+05:30	1
02dd412a-3fb3-46d0-aa8e-74bfff59050a	c37221dbe83ea268f398292b5ac75e982348275dff2eeff696b43e3b3fd7d9e3	2025-05-07 23:35:24.309711+05:30	20250507180524_project_update_table_comment_field_changed_to_description	\N	\N	2025-05-07 23:35:24.3023+05:30	1
b4f3c38d-07b9-4c7a-b462-9e8bf6d4aa0e	421c49fc428ecc3033b36fac9b5074e3b788ae70376170b52138a9f788d9b22b	2025-05-11 22:49:31.064822+05:30	20250511171931_is_popular_added_to_plan_table	\N	\N	2025-05-11 22:49:31.061801+05:30	1
5acb855a-3a3f-41da-90ae-f34ff97d3dd8	88c379a3ac54e28e42d34ee92605ab8f53c74bd989afea22fb3321c59b157e53	2025-06-03 01:02:09.168763+05:30	20250602193208_amount_added_to_userplan	\N	\N	2025-06-03 01:02:09.165076+05:30	1
bc7d5bb2-2c94-4e90-8f3b-de52e71ccbe1	ce3762e149195222638d487e3b9c74ed45adf77e0ea319a710db0edb2c8d9562	2025-06-12 01:24:13.076562+05:30	20250611195412_service_distance_added_to_user_table	\N	\N	2025-06-12 01:24:13.073911+05:30	1
e2f62cb5-bf7c-4f41-bb81-43a13ff58b44	6f8964dca6f12fd929c9498d350e4ee1bafc090942289e6f725ade8c3a3b9a3a	2025-06-14 20:41:32.537825+05:30	20250614151132_	\N	\N	2025-06-14 20:41:32.53293+05:30	1
fbd1d744-b7b8-4c04-aa50-6c6db9289d59	94fa33d96f9e0cb2d3b108a78bbb4cfb26ac21b3500733f629a786c78f305f7d	2025-06-21 16:52:10.409944+05:30	20250621112210_budget_preference_added_to_vendors	\N	\N	2025-06-21 16:52:10.402573+05:30	1
389518f2-24e0-43f7-b63e-8cafdcb9316f	f862af21d6f05be3e04c1e9edba39df70fe7a5ba5c0d9ee0ad0b21a7411e4ec8	2025-06-22 00:15:46.810909+05:30	20250621184546_blog_model_added	\N	\N	2025-06-22 00:15:46.798708+05:30	1
8e4dd62b-b4ae-447e-b873-9fd842ec9cc9	168c219241486e6e5351bce48615c6c330cd1dcef6ab9b78560ddea37b00bf50	2025-06-22 00:33:39.965681+05:30	20250621190339_blog_title_unique	\N	\N	2025-06-22 00:33:39.961413+05:30	1
\.


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: Bid Bid_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bid"
    ADD CONSTRAINT "Bid_pkey" PRIMARY KEY (id);


--
-- Name: Blog Blog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Blog"
    ADD CONSTRAINT "Blog_pkey" PRIMARY KEY (id);


--
-- Name: BusinessAddress BusinessAddress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BusinessAddress"
    ADD CONSTRAINT "BusinessAddress_pkey" PRIMARY KEY (id);


--
-- Name: Coupon Coupon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Coupon"
    ADD CONSTRAINT "Coupon_pkey" PRIMARY KEY (id);


--
-- Name: LoginHistory LoginHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LoginHistory"
    ADD CONSTRAINT "LoginHistory_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: Otp Otp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Otp"
    ADD CONSTRAINT "Otp_pkey" PRIMARY KEY (id);


--
-- Name: Plan Plan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Plan"
    ADD CONSTRAINT "Plan_pkey" PRIMARY KEY (id);


--
-- Name: ProjectFile ProjectFile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectFile"
    ADD CONSTRAINT "ProjectFile_pkey" PRIMARY KEY (id);


--
-- Name: ProjectTag ProjectTag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectTag"
    ADD CONSTRAINT "ProjectTag_pkey" PRIMARY KEY ("projectId", "tagId");


--
-- Name: ProjectUpdateFile ProjectUpdateFile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectUpdateFile"
    ADD CONSTRAINT "ProjectUpdateFile_pkey" PRIMARY KEY ("projectUpdateId", type);


--
-- Name: ProjectUpdate ProjectUpdate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectUpdate"
    ADD CONSTRAINT "ProjectUpdate_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: SampleFile SampleFile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SampleFile"
    ADD CONSTRAINT "SampleFile_pkey" PRIMARY KEY (id);


--
-- Name: Service Service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);


--
-- Name: SiteMeasurement SiteMeasurement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SiteMeasurement"
    ADD CONSTRAINT "SiteMeasurement_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: Testimonial Testimonial_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Testimonial"
    ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY (id);


--
-- Name: UserCoupon UserCoupon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCoupon"
    ADD CONSTRAINT "UserCoupon_pkey" PRIMARY KEY (id);


--
-- Name: UserPlan UserPlan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserPlan"
    ADD CONSTRAINT "UserPlan_pkey" PRIMARY KEY (id);


--
-- Name: UserProfile UserProfile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfile"
    ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VendorService VendorService_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendorService"
    ADD CONSTRAINT "VendorService_pkey" PRIMARY KEY ("userId", "serviceId");


--
-- Name: VendorTag VendorTag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendorTag"
    ADD CONSTRAINT "VendorTag_pkey" PRIMARY KEY ("userId", "tagId");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Address_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Address_userId_key" ON public."Address" USING btree ("userId");


--
-- Name: Blog_title_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Blog_title_key" ON public."Blog" USING btree (title);


--
-- Name: BusinessAddress_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "BusinessAddress_userId_key" ON public."BusinessAddress" USING btree ("userId");


--
-- Name: Coupon_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Coupon_code_key" ON public."Coupon" USING btree (code);


--
-- Name: LoginHistory_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LoginHistory_userId_idx" ON public."LoginHistory" USING btree ("userId");


--
-- Name: Otp_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Otp_userId_key" ON public."Otp" USING btree ("userId");


--
-- Name: Plan_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Plan_name_key" ON public."Plan" USING btree (name);


--
-- Name: ProjectTag_projectId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProjectTag_projectId_idx" ON public."ProjectTag" USING btree ("projectId");


--
-- Name: ProjectTag_tagId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ProjectTag_tagId_idx" ON public."ProjectTag" USING btree ("tagId");


--
-- Name: Project_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Project_userId_idx" ON public."Project" USING btree ("userId");


--
-- Name: Review_projectId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Review_projectId_idx" ON public."Review" USING btree ("projectId");


--
-- Name: Review_vendorId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Review_vendorId_idx" ON public."Review" USING btree ("vendorId");


--
-- Name: Service_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Service_name_key" ON public."Service" USING btree (name);


--
-- Name: SiteMeasurement_projectId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SiteMeasurement_projectId_key" ON public."SiteMeasurement" USING btree ("projectId");


--
-- Name: Tag_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Tag_name_key" ON public."Tag" USING btree (name);


--
-- Name: Tag_serviceId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Tag_serviceId_idx" ON public."Tag" USING btree ("serviceId");


--
-- Name: Testimonial_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Testimonial_userId_idx" ON public."Testimonial" USING btree ("userId");


--
-- Name: UserPlan_userId_planId_couponId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "UserPlan_userId_planId_couponId_idx" ON public."UserPlan" USING btree ("userId", "planId", "couponId");


--
-- Name: UserProfile_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "UserProfile_userId_key" ON public."UserProfile" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_phone_key" ON public."User" USING btree (phone);


--
-- Name: VendorService_serviceId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "VendorService_serviceId_idx" ON public."VendorService" USING btree ("serviceId");


--
-- Name: VendorService_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "VendorService_userId_idx" ON public."VendorService" USING btree ("userId");


--
-- Name: VendorTag_tagId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "VendorTag_tagId_idx" ON public."VendorTag" USING btree ("tagId");


--
-- Name: VendorTag_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "VendorTag_userId_idx" ON public."VendorTag" USING btree ("userId");


--
-- Name: Address Address_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Bid Bid_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bid"
    ADD CONSTRAINT "Bid_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Bid Bid_vendorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bid"
    ADD CONSTRAINT "Bid_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Blog Blog_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Blog"
    ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BusinessAddress BusinessAddress_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BusinessAddress"
    ADD CONSTRAINT "BusinessAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LoginHistory LoginHistory_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LoginHistory"
    ADD CONSTRAINT "LoginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Notification Notification_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Notification Notification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Otp Otp_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Otp"
    ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProjectFile ProjectFile_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectFile"
    ADD CONSTRAINT "ProjectFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProjectTag ProjectTag_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectTag"
    ADD CONSTRAINT "ProjectTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProjectTag ProjectTag_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectTag"
    ADD CONSTRAINT "ProjectTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProjectUpdateFile ProjectUpdateFile_projectUpdateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectUpdateFile"
    ADD CONSTRAINT "ProjectUpdateFile_projectUpdateId_fkey" FOREIGN KEY ("projectUpdateId") REFERENCES public."ProjectUpdate"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProjectUpdate ProjectUpdate_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectUpdate"
    ADD CONSTRAINT "ProjectUpdate_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProjectUpdate ProjectUpdate_vendorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectUpdate"
    ADD CONSTRAINT "ProjectUpdate_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Project Project_addressId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES public."Address"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Project Project_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Project Project_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Review Review_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Review Review_vendorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SampleFile SampleFile_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SampleFile"
    ADD CONSTRAINT "SampleFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Service Service_planId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_planId_fkey" FOREIGN KEY ("planId") REFERENCES public."Plan"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SiteMeasurement SiteMeasurement_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SiteMeasurement"
    ADD CONSTRAINT "SiteMeasurement_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Tag Tag_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Testimonial Testimonial_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Testimonial"
    ADD CONSTRAINT "Testimonial_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserCoupon UserCoupon_couponId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCoupon"
    ADD CONSTRAINT "UserCoupon_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES public."Coupon"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserCoupon UserCoupon_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCoupon"
    ADD CONSTRAINT "UserCoupon_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserPlan UserPlan_couponId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserPlan"
    ADD CONSTRAINT "UserPlan_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES public."Coupon"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserPlan UserPlan_planId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserPlan"
    ADD CONSTRAINT "UserPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES public."Plan"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserPlan UserPlan_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserPlan"
    ADD CONSTRAINT "UserPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserProfile UserProfile_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProfile"
    ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: VendorService VendorService_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendorService"
    ADD CONSTRAINT "VendorService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: VendorService VendorService_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendorService"
    ADD CONSTRAINT "VendorService_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: VendorTag VendorTag_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendorTag"
    ADD CONSTRAINT "VendorTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: VendorTag VendorTag_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendorTag"
    ADD CONSTRAINT "VendorTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

