-- Create Enumerations
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');
CREATE TYPE "UserType" AS ENUM ('ERP', 'PUBLIC', 'API', 'SYSTEM', 'ANONYMOUS', 'ROOT', 'ADMIN');
CREATE TYPE "Country" AS ENUM ('BRAZIL', 'UNITED_STATES', 'GERMANY', 'CHINA');
CREATE TYPE "Language" AS ENUM ('EN_US', 'PT_BR', 'PT_PT', 'ZH_CN', 'ES');

-- Create Tables
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  country "Country",
  user_type "UserType" NOT NULL DEFAULT 'PUBLIC',
  active BOOLEAN  NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
  id Int PRIMARY KEY NOT NULL,
  photo BYTEA,
  biography TEXT,
  tittle VARCHAR(255),
  description TEXT,
  birth TIMESTAMP,
  phone VARCHAR(255),
  profile_description TEXT,
  profile_status VARCHAR(255),
  social_network JSONB,
  interests JSONB,
  preferences JSONB,
  configurations JSONB,
  gender "Gender",
  language "Language",
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id) REFERENCES users(id)
);
