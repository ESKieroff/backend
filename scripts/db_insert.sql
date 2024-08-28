-- INSERT USERS
INSERT INTO users (id, username, email, password, first_name, last_name, country, user_type, active, created_at, updated_at)
VALUES
(1,'RACOONING','racooning@gmail.com','abc123','Racoonin','Racoon','BRAZIL','ERP',true,'2020-12-22','2020-12-22'),
(2,'GOKU','goku@gmail.com','abc123','Son','Goku','CHINA','PUBLIC',true,'2021-06-05','2021-06-05'),
(3,'MELAINE','melaine@gmail.com','abc123','Melaine','Clark','GERMANY','API',true,'2019-11-11','2019-11-11'),
(4,'CHARLIE','charlie@gmail.com','abc123','Charlie','Sheen','UNITED_STATES','SYSTEM',true,'2011-01-02','2011-01-02'),
(5,'SONIA','sonia@gmail.com','abc123','Sonia','Fernandes','BRAZIL','ROOT',true,'2023-04-01','2023-04-01');

-- INSERT PROFILES
INSERT INTO profiles (id, biography, tittle, description, birth, phone, profile_description, profile_status, social_network, interests, preferences, configurations, gender, language, created_at, updated_at)
VALUES
(1,
'BIOGRAPHY Lorem ipsum dolor sit amet.',
'TITTLE Lorem ipsum dolor sit amet.',
'DESCRIPTION Lorem ipsum dolor sit amet.',
'1990-01-01',
'5551993665555',
'PROFILE DESCRIPTION Lorem ipsum dolor sit amet.',
'STATUS BLUE',
'{
"github": "https://github.com/profile",
"twitter": "https://twitter.com/profile",
"facebook": "https://www.facebook.com/profile",
"linkedin": "https://www.linkedin.com/in/profile",
"instagram": "https://www.instagram.com/profile"
}',
'{
"corrida": "yes", "futebol": "yes",
"leitura": "yes", "natação": "yes",
"musculação": "yes"
}',
'{"menu": "left",
"skyn": "cordata",
"rolagem": "suave",
"primary color": "blue"
}',
'{
"option A": "yes",
"option B": "yes",
"option C": "yes"
}',
'MALE',
'PT_BR',
'2022-02-02',
'2022-02-02'),
(2,
'BIOGRAPHY Lorem ipsum dolor sit amet.',
'TITTLE Lorem ipsum dolor sit amet.',
'DESCRIPTION Lorem ipsum dolor sit amet.',
'2000-08-08',
'5551993665555',
'PROFILE DESCRIPTION Lorem ipsum dolor sit amet.',
'STATUS RED',
'{
"github": "https://github.com/profile",
"twitter": "https://twitter.com/profile",
"facebook": "https://www.facebook.com/profile",
"linkedin": "https://www.linkedin.com/in/profile",
"instagram": "https://www.instagram.com/profile"
}',
'{
"corrida": "yes", "futebol": "yes",
"leitura": "yes", "natação": "yes",
"musculação": "yes"
}',
'{"menu": "left",
"skyn": "cordata",
"rolagem": "suave",
"primary color": "blue"
}',
'{
"option A": "yes",
"option B": "yes",
"option C": "yes"
}',
'MALE',
'PT_BR',
'2022-02-02',
'2022-02-02'),
(3,
'BIOGRAPHY Lorem ipsum dolor sit amet.',
'TITTLE Lorem ipsum dolor sit amet.',
'DESCRIPTION Lorem ipsum dolor sit amet.',
'1990-01-01',
'5551993665555',
'PROFILE DESCRIPTION Lorem ipsum dolor sit amet.',
'STATUS GREEN',
'{
"github": "https://github.com/profile",
"twitter": "https://twitter.com/profile",
"facebook": "https://www.facebook.com/profile",
"linkedin": "https://www.linkedin.com/in/profile",
"instagram": "https://www.instagram.com/profile"
}',
'{
"corrida": "yes", "futebol": "yes",
"leitura": "yes", "natação": "yes",
"musculação": "yes"
}',
'{"menu": "left",
"skyn": "cordata",
"rolagem": "suave",
"primary color": "blue"
}',
'{
"option A": "yes",
"option B": "yes",
"option C": "yes"
}',
'FEMALE',
'PT_BR',
'2022-02-02',
'2022-02-02'),
(4,
'BIOGRAPHY Lorem ipsum dolor sit amet.',
'TITTLE Lorem ipsum dolor sit amet.',
'DESCRIPTION Lorem ipsum dolor sit amet.',
'1990-01-01',
'5551993665555',
'PROFILE DESCRIPTION Lorem ipsum dolor sit amet.',
'STATUS BLUE',
'{
"github": "https://github.com/profile",
"twitter": "https://twitter.com/profile",
"facebook": "https://www.facebook.com/profile",
"linkedin": "https://www.linkedin.com/in/profile",
"instagram": "https://www.instagram.com/profile"
}',
'{
"corrida": "yes", "futebol": "yes",
"leitura": "yes", "natação": "yes",
"musculação": "yes"
}',
'{"menu": "left",
"skyn": "cordata",
"rolagem": "suave",
"primary color": "blue"
}',
'{
"option A": "yes",
"option B": "yes",
"option C": "yes"
}',
'FEMALE',
'PT_BR',
'2022-02-02',
'2022-02-02'),
(5,
'BIOGRAPHY Lorem ipsum dolor sit amet.',
'TITTLE Lorem ipsum dolor sit amet.',
'DESCRIPTION Lorem ipsum dolor sit amet.',
'1990-01-01',
'5551993665555',
'PROFILE DESCRIPTION Lorem ipsum dolor sit amet.',
'STATUS BLUE',
'{
"github": "https://github.com/profile",
"twitter": "https://twitter.com/profile",
"facebook": "https://www.facebook.com/profile",
"linkedin": "https://www.linkedin.com/in/profile",
"instagram": "https://www.instagram.com/profile"
}',
'{
"corrida": "yes", "futebol": "yes",
"leitura": "yes", "natação": "yes",
"musculação": "yes"
}',
'{"menu": "left",
"skyn": "cordata",
"rolagem": "suave",
"primary color": "blue"
}',
'{
"option A": "yes",
"option B": "yes",
"option C": "yes"
}',
'FEMALE',
'PT_BR',
'2022-02-02',
'2022-02-02');
