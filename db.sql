CREATE TABLE article (
    id VARCHAR(255) PRIMARY KEY,
    users_id VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(255),
    category VARCHAR(255),
    image VARCHAR(255),
    status VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE brand (
    id VARCHAR(255) PRIMARY KEY,
    brand_product VARCHAR(255),
    description VARCHAR(255),
    bg_img VARCHAR(255),
    logo_img VARCHAR(255),
    asset_img VARCHAR(255),
    link_ig VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    authorize VARCHAR(255),
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    idssg VARCHAR(255),
    role VARCHAR(255),
    notelp INT(255),
    tanggal_lahir DATE,
    gender VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    status VARCHAR(15)
);

CREATE TABLE login_session (
    id VARCHAR(255) PRIMARY KEY,
    users_id VARCHAR(255),
    login_at TIMESTAMP,
    logout_at TIMESTAMP,
    status VARCHAR(15)
);

CREATE TABLE product (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    category VARCHAR(255),
    brand VARCHAR(255),
    variant VARCHAR(255),
    price DECIMAL(10, 2),  
    discount DECIMAL(5, 2),  
    status VARCHAR(255),
    description VARCHAR(255),  
    how_to_use VARCHAR(255),
    netto VARCHAR(255),
    dimension VARCHAR(255),  
    image_product VARCHAR(255),
    expired_product DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL
);

SELECT * FROM brand WHERE id='0071599e-e419-4577-a466-b7e7c777c4a5';